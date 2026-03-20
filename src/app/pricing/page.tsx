"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Nav/footer";
import Navbar from "@/components/Nav/navbar";
import publicApi from "@/publicApi";

type BillingType = "one_time" | "subscription";
type ProductType = "course" | "pathway" | "internship" | "subscription";

type JourneyPlan = {
  name: string;
  emoji: string;
  description: string;
  price: string;
  monthlyEquivalent: string;
  cta: string;
  href: string;
  features: string[];
  fitLabel: string;
  billing: BillingType;
  billingLabel: string;
  durationLabel: string;
  highlight?: boolean;
  badge?: string;
};

type ProductResponse = {
  id: number;
  type: ProductType;
  billing_type: BillingType;
  price: string | number;
  duration_days: number;
  content_id: number;
};

type ComparePlan = {
  key: ProductType;
  name: string;
};

type CompareFeature = {
  name: string;
  values: Record<ProductType, string | boolean>;
};

type CompareSection = {
  title: string;
  features: CompareFeature[];
};

const planOrder: ProductType[] = ["course", "pathway", "internship", "subscription"];

const journeySteps = [
  "Learn Fundamentals",
  "Practice with Projects",
  "Join Internship",
  "Launch Your Career",
];

const comparePlans: ComparePlan[] = [
  { key: "course", name: "🌱 Start Small" },
  { key: "pathway", name: "📘 Build Skills" },
  { key: "internship", name: "🧪 Get Experience" },
  { key: "subscription", name: "🚀 Go All-In" },
];

const compareSections: CompareSection[] = [
  {
    title: "Learning Access",
    features: [
      {
        name: "Access to courses",
        values: {
          course: "1 course",
          pathway: "All courses (2-3) in pathway",
          internship: "All courses (2-3) in the internship",
          subscription: "Everything + Gym practice",
        },
      },
      {
        name: "Access duration",
        values: {
          course: "1 year",
          pathway: "1 year",
          internship: "1 year",
          subscription: "While subscribed",
        },
      },
      {
        name: "Structured curriculum",
        values: {
          course: false,
          pathway: true,
          internship: true,
          subscription: true,
        },
      },
    ],
  },
  {
    title: "Practice & Projects",
    features: [
      {
        name: "Hands-on projects",
        values: {
          course: "Basic",
          pathway: "Guided projects",
          internship: "Real-world projects + mentorship",
          subscription: "Real-world projects + mentorship",
        },
      },
      {
        name: "Practice gym access",
        values: {
          course: false,
          pathway: false,
          internship: false,
          subscription: true,
        },
      },
    ],
  },
  {
    title: "Mentorship & Support",
    features: [
      {
        name: "Mentorship access",
        values: {
          course: false,
          pathway: false,
          internship: true,
          subscription: true,
        },
      },
      {
        name: "Community access",
        values: {
          course: true,
          pathway: true,
          internship: true,
          subscription: true,
        },
      },
      {
        name: "Priority support",
        values: {
          course: false,
          pathway: false,
          internship: false,
          subscription: true,
        },
      },
    ],
  },
  {
    title: "Career Development",
    features: [
      {
        name: "Internship eligibility",
        values: {
          course: false,
          pathway: false,
          internship: true,
          subscription: true,
        },
      },
    ],
  },
];

const compareTableTitle = "Compare what you get at each level";

const outcomeProofItems = [
  {
    title: "Structured Skill Growth",
    metric: "Learn with direction",
    detail: "Follow clear course sequences instead of random lessons.",
  },
  {
    title: "Hands-on Confidence",
    metric: "Practice every week",
    detail: "Use quizzes, coding tasks, and scenario-based checkpoints.",
  },
  {
    title: "Career Readiness",
    metric: "Build real portfolio depth",
    detail: "Progress from foundational tracks to internship-grade projects.",
  },
  {
    title: "Mentor-Guided Progress",
    metric: "Get support when needed",
    detail: "Move faster with community and mentorship touchpoints.",
  },
];

const pricingFaqs = [
  {
    question: "How long does one-time access last?",
    answer: "Course, pathway, and internship one-time purchases include 1 year of access from your purchase date.",
  },
  {
    question: "Can I upgrade after buying a lower plan?",
    answer: "Yes. You can move from course to pathway, pathway to internship, or internship to full subscription any time.",
  },
  {
    question: "What happens with the subscription plan?",
    answer: "Subscription keeps all learning content and practice gym unlocked while your subscription is active.",
  },
  {
    question: "Can I still use free practice without a subscription?",
    answer: "Yes. Non-subscribers can access the daily free practice slot, while subscribers unlock the full practice gym.",
  },
];

const defaults: Record<ProductType, Omit<JourneyPlan, "price" | "monthlyEquivalent" | "href" | "billingLabel" | "durationLabel" | "billing">> = {
  course: {
    name: "Start Small",
    emoji: "🌱",
    description: "Buy one course and start building confidence quickly.",
    fitLabel: "Best for trying one focused skill track",
    cta: "Start Learning",
    features: ["One course access", "Beginner practice", "Guided checkpoints"],
  },
  pathway: {
    name: "Build Skills",
    emoji: "🚀",
    description: "Go deeper with a focused pathway and stronger project practice.",
    fitLabel: "Best for structured growth and consistency",
    cta: "Build Skills",
    features: ["Pathway bundle", "Project-based progression", "Better career readiness"],
    highlight: true,
    badge: "Most Popular",
  },
  internship: {
    name: "Get Experience",
    emoji: "🧪",
    description: "Gain hands-on internship experience and mentor-supported growth.",
    fitLabel: "Best for applied experience and mentor feedback",
    cta: "Get Experience",
    features: ["Internship access", "Applied tasks", "Mentor + community support"],
  },
  subscription: {
    name: "Go All-In",
    emoji: "🎯",
    description: "Unlock full access across courses, pathways, internships and practice.",
    fitLabel: "Best for full access and fastest progression",
    cta: "Go All-In",
    features: ["Everything included", "Access to 500 practice task", "Best long term value"],
  },
};

function buildPriceLabel(type: ProductType, priceValue: number): string {
  if (type === "subscription") {
    return `$${priceValue}/year`;
  }
  return `$${priceValue} one-time`;
}

function buildDurationLabel(billingType: BillingType, durationDays: number): string {
  if (billingType === "subscription") {
    return "Yearly billing";
  }
  if (durationDays >= 365) {
    return "1 year access";
  }
  return `${durationDays} days access`;
}

function buildMonthlyEquivalent(priceValue: number, durationDays: number): string {
  const months = durationDays >= 365 ? 12 : Math.max(1, Math.round(durationDays / 30));
  const monthly = priceValue / months;
  return `~$${monthly.toFixed(2)}/month equivalent`;
}

function renderCompareValue(value: string | boolean) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="font-semibold text-hb-green">Yes</span>
    ) : (
      <span className="font-semibold text-red-500">No</span>
    );
  }
  return <span>{value}</span>;
}

function MobileCompareTable({
  sections,
  plans,
}: {
  sections: CompareSection[];
  plans: ComparePlan[];
}) {
  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <article key={section.title} className="rounded-md border border-hb-green/20 bg-hb-lightgreen/20 p-3 dark:bg-hb-green-dark/30">
          <h4 className="text-sm font-bold text-hb-green">{section.title}</h4>
          <div className="mt-3 space-y-3">
            {section.features.map((feature) => (
              <div key={`${section.title}-${feature.name}`} className="rounded-sm border border-hb-green/20 bg-white p-3 dark:bg-slate-900">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{feature.name}</p>
                <div className="mt-2 space-y-2">
                  {plans.map((plan) => (
                    <div
                      key={`${section.title}-${feature.name}-${plan.key}-mobile`}
                      className="flex items-center justify-between gap-3 rounded-sm border border-gray-200 bg-gray-50 px-2 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
                    >
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{plan.name}</span>
                      <span className="text-right text-xs font-medium text-gray-800 dark:text-gray-100">
                        {renderCompareValue(feature.values[plan.key])}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function PlanCard({ plan }: { plan: JourneyPlan }) {
  return (
    <article
      className={`relative flex h-full flex-col justify-between rounded-md border p-6 shadow-lg transition duration-200 hover:scale-[1.03] ${
        plan.highlight
          ? "border-hb-green ring-2 ring-hb-green/40 md:scale-105 bg-white dark:bg-slate-900"
          : "border-hb-green/25 bg-white dark:bg-slate-900"
      }`}
    >
      {plan.badge ? (
        <span className="absolute -top-3 right-4 rounded-md bg-hb-green px-3 py-1 text-xs font-semibold text-white">
          {plan.badge}
        </span>
      ) : null}

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm font-semibold text-hb-green">{plan.emoji} {plan.name}</p>
          <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{plan.price}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{plan.monthlyEquivalent}</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{plan.description}</p>
          <p className="mt-2 rounded-md border border-hb-green/25 bg-hb-lightgreen/50 px-2 py-1 text-xs font-semibold text-hb-green dark:bg-hb-green-dark/50">
            {plan.fitLabel}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-md bg-hb-lightgreen px-2 py-1 text-hb-green border border-hb-green/25">
            {plan.billingLabel}
          </span>
          <span className="rounded-md bg-gray-100 px-2 py-1 text-gray-700 border border-gray-200 dark:bg-slate-800 dark:text-gray-200 dark:border-slate-700">
            {plan.durationLabel}
          </span>
        </div>

        <ul className="flex flex-col gap-2">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
              <CheckCircle2 className="h-4 w-4 text-hb-green" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={plan.href}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-hb-green px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
      >
        {plan.cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}

export default function PricingPage() {
  const [products, setProducts] = useState<Record<ProductType, ProductResponse | null>>({
    course: null,
    pathway: null,
    internship: null,
    subscription: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await publicApi.get("/api/pricing/products/");
        const items: ProductResponse[] = Array.isArray(res.data?.products) ? res.data.products : [];
        const byType: Record<ProductType, ProductResponse | null> = {
          course: null,
          pathway: null,
          internship: null,
          subscription: null,
        };
        items.forEach((item) => {
          if (planOrder.includes(item.type)) {
            byType[item.type] = item;
          }
        });
        setProducts(byType);
      } catch (error) {
        // Keep fallback copy if pricing products endpoint is unavailable.
      }
    };
    fetchProducts();
  }, []);

  const plans = useMemo<JourneyPlan[]>(() => {
    return planOrder.map((type) => {
      const product = products[type];
      const numericPrice = Number(product?.price ?? 0);
      const billing = (product?.billing_type ?? (type === "subscription" ? "subscription" : "one_time")) as BillingType;
      const contentId = product?.content_id ?? 0;
      const durationDays = Number(product?.duration_days ?? 365);

      return {
        ...defaults[type],
        billing,
        price: buildPriceLabel(type, numericPrice),
        monthlyEquivalent: buildMonthlyEquivalent(numericPrice, durationDays),
        billingLabel: billing === "subscription" ? "Subscription" : "One-time",
        durationLabel: buildDurationLabel(billing, durationDays),
        href: `/dashboard/checkout?type=${type}&id=${contentId}`,
      };
    });
  }, [products]);

  return (
    <section className="min-h-svh bg-hb-lightgreen dark:bg-hb-green-dark">
      <Navbar />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 md:px-8 md:py-14">
        <section className="rounded-md bg-gradient-to-r from-hb-green to-green-400 px-6 py-12 text-center text-white md:px-12">
          <h1 className="text-3xl font-bold md:text-5xl">Become job-ready in AI, Data &amp; Bioinformatics</h1>
          <p className="mt-4 text-base md:text-lg">Learn → Practice → Intern → Get hired</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={plans.find((plan) => plan.name === "Go All-In")?.href || "/dashboard/checkout?type=subscription&id=0"}
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-hb-green transition hover:bg-gray-100"
            >
              Start Your Journey
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pathway"
              className="inline-flex items-center gap-2 rounded-md border border-white/80 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Explore Paths
            </Link>
          </div>
        </section>

        <section className="rounded-md border border-hb-green/20 bg-white p-6 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Why learners choose HackBio</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {outcomeProofItems.map((item) => (
              <article key={item.title} className="rounded-md border border-hb-green/20 bg-hb-lightgreen/40 p-4 dark:bg-hb-green-dark/40">
                <p className="text-sm font-semibold text-hb-green">{item.metric}</p>
                <h3 className="mt-1 text-base font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-hb-green/20 bg-white p-6 dark:bg-slate-900">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Choose how you want to grow with HackBio</h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
        </section>

        <section className="rounded-md border border-hb-green/20 bg-white p-6 dark:bg-slate-900">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your learning journey</h3>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
            {journeySteps.map((step, index) => (
              <div key={step} className="rounded-md border border-hb-green/20 bg-hb-lightgreen px-4 py-3 text-sm font-semibold text-gray-800 dark:bg-hb-green-dark dark:text-gray-100">
                {index + 1}. {step}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">Your plan determines how far and how fast you go.</p>
        </section>

        <section className="rounded-md border border-hb-green/20 bg-white p-6 dark:bg-slate-900">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{compareTableTitle}</h3>
          <div className="mt-4 md:hidden">
            <MobileCompareTable sections={compareSections} plans={comparePlans} />
          </div>
          <div className="mt-4 hidden overflow-x-auto md:block">
            <table className="min-w-[900px] w-full border-collapse">
              <thead>
                <tr className="border-b border-hb-green/20">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-100">Feature</th>
                  {comparePlans.map((plan) => (
                    <th key={plan.key} className="px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-gray-100">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareSections.map((section) => (
                  <Fragment key={section.title}>
                    <tr key={`${section.title}-header`} className="bg-hb-lightgreen/40 dark:bg-hb-green-dark/40">
                      <td colSpan={5} className="px-4 py-3 text-sm font-bold text-hb-green">
                        {section.title}
                      </td>
                    </tr>
                    {section.features.map((feature) => (
                      <tr key={`${section.title}-${feature.name}`} className="border-b border-gray-200/80 dark:border-slate-700">
                        <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-100">{feature.name}</td>
                        {comparePlans.map((plan) => (
                          <td key={`${section.title}-${feature.name}-${plan.key}`} className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                            {renderCompareValue(feature.values[plan.key])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-md border border-hb-green/20 bg-white p-6 dark:bg-slate-900">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Frequently asked questions</h3>
          <div className="mt-4 divide-y divide-gray-200 dark:divide-slate-700">
            {pricingFaqs.map((faq) => (
              <details key={faq.question} className="group py-3">
                <summary className="cursor-pointer list-none text-sm font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </summary>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-hb-green/20 bg-white p-6 dark:bg-slate-900">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">For Universities &amp; Organizations</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Train your students or team at scale with custom onboarding and structured outcomes.</p>
          <Link
            href="mailto:contact@thehackbio.com?subject=HackBio%20Partnership%20Request"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-hb-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Partner with us
          </Link>
        </section>
      </div>

      <Footer />
    </section>
  );
}
