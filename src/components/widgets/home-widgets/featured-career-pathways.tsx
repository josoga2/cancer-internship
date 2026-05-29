"use client";

import { useEffect, useMemo, useState } from "react";
import publicApi from "@/publicApi";

type ProgramItem = {
  id?: number | string;
  title?: string;
  description?: string;
  overview?: string;
  summary?: string;
  hero_background_image?: string;
  int_image?: string;
  image?: string;
  thumbnail?: string;
  published?: boolean;
  is_active?: boolean;
  itemType: "internship" | "pathway";
};

const fallbackImages = [
  "/gradients/Rectangle_2.png",
  "/gradients/Rectangle_3.png",
  "/gradients/Rectangle_5.png",
];

const cleanWords = (value?: string | null, limit = 35) => {
  const text = (value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "Build practical bioinformatics workflows with project-based training, mentorship, and real datasets from modern life science research.";
  const words = text.split(" ").filter(Boolean);
  return words.length <= limit ? text : `${words.slice(0, limit).join(" ")}...`;
};

const programImage = (item: ProgramItem, index = 0) =>
  item.hero_background_image || item.int_image || item.thumbnail || item.image || fallbackImages[index % fallbackImages.length];

const shuffle = <T,>(items: T[]) => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
};

export default function FeaturedCareerPathways() {
  const [items, setItems] = useState<ProgramItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const [internshipsResponse, pathwaysResponse] = await Promise.all([
          publicApi.get("/api/internships/"),
          publicApi.get("/api/pathways/"),
        ]);

        const internships: ProgramItem[] = Array.isArray(internshipsResponse.data)
          ? internshipsResponse.data.map((item: Omit<ProgramItem, "itemType">) => ({
              ...item,
              itemType: "internship",
            }))
          : [];

        const pathways: ProgramItem[] = Array.isArray(pathwaysResponse.data)
          ? pathwaysResponse.data.map((item: Omit<ProgramItem, "itemType">) => ({
              ...item,
              itemType: "pathway",
            }))
          : [];

        const featured = shuffle(
          [...internships, ...pathways].filter((item) => item.published !== false && item.is_active !== false)
        ).slice(0, 3);

        setItems(featured);
        setActiveIndex(0);
      } catch (error) {
        setItems([]);
      }
    };

    fetchFeatured();
  }, []);

  const activeItem = items[activeIndex];
  const activeImage = useMemo(
    () => (activeItem ? programImage(activeItem, activeIndex) : fallbackImages[0]),
    [activeItem, activeIndex]
  );
  const activeDescription = cleanWords(activeItem?.description || activeItem?.overview || activeItem?.summary);
  const activeHref =
    activeItem?.itemType === "pathway" && activeItem.id
      ? `/pathway/${activeItem.id}`
      : "/internship";

  if (!items.length) return null;

  return (
    <section className="w-full py-12">
      <div className="mx-auto w-full max-w-5xl px-5">
        <h2 className="text-3xl font-medium leading-tight tracking-normal text-gray-900">
          Featured Career <span className="text-hb-green">PATHS</span>
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-[250px_1fr] md:items-stretch md:gap-12">
          <div className="flex gap-4 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0">
            {items.map((item, index) => {
              const image = programImage(item, index);
              const selected = activeIndex === index;
              return (
                <button
                  key={`${item.itemType}-${item.id || index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative h-[132px] min-w-[220px] overflow-hidden rounded-md border-2 text-left transition md:h-[132px] md:w-full md:min-w-0 ${
                    selected ? "border-yellow-400" : "border-hb-green"
                  }`}
                  aria-label={`Show ${item.title || "featured pathway"}`}
                >
                  <img src={image} alt="" className="h-full w-full object-cover" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-3 pb-3 pt-8 text-base font-medium leading-tight text-white">
                    {item.title || "Featured Pathway"}
                  </span>
                </button>
              );
            })}
          </div>

          <article
            className="relative min-h-[430px] overflow-hidden rounded-sm border-4 border-sky-500 bg-cover bg-center p-8 md:p-12"
            style={{ backgroundImage: `url(${activeImage})` }}
          >
            <div className="absolute inset-0 bg-white/62" />
            <div className="relative z-10 flex h-full max-w-[620px] flex-col justify-center">
              <h3 className="text-4xl font-medium leading-tight tracking-normal text-black">
                {activeItem?.title || "Become a Genome Data Scientist"}
              </h3>
              <p className="mt-8 text-base leading-snug text-gray-900">
                {activeDescription}
              </p>

              <div className="mt-7 flex items-center gap-3 text-base font-medium text-gray-900">
                <span className="h-5 w-5 rounded-full bg-yellow-400 shadow-[0_0_0_0_rgba(250,204,21,0.8)] animate-pulse" />
                <span>Currently Open  </span>
              </div>

              <a
                href={activeHref}
                className="mt-7 inline-flex w-fit items-center text-xl font-medium  text-gray-900 transition hover:text-hb-green"
              >
                Explore Career Path ↗
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
