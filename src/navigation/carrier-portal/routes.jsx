import OrdersDashboard from "@/pages/CarrierPortal/OrdersDashboard";
import Users from "@/pages/CarrierPortal/Users";
import DriverDetails from "@/pages/CarrierPortal/Users/DriverDetails";
import TechnicianDetails from "@/pages/CarrierPortal/Users/TechnicianDetails";
import UserDetails from "@/pages/CarrierPortal/Users/UserDetails";
import Assets from "@/pages/CarrierPortal/Assets";
import AssetDetails from "@/pages/CarrierPortal/Assets/AssetDetails";
import TrailerDetails from "@/pages/CarrierPortal/Assets/TrailerDetails";
import Shippers from "@/pages/CarrierPortal/Shippers";
import CustomerDetails from "@/pages/CarrierPortal/Customers/CustomerDetails";
import Payee from "@/pages/CarrierPortal/Payee";
import PayeeDetails from "@/pages/CarrierPortal/Payee/PayeeDetails";

export const carrierPortalRoutes = [
  {
    path: "metrics",
    element: <OrdersDashboard />,
    label: "Metrics",
  },
  {
    path: "orders/bulk",
    element: (
      <div className="p-8 bg-background h-full">
        <h1 className="text-3xl font-bold">Bulk Orders</h1>
      </div>
    ),
    label: "Bulk",
  },
  {
    path: "orders/aggregate",
    element: (
      <div className="p-8 bg-background h-full">
        <h1 className="text-3xl font-bold">Aggregate Orders</h1>
      </div>
    ),
    label: "Aggregate",
  },
  {
    path: "orders/walking-floor-tmf",
    element: (
      <div className="p-8 bg-background h-full">
        <h1 className="text-3xl font-bold">Walking Floor TMF Orders</h1>
      </div>
    ),
    label: "Walking Floor TMF",
  },
  {
    path: "orders/precast",
    element: (
      <div className="p-8 bg-background h-full">
        <h1 className="text-3xl font-bold">Precast Orders</h1>
      </div>
    ),
    label: "Precast",
  },
  {
    path: "master/users",
    element: <Users />,
    label: "Users",
  },
  {
    path: "master/users/driver-details",
    element: <DriverDetails />,
    label: "Driver Details",
  },
  {
    path: "master/users/technician-details",
    element: <TechnicianDetails />,
    label: "Technician Details",
  },
  {
    path: "master/users/user-details",
    element: <UserDetails />,
    label: "User Details",
  },
  {
    path: "master/customers",
    element: <Shippers />,
    label: "Customers",
  },
  {
    path: "master/customers/customer-details",
    element: <CustomerDetails />,
    label: "Customer Details",
  },
  {
    path: "master/payee",
    element: <Payee />,
    label: "Payee",
  },
  {
    path: "master/payee/payee-details",
    element: <PayeeDetails />,
    label: "Payee Details",
  },
  {
    path: "master/rates",
    element: (
      <div className="p-8 bg-background h-full">
        <h1 className="text-3xl font-bold">Rates</h1>
      </div>
    ),
    label: "Rates",
  },
  {
    path: "master/location",
    element: (
      <div className="p-8 bg-background h-full">
        <h1 className="text-3xl font-bold">Location</h1>
      </div>
    ),
    label: "Location",
  },
  {
    path: "master/assets",
    element: <Assets />,
    label: "Assets",
  },
  {
    path: "master/assets/asset-details",
    element: <AssetDetails />,
    label: "Asset Details",
  },
  {
    path: "master/assets/trailer-details",
    element: <TrailerDetails />,
    label: "Trailer Details",
  },
];
