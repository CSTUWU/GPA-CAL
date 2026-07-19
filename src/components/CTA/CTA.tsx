import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-primary text-center text-white relative overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_-20%,rgba(255,255,255,0.06),transparent_50%)]"></div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_120%,rgba(255,255,255,0.05),transparent_50%)]"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Title */}
        <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-4 leading-tight">
          Ready to take control of your academic journey?
        </h2>

        {/* Description */}
        <p className="text-white/80 text-base md:text-[17px] max-w-2xl mx-auto mb-10 leading-relaxed">
          Join thousands of students and administrators utilizing ScholarCalc to
          bring precision to degree management.
        </p>

        {/* Button */}
        <button className="bg-white text-primary border border-white hover:bg-slate-50 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 font-semibold px-7 py-3.5 rounded-lg inline-flex items-center justify-center gap-2 cursor-pointer text-sm">
          <span>Get Started Free</span>
          <ArrowRight size={15} strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}
