import HbButtons from "@/components/widgets/hb-buttons";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkDeflist from "remark-deflist";
import NotebookViewer from "@/components/nbc/notebook";

export default function JupyterContent({text_content, jupyter_url}: {text_content: string, jupyter_url: string}) {
    return (
        <main>
            <div className="hidden w-full h-full md:flex flex-col  items-center justify-center text-sm">
                
                <div className="w-full flex flex-row text-sm">
                    <div className="w-full flex flex-row ">
                            <div className="w-full min-h-screen over border-2 rounded-md border-hb-green p-10 flex flex-col gap-2">
                                <div className="flex flex-row gap-10 items-center ">
                                    <a href="http://192.168.42.99/"  target="_blank"> 
                                        <HbButtons text="Notebook on HackBio" type="primary"/> 
                                    </a>
                                    
                                </div>
                                <p className="font-bold">
                                    If you need an account to run python on HackBio, you can request for access from your HackBio Manager on Slack
                                </p>
                                {typeof text_content === 'string' && <NotebookViewer url={jupyter_url} />}
                            </div>
                        </div>
                </div>
            </div>

{/**Mobile View */}
            <div className="flex flex-col w-full md:hidden gap-5 p-5  rounded-xl">
                <div>Insert Mobile Code Here</div>
                <HbButtons type="primary" text="HackBio"/>
            </div>
        </main>
    )
}
