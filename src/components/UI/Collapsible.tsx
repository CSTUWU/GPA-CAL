import { ChevronDown, ChevronUp } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

interface CollapsibleProps {
  open: boolean;
  onToggle: () => void;
  /** Full-width toggle button content (chevron is appended by the component) */
  header: ReactNode;
  children: ReactNode;
  /** Extra style for the toggle button */
  headerStyle?: CSSProperties;
  /** Extra style for the expanded body */
  bodyStyle?: CSSProperties;
  /** Draw a divider between the header and body */
  bodyDivider?: boolean;
  chevronSize?: number;
  ariaLabel?: string;
}

export default function Collapsible({
  open, onToggle, header, children, headerStyle, bodyStyle, bodyDivider = true, chevronSize = 14, ariaLabel,
}: CollapsibleProps) {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={ariaLabel}
        style={{
          width: "100%", padding: "10px 14px",
          display: "flex", alignItems: "center", gap: 8,
          border: "none", background: "none", cursor: "pointer", fontFamily: "inherit",
          ...headerStyle,
        }}
      >
        {header}
        {open
          ? <ChevronUp size={chevronSize} style={{ color: "var(--gray-400)", flexShrink: 0 }} />
          : <ChevronDown size={chevronSize} style={{ color: "var(--gray-400)", flexShrink: 0 }} />}
      </button>
      {open && (
        <div
          className="animate-fade-in"
          style={bodyDivider ? { borderTop: "1px solid var(--gray-200)", ...bodyStyle } : bodyStyle}
        >
          {children}
        </div>
      )}
    </>
  );
}
