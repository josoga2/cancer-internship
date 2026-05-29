"use client";

import { X } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import publicApi from "@/publicApi";

type ProgramLeadCaptureProps = {
  programType: "course" | "pathway" | "internship";
  programId: string | number;
  redirectUrl?: string | null;
  leadSource: "brochure" | "career_guide" | string;
  modalTitle: string;
  modalDescription?: string;
  submitLabel?: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

export default function ProgramLeadCapture({
  programType,
  programId,
  redirectUrl,
  leadSource,
  modalTitle,
  modalDescription = "Tell us where to send helpful course updates.",
  submitLabel = "Submit and Download",
  className = "",
  ariaLabel,
  children,
}: ProgramLeadCaptureProps) {
  const [open, setOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
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
        marketing_consent: marketingConsent,
        program_type: programType,
        program_id: Number(programId),
        brochure_link: redirectUrl,
        lead_source: leadSource,
        source_page: typeof window !== "undefined" ? window.location.href : "",
      });

      setOpen(false);
      setLeadName("");
      setLeadEmail("");
      setMarketingConsent(false);

      if (redirectUrl && typeof window !== "undefined") {
        window.open(redirectUrl, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      setLeadError("We could not save your details. Please check your name and email, then try again.");
    } finally {
      setLeadSubmitting(false);
    }
  };

  if (!redirectUrl) {
    return null;
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className} aria-label={ariaLabel}>
        {children}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-md rounded-sm bg-white p-6 shadow-xl dark:bg-[#111827]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-[#1f1f24] dark:text-white">{modalTitle}</h3>
                <p className="mt-1 text-base text-neutral-600 dark:text-slate-300">{modalDescription}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-neutral-300 dark:border-slate-600 dark:text-white"
                aria-label="Close lead form"
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

              <label className="flex items-start gap-3 text-sm leading-5 text-[#1f1f24] dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(event) => setMarketingConsent(event.target.checked)}
                  className="mt-1 h-4 w-4"
                />
                <span>I agree to receive emails and marketing materials about HackBio programs.</span>
              </label>

              {leadError ? <p className="text-sm font-medium text-red-600">{leadError}</p> : null}

              <button
                type="submit"
                disabled={leadSubmitting}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-sm bg-hb-green px-6 text-base font-bold text-white transition hover:bg-hb-green-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {leadSubmitting ? "Saving..." : submitLabel}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
