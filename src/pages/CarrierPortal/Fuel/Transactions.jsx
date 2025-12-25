import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontalIcon,
  EyeIcon,
  FlagIcon,
  CheckCircleIcon,
  XCircleIcon,
  DownloadIcon,
  MapPinIcon,
  CheckCircle,
  Clock,
  AlertCircle,
  FileSearch,
} from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

const Transactions = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);

  // Mock data for fuel transactions
  const transactions = [
    {
      id: 1,
      transactionId: "TXN-2025-00001",
      cardNumber: "****-0012",
      driverName: "John Smith",
      driverId: "DRV-001",
      platform: "EFS",
      transactionDate: "2025-01-15T14:32:00",
      stationName: "Love's Travel Stop #245",
      city: "Dallas",
      state: "TX",
      fuelType: "Diesel",
      gallons: 125.5,
      pricePerGallon: 3.45,
      grossAmount: 432.98,
      discountAmount: 12.55,
      netAmount: 420.43,
      odometer: 245678,
      settlementStatus: "Settled",
    },
    {
      id: 2,
      transactionId: "TXN-2025-00002",
      cardNumber: "****-0023",
      driverName: "Maria Garcia",
      driverId: "DRV-002",
      platform: "Commdata",
      transactionDate: "2025-01-15T11:15:00",
      stationName: "Pilot Flying J #512",
      city: "Houston",
      state: "TX",
      fuelType: "Diesel",
      gallons: 98.2,
      pricePerGallon: 3.52,
      grossAmount: 345.66,
      discountAmount: 9.82,
      netAmount: 335.84,
      odometer: 189432,
      settlementStatus: "Pending",
    },
    {
      id: 3,
      transactionId: "TXN-2025-00003",
      cardNumber: "****-0034",
      driverName: "Robert Johnson",
      driverId: "DRV-003",
      platform: "Relay",
      transactionDate: "2025-01-15T08:45:00",
      stationName: "TA Travel Center #301",
      city: "Atlanta",
      state: "GA",
      fuelType: "Diesel",
      gallons: 150.0,
      pricePerGallon: 3.38,
      grossAmount: 507.00,
      discountAmount: 15.00,
      netAmount: 492.00,
      odometer: 312456,
      settlementStatus: "Settled",
    },
    {
      id: 4,
      transactionId: "TXN-2025-00004",
      cardNumber: "****-0067",
      driverName: "Emily Davis",
      driverId: "DRV-006",
      platform: "Relay",
      transactionDate: "2025-01-14T16:22:00",
      stationName: "QuikTrip #789",
      city: "Oklahoma City",
      state: "OK",
      fuelType: "Diesel",
      gallons: 88.7,
      pricePerGallon: 3.41,
      grossAmount: 302.47,
      discountAmount: 8.87,
      netAmount: 293.60,
      odometer: 156789,
      settlementStatus: "Pending",
    },
    {
      id: 5,
      transactionId: "TXN-2025-00005",
      cardNumber: "****-0089",
      driverName: "Jennifer Wilson",
      driverId: "DRV-008",
      platform: "Commdata",
      transactionDate: "2025-01-14T13:10:00",
      stationName: "Buc-ee's #102",
      city: "San Antonio",
      state: "TX",
      fuelType: "Diesel",
      gallons: 175.3,
      pricePerGallon: 3.35,
      grossAmount: 587.26,
      discountAmount: 17.53,
      netAmount: 569.73,
      odometer: 423567,
      settlementStatus: "Settled",
    },
    {
      id: 6,
      transactionId: "TXN-2025-00006",
      cardNumber: "****-0012",
      driverName: "John Smith",
      driverId: "DRV-001",
      platform: "EFS",
      transactionDate: "2025-01-14T09:45:00",
      stationName: "Sapp Bros #045",
      city: "Denver",
      state: "CO",
      fuelType: "DEF",
      gallons: 25.0,
      pricePerGallon: 2.89,
      grossAmount: 72.25,
      discountAmount: 2.50,
      netAmount: 69.75,
      odometer: 245123,
      settlementStatus: "Settled",
    },
    {
      id: 7,
      transactionId: "TXN-2025-00007",
      cardNumber: "****-0023",
      driverName: "Maria Garcia",
      driverId: "DRV-002",
      platform: "Commdata",
      transactionDate: "2025-01-13T15:30:00",
      stationName: "Petro Stopping Center #178",
      city: "Memphis",
      state: "TN",
      fuelType: "Diesel",
      gallons: 112.8,
      pricePerGallon: 3.48,
      grossAmount: 392.54,
      discountAmount: 11.28,
      netAmount: 381.26,
      odometer: 188900,
      settlementStatus: "Disputed",
    },
    {
      id: 8,
      transactionId: "TXN-2025-00008",
      cardNumber: "****-0034",
      driverName: "Robert Johnson",
      driverId: "DRV-003",
      platform: "Relay",
      transactionDate: "2025-01-13T10:20:00",
      stationName: "Flying J #623",
      city: "Nashville",
      state: "TN",
      fuelType: "Diesel",
      gallons: 142.5,
      pricePerGallon: 3.42,
      grossAmount: 487.35,
      discountAmount: 14.25,
      netAmount: 473.10,
      odometer: 311234,
      settlementStatus: "Pending Review",
    },
  ];

  const platforms = ["EFS", "Commdata", "Relay"];
  const fuelTypes = ["Diesel", "DEF", "Gasoline"];
  const settlementStatuses = ["Pending", "Settled", "Disputed", "Pending Review"];

  // Calculate counts for summary cards
  const settledCount = transactions.filter((t) => t.settlementStatus === "Settled").length;
  const pendingCount = transactions.filter((t) => t.settlementStatus === "Pending").length;
  const disputedCount = transactions.filter((t) => t.settlementStatus === "Disputed").length;
  const pendingReviewCount = transactions.filter((t) => t.settlementStatus === "Pending Review").length;

  // Calculate totals
  const totalAmount = transactions.reduce((sum, t) => sum + t.netAmount, 0);
  const totalGallons = transactions.reduce((sum, t) => sum + t.gallons, 0);

  const getStatusBadgeColor = (status) => {
    const colors = {
      Settled: "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50",
      Pending: "bg-amber-500/10 hover:bg-amber-500/30 text-amber-700 dark:text-amber-400 border border-amber-500/50",
      Disputed: "bg-red-500/10 hover:bg-red-500/30 text-red-700 dark:text-red-400 border border-red-500/50",
      "Pending Review": "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50",
    };
    return colors[status] || "bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  const getPlatformBadgeColor = (platform) => {
    const colors = {
      EFS: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/50",
      Commdata: "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/50",
      Relay: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/50",
    };
    return colors[platform] || "bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filterGroups = [
    {
      id: "transaction-filters",
      label: "Filter Transactions",
      filters: [
        {
          key: "transactionId",
          label: "Transaction ID",
          type: "input",
          group: "Basic",
          placeholder: "Search transaction ID...",
        },
        {
          key: "driverName",
          label: "Driver",
          type: "input",
          group: "Basic",
          placeholder: "Search driver name...",
        },
        {
          key: "platform",
          label: "Platform",
          type: "select",
          group: "Basic",
          options: platforms.map((p) => ({ label: p, value: p })),
        },
        {
          key: "fuelType",
          label: "Fuel Type",
          type: "select",
          group: "Basic",
          options: fuelTypes.map((f) => ({ label: f, value: f })),
        },
        {
          key: "settlementStatus",
          label: "Status",
          type: "select",
          group: "Basic",
          options: settlementStatuses.map((s) => ({ label: s, value: s })),
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => {
        const transaction = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <div className="px-2 py-1.5 border-b mb-1">
                <p className="font-medium text-sm">{transaction.transactionId}</p>
                <p className="text-xs text-muted-foreground">{transaction.driverName}</p>
              </div>
              <DropdownMenuItem className="cursor-pointer">
                <EyeIcon className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <MapPinIcon className="h-4 w-4 mr-2" />
                View Location
              </DropdownMenuItem>
              {transaction.settlementStatus !== "Disputed" && (
                <DropdownMenuItem className="cursor-pointer text-amber-600">
                  <FlagIcon className="h-4 w-4 mr-2" />
                  Dispute Transaction
                </DropdownMenuItem>
              )}
              {transaction.settlementStatus === "Disputed" && (
                <>
                  <DropdownMenuItem className="cursor-pointer text-green-600">
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    Resolve Dispute
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-600">
                    <XCircleIcon className="h-4 w-4 mr-2" />
                    Cancel Transaction
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "transactionId",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Transaction ID" />,
      cell: ({ row }) => (
        <button
          onClick={() => navigate(`/app/carrier-portal/fuel/transactions/${row.getValue("transactionId")}`)}
          className="font-mono text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
        >
          {row.getValue("transactionId")}
        </button>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "transactionDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Date/Time" />,
      cell: ({ row }) => (
        <span className="text-sm">{formatDateTime(row.getValue("transactionDate"))}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "driverName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Driver" />,
      cell: ({ row }) => {
        const transaction = row.original;
        return (
          <div>
            <p className="font-medium">{transaction.driverName}</p>
            <p className="text-xs text-muted-foreground">{transaction.cardNumber}</p>
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "platform",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Platform" />,
      cell: ({ row }) => {
        const platform = row.getValue("platform");
        return <Badge className={getPlatformBadgeColor(platform)}>{platform}</Badge>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "stationName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />,
      cell: ({ row }) => {
        const transaction = row.original;
        return (
          <div>
            <p className="text-sm truncate max-w-[180px]">{transaction.stationName}</p>
            <p className="text-xs text-muted-foreground">{transaction.city}, {transaction.state}</p>
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "fuelType",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      enableSorting: true,
    },
    {
      accessorKey: "gallons",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Gallons" />,
      cell: ({ row }) => <span>{row.getValue("gallons").toFixed(1)}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "pricePerGallon",
      header: ({ column }) => <DataTableColumnHeader column={column} title="PPG" />,
      cell: ({ row }) => <span>{formatCurrency(row.getValue("pricePerGallon"))}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "netAmount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Net Amount" />,
      cell: ({ row }) => {
        const transaction = row.original;
        return (
          <div>
            <p className="font-medium">{formatCurrency(transaction.netAmount)}</p>
            {transaction.discountAmount > 0 && (
              <p className="text-xs text-green-600">-{formatCurrency(transaction.discountAmount)}</p>
            )}
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "settlementStatus",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.getValue("settlementStatus");
        return <Badge className={getStatusBadgeColor(status)}>{status}</Badge>;
      },
      enableSorting: true,
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="px-6 py-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-2 text-green-600 mb-1">
              <CheckCircle className="size-4" />
              <span className="text-xs">Settled</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{settledCount}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-2 text-amber-600 mb-1">
              <Clock className="size-4" />
              <span className="text-xs">Pending</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <FileSearch className="size-4" />
              <span className="text-xs">Pending Review</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{pendingReviewCount}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-2 text-red-600 mb-1">
              <AlertCircle className="size-4" />
              <span className="text-xs">Disputed</span>
            </div>
            <p className="text-2xl font-bold text-red-600">{disputedCount}</p>
          </div>
        </div>

        {/* Filter and Actions Row */}
        <div className="flex items-center justify-between mb-1">
          <SmartFilter filterGroups={filterGroups} onFiltersChange={handleFiltersChange} />
          <Button variant="outline">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Data Table */}
        <DataTable columns={columns} data={transactions} showViewOptions={false} />
      </div>
    </div>
  );
};

export default Transactions;
