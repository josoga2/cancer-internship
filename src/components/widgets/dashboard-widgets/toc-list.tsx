"use client";
import HbButtons from "@/components/widgets/hb-buttons";
import { BiDna, BiAtom } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";
import hb_logo from "@/../public/hb_logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Hash, Menu, PanelRightClose, PanelRightOpen, X } from "lucide-react";
import { useState } from "react";

export type SidebarContentItem = {
  id: number;
  title: string;
  href: string;
};

export type SidebarNavLink = {
  label: string;
  href: string;
  disabled?: boolean;
};

type SidebarProps = {
  tocHref: string;

  previous?: SidebarNavLink;
  next?: SidebarNavLink;

  contents: SidebarContentItem[];
  activeContentId?: number;
};


export default function TocList({ id, COURSELINK, isActive, title, isCompleted }: { id: string; COURSELINK: string; isActive: boolean; title: string; isCompleted: boolean }) {


    return (
        <main>
            <div className={`hidden w-full  h-full md:flex flex-col items-center justify-center`}>
                <div className="w-full flex flex-col px-5 text-sm gap-2"> 
                    <span key={id}>
                        <Link
                        href={COURSELINK}
                        className={`py-2`}
                        >
                            <p className={`rounded-sm pl-5  flex flex-row py-1 transition 
                            ${
                            isActive
                                ? "bg-hb-lightgreen text-hb-green font-semibold"
                                : "hover:bg-gray-100"
                            }`}> 
                            {title}{isCompleted ? " ✓" : ""}</p>
                        </Link>
                    </span>
                </div>
            </div>

            {/**Mobile */}

            <div className="flex flex-col w-full md:hidden gap-5 p-2  rounded-xl">
                <li key={id}>
                    <Link
                    href={COURSELINK}
                    className={`block rounded-md px-4 py-2 transition 
                        ${
                        isActive
                            ? "bg-hb-lightgreen text-hb-green font-semibold"
                            : "hover:bg-gray-100"
                        }`}
                    >
                    {title}{isCompleted ? " ✓" : ""}
                    </Link>
                </li>
            </div>
        </main>
    )
}