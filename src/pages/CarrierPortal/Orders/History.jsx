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
  MoreHorizontal,
  Truck,
  MapPin,
  Calendar,
  Settings,
  DollarSign,
  ShoppingCart,
  History as HistoryIcon,
  Receipt,
  FileText,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";

const History = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);

  const handleLoadClick = (load) => {
    setSelectedLoad(load);
    setIsDetailSheetOpen(true);
  };

  // Filter configuration
  const filterGroups = [
    {
      id: "history-filters",
      label: "Filter Orders",
      filters: [
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
          key: "invoiceNo",
          label: "Invoice No",
          type: "input",
          group: "Basic",
          placeholder: "Search invoice number...",
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

  // Mock data for History - loads that passed validation
  const historyData = [
    // Ready to Bill loads (passed validation, not yet invoiced)
    {
      id: 1,
      vehicle: "TRK-2847",
      loadNo: "ML-2025-000901",
      ticketNo: "TKT-77401",
      pickUpNo: "PU-77201",
      customer: "Titan",
      customerContractId: "CTR-TIT-2025-001",
      customerRegion: "South",
      pickup: "1234 Industrial Blvd, Houston, TX 77001",
      pickupDate: "2024-12-01",
      pickupContactName: "John Smith",
      pickupPhone: "(713) 555-0101",
      dropOff: "5678 Commerce St, Dallas, TX 75201",
      dropOffDate: "2024-12-01",
      dropOffContactName: "Sarah Johnson",
      dropOffPhone: "(214) 555-0202",
      commodity: "Cement",
      rates: "$1,850.00",
      billingStatus: "Ready to Bill",
      validatedAt: "2024-12-01 16:30",
      invoiceNo: null,
      invoiceDate: null,
    },
    {
      id: 2,
      vehicle: "TRK-1923",
      loadNo: "ML-2025-000902",
      ticketNo: "TKT-77402",
      pickUpNo: "PU-77202",
      customer: "Ashgrove",
      customerContractId: "CTR-ASH-2025-003",
      customerRegion: "Central",
      pickup: "890 Quarry Rd, Austin, TX 78701",
      pickupDate: "2024-12-01",
      pickupContactName: "Mike Davis",
      pickupPhone: "(512) 555-0303",
      dropOff: "234 Construction Ave, San Antonio, TX 78201",
      dropOffDate: "2024-12-01",
      dropOffContactName: "Lisa Brown",
      dropOffPhone: "(210) 555-0404",
      commodity: "Flyash",
      rates: "$1,200.00",
      billingStatus: "Ready to Bill",
      validatedAt: "2024-12-01 17:15",
      invoiceNo: null,
      invoiceDate: null,
    },
    {
      id: 3,
      vehicle: "TRK-4521",
      loadNo: "MT-2025-000903",
      ticketNo: "TKT-77403",
      pickUpNo: "PU-77203",
      customer: "TQL",
      customerContractId: "CTR-TQL-2025-012",
      customerRegion: "North",
      pickup: "567 Sand Pit Ln, Fort Worth, TX 76101",
      pickupDate: "2024-12-02",
      pickupContactName: "Robert Wilson",
      pickupPhone: "(817) 555-0505",
      dropOff: "1010 Builder Way, Oklahoma City, OK 73101",
      dropOffDate: "2024-12-02",
      dropOffContactName: "Emily Garcia",
      dropOffPhone: "(405) 555-0606",
      commodity: "Sand",
      rates: "$2,400.00",
      billingStatus: "Ready to Bill",
      validatedAt: "2024-12-02 14:45",
      invoiceNo: null,
      invoiceDate: null,
    },
    // Invoiced loads
    {
      id: 4,
      vehicle: "TRK-7734",
      loadNo: "MT-2025-000804",
      ticketNo: "TKT-77304",
      pickUpNo: "PU-77104",
      customer: "Coyote",
      customerContractId: "CTR-COY-2025-007",
      customerRegion: "West",
      pickup: "789 Steel Works Dr, El Paso, TX 79901",
      pickupDate: "2024-11-28",
      pickupContactName: "David Martinez",
      pickupPhone: "(915) 555-0707",
      dropOff: "456 Industrial Park, Phoenix, AZ 85001",
      dropOffDate: "2024-11-29",
      dropOffContactName: "Jennifer Lee",
      dropOffPhone: "(602) 555-0808",
      commodity: "Limestone",
      rates: "$3,100.00",
      billingStatus: "Invoiced",
      validatedAt: "2024-11-29 15:30",
      invoiceNo: "INV-2024-001234",
      invoiceDate: "2024-11-30",
      invoiceStatus: "Paid in Full",
    },
    {
      id: 5,
      vehicle: "TRK-3356",
      loadNo: "MT-2025-000805",
      ticketNo: "TKT-77305",
      pickUpNo: "PU-77105",
      customer: "CH Robinson",
      customerContractId: "CTR-CHR-2025-019",
      customerRegion: "East",
      pickup: "5678 Commerce St, Dallas, TX 75201",
      pickupDate: "2024-11-27",
      pickupContactName: "Chris Anderson",
      pickupPhone: "(214) 555-0909",
      dropOff: "654 Cement Factory Ln, Little Rock, AR 72201",
      dropOffDate: "2024-11-27",
      dropOffContactName: "Amanda Taylor",
      dropOffPhone: "(501) 555-1010",
      commodity: "Cement",
      rates: "$2,200.00",
      billingStatus: "Invoiced",
      validatedAt: "2024-11-27 18:00",
      invoiceNo: "INV-2024-001235",
      invoiceDate: "2024-11-28",
      invoiceStatus: "Invoiced",
    },
    {
      id: 6,
      vehicle: "TRK-5589",
      loadNo: "ML-2025-000806",
      ticketNo: "TKT-77306",
      pickUpNo: "PU-77106",
      customer: "Titan",
      customerContractId: "CTR-TIT-2025-002",
      customerRegion: "South",
      pickup: "234 Construction Ave, San Antonio, TX 78201",
      pickupDate: "2024-11-26",
      pickupContactName: "Kevin Thomas",
      pickupPhone: "(210) 555-1111",
      dropOff: "222 Road Project Site, Corpus Christi, TX 78401",
      dropOffDate: "2024-11-26",
      dropOffContactName: "Michelle White",
      dropOffPhone: "(361) 555-1212",
      commodity: "Aggregate",
      rates: "$950.00",
      billingStatus: "Invoiced",
      validatedAt: "2024-11-26 16:45",
      invoiceNo: "INV-2024-001230",
      invoiceDate: "2024-11-27",
      invoiceStatus: "Paid in Full",
    },
    {
      id: 7,
      vehicle: "TRK-6612",
      loadNo: "ML-2025-000807",
      ticketNo: "TKT-77307",
      pickUpNo: "PU-77107",
      customer: "Ashgrove",
      customerContractId: "CTR-ASH-2025-004",
      customerRegion: "Central",
      pickup: "333 Farm Co-op Rd, Lubbock, TX 79401",
      pickupDate: "2024-11-25",
      pickupContactName: "Brian Harris",
      pickupPhone: "(806) 555-1313",
      dropOff: "444 Grain Elevator St, Amarillo, TX 79101",
      dropOffDate: "2024-11-25",
      dropOffContactName: "Nicole Clark",
      dropOffPhone: "(806) 555-1414",
      commodity: "Flyash",
      rates: "$800.00",
      billingStatus: "Invoiced",
      validatedAt: "2024-11-25 14:20",
      invoiceNo: "INV-2024-001228",
      invoiceDate: "2024-11-26",
      invoiceStatus: "Partial",
    },
    {
      id: 8,
      vehicle: "TRK-8845",
      loadNo: "MT-2025-000808",
      ticketNo: "TKT-77308",
      pickUpNo: "PU-77108",
      customer: "TQL",
      customerContractId: "CTR-TQL-2025-013",
      customerRegion: "East",
      pickup: "1234 Industrial Blvd, Houston, TX 77001",
      pickupDate: "2024-11-24",
      pickupContactName: "Steven Moore",
      pickupPhone: "(713) 555-1515",
      dropOff: "666 Construction Site, New Orleans, LA 70112",
      dropOffDate: "2024-11-25",
      dropOffContactName: "Rachel King",
      dropOffPhone: "(504) 555-1616",
      commodity: "Sand",
      rates: "$2,800.00",
      billingStatus: "Invoiced",
      validatedAt: "2024-11-25 17:30",
      invoiceNo: "INV-2024-001225",
      invoiceDate: "2024-11-26",
      invoiceStatus: "Overdue",
    },
    {
      id: 9,
      vehicle: "TRK-2847",
      loadNo: "ML-2025-000809",
      ticketNo: "TKT-77309",
      pickUpNo: "PU-77109",
      customer: "Titan",
      customerContractId: "CTR-TIT-2025-003",
      customerRegion: "South",
      pickup: "777 Concrete Way, Houston, TX 77002",
      pickupDate: "2024-11-23",
      pickupContactName: "James Wilson",
      pickupPhone: "(713) 555-1717",
      dropOff: "888 Builder Rd, Austin, TX 78702",
      dropOffDate: "2024-11-23",
      dropOffContactName: "Patricia Lee",
      dropOffPhone: "(512) 555-1818",
      commodity: "Cement",
      rates: "$1,650.00",
      billingStatus: "Invoiced",
      validatedAt: "2024-11-23 15:45",
      invoiceNo: "INV-2024-001220",
      invoiceDate: "2024-11-24",
      invoiceStatus: "Paid in Full",
    },
    {
      id: 10,
      vehicle: "TRK-1923",
      loadNo: "MT-2025-000810",
      ticketNo: "TKT-77310",
      pickUpNo: "PU-77110",
      customer: "Coyote",
      customerContractId: "CTR-COY-2025-008",
      customerRegion: "West",
      pickup: "999 Quarry Lane, Phoenix, AZ 85002",
      pickupDate: "2024-11-22",
      pickupContactName: "Daniel Brown",
      pickupPhone: "(602) 555-1919",
      dropOff: "111 Distribution Center, Tucson, AZ 85701",
      dropOffDate: "2024-11-22",
      dropOffContactName: "Sandra Miller",
      dropOffPhone: "(520) 555-2020",
      commodity: "Gravel",
      rates: "$1,450.00",
      billingStatus: "Invoiced",
      validatedAt: "2024-11-22 16:00",
      invoiceNo: "INV-2024-001218",
      invoiceDate: "2024-11-23",
      invoiceStatus: "Paid in Full",
    },
  ];

  // Get billing status badge
  const getBillingStatusBadge = (status, invoiceStatus) => {
    if (status === "Ready to Bill") {
      return (
        <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/50">
          <Clock className="size-3 mr-1" />
          Ready to Bill
        </Badge>
      );
    }

    // For invoiced loads, show the invoice status
    const statusConfig = {
      Invoiced: {
        color: "bg-blue-500/10 text-blue-700 border-blue-500/50",
        icon: <FileText className="size-3 mr-1" />,
      },
      "Paid in Full": {
        color: "bg-green-500/10 text-green-700 border-green-500/50",
        icon: <CheckCircle2 className="size-3 mr-1" />,
      },
      Partial: {
        color: "bg-amber-500/10 text-amber-700 border-amber-500/50",
        icon: <Clock className="size-3 mr-1" />,
      },
      Overdue: {
        color: "bg-red-500/10 text-red-700 border-red-500/50",
        icon: <Clock className="size-3 mr-1" />,
      },
    };

    const config = statusConfig[invoiceStatus] || statusConfig.Invoiced;
    return (
      <Badge className={config.color}>
        {config.icon}
        {invoiceStatus}
      </Badge>
    );
  };

  // Columns for History table
  const historyColumns = [
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
            <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/history/load-details?id=${row.original.loadNo}&tab=general&mode=view`)}>
              <Settings className="size-4 mr-2" />
              General
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/history/load-details?id=${row.original.loadNo}&tab=additional-charge&mode=view`)}>
              <DollarSign className="size-4 mr-2" />
              Additional Charge
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/history/load-details?id=${row.original.loadNo}&tab=product-sale&mode=view`)}>
              <ShoppingCart className="size-4 mr-2" />
              Product Sale
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/history/load-details?id=${row.original.loadNo}&tab=audit&mode=view`)}>
              <HistoryIcon className="size-4 mr-2" />
              Audit Log
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/history/load-details?id=${row.original.loadNo}&tab=pod&mode=view`)}>
              <Receipt className="size-4 mr-2" />
              POD
            </DropdownMenuItem>
            {row.original.invoiceNo && (
              <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/billing/invoicing/invoice-details?id=${row.original.invoiceNo}`)}>
                <FileText className="size-4 mr-2" />
                View Invoice
              </DropdownMenuItem>
            )}
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
      accessorKey: "invoiceNo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Invoice No" />
      ),
      cell: ({ row }) => {
        const invoiceNo = row.getValue("invoiceNo");
        if (!invoiceNo) {
          return <span className="text-muted-foreground">-</span>;
        }
        return (
          <button
            onClick={() => navigate(`/app/carrier-portal/billing/invoicing/invoice-details?id=${invoiceNo}`)}
            className="font-mono text-sm text-primary underline hover:text-primary/80 cursor-pointer flex items-center gap-1"
          >
            {invoiceNo}
            <ExternalLink className="size-3" />
          </button>
        );
      },
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
      accessorKey: "customer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("customer")}</span>
      ),
    },
    {
      accessorKey: "customerRegion",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Region" />
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
        columns={historyColumns}
        data={historyData}
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
              {/* Billing Status Card */}
              <div className="border rounded-sm bg-card">
                <div className="px-4 py-2 border-b bg-muted">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <FileText className="size-4" />
                    Billing Information
                  </h3>
                </div>
                <div className="divide-y divide-border">
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Billing Status</p>
                      <div className="mt-1">
                        {getBillingStatusBadge(selectedLoad.billingStatus, selectedLoad.invoiceStatus)}
                      </div>
                    </div>
                    <div className="px-4 py-1.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Validated At</p>
                      <p className="text-sm font-medium text-foreground">{selectedLoad.validatedAt}</p>
                    </div>
                  </div>
                  {selectedLoad.invoiceNo && (
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="px-4 py-1.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Invoice No</p>
                        <button
                          onClick={() => navigate(`/app/carrier-portal/billing/invoicing/invoice-details?id=${selectedLoad.invoiceNo}`)}
                          className="text-sm font-medium text-primary underline hover:text-primary/80 cursor-pointer flex items-center gap-1 font-mono"
                        >
                          {selectedLoad.invoiceNo}
                          <ExternalLink className="size-3" />
                        </button>
                      </div>
                      <div className="px-4 py-1.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Invoice Date</p>
                        <p className="text-sm font-medium text-foreground">{selectedLoad.invoiceDate}</p>
                      </div>
                    </div>
                  )}
                </div>
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
    </div>
  );
};

export default History;
