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
  ends_at?: string | null;
};

const getTimeRemaining = (endsAt?: string | null) => {
  if (!endsAt) return null;

  const endTime = new Date(endsAt).getTime();
  if (Number.isNaN(endTime)) return null;

  return Math.max(0, endTime - Date.now());
};

const formatTimeRemaining = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
};

export default function Banner() {
  const [visible, setVisible] = useState(false);
  const [banner, setBanner] = useState<SiteBanner | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
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
    if (!banner?.ends_at) {
      setTimeRemaining(null);
      return;
    }

    const updateCountdown = () => {
      const remaining = getTimeRemaining(banner.ends_at);
      setTimeRemaining(remaining);

      if (remaining === 0) {
        setVisible(false);
      }
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, [banner?.ends_at]);

  useEffect(() => {
    const updateOffset = () => {
      const height = visible ? bannerRef.current?.offsetHeight ?? 0 : 0;
      document.documentElement.style.setProperty("--hb-banner-offset", `${height}px`);
    };

    updateOffset();
    const resizeObserver = new ResizeObserver(updateOffset);
    if (bannerRef.current) {
      resizeObserver.observe(bannerRef.current);
    }
    window.addEventListener("resize", updateOffset);
    return () => {
      resizeObserver.disconnect();
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
      className="relative flex min-h-16 w-full items-center justify-center px-10 py-3 text-center text-sm sm:px-12"
      style={{
        color: banner.text_color || "#ffffff",
        background: `linear-gradient(90deg, ${banner.background_from || "#3b82f6"}, ${banner.background_to || "#9333ea"})`,
      }}
    >
      {banner.is_dismissible !== false ? (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-bold opacity-90 hover:opacity-100"
          onClick={() => setVisible(false)}
          aria-label="Close banner"
        >
          &times;
        </button>
      ) : null}
      <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-5">
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

        {timeRemaining !== null && timeRemaining > 0 ? (
          <div className="flex items-center gap-1.5" aria-label="Offer countdown">
            {Object.entries(formatTimeRemaining(timeRemaining)).map(([label, value]) => (
              <span
                key={label}
                className="min-w-11 rounded-sm bg-black/20 px-1.5 py-1 text-center leading-tight"
              >
                <span className="block text-sm font-semibold tabular-nums">
                  {String(value).padStart(2, "0")}
                </span>
                <span className="block text-[9px] uppercase">{label.slice(0, 1)}</span>
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
