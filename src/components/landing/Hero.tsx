"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, FileText, Presentation, Check } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
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
    <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-14">
      <div className="mx-auto w-full max-w-4xl text-center">
        {/* Overline */}
        <motion.p
          {...fadeUp(0)}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
        >
          AI-POWERED LESSON DESIGN
        </motion.p>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="mx-auto mt-6 max-w-4xl font-display text-5xl font-light leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          The lesson planner that thinks like you do.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          {...fadeUp(0.2)}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl"
        >
          Generate complete, standards-aligned inquiry units &mdash; teacher
          guides, student materials, and presentations &mdash; in minutes, not
          hours.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-medium text-paper transition-opacity duration-200 hover:opacity-80"
          >
            Start creating free
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-medium text-ink transition-colors duration-200 hover:bg-surface"
          >
            See how it works
          </a>
        </motion.div>

        {/* Product mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="mx-auto mt-20 max-w-3xl"
        >
          <div className="overflow-hidden rounded-2xl border border-border-light bg-surface/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            {/* Browser top bar */}
            <div className="flex items-center gap-2 border-b border-border-light px-5 py-3">
              <div className="flex items-center gap-1.5">
                <span className="block h-2 w-2 rounded-full bg-[#FF5F57]" />
                <span className="block h-2 w-2 rounded-full bg-[#FFBD2E]" />
                <span className="block h-2 w-2 rounded-full bg-[#28C840]" />
              </div>
              <span className="flex-1 text-center text-xs text-muted">
                inquirygen.app
              </span>
              {/* Spacer to balance the dots on the left */}
              <div className="w-[52px]" />
            </div>

            {/* Body */}
            <div className="p-8">
              {/* Title row */}
              <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <h3 className="font-medium text-ink">
                  Photosynthesis &amp; Energy Transfer
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-muted">Grade 7</span>
                  <span className="text-xs text-muted">&middot;</span>
                  <span className="text-xs text-muted">5E Model</span>
                  <span className="text-xs text-muted">&middot;</span>
                  <span className="text-xs text-muted">NGSS</span>
                </div>
              </div>

              {/* Cards grid */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {mockupCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-xl border border-border-light bg-paper p-5"
                  >
                    <card.icon className="h-5 w-5 text-accent" />
                    <p className="mt-3 text-sm font-medium text-ink">
                      {card.title}
                    </p>
                    <p className="mt-1 text-xs text-muted">{card.subtitle}</p>
                    <div className="mt-3 flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#28C840]" />
                      <span className="text-xs font-medium text-[#28C840]">
                        Ready
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Standards footer */}
              <p className="mt-4 text-xs text-muted">
                Standards: MS-LS1-6, MS-PS3-3, MS-LS1-7
              </p>
            </div>
          </div>
        </motion.div>

        {/* Metrics strip */}
        <motion.div
          {...fadeUp(0.5)}
          className="mt-24"
        >
          <div className="mx-auto grid max-w-xl grid-cols-3 gap-8 sm:flex sm:items-center sm:justify-center sm:gap-12">
            {metrics.map((metric, i) => (
              <div key={metric.label} className="flex items-center gap-12">
                <div className="text-center">
                  <p className="font-display text-3xl font-semibold text-ink">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                    {metric.label}
                  </p>
                </div>
                {/* Vertical divider — hidden on mobile, hidden after last item */}
                {i < metrics.length - 1 && (
                  <div className="hidden h-10 w-px bg-border-light sm:block" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
