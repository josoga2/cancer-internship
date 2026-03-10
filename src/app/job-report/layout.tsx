import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Job Report",
  description: "Explore HackBio job reports and career insights for learners.",
  urlPath: "/job-report",
});

export default function JobReportLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
