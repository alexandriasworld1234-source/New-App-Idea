import { db } from "@/db";
import { users, creditTransactions } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function checkAndReserveCredits(
  userId: string,
  estimatedCredits: number
): Promise<{ allowed: boolean; balance: number; reserved: number }> {
  // Fetch current balance and role
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: { creditBalance: true, role: true },
  });

  if (!user) {
    return { allowed: false, balance: 0, reserved: 0 };
  }

  // Admin users bypass credit checks entirely
  if (user.role === "admin") {
    return { allowed: true, balance: user.creditBalance, reserved: 0 };
  }

  if (user.creditBalance < estimatedCredits) {
    return { allowed: false, balance: user.creditBalance, reserved: 0 };
  }

  // Deduct estimated credits
  const newBalance = user.creditBalance - estimatedCredits;

  await db
    .update(users)
    .set({
      creditBalance: newBalance,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));

  // Log the reservation
  await db.insert(creditTransactions).values({
    userId,
    type: "generation_debit",
    amount: -estimatedCredits,
    balanceAfter: newBalance,
    description: "Credit reservation for unit generation",
  });

  return {
    allowed: true,
    balance: newBalance,
    reserved: estimatedCredits,
  };
}

export async function reconcileCredits(
  userId: string,
  reservedCredits: number,
  actualCredits: number,
  generationId: number,
  actualCostCents: number
) {
  const difference = reservedCredits - actualCredits;

  if (difference > 0) {
    // Refund excess credits
    await db
      .update(users)
      .set({
        creditBalance: sql`${users.creditBalance} + ${difference}`,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    await db.insert(creditTransactions).values({
      userId,
      type: "refund",
      amount: difference,
      balanceAfter: sql`(SELECT credit_balance FROM users WHERE id = ${userId})` as any,
      generationId,
      actualApiCostCents: actualCostCents,
      description: `Reconciliation: actual cost (${actualCredits} credits) was less than estimate (${reservedCredits} credits)`,
    });
  }
}
