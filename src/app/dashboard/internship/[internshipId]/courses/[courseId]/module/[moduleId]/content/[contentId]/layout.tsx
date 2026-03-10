import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  buildPageMetadata,
  getContentMeta,
  getCourseMeta,
  getModuleMeta,
} from "@/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: {
    internshipId: string;
    courseId: string;
    moduleId: string;
    contentId: string;
  };
}): Promise<Metadata> {
  const [content, moduleMeta, course] = await Promise.all([
    getContentMeta(params.contentId),
    getModuleMeta(params.moduleId),
    getCourseMeta(params.courseId),
  ]);

  const title = content?.title || "Lesson";
  const description =
    content?.description ||
    moduleMeta?.description ||
    course?.description ||
    "Continue this lesson in your HackBio course.";

  return buildPageMetadata({
    title,
    description,
    urlPath: `/dashboard/internship/${params.internshipId}/courses/${params.courseId}/module/${params.moduleId}/content/${params.contentId}`,
    image: course?.image,
  });
}

export default function DashboardInternshipContentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
