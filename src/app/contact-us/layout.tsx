import type { ReactNode } from "react";

import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Contact HackBio",
  description:
    "Contact HackBio for help with bioinformatics courses, learning pathways, internships, payments, and partnerships.",
  urlPath: "/contact-us",
});

export default function ContactUsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
