import { motion } from 'motion/react';
import { ClipboardList, ArrowDownCircle, RefreshCw, Layers, CalendarCheck, ShieldCheck } from 'lucide-react';

interface ActionPlanProps {
  noShows: number;
  revPerAppt: number;
  staffHours: number;
  stats: {
    yearlyLeak: number;
    aiRecoveryPotential: number;
    manualTimeCost: number;
    aiTimeRecovery: number;
    totalBenefit: number;
    recoveryPercentage: number;
  };
}

export default function ActionPlan({ noShows, revPerAppt, staffHours, stats }: ActionPlanProps) {
  const monthlyLeak = noShows * revPerAppt;
  const yearlyLeakHours = staffHours * 52;

  return (
    <section id="action-plan" className="mt-32 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Your Personalized <span className="silver-gradient">Clinical Action Plan</span>
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto text-sm">
          A dynamic operational diagnostic computed in real-time based on your specific practice metrics.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Damage Breakdown */}
        <div className="lg:col-span-4 glass-card p-8 md:p-10 flex flex-col justify-between bg-white/[0.01]">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <ClipboardList className="text-slate-400" size={24} />
              <h3 className="font-bold text-white uppercase tracking-wider text-sm select-none">Friction Diagnostics</h3>
            </div>

            <div className="space-y-6">
              {/* Monthly No-Show Leak */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Monthly No-Show Damage</span>
                <span className="block text-2xl font-bold text-white">${monthlyLeak.toLocaleString()}</span>
                <p className="text-xs text-slate-400 leading-normal">
                  Friction in cancellation and rescheduling paths is costing you approximately <span className="text-red-400 font-semibold">${monthlyLeak.toLocaleString()}</span> every single month.
                </p>
              </div>

              {/* Annual Time Sink */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Annual Administrative Sink</span>
                <span className="block text-2xl font-bold text-white">{yearlyLeakHours.toLocaleString()} Hours</span>
                <p className="text-xs text-slate-400 leading-normal">
                  Staff spends <span className="text-yellow-400 font-semibold">{yearlyLeakHours.toLocaleString()} hours</span> per year manually handling appointment bookings and coordinate tasks.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest select-none">
            <ArrowDownCircle size={14} /> Scroll down for treatment
          </div>
        </div>

        {/* Right Side: The 3-Step Treatment Plan */}
        <div className="lg:col-span-8 glass-card p-8 md:p-12 space-y-10 bg-gradient-to-br from-white/[0.01] to-white/[0.03]">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">3-Point AI Treatment Prescription</h3>
            <p className="text-slate-500 text-sm">Targeted operational pathways to heal revenue leakage instantly.</p>
          </div>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-base select-none shrink-0">
                01
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h4 className="font-bold text-white text-lg">Deploy Conversational Scheduling Bridges</h4>
                  <span className="px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[9px] font-extrabold uppercase tracking-widest text-emerald-400">
                    High Impact
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Integrating automated conversational channels permits patients to cancel or reschedule appointments within seconds directly via text. This recovers approximately <span className="text-white font-semibold">${Math.round(stats.aiRecoveryPotential).toLocaleString()}</span> in lost chair appointments.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-base select-none shrink-0">
                02
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h4 className="font-bold text-white text-lg">Automate Booking Operations & Recall</h4>
                  <span className="px-2.5 py-0.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-[9px] font-extrabold uppercase tracking-widest text-blue-400">
                    10x Productivity
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Offload routine calendar coordinates. This reclaims <span className="text-white font-semibold">{Math.round(staffHours * 52 * 0.9).toLocaleString()} administrative hours</span> yearly, allowing receptionists to prioritize physical care delivery and high-value patient checkouts.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-base select-none shrink-0">
                03
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h4 className="font-bold text-white text-lg">Active Slot Optimization & Waitlist Rescue</h4>
                  <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                    Smart Fill
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Install a dynamic standby queue rescue mechanism. If a patient cancels at late notice, the AI automatically pings suitable standby queue users or overdue checkups, filling the chair immediately with zero manual receptionist effort.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-wrap gap-8 justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
            <span className="flex items-center gap-2">
              <ShieldCheck className="text-slate-500" size={16} /> Total Benefit Reclaimed: <span className="text-emerald-400">${Math.round(stats.totalBenefit).toLocaleString()} / yr</span>
            </span>
            <span className="flex items-center gap-2">
              <CalendarCheck className="text-slate-500" size={16} /> Efficiency Quotient Boost: <span className="text-white">{Math.round(stats.recoveryPercentage)}%</span>
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
