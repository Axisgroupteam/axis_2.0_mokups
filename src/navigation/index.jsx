import { Route, Routes, Navigate } from "react-router-dom";
import PublicRoutes from "./public";
import useUserDetails from "@/hooks/useUserDetails";
import AuthenticatedRoutes from "./auth";

const Root = () => {
  const { isLoggedIn } = useUserDetails();

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          {/**-------------  Authenticated Routes -------------**/}
          <Route
            path="/app/*"
            element={<AuthenticatedRoutes userRole={"All"} />}
          />
          <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
        </>
      ) : (
        <>
          {/**-------------  Public Routes -------------**/}
          <Route path="/*" element={<PublicRoutes />} />
        </>
      )}
    </Routes>
  );
};

export default Root;
