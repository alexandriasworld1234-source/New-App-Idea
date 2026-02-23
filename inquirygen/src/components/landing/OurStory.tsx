"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Globe, Heart } from "lucide-react";
import { TextReveal } from "@/components/motion/TextReveal";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const credentials = [
  {
    icon: GraduationCap,
    stat: "20+",
    label: "Years of Classroom Experience",
    description: "Built by educators who've lived the daily reality of lesson planning",
  },
  {
    icon: Globe,
    stat: "6",
    label: "Standards Frameworks",
    description: "IB, UK National Curriculum, Australian, NGSS, Common Core, and state standards",
  },
  {
    icon: Heart,
    stat: "1",
    label: "Mission",
    description: "Give every teacher time back — so they can focus on what matters most",
  },
];

export function OurStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="story" ref={ref} className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Part 1 — Credibility */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#10b981]/20 bg-[#10b981]/5 px-4 py-1.5 text-sm font-medium text-[#10b981]">
              Our Story
            </span>
          </motion.div>

          <div className="mt-6">
            <TextReveal
              as="h2"
              className="font-display text-3xl tracking-tight text-[#0f172a] sm:text-4xl"
              staggerDelay={0.06}
            >
              Built by Educators, for Educators
            </TextReveal>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="mt-6 text-lg leading-relaxed text-[#475569]"
          >
            We didn&apos;t build a tool &mdash; we built the solution we wished we had.
            Over 20 years of combined classroom experience taught us that inquiry-based
            teaching shouldn&apos;t require 15-hour weekends. We&apos;re inquiry
            practitioners who know what real teaching demands.
          </motion.p>
        </div>

        {/* Credential cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {credentials.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 * (i + 1), ease }}
              className="liquid-glass-subtle p-6 text-center"
            >
              <div className="mx-auto inline-flex rounded-xl bg-[#10b981]/10 p-3">
                <item.icon className="h-6 w-6 text-[#10b981]" />
              </div>
              <div className="mt-3">
                <span className="font-display bg-gradient-to-r from-[#10b981] to-[#34d399] bg-clip-text text-3xl font-bold text-transparent">
                  {item.stat}
                </span>
              </div>
              <h4 className="mt-1 text-sm font-semibold text-[#0f172a]">{item.label}</h4>
              <p className="mt-2 text-xs leading-relaxed text-[#475569]">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Part 2 — Vision */}
        <div className="mt-20 mx-auto max-w-3xl text-center">
          <div>
            <TextReveal
              as="h2"
              className="font-display text-3xl tracking-tight text-[#0f172a] sm:text-4xl"
              staggerDelay={0.06}
            >
              Preparing Future-Ready Students
            </TextReveal>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mt-6 text-lg leading-relaxed text-[#475569]"
          >
            The world our students will inherit requires deeper learning. Critical
            thinking, creativity, and agency aren&apos;t buzzwords &mdash; they&apos;re
            survival skills. Inquiry-based and project-based experiences build the
            capacities students need to navigate complexity and drive change.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="liquid-glass-subtle mt-8 p-6"
          >
            <p className="text-sm leading-relaxed text-[#475569] italic">
              &ldquo;When teachers spend less time assembling resources and more time
              facilitating discovery, students don&apos;t just learn content &mdash; they
              learn how to learn. That&apos;s the bridge InquiryGen builds: from teacher
              planning burden to student outcomes that matter.&rdquo;
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
