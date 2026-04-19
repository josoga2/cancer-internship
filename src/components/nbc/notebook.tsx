"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/api";
import { Button } from "@/components/ui/button";

type NotebookApiResponse = {
  status: "ready" | "processing" | "error" | "invalid";
  html?: string | null;
  error_message?: string | null;
  source_url?: string | null;
  last_rendered_at?: string | null;
};

type NotebookViewerProps = {
  contentId: number;
  sourceUrl?: string | null;
};

function toColabUrl(sourceUrl: string | null | undefined): string | null {
  if (!sourceUrl) return null;
  try {
    const parsed = new URL(sourceUrl);
    if (parsed.hostname === "raw.githubusercontent.com") {
      const pathParts = parsed.pathname.split("/").filter(Boolean);
      if (pathParts.length >= 4) {
        const [owner, repo, branch, ...rest] = pathParts;
        const filePath = rest.join("/");
        return `https://colab.research.google.com/github/${owner}/${repo}/blob/${branch}/${filePath}`;
      }
    }
    return `https://colab.research.google.com/?q=${encodeURIComponent(sourceUrl)}`;
  } catch {
    return null;
  }
}

export default function NotebookViewer({ contentId, sourceUrl }: NotebookViewerProps) {
  const [payload, setPayload] = useState<NotebookApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;

    const fetchNotebook = async () => {
      if (!contentId) {
        if (active) {
          setPayload({
            status: "invalid",
            error_message: "Notebook content ID is missing.",
            source_url: sourceUrl || null,
          });
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        const response = await api.get(`/api/content/${contentId}/notebook/`);
        if (!active) return;
        setPayload(response.data as NotebookApiResponse);
      } catch (error: any) {
        if (!active) return;
        const message =
          error?.response?.data?.error ||
          error?.response?.data?.detail ||
          "Notebook could not be loaded right now.";
        setPayload({
          status: "error",
          error_message: message,
          source_url: sourceUrl || null,
        });
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchNotebook();

    return () => {
      active = false;
    };
  }, [contentId, sourceUrl]);

  const effectiveSourceUrl = payload?.source_url || sourceUrl || null;
  const colabUrl = useMemo(() => toColabUrl(effectiveSourceUrl), [effectiveSourceUrl]);

  if (loading) {
    return (
      <div className="not-prose w-full rounded-md border border-slate-300/70 dark:border-slate-700 p-4 space-y-3">
        <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
        <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
        <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
      </div>
    );
  }

  if (payload?.status === "ready" && payload.html) {
    return (
      <div
        className="not-prose hb-notebook-render text-sm md:text-base max-w-none rounded-md border border-slate-300/70 dark:border-slate-700 bg-white dark:bg-[#0b1630] p-4 overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: payload.html }}
      />
    );
  }

  return (
    <div className="not-prose rounded-md border border-red-300/80 dark:border-red-500/40 bg-red-50/60 dark:bg-red-900/20 p-4 text-sm">
      <p className="font-semibold text-red-700 dark:text-red-300">Notebook unavailable</p>
      <p className="mt-1 text-red-700/90 dark:text-red-200/90">
        {payload?.error_message || "No notebook could be rendered for this content."}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {effectiveSourceUrl && (
          <a href={effectiveSourceUrl} target="_blank" rel="noreferrer">
            <Button className="bg-hb-green hover:bg-hb-green/90 text-white">Open notebook URL</Button>
          </a>
        )}
        {colabUrl && (
          <a href={colabUrl} target="_blank" rel="noreferrer">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white">Open in Colab</Button>
          </a>
        )}
      </div>
    </div>
  );
}
