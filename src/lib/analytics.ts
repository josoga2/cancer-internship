export type AnalyticsParams = Record<string, string | number | boolean | null | undefined | AnalyticsItem[]>;

export type AnalyticsItem = {
  item_id: string;
  item_name: string;
  item_category: "course" | "pathway" | "internship" | "subscription" | string;
  item_variant?: string;
  price?: number;
  quantity?: number;
};

export type PurchaseTransaction = {
  transaction_id: string;
  value: number;
  currency: string;
  items: AnalyticsItem[];
};

declare global {
  interface Window {
    gtag?: (command: "event" | "config" | "js", targetId: string | Date, params?: AnalyticsParams) => void;
    dataLayer?: unknown[];
  }
}

const cleanParams = (params: AnalyticsParams = {}) =>
  Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== null));

const getGtag = () => {
  if (typeof window === "undefined") return null;
  if (typeof window.gtag === "function") return window.gtag;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function queuedGtag() {
    window.dataLayer?.push(arguments);
  };
  return window.gtag;
};

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", eventName, cleanParams(params));
}

export function trackPageView(pagePath: string, pageTitle?: string) {
  if (typeof window === "undefined") return;
  trackEvent("page_view", {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: pageTitle || document.title,
  });
}

export function trackButtonClick(name: string, location: string, extraParams?: AnalyticsParams) {
  trackEvent("button_click", { button_name: name, location, ...extraParams });
}

export function trackFormStart(formName: string, location?: string) {
  trackEvent("form_start", { form_name: formName, location });
}

export function trackFormSubmit(formName: string, location?: string) {
  trackEvent("form_submit", { form_name: formName, location });
}

export function trackFormError(formName: string, location?: string, errorType = "validation_or_server_error") {
  trackEvent("form_error", { form_name: formName, location, error_type: errorType });
}

export function trackRegistrationStart(source?: string) {
  trackEvent("sign_up_start", { source });
}

export function trackRegistrationComplete(method = "email") {
  trackEvent("sign_up_complete", { method });
  trackEvent("sign_up", { method });
}

export function trackRegistrationError(errorType = "registration_failed") {
  trackEvent("registration_error", { error_type: errorType });
}

export function trackApplicationStart(programName?: string) {
  trackEvent("application_start", { program_name: programName });
}

export function trackApplicationSubmit(programName?: string) {
  trackEvent("application_submit", { program_name: programName });
}

export function trackLoginAttempt() {
  trackEvent("login_attempt");
}

export function trackLoginSuccess() {
  trackEvent("login_success");
  trackEvent("login", { method: "password" });
}

export function trackLoginError(errorType = "login_failed") {
  trackEvent("login_error", { error_type: errorType });
}

export function trackPasswordResetStart() {
  trackEvent("password_reset_start");
}

export function trackCourseView(course: { id?: string | number; title?: string; level?: string; price?: number }) {
  const item = toAnalyticsItem(course, "course");
  trackEvent("course_view", { course_id: item.item_id, course_name: item.item_name });
  trackEvent("view_item", { currency: "USD", value: item.price || 0, items: [item] });
}

export function trackPathwayView(pathway: { id?: string | number; title?: string; level?: string; price?: number }) {
  const item = toAnalyticsItem(pathway, "pathway");
  trackEvent("pathway_view", { pathway_id: item.item_id, pathway_name: item.item_name });
  trackEvent("view_item", { currency: "USD", value: item.price || 0, items: [item] });
}

export function trackInternshipView(internship: { id?: string | number; title?: string; level?: string; price?: number }) {
  const item = toAnalyticsItem(internship, "internship");
  trackEvent("internship_view", { internship_id: item.item_id, internship_name: item.item_name });
  trackEvent("view_item", { currency: "USD", value: item.price || 0, items: [item] });
}

export function trackCourseStart(course: { id?: string | number; title?: string }) {
  trackEvent("course_start", { course_id: String(course.id || ""), course_name: course.title || "Course" });
}

export function trackModuleComplete(course: { id?: string | number; title?: string }, module: { id?: string | number; title?: string }) {
  trackEvent("module_complete", {
    course_id: String(course.id || ""),
    course_name: course.title || "Course",
    module_id: String(module.id || ""),
    module_name: module.title || "Module",
  });
}

export function trackCurriculumClick(page: string, programName?: string) {
  trackEvent("curriculum_click", { page, program_name: programName });
}

export function trackContactClick(method: string, location?: string) {
  trackEvent("contact_click", { method, location });
}

export function trackPricingView(plan?: string) {
  trackEvent("pricing_view", { plan });
}

export function trackCheckoutStart(items: AnalyticsItem[], value = 0, currency = "USD") {
  trackEvent("begin_checkout", { currency, value, items });
}

export function trackAddPaymentInfo(paymentType: string, items: AnalyticsItem[], value = 0, currency = "USD") {
  trackEvent("add_payment_info", { payment_type: paymentType, currency, value, items });
}

export function trackPurchase(transaction: PurchaseTransaction) {
  trackEvent("purchase", transaction);
}

export function trackLeadGenerated(formName: string, source?: string) {
  trackEvent("generate_lead", { form_name: formName, source });
}

export function trackFaqExpand(question: string, location?: string) {
  trackEvent("faq_expand", { question, location });
}

export function trackOutboundClick(url: string, location?: string) {
  trackEvent("outbound_click", { link_url: url, location });
}

export function trackCheckoutError(errorType = "checkout_failed") {
  trackEvent("checkout_error", { error_type: errorType });
}

export function toAnalyticsItem(
  item: { id?: string | number; title?: string; name?: string; level?: string; price?: string | number },
  category: AnalyticsItem["item_category"],
  quantity = 1
): AnalyticsItem {
  return {
    item_id: `${category}_${String(item.id || "unknown")}`,
    item_name: item.title || item.name || String(category),
    item_category: category,
    item_variant: item.level,
    price: Number(item.price || 0),
    quantity,
  };
}
