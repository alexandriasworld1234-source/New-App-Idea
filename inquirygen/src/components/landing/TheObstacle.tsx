"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Puzzle, Target } from "lucide-react";
import { TiltCard } from "@/components/motion/TiltCard";
import { TextReveal } from "@/components/motion/TextReveal";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const obstacles = [
  {
    icon: Clock,
    title: "Time-Starved Teachers",
    stat: "8-15 hrs",
    statLabel: "per unit",
    description:
      "Planning a single inquiry unit takes 8\u201315 hours. Most teachers plan 20+ units per year. The math doesn\u2019t work.",
  },
  {
    icon: Puzzle,
    title: "Fragmented Resources",
    stat: "3+",
    statLabel: "sources needed",
    description:
      "Student slides from one source, activities from another, assessments from a third. Nothing connects coherently.",
  },
  {
    icon: Target,
    title: "Standards Misalignment",
    stat: "0%",
    statLabel: "perfect match",
    description:
      "Downloaded resources rarely match your specific standards framework, grade level, and pedagogical approach.",
  },
];

const entranceDirections = [
  { x: -40, y: 0 },
  { x: 0, y: 40 },
  { x: 40, y: 0 },
];

export function TheObstacle() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="dot-grid-light relative bg-[#f8fafc] py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <TextReveal
            as="h2"
            className="font-display text-3xl tracking-tight text-foreground sm:text-4xl"
          >
            Why Inquiry Planning Is So Hard
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mt-4 text-lg text-muted-foreground"
          >
            You know inquiry-based learning works. The problem isn&apos;t the pedagogy
            &mdash; it&apos;s the planning burden.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {obstacles.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                x: entranceDirections[i].x,
                y: entranceDirections[i].y,
              }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * (i + 1), ease }}
            >
              <TiltCard
                className="accent-bar card-hover rounded-2xl border border-border bg-white p-8 text-center shadow-sm"
                maxTilt={6}
              >
                <div className="mx-auto inline-flex rounded-xl bg-gradient-to-br from-[#10b981]/15 to-[#10b981]/5 p-4 shadow-[0_0_20px_rgba(16,185,129,0.08)]">
                  <item.icon className="h-7 w-7 text-[#10b981]" />
                </div>
                <h3 className="font-display mt-4 text-lg">{item.title}</h3>
                <div className="mt-2">
                  <span className="font-display bg-gradient-to-r from-[#10b981] to-[#34d399] bg-clip-text text-2xl font-bold text-transparent">
                    {item.stat}
                  </span>
                  <span className="ml-1 text-xs text-muted-foreground">
                    {item.statLabel}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
