import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const PublicLayout = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const authRedirect = useMemo(() => {
    const isSignup = pathname === "/signup";
    return {
      route: isSignup ? "/login" : "/signup",
      label: isSignup ? "Sign in" : "Sign up",
    };
  }, [pathname]);

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header */}
      <header className="px-5 py-3 h-[8vh] flex justify-between items-center border-b">
        <h1 className="text-xl font-semibold">Enterprise Pro</h1>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {pathname === "/signup"
              ? "Already have an account?"
              : "Dont have an account?"}
          </p>
          <Button
            variant="outline"
            className="flex items-center text-sm"
            onClick={() => navigate(authRedirect.route)}
          >
            {authRedirect.label}
            <ChevronRight className="size-5 ml-1" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>

      {/* Footer */}
      <footer className="h-[12vh] border-t flex flex-col text-sm text-muted-foreground">
        <div className="flex h-full justify-center items-center gap-20">
          <div>Privacy Policy</div>
          <div>Terms of Service</div>
          <div>Help Center</div>
        </div>
        <div className="flex h-full justify-center items-center">
          © 2024 Domain. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
