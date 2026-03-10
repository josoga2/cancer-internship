import type { Metadata } from "next";
import { buildPageMetadata, getPathwayMeta } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: { pathwayid: string };
}): Promise<Metadata> {
  const pathway = await getPathwayMeta(params.pathwayid);
  const title = pathway?.title || "Pathway";
  const description =
    pathway?.description ||
    "Explore this HackBio pathway with curated courses, modules, and practical lessons.";

  return buildPageMetadata({
    title,
    description,
    urlPath: `/pathway/${params.pathwayid}`,
    image: pathway?.image,
  });
}

export default function PathwayDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
