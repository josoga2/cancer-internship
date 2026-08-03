import { ImageResponse } from "next/og";

type ProgramType = "course" | "pathway" | "internship";

type ProgramRecord = {
  id?: string | number;
  title?: string;
  level?: string;
  start_date?: string;
  hero_background_image?: string;
  thumbnail?: string;
  image?: string;
  int_image?: string;
};

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://hbapi.thehackbio.com/"
).replace(/\/$/, "");

const endpointByType: Record<ProgramType, string> = {
  course: "courses",
  pathway: "pathways",
  internship: "internships",
};

const labelByType: Record<ProgramType, string> = {
  course: "HACKBIO COURSE",
  pathway: "HACKBIO CAREER PATHWAY",
  internship: "HACKBIO INTERNSHIP",
};

const fallbackTitleByType: Record<ProgramType, string> = {
  course: "Bioinformatics Course",
  pathway: "Bioinformatics Career Pathway",
  internship: "Bioinformatics Internship",
};

const normalizeApiImage = (value: string | undefined, fallback: string) => {
  if (!value) return fallback;
  if (/^https?:\/\//i.test(value)) return value;
  return `${API_BASE_URL}/${value.replace(/^\//, "")}`;
};

const getPrograms = async (programType: ProgramType) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/${endpointByType[programType]}/`,
      { next: { revalidate: 600 } }
    );
    if (!response.ok) return [];

    const payload = await response.json();
    if (Array.isArray(payload)) return payload as ProgramRecord[];
    if (Array.isArray(payload?.results)) return payload.results as ProgramRecord[];
    return [];
  } catch {
    return [];
  }
};

export async function createProgramOgImage({
  programType,
  programId,
  fallbackImage,
}: {
  programType: ProgramType;
  programId: string;
  fallbackImage: string;
}) {
  const programs = await getPrograms(programType);
  const program = programs.find(
    (item) => String(item.id) === String(programId)
  );

  const title = program?.title || fallbackTitleByType[programType];
  const backgroundImage = normalizeApiImage(
    program?.hero_background_image ||
      program?.thumbnail ||
      program?.image ||
      program?.int_image,
    fallbackImage
  );
  const secondaryText =
    programType === "internship"
      ? program?.start_date
        ? `Starts ${program.start_date}`
        : "Applications now open"
      : program?.level
        ? `${program.level} level`
        : programType === "course"
          ? "Project-based learning"
          : "Build job-ready skills";

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "1200px",
          height: "630px",
          overflow: "hidden",
          backgroundColor: "#08130d",
          color: "white",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <img
          src={backgroundImage}
          alt=""
          width="1200"
          height="630"
          style={{
            position: "absolute",
            inset: 0,
            width: "1200px",
            height: "630px",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(90deg, rgba(3,12,7,0.92) 0%, rgba(3,12,7,0.76) 52%, rgba(3,12,7,0.18) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "64px 72px 58px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "#27AE60",
                fontSize: "26px",
                fontWeight: 700,
              }}
            >
              HB
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              {labelByType[programType]}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "850px",
              gap: "26px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: title.length > 48 ? "58px" : "70px",
                lineHeight: 1.04,
                fontWeight: 700,
                letterSpacing: "0",
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                fontSize: "28px",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  display: "flex",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: "#facc15",
                  boxShadow: "0 0 18px rgba(250,204,21,0.9)",
                }}
              />
              {secondaryText}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=600, s-maxage=600",
      },
    }
  );
}
