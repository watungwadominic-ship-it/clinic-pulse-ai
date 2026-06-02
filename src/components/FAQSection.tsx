import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqsData: FAQItem[] = [
  {
    question: "How does AI actually reduce clinic no-shows by 70%?",
    answer: "Traditional SMS reminders are one-way and easily ignored. Modern AI scheduling assistants engage patients in real-time, natural-language text conversations. When patients can reschedule dynamically within seconds without having to call the front desk, the psychological 'cognitive friction' is removed. The system also automatically fills cancelled slots from digital waitlists, restoring clinic chair utilization."
  },
  {
    question: "Is utilizing AI scheduling tools HIPAA and GDPR compliant?",
    answer: "Yes, our recommended AI partners (Anolla, ChatArm, CareStack) are fully HIPAA and GDPR compliant. They enter into Business Associate Agreements (BAAs), encrypt all protected health information (PHI) end-to-end, and support strict access controls. No patient identifiable data is ever exposed to public AI training loops."
  },
  {
    question: "How does the ClinicPulse AI calculator compute the revenue leakage?",
    answer: "Our estimation model uses standard healthcare metrics: Revenue Leakage = Monthly No-Shows × Average Appointment Value × 12 months. Administrative Staff Savings are calculated by multiplying weekly admin task hours by industry-standard labor costs ($30/hour loaded cost). Recovery rates are based on average performance uplifts from clinics that implemented automated workflows in 2025/2026."
  },
  {
    question: "Do these AI partners integrate with my existing practice management software?",
    answer: "Absolutely. Our vetted software partners integrate directly with standard systems like Dentrix, Open Dental, Carestream, Cliniconex, and general medical EHR platforms. Setup occurs securely via encrypted API bridges without interrupting your active workflows."
  },
  {
    question: "How long does it typically take to deploy an AI assistant?",
    answer: "A standard deployment takes between 3 to 7 business days. This includes syncing the database, testing HIPAA-compliant validation nodes, customizing conversation scripts tailored to your specialties, and training your front-desk staff on handling escalated bookings."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="mt-32 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Frequently <span className="silver-gradient">Asked Questions</span>
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto text-sm">
          Everything you need to know about healthcare automation, calculations, and security compliance.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqsData.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div 
              key={index} 
              className="glass-card transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4">
                  <HelpCircle className="text-slate-500 shrink-0" size={20} />
                  <span className="font-bold text-white text-base md:text-lg hover:text-slate-200 transition-colors">
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-1 rounded-full bg-white/5 text-slate-400"
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-8 md:px-8 border-t border-white/5 pt-4 text-slate-400 text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Generate the FAQ structured schema programmatically for page integration
export function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
