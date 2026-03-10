import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Pathway Courses",
  description: "Browse the courses available in your HackBio pathways.",
  urlPath: "/dashboard/pathway/courses",
});

export default function DashboardPathwayCoursesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
