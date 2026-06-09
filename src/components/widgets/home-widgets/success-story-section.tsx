"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { X } from "lucide-react";
import publicApi from "@/publicApi";
import ub_euro from "@/../public/ub_euro.png";

const TESTIMONIAL_PLAYLIST_URL =
  "https://youtube.com/playlist?list=PLSp3zewvz-W-VT5iTcoi_2M8QtNxTHZ0l&si=FATZiM0SCt834qvt";

export default function SuccessStorySection() {
  const [open, setOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadError, setLeadError] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLeadError("");
    setLeadSubmitting(true);

    try {
      await publicApi.post("/api/brochure-leads/", {
        name: leadName,
        email: leadEmail,
        marketing_consent: false,
        program_type: "internship",
        program_id: 0,
        brochure_link: TESTIMONIAL_PLAYLIST_URL,
        lead_source: "homepage_success_story_playlist",
        source_page: typeof window !== "undefined" ? window.location.href : "",
      });

      setOpen(false);
      setLeadName("");
      setLeadEmail("");

      if (typeof window !== "undefined") {
        window.open(TESTIMONIAL_PLAYLIST_URL, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      setLeadError("We could not save your details. Please check your name and email, then try again.");
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <section className="w-full overflow-x-clip py-12 md:py-16">
      <div className="mx-auto w-full max-w-5xl px-0 md:px-0">
        <h2 className="px-5 text-start text-4xl font-medium leading-tight tracking-normal text-black dark:text-white">
          <span className="text-hb-green underline decoration-hb-green decoration-2 underline-offset-3">
            Success
          </span>{" "}
          that speaks for itself
        </h2>

        <div className="relative left-1/2 mt-20 w-screen max-w-none -translate-x-1/2 bg-[linear-gradient(100deg,#d7edf5_0%,#e9f7ee_50%,#f7f2f5_100%)] dark:bg-[linear-gradient(100deg,#0f172a_0%,#11251d_52%,#171827_100%)]">
          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 px-5 py-8 md:min-h-[340px] md:grid-cols-[minmax(0,1fr)_420px] md:items-center md:gap-16 md:px-0 md:py-0">
            <div className="min-w-0 bg-transparent md:max-w-[560px] md:py-8 md:pl-8">
              <div className="flex items-center gap-5">
                <img src="/hb_logo.png" alt="HackBio" className="h-10 w-10 object-contain" />
                <span className="text-xl font-medium text-gray-900 dark:text-slate-100">→</span>
                <img src={ub_euro.src} alt="University of Burgundy" className="h-12 object-contain" />
              </div>

              <img
                src="/titilope.png"
                alt="HackBio learner success story"
                className="mt-5 h-[100px] w-[100px] rounded-full border-2 border-yellow-400 object-cover object-center md:hidden"
              />

              <a href="/testimonial" className="mt-6 inline-flex items-center text-xl font-medium text-gray-900 hover:text-hb-green dark:text-white dark:hover:text-hb-green">
                Featured Story
              </a>

              <p className="mt-6 max-w-[34rem] text-base leading-7 text-gray-900 dark:text-slate-200 md:text-base">
                Learn how Titilope transformed her career in bioinformatics and moved from Akure Nigeria to develop Innovative Drugs at University of Burgundy, France after her Cancer Bioinformatics internship program at HackBio.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex h-10 w-fit items-center justify-center rounded-sm bg-hb-green px-6 text-base font-medium text-white transition hover:bg-hb-green-dark focus:outline-none focus:ring-2 focus:ring-hb-green focus:ring-offset-2"
                >
                  Watch her session on YouTube
                </button>

                <span className="text-base text-gray-900 dark:text-slate-100">or</span>

                <a
                  href="https://forms.gle/XVeyCtzFLKmDPmbF7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-fit items-center justify-center rounded-sm bg-hb-green px-6 text-base font-medium text-white transition hover:bg-hb-green-dark focus:outline-none focus:ring-2 focus:ring-hb-green focus:ring-offset-2"
                >
                  Join Future Events
                </a>
              </div>
            </div>

            <div className="relative z-10 mx-auto hidden h-[500px] w-[420px] overflow-hidden rounded-[18px] border-2 border-yellow-400 bg-white shadow-[0_18px_45px_rgba(18,39,32,0.12)] dark:bg-slate-900 dark:shadow-black/40 md:-my-20 md:flex">
              <img
                src="/titilope.png"
                alt="HackBio learner success story"
                className="h-full min-h-[300px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 left-0 right-0 z-[100] grid w-screen max-w-[100vw] place-items-center overflow-x-hidden overflow-y-auto bg-black/50 p-5">
          <div className="box-border w-full max-w-[calc(100vw-2.5rem)] justify-self-center rounded-sm bg-white p-6 shadow-xl dark:bg-[#111827] md:max-w-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-medium text-[#1f1f24] dark:text-white">Watch Titilope&apos;s story</h3>
                <p className="mt-1 text-base text-neutral-600 dark:text-slate-300">
                  Tell us where to send more helpful career updates.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-neutral-300 dark:border-slate-600 dark:text-white"
                aria-label="Close testimonial form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={submitLead} className="mt-6 flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-base font-medium text-[#1f1f24] dark:text-white">
                Name
                <input
                  value={leadName}
                  onChange={(event) => setLeadName(event.target.value)}
                  required
                  className="h-11 min-w-0 rounded-sm border border-neutral-400 px-3 text-base font-normal outline-none focus:border-hb-green dark:border-slate-600 dark:bg-[#0f172a] dark:text-white"
                />
              </label>

              <label className="flex flex-col gap-2 text-base font-medium text-[#1f1f24] dark:text-white">
                Email
                <input
                  type="email"
                  value={leadEmail}
                  onChange={(event) => setLeadEmail(event.target.value)}
                  required
                  className="h-11 min-w-0 rounded-sm border border-neutral-400 px-3 text-base font-normal outline-none focus:border-hb-green dark:border-slate-600 dark:bg-[#0f172a] dark:text-white"
                />
              </label>

              {leadError ? <p className="text-sm font-medium text-red-600">{leadError}</p> : null}

              <button
                type="submit"
                disabled={leadSubmitting}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-sm bg-hb-green px-6 text-base font-medium text-white transition hover:bg-hb-green-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {leadSubmitting ? "Saving..." : "Submit and Watch"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}
