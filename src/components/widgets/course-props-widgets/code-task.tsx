import HbButtons from "@/components/widgets/hb-buttons";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import WebRPy from "./webrpy";
import HbButton from "@/components/widgets/hb-buttons";
import TextContent from "./text";
import { useState } from "react";

export default function CodeTask({
    video_url,
    text_content,
    handleCodeTaskSubmit,
}: {
    video_url: string;
    text_content: string;
    handleCodeTaskSubmit: (solution: string) => void | Promise<void>;
}) {
    const [solution, setSolution] = useState<string>("");
    const [grade, setGrade] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [improve, setImprove] = useState<string>("waiting for review...");

    return (
        <main>
            <div className="hidden w-full h-full md:flex flex-col gap-5  items-center justify-center ">
                <div className="rounded-md  flex flex-col w-full prose gap-5">
                    <TextContent text_content={text_content} />

                    <textarea
                        id="solution"
                        value={solution}
                        onChange={(e) => setSolution(e.target.value)}
                        placeholder="Type your solution here. We accept code & text..."
                        required
                        className="bg-green-950 text-white text-xs placeholder:text-xs p-5 w-full  h-100 rounded-md font-mono border border-neutral-200"
                    />
                    <div className="flex flex-row gap-5 items-center justify-start ">
                        <HbButton
                            onClick={() => {
                                handleCodeTaskSubmit(solution);
                            }}
                            type="primary"
                            text="Submit"
                        />
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-gray-600"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                        ) : (
                            <div className="text-sm"> </div>
                        )}
                    </div>
                    <div>
                        {loading ? (
                            <div className="text-sm">
                                <p>Your grade is: {grade} XP</p>
                                <p className="leading-7 text-sm">Suggested Improvements: {improve} </p>
                            </div>
                        ) : (
                            <div className="text-sm">
                                <p>Your grade is: {grade} XP</p>
                                <p className="leading-7 text-sm">Suggested Improvements: {improve} </p>
                            </div>
                        )}
                    </div>
                </div>
                <WebRPy />
            </div>

{/**Mobile View */}
            <div className="flex flex-col w-full md:hidden gap-5 p-5  rounded-xl">
                <div>Insert Mobile Code Here</div>
                <HbButtons type="primary" text="HackBio"/>
            </div>
        </main>
    )
}