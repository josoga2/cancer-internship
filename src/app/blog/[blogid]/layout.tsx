import type { Metadata } from "next";
import { buildPageMetadata, getArticleMeta } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: { blogid: string };
}): Promise<Metadata> {
  const article = await getArticleMeta(params.blogid);
  const title = article?.title || "Article";
  const description =
    article?.description || "Read this HackBio article for insights and updates.";

  return buildPageMetadata({
    title,
    description,
    urlPath: `/blog/${params.blogid}`,
    image: article?.image,
  });
}

export default function BlogDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
