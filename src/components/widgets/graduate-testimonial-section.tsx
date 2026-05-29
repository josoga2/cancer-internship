"use client";

import { Play, X } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import publicApi from "@/publicApi";

const TESTIMONIAL_PLAYLIST_URL =
  "https://youtube.com/playlist?list=PLSp3zewvz-W-VT5iTcoi_2M8QtNxTHZ0l&si=FATZiM0SCt834qvt";

type GraduateTestimonialSectionProps = {
  programType: "course" | "pathway" | "internship";
  programId: string | number;
  redirectUrl?: string;
};

export default function GraduateTestimonialSection({
  programType,
  programId,
  redirectUrl = TESTIMONIAL_PLAYLIST_URL,
}: GraduateTestimonialSectionProps) {
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
        program_type: programType,
        program_id: Number(programId),
        brochure_link: redirectUrl,
        lead_source: "testimonial_playlist",
        source_page: typeof window !== "undefined" ? window.location.href : "",
      });

      setOpen(false);
      setLeadName("");
      setLeadEmail("");

      if (typeof window !== "undefined") {
        window.open(redirectUrl, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      setLeadError("We could not save your details. Please check your name and email, then try again.");
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12 md:px-10 md:py-16">
      <h2 className="text-center text-3xl font-bold text-[#1f1f24] dark:text-white">
        Over 100+ organizations have hired our graduates
      </h2>

      <div className="mt-9 grid grid-cols-1 items-center gap-8 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-10">
        <div className="mx-auto w-full max-w-[420px]">
          <img
            src="/Testimonials_SM.png"
            alt="Organizations that have hired HackBio graduates"
            className="w-full object-contain"
          />
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setOpen(true);
            }
          }}
          className="grid cursor-pointer grid-cols-1 gap-6 rounded-[5px] border-2 border-[#0089c8] bg-[#dff4ff] p-5 transition hover:bg-[#d6effb] focus:outline-none focus:ring-2 focus:ring-[#0089c8] focus:ring-offset-2 dark:bg-[#102738] dark:hover:bg-[#143149] md:grid-cols-[minmax(0,1fr)_minmax(220px,0.95fr)] md:p-7"
          aria-label="Watch graduate testimonial playlist"
        >
          <div className="flex min-h-[150px] items-center justify-center rounded-[5px] border-2 border-[#0089c8] bg-[#333333]">
            <div className="flex h-14 w-20 items-center justify-center rounded-xl border-2 border-[#0089c8] bg-red-600 text-white">
              <Play className="ml-1 h-9 w-9 fill-white" />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-lg font-medium leading-8 text-[#1f1f24] dark:text-white">
              Listen to how some of them used their knowledge at HackBio to Transition their career
            </p>
            <a
              href="https://forms.gle/XVeyCtzFLKmDPmbF7"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="mt-5 inline-flex h-11 w-fit items-center justify-center rounded-sm bg-hb-green px-7 text-base font-bold text-white transition hover:bg-hb-green-dark"
            >
              Or Join an event
            </a>
          </div>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-md rounded-sm bg-white p-6 shadow-xl dark:bg-[#111827]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-[#1f1f24] dark:text-white">Watch graduate stories</h3>
                <p className="mt-1 text-base text-neutral-600 dark:text-slate-300">Tell us where to send more helpful career updates.</p>
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
              <label className="flex flex-col gap-2 text-base font-bold text-[#1f1f24] dark:text-white">
                Name
                <input
                  value={leadName}
                  onChange={(event) => setLeadName(event.target.value)}
                  required
                  className="h-11 rounded-sm border border-neutral-400 px-3 text-base font-normal outline-none focus:border-hb-green dark:border-slate-600 dark:bg-[#0f172a] dark:text-white"
                />
              </label>

              <label className="flex flex-col gap-2 text-base font-bold text-[#1f1f24] dark:text-white">
                Email
                <input
                  type="email"
                  value={leadEmail}
                  onChange={(event) => setLeadEmail(event.target.value)}
                  required
                  className="h-11 rounded-sm border border-neutral-400 px-3 text-base font-normal outline-none focus:border-hb-green dark:border-slate-600 dark:bg-[#0f172a] dark:text-white"
                />
              </label>

              {leadError ? <p className="text-sm font-medium text-red-600">{leadError}</p> : null}

              <button
                type="submit"
                disabled={leadSubmitting}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-sm bg-hb-green px-6 text-base font-bold text-white transition hover:bg-hb-green-dark disabled:cursor-not-allowed disabled:opacity-60"
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
