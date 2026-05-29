"use client";

import ProgramLeadCapture from "@/components/widgets/program-lead-capture";

type CareerOutlookProps = {
  programTitle?: string | null;
  description?: string | null;
  lowSalary?: number | string | null;
  medianSalary?: number | string | null;
  highSalary?: number | string | null;
  guideLink?: string | null;
  programType: "course" | "pathway" | "internship";
  programId: string | number;
};

const outlookGradient =
  "radial-gradient(120% 120% at 0% 2.69%, rgba(0, 118, 178, 0.5) 0%, rgba(147, 215, 176, 0.5) 48%, #4E7AB5 100%)";

export default function CareerOutlook({
  programTitle,
  description,
  lowSalary,
  medianSalary,
  highSalary,
  guideLink,
  programType,
  programId,
}: CareerOutlookProps) {
  const title = programTitle || "this program";
  const hasOutlook = Boolean(description || lowSalary || medianSalary || highSalary || guideLink);

  if (!hasOutlook) {
    return null;
  }

  return (
    <section data-career-outlook className="mx-auto w-full max-w-5xl px-6 py-10 md:px-10">
      <div className="border-t border-dashed border-neutral-500 pt-8 dark:border-slate-500">
        <h2 className="break-words text-3xl font-bold text-[#1f1f24] dark:text-white">Why {title}?</h2>

        <div className="mt-7 grid min-w-0 grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.55fr)]">
          <div
            className="career-outlook-gradient min-w-0 rounded-[5px] p-5 md:p-10"
            style={{ backgroundImage: outlookGradient }}
          >
            <div className="rounded-[5px] border border-hb-green/50 bg-white px-5 py-5 dark:bg-[#111827] md:px-10 md:py-7">
              {description ? (
                <p className="break-words text-base leading-8 text-[#1f1f24] dark:text-slate-100 md:text-[18px] md:leading-7">{description}</p>
              ) : null}

              <div className={description ? "mt-7" : ""}>
                <p className="text-base font-bold text-[#1f1f24] dark:text-white">Current Salary Range*</p>
                <div className="mt-3 grid grid-cols-3 text-center text-base text-[#1f1f24] dark:text-slate-100">
                  <span>Low</span>
                  <span>Median</span>
                  <span>High</span>
                </div>
                <div className="mt-0.5 h-2 rounded-full bg-[linear-gradient(90deg,#4E7AB5_0%,#F4D03F_50%,#C9302C_100%)]" />
                <div className="mt-4 grid grid-cols-3 gap-2 text-sm font-bold text-[#1f1f24] dark:text-white sm:text-base md:text-xl">
                  <span>{formatSalary(lowSalary)}</span>
                  <span className="text-center">{formatSalary(medianSalary)}</span>
                  <span className="text-right">{formatSalary(highSalary)}</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="career-outlook-gradient min-w-0 flex flex-col items-center justify-center rounded-[5px] p-5 md:p-10"
            style={{ backgroundImage: outlookGradient }}
          >
            <div className="relative min-h-[250px] w-full overflow-hidden rounded-[5px] border border-hb-green/50 bg-white p-6 dark:bg-[#111827] md:min-h-[270px] md:p-7">
              <div className="relative z-10 max-w-[250px]">
                <p className="break-words text-lg font-bold leading-7 text-[#1f1f24] dark:text-white">
                  Want to learn more about{" "}
                  <span className="text-[#2f6f9f] underline decoration-2 underline-offset-2">{title}</span> careers?
                </p>

                <ProgramLeadCapture
                  programType={programType}
                  programId={programId}
                  redirectUrl={guideLink}
                  leadSource="career_guide"
                  modalTitle="Get your free career guide"
                  modalDescription="Tell us where to send helpful career and program updates."
                  submitLabel="Submit and Get Guide"
                  className="mt-14 inline-flex h-12 items-center rounded-sm bg-hb-green px-4 text-base font-bold text-white transition hover:bg-hb-green-dark"
                >
                  <span>
                    Get your <span className="text-yellow-300 underline decoration-2 underline-offset-2">Free Guide</span>
                  </span>
                </ProgramLeadCapture>
              </div>

              <div className="pointer-events-none absolute -bottom-8 -right-10 hidden w-44 rotate-[24deg] rounded-[5px] border border-hb-green bg-white shadow-lg dark:bg-[#0f172a] sm:block">
                <div className="border-b border-hb-green/40 p-3 text-right text-[8px] font-bold text-[#1f1f24] dark:text-white">HackBio</div>
                <div className="p-4">
                  <p className="text-sm font-bold leading-5 text-[#1f1f24] dark:text-white">{title}</p>
                  <p className="mt-1 text-xs text-[#2f6f9f]">Career Guide</p>
                </div>
                <div className="h-24 bg-[linear-gradient(135deg,#91c9ff_0%,#8bd8b1_50%,#4E7AB5_100%)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .career-outlook-gradient {
          background-size: 160% 160%;
          animation: careerGradientDrift 12s ease-in-out infinite alternate;
        }

        @keyframes careerGradientDrift {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 65%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .career-outlook-gradient {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

function formatSalary(value?: number | string | null) {
  if (value === null || value === undefined || value === "") {
    return "TBD";
  }

  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return String(value);
  }

  return `$${numericValue.toLocaleString("en-US")}`;
}
