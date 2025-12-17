import { useState, useCallback } from "react";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SmartFilter from "@/components/SmartFilter";
import {
  CheckCircle,
  ArrowRight,
  DollarSign,
  Truck,
  MapPin,
  Calendar,
} from "lucide-react";

const ConfirmedOrders = () => {
  const [filters, setFilters] = useState([]);

  // Filter configuration
  const filterGroups = [
    {
      id: "confirmed-filters",
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
          key: "customerName",
          label: "Customer",
          type: "input",
          group: "Basic",
          placeholder: "Search customer...",
        },
        {
          key: "equipment",
          label: "Equipment",
          type: "select",
          group: "Basic",
          options: [
            { value: "Flatbed", label: "Flatbed" },
            { value: "Pneumatic", label: "Pneumatic" },
            { value: "Walking Floor", label: "Walking Floor" },
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
  // Mock data for confirmed orders
  const confirmedOrdersData = [
    {
      id: 1,
      loadId: "ML-2025-001230",
      customerName: "ABC Logistics",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      pickupDate: "2024-01-29",
      deliveryDate: "2024-01-29",
      equipment: "Flatbed",
      customerRate: "$2,500.00",
      status: "Confirmed",
      confirmedAt: "2024-01-28 09:30 AM",
      sentToMT: true,
    },
    {
      id: 2,
      loadId: "ML-2025-001231",
      customerName: "BuildRight Construction",
      origin: "Fort Worth, TX",
      destination: "Arlington, TX",
      pickupDate: "2024-01-29",
      deliveryDate: "2024-01-29",
      equipment: "Walking Floor",
      customerRate: "$1,800.00",
      status: "Confirmed",
      confirmedAt: "2024-01-28 09:15 AM",
      sentToMT: false,
    },
    {
      id: 3,
      loadId: "ML-2025-001232",
      customerName: "Metro Materials",
      origin: "Austin, TX",
      destination: "San Antonio, TX",
      pickupDate: "2024-01-30",
      deliveryDate: "2024-01-30",
      equipment: "Pneumatic",
      customerRate: "$2,100.00",
      status: "Confirmed",
      confirmedAt: "2024-01-28 08:45 AM",
      sentToMT: true,
    },
    {
      id: 4,
      loadId: "ML-2025-001233",
      customerName: "Premier Precast",
      origin: "Dallas, TX",
      destination: "Plano, TX",
      pickupDate: "2024-01-30",
      deliveryDate: "2024-01-30",
      equipment: "Walking Floor",
      customerRate: "$3,200.00",
      status: "Confirmed",
      confirmedAt: "2024-01-28 08:30 AM",
      sentToMT: false,
    },
    {
      id: 5,
      loadId: "ML-2025-001234",
      customerName: "Texas Steel Works",
      origin: "San Antonio, TX",
      destination: "Houston, TX",
      pickupDate: "2024-01-31",
      deliveryDate: "2024-01-31",
      equipment: "Flatbed",
      customerRate: "$2,800.00",
      status: "Confirmed",
      confirmedAt: "2024-01-28 07:45 AM",
      sentToMT: true,
    },
    {
      id: 6,
      loadId: "ML-2025-001235",
      customerName: "Gulf Coast Concrete",
      origin: "Corpus Christi, TX",
      destination: "Victoria, TX",
      pickupDate: "2024-01-31",
      deliveryDate: "2024-01-31",
      equipment: "Pneumatic",
      customerRate: "$1,950.00",
      status: "Confirmed",
      confirmedAt: "2024-01-28 07:30 AM",
      sentToMT: false,
    },
    {
      id: 7,
      loadId: "ML-2025-001236",
      customerName: "Lone Star Aggregates",
      origin: "Lubbock, TX",
      destination: "Amarillo, TX",
      pickupDate: "2024-02-01",
      deliveryDate: "2024-02-01",
      equipment: "Walking Floor",
      customerRate: "$2,200.00",
      status: "Confirmed",
      confirmedAt: "2024-01-28 07:15 AM",
      sentToMT: true,
    },
    {
      id: 8,
      loadId: "ML-2025-001237",
      customerName: "Rio Grande Materials",
      origin: "El Paso, TX",
      destination: "Midland, TX",
      pickupDate: "2024-02-01",
      deliveryDate: "2024-02-02",
      equipment: "Flatbed",
      customerRate: "$3,500.00",
      status: "Confirmed",
      confirmedAt: "2024-01-28 06:45 AM",
      sentToMT: false,
    },
    {
      id: 9,
      loadId: "ML-2025-001238",
      customerName: "Central Texas Builders",
      origin: "Waco, TX",
      destination: "Temple, TX",
      pickupDate: "2024-02-01",
      deliveryDate: "2024-02-01",
      equipment: "Walking Floor",
      customerRate: "$1,600.00",
      status: "Confirmed",
      confirmedAt: "2024-01-28 06:30 AM",
      sentToMT: true,
    },
    {
      id: 10,
      loadId: "ML-2025-001239",
      customerName: "Panhandle Precast",
      origin: "Amarillo, TX",
      destination: "Lubbock, TX",
      pickupDate: "2024-02-02",
      deliveryDate: "2024-02-02",
      equipment: "Flatbed",
      customerRate: "$2,100.00",
      status: "Confirmed",
      confirmedAt: "2024-01-28 06:15 AM",
      sentToMT: false,
    },
    {
      id: 11,
      loadId: "ML-2025-001240",
      customerName: "South Texas Cement",
      origin: "McAllen, TX",
      destination: "Laredo, TX",
      pickupDate: "2024-02-02",
      deliveryDate: "2024-02-02",
      equipment: "Pneumatic",
      customerRate: "$2,400.00",
      status: "Confirmed",
      confirmedAt: "2024-01-28 06:00 AM",
      sentToMT: true,
    },
    {
      id: 12,
      loadId: "ML-2025-001241",
      customerName: "East Texas Hauling",
      origin: "Tyler, TX",
      destination: "Longview, TX",
      pickupDate: "2024-02-03",
      deliveryDate: "2024-02-03",
      equipment: "Walking Floor",
      customerRate: "$1,450.00",
      status: "Confirmed",
      confirmedAt: "2024-01-27 05:45 PM",
      sentToMT: false,
    },
    {
      id: 13,
      loadId: "ML-2025-001242",
      customerName: "Brazos Valley Construction",
      origin: "College Station, TX",
      destination: "Bryan, TX",
      pickupDate: "2024-02-03",
      deliveryDate: "2024-02-03",
      equipment: "Flatbed",
      customerRate: "$1,200.00",
      status: "Confirmed",
      confirmedAt: "2024-01-27 05:30 PM",
      sentToMT: true,
    },
    {
      id: 14,
      loadId: "ML-2025-001243",
      customerName: "Hill Country Materials",
      origin: "San Marcos, TX",
      destination: "New Braunfels, TX",
      pickupDate: "2024-02-04",
      deliveryDate: "2024-02-04",
      equipment: "Pneumatic",
      customerRate: "$1,750.00",
      status: "Confirmed",
      confirmedAt: "2024-01-27 05:15 PM",
      sentToMT: false,
    },
  ];

  const confirmedColumns = [
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
      id: "actions",
      cell: ({ row }) => {
        const sentToMT = row.original.sentToMT;
        return sentToMT ? (
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <CheckCircle className="size-3 text-green-600" />
            Sent
          </span>
        ) : (
          <Button size="sm" className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
            <ArrowRight className="size-3 mr-1" />
            Send to Trucking
          </Button>
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
            <span className="text-xs">Confirmed Today</span>
          </div>
          <p className="text-2xl font-bold text-green-600">4</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Calendar className="size-4" />
            <span className="text-xs">Pickup Tomorrow</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">2</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <DollarSign className="size-4" />
            <span className="text-xs">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold">$9,600</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-orange-600 mb-1">
            <ArrowRight className="size-4" />
            <span className="text-xs">Ready for Dispatch</span>
          </div>
          <p className="text-2xl font-bold text-orange-600">4</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between mb-4">
        <SmartFilter
          filterGroups={filterGroups}
          onFiltersChange={handleFiltersChange}
        />
      </div>

      {/* Orders Table */}
      <DataTable
        columns={confirmedColumns}
        data={confirmedOrdersData}
        showViewOptions={false}
      />
    </div>
  );
};

export default ConfirmedOrders;
