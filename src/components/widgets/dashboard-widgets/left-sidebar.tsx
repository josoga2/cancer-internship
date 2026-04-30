"use client";
import HbButtons from "@/components/widgets/hb-buttons";
import { BiDna, BiAtom } from "react-icons/bi";
import { MdOutlineDashboard, MdOutlineLeaderboard } from "react-icons/md";
import hb_logo from "@/../public/hb_logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, PanelRightClose, PanelRightOpen, X } from "lucide-react";
import { FaSlack } from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "@/api";
import Logout from "@/components/logout";
import ThemeToggle from "@/components/theme-toggle";

const tab_items = [
  {
    id: 1,
    name: "Dashboard",
    link: "/dashboard",
    iconImage: MdOutlineDashboard
  },
  {
    id: 2,
    name: "All Programs",
    link: "/dashboard/internship/1/courses",
    iconImage: BiDna
  },
  {
    id: 3,
    name: "Leaderboard",
    link: "/dashboard/leaderboard",
    iconImage: MdOutlineLeaderboard
  },
  {
    id: 4,
    name: "Practice Lab",
    link: "/dashboard/practice",
    iconImage: BiAtom,
    hidden: true, // temporary hide; keep config for quick re-enable
  }
];


export default function LeftSideBar() {

    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const [socialPercent, setSocialPercent] = useState(0);
    const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
    const [refreshingAccess, setRefreshingAccess] = useState(false);
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

    useEffect(() => {
        if (typeof window === "undefined") return;
        const sidebarOffset = isOpen ? "15rem" : "5.75rem";
        document.documentElement.style.setProperty("--hb-sidebar-offset", sidebarOffset);
    }, [isOpen]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get("/api/get-user-profile/");
                setHasActiveSubscription(Boolean(res.data?.has_active_subscription));
            } catch (error) {
                setHasActiveSubscription(false);
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        const fetchSocial = async () => {
            try {
                const res = await api.get("/api/slack/stats/");
                if (res.status === 200) {
                    const consistency = Number(res.data?.consistency_7d_percent || 0);
                    const socialPercentFromConsistency = Math.max(0, Math.min(100, Math.round(consistency)));
                    setSocialPercent(socialPercentFromConsistency);
                }
            } catch (error) {
                setSocialPercent(0);
            }
        };

        fetchSocial();
    }, []);

    const handleRefreshAccess = async () => {
        if (!hasActiveSubscription || refreshingAccess) return;
        setRefreshingAccess(true);
        try {
            const res = await api.post("/api/refresh-subscriber-access/");
            if (res.status === 200) {
                const internshipsAdded = Number(res.data?.internships_added || 0);
                const pathwaysAdded = Number(res.data?.pathways_added || 0);
                const coursesAdded = Number(res.data?.courses_added || 0);
                window.alert(
                    `Access refreshed. Added: ${internshipsAdded} internship(s), ${pathwaysAdded} pathway(s), ${coursesAdded} course(s).`
                );
            }
        } catch (error: any) {
            if (error?.response?.status === 402) {
                setHasActiveSubscription(false);
                window.alert("Your subscription is not active. Please renew to refresh access.");
            } else {
                window.alert("Unable to refresh access right now. Please try again.");
            }
        } finally {
            setRefreshingAccess(false);
        }
    };

    const visibleTabs = tab_items.filter((item) => !item.hidden);

    const socialColor =
        socialPercent >= 100 ? "#ef4444"
        : socialPercent >= 75 ? "#7c3aed"
        : socialPercent >= 50 ? "#f97316"
        : socialPercent >= 25 ? "#facc15"
        : socialPercent >= 10 ? "#3b82f6"
        : "#9ca3af";
    const ringStyle = {
        background: `conic-gradient(${socialColor} ${socialPercent * 3.6}deg, #e5e7eb 0deg)`,
    };

    return (
        <main>
            <div className={`hidden md:block transition-all duration-300 ease-in-out ml-5`}>
                <div className={`relative h-[calc(100vh_-_var(--hb-banner-offset))] ${isOpen ? "w-55" : "w-18"} shrink-0`}>
                  <div className={`fixed top-[var(--hb-banner-offset)] left-5 z-40 flex h-[calc(100vh_-_var(--hb-banner-offset))] flex-col gap-5 bg-white items-start border-r transition-all duration-300 ease-in-out ${isOpen ? "w-55" : "w-18"}`}>
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
                        {visibleTabs.map((item) => {
                            const activeLink = visibleTabs
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
                    <div className="mt-auto w-full px-4 pb-4">
                        <div className="flex flex-col items-center gap-2">
                            {hasActiveSubscription ? (
                                <button
                                    type="button"
                                    onClick={handleRefreshAccess}
                                    disabled={refreshingAccess}
                                    className={`inline-flex items-center justify-center rounded-md border border-hb-green/30 bg-hb-lightgreen text-xs font-semibold text-hb-green transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-60 ${
                                        isOpen ? "w-full gap-2 px-3 py-2" : "h-10 w-10"
                                    }`}
                                    title="Refresh and enroll into latest released programs"
                                >
                                    <span>↻</span>
                                    {isOpen ? <span>{refreshingAccess ? "Refreshing..." : "Sync Access"}</span> : null}
                                </button>
                            ) : null}
                            <ThemeToggle
                                variant="sidebar"
                                showLabel={isOpen}
                                className={isOpen ? "w-full" : ""}
                            />
                            <div
                                className="relative h-10 w-10"
                                title="7-day Slack consistency: percentage of the last 7 days with at least one Slack action."
                                aria-label="7-day Slack consistency: percentage of the last 7 days with at least one Slack action."
                            >
                                <div className="absolute inset-0 rounded-full" style={ringStyle} title="7-day Slack consistency: percentage of the last 7 days with at least one Slack action." />
                                <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center text-[10px] font-semibold text-gray-700" title="7-day Slack consistency: percentage of the last 7 days with at least one Slack action.">
                                    {socialPercent}%
                                </div>
                            </div>
                            <a
                                href="https://hackbiointern-ysx7640.slack.com/archives/C09N00Y6VLZ"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 text-xs text-blue-600 hover:underline w-full"
                            >
                                <FaSlack className="text-sm" />
                                {isOpen && <span>Social</span>}
                            </a>
                        </div>
                    </div>
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
                                {visibleTabs.map((item) => {
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
                            <div className="mt-auto px-4 pb-4">
                                <div className="flex flex-col items-center gap-2">
                                    {hasActiveSubscription ? (
                                        <button
                                            type="button"
                                            onClick={handleRefreshAccess}
                                            disabled={refreshingAccess}
                                            className="inline-flex w-full items-center justify-center rounded-md border border-hb-green/30 bg-hb-lightgreen px-3 py-2 text-xs font-semibold text-hb-green transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {refreshingAccess ? "Refreshing..." : "↻ Sync Access"}
                                        </button>
                                    ) : null}
                                    <ThemeToggle variant="sidebar" showLabel={true} className="w-full" />
                                    <div
                                        className="relative h-10 w-10"
                                        title="7-day Slack consistency: percentage of the last 7 days with at least one Slack action."
                                        aria-label="7-day Slack consistency: percentage of the last 7 days with at least one Slack action."
                                    >
                                        <div className="absolute inset-0 rounded-full" style={ringStyle} title="7-day Slack consistency: percentage of the last 7 days with at least one Slack action." />
                                        <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center text-[10px] font-semibold text-gray-700" title="7-day Slack consistency: percentage of the last 7 days with at least one Slack action.">
                                            {socialPercent}%
                                        </div>
                                    </div>
                                    <a
                                        href="https://hackbiointern-ysx7640.slack.com/archives/C09N00Y6VLZ"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center justify-center gap-2 text-xs text-blue-700 hover:underline w-full"
                                    >
                                        <FaSlack className="text-sm" />
                                        <span>Social</span>
                                    </a>
                                </div>
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
