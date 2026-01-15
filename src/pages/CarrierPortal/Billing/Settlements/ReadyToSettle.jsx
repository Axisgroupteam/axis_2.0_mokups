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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  WrenchIcon,
  CheckCircle2Icon,
  BanknoteIcon,
  Building2,
} from "lucide-react";

const ReadyToSettle = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [showBatchSettleDialog, setShowBatchSettleDialog] = useState(false);
  const [selectedBU, setSelectedBU] = useState("mega-trucking");

  // Mock data - loads ready to be settled with drivers/technicians (Mega Trucking)
  const driverReadyToSettleData = [
    {
      id: 1,
      loadNo: "ML-2025-001245",
      payeeId: "DRV-001",
      payeeName: "John Smith",
      payeeType: "Driver",
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
      payeeId: "DRV-002",
      payeeName: "Mike Davis",
      payeeType: "Driver",
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
      payeeId: "DRV-003",
      payeeName: "Sarah Johnson",
      payeeType: "Driver",
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
      loadNo: "WO-2025-000123",
      payeeId: "TECH-001",
      payeeName: "Carlos Martinez",
      payeeType: "Technician",
      deliveryDate: "2025-01-05",
      customer: "Internal",
      origin: "Houston Yard",
      destination: "Houston Yard",
      miles: 0,
      lineHaulPay: 450.00,
      fuelAdvance: 0.00,
      accessorialPay: 50.00,
      deductions: 0.00,
      netPay: 500.00,
      payType: "Hourly",
      vehicleNo: "-",
      podVerified: true,
    },
    {
      id: 5,
      loadNo: "ML-2025-001248",
      payeeId: "DRV-001",
      payeeName: "John Smith",
      payeeType: "Driver",
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
      id: 6,
      loadNo: "WO-2025-000124",
      payeeId: "TECH-002",
      payeeName: "James Wilson",
      payeeType: "Technician",
      deliveryDate: "2025-01-06",
      customer: "Internal",
      origin: "Dallas Yard",
      destination: "Dallas Yard",
      miles: 0,
      lineHaulPay: 525.00,
      fuelAdvance: 0.00,
      accessorialPay: 75.00,
      deductions: 25.00,
      netPay: 575.00,
      payType: "Hourly",
      vehicleNo: "-",
      podVerified: true,
    },
  ];

  // Mock data - brokerage loads ready to be settled with carriers (Mega Logistics)
  const carrierReadyToSettleData = [
    {
      id: 101,
      loadNo: "BRK-2025-001289",
      payeeId: "VND-001",
      payeeName: "Swift Transport LLC",
      payeeType: "Carrier",
      deliveryDate: "2025-01-08",
      customer: "Titan Construction",
      origin: "Houston, TX",
      destination: "Phoenix, AZ",
      miles: 0,
      lineHaulPay: 1850.00,
      fuelAdvance: 0.00,
      accessorialPay: 100.00,
      deductions: 0.00,
      netPay: 1950.00,
      payType: "Flat Rate",
      vehicleNo: "-",
      podVerified: true,
      invoiceNo: "INV-2025-0920",
      invoiceStatus: "Paid",
    },
    {
      id: 102,
      loadNo: "BRK-2025-001290",
      payeeId: "VND-002",
      payeeName: "Prime Logistics Inc",
      payeeType: "Carrier",
      deliveryDate: "2025-01-08",
      customer: "TQL Logistics",
      origin: "Dallas, TX",
      destination: "Los Angeles, CA",
      miles: 0,
      lineHaulPay: 2100.00,
      fuelAdvance: 0.00,
      accessorialPay: 75.00,
      deductions: 0.00,
      netPay: 2175.00,
      payType: "Flat Rate",
      vehicleNo: "-",
      podVerified: true,
      invoiceNo: "INV-2025-0921",
      invoiceStatus: "Paid",
    },
    {
      id: 103,
      loadNo: "BRK-2025-001291",
      payeeId: "VND-001",
      payeeName: "Swift Transport LLC",
      payeeType: "Carrier",
      deliveryDate: "2025-01-09",
      customer: "CH Robinson",
      origin: "San Antonio, TX",
      destination: "Denver, CO",
      miles: 0,
      lineHaulPay: 1650.00,
      fuelAdvance: 0.00,
      accessorialPay: 125.00,
      deductions: 50.00,
      netPay: 1725.00,
      payType: "Flat Rate",
      vehicleNo: "-",
      podVerified: true,
      invoiceNo: "INV-2025-0925",
      invoiceStatus: "Paid",
    },
    {
      id: 104,
      loadNo: "BRK-2025-001292",
      payeeId: "VND-003",
      payeeName: "Roadrunner Freight",
      payeeType: "Carrier",
      deliveryDate: "2025-01-09",
      customer: "Ashgrove Cement",
      origin: "Austin, TX",
      destination: "Albuquerque, NM",
      miles: 0,
      lineHaulPay: 1400.00,
      fuelAdvance: 0.00,
      accessorialPay: 75.00,
      deductions: 0.00,
      netPay: 1475.00,
      payType: "Flat Rate",
      vehicleNo: "-",
      podVerified: true,
      invoiceNo: "INV-2025-0926",
      invoiceStatus: "Paid",
    },
    {
      id: 105,
      loadNo: "BRK-2025-001293",
      payeeId: "VND-004",
      payeeName: "Eagle Express Trucking",
      payeeType: "Carrier",
      deliveryDate: "2025-01-10",
      customer: "Coyote Logistics",
      origin: "Fort Worth, TX",
      destination: "Tucson, AZ",
      miles: 0,
      lineHaulPay: 1750.00,
      fuelAdvance: 0.00,
      accessorialPay: 75.00,
      deductions: 0.00,
      netPay: 1825.00,
      payType: "Flat Rate",
      vehicleNo: "-",
      podVerified: false,
      invoiceNo: "INV-2025-0930",
      invoiceStatus: "Pending",
    },
  ];

  // Get data based on selected BU
  const filteredData = selectedBU === "mega-trucking"
    ? driverReadyToSettleData
    : carrierReadyToSettleData;

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
          key: "payee",
          label: selectedBU === "mega-trucking" ? "Payee" : "Carrier",
          type: "input",
          group: "Basic",
          placeholder: selectedBU === "mega-trucking" ? "Search payee..." : "Search carrier...",
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
    // Filter handling
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
      setSelectedRows(filteredData.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleCreateSettlement = (loadIds) => {
    console.log("Creating settlement for loads:", loadIds);
    navigate("/app/carrier-portal/billing/settlements");
  };

  const getPayeeTypeBadge = (type) => {
    const typeColors = {
      Driver: "bg-blue-500/10 text-blue-700 border-blue-500/50",
      Technician: "bg-purple-500/10 text-purple-700 border-purple-500/50",
      Carrier: "bg-cyan-500/10 text-cyan-700 border-cyan-500/50",
    };
    return typeColors[type] || "bg-gray-500/10 text-gray-700 border-gray-500/50";
  };

  const getPayeeTypeIcon = (type) => {
    switch (type) {
      case "Driver":
        return <UserIcon className="size-3" />;
      case "Technician":
        return <WrenchIcon className="size-3" />;
      case "Carrier":
        return <TruckIcon className="size-3" />;
      default:
        return null;
    }
  };

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={selectedRows.length === filteredData.length && filteredData.length > 0}
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
        <DataTableColumnHeader column={column} title="Load/WO No" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm font-medium text-primary">
          {row.getValue("loadNo")}
        </span>
      ),
    },
    {
      accessorKey: "payeeName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={selectedBU === "mega-trucking" ? "Payee" : "Carrier"} />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.getValue("payeeName")}</span>
          <span className="text-xs text-muted-foreground">{row.original.payeeId}</span>
        </div>
      ),
    },
    {
      accessorKey: "payeeType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => {
        const payeeType = row.getValue("payeeType");
        return (
          <Badge className={`${getPayeeTypeBadge(payeeType)} flex items-center gap-1 w-fit`}>
            {getPayeeTypeIcon(payeeType)}
            {payeeType}
          </Badge>
        );
      },
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
    ...(selectedBU === "mega-trucking" ? [{
      accessorKey: "miles",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Miles" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("miles") || "-"}</span>
      ),
    }] : []),
    {
      accessorKey: "lineHaulPay",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={selectedBU === "mega-trucking" ? "Line Haul" : "Carrier Rate"} />
      ),
      cell: ({ row }) => formatCurrency(row.getValue("lineHaulPay")),
    },
    ...(selectedBU === "mega-trucking" ? [{
      accessorKey: "fuelAdvance",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fuel Advance" />
      ),
      cell: ({ row }) => {
        const fuelAdvance = row.getValue("fuelAdvance");
        return fuelAdvance > 0 ? (
          <span className="text-amber-600">-{formatCurrency(fuelAdvance)}</span>
        ) : (
          <span className="text-muted-foreground">-</span>
        );
      },
    }] : []),
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
  const selectedTotal = filteredData
    .filter((row) => selectedRows.includes(row.id))
    .reduce((sum, row) => sum + row.netPay, 0);

  // Group by payee for batch settlement
  const selectedByPayee = filteredData
    .filter((row) => selectedRows.includes(row.id))
    .reduce((acc, row) => {
      if (!acc[row.payeeId]) {
        acc[row.payeeId] = {
          payee: row.payeeName,
          payeeId: row.payeeId,
          payeeType: row.payeeType,
          loads: [],
          totalNetPay: 0,
        };
      }
      acc[row.payeeId].loads.push(row);
      acc[row.payeeId].totalNetPay += row.netPay;
      return acc;
    }, {});

  // Calculate stats
  const uniquePayees = new Set(filteredData.map((r) => r.payeeId)).size;
  const verifiedPods = filteredData.filter((r) => r.podVerified).length;
  const totalNetPay = filteredData.reduce((sum, row) => sum + row.netPay, 0);

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
              {selectedBU === "mega-trucking"
                ? "Completed loads ready for driver/technician settlement"
                : "Completed brokerage loads ready for carrier settlement"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Business Unit Selector */}
            <Select value={selectedBU} onValueChange={(value) => {
              setSelectedBU(value);
              setSelectedRows([]);
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select BU" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mega-trucking">
                  <div className="flex items-center gap-2">
                    <TruckIcon className="size-4" />
                    Mega Trucking
                  </div>
                </SelectItem>
                <SelectItem value="mega-logistics">
                  <div className="flex items-center gap-2">
                    <Building2 className="size-4" />
                    Mega Logistics
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
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
                <p className="text-xl font-bold">{filteredData.length}</p>
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
                  {formatCurrency(totalNetPay)}
                </p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                {selectedBU === "mega-trucking" ? (
                  <UserIcon className="size-5 text-purple-600" />
                ) : (
                  <Building2 className="size-5 text-purple-600" />
                )}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {selectedBU === "mega-trucking" ? "Unique Payees" : "Unique Carriers"}
                </p>
                <p className="text-xl font-bold">{uniquePayees}</p>
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
                  {verifiedPods}/{filteredData.length}
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
              data={filteredData}
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
            <AlertDialogTitle>Create Settlements</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to create settlements for {selectedRows.length} loads.
              {Object.keys(selectedByPayee).length > 1 && (
                <span className="block mt-2">
                  This will generate {Object.keys(selectedByPayee).length} separate settlements (one per {selectedBU === "mega-trucking" ? "payee" : "carrier"}).
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4 space-y-3 max-h-64 overflow-y-auto">
            {Object.values(selectedByPayee).map((group) => (
              <div key={group.payeeId} className="border rounded-lg p-3 bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{group.payee}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`${getPayeeTypeBadge(group.payeeType)} flex items-center gap-1`} style={{ fontSize: '10px', padding: '2px 6px' }}>
                        {getPayeeTypeIcon(group.payeeType)}
                        {group.payeeType}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{group.loads.length} loads</span>
                    </div>
                  </div>
                  <p className="font-bold text-green-600">{formatCurrency(group.totalNetPay)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 flex items-center justify-between">
            <span className="font-medium">Grand Total</span>
            <span className="text-lg font-bold text-green-600">{formatCurrency(selectedTotal)}</span>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleCreateSettlement(selectedRows)}
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              Create {Object.keys(selectedByPayee).length} Settlement(s)
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReadyToSettle;
