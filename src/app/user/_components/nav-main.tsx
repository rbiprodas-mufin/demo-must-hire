"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactElement
  }[]
}) {
  const pathname = usePathname()
  const isActive = (url: string) => pathname === url

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="flex flex-col gap-1">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                tooltip={item.title} 
                size="xl" 
                className={cn("hover:bg-emerald-50", {
                  "bg-blue-50": isActive(item.url),
                })}
                // isActive={isActive(item.url)}
              >
                <Link 
                  href={item.url} 
                  className={cn("flex flex-col justify-center items-center", {
                    "font-medium text-blue-950": isActive(item.url),
                  })}
                  >
                  <div className="flex flex-col justify-center items-center">
                    {item.icon && item.icon}
                    <span className="text-xs">{item.title}</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
