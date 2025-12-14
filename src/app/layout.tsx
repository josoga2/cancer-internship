import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { GoogleAnalytics } from '@next/third-parties/google'
import Banner from "@/components/Nav/Banner";



const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "HackBio Internship | Learn Bioinformatics, Data, and AI by Doing",
  description: "Join the HackBio Internship to learn Bioinformatics, Data Science, and AI through real-world projects, hands-on practice, and community mentorship.",
  keywords: [
    "HackBio", 
    "bioinformatics internship", 
    "learn bioinformatics", 
    "data science internship", 
    "AI internship", 
    "bioinformatics training", 
    "bioinformatics projects", 
    "HackBio internship 2025"
  ],
  authors: [{ name: "HackBio", url: "https://thehackbio.com" }],
  creator: "HackBio Team",
  publisher: "HackBio",
  applicationName: "HackBio",
  metadataBase: new URL("https://thehackbio.com"),
  openGraph: {
    title: "HackBio Internship | Learn Bioinformatics, Data, and AI by Doing",
    description: "Get real-world experience in Bioinformatics, Data Science, and AI with HackBio’s hands-on internship program.",
    url: "https://internship.thehackbio.com/",
    siteName: "HackBio",
    images: [
      {
        url: "https://github.com/HackBio-Internship/2025_project_collection/blob/main/Group%20190.png?raw=true", // Update with actual image path
        width: 1200,
        height: 630,
        alt: "HackBio Internship Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HackBio Internship | Learn Bioinformatics, Data, and AI by Doing",
    description: "Learn Bioinformatics through practical projects in HackBio's internship program.",
    site: "@hackbio", // Update if you have a Twitter handle
    creator: "@hackbio",
    images: ["https://github.com/HackBio-Internship/2025_project_collection/blob/main/Group%20190.png?raw=true"], // Same as OG image
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
  alternates: {
    canonical: "https://internship.thehackbio.com/internship",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = 'G-E5BTKCZEBN'
  return (
    <html lang="en">
      <body
        className={`${dmSans}`}
      >
        <Banner />
        <div className="min-h-[100svh] flex items-start justify-center">
            {children}
            <Toaster />
            <GoogleAnalytics gaId={gaId} />
        </div>
      </body>
    </html>
  );
}
