import { Coins, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function CreditsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Credits</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your credit balance and purchase additional credits.
        </p>
      </div>

      {/* Balance */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-primary/10 p-3">
            <Coins className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p className="text-3xl font-bold">50 credits</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          ~1 full unit generation remaining
        </p>
      </div>

      {/* Credit packs */}
      <div>
        <h2 className="text-xl font-semibold">Buy More Credits</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { credits: 200, price: "$4.99" },
            { credits: 500, price: "$9.99" },
            { credits: 1500, price: "$24.99" },
            { credits: 5000, price: "$69.99" },
          ].map((pack) => (
            <button
              key={pack.credits}
              className="rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary hover:shadow-sm"
            >
              <p className="text-2xl font-bold">
                {pack.credits.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">credits</p>
              <p className="mt-2 text-lg font-semibold text-primary">
                {pack.price}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Transaction history */}
      <div>
        <h2 className="text-xl font-semibold">Transaction History</h2>
        <div className="mt-4 rounded-xl border border-border bg-card">
          <div className="p-8 text-center text-sm text-muted-foreground">
            No transactions yet. Your credit history will appear here.
          </div>
        </div>
      </div>
    </div>
  );
}
