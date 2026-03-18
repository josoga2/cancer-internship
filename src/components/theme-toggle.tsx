"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type ThemeToggleProps = {
  variant?: "floating" | "sidebar";
  showLabel?: boolean;
  className?: string;
};

export default function ThemeToggle({
  variant = "floating",
  showLabel = true,
  className = "",
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (variant === "floating" && pathname?.startsWith("/dashboard")) {
    return null;
  }

  const baseFloatingClass =
    "fixed right-3 bottom-3 z-[70] inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/95 px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm dark:border-white/20 dark:bg-gray-900/95 dark:text-gray-100";
  const baseSidebarClass =
    "inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100 dark:border-white/20 dark:bg-[#14261e] dark:text-gray-100 dark:hover:bg-hb-green/80";
  const buttonClass =
    variant === "floating"
      ? `${baseFloatingClass} ${className}`
      : `${baseSidebarClass} ${showLabel ? "w-full" : "h-10 w-10 px-0"} ${className}`;

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={buttonClass}
      >
        <Sun className="h-4 w-4" />
        {showLabel ? <span>Theme</span> : null}
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={buttonClass}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {showLabel ? <span>{isDark ? "Light" : "Dark"}</span> : null}
    </button>
  );
}
