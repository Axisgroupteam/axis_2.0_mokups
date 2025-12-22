import Dashboard from "@/pages/Dashboard";
import Carriers from "@/pages/Carriers";
import CarrierDetail from "@/pages/CarrierDetail";
import Shippers from "@/pages/Shippers";
import CustomerDetail from "@/pages/CustomerDetail";
import CustomerUsers from "@/pages/CustomerUsers";
import SystemUsers from "@/pages/SystemUsers";
import ModuleLayouts from "@/layouts/auth";
import CarrierPortalRoutes from "@/navigation/carrier-portal";
import CustomerPortalRoutes from "@/navigation/customer-portal";
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
    path: "customer-portal/*",
    access: ["All"],
    description: "Customer Portal",
    element: <CustomerPortalRoutes />,
    isShowOnSidebar: false,
    icon: false,
    label: "Customer Portal",
    href: "customer-portal",
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
    path: "customers",
    access: ["All"],
    description: "Customers Management",
    element: (
      <ModuleLayouts>
        <Shippers />
      </ModuleLayouts>
    ),
    isShowOnSidebar: false,
    icon: PackageIcon,
    label: "Customers",
    href: "customers",
  },
  {
    path: "customers/:id",
    access: ["All"],
    description: "Customer Detail",
    element: (
      <ModuleLayouts>
        <CustomerDetail />
      </ModuleLayouts>
    ),
    isShowOnSidebar: false,
    icon: false,
    label: "Customer Detail",
    href: "customers/:id",
  },
  {
    path: "customer-users",
    access: ["All"],
    description: "Customer Users Management",
    element: (
      <ModuleLayouts>
        <CustomerUsers />
      </ModuleLayouts>
    ),
    isShowOnSidebar: false,
    icon: PackageIcon,
    label: "Customer Users",
    href: "customer-users",
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
