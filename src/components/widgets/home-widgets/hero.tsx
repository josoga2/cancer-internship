"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HbButtons from "../hb-buttons";
import publicApi from "@/publicApi";

const DEFAULT_CONTENT = {
    headline: "We train the next generation of bioinformatics talent",
    subheadline: "... and connect them to the organizations that need them.",
    button_text: "Start your career journey",
    button_link: "/learning",
    hero_image_url: "",
};

export default function Hero() {
    const [content, setContent] = useState(DEFAULT_CONTENT);

    useEffect(() => {
        const fetchHomepage = async () => {
            try {
                const response = await publicApi.get("/api/homepage/");
                if (response.status === 200 && response.data) {
                    setContent({
                        headline: response.data.headline || DEFAULT_CONTENT.headline,
                        subheadline: response.data.subheadline || DEFAULT_CONTENT.subheadline,
                        button_text: response.data.button_text || DEFAULT_CONTENT.button_text,
                        button_link: response.data.button_link || DEFAULT_CONTENT.button_link,
                        hero_image_url: response.data.hero_image_url || "",
                    });
                }
            } catch (error) {
                // keep defaults
            }
        };
        fetchHomepage();
    }, []);

    return (
        <main>
            <div className="hidden w-full py-10  h-full md:flex flex-col gap-5  items-center justify-center border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen">
                <div className="w-full flex flex-row items-center justify-between py-20 relative bg-hb-lightgreen">
                    <div className="w-3/5 h-full items-start text-start flex flex-col gap-5 px-10 ">
                        <p className= 'text-5xl font-bold leading-16'>{content.headline}</p>
                        <p className=" text-xl w-2/3 text-gray-700">{content.subheadline}</p>
                        <div className="flex flex-row gap-5 py-5">
                            <a href={content.button_link}> <HbButtons type="primary" text={content.button_text}/> </a>
                            {/* <a href="/hire-talents"> <HbButtons type="outline" text="Hire Talents"/> </a> */}
                        </div>
                    </div>
                    {content.hero_image_url ? (
                        <div className="w-2/5 h-full flex items-center justify-center pr-10">
                            <Image
                                src={content.hero_image_url}
                                alt="HackBio hero"
                                width={560}
                                height={360}
                                className="w-full h-full max-h-85 object-contain"
                                priority
                                sizes="(min-width: 768px) 40vw, 100vw"
                            />
                        </div>
                    ) : null}
                    
                </div>
            </div>

            <div className="flex flex-col w-full md:hidden gap-5 p-2 rounded-xl">
                <div className="flex flex-col gap-5 text-start">
                    <p className="text-3xl font-bold leading-tight">
                        {content.headline}
                    </p>
                    <p className="text-base text-gray-700">
                        {content.subheadline}
                    </p>
                    <div className="flex flex-col gap-3">
                        <a href={content.button_link}> <HbButtons type="primary" text={content.button_text}/> </a>
                        {/* <a href="/hire-talents"> <HbButtons type="outline" text="Hire Talents"/> </a> */}
                    </div>
                </div>
                {content.hero_image_url ? (
                    <div className="w-full flex items-center justify-center">
                        <Image
                            src={content.hero_image_url}
                            alt="HackBio hero"
                            width={560}
                            height={320}
                            className="w-full max-h-65 object-contain"
                            sizes="100vw"
                        />
                    </div>
                ) : null}
            </div>
        </main>
    )
}
