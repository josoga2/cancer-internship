"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Nav/navbar";
import Footer from "@/components/Nav/footer";
import publicApi from "@/publicApi";

type CatalogType = "all" | "course" | "pathway";

type CatalogItem = {
  item_type: "course" | "pathway";
  id: number;
  slug: string;
  title: string;
  short_description: string;
  level: string;
  price: number;
  tags: string[];
  course_count?: number;
  course_titles_preview?: string[];
  pathway_count?: number;
  pathways_preview?: Array<{ id: number; title: string; slug: string }>;
  duration_label?: string;
  duration_days?: number;
  is_standalone?: boolean;
};

type CatalogResponse = {
  count: number;
  page: number;
  page_size: number;
  results: CatalogItem[];
};

const PAGE_SIZE = 12;

const sortOptions = [
  { value: "popular", label: "Popular" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const levelOptions = ["Beginner", "Intermediate", "Advanced"];
const durationOptions = ["< 2 weeks", "2–4 weeks", "1–3 months"];

export default function LearningPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [catalogType, setCatalogType] = useState<CatalogType>("pathway");
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);

  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [onlyStandalone, setOnlyStandalone] = useState(false);
  const [onlyInPathway, setOnlyInPathway] = useState(false);
  const [onlyPathwayBundles, setOnlyPathwayBundles] = useState(true);
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");

  const [data, setData] = useState<CatalogResponse>({
    count: 0,
    page: 1,
    page_size: PAGE_SIZE,
    results: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 250);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    // Keep viewport width stable when result count changes (prevents horizontal jumping).
    const root = document.documentElement;
    const previousOverflowY = root.style.overflowY;
    const previousScrollbarGutter = root.style.scrollbarGutter;
    root.style.overflowY = "scroll";
    root.style.scrollbarGutter = "stable";
    return () => {
      root.style.overflowY = previousOverflowY;
      root.style.scrollbarGutter = previousScrollbarGutter;
    };
  }, []);

  const availableTopics = useMemo(() => {
    const topics = new Set<string>();
    data.results.forEach((item) => {
      (item.tags || []).forEach((tag) => topics.add(tag));
    });
    return Array.from(topics).sort().slice(0, 12);
  }, [data.results]);

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const params: Record<string, string | number> = {
          page,
          page_size: PAGE_SIZE,
          sort,
        };

        let effectiveType = catalogType;
        if (onlyPathwayBundles) {
          effectiveType = "pathway";
        }
        params.type = effectiveType;

        if (debouncedQuery) params.q = debouncedQuery;
        if (selectedLevels.length) params.level = selectedLevels.join(",");
        if (selectedTopics.length) params.topic = selectedTopics.join(",");
        if (selectedDurations.length) params.duration = selectedDurations.join(",");
        if (priceFilter !== "all") params.price = priceFilter;

        if (!onlyPathwayBundles) {
          if (onlyStandalone) params.in_pathway = "false";
          if (onlyInPathway) params.in_pathway = "true";
        }

        const response = await publicApi.get("/api/catalog/", { params });
        setData(response.data);
      } catch (error) {
        console.error("Failed to load catalog:", error);
        setData({ count: 0, page: 1, page_size: PAGE_SIZE, results: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, [
    page,
    sort,
    catalogType,
    debouncedQuery,
    selectedLevels,
    selectedTopics,
    selectedDurations,
    onlyStandalone,
    onlyInPathway,
    onlyPathwayBundles,
    priceFilter,
  ]);

  const totalPages = Math.max(1, Math.ceil((data.count || 0) / PAGE_SIZE));

  const toggleMultiSelect = (value: string, selected: string[], setter: (next: string[]) => void) => {
    if (selected.includes(value)) {
      setter(selected.filter((item) => item !== value));
    } else {
      setter([...selected, value]);
    }
    setPage(1);
  };

  const CourseCard = ({ item }: { item: CatalogItem }) => (
    <div className="flex h-full flex-col rounded-sm border border-gray-200 bg-white p-5 shadow-sm dark:border-hb-green/30 dark:bg-[#0a1f19]">
      <div className="mb-3 inline-flex w-fit max-w-max shrink-0 self-start rounded-sm border border-hb-green/30 bg-hb-lightgreen px-2 py-1 text-xs font-semibold text-hb-green dark:bg-hb-lightgreen/15 dark:text-hb-lightgreen">
        COURSE
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
      <p
        className="mt-2 text-sm text-gray-600 dark:text-gray-300"
        style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
      >
        {item.short_description}
      </p>
      <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">
        Level: {item.level} • Price: ${item.price || 0}
        {item.duration_label ? ` • Duration: ${item.duration_label}` : ""}
      </p>
      {item.tags?.length ? (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">Tags: {item.tags.slice(0, 6).join(", ")}</p>
      ) : null}
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
        {item.pathway_count ? `Also in ${item.pathway_count} pathway(s)` : "Standalone course"}
      </p>
      <div className="mt-auto pt-4 flex flex-wrap gap-3">
        <button
          onClick={() => router.push(`/learning/course/${item.id}`)}
          className="rounded-sm bg-hb-green px-4 py-2 text-sm font-semibold text-white"
        >
          View Course
        </button>
        {item.pathway_count ? (
          <button
            onClick={() => {
              setCatalogType("pathway");
              if (item.tags?.length) {
                setSelectedTopics(item.tags.slice(0, 2));
              }
              setPage(1);
            }}
            className="rounded-sm border border-hb-green px-4 py-2 text-sm font-semibold text-hb-green dark:text-hb-lightgreen"
          >
            View Related Pathways
          </button>
        ) : null}
      </div>
    </div>
  );

  const PathwayCard = ({ item }: { item: CatalogItem }) => (
    <div className="flex h-full flex-col rounded-sm border border-gray-200 bg-white p-5 shadow-sm dark:border-hb-green/30 dark:bg-[#0a1f19]">
      <div className="mb-3 inline-flex w-fit max-w-max shrink-0 self-start rounded-sm border border-hb-green/30 bg-hb-lightgreen px-2 py-1 text-xs font-semibold text-hb-green dark:bg-hb-lightgreen/15 dark:text-hb-lightgreen">
        PATHWAY
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
      <p
        className="mt-2 text-sm text-gray-600 dark:text-gray-300"
        style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
      >
        {item.short_description}
      </p>
      <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">
        Bundle of {item.course_count || 0} courses • {item.level}
      </p>
      {item.tags?.length ? (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">Tags: {item.tags.slice(0, 7).join(", ")}</p>
      ) : null}
      {item.course_titles_preview?.length ? (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
          Includes: {item.course_titles_preview.join(", ")}
        </p>
      ) : null}
      <div className="mt-auto pt-4 flex flex-wrap gap-3">
        <button
          onClick={() => router.push(`/pathway/${item.id}`)}
          className="rounded-sm bg-hb-green px-4 py-2 text-sm font-semibold text-white"
        >
          View Pathway
        </button>
        <button
          onClick={() => router.push(`/pathway/${item.id}`)}
          className="rounded-sm border border-hb-green px-4 py-2 text-sm font-semibold text-hb-green dark:text-hb-lightgreen"
        >
          See Included Courses
        </button>
      </div>
    </div>
  );

  const renderPagination = () => {
    const pages = [];
    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages, page + 1);
    for (let p = start; p <= end; p += 1) {
      pages.push(
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`rounded-sm border px-3 py-1 text-sm ${p === page ? "border-hb-green bg-hb-lightgreen text-hb-green" : "border-gray-300 dark:border-hb-green/40"}`}
        >
          {p}
        </button>
      );
    }

    return (
      <div className="mt-6 flex items-center justify-end gap-2">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page <= 1}
          className="rounded-sm border border-gray-300 px-3 py-1 text-sm disabled:opacity-50 dark:border-hb-green/40"
        >
          &lt; Prev
        </button>
        {pages}
        <button
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={page >= totalPages}
          className="rounded-sm border border-gray-300 px-3 py-1 text-sm disabled:opacity-50 dark:border-hb-green/40"
        >
          Next &gt;
        </button>
      </div>
    );
  };

  return (
    <section>
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-24 md:px-6">
        <section className="rounded-sm border border-gray-200 bg-white p-6 dark:border-hb-green/30 dark:bg-[#0a1f19]">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Explore Courses & Career Pathways</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Learn single courses or follow a full pathway built from multiple courses.
          </p>
        </section>

        <section className="mt-4 grid grid-cols-1 gap-3 rounded-sm border border-gray-200 bg-white p-4 md:grid-cols-[1fr_180px_180px] dark:border-hb-green/30 dark:bg-[#0a1f19]">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-sm border border-gray-300 px-3 py-2 text-sm dark:border-hb-green/40 dark:bg-[#0d2a22] dark:text-white"
            placeholder="Search courses, pathways, tags..."
          />
          <select
            value={onlyPathwayBundles ? "pathway" : catalogType}
            onChange={(e) => {
              setOnlyPathwayBundles(e.target.value === "pathway");
              setCatalogType(e.target.value as CatalogType);
              setPage(1);
            }}
            className="rounded-sm border border-gray-300 px-3 py-2 text-sm dark:border-hb-green/40 dark:bg-[#0d2a22] dark:text-white"
          >
            <option value="all">All</option>
            <option value="pathway">Pathway bundles</option>
            <option value="course">Courses</option>
          </select>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="rounded-sm border border-gray-300 px-3 py-2 text-sm dark:border-hb-green/40 dark:bg-[#0d2a22] dark:text-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </section>

        <section className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-sm border border-gray-200 bg-white p-4 dark:border-hb-green/30 dark:bg-[#0a1f19]">
            <p className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Filters</p>

            <div className="mb-4">
              <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">Level</p>
              {levelOptions.map((level) => (
                <label key={level} className="mb-2 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes(level.toLowerCase())}
                    onChange={() => toggleMultiSelect(level.toLowerCase(), selectedLevels, setSelectedLevels)}
                    className="accent-hb-green"
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>

            <div className="mb-4">
              <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">Duration</p>
              {durationOptions.map((duration) => (
                <label key={duration} className="mb-2 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedDurations.includes(duration)}
                    onChange={() => toggleMultiSelect(duration, selectedDurations, setSelectedDurations)}
                    className="accent-hb-green"
                  />
                  <span>{duration}</span>
                </label>
              ))}
            </div>

            <div className="mb-4">
              <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">Format</p>
              <label className="mb-2 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={onlyStandalone}
                  onChange={(e) => {
                    setOnlyStandalone(e.target.checked);
                    if (e.target.checked) setOnlyInPathway(false);
                    setPage(1);
                  }}
                  className="accent-hb-green"
                />
                <span>Standalone only</span>
              </label>
              <label className="mb-2 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={onlyInPathway}
                  onChange={(e) => {
                    setOnlyInPathway(e.target.checked);
                    if (e.target.checked) setOnlyStandalone(false);
                    setPage(1);
                  }}
                  className="accent-hb-green"
                />
                <span>In pathway</span>
              </label>
              <label className="mb-2 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={onlyPathwayBundles}
                  onChange={(e) => {
                    setOnlyPathwayBundles(e.target.checked);
                    if (e.target.checked) {
                      setCatalogType("pathway");
                      setOnlyStandalone(false);
                      setOnlyInPathway(false);
                    }
                    setPage(1);
                  }}
                  className="accent-hb-green"
                />
                <span>Pathway bundles</span>
              </label>
            </div>

            <div className="mb-4">
              <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">Topic</p>
              {availableTopics.map((topic) => (
                <label key={topic} className="mb-2 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedTopics.includes(topic)}
                    onChange={() => toggleMultiSelect(topic, selectedTopics, setSelectedTopics)}
                    className="accent-hb-green"
                  />
                  <span>{topic}</span>
                </label>
              ))}
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">Price</p>
              {[
                { key: "all", label: "All" },
                { key: "free", label: "Free" },
                { key: "paid", label: "Paid" },
              ].map((opt) => (
                <label key={opt.key} className="mb-2 flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="price"
                    checked={priceFilter === opt.key}
                    onChange={() => {
                      setPriceFilter(opt.key as "all" | "free" | "paid");
                      setPage(1);
                    }}
                    className="accent-hb-green"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </aside>

          <section className="rounded-sm border border-gray-200 bg-white p-4 dark:border-hb-green/30 dark:bg-[#0a1f19]">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {loading ? "Loading..." : `Showing ${data.count} result${data.count === 1 ? "" : "s"}`}
              </p>
              <Link href="/pricing" className="text-sm font-semibold text-hb-green underline">
                Compare plans
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {!loading && data.results.length === 0 ? (
                <div className="rounded-sm border border-dashed border-gray-300 p-8 text-center text-sm text-gray-600 dark:border-hb-green/40 dark:text-gray-300">
                  No matching items yet. Try clearing one or two filters.
                </div>
              ) : null}

              {data.results.map((item) =>
                <div key={`${item.item_type}-${item.id}`} className="mx-auto w-full max-w-[760px]">
                  {item.item_type === "pathway" ? <PathwayCard item={item} /> : <CourseCard item={item} />}
                </div>
              )}
            </div>

            {renderPagination()}
          </section>
        </section>
      </main>
      <Footer />
    </section>
  );
}
