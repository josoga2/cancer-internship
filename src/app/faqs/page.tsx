import Footer from "@/components/Nav/footer";
import Navbar from "@/components/Nav/navbar";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    id: 1,
    question: "What is HackBio??",
    type: "Structure",
    answer:
      "A project-first bioinformatics training platform where interns learn by shipping real analyses, not watching slides."
  },
  {
    id: 2,
    question: "Who is HackBio for?",
    type: "Structure",
    answer:
      "Scientists, students, and career-switchers who want hands-on genomics, data science, and ML skills that employers actually care about."
  },
  {
    id: 3,
    question: "How is HackBio different from other courses?",
    type: "Structure",
    answer:
      "After teaching, you complete practical portfolio-grade projects under mentorship, not passive modules."
  },
  {
    id: 4,
    question: "Do I need prior coding experience?",
    type: "Structure",
    answer:
      "No. We accept absolute beginners. Most of our internships come with foundational training. If you have prior experience, we expect faster progress if you already know basic Python or R."
  },
  {
    id: 5,
    question: "How long is a typical internship cohort?",
    type: "Internship",
    answer:
      "Most cohorts run from 4 to 12 weeks depending on track. Project timelines are stated in each cohort page."
  },
  {
    id: 6,
    question: "How many hours per week should I expect to commit?",
    type: "Internship",
    answer:
      "Plan 8 to 20 hours weekly depending on track intensity and whether you want interview-ready deliverables."
  },
  {
    id: 7,
    question: "Are mentors full-time instructors?",
    type: "Mentorship",
    answer:
      "No. Mentors are a mix of experienced practitioners and industry contractors; they review code, provide feedback, and host office hours."
  },
  {
    id: 8,
    question: "Do I get a certificate after completing an internship?",
    type: "Internship",
    answer:
      "Yes. HackBio issues a graded completion certificate."
  },
  {
    id: 9,
    question: "What tools and cloud resources do I need?",
    type: "Structure",
    answer:
      "Basic: Laptop, GMail account. Advanced projects may use cloud compute; we will provide this for you."
  },
  {
    id: 10,
    question: "How are assessments done?",
    type: "Structure",
    answer:
      "Assessments are practical: code reviews, reproducible pipeline execution, README quality, and final project presentation."
  },
  {
    id: 11,
    question: "Can I collaborate with other interns?",
    type: "Structure",
    answer:
      "Yes. Collaboration is encouraged; team projects have clear contribution and authorship rules."
  },
  {
    id: 12,
    question: "What is the cost of a HackBio internship?",
    type: "Structure",
    answer:
      "Pricing varies by cohort and track. Check the cohort page for current USD pricing or contact admissions for custom rates."
  },
  {
    id: 13,
    question: "Do you offer scholarships or discounts?",
    type: "Structure",
    answer:
      "Sometimes. Merit and need-based scholarships exist. Partner discounts and early-bird pricing also apply sometimes."
  },
  {
    id: 14,
    question: "Can companies buy private cohorts or training?",
    type: "Structure",
    answer:
      "Yes. We run bespoke corporate cohorts, hiring pipelines, and bootcamps designed to upskill teams quickly."
  },
  {
    id: 15,
    question: "How do you pick project ideas?",
    type: "Structure",
    answer:
      "We choose projects for clarity, real-world relevance, reproducibility, and employer signal. We prioritize end-to-end pipelines."
  },
  {
    id: 16,
    question: "What if I need extra help?",
    type: "Structure",
    answer:
      "Office hours, mentor office chats, community peers, and paid 1:1 coaching options are available."
  },
  {
    id: 17,
    question: "What is HackBio Internship?",
    type: "Structure",
    answer:
      "HackBio Internship is a fast paced, cohort based, mentor-led, online training, designed in the form of a bootcamp for life scientists, chemists, engineers and other life science talents."
  },
  {
    id: 18,
    question: "What is HackBio Career Paths?",
    type: "Structure",
    answer:
      "HackBio Pathways are self-paced, on-demand learning content that you can take at your own pace to learn the fundamentals of bioinformatics, data science and machine learning."
  },
  {
    id: 19,
    question: "Who is HackBio for?",
    type: "Structure",
    answer:
      "Scientists, students, and career-switchers who want hands-on genomics, data science, and ML skills that employers actually care about."
  },
  {
    id: 20,
    question: "Who do I contact for support or partnerships?",
    type: "Help",
    answer:
      "Email contact@thehackbio.com for student support and partnerships inquiries. Expect a 48-hour response window."
  }
];

export default function FaqPage() {
  // Sort scholarships in descending order by ID
  const sortedfaqs = [...faqs].sort((a, b) => b.id - a.id);

  return (
    <div>
        <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#27AE60] to-green-300 text-white py-16 pt-40 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">HackBio FAQs</h1>
        <p className="text-lg w-2xl mx-auto">
          What is HackBio? How do I apply? Find answers to common questions about our internship program here.
        </p>
      </section>

      {/* Scholarship Listings */}
      <section className="w-4xl px-4 sm:px-6 py-12 space-y-4">
        {Array.from(new Set(sortedfaqs.map((faq) => faq.type))).map((type) => (
          <div key={type} className="mb-8">
            <h2 className="text-base font-semibold mb-4">{type}</h2>
            {sortedfaqs
              .filter((faq) => faq.type === type)
              .map((faq) => (
                <div
                  key={faq.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white border-2 border-hb-green rounded-md p-4 hover:shadow-md transition mb-2"
                >
                  <Accordion type="single" className="max-w-[900px]" collapsible>
                    <AccordionItem value={faq.id.toString()}>
                      <AccordionTrigger className="w-full text-base font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 text-gray-700 text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
          </div>
        ))}
      </section>
       
      <Footer />
    </div>
  );
}
