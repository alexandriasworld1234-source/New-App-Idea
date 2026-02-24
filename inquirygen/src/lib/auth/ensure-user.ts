import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// Emails that automatically get admin role (unlimited credits, no charges)
const ADMIN_EMAILS = ["alexandriasworld1234@gmail.com"];

/**
 * Ensures the current Clerk user has a corresponding database record.
 * Creates one if missing. Returns the DB user or null if not authenticated.
 */
export async function ensureUser(clerkUserId: string) {
  // Check if user already exists in DB
  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, clerkUserId),
  });

  if (existingUser) return existingUser;

  // User doesn't exist — fetch from Clerk and create
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email =
    clerkUser.emailAddresses[0]?.emailAddress ?? "unknown@example.com";
  const isAdmin = ADMIN_EMAILS.includes(email.toLowerCase());

  const [newUser] = await db
    .insert(users)
    .values({
      id: clerkUserId,
      email,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() || null,
      avatarUrl: clerkUser.imageUrl,
      role: isAdmin ? "admin" : "teacher",
      creditBalance: isAdmin ? 999999 : 50,
    })
    .onConflictDoNothing()
    .returning();

  // Handle race condition — if another request created the user
  if (!newUser) {
    return db.query.users.findFirst({
      where: eq(users.id, clerkUserId),
    });
  }

  return newUser;
}
