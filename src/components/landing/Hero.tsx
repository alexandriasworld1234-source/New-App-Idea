"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DemoGenerator } from "./DemoGenerator";
import { SocialProof } from "./SocialProof";
import { TextReveal } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [spotlightVisible, setSpotlightVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlightPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setSpotlightVisible(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="aurora-bg animated-gradient-bg cursor-spotlight relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlightVisible(false)}
    >
      {/* Cursor spotlight */}
      <div
        className="spotlight-gradient"
        style={{
          left: spotlightPos.x,
          top: spotlightPos.y,
          opacity: spotlightVisible ? 1 : 0,
        }}
      />

      {/* Floating glow orbs with parallax */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="float-orb absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-[#10b981]/8 blur-[120px]"
          style={{ y: orb1Y }}
        />
        <motion.div
          className="float-orb-slow absolute right-1/4 bottom-1/4 h-[350px] w-[350px] rounded-full bg-primary/6 blur-[100px]"
          style={{ y: orb2Y }}
        />
        <motion.div
          className="float-orb absolute bottom-1/3 left-1/2 h-[250px] w-[250px] rounded-full bg-[#34d399]/5 blur-[80px]"
          style={{ y: orb3Y }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pt-24 pb-8 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-4 py-1.5 text-sm font-medium text-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.1)] backdrop-blur-sm">
            AI-Powered Inquiry Lesson Generator
          </div>
        </motion.div>

        {/* Headline */}
        <div className="font-display text-5xl tracking-tight text-[#0f172a] sm:text-6xl lg:text-7xl">
          <TextReveal
            as="span"
            className="font-display text-5xl tracking-tight text-[#0f172a] sm:text-6xl lg:text-7xl"
            staggerDelay={0.08}
          >
            Stop Searching.
          </TextReveal>{" "}
          <TextReveal
            as="span"
            className="font-display bg-gradient-to-r from-[#10b981] to-[#34d399] bg-clip-text text-5xl tracking-tight text-transparent sm:text-6xl lg:text-7xl"
            staggerDelay={0.08}
          >
            Start Teaching.
          </TextReveal>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease }}
          className="mx-auto mt-6 max-w-2xl text-lg text-[#475569] sm:text-xl"
        >
          Generate complete, standards-aligned inquiry units &mdash; teacher guides,
          student materials, and presentations &mdash; in minutes, not hours.
        </motion.p>

        {/* Demo Generator in Liquid Glass panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease }}
          className="mx-auto mt-10 max-w-2xl"
        >
          <div className="liquid-glass glass-refraction p-6">
            <DemoGenerator />
          </div>
        </motion.div>

        {/* CTAs below demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <MagneticButton strength={0.25}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#pricing"
                className="btn-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] px-8 py-4 text-base font-semibold text-white shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </MagneticButton>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#features"
              className="inline-flex items-center gap-2 rounded-xl border border-[#0f172a]/15 px-8 py-4 text-base font-semibold text-[#475569] transition-all hover:border-[#10b981]/40 hover:bg-[#10b981]/5 hover:text-[#0f172a] hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
            >
              See Features
            </Link>
          </motion.div>
        </motion.div>

        {/* Social proof stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4, ease }}
        >
          <SocialProof />
        </motion.div>
      </div>
    </section>
  );
}
