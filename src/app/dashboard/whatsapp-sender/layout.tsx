import { buildPageMetadata } from "@/lib/page-metadata";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata({
  title: "WhatsApp Sender",
  description: "Send WhatsApp notifications from your HackBio dashboard.",
  urlPath: "/dashboard/whatsapp-sender",
});

export default function DashboardWhatsappLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
