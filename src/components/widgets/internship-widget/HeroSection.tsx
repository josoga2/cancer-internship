"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FreeProgramEnrollment from "@/components/enroll/free-program-enrollment";
import { getCountryQueryParam } from "@/lib/country";
import { trackApplicationStart, trackRegistrationStart } from "@/lib/analytics";

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
  const [countryParam, setCountryParam] = useState("");
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

  useEffect(() => {
    setCountryParam(getCountryQueryParam());
  }, []);

  const scrollToCareerOutlook = () => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-career-outlook]"));
    const visibleSection = sections.find((section) => section.offsetParent !== null) || sections[0];

    if (visibleSection) {
      visibleSection.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", "#career-outlook");
    }
  };

  const mentorshipCheckoutQuery = new URLSearchParams({
    prog: programType,
    id: String(checkoutId),
    mentorship: "1",
    ...(countryParam ? { country: countryParam } : {}),
  }).toString();

  return (
    <section
      className="relative left-1/2 min-h-[50svh] w-screen max-w-none -translate-x-1/2 overflow-hidden bg-[#e4f5fe] bg-cover bg-center p-6 dark:bg-[#101a15] sm:p-8 md:p-12"
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
            <FreeProgramEnrollment
              programType={programType}
              programId={checkoutId}
              programTitle={safeHeadline}
              label={safeCtaText}
              offerMentorship
              mentorshipCheckoutHref={`/dashboard/checkout?${mentorshipCheckoutQuery}`}
              className="inline-flex h-9 w-fit min-w-35 items-center justify-center rounded-sm bg-hb-green px-6 text-base font-bold text-white transition hover:bg-hb-green-dark disabled:cursor-not-allowed disabled:opacity-70"
            />
          ) : (
            <Link
              href={{
                pathname: "/dashboard/checkout",
                query: { prog: programType, id: checkoutId, ...(countryParam ? { country: countryParam } : {}) },
              }}
              onClick={() => {
                trackApplicationStart(safeHeadline);
                trackRegistrationStart(`${programType}_checkout_cta`);
              }}
              className="inline-flex h-9 w-fit min-w-35 items-center justify-center rounded-sm bg-hb-green px-6 text-base font-bold text-white transition hover:bg-hb-green-dark"
            >
              {safeCtaText}
            </Link>
          )}
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
