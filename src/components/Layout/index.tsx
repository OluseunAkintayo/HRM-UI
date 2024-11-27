import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import React from "react"
import { SidebarComponent } from "./SidebarComponent";

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <>
      <SidebarProvider>
        <SidebarComponent />
        <main className="w-full">
          <SidebarTrigger />
          <div className="p-4">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </>
  )
}

export default Layout;