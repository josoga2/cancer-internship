import type { Metadata } from "next";
// Suppress TypeScript error for side-effect CSS import when no declaration is present
// @ts-ignore: CSS module without type declarations
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggle from "@/components/theme-toggle";
import Script from "next/script";
import { Suspense } from "react";
import GoogleAnalyticsPageView from "@/components/analytics/google-analytics-page-view";
import {
  DEFAULT_OG_IMAGE,
  SITE_BASE_URL,
  organizationJsonLd,
  serializeJsonLd,
  websiteJsonLd,
} from "@/lib/page-metadata";


export const metadata: Metadata = {
  title: {
    default: "HackBio | Bioinformatics Internships & Genomics Training",
    template: "%s | HackBio",
  },
  description:
    "Learn bioinformatics, genomics, and data science through hands-on HackBio internships, courses, practical projects, and guided training.",
  keywords: [
    "HackBio", 
    "bioinformatics internship", 
    "learn bioinformatics", 
    "data science internship", 
    "AI internship", 
    "bioinformatics training", 
    "bioinformatics projects", 
    "HackBio internship 2026"
  ],
  authors: [{ name: "HackBio", url: SITE_BASE_URL }],
  creator: "HackBio Team",
  publisher: "HackBio",
  applicationName: "HackBio",
  metadataBase: new URL(SITE_BASE_URL),
  openGraph: {
    title: "HackBio | Bioinformatics Internships & Genomics Training",
    description:
      "Learn bioinformatics, genomics, and data science through hands-on HackBio internships, courses, practical projects, and guided training.",
    url: SITE_BASE_URL,
    siteName: "HackBio",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "HackBio bioinformatics learning and internship programs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HackBio | Bioinformatics Internships & Genomics Training",
    description:
      "Learn bioinformatics, genomics, and data science through hands-on internships, courses, and practical projects.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  category: "Education",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // GA measurement IDs are public. The fallback preserves the existing
  // HackBio property if a deployment is missing its environment variable.
  const gaId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-E5BTKCZEBN";
  return (
    <html lang="en">
      <body
        className="text-base"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(websiteJsonLd),
          }}
        />
        <ThemeProvider>
          <div className="min-h-svh flex items-start justify-center">
              {children}
              <Toaster />
              {gaId ? (
                <>
                  <Script id="ga4-base" strategy="beforeInteractive">
                    {`
                      window.dataLayer = window.dataLayer || [];
                      window.gtag = window.gtag || function(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${gaId}', { send_page_view: false });
                    `}
                  </Script>
                  <Script
                    id="ga4-loader"
                    src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                    strategy="afterInteractive"
                  />
                  <Suspense fallback={null}>
                    <GoogleAnalyticsPageView />
                  </Suspense>
                </>
              ) : null}
              <Script id="microsoft-clarity" strategy="afterInteractive">
                {`
                  (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, "clarity", "script", "xr65853w9a");
                `}
              </Script>
          </div>
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
