import { useState } from "react";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Send,
  Clock,
  MapPin,
  Truck,
  DollarSign,
  Phone,
  CheckCircle,
  AlertTriangle,
  Calendar,
  ArrowRight,
  FileText,
  RefreshCw,
  XCircle,
  MoreHorizontal,
  Eye,
  Receipt,
} from "lucide-react";

const LoadStatus = () => {
  const [activeTab, setActiveTab] = useState("tendered");

  // Tendered Loads Data
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

  // Covered Loads Data
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
      status: "In Progress",
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
      status: "Delivered",
    },
    {
      id: 3,
      loadId: "ML-2025-001230",
      customerName: "BuildRight Construction",
      origin: "Austin, TX",
      destination: "San Antonio, TX",
      carrierName: "Premier Hauling Co",
      carrierContact: "+1 (555) 333-4444",
      customerRate: "$1,200.00",
      carrierRate: "$950.00",
      margin: "$250.00 (20.8%)",
      pickupDate: "2024-01-28",
      confirmedAt: "2024-01-27 02:45 PM",
      status: "Delivered",
    },
    {
      id: 4,
      loadId: "ML-2025-001231",
      customerName: "Premier Precast",
      origin: "El Paso, TX",
      destination: "Albuquerque, NM",
      carrierName: "Mountain West Trucking",
      carrierContact: "+1 (555) 444-5555",
      customerRate: "$4,800.00",
      carrierRate: "$4,200.00",
      margin: "$600.00 (12.5%)",
      pickupDate: "2024-01-30",
      confirmedAt: "2024-01-28 11:00 AM",
      status: "In Progress",
    },
    {
      id: 5,
      loadId: "ML-2025-001232",
      customerName: "Texas Steel Co",
      origin: "Fort Worth, TX",
      destination: "Tulsa, OK",
      carrierName: "Central Plains Freight",
      carrierContact: "+1 (555) 555-6666",
      customerRate: "$2,400.00",
      carrierRate: "$2,000.00",
      margin: "$400.00 (16.7%)",
      pickupDate: "2024-01-29",
      confirmedAt: "2024-01-28 08:15 AM",
      status: "In Progress",
    },
    {
      id: 6,
      loadId: "ML-2025-001228",
      customerName: "Gulf Coast Materials",
      origin: "Corpus Christi, TX",
      destination: "Houston, TX",
      carrierName: "Coastal Transport LLC",
      carrierContact: "+1 (555) 666-7777",
      customerRate: "$1,600.00",
      carrierRate: "$1,300.00",
      margin: "$300.00 (18.8%)",
      pickupDate: "2024-01-27",
      confirmedAt: "2024-01-26 03:30 PM",
      status: "Delivered",
    },
  ];

  // Failed Loads Data
  const failedData = [
    {
      id: 1,
      loadId: "ML-2025-001233",
      customerName: "Premier Precast",
      origin: "El Paso, TX",
      destination: "Albuquerque, NM",
      pickupDate: "2024-01-29",
      equipment: "Walking Floor",
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
      equipment: "Flatbed",
      customerRate: "$1,200.00",
      failureReason: "Rate Too Low",
      attempts: 3,
      timeInFailed: "2h 15m",
      escalatedTo: "Pricing Team",
      status: "Under Review",
    },
  ];

  // Status badge helpers
  const getTenderedStatusBadge = (status) => {
    const colors = {
      "Pending Response": "bg-yellow-500/10 text-yellow-700 border-yellow-500/50",
      "Under Review": "bg-blue-500/10 text-blue-700 border-blue-500/50",
      "Counter Offer": "bg-purple-500/10 text-purple-700 border-purple-500/50",
    };
    return <Badge className={colors[status] || ""}>{status}</Badge>;
  };

  const getCoveredStatusBadge = (status) => {
    const colors = {
      "In Progress": "bg-blue-500/10 text-blue-700 border-blue-500/50",
      "Delivered": "bg-green-500/10 text-green-700 border-green-500/50",
    };
    return (
      <Badge className={`${colors[status] || ""} flex items-center gap-1`}>
        {status === "Delivered" ? <CheckCircle className="size-3" /> : <Truck className="size-3" />}
        {status}
      </Badge>
    );
  };

  const getFailedStatusBadge = (status) => {
    const colors = {
      "Escalated": "bg-red-500/10 text-red-700 border-red-500/50",
      "Under Review": "bg-yellow-500/10 text-yellow-700 border-yellow-500/50",
      "Customer Contacted": "bg-blue-500/10 text-blue-700 border-blue-500/50",
    };
    return <Badge className={colors[status] || ""}>{status}</Badge>;
  };

  const getFailureReasonBadge = (reason) => {
    const colors = {
      "No Carrier Available": "bg-red-500/10 text-red-700 border-red-500/50",
      "Rate Too Low": "bg-orange-500/10 text-orange-700 border-orange-500/50",
      "Equipment Unavailable": "bg-purple-500/10 text-purple-700 border-purple-500/50",
    };
    return <Badge className={colors[reason] || ""}>{reason}</Badge>;
  };

  // Tendered Columns
  const tenderedColumns = [
    {
      id: "actions",
      header: "Action",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="size-8 p-0">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <Eye className="size-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Phone className="size-4 mr-2" />
              Follow Up
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <XCircle className="size-4 mr-2" />
              Cancel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
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
        <span className="font-medium text-green-600">{row.getValue("tenderedRate")}</span>
      ),
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
  ];

  // Covered Columns
  const coveredColumns = [
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const status = row.original.rateConStatus;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="size-8 p-0">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <Eye className="size-4 mr-2" />
                View Details
              </DropdownMenuItem>
              {status === "Pending Signature" && (
                <DropdownMenuItem>
                  <FileText className="size-4 mr-2" />
                  Send Rate Con
                </DropdownMenuItem>
              )}
              {status === "Signed" && (
                <DropdownMenuItem>
                  <ArrowRight className="size-4 mr-2" />
                  To Execution
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
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
      header: ({ column }) => <DataTableColumnHeader column={column} title="Margin" />,
      cell: ({ row }) => (
        <span className="font-medium text-blue-600">{row.getValue("margin")}</span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => getCoveredStatusBadge(row.getValue("status")),
    },
  ];

  // Failed Columns
  const failedColumns = [
    {
      id: "actions",
      header: "Action",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="size-8 p-0">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <Eye className="size-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RefreshCw className="size-4 mr-2" />
              Retry Search
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Phone className="size-4 mr-2" />
              Call Customer
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <XCircle className="size-4 mr-2" />
              Cancel Load
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
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
      cell: ({ row }) => getFailureReasonBadge(row.getValue("failureReason")),
    },
    {
      accessorKey: "attempts",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Attempts" />,
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("attempts")} carriers</span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => getFailedStatusBadge(row.getValue("status")),
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full h-full flex flex-col overflow-hidden"
      >
        <div className="flex-shrink-0">
          <TabsList className="mb-0 rounded-none">
            <TabsTrigger value="tendered" className="h-full">
              <Send className="size-4" />
              Tendered
            </TabsTrigger>
            <TabsTrigger value="covered" className="h-full">
              <CheckCircle className="size-4" />
              Covered
            </TabsTrigger>
            <TabsTrigger value="failed" className="h-full">
              <AlertTriangle className="size-4" />
              Failed
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          <TabsContent value="tendered" className="h-full mt-0 p-4">
            <DataTable
              columns={tenderedColumns}
              data={tenderedData}
              showViewOptions={false}
            />
          </TabsContent>

          <TabsContent value="covered" className="h-full mt-0 p-4">
            <DataTable
              columns={coveredColumns}
              data={coveredData}
              showViewOptions={false}
            />
          </TabsContent>

          <TabsContent value="failed" className="h-full mt-0 p-4">
            <DataTable
              columns={failedColumns}
              data={failedData}
              showViewOptions={false}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default LoadStatus;
