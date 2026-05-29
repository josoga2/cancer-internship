"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import publicApi from "@/publicApi";

export type PotentialProject = {
  id?: number | string;
  title?: string;
  description?: string;
  image?: string;
  image_url?: string;
};

type PotentialProjectsSectionProps = {
  projects?: PotentialProject[];
  programType: "pathway" | "internship";
  programId: string | number;
};

const fallbackImages = ["/cancer.webp", "/dna.svg", "/molbio.svg", "/omics.svg", "/microbe.webp"];

export default function PotentialProjectsSection({
  projects = [],
  programType,
  programId,
}: PotentialProjectsSectionProps) {
  const visibleProjects = useMemo(
    () => projects.filter((project) => project.title || project.description || project.image || project.image_url),
    [projects]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  if (!visibleProjects.length) return null;

  const displayedProjects = visibleProjects.slice(0, 5);
  const normalizedActiveIndex = Math.min(activeIndex, displayedProjects.length - 1);
  const activeProject = displayedProjects[normalizedActiveIndex];
  const centeredProjects = displayedProjects.map((_, offset) => {
    const relativeOffset = offset - Math.floor(displayedProjects.length / 2);
    const index = (normalizedActiveIndex + relativeOffset + displayedProjects.length) % displayedProjects.length;
    return {
      project: displayedProjects[index],
      index,
      isActive: index === normalizedActiveIndex,
    };
  });

  const resolveImage = (project: PotentialProject, index: number) => {
    const source = project.image_url || project.image || fallbackImages[index % fallbackImages.length];
    if (/^https?:\/\//i.test(source)) return source;
    if (source.startsWith("/") && !source.startsWith("/media/")) return source;
    const baseUrl = publicApi.defaults.baseURL || "";
    try {
      return new URL(source, baseUrl).toString();
    } catch {
      return source;
    }
  };

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => {
      const next = current + direction;
      if (next < 0) return displayedProjects.length - 1;
      if (next >= displayedProjects.length) return 0;
      return next;
    });
  };

  return (
    <section className="mx-auto w-full max-w-5xl overflow-hidden px-6 py-12 md:px-10">
      <div className="hidden flex-col items-center md:flex">
        <h2 className="text-center text-2xl font-bold text-[#1f1f24] dark:text-white md:text-3xl">
          Curious about what you will do in the final projects?
        </h2>

        <div className="mt-8 w-full max-w-3xl">
          <h3 className="text-xl text-center font-bold text-hb-green">{activeProject.title}</h3>
          
          {activeProject.description ? (
            <p className="mt-4 rounded-sm border border-yellow-400 bg-hb-lightgreen px-5 py-4 text-base leading-7 text-gray-600 dark:border-hb-green/50 dark:bg-[#10251d] dark:text-gray-200">
              {activeProject.description}
            </p>
          ) : null}

          <p className="text-center text-sm pt-5 text-gray-600 dark:text-gray-200">
            Click on the image below to see the project description
          </p>

        </div>
        

        <div className="mt-6 flex min-h-[210px] w-full items-center justify-center gap-2 overflow-hidden py-3 md:min-h-[280px] md:gap-4">
          {centeredProjects.map(({ project, index, isActive }) => {
            return (
              <button
                key={project.id || `${project.title}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`shrink-0 overflow-hidden rounded-sm border-4 transition-all duration-200 ${
                  isActive
                    ? "h-52 w-[10.5rem] border-hb-green md:h-72 md:w-[14.5rem]"
                    : "h-28 w-24 border-gray-500 opacity-85 md:h-40 md:w-36"
                }`}
                aria-label={`Show project ${index + 1}`}
              >
                <img
                  src={resolveImage(project, index)}
                  alt={project.title || "Potential project"}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>

        <Link
          href={{ pathname: "/dashboard/checkout", query: { prog: programType, id: programId } }}
          className="mt-8 inline-flex h-11 w-full max-w-xs items-center justify-center rounded-sm bg-hb-green px-6 text-base font-bold text-white transition hover:bg-hb-green-dark"
        >
          Work on this project!
        </Link>

        {displayedProjects.length > 1 ? (
          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => move(-1)}
              className="inline-flex h-10 w-10 items-center justify-center text-gray-900 dark:text-white"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <div className="flex items-center gap-4">
              {displayedProjects.map((project, index) => (
                <button
                  key={project.id || index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-3.5 w-3.5 rounded-full ${index === activeIndex ? "bg-gray-700" : "bg-gray-300"}`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => move(1)}
              className="inline-flex h-10 w-10 items-center justify-center text-gray-900 dark:text-white"
              aria-label="Next project"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </div>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-col md:hidden">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-hb-green">
            Final projects
          </p>
          <h2 className="mt-2 text-2xl font-bold leading-tight text-[#1f1f24] dark:text-white">
            Curious about what you will work on?
          </h2>
        </div>

        <div className="overflow-hidden rounded-sm border-4 border-hb-green bg-gray-100 shadow-sm dark:bg-[#10251d]">
          <img
            src={resolveImage(activeProject, normalizedActiveIndex)}
            alt={activeProject.title || "Potential project"}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>

        <div className="mt-5">
          <h3 className="text-xl font-bold leading-snug text-hb-green">
            {activeProject.title}
          </h3>

          {activeProject.description ? (
            <p className="mt-4 rounded-sm border border-yellow-400 bg-hb-lightgreen px-4 py-4 text-base leading-7 text-gray-600 dark:border-hb-green/50 dark:bg-[#10251d] dark:text-gray-200">
              {activeProject.description}
            </p>
          ) : null}
        </div>

        {visibleProjects.length > 1 ? (
          <div className="mt-6">
            <p className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-300">
              Browse other project ideas
            </p>
            <div className="flex w-full snap-x gap-3 overflow-x-auto overscroll-x-contain pb-2">
              {visibleProjects.map((project, index) => {
                const isActive = index === normalizedActiveIndex;
                return (
                  <button
                    key={project.id || `${project.title}-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-20 w-28 shrink-0 snap-start overflow-hidden rounded-sm border-2 bg-gray-100 transition ${
                      isActive ? "border-hb-green opacity-100" : "border-gray-300 opacity-75"
                    }`}
                    aria-label={`Show project ${index + 1}`}
                  >
                    <img
                      src={resolveImage(project, index)}
                      alt={project.title || "Potential project"}
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <Link
          href={{ pathname: "/dashboard/checkout", query: { prog: programType, id: programId } }}
          className="mt-7 inline-flex h-11 w-full items-center justify-center rounded-sm bg-hb-green px-6 text-base font-bold text-white transition hover:bg-hb-green-dark"
        >
          Work on this project!
        </Link>
      </div>
    </section>
  );
}
