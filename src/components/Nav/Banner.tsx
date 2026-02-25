"use client";
import React, { useEffect, useRef, useState } from "react";

// components/CourseBanner.tsx
export default function Banner() {
  const [visible, setVisible] = useState(true);
  const bannerRef = useRef<HTMLDivElement | null>(null);

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

  if (!visible) return null;

  return (
    <div ref={bannerRef} className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white text-center py-2 px-4 text-sm relative">
      <button
        className="absolute right-4 top-2 text-white hover:text-gray-200 text-lg font-bold"
        onClick={() => setVisible(false)}
        aria-label="Close banner"
      >
        &times;
      </button>
      <div>
        <a href="https://forms.gle/MPkai287qnBqgRSn6" className=" font-medium hover:text-gray-100">
          <span className="font-semibold">New Internship: </span> 
          <p className="underline inline-block">
            AI in Genomics | Starts April 18, 2026 | Enjoy 50% early bird discount now. 
          </p>
        </a>
      </div>
    </div>
  );
}
