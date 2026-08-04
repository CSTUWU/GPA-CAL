import Register from "../components/auth/Register";
import { AUTH_TAGLINE } from "../components/auth/shared";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between items-center py-10 px-6 font-sans">
      {/* Spacer or empty div to push container down */}
      <div className="flex-grow flex items-center justify-center w-full my-8">
        <Register />
      </div>

      {/* Footer (aligned below the card) */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs mt-4 border-t border-slate-200/60 pt-6">
        <p>
          &copy; 2024 UniMate. {AUTH_TAGLINE}.
        </p>
        <div className="flex items-center gap-6">
          <a href="#support" className="hover:text-primary transition-colors">
            Support
          </a>
          <a href="#contact" className="hover:text-primary transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
