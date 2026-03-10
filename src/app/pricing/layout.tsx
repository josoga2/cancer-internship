import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Pricing",
  description:
    "Compare HackBio pricing plans for internships and learning pathways.",
  urlPath: "/pricing",
});

export default function PricingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
