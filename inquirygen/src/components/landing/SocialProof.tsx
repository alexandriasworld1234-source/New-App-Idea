"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const stats = [
  { value: 500, suffix: "+", label: "Units Generated", decimals: 0 },
  { value: 15, suffix: " hrs", label: "Saved Per Teacher", decimals: 0 },
  { value: 98, suffix: "%", label: "Standards Alignment", decimals: 0 },
  { value: 4.9, suffix: "/5", label: "Teacher Rating", decimals: 1 },
];

function AnimatedCounter({
  value,
  suffix,
  decimals = 0,
  trigger,
}: {
  value: number;
  suffix: string;
  decimals?: number;
  trigger: boolean;
}) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!trigger) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(latest.toFixed(decimals));
      },
    });
    return () => controls.stop();
  }, [trigger, value, decimals]);

  return (
    <span className="font-display bg-gradient-to-r from-[#10b981] to-[#34d399] bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
      {display}
      {suffix}
    </span>
  );
}

export function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="liquid-glass-subtle mx-auto mt-10 max-w-3xl px-6 py-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`text-center ${i < stats.length - 1 ? "md:border-r md:border-[#0f172a]/10" : ""}`}
          >
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              decimals={stat.decimals}
              trigger={isInView}
            />
            <p className="mt-1 text-xs text-[#475569]">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
