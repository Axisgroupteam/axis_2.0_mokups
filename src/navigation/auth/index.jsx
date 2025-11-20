import { useEffect, useState } from "react";
import { authRoutes } from "./routes";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthenticatedRoutes = ({ userRole }) => {
  const [authRoutesState, setAuthRoutesState] = useState([]);

  useEffect(() => {
    // Conditionally Filtering All Routes On The Basis Of Role
    const routes = authRoutes?.filter(
      (route) => route.access.includes(userRole) || route.access.includes("All")
    );

    setAuthRoutesState(routes);
  }, [userRole]);

  // Only reder when authRoutesState has minimum one route.
  if (authRoutesState.length == 0) {
    return null;
  }

  return (
    <Routes>
      {/**-------------  Conditionally Redering All Routes On The Basis Of Role -------------**/}

      {authRoutesState.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
    </Routes>
  );
};

export default AuthenticatedRoutes;
