"use client";

type StreakBarProps = {
  loginDates: string[];
  mode?: "desktop" | "mobile";
  className?: string;
};

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const buildLast7Days = (loginDates: string[]) => {
  const dateSet = new Set(loginDates || []);
  const today = new Date();
  return Array.from({ length: 7 }, (_, index) => {
    const offset = 6 - index;
    const day = new Date(today);
    day.setDate(today.getDate() - offset);
    const key = formatLocalDate(day);
    return dateSet.has(key);
  });
};

export default function StreakBar({ loginDates, mode = "desktop", className = "" }: StreakBarProps) {
  const streakDays = buildLast7Days(loginDates || []);
  const label = mode === "mobile" ? "streak" : "Last 7 days";

  return (
    <div className={`inline-flex items-center gap-3 rounded-full border border-hb-green/20 bg-hb-lightgreen p-2 ${className}`.trim()}>
      <span className="text-sm font-semibold text-hb-green whitespace-nowrap">🔥 {label}</span>
      <div className="flex items-center gap-2">
        {streakDays.map((isActive, index) => (
          <span
            key={`${mode}-streak-${index}`}
            className={`h-4 w-4 rounded-full ${isActive ? "bg-hb-green shadow-[0_0_0_2px_rgba(39,174,96,0.25)]" : "bg-hb-green/20"}`}
          />
        ))}
      </div>
    </div>
  );
}
