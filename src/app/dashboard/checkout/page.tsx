'use client';

import { Suspense, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSearchParams, useRouter } from "next/navigation";
import publicApi from "@/publicApi";
import CheckOutForm from "@/components/widgets/checkout/check-out-form";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

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

type CheckoutCatalogResponse = {
  type: CheckoutType;
  selected_id: number;
  selection_required: boolean;
  allow_program_selection: boolean;
  supports_mentorship_addon: boolean;
  selected_program: CatalogProgram | null;
  programs: CatalogProgram[];
  subscription_offer: SubscriptionOffer;
};

function PageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryType = searchParams.get("type");
  const prog = searchParams.get("prog");
  const sourceType = (queryType || prog || "subscription").toLowerCase();
  const normalizedType = (sourceType === "career" ? "pathway" : sourceType) as CheckoutType;
  const id = Number(searchParams.get("id") || 0);
  const [catalog, setCatalog] = useState<CheckoutCatalogResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const allowedTypes = new Set(["course", "pathway", "internship", "subscription"]);
    if (!allowedTypes.has(normalizedType)) {
      router.push("/pricing");
      return;
    }

    const fetchCheckoutCatalog = async () => {
      setIsLoading(true);
      try {
        const res = await publicApi.get("/api/checkout/catalog/", {
          params: { type: normalizedType, id, source_type: sourceType },
        });
        setCatalog(res.data);
      } catch {
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheckoutCatalog();
  }, [normalizedType, id, router, sourceType]);

  if (isLoading || !catalog) {
    return <div className="p-8 text-sm">Loading checkout details...</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckOutForm
        plan={catalog.type}
        sourceType={sourceType}
        programs={catalog.programs || []}
        selectedProgram={catalog.selected_program}
        allowProgramSelection={catalog.allow_program_selection}
        supportsMentorshipAddon={catalog.supports_mentorship_addon}
        subscriptionOffer={catalog.subscription_offer}
      />
    </Elements>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  );
}
