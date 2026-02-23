"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, Check } from "lucide-react";
import { TextReveal } from "@/components/motion/TextReveal";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const oldWay = [
  "Hours searching Teachers Pay Teachers and Pinterest",
  "Copy-pasting from multiple sources",
  "Misaligned standards and assessments",
  "Generic worksheets that don\u2019t build inquiry skills",
  "Starting from scratch for every unit",
];

const newWay = [
  "Complete units generated in minutes",
  "Coherent, research-backed lesson sequences",
  "Automatically aligned to your standards",
  "Authentic inquiry tasks with student agency",
  "Customizable templates that grow with you",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    x: 0,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.5, ease },
  },
};

export function TheShift() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-gradient-to-b from-white to-[#f8fafc] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <TextReveal
            as="h2"
            className="font-display text-3xl tracking-tight text-foreground sm:text-4xl"
          >
            The Shift Inquiry Teaching Needs
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mt-4 text-lg text-muted-foreground"
          >
            The old way of building inquiry units doesn&apos;t scale. InquiryGen changes
            that.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-[1fr_auto_1fr]">
          {/* Old Way */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="card-hover rounded-2xl border border-red-200 bg-gradient-to-br from-red-50/80 to-red-100/30 p-8 shadow-sm"
          >
            <h3 className="font-display text-lg text-red-900">The Old Way</h3>
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-6 space-y-4"
            >
              {oldWay.map((item) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  className="flex items-start gap-3 text-sm text-red-800"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                    <X className="h-3.5 w-3.5 text-red-500" />
                  </span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Center divider */}
          <div className="hidden items-center justify-center md:flex">
            <motion.div
              className="h-3/4 w-px bg-gradient-to-b from-transparent via-[#10b981]/40 to-transparent"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease }}
            />
          </div>

          {/* New Way */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="card-hover rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 to-emerald-100/30 p-8 shadow-sm"
          >
            <h3 className="font-display text-lg text-emerald-900">
              The InquiryGen Way
            </h3>
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-6 space-y-4"
            >
              {newWay.map((item) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  className="flex items-start gap-3 text-sm text-emerald-800"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  </span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
