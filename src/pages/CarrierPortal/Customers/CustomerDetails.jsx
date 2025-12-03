import { useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
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
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  History,
  MessageSquare,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import BasicInformationCard from "./CustomerDetails/BasicInformationCard";
import ContactDetailsCard from "./CustomerDetails/ContactDetailsCard";
import PaymentsMetricsCards from "./CustomerDetails/PaymentsMetricsCards";
import InvoicesTable from "./CustomerDetails/InvoicesTable";
import PickupLocations from "./CustomerDetails/PickupLocations";
import Lanes from "./CustomerDetails/Lanes";
import CustomerCommentsCard from "./CustomerDetails/CustomerCommentsCard";
import BalanceCard from "./CustomerDetails/Vault/BalanceCard";
import BillCard from "./CustomerDetails/Vault/BillCard";
import OptionalSettingsCard from "./CustomerDetails/Vault/OptionalSettingsCard";
import FuelSurchargeTable from "./CustomerDetails/Vault/FuelSurchargeTable";
import CreditCollectionsCard from "./CustomerDetails/Vault/CreditCollectionsCard";
import ReceivablesMetricsCards from "./CustomerDetails/Receivables/ReceivablesMetricsCards";
import ReceivablesTable from "./CustomerDetails/Receivables/ReceivablesTable";
import UnpostedMetricsCards from "./CustomerDetails/Unposted/UnpostedMetricsCards";
import UnpostedTable from "./CustomerDetails/Unposted/UnpostedTable";

const CustomerDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get("tab") || "profile";
  const [rateTablesFilters, setRateTablesFilters] = useState([]);
  const [accessorialFilters, setAccessorialFilters] = useState([]);
  const [isRateTableSheetOpen, setIsRateTableSheetOpen] = useState(false);
  const [isRemainingCommoditiesOpen, setIsRemainingCommoditiesOpen] =
    useState(false);
  const [rateTableForm, setRateTableForm] = useState({
    tableName: "",
    importFile: null,
    rows: [{ id: 1, min: 0, max: 1, customerRate: 0, driverRate: 0 }],
    selectedCommodities: [],
  });

  // All commodities list
  const allCommoditiesList = [
    "All",
    "Commercial 89 Stone",
    "COMMERCIAL Screenings /131",
    "Bahama 57",
    '1/4" Rock',
    "15cr Graded Aggr Base",
    "Dot Sand",
    "DOT 67 ROCK",
    "STALITE AD BLK UNLD FINES D",
    "Trailers",
    "BANK RUN SHELL",
    "recycled base rock",
    "DOT 57 Stone",
    "DOT 89 Stone",
    "7 Stone",
    "Screenings Granite",
    "67 STONE",
    "10SM MFG SAND",
    "GU",
    "Slag",
    "Sand 40-140",
    "Masonry",
    "Cement",
    "Glass 40-140",
    "1/2",
    "IT",
    "Type 3",
    "Dumb",
    "1L",
    "FlatB",
    "Gravel",
    "Limestone",
    "Asphalt",
    "Concrete",
    "Crusite",
    "Flyash",
    "Portland",
    "Ready Mix",
  ];

  const handleAddRow = () => {
    setRateTableForm((prev) => ({
      ...prev,
      rows: [
        ...prev.rows,
        {
          id: prev.rows.length + 1,
          min: 0,
          max: 1,
          customerRate: 0,
          driverRate: 0,
        },
      ],
    }));
  };

  const handleRemoveRow = (id) => {
    if (rateTableForm.rows.length > 1) {
      setRateTableForm((prev) => ({
        ...prev,
        rows: prev.rows.filter((row) => row.id !== id),
      }));
    }
  };

  const handleRowChange = (id, field, value) => {
    setRateTableForm((prev) => ({
      ...prev,
      rows: prev.rows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      ),
    }));
  };

  const handleCommodityChange = (commodity, checked) => {
    setRateTableForm((prev) => ({
      ...prev,
      selectedCommodities: checked
        ? [...prev.selectedCommodities, commodity]
        : prev.selectedCommodities.filter((c) => c !== commodity),
    }));
  };

  const handleCreateRateTable = () => {
    console.log("Rate Table Form:", rateTableForm);
    setIsRateTableSheetOpen(false);
    // Reset form
    setRateTableForm({
      tableName: "",
      importFile: null,
      rows: [{ id: 1, min: 0, max: 1, customerRate: 0, driverRate: 0 }],
      selectedCommodities: [],
    });
  };

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
      customerRate: 150.0,
      driverRate: 120.0,
      commodities: ["GU", "Slag", "Sand 40-140", "Masonry", "Cement"],
    },
    {
      id: 2,
      tableName: "Standard Rates 2025",
      min: 51,
      max: 100,
      customerRate: 200.0,
      driverRate: 160.0,
      commodities: ["Glass 40-140", "1/2", "IT", "Type 3"],
    },
    {
      id: 3,
      tableName: "Premium Rates",
      min: 0,
      max: 25,
      customerRate: 180.0,
      driverRate: 145.0,
      commodities: ["Dumb", "1L", "FlatB"],
    },
    {
      id: 4,
      tableName: "Bulk Transport Rates",
      min: 0,
      max: 75,
      customerRate: 165.0,
      driverRate: 130.0,
      commodities: ["Gravel", "Limestone", "Asphalt", "Concrete", "Crusite"],
    },
    {
      id: 5,
      tableName: "Express Rates",
      min: 0,
      max: 100,
      customerRate: 220.0,
      driverRate: 175.0,
      commodities: ["Flyash", "Portland", "Ready Mix"],
    },
  ];

  // Get commodities already used in existing rate tables
  const usedCommodities = rateTables.flatMap((table) => table.commodities);

  // Filter out used commodities from the available list for Add Rate Table form
  const availableCommodities = allCommoditiesList.filter(
    (commodity) => !usedCommodities.includes(commodity)
  );

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
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/app/carrier-portal/master/customers/customer-details/rate-table-details?id=${row.original.id}`
                  )
                }
              >
                View Details
              </DropdownMenuItem>
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
      accessorKey: "commodities",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Commodities" />
      ),
      size: 300,
      cell: ({ row }) => {
        const commodities = row.getValue("commodities") || [];
        const uniqueCommodities = [...new Set(commodities)];
        return (
          <div className="flex flex-wrap gap-1">
            {uniqueCommodities.map((commodity, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 border border-blue-500 text-blue-700 dark:bg-blue-400/10 dark:border-blue-400 dark:text-blue-400"
              >
                {commodity}
              </span>
            ))}
          </div>
        );
      },
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
              <DropdownMenuItem className="text-red-600">
                Delete
              </DropdownMenuItem>
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

  // Mock contact data
  const contactData = {
    name: "John Anderson",
    email: "john.anderson@acmecorp.com",
    contactNo: "+1 (555) 987-6543",
  };

  // Mock comments data
  const commentsData = [
    {
      id: 1,
      dateTime: "2024-01-15 10:30 AM",
      enteredBy: "James Wilson",
      type: "Billing",
      attachment: "invoice_adjustment.pdf",
      comment:
        "Adjusted billing cycle per customer request. Now aligned with their fiscal quarter.",
    },
    {
      id: 2,
      dateTime: "2024-02-20 02:15 PM",
      enteredBy: "Sarah Mitchell",
      type: "Service",
      attachment: null,
      comment:
        "Customer requested priority scheduling for all bulk deliveries during Q2.",
    },
    {
      id: 3,
      dateTime: "2024-03-10 09:45 AM",
      enteredBy: "Michael Thompson",
      type: "General",
      attachment: null,
      comment:
        "Updated primary contact information. New point of contact is Jennifer Adams.",
    },
    {
      id: 4,
      dateTime: "2024-03-25 11:00 AM",
      enteredBy: "Emily Roberts",
      type: "Positive",
      attachment: "feedback_letter.pdf",
      comment:
        "Customer expressed satisfaction with recent service improvements. Letter attached.",
    },
  ];

  // Audit log data
  const auditLogData = [
    {
      id: 1,
      action: "Rate table updated",
      type: "Update",
      oldValue: "Standard Rates 2023",
      newValue: "Standard Rates 2024",
      actionBy: "John Smith",
      timestamp: "Jan 28, 2024 14:35:22",
    },
    {
      id: 2,
      action: "New lane added",
      type: "Create",
      oldValue: "-",
      newValue: "Miami to Atlanta",
      actionBy: "Sarah Johnson",
      timestamp: "Jan 26, 2024 09:12:45",
    },
    {
      id: 3,
      action: "Billing type updated",
      type: "Update",
      oldValue: "Direct Bill",
      newValue: "Factored customer",
      actionBy: "John Smith",
      timestamp: "Jan 24, 2024 20:22:34",
    },
    {
      id: 4,
      action: "Customer status changed",
      type: "Status",
      oldValue: "Pending",
      newValue: "Active",
      actionBy: "Mike Davis",
      timestamp: "Jan 20, 2024 11:45:18",
    },
    {
      id: 5,
      action: "Contract documents uploaded",
      type: "Upload",
      oldValue: "-",
      newValue: "contract_2024.pdf",
      actionBy: "Sarah Johnson",
      timestamp: "Jan 18, 2024 16:30:00",
    },
    {
      id: 6,
      action: "Pickup location added",
      type: "Create",
      oldValue: "-",
      newValue: "Warehouse A - 123 Industrial Blvd",
      actionBy: "John Smith",
      timestamp: "Jan 15, 2024 10:15:33",
    },
    {
      id: 7,
      action: "Credit limit verified",
      type: "Verify",
      oldValue: "$25,000",
      newValue: "$50,000",
      actionBy: "Admin System",
      timestamp: "Jan 12, 2024 08:00:00",
    },
    {
      id: 8,
      action: "Customer created",
      type: "Create",
      oldValue: "-",
      newValue: "Acme Corporation",
      actionBy: "John Smith",
      timestamp: "Jan 10, 2024 09:30:15",
    },
  ];

  const getAuditTypeBadgeColor = (type) => {
    const colors = {
      Create: "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50",
      Update: "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50",
      Upload: "bg-purple-500/10 hover:bg-purple-500/30 text-purple-700 dark:text-purple-400 border border-purple-500/50",
      Status: "bg-orange-500/10 hover:bg-orange-500/30 text-orange-700 dark:text-orange-400 border border-orange-500/50",
      Verify: "bg-teal-500/10 hover:bg-teal-500/30 text-teal-700 dark:text-teal-400 border border-teal-500/50",
    };
    return colors[type] || "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  const auditLogColumns = [
    {
      accessorKey: "action",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Operation" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => {
        const type = row.getValue("type");
        return (
          <Badge className={getAuditTypeBadgeColor(type)}>{type}</Badge>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "oldValue",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Old Value" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "newValue",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="New Value" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "actionBy",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Modified By" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "timestamp",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Timestamp" />
      ),
      enableSorting: true,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <Tabs
        defaultValue={activeTab}
        className="w-full h-full flex flex-col overflow-hidden "
      >
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="mb-0 rounded-none w-max">
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

            <TabsTrigger value="unposted" className="h-full">
              <FileTextIcon className="size-4" />
              Unposted
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
            <TabsTrigger value="comments" className="h-full">
              <MessageSquare className="size-4" />
              Comments
            </TabsTrigger>
            <TabsTrigger value="audit" className="h-full">
              <History className="size-4" />
              Audit Log
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="flex-1 overflow-auto mt-2 mx-2">
          <TabsContent value="profile" className="space-y-2 h-full mt-0 px-2">
            <div className="flex gap-4 h-fit">
              <BasicInformationCard customerData={customerData} />
              <ContactDetailsCard contactData={contactData} />
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

          <TabsContent value="payments" className="space-y-2 h-full mt-0 px-2">
            <PaymentsMetricsCards />
            <InvoicesTable />
          </TabsContent>

          <TabsContent
            value="receivables"
            className="space-y-4 h-full mt-0 px-2"
          >
            <ReceivablesMetricsCards />
            <ReceivablesTable />
          </TabsContent>

          <TabsContent
            value="unposted"
            className="space-y-4 h-full mt-0 px-2"
          >
            <UnpostedMetricsCards />
            <UnpostedTable />
          </TabsContent>

          <TabsContent value="rates" className="space-y-4 px-2 h-full mt-0">
            {/* Rate Tables Section */}
            <div className="border border-border rounded-lg bg-background">
              <div className="flex items-center justify-between px-2  py-2 border-b border-border">
                <SmartFilter
                  filterGroups={rateTablesFilterGroups}
                  onFiltersChange={handleRateTablesFiltersChange}
                />
                <Button
                  size="sm"
                  className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
                  onClick={() => setIsRateTableSheetOpen(true)}
                >
                  <PlusIcon className="size-3" />
                  Add Rate Table
                </Button>
              </div>

              {/* Remaining Commodities */}
              {availableCommodities.filter((c) => c !== "All").length > 0 && (
                <div className="px-4 py-3 border-b border-border">
                  <button
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    onClick={() =>
                      setIsRemainingCommoditiesOpen(!isRemainingCommoditiesOpen)
                    }
                  >
                    {isRemainingCommoditiesOpen ? (
                      <ChevronUpIcon className="size-4" />
                    ) : (
                      <ChevronDownIcon className="size-4" />
                    )}
                    <span>
                      Remaining Commodities (
                      {availableCommodities.filter((c) => c !== "All").length})
                    </span>
                  </button>
                  {isRemainingCommoditiesOpen && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {availableCommodities
                        .filter((c) => c !== "All")
                        .map((commodity, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400"
                          >
                            {commodity}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              )}

              <div className="px-4 pb-3">
                <DataTable
                  columns={rateTablesColumns}
                  data={rateTables}
                  showViewOptions={false}
                  pageSize={10}
                />
              </div>
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

          <TabsContent value="vault" className="h-full mt-0 px-2 ">
            <Tabs
              defaultValue="billing"
              className="w-full h-full flex flex-col  "
            >
              <TabsList className="mb-1 h-14 flex-shrink-0 sticky top-0 z-10 bg-background ">
                <TabsTrigger
                  value="billing"
                  className="flex items-center gap-1.5"
                >
                  <FileTextIcon className="size-4" />
                  Billing & Balance
                </TabsTrigger>
                <TabsTrigger
                  value="fuel-surcharge"
                  className="flex items-center gap-1.5"
                >
                  <PercentIcon className="size-4" />
                  Fuel Surcharge
                </TabsTrigger>
                <TabsTrigger
                  value="credit"
                  className="flex items-center gap-1.5"
                >
                  <CreditCardIcon className="size-4" />
                  Credit & Collections
                </TabsTrigger>
              </TabsList>

              <TabsContent value="billing" className="space-y-4 mt-0 flex-1">
                <div className="flex gap-4">
                  <div className="w-1/2 flex flex-col gap-4">
                    <BalanceCard />
                    <OptionalSettingsCard />
                  </div>
                  <BillCard />
                </div>
              </TabsContent>

              <TabsContent
                value="fuel-surcharge"
                className="space-y-4 mt-0 flex-1"
              >
                <FuelSurchargeTable />
              </TabsContent>

              <TabsContent value="credit" className="space-y-4 mt-0 flex-1">
                <CreditCollectionsCard />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="comments" className="space-y-2 h-full mt-0 px-2">
            <CustomerCommentsCard commentsData={commentsData} />
          </TabsContent>

          <TabsContent
            value="pickup-locations"
            className="space-y-2 h-full mt-0 px-2"
          >
            <PickupLocations />
          </TabsContent>

          <TabsContent value="lanes" className="space-y-2 h-full mt-0 px-2">
            <Lanes />
          </TabsContent>

          <TabsContent value="audit" className="space-y-2 h-full mt-0 px-2">
            <DataTable
              columns={auditLogColumns}
              data={auditLogData}
              showViewOptions={false}
            />
          </TabsContent>
        </div>
      </Tabs>

      {/* Add Rate Table Sheet */}
      <Sheet open={isRateTableSheetOpen} onOpenChange={setIsRateTableSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-2xl overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              Add Rate Table
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-6 mt-4 px-6">
            {/* Table Name and Import Table */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Table Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Enter Table Name"
                  value={rateTableForm.tableName}
                  onChange={(e) =>
                    setRateTableForm((prev) => ({
                      ...prev,
                      tableName: e.target.value,
                    }))
                  }
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Import Table
                </Label>
                <Input
                  type="file"
                  onChange={(e) =>
                    setRateTableForm((prev) => ({
                      ...prev,
                      importFile: e.target.files[0],
                    }))
                  }
                  className="h-10"
                />
              </div>
            </div>

            {/* Rate Rows */}
            <div className="space-y-3">
              {/* Header */}
              <div className="grid grid-cols-[1fr_1fr_1fr_1fr_40px] gap-2">
                <Label className="text-sm font-medium text-foreground">
                  Min
                </Label>
                <Label className="text-sm font-medium text-foreground">
                  Max
                </Label>
                <Label className="text-sm font-medium text-foreground">
                  Customer Rate
                </Label>
                <Label className="text-sm font-medium text-foreground">
                  Driver Rate
                </Label>
                <div></div>
              </div>

              {/* Rows */}
              {rateTableForm.rows.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-[1fr_1fr_1fr_1fr_40px] gap-2"
                >
                  <Input
                    type="number"
                    value={row.min}
                    onChange={(e) =>
                      handleRowChange(row.id, "min", e.target.value)
                    }
                    className="h-10"
                  />
                  <Input
                    type="number"
                    value={row.max}
                    onChange={(e) =>
                      handleRowChange(row.id, "max", e.target.value)
                    }
                    className="h-10"
                  />
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      value={row.customerRate}
                      onChange={(e) =>
                        handleRowChange(row.id, "customerRate", e.target.value)
                      }
                      className="h-10 pl-7"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      value={row.driverRate}
                      onChange={(e) =>
                        handleRowChange(row.id, "driverRate", e.target.value)
                      }
                      className="h-10 pl-7"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveRow(row.id)}
                    disabled={rateTableForm.rows.length === 1}
                    className="h-10 w-10"
                  >
                    <TrashIcon className="size-4 text-muted-foreground" />
                  </Button>
                </div>
              ))}

              {/* Add Table Row Button */}
              <Button
                type="button"
                variant="outline"
                onClick={handleAddRow}
                className="w-full h-10 border-dashed border-2 text-muted-foreground hover:text-foreground"
              >
                <PlusIcon className="size-4 mr-2" />
                Table Row
              </Button>
            </div>

            {/* Commodities */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">
                Commodities <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-x-3 gap-y-4">
                {availableCommodities.map((commodity) => (
                  <div key={commodity} className="flex items-center space-x-2">
                    <Checkbox
                      id={commodity}
                      checked={rateTableForm.selectedCommodities.includes(
                        commodity
                      )}
                      onCheckedChange={(checked) =>
                        handleCommodityChange(commodity, checked)
                      }
                    />
                    <label
                      htmlFor={commodity}
                      className="text-sm text-foreground cursor-pointer"
                    >
                      {commodity}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t -mx-6 px-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsRateTableSheetOpen(false)}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateRateTable}
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Create
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CustomerDetails;
