"use client"

import Link from "next/link"
import * as React from "react"
import {
  TbBriefcase,
  TbChartBar,
  TbDashboard,
  TbHelp,
  TbInnerShadowTop,
  TbListDetails,
  TbSearch,
  TbSettings,
  TbUsers
} from "react-icons/tb"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: TbDashboard,
    },
    {
      title: "Applicants",
      url: "/admin/applicants",
      icon: TbListDetails,
    },
    {
      title: "Applications",
      url: "/admin/applications",
      icon: TbChartBar,
    },
    {
      title: "Jobs",
      url: "/admin/jobs",
      icon: TbBriefcase,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: TbUsers,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/admin/settings",
      icon: TbSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: TbHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: TbSearch,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/admin/dashboard">
                <TbInnerShadowTop className="!size-5" />
                <span className="text-lg font-bold text-blue-950">MustHire</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
