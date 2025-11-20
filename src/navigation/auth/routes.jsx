import Dashboard from "@/pages/Dashboard";
import Carriers from "@/pages/Carriers";
import CarrierDetail from "@/pages/CarrierDetail";
import Shippers from "@/pages/Shippers";
import SystemUsers from "@/pages/SystemUsers";
import ModuleLayouts from "@/layouts/auth";
import CarrierPortalRoutes from "@/navigation/carrier-portal";
import {
  LayoutDashboardIcon,
  TruckIcon,
  PackageIcon,
  UsersIcon,
} from "lucide-react";

export const authRoutes = [
  {
    path: "carrier-portal/*",
    access: ["All"],
    description: "Carrier Portal",
    element: <CarrierPortalRoutes />,
    isShowOnSidebar: false,
    icon: false,
    label: "Carrier Portal",
    href: "carrier-portal",
  },
  {
    path: "carriers/:id",
    access: ["All"],
    description: "Carrier Detail",
    element: (
      <ModuleLayouts>
        <CarrierDetail />
      </ModuleLayouts>
    ),
    isShowOnSidebar: false,
    icon: false,
    label: "Carrier Detail",
    href: "carriers/:id",
  },
  {
    path: "dashboard",
    access: ["All"],
    description: "Dashboard",
    element: (
      <ModuleLayouts>
        <Dashboard />
      </ModuleLayouts>
    ),
    isShowOnSidebar: true,
    icon: LayoutDashboardIcon,
    label: "Dashboard",
    href: "dashboard",
  },
  {
    path: "carriers",
    access: ["All"],
    description: "Carriers Management",
    element: (
      <ModuleLayouts>
        <Carriers />
      </ModuleLayouts>
    ),
    isShowOnSidebar: true,
    icon: TruckIcon,
    label: "Carriers",
    href: "carriers",
  },
  {
    path: "shippers",
    access: ["All"],
    description: "Shippers Management",
    element: (
      <ModuleLayouts>
        <Shippers />
      </ModuleLayouts>
    ),
    isShowOnSidebar: true,
    icon: PackageIcon,
    label: "Shippers",
    href: "shippers",
  },
  {
    path: "system-users",
    access: ["All"],
    description: "System Users Management",
    element: (
      <ModuleLayouts>
        <SystemUsers />
      </ModuleLayouts>
    ),
    isShowOnSidebar: true,
    icon: UsersIcon,
    label: "System Users",
    href: "system-users",
  },
];
