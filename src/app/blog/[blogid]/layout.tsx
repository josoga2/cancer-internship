import type { Metadata } from "next";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildPageMetadata,
  getArticleMeta,
  serializeJsonLd,
} from "@/lib/page-metadata";
import type { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: { blogid: string };
}): Promise<Metadata> {
  const article = await getArticleMeta(params.blogid);
  const isHackBio2026 = params.blogid === "hackbio-2026";
  const title = isHackBio2026
    ? "HackBio 2026 Internship Guide"
    : article
      ? `${article.title} | HackBio`
      : "Bioinformatics Article | HackBio";
  const description = isHackBio2026
    ? "Learn about HackBio 2026 internship opportunities, available programs, project-based training, application steps, and how to get started."
    : article?.description ||
      "Read practical HackBio insights on bioinformatics, genomics, data science, training, and scientific careers.";

  return buildPageMetadata({
    title,
    description,
    urlPath: `/blog/${params.blogid}`,
    image: article?.image,
    type: "article",
    noIndex: article?.published === false,
  });
}

export default async function BlogDetailLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { blogid: string };
}) {
  const article = await getArticleMeta(params.blogid);
  const path = `/blog/${params.blogid}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: article?.title || "Article", path },
            ])
          ),
        }}
      />
      {article && article.published !== false ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(articleJsonLd(article, path)),
          }}
        />
      ) : null}
      {children}
    </>
  );
}
