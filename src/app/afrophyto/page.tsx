"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AFROPHYTO_DUMMY_API_URL,
  AFROPHYTO_MOCK_PLANTS,
  type AfrophytoPlant,
} from "@/app/afrophyto/mock-data";

const PAGE_SIZE = 8;

export default function AfrophytoPage() {
  const [plants, setPlants] = useState<AfrophytoPlant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  useEffect(() => {
    let mounted = true;

    async function loadPlants() {
      const apiUrl = process.env.NEXT_PUBLIC_AFROPHYTO_API_URL || AFROPHYTO_DUMMY_API_URL;

      try {
        const response = await fetch(apiUrl, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Failed to fetch plants (${response.status})`);
        }
        const data = (await response.json()) as { plants?: AfrophytoPlant[] };
        if (!mounted) return;
        setPlants(Array.isArray(data.plants) && data.plants.length ? data.plants : AFROPHYTO_MOCK_PLANTS);
      } catch {
        if (!mounted) return;
        setPlants(AFROPHYTO_MOCK_PLANTS);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadPlants();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredPlants = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return plants;
    return plants.filter((plant) => {
      const haystack = [
        plant.common_names,
        plant.scientific_name,
        plant.description,
        plant.status,
        plant.phytochemicals.map((item) => item.compound_name).join(" "),
        plant.phytochemicals.map((item) => item.compound_class).join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [plants, search]);

  const pageCount = Math.max(1, Math.ceil(filteredPlants.length / PAGE_SIZE));

  const pagedPlants = useMemo(() => {
    const safePage = Math.min(page, pageCount);
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredPlants.slice(start, start + PAGE_SIZE);
  }, [filteredPlants, page, pageCount]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#061a14] dark:text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-[#0a2019]/95">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/afrophyto" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-emerald-600 font-bold text-white">
              A
            </span>
            <span className="text-xl font-bold text-emerald-700">AfroPhyto</span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-medium text-slate-700 md:flex dark:text-slate-200">
            <Link href="/afrophyto" className="hover:text-emerald-700 dark:hover:text-emerald-400">
              Home
            </Link>
            <a href="#" className="hover:text-emerald-700 dark:hover:text-emerald-400">
              About
            </a>
            <a href="#" className="hover:text-emerald-700 dark:hover:text-emerald-400">
              Docs
            </a>
            <a href="#" className="hover:text-emerald-700 dark:hover:text-emerald-400">
              Molecular Docking
            </a>
            <a href="#" className="hover:text-emerald-700 dark:hover:text-emerald-400">
              Contribute Data
            </a>
            <a
              href="mailto:contact@thehackbio.com?subject=Support%20AfroPhyto"
              className="rounded-md bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700"
            >
              Donate
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm dark:border-emerald-500/30 dark:bg-[#0b1f3b]">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Plant Phytochemical Database</p>
          <h1 className="mt-2 text-4xl font-bold text-emerald-700">AfroPhyto</h1>
          <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-200">
            Discover medicinal plants and their known phytochemicals from African contexts. This page currently uses
            mock JSON data through a temporary API route.
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search for a plant, compound, region..."
              className="w-full rounded-md border border-emerald-300 px-4 py-3 text-base text-slate-900 outline-none ring-0 focus:border-emerald-500 dark:border-emerald-500/40 dark:bg-[#081628] dark:text-slate-100"
            />
            <button
              type="button"
              onClick={() => setSearch(search.trim())}
              className="rounded-md bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Search
            </button>
          </div>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
            API source:{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-slate-700 dark:bg-[#102641] dark:text-slate-200">
              {process.env.NEXT_PUBLIC_AFROPHYTO_API_URL || AFROPHYTO_DUMMY_API_URL}
            </code>
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-12">
        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600 dark:border-slate-700 dark:bg-[#0a1730] dark:text-slate-300">
            Loading plants...
          </div>
        ) : (
          <>
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Showing <span className="font-semibold text-slate-900 dark:text-slate-100">{filteredPlants.length}</span> plant
                  {filteredPlants.length === 1 ? "" : "s"}
                </p>
                <div className="inline-flex rounded-md border border-slate-300 bg-white p-1 dark:border-slate-700 dark:bg-[#10253f]">
                  <button
                    type="button"
                    onClick={() => setViewMode("card")}
                    className={`rounded px-3 py-1 text-sm ${viewMode === "card" ? "bg-emerald-600 text-white" : "text-slate-700 dark:text-slate-200"}`}
                  >
                    Card View
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`rounded px-3 py-1 text-sm ${viewMode === "list" ? "bg-emerald-600 text-white" : "text-slate-700 dark:text-slate-200"}`}
                  >
                    List View
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Page <span className="font-semibold text-slate-900 dark:text-slate-100">{Math.min(page, pageCount)}</span> of{" "}
                <span className="font-semibold text-slate-900 dark:text-slate-100">{pageCount}</span>
              </p>
            </div>

            {viewMode === "card" ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {pagedPlants.map((plant) => (
                  <article
                    key={plant.id}
                    className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-[#0a1730]"
                  >
                    {plant.image ? (
                      <img
                        src={plant.image}
                        alt={plant.common_names}
                        className="mb-4 h-14 w-14 rounded-md border border-slate-200 object-cover dark:border-slate-700"
                      />
                    ) : (
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-emerald-100 text-lg font-bold text-emerald-700">
                        {plant.common_names.slice(0, 1)}
                      </div>
                    )}
                    <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{plant.common_names}</h2>
                    <p className="text-sm italic text-slate-500 dark:text-slate-300">{plant.scientific_name}</p>
                    <p className="mt-3 line-clamp-4 text-sm text-slate-700 dark:text-slate-200">{plant.description}</p>
                    <div className="mt-3">
                      <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                        {plant.status || "approved"}
                      </span>
                      <span className="ml-2 text-xs text-slate-500 dark:text-slate-300">
                        {plant.phytochemicals.length} phytochemical{plant.phytochemicals.length === 1 ? "" : "s"}
                      </span>
                    </div>
                    <Link
                      href={`/afrophyto/${plant.id}`}
                      className="mt-4 inline-flex items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      View Phytochemicals
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {pagedPlants.map((plant) => (
                  <article
                    key={plant.id}
                    className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between dark:border-slate-700 dark:bg-[#0a1730]"
                  >
                    <div className="flex items-start gap-4">
                      {plant.image ? (
                        <img
                          src={plant.image}
                          alt={plant.common_names}
                          className="h-14 w-14 shrink-0 rounded-md border border-slate-200 object-cover dark:border-slate-700"
                        />
                      ) : (
                        <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-lg font-bold text-emerald-700">
                          {plant.common_names.slice(0, 1)}
                        </div>
                      )}
                      <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{plant.common_names}</h2>
                        <p className="text-sm italic text-slate-500 dark:text-slate-300">{plant.scientific_name}</p>
                        <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{plant.description}</p>
                        <div className="mt-2">
                          <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                            {plant.status || "approved"}
                          </span>
                          <span className="ml-2 text-xs text-slate-500 dark:text-slate-300">
                            {plant.phytochemicals.length} phytochemical{plant.phytochemicals.length === 1 ? "" : "s"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/afrophyto/${plant.id}`}
                      className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      View Phytochemicals
                    </Link>
                  </article>
                ))}
              </div>
            )}

            {filteredPlants.length === 0 ? (
              <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-slate-600 dark:border-slate-700 dark:bg-[#0a1730] dark:text-slate-300">
                No plants matched your search.
              </div>
            ) : null}

            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page <= 1}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-[#10253f] dark:text-slate-200"
              >
                Previous
              </button>
              {Array.from({ length: pageCount }).map((_, index) => {
                const pageNumber = index + 1;
                const active = pageNumber === page;
                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`rounded-md px-3 py-2 text-sm ${
                      active
                        ? "bg-emerald-600 text-white"
                        : "border border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-[#10253f] dark:text-slate-200"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(prev + 1, pageCount))}
                disabled={page >= pageCount}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-[#10253f] dark:text-slate-200"
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>

      <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-[#0a2019]">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 md:grid-cols-3">
          <div>
            <p className="text-base font-semibold text-emerald-700">About AfroPhyto</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              A curated atlas of medicinal plants and their bioactive compounds for reproducible research and learning.
            </p>
          </div>
          <div>
            <p className="text-base font-semibold text-emerald-700">Quick Links</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
              <li>Browse plants</li>
              <li>Browse compounds</li>
              <li>Terms of use</li>
              <li>Data licensing</li>
            </ul>
          </div>
          <div>
            <p className="text-base font-semibold text-emerald-700">Support AfroPhyto</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Help us expand open phytochemical data across African medicinal plants.
            </p>
            <a
              href="mailto:contact@thehackbio.com?subject=Support%20AfroPhyto"
              className="mt-3 inline-flex rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Donate
            </a>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          &copy; 2026 AfroPhyto: An Open Atlas of Bioactive Phytochemicals from African Plants.
        </p>
      </footer>
    </main>
  );
}
