import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  MapPin,
  Calendar,
  DollarSign,
  Phone,
  RefreshCw,
  XCircle,
  MessageSquare,
  Clock,
} from "lucide-react";

const CoverageFailed = () => {
  // Mock data for failed coverage loads
  const failedData = [
    {
      id: 1,
      loadId: "ML-2025-001233",
      customerName: "Premier Precast",
      origin: "El Paso, TX",
      destination: "Albuquerque, NM",
      pickupDate: "2024-01-29",
      equipment: "Lowboy",
      customerRate: "$4,500.00",
      failureReason: "No Carrier Available",
      attempts: 5,
      timeInFailed: "6h 30m",
      escalatedTo: "Management",
      status: "Escalated",
    },
    {
      id: 2,
      loadId: "ML-2025-001234",
      customerName: "BuildRight Construction",
      origin: "Lubbock, TX",
      destination: "Amarillo, TX",
      pickupDate: "2024-01-30",
      equipment: "End Dump",
      customerRate: "$1,200.00",
      failureReason: "Rate Too Low",
      attempts: 3,
      timeInFailed: "2h 15m",
      escalatedTo: "Pricing Team",
      status: "Under Review",
    },
  ];

  const getStatusBadge = (status) => {
    const colors = {
      "Escalated": "bg-red-500/10 text-red-700 border-red-500/50",
      "Under Review": "bg-yellow-500/10 text-yellow-700 border-yellow-500/50",
      "Customer Contacted": "bg-blue-500/10 text-blue-700 border-blue-500/50",
    };
    return <Badge className={colors[status] || ""}>{status}</Badge>;
  };

  const getReasonBadge = (reason) => {
    const colors = {
      "No Carrier Available": "bg-red-500/10 text-red-700 border-red-500/50",
      "Rate Too Low": "bg-orange-500/10 text-orange-700 border-orange-500/50",
      "Equipment Unavailable": "bg-purple-500/10 text-purple-700 border-purple-500/50",
    };
    return <Badge className={colors[reason] || ""}>{reason}</Badge>;
  };

  const failedColumns = [
    {
      accessorKey: "loadId",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Load ID" />,
      cell: ({ row }) => (
        <span className="font-mono text-sm font-medium text-red-600">{row.getValue("loadId")}</span>
      ),
    },
    {
      accessorKey: "customerName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    },
    {
      accessorKey: "origin",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Route" />,
      cell: ({ row }) => (
        <div className="text-xs">
          <div className="flex items-center gap-1">
            <MapPin className="size-3 text-green-600" />
            {row.getValue("origin")}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="size-3 text-red-600" />
            {row.original.destination}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "pickupDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Pickup" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Calendar className="size-3 text-muted-foreground" />
          {row.getValue("pickupDate")}
        </div>
      ),
    },
    {
      accessorKey: "customerRate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Rate" />,
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("customerRate")}</span>
      ),
    },
    {
      accessorKey: "failureReason",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Failure Reason" />,
      cell: ({ row }) => getReasonBadge(row.getValue("failureReason")),
    },
    {
      accessorKey: "attempts",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Attempts" />,
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("attempts")} carriers</span>
      ),
    },
    {
      accessorKey: "timeInFailed",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Time in Failed" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-red-600">
          <Clock className="size-3" />
          {row.getValue("timeInFailed")}
        </div>
      ),
    },
    {
      accessorKey: "escalatedTo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Escalated To" />,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => getStatusBadge(row.getValue("status")),
    },
    {
      id: "actions",
      cell: () => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <RefreshCw className="size-3 mr-1" />
            Retry Search
          </Button>
          <Button size="sm" variant="outline">
            <Phone className="size-3 mr-1" />
            Call Customer
          </Button>
          <Button size="sm" variant="outline" className="text-red-600">
            <XCircle className="size-3 mr-1" />
            Cancel Load
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden p-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="border rounded-lg p-4 bg-card border-red-200">
          <div className="flex items-center gap-2 text-red-600 mb-1">
            <AlertTriangle className="size-4" />
            <span className="text-xs">Coverage Failed</span>
          </div>
          <p className="text-2xl font-bold text-red-600">2</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-orange-600 mb-1">
            <Clock className="size-4" />
            <span className="text-xs">Pickup Today</span>
          </div>
          <p className="text-2xl font-bold text-orange-600">1</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-yellow-600 mb-1">
            <MessageSquare className="size-4" />
            <span className="text-xs">Customer Contact Needed</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">2</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <DollarSign className="size-4" />
            <span className="text-xs">At Risk Revenue</span>
          </div>
          <p className="text-2xl font-bold">$5,700</p>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="border rounded-lg p-4 bg-red-50 dark:bg-red-950/30 mb-4 border-red-200">
        <h3 className="text-sm font-semibold text-red-800 dark:text-red-200 flex items-center gap-2 mb-2">
          <AlertTriangle className="size-4" />
          Coverage Failed - Escalation Required
        </h3>
        <p className="text-xs text-red-700 dark:text-red-300">
          These loads could not be covered by external carriers. Status: COVERAGE-FAILED.
          Options: Retry carrier search, contact customer for reschedule, or cancel load.
        </p>
      </div>

      {/* Failed Table */}
      <div className="border rounded-sm bg-card flex-1 border-red-200">
        <div className="px-4 py-3 border-b bg-red-50 dark:bg-red-950/20">
          <h3 className="text-sm font-semibold text-red-800 dark:text-red-200 flex items-center gap-2">
            <AlertTriangle className="size-4" />
            Loads Requiring Escalation
          </h3>
        </div>
        <div className="p-4">
          <DataTable
            columns={failedColumns}
            data={failedData}
            showViewOptions={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CoverageFailed;
