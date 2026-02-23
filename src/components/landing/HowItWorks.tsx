"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MessageSquare, Cpu, Download } from "lucide-react";
import { TextReveal } from "@/components/motion/TextReveal";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Describe Your Lesson",
    description:
      "Enter your topic, grade level, and standards framework. Choose an inquiry model or let InquiryGen recommend one.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Builds Your Unit",
    description:
      "Our AI generates a complete unit: teacher guide, student presentation, activity pack, rubrics, and assessments \u2014 all coherently connected.",
  },
  {
    number: "03",
    icon: Download,
    title: "Review, Edit & Export",
    description:
      "Preview everything in-browser. Edit any section. Regenerate what you don\u2019t like. Export to PowerPoint and Word when ready.",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 60%"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} id="how-it-works" className="bg-white py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <TextReveal
            as="h2"
            className="font-display text-3xl tracking-tight text-foreground sm:text-4xl"
          >
            How It Works
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mt-4 text-lg text-muted-foreground"
          >
            From topic to complete unit in three steps.
          </motion.p>
        </div>

        <div className="relative mt-16 grid gap-12 md:grid-cols-3">
          {/* Draw-on-scroll connector line (desktop only) */}
          <div className="absolute top-9 left-[16.6%] right-[16.6%] hidden md:block">
            <div className="h-[2px] w-full bg-[#10b981]/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#10b981]/30 via-[#10b981]/60 to-[#10b981]/30"
                style={{ width: lineWidth }}
              />
            </div>
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * (i + 1), ease }}
              className="relative text-center"
            >
              <motion.div
                className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.1)]"
                initial={{
                  background:
                    "linear-gradient(135deg, rgba(16,185,129,0.05), rgba(16,185,129,0.02))",
                }}
                animate={
                  isInView
                    ? {
                        background:
                          "linear-gradient(135deg, rgba(16,185,129,0.25), rgba(16,185,129,0.15))",
                        boxShadow: "0 0 35px rgba(16,185,129,0.15)",
                      }
                    : {}
                }
                transition={{ duration: 0.8, delay: 0.4 * (i + 1) }}
              >
                <step.icon className="h-8 w-8 text-[#10b981]" />
              </motion.div>
              <motion.div
                className="mt-3 inline-flex rounded-full bg-[#10b981]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#10b981]"
                animate={
                  isInView
                    ? { animation: "pulseGlow 2s ease-in-out infinite" }
                    : {}
                }
                transition={{ delay: 0.5 * (i + 1) }}
              >
                Step {step.number}
              </motion.div>
              <h3 className="font-display mt-3 text-xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
