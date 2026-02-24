"use client";

import { motion } from "framer-motion";
import { Globe, Lightbulb, Wrench } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const pillars = [
  {
    icon: Lightbulb,
    title: "Education 4.0",
    label: "The new paradigm",
    description:
      "Coined by the World Economic Forum, Education 4.0 is the framework for teaching in the Fourth Industrial Revolution. It calls for a fundamental shift: from rote memorization and standardized delivery to student-centered, inquiry-driven, competency-based learning — where students think critically, collaborate authentically, and construct knowledge through real-world investigation.",
  },
  {
    icon: Globe,
    title: "Global Proof",
    label: "The world's best systems agree",
    description:
      "Finland redesigned its entire national curriculum around Phenomenon-Based Learning — student-driven inquiry where real-world phenomena, not textbook chapters, drive every lesson. From Singapore's Thinking Schools to Japan's Lesson Study to the IB framework, the highest-performing education systems share one principle: students learn best when they investigate, not just receive.",
  },
  {
    icon: Wrench,
    title: "The Missing Tool",
    label: "Built for this moment",
    description:
      "These frameworks demand sophisticated planning — scaffolded inquiry sequences, multi-standard alignment, differentiated materials for diverse learners. Teachers understand the vision but lack the hours to execute it. InquiryGen was built to close this gap: AI that understands inquiry pedagogy, not just content generation.",
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
            Welcome to{" "}
            <span className="italic text-accent">Education 4.0</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted">
            The world&apos;s top education systems — from Finland to Singapore
            to IB — have already made the shift to inquiry-driven learning.
            InquiryGen is built on lessons drawn from these global leaders,
            bringing world-class pedagogical thinking into every unit we
            generate.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {pillars.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              className="group relative rounded-2xl border border-edge-soft bg-surface/30 p-8 transition-all duration-500 hover:border-accent/20 hover:bg-surface/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/15">
                <item.icon className="h-5 w-5" />
              </div>

              <h3 className="mt-6 font-display text-xl font-semibold text-prose">
                {item.title}
              </h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-accent">
                {item.label}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Transition */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="mt-20 text-center"
        >
          <p className="font-display text-xl font-light italic text-muted">
            &ldquo;The future belongs to classrooms where students investigate,
            not just receive.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
