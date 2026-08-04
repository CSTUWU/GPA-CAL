import type { CSSProperties } from "react";

interface EmptyStateProps {
  text: string;
  style?: CSSProperties;
}

export default function EmptyState({ text, style }: EmptyStateProps) {
  return (
    <p style={{ color: "var(--gray-400)", fontSize: 13, textAlign: "center", padding: "20px 0", ...style }}>
      {text}
    </p>
  );
}
