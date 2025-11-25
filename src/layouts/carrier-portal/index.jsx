import { SidebarProvider } from "@/components/ui/sidebar";
import CarrierPortalSidebar from "./sidebar";
import CarrierPortalNavbar from "./navbar";

const CarrierPortalLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <CarrierPortalSidebar />
      <main className="flex flex-col h-screen flex-1 min-w-0 bg-muted">
        <CarrierPortalNavbar />
        <div className="flex-1 overflow-auto min-h-0">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default CarrierPortalLayout;
