import { Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative py-20 md:py-28 bg-[radial-gradient(circle_at_top_right,rgba(59,34,217,0.05),transparent_40%),radial-gradient(circle_at_top_left,rgba(59,34,217,0.02),transparent_45%)] text-center bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#f0edff] border border-[#d2c9ff]/70 text-[#3b22d9] font-sans text-[10px] font-bold tracking-widest uppercase px-3.5 py-1.2 rounded-full mb-8">
          <Sparkles size={11} strokeWidth={2.5} className="text-[#3b22d9]" />
          <span>Version 2.0 Now Live</span>
        </div>

        {/* Heading */}
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[56px] leading-[1.1] md:leading-[1.15] tracking-tight max-w-4xl mx-auto mb-6 text-slate-900">
          Precision in <span className="text-primary">Academic Excellence.</span>
        </h1>

        {/* Description */}
        <p className="text-base md:text-[17px] leading-relaxed text-slate-500 max-w-2xl mx-auto mb-10">
          The complete GPA & CGPA management system for students and university
          administrators. Track progress, simulate outcomes, and manage
          curriculum with data-driven precision.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register" className="bg-primary text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-primary-hover hover:-translate-y-px hover:shadow-lg hover:shadow-primary/20 active:translate-y-0 active:shadow-sm transition-all duration-200 cursor-pointer w-full sm:w-auto text-center">
            Get Started - It's Free
          </Link>
          <button className="bg-white text-slate-800 border border-slate-200 font-semibold text-sm px-6 py-3.5 rounded-lg hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-px active:translate-y-0 transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto">
            <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center mr-0.5">
              <Play size={8} fill="currentColor" className="text-slate-800 translate-x-[0.5px]" />
            </span>
            View Admin Demo
          </button>
        </div>
      </div>
    </section>
  );
}
