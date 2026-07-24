import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Hire Bioinformatics Talent | HackBio",
  description:
    "Connect with trained HackBio talent in bioinformatics, genomics, data science, computational biology, and biomedical AI for your research team.",
  urlPath: "/hire-talents",
});

export default function HireTalentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
