import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Bioinformatics, Genomics & Career Articles | HackBio",
  description:
    "Read practical HackBio articles on bioinformatics, genomics, data science, scientific careers, training, and internship opportunities.",
  urlPath: "/blog",
});

export default function BlogLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
