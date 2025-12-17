import { useState, useCallback } from "react";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SmartFilter from "@/components/SmartFilter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Truck,
  MapPin,
  Calendar,
  MoreHorizontal,
  Building2,
  Handshake,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  FileCheck,
  Plus,
} from "lucide-react";

const RequestOrders = () => {
  const [filters, setFilters] = useState([]);
  const [activeTab, setActiveTab] = useState("ml");

  // Filter configuration
  const filterGroups = [
    {
      id: "request-filters",
      label: "Filter Orders",
      filters: [
        {
          key: "loadId",
          label: "Load ID",
          type: "input",
          group: "Basic",
          placeholder: "Search load ID...",
        },
        {
          key: "customer",
          label: "Customer/Broker",
          type: "input",
          group: "Basic",
          placeholder: "Search customer...",
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "Pending", label: "Pending" },
            { value: "Accepted", label: "Accepted" },
            { value: "Declined", label: "Declined" },
          ],
        },
        {
          key: "pickupDate",
          label: "Pickup Date",
          type: "input",
          group: "Basic",
          placeholder: "YYYY-MM-DD",
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Mock data for Mega Logistics (ML) orders - same Load IDs as Confirmed Orders
  const mlOrdersData = [
    {
      id: 1,
      loadId: "ML-2025-001230",
      customer: "ABC Logistics",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      pickupDate: "2024-01-29",
      deliveryDate: "2024-01-29",
      equipment: "Flatbed",
      weight: "42,000 lbs",
      status: "Accepted",
      requestedAt: "2024-01-28 09:30 AM",
    },
    {
      id: 2,
      loadId: "ML-2025-001231",
      customer: "BuildRight Construction",
      origin: "Fort Worth, TX",
      destination: "Arlington, TX",
      pickupDate: "2024-01-29",
      deliveryDate: "2024-01-29",
      equipment: "Walking Floor",
      weight: "38,000 lbs",
      status: "Accepted",
      requestedAt: "2024-01-28 10:15 AM",
    },
    {
      id: 3,
      loadId: "ML-2025-001232",
      customer: "Metro Materials",
      origin: "Austin, TX",
      destination: "San Antonio, TX",
      pickupDate: "2024-01-30",
      deliveryDate: "2024-01-30",
      equipment: "Pneumatic",
      weight: "45,000 lbs",
      status: "Accepted",
      requestedAt: "2024-01-28 08:45 AM",
    },
    {
      id: 4,
      loadId: "ML-2025-001233",
      customer: "Premier Precast",
      origin: "Dallas, TX",
      destination: "Plano, TX",
      pickupDate: "2024-01-30",
      deliveryDate: "2024-01-30",
      equipment: "Walking Floor",
      weight: "52,000 lbs",
      status: "Accepted",
      requestedAt: "2024-01-27 02:30 PM",
    },
    {
      id: 5,
      loadId: "ML-2025-001234",
      customer: "Texas Steel Works",
      origin: "San Antonio, TX",
      destination: "Houston, TX",
      pickupDate: "2024-01-31",
      deliveryDate: "2024-01-31",
      equipment: "Flatbed",
      weight: "44,000 lbs",
      status: "Accepted",
      requestedAt: "2024-01-28 07:45 AM",
    },
    {
      id: 6,
      loadId: "ML-2025-001235",
      customer: "Gulf Coast Concrete",
      origin: "Corpus Christi, TX",
      destination: "Victoria, TX",
      pickupDate: "2024-01-31",
      deliveryDate: "2024-01-31",
      equipment: "Pneumatic",
      weight: "40,000 lbs",
      status: "Pending",
      requestedAt: "2024-01-28 07:30 AM",
    },
    {
      id: 7,
      loadId: "ML-2025-001236",
      customer: "Lone Star Aggregates",
      origin: "Lubbock, TX",
      destination: "Amarillo, TX",
      pickupDate: "2024-02-01",
      deliveryDate: "2024-02-01",
      equipment: "Walking Floor",
      weight: "46,000 lbs",
      status: "Pending",
      requestedAt: "2024-01-28 07:15 AM",
    },
    {
      id: 8,
      loadId: "ML-2025-001237",
      customer: "Rio Grande Materials",
      origin: "El Paso, TX",
      destination: "Midland, TX",
      pickupDate: "2024-02-01",
      deliveryDate: "2024-02-02",
      equipment: "Flatbed",
      weight: "48,000 lbs",
      status: "Pending",
      requestedAt: "2024-01-28 06:45 AM",
    },
  ];

  // Mock data for External Broker (MT Customers) orders
  const externalBrokerOrdersData = [
    {
      id: 1,
      loadId: "MT-EXT-2025-001",
      broker: "CH Robinson",
      origin: "Houston, TX",
      destination: "Oklahoma City, OK",
      pickupDate: "2024-01-29",
      deliveryDate: "2024-01-30",
      equipment: "Flatbed",
      weight: "44,000 lbs",
      rate: "$2,800.00",
      status: "Pending",
      tenderedAt: "2024-01-28 11:00 AM",
    },
    {
      id: 2,
      loadId: "MT-EXT-2025-002",
      broker: "TQL",
      origin: "San Antonio, TX",
      destination: "El Paso, TX",
      pickupDate: "2024-01-29",
      deliveryDate: "2024-01-30",
      equipment: "Pneumatic",
      weight: "40,000 lbs",
      rate: "$3,200.00",
      status: "Accepted",
      tenderedAt: "2024-01-28 09:45 AM",
    },
    {
      id: 3,
      loadId: "MT-EXT-2025-003",
      broker: "Coyote Logistics",
      origin: "Dallas, TX",
      destination: "Little Rock, AR",
      pickupDate: "2024-01-30",
      deliveryDate: "2024-01-31",
      equipment: "Flatbed",
      weight: "48,000 lbs",
      rate: "$2,500.00",
      status: "Pending",
      tenderedAt: "2024-01-28 10:30 AM",
    },
    {
      id: 4,
      loadId: "MT-EXT-2025-004",
      broker: "Echo Global Logistics",
      origin: "Austin, TX",
      destination: "New Orleans, LA",
      pickupDate: "2024-01-31",
      deliveryDate: "2024-02-01",
      equipment: "Walking Floor",
      weight: "42,000 lbs",
      rate: "$3,500.00",
      status: "Pending",
      tenderedAt: "2024-01-28 08:15 AM",
    },
    {
      id: 5,
      loadId: "MT-EXT-2025-005",
      broker: "Landstar",
      origin: "Fort Worth, TX",
      destination: "Memphis, TN",
      pickupDate: "2024-01-30",
      deliveryDate: "2024-01-31",
      equipment: "Flatbed",
      weight: "46,000 lbs",
      rate: "$2,900.00",
      status: "Declined",
      tenderedAt: "2024-01-27 04:00 PM",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-500/50 flex items-center gap-1 w-fit">
            <Clock className="size-3" />
            {status}
          </Badge>
        );
      case "Accepted":
        return (
          <Badge className="bg-green-500/10 text-green-700 border-green-500/50 flex items-center gap-1 w-fit">
            <CheckCircle className="size-3" />
            {status}
          </Badge>
        );
      case "Declined":
        return (
          <Badge className="bg-red-500/10 text-red-700 border-red-500/50 flex items-center gap-1 w-fit">
            <AlertCircle className="size-3" />
            {status}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // ML Orders columns
  const mlColumns = [
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const status = row.original.status;
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
              {status === "Pending" && (
                <>
                  <DropdownMenuItem>
                    <CheckCircle className="size-4 mr-2" />
                    Accept Order
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <AlertCircle className="size-4 mr-2" />
                    Decline Order
                  </DropdownMenuItem>
                </>
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
      accessorKey: "customer",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Shipper" />,
    },
    {
      accessorKey: "origin",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Origin" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <MapPin className="size-3 text-green-600" />
          {row.getValue("origin")}
        </div>
      ),
    },
    {
      accessorKey: "destination",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Destination" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <MapPin className="size-3 text-red-600" />
          {row.getValue("destination")}
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
      accessorKey: "equipment",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Equipment" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Truck className="size-3 text-muted-foreground" />
          {row.getValue("equipment")}
        </div>
      ),
    },
    {
      accessorKey: "weight",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Weight" />,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => getStatusBadge(row.getValue("status")),
    },
  ];

  // External Broker columns
  const externalBrokerColumns = [
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
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
              <FileCheck className="size-4 mr-2" />
              Accept Tender
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
      accessorKey: "broker",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Broker" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Handshake className="size-3 text-blue-600" />
          {row.getValue("broker")}
        </div>
      ),
    },
    {
      accessorKey: "origin",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Origin" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <MapPin className="size-3 text-green-600" />
          {row.getValue("origin")}
        </div>
      ),
    },
    {
      accessorKey: "destination",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Destination" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <MapPin className="size-3 text-red-600" />
          {row.getValue("destination")}
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
      accessorKey: "equipment",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Equipment" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Truck className="size-3 text-muted-foreground" />
          {row.getValue("equipment")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => getStatusBadge(row.getValue("status")),
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
            <TabsTrigger value="ml" className="h-full">
              <Building2 className="size-4" />
              Mega Logistics
            </TabsTrigger>
            <TabsTrigger value="external" className="h-full">
              <Handshake className="size-4" />
              External Brokers
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          <TabsContent value="ml" className="h-full mt-0 p-4">
            <div className="mb-4">
              <SmartFilter
                filterGroups={filterGroups}
                onFiltersChange={handleFiltersChange}
              />
            </div>
            <DataTable
              columns={mlColumns}
              data={mlOrdersData}
              showViewOptions={false}
            />
          </TabsContent>

          <TabsContent value="external" className="h-full mt-0 p-4">
            <div className="flex items-center justify-between mb-4">
              <SmartFilter
                filterGroups={filterGroups}
                onFiltersChange={handleFiltersChange}
              />
              <Button className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
                <Plus className="size-4 mr-1" />
                Add Load
              </Button>
            </div>
            <DataTable
              columns={externalBrokerColumns}
              data={externalBrokerOrdersData}
              showViewOptions={false}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default RequestOrders;
