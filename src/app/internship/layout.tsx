import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Internships",
  description:
    "Discover HackBio internships with hands-on projects, mentorship, and real-world bioinformatics experience.",
  urlPath: "/internship",
});

export default function InternshipLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
