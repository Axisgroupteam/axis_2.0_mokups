import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
  Wallet,
  MoreHorizontal,
  EyeIcon,
  DollarSign,
  TruckIcon,
  UserIcon,
  CheckCircle2Icon,
  BanknoteIcon,
} from "lucide-react";

const ReadyToSettle = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showBatchSettleDialog, setShowBatchSettleDialog] = useState(false);

  // Mock data - loads that are complete and ready to be settled with drivers
  const readyToSettleData = [
    {
      id: 1,
      loadNo: "ML-2025-001245",
      driverId: "DRV-001",
      driverName: "John Smith",
      deliveryDate: "2025-01-05",
      customer: "Titan Construction",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      miles: 240,
      lineHaulPay: 480.00,
      fuelAdvance: 150.00,
      accessorialPay: 75.00,
      deductions: 0.00,
      netPay: 405.00,
      payType: "Per Mile",
      vehicleNo: "TRK-2847",
      podVerified: true,
    },
    {
      id: 2,
      loadNo: "ML-2025-001246",
      driverId: "DRV-002",
      driverName: "Mike Davis",
      deliveryDate: "2025-01-05",
      customer: "Titan Construction",
      origin: "Austin, TX",
      destination: "Dallas, TX",
      miles: 195,
      lineHaulPay: 390.00,
      fuelAdvance: 120.00,
      accessorialPay: 50.00,
      deductions: 25.00,
      netPay: 295.00,
      payType: "Per Mile",
      vehicleNo: "TRK-1923",
      podVerified: true,
    },
    {
      id: 3,
      loadNo: "ML-2025-001247",
      driverId: "DRV-003",
      driverName: "Sarah Johnson",
      deliveryDate: "2025-01-06",
      customer: "Ashgrove Cement",
      origin: "San Antonio, TX",
      destination: "Houston, TX",
      miles: 200,
      lineHaulPay: 400.00,
      fuelAdvance: 130.00,
      accessorialPay: 100.00,
      deductions: 0.00,
      netPay: 370.00,
      payType: "Per Mile",
      vehicleNo: "TRK-4521",
      podVerified: true,
    },
    {
      id: 4,
      loadNo: "ML-2025-001248",
      driverId: "DRV-001",
      driverName: "John Smith",
      deliveryDate: "2025-01-06",
      customer: "TQL Logistics",
      origin: "Fort Worth, TX",
      destination: "Austin, TX",
      miles: 190,
      lineHaulPay: 380.00,
      fuelAdvance: 100.00,
      accessorialPay: 50.00,
      deductions: 0.00,
      netPay: 330.00,
      payType: "Per Mile",
      vehicleNo: "TRK-2847",
      podVerified: true,
    },
    {
      id: 5,
      loadNo: "ML-2025-001249",
      driverId: "DRV-004",
      driverName: "Robert Wilson",
      deliveryDate: "2025-01-07",
      customer: "Ashgrove Cement",
      origin: "Dallas, TX",
      destination: "San Antonio, TX",
      miles: 275,
      lineHaulPay: 550.00,
      fuelAdvance: 175.00,
      accessorialPay: 0.00,
      deductions: 50.00,
      netPay: 325.00,
      payType: "Per Mile",
      vehicleNo: "TRK-7734",
      podVerified: false,
    },
    {
      id: 6,
      loadNo: "ML-2025-001250",
      driverId: "DRV-002",
      driverName: "Mike Davis",
      deliveryDate: "2025-01-07",
      customer: "CH Robinson",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      miles: 240,
      lineHaulPay: 480.00,
      fuelAdvance: 150.00,
      accessorialPay: 75.00,
      deductions: 0.00,
      netPay: 405.00,
      payType: "Per Mile",
      vehicleNo: "TRK-1923",
      podVerified: true,
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
          key: "driver",
          label: "Driver",
          type: "input",
          group: "Basic",
          placeholder: "Search driver...",
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
          label: "POD Verified",
          type: "select",
          group: "Basic",
          options: [
            { value: "verified", label: "Verified" },
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
      setSelectedRows(readyToSettleData.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleCreateSettlement = (loadIds) => {
    console.log("Creating settlement for loads:", loadIds);
    navigate("/app/carrier-portal/billing/settlements");
  };

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={selectedRows.length === readyToSettleData.length}
          onCheckedChange={handleSelectAll}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedRows.includes(row.original.id)}
          onCheckedChange={(checked) => handleSelectRow(row.original.id, checked)}
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
              <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/complete/load-details?id=${load.loadNo}&mode=view`)}>
                <EyeIcon className="h-4 w-4 mr-2" />
                View Load
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCreateSettlement([load.id])}>
                <BanknoteIcon className="h-4 w-4 mr-2" />
                Settle Load
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
      accessorKey: "driverName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Driver" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.getValue("driverName")}</span>
          <span className="text-xs text-muted-foreground">{row.original.driverId}</span>
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
      accessorKey: "customer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
    },
    {
      accessorKey: "miles",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Miles" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("miles")}</span>
      ),
    },
    {
      accessorKey: "lineHaulPay",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Line Haul" />
      ),
      cell: ({ row }) => formatCurrency(row.getValue("lineHaulPay")),
    },
    {
      accessorKey: "fuelAdvance",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fuel Advance" />
      ),
      cell: ({ row }) => (
        <span className="text-amber-600">-{formatCurrency(row.getValue("fuelAdvance"))}</span>
      ),
    },
    {
      accessorKey: "accessorialPay",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Accessorial" />
      ),
      cell: ({ row }) => formatCurrency(row.getValue("accessorialPay")),
    },
    {
      accessorKey: "deductions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Deductions" />
      ),
      cell: ({ row }) => {
        const deductions = row.getValue("deductions");
        return deductions > 0 ? (
          <span className="text-red-600">-{formatCurrency(deductions)}</span>
        ) : (
          <span className="text-muted-foreground">{formatCurrency(0)}</span>
        );
      },
    },
    {
      accessorKey: "netPay",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Net Pay" />
      ),
      cell: ({ row }) => (
        <span className="font-bold text-green-600">
          {formatCurrency(row.getValue("netPay"))}
        </span>
      ),
    },
    {
      accessorKey: "podVerified",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="POD" />
      ),
      cell: ({ row }) => {
        const podVerified = row.getValue("podVerified");
        return (
          <Badge
            className={
              podVerified
                ? "bg-green-500/10 text-green-700 border-green-500/50"
                : "bg-amber-500/10 text-amber-700 border-amber-500/50"
            }
          >
            {podVerified ? "Verified" : "Pending"}
          </Badge>
        );
      },
    },
  ];

  // Calculate totals for selected rows
  const selectedTotal = readyToSettleData
    .filter((row) => selectedRows.includes(row.id))
    .reduce((sum, row) => sum + row.netPay, 0);

  // Group by driver for batch settlement
  const selectedByDriver = readyToSettleData
    .filter((row) => selectedRows.includes(row.id))
    .reduce((acc, row) => {
      if (!acc[row.driverId]) {
        acc[row.driverId] = {
          driver: row.driverName,
          driverId: row.driverId,
          loads: [],
          totalNetPay: 0,
        };
      }
      acc[row.driverId].loads.push(row);
      acc[row.driverId].totalNetPay += row.netPay;
      return acc;
    }, {});

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex-shrink-0 border-b bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Wallet className="size-6" />
              Ready to Settle
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Completed loads ready for driver settlement
            </p>
          </div>
          <div className="flex items-center gap-4">
            {selectedRows.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="text-sm">
                  <span className="text-muted-foreground">Selected: </span>
                  <span className="font-bold">{selectedRows.length} loads</span>
                  <span className="mx-2 text-muted-foreground">|</span>
                  <span className="text-muted-foreground">Total Pay: </span>
                  <span className="font-bold text-green-600">{formatCurrency(selectedTotal)}</span>
                </div>
                <Button
                  onClick={() => setShowBatchSettleDialog(true)}
                  className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  <BanknoteIcon className="size-4 mr-2" />
                  Create Settlement ({selectedRows.length})
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
                <TruckIcon className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Loads</p>
                <p className="text-xl font-bold">{readyToSettleData.length}</p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <DollarSign className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Net Pay</p>
                <p className="text-xl font-bold text-green-600">
                  {formatCurrency(readyToSettleData.reduce((sum, row) => sum + row.netPay, 0))}
                </p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <UserIcon className="size-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Unique Drivers</p>
                <p className="text-xl font-bold">
                  {new Set(readyToSettleData.map((r) => r.driverId)).size}
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
                <p className="text-xs text-muted-foreground">POD Verified</p>
                <p className="text-xl font-bold">
                  {readyToSettleData.filter((r) => r.podVerified).length}/{readyToSettleData.length}
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
              data={readyToSettleData}
              showViewOptions={false}
              pageSize={10}
            />
          </div>
        </div>
      </div>

      {/* Batch Settlement Dialog */}
      <AlertDialog open={showBatchSettleDialog} onOpenChange={setShowBatchSettleDialog}>
        <AlertDialogContent className="max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Create Driver Settlements</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to create settlements for {selectedRows.length} loads.
              {Object.keys(selectedByDriver).length > 1 && (
                <span className="block mt-2">
                  This will generate {Object.keys(selectedByDriver).length} separate settlements (one per driver).
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4 space-y-3">
            {Object.values(selectedByDriver).map((group) => (
              <div key={group.driverId} className="border rounded-lg p-3 bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{group.driver}</p>
                    <p className="text-xs text-muted-foreground">{group.loads.length} loads</p>
                  </div>
                  <p className="font-bold text-green-600">{formatCurrency(group.totalNetPay)}</p>
                </div>
              </div>
            ))}
            <div className="border-t pt-3 flex items-center justify-between">
              <span className="font-medium">Grand Total</span>
              <span className="text-lg font-bold text-green-600">{formatCurrency(selectedTotal)}</span>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleCreateSettlement(selectedRows)}
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              Create {Object.keys(selectedByDriver).length} Settlement(s)
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReadyToSettle;
