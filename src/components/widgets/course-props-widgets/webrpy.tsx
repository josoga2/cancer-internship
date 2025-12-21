import WebRConsole from "@/components/webR/webRConsole";
import HbButtons from "@/components/widgets/hb-buttons";
import { useState } from "react";

export default function WebRPy() {
    const [showJupyter, setShowJupyter] = useState(false);
    const [showWebR, setShowWebR] = useState(false);
    return (
        <main>
            <div className="hidden w-full py-10  h-full md:flex flex-col gap-5 px-10  items-center justify-center border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen">
                
                <div className="w-full flex flex-row gap-10">
                    {/* Floating action buttons */}
                    <div className="fixed top-1/2 right-10 -translate-y-1/2 z-50 flex flex-col gap-3 text-sm">
                        {/* Python Button */}
                        <button
                            onClick={() => {
                            setShowJupyter(true);
                            setShowWebR(false);
                            }}
                            aria-label="Show Python (JupyterLite)"
                            type="button"
                            className={`flex items-center justify-center px-4 py-2 rounded-md font-semibold text-white shadow-lg transform transition-all duration-200
                            ${showJupyter 
                                ? 'bg-hb-green scale-105 shadow-xl ring-2 ring-green-300'
                                : 'bg-hb-green hover:bg-green-600 hover:scale-105'
                            }`}
                        >
                            Python
                        </button>

                        {/* R Button */}
                        <button
                            onClick={() => {
                            setShowWebR(true);
                            setShowJupyter(false);
                            }}
                            aria-label="Show R (WebR Console)"
                            type="button"
                            className={`flex items-center justify-center px-4 py-2 rounded-md font-semibold text-white shadow-lg transform transition-all duration-200
                            ${showWebR 
                                ? 'bg-blue-700 scale-105 shadow-xl ring-2 ring-blue-300'
                                : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
                            }`}
                        >
                            R
                        </button>
                        </div>


                    {/* Floating JupyterLite widget */}
                    {showJupyter && (
                        <div className="fixed top-1/2 right-36 -translate-y-1/2 z-50 shadow-lg rounded-xl bg-white p-1">
                            <iframe
                                src="https://josoga2.github.io/jpuyterlite-hb-dev/repl/index.html?showBanner=0&kernel=python&toolbar=1"
                                height={300}
                                width={300}
                                className="rounded-lg border border-gray-200"
                            />
                            <p className="text-xs pl-1 py-1 font-bold">▶︎ Shift+Enter to run code</p>
                        </div>
                    )}

                    {/* Floating WebRConsole widget */}
                    {showWebR && (
                        <div className="fixed top-1/2 right-36 -translate-y-1/2 z-50 shadow-lg rounded-xl bg-white p-1">
                            <WebRConsole />
                            <p className="text-xs pl-1 py-1 font-bold">▶︎ Press Enter to run code</p>
                        </div>
                    )}
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