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
import RateTableDetails from "@/pages/CarrierPortal/Customers/CustomerDetails/RateTableDetails";
import Payee from "@/pages/CarrierPortal/Payee";
import PayeeDetails from "@/pages/CarrierPortal/Payee/PayeeDetails";
import Location from "@/pages/CarrierPortal/Location";
import LocationDetails from "@/pages/CarrierPortal/Location/LocationDetails";
import Rate from "@/pages/CarrierPortal/Rate";
import RateDetails from "@/pages/CarrierPortal/Rate/RateDetails";
import DriverOnboarding from "@/pages/CarrierPortal/Onboarding/DriverOnboarding";
import CarrierOnboarding from "@/pages/CarrierPortal/Onboarding/CarrierOnboarding";
import CategoriesAndOptions from "@/pages/CarrierPortal/CategoriesAndOptions";

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
    path: "master/customers/customer-details/rate-table-details",
    element: <RateTableDetails />,
    label: "Rate Table Details",
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
    element: <Rate />,
    label: "Rates",
  },
  {
    path: "master/rates/rate-details",
    element: <RateDetails />,
    label: "Rate Details",
  },
  {
    path: "master/location",
    element: <Location />,
    label: "Location",
  },
  {
    path: "master/location/location-details",
    element: <LocationDetails />,
    label: "Location Details",
  },
  {
    path: "master/categories",
    element: <CategoriesAndOptions />,
    label: "Categories",
  },
  {
    path: "master/additional-charges",
    element: (
      <div className="p-8 bg-background h-full">
        <h1 className="text-3xl font-bold">Additional Charges</h1>
        <p className="text-muted-foreground mt-2">Coming soon...</p>
      </div>
    ),
    label: "Additional Charges",
  },
  {
    path: "master/product-sales",
    element: (
      <div className="p-8 bg-background h-full">
        <h1 className="text-3xl font-bold">Product Sales</h1>
        <p className="text-muted-foreground mt-2">Coming soon...</p>
      </div>
    ),
    label: "Product Sales",
  },
  {
    path: "master/assets",
    element: <Assets />,
    label: "Assets",
  },
  {
    path: "master/assets/vehicle-details",
    element: <AssetDetails />,
    label: "Vehicle Details",
  },
  {
    path: "master/assets/trailer-details",
    element: <TrailerDetails />,
    label: "Trailer Details",
  },
  {
    path: "onboarding/driver",
    element: <DriverOnboarding />,
    label: "Driver Onboarding",
  },
  {
    path: "onboarding/carrier",
    element: <CarrierOnboarding />,
    label: "Carrier Onboarding",
  },
];
