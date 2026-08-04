import { useEffect, useRef, useState } from "react";
import { Search, X, Loader2 } from "lucide-react";
import type { SelectOption } from "./CustomSelect";

interface SearchSelectProps {
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  /** Pinned row at the bottom of the suggestions (e.g. "Not in here") */
  footerLabel?: string;
  onFooter?: () => void;
  loading?: boolean;
  /** Bigger "Google search" style input */
  big?: boolean;
}

/** Bold the part of `text` matching `query` (case-insensitive) */
function highlight(text: string, query: string): React.ReactNode {
  const q = query.trim();
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <span style={{ fontWeight: 700, color: "var(--blue)" }}>{text.slice(i, i + q.length)}</span>
      {text.slice(i + q.length)}
    </>
  );
}

export default function SearchSelect({
  options, onChange, placeholder = "Search…",
  footerLabel, onFooter, loading = false, big = true,
}: SearchSelectProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const suggestions = query.trim()
    ? options.filter((o) => `${o.label} ${o.sub ?? ""}`.toLowerCase().includes(query.trim().toLowerCase()))
    : options;

  /* Clamp the highlighted row to the current suggestion list */
  const highlightIdxClamped = suggestions.length > 0 ? Math.min(highlightIdx, suggestions.length - 1) : 0;

  /* Close on outside click */
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      if (suggestions.length === 0) return;
      setHighlightIdx((h) =>
        e.key === "ArrowDown" ? (h + 1) % suggestions.length : (h - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && suggestions[highlightIdxClamped]) {
        onChange(suggestions[highlightIdxClamped].value);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (!open) {
      setOpen(true);
    }
  };

  const pick = (opt: SelectOption) => {
    onChange(opt.value);
    setOpen(false);
  };

  const showPanel = open && (suggestions.length > 0 || loading || footerLabel || query.trim().length > 0);

  return (
    <div ref={rootRef} style={{ position: "relative" }}>
      {/* ── Input ── */}
      <div style={{ position: "relative" }}>
        <Search
          size={big ? 18 : 14}
          style={{
            position: "absolute", left: big ? 16 : 11, top: "50%",
            transform: "translateY(-50%)", color: "var(--gray-400)",
            pointerEvents: "none",
          }}
        />
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setHighlightIdx(0); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          style={{
            width: "100%", boxSizing: "border-box",
            padding: big ? "15px 44px 15px 46px" : "10px 34px 10px 34px",
            fontSize: big ? 16 : 13, fontFamily: "inherit",
            color: "var(--gray-900)",
            background: "#fff",
            border: `1.5px solid ${focused ? "var(--blue)" : "var(--gray-300)"}`,
            borderRadius: 12,
            outline: "none",
            boxShadow: focused ? "0 0 0 4px var(--blue-border)" : "none",
            transition: "border-color .15s, box-shadow .15s",
          }}
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery("")}
            style={{
              position: "absolute", right: 12, top: "50%",
              transform: "translateY(-50%)",
              width: big ? 22 : 18, height: big ? 22 : 18, borderRadius: "50%",
              background: "var(--gray-200)", border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--gray-500)",
            }}
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* ── Suggestions ── */}
      {showPanel && (
        <div
          style={{
            position: "absolute", left: 0, right: 0, top: "calc(100% + 6px)",
            background: "#fff", border: "1px solid var(--gray-200)",
            borderRadius: 12, boxShadow: "0 12px 32px rgba(15,23,42,.14)",
            zIndex: 60, overflow: "hidden",
            maxHeight: 340, overflowY: "auto",
          }}
        >
          {loading && (
            <div style={{ padding: "13px 16px", fontSize: 13, color: "var(--gray-400)", display: "flex", alignItems: "center", gap: 9 }}>
              <Loader2 size={14} className="animate-spin" style={{ color: "var(--blue)" }} /> Loading suggestions…
            </div>
          )}

          {!loading && suggestions.map((opt, i) => (
            <button
              key={opt.value}
              type="button"
              onMouseEnter={() => setHighlightIdx(i)}
              onClick={() => pick(opt)}
              style={{
                display: "flex", alignItems: "center", gap: 11,
                width: "100%", padding: big ? "13px 16px" : "9px 12px",
                fontSize: big ? 14 : 12.5, textAlign: "left",
                fontFamily: "inherit", cursor: "pointer", border: "none",
                background: i === highlightIdxClamped ? "var(--blue-bg)" : "#fff",
                color: "var(--gray-900)",
              }}
            >
              {opt.icon && (
                <span style={{ flexShrink: 0, color: i === highlightIdxClamped ? "var(--blue)" : "var(--gray-400)", display: "inline-flex" }}>
                  {opt.icon}
                </span>
              )}
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {highlight(opt.label, query)}
              </span>
              {opt.sub && (
                <span style={{ fontSize: 11, color: "var(--gray-400)", flexShrink: 0 }}>{opt.sub}</span>
              )}
            </button>
          ))}

          {!loading && suggestions.length === 0 && query.trim() && (
            <div style={{ padding: "13px 16px", fontSize: 13, color: "var(--gray-400)" }}>
              No matches for "{query.trim()}"
            </div>
          )}

          {footerLabel && (
            <>
              <div style={{ height: 1, background: "var(--gray-100)" }} />
              <button
                type="button"
                onClick={() => { onFooter?.(); setOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", gap: 11,
                  width: "100%", padding: big ? "13px 16px" : "9px 12px",
                  fontSize: big ? 14 : 12.5, textAlign: "left",
                  fontFamily: "inherit", cursor: "pointer", border: "none",
                  background: "#fff", color: "var(--gray-500)",
                }}
              >
                <span style={{ flexShrink: 0, display: "inline-flex", color: "var(--gray-400)" }}>
                  <X size={14} />
                </span>
                {footerLabel}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
