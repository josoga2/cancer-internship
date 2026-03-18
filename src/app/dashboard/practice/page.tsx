"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flame, Trophy } from "lucide-react";
import withAuth from "@/components/withAuth";
import LeftSideBar from "@/components/widgets/dashboard-widgets/left-sidebar";
import api from "@/api";

type Skill = {
  id: number;
  name: string;
  description?: string;
  mastery_percent?: number;
  user_xp?: number;
};

type Level = {
  id: number;
  level_name: string;
  order: number;
};

type Exercise = {
  id: number;
  title: string;
  type: string;
  xp_reward: number;
  estimated_minutes: number;
  attempted: boolean;
  correct: boolean;
  locked: boolean;
};

type DailyExercise = {
  exercise_id: number;
  title: string;
  type: string;
  locked?: boolean;
};

function Page() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [dailyChallengeId, setDailyChallengeId] = useState<number | null>(null);
  const [dailyExercises, setDailyExercises] = useState<DailyExercise[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get("/api/practice/skills/");
        const fetchedSkills = response.data?.skills || [];
        setSkills(fetchedSkills);
        setStreak(Number(response.data?.streak?.current_streak || 0));
        if (fetchedSkills.length > 0) {
          setSelectedSkillId(Number(fetchedSkills[0].id));
        }
      } catch (error: any) {
        setSkills([]);
      }
    };

    const fetchDailyChallenge = async () => {
      try {
        const response = await api.get("/api/practice/daily-challenge/");
        if (response.status === 200) {
          const dailyItems = Array.isArray(response.data?.daily_exercises) ? response.data.daily_exercises : [];
          setDailyExercises(dailyItems);
          if (response.data?.exercise_id) {
            setDailyChallengeId(Number(response.data.exercise_id));
          } else if (dailyItems.length > 0) {
            setDailyChallengeId(Number(dailyItems[0].exercise_id));
          } else {
            setDailyChallengeId(null);
          }
        }
      } catch (error) {
        setDailyExercises([]);
        setDailyChallengeId(null);
      }
    };

    fetchSkills();
    fetchDailyChallenge();
  }, []);

  useEffect(() => {
    if (!selectedSkillId) return;
    const fetchLevels = async () => {
      try {
        const response = await api.get(`/api/practice/skills/${selectedSkillId}/levels/`);
        const fetchedLevels = response.data || [];
        setLevels(fetchedLevels);
        if (fetchedLevels.length > 0) {
          setSelectedLevelId(Number(fetchedLevels[0].id));
        }
      } catch (error: any) {
        setLevels([]);
      }
    };
    fetchLevels();
  }, [selectedSkillId]);

  useEffect(() => {
    if (!selectedLevelId) return;
    const fetchExercises = async () => {
      try {
        const response = await api.get(`/api/practice/levels/${selectedLevelId}/exercises/`);
        setExercises(response.data || []);
      } catch (error: any) {
        setExercises([]);
      }
    };
    fetchExercises();
  }, [selectedLevelId]);

  const selectedSkill = skills.find((skill) => Number(skill.id) === Number(selectedSkillId));
  const unlockedExercises = exercises.filter((exercise) => !exercise.locked);
  const dailyTaskCount = dailyExercises.length;

  return (
    <main className="w-full min-h-svh">
      <div className="hidden md:flex w-full">
        <LeftSideBar />
        <div className="w-full bg-hb-lightgreen min-h-svh px-8 py-8">
          <div className="max-w-5xl mx-auto flex flex-col gap-6">
            <div className="rounded-2xl border border-hb-green/30 bg-hb-lightgreen px-5 py-4">
              <p className="text-sm font-semibold text-gray-800">
                Enjoy full daily practice as well as all the rest with a full subscription to HackBio (with 50% discount),{" "}
                <Link href="/dashboard/checkout?prog=subscription&id=0" className="text-hb-green underline">
                  start now
                </Link>
                .
              </p>
            </div>

            <div className="rounded-2xl border border-green-200 bg-white px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-gray-900">Practice Lab</p>
                <p className="text-sm text-gray-600">Observe, decide, act, reflect, then answer what you would do next.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 border border-orange-200 text-sm font-semibold text-orange-700">
                  <Flame className="h-4 w-4" />
                  {streak} day streak
                </div>
                {dailyChallengeId ? (
                  <Link className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-4 py-2 text-sm font-semibold" href={`/dashboard/practice/exercise/${dailyChallengeId}`}>
                    <Trophy className="h-4 w-4" />
                    Daily Challenge
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-800">
                  Daily Practice ({dailyTaskCount} task{dailyTaskCount === 1 ? "" : "s"} today)
                </p>
                {dailyChallengeId ? (
                  <Link href={`/dashboard/practice/exercise/${dailyChallengeId}`} className="text-xs font-semibold text-hb-green hover:underline">
                    Open first
                  </Link>
                ) : null}
              </div>
              {dailyExercises.length > 0 ? (
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {dailyExercises.map((item, index) => (
                    <Link
                      key={`${item.exercise_id}-${index}`}
                      href={`/dashboard/practice/exercise/${item.exercise_id}`}
                      className="rounded-md border border-hb-green/25 bg-hb-lightgreen px-3 py-2 text-sm font-medium text-gray-800 hover:border-hb-green"
                    >
                      {index + 1}. {item.title}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-600">
                  You are doing great. To unlock full daily practice and all challenges, get a HackBio subscription{" "}
                  <Link href="/dashboard/checkout?prog=subscription&id=0" className="text-hb-green underline font-semibold">
                    here
                  </Link>
                  .
                </p>
              )}
            </div>

            <div className="grid grid-cols-12 gap-6">
              <aside className="col-span-4 rounded-2xl border border-gray-200 bg-white p-4">
                <p className="text-sm font-semibold text-gray-800 mb-3">Skills</p>
                <div className="flex flex-col gap-2">
                  {skills.map((skill) => (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => setSelectedSkillId(Number(skill.id))}
                      className={`text-left rounded-xl border px-3 py-3 ${
                        Number(selectedSkillId) === Number(skill.id)
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 bg-white hover:border-green-300"
                      }`}
                    >
                      <p className="text-sm font-semibold text-gray-900">{skill.name}</p>
                      <p className="text-xs text-gray-600 mt-1">Mastery: {Math.round(Number(skill.mastery_percent || 0))}%</p>
                      <p className="text-xs text-gray-600">XP: {Number(skill.user_xp || 0)}</p>
                    </button>
                  ))}
                </div>
              </aside>

              <section className="col-span-8 rounded-2xl border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{selectedSkill?.name || "Exercises"}</p>
                    <p className="text-xs text-gray-500">Pick a level and start practice.</p>
                  </div>
                  <select
                    value={selectedLevelId || ""}
                    onChange={(e) => setSelectedLevelId(Number(e.target.value))}
                    className="border rounded-lg px-3 py-2 text-sm"
                  >
                    {levels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.level_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  {unlockedExercises.length > 0 ? (
                    unlockedExercises.map((exercise, index) => (
                      <div key={exercise.id} className="rounded-xl border border-gray-200 px-3 py-3 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{index + 1}. {exercise.title}</p>
                          <p className="text-xs text-gray-600 uppercase">{exercise.type} | {exercise.estimated_minutes} min | {exercise.xp_reward} XP</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {exercise.attempted ? (
                            <span className={`text-xs font-semibold ${exercise.correct ? "text-green-700" : "text-amber-700"}`}>
                              {exercise.correct ? "Completed" : "Retry queued"}
                            </span>
                          ) : null}
                          <Link href={`/dashboard/practice/exercise/${exercise.id}`} className="text-sm font-semibold text-green-700 hover:underline">
                            Start
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="rounded-lg border border-dashed border-gray-300 px-3 py-4 text-sm text-gray-600">
                      You have used today&apos;s free access in this level. Continue with full access via HackBio subscription{" "}
                      <Link href="/dashboard/checkout?prog=subscription&id=0" className="text-hb-green underline font-semibold">
                        here
                      </Link>
                      .
                    </p>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden w-full bg-hb-lightgreen min-h-svh">
        <LeftSideBar />
        <div className="px-4 py-4 flex flex-col gap-4">
          <div className="rounded-xl border border-hb-green/30 bg-hb-lightgreen p-4">
            <p className="text-sm font-semibold text-gray-800">
              Enjoy full daily practice as well as all the rest with a full subscription to HackBio (with 50% discount),{" "}
              <Link href="/dashboard/checkout?prog=subscription&id=0" className="text-hb-green underline">
                start now
              </Link>
              .
            </p>
          </div>

          <div className="rounded-xl border border-green-200 bg-white p-4">
            <p className="text-lg font-bold">Practice Lab</p>
            <p className="text-sm text-gray-600">{streak} day streak</p>
            {dailyChallengeId ? <Link href={`/dashboard/practice/exercise/${dailyChallengeId}`} className="text-sm text-blue-700 font-semibold">Open daily challenge</Link> : null}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-sm font-semibold mb-2">
              Daily Practice ({dailyTaskCount} task{dailyTaskCount === 1 ? "" : "s"} today)
            </p>
            {dailyExercises.length > 0 ? (
              <div className="flex flex-col gap-2">
                {dailyExercises.map((item, index) => (
                  <Link
                    key={`${item.exercise_id}-${index}`}
                    href={`/dashboard/practice/exercise/${item.exercise_id}`}
                    className="rounded-md border border-hb-green/25 bg-hb-lightgreen px-3 py-2 text-sm font-medium text-gray-800"
                  >
                    {index + 1}. {item.title}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                You are doing great. To unlock full daily practice and all challenges, get a HackBio subscription{" "}
                <Link href="/dashboard/checkout?prog=subscription&id=0" className="text-hb-green underline font-semibold">
                  here
                </Link>
                .
              </p>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-sm font-semibold mb-2">Skills</p>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill) => (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => setSelectedSkillId(Number(skill.id))}
                  className={`rounded-lg border px-3 py-2 text-sm ${Number(selectedSkillId) === Number(skill.id) ? "border-green-500 bg-green-50" : "border-gray-200"}`}
                >
                  {skill.name}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col gap-2">
            <select
              value={selectedLevelId || ""}
              onChange={(e) => setSelectedLevelId(Number(e.target.value))}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              {levels.map((level) => (
                <option key={level.id} value={level.id}>{level.level_name}</option>
              ))}
            </select>

            {unlockedExercises.length > 0 ? (
              unlockedExercises.map((exercise) => (
                <div key={exercise.id} className="rounded-lg border border-gray-200 px-3 py-2 flex items-center justify-between">
                  <p className="text-sm font-semibold">{exercise.title}</p>
                  <Link href={`/dashboard/practice/exercise/${exercise.id}`} className="text-xs text-green-700 font-semibold">Open</Link>
                </div>
              ))
            ) : (
              <p className="rounded-lg border border-dashed border-gray-300 px-3 py-4 text-sm text-gray-600">
                You have used today&apos;s free access in this level. Continue with full access via HackBio subscription{" "}
                <Link href="/dashboard/checkout?prog=subscription&id=0" className="text-hb-green underline font-semibold">
                  here
                </Link>
                .
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

const PageWrapper = () => <Page />;

export default withAuth({ children: <PageWrapper /> });
