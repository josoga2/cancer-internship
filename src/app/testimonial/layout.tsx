import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Testimonials",
  description: "See what HackBio learners and mentors say about their internship experience.",
  urlPath: "/testimonial",
});

export default function TestimonialLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
