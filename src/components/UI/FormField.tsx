import type { CSSProperties, ReactNode } from "react";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  /** Extra content rendered on the right side of the label row */
  labelRight?: ReactNode;
  /** Small helper text below the control */
  hint?: ReactNode;
  /** Vertical margin under the whole field group */
  marginBottom?: number;
  /** Spacing between the label row and the control */
  labelGap?: number;
  /** Extra style overrides for the label row */
  labelStyle?: CSSProperties;
  children: ReactNode;
}

const baseLabel: CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  color: "var(--gray-500)",
};

export default function FormField({
  label, htmlFor, labelRight, hint, marginBottom = 14, labelGap = 5, labelStyle, children,
}: FormFieldProps) {
  return (
    <div style={{ marginBottom }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: labelGap, ...labelStyle }}>
        <label htmlFor={htmlFor} style={baseLabel}>{label}</label>
        {labelRight}
      </div>
      {children}
      {hint && <p style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 5 }}>{hint}</p>}
    </div>
  );
}
