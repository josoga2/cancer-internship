import type { ReactNode } from "react";

import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Terms of Service | HackBio",
  description:
    "Review the terms governing use of HackBio's website, courses, learning pathways, and internship programs.",
  urlPath: "/terms-of-service",
});

export default function TermsOfServiceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
