"use client";

import { motion } from "framer-motion";
import { Clock, Brain, Zap } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const tensions = [
  {
    icon: Clock,
    stat: "8–15 hours",
    label: "per unit, by hand",
    description:
      "Teachers spend entire weekends building inquiry units from scratch — formatting documents, aligning standards, writing rubrics. The work is essential, but the process is unsustainable.",
  },
  {
    icon: Brain,
    stat: "Generic AI",
    label: "doesn't understand pedagogy",
    description:
      "Most AI tools produce flat, one-size-fits-all outputs. They don't know the 5E model, can't scaffold for diverse learners, and have never stood in front of a classroom.",
  },
  {
    icon: Zap,
    stat: "This moment",
    label: "demands something better",
    description:
      "Education is entering a new era. The best teachers won't be replaced by AI — they'll be amplified by it. What's been missing is a tool built by educators who understand the craft.",
  },
];

export function TheShift() {
  return (
    <section className="relative px-6 py-32">
      {/* Subtle divider gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-edge to-transparent" />

      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            The Shift
          </p>
          <h2 className="mt-4 font-display text-4xl font-light tracking-tight text-prose sm:text-5xl">
            Teaching is evolving.{" "}
            <span className="italic text-accent">Your tools should too.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted">
            The classroom of tomorrow needs teachers who are free to teach — not
            trapped in planning cycles that haven&apos;t changed in decades. We
            built InquiryGen for this exact moment.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {tensions.map((item, i) => (
            <motion.div
              key={item.stat}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              className="group relative rounded-2xl border border-edge-soft bg-surface/30 p-8 transition-all duration-500 hover:border-accent/20 hover:bg-surface/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/15">
                <item.icon className="h-5 w-5" />
              </div>

              <p className="mt-6 font-display text-2xl font-semibold text-prose">
                {item.stat}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-accent">
                {item.label}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Transition line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="mt-20 text-center"
        >
          <p className="font-display text-xl font-light italic text-muted">
            &ldquo;What if the hours you spend planning could be spent
            teaching?&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
