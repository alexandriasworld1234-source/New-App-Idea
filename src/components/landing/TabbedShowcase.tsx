"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  Presentation,
  Target,
  ClipboardCheck,
  Lightbulb,
} from "lucide-react";

/* ─── Animation helpers ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const viewportConfig = { once: true, margin: "-80px" as const };

/* ─── Step data ─── */

const steps = [
  {
    number: "01",
    title: "Describe your vision",
    text: "Enter your topic, grade level, and preferred inquiry model. Select standards or let AI find the best fit.",
  },
  {
    number: "02",
    title: "AI builds everything",
    text: "Our AI generates a complete unit: teacher guide, student activity pack, and presentation slides — all framework-aligned.",
  },
  {
    number: "03",
    title: "Review and teach",
    text: "Edit anything inline, export to Word and PowerPoint, and walk into class prepared. Every unit is yours to customize.",
  },
];

/* ─── Card data ─── */

const cards = [
  {
    icon: BookOpen,
    title: "Teacher Guide",
    description:
      "Complete facilitation guide with framework phases, timing, differentiation strategies, and answer keys.",
  },
  {
    icon: FileText,
    title: "Student Activity Pack",
    description:
      "Investigations, worksheets, rubrics, and reflection activities — all scaffolded by grade level.",
  },
  {
    icon: Presentation,
    title: "Slide Deck",
    description:
      "9-slide presentation with speaker notes, ready to project. Clean, branded, student-friendly.",
  },
  {
    icon: Target,
    title: "Standards Alignment",
    description:
      "Auto-mapped to NGSS, IB, Common Core, or your custom framework with explicit connections.",
  },
  {
    icon: ClipboardCheck,
    title: "Assessment Tools",
    description:
      "Pre and post assessments, rubrics, and success criteria aligned to learning objectives.",
  },
  {
    icon: Lightbulb,
    title: "Vocabulary & Resources",
    description:
      "Key terms with definitions, background reading, and extension resources for deeper learning.",
  },
];

/* ─── Main Component ─── */

export function TabbedShowcase() {
  return (
    <>
      {/* ── SECTION A: How It Works ── */}
      <section id="features" className="bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          {/* Overline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
            className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            How it works
          </motion.p>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-center font-display text-4xl font-light tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Three steps to a complete unit.
          </motion.h2>

          {/* Steps grid */}
          <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                transition={{ duration: 0.6, delay: 0.15 * i }}
              >
                <p className="font-display text-6xl font-light text-accent">
                  {step.number}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION B: Everything You Need ── */}
      <section className="bg-dark py-28 text-paper sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          {/* Overline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
            className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            What you get
          </motion.p>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-center font-display text-4xl font-light tracking-tight text-paper sm:text-5xl lg:text-6xl"
          >
            Everything you need, generated in minutes.
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-center text-lg text-dark-muted"
          >
            Each unit includes research-backed materials ready for your
            classroom.
          </motion.p>

          {/* Cards grid */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="rounded-2xl border border-dark-border bg-dark-surface p-8 transition-all hover:-translate-y-1 hover:border-accent/30"
              >
                <card.icon className="h-8 w-8 text-accent" />
                <h3 className="mt-5 text-lg font-semibold text-paper">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-dark-muted">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
