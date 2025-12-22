import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import SmartFilter from "@/components/SmartFilter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MoreHorizontal,
  Truck,
  MapPin,
  Calendar,
  Settings,
  DollarSign,
  ShoppingCart,
  History,
  Receipt,
  Undo2,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  GitBranch,
} from "lucide-react";

const Delivered = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [loadToChange, setLoadToChange] = useState(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [loadToApprove, setLoadToApprove] = useState(null);
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);
  const [loadToResend, setLoadToResend] = useState(null);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [loadToWorkflow, setLoadToWorkflow] = useState(null);

  const handleLoadClick = (load) => {
    setSelectedLoad(load);
    setIsDetailSheetOpen(true);
  };

  const handleChangeStatusClick = (load) => {
    setLoadToChange(load);
    setIsChangeModalOpen(true);
  };

  const handleConfirmChange = () => {
    console.log("Status changed to Active for load:", loadToChange?.loadNo);
    setIsChangeModalOpen(false);
    setLoadToChange(null);
  };

  const handleApproveClick = (load) => {
    setLoadToApprove(load);
    setIsApproveModalOpen(true);
  };

  const handleConfirmApprove = () => {
    console.log("Load approved and moved to Complete:", loadToApprove?.loadNo);
    setIsApproveModalOpen(false);
    setLoadToApprove(null);
  };

  const handleResendClick = (load) => {
    setLoadToResend(load);
    setIsResendModalOpen(true);
  };

  const handleConfirmResend = () => {
    console.log("Load resent:", loadToResend?.loadNo);
    setIsResendModalOpen(false);
    setLoadToResend(null);
  };

  const handleWorkflowClick = (load) => {
    setLoadToWorkflow(load);
    setIsWorkflowModalOpen(true);
  };

  const handleConfirmWorkflow = () => {
    console.log("Load sent to workflow:", loadToWorkflow?.loadNo);
    setIsWorkflowModalOpen(false);
    setLoadToWorkflow(null);
  };

  // Filter configuration
  const filterGroups = [
    {
      id: "delivered-filters",
      label: "Filter Orders",
      filters: [
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          static: true,
          defaultValue: "delivered",
          options: [
            { value: "delivered", label: "Delivered" },
            { value: "resend", label: "Resend" },
            { value: "detention", label: "Detention" },
            { value: "workflow", label: "Workflow" },
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
          key: "ticketNo",
          label: "Ticket No",
          type: "input",
          group: "Basic",
          placeholder: "Search ticket number...",
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

  // Mock data for Delivered (all with vehicles assigned)
  const deliveredData = [
    {
      id: 1,
      vehicle: "TRK-2847",
      loadNo: "ML-2025-001101",
      ticketNo: "TKT-78501",
      pickUpNo: "PU-78301",
      customer: "Titan",
      customerContractId: "CTR-TIT-2025-001",
      customerRegion: "South",
      pickup: "1234 Industrial Blvd, Houston, TX 77001",
      pickupDate: "2024-12-08",
      pickupContactName: "John Smith",
      pickupPhone: "(713) 555-0101",
      dropOff: "5678 Commerce St, Dallas, TX 75201",
      dropOffDate: "2024-12-08",
      dropOffContactName: "Sarah Johnson",
      dropOffPhone: "(214) 555-0202",
      commodity: "Cement",
      rates: "$1,850.00",
    },
    {
      id: 2,
      vehicle: "TRK-1923",
      loadNo: "ML-2025-001102",
      ticketNo: "TKT-78502",
      pickUpNo: "PU-78302",
      customer: "Ashgrove",
      customerContractId: "CTR-ASH-2025-003",
      customerRegion: "Central",
      pickup: "890 Quarry Rd, Austin, TX 78701",
      pickupDate: "2024-12-08",
      pickupContactName: "Mike Davis",
      pickupPhone: "(512) 555-0303",
      dropOff: "234 Construction Ave, San Antonio, TX 78201",
      dropOffDate: "2024-12-08",
      dropOffContactName: "Lisa Brown",
      dropOffPhone: "(210) 555-0404",
      commodity: "Flyash",
      rates: "$1,200.00",
    },
    {
      id: 3,
      vehicle: "TRK-4521",
      loadNo: "MT-2025-001103",
      ticketNo: "TKT-78503",
      pickUpNo: "PU-78303",
      customer: "TQL",
      customerContractId: "CTR-TQL-2025-012",
      customerRegion: "North",
      pickup: "567 Sand Pit Ln, Fort Worth, TX 76101",
      pickupDate: "2024-12-09",
      pickupContactName: "Robert Wilson",
      pickupPhone: "(817) 555-0505",
      dropOff: "1010 Builder Way, Oklahoma City, OK 73101",
      dropOffDate: "2024-12-09",
      dropOffContactName: "Emily Garcia",
      dropOffPhone: "(405) 555-0606",
      commodity: "Sand",
      rates: "$2,400.00",
    },
    {
      id: 4,
      vehicle: "TRK-7734",
      loadNo: "MT-2025-001104",
      ticketNo: "TKT-78504",
      pickUpNo: "PU-78304",
      customer: "Coyote",
      customerContractId: "CTR-COY-2025-007",
      customerRegion: "West",
      pickup: "789 Steel Works Dr, El Paso, TX 79901",
      pickupDate: "2024-12-09",
      pickupContactName: "David Martinez",
      pickupPhone: "(915) 555-0707",
      dropOff: "456 Industrial Park, Phoenix, AZ 85001",
      dropOffDate: "2024-12-10",
      dropOffContactName: "Jennifer Lee",
      dropOffPhone: "(602) 555-0808",
      commodity: "Limestone",
      rates: "$3,100.00",
    },
    {
      id: 5,
      vehicle: "TRK-3356",
      loadNo: "MT-2025-001105",
      ticketNo: "TKT-78505",
      pickUpNo: "PU-78305",
      customer: "CH Robinson",
      customerContractId: "CTR-CHR-2025-019",
      customerRegion: "East",
      pickup: "5678 Commerce St, Dallas, TX 75201",
      pickupDate: "2024-12-10",
      pickupContactName: "Chris Anderson",
      pickupPhone: "(214) 555-0909",
      dropOff: "654 Cement Factory Ln, Little Rock, AR 72201",
      dropOffDate: "2024-12-10",
      dropOffContactName: "Amanda Taylor",
      dropOffPhone: "(501) 555-1010",
      commodity: "Cement",
      rates: "$2,200.00",
    },
    {
      id: 6,
      vehicle: "TRK-5589",
      loadNo: "ML-2025-001106",
      ticketNo: "TKT-78506",
      pickUpNo: "PU-78306",
      customer: "Titan",
      customerContractId: "CTR-TIT-2025-002",
      customerRegion: "South",
      pickup: "234 Construction Ave, San Antonio, TX 78201",
      pickupDate: "2024-12-11",
      pickupContactName: "Kevin Thomas",
      pickupPhone: "(210) 555-1111",
      dropOff: "222 Road Project Site, Corpus Christi, TX 78401",
      dropOffDate: "2024-12-11",
      dropOffContactName: "Michelle White",
      dropOffPhone: "(361) 555-1212",
      commodity: "Aggregate",
      rates: "$950.00",
    },
    {
      id: 7,
      vehicle: "TRK-6612",
      loadNo: "ML-2025-001107",
      ticketNo: "TKT-78507",
      pickUpNo: "PU-78307",
      customer: "Ashgrove",
      customerContractId: "CTR-ASH-2025-004",
      customerRegion: "Central",
      pickup: "333 Farm Co-op Rd, Lubbock, TX 79401",
      pickupDate: "2024-12-11",
      pickupContactName: "Brian Harris",
      pickupPhone: "(806) 555-1313",
      dropOff: "444 Grain Elevator St, Amarillo, TX 79101",
      dropOffDate: "2024-12-11",
      dropOffContactName: "Nicole Clark",
      dropOffPhone: "(806) 555-1414",
      commodity: "Flyash",
      rates: "$800.00",
    },
    {
      id: 8,
      vehicle: "TRK-8845",
      loadNo: "MT-2025-001108",
      ticketNo: "TKT-78508",
      pickUpNo: "PU-78308",
      customer: "TQL",
      customerContractId: "CTR-TQL-2025-013",
      customerRegion: "East",
      pickup: "1234 Industrial Blvd, Houston, TX 77001",
      pickupDate: "2024-12-12",
      pickupContactName: "Steven Moore",
      pickupPhone: "(713) 555-1515",
      dropOff: "666 Construction Site, New Orleans, LA 70112",
      dropOffDate: "2024-12-13",
      dropOffContactName: "Rachel King",
      dropOffPhone: "(504) 555-1616",
      commodity: "Sand",
      rates: "$2,800.00",
    },
    {
      id: 9,
      vehicle: "TRK-2847",
      loadNo: "ML-2025-001109",
      ticketNo: "TKT-78509",
      pickUpNo: "PU-78309",
      customer: "Titan",
      customerContractId: "CTR-TIT-2025-003",
      customerRegion: "South",
      pickup: "777 Concrete Way, Houston, TX 77002",
      pickupDate: "2024-12-12",
      pickupContactName: "James Wilson",
      pickupPhone: "(713) 555-1717",
      dropOff: "888 Builder Rd, Austin, TX 78702",
      dropOffDate: "2024-12-12",
      dropOffContactName: "Patricia Lee",
      dropOffPhone: "(512) 555-1818",
      commodity: "Cement",
      rates: "$1,650.00",
    },
    {
      id: 10,
      vehicle: "TRK-1923",
      loadNo: "MT-2025-001110",
      ticketNo: "TKT-78510",
      pickUpNo: "PU-78310",
      customer: "Coyote",
      customerContractId: "CTR-COY-2025-008",
      customerRegion: "West",
      pickup: "999 Quarry Lane, Phoenix, AZ 85002",
      pickupDate: "2024-12-13",
      pickupContactName: "Daniel Brown",
      pickupPhone: "(602) 555-1919",
      dropOff: "111 Distribution Center, Tucson, AZ 85701",
      dropOffDate: "2024-12-13",
      dropOffContactName: "Sandra Miller",
      dropOffPhone: "(520) 555-2020",
      commodity: "Gravel",
      rates: "$1,450.00",
    },
    {
      id: 11,
      vehicle: "TRK-7734",
      loadNo: "MT-2025-001111",
      ticketNo: "TKT-78511",
      pickUpNo: "PU-78311",
      customer: "CH Robinson",
      customerContractId: "CTR-CHR-2025-020",
      customerRegion: "East",
      pickup: "222 Steel Mill Rd, Birmingham, AL 35201",
      pickupDate: "2024-12-13",
      pickupContactName: "Thomas Garcia",
      pickupPhone: "(205) 555-2121",
      dropOff: "333 Factory Blvd, Atlanta, GA 30301",
      dropOffDate: "2024-12-13",
      dropOffContactName: "Nancy Davis",
      dropOffPhone: "(404) 555-2222",
      commodity: "Limestone",
      rates: "$2,100.00",
    },
    {
      id: 12,
      vehicle: "TRK-4521",
      loadNo: "ML-2025-001112",
      ticketNo: "TKT-78512",
      pickUpNo: "PU-78312",
      customer: "Ashgrove",
      customerContractId: "CTR-ASH-2025-005",
      customerRegion: "Central",
      pickup: "444 Cement Plant Dr, Kansas City, MO 64101",
      pickupDate: "2024-12-14",
      pickupContactName: "Mark Johnson",
      pickupPhone: "(816) 555-2323",
      dropOff: "555 Construction Site, Omaha, NE 68101",
      dropOffDate: "2024-12-14",
      dropOffContactName: "Betty Wilson",
      dropOffPhone: "(402) 555-2424",
      commodity: "Flyash",
      rates: "$1,350.00",
    },
  ];

  // Columns for Delivered table
  const deliveredColumns = [
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
            <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/delivered/load-details?id=${row.original.loadNo}&tab=general&mode=view`)}>
              <Settings className="size-4 mr-2" />
              General
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/delivered/load-details?id=${row.original.loadNo}&tab=additional-charge&mode=view`)}>
              <DollarSign className="size-4 mr-2" />
              Additional Charge
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/delivered/load-details?id=${row.original.loadNo}&tab=product-sale&mode=view`)}>
              <ShoppingCart className="size-4 mr-2" />
              Product Sale
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/delivered/load-details?id=${row.original.loadNo}&tab=audit&mode=view`)}>
              <History className="size-4 mr-2" />
              Audit Log
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/delivered/load-details?id=${row.original.loadNo}&tab=pod&mode=view`)}>
              <Receipt className="size-4 mr-2" />
              POD
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChangeStatusClick(row.original)} className="text-red-600">
              <Undo2 className="size-4 mr-2" />
              Return to Planning
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleApproveClick(row.original)} className="text-green-600">
              <CheckCircle className="size-4 mr-2" />
              Approve Load
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleResendClick(row.original)} className="text-blue-600">
              <RefreshCw className="size-4 mr-2" />
              Resend Load
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleWorkflowClick(row.original)} className="text-purple-600">
              <GitBranch className="size-4 mr-2" />
              Send to Workflow
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
      accessorKey: "ticketNo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ticket No" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("ticketNo")}</span>
      ),
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
        columns={deliveredColumns}
        data={deliveredData}
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
                      <p className="text-xs text-muted-foreground mb-0.5">Ticket No</p>
                      <p className="text-sm font-medium text-foreground font-mono">{selectedLoad.ticketNo}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Pick Up No</p>
                      <p className="text-sm font-medium text-foreground font-mono">{selectedLoad.pickUpNo}</p>
                    </div>
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Vehicle</p>
                      <p className="text-sm font-medium text-foreground font-mono flex items-center gap-1">
                        <Truck className="size-3" />
                        {selectedLoad.vehicle}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Customer</p>
                      <p className="text-sm font-medium text-foreground">{selectedLoad.customer}</p>
                    </div>
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Contract ID</p>
                      <p className="text-sm font-medium text-foreground font-mono">{selectedLoad.customerContractId}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Region</p>
                      <p className="text-sm font-medium text-foreground">{selectedLoad.customerRegion}</p>
                    </div>
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Commodity</p>
                      <p className="text-sm font-medium text-foreground">{selectedLoad.commodity}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Rates</p>
                      <p className="text-sm font-semibold text-green-600">{selectedLoad.rates}</p>
                    </div>
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">-</p>
                      <p className="text-sm font-medium text-foreground">-</p>
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

      {/* Change Status Confirmation Modal */}
      <Dialog open={isChangeModalOpen} onOpenChange={setIsChangeModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Status Change</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Undo2 className="size-6 text-red-600" />
              </div>
              <div className="space-y-2">
                <p className="text-base font-medium">Are you sure you want to change status?</p>
                <p className="text-sm text-muted-foreground">
                  You are about to change the load <span className="font-mono font-medium text-foreground">{loadToChange?.loadNo}</span> to <span className="font-medium text-foreground">Active</span> status in the planning tab.
                </p>
              </div>
              <div className="w-full px-4 py-2.5 rounded-md bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-900/50 flex items-center gap-2">
                <AlertCircle className="size-4 text-amber-600 shrink-0" />
                <p className="text-sm text-amber-700 dark:text-amber-500">This action will remove Vehicle and POD.</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsChangeModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={handleConfirmChange}
              >
                Change
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Load Confirmation Modal */}
      <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Approval</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle className="size-6 text-green-600" />
              </div>
              <div className="space-y-2">
                <p className="text-base font-medium">Are you sure you want to approve?</p>
                <p className="text-sm text-muted-foreground">
                  You are about to change the load <span className="font-mono font-medium text-foreground">{loadToApprove?.loadNo}</span> to <span className="font-medium text-foreground">Complete</span> status in the complete tab.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsApproveModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                onClick={handleConfirmApprove}
              >
                Approve
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Resend Load Confirmation Modal */}
      <Dialog open={isResendModalOpen} onOpenChange={setIsResendModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Resend</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <RefreshCw className="size-6 text-blue-600" />
              </div>
              <div className="space-y-2">
                <p className="text-base font-medium">Are you sure you want to resend?</p>
                <p className="text-sm text-muted-foreground">
                  You are about to change the load <span className="font-mono font-medium text-foreground">{loadToResend?.loadNo}</span> to <span className="font-medium text-foreground">Resend</span> status in the delivered tab.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsResendModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleConfirmResend}
              >
                Resend
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send to Workflow Confirmation Modal */}
      <Dialog open={isWorkflowModalOpen} onOpenChange={setIsWorkflowModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Send to Workflow</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <GitBranch className="size-6 text-purple-600" />
              </div>
              <div className="space-y-2">
                <p className="text-base font-medium">Are you sure you want to send to workflow?</p>
                <p className="text-sm text-muted-foreground">
                  You are about to change the load <span className="font-mono font-medium text-foreground">{loadToWorkflow?.loadNo}</span> to <span className="font-medium text-foreground">Workflow</span> status in the delivered tab.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsWorkflowModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                onClick={handleConfirmWorkflow}
              >
                Send to Workflow
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Delivered;
