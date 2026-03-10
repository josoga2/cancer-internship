import type { Metadata } from "next";
import { buildPageMetadata, getInternshipMeta } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: { internshipId: string };
}): Promise<Metadata> {
  const internship = await getInternshipMeta(params.internshipId);
  const title = internship?.title ? `${internship.title} Courses` : "Internship Courses";
  const description =
    internship?.description ||
    "Browse the courses available in this HackBio internship.";

  return buildPageMetadata({
    title,
    description,
    urlPath: `/dashboard/internship/${params.internshipId}/courses`,
    image: internship?.image,
  });
}

export default function DashboardInternshipCoursesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
