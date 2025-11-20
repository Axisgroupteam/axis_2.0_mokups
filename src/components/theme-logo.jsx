import React from "react";
import { useTheme } from "@/providers/ThemeProvider";
import BrandWhite from "@/assets/BrandWhite.png";
import BrandDark from "@/assets/BrandDark.png";

const ThemeLogo = ({ className = "h-8 w-auto", alt = "Brand Logo" }) => {
  const { theme } = useTheme();

  // Determine which logo to use based on theme
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const logoSrc = isDark ? BrandWhite : BrandDark;

  return <img src={logoSrc} alt={alt} className={className} />;
};

export default ThemeLogo;
