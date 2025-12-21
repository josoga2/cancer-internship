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

const tab_items = [
  {
    id: 1,
    name: "Dashboard",
    link: "/dashboard",
    iconImage: MdOutlineDashboard
  },
  {
    id: 2,
    name: "Internships",
    link: "/dashboard/internship",
    iconImage: BiDna
  },
  {
    id: 3,
    name: "Internship Courses",
    link: "/dashboard/internship/1/courses",
    iconImage: BiDna
  },
  {
    id: 4,
    name: "Career Paths",
    link: "/dashboard/pathway",
    iconImage: BiAtom
  },
  {
    id: 5,
    name: "CP Courses",
    link: "/dashboard/pathway/courses",
    iconImage: BiAtom
  }
];

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


export default function LeftSideBarCourseContent({ tocHref, previous, next, contents, activeContentId }: SidebarProps) {

    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <main>
            <div className={`hidden w-full  h-full md:flex flex-col gap-5  items-center justify-center transition-all duration-300 ease-in-out border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen`}>
                <aside className="w-full flex flex-col gap-6 px-4 py-6 text-sm">
      
                    {/* TOC */}
                    <Link
                        href={tocHref}
                        className="flex items-center gap-2 text-base font-semibold hover:underline"
                    >
                        <CiViewList />
                        <span>Table of Contents</span>
                    </Link>

                    {/* Previous */}
                    {previous?.disabled ? (
                        <span className="text-base font-medium text-gray-400">
                        ← {previous.label}
                        </span>
                    ) : previous ? (
                        <Link
                        href={previous.href}
                        className="text-base font-medium hover:underline"
                        >
                        ← {previous.label}
                        </Link>
                    ) : null}

                    {/* Content list */}
                    <div className="flex flex-col gap-2">
                        <p className="text-base font-semibold">Module Content</p>

                        <ul className="flex flex-col gap-1">
                        {contents.map((item) => {
                            const isActive = item.id === activeContentId;

                            return (
                            <li key={item.id}>
                                <Link
                                href={item.href}
                                aria-current={isActive ? "page" : undefined}
                                className={`block rounded-md px-4 py-2 transition
                                    ${
                                    isActive
                                        ? "bg-hb-lightgreen text-hb-green font-semibold"
                                        : "hover:bg-gray-100"
                                    }`}
                                >
                                {item.title}
                                </Link>
                            </li>
                            );
                        })}
                        </ul>
                    </div>

                    {/* Next */}
                    {next?.disabled ? (
                        <span className="text-base font-medium text-gray-400">
                        {next.label} →
                        </span>
                    ) : next ? (
                        <Link
                        href={next.href}
                        className="text-base font-medium hover:underline"
                        >
                        {next.label} →
                        </Link>
                    ) : null}
                    </aside>
            </div>

            {/**Mobile */}

            <div className="flex flex-col w-full md:hidden gap-5 p-2  rounded-xl">
                {/** Top here */}
                {/* Top Navbar - Logo + Menu */}
                <div className="flex flex-row items-center justify-between py-2 border-b bg-white">
                    <div className="flex flex-row items-center gap-2">
                        <Image src={hb_logo} alt="HackBio logo" width={32} height={32} />
                        <p className="font-bold text-lg"></p>
                    </div>
                    <button
                        onClick={() => setMobileOpen(true)}
                        aria-label="Open navigation"
                        className="p-2 rounded-md border border-gray-300 bg-white shadow-sm"
                    >
                        {/* Hamburger Icon */}
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    
                </div>

                {mobileOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40 md:hidden"
                        onClick={() => setMobileOpen(false)}
                    />
                )}

                <div
                    className={`
                        fixed top-0 left-0 h-full w-65 bg-white z-50
                        transform transition-transform duration-300 ease-in-out
                        md:hidden
                        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
                    `}
                    >

                        <div className="flex flex-col h-full">

                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-4 border-b">
                                <div className="flex items-center gap-2">
                                <Image src={hb_logo} alt="logo" width={32} height={32} />
                                <p className="font-bold">HackBio</p>
                                </div>

                                <button onClick={() => setMobileOpen(false)}>
                                <X size={22} />
                                </button>
                            </div>

                            {/* Nav items */}
                            <div className="flex flex-col gap-1 p-3 text-sm">
                                {tab_items.map((item) => {
                                const isActive =
                                    pathname === item.link ||
                                    pathname.startsWith(item.link + "/");

                                return (
                                    <Link
                                    key={item.id}
                                    href={item.link}
                                    onClick={() => setMobileOpen(false)}
                                    >
                                    <div
                                        className={`
                                        flex items-center gap-3 px-4 py-3 rounded-md transition
                                        ${
                                            isActive
                                            ? "bg-green-100 text-hb-green font-semibold"
                                            : "text-gray-600 hover:bg-gray-100"
                                        }
                                        `}
                                    >
                                        <item.iconImage size={18} />
                                        <span>{item.name}</span>
                                    </div>
                                    </Link>
                                );
                                })}
                            
                            </div>
                            <div className="px-7 bottom-0 mt-auto mb-5 w-full">
                                <Logout />
                            </div>
                        </div>

                        
                </div>

                
            </div>
        </main>
    )
}