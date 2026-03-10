import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Your Pathways",
  description: "Access your HackBio pathways and their associated courses.",
  urlPath: "/dashboard/pathway",
});

export default function DashboardPathwayLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
