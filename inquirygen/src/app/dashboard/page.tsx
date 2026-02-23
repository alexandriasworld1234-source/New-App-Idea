import { auth } from "@clerk/nextjs/server";
import { Sparkles, FolderOpen, Coins } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome to InquiryGen. Generate inquiry-based learning units powered
          by AI.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-[#10b981]/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.06)]">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Coins className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Credits</p>
              <p className="text-2xl font-bold">50</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-[#10b981]/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.06)]">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#10b981]/10 p-2">
              <FolderOpen className="h-5 w-5 text-[#10b981]" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Units Generated</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-[#10b981]/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.06)]">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#10b981]/10 p-2">
              <Sparkles className="h-5 w-5 text-[#10b981]" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Plan</p>
              <p className="text-2xl font-bold">Free</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick action */}
      <div className="rounded-xl border-2 border-dashed border-border bg-muted/50 p-8 text-center">
        <Sparkles className="mx-auto h-10 w-10 text-[#10b981]" />
        <h2 className="mt-4 text-xl font-semibold">
          Create Your First Unit
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Enter a topic, select your grade level and standards, and let AI
          generate a complete inquiry-based learning unit.
        </p>
        <Link
          href="/dashboard/generate"
          className="btn-glow mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#10b981] to-[#059669] px-6 py-3 text-sm font-medium text-white transition-all"
        >
          <Sparkles className="h-4 w-4" />
          Generate a Unit
        </Link>
      </div>
    </div>
  );
}
