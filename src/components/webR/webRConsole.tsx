"use client";

import { useEffect, useRef } from "react";
// Import from your installed npm package
import { Console } from "webr";

const bannerRegex =   /^R version|^Copyright|^Platform:|^R is free software|^You are welcome|^Type '|^R is a collaborative|citation\(\)|help\.start\(\)/;


export default function WebRConsole() {
    const outRef = useRef<HTMLPreElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const consoleRef = useRef<Console | null>(null);

    // Helper to scroll output to bottom
    const scrollToBottom = () => {
        if (outRef.current) {
            outRef.current.scrollTop = outRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        async function init() {
            const webRConsole = new Console({
                stdout: (line: string) => {
                    if (outRef.current && !bannerRegex.test(line)) {
                        outRef.current.textContent += line + "\n";
                        scrollToBottom();
                    }
                },
                stderr: (line: string) => {
                    if (outRef.current && !bannerRegex.test(line)) {
                        outRef.current.textContent += line + "\n";
                        scrollToBottom();
                    }
                },
                prompt: (p: string) => {
                    if (outRef.current && !bannerRegex.test(p)) {
                        outRef.current.textContent += p;
                        scrollToBottom();
                    }
                },
            });

            consoleRef.current = webRConsole;
            await webRConsole.run();

            if (outRef.current) {
                outRef.current.textContent = "webR ready. Type R commands below.\n";
                scrollToBottom();
            }
        }

        init();
    }, []);

    const sendInput = () => {
        if (!inputRef.current || !consoleRef.current) return;
        const val = inputRef.current.value;
        if (val.trim() === "") return;

        consoleRef.current.stdin(val);
        if (outRef.current && !bannerRegex.test(val)) {
            outRef.current.textContent += val + "\n";
            scrollToBottom();
        }
        inputRef.current.value = "";
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            sendInput();
        }
    };

    return (
        <div className="flex flex-col h-[300px] min-w-[320px] rounded-lg shadow-lg border border-gray-700 bg-gray-900 text-green-200 text-xs font-mono">
            {/* Output area */}
            <pre className="flex-1 overflow-auto p-3 scroll-auto" ref={outRef}>
                <code></code>
            </pre>

            {/* Input bar */}
            <div className="flex items-center gap-2 border-t border-gray-700 bg-gray-800 px-3 py-2">
                <input
                    ref={inputRef}
                    type="text"
                    spellCheck="false"
                    autoComplete="off"
                    onKeyDown={handleKeyDown}
                    placeholder="Type R command..."
                    className="flex-1 bg-gray-900 text-green-200 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-400"
                />
                <button
                    onClick={sendInput}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    Run
                </button>
            </div>
        </div>
    );
}
