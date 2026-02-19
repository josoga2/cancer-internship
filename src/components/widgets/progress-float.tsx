"use client";

import React from "react";
import { ThumbsUp } from "lucide-react";

type ProgressFloatProps = {
  title: string;
  message: string;
  percent: number;
  ctaText?: string;
  onCta?: () => void;
  onClose?: () => void;
};

export default function ProgressFloat({
  title,
  message,
  percent,
  ctaText,
  onCta,
  onClose,
}: ProgressFloatProps) {
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 max-w-[calc(100vw-2rem)]">
      <div className="relative flex gap-3 rounded-xl border border-zinc-200 bg-white/95 p-4 shadow-lg backdrop-blur">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hb-lightgreen text-hb-green">
          <ThumbsUp className="h-5 w-5 animate-bounce" aria-hidden="true" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-base font-semibold text-gray-900">{title}</p>
            <span className="text-xs font-semibold text-gray-500">{Math.round(clamped)}%</span>
          </div>
          <p className="text-xs text-gray-600">{message}</p>
          <div className="mt-1 h-1.5 w-full rounded-full bg-zinc-200">
            <div
              className="h-1.5 rounded-full bg-hb-green transition-[width]"
              style={{ width: `${clamped}%` }}
            />
          </div>
          {ctaText && onCta && (
            <button
              type="button"
              onClick={onCta}
              className="mt-2 w-fit text-xs font-semibold text-hb-green hover:underline"
            >
              {ctaText}
            </button>
          )}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
            aria-label="Dismiss"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
