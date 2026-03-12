import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import SmartFilter from "@/components/SmartFilter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  FileText,
  MoreHorizontal,
  SendIcon,
  EyeIcon,
  DollarSign,
  TruckIcon,
  PackageIcon,
  CheckCircle2Icon,
  FileStack,
  Truck,
  CloudIcon,
  PaperclipIcon,
} from "lucide-react";

const ReadyToInvoice = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showBatchInvoiceDialog, setShowBatchInvoiceDialog] = useState(false);

  // Invoice creation options
  const [invoiceType, setInvoiceType] = useState("summary"); // "summary" or "per-load"
  const [autoGeneratePdf, setAutoGeneratePdf] = useState(true);
  const [syncToQuickBooks, setSyncToQuickBooks] = useState(true);
  const [attachPodDocuments, setAttachPodDocuments] = useState(true);

  // Mock data - loads that are complete and ready to be invoiced
  const readyToInvoiceData = [
    {
      id: 1,
      loadNo: "ML-2025-001245",
      customer: "Titan Construction",
      customerId: "CUST-001",
      deliveryDate: "2025-01-05",
      commodity: "Cement",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      weight: "24,500 lbs",
      freightCharges: 1850.0,
      fuelSurcharge: 185.0,
      accessorials: 150.0,
      totalCharges: 2185.0,
      driverName: "John Smith",
      vehicleNo: "TRK-2847",
      podUploaded: true,
      ticketNo: "TKT-78501",
    },
    {
      id: 2,
      loadNo: "ML-2025-001246",
      customer: "Titan Construction",
      customerId: "CUST-001",
      deliveryDate: "2025-01-05",
      commodity: "Sand",
      origin: "Austin, TX",
      destination: "Dallas, TX",
      weight: "22,000 lbs",
      freightCharges: 1650.0,
      fuelSurcharge: 165.0,
      accessorials: 75.0,
      totalCharges: 1890.0,
      driverName: "Mike Davis",
      vehicleNo: "TRK-1923",
      podUploaded: true,
      ticketNo: "TKT-78502",
    },
    {
      id: 3,
      loadNo: "ML-2025-001247",
      customer: "Ashgrove Cement",
      customerId: "CUST-002",
      deliveryDate: "2025-01-06",
      commodity: "Flyash",
      origin: "San Antonio, TX",
      destination: "Houston, TX",
      weight: "26,000 lbs",
      freightCharges: 2100.0,
      fuelSurcharge: 210.0,
      accessorials: 200.0,
      totalCharges: 2510.0,
      driverName: "Sarah Johnson",
      vehicleNo: "TRK-4521",
      podUploaded: true,
      ticketNo: "TKT-78503",
    },
    {
      id: 4,
      loadNo: "ML-2025-001248",
      customer: "TQL Logistics",
      customerId: "CUST-003",
      deliveryDate: "2025-01-06",
      commodity: "Aggregate",
      origin: "Fort Worth, TX",
      destination: "Austin, TX",
      weight: "25,500 lbs",
      freightCharges: 1950.0,
      fuelSurcharge: 195.0,
      accessorials: 100.0,
      totalCharges: 2245.0,
      driverName: "Robert Wilson",
      vehicleNo: "TRK-7734",
      podUploaded: true,
      ticketNo: "TKT-78504",
    },
    {
      id: 5,
      loadNo: "ML-2025-001249",
      customer: "Ashgrove Cement",
      customerId: "CUST-002",
      deliveryDate: "2025-01-07",
      commodity: "Limestone",
      origin: "Dallas, TX",
      destination: "San Antonio, TX",
      weight: "23,000 lbs",
      freightCharges: 1750.0,
      fuelSurcharge: 175.0,
      accessorials: 0.0,
      totalCharges: 1925.0,
      driverName: "Emily Brown",
      vehicleNo: "TRK-3356",
      podUploaded: false,
      ticketNo: "TKT-78505",
    },
  ];

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "loadNo",
          label: "Load No",
          type: "input",
          group: "Basic",
          placeholder: "Search load number...",
        },
        {
          key: "customer",
          label: "Customer",
          type: "input",
          group: "Basic",
          placeholder: "Search customer...",
        },
        {
          key: "deliveryDate",
          label: "Delivery Date",
          type: "input",
          group: "Basic",
          placeholder: "YYYY-MM-DD",
        },
        {
          key: "podStatus",
          label: "POD Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "uploaded", label: "Uploaded" },
            { value: "pending", label: "Pending" },
          ],
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSelectRow = (rowId, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, rowId]);
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(readyToInvoiceData.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleCreateInvoice = (loadIds) => {
    console.log("Creating invoice for loads:", loadIds);
    // Navigate to invoice creation or show success
    navigate("/app/carrier-portal/billing/invoices");
  };

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={selectedRows.length === readyToInvoiceData.length}
          onCheckedChange={handleSelectAll}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedRows.includes(row.original.id)}
          onCheckedChange={(checked) =>
            handleSelectRow(row.original.id, checked)
          }
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      size: 40,
    },
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => {
        const load = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/app/carrier-portal/orders/bulk/complete/load-details?id=${load.loadNo}&mode=view`,
                  )
                }
              >
                <EyeIcon className="h-4 w-4 mr-2" />
                View Load
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCreateInvoice([load.id])}>
                <SendIcon className="h-4 w-4 mr-2" />
                Create Invoice
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "loadNo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Load No" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm font-medium text-primary">
          {row.getValue("loadNo")}
        </span>
      ),
    },
    {
      accessorKey: "customer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.getValue("customer")}</span>
          <span className="text-xs text-muted-foreground">
            {row.original.customerId}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "deliveryDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Delivery Date" />
      ),
      cell: ({ row }) => formatDate(row.getValue("deliveryDate")),
    },
    {
      accessorKey: "commodity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Commodity" />
      ),
      cell: ({ row }) => (
        <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/50">
          {row.getValue("commodity")}
        </Badge>
      ),
    },
    {
      accessorKey: "ticketNo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ticket No" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("ticketNo")}</span>
      ),
    },
    {
      accessorKey: "freightCharges",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Freight" />
      ),
      cell: ({ row }) => formatCurrency(row.getValue("freightCharges")),
    },
    {
      accessorKey: "fuelSurcharge",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fuel Surcharge" />
      ),
      cell: ({ row }) => formatCurrency(row.getValue("fuelSurcharge")),
    },
    {
      accessorKey: "accessorials",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Accessorials" />
      ),
      cell: ({ row }) => formatCurrency(row.getValue("accessorials")),
    },
    {
      accessorKey: "totalCharges",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total" />
      ),
      cell: ({ row }) => (
        <span className="font-bold text-green-600">
          {formatCurrency(row.getValue("totalCharges"))}
        </span>
      ),
    },
    {
      accessorKey: "podUploaded",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="POD" />
      ),
      cell: ({ row }) => {
        const podUploaded = row.getValue("podUploaded");
        return (
          <Badge
            className={
              podUploaded
                ? "bg-green-500/10 text-green-700 border-green-500/50"
                : "bg-amber-500/10 text-amber-700 border-amber-500/50"
            }
          >
            {podUploaded ? "Uploaded" : "Pending"}
          </Badge>
        );
      },
    },
  ];

  // Calculate totals for selected rows
  const selectedTotal = readyToInvoiceData
    .filter((row) => selectedRows.includes(row.id))
    .reduce((sum, row) => sum + row.totalCharges, 0);

  // Group by customer for batch invoicing
  const selectedByCustomer = readyToInvoiceData
    .filter((row) => selectedRows.includes(row.id))
    .reduce((acc, row) => {
      if (!acc[row.customerId]) {
        acc[row.customerId] = {
          customer: row.customer,
          customerId: row.customerId,
          loads: [],
          total: 0,
        };
      }
      acc[row.customerId].loads.push(row);
      acc[row.customerId].total += row.totalCharges;
      return acc;
    }, {});

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex-shrink-0 border-b bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <FileText className="size-6" />
              Ready to Invoice
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Completed loads ready for customer invoicing
            </p>
          </div>
          <div className="flex items-center gap-4">
            {selectedRows.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="text-sm">
                  <span className="text-muted-foreground">Selected: </span>
                  <span className="font-bold">{selectedRows.length} loads</span>
                  <span className="mx-2 text-muted-foreground">|</span>
                  <span className="text-muted-foreground">Total: </span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(selectedTotal)}
                  </span>
                </div>
                <Button
                  onClick={() => setShowBatchInvoiceDialog(true)}
                  className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  <SendIcon className="size-4 mr-2" />
                  Create Invoice ({selectedRows.length})
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="flex-shrink-0 px-6 py-4 border-b">
        <div className="grid grid-cols-4 gap-4">
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <PackageIcon className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Loads</p>
                <p className="text-xl font-bold">{readyToInvoiceData.length}</p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <DollarSign className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Amount</p>
                <p className="text-xl font-bold text-green-600">
                  {formatCurrency(
                    readyToInvoiceData.reduce(
                      (sum, row) => sum + row.totalCharges,
                      0,
                    ),
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <TruckIcon className="size-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Unique Customers
                </p>
                <p className="text-xl font-bold">
                  {new Set(readyToInvoiceData.map((r) => r.customerId)).size}
                </p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <CheckCircle2Icon className="size-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">POD Complete</p>
                <p className="text-xl font-bold">
                  {readyToInvoiceData.filter((r) => r.podUploaded).length}/
                  {readyToInvoiceData.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="border border-border rounded-lg bg-background">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <SmartFilter
              filterGroups={filterGroups}
              onFiltersChange={handleFiltersChange}
            />
          </div>
          <div className="px-4 pb-3">
            <DataTable
              columns={columns}
              data={readyToInvoiceData}
              showViewOptions={false}
              pageSize={10}
            />
          </div>
        </div>
      </div>

      {/* Batch Invoice Dialog */}
      <AlertDialog
        open={showBatchInvoiceDialog}
        onOpenChange={setShowBatchInvoiceDialog}
      >
        <AlertDialogContent className="max-w-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Create Invoices</AlertDialogTitle>
            <AlertDialogDescription>
              Configure invoice settings for {selectedRows.length} loads.
              {Object.keys(selectedByCustomer).length > 1 && (
                <span className="block mt-1">
                  Creating invoices for {Object.keys(selectedByCustomer).length}{" "}
                  customers.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4 space-y-4">
            {/* Customer Summary */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Customers
              </p>
              {Object.values(selectedByCustomer).map((group) => (
                <div
                  key={group.customerId}
                  className="border rounded-lg p-3 bg-muted/50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{group.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {group.loads.length} loads
                      </p>
                    </div>
                    <p className="font-bold text-green-600">
                      {formatCurrency(group.total)}
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t pt-3 flex items-center justify-between">
                <span className="font-medium">Grand Total</span>
                <span className="text-lg font-bold text-green-600">
                  {formatCurrency(selectedTotal)}
                </span>
              </div>
            </div>

            {/* Invoice Type Selection */}
            <div className="space-y-3 pt-2 border-t">
              <p className="text-sm font-medium">Invoice Type</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setInvoiceType("summary")}
                  className={`p-3 border rounded-lg text-left transition-all ${
                    invoiceType === "summary"
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FileStack
                      className={`size-4 ${invoiceType === "summary" ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <span className="font-medium">Summary Invoice</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Combine all loads into one invoice per customer
                  </p>
                  {invoiceType === "summary" && (
                    <p className="text-xs text-primary mt-2 font-medium">
                      Creates {Object.keys(selectedByCustomer).length}{" "}
                      invoice(s)
                    </p>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setInvoiceType("per-load")}
                  className={`p-3 border rounded-lg text-left transition-all ${
                    invoiceType === "per-load"
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Truck
                      className={`size-4 ${invoiceType === "per-load" ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <span className="font-medium">Per-Load Invoice</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Create separate invoice for each load
                  </p>
                  {invoiceType === "per-load" && (
                    <p className="text-xs text-primary mt-2 font-medium">
                      Creates {selectedRows.length} invoice(s)
                    </p>
                  )}
                </button>
              </div>
            </div>

            {/* Accessorial Options */}
            <div className="space-y-3 pt-2 border-t">
              <p className="text-sm font-medium">Options</p>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Checkbox
                    checked={autoGeneratePdf}
                    onCheckedChange={setAutoGeneratePdf}
                  />
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-muted-foreground" />
                    <span className="text-sm">
                      Auto-generate PDF after creation
                    </span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Checkbox
                    checked={syncToQuickBooks}
                    onCheckedChange={setSyncToQuickBooks}
                  />
                  <div className="flex items-center gap-2">
                    <CloudIcon className="size-4 text-muted-foreground" />
                    <span className="text-sm">Sync to QuickBooks</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Checkbox
                    checked={attachPodDocuments}
                    onCheckedChange={setAttachPodDocuments}
                  />
                  <div className="flex items-center gap-2">
                    <PaperclipIcon className="size-4 text-muted-foreground" />
                    <span className="text-sm">Attach POD documents</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleCreateInvoice(selectedRows)}
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              Create{" "}
              {invoiceType === "summary"
                ? Object.keys(selectedByCustomer).length
                : selectedRows.length}{" "}
              Invoice(s)
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReadyToInvoice;
