import type { Metadata } from "next";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  getPathwayMeta,
  programOgImageUrl,
  serializeJsonLd,
} from "@/lib/page-metadata";
import type { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: { pathwayid: string };
}): Promise<Metadata> {
  const pathway = await getPathwayMeta(params.pathwayid);
  const title = pathway
    ? `${pathway.title} Learning Path | HackBio`
    : "Bioinformatics Learning Path | HackBio";
  const description =
    pathway?.description ||
    "Follow a structured HackBio learning path with curated bioinformatics courses, practical lessons, tools, and projects.";

  return buildPageMetadata({
    title,
    description,
    urlPath: `/pathway/${params.pathwayid}`,
    image: pathway ? programOgImageUrl("pathway", pathway.id) : undefined,
    imageAlt: pathway
      ? `${pathway.title} learning pathway`
      : "HackBio bioinformatics learning pathway",
    noIndex: pathway
      ? pathway.published === false || pathway.isActive === false
      : false,
  });
}

export default async function PathwayDetailLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { pathwayid: string };
}) {
  const pathway = await getPathwayMeta(params.pathwayid);
  const path = `/pathway/${params.pathwayid}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Learning", path: "/learning" },
              { name: pathway?.title || "Pathway", path },
            ])
          ),
        }}
      />
      {children}
    </>
  );
}
