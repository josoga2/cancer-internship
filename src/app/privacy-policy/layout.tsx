import type { ReactNode } from "react";

import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Privacy Policy | HackBio",
  description:
    "Read the HackBio privacy policy and learn how information is handled across our website, courses, and internship programs.",
  urlPath: "/privacy-policy",
});

export default function PrivacyPolicyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
