import HbButtons from "@/components/widgets/hb-buttons";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import WebRPy from "./webrpy";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkDeflist from "remark-deflist";

export default function TextContent({text_content}: {text_content: string}) {
    return (
        <main>
            <div className="hidden w-full h-full md:flex flex-col  items-center justify-center text-sm">
                
                <div className="w-full flex flex-row text-sm">
                    <div className="w-full border-2 rounded-md border-hb-green p-5 bg-white prose prose-base leading-tight text-sm">
                        <article> <Markdown
                            remarkPlugins={[
                                remarkGfm,
                                remarkMath,
                                remarkDeflist
                            ]}
                            rehypePlugins={[
                                rehypeRaw,
                                rehypeKatex,
                                rehypeHighlight
                            ]}
                            >
                            {text_content}
                        </Markdown>
                        </article>
                    </div>
                    <WebRPy />
                </div>
            </div>

{/**Mobile View */}
            <div className="flex flex-col w-full md:hidden gap-5 rounded-xl">
                <div className="w-full flex flex-row text-sm">
                    <div className="w-full border-2 rounded-md border-hb-green p-3 bg-white prose prose-base text-sm">
                        <article> <Markdown
                            remarkPlugins={[
                                remarkGfm,
                                remarkMath,
                                remarkDeflist
                            ]}
                            rehypePlugins={[
                                rehypeRaw,
                                rehypeKatex,
                                rehypeHighlight
                            ]}
                            >
                            {text_content}
                        </Markdown>
                        </article>
                    </div>
                </div>
            </div>
        </main>
    )
}