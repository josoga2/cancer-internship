import type { Metadata } from "next";
import { buildPageMetadata, getCourseMeta } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: { courseId: string };
}): Promise<Metadata> {
  const course = await getCourseMeta(params.courseId);
  const title = course?.title || "Course";
  const description =
    course?.description ||
    "Review this course and its modules in your HackBio pathway.";

  return buildPageMetadata({
    title,
    description,
    urlPath: `/dashboard/pathway/courses/${params.courseId}`,
    image: course?.image,
  });
}

export default function DashboardPathwayCourseLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
