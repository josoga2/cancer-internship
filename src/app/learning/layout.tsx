import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Bioinformatics Courses & Learning Paths | HackBio",
  description:
    "Explore beginner-friendly bioinformatics, genomics, and data science courses designed around practical skills, useful tools, and real projects.",
  urlPath: "/learning",
  keywords: [
    "bioinformatics 101",
    "bioinformatics courses",
    "bioinformatics tools",
    "genomics courses",
  ],
});

export default function LearningLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
