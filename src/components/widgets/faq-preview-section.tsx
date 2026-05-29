"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import publicApi from "@/publicApi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
  id: number;
  category?: string;
  question: string;
  answer: string;
  created_at?: string;
};

export default function FAQPreviewSection() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await publicApi.get("/api/faqs/");
        if (response.status === 200) {
          setFaqs(response.data.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12 md:px-10">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_260px]">
        <div className="rounded-[5px] bg-[#eaf9f1] px-6 py-7 dark:bg-[#10251b] md:px-10">
          <h2 className="text-base font-bold uppercase text-hb-green">Frequently Asked Questions</h2>

          <Accordion type="single" collapsible className="mt-7 flex flex-col gap-2">
            {faqs.length ? (
              faqs.map((faq) => (
                <AccordionItem key={faq.id} value={String(faq.id)} className="border-none">
                  <AccordionTrigger className="py-2 text-left text-base font-normal leading-6 text-black hover:no-underline dark:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-base leading-7 text-[#2f2f35] dark:text-slate-200">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <p className="text-base leading-6 text-black dark:text-white">No FAQs have been added yet.</p>
            )}
          </Accordion>

          <Link href="/faqs" className="mt-5 inline-flex text-base font-bold text-hb-green underline underline-offset-4">
            More questions
          </Link>
        </div>

        <div className="h-full rounded-[5px] bg-[#a9e2c4] p-6 dark:bg-[#17462c]">
          <div className="relative min-h-[230px] overflow-hidden rounded-[3px] bg-white p-5 dark:bg-[#111827] md:min-h-[270px]">
            <div className="relative z-10 max-w-[150px]">
              <p className="text-base font-medium leading-6 text-black dark:text-white">
                Want to know what we think about your biotech career prospects?
              </p>
              <Link
                href="/bioinformatics-readiness-assessment"
                className="mt-5 inline-flex h-8 items-center justify-center rounded-sm bg-hb-green px-3 text-sm font-bold text-white transition hover:bg-hb-green-dark"
              >
                Take our test
              </Link>
            </div>

            <div className="absolute -bottom-8 -right-7 h-32 w-32 rotate-[-28deg] bg-[#8fe083]" />
            <div className="absolute bottom-6 right-8 h-16 w-16 rounded-full bg-[radial-gradient(circle_at_30%_30%,#9df05b_0%,#35a900_42%,#067f3e_100%)]" />
            <div className="absolute bottom-2 right-1 h-20 w-20 rounded-full bg-[radial-gradient(circle_at_70%_35%,#26b44b_0%,#0e8d3c_48%,#04704d_100%)] opacity-90" />
            <div className="absolute right-12 top-16 h-5 w-5 rounded-full bg-[radial-gradient(circle_at_35%_35%,#d8ff5f_0%,#5cc414_70%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
