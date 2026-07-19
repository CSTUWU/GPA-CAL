import { User, Settings, Check, Cog } from "lucide-react";

export default function FeatureCards() {
  return (
    <section id="features" className="bg-slate-50 py-24 md:py-28">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl leading-tight tracking-tight text-slate-900 mb-4">
            Built for the entire academic ecosystem
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            Separate workspaces tailored to the exact needs of students navigating
            their degree, and administrators designing the curriculum.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Card 1: For Students */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all duration-300 flex flex-col">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-6 bg-purple-50 text-[#aa3bff]">
              <User size={20} strokeWidth={2.5} />
            </div>
            <h3 className="font-heading font-bold text-xl text-slate-900 mb-3">
              For Students: Personalized Tracker
            </h3>
            <p className="text-slate-600 text-[15px] leading-relaxed mb-8 flex-grow">
              Track grades, manage repeats with automatic capping logic, and
              visualize your GPA trend with clean analytics. Know exactly where
              you stand and what you need to achieve your goals.
            </p>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-sm font-semibold text-slate-900">
                <Check size={16} strokeWidth={3} className="text-[#aa3bff] mt-0.5 shrink-0" />
                <span>Interactive GPA Simulation</span>
              </li>
              <li className="flex items-start gap-3 text-sm font-semibold text-slate-900">
                <Check size={16} strokeWidth={3} className="text-[#aa3bff] mt-0.5 shrink-0" />
                <span>Automatic grade capping for repeated modules</span>
              </li>
              <li className="flex items-start gap-3 text-sm font-semibold text-slate-900">
                <Check size={16} strokeWidth={3} className="text-[#aa3bff] mt-0.5 shrink-0" />
                <span>Medical absence tracking</span>
              </li>
            </ul>
          </div>

          {/* Card 2: For Administrators */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all duration-300 flex flex-col">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-6 bg-blue-50 text-[#3b82f6]">
              <Settings size={20} strokeWidth={2.5} />
            </div>
            <h3 className="font-heading font-bold text-xl text-slate-900 mb-3">
              For Administrators: Curriculum Builder
            </h3>
            <p className="text-slate-600 text-[15px] leading-relaxed mb-8 flex-grow">
              Design degree programs, define specialization tracks, and manage
              credit weights with a robust administrative workspace designed for
              high-density academic structuring.
            </p>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-sm font-semibold text-slate-900">
                <Cog size={16} strokeWidth={2.5} className="text-[#3b82f6] mt-0.5 shrink-0" />
                <span>Define specialization branches</span>
              </li>
              <li className="flex items-start gap-3 text-sm font-semibold text-slate-900">
                <Cog size={16} strokeWidth={2.5} className="text-[#3b82f6] mt-0.5 shrink-0" />
                <span>Configure core vs. elective requirements</span>
              </li>
              <li className="flex items-start gap-3 text-sm font-semibold text-slate-900">
                <Cog size={16} strokeWidth={2.5} className="text-[#3b82f6] mt-0.5 shrink-0" />
                <span>Global grade point mappings</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
