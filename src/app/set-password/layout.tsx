import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Set Password",
  description: "Set up your HackBio account password to get started.",
  urlPath: "/set-password",
});

export default function SetPasswordLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
