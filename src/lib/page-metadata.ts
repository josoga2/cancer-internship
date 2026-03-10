import type { Metadata } from "next";
import { SERVER_URL } from "@/constants/constants";

const SITE_NAME = "HackBio Internship";
const SITE_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://internship.thehackbio.com";
const DEFAULT_OG_IMAGE =
  "https://github.com/HackBio-Internship/2025_project_collection/blob/main/Group%20190.png?raw=true";

const apiBase = (process.env.NEXT_PUBLIC_API_URL || SERVER_URL || "").endsWith("/")
  ? (process.env.NEXT_PUBLIC_API_URL || SERVER_URL || "")
  : `${process.env.NEXT_PUBLIC_API_URL || SERVER_URL}/`;

const cleanText = (value?: string | null) => {
  if (!value) return "";
  return value
    .replace(/\s+/g, " ")
    .replace(/[#_*`>\-]/g, "")
    .trim();
};

const truncate = (value: string, max = 160) => {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 3).trim()}...`;
};

const pickDescription = (...values: Array<string | null | undefined>) => {
  for (const value of values) {
    const cleaned = cleanText(value);
    if (cleaned) return truncate(cleaned);
  }
  return "";
};

const toNumber = (value: string | string[]) => {
  if (Array.isArray(value)) return Number(value[0]);
  return Number(value);
};

const normalizeImageUrl = (value?: string | null) => {
  if (!value) return DEFAULT_OG_IMAGE;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (!apiBase) return DEFAULT_OG_IMAGE;
  return `${apiBase}${value.replace(/^\//, "")}`;
};

const fetchList = async <T,>(path: string): Promise<T[]> => {
  if (!apiBase) return [];
  try {
    const response = await fetch(`${apiBase}${path}`, {
      next: { revalidate: 600 },
    });
    if (!response.ok) return [];
    return (await response.json()) as T[];
  } catch (error) {
    return [];
  }
};

export const buildPageMetadata = ({
  title,
  description,
  urlPath,
  image,
}: {
  title: string;
  description: string;
  urlPath: string;
  image?: string | null;
}): Metadata => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const ogImage = normalizeImageUrl(image);
  return {
    title: title || SITE_NAME,
    description: description || undefined,
    alternates: urlPath ? { canonical: `${SITE_BASE_URL}${urlPath}` } : undefined,
    openGraph: {
      title: fullTitle,
      description: description || undefined,
      url: `${SITE_BASE_URL}${urlPath}`,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || SITE_NAME,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description || undefined,
      images: [ogImage],
    },
  };
};

export const getCourseMeta = async (courseId: string | string[]) => {
  const id = toNumber(courseId);
  if (!Number.isFinite(id)) return null;
  const courses = await fetchList<{
    id?: number | string;
    title?: string;
    description?: string;
    overview?: string;
    image?: string;
  }>("api/courses/");
  const course = courses.find((item) => Number(item.id) === id);
  if (!course) return null;
  return {
    title: course.title || "Course",
    description: pickDescription(course.overview, course.description),
    image: course.image || null,
  };
};

export const getInternshipMeta = async (internshipId: string | string[]) => {
  const id = toNumber(internshipId);
  if (!Number.isFinite(id)) return null;
  const internships = await fetchList<{
    id?: number | string;
    title?: string;
    description?: string;
    overview?: string;
    int_image?: string;
  }>("api/internships/");
  const internship = internships.find((item) => Number(item.id) === id);
  if (!internship) return null;
  return {
    title: internship.title || "Internship",
    description: pickDescription(internship.overview, internship.description),
    image: internship.int_image || null,
  };
};

export const getPathwayMeta = async (pathwayId: string | string[]) => {
  const id = toNumber(pathwayId);
  if (!Number.isFinite(id)) return null;
  const pathways = await fetchList<{
    id?: number | string;
    title?: string;
    description?: string;
    overview?: string;
    int_image?: string;
  }>("api/pathways/");
  const pathway = pathways.find((item) => Number(item.id) === id);
  if (!pathway) return null;
  return {
    title: pathway.title || "Pathway",
    description: pickDescription(pathway.overview, pathway.description),
    image: pathway.int_image || null,
  };
};

export const getModuleMeta = async (moduleId: string | string[]) => {
  const id = toNumber(moduleId);
  if (!Number.isFinite(id)) return null;
  const modules = await fetchList<{
    id?: number | string;
    title?: string;
    description?: string;
  }>("api/modules/");
  const module = modules.find((item) => Number(item.id) === id);
  if (!module) return null;
  return {
    title: module.title || "Module",
    description: pickDescription(module.description),
  };
};

export const getContentMeta = async (contentId: string | string[]) => {
  const id = toNumber(contentId);
  if (!Number.isFinite(id)) return null;
  const contents = await fetchList<{
    id?: number | string;
    title?: string;
    text_content?: string;
    quiz_question?: string;
    project_data?: string;
    project_rubric?: string;
  }>("api/contents/");
  const content = contents.find((item) => Number(item.id) === id);
  if (!content) return null;
  return {
    title: content.title || "Lesson",
    description: pickDescription(
      content.text_content,
      content.quiz_question,
      content.project_data,
      content.project_rubric
    ),
  };
};

export const getArticleMeta = async (slug: string | string[]) => {
  const slugValue = Array.isArray(slug) ? slug[0] : slug;
  if (!slugValue) return null;
  const articles = await fetchList<{
    slug?: string;
    title?: string;
    excerpt?: string;
    cover_image?: string;
    is_published?: boolean;
  }>("api/articles/");
  const article = articles.find((item) => item.slug === slugValue);
  if (!article) return null;
  return {
    title: article.title || "Article",
    description: pickDescription(article.excerpt),
    image: article.cover_image || null,
  };
};
