import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Your Internships",
  description: "View your active HackBio internships and keep track of progress.",
  urlPath: "/dashboard/internship",
});

export default function DashboardInternshipLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
