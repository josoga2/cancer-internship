"use client";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Footer from "@/components/Nav/footer";
import Navbar from "@/components/Nav/navbar";
import publicApi from "@/publicApi";

type LegalDocument = {
  document_type: string;
  title: string;
  content_markdown: string;
  updated_at: string;
};

type LegalDocumentPageProps = {
  documentType: "privacy_policy" | "terms_of_service";
  fallbackTitle: string;
  fallbackMarkdown: string;
};

export default function LegalDocumentPage({
  documentType,
  fallbackTitle,
  fallbackMarkdown,
}: LegalDocumentPageProps) {
  const [document, setDocument] = useState<LegalDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    publicApi
      .get<LegalDocument>(`/api/legal-documents/${documentType}/`)
      .then(({ data }) => {
        if (isMounted) setDocument(data);
      })
      .catch(() => {
        // The page remains usable with its local placeholder if the API is unavailable.
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [documentType]);

  const title = document?.title || fallbackTitle;
  const content = document?.content_markdown || fallbackMarkdown;
  const updatedAt = document?.updated_at
    ? new Intl.DateTimeFormat("en", {
        dateStyle: "long",
      }).format(new Date(document.updated_at))
    : null;

  return (
    <div className="w-full bg-white text-[#1f1f24] dark:bg-[#080d18] dark:text-white">
      <Navbar />

      <main className="mx-auto min-h-[70vh] w-full max-w-5xl px-5 pb-20 pt-40 sm:px-8">
        <header className="mb-10 border-b border-gray-200 pb-7 dark:border-white/15">
          <h1 className="text-3xl font-medium sm:text-4xl">{title}</h1>
          {updatedAt ? (
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              Last updated: {updatedAt}
            </p>
          ) : null}
        </header>

        {isLoading ? (
          <p className="text-base text-gray-600 dark:text-gray-300">
            Loading document...
          </p>
        ) : (
          <article className="prose prose-base max-w-none prose-headings:font-medium prose-a:text-hb-green prose-a:underline prose-li:marker:text-gray-500 dark:prose-invert dark:prose-a:text-green-400">
            <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
}
