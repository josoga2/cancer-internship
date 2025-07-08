"use client"

import * as React from "react"
import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2,
} from "lucide-react"
import hb_logo from "../../public/hb_logo.png"

import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavWorkspaces } from "@/components/nav-workspaces"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  teams: [
    {
      name: "HackBio",
      logo: hb_logo,
      plan: "Premium",
    }
  ],
  navMain: [
    {
      title: "Internship",
      url: "#",
      icon: Search,
      isActive: true,
    },
    {
      title: "Courses",
      url: "#",
      icon: Sparkles,
      isActive: false,
    },
    {
      title: "Data Playground",
      url: "#",
      icon: Home,
      isActive: false,
    },
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
    </Sidebar>
  )
}
