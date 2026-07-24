import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Payment Administration | HackBio",
  description: "Private HackBio payment administration page.",
  urlPath: "/cshjxrf02b7dbb0e24e34f17a6f3e1f63f2024",
  noIndex: true,
});

export default function PaymentAdministrationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
