export type AfrophytoPhytochemical = {
  id: number;
  compound_name: string;
  compound_class: string;
  smiles: string;
  pubchem_cid: string;
  inchikey: string;
  molecular_weight: number | null;
  logp: number | null;
  h_donors: number | null;
  h_acceptors: number | null;
  lipinski_pass: boolean | null;
};

export type AfrophytoLiterature = {
  id: number;
  title: string;
  authors: string;
  journal: string;
  doi: string;
};

export type AfrophytoPlant = {
  id: number;
  scientific_name: string;
  common_names: string;
  description: string;
  image: string;
  status: string;
  phytochemicals: AfrophytoPhytochemical[];
  literature: AfrophytoLiterature[];
};

export const AFROPHYTO_DUMMY_API_URL = "/api/afrophyto/plants";
export const AFROPHYTO_REMOTE_PLANTS_URL =
  process.env.AFROPHYTO_BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_AFROPHYTO_BACKEND_API_URL ||
  "http://165.22.124.117/api/plants/";

const EMPTY_PLANT: AfrophytoPlant = {
  id: 0,
  scientific_name: "",
  common_names: "",
  description: "",
  image: "",
  status: "",
  phytochemicals: [],
  literature: [],
};

const asText = (value: unknown): string => (typeof value === "string" ? value.trim() : "");
const asNumberOrNull = (value: unknown): number | null =>
  typeof value === "number" && Number.isFinite(value) ? value : null;
const asBoolOrNull = (value: unknown): boolean | null => (typeof value === "boolean" ? value : null);

export function normalizePhytochemical(raw: any): AfrophytoPhytochemical {
  return {
    id: Number(raw?.id || 0),
    compound_name: asText(raw?.compound_name),
    compound_class: asText(raw?.compound_class),
    smiles: asText(raw?.smiles),
    pubchem_cid: asText(raw?.pubchem_cid),
    inchikey: asText(raw?.inchikey),
    molecular_weight: asNumberOrNull(raw?.molecular_weight),
    logp: asNumberOrNull(raw?.logp),
    h_donors: asNumberOrNull(raw?.h_donors),
    h_acceptors: asNumberOrNull(raw?.h_acceptors),
    lipinski_pass: asBoolOrNull(raw?.lipinski_pass),
  };
}

export function normalizeLiterature(raw: any): AfrophytoLiterature {
  return {
    id: Number(raw?.id || 0),
    title: asText(raw?.title),
    authors: asText(raw?.authors),
    journal: asText(raw?.journal),
    doi: asText(raw?.doi),
  };
}

export function normalizePlant(raw: any): AfrophytoPlant {
  const contributor = raw?.contributor || {};
  const commonNames =
    asText(raw?.common_names) ||
    asText(raw?.common_name) ||
    asText(contributor?.common_name) ||
    asText(contributor?.scientific_name) ||
    asText(raw?.scientific_name) ||
    "Unnamed Plant";
  const scientificName =
    asText(raw?.scientific_name) || asText(contributor?.scientific_name) || "Unknown Scientific Name";
  const description =
    asText(raw?.description) || asText(raw?.plant_description) || asText(contributor?.plant_description);
  const image = asText(raw?.image) || asText(contributor?.image);
  const status = asText(raw?.status) || asText(contributor?.status);
  const phytochemicals = Array.isArray(raw?.phytochemicals) ? raw.phytochemicals.map(normalizePhytochemical) : [];
  const literature = Array.isArray(raw?.literature) ? raw.literature.map(normalizeLiterature) : [];

  return {
    ...EMPTY_PLANT,
    id: Number(raw?.id || 0),
    scientific_name: scientificName,
    common_names: commonNames,
    description,
    image,
    status,
    phytochemicals,
    literature,
  };
}

export function extractPlantsArray(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.plants)) return payload.plants;
  if (payload && typeof payload === "object" && Number(payload?.id)) return [payload];
  return [];
}

export const AFROPHYTO_MOCK_PLANTS: AfrophytoPlant[] = [
  normalizePlant({
    id: 1,
    scientific_name: "Andrographis paniculata",
    common_names: "King of Bitter (Nigerian)",
    description:
      'Andrographis paniculata (commonly known as "King of Bitters") is a medicinal herb widely profiled in phytochemical studies.',
    image: "http://165.22.124.117/media/contributors/plant_G4D1OtO.jpg",
    status: "approved",
    phytochemicals: [
      {
        id: 1,
        compound_name: "andrographolide",
        compound_class: "Terpenoids",
        smiles: "CC12CCC...",
        pubchem_cid: "5318517",
        inchikey: "BOJKULTULYSRAS-UHFFFAOYSA-N",
        molecular_weight: 350.455,
        logp: 1.9626,
        h_donors: 3,
        h_acceptors: 5,
        lipinski_pass: true,
      },
    ],
    literature: [
      {
        id: 1,
        title: "Andrographis paniculata: A review of phytochemistry and pharmacological activities",
        authors: "Biswas et al.",
        journal: "Journal of Ethnopharmacology",
        doi: "10.1016/j.jff.2017.06.012",
      },
    ],
  }),
  normalizePlant({
    id: 2,
    scientific_name: "Azadirachta indica",
    common_names: "Neem",
    description: "A medicinal tree used for skin, oral, and immune support applications.",
    status: "approved",
    phytochemicals: [
      {
        id: 2,
        compound_name: "Azadirachtin",
        compound_class: "Terpenoids",
        smiles: "",
        pubchem_cid: "",
        inchikey: "",
        molecular_weight: null,
        logp: null,
        h_donors: null,
        h_acceptors: null,
        lipinski_pass: null,
      },
    ],
  }),
  normalizePlant({
    id: 3,
    scientific_name: "Moringa oleifera",
    common_names: "Moringa",
    description: "Nutrient-rich plant with broad dietary and medicinal use.",
    status: "approved",
  }),
];

export function getAfrophytoPlantById(plantId: number): AfrophytoPlant | undefined {
  return AFROPHYTO_MOCK_PLANTS.find((plant) => plant.id === plantId);
}
