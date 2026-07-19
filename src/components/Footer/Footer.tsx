import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Section: Logo & Copyright */}
        <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
          <a href="/" className="flex items-center gap-2 font-heading font-extrabold text-lg text-primary transition-opacity hover:opacity-90">
            <GraduationCap size={24} strokeWidth={2.2} className="text-primary" />
            <span>ScholarCalc</span>
          </a>
          <p className="text-xs md:text-sm text-slate-400">
            &copy; 2024 ScholarCalc. Precision in Academic Excellence.
          </p>
        </div>

        {/* Right Section: Navigation Links */}
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <a href="#privacy" className="text-xs md:text-sm font-medium text-slate-400 hover:text-primary transition-colors duration-200">
            Privacy Policy
          </a>
          <a href="#terms" className="text-xs md:text-sm font-medium text-slate-400 hover:text-primary transition-colors duration-200">
            Terms of Service
          </a>
          <a href="#support" className="text-xs md:text-sm font-medium text-slate-400 hover:text-primary transition-colors duration-200">
            Support
          </a>
          <a href="#contact" className="text-xs md:text-sm font-medium text-slate-400 hover:text-primary transition-colors duration-200">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
