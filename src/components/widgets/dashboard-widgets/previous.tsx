"use client";
import Link from "next/link";

export default function Previous({previous, PREVIOUSLINK}: {previous: boolean, PREVIOUSLINK: string}) {

    return (
        <main>
            <div className={`hidden w-full  h-full md:flex flex-col gap-5 pb-5 items-center justify-center transition-all duration-300 ease-in-out`}>
                <aside className="w-full flex flex-col gap-6 px-5 text-sm">
                    {/* Previous module */}
                    {previous ? (
                        <Link
                        href={PREVIOUSLINK}
                        className="text-base font-medium hover:underline"
                        >
                            <span className="flex flex-row gap-5 items-center justify-center"> <p> ←  </p>  <p className="text-xs font-bold"> PREVIOUS MODULE </p> </span>
                        </Link>
                    ) : (
                        <span className="text-base font-medium text-gray-400">
                            <span className="flex flex-row gap-5 items-center justify-center"> <p> ←  </p>  <p className="text-xs"> PREVIOUS MODULE </p> </span>
                        </span>
                    )}
                </aside>
            </div>

            {/**Mobile */}

            <div className="flex flex-col w-full md:hidden gap-5 pb-5 rounded-xl">
                <div className="w-full flex flex-col text-sm text-white">
                    {/* Previous module */}
                    {previous ? (
                        <Link
                        href={PREVIOUSLINK}
                        className="text-base font-medium hover:underline min-w-full bg-hb-green px-5 py-2 rounded-sm"
                        >
                            <span className="flex flex-row gap-5 items-center justify-center">  <p className="text-sm font-bold">PREVIOUS MODULE </p> </span>
                        </Link>
                    ) : (
                        <span className="text-base font-medium text-gray-400 bg-gray-300 px-5 py-2 rounded-sm">
                            <span className="flex flex-row gap-5 items-center justify-center "> <p className="text-sm">PREVIOUS MODULE </p> </span>
                        </span>
                    )}
                </div>
            </div>
        </main>
    )
}