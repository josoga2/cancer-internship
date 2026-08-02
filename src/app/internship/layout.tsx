import type { Metadata } from "next";
import {
  buildPageMetadata,
  getFeaturedInternshipMeta,
} from "@/lib/page-metadata";
import type { ReactNode } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const internship = await getFeaturedInternshipMeta();

  return buildPageMetadata({
    title: internship
      ? `${internship.title} | HackBio`
      : "Online Bioinformatics Internship | HackBio",
    description:
      internship?.description ||
      "Build practical bioinformatics and genomics skills through HackBio's online internship programs, project-based learning, and guided training.",
    urlPath: "/internship",
    image: internship?.image,
    imageAlt: internship
      ? `${internship.title} internship`
      : "HackBio online bioinformatics internship",
    keywords: [
      "online bioinformatics internship",
      "bioinformatics internship remote",
      "bioinformatics internships for undergraduates",
      "HackBio internship",
    ],
  });
}

export default function InternshipLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
