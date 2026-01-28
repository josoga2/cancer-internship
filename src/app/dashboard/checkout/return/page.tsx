'use client';

import { Suspense, useEffect, useState } from "react";
import publicApi from "@/publicApi";
import { useSearchParams, useRouter } from "next/navigation";

function CheckStatusContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    if (!sessionId) return;

    async function checkCustomerCheckoutStatus() {
      try {
        const res = await publicApi.get(
          `/api/session-status?session_id=${sessionId}`
        );

        if (res.status === 200) {
          setStatus(res.data.status);
          setCustomerEmail(res.data.customer_email);

          if (res.data.status === "open") {
            router.push("/checkout");
          }
        }
      } catch {
        // swallow or log
      }
    }

    checkCustomerCheckoutStatus();
  }, [sessionId, router]);

  if (status !== "complete") {
    return <div>Processing payment…</div>;
  }

  return (
    <main>
      <div className="hidden py-10 h-screen w-screen md:flex flex-col gap-5 items-center justify-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/16208/16208195.png"
          height={50}
          width={50}
          alt="Success"
        />
        <p className="text-lg font-bold">Payment Confirmed! Welcome to HackBio.</p>
        <p>Your payment was successful.</p>
        <p>
          Thank you for entrusting your career development to HackBio.
        </p>
        <p>
          You invested in a skill stack the biotech and data industry pays for.
        </p>
        <p>
          A confirmation email will be sent to {customerEmail}. Questions? Email{" "}
          <a href="mailto:contact@thehackbio.com">contact@thehackbio.com</a>.
        </p>
      </div>

      <div className="flex flex-col w-full md:hidden gap-5 p-5">
        <p className="text-lg font-bold">Payment Confirmed! Welcome to HackBio.</p>
        <p>Your payment was successful.</p>
        <p>
          Thank you for entrusting your career development to HackBio.
        </p>
        <p>
          A confirmation email will be sent to {customerEmail}.
        </p>
      </div>
    </main>
  );
}

export default function CheckStatus() {
  return (
    <Suspense fallback={<div>Processing payment…</div>}>
      <CheckStatusContent />
    </Suspense>
  );
}
