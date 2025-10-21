"use client";
import React, { useState } from "react";

// components/CourseBanner.tsx
export default function Banner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 px-4 text-sm relative">
      <button
        className="absolute right-4 top-2 text-white hover:text-gray-200 text-lg font-bold"
        onClick={() => setVisible(false)}
        aria-label="Close banner"
      >
        &times;
      </button>
      <div>
        <a href="/internship" className=" font-medium hover:text-gray-100">
          <span className="font-semibold">Our event calendar will be realeased Nov. 1, 2025. </span>
          Watch this space!{" "}
          <p className="underline inline-block">
            {/*Enroll For the Internship {"(Closes Oct 26)"}*/}
          </p>
        </a>
      </div>
    </div>
  );
}
