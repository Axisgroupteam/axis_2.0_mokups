import React from "react";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

const NavbarThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="sm"
      className="h-12 w-12 p-0 text-sidebar-foreground hover:bg-sidebar-accent "
      aria-label="Toggle theme"
    >
      {!isDark ? (
        <SunIcon className="size-6" />
      ) : (
        <MoonIcon className="size-6" />
      )}
    </Button>
  );
};

export default NavbarThemeSwitcher;
