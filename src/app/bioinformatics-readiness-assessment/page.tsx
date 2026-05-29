import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Nav/navbar";
import Footer from "@/components/Nav/footer";

const assessments = [
  {
    title: "Bioinformatics Readiness Assessment",
    href: "/bioinformatics-readiness-assessment/readiness",
    className: "bg-[#b8e8cc] dark:bg-[#17462c]",
    emphasis: true,
  },
  /* {
    title: "Bioinformatics Skill Gap Analysis",
    href: "/bioinformatics-readiness-assessment/skill-gap",
    className: "bg-[#fff0b8] dark:bg-[#53451c]",
  },*/
  {
    title: "Bioinformatics Career Roadmap Quiz",
    href: "/bioinformatics-readiness-assessment/career-roadmap",
    className: "bg-[#c3d3ea] dark:bg-[#1d314c]",
  }, 
  {
    title: "Bioinformatics Career Path Assessment",
    href: "/bioinformatics-readiness-assessment/career-path",
    className: "bg-[#fff0b8] dark:bg-[#53451c]",
  }
];

export default function BioinformaticsReadinessAssessmentPage() {
  return (
    <section className="min-h-screen bg-white text-[#1f1f24] dark:bg-background dark:text-white">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-6 pb-20 pt-28 md:px-10 md:pt-32">
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">Bioinformatics Readiness Assessment</h1>
        <p className="mt-5 text-xl text-[#1f1f24] dark:text-slate-200">A guided career intelligence system</p>

        <div className="mt-14 grid grid-cols-1 gap-3 md:grid-cols-3">
          {assessments.map((assessment) => (
            <Link
              key={assessment.href}
              href={assessment.href}
              className={`group flex min-h-[180px] flex-col justify-between rounded-[3px] border border-[#1f1f24] p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-500 ${assessment.className}`}
            >
              <span className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-400 text-neutral-400 transition group-hover:border-[#1f1f24] group-hover:bg-white/45 group-hover:text-[#1f1f24] dark:border-slate-500 dark:text-slate-500 dark:group-hover:border-white dark:group-hover:text-white">
                <ArrowUpRight className="h-5 w-5" />
              </span>
              <span className={`max-w-[190px] text-xl leading-7 ${assessment.emphasis ? "font-bold" : "font-medium"}`}>
                {assessment.title}
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </section>
  );
}
