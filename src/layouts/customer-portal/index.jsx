import { SidebarProvider } from "@/components/ui/sidebar";
import CustomerPortalSidebar from "./sidebar";
import CustomerPortalNavbar from "./navbar";

const CustomerPortalLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <CustomerPortalSidebar />
      <main className="flex flex-col h-screen flex-1 min-w-0 bg-muted">
        <CustomerPortalNavbar />
        <div className="flex-1 overflow-auto min-h-0">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default CustomerPortalLayout;
