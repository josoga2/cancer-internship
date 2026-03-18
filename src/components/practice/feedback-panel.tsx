"use client";

type FeedbackPanelProps = {
  correct: boolean;
  explanation?: string;
  bestPractice?: string;
  nextStep?: string;
};

export default function FeedbackPanel({
  correct,
  explanation,
  bestPractice,
  nextStep,
}: FeedbackPanelProps) {
  return (
    <div className={`rounded-xl border p-4 ${correct ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}>
      <p className={`text-base font-bold ${correct ? "text-green-700" : "text-red-700"}`}>
        {correct ? "Correct" : "Incorrect"}
      </p>
      {explanation ? <p className="text-sm text-gray-700 mt-2">{explanation}</p> : null}
      {bestPractice ? <p className="text-sm text-gray-700 mt-2"><span className="font-semibold">Best practice:</span> {bestPractice}</p> : null}
      <p className="text-sm font-semibold text-gray-800 mt-3">What would you do next?</p>
      <p className="text-sm text-gray-700">{nextStep || "What would you do next?"}</p>
    </div>
  );
}
