import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Playground",
  description: "Experiment with tools and practice exercises in the HackBio playground.",
  urlPath: "/dashboard/playground",
});

export default function DashboardPlaygroundLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
