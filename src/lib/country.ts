const TIMEZONE_COUNTRY_HINTS: Record<string, string> = {
  "Africa/Lagos": "NG",
  "Africa/Accra": "GH",
  "Africa/Johannesburg": "ZA",
  "Asia/Kolkata": "IN",
  "Europe/London": "GB",
  "Europe/Berlin": "DE",
  "Europe/Paris": "FR",
  "America/New_York": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Los_Angeles": "US",
};

export function detectBrowserCountry() {
  if (typeof window === "undefined") return "";

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (TIMEZONE_COUNTRY_HINTS[timezone]) return TIMEZONE_COUNTRY_HINTS[timezone];

  const locale = navigator.languages?.[0] || navigator.language || "";
  const localeRegion = locale.match(/[-_]([A-Z]{2})\b/i)?.[1]?.toUpperCase();
  if (localeRegion) return localeRegion;

  return "";
}

export function syncCountryQueryParam(country: string) {
  if (typeof window === "undefined") return;

  const countryCode = String(country || "").trim().toUpperCase();
  if (!countryCode) return;

  const url = new URL(window.location.href);
  if (url.searchParams.get("country")) return;

  url.searchParams.set("country", countryCode);
  window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
}

export function getCountryQueryParam() {
  if (typeof window === "undefined") return "";
  return new URL(window.location.href).searchParams.get("country")?.trim().toUpperCase() || "";
}
