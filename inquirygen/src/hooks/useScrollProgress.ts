"use client";
import { useScroll, useTransform, MotionValue } from "framer-motion";
import { RefObject } from "react";

export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  options: { offset?: [string, string] } = {},
): { scrollYProgress: MotionValue<number> } {
  const { scrollYProgress } = useScroll({
    target: ref,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: (options.offset ?? ["start end", "end start"]) as any,
  });

  return { scrollYProgress };
}

export function useParallax(
  scrollYProgress: MotionValue<number>,
  distance: number = 50,
) {
  return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
}
