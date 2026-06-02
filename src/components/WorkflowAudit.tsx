import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { CheckSquare, Square, ShieldAlert, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';

interface AuditItem {
  id: string;
  label: string;
  detail: string;
  multiplierWeight: number; // Impact factor on readiness/leak
}

const auditChecklist: AuditItem[] = [
  {
    id: "phone-reminders",
    label: "Manual phone confirmations",
    detail: "Staff spends hours making manual confirmation calls or sending non-interactive SMS broadcasts daily.",
    multiplierWeight: 20
  },
  {
    id: "online-booking",
    label: "No automated online self-scheduling",
    detail: "Patients can only book or reschedule during rigid clinic phone hours, creating massive booking friction.",
    multiplierWeight: 25
  },
  {
    id: "waitlist-rescue",
    label: "No automated cancellation rescue",
    detail: "Cancellations leave slots empty. There is no instant waitlist broadcast to fill vacancy slots immediately.",
    multiplierWeight: 15
  },
  {
    id: "phone-time",
    label: "Front-desk phone overload (>2 hrs/day)",
    detail: "Receptionists spend critical operational hours answering routine rescheduling or appointment FAQs.",
    multiplierWeight: 20
  },
  {
    id: "re-engagement",
    label: "No dynamic overdue patient recall",
    detail: "Patients overdue for cleanings or routine specialist setups are not automatically re-engaged via smart outreach.",
    multiplierWeight: 20
  }
];

export default function WorkflowAudit() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleAuditItem = (id: string) => {
    setSelectedIds(current =>
      current.includes(id) 
        ? current.filter(item => item !== id) 
        : [...current, id]
    );
  };

  const auditStats = useMemo(() => {
    let vulnerabilityScore = 15; // baseline leakage
    selectedIds.forEach(id => {
      const item = auditChecklist.find(c => c.id === id);
      if (item) {
        vulnerabilityScore += item.multiplierWeight;
      }
    });

    const readinessScore = 100 - vulnerabilityScore;

    let diagnosis = "Optimized Operational Health";
    let message = "Your clinic already utilizes modern practices! However, fine-tuning your automated conversational scheduling nodes can still extract an additional 5-10% of gross efficiency.";
    let colorClass = "text-emerald-400";
    let glowClass = "shadow-emerald-500/10";

    if (vulnerabilityScore > 65) {
      diagnosis = "Critical Efficiency Leakage";
      message = "High vulnerability. Hand-scheduling and manual outreach are causing significant booking dropouts. An automated conversational AI assistant with list-rescue workflows is highly recommended.";
      colorClass = "text-red-400";
      glowClass = "shadow-red-500/10 border-red-500/20";
    } else if (vulnerabilityScore > 35) {
      diagnosis = "Moderate Operational Drag";
      message = "Moderate vulnerability. Your staff handles considerable structural drag. Implementing direct AI self-scheduling bridges could reclaim up to 10 admin hours per week.";
      colorClass = "text-yellow-400";
      glowClass = "shadow-yellow-500/10 border-yellow-500/20";
    }

    return {
      vulnerabilityScore,
      readinessScore,
      diagnosis,
      message,
      colorClass,
      glowClass
    };
  }, [selectedIds]);

  return (
    <section id="workflow-audit" className="mt-32 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Clinic Workflow <span className="silver-gradient">Vulnerability Audit</span>
          </h2>
          <p className="text-slate-500 max-w-xl text-sm">
            Check the administrative challenges custom to your clinic to calculate your dynamic live AI Vulnerability Index.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-slate-400">
          <ShieldAlert size={14} className="text-slate-400 animate-pulse" /> Live Operational Diagnostic
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        {/* Interactive Checklist */}
        <div className="glass-card p-8 md:p-10 flex flex-col justify-between gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider text-slate-400">Identify Bleeding Workflows</h3>
            <div className="space-y-4">
              {auditChecklist.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleAuditItem(item.id)}
                    className={`w-full text-left flex gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? 'bg-white/5 border-white/20 shadow-lg' 
                        : 'bg-transparent border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5 text-white">
                      {isSelected 
                        ? <CheckSquare size={20} className="text-white" /> 
                        : <Square size={20} className="text-slate-600" />
                      }
                    </div>
                    <div className="space-y-1">
                      <span className={`block font-bold text-sm md:text-base leading-tight transition-colors ${
                        isSelected ? 'text-white' : 'text-slate-400'
                      }`}>
                        {item.label}
                      </span>
                      <span className="block text-xs text-slate-500 leading-relaxed">
                        {item.detail}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-xs text-slate-600 uppercase font-medium tracking-widest leading-relaxed">
            * Selected weights represent standardized 2026 scheduling friction indices across 1,200 private practices.
          </div>
        </div>

        {/* Live Diagnostics Card */}
        <div className={`glass-card p-8 md:p-12 flex flex-col justify-between relative overflow-hidden border transition-all duration-500 bg-gradient-to-b from-white/[0.01] to-white/[0.03] shadow-2xl ${auditStats.glowClass}`}>
          {/* Subtle background graphics */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/[0.01] blur-3xl rounded-full" />

          <div className="space-y-8 relative z-10">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-white" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Live AI Diagnostic Report</h3>
            </div>

            <div className="space-y-4">
              <span className={`text-[11px] font-bold uppercase tracking-[0.25em] px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 inline-block ${auditStats.colorClass}`}>
                {auditStats.diagnosis}
              </span>
              <div className="text-5xl md:text-7xl font-bold font-display tracking-tighter text-white">
                {auditStats.vulnerabilityScore}%
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mt-2">Vulnerability index</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "15%" }}
                  animate={{ width: `${auditStats.vulnerabilityScore}%` }}
                  className={`h-full ${
                    auditStats.vulnerabilityScore > 65 
                      ? 'bg-gradient-to-r from-red-500 to-red-400' 
                      : auditStats.vulnerabilityScore > 35 
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' 
                        : 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                  }`}
                />
              </div>
              <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                <span>Safe</span>
                <span>Critical Leak</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <p className="text-sm font-semibold text-white leading-relaxed">
                {auditStats.message}
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 relative z-10">
            <a 
              href="#roadmap-anchor" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('roadmap-anchor')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <AlertCircle size={18} className="text-slate-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Generate Leak Prevention Plan</span>
              </div>
              <ArrowUpRight size={16} className="text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
