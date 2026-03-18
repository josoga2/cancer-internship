"use client";

import { Bot, CheckCircle2, Sparkles, TriangleAlert } from "lucide-react";

type PalMood = "idle" | "checking" | "success" | "retry";

type PocketPalProps = {
  mood: PalMood;
  xpAwarded?: number;
};

export default function PocketPal({ mood, xpAwarded = 0 }: PocketPalProps) {
  const moodMap = {
    idle: {
      title: "Pocket Pal",
      text: "Pick your answer and submit.",
      icon: <Bot className="h-4 w-4 text-gray-700" />,
      badge: "bg-gray-100 border-gray-200",
      pulse: "",
    },
    checking: {
      title: "Checking...",
      text: "Let me quickly review that.",
      icon: <Sparkles className="h-4 w-4 text-blue-700" />,
      badge: "bg-blue-50 border-blue-200",
      pulse: "animate-pulse",
    },
    success: {
      title: "Nice work!",
      text: xpAwarded > 0 ? `You earned +${xpAwarded} XP.` : "You got it right.",
      icon: <CheckCircle2 className="h-4 w-4 text-green-700" />,
      badge: "bg-green-50 border-green-200",
      pulse: "",
    },
    retry: {
      title: "Almost there",
      text: "Good try. Review and submit again.",
      icon: <TriangleAlert className="h-4 w-4 text-amber-700" />,
      badge: "bg-amber-50 border-amber-200",
      pulse: "",
    },
  } as const;

  const ui = moodMap[mood];

  return (
    <div className="pointer-events-none fixed bottom-[4.75rem] left-1/2 z-40 w-[calc(100vw-1rem)] -translate-x-1/2 px-1 md:bottom-20 md:left-auto md:right-5 md:w-auto md:max-w-[260px] md:translate-x-0 md:px-0">
      <div className={`rounded-lg border bg-white/95 px-3.5 py-3 shadow-sm backdrop-blur dark:border-white/15 dark:bg-[#14261e]/95 ${ui.pulse}`}>
        <div className="flex items-start gap-2.5">
          <div className={`mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-sm border ${ui.badge}`}>
            {ui.icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{ui.title}</p>
            <p className="text-sm text-gray-700 dark:text-gray-100">{ui.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
