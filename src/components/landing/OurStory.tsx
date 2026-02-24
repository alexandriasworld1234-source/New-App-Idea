"use client";

import { motion } from "framer-motion";
import { Leaf, Globe, Compass } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const pillars = [
  {
    icon: Leaf,
    title: "Rooted in Experience",
    description:
      "20+ years designing inquiry-based units by hand — we know what good pedagogy looks like because we've lived it.",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description:
      "50+ curriculum frameworks from 12 countries inform our AI, ensuring culturally responsive and standards-aligned outputs.",
  },
  {
    icon: Compass,
    title: "Built for What's Next",
    description:
      "Education is changing faster than ever. InquiryGen evolves with emerging standards, new inquiry models, and educator feedback.",
  },
];

export function OurStory() {
  return (
    <section id="story" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Our Story
          </p>
          <h2 className="mt-4 font-display text-4xl font-light tracking-tight text-prose sm:text-5xl">
            From the classroom{" "}
            <span className="italic text-accent">to the future</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted">
            InquiryGen was born from a simple frustration: brilliant teachers
            spending more time formatting documents than inspiring students. We
            didn&apos;t build another template library — we built an AI that
            thinks the way experienced educators plan. Backwards from standards.
            Scaffolded for real classrooms. Ready for Monday morning and ready
            for whatever comes next.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="group rounded-2xl border border-edge-soft bg-surface/30 p-6 text-center transition-all duration-500 hover:border-accent/20 hover:bg-surface/50"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/15">
                <pillar.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-medium text-prose">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
