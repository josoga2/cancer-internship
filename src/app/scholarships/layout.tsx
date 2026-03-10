import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Scholarships",
  description:
    "Browse HackBio scholarships and funding opportunities to support your learning journey.",
  urlPath: "/scholarships",
});

export default function ScholarshipsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
