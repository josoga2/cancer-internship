import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "HackBio Login",
  description: "Log in to your HackBio internship dashboard.",
  urlPath: "/login",
  noIndex: true,
});

export default function LoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
