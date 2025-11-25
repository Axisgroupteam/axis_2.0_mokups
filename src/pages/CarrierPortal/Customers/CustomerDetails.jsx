import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BuildingIcon,
  ChartBarIcon,
  ShoppingCartIcon,
  FileTextIcon,
  CreditCardIcon,
  DollarSignIcon,
  TrendingUpIcon,
  BadgeDollarSignIcon,
  FileIcon,
  LockIcon,
  MapPinIcon,
} from "lucide-react";
import BasicInformationCard from "./CustomerDetails/BasicInformationCard";
import PaymentsMetricsCards from "./CustomerDetails/PaymentsMetricsCards";
import InvoicesTable from "./CustomerDetails/InvoicesTable";
import RateTable from "./CustomerDetails/RateTable";
import PickupLocations from "./CustomerDetails/PickupLocations";
import Lanes from "./CustomerDetails/Lanes";

const CustomerDetails = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";

  // Mock customer data
  const customerData = {
    name: "Acme Corporation",
    code: "ACM-001",
    email: "contact@acmecorp.com",
    phone: "+1 (555) 123-4567",
    addressLine1: "123 Main St",
    state: "NY",
    city: "New York",
    zipCode: "10001",
    customerRegion: "Northeast",
    billingType: "Factored customer",
    milesMeterSystem: "Google",
    fleetType: "Bulk",
    milesCalcType: "Point to point",
    autoEmailExport: "on",
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <Tabs
        defaultValue={activeTab}
        className="w-full h-full flex flex-col overflow-hidden "
      >
        <div className="flex-shrink-0">
          <TabsList className="mb-0 rounded-none ">
            <TabsTrigger value="profile" className="h-full">
              <BuildingIcon className="size-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="rates" className="h-full">
              <TrendingUpIcon className="size-4" />
              Rates
            </TabsTrigger>
            <TabsTrigger value="pickup-locations" className="h-full">
              <MapPinIcon className="size-4" />
              Pickup Locations
            </TabsTrigger>
            <TabsTrigger value="lanes" className="h-full">
              <MapPinIcon className="size-4" />
              Lanes
            </TabsTrigger>
            <TabsTrigger value="orders" className="h-full">
              <ShoppingCartIcon className="size-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="payments" className="h-full">
              <CreditCardIcon className="size-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="metrics" className="h-full">
              <ChartBarIcon className="size-4" />
              Metrics
            </TabsTrigger>

            <TabsTrigger value="reports" className="h-full">
              <FileTextIcon className="size-4" />
              Reports
            </TabsTrigger>

            <TabsTrigger value="receivables" className="h-full">
              <DollarSignIcon className="size-4" />
              Receivables
            </TabsTrigger>

            <TabsTrigger value="sales" className="h-full">
              <BadgeDollarSignIcon className="size-4" />
              Sales
            </TabsTrigger>
            <TabsTrigger value="instructions" className="h-full">
              <FileIcon className="size-4" />
              Instructions
            </TabsTrigger>
            <TabsTrigger value="vault" className="h-full">
              <LockIcon className="size-4" />
              Vault
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto mt-2 mx-2">
          <TabsContent
            value="profile"
            className="space-y-2 h-full mt-0 px-2"
          >
            <div className="flex gap-4 h-fit">
              <BasicInformationCard customerData={customerData} />
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-2 h-full mt-0 px-2">
            <div className="border rounded-lg p-6 bg-card">
              <p className="text-muted-foreground">
                Metrics content coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-2 h-full mt-0 px-2">
            <div className="border rounded-lg p-6 bg-card">
              <p className="text-muted-foreground">
                Orders content coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-2 h-full mt-0 px-2">
            <div className="border rounded-lg p-6 bg-card">
              <p className="text-muted-foreground">
                Reports content coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent
            value="payments"
            className="space-y-2 h-full mt-0 px-2"
          >
            <PaymentsMetricsCards />
            <InvoicesTable />
          </TabsContent>

          <TabsContent
            value="receivables"
            className="space-y-2 h-full mt-0 px-2"
          >
            <div className="border rounded-lg p-6 bg-card">
              <p className="text-muted-foreground">
                Receivables content coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent
            value="rates"
            className="space-y-2 h-full mt-0 px-2"
          >
            <RateTable />
          </TabsContent>

          <TabsContent value="sales" className="space-y-2 h-full mt-0 px-2">
            <div className="border rounded-lg p-6 bg-card">
              <p className="text-muted-foreground">
                Sales content coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent
            value="instructions"
            className="space-y-2 h-full mt-0 px-2"
          >
            <div className="border rounded-lg p-6 bg-card">
              <p className="text-muted-foreground">
                Instructions content coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="vault" className="space-y-2 h-full mt-0 px-2">
            <div className="border rounded-lg p-6 bg-card">
              <p className="text-muted-foreground">
                Vault content coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent
            value="pickup-locations"
            className="space-y-2 h-full mt-0 px-2"
          >
            <PickupLocations />
          </TabsContent>

          <TabsContent
            value="lanes"
            className="space-y-2 h-full mt-0 px-2"
          >
            <Lanes />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CustomerDetails;
