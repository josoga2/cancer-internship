import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Pathways",
  description:
    "Browse HackBio pathways tailored to different career goals, with structured courses and guided learning milestones.",
  urlPath: "/pathway",
});

export default function PathwayLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
