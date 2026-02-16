"use client";
import HbButtons from "@/components/widgets/hb-buttons";
import { BiDna, BiAtom } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";
import hb_logo from "@/../public/hb_logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, PanelRightClose, PanelRightOpen, X } from "lucide-react";
import { useEffect, useState } from "react";
import Logout from "@/components/logout";

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
    link: "/dashboard/internship/1/courses",
    iconImage: BiDna
  },
  {
    id: 3,
    name: "Career Paths",
    link: "/dashboard/internship/1/courses",
    iconImage: BiDna
  }
];


export default function LeftSideBar() {

    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const storageKey = "hb.sidebar.open";

    useEffect(() => {
        const stored = localStorage.getItem(storageKey);
        if (stored !== null) {
            setIsOpen(stored === "true");
        }
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (!hasMounted) return;
        localStorage.setItem(storageKey, String(isOpen));
    }, [isOpen, hasMounted]);

    return (
        <main>
            <div className={`hidden w-full  h-full md:flex flex-col gap-5  items-center justify-center transition-all duration-300 ease-in-out `}>
                <div className={`flex flex-col gap-5 text-base h-screen bg-white items-start  border-r transition-all duration-300 ease-in-out ${isOpen ? "w-55" : "w-18"} `}>
                    <div className="flex flex-row items-center justify-between w-full gap-2  py-5">
                        <div className="flex flex-row items-center gap-2">
                        <Image src={hb_logo} alt="logo" width={36} height={36} />
                        {isOpen && <p className="font-bold">HackBio</p>}
                        </div>
                        <div
                            onClick={() => setIsOpen(!isOpen)}
                            className=" bg-white  rounded-full p-1  cursor-pointer"
                            >
                            {isOpen ? <PanelRightOpen /> : <PanelRightClose />}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                        {tab_items.map((item) => {
                            const activeLink = tab_items
                            .filter(item => pathname === item.link || pathname.startsWith(item.link + "/"))
                            .sort((a, b) => b.link.length - a.link.length)[0]?.link;
                        
                            const isActive = item.link === activeLink;


                            //console.log("Current Pathname:", pathname);
                            //console.log("Checking item link:", item.link);
                            //console.log("Is Active:", isActive);

                        return (
                            <Link key={item.id} href={item.link}>
                            <div
                                className={`
                                flex items-center gap-3 px-4 py-2 rounded-md transition
                                ${isActive
                                    ? "bg-green-100 text-hb-green font-semibold border-l-4 border-hb-green"
                                    : "text-gray-600 hover:bg-gray-100"}
                                ${!isOpen && "justify-center px-0"}
                                `}
                            >
                                <item.iconImage size={18} />
                                {isOpen && <span>{item.name}</span>}
                            </div>
                            </Link>
                        );
                        })}
                    </div>
                </div>
            </div>

            {/**Mobile */}

            <div className="flex flex-col w-full md:hidden gap-5 p-2 rounded-xl">
                {/** Top here */}
                {/* Top Navbar - Logo + Menu */}
                <div className="flex flex-row items-center justify-between py-2 border-b ">
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
