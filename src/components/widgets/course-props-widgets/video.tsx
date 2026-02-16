import HbButtons from "@/components/widgets/hb-buttons";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export default function Video({video_url, text_content}: {video_url: string, text_content: string}) {
    return (
        <main>
            <div className="hidden w-full h-full md:flex flex-col gap-5  items-center justify-center ">
                
                <div className="w-full flex flex-row">
                    <div className="w-full flex flex-col gap-5">
                        <iframe height={400} src={video_url} className="rounded-md w-full border-2 border-hb-green" />
                        <p className="text-lg pt-5 font-bold">⛭ Remember to Use the gear icon to select your desired video quality</p>
                        <p className="text-lg pt-5 font-bold">{`</> Source Code`}</p>
                        <div className=" bg-white p-5 border border-gray-200 rounded-md text-sm prose prose-base leading-tight">
                            <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{text_content}</Markdown>
                        </div>
                    </div>
                </div>
            </div>

{/**Mobile View */}
            <div className="flex flex-col w-full md:hidden gap-4 rounded-xl">
                <div className="w-full flex flex-col">
                    <iframe height={200} src={video_url} className="rounded-md w-full border border-hb-green" />
                    <p className="text-xs pt-3 font-semibold text-gray-700">⛭ Use the gear icon to select video quality</p>
                    <p className="text-sm pt-3 font-semibold">{`</> Source Code`}</p>
                    <div className="bg-white p-3 border border-gray-200 rounded-md text-xs prose prose-sm leading-tight">
                        <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{text_content}</Markdown>
                    </div>
                </div>
            </div>
        </main>
    )
}
