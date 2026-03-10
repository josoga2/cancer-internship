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
    "Explore this HackBio course with structured modules, lessons, and practice activities.";

  return buildPageMetadata({
    title,
    description,
    urlPath: `/learning/course/${params.courseId}`,
    image: course?.image,
  });
}

export default function LearningCourseLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
