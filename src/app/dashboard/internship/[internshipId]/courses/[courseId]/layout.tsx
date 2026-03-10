import type { Metadata } from "next";
import { buildPageMetadata, getCourseMeta, getInternshipMeta } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: { internshipId: string; courseId: string };
}): Promise<Metadata> {
  const [course, internship] = await Promise.all([
    getCourseMeta(params.courseId),
    getInternshipMeta(params.internshipId),
  ]);

  const title = course?.title || "Course";
  const description =
    course?.description ||
    internship?.description ||
    "Review this course and its modules in your HackBio internship.";

  return buildPageMetadata({
    title,
    description,
    urlPath: `/dashboard/internship/${params.internshipId}/courses/${params.courseId}`,
    image: course?.image || internship?.image,
  });
}

export default function DashboardInternshipCourseLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
