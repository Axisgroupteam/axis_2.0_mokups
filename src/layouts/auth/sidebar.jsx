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
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import useUserDetails from "@/hooks/useUserDetails";
import ThemeLogo from "@/components/theme-logo";
import UserButton from "./user-button";

const SidebarComponent = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { allowedRoutes } = useUserDetails();
  const { isMobile, setOpenMobile } = useSidebar();

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
              {allowedRoutes.map((item) => {
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
