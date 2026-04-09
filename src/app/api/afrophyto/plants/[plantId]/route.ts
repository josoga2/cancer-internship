import { NextResponse } from "next/server";
import {
  AFROPHYTO_REMOTE_PLANTS_URL,
  extractPlantsArray,
  normalizePlant,
  getAfrophytoPlantById,
} from "@/app/afrophyto/mock-data";

export const dynamic = "force-dynamic";

function withTrailingSlash(url: string): string {
  return url.endsWith("/") ? url : `${url}/`;
}

export async function GET(_: Request, { params }: { params: { plantId: string } }) {
  const plantId = Number(params.plantId);
  if (!Number.isFinite(plantId)) {
    return NextResponse.json({ ok: false, error: "Invalid plant id" }, { status: 400 });
  }

  const baseUrl = withTrailingSlash(AFROPHYTO_REMOTE_PLANTS_URL);

  try {
    const detailResponse = await fetch(`${baseUrl}${plantId}/`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (detailResponse.ok) {
      const detailPayload = await detailResponse.json();
      const detailPlant = normalizePlant(detailPayload);
      if (detailPlant.id > 0) {
        return NextResponse.json({ ok: true, source: "remote-detail", plant: detailPlant });
      }
    }

    const listResponse = await fetch(baseUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!listResponse.ok) {
      throw new Error(`Remote list API returned ${listResponse.status}`);
    }
    const listPayload = await listResponse.json();
    const plants = extractPlantsArray(listPayload).map(normalizePlant);
    const plant = plants.find((item) => Number(item.id) === plantId);
    if (!plant) {
      return NextResponse.json({ ok: false, error: "Plant not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, source: "remote-list", plant });
  } catch {
    const plant = getAfrophytoPlantById(plantId);
    if (!plant) {
      return NextResponse.json({ ok: false, error: "Plant not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, source: "mock", plant });
  }
}
