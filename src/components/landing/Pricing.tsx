"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const plans = [
  {
    name: "Preview",
    description: "Try InquiryGen free",
    monthlyPrice: 0,
    annualPrice: 0,
    priceLabel: "Free",
    cta: "Start free",
    featured: false,
    features: [
      "3 complete units",
      "All three documents per unit",
      "NGSS standards alignment",
      "Word & PowerPoint export",
    ],
  },
  {
    name: "Pro",
    description: "Unlimited lesson design",
    monthlyPrice: 14,
    annualPrice: 99,
    priceLabel: "",
    cta: "Go Pro",
    featured: true,
    features: [
      "Unlimited units",
      "All three documents per unit",
      "All standards frameworks",
      "Priority generation speed",
      "Custom branding",
      "Early access to new features",
    ],
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Pricing
          </p>
          <h2 className="mt-4 font-display text-4xl font-light tracking-tight text-prose sm:text-5xl">
            Start free, scale when ready
          </h2>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <span
            className={`text-sm transition-colors duration-200 ${!annual ? "text-prose" : "text-muted"}`}
          >
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${
              annual ? "bg-accent" : "bg-edge"
            }`}
            aria-label="Toggle billing period"
          >
            <div
              className="absolute top-0.5 h-6 w-6 rounded-full bg-canvas shadow-md transition-all duration-300"
              style={{ left: annual ? "calc(100% - 1.625rem)" : "0.125rem" }}
            />
          </button>
          <span
            className={`text-sm transition-colors duration-200 ${annual ? "text-prose" : "text-muted"}`}
          >
            Annual
          </span>
          {annual && (
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
              Save 41%
            </span>
          )}
        </motion.div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className={`relative rounded-2xl border p-8 transition-all duration-500 ${
                plan.featured
                  ? "border-accent/30 bg-accent/[0.03]"
                  : "border-edge bg-surface/30"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 right-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-canvas">
                  Most Popular
                </span>
              )}

              <h3 className="font-display text-xl font-medium text-prose">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{plan.description}</p>

              <div className="mt-6">
                {plan.priceLabel ? (
                  <p className="font-display text-4xl font-semibold text-prose">
                    {plan.priceLabel}
                  </p>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={annual ? "annual" : "monthly"}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="font-display text-4xl font-semibold text-prose"
                      >
                        ${annual ? plan.annualPrice : plan.monthlyPrice}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-sm text-muted">
                      /{annual ? "year" : "month"}
                    </span>
                  </div>
                )}
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-sm text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`mt-8 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all duration-300 ${
                  plan.featured
                    ? "bg-accent text-canvas hover:brightness-110 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]"
                    : "border border-edge text-prose hover:border-accent/40 hover:bg-accent/[0.05]"
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
