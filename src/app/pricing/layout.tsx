import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "HackBio Pricing | Bioinformatics Training Plans",
  description:
    "Compare HackBio training options and choose the right bioinformatics, genomics, or data science learning plan for your goals, budget, and schedule.",
  urlPath: "/pricing",
});

export default function PricingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
