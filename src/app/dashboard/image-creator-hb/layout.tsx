import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Image Creator",
  description: "Create images for HackBio content in the dashboard.",
  urlPath: "/dashboard/image-creator-hb",
});

export default function DashboardImageCreatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
