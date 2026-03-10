import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Dashboard",
  description: "Access your HackBio dashboard to track progress, courses, and learning streaks.",
  urlPath: "/dashboard",
});

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
