import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "FAQs",
  description:
    "Find answers to common questions about HackBio internships, learning tracks, and platform access.",
  urlPath: "/faqs",
});

export default function FaqsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
