"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const footerLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
];

export function Footer() {
  return (
    <footer>
      {/* Final CTA */}
      <section className="bg-dark py-28 sm:py-36">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.h2
            {...fadeUp}
            className="font-display text-4xl font-light tracking-tight text-paper sm:text-5xl lg:text-6xl"
          >
            Ready to transform your planning?
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="mt-6 text-lg text-dark-muted"
          >
            Join hundreds of educators generating better lessons in less time.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="mt-10"
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-ink transition-opacity duration-200 hover:opacity-90"
            >
              Start creating free
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Bottom bar */}
      <div className="border-t border-dark-border bg-dark">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          {/* Copyright */}
          <p className="text-xs text-dark-muted">
            &copy; 2026 InquiryGen
          </p>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-dark-muted transition-colors duration-200 hover:text-paper"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
