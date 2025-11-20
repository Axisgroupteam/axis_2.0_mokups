import { Route, Routes, Navigate } from "react-router-dom";
import { carrierPortalRoutes } from "./routes";
import CarrierPortalLayout from "@/layouts/carrier-portal";

const CarrierPortalRoutes = () => {
  return (
    <CarrierPortalLayout>
      <Routes>
        {carrierPortalRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<Navigate to="metrics" replace />} />
      </Routes>
    </CarrierPortalLayout>
  );
};

export default CarrierPortalRoutes;
