"use client";

import { useState, useMemo } from "react";
import HbButtons from "../widgets/hb-buttons";
import Link from "next/link";

type Goal = "learn" | "project";
type Duration = "1m" | "12m" | "free";
type People = "1" | "3" | "5-10" | "10+";

interface Result {
  name: string;
  price: string;
  note?: string;
}

export default function PricingSelector() {
  const [goal, setGoal] = useState<Goal>("learn");
  const [people, setPeople] = useState<People>("1");
  const [duration, setDuration] = useState<Duration>("12m");

  const result: Result | null = useMemo(() => {
    // 1. FREE
    if (goal === "learn" && people === "1" && duration === "free") {
      return {
        name: "Free",
        price: "$0",
        note: "Limited Courses only",
      };
    }

    // 2. TAKING IT EASY
    if (goal === "learn" && people === "1" && duration === "12m") {
      return {
        name: "Taking it easy",
        price: "From $15/yr",
        note: "For 1 course at a time, valid for 1 year",
      };
    }

    // 3. STUDY SQUAD
    if (goal === "project" && people === "1" && duration === "1m") {
      return {
        name: "Study Squad",
        price: "From $50/cohort",
        note: "Full access to one Internship Cohort",
      };
    }

    // 4. COMMITTED LEARNER
    if (people === "1" && duration === "12m") {
      return {
        name: "Committed Learner",
        price: "$200/yr",
        note: "Full access to all courses & internships",
      };
    }

    // 5. LAB
    if (people === "5-10" && duration === "12m") {
      return {
        name: "Lab",
        price: "$600/yr",
        note: "Full access to all courses & internships",
      };
    }

    // 6. UNIVERSITY / INSTITUTIONS
    if (people === "10+" && duration === "12m") {
      return {
        name: "University & Institutions",
        price: "Contact us",
        note: "Full access to all courses & internships",
      };
    }

    // EVERYTHING ELSE
    return null;
  }, [goal, people, duration]);

  return (
      <main>
        <div className="hidden w-full text-sm py-10 h-full md:flex flex-row gap-5 px-10  items-start justify-center  pb-10">
          {/*desktop*/}
          <div className="w-full flex flex-col gap-3 justify-between px-10">
            <div className="flex flex-col w-full">
              <label className="font-medium">What do you want to do? </label>
              <select value={goal} onChange={(e) => setGoal(e.target.value as Goal)} className="w-full border rounded-md p-3">
                <option value="learn">Just learn bioinformatics</option>
                <option value="project">Complete a real-world project</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium"> Who is this for? </label>
              <select
                value={people}
                onChange={(e) => setPeople(e.target.value as People)}
                className="w-full border rounded-md p-3"
              >
                <option value="1">Just me</option>
                <option value="3">3 of us</option>
                <option value="5-10">5–10 of us</option>
                <option value="10+">More than 10 of us</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium"> Duration </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value as Duration)}
                className="w-full border rounded-md p-3"
              >
                <option value="1m">1 month</option>
                <option value="12m">12 months</option>
                <option value="free">Free</option>
              </select>
            </div>
          </div>

          <div className="border rounded-md p-5 h-fit w-full border-hb-green-dark flex flex-col gap-2">
              {result ? (
              <>
                  <h2 className="text-lg font-semibold">
                  {result.name}
                  </h2>
                  <p className="text-3xl font-bold mt-4">
                  {result.price}
                  </p>
                  {result.note && (
                  <p className="text-sm text-gray-600 mt-2">
                      {result.note}
                  </p>
                  )}

                  <Link href={'#'}> <HbButtons text="Continue" type="primary" /></Link>
              </>
              ) : (
              <>
                  <h2 className="text-xl font-semibold">
                  No offering
                  </h2>
                  <p className="text-gray-600 mt-2">
                  This combination is not currently supported.
                  </p>
              </>
              )}
          </div>

          
        </div>
  

  {/**Mobile */}
        <div className="flex flex-col w-full md:hidden gap-5 p-5 text-sm rounded-sm">
            <div className="w-full flex flex-col gap-3 justify-start ">
            <div className="flex flex-col w-full">
              <label className="font-medium">Where do you want to start? </label>
              <select value={goal} onChange={(e) => setGoal(e.target.value as Goal)} className="w-full border rounded-md p-3">
                <option value="learn">Just learn bioinformatics</option>
                <option value="project">Complete a real-world project</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium"> Who is this for? </label>
              <select
                value={people}
                onChange={(e) => setPeople(e.target.value as People)}
                className="w-full border rounded-md p-3"
              >
                <option value="1">Just me</option>
                <option value="3">3 of us</option>
                <option value="5-10">5–10 of us</option>
                <option value="10+">More than 10 of us</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium"> Duration </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value as Duration)}
                className="w-full border rounded-md p-3"
              >
                <option value="1m">1 month</option>
                <option value="12m">12 months</option>
                <option value="free">Free</option>
              </select>
            </div>
          </div>

          <div className="border rounded-md p-5 h-fit w-full border-hb-green-dark flex flex-col gap-2">
              {result ? (
              <>
                  <h2 className="text-lg font-semibold">
                  {result.name}
                  </h2>
                  <p className="text-3xl font-bold mt-4">
                  {result.price}
                  </p>
                  {result.note && (
                  <p className="text-sm text-gray-600 mt-2">
                      {result.note}
                  </p>
                  )}

                  <Link href={'#'}> <HbButtons text="Continue" type="primary" /></Link>
              </>
              ) : (
              <>
                  <h2 className="text-xl font-semibold">
                  No offering
                  </h2>
                  <p className="text-gray-600 mt-2">
                  This combination is not currently supported.
                  </p>
              </>
              )}
          </div>

        </div>
      </main>
      
    );
}
