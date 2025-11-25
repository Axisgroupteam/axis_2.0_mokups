import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import SmartFilter from "@/components/SmartFilter";
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
  TableIcon,
  PercentIcon,
  PlusIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import BasicInformationCard from "./CustomerDetails/BasicInformationCard";
import PaymentsMetricsCards from "./CustomerDetails/PaymentsMetricsCards";
import InvoicesTable from "./CustomerDetails/InvoicesTable";
import PickupLocations from "./CustomerDetails/PickupLocations";
import Lanes from "./CustomerDetails/Lanes";

const CustomerDetails = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";
  const [rateTablesFilters, setRateTablesFilters] = useState([]);
  const [accessorialFilters, setAccessorialFilters] = useState([]);

  // Filter configurations for Rate Tables
  const rateTablesFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "tableName",
          label: "Table Name",
          type: "input",
          group: "Basic",
          placeholder: "Search table name...",
        },
        {
          key: "commodity",
          label: "Commodity",
          type: "select",
          group: "Basic",
          options: [
            { value: "All", label: "All" },
            { value: "Masonry", label: "Masonry" },
            { value: "Flyash", label: "Flyash" },
          ],
        },
      ],
    },
  ];

  // Filter configurations for Accessorial Charges
  const accessorialFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "chargeType",
          label: "Charge Type",
          type: "select",
          group: "Basic",
          options: [
            { value: "Fuel Surcharge", label: "Fuel Surcharge" },
            { value: "Detention", label: "Detention" },
            { value: "Lumper", label: "Lumper" },
          ],
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" },
          ],
        },
      ],
    },
  ];

  const handleRateTablesFiltersChange = useCallback((newFilters) => {
    setRateTablesFilters(newFilters);
  }, []);

  const handleAccessorialFiltersChange = useCallback((newFilters) => {
    setAccessorialFilters(newFilters);
  }, []);

  // Mock rate tables data
  const rateTables = [
    {
      id: 1,
      tableName: "Standard Rates 2024",
      min: 0,
      max: 50,
      customerRate: 150.00,
      driverRate: 120.00,
      commodity: "All",
    },
    {
      id: 2,
      tableName: "Standard Rates 2024",
      min: 51,
      max: 100,
      customerRate: 200.00,
      driverRate: 160.00,
      commodity: "Masonry",
    },
    {
      id: 3,
      tableName: "Premium Rates",
      min: 0,
      max: 25,
      customerRate: 180.00,
      driverRate: 145.00,
      commodity: "Flyash",
    },
  ];

  // Mock accessorial charges data
  const accessorialCharges = [
    {
      id: 1,
      chargeType: "Fuel Surcharge",
      description: "Standard fuel surcharge",
      rate: "15%",
      minCharge: "$25.00",
      maxCharge: "$500.00",
      status: "Active",
    },
    {
      id: 2,
      chargeType: "Detention",
      description: "Waiting time charges",
      rate: "$75.00/hr",
      minCharge: "$75.00",
      maxCharge: "$600.00",
      status: "Active",
    },
    {
      id: 3,
      chargeType: "Lumper",
      description: "Loading/unloading assistance",
      rate: "Flat",
      minCharge: "$50.00",
      maxCharge: "$200.00",
      status: "Inactive",
    },
  ];

  // Rate Tables columns
  const rateTablesColumns = [
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "tableName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Table Name" />
      ),
      size: 180,
    },
    {
      accessorKey: "commodity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Commodity" />
      ),
      size: 120,
    },
    {
      accessorKey: "min",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Min" />
      ),
      size: 80,
    },
    {
      accessorKey: "max",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Max" />
      ),
      size: 80,
    },
    {
      accessorKey: "customerRate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer Rate" />
      ),
      size: 120,
      cell: ({ row }) => `$${row.getValue("customerRate").toFixed(2)}`,
    },
    {
      accessorKey: "driverRate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Driver Rate" />
      ),
      size: 120,
      cell: ({ row }) => `$${row.getValue("driverRate").toFixed(2)}`,
    },
  ];

  // Accessorial Charges columns
  const accessorialColumns = [
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "chargeType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Charge Type" />
      ),
      size: 150,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      size: 200,
    },
    {
      accessorKey: "rate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rate" />
      ),
      size: 100,
    },
    {
      accessorKey: "minCharge",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Min Charge" />
      ),
      size: 100,
    },
    {
      accessorKey: "maxCharge",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Max Charge" />
      ),
      size: 100,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      size: 100,
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
              status === "Active"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {status}
          </span>
        );
      },
    },
  ];

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
            className="space-y-4 px-2 h-full mt-0"
          >
            {/* Rate Tables Section */}
            <div className="border border-border rounded-lg p-4 bg-background">
              <div className="flex items-center justify-between mb-3">
                <SmartFilter
                  filterGroups={rateTablesFilterGroups}
                  onFiltersChange={handleRateTablesFiltersChange}
                />
                <Button
                  size="sm"
                  className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
                >
                  <PlusIcon className="size-3" />
                  Add Rate Table
                </Button>
              </div>
              <DataTable
                columns={rateTablesColumns}
                data={rateTables}
                showViewOptions={false}
                pageSize={10}
              />
            </div>
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
