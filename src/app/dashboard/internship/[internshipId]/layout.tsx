import type { Metadata } from "next";
import { buildPageMetadata, getInternshipMeta } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: { internshipId: string };
}): Promise<Metadata> {
  const internship = await getInternshipMeta(params.internshipId);
  const title = internship?.title || "Internship";
  const description =
    internship?.description ||
    "Review this HackBio internship and access its courses and learning materials.";

  return buildPageMetadata({
    title,
    description,
    urlPath: `/dashboard/internship/${params.internshipId}`,
    image: internship?.image,
  });
}

export default function DashboardInternshipDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
