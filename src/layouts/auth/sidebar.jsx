import React, { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import useUserDetails from "@/hooks/useUserDetails";
import ThemeLogo from "@/components/theme-logo";
import UserButton from "./user-button";
import { ChevronRightIcon, Building2Icon, UsersIcon } from "lucide-react";

const SidebarComponent = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { allowedRoutes } = useUserDetails();
  const { isMobile, setOpenMobile } = useSidebar();
  const [openMenu, setOpenMenu] = useState(null);

  // Customers sub-menu items
  const customersSubItems = [
    {
      label: "Customers",
      href: "/app/customers",
      icon: Building2Icon,
    },
    {
      label: "Customer Users",
      href: "/app/customer-users",
      icon: UsersIcon,
    },
  ];

  // Use allowedRoutes directly (Customers is handled as a collapsible menu)
  const filteredRoutes = allowedRoutes;

  // Auto-open customers menu when on customers paths
  useEffect(() => {
    const isCustomersPath = customersSubItems.some((item) =>
      pathname.startsWith(item.href)
    );
    if (isCustomersPath) {
      setOpenMenu("customers");
    }
  }, [pathname]);

  const handleLinkClick = () => {
    // Close mobile sidebar when link is clicked
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="text-sidebar-accent-foreground h-12 flex items-center justify-center">
        <div className="flex items-center w-full px-2">
          <Link to="/" className="flex items-center gap-2">
            <ThemeLogo className="h-7 w-auto group-data-[collapsible=icon]:hidden" />
          </Link>
        </div>
      </SidebarHeader>

      <div className="py-2">
        <Separator className="text-[#212524]" />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredRoutes.map((item, index) => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon;
                const isCarriers = item.href === "/app/carriers";

                return (
                  <React.Fragment key={item.href}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          "h-10 mb-1 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                          isActive && "bg-linear-to-r/oklch border-[#5D6B68]/10"
                        )}
                        isActive={isActive}
                      >
                        <Link to={item.href} onClick={handleLinkClick}>
                          {IconComponent &&
                            typeof IconComponent !== "boolean" && (
                              <IconComponent className="size-5" />
                            )}
                          <span className="text-md font-medium tracking-tight">
                            {item.label}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Customers with Sub-menu - render after Carriers */}
                    {isCarriers && (
                      <Collapsible
                        open={openMenu === "customers"}
                        onOpenChange={(isOpen) => setOpenMenu(isOpen ? "customers" : null)}
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              className={cn(
                                "h-10 mb-1 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                customersSubItems.some((item) => pathname.startsWith(item.href)) &&
                                  "bg-linear-to-r/oklch border-[#5D6B68]/10"
                              )}
                              isActive={customersSubItems.some(
                                (item) => pathname.startsWith(item.href)
                              )}
                            >
                              <Building2Icon className="size-5" />
                              <span className="text-md font-medium tracking-tight">
                                Customers
                              </span>
                              <ChevronRightIcon
                                className={cn(
                                  "ml-auto size-4 transition-transform duration-200",
                                  openMenu === "customers" && "rotate-90"
                                )}
                              />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {customersSubItems.map((subItem) => {
                                const isActive = pathname.startsWith(subItem.href);
                                const IconComponent = subItem.icon;
                                return (
                                  <SidebarMenuSubItem key={subItem.href}>
                                    <SidebarMenuSubButton
                                      asChild
                                      className={cn(
                                        "w-full h-10 mb-1 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                        isActive &&
                                          "bg-linear-to-r/oklch border-[#5D6B68]/10"
                                      )}
                                      isActive={isActive}
                                    >
                                      <Link to={subItem.href} onClick={handleLinkClick}>
                                        {IconComponent && (
                                          <IconComponent className="size-4" />
                                        )}
                                        <span>{subItem.label}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                );
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    )}
                  </React.Fragment>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserButton />{" "}
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarComponent;
