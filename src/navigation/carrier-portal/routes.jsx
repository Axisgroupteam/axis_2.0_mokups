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
import Materials from "@/pages/CarrierPortal/Materials";
import Suppliers from "@/pages/CarrierPortal/Materials/Suppliers";
import Contracts from "@/pages/CarrierPortal/Materials/Contracts";
import ContractLines from "@/pages/CarrierPortal/Materials/ContractLines";
import ContractLineDetails from "@/pages/CarrierPortal/Materials/ContractLineDetails";
import FuelCards from "@/pages/CarrierPortal/Fuel";
import FuelTransactions from "@/pages/CarrierPortal/Fuel/Transactions";
import FuelTransactionDetails from "@/pages/CarrierPortal/Fuel/TransactionDetails";
import FuelPricing from "@/pages/CarrierPortal/Fuel/Pricing";
import FuelDiscounts from "@/pages/CarrierPortal/Fuel/Discounts";
import FuelNetworkPartners from "@/pages/CarrierPortal/Fuel/NetworkPartners";
import FuelCardProviders from "@/pages/CarrierPortal/Fuel/CardProviders";
import FuelReports from "@/pages/CarrierPortal/Fuel/Reports";
import FuelSettings from "@/pages/CarrierPortal/Fuel/Settings";
import CategoriesAndOptions from "@/pages/CarrierPortal/CategoriesAndOptions";
import BusinessUnit from "@/pages/CarrierPortal/BusinessUnit";
import SalesOrders from "@/pages/CarrierPortal/Sales/Orders";
import PendingValidation from "@/pages/CarrierPortal/Sales/PendingValidation";
import ConfirmedOrders from "@/pages/CarrierPortal/Sales/ConfirmedOrders";
import BrokerageQueue from "@/pages/CarrierPortal/Brokerage/BrokerageQueue";
import LoadStatus from "@/pages/CarrierPortal/Brokerage/LoadStatus";
import Carriers from "@/pages/CarrierPortal/Brokerage/Carriers";
import RequestOrders from "@/pages/CarrierPortal/Orders/RequestOrders";
import BulkOrders from "@/pages/CarrierPortal/Orders/BulkOrders";
import LoadDetails from "@/pages/CarrierPortal/Orders/LoadDetails";

export const carrierPortalRoutes = [
  {
    path: "metrics",
    element: <OrdersDashboard />,
    label: "Metrics",
  },
  // Sales routes (Order Capture - Inside Sales Team)
  {
    path: "sales/orders",
    element: <SalesOrders />,
    label: "Loads",
  },
  {
    path: "sales/pending-validation",
    element: <PendingValidation />,
    label: "Validation",
  },
  {
    path: "sales/confirmed",
    element: <ConfirmedOrders />,
    label: "Confirmed",
  },
  {
    path: "orders/request",
    element: <RequestOrders />,
    label: "Request Orders",
  },
  {
    path: "orders/bulk",
    element: <BulkOrders />,
    label: "Bulk",
  },
  {
    path: "orders/bulk/inbox",
    element: <BulkOrders />,
    label: "Inbox",
  },
  {
    path: "orders/bulk/planning",
    element: <BulkOrders />,
    label: "Planning",
  },
  {
    path: "orders/bulk/dispatch",
    element: <BulkOrders />,
    label: "Dispatch",
  },
  {
    path: "orders/bulk/delivered",
    element: <BulkOrders />,
    label: "Delivered",
  },
  {
    path: "orders/bulk/complete",
    element: <BulkOrders />,
    label: "Complete",
  },
  {
    path: "orders/bulk/inbox/load-details",
    element: <LoadDetails />,
    label: "Load Details",
  },
  {
    path: "orders/bulk/planning/load-details",
    element: <LoadDetails />,
    label: "Load Details",
  },
  {
    path: "orders/bulk/dispatch/load-details",
    element: <LoadDetails />,
    label: "Load Details",
  },
  {
    path: "orders/bulk/delivered/load-details",
    element: <LoadDetails />,
    label: "Load Details",
  },
  {
    path: "orders/bulk/complete/load-details",
    element: <LoadDetails />,
    label: "Load Details",
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
  // Brokerage routes (Brokerage Coverage - Andrew Swicegood's Team)
  {
    path: "brokerage/queue",
    element: <BrokerageQueue />,
    label: "Brokerage Queue",
  },
  {
    path: "brokerage/loads",
    element: <LoadStatus />,
    label: "Brokerage Loads",
  },
  {
    path: "brokerage/carriers",
    element: <Carriers />,
    label: "Carriers",
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
    path: "master/business-unit",
    element: <BusinessUnit />,
    label: "Business Unit",
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
  // Materials routes
  {
    path: "materials/contracts",
    element: <Contracts />,
    label: "Contracts",
  },
  {
    path: "materials/contract-lines",
    element: <ContractLines />,
    label: "Contract Lines",
  },
  {
    path: "materials/contract-lines/details",
    element: <ContractLineDetails />,
    label: "Contract Line Details",
  },
  {
    path: "materials/suppliers",
    element: <Suppliers />,
    label: "Suppliers",
  },
  {
    path: "materials/list",
    element: <Materials />,
    label: "Materials",
  },
  // Fuel routes
  {
    path: "fuel/card-assignments",
    element: <FuelCards />,
    label: "Card Assignments",
  },
  {
    path: "fuel/transactions",
    element: <FuelTransactions />,
    label: "Fuel Transactions",
  },
  {
    path: "fuel/transactions/:transactionId",
    element: <FuelTransactionDetails />,
    label: "Transaction Details",
  },
  {
    path: "fuel/pricing",
    element: <FuelPricing />,
    label: "Fuel Pricing",
  },
  {
    path: "fuel/discounts",
    element: <FuelDiscounts />,
    label: "Fuel Discounts",
  },
  {
    path: "fuel/suppliers",
    element: <FuelNetworkPartners />,
    label: "Suppliers",
  },
  {
    path: "fuel/card-providers",
    element: <FuelCardProviders />,
    label: "Card Providers",
  },
  {
    path: "fuel/reports",
    element: <FuelReports />,
    label: "IFTA & Reports",
  },
  {
    path: "fuel/settings",
    element: <FuelSettings />,
    label: "Fuel Settings",
  },
];
