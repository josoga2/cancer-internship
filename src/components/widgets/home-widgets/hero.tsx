"use client";

import { useEffect, useState } from "react";
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

    const backgroundStyle = content.hero_image_url
        ? { backgroundImage: `url(${content.hero_image_url})` }
        : undefined;

    return (
        <section
            className="relative left-1/2 min-h-[560px] w-screen -translate-x-1/2 overflow-hidden bg-hb-lightgreen bg-cover bg-center md:min-h-[520px] md:bg-[center_right]"
            style={backgroundStyle}
        >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(219,242,232,0.96)_0%,rgba(219,242,232,0.88)_32%,rgba(219,242,232,0.44)_58%,rgba(219,242,232,0.12)_100%)] md:bg-[linear-gradient(90deg,rgba(219,242,232,0.98)_0%,rgba(219,242,232,0.88)_34%,rgba(219,242,232,0.34)_58%,rgba(219,242,232,0.08)_100%)]" />

            <div className="relative mx-auto flex min-h-[560px] w-full max-w-5xl items-center px-5 py-24 md:min-h-[520px] md:px-0">
                <div className="flex w-full max-w-[38rem] flex-col items-start gap-5 text-left">
                    <h1 className="max-w-full break-words text-[42px] font-black leading-[0.98] tracking-normal text-gray-900 sm:text-[52px] md:text-[64px]">
                        {content.headline}
                    </h1>
                    <p className="max-w-[35rem] break-words text-lg font-medium leading-[1.36] text-gray-800 md:text-xl">
                        {content.subheadline}
                    </p>
                    <div className="pt-2">
                        <a href={content.button_link}>
                            <HbButtons type="primary" text={content.button_text}/>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
