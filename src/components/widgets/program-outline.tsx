"use client";

import {
  BookOpen,
  ChevronDown,
  ClipboardCheck,
  Code2,
  Download,
  FileQuestion,
  FileText,
  ListChecks,
  MonitorPlay,
  PenLine,
  TerminalSquare,
  UserRoundCheck,
} from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProgramLeadCapture from "@/components/widgets/program-lead-capture";

export type ProgramOutlineChild = {
  id?: string | number;
  title?: string;
  description?: string | null;
  content_type?: string | null;
};

export type ProgramOutlineItem = {
  id?: string | number;
  label: string;
  title?: string;
  description?: string | null;
  children?: ProgramOutlineChild[];
};

type ProgramOutlineProps = {
  items: ProgramOutlineItem[];
  courseCount?: number;
  lessonCount?: number;
  projectCount?: number;
  mentorCount?: number;
  brochureLink?: string | null;
  brochureLabel?: string;
  childMode?: "modules" | "contents";
  descriptionTitle?: string;
  description?: string | null;
  programType: "course" | "pathway" | "internship";
  programId: string | number;
  programPrice?: number | null;
  allInPrice?: number;
  programPriceLabel?: string;
};

const contentIcons = {
  video: MonitorPlay,
  text: FileText,
  quiz: FileQuestion,
  mcq: ListChecks,
  codeTask: Code2,
  project: ClipboardCheck,
  jupyter: TerminalSquare,
  submit: PenLine,
  certificate: ClipboardCheck,
  feedback: PenLine,
};

function iconForContent(contentType?: string | null) {
  return contentIcons[contentType as keyof typeof contentIcons] || FileText;
}

export default function ProgramOutline({
  items,
  courseCount = 0,
  lessonCount = 0,
  projectCount = 0,
  mentorCount = 1,
  brochureLink,
  brochureLabel = "Download Course Brochure",
  childMode = "modules",
  descriptionTitle = "Course Description",
  description,
  programType,
  programId,
  programPrice = 0,
  allInPrice = 200,
  programPriceLabel = "This Program Alone",
}: ProgramOutlineProps) {
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"all-in" | "program">("all-in");
  const descriptionWords = useMemo(() => wordsFromText(description || ""), [description]);
  const shouldTruncate = descriptionWords.length > 50;
  const visibleDescription =
    shouldTruncate && !expandedDescription ? `${descriptionWords.slice(0, 50).join(" ")}...` : descriptionWords.join(" ");
  const selectedPrice = selectedPlan === "all-in" ? allInPrice : Number(programPrice || 0);
  const selectedLabel = selectedPlan === "all-in" ? "Go All-In" : programPriceLabel;

  if (!items.length) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-8 md:px-10">
      <div className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
        <h2 className="mb-6 break-words text-3xl font-bold text-[#1f1f24] dark:text-white">Program Outline</h2>

        <div className="mb-6 flex flex-wrap items-center gap-x-7 gap-y-3 text-base text-[#1f1f24] dark:text-slate-100 sm:gap-x-9">
          <ProgramMetric icon={<BookOpen className="h-5 w-5 text-hb-green" />} label={`${courseCount} ${courseCount === 1 ? "Course" : "Courses"}`} />
          <ProgramMetric icon={<TerminalSquare className="h-5 w-5 text-[#2f6f9f]" />} label={`${lessonCount} ${lessonCount === 1 ? "Lesson" : "Lessons"}`} />
          <ProgramMetric icon={<UserRoundCheck className="h-5 w-5 text-hb-green" />} label={`${mentorCount} Assigned Mentor`} />
          <ProgramMetric icon={<ClipboardCheck className="h-5 w-5 text-hb-green" />} label={`${projectCount} ${projectCount === 1 ? "Project" : "Projects"}`} />
        </div>

        <Accordion type="single" collapsible className="flex w-full flex-col gap-6">
          {items.map((item, index) => (
            <AccordionItem
              key={item.id || item.title || index}
              value={`${item.id || index}`}
              className="rounded-sm border border-hb-green/50 px-4 py-2 dark:border-hb-green/70 dark:bg-[#111827] sm:px-5"
            >
              <AccordionTrigger className="gap-4 text-left text-base hover:no-underline [&>svg]:hidden">
                <span className="grid w-full grid-cols-[72px_minmax(0,1fr)_20px] items-center gap-3 sm:grid-cols-[96px_minmax(0,1fr)_20px] sm:gap-4">
                  <span className="break-words font-medium text-[#1f1f24] dark:text-slate-100">{item.label}</span>
                  <span className="min-w-0 break-words font-bold text-[#1f1f24] dark:text-white">{item.title}</span>
                  <ChevronDown className="h-4 w-4 text-[#1f1f24] dark:text-white" />
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-2 text-base text-[#1f1f24] dark:text-slate-100">
                {item.children?.length ? (
                  <ul className="space-y-2">
                    {item.children.map((child) => {
                      const ContentIcon = iconForContent(child.content_type);

                      return (
                        <li key={child.id || child.title} className="flex items-start gap-2 leading-6">
                          {childMode === "contents" ? (
                            <ContentIcon className="mt-0.5 h-4 w-4 shrink-0 text-hb-green" />
                          ) : (
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hb-green" />
                          )}
                          <span className="min-w-0 break-words">{child.title}</span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-neutral-600 dark:text-slate-300">No items listed yet.</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            {brochureLink ? (
            <ProgramLeadCapture
              programType={programType}
              programId={programId}
              redirectUrl={brochureLink}
              leadSource="brochure"
              modalTitle="Download brochure"
              submitLabel="Submit and Download"
              className="inline-flex h-11 items-center gap-2 rounded-sm bg-hb-green px-6 text-base font-bold text-white transition hover:bg-hb-green-dark"
            >
              <Download className="h-5 w-5" />
              {brochureLabel}
            </ProgramLeadCapture>
          ) : null}
          <ProgramMetric icon={<ListChecks className="h-5 w-5 text-amber-700 dark:text-amber-400" />} label="0 Prerequisites" />
        </div>

        {visibleDescription ? (
          <div className="mt-16 max-w-2xl">
            <h3 className="mb-5 text-3xl font-bold text-[#1f1f24] dark:text-white">{descriptionTitle}</h3>
            <p className="text-base leading-8 text-[#2f2f35] dark:text-slate-200">{visibleDescription}</p>
            {shouldTruncate ? (
              <button
                type="button"
                onClick={() => setExpandedDescription((current) => !current)}
                className="mt-7 text-base font-medium text-sky-600 underline"
              >
                {expandedDescription ? "Read Less" : "Read More ..."}
              </button>
            ) : null}
          </div>
        ) : null}
        </div>

        <aside className="h-fit min-w-0 rounded-sm border border-hb-green/40 p-4 dark:border-hb-green/70 dark:bg-[#111827] lg:sticky lg:top-6">
        <div className="grid grid-cols-2 gap-3">
          <PriceChoice
            active={selectedPlan === "all-in"}
            label="Go All-In"
            price={allInPrice}
            onClick={() => setSelectedPlan("all-in")}
          />
          <PriceChoice
            active={selectedPlan === "program"}
            label={programPriceLabel}
            price={Number(programPrice || 0)}
            onClick={() => setSelectedPlan("program")}
          />
        </div>

        <div className="mt-8">
          {selectedPlan === "program" && programType === "internship" ? (
            <>
              <h3 className="text-2xl font-bold text-[#1f1f24] dark:text-white">Access this program alone</h3>
              <p className="mt-1 text-base leading-7 text-[#2f2f35] dark:text-slate-200">1 year access to your selected program.</p>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-[#1f1f24] dark:text-white">Go All-In</h3>
              <p className="mt-1 text-base leading-7 text-[#2f2f35] dark:text-slate-200">
                Get full access to all current and future courses, pathways, and practice tasks for preparing for your career interviews.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-7 text-base leading-7 text-[#2f2f35] dark:text-slate-200">
                <li>Everything included</li>
                <li>Mentorship meetings per program</li>
                <li>Access to practice tasks</li>
                <li>Best long term value</li>
              </ul>
            </>
          )}
        </div>

        {/* <div className="mt-8 rounded-sm border border-[#1f1f24] p-3">
          <p className="text-base font-bold text-[#1f1f24]">Where should we send your access link?</p>
          <input className="mt-3 h-11 w-full rounded-sm border border-neutral-400 px-3 text-base outline-none focus:border-hb-green" placeholder="Your Email" />
          <p className="mt-3 text-sm leading-5 text-[#1f1f24]">We will use this email for your receipt and account setup</p>
        </div> */}

        {/* <div className="mt-5 rounded-sm border border-[#1f1f24] p-4">
          <PaymentMethod icon={<Wallet className="h-5 w-5 text-[#0070ba]" />} label="PayPal" />
          <PaymentMethod icon={<CreditCard className="h-5 w-5 text-[#2f8bc9]" />} label="Card (Credit or Debit)" />
          <PaymentMethod icon={<CreditCard className="h-5 w-5 text-rose-500" />} label="Bank Transfer (NGN)" last />
        </div> */}

        <div className="mt-5 rounded-sm border-2 border-hb-green p-5 dark:bg-[#0f172a]">
          <p className="break-words text-base font-bold text-[#1f1f24] dark:text-white">Selected: {selectedLabel}</p>
          <p className="mt-4 break-words text-4xl font-black text-[#1f1f24] dark:text-white">Total: ${selectedPrice}</p>
          <Link
            href={{ pathname: "/dashboard/checkout", query: { prog: programType, id: programId } }}
            className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-sm bg-hb-green px-5 text-base font-bold text-white transition hover:bg-hb-green-dark"
          >
            Continue to checkout
          </Link>
        </div>
        </aside>
      </div>

    </section>
  );
}

function wordsFromText(text: string) {
  return text
    .replace(/[#*_>`~\[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
}

function PriceChoice({
  active,
  label,
  price,
  onClick,
}: {
  active: boolean;
  label: string;
  price: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-w-0 rounded-sm border p-2 text-left transition dark:bg-[#0f172a] ${active ? "border-2 border-hb-green" : "border-hb-green/40 dark:border-hb-green/60"}`}
    >
      <span className="block break-words text-sm font-bold text-[#1f1f24] dark:text-white">{label}</span>
      <span className="mt-4 block break-words text-2xl font-black text-[#1f1f24] dark:text-white">$ {price}</span>
    </button>
  );
}

function ProgramMetric({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2">
      {icon}
      <span className="min-w-0 break-words">{label}</span>
    </span>
  );
}
