"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Accordion } from "@radix-ui/react-accordion";
import { CreditCard, Wallet } from "lucide-react";
import NavbarPay from "@/components/Nav/navbar-pay";
import api from "@/api";

type CheckoutType = "course" | "pathway" | "internship" | "subscription";

type CatalogProgram = {
  id: number;
  title: string;
  description: string;
  price: string | number;
  mentorship_addon_price?: string | number;
};

type SubscriptionOffer = {
  id: number | null;
  name: string;
  price: string | number;
  duration_days: number;
  description: string;
  features: string[];
};

type DiscountInfo = {
  valid: boolean;
  code: string;
  percentage_off: number;
  original_price: number;
  discount_amount: number;
  final_price: number;
  message: string;
};

export default function CheckOutForm({
  plan,
  sourceType,
  programs,
  selectedProgram,
  allowProgramSelection,
  supportsMentorshipAddon,
  subscriptionOffer,
}: {
  plan: CheckoutType;
  sourceType: string;
  programs: CatalogProgram[];
  selectedProgram: CatalogProgram | null;
  allowProgramSelection: boolean;
  supportsMentorshipAddon: boolean;
  subscriptionOffer: SubscriptionOffer;
}) {
  const stripePromise = useMemo(
    () => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST || ""),
    []
  );

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState("");
  const [refCode, setRefCode] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [subscriptionLength, setSubscriptionLength] = useState("12 months");
  const [openPaymentMethod, setOpenPaymentMethod] = useState("card");
  const [loadedCheckoutKey, setLoadedCheckoutKey] = useState("");
  const [isCardCheckoutLoading, setIsCardCheckoutLoading] = useState(false);
  const [accessEmail, setAccessEmail] = useState("");
  const [isAccessEmailLocked, setIsAccessEmailLocked] = useState(false);
  const [purchaseOption, setPurchaseOption] = useState<"program" | "subscription">(
    plan === "subscription" ? "subscription" : "program"
  );
  const [includeMentorship, setIncludeMentorship] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<number>(selectedProgram?.id || programs?.[0]?.id || 0);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountInfo | null>(null);
  const [discountMessage, setDiscountMessage] = useState("");
  const [isDiscountLoading, setIsDiscountLoading] = useState(false);
  const checkoutRequestKeyRef = useRef("");

  useEffect(() => {
    if (plan === "subscription") {
      setPurchaseOption("subscription");
      setSelectedProgramId(0);
      return;
    }
    const fallbackProgramId = selectedProgram?.id || programs?.[0]?.id || 0;
    setSelectedProgramId(fallbackProgramId);
  }, [plan, allowProgramSelection, selectedProgram, programs]);

  const selectedProgramData = useMemo(
    () => programs.find((program) => Number(program.id) === Number(selectedProgramId)) || selectedProgram || programs?.[0] || null,
    [programs, selectedProgramId, selectedProgram]
  );

  const subscriptionMonthsMultiplier = useMemo(() => {
    if (subscriptionLength === "3 months") return 0.25;
    if (subscriptionLength === "6 months") return 0.5;
    return 1;
  }, [subscriptionLength]);

  const isSubscriptionCheckout = plan === "subscription" || purchaseOption === "subscription";
  const checkoutType: CheckoutType = isSubscriptionCheckout ? "subscription" : plan;
  const checkoutProgramId = isSubscriptionCheckout ? 0 : Number(selectedProgramData?.id || 0);

  const mentorshipAddonPrice = Number(selectedProgramData?.mentorship_addon_price || 20);
  const mentorshipEnabled = !isSubscriptionCheckout && supportsMentorshipAddon && includeMentorship;

  const baseProgramPrice = Number(selectedProgramData?.price || 0);
  const subscriptionPrice = Number(subscriptionOffer?.price || 0);
  const selectedPriceUsd = isSubscriptionCheckout
    ? subscriptionPrice * subscriptionMonthsMultiplier
    : baseProgramPrice + (mentorshipEnabled ? mentorshipAddonPrice : 0);
  const finalPriceUsd = appliedDiscount?.valid ? Number(appliedDiscount.final_price || 0) : selectedPriceUsd;

  const normalizedAccessEmail = accessEmail.trim().toLowerCase();
  const isAccessEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedAccessEmail);
  const canSelectProgram = isSubscriptionCheckout || checkoutProgramId > 0;
  const canInitiateCheckout = canSelectProgram && isAccessEmailValid;
  const hasUnappliedDiscountCode = discountCode.trim().length > 0 && discountCode.trim().toUpperCase() !== appliedDiscount?.code;

  const exchangeRateNaira = 1500;
  const exchangeRateRupee = 90;
  const exchangeRate = currency === "NGN" ? exchangeRateNaira : currency === "INR" ? exchangeRateRupee : 1;
  const totalPriceInCurrency = Number((finalPriceUsd * exchangeRate).toFixed(2));
  const originalPriceInCurrency = Number((selectedPriceUsd * exchangeRate).toFixed(2));
  const discountAmountInCurrency = Number(((appliedDiscount?.discount_amount || 0) * exchangeRate).toFixed(2));
  const shouldShowProgramSelector = !isSubscriptionCheckout && (allowProgramSelection || !selectedProgramData) && programs.length > 0;

  const checkoutPayload = useMemo(
    () => ({
      priceType: checkoutType,
      type: checkoutType,
      title: isSubscriptionCheckout ? subscriptionOffer.name : selectedProgramData?.title || "",
      desc: isSubscriptionCheckout ? subscriptionOffer.description : selectedProgramData?.description || "",
      progId: checkoutProgramId,
      id: checkoutProgramId,
      sourceType,
      subscriptionLength,
      includeMentorship: mentorshipEnabled,
      accessEmail: normalizedAccessEmail,
      discount_code: appliedDiscount?.valid ? appliedDiscount.code : "",
    }),
    [
      checkoutType,
      isSubscriptionCheckout,
      subscriptionOffer.name,
      subscriptionOffer.description,
      selectedProgramData?.title,
      selectedProgramData?.description,
      checkoutProgramId,
      sourceType,
      subscriptionLength,
      mentorshipEnabled,
      normalizedAccessEmail,
      appliedDiscount?.valid,
      appliedDiscount?.code,
    ]
  );
  const checkoutKey = useMemo(() => JSON.stringify(checkoutPayload), [checkoutPayload]);

  const paypalPayload = useMemo(
    () => ({
      ...checkoutPayload,
      refCode,
    }),
    [checkoutPayload, refCode]
  );

  const createCheckout = useCallback(async () => {
    if (!canInitiateCheckout) return;
    if (clientSecret && loadedCheckoutKey === checkoutKey) return;
    if (checkoutRequestKeyRef.current === checkoutKey) return;

    checkoutRequestKeyRef.current = checkoutKey;
    setIsCardCheckoutLoading(true);
    setClientSecret(null);
    setCheckoutError("");
    try {
      const res = await api.post("/api/create-checkout/", checkoutPayload);
      if (res.status === 200) {
        if (res.data?.enrolled) {
          window.alert(res.data?.detail || "You have been enrolled successfully.");
          window.location.href = res.data?.redirect_path || "/dashboard";
          return;
        }
        if (res.data?.no_payment_required) {
          window.alert("You already have enough access for this tier. No additional payment is needed.");
          setClientSecret(null);
          setCheckoutError("");
          return;
        }
        setClientSecret(res.data.client_secret);
        setLoadedCheckoutKey(checkoutKey);
        setCheckoutError("");
      }
    } catch (error: any) {
      checkoutRequestKeyRef.current = "";
      setClientSecret(null);
      setLoadedCheckoutKey("");
      setCheckoutError(
        error?.response?.data?.error ||
          error?.response?.data?.detail ||
          "Card checkout could not be loaded. Please try again."
      );
      if (error?.response?.status === 401 || error?.response?.data?.login_required) {
        window.alert(error?.response?.data?.detail || "Please login or create an account first.");
        window.location.href = error?.response?.data?.redirect_path || "/login";
      }
    } finally {
      setIsCardCheckoutLoading(false);
    }
  }, [canInitiateCheckout, checkoutKey, checkoutPayload, clientSecret, loadedCheckoutKey]);

  useEffect(() => {
    let ignore = false;

    async function loadCheckoutIdentity() {
      try {
        const res = await api.get("/api/get-user-profile/");
        const email = String(res.data?.email || "").trim().toLowerCase();
        if (!ignore && email) {
          setAccessEmail(email);
          setIsAccessEmailLocked(true);
        }
      } catch {
        if (!ignore) {
          setIsAccessEmailLocked(false);
        }
      }
    }

    loadCheckoutIdentity();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    setAppliedDiscount(null);
    setDiscountMessage("");
    setClientSecret(null);
    setLoadedCheckoutKey("");
    checkoutRequestKeyRef.current = "";
  }, [selectedPriceUsd, checkoutType, checkoutProgramId, mentorshipEnabled, subscriptionLength]);

  useEffect(() => {
    setClientSecret(null);
    setLoadedCheckoutKey("");
    checkoutRequestKeyRef.current = "";
  }, [normalizedAccessEmail]);

  useEffect(() => {
    if (appliedDiscount && discountCode.trim().toUpperCase() !== appliedDiscount.code) {
      setAppliedDiscount(null);
      setDiscountMessage("");
      setClientSecret(null);
      setLoadedCheckoutKey("");
      checkoutRequestKeyRef.current = "";
    }
  }, [discountCode, appliedDiscount]);

  const applyDiscountCode = async () => {
    const code = discountCode.trim();
    setDiscountMessage("");
    setAppliedDiscount(null);
    setClientSecret(null);
    setLoadedCheckoutKey("");
    checkoutRequestKeyRef.current = "";
    setCheckoutError("");

    if (!code) {
      setDiscountMessage("Discount code is optional.");
      return;
    }

    setIsDiscountLoading(true);
    try {
      const res = await api.post("/api/discount-codes/validate/", {
        code,
        price: selectedPriceUsd,
      });
      setAppliedDiscount(res.data);
      setDiscountMessage(res.data?.message || "Discount applied.");
    } catch (error: any) {
      setDiscountMessage(error?.response?.data?.message || "Invalid discount code.");
    } finally {
      setIsDiscountLoading(false);
    }
  };

  const createOrder = async () => {
    if (!isAccessEmailValid) {
      window.alert("Enter the email where we should send your access link.");
      return undefined;
    }
    if (!canInitiateCheckout) return undefined;
    try {
      const res = await api.post("/api/create-paypal-order/", paypalPayload);
      if (res.status === 200) {
        if (res.data?.enrolled) {
          window.alert(res.data?.detail || "You have been enrolled successfully.");
          window.location.href = res.data?.redirect_path || "/dashboard";
          return undefined;
        }
        if (res.data?.no_payment_required) {
          window.alert("You already have enough access for this tier. No additional payment is needed.");
          return undefined;
        }
        return res.data.id;
      }
    } catch (error: any) {
      if (error?.response?.status === 401 || error?.response?.data?.login_required) {
        window.alert(error?.response?.data?.detail || "Please login or create an account first.");
        window.location.href = error?.response?.data?.redirect_path || "/login";
        return undefined;
      }
      console.error("Error creating PayPal order:", error);
    }
    return undefined;
  };

  const onApprove = async (data: any) => {
    try {
      const res = await api.post(`/api/capture-paypal-order/${data.orderID}/`);
      if (res.status === 200) {
        alert(`Payment Successful! Thank you very much for your purchase. We sent a mail to: ${res.data.email}.`);
        window.location.href = `/dashboard/checkout/return-paypal/`;
      }
    } catch (error) {
      console.error("Error capturing PayPal order:", error);
    }
  };

  const initialOptions = { clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "" };

  return (
    <main>
      <div className="pt-16">
        <NavbarPay />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <section className="rounded-sm border bg-white p-5">
            <p className="text-base font-bold">Select Preferred Payment Method</p>
            <div className="mt-4 rounded-sm border p-3">
              <label className="text-sm font-bold" htmlFor="checkout-access-email">
                Where should we send your access link?
              </label>
              <input
                id="checkout-access-email"
                type="email"
                value={accessEmail}
                onChange={(e) => setAccessEmail(e.target.value)}
                readOnly={isAccessEmailLocked}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-sm border px-3 py-2 text-sm read-only:bg-gray-100"
                required
              />
              {isAccessEmailLocked ? (
                <p className="mt-2 text-xs text-gray-600">Purchasing as {accessEmail}</p>
              ) : (
                <p className="mt-2 text-xs text-gray-600">We will use this email for your receipt and account setup link.</p>
              )}
            </div>
            <div className="mt-4 rounded-sm border p-3">
              <label className="text-sm font-bold" htmlFor="checkout-discount-code">
                Discount code <span className="font-normal text-gray-500">(optional)</span>
              </label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input
                  id="checkout-discount-code"
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Enter code"
                  className="min-w-0 flex-1 rounded-sm border px-3 py-2 text-sm uppercase"
                />
                <button
                  type="button"
                  onClick={applyDiscountCode}
                  disabled={isDiscountLoading}
                  className="rounded-sm bg-hb-green px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDiscountLoading ? "Checking..." : "Apply"}
                </button>
              </div>
              {discountMessage ? (
                <p className={`mt-2 text-xs ${appliedDiscount?.valid ? "text-hb-green" : "text-red-600"}`}>
                  {discountMessage}
                </p>
              ) : null}
            </div>
            <Accordion type="single" collapsible className="mt-4" value={openPaymentMethod} onValueChange={setOpenPaymentMethod}>
              <AccordionItem value="paypal">
                <AccordionTrigger>PayPal</AccordionTrigger>
                <AccordionContent>
                  {canInitiateCheckout ? (
                    <div className="space-y-3">
                      <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons style={{ layout: "vertical" }} createOrder={createOrder} onApprove={onApprove} />
                      </PayPalScriptProvider>
                      <input
                        className="w-full rounded-sm border-2 border-hb-green px-3 py-2"
                        placeholder="Referral code (optional)"
                        value={refCode}
                        onChange={(e) => setRefCode(String(e.target.value))}
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">
                      {isAccessEmailValid ? "Select a program to continue." : "Enter your email above to continue."}
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="card">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Card (Credit or Debit)
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {!isAccessEmailValid ? (
                    <p className="text-sm text-gray-600">Enter your email above to load card payment.</p>
                  ) : hasUnappliedDiscountCode ? (
                    <p className="text-sm text-gray-600">Apply the discount code, or clear it, before loading card payment.</p>
                  ) : isCardCheckoutLoading ? (
                    <p className="text-sm text-gray-600">Loading secure card checkout...</p>
                  ) : clientSecret && openPaymentMethod === "card" ? (
                    <EmbeddedCheckoutProvider key={clientSecret} stripe={stripePromise} options={{ clientSecret }}>
                      <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                  ) : checkoutError ? (
                    <p className="text-sm text-red-600">{checkoutError}</p>
                  ) : (
                    <button
                      type="button"
                      onClick={createCheckout}
                      disabled={!canInitiateCheckout}
                      className="rounded-sm bg-hb-green px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Load secure card payment
                    </button>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="bank">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    Bank Transfer (NGN)
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="rounded-sm border border-amber-800 bg-yellow-100 p-4 text-sm text-amber-800">
                      Kindly proceed to pay NGN {Number((finalPriceUsd * exchangeRateNaira).toFixed(2)) || "0"} via OPAY
                      (9552770865, THEHACKBIO ENTERPRISES). Send receipt to contact@thehackbio.com.
                    </div>
                    <a
                      href="mailto:contact@thehackbio.com?subject=Payment%20Receipt&body=Hi%20HackBio%2C%0A%0APlease%20find%20my%20receipt%20attached."
                      className="inline-flex rounded-sm bg-hb-green px-4 py-2 text-sm font-bold text-white"
                    >
                      Send us your receipt
                    </a>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section className="rounded-sm border bg-white p-5">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                <label className="font-bold">Currency</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="rounded-sm border p-1">
                  <option value="USD">USD</option>
                  <option value="NGN">NGN</option>
                  <option value="INR">INR</option>
                </select>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                <label className="font-bold">Subscription length</label>
                <select
                  value={subscriptionLength}
                  onChange={(e) => setSubscriptionLength(e.target.value)}
                  className="rounded-sm border p-1"
                >
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="12 months">12 months</option>
                </select>
              </div>

              {plan !== "subscription" ? (
                <div className="rounded-sm border p-3">
                  <label className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="purchaseOption"
                      value="program"
                      checked={purchaseOption === "program"}
                      onChange={() => setPurchaseOption("program")}
                      className="mt-1 accent-hb-green"
                    />
                    <span>
                      <span className="block font-bold">Access this program alone</span>
                      <span className="text-sm text-gray-600">1 year access to your selected program.</span>
                    </span>
                  </label>
                </div>
              ) : null}

              <div className="rounded-sm border p-3">
                <label className="flex items-start gap-2">
                  <input
                    type="radio"
                    name="purchaseOption"
                    value="subscription"
                    checked={purchaseOption === "subscription"}
                    onChange={() => setPurchaseOption("subscription")}
                    className="mt-1 accent-hb-green"
                  />
                  <span>
                    <span className="block font-bold">{subscriptionOffer.name}</span>
                    <span className="text-sm text-gray-600">{subscriptionOffer.description}</span>
                    <ul className="mt-2 space-y-1 text-sm text-gray-700">
                      {subscriptionOffer.features.map((feature) => (
                        <li key={feature}>- {feature}</li>
                      ))}
                    </ul>
                  </span>
                </label>
              </div>

              {shouldShowProgramSelector ? (
                <div className="space-y-2">
                  <label className="text-sm font-bold">Select preferred {plan}</label>
                  <select
                    value={selectedProgramId || ""}
                    onChange={(e) => setSelectedProgramId(Number(e.target.value))}
                    className="w-full rounded-sm border p-2 text-sm"
                  >
                    <option value="" disabled>
                      Select a {plan}
                    </option>
                    {programs.map((program) => (
                      <option key={program.id} value={program.id}>
                        {program.title} (${Number(program.price || 0)})
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              {!isSubscriptionCheckout && selectedProgramData ? (
                <div className="rounded-sm border p-3">
                  <p className="font-bold">{selectedProgramData.title}</p>
                  <p className="text-sm text-gray-600">{selectedProgramData.description}</p>
                </div>
              ) : null}

              {!isSubscriptionCheckout && supportsMentorshipAddon ? (
                <label className="flex items-center justify-between rounded-sm border p-3 text-sm">
                  <span>Add mentorship support (+${mentorshipAddonPrice})</span>
                  <input
                    type="checkbox"
                    checked={includeMentorship}
                    onChange={(e) => setIncludeMentorship(e.target.checked)}
                    className="accent-hb-green"
                  />
                </label>
              ) : null}

              <div className="rounded-sm border bg-hb-lightgreen/30 p-3">
                <p className="text-sm text-gray-700">
                  Selected: <span className="font-semibold">{checkoutType}</span>
                </p>
                {appliedDiscount?.valid ? (
                  <div className="mt-2 space-y-1 text-sm text-gray-700">
                    <p>
                      Original: {currency} {originalPriceInCurrency}
                    </p>
                    <p>
                      Discount ({appliedDiscount.percentage_off}%): -{currency} {discountAmountInCurrency}
                    </p>
                  </div>
                ) : null}
                <p className="text-xl font-bold">
                  Total: {currency} {totalPriceInCurrency}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
