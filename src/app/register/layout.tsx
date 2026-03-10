import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Register",
  description: "Create a HackBio account to access internships and learning resources.",
  urlPath: "/register",
});

export default function RegisterLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
