"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const previewFeatures = [
  "3 preview generations",
  "View-only output",
  "Basic standards search",
  "Community support",
];

const proFeatures = [
  "Unlimited generations",
  "Full export to Word & PowerPoint",
  "All inquiry models (5E, PBL, Kath Murdoch, Design Thinking)",
  "Custom standards & frameworks",
  "Priority AI processing",
  "Email support",
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="bg-surface py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-6">
        {/* Overline */}
        <motion.p
          {...fadeUp}
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent"
        >
          Pricing
        </motion.p>

        {/* Headline */}
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-4 text-center font-display text-4xl font-light tracking-tight text-ink sm:text-5xl lg:text-6xl"
        >
          Start free. Scale when you&rsquo;re ready.
        </motion.h2>

        {/* Toggle */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <div className="inline-flex rounded-full border border-border bg-paper p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                !annual ? "bg-ink text-paper" : "text-muted"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                annual ? "bg-ink text-paper" : "text-muted"
              }`}
            >
              Annual
            </button>
          </div>
          <AnimatePresence>
            {annual && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="text-xs font-semibold text-accent"
              >
                Save 30%
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Cards */}
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
          {/* Preview (Free) Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.1,
            }}
            className="rounded-2xl border border-border bg-paper p-10"
          >
            {/* Plan name */}
            <p className="text-sm font-semibold uppercase tracking-wider text-muted">
              Preview
            </p>

            {/* Price */}
            <p className="mt-2 font-display text-5xl font-light text-ink">
              $0
            </p>

            {/* Subtitle */}
            <p className="mt-1 text-sm text-muted">Forever free</p>

            {/* Divider */}
            <div className="my-8 border-t border-border-light" />

            {/* Features */}
            <ul className="space-y-4">
              {previewFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                  <span className="text-sm text-ink">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#"
              className="mt-8 block rounded-full border border-border py-3.5 text-center text-sm font-medium text-ink transition-colors duration-200 hover:bg-surface"
            >
              Get started
            </a>
          </motion.div>

          {/* Pro Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.25,
            }}
            className="relative overflow-hidden rounded-2xl bg-ink p-10 text-paper"
          >
            {/* Most Popular badge */}
            <span className="absolute right-5 top-5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ink">
              Most Popular
            </span>

            {/* Plan name */}
            <p className="text-sm font-semibold uppercase tracking-wider text-dark-muted">
              Pro
            </p>

            {/* Price */}
            <div className="mt-2 flex items-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={annual ? "annual" : "monthly"}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.25 }}
                  className="font-display text-5xl font-light text-paper"
                >
                  {annual ? "$99" : "$14"}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Subtitle */}
            <p className="mt-1 text-sm text-dark-muted">
              {annual ? "per year, billed annually" : "/month"}
            </p>

            {/* Divider */}
            <div className="my-8 border-t border-dark-border" />

            {/* Features */}
            <ul className="space-y-4">
              {proFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-sm text-paper/90">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#"
              className="mt-8 block rounded-full bg-accent py-3.5 text-center text-sm font-semibold text-ink transition-opacity duration-200 hover:opacity-90"
            >
              Subscribe
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
