import type { MetadataRoute } from "next";
import {
  SITE_BASE_URL,
  absoluteUrl,
  getSitemapContent,
} from "@/lib/page-metadata";

export const revalidate = 3600;

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: SITE_BASE_URL,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: absoluteUrl("/internship"),
    changeFrequency: "weekly",
    priority: 0.95,
  },
  {
    url: absoluteUrl("/learning"),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: absoluteUrl("/pricing"),
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    url: absoluteUrl("/hire-talents"),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: absoluteUrl("/blog"),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: absoluteUrl("/testimonial"),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: absoluteUrl("/job-report"),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: absoluteUrl("/faqs"),
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    url: absoluteUrl("/bioinformatics-readiness-assessment"),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: absoluteUrl("/opportunities-in-bfx"),
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    url: absoluteUrl("/scholarships"),
    changeFrequency: "monthly",
    priority: 0.6,
  },
];

const validDate = (value?: string) => {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { courses, pathways, articles } = await getSitemapContent();

  const courseRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
    url: absoluteUrl(`/learning/course/${course.id}`),
    lastModified: validDate(course.updated_at),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const pathwayRoutes: MetadataRoute.Sitemap = pathways.map((pathway) => ({
    url: absoluteUrl(`/pathway/${pathway.id}`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/blog/${article.slug}`),
    lastModified: validDate(article.published_at),
    changeFrequency: "monthly",
    priority: article.slug === "hackbio-2026" ? 0.85 : 0.7,
  }));

  return [...staticRoutes, ...courseRoutes, ...pathwayRoutes, ...articleRoutes];
}
