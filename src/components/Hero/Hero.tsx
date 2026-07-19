import { Play, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative py-20 md:py-28 bg-[radial-gradient(circle_at_top_right,var(--color-primary-light),transparent_40%),radial-gradient(circle_at_top_left,rgba(59,34,217,0.02),transparent_45%)] text-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary-light border border-primary-border text-primary font-sans text-[11px] font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-8">
          <Sparkles size={12} strokeWidth={2.5} className="text-primary" />
          <span>Version 2.0 Now Live</span>
        </div>

        {/* Heading */}
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[56px] leading-[1.1] md:leading-[1.15] tracking-tight max-w-4xl mx-auto mb-6 text-slate-900">
          Precision in <span className="text-primary">Academic Excellence.</span>
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto mb-10">
          The complete GPA & CGPA management system for students and university
          administrators. Track progress, simulate outcomes, and manage
          curriculum with data-driven precision.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-primary text-white font-semibold text-[15px] px-8 py-3.5 rounded-lg hover:bg-primary-hover hover:-translate-y-px hover:shadow-lg hover:shadow-primary/25 active:translate-y-0 active:shadow-md transition-all duration-200 cursor-pointer w-full sm:w-auto">
            Get Started - It's Free
          </button>
          <button className="bg-white text-slate-900 border border-slate-200 font-semibold text-[15px] px-8 py-3.5 rounded-lg hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-px active:translate-y-0 transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto">
            <Play size={16} fill="currentColor" />
            View Admin Demo
          </button>
        </div>
      </div>
    </section>
  );
}
