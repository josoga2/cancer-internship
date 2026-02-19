"use client";
import React, { useState } from "react";

// components/CourseBanner.tsx
export default function Banner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white text-center py-2 px-4 text-sm relative">
      <button
        className="absolute right-4 top-2 text-white hover:text-gray-200 text-lg font-bold"
        onClick={() => setVisible(false)}
        aria-label="Close banner"
      >
        &times;
      </button>
      <div>
        <a href="https://forms.gle/MPkai287qnBqgRSn6" className=" font-medium hover:text-gray-100">
          <span className="font-semibold">Graduate School Event: </span> 
          <p className="underline inline-block">
            Join our upcoming webinar, 21st Feb, 2026 
          </p>
        </a>
      </div>
    </div>
  );
}
