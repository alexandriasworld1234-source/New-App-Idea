"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const faqs = [
  {
    question: "What is InquiryGen?",
    answer:
      "InquiryGen is an AI-powered lesson planning tool that generates complete inquiry-based learning units. You provide a topic and standards, and it creates a teacher guide, student activity pack, and presentation slides \u2014 all aligned to your chosen pedagogical framework.",
  },
  {
    question: "Will AI replace my teaching?",
    answer:
      "Absolutely not. InquiryGen handles the time-consuming planning work so you can focus on what matters most \u2014 connecting with your students. Every generated unit is fully editable and meant to be adapted to your classroom.",
  },
  {
    question: "What inquiry models are supported?",
    answer:
      "We currently support four frameworks: 5E Instructional Model, Kath Murdoch Inquiry Cycle, Phenomenon-Based Learning, and Design Thinking. Each generates units structured around its specific phases and pedagogical approach.",
  },
  {
    question: "Which standards can I align to?",
    answer:
      "InquiryGen supports NGSS, Common Core (ELA and Math), C3 Social Studies, IB PYP/MYP, UK National Curriculum, ACARA (Australia), and custom frameworks. We\u2019re adding more regularly.",
  },
  {
    question: "Can I edit the generated content?",
    answer:
      "Yes. Every unit is fully editable before export. You can modify text, reorder sections, adjust assessments, and customize to your exact needs. Export to Word and PowerPoint for further editing.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. We never use your content to train AI models. Your lesson data is encrypted, stored securely, and never shared with third parties. You can delete your data at any time.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-6">
        {/* Overline */}
        <motion.p
          {...fadeUp}
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent"
        >
          FAQ
        </motion.p>

        {/* Headline */}
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-4 text-center font-display text-4xl font-light tracking-tight text-ink sm:text-5xl"
        >
          Common questions.
        </motion.h2>

        {/* Accordion */}
        <div className="mt-16 border-t border-border">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.06 * i,
                }}
                className="border-b border-border"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-ink">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center text-lg leading-none text-muted"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-sm leading-relaxed text-muted">
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
    </section>
  );
}
