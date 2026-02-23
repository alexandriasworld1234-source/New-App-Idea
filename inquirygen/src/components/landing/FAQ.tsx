"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const faqs = [
  {
    question: "Is this replacing teachers?",
    answer:
      "Absolutely not. InquiryGen is a planning tool for teachers, not a replacement. You control every aspect of the generated materials \u2014 editing, regenerating, and customizing before anything reaches your students.",
  },
  {
    question: "How is this different from generic AI tools?",
    answer:
      "Generic AI tools produce generic content. InquiryGen is purpose-built for inquiry-based education. It understands pedagogical frameworks, standards alignment, lesson sequencing, and assessment design.",
  },
  {
    question: "Is student data stored?",
    answer:
      "No. InquiryGen does not collect, store, or process any student data. The tool is used by teachers for planning purposes only.",
  },
  {
    question: "What standards does it support?",
    answer:
      "InquiryGen supports IB (PYP, MYP, DP), UK National Curriculum, Australian Curriculum, NGSS, Common Core, and individual U.S. state standards. Our global standards engine ensures alignment no matter where you teach.",
  },
  {
    question: "Can I customize the outputs?",
    answer:
      "Yes, completely. Every section of every document can be edited in-browser before exporting. You can regenerate individual slides, modify activity prompts, and tailor content to your classroom.",
  },
  {
    question: "Is there a free tier?",
    answer:
      "The landing page demo lets you preview how InquiryGen works \u2014 no account required. To generate full lessons and export materials, you\u2019ll need a Pro subscription at $14/month or $99/year.",
  },
];

export function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div ref={ref} id="faq" className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="font-display text-3xl tracking-tight text-[#0f172a] sm:text-4xl"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="mt-4 text-lg text-[#475569]"
          >
            Everything you need to know about InquiryGen.
          </motion.p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={faq.question}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.08 * (i + 1), ease }}
                className={`liquid-glass-subtle relative overflow-hidden transition-colors duration-200 ${
                  isOpen ? "!border-[#10b981]/30" : ""
                }`}
              >
                {/* Accent border */}
                <motion.div
                  className="absolute top-0 left-0 h-full w-[3px] rounded-full bg-gradient-to-b from-[#10b981] to-[#34d399]"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "top" }}
                />

                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-[#0f172a]">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
                        isOpen ? "text-[#10b981]" : "text-[#475569]/50"
                      }`}
                    />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { type: "spring", stiffness: 200, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden"
                      role="region"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-[#475569]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
