import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Read HackBio articles, announcements, and insights on bioinformatics, data science, and AI careers.",
  urlPath: "/blog",
});

export default function BlogLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
