import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Bioinformatics Readiness Assessment",
  description: "A guided career intelligence system for assessing bioinformatics readiness and career direction.",
  urlPath: "/bioinformatics-readiness-assessment",
});

export default function BioinformaticsReadinessAssessmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
