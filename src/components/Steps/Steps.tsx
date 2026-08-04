import { UserCircle, FileText, BarChart3 } from "lucide-react";

export default function Steps() {
  return (
    <section className="py-24 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl leading-tight tracking-tight text-slate-900">
            Clear path to academic clarity
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="text-center flex flex-col items-center group">
            <div className="w-20 h-20 rounded-2xl border border-[#d2c9ff]/70 flex items-center justify-center mb-8 bg-[#f5f6ff] text-primary shadow-sm group-hover:border-primary/50 transition-all duration-300">
              <UserCircle size={28} strokeWidth={1.8} />
            </div>
            <h4 className="font-heading font-bold text-lg text-slate-900 mb-3">1. Create Profile</h4>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[280px]">
              Select your degree program and specialization track from
              institutional templates.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center flex flex-col items-center group">
            <div className="w-20 h-20 rounded-2xl border border-[#d2c9ff]/70 flex items-center justify-center mb-8 bg-[#f5f6ff] text-primary shadow-sm group-hover:border-primary/50 transition-all duration-300">
              <FileText size={28} strokeWidth={1.8} />
            </div>
            <h4 className="font-heading font-bold text-lg text-slate-900 mb-3">2. Log Marks</h4>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[280px]">
              Enter your grades rapidly. The system handles all exception logic
              like repeats or medical absences.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center flex flex-col items-center group">
            <div className="w-20 h-20 rounded-2xl bg-primary text-white flex items-center justify-center mb-8 shadow-sm group-hover:bg-primary-hover transition-all duration-300">
              <BarChart3 size={28} strokeWidth={1.8} />
            </div>
            <h4 className="font-heading font-bold text-lg text-slate-900 mb-3">3. Visualize Success</h4>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[280px]">
              Instantly view your cumulative GPA, earned credits, and model
              future outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
