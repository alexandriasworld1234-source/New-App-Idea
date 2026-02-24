"use client";

import { motion } from "framer-motion";

/* ─── Animation helpers ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const viewportConfig = { once: true, margin: "-80px" as const };

/* ─── Credential pills ─── */

const credentials = [
  "20+ Years Teaching",
  "50+ Frameworks Supported",
  "Used in 12 Countries",
];

/* ─── Main Component ─── */

export function OurStory() {
  return (
    <section id="story" className="py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-6 text-center">
        {/* Overline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
        >
          Our story
        </motion.p>

        {/* Headline */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 font-display text-4xl font-light tracking-tight text-ink sm:text-5xl lg:text-6xl"
        >
          Built by educators, for educators.
        </motion.h2>

        {/* Body text */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted"
        >
          InquiryGen was born from 20 years of classroom experience and one
          simple frustration: the best teaching practices take the most time to
          plan. We built the tool we wished we had&nbsp;&mdash; one that
          understands pedagogy as deeply as it understands technology.
        </motion.p>

        {/* Credential pills */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          {credentials.map((label) => (
            <span
              key={label}
              className="rounded-full border border-border-light bg-surface px-6 py-3 text-sm font-medium text-ink/70"
            >
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
