"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/constants";

type ProgramType = "course" | "pathway" | "internship";

type HeroSectionProps = {
  id: string;
  internshipStatus?: string;
  programType?: ProgramType;
  backgroundImage?: string | null;
  badgeText?: string | null;
  kicker?: string | null;
  headline?: string | null;
  subcopy?: string | null;
  ctaText?: string | null;
  learners?: string | null;
  countries?: string | null;
  duration?: string | null;
  startDate?: string | null;
  projectTitle?: string | null;
  projectSubtitle?: string | null;
  isFree?: boolean;
};

const iconBase = "/svgs";

export default function HeroSection({
  id,
  programType = "internship",
  backgroundImage,
  badgeText,
  kicker,
  headline,
  subcopy,
  ctaText,
  learners,
  countries,
  duration,
  startDate,
  projectTitle,
  projectSubtitle,
  isFree = false,
}: HeroSectionProps) {
  const router = useRouter();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [enrollmentError, setEnrollmentError] = useState("");
  const checkoutId = id || "0";
  const heroBackground = backgroundImage || "";
  const safeHeadline = headline || "Genome Data Scientist";
  const safeKicker = kicker || "Become a";
  const safeSubcopy =
    subcopy ||
    "Join over 800 learners who are building scalable bioinformatics pipelines across pharma, academia and biotech.";
  const safeBadgeText = badgeText || "High Job Demand";
  const safeCtaText = ctaText || "Enroll Now";
  const safeStartDate = String(startDate || "").trim();
  const scrollToCareerOutlook = () => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-career-outlook]"));
    const visibleSection = sections.find((section) => section.offsetParent !== null) || sections[0];

    if (visibleSection) {
      visibleSection.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", "#career-outlook");
    }
  };

  const handleFreeEnrollment = async () => {
    if (isEnrolling) return;
    setIsEnrolling(true);
    try {
      const response = await api.post("/api/free-enroll/", {
        type: programType,
        id: checkoutId,
      });
      if (response.status === 200) {
        window.alert(response.data?.detail || "You have been enrolled successfully.");
        router.push(response.data?.redirect_path || "/dashboard");
        return;
      }
    } catch (error: any) {
      const status = error?.response?.status;
      const data = error?.response?.data;
      const detail = String(data?.detail || data?.error || "");
      const authFailed =
        status === 401 ||
        data?.login_required ||
        detail.toLowerCase().includes("token") ||
        detail.toLowerCase().includes("credentials");

      if (authFailed) {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setEnrollmentError("");
        setShowLoginModal(true);
        return;
      }
      setEnrollmentError(data?.error || data?.detail || "We could not enroll you right now. Please try again.");
    } finally {
      setIsEnrolling(false);
    }
  };

  const goToAuth = (path: "/login" | "/register") => {
    setShowLoginModal(false);
    router.push(path);
  };

  return (
    <section
      className="min-h-[50svh] w-full max-w-full overflow-hidden bg-[#e4f5fe] bg-cover bg-center p-6 dark:bg-[#101a15] sm:p-8 md:p-12"
      style={heroBackground ? { backgroundImage: `url(${heroBackground})` } : undefined}
    >
      <div className="mx-auto flex min-h-[50svh] w-full max-w-5xl flex-col justify-evenly gap-6 px-0 py-6 sm:px-6 md:px-10">
        <button
          type="button"
          onClick={scrollToCareerOutlook}
          className="inline-flex h-9 w-fit max-w-full items-center gap-3 border-2 border-hb-green bg-white/30 px-3 pr-5 transition hover:bg-white/45 focus:outline-none focus:ring-2 focus:ring-hb-green focus:ring-offset-2 dark:bg-black/25 dark:hover:bg-black/35 sm:gap-5 sm:pr-8"
        >
          <img src={`${iconBase}/LinkedIn-48.png`} alt="" className="h-5 w-5 object-contain" />
          <span className="text-base font-medium text-white">{safeBadgeText}</span>
        </button>

        <div className="flex max-w-[22rem] flex-col gap-5 md:max-w-[28rem]">
          <div>
            <p className="text-base font-medium leading-tight text-white">{safeKicker}</p>
            <h1 className="mt-1 max-w-full break-words text-[38px] font-black leading-[0.98] tracking-normal text-white sm:text-[44px] md:text-[48px]">
              {safeHeadline}
            </h1>
          </div>

          <p className="max-w-full break-words text-base font-medium leading-[1.38] text-white">{safeSubcopy}</p>

          {safeStartDate ? (
            <p className="text-base font-bold leading-tight text-white">Starts {safeStartDate}</p>
          ) : null}

          {isFree ? (
            <button
              type="button"
              onClick={handleFreeEnrollment}
              disabled={isEnrolling}
              className="inline-flex h-9 w-fit min-w-35 items-center justify-center rounded-sm bg-hb-green px-6 text-base font-bold text-white transition hover:bg-hb-green-dark disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isEnrolling ? "Enrolling..." : safeCtaText}
            </button>
          ) : (
            <Link
              href={{ pathname: "/dashboard/checkout", query: { prog: programType, id: checkoutId } }}
              className="inline-flex h-9 w-fit min-w-35 items-center justify-center rounded-sm bg-hb-green px-6 text-base font-bold text-white transition hover:bg-hb-green-dark"
            >
              {safeCtaText}
            </Link>
          )}
          {enrollmentError ? (
            <p className="max-w-sm rounded-sm bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
              {enrollmentError}
            </p>
          ) : null}
        </div>

        {/* <div className="grid max-w-[640px] grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-4 md:gap-x-10">
          <HeroMetric icon={`${iconBase}/Multiple_Man_Woman_User.png`} value={learners || "4000+"} label="Learners" />
          <HeroMetric icon={`${iconBase}/Globe-48.png`} value={countries || "50+"} label="Countries" />
          <HeroMetric icon={`${iconBase}/Source-Code-48.png`} value={duration || "12"} label="Weeks" />
          <HeroMetric
            icon={`${iconBase}/Certification-48.png`}
            value={projectTitle || "Real Projects"}
            label={projectSubtitle || "Build Portfolio"}
          />
        </div> */}
      </div>
      {showLoginModal ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="free-enrollment-login-title"
            className="w-full max-w-md rounded-sm bg-white p-6 shadow-xl dark:bg-[#101a15]"
          >
            <h2 id="free-enrollment-login-title" className="text-2xl font-bold text-gray-900 dark:text-white">
              Account Required
            </h2>
            <p className="mt-3 text-base leading-7 text-gray-700 dark:text-gray-200">
              Kindly login/create an account to access this {programType} for free.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => goToAuth("/login")}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-sm bg-hb-green px-5 text-base font-bold text-white transition hover:bg-hb-green-dark"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => goToAuth("/register")}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-sm border border-hb-green px-5 text-base font-bold text-hb-green transition hover:bg-hb-lightgreen"
              >
                Create Account
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowLoginModal(false)}
              className="mt-4 w-full text-sm font-semibold text-gray-500 underline underline-offset-2 dark:text-gray-300"
            >
              Not now
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function HeroMetric({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <img src={icon} alt="" className="h-10 w-10 shrink-0 object-contain md:h-11 md:w-11" />
      <div className="min-w-0 leading-none">
        <p className="text-base font-black leading-tight text-white">{value}</p>
        <p className="text-base font-medium leading-tight text-white">{label}</p>
      </div>
    </div>
  );
}
