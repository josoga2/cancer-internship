"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api";
import publicApi from "@/publicApi";
import {
  trackApplicationStart,
  trackCheckoutError,
  trackRegistrationStart,
} from "@/lib/analytics";

type ProgramType = "course" | "pathway" | "internship";

type FreeProgramEnrollmentProps = {
  programType: ProgramType;
  programId: string | number;
  programTitle?: string;
  label?: string;
  className?: string;
  offerMentorship?: boolean;
  mentorshipPriceLabel?: string;
  mentorshipCheckoutHref?: string;
};

export default function FreeProgramEnrollment({
  programType,
  programId,
  programTitle,
  label = "Enroll For Free",
  className = "inline-flex h-11 w-full items-center justify-center rounded-sm bg-hb-green px-5 text-base font-bold text-white transition hover:bg-hb-green-dark disabled:cursor-not-allowed disabled:opacity-70",
  offerMentorship = false,
  mentorshipPriceLabel,
  mentorshipCheckoutHref,
}: FreeProgramEnrollmentProps) {
  const router = useRouter();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [showMentorshipModal, setShowMentorshipModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const [guestEmailError, setGuestEmailError] = useState("");
  const [guestSuccess, setGuestSuccess] = useState("");
  const [guestSetupRequired, setGuestSetupRequired] = useState(false);
  const [enrollmentError, setEnrollmentError] = useState("");

  const enroll = async (email = "") => {
    if (isEnrolling) return;

    setIsEnrolling(true);
    setEnrollmentError("");
    trackApplicationStart(programTitle || `${programType}_${programId}`);
    trackRegistrationStart(`${programType}_free_enrollment`);

    try {
      const payload = {
        type: programType,
        id: programId,
        ...(email ? { email: email.trim().toLowerCase() } : {}),
      };
      const response = email
        ? await publicApi.post("/api/free-enroll/", payload)
        : await api.post("/api/free-enroll/", payload);

      if (response.status === 200 && response.data?.enrolled) {
        if (response.data?.guest_enrollment) {
          setGuestSetupRequired(Boolean(response.data?.setup_required));
          setGuestSuccess(
            response.data?.detail ||
              "Enrollment complete. Check your email for the next step."
          );
          setShowEmailModal(true);
          return;
        }
        window.alert(
          response.data?.detail || `You have been enrolled in this ${programType}.`
        );
        router.push(response.data?.redirect_path || "/dashboard");
      }
    } catch (error: any) {
      const status = error?.response?.status;
      const data = error?.response?.data;
      const detail = String(data?.detail || data?.error || "");
      const requiresEmail =
        data?.email_required ||
        status === 401 ||
        detail.toLowerCase().includes("token") ||
        detail.toLowerCase().includes("credentials");

      if (requiresEmail) {
        setGuestEmailError("");
        setGuestSuccess("");
        setShowEmailModal(true);
      } else {
        setEnrollmentError(
          data?.error ||
            data?.detail ||
            `We could not enroll you in this ${programType}. Please try again.`
        );
        trackCheckoutError("free_enrollment_failed");
      }
    } finally {
      setIsEnrolling(false);
    }
  };

  const handlePrimaryClick = () => {
    if (offerMentorship && mentorshipCheckoutHref) {
      setShowMentorshipModal(true);
      return;
    }
    void enroll();
  };

  const continueWithoutMentorship = () => {
    setShowMentorshipModal(false);
    void enroll();
  };

  const continueWithMentorship = () => {
    if (!mentorshipCheckoutHref) return;
    setShowMentorshipModal(false);
    router.push(mentorshipCheckoutHref);
  };

  const submitGuestEmail = () => {
    const email = guestEmail.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setGuestEmailError("Enter a valid email address.");
      return;
    }
    setGuestEmailError("");
    void enroll(email);
  };

  return (
    <>
      <button
        type="button"
        onClick={handlePrimaryClick}
        disabled={isEnrolling}
        className={className}
      >
        {isEnrolling ? "Enrolling..." : label}
      </button>

      {enrollmentError ? (
        <p className="mt-3 rounded-sm bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-200">
          {enrollmentError}
        </p>
      ) : null}

      {showMentorshipModal ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 px-4 py-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="free-program-mentorship-title"
            className="w-full max-w-md rounded-sm bg-white p-6 shadow-xl dark:bg-[#101a15]"
          >
            <h2
              id="free-program-mentorship-title"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              Would you like mentorship?
            </h2>
            <p className="mt-3 text-base leading-7 text-gray-700 dark:text-gray-200">
              The program is free. You can enroll now without mentorship, or
              add paid mentorship support at checkout
              {mentorshipPriceLabel ? ` for ${mentorshipPriceLabel}` : ""}.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={continueWithMentorship}
                className="inline-flex h-11 w-full items-center justify-center rounded-sm bg-hb-green px-5 text-base font-bold text-white transition hover:bg-hb-green-dark"
              >
                Add mentorship
              </button>
              <button
                type="button"
                onClick={continueWithoutMentorship}
                className="inline-flex h-11 w-full items-center justify-center rounded-sm border border-hb-green px-5 text-base font-bold text-hb-green transition hover:bg-hb-lightgreen dark:hover:bg-hb-green/10"
              >
                Continue without mentorship
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowMentorshipModal(false)}
              className="mt-4 w-full text-sm font-semibold text-gray-500 underline underline-offset-2 dark:text-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {showEmailModal ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="free-enrollment-email-title"
            className="w-full max-w-md rounded-sm bg-white p-6 shadow-xl dark:bg-[#101a15]"
          >
            <h2
              id="free-enrollment-email-title"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              {guestSuccess ? "Enrollment complete" : "Enter your email"}
            </h2>
            {guestSuccess ? (
              <p className="mt-3 text-base leading-7 text-gray-700 dark:text-gray-200">
                {guestSuccess}
              </p>
            ) : (
              <>
                <p className="mt-3 text-base leading-7 text-gray-700 dark:text-gray-200">
                  We will use this email to add the free {programType} to your
                  profile and send your access details.
                </p>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(event) => setGuestEmail(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") submitGuestEmail();
                  }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="mt-5 h-11 w-full rounded-sm border border-gray-300 bg-white px-3 text-base text-gray-900 outline-none focus:border-hb-green dark:border-gray-600 dark:bg-[#0f172a] dark:text-white"
                />
                {guestEmailError ? (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-300">
                    {guestEmailError}
                  </p>
                ) : null}
              </>
            )}
            <div className="mt-6 flex flex-col gap-3">
              {!guestSuccess ? (
              <button
                type="button"
                onClick={submitGuestEmail}
                disabled={isEnrolling}
                className="inline-flex h-11 w-full items-center justify-center rounded-sm bg-hb-green px-5 text-base font-bold text-white transition hover:bg-hb-green-dark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isEnrolling ? "Enrolling..." : "Enroll for free"}
              </button>
              ) : guestSetupRequired ? (
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="inline-flex h-11 w-full items-center justify-center rounded-sm bg-hb-green px-5 text-base font-bold text-white transition hover:bg-hb-green-dark"
                >
                  Check my email
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="inline-flex h-11 w-full items-center justify-center rounded-sm bg-hb-green px-5 text-base font-bold text-white transition hover:bg-hb-green-dark"
                >
                  Sign in to continue
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowEmailModal(false)}
              className="mt-4 w-full text-sm font-semibold text-gray-500 underline underline-offset-2 dark:text-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
