import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card md:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-border px-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-[#10b981] drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
              <span className="text-lg font-bold">InquiryGen</span>
            </Link>
          </div>

          {/* Navigation — client component with animated active state */}
          <DashboardNav />

          {/* User */}
          <div className="border-t border-border p-4">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: { avatarBox: "h-8 w-8" },
              }}
            />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        {/* Mobile header */}
        <header className="flex h-16 items-center justify-between border-b border-border px-4 md:hidden">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#10b981]" />
            <span className="font-bold">InquiryGen</span>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </header>

        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
