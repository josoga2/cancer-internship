"use client";
import React, { useEffect, useRef, useState } from "react";
import publicApi from "@/publicApi";

type SiteBanner = {
  id: number;
  prefix?: string | null;
  text: string;
  link?: string | null;
  link_label?: string | null;
  background_from?: string | null;
  background_to?: string | null;
  text_color?: string | null;
  is_dismissible?: boolean;
  open_in_new_tab?: boolean;
};

// components/CourseBanner.tsx
export default function Banner() {
  const [visible, setVisible] = useState(false);
  const [banner, setBanner] = useState<SiteBanner | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchBanner = async () => {
      try {
        const response = await publicApi.get("/api/site-banner/");
        const activeBanner = response.data?.banner || null;
        if (!ignore) {
          setBanner(activeBanner);
          setVisible(Boolean(activeBanner));
        }
      } catch (error) {
        console.error("Failed to load site banner:", error);
        if (!ignore) {
          setBanner(null);
          setVisible(false);
        }
      }
    };

    fetchBanner();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const updateOffset = () => {
      const height = visible ? bannerRef.current?.offsetHeight ?? 0 : 0;
      document.documentElement.style.setProperty("--hb-banner-offset", `${height}px`);
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => {
      window.removeEventListener("resize", updateOffset);
      document.documentElement.style.setProperty("--hb-banner-offset", "0px");
    };
  }, [visible]);

  if (!visible || !banner) return null;

  const bannerText = (
    <>
      {banner.prefix ? <span className="font-semibold">{banner.prefix}: </span> : null}
      <span className="underline">{banner.text}</span>
      {banner.link_label ? <span className="ml-1 font-semibold no-underline">{banner.link_label}</span> : null}
    </>
  );

  return (
    <div
      ref={bannerRef}
      className="relative w-full px-4 py-2 text-center text-sm"
      style={{
        color: banner.text_color || "#ffffff",
        background: `linear-gradient(90deg, ${banner.background_from || "#3b82f6"}, ${banner.background_to || "#9333ea"})`,
      }}
    >
      {banner.is_dismissible !== false ? (
        <button
          className="absolute right-4 top-2 text-lg font-bold opacity-90 hover:opacity-100"
          onClick={() => setVisible(false)}
          aria-label="Close banner"
        >
          &times;
        </button>
      ) : null}
      {banner.link ? (
        <a
          href={banner.link}
          className="font-medium hover:opacity-90"
          target={banner.open_in_new_tab ? "_blank" : undefined}
          rel={banner.open_in_new_tab ? "noreferrer" : undefined}
        >
          {bannerText}
        </a>
      ) : (
        <p className="inline-block font-medium">{bannerText}</p>
      )}
    </div>
  );
}
