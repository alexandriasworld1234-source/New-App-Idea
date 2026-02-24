"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  FileText,
  Presentation,
  Check,
  Sparkles,
} from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const stagger = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

const mockupCards = [
  {
    icon: BookOpen,
    title: "Teacher Guide",
    subtitle: "Facilitation & answer key",
  },
  {
    icon: FileText,
    title: "Student Pack",
    subtitle: "Activities & assessments",
  },
  {
    icon: Presentation,
    title: "Slide Deck",
    subtitle: "9-slide presentation",
  },
];

const metrics = [
  { value: "500+", label: "Units Generated" },
  { value: "15h", label: "Saved Per Teacher" },
  { value: "98%", label: "Standards Aligned" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pt-16">
      {/* Floating gradient orb — asymmetric, off-center */}
      <div className="pointer-events-none absolute top-[-10%] left-[15%] h-[600px] w-[800px] rounded-full bg-accent/[0.035] blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[10%] right-[10%] h-[400px] w-[500px] rounded-full bg-sage/[0.03] blur-[120px]" />

      <div className="relative mx-auto w-full max-w-5xl text-center">
        {/* Overline badge */}
        <motion.div {...stagger(0)} className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-edge px-4 py-1.5 text-xs font-medium tracking-wide text-accent">
            <Sparkles className="h-3 w-3" />
            AI-POWERED LESSON DESIGN
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...stagger(0.1)}
          className="mx-auto mt-8 max-w-[900px] font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1.08] tracking-tight text-prose"
        >
          The lesson planner{" "}
          <span className="italic text-accent">that thinks</span> like you do.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          {...stagger(0.2)}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted"
        >
          The future of teaching isn&apos;t about working harder &mdash;
          it&apos;s about working smarter. Generate complete inquiry units in
          minutes, so you can focus on what actually matters.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...stagger(0.3)}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#pricing"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-canvas transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_30px_rgba(52,211,153,0.25)]"
          >
            Start creating free
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-full border border-edge px-8 py-4 text-sm font-medium text-prose transition-all duration-300 hover:border-accent/40 hover:bg-accent/[0.05]"
          >
            See how it works
          </a>
        </motion.div>

        {/* Product mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease }}
          className="mx-auto mt-20 max-w-3xl animate-float"
        >
          <div className="overflow-hidden rounded-2xl border border-edge bg-surface/60 shadow-2xl shadow-accent/[0.04]">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-edge-soft px-5 py-3">
              <div className="flex items-center gap-1.5">
                <span className="block h-2.5 w-2.5 rounded-full bg-faint/60" />
                <span className="block h-2.5 w-2.5 rounded-full bg-faint/60" />
                <span className="block h-2.5 w-2.5 rounded-full bg-faint/60" />
              </div>
              <span className="flex-1 text-center text-xs text-faint">
                inquirygen.app
              </span>
              <div className="w-[52px]" />
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">
              {/* Title row */}
              <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <h3 className="font-display text-lg font-medium text-prose">
                  Photosynthesis &amp; Energy Transfer
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Grade 7", "LEVER", "NGSS"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cards grid */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {mockupCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-xl border border-edge-soft bg-raised p-5 transition-all duration-300 hover:border-accent/20"
                  >
                    <card.icon className="h-5 w-5 text-accent" />
                    <p className="mt-3 text-sm font-medium text-prose">
                      {card.title}
                    </p>
                    <p className="mt-1 text-xs text-muted">{card.subtitle}</p>
                    <div className="mt-3 flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-accent" />
                      <span className="text-xs font-medium text-accent">
                        Ready
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Standards footer */}
              <p className="mt-4 text-xs text-faint">
                Standards: MS-LS1-6, MS-PS3-3, MS-LS1-7
              </p>
            </div>
          </div>
        </motion.div>

        {/* Metrics strip */}
        <motion.div {...stagger(0.7)} className="mt-20 mb-16">
          <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
            {metrics.map((metric, i) => (
              <div key={metric.label} className="flex items-center gap-16">
                <div className="text-center">
                  <p className="font-display text-4xl font-semibold text-accent">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-muted">
                    {metric.label}
                  </p>
                </div>
                {i < metrics.length - 1 && (
                  <div className="hidden h-10 w-px bg-edge sm:block" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
