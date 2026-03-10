import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "Referrals",
  description: "Manage your HackBio referral links and rewards.",
  urlPath: "/dashboard/referrals",
});

export default function DashboardReferralsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
