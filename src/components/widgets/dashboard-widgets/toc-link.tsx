"use client";
import HbButtons from "@/components/widgets/hb-buttons";
import { BiDna, BiAtom } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";
import hb_logo from "@/../public/hb_logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, PanelRightClose, PanelRightOpen, X } from "lucide-react";
import { useState } from "react";
import Logout from "@/components/logout";
import { CiViewList } from "react-icons/ci";


export default function TocLink({tocHref}: {tocHref: string}) {

    return (
        <main>
            <div className={`hidden w-full  h-full md:flex flex-col gap-5  items-center justify-center transition-all duration-300 ease-in-out`}>
                <aside className="w-full flex flex-col gap-6 px-4 py-6 text-sm">
      
                    {/* TOC */}
                    <Link
                        href={tocHref}
                        className={`flex items-center gap-3 py-2 rounded-md transition shrink-0`}>
                        <CiViewList className="shrink-0 text-3xl" />
                        <span> <p className="font-bold">Table of Contents</p> </span>
                    </Link>

                    
                </aside>
            </div>

            {/**Mobile */}

            <div className="flex flex-col w-full md:hidden gap-2 rounded-xl">
                <aside className="w-full flex flex-col gap-2 text-sm">
                    {/* TOC */}
                    <Link
                        href={tocHref}
                        className={`flex items-center gap-3  `}>
                            <CiViewList className="text-4xl" />
                            <span> <p className="font-bold ">Back to Table of Contents</p> </span>
                    </Link>
                </aside>
            </div>
        </main>
    )
}