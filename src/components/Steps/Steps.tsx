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
            <div className="w-[88px] h-[88px] rounded-2xl border border-slate-200 flex items-center justify-center mb-8 bg-white shadow-sm group-hover:border-primary-border group-hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-purple-50/50 text-[#aa3bff] border border-purple-100">
                <UserCircle size={32} strokeWidth={1.8} />
              </div>
            </div>
            <h4 className="font-heading font-bold text-lg text-slate-900 mb-3">1. Create Profile</h4>
            <p className="text-sm text-slate-600 leading-relaxed max-w-[280px]">
              Select your degree program and specialization track from
              institutional templates.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center flex flex-col items-center group">
            <div className="w-[88px] h-[88px] rounded-2xl border border-slate-200 flex items-center justify-center mb-8 bg-white shadow-sm group-hover:border-primary-border group-hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-blue-50/50 text-[#3b82f6] border border-blue-100">
                <FileText size={32} strokeWidth={1.8} />
              </div>
            </div>
            <h4 className="font-heading font-bold text-lg text-slate-900 mb-3">2. Log Marks</h4>
            <p className="text-sm text-slate-600 leading-relaxed max-w-[280px]">
              Enter your grades rapidly. The system handles all exception logic
              like repeats or medical absences.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center flex flex-col items-center group">
            <div className="w-[88px] h-[88px] rounded-2xl border border-primary flex items-center justify-center mb-8 bg-primary shadow-sm group-hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-primary text-white">
                <BarChart3 size={32} strokeWidth={1.8} />
              </div>
            </div>
            <h4 className="font-heading font-bold text-lg text-slate-900 mb-3">3. Visualize Success</h4>
            <p className="text-sm text-slate-600 leading-relaxed max-w-[280px]">
              Instantly view your cumulative GPA, earned credits, and model
              future outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
