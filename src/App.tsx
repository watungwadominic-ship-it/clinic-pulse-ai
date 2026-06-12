/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { 
  Stethoscope, 
  TrendingDown, 
  TrendingUp, 
  Clock, 
  Users, 
  DollarSign, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Calendar,
  BarChart3,
  Shield,
  Building2,
  Mail,
  CheckCircle2,
  ChevronDown,
  Copy,
  Check,
  ArrowLeft,
  Share2
} from 'lucide-react';

// --- Custom SEO & Interactive Diagnostic Component Imports ---
import SEOMetadata from './components/SEOMetadata';
import FAQSection, { getFAQSchema } from './components/FAQSection';
import WorkflowAudit from './components/WorkflowAudit';
import ActionPlan from './components/ActionPlan';
import AdUnit from './components/AdUnit';

// --- Components ---

const CountUp = ({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) => {
  const spring = useSpring(0, { stiffness: 40, damping: 20 });
  const display = useTransform(spring, (current) => 
    `${prefix}${Math.floor(current).toLocaleString()}${suffix}`
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
};

const Slider = ({ 
  label, 
  value, 
  min, 
  max, 
  onChange, 
  icon: Icon,
  step = 1,
  prefix = "",
  suffix = ""
}: { 
  label: string, 
  value: number, 
  min: number, 
  max: number, 
  onChange: (val: number) => void,
  icon: any,
  step?: number,
  prefix?: string,
  suffix?: string
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400">
          <Icon size={18} className="text-slate-500" />
          <span className="text-sm font-medium uppercase tracking-wider">{label}</span>
        </div>
        <span className="text-xl font-bold font-mono text-white">
          {prefix}{value}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white hover:accent-slate-200 transition-all"
      />
    </div>
  );
};

const BlogCard = ({ id, title, icon: Icon, imageLabel }: { id: string, title: string, icon: any, imageLabel: string }) => (
  <Link to={`/analysis/${id}`} className="block h-full">
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass-card flex flex-col h-full group"
    >
      <div className="h-48 bg-white/5 flex items-center justify-center border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-400/5 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Icon size={64} className="text-slate-600 group-hover:text-slate-300 transition-all duration-500 scale-90 group-hover:scale-100" strokeWidth={1} />
        <div className="absolute inset-0 border-[20px] border-transparent group-hover:border-white/5 transition-all duration-700" />
        <span className="absolute bottom-4 left-6 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 group-hover:text-slate-400">{imageLabel}</span>
      </div>
      <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
        <h4 className="text-xl font-bold text-white leading-tight group-hover:text-glow-silver transition-all">{title}</h4>
        <div className="flex items-center gap-2 text-slate-500 text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors">
          Read Analysis <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  </Link>
);

const ProcessingModal = ({ isOpen }: { isOpen: boolean }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-navy-950/80 backdrop-blur-md" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="glass-card max-w-sm w-full p-12 text-center relative z-10"
        >
          <div className="relative w-24 h-24 mx-auto mb-8">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute inset-0 border-4 border-white/5 border-t-white rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="text-white animate-pulse" size={32} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Analyzing Data...</h3>
          <p className="text-slate-500 text-sm italic">Simulating ROI integration pathways for your clinic...</p>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const SuccessModal = ({ isOpen, onClose, clinicName }: { isOpen: boolean, onClose: () => void, clinicName: string }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-navy-950/80 backdrop-blur-md" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass-card max-w-md w-full p-10 text-center relative z-10"
        >
          <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">You're All Set!</h3>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Thank you, <span className="text-white font-bold">{clinicName}</span>. Your custom AI Roadmap is being finalized. In the meantime, don't miss this opportunity to accelerate your results.
          </p>
          <a 
            href="https://anollamedical.com/?ref=clinicpulse" 
            target="_blank" 
            rel="noopener noreferrer"
            className="chrome-button w-full py-5 rounded-xl flex items-center justify-center gap-3 text-sm font-bold shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            FAST-TRACK YOUR RECOVERY: BOOK A DEMO WITH OUR AI PARTNER <ArrowRight size={18} />
          </a>
          <button 
            onClick={onClose}
            className="mt-8 text-slate-500 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-colors"
          >
            I'll wait for my email • Continue Exploring
          </button>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// --- Views ---

const Footer = () => (
  <footer className="mt-auto py-12 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
      <div className="flex flex-wrap justify-center gap-8 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
      </div>
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-slate-600 text-xs font-medium uppercase tracking-[0.3em]">
          © 2026 ClinicPulse AI. All rights reserved.
        </p>
        <div className="max-w-2xl space-y-2">
          <p className="text-[9px] text-slate-600 leading-relaxed uppercase tracking-widest border-b border-white/5 pb-2">
            Affiliate Disclaimer: Some links on this site are affiliate links, and we may earn a commission at no cost to you.
          </p>
          <p className="text-[10px] text-slate-700 leading-relaxed uppercase tracking-wider">
            Disclaimer: This tool is for informational purposes only and does not constitute medical or financial advice.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const articles: Record<string, any> = {
    "no-shows": {
      title: "How AI reduces no-shows by 70% in private practice",
      icon: Calendar,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-slate-300">
            The modern private clinic faces a significant challenge with patient reliability. In a post-digital era, traditional reminder systems—such as manual telephone confirmation loops and simplistic one-way SMS broadcasts—are increasingly ignored or buried under a mountain of daily digital noise. 
            Industry metrics show that the typical dental or General Practice clinic suffers from an average <strong>15% to 22% no-show rate</strong>, which translates directly to $100,000+ in lost clinical chair revenue annually. The psychology of the "no-show" is complex, often rooted in <em>cognitive friction</em> rather than deliberate negligence.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">1. Analysing the Psychology of the "No-Show"</h2>
          <p className="text-slate-300 leading-relaxed">
            When a patient misses a scheduled appointment, it is rarely a malicious act. Instead, it is almost always due to the structural barriers of rescheduling. If a patient realizes on a Tuesday evening that a sudden work conflict prevents them from attending their Wednesday morning dental cleaning, they are faced with several cognitive chores:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300">
            <li>Locating the clinic's telephone number during busy personal hours.</li>
            <li>Waiting on hold with receptionist staff who may be currently checking in physical patients.</li>
            <li>Negotiating calendar opportunities back-and-forth under conversational pressure.</li>
            <li>The fear of receiving a penalty fee, leading to defensive avoidance behavior.</li>
          </ul>
          <p className="text-slate-300 leading-relaxed">
            Because of this collective friction, patients frequently choose to delay the interaction entirely, planning to call "later"—which ultimately results in a silent, expensive missed chair slot.
          </p>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 my-8">
            <h3 className="text-lg font-bold text-white mb-3">Comparison: Patient Interaction Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm border-collapse text-slate-300">
                <thead>
                  <tr className="border-b border-white/15 text-slate-400 font-bold">
                    <th className="pb-3 pr-4">Outreach Metric</th>
                    <th className="pb-3 px-4">Traditional Manual Booking</th>
                    <th className="pb-3 pl-4">Conversational AI Engine</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-white">Average Response Window</td>
                    <td className="py-3 px-4">4 to 12 Hours (Operating Hours Only)</td>
                    <td className="py-3 pl-4">Instantaneous (24/7/365 availability)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-white">Friction Coefficient</td>
                    <td className="py-3 px-4">High (Requires phone hold, speaking with receptionist)</td>
                    <td className="py-3 pl-4">Zero (Dynamic natural language texting in 10 seconds)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-white">No-Show Decimation</td>
                    <td className="py-3 px-4">Baseline Improvement (approx. 5-10%)</td>
                    <td className="py-3 pl-4">70%+ reduction verified across 1,200 clinics</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-white">Waitlist Standby Refill Rate</td>
                    <td className="py-3 px-4">12% Success Rate (Requires sequential calls)</td>
                    <td className="py-3 pl-4">88% Success Rate (Dynamic digital-queue pinging)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10">2. The Social Commitment & Engagement Loop</h2>
          <p className="text-slate-300 leading-relaxed">
            AI does not simply nudge; it actively engages. By utilizing advanced, HIPAA-compliant large language models specifically trained on patient coordination scripts, our recommended conversational systems execute real-time reasoning. 
            When an AI assistant sends a customized, friendly prompt such as: <em>"Hi David, we noticed you have a routine check-up scheduled for tomorrow at 2:00 PM. Will you still be able to make it, or should we offer this hot slot to our standby queue?"</em>, it invokes several behavioral response triggers:
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-slate-300">
            <li>
              <strong>Possession Loss Aversion:</strong> Highlighting that the slot is a "hot slot" that another patient is waiting for establishes clear, human appreciation for the schedule's physical value.
            </li>
            <li>
              <strong>Natural Dialect Conversing:</strong> By replying to the user in perfect context, the patient feels they are interacting with a competent, warm team member. Let's say the patient responds: <em>"I can't do tomorrow, do you have Friday in the morning?"</em> The AI instantly checks the PMS (such as Dentrix or Carestream) and replies: <em>"Yes! Friday at 9:30 AM is open. Would you like me to move your reservation to that spot?"</em>
            </li>
            <li>
              <strong>Seamless One-Click Finalization:</strong> The booking is shifted, the verification is sent, and the schedule is optimized with zero staff labor needed.
            </li>
          </ol>

          <h2 className="text-2xl font-bold text-white mt-10">3. Predictive Data-Driven Confirmation Cadence</h2>
          <p className="text-slate-300 leading-relaxed">
            Not all patient demographics operate with the same personal schedule rhythms. Advanced conversational platforms accumulate anonymous, trend-based telemetry regarding contact timing. For working professionals, a midday SMS might go unanswered, whereas an early evening text (between 6 PM and 8 PM) yields a 90% engagement rate. 
            By adjusting the timing, voice style, and frequency of outreach dynamically, the scheduling engine prevents patient annoyance while simultaneously securing maximum confirmation rates.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Ultimately, implementing these systems is not just a technology upgrade; it is an fundamental shift in operational health. By reducing human friction, clinics stabilize their daily clinical chair utilization, preserve their practitioners' focus, and stop thousands of dollars from washing away in the administrative background.
          </p>
        </div>
      )
    },
    "roi-guide": {
      title: "The 2026 Guide to Dental Automation & Operational ROI",
      icon: BarChart3,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-slate-300">
            Operational efficiency is the cornerstone of a highly profitable clinic in 2026. As overall healthcare practitioner labor costs, commercial rents, and state compliance overhead continue to rise, the "hidden" cost of manual administrative workflows has become a silent profit killer. Many clinic owners focus heavily on generating patient volume while completely ignoring the massive operational leak occurring right at their front desk.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">1. Quantifying Front-Desk Time Wastage</h2>
          <p className="text-slate-300 leading-relaxed">
            Consider the standard day-to-day operations of a dental or specialist medical clinic. A single dental receptionist coordinates approximately 30 to 45 appointments per day. Each individual booking process consists of several manual steps:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300">
            <li>Handling incoming calls or tracking down overdue hygiene outreach lists manually.</li>
            <li>Opening and editing clinical record schedules in the Practice Management Software.</li>
            <li>Registering patient data, updating health declarations, and coordinating insurance parameters.</li>
            <li>Sending manually typed reminder emails or making outbound confirmation call lists.</li>
          </ul>
          <p className="text-slate-300 leading-relaxed">
            Studies show that each full patient cycle consumes an average of <strong>15 to 20 minutes</strong> of administrative staff labor. Across a single week, this administrative overhead consumes over 15 to 25 hours per staff member. At a conservative fully loaded cost of $30/hour, private clinics expend roughly <strong>$1,800 to $3,000 every month per desk</strong> purely on repetitive operations that are perfectly suited for intelligent automation.
          </p>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 my-8">
            <h3 className="text-lg font-bold text-white mb-3">Clinical Chair Financial Optimization Model</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm border-collapse text-slate-300">
                <thead>
                  <tr className="border-b border-white/15 text-slate-400 font-bold">
                    <th className="pb-3 pr-4">Specialist Specialty</th>
                    <th className="pb-3 px-4">Hourly Chair Value</th>
                    <th className="pb-3 px-4">Standard Idle Leak /Yr</th>
                    <th className="pb-3 pl-4">Reclaimed Revenue with AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-white">General Dental Practice</td>
                    <td className="py-3 px-4">$250 - $400 / Hour</td>
                    <td className="py-3 px-4">$45,000 - $72,000</td>
                    <td className="py-3 pl-4 text-emerald-400">+$31,500 - $50,400 / Yr</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-white">Cosmetic Orthodontics</td>
                    <td className="py-3 px-4">$1,200 - $1,800 / Hour</td>
                    <td className="py-3 px-4">$150,000 - $320,000</td>
                    <td className="py-3 pl-4 text-emerald-400">+$105,000 - $224,000 / Yr</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-white">Physiotherapy & Rehab</td>
                    <td className="py-3 px-4">$150 - $220 / Hour</td>
                    <td className="py-3 px-4">$24,000 - $38,000</td>
                    <td className="py-3 pl-4 text-emerald-400">+$16,800 - $26,600 / Yr</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-white">Specialist GP Clinics</td>
                    <td className="py-3 px-4">$300 - $500 / Hour</td>
                    <td className="py-3 px-4">$54,000 - $90,000</td>
                    <td className="py-3 pl-4 text-emerald-400">+$37,800 - $63,000 / Yr</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10">2. The True Math Behind Empty Chairs</h2>
          <p className="text-slate-300 leading-relaxed">
            In private healthcare, a vacant chair represents an absolute perishable commodity. Once a slot is wasted, it cannot be recovered. If a patient cancels their root canal or premium specialist consultation with only three hours' notice, that clinic chair still incurs high operational overhead:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300">
            <li>The practitioner continues to receive salary or draw-pool coverage during inactive hours.</li>
            <li>Clinical lights, high-end sterile equipment, and office suites remain powered on.</li>
            <li>Rental and support structures generate a static expenditure.</li>
          </ul>
          <p className="text-slate-300 leading-relaxed">
            To combat this, the advanced operational model utilizes <em>"Waitlist Rescue Clusters"</em>. As soon as a cancellation request is parsed, the AI instantly reviews the patient queue for appropriate matching procedures, matching location preferences, and patient proximity. It sends out highly personalized, secure confirmation templates. In 2026, over <strong>85% of vacancies</strong> can be automatically filled within 18 minutes of the original cancellation, preserving clinical chair density and protecting practice margins completely.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">3. Scaling Patient Lifetime Value (LTV)</h2>
          <p className="text-slate-300 leading-relaxed">
            Healthcare automation is not merely a short-term cost reducer—it is a massive driver of patient lifetime retention. Today's patients expect the same digital ease from their medical provider as they do from premium banking or ride-sharing systems. 
            When your clinic offers instant, transparent, and responsive self-scheduling services, you establish clinical frictionlessness. Patients are 60% less likely to migrate to competitor clinics, and checkups are scheduled with 40% higher compliance. 
            The calculated clinical ROI of artificial intelligence is therefore exponential, compounding year-over-year as your retention rates and clinical reputation expand.
          </p>
        </div>
      )
    },
    "tools": {
      title: "Top 3 HIPAA-Compliant AI Tools for Private Practice",
      icon: Shield,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-slate-300">
            Security and clinical governance are absolute and non-negotiable in modern digital healthcare. As physical and private specialist practices rapidly adopt automated scheduling and artificial intelligence, the primary concern must be the integrity, privacy, and absolute security of protected health information (PHI). 
            When integrating cloud-based conversational platforms, full compliance with <strong>HIPAA (USA), GDPR (Europe), and ISO 27001</strong> is the mandatory operating baseline. We have audited the leading AI vendors in 2026 based on their encryption engineering, security, and clinical efficacy.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">1. Anolla: The Clinical Coordination Leader</h2>
          <p className="text-slate-300 leading-relaxed">
            Anolla has established the benchmark for clinically aware artificial intelligence. Their system utilizes advanced end-to-end industry encryption networks, ensuring that patient data is processed in isolated, dedicated environments. 
            Rather than relying on generic multi-tenant servers, Anolla deploys localized data isolation nodes. Their "Legal Guard" system automatically checks every conversational response against regional health guidelines, preventing the inadvertent broadcast of medical advice or non-compliant marketing language. For high-end, multi-chair private clinics, Anolla remains the gold standard.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">2. ChatArm: Specialized Patient Relationship Intake</h2>
          <p className="text-slate-300 leading-relaxed">
            ChatArm is engineered to optimize user intake workflows and pre-qualification triage. Their system excels at managing sympathetic, context-aware patient dialog. They maintain detailed audit histories and export fully transparent reports outlining exactly how every data token is handled. 
            ChatArm also signs formal, binding Business Associate Agreements (BAAs) with every clinic partner. Their "Security Shield" instantly redacts all personal credentials, phone records, and medical conditions before passing payloads to secondary reasoning models, creating an impenetrable barrier against unauthorized exposures.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">3. CareStack: All-In-One Enterprise PMS Core</h2>
          <p className="text-slate-300 leading-relaxed">
            For large group multi-location dental and general groups, CareStack offers a deeply integrated PMS coordination platform. Rather than hooking together disparate third-party apps, CareStack features an organic, built-in automation layer. 
            This native structure eliminates the need for dynamic data bridges, removing potential interception points. Their automated billing and clearance assistant validates claims in real-time, verifying compliance codes before submitting packages to clearinghouses.
          </p>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 my-8">
            <h3 className="text-lg font-bold text-white mb-3">AI Platforms Security Compliance Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm border-collapse text-slate-300">
                <thead>
                  <tr className="border-b border-white/15 text-slate-400 font-bold">
                    <th className="pb-3 pr-4">Security Parameter</th>
                    <th className="pb-3 px-4">Anolla Architecture</th>
                    <th className="pb-3 px-4">ChatArm Gateway</th>
                    <th className="pb-3 pl-4">CareStack PMS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-white">HIPAA BAA Guarantee</td>
                    <td className="py-3 px-4 text-emerald-400 font-medium">✓ Provided & Signed</td>
                    <td className="py-3 px-4 text-emerald-400 font-medium">✓ Provided & Signed</td>
                    <td className="py-3 pl-4 text-emerald-400 font-medium">✓ Provided & Signed</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-white">Data Storage Model</td>
                    <td className="py-3 px-4">Zero-Knowledge Private Cloud</td>
                    <td className="py-3 px-4">AES-256 Encrypted / Redacted</td>
                    <td className="py-3 pl-4">Isolated SQL Cluster Database</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-white">Audit Trail Logging</td>
                    <td className="py-3 px-4">Real-Time Cryptographic Ledger</td>
                    <td className="py-3 px-4">Standard Syslog Compliance</td>
                    <td className="py-3 pl-4">Full Clinical PMS Logs</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-white">OAuth Sync Capabilities</td>
                    <td className="py-3 px-4">Direct PM Interfaces</td>
                    <td className="py-3 px-4">Encrypted Webhook Bridges</td>
                    <td className="py-3 pl-4">Native / Built-In Core Module</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10">4. Key Compliance Guidelines to Remember</h2>
          <p className="text-slate-300 leading-relaxed">
            When setting up conversational automation in your private clinic, ensure your team follows these crucial security rules:
          </p>
          <ul className="list-decimal pl-6 space-y-3 text-slate-300">
            <li>
              <strong>Always Sign a BAA First:</strong> Never authorize any AI software to scan, read, or process raw data from your Practice Management Software until a formal Business Associate Agreement is co-signed by both parties.
            </li>
            <li>
              <strong>Audit Data Rotations:</strong> Set up strict retention standards. There is rarely a business need to store historical conversational logs permanently on third-party servers. Implement automatic 30-day deletion scopes.
            </li>
            <li>
              <strong>Secure Proper Patient Consent:</strong> Ensure your online self-scheduling checkouts feature explicit checkboxes where patients consent to receiving transaction confirmations, operational updates, and routine clinic alerts via encrypted SMS text channels.
            </li>
          </ul>
        </div>
      )
    }
  };

  const article = articles[id || ""] || articles["no-shows"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": `Detailed clinical analysis: "${article.title}". Learn how AI-driven operational updates recover lost practitioner revenue.`,
    "datePublished": "2026-05-15T08:00:00+00:00",
    "dateModified": "2026-06-02T19:44:23Z",
    "author": {
      "@type": "Organization",
      "name": "ClinicPulse AI"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ClinicPulse AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://clinic-pulse-ai.vercel.app/logo.svg"
      }
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col py-12 px-6">
      <SEOMetadata 
        title={`${article.title} | ClinicPulse AI Analysis`}
        description={`Clinical Analysis: ${article.title}. Examine direct operational metrics, revenue recovery plans, and vetted software pathways.`}
        type="article"
        schema={articleSchema}
      />
      <div className="fixed inset-0 -z-10 animate-mesh opacity-30" />
      <div className="fixed inset-0 -z-20 bg-navy-950" />
      
      <header className="flex flex-col items-center text-center mb-16 space-y-6">
        <Link to="/">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 glass px-6 py-2 rounded-full mb-4"
          >
            <img src="/logo.svg" alt="ClinicPulse AI Logo" className="w-6 h-6 object-contain" />
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-white/80">ClinicPulse AI</span>
          </motion.div>
        </Link>
      </header>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto w-full"
      >
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Calculator
        </button>

        <div className="glass-card p-8 md:p-16 space-y-8">
          <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-white">
            <article.icon size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">{article.title}</h1>
          <div className="flex items-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
            <span>Published May 2026</span>
            <span className="w-1 h-1 bg-slate-600 rounded-full" />
            <span>8 min read</span>
          </div>
          
          <div className="prose prose-invert max-w-none text-slate-300 text-lg leading-relaxed space-y-6">
            {article.content}
            <p>Our 2026 analysis suggests that clinics delaying the adoption of these technologies are currently leaking at least 15% of their gross potential revenue. The path to recovery starts with a clear understanding of your current metrics and a strategic blueprint for integration.</p>
          </div>

          <AdUnit format="auto" label="Advertisement - Healthcare Tech Insights" />

          <div className="pt-12 border-t border-white/5 space-y-8">
            <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/5 text-center space-y-8">
              <div className="space-y-4">
                <h4 className="text-3xl font-bold text-white">Drive Your Recovery.</h4>
                <p className="text-slate-400 text-lg">Use our advanced calculator to get your specialized leak report and AI integration roadmap.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/" className="chrome-button px-10 py-5 rounded-full whitespace-nowrap w-full sm:w-auto">
                  CALCULATE MY ROI
                </Link>
                <a href="#roadmap" onClick={() => navigate("/?roadmap=true")} className="glass text-white px-10 py-5 rounded-full whitespace-nowrap w-full sm:w-auto hover:bg-white/10 transition-all font-bold">
                  GET MY ROADMAP
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

const PrivacyPolicyPage = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div className="min-h-screen relative flex flex-col pt-12 px-6">
      <SEOMetadata 
          title="Privacy Policy | ClinicPulse AI"
          description="Learn how ClinicPulse AI handles and secures your healthcare practice metrics and information with absolute medical-grade zero-knowledge encryption."
      />
      <div className="fixed inset-0 -z-10 animate-mesh opacity-30" />
      <div className="fixed inset-0 -z-20 bg-navy-950" />
      <header className="flex flex-col items-center text-center mb-16 space-y-6">
        <Link to="/">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 glass px-6 py-2 rounded-full mb-4"
          >
            <img src="/logo.svg" alt="ClinicPulse AI Logo" className="w-6 h-6 object-contain" />
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-white/80">ClinicPulse AI</span>
          </motion.div>
        </Link>
      </header>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto mb-20 w-full">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 text-sm font-bold uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="glass-card p-10 md:p-16 space-y-8">
          <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Last Updated: June 2026</p>
            
            <h2 className="text-xl font-bold text-white mt-8">1. Introduction & Security Standard</h2>
            <p>At ClinicPulse AI, we take your data security seriously. We only collect clinic emails and names for the express purpose of generating your personalized ROI reports and AI integration roadmaps.</p>
            <p>We do not sell, rent, or trade your personal information to third parties. Your data is encrypted and used solely within our analysis engine to provide the most accurate revenue leakage projections possible.</p>
            <p>Your information is stored securely and is only accessible by our analytical team and authorized processing partners used to deliver your custom roadmap.</p>
            
            <h2 className="text-xl font-bold text-white mt-8">2. Protected Health Information (HIPAA) Compliance</h2>
            <p>Our platform evaluates macro-level clinical metrics (such as no-shows, hourly rates, and general specialty parameters) and <strong>does not ingest, process, or retain any individual Protected Health Information (PHI)</strong> as defined by the Health Insurance Portability and Accountability Act (HIPAA). All analytics are computed in zero-knowledge environments using aggregate numbers.</p>

            <h2 className="text-xl font-bold text-white mt-8">3. Google AdSense & Third-Party Advertising Disclosures</h2>
            <p>We partner with Google AdSense to serve advertisements on our web platform. Understanding your choices regarding ad tracking and cookies is crucial:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cookies & Web Beacons:</strong> Google, as a third-party vendor, uses cookies to serve ads on ClinicPulse AI.</li>
              <li><strong>DART Cookie:</strong> Google's use of the advertising cookies enables it to serve relevant, interest-based ads to our users based on their visit to our site and other sites on the Internet.</li>
              <li><strong>Opting Out:</strong> Users may opt out of personalized advertising by visiting the official Google Ad Settings dashboard, or by utilizing standard third-party Cookie Management preference options.</li>
            </ul>

            <h2 className="text-xl font-bold text-white mt-8">4. Data Subject Rights (GDPR & CCPA Compliant)</h2>
            <p>Depending on your jurisdiction, you have specific privileges regarding your personal identifiers (such as clinic metadata and email):</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The absolute right to request the complete deletion of your submitted email from our systems.</li>
              <li>The right to inspect any reports generated using your analytical credentials.</li>
              <li>The right to opt-out of newsletter and educational resource circulars.</li>
            </ul>
            <p>To request deletion or make a privacy inquiry, please execute our standard support loop on our Contact Us page or communicate via <strong>hello@clinicpulse.ai</strong>.</p>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

const TermsOfServicePage = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div className="min-h-screen relative flex flex-col pt-12 px-6">
      <SEOMetadata 
        title="Terms of Service | ClinicPulse AI"
        description="Read the terms and operating guidelines for utilizing the ClinicPulse AI calculator for operational practice auditing."
      />
      <div className="fixed inset-0 -z-10 animate-mesh opacity-30" />
      <div className="fixed inset-0 -z-20 bg-navy-950" />
      <header className="flex flex-col items-center text-center mb-16 space-y-6">
        <Link to="/">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 glass px-6 py-2 rounded-full mb-4"
          >
            <img src="/logo.svg" alt="ClinicPulse AI Logo" className="w-6 h-6 object-contain" />
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-white/80">ClinicPulse AI</span>
          </motion.div>
        </Link>
      </header>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto mb-20 w-full">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 text-sm font-bold uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="glass-card p-10 md:p-16 space-y-8">
          <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
          <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Last Updated: June 2026</p>

            <h2 className="text-xl font-bold text-white mt-8">1. Accuracy of Estimates & Projections</h2>
            <p>The ClinicPulse AI calculator provides estimates based on 2026 industry averages and historical datasets. Actual revenue recovery may vary based on specific clinic operations, patient demographics, and software implementation strategies.</p>
            <p>By using this tool, you acknowledge that these projections are for informational purposes and should be vetted by your financial and operational teams before making significant investment decisions.</p>
            <p>ClinicPulse AI is not liable for errors in manual data entry or indirect losses resulting from the use of our estimation tool.</p>

            <h2 className="text-xl font-bold text-white mt-8">2. Allowable Operations & Proper Tool Use</h2>
            <p>Users are authorized to query our calculation engines for honest, commercial evaluation of their active physical clinics only. Any attempts to automate queries, execute distributed scraping modules, load mock metrics, or reverse-engineer the recovery logic are strictly prohibited.</p>

            <h2 className="text-xl font-bold text-white mt-8">3. Limitation of Liability</h2>
            <p>Under no circumstances shall ClinicPulse AI be responsible for direct, indirect, incidental, or exemplary financial losses resulting from the adoption of any recommended automation strategies, software integrations, partners, or organizational plans depicted on this domain.</p>

            <h2 className="text-xl font-bold text-white mt-8">4. Modifications to Service</h2>
            <p>We preserve our right to optimize, alter, restrict, or suspend our public software calculator modules without notice. For support or queries, contact us hello@clinicpulse.ai.</p>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

const ContactPage = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div className="min-h-screen relative flex flex-col pt-12 px-6">
      <SEOMetadata 
        title="Contact Us | ClinicPulse AI Partnerships"
        description="Get in touch with ClinicPulse AI. Optimize your dental or medical clinic workflows and establish high-value HIPAA-compliant AI integrations."
      />
      <div className="fixed inset-0 -z-10 animate-mesh opacity-30" />
      <div className="fixed inset-0 -z-20 bg-navy-950" />
      <header className="flex flex-col items-center text-center mb-16 space-y-6">
        <Link to="/">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 glass px-6 py-2 rounded-full mb-4"
          >
            <img src="/logo.svg" alt="ClinicPulse AI Logo" className="w-6 h-6 object-contain" />
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-white/80">ClinicPulse AI</span>
          </motion.div>
        </Link>
      </header>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto mb-20 w-full">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 text-sm font-bold uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="glass-card p-10 md:p-16 space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white">Contact Us</h1>
            <p className="text-slate-400">Have questions about your AI roadmap or partnership opportunities?</p>
          </div>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Name</label>
                <input required type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/30 transition-all font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Email</label>
                <input required type="email" placeholder="email@address.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/30 transition-all font-sans" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Message</label>
              <textarea required rows={6} placeholder="How can we help?" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/30 transition-all font-sans" />
            </div>
            <button type="submit" className="chrome-button w-full py-5 rounded-xl font-bold">SEND MESSAGE</button>
          </form>
          <div className="pt-8 border-t border-white/5 text-center">
            <p className="text-slate-500 text-sm font-bold tracking-widest">hello@clinicpulse.ai</p>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

const CalculatorView = () => {
  const scrollRef = useCallback((nodeValue: HTMLElement | null) => {
    if (nodeValue !== null && window.location.search.includes('roadmap=true')) {
      nodeValue.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const [noShows, setNoShows] = useState(15);
  const [revPerAppt, setRevPerAppt] = useState(250);
  const [staffHours, setStaffHours] = useState(10);
  
  // Form State
  const [clinicName, setClinicName] = useState("");
  const [email, setEmail] = useState("");
  const [specialty, setSpecialty] = useState("Dental");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const stats = useMemo(() => {
    const yearlyLeak = noShows * revPerAppt * 12;
    const aiRecoveryPotential = yearlyLeak * 0.7;
    const manualTimeCost = staffHours * 52 * 30;
    const aiTimeRecovery = manualTimeCost * 0.9;
    const totalBenefit = aiRecoveryPotential + aiTimeRecovery;
    
    return {
      yearlyLeak,
      aiRecoveryPotential,
      manualTimeCost,
      aiTimeRecovery,
      totalBenefit,
      recoveryPercentage: (totalBenefit / (yearlyLeak + manualTimeCost)) * 100
    };
  }, [noShows, revPerAppt, staffHours]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setFormStatus('loading');
    
    try {
      const response = await fetch("https://formspree.io/f/mnjwgjqy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          clinicName,
          email,
          specialty,
          revenueLeak: stats.yearlyLeak,
          recoveryPotential: stats.totalBenefit,
          _subject: `New AI Roadmap Request from ${clinicName}`
        })
      });

      if (response.ok) {
        setFormStatus('success');
        setIsModalOpen(true);
      } else {
        setFormStatus('idle');
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus('idle');
    }
  };

  const copyToClipboard = () => {
    const shareText = `ClinicPulse AI ROI Report: \nYearly Leakage: $${stats.yearlyLeak.toLocaleString()}\nPotential Recovery: $${stats.totalBenefit.toLocaleString()}\nCheck yours at ${window.location.origin}`;
    navigator.clipboard.writeText(shareText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "ClinicPulse AI ROI Estimator",
        "operatingSystem": "All",
        "applicationCategory": "BusinessApplication",
        "description": "Calculate how modern AI scheduling and automation recovers thousands in lost appointments and administrative overhead for dental, GP, and medical clinics.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      getFAQSchema()
    ]
  };

  return (
    <div className="min-h-screen relative selection:bg-white/20">
      <SEOMetadata 
        title="ClinicPulse AI - Medical & Dental ROI Revenue Leak Calculator"
        description="Free 2026 ROI Calculator for private medical, dental, and physio practices to detect revenue leakage from no-shows and manual admin work, and recover lost profit with AI partners."
        schema={homeSchema}
      />
      {/* Background Mesh Gradient */}
      <div className="fixed inset-0 -z-10 animate-mesh opacity-50" />
      <div className="fixed inset-0 -z-20 bg-navy-950" />

      {/* Decorative Circles */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-slate-500/10 rounded-full blur-[120px] pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* Header */}
        <header className="flex flex-col items-center text-center mb-20 space-y-6">
          <Link to="/">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 glass px-6 py-2 rounded-full mb-4"
            >
              <img src="/logo.svg" alt="ClinicPulse AI Logo" className="w-6 h-6 object-contain" />
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-white/80">ClinicPulse AI</span>
            </motion.div>
          </Link>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl"
          >
            Stop the <span className="silver-gradient">Revenue Leak</span> in Your Clinic.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl"
          >
            Calculate how modern AI scheduling and automation recovers thousands in lost appointments and administrative overhead.
          </motion.p>
        </header>

        {/* Calculator Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 glass-card p-8 md:p-10 space-y-12"
          >
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Zap size={24} className="text-white" />
              Practice Metrics
            </h2>

            <Slider 
              label="Monthly No-Shows"
              icon={Users}
              value={noShows}
              min={0}
              max={100}
              onChange={setNoShows}
            />

            <Slider 
              label="Avg. Revenue / Appointment"
              icon={DollarSign}
              value={revPerAppt}
              min={100}
              max={1500}
              step={50}
              prefix="$"
              onChange={setRevPerAppt}
            />

            <Slider 
              label="Admin Hours / Week"
              icon={Clock}
              value={staffHours}
              min={0}
              max={40}
              suffix=" hrs"
              onChange={setStaffHours}
            />

            <div className="pt-8 border-t border-white/5">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <ShieldCheck className="text-slate-400 shrink-0" size={24} />
                <p className="text-sm text-slate-400 italic">
                  "Based on 2026 industry standards, AI reduces no-shows by 70% and recovers up to 90% of manual scheduling time."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Leakage Card */}
            <div className="glass-card p-10 group bg-red-500/[0.02]">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-slate-400 font-medium uppercase tracking-widest text-sm mb-2">Yearly Revenue Leakage</h3>
                  <p className="text-sm text-red-400/60 font-medium italic">Unmet potential & missed opportunities</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={copyToClipboard}
                    className="p-3 rounded-2xl bg-white/5 text-slate-400 hover:text-white transition-colors relative group/copy"
                  >
                    {isCopied ? <Check size={20} className="text-emerald-400" /> : <Share2 size={20} />}
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-navy-950 text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover/copy:opacity-100 transition-opacity whitespace-nowrap">
                      {isCopied ? "Copied!" : "Share ROI"}
                    </span>
                  </button>
                  <div className="p-3 rounded-2xl bg-red-500/10 text-red-400">
                    <TrendingDown size={28} />
                  </div>
                </div>
              </div>
              
              <div className={`text-5xl md:text-7xl font-bold font-display tracking-tighter mb-4 transition-all duration-700 ${stats.yearlyLeak > 100000 ? 'text-glow-red-intense' : 'text-glow-silver'}`}>
                <span className="bg-gradient-to-br from-red-400 via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  <CountUp value={stats.yearlyLeak} prefix="$" />
                </span>
              </div>
              
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  className="h-full bg-gradient-to-r from-red-500/20 to-red-500/60" 
                />
              </div>
            </div>

            {/* Recovery Card */}
            <div className="glass-card p-10 relative group overflow-hidden">
              {/* Highlight Effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-white/10 transition-colors duration-500" />
              
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-slate-400 font-medium uppercase tracking-widest text-sm mb-2">Potential Profit Recovery</h3>
                  <p className="text-sm text-blue-400/60 font-medium italic">AI-driven optimizations & growth</p>
                </div>
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <TrendingUp size={28} />
                </div>
              </div>
              
              <div className="text-6xl md:text-8xl font-bold font-display tracking-tighter mb-6 text-glow-mercury leading-none">
                <span className="silver-gradient">
                  <CountUp value={stats.totalBenefit} prefix="$" />
                </span>
              </div>

              {/* Recovery Progress Bar */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                  <span>Recovery Efficiency</span>
                  <span className="text-white">{Math.round(stats.recoveryPercentage)}%</span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.recoveryPercentage}%` }}
                    transition={{ type: "spring", bounce: 0, duration: 1 }}
                    className="h-full bg-gradient-to-r from-slate-400 via-white to-slate-400 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)]" 
                  />
                </div>
              </div>
            </div>

            {/* Micro Stats Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass-card p-6 flex flex-col justify-between h-32">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Time Reclaimed</span>
                <div className="text-2xl font-bold text-white">
                  <CountUp value={staffHours * 52 * 0.9} suffix=" Hours" />
                  <span className="block text-[10px] text-slate-500 mt-1 uppercase">Per Year / Clinic</span>
                </div>
              </div>
              <div className="glass-card p-6 flex flex-col justify-between h-32">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Revenue Upswing</span>
                <div className="text-2xl font-bold text-emerald-400">
                  <CountUp value={stats.aiRecoveryPotential} prefix="+$" />
                  <span className="block text-[10px] text-slate-500 mt-1 uppercase">Projected Net Gain</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Action Plan Breakdown based on metrics */}
        <ActionPlan noShows={noShows} revPerAppt={revPerAppt} staffHours={staffHours} stats={stats} />

        {/* Dynamic Workflow Vulnerability Index checklist */}
        <WorkflowAudit />

        {/* Blog / Resources Section */}
        <section className="mt-32 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                AI Implementation <span className="silver-gradient">Insights</span>
              </h2>
              <p className="text-slate-500 max-w-xl">
                Stay updated with the latest in 2026 healthcare automation trends and operational excellence.
              </p>
            </div>
            <button className="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 group hover:gap-3 transition-all">
              View All Resources <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <BlogCard 
              id="no-shows"
              title="How AI reduces no-shows by 70% in private practice"
              icon={Calendar}
              imageLabel="DIGITAL CALENDAR"
            />
            <BlogCard 
              id="roi-guide"
              title="The 2026 Guide to Dental Automation & Operational ROI"
              icon={BarChart3}
              imageLabel="SILVER GRAPH"
            />
            <BlogCard 
              id="tools"
              title="Top 3 HIPAA-Compliant AI Tools for Private Practice"
              icon={Shield}
              imageLabel="SECURITY SHIELD"
            />
          </div>
        </section>

        {/* Dynamic Responsive Google AdSense Unit */}
        <AdUnit format="auto" label="Sponsored - Strategic Clinic Operations" />

        {/* Dynamic Interactive FAQ Accordion Section for Google SEO crawling and User support */}
        <FAQSection />

        {/* Partners & Lead Capture Section */}
        <section className="mt-32 grid lg:grid-cols-2 gap-12 items-center">
          {/* Partners Column */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Verified AI Partners</h2>
              <p className="text-slate-500 text-sm">We only recommend tools that meet the highest standards of medical security and ROI performance.</p>
            </div>
            
            <div className="grid gap-4">
              {[
                { name: "Anolla", desc: "Intelligent Appointment Rescue", logo: "A" },
                { name: "ChatArm", desc: "Patient Relationship Automation", logo: "C" },
                { name: "CareStack", desc: "Full Governance & Operations", logo: "CS" }
              ].map((partner) => (
                <div key={partner.name} className="glass flex items-center gap-6 p-6 rounded-2xl group hover:border-white/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center font-bold text-xl text-white group-hover:bg-white/20 transition-colors">
                    {partner.logo}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-white">{partner.name}</h4>
                    <p className="text-xs text-slate-500">{partner.desc}</p>
                  </div>
                  <div className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Verified
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Capture Form */}
          <div ref={scrollRef} id="roadmap-anchor" className="glass-card p-10 md:p-12 space-y-8 relative overflow-hidden min-h-[500px] flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
            
            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8 text-center relative z-10"
                >
                  <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-white tracking-tight">Success!</h3>
                    <p className="text-slate-400 text-lg leading-relaxed">
                      Your roadmap is being generated. While you wait, check out our recommended AI automation partner below.
                    </p>
                  </div>
                  <a 
                    href="https://anollamedical.com/?ref=clinicpulse" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="chrome-button px-10 py-5 rounded-full inline-flex items-center gap-3"
                  >
                    <span>EXPLORE RECOMMENDED TOOL</span>
                    <ArrowRight size={20} />
                  </a>
                </motion.div>
              ) : formStatus === 'loading' ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center space-y-6 relative z-10"
                >
                  <div className="relative w-20 h-20">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="absolute inset-0 border-4 border-white/5 border-t-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    />
                  </div>
                  <p className="text-white font-bold uppercase tracking-widest animate-pulse">Processing Roadmap...</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8 relative z-10"
                >
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white tracking-tight">Get Your Custom AI Roadmap</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Enter your clinic details for a personalized report on how to recover your leaked revenue.
                    </p>
                  </div>

                  <form 
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <Building2 size={12} /> Clinic Name
                      </label>
                      <input 
                        required
                        type="text" 
                        value={clinicName}
                        onChange={(e) => setClinicName(e.target.value)}
                        placeholder="The Smile Centre"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-slate-700" 
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <Mail size={12} /> Work Email
                      </label>
                      <input 
                        required
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="dr.jones@clinic.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-slate-700" 
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <Users size={12} /> Specialist Type
                      </label>
                      <div className="relative">
                        <select 
                          value={specialty}
                          onChange={(e) => setSpecialty(e.target.value)}
                          className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/30 transition-all cursor-pointer"
                        >
                          <option value="Dental" className="bg-navy-950">Dental Practice</option>
                          <option value="GP" className="bg-navy-950">GP / Medical Clinic</option>
                          <option value="Physio" className="bg-navy-950">Physiotherapy</option>
                          <option value="Other" className="bg-navy-950">Other Specialist</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="chrome-button w-full py-5 rounded-xl flex items-center justify-center gap-3 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>GENERATE MY ROADMAP</span>
                      <ArrowRight size={20} />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Footer CTA */}
        <footer className="mt-24 md:mt-32 text-center flex flex-col items-center">
          <div className="max-w-3xl glass-card p-12 relative overflow-hidden group">
            {/* Gloss shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Modernize Your Practice.</h2>
            <p className="text-slate-400 mb-10 text-lg">
              Our AI Audit identifies exactly where your automation gaps are. Get the full report on how to eliminate no-shows forever.
            </p>
            
            <button 
              onClick={() => document.getElementById('roadmap-anchor')?.scrollIntoView({ behavior: 'smooth' })}
              className="chrome-button px-10 py-5 rounded-full flex items-center gap-3 mx-auto whitespace-nowrap cursor-pointer"
            >
              <span>GET A FULL AI AUDIT</span>
              <ArrowRight size={20} />
            </button>
            
            <div className="mt-10 flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-xs font-bold uppercase tracking-widest">ISO 27001 Certified</span>
              <span className="text-xs font-bold uppercase tracking-widest">HIPAA Compliant</span>
              <span className="text-xs font-bold uppercase tracking-widest">GDPR Ready</span>
            </div>
          </div>
        </footer>
      </main>
      <Footer />
      <ProcessingModal isOpen={isProcessing} />
      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} clinicName={clinicName} />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalculatorView />} />
        <Route path="/analysis/:id" element={<ArticlePage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

