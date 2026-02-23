import { FolderOpen } from "lucide-react";
import Link from "next/link";

export default function UnitsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Units</h1>
        <p className="mt-1 text-muted-foreground">
          View, edit, and export your generated units.
        </p>
      </div>

      <div className="rounded-xl border-2 border-dashed border-border bg-muted/50 p-12 text-center">
        <FolderOpen className="mx-auto h-10 w-10 text-muted-foreground" />
        <h2 className="mt-4 text-lg font-semibold">No units yet</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          Generate your first inquiry-based unit and it will appear here.
        </p>
        <Link
          href="/dashboard/generate"
          className="mt-6 inline-flex rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Generate a Unit
        </Link>
      </div>
    </div>
  );
}
