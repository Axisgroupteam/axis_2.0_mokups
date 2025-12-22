import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import SmartFilter from "@/components/SmartFilter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MoreHorizontal,
  Eye,
  MapPin,
  Calendar,
  Truck,
  Settings,
  DollarSign,
  ShoppingCart,
  History,
  Undo2,
  AlertTriangle,
  Navigation,
} from "lucide-react";

const Dispatch = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [isReturnSheetOpen, setIsReturnSheetOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [loadToReturn, setLoadToReturn] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleLoadClick = (load) => {
    setSelectedLoad(load);
    setSelectedStatus(load.status);
    setIsDetailSheetOpen(true);
  };

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    // Here you would typically make an API call to update the status
    console.log("Status changed to:", newStatus);
  };

  const handleReturnToPlanning = (load) => {
    setLoadToReturn(load);
    setIsReturnSheetOpen(true);
  };

  const confirmReturnToPlanning = () => {
    // Here you would typically make an API call to return the load to planning
    console.log("Returning load to planning:", loadToReturn);
    setIsReturnSheetOpen(false);
    setLoadToReturn(null);
    // Navigate to planning tab or show success message
  };

  // Filter configuration
  const filterGroups = [
    {
      id: "dispatch-filters",
      label: "Filter Orders",
      filters: [
        {
          key: "time",
          label: "Time",
          type: "select",
          group: "Basic",
          static: true,
          defaultValue: "actual",
          options: [
            { value: "expired", label: "Expired" },
            { value: "actual", label: "Actual" },
            { value: "next", label: "Next" },
          ],
        },
        {
          key: "loadNo",
          label: "Load No",
          type: "input",
          group: "Basic",
          placeholder: "Search load number...",
        },
        {
          key: "vehicle",
          label: "Vehicle",
          type: "input",
          group: "Basic",
          placeholder: "Search vehicle...",
        },
        {
          key: "customer",
          label: "Customer",
          type: "select",
          group: "Basic",
          options: [
            { value: "Titan", label: "Titan" },
            { value: "Ashgrove", label: "Ashgrove" },
            { value: "TQL", label: "TQL" },
            { value: "Coyote", label: "Coyote" },
            { value: "CH Robinson", label: "CH Robinson" },
          ],
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "accepted", label: "Accepted" },
            { value: "start", label: "Start" },
            { value: "arrive_pickup", label: "Arrive Pick Up" },
            { value: "pickup", label: "Pick Up" },
            { value: "on_road", label: "On Road" },
            { value: "arrive_delivery", label: "Arrive Delivery" },
            { value: "delivered", label: "Delivered" },
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

  // Status badge colors
  const getStatusBadge = (status) => {
    const statusConfig = {
      accepted: { label: "Accepted", className: "bg-blue-500/10 text-blue-700 border-blue-500/50" },
      start: { label: "Start", className: "bg-purple-500/10 text-purple-700 border-purple-500/50" },
      arrive_pickup: { label: "Arrive Pick Up", className: "bg-amber-500/10 text-amber-700 border-amber-500/50" },
      pickup: { label: "Pick Up", className: "bg-orange-500/10 text-orange-700 border-orange-500/50" },
      on_road: { label: "On Road", className: "bg-cyan-500/10 text-cyan-700 border-cyan-500/50" },
      arrive_delivery: { label: "Arrive Delivery", className: "bg-indigo-500/10 text-indigo-700 border-indigo-500/50" },
      delivered: { label: "Delivered", className: "bg-green-500/10 text-green-700 border-green-500/50" },
    };
    const config = statusConfig[status] || { label: status, className: "bg-gray-500/10 text-gray-700" };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  // Mock data for Dispatch (all with vehicles assigned)
  const dispatchData = [
    {
      id: 1,
      vehicle: "TRK-2847",
      loadNo: "ML-2025-001201",
      pickUpNo: "PU-78401",
      customer: "Titan",
      customerContractId: "CTR-TIT-2025-001",
      customerRegion: "South",
      pickup: "1234 Industrial Blvd, Houston, TX 77001",
      pickupDate: "2024-12-10",
      pickupContactName: "John Smith",
      pickupPhone: "(713) 555-0101",
      dropOff: "5678 Commerce St, Dallas, TX 75201",
      dropOffDate: "2024-12-10",
      dropOffContactName: "Sarah Johnson",
      dropOffPhone: "(214) 555-0202",
      commodity: "Cement",
      rates: "$1,850.00",
      status: "on_road",
    },
    {
      id: 2,
      vehicle: "TRK-1923",
      loadNo: "ML-2025-001202",
      pickUpNo: "PU-78402",
      customer: "Ashgrove",
      customerContractId: "CTR-ASH-2025-003",
      customerRegion: "Central",
      pickup: "890 Quarry Rd, Austin, TX 78701",
      pickupDate: "2024-12-10",
      pickupContactName: "Mike Davis",
      pickupPhone: "(512) 555-0303",
      dropOff: "234 Construction Ave, San Antonio, TX 78201",
      dropOffDate: "2024-12-10",
      dropOffContactName: "Lisa Brown",
      dropOffPhone: "(210) 555-0404",
      commodity: "Flyash",
      rates: "$1,200.00",
      status: "accepted",
    },
    {
      id: 3,
      vehicle: "TRK-4521",
      loadNo: "MT-2025-001203",
      pickUpNo: "PU-78403",
      customer: "TQL",
      customerContractId: "CTR-TQL-2025-012",
      customerRegion: "North",
      pickup: "567 Sand Pit Ln, Fort Worth, TX 76101",
      pickupDate: "2024-12-11",
      pickupContactName: "Robert Wilson",
      pickupPhone: "(817) 555-0505",
      dropOff: "1010 Builder Way, Oklahoma City, OK 73101",
      dropOffDate: "2024-12-11",
      dropOffContactName: "Emily Garcia",
      dropOffPhone: "(405) 555-0606",
      commodity: "Sand",
      rates: "$2,400.00",
      status: "start",
    },
    {
      id: 4,
      vehicle: "TRK-7734",
      loadNo: "MT-2025-001204",
      pickUpNo: "PU-78404",
      customer: "Coyote",
      customerContractId: "CTR-COY-2025-007",
      customerRegion: "West",
      pickup: "789 Steel Works Dr, El Paso, TX 79901",
      pickupDate: "2024-12-11",
      pickupContactName: "David Martinez",
      pickupPhone: "(915) 555-0707",
      dropOff: "456 Industrial Park, Phoenix, AZ 85001",
      dropOffDate: "2024-12-12",
      dropOffContactName: "Jennifer Lee",
      dropOffPhone: "(602) 555-0808",
      commodity: "Limestone",
      rates: "$3,100.00",
      status: "arrive_pickup",
    },
    {
      id: 5,
      vehicle: "TRK-3356",
      loadNo: "MT-2025-001205",
      pickUpNo: "PU-78405",
      customer: "CH Robinson",
      customerContractId: "CTR-CHR-2025-019",
      customerRegion: "East",
      pickup: "5678 Commerce St, Dallas, TX 75201",
      pickupDate: "2024-12-12",
      pickupContactName: "Chris Anderson",
      pickupPhone: "(214) 555-0909",
      dropOff: "654 Cement Factory Ln, Little Rock, AR 72201",
      dropOffDate: "2024-12-12",
      dropOffContactName: "Amanda Taylor",
      dropOffPhone: "(501) 555-1010",
      commodity: "Cement",
      rates: "$2,200.00",
      status: "pickup",
    },
    {
      id: 6,
      vehicle: "TRK-5589",
      loadNo: "ML-2025-001206",
      pickUpNo: "PU-78406",
      customer: "Titan",
      customerContractId: "CTR-TIT-2025-002",
      customerRegion: "South",
      pickup: "234 Construction Ave, San Antonio, TX 78201",
      pickupDate: "2024-12-13",
      pickupContactName: "Kevin Thomas",
      pickupPhone: "(210) 555-1111",
      dropOff: "222 Road Project Site, Corpus Christi, TX 78401",
      dropOffDate: "2024-12-13",
      dropOffContactName: "Michelle White",
      dropOffPhone: "(361) 555-1212",
      commodity: "Aggregate",
      rates: "$950.00",
      status: "on_road",
    },
    {
      id: 7,
      vehicle: "TRK-6612",
      loadNo: "ML-2025-001207",
      pickUpNo: "PU-78407",
      customer: "Ashgrove",
      customerContractId: "CTR-ASH-2025-004",
      customerRegion: "Central",
      pickup: "333 Farm Co-op Rd, Lubbock, TX 79401",
      pickupDate: "2024-12-13",
      pickupContactName: "Brian Harris",
      pickupPhone: "(806) 555-1313",
      dropOff: "444 Grain Elevator St, Amarillo, TX 79101",
      dropOffDate: "2024-12-13",
      dropOffContactName: "Nicole Clark",
      dropOffPhone: "(806) 555-1414",
      commodity: "Flyash",
      rates: "$800.00",
      status: "arrive_delivery",
    },
    {
      id: 8,
      vehicle: "TRK-8845",
      loadNo: "MT-2025-001208",
      pickUpNo: "PU-78408",
      customer: "TQL",
      customerContractId: "CTR-TQL-2025-013",
      customerRegion: "East",
      pickup: "1234 Industrial Blvd, Houston, TX 77001",
      pickupDate: "2024-12-14",
      pickupContactName: "Steven Moore",
      pickupPhone: "(713) 555-1515",
      dropOff: "666 Construction Site, New Orleans, LA 70112",
      dropOffDate: "2024-12-15",
      dropOffContactName: "Rachel King",
      dropOffPhone: "(504) 555-1616",
      commodity: "Sand",
      rates: "$2,800.00",
      status: "delivered",
    },
    {
      id: 9,
      vehicle: "TRK-2847",
      loadNo: "ML-2025-001209",
      pickUpNo: "PU-78409",
      customer: "Titan",
      customerContractId: "CTR-TIT-2025-003",
      customerRegion: "South",
      pickup: "777 Concrete Way, Houston, TX 77002",
      pickupDate: "2024-12-14",
      pickupContactName: "James Wilson",
      pickupPhone: "(713) 555-1717",
      dropOff: "888 Builder Rd, Austin, TX 78702",
      dropOffDate: "2024-12-14",
      dropOffContactName: "Patricia Lee",
      dropOffPhone: "(512) 555-1818",
      commodity: "Cement",
      rates: "$1,650.00",
      status: "accepted",
    },
    {
      id: 10,
      vehicle: "TRK-1923",
      loadNo: "MT-2025-001210",
      pickUpNo: "PU-78410",
      customer: "Coyote",
      customerContractId: "CTR-COY-2025-008",
      customerRegion: "West",
      pickup: "999 Quarry Lane, Phoenix, AZ 85002",
      pickupDate: "2024-12-15",
      pickupContactName: "Daniel Brown",
      pickupPhone: "(602) 555-1919",
      dropOff: "111 Distribution Center, Tucson, AZ 85701",
      dropOffDate: "2024-12-15",
      dropOffContactName: "Sandra Miller",
      dropOffPhone: "(520) 555-2020",
      commodity: "Gravel",
      rates: "$1,450.00",
      status: "start",
    },
    {
      id: 11,
      vehicle: "TRK-7734",
      loadNo: "MT-2025-001211",
      pickUpNo: "PU-78411",
      customer: "CH Robinson",
      customerContractId: "CTR-CHR-2025-020",
      customerRegion: "East",
      pickup: "222 Steel Mill Rd, Birmingham, AL 35201",
      pickupDate: "2024-12-15",
      pickupContactName: "Thomas Garcia",
      pickupPhone: "(205) 555-2121",
      dropOff: "333 Factory Blvd, Atlanta, GA 30301",
      dropOffDate: "2024-12-15",
      dropOffContactName: "Nancy Davis",
      dropOffPhone: "(404) 555-2222",
      commodity: "Limestone",
      rates: "$2,100.00",
      status: "on_road",
    },
    {
      id: 12,
      vehicle: "TRK-4521",
      loadNo: "ML-2025-001212",
      pickUpNo: "PU-78412",
      customer: "Ashgrove",
      customerContractId: "CTR-ASH-2025-005",
      customerRegion: "Central",
      pickup: "444 Cement Plant Dr, Kansas City, MO 64101",
      pickupDate: "2024-12-16",
      pickupContactName: "Mark Johnson",
      pickupPhone: "(816) 555-2323",
      dropOff: "555 Construction Site, Omaha, NE 68101",
      dropOffDate: "2024-12-16",
      dropOffContactName: "Betty Wilson",
      dropOffPhone: "(402) 555-2424",
      commodity: "Flyash",
      rates: "$1,350.00",
      status: "pickup",
    },
    {
      id: 13,
      vehicle: "TRK-5589",
      loadNo: "MT-2025-001213",
      pickUpNo: "PU-78413",
      customer: "TQL",
      customerContractId: "CTR-TQL-2025-014",
      customerRegion: "North",
      pickup: "666 Sand Pit Ave, Minneapolis, MN 55401",
      pickupDate: "2024-12-16",
      pickupContactName: "Paul Martinez",
      pickupPhone: "(612) 555-2525",
      dropOff: "777 Builder Way, Chicago, IL 60601",
      dropOffDate: "2024-12-16",
      dropOffContactName: "Dorothy Anderson",
      dropOffPhone: "(312) 555-2626",
      commodity: "Sand",
      rates: "$2,550.00",
      status: "arrive_pickup",
    },
    {
      id: 14,
      vehicle: "TRK-3356",
      loadNo: "ML-2025-001214",
      pickUpNo: "PU-78414",
      customer: "Titan",
      customerContractId: "CTR-TIT-2025-004",
      customerRegion: "South",
      pickup: "888 Dock Rd, Galveston, TX 77550",
      pickupDate: "2024-12-17",
      pickupContactName: "George Hall",
      pickupPhone: "(409) 555-2727",
      dropOff: "999 Terminal Blvd, Houston, TX 77001",
      dropOffDate: "2024-12-17",
      dropOffContactName: "Linda Martinez",
      dropOffPhone: "(713) 555-2828",
      commodity: "Cement",
      rates: "$1,100.00",
      status: "delivered",
    },
    {
      id: 15,
      vehicle: "TRK-8845",
      loadNo: "MT-2025-001215",
      pickUpNo: "PU-78415",
      customer: "Coyote",
      customerContractId: "CTR-COY-2025-009",
      customerRegion: "West",
      pickup: "123 Mining Rd, Denver, CO 80201",
      pickupDate: "2024-12-17",
      pickupContactName: "Edward Young",
      pickupPhone: "(303) 555-2929",
      dropOff: "456 Warehouse Dr, Salt Lake City, UT 84101",
      dropOffDate: "2024-12-18",
      dropOffContactName: "Barbara Allen",
      dropOffPhone: "(801) 555-3030",
      commodity: "Aggregate",
      rates: "$2,750.00",
      status: "arrive_delivery",
    },
  ];

  // Columns for Dispatch table
  const dispatchColumns = [
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
            <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/dispatch/load-details?id=${row.original.loadNo}&tab=general&mode=view`)}>
              <Settings className="size-4 mr-2" />
              General
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/dispatch/load-details?id=${row.original.loadNo}&tab=additional-charge&mode=view`)}>
              <DollarSign className="size-4 mr-2" />
              Additional Charge
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/dispatch/load-details?id=${row.original.loadNo}&tab=product-sale&mode=view`)}>
              <ShoppingCart className="size-4 mr-2" />
              Product Sale
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/dispatch/load-details?id=${row.original.loadNo}&tab=audit&mode=view`)}>
              <History className="size-4 mr-2" />
              Audit Log
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/dispatch/load-details?id=${row.original.loadNo}&tab=tracking&mode=view`)}>
              <Navigation className="size-4 mr-2" />
              Tracking
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleReturnToPlanning(row.original)} className="text-amber-600">
              <Undo2 className="size-4 mr-2" />
              Return to Planning
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    {
      accessorKey: "loadNo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Load No" />
      ),
      cell: ({ row }) => (
        <button
          onClick={() => handleLoadClick(row.original)}
          className="font-mono text-sm text-primary underline hover:text-primary/80 cursor-pointer"
        >
          {row.getValue("loadNo")}
        </button>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => getStatusBadge(row.getValue("status")),
    },
    {
      accessorKey: "vehicle",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Vehicle" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Truck className="size-4 text-muted-foreground" />
          <span className="font-mono text-sm">{row.getValue("vehicle")}</span>
        </div>
      ),
    },
    {
      accessorKey: "pickUpNo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pick Up No" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm text-muted-foreground">
          {row.getValue("pickUpNo")}
        </span>
      ),
    },
    {
      accessorKey: "customer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("customer")}</span>
      ),
    },
    {
      accessorKey: "customerContractId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer Contract ID" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-xs text-muted-foreground">
          {row.getValue("customerContractId")}
        </span>
      ),
    },
    {
      accessorKey: "customerRegion",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer Region" />
      ),
      cell: ({ row }) => {
        const region = row.getValue("customerRegion");
        const regionColors = {
          North: "bg-blue-500/10 text-blue-700 border-blue-500/50",
          South: "bg-green-500/10 text-green-700 border-green-500/50",
          East: "bg-purple-500/10 text-purple-700 border-purple-500/50",
          West: "bg-orange-500/10 text-orange-700 border-orange-500/50",
          Central: "bg-amber-500/10 text-amber-700 border-amber-500/50",
        };
        return (
          <Badge
            className={regionColors[region] || "bg-gray-500/10 text-gray-700"}
          >
            {region}
          </Badge>
        );
      },
    },
    {
      accessorKey: "pickup",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pickup" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <MapPin className="size-3 text-green-600" />
          {row.getValue("pickup")}
        </div>
      ),
    },
    {
      accessorKey: "pickupDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pickup Date" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="size-3 text-muted-foreground" />
          {row.getValue("pickupDate")}
        </div>
      ),
    },
    {
      accessorKey: "dropOff",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Drop Off" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <MapPin className="size-3 text-red-600" />
          {row.getValue("dropOff")}
        </div>
      ),
    },
    {
      accessorKey: "dropOffDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Drop Off Date" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="size-3 text-muted-foreground" />
          {row.getValue("dropOffDate")}
        </div>
      ),
    },
    {
      accessorKey: "commodity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Commodity" />
      ),
      cell: ({ row }) => (
        <span className="text-sm">{row.getValue("commodity")}</span>
      ),
    },
    {
      accessorKey: "rates",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rates" />
      ),
      cell: ({ row }) => (
        <span className="font-medium text-green-600">
          {row.getValue("rates")}
        </span>
      ),
    },
  ];

  return (
    <div className="h-full p-4">
      <div className="mb-4">
        <SmartFilter
          filterGroups={filterGroups}
          onFiltersChange={handleFiltersChange}
        />
      </div>
      <DataTable
        columns={dispatchColumns}
        data={dispatchData}
        showViewOptions={false}
      />

      {/* Load Details Sheet */}
      <Sheet open={isDetailSheetOpen} onOpenChange={setIsDetailSheetOpen}>
        <SheetContent className="sm:max-w-xl overflow-y-auto flex flex-col">
          <SheetHeader className="border-b pb-4">
            <SheetTitle>Load Details</SheetTitle>
          </SheetHeader>

          {selectedLoad && (
            <div className="flex-1 py-2 px-6 space-y-3 overflow-y-auto">
              {/* Status Change Section */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Update Status</Label>
                <Select value={selectedStatus} onValueChange={handleStatusChange}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pickup">Pick Up</SelectItem>
                    <SelectItem value="on_road">On Road</SelectItem>
                    <SelectItem value="arrive_delivery">Arrive Delivery</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Basic Information Card */}
              <div className="border rounded-sm bg-card">
                <div className="px-4 py-2 border-b bg-muted">
                  <h3 className="text-sm font-semibold text-foreground">Basic Information</h3>
                </div>
                <div className="divide-y divide-border">
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Load No</p>
                      <p className="text-sm font-medium text-foreground font-mono">{selectedLoad.loadNo}</p>
                    </div>
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Pick Up No</p>
                      <p className="text-sm font-medium text-foreground font-mono">{selectedLoad.pickUpNo}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Vehicle</p>
                      <p className="text-sm font-medium text-foreground font-mono flex items-center gap-1">
                        <Truck className="size-3" />
                        {selectedLoad.vehicle}
                      </p>
                    </div>
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Customer</p>
                      <p className="text-sm font-medium text-foreground">{selectedLoad.customer}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Contract ID</p>
                      <p className="text-sm font-medium text-foreground font-mono">{selectedLoad.customerContractId}</p>
                    </div>
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Region</p>
                      <p className="text-sm font-medium text-foreground">{selectedLoad.customerRegion}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Commodity</p>
                      <p className="text-sm font-medium text-foreground">{selectedLoad.commodity}</p>
                    </div>
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Rates</p>
                      <p className="text-sm font-semibold text-green-600">{selectedLoad.rates}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pickup Information Card */}
              <div className="border rounded-sm bg-card">
                <div className="px-4 py-2 border-b bg-muted">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <MapPin className="size-4 text-green-600" />
                    Pickup Information
                  </h3>
                </div>
                <div className="divide-y divide-border">
                  <div className="px-4 py-1.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                    <p className="text-sm font-medium text-foreground">{selectedLoad.pickup}</p>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Date</p>
                      <p className="text-sm font-medium text-foreground">{selectedLoad.pickupDate}</p>
                    </div>
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Contact Name</p>
                      <p className="text-sm font-medium text-foreground">{selectedLoad.pickupContactName}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                      <p className="text-sm font-medium text-foreground">{selectedLoad.pickupPhone}</p>
                    </div>
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">-</p>
                      <p className="text-sm font-medium text-foreground">-</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drop Off Information Card */}
              <div className="border rounded-sm bg-card">
                <div className="px-4 py-2 border-b bg-muted">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <MapPin className="size-4 text-red-600" />
                    Drop Off Information
                  </h3>
                </div>
                <div className="divide-y divide-border">
                  <div className="px-4 py-1.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                    <p className="text-sm font-medium text-foreground">{selectedLoad.dropOff}</p>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Date</p>
                      <p className="text-sm font-medium text-foreground">{selectedLoad.dropOffDate}</p>
                    </div>
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Contact Name</p>
                      <p className="text-sm font-medium text-foreground">{selectedLoad.dropOffContactName}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                      <p className="text-sm font-medium text-foreground">{selectedLoad.dropOffPhone}</p>
                    </div>
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">-</p>
                      <p className="text-sm font-medium text-foreground">-</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <SheetFooter className="border-t pt-4 px-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsDetailSheetOpen(false)}
            >
              Close
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Return to Planning Confirmation Modal */}
      <Dialog open={isReturnSheetOpen} onOpenChange={setIsReturnSheetOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Status Change</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <AlertTriangle className="size-6 text-amber-600" />
              </div>
              <div className="space-y-2">
                <p className="text-base font-medium">Are you sure you want to change status?</p>
                <p className="text-sm text-muted-foreground">
                  You are about to change the load <span className="font-mono font-medium text-foreground">{loadToReturn?.loadNo}</span> to <span className="font-medium text-foreground">Active</span> status in the planning tab.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsReturnSheetOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                onClick={confirmReturnToPlanning}
              >
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dispatch;
