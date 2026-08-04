import type { Course, DegreeProgram } from "../types/gpa";
import { parseSemesterCode } from "./semesterUtils";

export const DEFAULT_GOOGLE_SHEET_TSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQtXV0S6lrhfRZOTW6Bs0yGYw9VUvzHvYbmRn1R6mZC56egW4B-uf27gxYupXLrrSTZlwjBQ6ZoJwki/pub?output=tsv";

export function parseTsvData(tsvText: string): Course[] {
  const lines = tsvText.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) return [];

  const courses: Course[] = [];
  let headerIndex = -1;
  let codeCol = -1;
  let nameCol = -1;
  let creditsCol = -1;
  let semesterCol = -1;

  for (let i = 0; i < lines.length; i++) {
    const cols = lines[i].split("\t").map((c) => c.trim().toLowerCase());
    const codeIdx = cols.findIndex((c) => c.includes("code") || c.includes("course code") || c.includes("subject code"));
    const nameIdx = cols.findIndex((c) => c.includes("name") || c.includes("course name") || c.includes("subject name") || c.includes("title"));
    const credIdx = cols.findIndex((c) => c.includes("credit") || c.includes("credits"));
    const semIdx = cols.findIndex((c) => c.includes("semester") || c.includes("sem") || c.includes("year"));

    if (codeIdx !== -1 || nameIdx !== -1 || credIdx !== -1) {
      headerIndex = i;
      codeCol = codeIdx !== -1 ? codeIdx : 0;
      nameCol = nameIdx !== -1 ? nameIdx : 1;
      creditsCol = credIdx !== -1 ? credIdx : 2;
      semesterCol = semIdx !== -1 ? semIdx : 3;
      break;
    }
  }

  const startIndex = headerIndex !== -1 ? headerIndex + 1 : 0;
  if (headerIndex === -1) {
    codeCol = 0;
    nameCol = 1;
    creditsCol = 2;
    semesterCol = 3;
  }

  for (let i = startIndex; i < lines.length; i++) {
    const row = lines[i].split("\t").map((c) => c.trim());
    if (row.length < 2) continue;

    const code = row[codeCol] || `CRS-${i}`;
    const name = row[nameCol] || "Untitled Course";
    /* Keep 0-credit rows: they mark non-GPA courses and must not default to 3 */
    const rawCredits = parseFloat(row[creditsCol]);
    const credits = isNaN(rawCredits) ? 3 : Math.max(0, rawCredits);
    const semester = parseSemesterCode(row[semesterCol]);
    const id = `${code.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${i}`;

    courses.push({
      id,
      code,
      name,
      credits,
      semester,
      grade: "Pending",
    });
  }

  return courses;
}

export interface DegreeSheetDetails {
  name: string;
  years?: number;
  level?: string;
}

/**
 * Fetch the [Degree] mapping sheet and return degree details keyed by
 * degree short code (e.g. "CST" → { name, years, level }).
 * Column positions are detected from the header row; bracket-wrapped
 * codes such as "[CST]" are normalised to "CST".
 */
export async function fetchDegreeDetailsFromSheet(tsvUrl: string): Promise<Map<string, DegreeSheetDetails>> {
  const map = new Map<string, DegreeSheetDetails>();
  try {
    let response: Response;
    try {
      response = await fetch(tsvUrl);
    } catch {
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(tsvUrl)}`;
      response = await fetch(proxyUrl);
    }

    if (!response.ok) return map;
    const text = await response.text();
    const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length === 0) return map;

    /* Locate header row and column indexes */
    let codeCol = 0;
    let nameCol = 1;
    let yearsCol = -1;
    let levelCol = -1;
    const headerIdx = lines.findIndex((line) => {
      const cols = line.split("\t").map((c) => c.toLowerCase());
      const cIdx = cols.findIndex((c) => c.includes("code"));
      const nIdx = cols.findIndex((c) => c.includes("name"));
      if (cIdx !== -1) codeCol = cIdx;
      if (nIdx !== -1) nameCol = nIdx;
      yearsCol = cols.findIndex((c) => c.includes("year") || c.includes("duration"));
      levelCol = cols.findIndex((c) => c.includes("level"));
      return cIdx !== -1 && nIdx !== -1;
    });

    const startIdx = headerIdx !== -1 ? headerIdx + 1 : 0;

    for (let i = startIdx; i < lines.length; i++) {
      const row = lines[i].split("\t").map((c) => c.trim());
      const code = (row[codeCol] || "").replace(/[[\]]/g, "").trim().toUpperCase();
      const name = (row[nameCol] || "").trim();
      if (!code || !name || code === "CODE" || code === "DEGREE CODE") continue;

      const rawYears = yearsCol !== -1 ? parseInt(row[yearsCol], 10) : NaN;
      const level = levelCol !== -1 && row[levelCol] ? row[levelCol] : undefined;

      map.set(code, {
        name,
        years: !isNaN(rawYears) && rawYears > 0 ? rawYears : undefined,
        level,
      });
    }
  } catch (e) {
    console.warn("Failed to fetch Degree mapping sheet:", e);
  }
  return map;
}

export async function discoverDegreeProgramsFromSheet(tsvBaseUrl: string): Promise<DegreeProgram[]> {
  try {
    const pubHtmlUrl = tsvBaseUrl.replace(/pub\?output=tsv.*$/, "pubhtml");

    let response: Response;
    try {
      response = await fetch(pubHtmlUrl);
    } catch {
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(pubHtmlUrl)}`;
      response = await fetch(proxyUrl);
    }

    if (!response.ok) {
      return [];
    }

    const html = await response.text();
    const itemRegex = /items\.push\(\{name:\s*"([^"]+)",[^}]*gid:\s*"([^"]+)"/g;

    const rawSheets: { name: string; gid: string }[] = [];
    let match;

    while ((match = itemRegex.exec(html)) !== null) {
      const rawName = match[1].replace(/\\x([0-9a-fA-F]{2})/g, (_, hex) =>
        String.fromCharCode(parseInt(hex, 16))
      );
      const gid = match[2];
      rawSheets.push({ name: rawName, gid });
    }

    if (rawSheets.length === 0) return [];

    const baseUrlWithoutGid = tsvBaseUrl.split("&gid=")[0].split("?gid=")[0];

    // Check if there is a sheet named [Degree] or Degree
    const degreeMappingSheet = rawSheets.find((s) => {
      const clean = s.name.replace(/[[\]]/g, "").trim().toLowerCase();
      return clean === "degree" || clean === "degrees";
    });

    let degreeDetails = new Map<string, DegreeSheetDetails>();
    if (degreeMappingSheet) {
      const degreeSheetTsvUrl = `${baseUrlWithoutGid}&gid=${degreeMappingSheet.gid}`;
      degreeDetails = await fetchDegreeDetailsFromSheet(degreeSheetTsvUrl);
    }

    const degrees: DegreeProgram[] = [];

    for (const sheet of rawSheets) {
      const cleanCode = sheet.name.replace(/[[\]]/g, "").trim();
      const lowerClean = cleanCode.toLowerCase();

      // Skip the [Degree] mapping sheet itself from the course programs list
      if (lowerClean === "degree" || lowerClean === "degrees") continue;

      const details = degreeDetails.get(cleanCode.toUpperCase());
      const fullDegreeName = details?.name || cleanCode;

      const sheetTsvUrl = `${baseUrlWithoutGid}&gid=${sheet.gid}`;

      degrees.push({
        id: cleanCode.toLowerCase(),
        code: cleanCode,
        name: fullDegreeName,
        gid: sheet.gid,
        tsvUrl: sheetTsvUrl,
        years: details?.years,
        level: details?.level,
      });
    }

    return degrees;
  } catch (e) {
    console.warn("Failed to discover degree sheets from pubhtml:", e);
    return [];
  }
}

export async function fetchCoursesFromTsvUrl(url: string): Promise<Course[]> {
  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    response = await fetch(proxyUrl);
  }

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  const tsvText = await response.text();
  const parsed = parseTsvData(tsvText);

  if (parsed.length === 0) {
    throw new Error("No valid subjects found in TSV");
  }

  return parsed;
}
