import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Send,
  Clock,
  MapPin,
  Truck,
  DollarSign,
  Phone,
  RefreshCw,
  XCircle,
} from "lucide-react";

const TenderedLoads = () => {
  // Mock data for tendered loads
  const tenderedData = [
    {
      id: 1,
      loadId: "ML-2025-001238",
      customerName: "ABC Logistics",
      origin: "Houston, TX",
      destination: "Phoenix, AZ",
      carrierName: "Swift Transport LLC",
      carrierContact: "+1 (555) 111-2222",
      tenderedRate: "$2,800.00",
      tenderedAt: "2024-01-28 11:30 AM",
      expiresIn: "4h 30m",
      status: "Pending Response",
    },
    {
      id: 2,
      loadId: "ML-2025-001239",
      customerName: "Metro Materials",
      origin: "Dallas, TX",
      destination: "Oklahoma City, OK",
      carrierName: "Reliable Freight Inc",
      carrierContact: "+1 (555) 222-3333",
      tenderedRate: "$1,400.00",
      tenderedAt: "2024-01-28 10:45 AM",
      expiresIn: "2h 15m",
      status: "Under Review",
    },
    {
      id: 3,
      loadId: "ML-2025-001237",
      customerName: "BuildRight Construction",
      origin: "Austin, TX",
      destination: "San Antonio, TX",
      carrierName: "Premier Hauling Co",
      carrierContact: "+1 (555) 333-4444",
      tenderedRate: "$950.00",
      tenderedAt: "2024-01-28 09:15 AM",
      expiresIn: "45m",
      status: "Counter Offer",
    },
  ];

  const getStatusBadge = (status) => {
    const colors = {
      "Pending Response": "bg-yellow-500/10 text-yellow-700 border-yellow-500/50",
      "Under Review": "bg-blue-500/10 text-blue-700 border-blue-500/50",
      "Counter Offer": "bg-purple-500/10 text-purple-700 border-purple-500/50",
    };
    return <Badge className={colors[status] || ""}>{status}</Badge>;
  };

  const tenderedColumns = [
    {
      accessorKey: "loadId",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Load ID" />,
      cell: ({ row }) => (
        <span className="font-mono text-sm font-medium">{row.getValue("loadId")}</span>
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
      accessorKey: "carrierName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Carrier" />,
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.getValue("carrierName")}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Phone className="size-3" />
            {row.original.carrierContact}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "tenderedRate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tendered Rate" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1 font-medium">
          <DollarSign className="size-3 text-green-600" />
          {row.getValue("tenderedRate")}
        </div>
      ),
    },
    {
      accessorKey: "tenderedAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tendered At" />,
    },
    {
      accessorKey: "expiresIn",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Expires In" />,
      cell: ({ row }) => {
        const time = row.getValue("expiresIn");
        const isUrgent = time.includes("m") && !time.includes("h");
        return (
          <div className={`flex items-center gap-1 ${isUrgent ? "text-red-600 font-medium" : ""}`}>
            <Clock className="size-3" />
            {time}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => getStatusBadge(row.getValue("status")),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Phone className="size-3 mr-1" />
              Follow Up
            </Button>
            {status === "Counter Offer" && (
              <Button size="sm" variant="outline" className="text-purple-600">
                Review Offer
              </Button>
            )}
            <Button size="sm" variant="outline" className="text-red-600">
              <XCircle className="size-3 mr-1" />
              Cancel
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden p-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-yellow-600 mb-1">
            <Send className="size-4" />
            <span className="text-xs">Tendered</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">3</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <RefreshCw className="size-4" />
            <span className="text-xs">Awaiting Response</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">2</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-purple-600 mb-1">
            <DollarSign className="size-4" />
            <span className="text-xs">Counter Offers</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">1</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-red-600 mb-1">
            <Clock className="size-4" />
            <span className="text-xs">Expiring Soon</span>
          </div>
          <p className="text-2xl font-bold text-red-600">1</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="border rounded-lg p-4 bg-yellow-50 dark:bg-yellow-950/30 mb-4">
        <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 flex items-center gap-2 mb-2">
          <Send className="size-4" />
          Tendered Loads - Awaiting Carrier Confirmation
        </h3>
        <p className="text-xs text-yellow-700 dark:text-yellow-300">
          These loads have been offered to external carriers. Status: EXT-TENDERED.
          Monitor for responses and follow up on expiring tenders.
        </p>
      </div>

      {/* Tendered Table */}
      <div className="border rounded-sm bg-card flex-1">
        <div className="px-4 py-3 border-b bg-muted">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Send className="size-4" />
            Loads Tendered to External Carriers
          </h3>
        </div>
        <div className="p-4">
          <DataTable
            columns={tenderedColumns}
            data={tenderedData}
            showViewOptions={false}
          />
        </div>
      </div>
    </div>
  );
};

export default TenderedLoads;
