"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { type AfrophytoPlant, getAfrophytoPlantById } from "@/app/afrophyto/mock-data";

const MOBILE_COMPOUNDS_PER_PAGE = 4;
const formatMetric = (value: number | null | undefined): string =>
  typeof value === "number" && Number.isFinite(value) ? value.toFixed(2) : "-";

type PageProps = {
  params: {
    plantId: string;
  };
};

type PlantDetailApiResponse = {
  ok: boolean;
  plant?: AfrophytoPlant;
  source?: string;
  error?: string;
};

export default function AfrophytoPlantDetailPage({ params }: PageProps) {
  const plantId = Number(params.plantId);
  const [plant, setPlant] = useState<AfrophytoPlant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [mobileCompoundPage, setMobileCompoundPage] = useState(1);
  const [expandedCompounds, setExpandedCompounds] = useState<Record<number, boolean>>({});

  useEffect(() => {
    let mounted = true;

    async function loadPlant() {
      if (!Number.isFinite(plantId)) {
        setError("Invalid plant id.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/afrophyto/plants/${plantId}`, { cache: "no-store" });
        const data = (await response.json()) as PlantDetailApiResponse;
        if (!mounted) return;

        if (!response.ok || !data?.plant) {
          throw new Error(data?.error || "Plant not found");
        }

        setPlant(data.plant);
      } catch (err) {
        if (!mounted) return;
        const fallback = getAfrophytoPlantById(plantId);
        if (fallback) {
          setPlant(fallback);
        } else {
          setError(err instanceof Error ? err.message : "Unable to load plant data.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadPlant();
    return () => {
      mounted = false;
    };
  }, [plantId]);

  const phytochemicals = useMemo(() => plant?.phytochemicals || [], [plant]);
  const literature = useMemo(() => plant?.literature || [], [plant]);
  const mobileCompoundPageCount = Math.max(1, Math.ceil(phytochemicals.length / MOBILE_COMPOUNDS_PER_PAGE));
  const mobilePagedCompounds = useMemo(() => {
    const safePage = Math.min(mobileCompoundPage, mobileCompoundPageCount);
    const start = (safePage - 1) * MOBILE_COMPOUNDS_PER_PAGE;
    return phytochemicals.slice(start, start + MOBILE_COMPOUNDS_PER_PAGE);
  }, [mobileCompoundPage, mobileCompoundPageCount, phytochemicals]);

  useEffect(() => {
    setMobileCompoundPage(1);
    setExpandedCompounds({});
  }, [plantId, phytochemicals.length]);

  useEffect(() => {
    if (mobileCompoundPage > mobileCompoundPageCount) {
      setMobileCompoundPage(mobileCompoundPageCount);
    }
  }, [mobileCompoundPage, mobileCompoundPageCount]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-[#061a14] dark:text-slate-100">
        <div className="mx-auto w-full max-w-4xl rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600 dark:border-slate-700 dark:bg-[#0a1730] dark:text-slate-300">
          Loading plant details...
        </div>
      </main>
    );
  }

  if (!plant) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-[#061a14] dark:text-slate-100">
        <div className="mx-auto w-full max-w-4xl rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600 dark:border-slate-700 dark:bg-[#0a1730] dark:text-slate-300">
          {error || "Plant not found."}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-[#061a14] dark:text-slate-100">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/afrophyto"
          className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
        >
          ← Back to AfroPhyto
        </Link>

        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-[#0a1730]">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-4">
              {plant.image ? (
                <img
                  src={plant.image}
                  alt={plant.common_names}
                  className="h-24 w-24 shrink-0 rounded-lg border border-slate-200 object-cover dark:border-slate-700"
                />
              ) : (
                <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-2xl font-bold text-emerald-700">
                  {plant.common_names.slice(0, 1)}
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{plant.common_names}</h1>
                <p className="mt-1 text-base italic text-slate-500 dark:text-slate-300">{plant.scientific_name}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    {plant.status || "approved"}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-300">
                    {phytochemicals.length} phytochemical{phytochemicals.length === 1 ? "" : "s"}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-300">
                    {literature.length} literature source{literature.length === 1 ? "" : "s"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-base leading-relaxed text-slate-700 dark:text-slate-200">
            {plant.description || "No description provided for this plant yet."}
          </p>

          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-[#10253f]">
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Phytochemicals</p>
            {phytochemicals.length ? (
              <>
                <div className="mt-3 space-y-3 md:hidden">
                  {mobilePagedCompounds.map((compound) => {
                    const isExpanded = Boolean(expandedCompounds[compound.id]);
                    return (
                      <article
                        key={compound.id}
                        className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-[#0a1730]"
                      >
                        <div className="min-w-0">
                          <h3 className="break-words text-base font-semibold leading-snug text-slate-900 dark:text-slate-100">
                            {compound.compound_name || "-"}
                          </h3>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <p className="text-xs text-slate-500 dark:text-slate-300">
                              {compound.compound_class || "Unclassified"}
                            </p>
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                compound.lipinski_pass === null
                                  ? "bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-200"
                                  : compound.lipinski_pass
                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                                    : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300"
                              }`}
                            >
                              {compound.lipinski_pass === null ? "Lipinski: N/A" : compound.lipinski_pass ? "Lipinski: Pass" : "Lipinski: Fail"}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-300">CID: {compound.pubchem_cid || "-"}</p>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-[#10253f]">
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                              Mol Weight
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
                              {formatMetric(compound.molecular_weight)}
                            </p>
                          </div>
                          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-[#10253f]">
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                              logP
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
                              {formatMetric(compound.logp)}
                            </p>
                          </div>
                        </div>

                        {isExpanded ? (
                          <dl className="mt-3 space-y-2 border-t border-slate-200 pt-3 text-sm dark:border-slate-700">
                            <div className="flex items-start justify-between gap-3">
                              <dt className="text-slate-500 dark:text-slate-300">H Donors</dt>
                              <dd className="text-right font-medium text-slate-700 dark:text-slate-200">
                                {formatMetric(compound.h_donors)}
                              </dd>
                            </div>
                            <div className="flex items-start justify-between gap-3">
                              <dt className="text-slate-500 dark:text-slate-300">H Acceptors</dt>
                              <dd className="text-right font-medium text-slate-700 dark:text-slate-200">
                                {formatMetric(compound.h_acceptors)}
                              </dd>
                            </div>
                            <div className="flex items-start justify-between gap-3">
                              <dt className="text-slate-500 dark:text-slate-300">Class</dt>
                              <dd className="text-right font-medium text-slate-700 dark:text-slate-200">
                                {compound.compound_class || "-"}
                              </dd>
                            </div>
                            <div className="flex items-start justify-between gap-3">
                              <dt className="text-slate-500 dark:text-slate-300">PubChem CID</dt>
                              <dd className="text-right font-medium text-slate-700 dark:text-slate-200">{compound.pubchem_cid || "-"}</dd>
                            </div>
                            <div className="flex items-start justify-between gap-3">
                              <dt className="text-slate-500 dark:text-slate-300">InChIKey</dt>
                              <dd className="max-w-[58%] break-all text-right font-medium text-slate-700 dark:text-slate-200">
                                {compound.inchikey || "-"}
                              </dd>
                            </div>
                            <div className="flex items-start justify-between gap-3">
                              <dt className="text-slate-500 dark:text-slate-300">SMILES</dt>
                              <dd className="max-w-[58%] break-all text-right font-medium text-slate-700 dark:text-slate-200">
                                {compound.smiles || "-"}
                              </dd>
                            </div>
                          </dl>
                        ) : null}

                        <button
                          type="button"
                          onClick={() =>
                            setExpandedCompounds((prev) => ({
                              ...prev,
                              [compound.id]: !prev[compound.id],
                            }))
                          }
                          className="mt-3 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 dark:border-slate-600 dark:text-emerald-300 dark:hover:bg-emerald-500/10"
                        >
                          {isExpanded ? "View less" : "View more"}
                        </button>
                      </article>
                    );
                  })}

                  {phytochemicals.length > MOBILE_COMPOUNDS_PER_PAGE ? (
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setMobileCompoundPage((prev) => Math.max(prev - 1, 1))}
                        disabled={mobileCompoundPage <= 1}
                        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 disabled:opacity-50 dark:border-slate-700 dark:bg-[#10253f] dark:text-slate-200"
                      >
                        Previous
                      </button>
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        Page {Math.min(mobileCompoundPage, mobileCompoundPageCount)} of {mobileCompoundPageCount}
                      </p>
                      <button
                        type="button"
                        onClick={() => setMobileCompoundPage((prev) => Math.min(prev + 1, mobileCompoundPageCount))}
                        disabled={mobileCompoundPage >= mobileCompoundPageCount}
                        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 disabled:opacity-50 dark:border-slate-700 dark:bg-[#10253f] dark:text-slate-200"
                      >
                        Next
                      </button>
                    </div>
                  ) : null}
                </div>

                <div className="mt-3 hidden overflow-x-auto md:block">
                  <table className="min-w-[1040px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-300 dark:border-slate-700">
                        <th className="px-2 py-2 font-semibold text-slate-700 dark:text-slate-200">Compound</th>
                        <th className="px-2 py-2 font-semibold text-slate-700 dark:text-slate-200">Class</th>
                        <th className="px-2 py-2 font-semibold text-slate-700 dark:text-slate-200">CID</th>
                        <th className="px-2 py-2 font-semibold text-slate-700 dark:text-slate-200">Mol Weight</th>
                        <th className="px-2 py-2 font-semibold text-slate-700 dark:text-slate-200">logP</th>
                        <th className="px-2 py-2 font-semibold text-slate-700 dark:text-slate-200">H Donors</th>
                        <th className="px-2 py-2 font-semibold text-slate-700 dark:text-slate-200">H Acceptors</th>
                        <th className="px-2 py-2 font-semibold text-slate-700 dark:text-slate-200">Lipinski</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phytochemicals.map((compound) => (
                        <tr key={compound.id} className="border-b border-slate-200 dark:border-slate-800">
                          <td className="px-2 py-2 text-slate-700 dark:text-slate-200">{compound.compound_name || "-"}</td>
                          <td className="px-2 py-2 text-slate-600 dark:text-slate-300">{compound.compound_class || "-"}</td>
                          <td className="px-2 py-2 text-slate-600 dark:text-slate-300">{compound.pubchem_cid || "-"}</td>
                          <td className="px-2 py-2 text-slate-600 dark:text-slate-300">{formatMetric(compound.molecular_weight)}</td>
                          <td className="px-2 py-2 text-slate-600 dark:text-slate-300">{formatMetric(compound.logp)}</td>
                          <td className="px-2 py-2 text-slate-600 dark:text-slate-300">{formatMetric(compound.h_donors)}</td>
                          <td className="px-2 py-2 text-slate-600 dark:text-slate-300">{formatMetric(compound.h_acceptors)}</td>
                          <td className="px-2 py-2 text-slate-600 dark:text-slate-300">
                            {compound.lipinski_pass === null ? "-" : compound.lipinski_pass ? "Pass" : "Fail"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">No phytochemical records available yet.</p>
            )}
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-[#10253f]">
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Literature</p>
            {literature.length ? (
              <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                {literature.map((item) => (
                  <li key={item.id} className="rounded-md border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-[#0a1730]">
                    <p className="font-semibold">{item.title || "Untitled"}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-300">{item.authors || "Unknown authors"}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-300">{item.journal || "Unknown journal"}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-300">DOI: {item.doi || "-"}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">No literature records available yet.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
