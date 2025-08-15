"use client"

import * as React from "react"
import {
  TbCamera,
  TbChartBar,
  TbDashboard,
  TbDatabase,
  TbFileAi,
  TbFileDescription,
  TbFileWord,
  TbFolder,
  TbHelp,
  TbInnerShadowTop,
  TbListDetails,
  TbMessageCircle,
  TbReport,
  TbSearch,
  TbSettings,
  TbUsers,
} from "react-icons/tb"

import { NavDocuments } from "./nav-documents"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const data = {
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/images/avatar.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: <TbDashboard className="size-5" />,
    },
    {
      title: "Jobs",
      url: "/user/jobs",
      icon: <TbListDetails className="size-5" />,
    },
    {
      title: "Applications",
      url: "/user/applications",
      icon: <TbChartBar className="size-5" />,
    },
    {
      title: "Resume",
      url: "/user/resume",
      icon: <TbFolder className="size-5" />,
    },
    {
      title: "Profile",
      url: "/user/profile",
      icon: <TbUsers className="size-5" />,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: <TbCamera />,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: <TbFileDescription />,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: <TbFileAi />,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Search",
      url: "#",
      icon: <TbSearch />,
    },
    {
      title: "Get Help",
      url: "#",
      icon: <TbHelp />,
    },
    {
      title: "Settings",
      url: "#",
      icon: <TbSettings />,
    },
  ],
  documents: [
    {
      name: "Agent",
      url: "#",
      icon: <TbDatabase /> ,
    },
    {
      name: "Refer & Earn",
      url: "#",
      icon: <TbReport />,
    },
    {
      name: "Messages",
      url: "#",
      icon: <TbMessageCircle />,
    },
    {
      name: "Feedback",
      url: "#",
      icon: <TbFileWord />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-center items-center">
            <Button asChild size="icon" variant="ghost">
              <Link href="/user/dashboard">
                <TbInnerShadowTop className="size-6 text-blue-950" />
                {/* <span className="text-lg font-bold">MustHire</span> */}
              </Link>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  )
}
