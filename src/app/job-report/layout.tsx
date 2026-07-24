import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Bioinformatics Job Report | HackBio",
  description:
    "Explore bioinformatics job trends, career paths, and practical insights for learners planning their next role.",
  urlPath: "/job-report",
});

export default function JobReportLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
