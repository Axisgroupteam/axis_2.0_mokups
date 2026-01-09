import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import SmartFilter from "@/components/SmartFilter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Wallet,
  MoreHorizontal,
  EyeIcon,
  DownloadIcon,
  PrinterIcon,
  DollarSign,
  ClockIcon,
  CheckCircle2Icon,
  PlusIcon,
  BanknoteIcon,
  UserIcon,
} from "lucide-react";

const Settlements = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);

  // Mock settlements data
  const settlementsData = [
    {
      id: 1,
      settlementNo: "STL-2025-0001",
      driver: "John Smith",
      driverId: "DRV-001",
      periodStart: "2025-01-01",
      periodEnd: "2025-01-07",
      loadCount: 8,
      grossPay: 3840.00,
      fuelAdvances: 1200.00,
      accessorialPay: 350.00,
      deductions: 75.00,
      netPay: 2915.00,
      status: "Pending",
      paymentMethod: "Direct Deposit",
      createdDate: "2025-01-08",
    },
    {
      id: 2,
      settlementNo: "STL-2025-0002",
      driver: "Mike Davis",
      driverId: "DRV-002",
      periodStart: "2025-01-01",
      periodEnd: "2025-01-07",
      loadCount: 6,
      grossPay: 2880.00,
      fuelAdvances: 900.00,
      accessorialPay: 275.00,
      deductions: 50.00,
      netPay: 2205.00,
      status: "Paid",
      paymentMethod: "Direct Deposit",
      createdDate: "2025-01-08",
      paidDate: "2025-01-09",
    },
    {
      id: 3,
      settlementNo: "STL-2025-0003",
      driver: "Sarah Johnson",
      driverId: "DRV-003",
      periodStart: "2025-01-01",
      periodEnd: "2025-01-07",
      loadCount: 5,
      grossPay: 2400.00,
      fuelAdvances: 750.00,
      accessorialPay: 200.00,
      deductions: 0.00,
      netPay: 1850.00,
      status: "Paid",
      paymentMethod: "Direct Deposit",
      createdDate: "2025-01-08",
      paidDate: "2025-01-09",
    },
    {
      id: 4,
      settlementNo: "STL-2024-0245",
      driver: "Robert Wilson",
      driverId: "DRV-004",
      periodStart: "2024-12-25",
      periodEnd: "2024-12-31",
      loadCount: 7,
      grossPay: 3360.00,
      fuelAdvances: 1050.00,
      accessorialPay: 300.00,
      deductions: 100.00,
      netPay: 2510.00,
      status: "Paid",
      paymentMethod: "Direct Deposit",
      createdDate: "2025-01-02",
      paidDate: "2025-01-03",
    },
    {
      id: 5,
      settlementNo: "STL-2024-0244",
      driver: "Emily Brown",
      driverId: "DRV-005",
      periodStart: "2024-12-25",
      periodEnd: "2024-12-31",
      loadCount: 4,
      grossPay: 1920.00,
      fuelAdvances: 600.00,
      accessorialPay: 150.00,
      deductions: 25.00,
      netPay: 1445.00,
      status: "Paid",
      paymentMethod: "Check",
      createdDate: "2025-01-02",
      paidDate: "2025-01-03",
    },
    {
      id: 6,
      settlementNo: "STL-2024-0243",
      driver: "John Smith",
      driverId: "DRV-001",
      periodStart: "2024-12-18",
      periodEnd: "2024-12-24",
      loadCount: 9,
      grossPay: 4320.00,
      fuelAdvances: 1350.00,
      accessorialPay: 425.00,
      deductions: 0.00,
      netPay: 3395.00,
      status: "Paid",
      paymentMethod: "Direct Deposit",
      createdDate: "2024-12-26",
      paidDate: "2024-12-27",
    },
  ];

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "settlementNo",
          label: "Settlement No",
          type: "input",
          group: "Basic",
          placeholder: "Search settlement...",
        },
        {
          key: "driver",
          label: "Driver",
          type: "input",
          group: "Basic",
          placeholder: "Search driver...",
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "Pending", label: "Pending" },
            { value: "Paid", label: "Paid" },
            { value: "Processing", label: "Processing" },
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
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      Pending: "bg-amber-500/10 text-amber-700 border-amber-500/50",
      Paid: "bg-green-500/10 text-green-700 border-green-500/50",
      Processing: "bg-blue-500/10 text-blue-700 border-blue-500/50",
    };
    return statusColors[status] || "bg-gray-500/10 text-gray-700 border-gray-500/50";
  };

  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => {
        const settlement = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/billing/settlements/${settlement.settlementNo}`)}>
                <EyeIcon className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PrinterIcon className="h-4 w-4 mr-2" />
                Print
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {settlement.status === "Pending" && (
                <DropdownMenuItem>
                  <BanknoteIcon className="h-4 w-4 mr-2" />
                  Process Payment
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "settlementNo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Settlement No" />
      ),
      cell: ({ row }) => (
        <button
          onClick={() => navigate(`/app/carrier-portal/billing/settlements/${row.getValue("settlementNo")}`)}
          className="font-mono text-sm font-medium text-primary hover:underline"
        >
          {row.getValue("settlementNo")}
        </button>
      ),
    },
    {
      accessorKey: "driver",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Driver" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.getValue("driver")}</span>
          <span className="text-xs text-muted-foreground">{row.original.driverId}</span>
        </div>
      ),
    },
    {
      accessorKey: "periodStart",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Period" />
      ),
      cell: ({ row }) => (
        <span className="text-sm">
          {formatDate(row.getValue("periodStart"))} - {formatDate(row.original.periodEnd)}
        </span>
      ),
    },
    {
      accessorKey: "loadCount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Loads" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("loadCount")}</span>
      ),
    },
    {
      accessorKey: "grossPay",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gross Pay" />
      ),
      cell: ({ row }) => formatCurrency(row.getValue("grossPay")),
    },
    {
      accessorKey: "fuelAdvances",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fuel Advances" />
      ),
      cell: ({ row }) => (
        <span className="text-amber-600">-{formatCurrency(row.getValue("fuelAdvances"))}</span>
      ),
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
        <span className="font-bold text-green-600">{formatCurrency(row.getValue("netPay"))}</span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        return <Badge className={getStatusBadge(status)}>{status}</Badge>;
      },
    },
    {
      accessorKey: "paidDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Paid Date" />
      ),
      cell: ({ row }) => formatDate(row.getValue("paidDate")),
    },
  ];

  // Calculate summary stats
  const totalGrossPay = settlementsData.reduce((sum, s) => sum + s.grossPay, 0);
  const totalNetPay = settlementsData.reduce((sum, s) => sum + s.netPay, 0);
  const totalPending = settlementsData.filter((s) => s.status === "Pending").reduce((sum, s) => sum + s.netPay, 0);
  const pendingCount = settlementsData.filter((s) => s.status === "Pending").length;

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex-shrink-0 border-b bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Wallet className="size-6" />
              Driver Settlements
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and track driver pay settlements
            </p>
          </div>
          <Button
            onClick={() => navigate("/app/carrier-portal/billing/ready-to-settle")}
            className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            <PlusIcon className="size-4 mr-2" />
            Create Settlement
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="flex-shrink-0 px-6 py-4 border-b">
        <div className="grid grid-cols-4 gap-4">
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <DollarSign className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Gross Pay</p>
                <p className="text-xl font-bold">{formatCurrency(totalGrossPay)}</p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle2Icon className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Net Pay</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(totalNetPay)}</p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <ClockIcon className="size-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pending Payments</p>
                <p className="text-xl font-bold text-amber-600">{formatCurrency(totalPending)}</p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <UserIcon className="size-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pending Count</p>
                <p className="text-xl font-bold">{pendingCount} settlements</p>
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
              data={settlementsData}
              showViewOptions={false}
              pageSize={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settlements;
