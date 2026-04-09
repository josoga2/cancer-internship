"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { type AfrophytoPlant, getAfrophytoPlantById } from "@/app/afrophyto/mock-data";

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
              <div className="mt-3 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-300 dark:border-slate-700">
                      <th className="px-2 py-2 font-semibold text-slate-700 dark:text-slate-200">Compound</th>
                      <th className="px-2 py-2 font-semibold text-slate-700 dark:text-slate-200">Class</th>
                      <th className="px-2 py-2 font-semibold text-slate-700 dark:text-slate-200">CID</th>
                      <th className="px-2 py-2 font-semibold text-slate-700 dark:text-slate-200">Lipinski</th>
                    </tr>
                  </thead>
                  <tbody>
                    {phytochemicals.map((compound) => (
                      <tr key={compound.id} className="border-b border-slate-200 dark:border-slate-800">
                        <td className="px-2 py-2 text-slate-700 dark:text-slate-200">{compound.compound_name || "-"}</td>
                        <td className="px-2 py-2 text-slate-600 dark:text-slate-300">{compound.compound_class || "-"}</td>
                        <td className="px-2 py-2 text-slate-600 dark:text-slate-300">{compound.pubchem_cid || "-"}</td>
                        <td className="px-2 py-2 text-slate-600 dark:text-slate-300">
                          {compound.lipinski_pass === null ? "-" : compound.lipinski_pass ? "Pass" : "Fail"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
