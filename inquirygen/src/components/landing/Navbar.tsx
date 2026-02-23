"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["features", "story", "pricing", "faq"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { href: "#features", label: "Features", id: "features" },
    { href: "#story", label: "Our Story", id: "story" },
    { href: "#pricing", label: "Pricing", id: "pricing" },
    { href: "#faq", label: "FAQ", id: "faq" },
  ];

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrolled
            ? "liquid-glass !rounded-none !border-x-0 !border-t-0 shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 lg:px-8 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]"
            >
              <Sparkles className="h-6 w-6 text-[#10b981]" />
            </motion.div>
            <span className="font-display text-xl text-[#0f172a]">InquiryGen</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`nav-link text-sm transition-colors hover:text-[#0f172a] ${
                  activeSection === link.id ? "text-[#0f172a]" : "text-[#475569]"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute bottom-[-4px] left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-[#10b981] to-[#34d399]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}

            <SignedOut>
              <Link
                href="/sign-in"
                className="nav-link text-sm font-medium text-[#475569] transition-colors hover:text-[#0f172a]"
              >
                Log In
              </Link>
              <Link
                href="/sign-up"
                className="btn-glow rounded-lg bg-gradient-to-r from-[#10b981] to-[#059669] px-4 py-2 text-sm font-semibold text-white transition-all"
              >
                Get Started
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="btn-glow rounded-lg bg-gradient-to-r from-[#10b981] to-[#059669] px-4 py-2 text-sm font-semibold text-white transition-all"
              >
                Dashboard
              </Link>
              <UserButton />
            </SignedIn>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="text-[#0f172a] md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="liquid-glass !rounded-t-none border-t border-[#0f172a]/10 md:hidden"
            >
              <div className="flex flex-col gap-4 px-4 py-6">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm text-[#475569] hover:text-[#0f172a]"
                  >
                    {link.label}
                  </a>
                ))}
                <SignedOut>
                  <Link href="/sign-in" className="text-sm font-medium text-[#475569]">
                    Log In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="rounded-lg bg-gradient-to-r from-[#10b981] to-[#059669] px-4 py-2 text-center text-sm font-semibold text-white"
                  >
                    Get Started
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link
                    href="/dashboard"
                    className="rounded-lg bg-gradient-to-r from-[#10b981] to-[#059669] px-4 py-2 text-center text-sm font-semibold text-white"
                  >
                    Dashboard
                  </Link>
                </SignedIn>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
