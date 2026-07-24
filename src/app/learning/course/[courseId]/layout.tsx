import type { Metadata } from "next";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  courseJsonLd,
  getCourseMeta,
  serializeJsonLd,
} from "@/lib/page-metadata";
import type { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: { courseId: string };
}): Promise<Metadata> {
  const course = await getCourseMeta(params.courseId);
  const title = course
    ? `${course.title} | HackBio`
    : "Bioinformatics Course | HackBio";
  const description =
    course?.description ||
    "Build practical bioinformatics skills with structured HackBio lessons, tools, exercises, and project-based learning.";

  return buildPageMetadata({
    title,
    description,
    urlPath: `/learning/course/${params.courseId}`,
    image: course?.image,
    noIndex: course ? course.published === false || course.isActive === false : false,
  });
}

export default async function LearningCourseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { courseId: string };
}) {
  const course = await getCourseMeta(params.courseId);
  const path = `/learning/course/${params.courseId}`;
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Learning", path: "/learning" },
    { name: course?.title || "Course", path },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }}
      />
      {course ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(courseJsonLd(course, path)),
          }}
        />
      ) : null}
      {children}
    </>
  );
}
