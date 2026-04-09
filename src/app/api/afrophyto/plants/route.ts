import { NextResponse } from "next/server";
import {
  AFROPHYTO_MOCK_PLANTS,
  AFROPHYTO_REMOTE_PLANTS_URL,
  extractPlantsArray,
  normalizePlant,
} from "@/app/afrophyto/mock-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(AFROPHYTO_REMOTE_PLANTS_URL, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Remote API returned ${response.status}`);
    }

    const payload = await response.json();
    const plants = extractPlantsArray(payload).map(normalizePlant).filter((plant) => Number(plant.id) > 0);

    if (!plants.length) {
      throw new Error("Remote API returned empty plant list");
    }

    return NextResponse.json({
      ok: true,
      source: "remote",
      count: plants.length,
      plants,
    });
  } catch (error) {
    return NextResponse.json({
      ok: true,
      source: "mock",
      fallback_reason: error instanceof Error ? error.message : "Unknown error",
      count: AFROPHYTO_MOCK_PLANTS.length,
      plants: AFROPHYTO_MOCK_PLANTS,
    });
  }
}
