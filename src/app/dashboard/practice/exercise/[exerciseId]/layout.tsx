import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Practice Exercise",
  description: "Solve interactive bioinformatics exercises and get immediate feedback.",
  urlPath: "/dashboard/practice",
});

export default function DashboardPracticeExerciseLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
