"use client";
import Link from "next/link";

export default function Next({NEXTLINK, nextModuleId }: {NEXTLINK:string, nextModuleId:number}) {

    return (
        <main>
            <div className={`hidden w-full  h-full md:flex flex-col gap-5  items-center justify-center transition-all duration-300 ease-in-out `}>
                <aside className="w-full flex flex-col gap-6 px-4 py-6 text-sm">
                    {nextModuleId > 0 ? (
                    <Link
                    href={NEXTLINK}
                    className="text-sm font-bold hover:underline"
                    >
                        <span className="flex flex-row gap-5 items-center justify-center">  <p className="text-xs font-bold"> NEXT MODULE </p>  <p> →  </p> </span>
                    </Link>
                    ) : (
                        <span className="text-sm font-medium text-gray-400">
                            <span className="flex flex-row gap-5 items-center justify-center">  <p className="text-xs font-bold"> NEXT MODULE </p>  <p> →  </p> </span>
                        </span>
                    )}
                </aside>
            </div>

            {/**Mobile */}

            <div className="flex flex-col w-full md:hidden p-2  rounded-xl">
                <aside className="w-full flex flex-col   text-sm text-white">
                    {nextModuleId > 0 ? (
                    <Link
                    href={NEXTLINK}
                    className="text-sm font-medium hover:underline  bg-hb-green px-5 py-2 rounded-sm"
                    >
                        NEXT MODULE
                    </Link>
                    ) : (
                        <span className="text-sm font-medium text-gray-400">
                        NEXT MODULE
                        </span>
                    )}
                </aside>
            </div>
        </main>
    )
}