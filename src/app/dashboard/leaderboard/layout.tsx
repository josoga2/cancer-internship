import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Leaderboard",
  description:
    "See top learners by internship XP and social activity on HackBio.",
  urlPath: "/dashboard/leaderboard",
});

export default function DashboardLeaderboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
