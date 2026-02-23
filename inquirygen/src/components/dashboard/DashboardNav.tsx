"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  FolderOpen,
  Coins,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/generate", label: "Generate", icon: Sparkles },
  { href: "/dashboard/units", label: "My Units", icon: FolderOpen },
  { href: "/dashboard/credits", label: "Credits", icon: Coins },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 px-3 py-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary"
          >
            {isActive && (
              <motion.div
                layoutId="sidebar-active"
                className="absolute inset-0 rounded-lg border border-[#10b981]/20 bg-[#10b981]/10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-3">
              <item.icon
                className={`h-4 w-4 ${isActive ? "text-[#10b981]" : "text-muted-foreground"}`}
              />
              <span
                className={
                  isActive
                    ? "font-semibold text-[#10b981]"
                    : "text-muted-foreground"
                }
              >
                {item.label}
              </span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
