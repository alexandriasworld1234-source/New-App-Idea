import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LEVER Lesson & Materials Generator",
  description:
    "Teacher-only planning tool. One prompt → complete LEVER-driven instructional plan + student materials packet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
