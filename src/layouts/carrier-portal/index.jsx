import { SidebarProvider } from "@/components/ui/sidebar";
import CarrierPortalSidebar from "./sidebar";
import CarrierPortalNavbar from "./navbar";

const CarrierPortalLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <CarrierPortalSidebar />
      <main className="flex flex-col h-screen w-screen bg-muted">
        <CarrierPortalNavbar />
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default CarrierPortalLayout;
