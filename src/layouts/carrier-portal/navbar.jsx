import { Link } from "react-router-dom";
import useBreadcrumbs from "@/hooks/useBreadcrumbs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { BellIcon, PanelLeftClose, PanelLeftOpen, Truck } from "lucide-react";

const CarrierPortalNavbar = () => {
  const breadcrumbs = useBreadcrumbs();
  const { toggleSidebar, open } = useSidebar();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b bg-sidebar text-sidebar-foreground border-sidebar-border px-4">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-2 size-8 flex items-center justify-center rounded-md border border-[#5D6B68]/10 hover:bg-sidebar-accent/50 transition-colors"
        >
          {open ? (
            <PanelLeftClose className="size-4" />
          ) : (
            <PanelLeftOpen className="size-4" />
          )}
        </button>
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <BreadcrumbItem key={breadcrumb.path}>
                {index === breadcrumbs.length - 1 ? (
                  <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                ) : (
                  <>
                    {breadcrumb.isLinkable !== false ? (
                      <BreadcrumbLink asChild>
                        <Link to={breadcrumb.path}>{breadcrumb.label}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <span className="text-muted-foreground">
                        {breadcrumb.label}
                      </span>
                    )}
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2">
        {/* Notification Icon */}
        <div className="h-14 w-[0.5px] bg-sidebar-border" />

        <Button variant="ghost" size="icon">
          <BellIcon className="size-5" />
        </Button>

        {/* Separator */}
        <div className="h-14 w-px bg-sidebar-border" />

        {/* Carrier Portal Title */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center bg-primary rounded-sm p-1.5">
            <Truck className="size-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm leading-tight">
              Mega Trucking
            </span>
            <span className="text-xs text-muted-foreground leading-tight">
              Carrier Portal
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CarrierPortalNavbar;
