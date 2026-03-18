import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Practice Lab",
  description:
    "Practice bioinformatics workflows with interactive exercises, instant feedback, and mastery tracking.",
  urlPath: "/dashboard/practice",
});

export default function DashboardPracticeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
