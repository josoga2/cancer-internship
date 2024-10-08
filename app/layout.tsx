import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Modal from "@/components/Modal";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HackBio Internships",
  description: "The Fastest way to learn bioinformatics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Suspense fallback={<div>Loading...</div>}>
          <Modal />
        </Suspense>
      </body>
    </html>
  );
}
