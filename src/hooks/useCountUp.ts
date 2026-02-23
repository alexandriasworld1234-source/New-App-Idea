"use client";
import { useMotionValue, useTransform, animate, MotionValue } from "framer-motion";
import { useEffect } from "react";

export function useCountUp(
  target: number,
  duration: number = 1.5,
  trigger: boolean = true,
): MotionValue<number> {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    if (!trigger) return;
    const controls = animate(motionValue, target, {
      duration,
      ease: "easeOut",
    });
    return controls.stop;
  }, [motionValue, target, duration, trigger]);

  return rounded;
}
