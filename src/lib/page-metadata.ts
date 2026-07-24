import type { Metadata } from "next";
import { SERVER_URL } from "@/constants/constants";

export const SITE_NAME = "HackBio";
export const SITE_BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://internship.thehackbio.com"
).replace(/\/$/, "");
export const DEFAULT_OG_IMAGE = `${SITE_BASE_URL}/internships.jpg`;

const configuredApiBase = process.env.NEXT_PUBLIC_API_URL || SERVER_URL || "";
const apiBase = configuredApiBase
  ? `${configuredApiBase.replace(/\/$/, "")}/`
  : "";

type SeoImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export type CourseSeoData = {
  id: number | string;
  title: string;
  description: string;
  image: string | null;
  level?: string;
  updatedAt?: string;
  published?: boolean;
  isActive?: boolean;
};

export type PathwaySeoData = {
  id: number | string;
  title: string;
  description: string;
  image: string | null;
  level?: string;
  published?: boolean;
  isActive?: boolean;
};

export type ArticleSeoData = {
  slug: string;
  title: string;
  description: string;
  image: string | null;
  author?: string;
  publishedAt?: string;
  published?: boolean;
};

export const absoluteUrl = (path = "/") => {
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_BASE_URL}${normalizedPath}`;
};

export const cleanSeoText = (value?: string | null) => {
  if (!value) return "";

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#_*`>|~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

export const truncateSeoText = (value: string, max = 160) => {
  if (value.length <= max) return value;
  const shortened = value.slice(0, max - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > 100 ? lastSpace : max - 1).trim()}…`;
};

const pickDescription = (...values: Array<string | null | undefined>) => {
  for (const value of values) {
    const cleaned = cleanSeoText(value);
    if (cleaned) return truncateSeoText(cleaned);
  }
  return "";
};

const toNumber = (value: string | string[]) => {
  if (Array.isArray(value)) return Number(value[0]);
  return Number(value);
};

export const normalizeImageUrl = (value?: string | null) => {
  if (!value) return DEFAULT_OG_IMAGE;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/media/") && apiBase) {
    return `${apiBase.replace(/\/$/, "")}${value}`;
  }
  return absoluteUrl(value);
};

const fetchList = async <T,>(path: string): Promise<T[]> => {
  if (!apiBase) return [];

  try {
    const response = await fetch(`${apiBase}${path.replace(/^\//, "")}`, {
      next: { revalidate: 600 },
    });
    if (!response.ok) return [];

    const payload = await response.json();
    if (Array.isArray(payload)) return payload as T[];
    if (Array.isArray(payload?.results)) return payload.results as T[];
    return [];
  } catch {
    return [];
  }
};

export const buildPageMetadata = ({
  title,
  description,
  urlPath,
  image,
  imageAlt,
  type = "website",
  noIndex,
  keywords,
}: {
  title: string;
  description: string;
  urlPath: string;
  image?: string | null;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  keywords?: string[];
}): Metadata => {
  const canonicalUrl = absoluteUrl(urlPath);
  const ogImage: SeoImage = {
    url: normalizeImageUrl(image),
    width: 1200,
    height: 630,
    alt: imageAlt || title || SITE_NAME,
  };

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [ogImage],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
    robots:
      noIndex === true
        ? {
            index: false,
            follow: false,
            noarchive: true,
            googleBot: {
              index: false,
              follow: false,
              noimageindex: true,
            },
          }
        : noIndex === false
          ? {
              index: true,
              follow: true,
              googleBot: {
                index: true,
                follow: true,
                noimageindex: false,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
              },
            }
          : undefined,
  };
};

export const getCourseMeta = async (
  courseId: string | string[]
): Promise<CourseSeoData | null> => {
  const id = toNumber(courseId);
  if (!Number.isFinite(id)) return null;

  const courses = await fetchList<{
    id?: number | string;
    title?: string;
    summary?: string;
    short_description?: string;
    description?: string;
    overview?: string;
    image?: string;
    hero_background_image?: string;
    level?: string;
    updated_at?: string;
    published?: boolean;
    is_active?: boolean;
  }>("api/courses/");
  const course = courses.find((item) => Number(item.id) === id);
  if (!course?.id) return null;

  return {
    id: course.id,
    title: course.title || "Bioinformatics Course",
    description: pickDescription(
      course.summary,
      course.short_description,
      course.overview,
      course.description
    ),
    image: course.hero_background_image || course.image || null,
    level: course.level,
    updatedAt: course.updated_at,
    published: course.published,
    isActive: course.is_active,
  };
};

export const getInternshipMeta = async (internshipId: string | string[]) => {
  const id = toNumber(internshipId);
  if (!Number.isFinite(id)) return null;

  const internships = await fetchList<{
    id?: number | string;
    title?: string;
    summary?: string;
    description?: string;
    overview?: string;
    int_image?: string;
    hero_background_image?: string;
  }>("api/internships/");
  const internship = internships.find((item) => Number(item.id) === id);
  if (!internship?.id) return null;

  return {
    id: internship.id,
    title: internship.title || "Bioinformatics Internship",
    description: pickDescription(
      internship.summary,
      internship.overview,
      internship.description
    ),
    image: internship.hero_background_image || internship.int_image || null,
  };
};

export const getPathwayMeta = async (
  pathwayId: string | string[]
): Promise<PathwaySeoData | null> => {
  const id = toNumber(pathwayId);
  if (!Number.isFinite(id)) return null;

  const pathways = await fetchList<{
    id?: number | string;
    title?: string;
    summary?: string;
    short_description?: string;
    description?: string;
    overview?: string;
    int_image?: string;
    hero_background_image?: string;
    level?: string;
    published?: boolean;
    is_active?: boolean;
  }>("api/pathways/");
  const pathway = pathways.find((item) => Number(item.id) === id);
  if (!pathway?.id) return null;

  return {
    id: pathway.id,
    title: pathway.title || "Bioinformatics Learning Path",
    description: pickDescription(
      pathway.summary,
      pathway.short_description,
      pathway.overview,
      pathway.description
    ),
    image: pathway.hero_background_image || pathway.int_image || null,
    level: pathway.level,
    published: pathway.published,
    isActive: pathway.is_active,
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

export const getArticleMeta = async (
  slug: string | string[]
): Promise<ArticleSeoData | null> => {
  const slugValue = Array.isArray(slug) ? slug[0] : slug;
  if (!slugValue) return null;

  const articles = await fetchList<{
    slug?: string;
    title?: string;
    excerpt?: string;
    cover_image?: string;
    is_published?: boolean;
    published_at?: string;
    author?: { name?: string };
  }>("api/articles/");
  const article = articles.find((item) => item.slug === slugValue);
  if (!article?.slug) return null;

  return {
    slug: article.slug,
    title: article.title || "HackBio Article",
    description: pickDescription(article.excerpt),
    image: article.cover_image || null,
    author: article.author?.name,
    publishedAt: article.published_at,
    published: article.is_published,
  };
};

export const getSitemapContent = async () => {
  const [courses, pathways, articles] = await Promise.all([
    fetchList<{
      id?: number | string;
      updated_at?: string;
      published?: boolean;
      is_active?: boolean;
    }>("api/courses/"),
    fetchList<{
      id?: number | string;
      published?: boolean;
      is_active?: boolean;
    }>("api/pathways/"),
    fetchList<{
      slug?: string;
      published_at?: string;
      is_published?: boolean;
    }>("api/articles/"),
  ]);

  return {
    courses: courses.filter(
      (item) => item.id && item.published !== false && item.is_active !== false
    ),
    pathways: pathways.filter(
      (item) => item.id && item.published !== false && item.is_active !== false
    ),
    articles: articles.filter((item) => item.slug && item.is_published !== false),
  };
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_BASE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_BASE_URL,
  logo: absoluteUrl("/hb_logo.png"),
  sameAs: [
    "https://www.linkedin.com/company/hackbio",
    "https://github.com/HackBio-Internship",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_BASE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_BASE_URL,
  publisher: { "@id": `${SITE_BASE_URL}/#organization` },
};

export const breadcrumbJsonLd = (
  items: Array<{ name: string; path: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const courseJsonLd = (
  course: CourseSeoData,
  path: string
) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name: course.title,
  description: course.description,
  url: absoluteUrl(path),
  image: normalizeImageUrl(course.image),
  educationalLevel: course.level || undefined,
  provider: {
    "@type": "Organization",
    name: SITE_NAME,
    sameAs: SITE_BASE_URL,
  },
});

export const articleJsonLd = (
  article: ArticleSeoData,
  path: string
) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.description,
  url: absoluteUrl(path),
  mainEntityOfPage: absoluteUrl(path),
  image: normalizeImageUrl(article.image),
  datePublished: article.publishedAt || undefined,
  author: {
    "@type": article.author ? "Person" : "Organization",
    name: article.author || SITE_NAME,
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/hb_logo.png"),
    },
  },
});

export const serializeJsonLd = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");
