import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Learning Tracks",
  description:
    "Explore HackBio learning tracks with curated courses, modules, and practical lessons designed for bioinformatics, data science, and AI learners.",
  urlPath: "/learning",
});

export default function LearningLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
