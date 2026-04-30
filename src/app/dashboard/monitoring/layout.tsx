import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Monitoring",
  description:
    "Monitor learners, mentorship session slots, and engagement activity in the HackBio dashboard.",
  urlPath: "/dashboard/monitoring",
});

export default function DashboardMonitoringLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
