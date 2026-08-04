import React, { useState } from "react";
import { Plus, Save, BookOpen } from "lucide-react";
import type { Course } from "../../types/gpa";
import { GRADE_OPTIONS } from "../../utils/gpaCalculator";
import { formatSemester, semesterOptions } from "../../utils/semesterUtils";
import Modal from "../UI/Modal";
import FormField from "../UI/FormField";

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCourse: (courseData: Omit<Course, "id"> & { id?: string }) => void;
  editingCourse?: Course | null;
  defaultSemester?: number;
  /** Highest selectable semester (onboarding limit), e.g. 3.2 */
  maxSemester?: number;
}

export default function CourseModal({
  isOpen,
  onClose,
  onSaveCourse,
  editingCourse,
  defaultSemester = 1,
  maxSemester,
}: CourseModalProps) {
  const [code, setCode]         = useState(editingCourse?.code ?? "");
  const [name, setName]         = useState(editingCourse?.name ?? "");
  const [credits, setCredits]   = useState<number>(editingCourse?.credits ?? 3);
  const [semester, setSemester] = useState<number>(editingCourse?.semester ?? defaultSemester);
  const [grade, setGrade]       = useState<string>(editingCourse?.grade ?? "Pending");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !name.trim() || credits < 0 || semester <= 0) return;
    onSaveCourse({
      id: editingCourse?.id,
      code: code.trim().toUpperCase(),
      name: name.trim(),
      credits: Number(credits),
      semester: Number(semester),
      grade,
      isCustom: true,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<BookOpen size={16} />}
      title={editingCourse ? "Edit Subject" : "Add Custom Subject"}
      subtitle={editingCourse
        ? "Update course details & credits"
        : "Enter subject code, name, and credit weight"}
      maxWidth={440}
    >
      <form onSubmit={handleSubmit} style={{ padding: "18px 18px 0" }}>
        {/* Course Code */}
        <FormField label="Course Code *" htmlFor="cm-code">
          <input
            id="cm-code"
            type="text"
            required
            placeholder="e.g. CST 112-2 or CS 101"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="inp"
            autoFocus
          />
        </FormField>

        {/* Subject Name */}
        <FormField label="Subject Name *" htmlFor="cm-name">
          <input
            id="cm-name"
            type="text"
            required
            placeholder="e.g. Advanced Calculus & Differential Equations"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="inp"
          />
        </FormField>

        {/* Credits + Semester */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <FormField label="Credit Weight *" htmlFor="cm-credits" marginBottom={14}>
            <input
              id="cm-credits"
              type="number"
              min="0"
              max="12"
              step="0.5"
              required
              value={credits}
              onChange={(e) => setCredits(parseFloat(e.target.value) || 0)}
              className="inp"
              style={{ textAlign: "center" }}
            />
          </FormField>
          <FormField label="Semester *" htmlFor="cm-sem" marginBottom={14}>
            <select
              id="cm-sem"
              value={String(semester)}
              onChange={(e) => setSemester(parseFloat(e.target.value))}
              className="inp"
              style={{ cursor: "pointer" }}
            >
              {semesterOptions(4).filter((s) => !maxSemester || s <= maxSemester).map((s) => (
                <option key={s} value={String(s)}>
                  {formatSemester(s)}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        {/* Achieved Grade */}
        <FormField label="Achieved Grade" htmlFor="cm-grade" marginBottom={18}>
          <select
            id="cm-grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="inp"
            style={{ cursor: "pointer" }}
          >
            <option value="Pending">-- Select Grade --</option>
            {GRADE_OPTIONS.map((g) => (
              <option key={g.letter} value={g.letter}>
                {g.letter} ({g.points.toFixed(1)} pts – {g.description})
              </option>
            ))}
          </select>
        </FormField>

        {/* ── Footer ── */}
        <div
          style={{
            margin: "0 -18px",
            padding: "12px 18px",
            borderTop: "1px solid var(--gray-200)",
            background: "var(--gray-50)",
            display: "flex", alignItems: "center",
            justifyContent: "flex-end", gap: 8,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
            style={{ fontSize: 13 }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ fontSize: 13 }}
          >
            {editingCourse ? <Save size={14} /> : <Plus size={14} />}
            <span>{editingCourse ? "Save Changes" : "Add Subject"}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
