"use client";

import { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Accordion } from "@radix-ui/react-accordion";
import { CreditCard, Wallet } from "lucide-react";
import NavbarPay from "@/components/Nav/navbar-pay";
import publicApi from "@/publicApi";

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
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST!);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [refCode, setRefCode] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [subscriptionLength, setSubscriptionLength] = useState("12 months");
  const [purchaseOption, setPurchaseOption] = useState<"program" | "subscription">(
    plan === "subscription" ? "subscription" : "program"
  );
  const [includeMentorship, setIncludeMentorship] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<number>(selectedProgram?.id || 0);

  useEffect(() => {
    if (plan === "subscription") {
      setPurchaseOption("subscription");
      setSelectedProgramId(0);
      return;
    }
    if (allowProgramSelection) {
      setSelectedProgramId(selectedProgram?.id || 0);
    } else {
      setSelectedProgramId(selectedProgram?.id || 0);
    }
  }, [plan, allowProgramSelection, selectedProgram]);

  const selectedProgramData = useMemo(
    () => programs.find((program) => Number(program.id) === Number(selectedProgramId)) || selectedProgram || null,
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

  const canInitiateCheckout = isSubscriptionCheckout || checkoutProgramId > 0;

  const exchangeRateNaira = 1500;
  const exchangeRateRupee = 90;
  const exchangeRate = currency === "NGN" ? exchangeRateNaira : currency === "INR" ? exchangeRateRupee : 1;
  const totalPriceInCurrency = Number((selectedPriceUsd * exchangeRate).toFixed(2));

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
    ]
  );

  const paypalPayload = useMemo(
    () => ({
      ...checkoutPayload,
      refCode,
    }),
    [checkoutPayload, refCode]
  );

  const createCheckout = async () => {
    if (!canInitiateCheckout) return;
    try {
      const res = await publicApi.post("/api/create-checkout/", checkoutPayload);
      if (res.status === 200) {
        if (res.data?.no_payment_required) {
          window.alert("You already have enough access for this tier. No additional payment is needed.");
          setClientSecret(null);
          return;
        }
        setClientSecret(res.data.client_secret);
      }
    } catch {
      setClientSecret(null);
    }
  };

  useEffect(() => {
    createCheckout();
  }, [canInitiateCheckout, checkoutPayload]);

  const createOrder = async () => {
    if (!canInitiateCheckout) return undefined;
    try {
      const res = await publicApi.post("/api/create-paypal-order/", paypalPayload);
      if (res.status === 200) {
        return res.data.id;
      }
    } catch (error) {
      console.error("Error creating PayPal order:", error);
    }
    return undefined;
  };

  const onApprove = async (data: any) => {
    try {
      const res = await publicApi.post(`/api/capture-paypal-order/${data.orderID}/`);
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
            <Accordion type="single" collapsible className="mt-4">
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
                    <p className="text-sm text-gray-600">Select a program to continue.</p>
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
                  {clientSecret ? (
                    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                      <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                  ) : (
                    <p className="text-sm text-gray-600">Select your preferred checkout option to load card payment.</p>
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
                      Kindly proceed to pay NGN {Number((selectedPriceUsd * exchangeRateNaira).toFixed(2)) || "0"} via OPAY
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

              {!isSubscriptionCheckout && allowProgramSelection ? (
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
