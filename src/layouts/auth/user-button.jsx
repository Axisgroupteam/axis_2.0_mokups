import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import GeneratedAvatar from "@/components/generated-avatar";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  LogOutIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import useUserDetails from "@/hooks/useUserDetails";
import { useDispatch } from "react-redux";
import { logOutUser } from "@/redux/slice/auth.slice";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import { useTheme } from "@/providers/ThemeProvider";

const UserButton = () => {
  const { data } = useUserDetails();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const username = data?.name || data?.username || data?.email || "User";
  const email = data?.email || "";

  const onLogout = async () => {
    dispatch(logOutUser());
    localStorage.removeItem("persist:root");
    navigate("/");
  };

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="flex items-center gap-2 rounded-full hover:bg-sidebar-accent p-1 transition-colors duration-200">
          <GeneratedAvatar
            seed={username}
            variant="botttsNeutral"
            className="size-8 rounded-full"
          />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {data?.customer && (
                <div className="text-sm text-bold font-medium text-muted-foreground mb-1">
                  {data.customer.name}
                </div>
              )}
              {username}
            </DrawerTitle>
            <DrawerDescription>{email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant="outline" onClick={onLogout} className="w-full">
              <LogOutIcon className="size-4 mr-2" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger
        className={`flex items-center gap-2 hover:bg-sidebar-accent p-2 transition-colors duration-200 border border-sidebar-border ${
          isCollapsed ? "rounded-full justify-center" : "rounded-sm w-full"
        }`}
      >
        <GeneratedAvatar
          seed={username}
          variant="botttsNeutral"
          className="size-8 rounded-full shrink-0"
        />
        {!isCollapsed && (
          <>
            <div className="flex flex-col flex-1 text-left min-w-0">
              <span className="text-sm font-medium truncate">{username}</span>
              <span className="text-xs text-muted-foreground truncate">
                {email}
              </span>
            </div>
            <div className="transition-transform duration-200 ease-in-out shrink-0">
              {isDropdownOpen ? (
                <ChevronUpIcon className="size-4 text-muted-foreground" />
              ) : (
                <ChevronDownIcon className="size-4 text-muted-foreground" />
              )}
            </div>
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={isCollapsed ? "center" : "end"}
        side="right"
        className="w-56"
      >
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{username}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">
              {email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer flex items-center justify-between"
          onClick={toggleTheme}
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
          {theme === "dark" ? (
            <SunIcon className="size-4" />
          ) : (
            <MoonIcon className="size-4" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer flex items-center justify-between"
          onClick={onLogout}
        >
          Logout <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
