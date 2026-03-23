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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
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
  ChevronsUpDown,
  Check,
  Save,
  Send,
  XCircle,
  Package,
} from "lucide-react";

const RequestOrders = () => {
  const [filters, setFilters] = useState([]);
  const [activeTab, setActiveTab] = useState("ml");

  // Add New Load sheet state
  const [isNewLoadOpen, setIsNewLoadOpen] = useState(false);
  const [brokerOpen, setBrokerOpen] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState("");
  const [equipmentOpen, setEquipmentOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState("");

  // Product items state
  const [productItems, setProductItems] = useState([]);
  const [productSearchOpen, setProductSearchOpen] = useState({});

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

  // Broker/customer options
  const brokers = [
    { value: "ch-robinson", label: "CH Robinson" },
    { value: "tql", label: "TQL" },
    { value: "coyote-logistics", label: "Coyote Logistics" },
    { value: "echo-global", label: "Echo Global Logistics" },
    { value: "landstar", label: "Landstar" },
    { value: "xpo-logistics", label: "XPO Logistics" },
    { value: "jb-hunt", label: "J.B. Hunt" },
  ];

  // Equipment types
  const equipmentTypes = [
    { value: "flatbed", label: "Flatbed" },
    { value: "pneumatic", label: "Pneumatic" },
    { value: "walking-floor", label: "Walking Floor" },
    { value: "dry-van", label: "Dry Van" },
    { value: "reefer", label: "Reefer" },
    { value: "step-deck", label: "Step Deck" },
  ];

  // Product data
  const salesProducts = [
    { value: "concrete-mix", label: "Concrete Mix", sku: "CM-001" },
    { value: "ready-mix", label: "Ready Mix Concrete", sku: "RM-002" },
    { value: "aggregate-base", label: "Aggregate Base", sku: "AB-003" },
    { value: "precast-panel", label: "Precast Panel", sku: "PP-004" },
    { value: "rebar", label: "Rebar", sku: "RB-005" },
    { value: "structural-steel", label: "Structural Steel", sku: "SS-006" },
    { value: "asphalt-mix", label: "Asphalt Mix", sku: "AM-007" },
  ];

  const materialProducts = [
    { value: "portland-cement", label: "Portland Cement", sku: "PC-101" },
    { value: "flyash-type-c", label: "Fly Ash Type C", sku: "FA-102" },
    { value: "silica-fume", label: "Silica Fume", sku: "SF-103" },
    { value: "fine-sand", label: "Fine Sand", sku: "FS-104" },
    { value: "coarse-aggregate", label: "Coarse Aggregate", sku: "CA-105" },
    { value: "admixture-wr", label: "Admixture (Water Reducer)", sku: "AW-106" },
    { value: "steel-fibers", label: "Steel Fibers", sku: "ST-107" },
    { value: "lime-powder", label: "Lime Powder", sku: "LP-108" },
  ];

  const getProductOptions = (productType) =>
    productType === "materials" ? materialProducts : salesProducts;

  // Product item helpers
  const addProductItem = () => {
    setProductItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        productType: "sales",
        productValue: "",
        productLabel: "",
        quantity: 1,
      },
    ]);
  };

  const removeProductItem = (id) => {
    setProductItems((prev) => prev.filter((item) => item.id !== id));
    setProductSearchOpen((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const updateProductItem = (id, field, value) => {
    setProductItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        if (field === "productType") {
          return { ...item, productType: value, productValue: "", productLabel: "" };
        }
        return { ...item, [field]: value };
      })
    );
  };

  // Mock data for Mega Logistics (ML) orders
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

  // Mock data for External Broker orders
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
              <Button
                className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                onClick={() => setIsNewLoadOpen(true)}
              >
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

      {/* ── Add New Load Sheet ── */}
      <Sheet open={isNewLoadOpen} onOpenChange={setIsNewLoadOpen}>
        <SheetContent className="sm:max-w-2xl flex flex-col h-full">
          <SheetHeader className="border-b pb-4">
            <SheetTitle className="text-xl font-semibold">Add New Load</SheetTitle>
          </SheetHeader>

          <ScrollArea className="flex-1 min-h-0">
            <div className="space-y-4 py-2 px-4">

              {/* Broker */}
              <div className="space-y-2">
                <Label>Broker <span className="text-red-500">*</span></Label>
                <Popover open={brokerOpen} onOpenChange={setBrokerOpen} modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={brokerOpen}
                      className="w-full justify-between"
                    >
                      {selectedBroker
                        ? brokers.find((b) => b.value === selectedBroker)?.label
                        : "Select broker..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="p-0"
                    align="start"
                    style={{ width: "var(--radix-popover-trigger-width)" }}
                  >
                    <Command>
                      <CommandInput placeholder="Search broker..." />
                      <CommandList>
                        <CommandEmpty>No broker found.</CommandEmpty>
                        <CommandGroup>
                          {brokers.map((broker) => (
                            <CommandItem
                              key={broker.value}
                              value={broker.value}
                              onSelect={(val) => {
                                setSelectedBroker(val === selectedBroker ? "" : val);
                                setBrokerOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedBroker === broker.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {broker.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Equipment Type */}
              <div className="space-y-2">
                <Label>Equipment Type <span className="text-red-500">*</span></Label>
                <Popover open={equipmentOpen} onOpenChange={setEquipmentOpen} modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={equipmentOpen}
                      className="w-full justify-between"
                    >
                      {selectedEquipment
                        ? equipmentTypes.find((e) => e.value === selectedEquipment)?.label
                        : "Select equipment type..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="p-0"
                    align="start"
                    style={{ width: "var(--radix-popover-trigger-width)" }}
                  >
                    <Command>
                      <CommandInput placeholder="Search equipment..." />
                      <CommandList>
                        <CommandEmpty>No equipment found.</CommandEmpty>
                        <CommandGroup>
                          {equipmentTypes.map((eq) => (
                            <CommandItem
                              key={eq.value}
                              value={eq.value}
                              onSelect={(val) => {
                                setSelectedEquipment(val === selectedEquipment ? "" : val);
                                setEquipmentOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedEquipment === eq.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {eq.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Origin Details */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Origin Details</Label>
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="originAddress">Address</Label>
                    <Input id="originAddress" placeholder="Enter address..." />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="originCity">City</Label>
                      <Input id="originCity" placeholder="City" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="originState">State</Label>
                      <Input id="originState" placeholder="State" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="originZip">Zip Code</Label>
                      <Input id="originZip" placeholder="Zip Code" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="originContact">Contact Name</Label>
                      <Input id="originContact" placeholder="Contact name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="originPhone">Phone</Label>
                      <Input id="originPhone" placeholder="Phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="originPickupTime">Appointment Time</Label>
                      <Input id="originPickupTime" type="time" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Destination Details */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Destination Details</Label>
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="destAddress">Address</Label>
                    <Input id="destAddress" placeholder="Enter address..." />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="destCity">City</Label>
                      <Input id="destCity" placeholder="City" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destState">State</Label>
                      <Input id="destState" placeholder="State" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destZip">Zip Code</Label>
                      <Input id="destZip" placeholder="Zip Code" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="destContact">Contact Name</Label>
                      <Input id="destContact" placeholder="Contact name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destPhone">Phone</Label>
                      <Input id="destPhone" placeholder="Phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destDeliveryTime">Appointment Time</Label>
                      <Input id="destDeliveryTime" type="time" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dates / Times */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Dates / Times</Label>
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickupDate">Pickup Date</Label>
                      <Input id="pickupDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pickupStartTime">Start Time</Label>
                      <Input id="pickupStartTime" type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pickupEndTime">End Time</Label>
                      <Input id="pickupEndTime" type="time" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deliveryDate">Delivery Date</Label>
                      <Input id="deliveryDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryStartTime">Start Time</Label>
                      <Input id="deliveryStartTime" type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryEndTime">End Time</Label>
                      <Input id="deliveryEndTime" type="time" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Products ── */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm font-medium">Products</Label>
                    {productItems.length > 0 && (
                      <span className="text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5">
                        {productItems.length}
                      </span>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs gap-1"
                    onClick={addProductItem}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Product
                  </Button>
                </div>

                {productItems.length > 0 ? (
                  <div className="border rounded-lg p-3 space-y-3 bg-muted/20">
                    {/* Column headers */}
                    <div className="hidden md:grid md:grid-cols-[130px_1fr_90px_36px] gap-2 px-1">
                      <span className="text-xs font-medium text-muted-foreground">Type</span>
                      <span className="text-xs font-medium text-muted-foreground">Product</span>
                      <span className="text-xs font-medium text-muted-foreground">Qty</span>
                      <span />
                    </div>

                    {productItems.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex flex-col md:grid md:grid-cols-[130px_1fr_90px_36px] gap-2 items-start md:items-center bg-background rounded-md border p-2 md:p-0 md:bg-transparent md:border-0"
                      >
                        {/* Mobile item label */}
                        <span className="text-xs text-muted-foreground md:hidden">
                          Item {index + 1}
                        </span>

                        {/* Product Type */}
                        <select
                          className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                          value={item.productType}
                          onChange={(e) => updateProductItem(item.id, "productType", e.target.value)}
                        >
                          <option value="sales">Product Sales</option>
                          <option value="materials">Materials</option>
                        </select>

                        {/* Product Combobox */}
                        <Popover
                          open={productSearchOpen[item.id] || false}
                          onOpenChange={(open) =>
                            setProductSearchOpen((prev) => ({ ...prev, [item.id]: open }))
                          }
                          modal={true}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full h-9 justify-between font-normal"
                            >
                              <span className="truncate">
                                {item.productLabel || "Select product..."}
                              </span>
                              <ChevronsUpDown className="ml-2 h-3.5 w-3.5 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="p-0"
                            align="start"
                            style={{ width: "var(--radix-popover-trigger-width)" }}
                          >
                            <Command>
                              <CommandInput
                                placeholder={`Search ${item.productType === "materials" ? "material" : "sales product"}...`}
                              />
                              <CommandList>
                                <CommandEmpty>No product found.</CommandEmpty>
                                <CommandGroup>
                                  {getProductOptions(item.productType).map((product) => (
                                    <CommandItem
                                      key={product.value}
                                      value={product.value}
                                      onSelect={(val) => {
                                        const found = getProductOptions(item.productType).find(
                                          (p) => p.value === val
                                        );
                                        updateProductItem(item.id, "productValue", val);
                                        updateProductItem(item.id, "productLabel", found?.label || "");
                                        setProductSearchOpen((prev) => ({
                                          ...prev,
                                          [item.id]: false,
                                        }));
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          item.productValue === product.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      <div className="flex flex-col">
                                        <span>{product.label}</span>
                                        <span className="text-xs text-muted-foreground font-mono">
                                          {product.sku}
                                        </span>
                                      </div>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        {/* Quantity */}
                        <Input
                          type="number"
                          min={1}
                          step={1}
                          className="h-9 text-sm w-full md:w-[90px]"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            updateProductItem(
                              item.id,
                              "quantity",
                              isNaN(val) || val < 1 ? 1 : val
                            );
                          }}
                        />

                        {/* Remove */}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-muted-foreground hover:text-destructive shrink-0 self-end md:self-auto"
                          onClick={() => removeProductItem(item.id)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    {/* Total quantity */}
                    {productItems.length > 1 && (
                      <div className="flex justify-end pt-1 border-t">
                        <span className="text-xs text-muted-foreground">
                          Total quantity:{" "}
                          <span className="font-medium text-foreground">
                            {productItems.reduce((sum, i) => sum + (i.quantity || 0), 0)}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-2 border rounded-lg bg-muted/10">
                    No products added. Click "Add Product" to include items.
                  </p>
                )}
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Enter any additional notes or appointment requirements..."
                  rows={4}
                />
              </div>

            </div>
          </ScrollArea>

          <SheetFooter className="flex-shrink-0 border-t pt-4">
            <div className="grid grid-cols-3 gap-3 w-full">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsNewLoadOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="outline" className="w-full">
                <Save className="size-4 mr-2" />
                Save as Draft
              </Button>
              <Button
                className="w-full bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                onClick={() => setIsNewLoadOpen(false)}
              >
                <Send className="size-4 mr-2" />
                Submit Load
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default RequestOrders;
