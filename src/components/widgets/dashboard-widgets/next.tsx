"use client";
import Link from "next/link";

export default function Next({NEXTLINK, nextModuleId }: {NEXTLINK:string, nextModuleId:number}) {
    const activeClass = "bg-hb-green rounded-md text-white hover:bg-hb-green-dark px-4 sm:px-6 text-base sm:text-lg py-1 font-bold border-2 border-hb-green inline-flex items-center gap-2 justify-center w-full";
    const disabledClass = "bg-white rounded-md text-gray-400 border-2 border-gray-200 px-4 sm:px-6 text-base sm:text-lg py-1 font-bold inline-flex items-center gap-2 justify-center w-full";

    return (
        <main>
            <div className={`hidden w-full h-full md:flex flex-col gap-3 items-center justify-center transition-all duration-300 ease-in-out `}>
                <aside className="w-full flex flex-col gap-3 px-5 pt-4 text-sm">
                    {nextModuleId > 0 ? (
                    <Link
                    href={NEXTLINK}
                    className={activeClass}
                    >
                        <span className="text-xs font-bold">NEXT MODULE</span>
                        <span className="text-lg">→</span>
                    </Link>
                    ) : (
                        <span className={disabledClass}>
                            <span className="text-xs font-bold">NEXT MODULE</span>
                            <span className="text-lg">→</span>
                        </span>
                    )}
                </aside>
            </div>

            {/**Mobile */}

            <div className="flex flex-col w-full md:hidden gap-3 rounded-xl">
                <aside className="w-full flex flex-col text-sm">
                    {nextModuleId > 0 ? (
                    <Link
                    href={NEXTLINK}
                    className={activeClass}
                    >
                        <span className="text-xs font-bold">NEXT MODULE</span>
                        <span className="text-lg">→</span>
                    </Link>
                    ) : (
                        <span className={disabledClass}>
                            <span className="text-xs font-bold">NEXT MODULE</span>
                            <span className="text-lg">→</span>
                        </span>
                    )}
                </aside>
            </div>
        </main>
    )
}
