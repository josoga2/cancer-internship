import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Checkout",
  description: "Complete your HackBio payment and subscription checkout.",
  urlPath: "/dashboard/checkout",
});

export default function DashboardCheckoutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
