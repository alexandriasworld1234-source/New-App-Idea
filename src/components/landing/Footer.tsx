"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const footerLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="relative z-[1] border-t border-edge">
      {/* Final CTA */}
      <div className="relative px-6 py-32">
        {/* Subtle gradient wash */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="relative mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-light tracking-tight text-prose sm:text-4xl">
            Ready to transform{" "}
            <span className="italic text-accent">your planning?</span>
          </h2>
          <p className="mt-4 text-muted">
            Join hundreds of educators saving hours every week.
          </p>
          <a
            href="#pricing"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-canvas transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_30px_rgba(52,211,153,0.25)]"
          >
            Start creating free
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-edge-soft px-6 py-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-faint">
            &copy; {new Date().getFullYear()} InquiryGen. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-faint transition-colors duration-200 hover:text-muted"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
