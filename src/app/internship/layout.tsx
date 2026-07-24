import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Online Bioinformatics Internship | HackBio",
  description:
    "Build practical bioinformatics and genomics skills through HackBio's online internship programs, project-based learning, and guided training.",
  urlPath: "/internship",
  keywords: [
    "online bioinformatics internship",
    "bioinformatics internship remote",
    "bioinformatics internships for undergraduates",
    "HackBio internship",
  ],
});

export default function InternshipLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
