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

function PageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const prog = searchParams.get("prog");
  const id = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (!prog || !id) return;

    const fetchProgramAndId = async () => {
      try {
        if (prog === "course") {
          const res = await publicApi.get("/api/courses/");
          const course = res.data.find(
            (item: any) => Number(item.id) === Number(id)
          );
          setTitle(course?.title || "");
          setDesc(course?.overview || "");
        } else {
          const res = await publicApi.get("/api/internships/");
          const course = res.data.find(
            (item: any) => Number(item.id) === Number(id)
          );
          setTitle(course?.title || "");
          setDesc(course?.overview || "");
        }
      } catch {
        router.push("/login");
      }
    };

    fetchProgramAndId();
  }, [prog, id, router]);

  return (
    <Elements stripe={stripePromise}>
      <CheckOutForm
        title={title}
        desc={desc}
        progId={Number(id)}
        curr="USD"
        discount={0.5}
        plan={prog || "subscription"}
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
