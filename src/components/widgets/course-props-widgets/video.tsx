import HbButtons from "@/components/widgets/hb-buttons";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import WebRPy from "./webrpy";

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
                <WebRPy />
            </div>

{/**Mobile View */}
            <div className="flex flex-col w-full md:hidden gap-5 rounded-xl">
                <div className="w-full flex flex-row">
                    <div className="w-fit flex flex-col items-center justify-center">
                        <iframe height={200} src={video_url} className="rounded-md w-fit border-2 border-hb-green flex items-center justify-center" />
                        <p className="text-sm pt-5 font-bold">⛭ Remember to Use the gear icon to select your desired video quality</p>
                        <p className="text-lg pt-5 font-bold">{`</> Source Code`}</p>
                        <div className=" bg-white p-5 border border-gray-200 rounded-md text-sm prose prose-base leading-tight">
                            <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{text_content}</Markdown>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}