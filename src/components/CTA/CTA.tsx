import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="relative overflow-hidden bg-primary rounded-3xl py-20 px-6 text-center text-white shadow-xl max-w-6xl mx-auto">
          {/* Decorative radial gradients */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_-50%,rgba(255,255,255,0.08),transparent_60%)]"></div>
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_150%,rgba(255,255,255,0.06),transparent_60%)]"></div>

          {/* Title */}
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-4 relative z-10">
            Ready to take control of your academic journey?
          </h2>

          {/* Description */}
          <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed relative z-10">
            Join thousands of students and administrators utilizing ScholarCalc to
            bring precision to degree management.
          </p>

          {/* Button */}
          <button className="bg-white text-primary border border-white hover:bg-slate-50 hover:shadow-lg hover:-translate-y-px active:translate-y-0 transition-all duration-200 font-semibold px-8 py-3 rounded-lg relative z-10 inline-flex items-center justify-center cursor-pointer">
            <span>Get Started Free</span>
            <ArrowRight size={16} strokeWidth={2.5} className="ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
