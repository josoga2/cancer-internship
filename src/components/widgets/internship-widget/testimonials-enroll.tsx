"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import winfred from "@/../public/winfred.png";
import ayano from "@/../public/ayano.jpeg";
import adekoya from "@/../public/adekoya.jpeg";
import barve from "@/../public/barve.jpeg";

type Testimonial = {
    id: number;
    name: string;
    currentAffiliation: string;
    role: string;
    quote: string;
    image: StaticImageData;
    alt: string;
};

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Winfred Gatua",
        currentAffiliation: "University of Bristol, UK",
        role: "Bioinformatician",
        quote: "My HackBio experience (and preprint) was my leverage for an interesting conversation with my interview with my Graduate School Admission Team.",
        image: winfred,
        alt: "Winfred Gatua",
    },
    {
        id: 2,
        name: "Temitope Ayano",
        currentAffiliation: "GFA Tech, Nigeria",
        role: "Data Analyst",
        quote: "Through the internship, I was introduced to the world of genomics and bioinformatics, gaining hands-on experience with tools and pipeline development that gave me a strong foundation. That single event helped me clarify my interests and set me on the data-driven biomedical path I walk today. I will always be grateful to the access, exposure and direction that came from that one LinkedIn post.",
        image: ayano,
        alt: "Temitope Ayano",
    },
    {
        id: 3,
        name: "Aanuoluwa Adekoya",
        currentAffiliation: "University of Tennessee, Knoxville, USA",
        role: "Bioinformatician",
        quote: "HackBio provided me with my first real-world bioinformatics project, allowing me to apply the skills I had been learning in a meaningful way. The experience bridged the gap between theory and practice, and completing the project gave me a huge confidence boost. The training phase at HackBio was also highly motivating, with constant help from mentors. It reinforced the importance of community and mentorship in learning technical skills.",
        image: adekoya,
        alt: "Aanuoluwa Adekoya",
    },
    {
        id: 4,
        name: "Isha Barve",
        currentAffiliation: "Lubeck University, Germany",
        role: "Bioinformatician",
        quote: "I started without a programming background. HackBio played a crucial role in my growth in bioinformatics by giving me hands-on experience in metagenomics analysis, team collaboration and leadership. The internship was structured in multiple stages with a final project.",
        image: barve,
        alt: "Isha Barve",
    },
];

function getRandomTestimonials() {
    return [...testimonials].sort(() => Math.random() - 0.5).slice(0, 3);
}

export default function TestimonialsEnroll({
    InternshipStatus,
    variant = "default",
}: {
    InternshipStatus: string;
    variant?: "default" | "home";
}) {
    void InternshipStatus;
    const isHome = variant === "home";

    const [displayedTestimonials, setDisplayedTestimonials] = useState<Testimonial[]>(testimonials.slice(0, 3));
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial>(testimonials[0]);

    useEffect(() => {
        const randomTestimonials = getRandomTestimonials();
        setDisplayedTestimonials(randomTestimonials);
        setSelectedTestimonial(randomTestimonials[0]);
    }, []);

    return (
        <main className="w-full py-10 md:py-16">
            <section className="mx-auto hidden max-w-5xl px-8 md:grid md:grid-cols-[260px_1fr] md:items-center md:gap-20 md:px-10">
                <div className="flex gap-4 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0">
                    {displayedTestimonials.map((testimonial) => {
                        const isSelected = selectedTestimonial.id === testimonial.id;

                        return (
                            <button
                                key={testimonial.id}
                                type="button"
                                onClick={() => setSelectedTestimonial(testimonial)}
                                className={`relative h-32 min-w-56 overflow-hidden rounded-lg border-2 transition md:h-36 md:w-56 ${
                                    isSelected ? "border-hb-green" : "border-yellow-400"
                                }`}
                            >
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.alt}
                                    fill
                                    sizes="(min-width: 768px) 224px, 224px"
                                    className="object-cover"
                                />
                            </button>
                        );
                    })}
                </div>

                <div className="mx-auto w-full max-w-5xl rounded bg-hb-lightgreen px-6 py-10 dark:bg-[#1B1F1D] md:px-11 md:py-12">
                    <span className={`${isHome ? "text-6xl font-medium" : "text-6xl font-bold"} leading-none text-hb-green`}>&ldquo;</span>

                    <p className="mt-6 max-w-2xl text-base leading-7 text-black dark:text-white">
                        {selectedTestimonial.quote}
                    </p>

                    <div className="mt-8 flex items-center gap-5">
                        <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-hb-green md:h-24 md:w-24">
                            <Image
                                src={selectedTestimonial.image}
                                alt={selectedTestimonial.alt}
                                fill
                                sizes="96px"
                                className="object-cover"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className={`${isHome ? "text-xl font-medium" : "text-base font-bold md:text-lg"} text-black dark:text-white`}>
                                {selectedTestimonial.name}
                            </p>
                            <p className="text-sm text-black dark:text-neutral-300 md:text-base">
                                {selectedTestimonial.role} at {selectedTestimonial.currentAffiliation}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto flex w-full max-w-sm flex-col gap-3 px-4 md:hidden">

                <div className="grid grid-cols-3 gap-2">
                    {displayedTestimonials.map((testimonial) => {
                        const isSelected = selectedTestimonial.id === testimonial.id;

                        return (
                            <button
                                key={testimonial.id}
                                type="button"
                                onClick={() => setSelectedTestimonial(testimonial)}
                                className={`relative h-[70px] w-full overflow-hidden rounded-lg border-2 transition ${
                                    isSelected ? "border-hb-green" : "border-yellow-400"
                                }`}
                            >
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.alt}
                                    fill
                                    sizes="112px"
                                    className="object-cover"
                                />
                            </button>
                        );
                    })}
                </div>

                <div className="min-h-[480px] rounded bg-hb-lightgreen px-10 py-12 dark:bg-[#1B1F1D]">
                    <span className={`${isHome ? "text-xl font-medium" : "text-6xl font-bold"} leading-none text-hb-green`}>&ldquo;</span>

                    <p className="mt-8 text-base leading-7 text-black dark:text-white">
                        {selectedTestimonial.quote}
                    </p>

                    <div className="mt-12 flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-hb-green">
                            <Image
                                src={selectedTestimonial.image}
                                alt={selectedTestimonial.alt}
                                fill
                                sizes="48px"
                                className="object-cover"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className={`${isHome ? "text-xl font-medium" : "text-base font-bold"} text-black dark:text-white`}>
                                {selectedTestimonial.name}
                            </p>
                            <p className="text-base leading-5 text-black dark:text-neutral-300">
                                {selectedTestimonial.currentAffiliation}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
