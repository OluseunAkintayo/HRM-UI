import { Calendar, Home, Inbox, LogOut, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Profile Settings",
    url: "/profile",
    icon: Inbox,
  }
]
const leave = [
  {
    title: "Leave Summary",
    url: "#",
    icon: Home,
  },
  {
    title: "Annual Leave",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Compassionate Leave",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Sick Leave",
    url: "#",
    icon: Search,
  },
  {
    title: "Study Leave",
    url: "#",
    icon: Settings,
  },
]
const remuneration = [
  {
    title: "Compensation",
    url: "#",
    icon: Home,
  },
  {
    title: "Payslip",
    url: "#",
    icon: Inbox,
  }
]

export function SidebarComponent() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="border border-b">
          <SidebarGroupLabel>
            <h3 className="text-xl">HRM</h3>
          </SidebarGroupLabel>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      {/* <item.icon /> */}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Leave</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {leave.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {/* <item.icon /> */}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Remuneration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {remuneration.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Exit</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <span>End contract</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border border-t">
        <div className="flex items-center gap-2 mb-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <span className="select-none">{sessionStorage.getItem("username")}</span>
        </div>
        <Button>
          <LogOut />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
