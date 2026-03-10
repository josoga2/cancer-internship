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
  params: { courseId: string; moduleId: string; contentId: string };
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
    "Continue this lesson in your HackBio pathway course.";

  return buildPageMetadata({
    title,
    description,
    urlPath: `/dashboard/pathway/courses/${params.courseId}/module/${params.moduleId}/content/${params.contentId}`,
    image: course?.image,
  });
}

export default function DashboardPathwayContentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
