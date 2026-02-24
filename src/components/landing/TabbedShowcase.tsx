"use client";

import { motion } from "framer-motion";
import {
  Wand2,
  Layers,
  Download,
  BookOpen,
  FileText,
  Presentation,
  Target,
  ClipboardCheck,
  BookMarked,
} from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const steps = [
  {
    num: "01",
    title: "Describe your unit",
    description:
      "Enter your topic, grade level, and preferred inquiry model. InquiryGen understands your curriculum context.",
    icon: Wand2,
  },
  {
    num: "02",
    title: "AI generates everything",
    description:
      "In under two minutes, receive a complete teacher guide, student activity pack, and slide deck — all standards-aligned.",
    icon: Layers,
  },
  {
    num: "03",
    title: "Download & teach",
    description:
      "Export as Word and PowerPoint files. Edit freely. Every resource is yours to customize and use immediately.",
    icon: Download,
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Teacher Guide",
    description:
      "Complete facilitation guide with answer keys, differentiation strategies, and LEVER framework alignment.",
  },
  {
    icon: FileText,
    title: "Student Pack",
    description:
      "Pre-assessment, rubrics, model sketches, simulation observations, research activities, and STEM challenges.",
  },
  {
    icon: Presentation,
    title: "Slide Deck",
    description:
      "9-slide branded presentation ready to project, with speaker notes and visual scaffolds.",
  },
  {
    icon: Target,
    title: "Standards Aligned",
    description:
      "Automatically mapped to NGSS, state standards, and cross-cutting concepts with full unpacking.",
  },
  {
    icon: ClipboardCheck,
    title: "Assessment Tools",
    description:
      "Built-in pre/post assessments, rubrics, and formative check-ins aligned to learning objectives.",
  },
  {
    icon: BookMarked,
    title: "Vocabulary & Resources",
    description:
      "Curated key terms, background reading, and extension resources for deeper exploration.",
  },
];

export function TabbedShowcase() {
  return (
    <>
      {/* ─── HOW IT WORKS ─── */}
      <section id="features" className="relative px-6 py-32">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease }}
            className="text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Simple Process
            </p>
            <h2 className="mt-4 font-display text-4xl font-light tracking-tight text-prose sm:text-5xl">
              How it works
            </h2>
          </motion.div>

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease }}
                className="group relative"
              >
                <span className="font-display text-7xl font-light text-accent/15 transition-colors duration-500 group-hover:text-accent/30">
                  {step.num}
                </span>
                <div className="mt-4">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/15">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-medium text-prose">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EVERYTHING YOU NEED ─── */}
      <section className="relative border-y border-edge px-6 py-32">
        {/* Subtle surface tint */}
        <div className="pointer-events-none absolute inset-0 bg-surface/40" />

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease }}
            className="text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Complete Package
            </p>
            <h2 className="mt-4 font-display text-4xl font-light tracking-tight text-prose sm:text-5xl">
              Everything you need
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Every unit includes three publication-ready documents,
              automatically aligned to your chosen standards framework.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="group rounded-2xl border border-edge-soft bg-raised/40 p-6 transition-all duration-500 hover:border-accent/20 hover:bg-raised/80"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/15">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-medium text-prose">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
