"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  "8ut8S9IVCas",
  "T7h0ewqXglA",
  "8lgppvYQYuc",
  "a_kVIibNl7c",
  "81nld1FtpKw",
];

export default function TestimonialVideoCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector<HTMLElement>("[data-card]");
    const step = firstCard ? firstCard.offsetWidth + 24 : 420;
    track.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full pt-6">
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
      >
        {videos.map((id) => (
          <div
            key={id}
            data-card
            className="min-w-[280px] sm:min-w-[360px] md:min-w-[520px] snap-start bg-hb-lightgreen border border-hb-lightgreen rounded-2xl overflow-hidden shadow-sm"
          >
            <div className="w-full h-[180px] sm:h-[220px] md:h-[280px]">
              <iframe
                src={`https://www.youtube.com/embed/${id}?rel=0`}
                title="HackBio testimonial video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-700">
                Learner story from HackBio programs.
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => handleScroll("left")}
        className="hidden md:flex items-center justify-center absolute -left-5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => handleScroll("right")}
        className="hidden md:flex items-center justify-center absolute -right-5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
