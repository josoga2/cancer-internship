import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "HackBio Learner Stories & Testimonials",
  description:
    "Read stories from HackBio learners about their bioinformatics training, internship projects, skills, and career journeys.",
  urlPath: "/testimonial",
});

export default function TestimonialLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
