import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import SidebarComponent from "./sidebar";
import DashboardNavbar from "./navbar";

const ModuleLayouts = ({ children }) => {
  return (
    <SidebarProvider>
      <SidebarComponent />
      <main className="flex flex-col h-screen w-screen bg-muted">
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default ModuleLayouts;
