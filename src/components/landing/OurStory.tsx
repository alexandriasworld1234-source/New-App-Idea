"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const credentials = [
  "20+ Years in Classrooms",
  "50+ Curriculum Frameworks",
  "Used in 12 Countries",
];

export function OurStory() {
  return (
    <section id="story" className="relative px-6 py-32">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Our Story
          </p>
          <h2 className="mt-4 font-display text-4xl font-light tracking-tight text-prose sm:text-5xl">
            Built by educators,{" "}
            <span className="italic text-accent">for educators</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted"
        >
          InquiryGen was born in real classrooms. After two decades of designing
          inquiry-based units by hand — spending weekends on teacher guides and
          late nights formatting student packs — we built the tool we always
          wished existed. Every output reflects how experienced educators
          actually plan: backwards from standards, scaffolded for diverse
          learners, and ready to use on Monday morning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {credentials.map((cred) => (
            <span
              key={cred}
              className="rounded-full border border-edge bg-surface/50 px-4 py-2 text-xs font-medium text-muted"
            >
              {cred}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
