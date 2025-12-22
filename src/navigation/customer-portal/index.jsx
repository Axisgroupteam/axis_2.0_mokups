import { Route, Routes, Navigate } from "react-router-dom";
import { customerPortalRoutes } from "./routes";
import CustomerPortalLayout from "@/layouts/customer-portal";

const CustomerPortalRoutes = () => {
  return (
    <CustomerPortalLayout>
      <Routes>
        {customerPortalRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<Navigate to="metrics" replace />} />
      </Routes>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalRoutes;
