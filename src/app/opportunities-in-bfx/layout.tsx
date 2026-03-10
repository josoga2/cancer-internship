import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Opportunities in Bioinformatics",
  description:
    "Explore scholarships, roles, and opportunities in bioinformatics and computational biology curated by HackBio.",
  urlPath: "/opportunities-in-bfx",
});

export default function OpportunitiesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
