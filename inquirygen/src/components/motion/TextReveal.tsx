"use client";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  mode?: "word" | "char";
  staggerDelay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const tokenVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function TextReveal({
  children,
  className = "",
  mode = "word",
  staggerDelay = 0.04,
  as: Component = "h2",
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const MotionComponent = motion.create(Component);
  const tokens = mode === "word" ? children.split(" ") : children.split("");

  return (
    <MotionComponent
      ref={ref}
      className={className}
      variants={containerVariants}
      custom={staggerDelay}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {tokens.map((token, i) => (
        <motion.span
          key={`${token}-${i}`}
          variants={tokenVariants}
          style={{ display: "inline-block" }}
        >
          {token}
          {mode === "word" && i < tokens.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </MotionComponent>
  );
}
