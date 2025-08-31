"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Question = {
  id: string;
  text: string;
  options: { label: string; value: string }[];
};

const questions: Question[] = [
  {
    id: "persona",
    text: "How would you describe yourself?",
    options: [
      { label: "Data person", value: "data" },
      { label: "Pathway person", value: "pathway" },
      { label: "Software person", value: "software" },
      { label: "Code person", value: "code" },
      { label: "Jack of all trades", value: "jack" },
    ],
  },
  {
    id: "projects",
    text: "What kind of projects do you like?",
    options: [
      { label: "Fundamental biology", value: "fundamental" },
      { label: "Translational research", value: "translational" },
      { label: "Applied biotech/industry", value: "industry" },
    ],
  },
  {
    id: "ideas",
    text: "How do ideas come to you?",
    options: [
      { label: "Naturally / intuition", value: "natural" },
      { label: "On the spot / practical problem solving", value: "spot" },
      { label: "After reading papers", value: "papers" },
    ],
  },
  {
    id: "careerStage",
    text: "What career stage are you?",
    options: [
      { label: "BSc", value: "bsc" },
      { label: "MSc", value: "msc" },
      { label: "PhD", value: "phd" },
      { label: "Professional / industry", value: "pro" },
    ],
  },
  {
    id: "nextStep",
    text: "What’s your next career step?",
    options: [
      { label: "Get a job", value: "job" },
      { label: "Get into grad school", value: "grad" },
      { label: "Upskill / reskill", value: "skill" },
    ],
  },
];

type Track = {
  id: string;
  title: string;
  description: string;
  link: string;
  match: (answers: Record<string, string>) => number; // scoring function
};

const tracks: Track[] = [
  {
    id: "ngs",
    title: "NGS Analyst",
    description: "Focus on RNA-seq, WGS, and single-cell pipelines.",
    link: "/programs/ngs",
    match: (a) => (a.persona === "data" || a.projects === "fundamental" ? 2 : 0),
  },
  {
    id: "proteomics",
    title: "Proteomics / Systems Biologist",
    description: "Pathway, network biology, and integrative omics.",
    link: "/programs/proteomics",
    match: (a) => (a.persona === "pathway" ? 3 : 0),
  },
  {
    id: "ai",
    title: "Bio-Data Scientist / ML Specialist",
    description: "Machine learning applied to omics and biotech problems.",
    link: "/programs/ai",
    match: (a) => (a.persona === "software" || a.persona === "code" ? 2 : 0),
  },
  {
    id: "wetlab",
    title: "Wet-Lab Companion",
    description: "Interpret data with R/Python basics, visualization, web tools.",
    link: "/programs/wetlab",
    match: (a) => (a.careerStage === "bsc" && a.projects === "translational" ? 2 : 0),
  },
  {
    id: "explorer",
    title: "Curious Explorer / Academic Supplement",
    description: "Lightweight exposure via mini-projects and visualization.",
    link: "/programs/explorer",
    match: (a) => (a.persona === "jack" ? 1 : 0),
  },
];

export default function Page() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Track | null>(null);

  const handleSelect = (qid: string, value: string) => {
    setAnswers({ ...answers, [qid]: value });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // compute best track
      const scored = tracks
        .map((t) => ({ ...t, score: t.match(answers) }))
        .sort((a, b) => b.score - a.score);
      setResult(scored[0]);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full"
      >
        {result ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Recommended Pathway</h2>
            <p className="text-gray-600 mb-6">{result.description}</p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href={result.link}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Explore {result.title}
              </Link>
              <button
                onClick={restart}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300"
              >
                Restart
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {questions[step].text}
            </h2>
            <div className="space-y-3">
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(questions[step].id, opt.value)}
                  className="w-full px-4 py-3 bg-blue-50 text-blue-700 font-medium rounded-xl hover:bg-blue-100"
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="mt-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300"
              >
                Back
              </button>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
