"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Nav/navbar";
import Footer from "@/components/Nav/footer";
import publicApi from "@/publicApi";

type QuestionType = "single" | "multiple" | "text";
type ViewState = "start" | "section" | "question" | "email" | "result";

type AnswerOption = {
  id: number;
  text: string;
  order: number;
  score?: number;
  tag?: string;
};

type AssessmentQuestion = {
  id: number;
  text: string;
  section: string;
  question_type: QuestionType;
  order: number;
  required: boolean;
  help_text?: string;
  options: AnswerOption[];
};

type Assessment = {
  id: number;
  name: string;
  slug: string;
  description: string;
  questions: AssessmentQuestion[];
};

type LegacyResult = {
  id: string;
  total_score: number;
  result_category: string;
  recommended_pathway: string;
  profile?: {
    headline: string;
    summary: string;
    strengths: string[];
    growth_areas: string[];
    recommendations: string[];
  };
};

type TopicScore = {
  label: string;
  score: number;
  max_score: number;
  percent: number;
  is_weak: boolean;
};

type WeightedRecommendation = {
  title?: string;
  description?: string;
  topic: string;
  topic_label: string;
  recommendation_type?: "learning_resource" | "career_path";
  career_path?: string;
  target_type: "course" | "pathway" | "internship" | "career_path";
  target_id?: number | null;
  target_title: string;
  target_url?: string;
  course_id?: number | null;
  course_title?: string;
  pathway_id?: number | null;
  pathway_title?: string;
  internship_id?: number | null;
  internship_title?: string;
  message: string;
};

type WeightedResult = {
  id: string;
  assessment_slug: string;
  assessment_name: string;
  report_json: {
    weak_threshold: number;
    topics: Record<string, TopicScore>;
    weak_topics: string[];
    career_path_recommendation?: WeightedRecommendation | null;
    recommendations?: WeightedRecommendation[];
    course_recommendations?: WeightedRecommendation[];
  };
};

type Result = LegacyResult | WeightedResult;

const introBullets = [
  "Personalized readiness report",
  "Career pathway recommendation",
  "Skill gap insights",
  "Estimated learning roadmap",
];

const pathwayPreviewLinks: Record<string, string> = {
  "Genomics Data Science": "/pathway/2",
  "Coding for Bio": "/pathway/1",
  "AI for Biology": "/learning",
  "Clinical and Translational Bioinformatics": "/learning",
  "Research Bioinformatics": "/learning",
  "Industry Bioinformatics": "/learning",
  "General Bioinformatics": "/learning",
};

const fallbackAssessment: Assessment = {
  id: 0,
  name: "Bioinformatics Readiness Assessment",
  slug: "readiness",
  description: "Discover how prepared you are for a career in bioinformatics, computational biology, and AI-driven life sciences.",
  questions: [],
};

function normalizeAssessment(data: any, weighted: boolean): Assessment {
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    questions: (data.questions || [])
      .map((question: any) => ({
        id: question.id,
        text: question.text,
        section: question.section || (weighted ? "Career Path" : "Readiness"),
        question_type: question.question_type || "single",
        order: question.order || 0,
        required: question.required !== false,
        help_text: question.help_text || "",
        options: (weighted ? question.answers : question.choices || [])
          .map((option: any) => ({
            id: option.id,
            text: option.text,
            order: option.order || 0,
            score: option.score,
            tag: option.tag,
          }))
          .sort((a: AnswerOption, b: AnswerOption) => a.order - b.order),
      }))
      .sort((a: AssessmentQuestion, b: AssessmentQuestion) => a.order - b.order),
  };
}

function isWeightedResult(result: Result | null): result is WeightedResult {
  return Boolean(result && "report_json" in result);
}

function targetHref(recommendation: WeightedRecommendation) {
  if (recommendation.target_type === "career_path") return recommendation.target_url || "/learning";
  if (recommendation.target_type === "pathway") return `/pathway/${recommendation.target_id}`;
  if (recommendation.target_type === "internship") return `/internship/${recommendation.target_id}`;
  return `/learning/course/${recommendation.target_id}`;
}

function legacyPreviewResult(assessment: Assessment, answers: Record<number, number[] | string>): LegacyResult {
  const selectedChoiceIds = new Set<number>();
  Object.values(answers).forEach((answer) => {
    if (Array.isArray(answer)) answer.forEach((choiceId) => selectedChoiceIds.add(choiceId));
  });
  const selectedChoices = assessment.questions.flatMap((question) =>
    question.options.filter((choice) => selectedChoiceIds.has(choice.id))
  );
  const totalScore = selectedChoices.reduce((sum, choice) => sum + Number(choice.score || 0), 0);
  const tags = selectedChoices.map((choice) => choice.tag).filter(Boolean) as string[];
  const topTag = tags.sort(
    (a, b) => tags.filter((tag) => tag === b).length - tags.filter((tag) => tag === a).length
  )[0];
  const category =
    totalScore >= 80
      ? "Career Accelerator"
      : totalScore >= 60
        ? "Research-Ready"
        : totalScore >= 40
          ? "Foundation Builder"
          : "Emerging Explorer";
  const pathwayMap: Record<string, string> = {
    genomics: "Genomics Data Science",
    ai: "AI for Biology",
    coding: "Coding for Bio",
    clinical: "Clinical and Translational Bioinformatics",
    research: "Research Bioinformatics",
    industry: "Industry Bioinformatics",
    beginner: "General Bioinformatics",
  };

  return {
    id: "preview",
    total_score: totalScore,
    result_category: category,
    recommended_pathway: pathwayMap[topTag || ""] || "General Bioinformatics",
    profile: {
      headline: "Your readiness profile",
      summary: "Your answers show a clear starting point for building toward bioinformatics and computational biology.",
      strengths: ["Learning potential", "Scientific curiosity"],
      growth_areas: ["Coding fluency", "Applied project practice"],
      recommendations: ["Start with a structured pathway", "Practice weekly with small analysis tasks"],
    },
  };
}

export default function BioinformaticsAssessmentPage() {
  const params = useParams();
  const assessmentSlug = String(params.assessment || "readiness");
  const usesWeightedAssessment = assessmentSlug === "career-path";

  const [assessment, setAssessment] = useState<Assessment>(fallbackAssessment);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState<ViewState>("start");
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number[] | string>>({});
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const fetchAssessment = async () => {
      setLoading(true);
      setError("");
      setAnswers({});
      setResult(null);
      setView("start");
      setSectionIndex(0);
      setQuestionIndex(0);

      try {
        const endpoint = usesWeightedAssessment
          ? `/api/weighted-assessments/${assessmentSlug}/`
          : `/api/assessments/${assessmentSlug}/`;
        const response = await publicApi.get(endpoint, { timeout: 8000 });
        setAssessment(normalizeAssessment(response.data, usesWeightedAssessment));
      } catch (err) {
        console.error("Failed to load assessment:", err);
        if (assessmentSlug === "readiness") {
          setAssessment(fallbackAssessment);
        } else {
          setError("Unable to load this assessment right now.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [assessmentSlug, usesWeightedAssessment]);

  const sections = useMemo(() => {
    const grouped = new Map<string, AssessmentQuestion[]>();
    assessment.questions.forEach((question) => {
      const section = question.section || "Assessment";
      grouped.set(section, [...(grouped.get(section) || []), question]);
    });
    return Array.from(grouped.entries()).map(([title, questions]) => ({
      title,
      questions: questions.sort((a, b) => a.order - b.order),
    }));
  }, [assessment.questions]);

  const currentSection = sections[sectionIndex];
  const currentQuestion = currentSection?.questions[questionIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const canContinue =
    !currentQuestion?.required ||
    (currentQuestion.question_type === "text"
      ? typeof currentAnswer === "string" && currentAnswer.trim().length > 0
      : Array.isArray(currentAnswer) && currentAnswer.length > 0);

  const selectChoice = (question: AssessmentQuestion, choiceId: number) => {
    setAnswers((prev) => {
      if (question.question_type === "multiple") {
        const selected = Array.isArray(prev[question.id]) ? (prev[question.id] as number[]) : [];
        return {
          ...prev,
          [question.id]: selected.includes(choiceId)
            ? selected.filter((id) => id !== choiceId)
            : [...selected, choiceId],
        };
      }
      return { ...prev, [question.id]: [choiceId] };
    });
  };

  const goNext = () => {
    if (!currentSection) return;
    if (questionIndex < currentSection.questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      return;
    }
    if (sectionIndex < sections.length - 1) {
      setSectionIndex((prev) => prev + 1);
      setQuestionIndex(0);
      setView("section");
      return;
    }
    setView("email");
  };

  const goPrevious = () => {
    if (view === "section") {
      if (sectionIndex === 0) {
        setView("start");
        return;
      }
      const previousSection = sections[sectionIndex - 1];
      setSectionIndex((prev) => prev - 1);
      setQuestionIndex(Math.max(previousSection.questions.length - 1, 0));
      setView("question");
      return;
    }
    if (view === "question") {
      if (questionIndex > 0) {
        setQuestionIndex((prev) => prev - 1);
        return;
      }
      setView("section");
      return;
    }
    if (view === "email") setView("question");
  };

  const submitAssessment = async () => {
    if (!email.trim()) {
      setError("Please enter your email to view your report.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const payload = {
        email,
        full_name: fullName,
        weak_threshold: 60,
        answers: assessment.questions.map((question) => {
          const answer = answers[question.id];
          return usesWeightedAssessment
            ? {
                question: question.id,
                selected_answers: Array.isArray(answer) ? answer : [],
                text_answer: typeof answer === "string" ? answer : "",
              }
            : {
                question: question.id,
                selected_choices: Array.isArray(answer) ? answer : [],
                text_answer: typeof answer === "string" ? answer : "",
              };
        }),
      };

      const endpoint = usesWeightedAssessment
        ? `/api/weighted-assessments/${assessment.slug}/submissions/`
        : `/api/assessments/${assessment.slug}/submissions/`;
      const response = await publicApi.post(endpoint, payload);
      setResult(response.data);
      setView("result");
    } catch (err: any) {
      console.error("Failed to submit assessment:", err);
      if (!usesWeightedAssessment && assessment.id === 0) {
        setResult(legacyPreviewResult(assessment, answers));
        setView("result");
      } else {
        setError(err?.response?.data?.email || err?.response?.data?.detail || "Unable to submit your assessment right now.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const Header = () => (
    <>
      <h1 className="text-4xl font-bold leading-tight tracking-normal text-[#1f1f24] md:text-4xl">
        {assessment.name || "Bioinformatics Readiness Assessment"}
      </h1>
      <p className="mt-8 max-w-4xl text-lg leading-7 text-[#1f1f24] md:text-xl">
        {assessment.description ||
          "Discover how prepared you are for a career in bioinformatics, computational biology, and AI-driven life sciences."}{" "}
        <span className="font-bold underline underline-offset-2">No Judgements</span>
      </p>
      <ul className="mt-8 list-disc space-y-2 pl-8 text-base leading-6 text-black md:text-lg">
        {introBullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </>
  );

  const Panel = ({ children, centered = false }: { children: React.ReactNode; centered?: boolean }) => (
    <div
      className={`mt-14 flex min-h-[520px] w-full rounded-[3px] border-2 border-hb-green bg-[#dff5e8] p-6 text-black md:p-12 ${
        centered ? "items-center justify-center text-center" : "items-start"
      }`}
    >
      {children}
    </div>
  );

  const renderWeightedResult = (weightedResult: WeightedResult) => {
    const topics = Object.entries(weightedResult.report_json?.topics || {});
    const weakTopics = topics.filter(([, topic]) => topic.is_weak);
    const strongTopics = topics
      .filter(([, topic]) => !topic.is_weak)
      .sort(([, a], [, b]) => b.percent - a.percent)
      .slice(0, 3);
    const careerPathRecommendation = weightedResult.report_json?.career_path_recommendation || null;
    const recommendations =
      weightedResult.report_json?.recommendations || weightedResult.report_json?.course_recommendations || [];

    return (
      <div className="w-full">
        <p className="text-center text-2xl font-bold uppercase">Your Career Path Profile</p>

        {careerPathRecommendation ? (
          <div className="mt-10 rounded-[3px] border-2 border-hb-green bg-white/75 p-5 md:p-6">
            <p className="text-base uppercase tracking-wide text-hb-green">Recommended career path</p>
            <p className="mt-2 text-2xl font-bold">{careerPathRecommendation.title || careerPathRecommendation.target_title}</p>
            {careerPathRecommendation.description || careerPathRecommendation.message ? (
              <p className="mt-4 text-base leading-7">
                {careerPathRecommendation.description || careerPathRecommendation.message}
              </p>
            ) : null}
            <Link
              href={targetHref(careerPathRecommendation)}
              className="mt-5 inline-flex rounded-[3px] bg-hb-green px-5 py-3 text-base font-bold text-white"
            >
              Explore {careerPathRecommendation.target_type === "internship" ? "internship" : "career path"}
            </Link>
          </div>
        ) : null}

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {topics.map(([key, topic]) => (
            <div key={key} className="rounded-[3px] border border-hb-green bg-white/60 p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-lg font-bold">{topic.label}</p>
                <p className="text-lg font-bold">{Math.round(topic.percent)}%</p>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
                <div className="h-full bg-hb-green" style={{ width: `${Math.max(0, Math.min(topic.percent, 100))}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-xl font-bold">Your strongest signals</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-lg">
              {strongTopics.map(([key, topic]) => (
                <li key={key}>{topic.label}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xl font-bold">Areas to strengthen</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-lg">
              {weakTopics.length ? weakTopics.map(([key, topic]) => <li key={key}>{topic.label}</li>) : <li>No major weak area detected.</li>}
            </ul>
          </div>
        </div>

        {recommendations.length ? (
          <div className="mt-10">
            <p className="text-xl font-bold">Recommended courses, pathways, and internships</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {recommendations.map((recommendation) => (
                <Link
                  key={`${recommendation.topic}-${recommendation.target_type}-${recommendation.target_id || recommendation.career_path}`}
                  href={targetHref(recommendation)}
                  className="rounded-[3px] border border-hb-green bg-white/70 p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-base uppercase tracking-wide text-hb-green">{recommendation.topic_label}</p>
                  <p className="mt-2 text-xl font-bold">{recommendation.target_title}</p>
                  <p className="mt-3 text-base leading-6">{recommendation.message}</p>
                  <p className="mt-4 text-base font-bold text-hb-green">Open recommendation</p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  const renderLegacyResult = (legacyResult: LegacyResult) => (
    <div className="w-full">
      <p className="text-center text-2xl font-bold uppercase">Your Readiness Profile</p>
      <p className="mt-16 text-2xl">
        Your readiness category: <span className="ml-4 font-bold">{legacyResult.result_category}</span>
      </p>
      <p className="mt-8 max-w-4xl text-2xl leading-9">
        {legacyResult.profile?.summary || "Your personalized readiness profile is ready."}
      </p>
      <p className="mt-8 text-2xl">
        Recommended pathway:{" "}
        <Link
          href={pathwayPreviewLinks[legacyResult.recommended_pathway] || "/learning"}
          className="font-bold text-hb-green underline underline-offset-2"
        >
          {legacyResult.recommended_pathway}
        </Link>
      </p>
      {legacyResult.profile?.recommendations?.length ? (
        <ul className="mt-8 list-disc space-y-2 pl-8 text-xl">
          {legacyResult.profile.recommendations.slice(1).map((recommendation) => (
            <li key={recommendation}>{recommendation}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );

  return (
    <section className="min-h-screen bg-white text-[#1f1f24]">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-6 pb-20 pt-28 md:px-10 md:pt-32">
        <Header />

        {loading ? (
          <Panel centered>
            <p className="text-xl font-bold">Loading...</p>
          </Panel>
        ) : error && view !== "email" ? (
          <Panel centered>
            <p className="text-xl font-bold">{error}</p>
          </Panel>
        ) : view === "start" ? (
          <Panel centered>
            <div>
              <button
                type="button"
                onClick={() => setView(sections.length ? "section" : "email")}
                className="w-56 rounded-[3px] bg-hb-green px-8 py-3 text-xl font-bold text-white"
              >
                Start Now
              </button>
              <p className="mt-6 text-xl font-bold">Takes about 4-5 mins</p>
            </div>
          </Panel>
        ) : view === "section" ? (
          <Panel centered>
            <p className="text-2xl font-bold">
              Section {sectionIndex + 1} of {sections.length}: {currentSection?.title}
            </p>
          </Panel>
        ) : view === "question" && currentQuestion ? (
          <Panel>
            <div className="flex min-h-[430px] w-full flex-col justify-between">
              <div>
                <p className="text-xl font-bold">
                  Section {sectionIndex + 1} of {sections.length}: {currentSection?.title}
                </p>
                <p className="mt-16 text-xl leading-7 md:mt-20">{currentQuestion.text}</p>
                {currentQuestion.help_text ? <p className="mt-3 text-base">{currentQuestion.help_text}</p> : null}
                <div className="mt-8 space-y-6">
                  {currentQuestion.question_type === "text" ? (
                    <textarea
                      value={typeof currentAnswer === "string" ? currentAnswer : ""}
                      onChange={(event) => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: event.target.value }))}
                      className="min-h-[120px] w-full rounded-[3px] border-2 border-[#1f1f24] bg-white p-3 text-xl outline-none"
                    />
                  ) : (
                    currentQuestion.options.map((choice) => {
                      const selected = Array.isArray(currentAnswer) && currentAnswer.includes(choice.id);
                      return (
                        <button
                          key={choice.id}
                          type="button"
                          onClick={() => selectChoice(currentQuestion, choice.id)}
                          className="flex w-full items-center gap-5 text-left text-lg md:gap-8"
                        >
                          <span
                            className={`h-9 w-9 shrink-0 rounded-[4px] border-2 border-[#1f1f24] ${
                              selected ? "bg-black" : "bg-[#bfe9d1]"
                            }`}
                          />
                          <span>{choice.text}</span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
              <div className="mt-12 flex flex-col items-stretch justify-between gap-4 md:flex-row">
                <button
                  type="button"
                  onClick={goPrevious}
                  className="rounded-[3px] bg-hb-green px-8 py-3 text-xl font-bold text-white md:w-56"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canContinue}
                  className="rounded-[3px] bg-hb-green px-8 py-3 text-xl font-bold text-white disabled:opacity-50 md:w-56"
                >
                  Next
                </button>
              </div>
            </div>
          </Panel>
        ) : view === "email" ? (
          <Panel>
            <div className="flex min-h-[430px] w-full flex-col justify-between">
              <div>
                <p className="text-2xl font-bold">Unlock Your Personalized Report</p>
                <div className="mt-16 grid gap-6">
                  <label className="block text-xl" htmlFor="report-name">
                    What is your name?
                    <input
                      id="report-name"
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      className="mt-3 h-12 w-full max-w-2xl rounded-[3px] border-2 border-[#1f1f24] bg-white px-3 text-xl outline-none"
                    />
                  </label>
                  <label className="block text-xl" htmlFor="report-email">
                    Where should we send your report?
                    <input
                      id="report-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="mt-3 h-12 w-full max-w-2xl rounded-[3px] border-2 border-[#1f1f24] bg-white px-3 text-xl outline-none"
                    />
                  </label>
                </div>
                {error ? <p className="mt-4 text-base font-semibold text-red-700">{error}</p> : null}
              </div>
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={submitAssessment}
                  disabled={submitting}
                  className="rounded-[3px] bg-hb-green px-8 py-3 text-xl font-bold text-white disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "View your results"}
                </button>
              </div>
            </div>
          </Panel>
        ) : result ? (
          <Panel>{isWeightedResult(result) ? renderWeightedResult(result) : renderLegacyResult(result)}</Panel>
        ) : null}

        {view === "section" ? (
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setView("question")}
              className="rounded-[3px] bg-hb-green px-8 py-3 text-xl font-bold text-white"
            >
              Continue
            </button>
          </div>
        ) : null}
      </main>
      <Footer />
    </section>
  );
}
