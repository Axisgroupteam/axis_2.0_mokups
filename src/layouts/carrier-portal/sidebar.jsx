import { useState, useEffect } from "react";
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
  SidebarTrigger,
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
import ThemeLogo from "@/components/theme-logo";
import UserButton from "@/layouts/auth/user-button";
import {
  LayoutDashboardIcon,
  ShoppingCartIcon,
  DatabaseIcon,
  ChevronRightIcon,
  PackageIcon,
  LayersIcon,
  TruckIcon,
  Building2Icon,
  UsersIcon,
  PackageSearchIcon,
  DollarSignIcon,
  MapPinIcon,
  BoxIcon,
  WalletIcon,
  ClipboardCheckIcon,
  UserPlusIcon,
  Building2,
  ListIcon,
  ReceiptIcon,
  ShoppingBagIcon,
  BadgeDollarSignIcon,
  PhoneIncomingIcon,
  ClockIcon,
  CheckCircleIcon,
  HandshakeIcon,
  InboxIcon,
  SearchIcon,
  SendIcon,
  CheckCircle2Icon,
  AlertTriangleIcon,
  ClipboardListIcon,
} from "lucide-react";

const CarrierPortalSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { isMobile, setOpenMobile } = useSidebar();
  const [openMenu, setOpenMenu] = useState(null); // "sales" | "orders" | "brokerage" | "master" | "onboarding" | null

  // Carrier portal menu items
  const menuItems = [
    {
      icon: LayoutDashboardIcon,
      label: "Dashboard",
      href: "/app/carrier-portal/metrics",
    },
  ];


  // Orders sub-menu items
  const ordersSubItems = [
    {
      label: "Bulk",
      href: "/app/carrier-portal/orders/bulk",
      icon: PackageIcon,
    },
    {
      label: "Aggregate",
      href: "/app/carrier-portal/orders/aggregate",
      icon: LayersIcon,
    },
    {
      label: "Walking Floor TMF",
      href: "/app/carrier-portal/orders/walking-floor-tmf",
      icon: TruckIcon,
    },
    {
      label: "Precast",
      href: "/app/carrier-portal/orders/precast",
      icon: Building2Icon,
    },
  ];

  // Brokerage sub-menu items (Brokerage Coverage - Andrew Swicegood's Team)
  const brokerageSubItems = [
    {
      label: "Load Board",
      href: "/app/carrier-portal/brokerage/queue",
      icon: InboxIcon,
    },
    {
      label: "Billing",
      href: "/app/carrier-portal/brokerage/billing",
      icon: ReceiptIcon,
    },
  ];

  // Master sub-menu items
  const masterSubItems = [
    {
      label: "Users",
      href: "/app/carrier-portal/master/users",
      icon: UsersIcon,
    },
    {
      label: "Assets",
      href: "/app/carrier-portal/master/assets",
      icon: BoxIcon,
    },
    {
      label: "Customers",
      href: "/app/carrier-portal/master/customers",
      icon: PackageSearchIcon,
    },
    {
      label: "Payee",
      href: "/app/carrier-portal/master/payee",
      icon: WalletIcon,
    },
    {
      label: "Rates",
      href: "/app/carrier-portal/master/rates",
      icon: DollarSignIcon,
    },
    {
      label: "Location",
      href: "/app/carrier-portal/master/location",
      icon: MapPinIcon,
    },
    {
      label: "Categories",
      href: "/app/carrier-portal/master/categories",
      icon: ListIcon,
    },
    {
      label: "Business Unit",
      href: "/app/carrier-portal/master/business-unit",
      icon: Building2Icon,
    },
    {
      label: "Additional Charges",
      href: "/app/carrier-portal/master/additional-charges",
      icon: ReceiptIcon,
    },
    {
      label: "Product Sales",
      href: "/app/carrier-portal/master/product-sales",
      icon: ShoppingBagIcon,
    },
  ];

  // Onboarding sub-menu items
  const onboardingSubItems = [
    {
      label: "Driver",
      href: "/app/carrier-portal/onboarding/driver",
      icon: UserPlusIcon,
    },
    {
      label: "Carrier",
      href: "/app/carrier-portal/onboarding/carrier",
      icon: Building2,
    },
  ];

  // Automatically open the correct collapsible menu based on current URL
  useEffect(() => {
    const isOrdersPath = ordersSubItems.some((item) => pathname === item.href);
    const isBrokeragePath = brokerageSubItems.some((item) => pathname === item.href);
    const isMasterPath = masterSubItems.some((item) => pathname === item.href);
    const isOnboardingPath = onboardingSubItems.some((item) => pathname === item.href);

    if (isOrdersPath) {
      setOpenMenu("orders");
    } else if (isBrokeragePath) {
      setOpenMenu("brokerage");
    } else if (isMasterPath) {
      setOpenMenu("master");
    } else if (isOnboardingPath) {
      setOpenMenu("onboarding");
    } else {
      setOpenMenu(null);
    }
  }, [pathname]);

  const handleLinkClick = () => {
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
              {/* Dashboard */}
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "h-10 mb-1 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                        isActive && "bg-linear-to-r/oklch border-[#5D6B68]/10"
                      )}
                      isActive={isActive}
                    >
                      <Link to={item.href} onClick={handleLinkClick}>
                        {IconComponent && (
                          <IconComponent className="size-5" />
                        )}
                        <span className="text-md font-medium tracking-tight">
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}

              {/* Load Request (Order Capture) */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "h-10 mb-1 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                    pathname === "/app/carrier-portal/sales/orders" && "bg-linear-to-r/oklch border-[#5D6B68]/10"
                  )}
                  isActive={pathname === "/app/carrier-portal/sales/orders"}
                >
                  <Link to="/app/carrier-portal/sales/orders" onClick={handleLinkClick}>
                    <BadgeDollarSignIcon className="size-5" />
                    <span className="text-md font-medium tracking-tight">
                      Load Requests
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Orders with Sub-menu */}
              <Collapsible
                open={openMenu === "orders"}
                onOpenChange={(isOpen) => setOpenMenu(isOpen ? "orders" : null)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className={cn(
                        "h-10 mb-1 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                        ordersSubItems.some((item) => pathname === item.href) &&
                          "bg-linear-to-r/oklch border-[#5D6B68]/10"
                      )}
                      isActive={ordersSubItems.some(
                        (item) => pathname === item.href
                      )}
                    >
                      <ShoppingCartIcon className="size-5" />
                      <span className="text-md font-medium tracking-tight">
                        Orders
                      </span>
                      <ChevronRightIcon
                        className={cn(
                          "ml-auto size-4 transition-transform duration-200",
                          openMenu === "orders" && "rotate-90"
                        )}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {ordersSubItems.map((subItem) => {
                        const isActive = pathname === subItem.href;
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
                                  <IconComponent className="size-4 " />
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

              {/* Brokerage with Sub-menu (Brokerage Coverage) */}
              <Collapsible
                open={openMenu === "brokerage"}
                onOpenChange={(isOpen) => setOpenMenu(isOpen ? "brokerage" : null)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className={cn(
                        "h-10 mb-1 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                        brokerageSubItems.some((item) => pathname === item.href) &&
                          "bg-linear-to-r/oklch border-[#5D6B68]/10"
                      )}
                      isActive={brokerageSubItems.some(
                        (item) => pathname === item.href
                      )}
                    >
                      <HandshakeIcon className="size-5" />
                      <span className="text-md font-medium tracking-tight">
                        Brokerage
                      </span>
                      <ChevronRightIcon
                        className={cn(
                          "ml-auto size-4 transition-transform duration-200",
                          openMenu === "brokerage" && "rotate-90"
                        )}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {brokerageSubItems.map((subItem) => {
                        const isActive = pathname === subItem.href;
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

              {/* Master with Sub-menu */}
              <Collapsible
                open={openMenu === "master"}
                onOpenChange={(isOpen) => setOpenMenu(isOpen ? "master" : null)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className={cn(
                        "h-10 mb-1 mt-2 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                        masterSubItems.some((item) => pathname === item.href) &&
                          "bg-linear-to-r/oklch border-[#5D6B68]/10"
                      )}
                      isActive={masterSubItems.some(
                        (item) => pathname === item.href
                      )}
                    >
                      <DatabaseIcon className="size-5" />
                      <span className="text-md font-medium tracking-tight">
                        Master
                      </span>
                      <ChevronRightIcon
                        className={cn(
                          "ml-auto size-4 transition-transform duration-200",
                          openMenu === "master" && "rotate-90"
                        )}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {masterSubItems.map((subItem) => {
                        const isActive = pathname === subItem.href;
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

              {/* Onboarding with Sub-menu */}
              <Collapsible
                open={openMenu === "onboarding"}
                onOpenChange={(isOpen) => setOpenMenu(isOpen ? "onboarding" : null)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className={cn(
                        "h-10 mb-1 mt-2 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                        onboardingSubItems.some((item) => pathname === item.href) &&
                          "bg-linear-to-r/oklch border-[#5D6B68]/10"
                      )}
                      isActive={onboardingSubItems.some(
                        (item) => pathname === item.href
                      )}
                    >
                      <ClipboardCheckIcon className="size-5" />
                      <span className="text-md font-medium tracking-tight">
                        Onboarding
                      </span>
                      <ChevronRightIcon
                        className={cn(
                          "ml-auto size-4 transition-transform duration-200",
                          openMenu === "onboarding" && "rotate-90"
                        )}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {onboardingSubItems.map((subItem) => {
                        const isActive = pathname === subItem.href;
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default CarrierPortalSidebar;
