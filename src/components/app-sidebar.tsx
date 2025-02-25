"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
} from "@/components/ui/sidebar";

import { ShoppingBasket, Home, Inbox,  Settings, PackageSearch } from "lucide-react";

import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Home",
    url: "adminhome",
    icon: Home,
  },
  {
    title: "Report",
    url: "report",
    icon: Inbox,
  },
  {
    title: "Product",
    url: "product",
    icon: PackageSearch,
  },
  {
    title: "Product Post",
    url: "productPost",
    icon: ShoppingBasket,
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  console.log(pathname);

  const getPath = pathname.split("/")[2];
  // const data = items.map((item) => item.url.split("/"));
  // console.log("data", data);
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Mr Electronic</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                // console.log("pathname === item.url",pathname === item.url),
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={getPath === item.url}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
