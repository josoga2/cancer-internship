"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
  background_image?: string;
  hero_background_image?: string;
  int_image?: string;
  image?: string;
  cover_image?: string;
  thumbnail?: string;
  published?: boolean;
  is_active?: boolean;
};

type CatalogResponse = {
  count: number;
  page: number;
  page_size: number;
  results: CatalogItem[];
};

type InternshipStatusResponse = {
  id?: number | string;
  is_open?: boolean;
  open?: boolean;
  status?: string;
  title?: string;
  short_description?: string;
  summary?: string;
  overview?: string;
  description?: string;
  background_image?: string;
  hero_background_image?: string;
  int_image?: string;
  image?: string;
};

type InternshipItem = InternshipStatusResponse & {
  published?: boolean;
  finished?: boolean;
};

type LegacyCourse = {
  id?: number | string;
  slug?: string;
  title?: string;
  short_description?: string;
  overview?: string;
  description?: string;
  level?: string;
  difficulty_level?: string;
  price?: number;
  free?: boolean;
  skill_tags?: string;
  topic?: string;
  duration_label?: string;
  duration_days?: number;
  image?: string;
  hero_background_image?: string;
};

type LegacyPathway = {
  id?: number | string;
  slug?: string;
  title?: string;
  short_description?: string;
  overview?: string;
  description?: string;
  level?: string;
  price?: number;
  free?: boolean;
  topic?: string;
  duration_label?: string;
  duration_days?: number;
  courses?: Array<number | string>;
  int_image?: string;
  hero_background_image?: string;
  published?: boolean;
  is_active?: boolean;
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

const keepPublishedPathways = (items: CatalogItem[]) =>
  items.filter((item) => item.item_type !== "pathway" || item.published !== false);

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
  const [internshipStatus, setInternshipStatus] = useState<InternshipStatusResponse | null>(null);
  const [openInternship, setOpenInternship] = useState<InternshipItem | null>(null);
  const [featuredPathways, setFeaturedPathways] = useState<CatalogItem[]>([]);

  const courseTags = (course: LegacyCourse) => {
    const tags = new Set<string>();
    (course.skill_tags || "")
      .replace(";", ",")
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean)
      .forEach((tag) => tags.add(tag));
    if (course.topic) tags.add(course.topic.trim().toLowerCase());
    return Array.from(tags).sort();
  };

  const matchesDuration = (durationDays: number | undefined, selected: string[]) => {
    if (!selected.length) return true;
    const days = Number(durationDays || 0);
    return selected.some((bucket) => {
      const key = bucket.replaceAll(" ", "").replace("–", "-");
      return (
        (["<2weeks", "lt2weeks"].includes(key) && days < 14) ||
        (["2-4weeks", "2to4weeks"].includes(key) && days >= 14 && days <= 28) ||
        (["1-3months", "1to3months"].includes(key) && days >= 29 && days <= 90)
      );
    });
  };

  const fetchLegacyCatalog = async (params: Record<string, string | number>): Promise<CatalogResponse> => {
    const type = String(params.type || "all");
    const pageNumber = Number(params.page || 1);
    const pageSize = Number(params.page_size || PAGE_SIZE);
    const searchQuery = String(params.q || "").trim().toLowerCase();
    const levelFilter = String(params.level || "")
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);
    const topicFilter = String(params.topic || "")
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);
    const durationFilter = String(params.duration || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const selectedPrice = String(params.price || "all");

    const [coursesResponse, pathwaysResponse] = await Promise.all([
      type !== "pathway" ? publicApi.get("/api/courses/") : Promise.resolve({ data: [] }),
      type !== "course" ? publicApi.get("/api/pathways/") : Promise.resolve({ data: [] }),
    ]);

    const courses: LegacyCourse[] = Array.isArray(coursesResponse.data) ? coursesResponse.data : [];
    const pathways: LegacyPathway[] = Array.isArray(pathwaysResponse.data) ? pathwaysResponse.data : [];
    const coursesById = new Map(courses.map((course) => [String(course.id), course]));

    const items: CatalogItem[] = [];

    if (type !== "course") {
      pathways.forEach((pathway) => {
        if (pathway.published !== true) return;
        if (pathway.is_active === false) return;

        const includedCourses = (pathway.courses || [])
          .map((courseId) => coursesById.get(String(courseId)))
          .filter((course): course is LegacyCourse => Boolean(course));
        const tags = new Set<string>();
        if (pathway.topic) tags.add(pathway.topic.trim().toLowerCase());
        includedCourses.forEach((course) => courseTags(course).forEach((tag) => tags.add(tag)));
        const normalizedTags = Array.from(tags).sort();
        const description = pathway.short_description || pathway.overview || pathway.description || "";
        const searchableBlob = [pathway.title, description, normalizedTags.join(" "), includedCourses.map((course) => course.title).join(" ")]
          .join(" ")
          .toLowerCase();
        const isFree = Boolean(pathway.free || !pathway.price);

        if (searchQuery && !searchableBlob.includes(searchQuery)) return;
        if (levelFilter.length && !levelFilter.includes((pathway.level || "Beginner").toLowerCase())) return;
        if (topicFilter.length && !topicFilter.some((topic) => normalizedTags.includes(topic))) return;
        if (!matchesDuration(pathway.duration_days, durationFilter)) return;
        if (selectedPrice === "free" && !isFree) return;
        if (selectedPrice === "paid" && isFree) return;

        items.push({
          item_type: "pathway",
          id: Number(pathway.id),
          slug: pathway.slug || String(pathway.id),
          title: pathway.title || "Pathway",
          short_description: description,
          level: pathway.level || "Beginner",
          price: pathway.price || 0,
          tags: normalizedTags,
          duration_label: pathway.duration_label,
          duration_days: pathway.duration_days,
          course_count: (pathway.courses || []).length,
          course_titles_preview: includedCourses.map((course) => course.title || "").filter(Boolean).slice(0, 5),
          hero_background_image: pathway.hero_background_image,
          background_image: pathway.hero_background_image,
          int_image: pathway.int_image,
          published: true,
          is_active: true,
        });
      });
    }

    if (type !== "pathway") {
      courses.forEach((course) => {
        const tags = courseTags(course);
        const description = course.short_description || course.overview || course.description || "";
        const searchableBlob = [course.title, description, tags.join(" ")].join(" ").toLowerCase();
        const isFree = Boolean(course.free || !course.price);

        if (searchQuery && !searchableBlob.includes(searchQuery)) return;
        if (levelFilter.length && !levelFilter.includes((course.level || course.difficulty_level || "Beginner").toLowerCase())) return;
        if (topicFilter.length && !topicFilter.some((topic) => tags.includes(topic))) return;
        if (!matchesDuration(course.duration_days, durationFilter)) return;
        if (selectedPrice === "free" && !isFree) return;
        if (selectedPrice === "paid" && isFree) return;

        items.push({
          item_type: "course",
          id: Number(course.id),
          slug: course.slug || String(course.id),
          title: course.title || "Course",
          short_description: description,
          level: course.level || course.difficulty_level || "Beginner",
          price: course.price || 0,
          tags,
          duration_label: course.duration_label,
          duration_days: course.duration_days,
          hero_background_image: course.hero_background_image,
          background_image: course.hero_background_image,
          image: course.image,
        });
      });
    }

    if (params.sort === "price_asc") items.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    else if (params.sort === "price_desc") items.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    else items.sort((a, b) => (a.item_type === b.item_type ? a.title.localeCompare(b.title) : a.item_type === "pathway" ? -1 : 1));

    return {
      count: items.length,
      page: pageNumber,
      page_size: pageSize,
      results: items.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    };
  };

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

  useEffect(() => {
    const fetchInternshipStatus = async () => {
      try {
        const response = await publicApi.get("/api/internship/status/");
        setInternshipStatus(response.data);
      } catch (error) {
        console.error("Failed to load internship status:", error);
        setInternshipStatus(null);
      }
    };

    const fetchOpenInternship = async () => {
      try {
        const response = await publicApi.get("/api/internships/");
        const internships: InternshipItem[] = Array.isArray(response.data) ? response.data : [];
        const activeInternship =
          internships.find((internship) => internship.published === true && internship.finished !== true) || null;
        setOpenInternship(activeInternship);
      } catch (error) {
        console.error("Failed to load open internships:", error);
        setOpenInternship(null);
      }
    };

    fetchInternshipStatus();
    fetchOpenInternship();
  }, []);

  useEffect(() => {
    const fetchFeaturedPathways = async () => {
      try {
        const response = await publicApi.get("/api/catalog/", {
          params: {
            type: "pathway",
            page: 1,
            page_size: 50,
            sort: "popular",
          },
        });
        const results = Array.isArray(response.data?.results) ? response.data.results : [];
        setFeaturedPathways(keepPublishedPathways(results));
      } catch (error) {
        console.error("Failed to load highlighted pathways:", error);
        const fallback = await fetchLegacyCatalog({
          type: "pathway",
          page: 1,
          page_size: 50,
          sort: "popular",
        });
        setFeaturedPathways(keepPublishedPathways(fallback.results));
      }
    };

    fetchFeaturedPathways();
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

      try {
        const response = await publicApi.get("/api/catalog/", { params });
        const results = Array.isArray(response.data?.results) ? keepPublishedPathways(response.data.results) : [];
        setData({
          ...response.data,
          count: response.data?.count ?? results.length,
          page: response.data?.page ?? page,
          page_size: response.data?.page_size ?? PAGE_SIZE,
          results,
        });
      } catch (error) {
        console.error("Failed to load catalog:", error);
        try {
          const fallbackData = await fetchLegacyCatalog(params);
          const results = keepPublishedPathways(fallbackData.results);
          setData({
            ...fallbackData,
            count: results.length,
            results,
          });
        } catch (fallbackError) {
          console.error("Failed to load fallback catalog:", fallbackError);
          setData({ count: 0, page: 1, page_size: PAGE_SIZE, results: [] });
        }
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

  const resolveMediaUrl = (src?: string) => {
    if (!src) return "";
    if (/^https?:\/\//i.test(src)) return src;
    if (src.startsWith("/") && !src.startsWith("/media/")) return src;
    const baseUrl = publicApi.defaults.baseURL || "";
    try {
      return new URL(src, baseUrl).toString();
    } catch {
      return src;
    }
  };

  const randomPathway = useMemo(() => {
    const pathways = featuredPathways.length
      ? featuredPathways
      : data.results.filter((item) => item.item_type === "pathway");
    if (!pathways.length) return null;
    return pathways[Math.floor(Math.random() * pathways.length)];
  }, [data.results, featuredPathways]);

  const highlightedItem = useMemo(() => {
    const statusOpen =
      internshipStatus?.is_open === true ||
      internshipStatus?.open === true ||
      internshipStatus?.status?.toLowerCase() === "open";

    if (statusOpen || openInternship) {
      const internship = openInternship || internshipStatus;
      return {
        type: "internship" as const,
        title: internship?.title || "Open Internship",
        description:
          internship?.short_description ||
          internship?.summary ||
          internship?.overview ||
          internship?.description ||
          "Fast, fun, and complete bioinformatics training.",
        image:
          internship?.hero_background_image ||
          internship?.background_image ||
          internship?.int_image ||
          internship?.image ||
          "/internships.jpg",
        href: "/internship",
      };
    }

    if (!randomPathway) return null;
    return {
      type: "pathway" as const,
      title: randomPathway.title,
      description: randomPathway.short_description || "Discover how prepared you are for a career in bioinformatics.",
      image:
        randomPathway.hero_background_image ||
        randomPathway.background_image ||
        randomPathway.int_image ||
        randomPathway.image ||
        randomPathway.cover_image ||
        randomPathway.thumbnail ||
        "/courses.jpg",
      href: `/pathway/${randomPathway.id}`,
    };
  }, [internshipStatus, openInternship, randomPathway]);

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Build the skills for your dream career in Biotech</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            High-demand skill development for modern biotech careers.
          </p>
        </section>
        {/* Highlighted Pathway or Internship */}
        {highlightedItem ? (
          <section className="mx-auto mt-8 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-[minmax(260px,1fr)_1fr] md:items-center md:gap-10">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border-2 border-gray-800/70 bg-gray-100 dark:border-hb-green/50 dark:bg-[#0d2a22]">
              <Image
                src={resolveMediaUrl(highlightedItem.image)}
                alt={highlightedItem.title}
                fill
                sizes="(min-width: 768px) 420px, 100vw"
                className="object-cover"
                priority={highlightedItem.type === "internship"}
                unoptimized
              />
              <div className="absolute inset-0 bg-gray-200/15" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xl font-extrabold uppercase text-black md:text-2xl">
                <span className="h-4 w-4 rounded-full bg-[#ffc72c] md:h-5 md:w-5" />
                <span className="text-white">Featured</span>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <h2 className="max-w-[520px] text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl dark:text-white">
                {highlightedItem.title}
              </h2>
              <p className="mt-5 max-w-[420px] text-lg leading-snug text-gray-800 dark:text-gray-200">
                {highlightedItem.description}
              </p>
              <Link href={highlightedItem.href} className="mt-8 text-lg font-bold text-hb-green underline underline-offset-2">
                Explore -&gt;
              </Link>
            </div>
          </section>
        ) : null}

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
