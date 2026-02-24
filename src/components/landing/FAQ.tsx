"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const faqs = [
  {
    q: "What exactly do I get when I generate a unit?",
    a: "Every unit includes three publication-ready documents: a Teacher Guide (with facilitation notes, answer keys, and differentiation strategies), a Student Activity Pack (with pre-assessments, rubrics, model sketches, and research activities), and a 9-slide Presentation (with speaker notes and visual scaffolds).",
  },
  {
    q: "How does InquiryGen ensure quality?",
    a: "Our AI is trained on pedagogy-first principles and cross-referenced against published inquiry frameworks including 5E, Anchoring Phenomena, and Project-Based Learning. Every output is structured by experienced educators' design patterns, not generic templates.",
  },
  {
    q: "Which inquiry models are supported?",
    a: "We currently support the 5E Instructional Model, Anchoring Phenomena, Argument-Driven Inquiry, Modeling-Based Inquiry, and Project-Based Learning — with more frameworks being added based on educator feedback.",
  },
  {
    q: "What standards frameworks can I align to?",
    a: "InquiryGen supports NGSS, Common Core, and all 50 U.S. state standards. International framework support (IB, Cambridge, Australian Curriculum, and more) is available on the Pro plan.",
  },
  {
    q: "Can I edit the generated materials?",
    a: "Absolutely. All documents export as standard Word (.docx) and PowerPoint (.pptx) files. Edit them freely in any office suite — they're fully yours to customize.",
  },
  {
    q: "Is my data private and secure?",
    a: "Yes. We do not train AI models on your data. Your generated content is stored securely and accessible only to you. We follow industry-standard encryption practices.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative border-t border-edge px-6 py-32">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            FAQ
          </p>
          <h2 className="mt-4 font-display text-4xl font-light tracking-tight text-prose sm:text-5xl">
            Common questions
          </h2>
        </motion.div>

        <div className="mt-16 divide-y divide-edge-soft">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between py-6 text-left"
              >
                <span className="pr-8 text-sm font-medium text-prose">
                  {faq.q}
                </span>
                <Plus
                  className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 ${
                    open === i ? "rotate-45" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-sm leading-relaxed text-muted">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
