import type { ButtonHTMLAttributes, CSSProperties, ReactNode, Ref } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "outline-blue" | "dashed" | "soft" | "danger-outline" | "icon-danger";
type ButtonSize = "xs" | "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  style?: CSSProperties;
  ref?: Ref<HTMLButtonElement>;
  children: ReactNode;
}

const SIZES: Record<ButtonSize, string> = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "btn-md",
};

export default function Button({
  variant = "secondary", size = "md", fullWidth, style, className, children, type = "button", ref, ...rest
}: ButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      className={`btn btn-${variant} ${SIZES[size]}${fullWidth ? " btn-block" : ""}${className ? ` ${className}` : ""}`}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
}
