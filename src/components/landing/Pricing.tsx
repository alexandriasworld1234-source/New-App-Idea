"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, Shield } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "@/components/motion/MagneticButton";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const previewFeatures = [
  "Try the demo generator above",
  "See sample lesson formats",
  "No account required",
  "Read-only preview",
];

const paidFeatures = [
  "Unlimited generations",
  "Full .pptx & .docx export",
  "All inquiry frameworks",
  "All standards frameworks",
  "Priority AI generation",
  "No watermarks",
];

export function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [annual, setAnnual] = useState(true);

  const paidPrice = annual ? "$99" : "$14";
  const paidPeriod = annual ? "/year" : "/month";

  return (
    <div ref={ref} id="pricing" className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="font-display text-3xl tracking-tight text-[#0f172a] sm:text-4xl"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="mt-4 text-lg text-[#475569]"
          >
            Professional tools, transparent pricing.
          </motion.p>

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-[#0f172a]/10 bg-[#0f172a]/[0.03] p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                !annual
                  ? "liquid-glass-tab text-[#0f172a]"
                  : "text-[#475569]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                annual
                  ? "liquid-glass-tab text-[#0f172a]"
                  : "text-[#475569]"
              }`}
            >
              Annual
              {annual && (
                <span className="ml-2 rounded-full bg-[#10b981]/10 px-2 py-0.5 text-xs font-semibold text-[#10b981]">
                  Save $69
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Preview Plan */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="liquid-glass p-8"
          >
            <h3 className="text-lg font-semibold text-[#0f172a]">Preview</h3>
            <div className="mt-4">
              <span className="font-display text-5xl text-[#0f172a]">Free</span>
            </div>
            <p className="mt-2 text-sm text-[#475569]">
              Explore InquiryGen &mdash; no account needed
            </p>
            <ul className="mt-8 space-y-4">
              {previewFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-[#475569]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#475569]/50" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="mt-8 block rounded-xl border border-[#0f172a]/10 px-6 py-3 text-center text-sm font-semibold text-[#0f172a] transition-colors hover:bg-[#0f172a]/5"
            >
              Try Demo Above
            </a>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            whileHover={{ y: -4 }}
            className="liquid-glass-strong glass-glow glass-shimmer relative p-8"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#10b981] to-[#059669] px-4 py-1 text-xs font-semibold text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              Recommended
            </div>
            <h3 className="text-lg font-semibold text-[#0f172a]">Pro</h3>
            <div className="mt-4 flex items-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={annual ? "annual" : "monthly"}
                  className="font-display text-5xl text-[#0f172a]"
                  initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                >
                  {paidPrice}
                </motion.span>
              </AnimatePresence>
              <span className="text-[#475569]">{paidPeriod}</span>
            </div>
            {annual && (
              <p className="mt-1 text-sm font-medium text-[#10b981]">
                Save $69 vs monthly
              </p>
            )}
            <p className="mt-2 text-sm text-[#475569]">
              Everything you need to teach with inquiry
            </p>
            <ul className="mt-8 space-y-4">
              {paidFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-[#475569]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#10b981]" />
                  {feature}
                </li>
              ))}
            </ul>
            <MagneticButton strength={0.2} className="mt-8 block w-full">
              <Link
                href="/sign-up"
                className="btn-glow block rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] px-6 py-3 text-center text-sm font-semibold text-white transition-all"
              >
                Start Your Subscription
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-[#475569]/60">
          <Shield className="h-4 w-4" />
          No student data is collected or stored.
        </div>
      </div>
    </div>
  );
}
