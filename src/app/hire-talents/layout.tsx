import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Hire Talent",
  description: "Hire HackBio-trained talent for bioinformatics, data science, and AI roles.",
  urlPath: "/hire-talents",
});

export default function HireTalentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
