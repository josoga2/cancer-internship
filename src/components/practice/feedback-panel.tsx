"use client";

type FeedbackPanelProps = {
  correct: boolean;
  explanation?: string;
  hint?: string;
  bestPractice?: string;
};

export default function FeedbackPanel({
  correct,
  explanation,
  hint,
  bestPractice,
}: FeedbackPanelProps) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        correct
          ? "border-green-300 bg-green-50 dark:border-hb-green/50 dark:bg-[#0d2a22]"
          : "border-red-300 bg-red-50 dark:border-red-500/50 dark:bg-[#2a1717]"
      }`}
    >
      <p className={`text-base font-bold ${correct ? "text-green-700 dark:text-hb-lightgreen" : "text-red-700 dark:text-red-300"}`}>
        {correct ? "Correct" : "Incorrect"}
      </p>
      <p className="mt-3 text-sm font-semibold text-gray-800 dark:text-gray-100">Explanation</p>
      <p className="text-sm text-gray-700 dark:text-gray-100">
        {explanation || "No explanation available for this question."}
      </p>
      {bestPractice ? (
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-100">
          <span className="font-semibold">Best practice:</span> {bestPractice}
        </p>
      ) : null}
      <p className="mt-3 text-sm font-semibold text-gray-800 dark:text-gray-100">Hint</p>
      <p className="text-sm text-gray-700 dark:text-gray-100">
        {hint || "No hint available for this question."}
      </p>
    </div>
  );
}
