import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  MapPin,
  Truck,
  DollarSign,
  Phone,
  FileText,
  Calendar,
  ArrowRight,
} from "lucide-react";

const CoveredLoads = () => {
  // Mock data for covered loads (carrier accepted)
  const coveredData = [
    {
      id: 1,
      loadId: "ML-2025-001235",
      customerName: "ABC Logistics",
      origin: "Houston, TX",
      destination: "Phoenix, AZ",
      carrierName: "Swift Transport LLC",
      carrierContact: "+1 (555) 111-2222",
      customerRate: "$3,200.00",
      carrierRate: "$2,800.00",
      margin: "$400.00 (12.5%)",
      pickupDate: "2024-01-29",
      confirmedAt: "2024-01-28 10:15 AM",
      rateConStatus: "Signed",
    },
    {
      id: 2,
      loadId: "ML-2025-001236",
      customerName: "Metro Materials",
      origin: "Dallas, TX",
      destination: "Oklahoma City, OK",
      carrierName: "Reliable Freight Inc",
      carrierContact: "+1 (555) 222-3333",
      customerRate: "$1,800.00",
      carrierRate: "$1,400.00",
      margin: "$400.00 (22.2%)",
      pickupDate: "2024-01-29",
      confirmedAt: "2024-01-28 09:30 AM",
      rateConStatus: "Pending Signature",
    },
  ];

  const getRateConBadge = (status) => {
    const colors = {
      "Signed": "bg-green-500/10 text-green-700 border-green-500/50",
      "Pending Signature": "bg-yellow-500/10 text-yellow-700 border-yellow-500/50",
    };
    return (
      <Badge className={`${colors[status] || ""} flex items-center gap-1`}>
        {status === "Signed" ? <CheckCircle className="size-3" /> : <FileText className="size-3" />}
        {status}
      </Badge>
    );
  };

  const coveredColumns = [
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
      accessorKey: "customerRate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Rate" />,
      cell: ({ row }) => (
        <span className="font-medium text-green-600">{row.getValue("customerRate")}</span>
      ),
    },
    {
      accessorKey: "carrierRate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Carrier Rate" />,
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("carrierRate")}</span>
      ),
    },
    {
      accessorKey: "margin",
      header: ({ column }) => <DataTableColumnHeader column={column} title="ML Margin" />,
      cell: ({ row }) => (
        <span className="font-medium text-blue-600">{row.getValue("margin")}</span>
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
      accessorKey: "rateConStatus",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Rate Con" />,
      cell: ({ row }) => getRateConBadge(row.getValue("rateConStatus")),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const status = row.getValue("rateConStatus");
        return (
          <div className="flex gap-2">
            {status === "Pending Signature" ? (
              <Button size="sm" variant="outline">
                <FileText className="size-3 mr-1" />
                Send Rate Con
              </Button>
            ) : (
              <Button size="sm" className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
                <ArrowRight className="size-3 mr-1" />
                To Execution
              </Button>
            )}
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
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <CheckCircle className="size-4" />
            <span className="text-xs">Covered Today</span>
          </div>
          <p className="text-2xl font-bold text-green-600">2</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <DollarSign className="size-4" />
            <span className="text-xs">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold">$5,000</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <DollarSign className="size-4" />
            <span className="text-xs">Total Margin</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">$800</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-yellow-600 mb-1">
            <FileText className="size-4" />
            <span className="text-xs">Pending Rate Con</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">1</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950/30 mb-4">
        <h3 className="text-sm font-semibold text-green-800 dark:text-green-200 flex items-center gap-2 mb-2">
          <CheckCircle className="size-4" />
          Covered Loads - External Carrier Confirmed
        </h3>
        <p className="text-xs text-green-700 dark:text-green-300">
          These loads have been accepted by external carriers. Status: EXT-ACCEPTED.
          Ensure Rate Confirmation is signed before proceeding to execution.
        </p>
      </div>

      {/* Covered Table */}
      <div className="border rounded-sm bg-card flex-1">
        <div className="px-4 py-3 border-b bg-muted">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <CheckCircle className="size-4" />
            Loads Covered by External Carriers
          </h3>
        </div>
        <div className="p-4">
          <DataTable
            columns={coveredColumns}
            data={coveredData}
            showViewOptions={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CoveredLoads;
