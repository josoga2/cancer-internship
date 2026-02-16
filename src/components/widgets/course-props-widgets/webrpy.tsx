import WebRConsole from "@/components/webR/webRConsole";
import { useState } from "react";

export default function WebRPy() {
    const [showJupyter, setShowJupyter] = useState(false);
    const [showWebR, setShowWebR] = useState(false);
    return (
        <div className="w-full">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Quick Console</p>
            <div className="flex flex-row gap-2 pt-3">
                <button
                    onClick={() => {
                    setShowJupyter((prev) => !prev);
                    setShowWebR(false);
                    }}
                    aria-label="Show Python (JupyterLite)"
                    type="button"
                    className={`flex-1 px-3 py-2 rounded-md text-sm font-semibold text-white transition
                    ${showJupyter 
                        ? 'bg-hb-green ring-2 ring-green-300'
                        : 'bg-hb-green hover:bg-green-600'
                    }`}
                >
                    Python
                </button>

                <button
                    onClick={() => {
                    setShowWebR((prev) => !prev);
                    setShowJupyter(false);
                    }}
                    aria-label="Show R (WebR Console)"
                    type="button"
                    className={`flex-1 px-3 py-2 rounded-md text-sm font-semibold text-white transition
                    ${showWebR 
                        ? 'bg-blue-700 ring-2 ring-blue-300'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    R
                </button>
            </div>

            {showJupyter && (
                <div className="mt-4 rounded-xl bg-white border border-gray-200 p-2 shadow-sm">
                    <iframe
                        src="https://josoga2.github.io/jpuyterlite-hb-dev/repl/index.html?showBanner=0&kernel=python&toolbar=1"
                        height={260}
                        width={320}
                        className="rounded-lg border border-gray-200 w-full"
                    />
                    <p className="text-xs pl-1 py-1 font-bold">▶︎ Shift+Enter to run code</p>
                </div>
            )}

            {showWebR && (
                <div className="mt-4 rounded-xl bg-white border border-gray-200 p-2 shadow-sm">
                    <WebRConsole />
                    <p className="text-xs pl-1 py-1 font-bold">▶︎ Press Enter to run code</p>
                </div>
            )}
        </div>
    )
}
