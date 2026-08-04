import { useEffect } from "react";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  maxWidth?: number;
  /** When false, hides the close button and disables Escape/backdrop close (blocking dialogs) */
  dismissible?: boolean;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, icon, title, subtitle, maxWidth = 440, dismissible = true, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen || !dismissible) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen, onClose, dismissible]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
        background: "rgba(15,23,42,0.45)",
        backdropFilter: "blur(4px)",
        animation: "fadeUp .18s ease-out both",
      }}
      onClick={dismissible ? onClose : undefined}
    >
      <div
        className="card animate-fade-in"
        style={{ width: "100%", maxWidth, overflow: "hidden" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="card-head" style={{ justifyContent: "space-between", padding: "14px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {icon && (
              <div
                style={{
                  width: 34, height: 34, borderRadius: "var(--r)",
                  background: "var(--blue-bg)", border: "1px solid var(--blue-border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--blue)", flexShrink: 0,
                }}
              >
                {icon}
              </div>
            )}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--gray-900)" }}>{title}</div>
              {subtitle && (
                <div style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 1 }}>{subtitle}</div>
              )}
            </div>
          </div>

          {dismissible && (
            <button onClick={onClose} aria-label="Close dialog" className="modal-close">
              <X size={16} />
            </button>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
