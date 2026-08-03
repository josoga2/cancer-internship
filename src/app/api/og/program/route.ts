import { NextRequest } from "next/server";

import { createProgramOgImage } from "@/lib/program-og-image";

export const runtime = "edge";

const PROGRAM_TYPES = new Set(["course", "pathway", "internship"]);

export async function GET(request: NextRequest) {
  const programType = request.nextUrl.searchParams.get("type") || "";
  const programId = request.nextUrl.searchParams.get("id") || "";

  if (!PROGRAM_TYPES.has(programType) || !/^\d+$/.test(programId)) {
    return new Response("Invalid program image request", { status: 400 });
  }

  return createProgramOgImage({
    programType: programType as "course" | "pathway" | "internship",
    programId,
    fallbackImage: new URL("/meta.png", request.nextUrl.origin).toString(),
  });
}
