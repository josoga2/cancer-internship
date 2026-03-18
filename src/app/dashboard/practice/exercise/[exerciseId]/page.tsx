"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Flame } from "lucide-react";
import withAuth from "@/components/withAuth";
import LeftSideBar from "@/components/widgets/dashboard-widgets/left-sidebar";
import { Progress } from "@/components/ui/progress";
import ExerciseRenderer from "@/components/practice/exercise-renderer";
import FeedbackPanel from "@/components/practice/feedback-panel";
import PocketPal from "@/components/practice/pocket-pal";
import api from "@/api";
import "katex/dist/katex.min.css";

type DetailPayload = {
  exercise: {
    exercise: {
      id: number;
      title: string;
      type: string;
      xp_reward: number;
    };
    content_json: Record<string, any>;
  };
  meta: {
    exercise_index: number;
    exercise_total: number;
    skill_name: string;
    level_name: string;
    user_skill_xp: number;
    mastery_percent: number;
    streak: number;
    last_result?: {
      is_correct?: boolean;
      explanation?: string;
      best_practice?: string;
      next_step?: string;
    } | null;
  };
};

type SubmitResult = {
  correct: boolean;
  score: number;
  xp_awarded: number;
  explanation?: string;
  best_practice?: string;
  next_step?: string;
  next_question?: number | null;
};

function Page() {
  const params = useParams();
  const router = useRouter();
  const exerciseId = Number(params.exerciseId);

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<DetailPayload | null>(null);
  const [answer, setAnswer] = useState<any>("");
  const [hintOpen, setHintOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  const redirectToPractice = () => {
    router.push("/dashboard/practice");
  };

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/practice/exercises/${exerciseId}/`);
        if (response.status === 200) {
          setDetail(response.data);
          setResult(null);
          const type = response.data?.exercise?.exercise?.type;
          if (type === "rearrange" || type === "pipeline") {
            setAnswer([]);
          } else {
            setAnswer("");
          }
        }
      } catch (error: any) {
        if (error?.response?.status === 402) {
          redirectToPractice();
          return;
        }
        router.push("/dashboard/practice");
      } finally {
        setLoading(false);
      }
    };

    if (!Number.isNaN(exerciseId)) {
      fetchDetail();
    }
  }, [exerciseId]);

  const exercise = detail?.exercise?.exercise;
  const content = detail?.exercise?.content_json || {};
  const meta = detail?.meta;

  const progressPercent = useMemo(() => {
    if (!meta?.exercise_total) return 0;
    return Math.round((meta.exercise_index / meta.exercise_total) * 100);
  }, [meta]);

  const hasAnswer = useMemo(() => {
    if (Array.isArray(answer)) return answer.length > 0;
    if (typeof answer === "string") return answer.trim().length > 0;
    return !!answer;
  }, [answer]);

  const submitLabel = useMemo(() => {
    if (!result) return "Submit";
    if (result.correct) return result.next_question ? "Next" : "Done";
    return "Try again";
  }, [result]);

  const palMood = useMemo(() => {
    if (submitting) return "checking";
    if (!result) return "idle";
    return result.correct ? "success" : "retry";
  }, [submitting, result]);

  const playFeedbackTone = (variant: "success" | "retry") => {
    if (typeof window === "undefined") return;
    const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextCtor) return;

    const ctx = new AudioContextCtor();
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => null);
    }

    const playNote = (frequency: number, start: number, duration: number, peak = 0.1) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(peak, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    };

    const now = ctx.currentTime;
    if (variant === "success") {
      playNote(523.25, now, 0.14, 0.1);
      playNote(659.25, now + 0.12, 0.14, 0.1);
      playNote(783.99, now + 0.24, 0.18, 0.1);
    } else {
      playNote(246.94, now, 0.18, 0.08);
      playNote(293.66, now + 0.16, 0.2, 0.08);
    }

    setTimeout(() => {
      ctx.close().catch(() => null);
    }, 800);
  };

  const handlePrimaryAction = async () => {
    if (result?.correct && result.next_question) {
      router.push(`/dashboard/practice/exercise/${result.next_question}`);
      return;
    }
    if (result?.correct && !result.next_question) {
      router.push("/dashboard/practice");
      return;
    }

    if (!result || !result.correct) {
      if (!hasAnswer) return;
      setSubmitting(true);
      try {
        const payload = {
          exercise_id: exerciseId,
          answer,
        };
        const response = await api.post("/api/practice/submit/", payload);
        if (response.status === 200) {
          const nextResult = response.data as SubmitResult;
          setResult(nextResult);
          playFeedbackTone(nextResult.correct ? "success" : "retry");
        }
      } catch (error: any) {
        if (error?.response?.status === 402) {
          redirectToPractice();
          return;
        }
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (loading || !detail || !exercise || !meta) {
    return (
      <main className="w-full min-h-svh bg-hb-lightgreen">
        <LeftSideBar />
        <div className="p-8 text-sm text-gray-600">Loading exercise...</div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-svh">
      <div className="hidden md:flex w-full">
        <LeftSideBar />

        <div className="w-full bg-hb-lightgreen min-h-svh pb-28">
          <div className="max-w-4xl mx-auto px-8 py-8 flex flex-col gap-6">
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">Skill: {meta.skill_name}</p>
                  <p className="text-sm text-gray-500">Level: {meta.level_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-700">XP: {meta.user_skill_xp}</p>
                  <p className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600">
                    <Flame className="h-4 w-4" />
                    {meta.streak} days
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Exercise {meta.exercise_index} / {meta.exercise_total}</span>
                  <span>Mastery {Math.round(meta.mastery_percent)}%</span>
                </div>
                <Progress value={progressPercent} />
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs uppercase tracking-wide text-gray-500">Exercise</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{exercise.title}</p>

              <div className="mt-5">
                <ExerciseRenderer
                  exerciseType={exercise.type}
                  content={content}
                  answer={answer}
                  onAnswerChange={setAnswer}
                />
              </div>

              {content?.hint ? (
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => setHintOpen((prev) => !prev)}
                    className="text-sm font-semibold text-blue-700"
                  >
                    Need a hint?
                  </button>
                  {hintOpen ? <p className="text-sm text-gray-700 mt-2">{content.hint}</p> : null}
                </div>
              ) : null}
            </div>

            {result ? (
              <FeedbackPanel
                correct={result.correct}
                explanation={result.explanation}
                bestPractice={result.best_practice}
                nextStep={result.next_step}
              />
            ) : null}
          </div>

          <div className="fixed bottom-0 right-0 left-0 md:left-[var(--hb-sidebar-offset,15rem)] transition-[left] duration-300 border-t border-gray-200 bg-white/95 backdrop-blur px-6 py-3">
            <div className="flex items-center justify-between">
              <Link href="/dashboard/practice" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
              <button
                type="button"
                onClick={handlePrimaryAction}
                disabled={submitting || (!hasAnswer && !result?.correct)}
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-semibold disabled:opacity-60"
              >
                {submitLabel}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden w-full bg-hb-lightgreen min-h-svh pb-28">
        <LeftSideBar />
        <div className="px-4 py-4 flex flex-col gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">{meta.skill_name} | {meta.level_name}</p>
            <p className="text-lg font-bold">{exercise.title}</p>
            <p className="text-xs text-gray-600">Exercise {meta.exercise_index}/{meta.exercise_total} | Streak {meta.streak} days</p>
            <div className="mt-2"><Progress value={progressPercent} /></div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <ExerciseRenderer
              exerciseType={exercise.type}
              content={content}
              answer={answer}
              onAnswerChange={setAnswer}
            />
          </div>

          {result ? (
            <FeedbackPanel
              correct={result.correct}
              explanation={result.explanation}
              bestPractice={result.best_practice}
              nextStep={result.next_step}
            />
          ) : null}
        </div>

        <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard/practice" className="text-sm font-semibold text-gray-700">Back</Link>
          <button
            type="button"
            onClick={handlePrimaryAction}
            disabled={submitting || (!hasAnswer && !result?.correct)}
            className="rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-semibold disabled:opacity-60"
          >
            {submitLabel}
          </button>
        </div>
      </div>

      <PocketPal mood={palMood} xpAwarded={result?.xp_awarded || 0} />
    </main>
  );
}

const PageWrapper = () => <Page />;

export default withAuth({ children: <PageWrapper /> });
