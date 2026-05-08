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
          <h3 className="text-2xl font-bold text-white mb-4">Roadmap Generated!</h3>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Congratulations <span className="text-white font-bold">{clinicName}</span>. Your personalized clinic recovery strategy is now ready. We've matched you with the #1 AI Dental Assistant.
          </p>
          <a 
            href="https://anollamedical.com/?ref=clinicpulse" 
            target="_blank" 
            rel="noopener noreferrer"
            className="chrome-button w-full py-4 rounded-xl flex items-center justify-center gap-2"
          >
            Access My Recommended Tool <ArrowRight size={18} />
          </a>
          <button 
            onClick={onClose}
            className="mt-6 text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
          >
            Close Window
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
        <p className="max-w-2xl text-[10px] text-slate-700 leading-relaxed uppercase tracking-wider">
          Disclaimer: This tool is for informational purposes only and does not constitute medical or financial advice.
        </p>
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
        <>
          <p>The modern private clinic faces a significant challenge with patient reliability. In a post-digital era, traditional reminder systems—manual calls and simplistic SMS blasts—are increasingly ignored or buried under a mountain of digital noise. The psychology of the 'no-show' is complex, often rooted in cognitive friction rather than deliberate negligence.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Cognitive Friction of Rescheduling</h2>
          <p>When a patient realizes they can no longer attend an appointment, the effort required to reschedule—finding the clinic's number, waiting on hold, and navigating a manual calendar with a staff member—often leads to total disengagement. AI-powered scheduling assistants eliminate this friction by providing instantaneous, natural language interfaces that allow patients to reschedule in seconds, even outside of clinic hours.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Social Commitment Effect</h2>
          <p>AI doesn't just remind; it engages. By utilizing 2026-grade large language models (LLMs), these systems can handle intelligent conversations. When an AI assistant asks, "We noticed you missed your last hygiene appointment, should we find a slot for you this Saturday?", it triggers a psychological 'social commitment' response. The interaction feels personal and proactive, making the patient significantly more likely to confirm or reschedule rather than ignore a generic one-way notification.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Data-Driven Confirmation Timing</h2>
          <p>Not all patients respond to reminders at the same time. Advanced AI models analyze historical engagement data to determine the optimal window for confirmation. For some, a 48-hour notice is perfect; for others, a same-day 'ping' is necessary. By personalizing the cadence of outreach, clinics see a massive uplift in confirmed slots without irritating their patient base with redundant messages.</p>
        </>
      )
    },
    "roi-guide": {
      title: "The 2026 Guide to Dental Automation & Operational ROI",
      icon: BarChart3,
      content: (
        <>
          <p>Operational efficiency is the cornerstone of a profitable clinic in 2026. As labor costs and overhead continue to rise, the 'hidden' cost of manual administrative work has become a silent profit killer. Many clinic owners focus on patient volume while ignoring the massive leak occurring right at the front desk. This guide explores the direct correlation between automated workflows and bottom-line stability.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Staff Time Leakage</h2>
          <p>On average, a medical receptionist spends 15-20 minutes on every successful manual booking when accounting for inbound queries, data entry, and follow-ups. In a busy clinic, this equates to 15+ hours per week per staff member. At a conservative $30/hr loaded cost, that is nearly $24,000 per year essentially wasted on tasks that AI can perform for a fraction of the cost, with 100% accuracy and zero fatigue.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Maximizing Chair Utilization</h2>
          <p>A vacant chair is the most expensive item in a clinic. If a no-show occurs, that slot is typically lost forever. AI 'Rescue' systems monitor cancellations and automatically offer those slots to patients on a digital waitlist or those overdue for similar procedures. This ensures that even late cancellations result in filled chairs, maintaining a consistent revenue stream and reducing the stress on clinical staff to 'rush' through catch-up days.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Long-Term Patient Lifetime Value (LTV)</h2>
          <p>Automation isn't just about the current month's profit. By maintaining consistent engagement and professional outreach, clinics increase patient retention. A patient who receives seamless, automated care coordination is 60% more likely to remain loyal to the practice over a 5-year period. The ROI of AI is not just in cost-saving, but in the compound growth of your patient list.</p>
        </>
      )
    },
    "tools": {
      title: "Top 3 HIPAA-Compliant AI Tools for Private Practice",
      icon: Shield,
      content: (
        <>
          <p>Security is non-negotiable in modern healthcare. As clinics adopt artificial intelligence, the primary concern must be the integrity and privacy of patient data. When integrating AI orchestration platforms, compliance with HIPAA (USA), GDPR (Europe), and ISO 27001 standards is the absolute baseline. We have vetted the leading contenders for 2026 based on their security architecture and clinical utility.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Anolla: The Orchestration Leader</h2>
          <p>Anolla has set the standard for clinically-aware AI. Their system uses end-to-end encryption for all patient interactions and stores data in zero-knowledge environments. Their 'Legal Guard' module ensures that every AI-generated response complies with regional medical advertising and communication laws, making it the safest choice for high-end boutique clinics.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. ChatArm: Patient Relationship Focused</h2>
          <p>ChatArm focuses on the 'front-of-house' experience. Their AI specializes in triage and empathetic patient communication. They maintain rigorous audit logs and provide clinics with full transparency over how patient data is utilized to train local optimization models. Their 'Privacy First' toggle allows clinics to operate with maximum automation while ensuring no PII is ever exposed to secondary processing layers.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. CareStack: Full Practice Integration</h2>
          <p>For clinics looking for an all-in-one solution, CareStack's 2026 update includes a deeply embedded AI core. By integrating automation directly into the clinical record and billing system, they reduce the risk of data leakage between third-party apps. Their 'Buit-in Governance' engine automatically redacts sensitive information before it touches any cloud-based reasoning models, providing the ultimate shield for GP and multi-specialist practices.</p>
        </>
      )
    }
  };

  const article = articles[id || ""] || articles["no-shows"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative py-20 px-6">
      <div className="fixed inset-0 -z-10 animate-mesh opacity-30" />
      <div className="fixed inset-0 -z-20 bg-navy-950" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
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
    <div className="min-h-screen relative pt-20 px-6 flex flex-col">
      <div className="fixed inset-0 -z-10 animate-mesh opacity-30" />
      <div className="fixed inset-0 -z-20 bg-navy-950" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto mb-20 w-full">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 text-sm font-bold uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="glass-card p-10 md:p-16 space-y-8">
          <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
            <p>At ClinicPulse AI, we take your data security seriously. We only collect clinic emails and names for the express purpose of generating your personalized ROI reports and AI integration roadmaps.</p>
            <p>We do not sell, rent, or trade your personal information to third parties. Your data is encrypted and used solely within our analysis engine to provide the most accurate revenue leakage projections possible.</p>
            <p>Your information is stored securely and is only accessible by our analytical team and authorized processing partners used to deliver your custom roadmap.</p>
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
    <div className="min-h-screen relative pt-20 px-6 flex flex-col">
      <div className="fixed inset-0 -z-10 animate-mesh opacity-30" />
      <div className="fixed inset-0 -z-20 bg-navy-950" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto mb-20 w-full">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 text-sm font-bold uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="glass-card p-10 md:p-16 space-y-8">
          <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
          <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
            <p>The ClinicPulse AI calculator provides estimates based on 2026 industry averages and historical datasets. Actual revenue recovery may vary based on specific clinic operations, patient demographics, and software implementation strategies.</p>
            <p>By using this tool, you acknowledge that these projections are for informational purposes and should be vetted by your financial and operational teams before making significant investment decisions.</p>
            <p>ClinicPulse AI is not liable for errors in manual data entry or indirect losses resulting from the use of our estimation tool.</p>
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
    <div className="min-h-screen relative pt-20 px-6 flex flex-col">
      <div className="fixed inset-0 -z-10 animate-mesh opacity-30" />
      <div className="fixed inset-0 -z-20 bg-navy-950" />
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

  return (
    <div className="min-h-screen relative selection:bg-white/20">
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
              <Stethoscope className="text-white" size={20} />
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
          <div ref={scrollRef} className="glass-card p-10 md:p-12 space-y-8 relative overflow-hidden min-h-[500px] flex flex-col justify-center">
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
            
            <button className="chrome-button px-10 py-5 rounded-full flex items-center gap-3 mx-auto whitespace-nowrap">
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

