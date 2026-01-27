"use client";
import React, { useState } from "react";

// components/CourseBanner.tsx
export default function Banner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white text-center py-0 px-4 text-sm relative">
      {/* <button
        className="absolute right-4 top-2 text-white hover:text-gray-200 text-lg font-bold"
        onClick={() => setVisible(false)}
        aria-label="Close banner"
      >
        &times;
      </button>
      <div>
        <a href="https://internship.thehackbio.com/blog/hackbio-2026" className=" font-medium hover:text-gray-100">
          <span className="font-semibold">AIxBio/Drugs 2026 🧬: Click here to see our list of upcoming internships  </span> 
          <p className="underline inline-block">
            {/*Enroll For the Internship {"(Closes Oct 26)"}
          </p>
        </a>
      </div> */}
    </div>
  );
}
