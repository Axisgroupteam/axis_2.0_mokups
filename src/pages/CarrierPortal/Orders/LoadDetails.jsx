import { useState, useCallback } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import SmartFilter from "@/components/SmartFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  Settings,
  DollarSign,
  ShoppingCart,
  History,
  Truck,
  MapPin,
  Plus,
  Trash2,
  Edit,
  Package,
  User,
  Phone,
  Clock,
  Calendar,
  FileText,
  CheckIcon,
  ChevronsUpDownIcon,
  Navigation,
  Route,
  Receipt,
  Upload,
  Image,
  X,
} from "lucide-react";
import { MdEdit } from "react-icons/md";

const LoadDetails = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const loadId = searchParams.get("id") || "ML-2025-001245";
  const activeTab = searchParams.get("tab") || "general";
  const mode = searchParams.get("mode");
  const isViewOnly = mode === "view";
  const isFromDelivered = location.pathname.includes("/delivered/");
  const isFromComplete = location.pathname.includes("/complete/");
  const showPodTab = isFromDelivered || isFromComplete;

  // Sheet states
  const [isChargeSheetOpen, setIsChargeSheetOpen] = useState(false);
  const [isProductSheetOpen, setIsProductSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [chargeFilters, setChargeFilters] = useState([]);

  // Popover open states for edit sheet
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [commodityOpen, setCommodityOpen] = useState(false);
  const [pickupLocationOpen, setPickupLocationOpen] = useState(false);
  const [dropOffLocationOpen, setDropOffLocationOpen] = useState(false);

  // Form data state for edit sheet
  const [formData, setFormData] = useState({
    vehicle: "",
    customer: "",
    commodity: "",
    pickupLocation: "",
    pickupDate: "",
    dropOffLocation: "",
    dropOffDate: "",
  });

  // POD (Proof of Delivery) state
  const [podData, setPodData] = useState({
    ticketNumber: "TKT-78501",
    weight: "24,500 lbs",
    invoiceDate: "2024-12-08",
    invoiceTime: "14:30",
  });
  const [podImages, setPodImages] = useState([
    { id: 1, name: "pod_front.jpg", url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop" },
    { id: 2, name: "pod_signature.jpg", url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop" },
  ]);
  const [isPodUploadSheetOpen, setIsPodUploadSheetOpen] = useState(false);
  const [pendingPodImages, setPendingPodImages] = useState([]);

  const handlePodImageSelect = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        url: URL.createObjectURL(file),
        file: file,
      }));
      setPendingPodImages([...pendingPodImages, ...newImages]);
    }
    // Reset the input
    e.target.value = "";
  };

  const handleRemovePendingImage = (imageId) => {
    setPendingPodImages(pendingPodImages.filter((img) => img.id !== imageId));
  };

  const handleSavePodImages = () => {
    // Add pending images to the main list
    const imagesToAdd = pendingPodImages.map(({ file, ...rest }) => rest);
    setPodImages([...podImages, ...imagesToAdd]);
    setPendingPodImages([]);
    setIsPodUploadSheetOpen(false);
  };

  const handleCancelPodUpload = () => {
    setPendingPodImages([]);
    setIsPodUploadSheetOpen(false);
  };

  const handleRemovePodImage = (imageId) => {
    setPodImages(podImages.filter((img) => img.id !== imageId));
  };

  const handleChargeFiltersChange = useCallback((newFilters) => {
    setChargeFilters(newFilters);
  }, []);

  // Options for searchable selects
  const vehicles = [
    { value: "TRK-2847", label: "TRK-2847", loads: 2, assigned: 0, revenue: 1849.12, expense: 0, status: "unavailable" },
    { value: "TRK-1923", label: "TRK-1923", loads: 5, assigned: 2, revenue: 3250.0, expense: 450.0, status: "partial" },
    { value: "TRK-4521", label: "TRK-4521", loads: 3, assigned: 1, revenue: 2100.5, expense: 125.0, status: "partial" },
    { value: "TRK-7734", label: "TRK-7734", loads: 4, assigned: 0, revenue: 4500.0, expense: 0, status: "available" },
    { value: "TRK-3356", label: "TRK-3356", loads: 1, assigned: 1, revenue: 950.0, expense: 200.0, status: "unavailable" },
    { value: "TRK-5589", label: "TRK-5589", loads: 6, assigned: 3, revenue: 5200.0, expense: 780.0, status: "available" },
  ];

  const getVehicleStatusColor = (status) => {
    switch (status) {
      case "available": return "bg-green-500";
      case "partial": return "bg-orange-500";
      case "unavailable": return "bg-rose-500";
      default: return "bg-gray-400";
    }
  };

  const customers = [
    { value: "Titan", label: "Titan" },
    { value: "Ashgrove", label: "Ashgrove" },
    { value: "TQL", label: "TQL" },
    { value: "Coyote", label: "Coyote" },
    { value: "CH Robinson", label: "CH Robinson" },
  ];

  const commodities = [
    { value: "Cement", label: "Cement" },
    { value: "Sand", label: "Sand" },
    { value: "Flyash", label: "Flyash" },
    { value: "Aggregate", label: "Aggregate" },
    { value: "Limestone", label: "Limestone" },
  ];

  const locations = [
    { value: "1234 Industrial Blvd, Houston, TX 77001", label: "1234 Industrial Blvd, Houston, TX 77001" },
    { value: "5678 Commerce St, Dallas, TX 75201", label: "5678 Commerce St, Dallas, TX 75201" },
    { value: "890 Quarry Rd, Austin, TX 78701", label: "890 Quarry Rd, Austin, TX 78701" },
    { value: "234 Construction Ave, San Antonio, TX 78201", label: "234 Construction Ave, San Antonio, TX 78201" },
    { value: "567 Sand Pit Ln, Fort Worth, TX 76101", label: "567 Sand Pit Ln, Fort Worth, TX 76101" },
  ];

  // Mock load data
  const loadData = {
    loadNo: loadId,
    pickUpNo: "PU-78451",
    vehicle: "TRK-2847",
    customer: "Titan",
    customerContractId: "CTR-TIT-2025-001",
    customerRegion: "South",
    commodity: "Cement",
    rates: "$1,850.00",
    pickup: {
      location: "1234 Industrial Blvd, Houston, TX 77001",
      date: "2024-12-10",
      contactName: "John Smith",
      phone: "(713) 555-0101",
      appointmentTime: "08:00 AM",
      startTime: "08:00 AM",
      endTime: "10:00 AM",
    },
    dropOff: {
      location: "5678 Commerce St, Dallas, TX 75201",
      date: "2024-12-10",
      contactName: "Sarah Johnson",
      phone: "(214) 555-0202",
      appointmentTime: "02:00 PM",
      startTime: "02:00 PM",
      endTime: "04:00 PM",
    },
  };

  const handleOpenEditSheet = () => {
    setFormData({
      vehicle: loadData.vehicle || "",
      customer: loadData.customer || "",
      commodity: loadData.commodity || "",
      pickupLocation: loadData.pickup.location || "",
      pickupDate: loadData.pickup.date || "",
      dropOffLocation: loadData.dropOff.location || "",
      dropOffDate: loadData.dropOff.date || "",
    });
    setIsEditSheetOpen(true);
  };

  const handleSaveEdit = () => {
    console.log("Saving:", formData);
    setIsEditSheetOpen(false);
  };

  // Mock additional charges data
  const additionalCharges = [
    { id: 1, code: "FSC", description: "Fuel Surcharge", unit: "Per Mile", chargeCustomer: "$0.45", payDriver: "Yes", driverRate: "$0.35" },
    { id: 2, code: "DET", description: "Detention Fee", unit: "Per Hour", chargeCustomer: "$75.00", payDriver: "Yes", driverRate: "$50.00" },
    { id: 3, code: "LMP", description: "Lumper Fee", unit: "Flat", chargeCustomer: "$150.00", payDriver: "No", driverRate: "-" },
    { id: 4, code: "LAY", description: "Layover", unit: "Per Day", chargeCustomer: "$250.00", payDriver: "Yes", driverRate: "$200.00" },
    { id: 5, code: "TARP", description: "Tarp Fee", unit: "Flat", chargeCustomer: "$75.00", payDriver: "Yes", driverRate: "$50.00" },
    { id: 6, code: "STOP", description: "Stop Off Charge", unit: "Per Stop", chargeCustomer: "$50.00", payDriver: "Yes", driverRate: "$35.00" },
  ];

  // Filter configuration for additional charges
  const chargeFilterGroups = [
    {
      id: "charge-filters",
      label: "Filter Charges",
      filters: [
        {
          key: "code",
          label: "Code",
          type: "input",
          group: "Basic",
          placeholder: "Search code...",
        },
        {
          key: "description",
          label: "Description",
          type: "input",
          group: "Basic",
          placeholder: "Search description...",
        },
        {
          key: "payDriver",
          label: "Pay Driver",
          type: "select",
          group: "Basic",
          options: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
        },
      ],
    },
  ];

  // Mock product sales data
  const productSales = [
    { id: 1, code: "CEM-I", name: "Cement Type I", unit: "Ton", price: "$85.00", cost: "$65.00" },
    { id: 2, code: "CEM-II", name: "Cement Type II", unit: "Ton", price: "$90.00", cost: "$70.00" },
    { id: 3, code: "CEM-III", name: "Cement Type III", unit: "Ton", price: "$95.00", cost: "$75.00" },
    { id: 4, code: "FLY-A", name: "Flyash Class A", unit: "Ton", price: "$45.00", cost: "$30.00" },
    { id: 5, code: "SLG-100", name: "Slag Grade 100", unit: "Ton", price: "$55.00", cost: "$40.00" },
    { id: 6, code: "AGG-57", name: "Aggregate #57", unit: "Ton", price: "$25.00", cost: "$18.00" },
  ];

  // Filter configuration for product sales
  const [productFilters, setProductFilters] = useState([]);

  const handleProductFiltersChange = useCallback((newFilters) => {
    setProductFilters(newFilters);
  }, []);

  const productFilterGroups = [
    {
      id: "product-filters",
      label: "Filter Products",
      filters: [
        {
          key: "code",
          label: "Code",
          type: "input",
          group: "Basic",
          placeholder: "Search code...",
        },
        {
          key: "name",
          label: "Name",
          type: "input",
          group: "Basic",
          placeholder: "Search name...",
        },
        {
          key: "unit",
          label: "Unit",
          type: "select",
          group: "Basic",
          options: [
            { value: "Ton", label: "Ton" },
            { value: "Yard", label: "Yard" },
            { value: "Bag", label: "Bag" },
          ],
        },
      ],
    },
  ];

  // Audit log data
  const auditLogData = [
    {
      id: 1,
      action: "Load status changed",
      type: "Status",
      oldValue: "On Road",
      newValue: "Delivered",
      actionBy: "John Smith",
      timestamp: "Dec 10, 2024 14:35:22",
    },
    {
      id: 2,
      action: "Drop off location updated",
      type: "Update",
      oldValue: "123 Main St, Dallas, TX",
      newValue: "5678 Commerce St, Dallas, TX 75201",
      actionBy: "Sarah Johnson",
      timestamp: "Dec 10, 2024 09:12:45",
    },
    {
      id: 3,
      action: "Vehicle assigned",
      type: "Update",
      oldValue: "-",
      newValue: "TRK-2847",
      actionBy: "Mike Davis",
      timestamp: "Dec 09, 2024 20:22:34",
    },
    {
      id: 4,
      action: "Load dispatched",
      type: "Status",
      oldValue: "Planning",
      newValue: "Dispatched",
      actionBy: "Sarah Johnson",
      timestamp: "Dec 09, 2024 11:45:18",
    },
    {
      id: 5,
      action: "Rate updated",
      type: "Update",
      oldValue: "$1,650.00",
      newValue: "$1,850.00",
      actionBy: "John Smith",
      timestamp: "Dec 08, 2024 16:30:00",
    },
    {
      id: 6,
      action: "Customer assigned",
      type: "Update",
      oldValue: "-",
      newValue: "Titan",
      actionBy: "Sarah Johnson",
      timestamp: "Dec 08, 2024 10:15:33",
    },
    {
      id: 7,
      action: "Load offered",
      type: "Status",
      oldValue: "Draft",
      newValue: "Offered",
      actionBy: "Mike Davis",
      timestamp: "Dec 08, 2024 08:00:00",
    },
    {
      id: 8,
      action: "Load created",
      type: "Create",
      oldValue: "-",
      newValue: loadId,
      actionBy: "John Smith",
      timestamp: "Dec 07, 2024 09:30:15",
    },
  ];

  // Mock tracking data
  const trackingData = {
    checkDate: "Dec 16, 2024",
    checkTime: "02:45 PM",
    distanceToNext: "127 miles",
    timeToNext: "2h 15m",
    status: "On Road",
    currentLocation: {
      lat: 29.7604,
      lng: -95.3698,
      address: "Houston, TX",
    },
    nextLocation: {
      lat: 32.7767,
      lng: -96.7970,
      address: "Dallas, TX",
    },
  };

  const getTypeBadgeColor = (type) => {
    const colors = {
      Create: "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50",
      Update: "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50",
      Upload: "bg-purple-500/10 hover:bg-purple-500/30 text-purple-700 dark:text-purple-400 border border-purple-500/50",
      Status: "bg-orange-500/10 hover:bg-orange-500/30 text-orange-700 dark:text-orange-400 border border-orange-500/50",
      Verify: "bg-teal-500/10 hover:bg-teal-500/30 text-teal-700 dark:text-teal-400 border border-teal-500/50",
    };
    return colors[type] || "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      Applied: "bg-green-500/10 text-green-700 border-green-500/50",
      Pending: "bg-amber-500/10 text-amber-700 border-amber-500/50",
    };
    return colors[status] || "bg-gray-500/10 text-gray-700 border-gray-500/50";
  };

  // Additional Charges columns
  const chargesColumns = [
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      cell: ({ row }) => (
        <span className="font-mono font-medium">{row.getValue("code")}</span>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
    },
    {
      accessorKey: "unit",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Unit" />
      ),
      cell: ({ row }) => (
        <Badge variant="outline">{row.getValue("unit")}</Badge>
      ),
    },
    {
      accessorKey: "chargeCustomer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Charge Customer" />
      ),
      cell: ({ row }) => (
        <span className="font-medium text-green-600">{row.getValue("chargeCustomer")}</span>
      ),
    },
    {
      accessorKey: "payDriver",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pay Driver" />
      ),
      cell: ({ row }) => {
        const payDriver = row.getValue("payDriver");
        return (
          <Badge className={payDriver === "Yes" ? "bg-green-500/10 text-green-700 border-green-500/50" : "bg-red-500/10 text-red-700 border-red-500/50"}>
            {payDriver}
          </Badge>
        );
      },
    },
    {
      accessorKey: "driverRate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Driver Rate" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("driverRate")}</span>
      ),
    },
  ];

  // Product Sales columns
  const productColumns = [
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      cell: ({ row }) => (
        <span className="font-mono font-medium">{row.getValue("code")}</span>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "unit",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Unit" />
      ),
      cell: ({ row }) => (
        <Badge variant="outline">{row.getValue("unit")}</Badge>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price" />
      ),
      cell: ({ row }) => (
        <span className="font-medium text-green-600">{row.getValue("price")}</span>
      ),
    },
    {
      accessorKey: "cost",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cost" />
      ),
      cell: ({ row }) => (
        <span className="font-medium text-amber-600">{row.getValue("cost")}</span>
      ),
    },
  ];

  // Audit Log columns
  const auditLogColumns = [
    {
      accessorKey: "action",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Operation" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => {
        const type = row.getValue("type");
        return <Badge className={getTypeBadgeColor(type)}>{type}</Badge>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "oldValue",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Old Value" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "newValue",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="New Value" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "actionBy",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Modified By" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "timestamp",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Timestamp" />
      ),
      enableSorting: true,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <Tabs
        defaultValue={activeTab}
        className="w-full h-full flex flex-col overflow-hidden"
      >
        <div className="flex-shrink-0">
          <TabsList className="mb-0 rounded-none">
            <TabsTrigger value="general" className="h-full">
              <Settings className="size-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="additional-charge" className="h-full">
              <DollarSign className="size-4" />
              Additional Charge
            </TabsTrigger>
            <TabsTrigger value="product-sale" className="h-full">
              <ShoppingCart className="size-4" />
              Product Sale
            </TabsTrigger>
            <TabsTrigger value="audit" className="h-full">
              <History className="size-4" />
              Audit Log
            </TabsTrigger>
            {isViewOnly && !showPodTab && (
              <TabsTrigger value="tracking" className="h-full">
                <Navigation className="size-4" />
                Tracking
              </TabsTrigger>
            )}
            {showPodTab && (
              <TabsTrigger value="pod" className="h-full">
                <Receipt className="size-4" />
                POD
              </TabsTrigger>
            )}
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          {/* General Tab */}
          <TabsContent value="general" className="space-y-4 h-full mt-0 px-4 py-4">
            <div className="w-full border rounded-sm bg-card flex flex-col">
              <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FileText className="size-4" />
                  Load Details
                </h3>
                {!isViewOnly && (
                  <button
                    onClick={handleOpenEditSheet}
                    className="text-slate-500 hover:text-foreground transition-colors"
                  >
                    <MdEdit className="size-4" />
                  </button>
                )}
              </div>
              <div className="divide-y divide-border">
                {/* Load Information Section */}
                <div className="grid grid-cols-4 divide-x divide-border">
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Load No</p>
                    <p className="text-sm font-medium text-foreground font-mono">{loadData.loadNo}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Pick Up No</p>
                    <p className="text-sm font-medium text-foreground font-mono">{loadData.pickUpNo}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Vehicle</p>
                    <p className="text-sm font-medium text-foreground">{loadData.vehicle || "-"}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Rates</p>
                    <p className="text-sm font-bold text-green-600">{loadData.rates}</p>
                  </div>
                </div>

                {/* Customer Information Section */}
                <div className="grid grid-cols-4 divide-x divide-border">
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Customer</p>
                    <p className="text-sm font-medium text-foreground">{loadData.customer}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Contract ID</p>
                    <p className="text-sm font-medium text-foreground font-mono">{loadData.customerContractId}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Region</p>
                    <Badge className="bg-purple-500/10 text-purple-700 border-purple-500/50">{loadData.customerRegion}</Badge>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Commodity</p>
                    <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/50">{loadData.commodity}</Badge>
                  </div>
                </div>

                {/* Pickup Section Header */}
                <div className="px-4 py-2 bg-muted/50">
                  <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <MapPin className="size-3 text-green-600" />
                    Pickup Details
                  </p>
                </div>

                {/* Pickup Location */}
                <div className="px-4 py-2.5">
                  <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                  <p className="text-sm font-medium text-foreground">{loadData.pickup.location}</p>
                </div>

                {/* Pickup Details Row */}
                <div className="grid grid-cols-4 divide-x divide-border">
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Date</p>
                    <p className="text-sm font-medium text-foreground">{loadData.pickup.date}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Appointment Time</p>
                    <p className="text-sm font-medium text-foreground">{loadData.pickup.appointmentTime}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Contact Name</p>
                    <p className="text-sm font-medium text-foreground">{loadData.pickup.contactName}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                    <p className="text-sm font-medium text-foreground">{loadData.pickup.phone}</p>
                  </div>
                </div>

                {/* Drop Off Section Header */}
                <div className="px-4 py-2 bg-muted/50">
                  <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <MapPin className="size-3 text-red-600" />
                    Drop Off Details
                  </p>
                </div>

                {/* Drop Off Location */}
                <div className="px-4 py-2.5">
                  <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                  <p className="text-sm font-medium text-foreground">{loadData.dropOff.location}</p>
                </div>

                {/* Drop Off Details Row */}
                <div className="grid grid-cols-4 divide-x divide-border">
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Date</p>
                    <p className="text-sm font-medium text-foreground">{loadData.dropOff.date}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Appointment Time</p>
                    <p className="text-sm font-medium text-foreground">{loadData.dropOff.appointmentTime}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Contact Name</p>
                    <p className="text-sm font-medium text-foreground">{loadData.dropOff.contactName}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                    <p className="text-sm font-medium text-foreground">{loadData.dropOff.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Additional Charge Tab */}
          <TabsContent value="additional-charge" className="h-full mt-0 p-4">
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Upcoming...</p>
            </div>
          </TabsContent>

          {/* Product Sale Tab */}
          <TabsContent value="product-sale" className="h-full mt-0 p-4">
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Upcoming...</p>
            </div>
          </TabsContent>

          {/* Audit Log Tab */}
          <TabsContent value="audit" className="space-y-4 px-4 pb-4 h-full mt-2">
            <DataTable
              columns={auditLogColumns}
              data={auditLogData}
              showViewOptions={false}
            />
          </TabsContent>

          {/* Tracking Tab - Only visible in Dispatch mode, not in Delivered/Complete */}
          {isViewOnly && !showPodTab && (
            <TabsContent value="tracking" className="h-full mt-0 p-4">
              <div className="flex flex-col gap-4 h-full">
                {/* Tracking Info - Horizontal */}
                <div className="border rounded-sm bg-card flex-shrink-0">
                  <div className="grid grid-cols-5 divide-x divide-border">
                    <div className="px-4 py-3">
                      <p className="text-xs text-muted-foreground mb-1">Check Date</p>
                      <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-muted-foreground" />
                        {trackingData.checkDate}
                      </p>
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-xs text-muted-foreground mb-1">Check Time</p>
                      <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                        <Clock className="size-3.5 text-muted-foreground" />
                        {trackingData.checkTime}
                      </p>
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-xs text-muted-foreground mb-1">Distance to Next Location</p>
                      <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                        <Route className="size-3.5 text-muted-foreground" />
                        {trackingData.distanceToNext}
                      </p>
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-xs text-muted-foreground mb-1">Time to Next Location</p>
                      <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                        <Clock className="size-3.5 text-muted-foreground" />
                        {trackingData.timeToNext}
                      </p>
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-xs text-muted-foreground mb-1">Status</p>
                      <Badge className="bg-cyan-500/10 text-cyan-700 border-cyan-500/50">
                        {trackingData.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="flex-1 border rounded-sm bg-card overflow-hidden">
                  <div className="px-4 py-2 border-b bg-muted">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Truck className="size-4 text-primary" />
                      Live Tracking
                    </h3>
                  </div>
                  <div className="h-[calc(100%-41px)]">
                    <iframe
                      title="Live Tracking Map"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${trackingData.currentLocation.lat},${trackingData.currentLocation.lng}&destination=${trackingData.nextLocation.lat},${trackingData.nextLocation.lng}&mode=driving`}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          )}

          {/* POD Tab - Only visible when accessed from Delivered or Complete */}
          {showPodTab && (
            <TabsContent value="pod" className="h-full mt-0 p-4">
              <div className="flex flex-col gap-4">
                {/* POD Information Card */}
                <div className="border rounded-sm bg-card">
                  <div className="grid grid-cols-4 divide-x divide-border">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Ticket Number</p>
                      <p className="text-sm font-medium text-foreground font-mono">{podData.ticketNumber}</p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Weight</p>
                      <p className="text-sm font-medium text-foreground">{podData.weight}</p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Invoice Date</p>
                      <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-muted-foreground" />
                        {podData.invoiceDate}
                      </p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Invoice Time</p>
                      <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                        <Clock className="size-3.5 text-muted-foreground" />
                        {podData.invoiceTime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* POD Images Section */}
                <div className="border rounded-sm bg-card">
                  <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Image className="size-4" />
                      POD Images
                    </h3>
                    {!isFromComplete && (
                      <Button
                        size="sm"
                        className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
                        onClick={() => setIsPodUploadSheetOpen(true)}
                      >
                        <Upload className="size-3" />
                        Upload Image
                      </Button>
                    )}
                  </div>
                  <div className="p-4">
                    {podImages.length > 0 ? (
                      <div className="grid grid-cols-3 gap-4">
                        {podImages.map((image) => (
                          <div key={image.id} className="relative group">
                            <div className="aspect-[4/3] rounded-lg overflow-hidden border bg-muted">
                              <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {!isFromComplete && (
                              <button
                                onClick={() => handleRemovePodImage(image.id)}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="size-3" />
                              </button>
                            )}
                            <p className="mt-1 text-xs text-muted-foreground truncate">{image.name}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                          <Image className="size-8 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">No POD images uploaded</p>
                        <p className="text-xs text-muted-foreground">Click "Upload Image" to add proof of delivery images</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          )}
        </div>
      </Tabs>

      {/* Add Charge Sheet */}
      <Sheet open={isChargeSheetOpen} onOpenChange={setIsChargeSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-lg font-bold text-foreground">
              Add Additional Charge
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-4 mt-4 px-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Charge Type <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select charge type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fuel-surcharge">Fuel Surcharge</SelectItem>
                  <SelectItem value="detention-fee">Detention Fee</SelectItem>
                  <SelectItem value="lumper-fee">Lumper Fee</SelectItem>
                  <SelectItem value="layover">Layover</SelectItem>
                  <SelectItem value="accessorial">Accessorial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Amount <span className="text-red-500">*</span>
              </Label>
              <Input type="number" placeholder="Enter amount" className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Notes</Label>
              <Input placeholder="Enter notes" className="h-10" />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsChargeSheetOpen(false)}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Save
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Add Product Sheet */}
      <Sheet open={isProductSheetOpen} onOpenChange={setIsProductSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-lg font-bold text-foreground">
              Add Product Sale
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-4 mt-4 px-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Product <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cement-type-i">Cement Type I</SelectItem>
                  <SelectItem value="cement-type-ii">Cement Type II</SelectItem>
                  <SelectItem value="cement-type-iii">Cement Type III</SelectItem>
                  <SelectItem value="flyash">Flyash</SelectItem>
                  <SelectItem value="slag">Slag</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Quantity <span className="text-red-500">*</span>
              </Label>
              <Input type="number" placeholder="Enter quantity" className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Unit Price <span className="text-red-500">*</span>
              </Label>
              <Input type="number" placeholder="Enter unit price" className="h-10" />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsProductSheetOpen(false)}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Save
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit Load Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto flex flex-col">
          <SheetHeader className="border-b pb-4">
            <SheetTitle>Edit Load Details</SheetTitle>
          </SheetHeader>

          <div className="flex-1 py-4 px-6 space-y-4 overflow-y-auto">
            {/* Row 1: Load No, Pick Up No */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Load No</Label>
                <Input value={loadData.loadNo} disabled className="h-10 bg-muted" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Pick Up No</Label>
                <Input value={loadData.pickUpNo} disabled className="h-10 bg-muted" />
              </div>
            </div>

            {/* Row 2: Vehicle, Customer */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Vehicle</Label>
                <Popover open={vehicleOpen} onOpenChange={setVehicleOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={vehicleOpen}
                      className="w-full justify-between h-10 font-normal"
                    >
                      {formData.vehicle || "Select vehicle..."}
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start" style={{ width: "var(--radix-popover-trigger-width)" }}>
                    <Command>
                      <CommandInput placeholder="Search vehicle..." />
                      <CommandList>
                        <CommandEmpty>No vehicle found.</CommandEmpty>
                        <CommandGroup className="p-1">
                          {vehicles.map((vehicle) => (
                            <CommandItem
                              key={vehicle.value}
                              value={vehicle.value}
                              onSelect={() => {
                                setFormData({ ...formData, vehicle: vehicle.value });
                                setVehicleOpen(false);
                              }}
                              className={cn(
                                "flex items-center gap-3 w-full p-2 rounded-md cursor-pointer border mb-1",
                                formData.vehicle === vehicle.value ? "border-primary bg-primary/5" : "border-border"
                              )}
                            >
                              <div className={cn("w-1.5 h-8 rounded-full shrink-0", getVehicleStatusColor(vehicle.status))} />
                              <div className="flex items-center justify-between flex-1">
                                <div className="flex flex-col">
                                  <span className="font-medium text-sm">{vehicle.label}</span>
                                  <span className="text-xs text-muted-foreground">{vehicle.loads} Loads</span>
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className={cn("text-xs font-medium", vehicle.assigned === 0 ? "text-rose-600" : "text-green-600")}>
                                    {vehicle.assigned} Assigned
                                  </span>
                                  <div className="flex items-center gap-2 text-xs">
                                    <span className="text-rose-600">${vehicle.expense.toFixed(2)}</span>
                                    <span className="text-green-600">${vehicle.revenue.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Customer</Label>
                <Popover open={customerOpen} onOpenChange={setCustomerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={customerOpen}
                      className="w-full justify-between h-10 font-normal"
                    >
                      {formData.customer || "Select customer..."}
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search customer..." />
                      <CommandList>
                        <CommandEmpty>No customer found.</CommandEmpty>
                        <CommandGroup>
                          {customers.map((customer) => (
                            <CommandItem
                              key={customer.value}
                              value={customer.value}
                              onSelect={() => {
                                setFormData({ ...formData, customer: customer.value });
                                setCustomerOpen(false);
                              }}
                            >
                              <CheckIcon className={cn("mr-2 h-4 w-4", formData.customer === customer.value ? "opacity-100" : "opacity-0")} />
                              {customer.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Row 3: Customer Contract ID, Customer Region */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Customer Contract ID</Label>
                <Input value={loadData.customerContractId} disabled className="h-10 bg-muted" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Customer Region</Label>
                <Input value={loadData.customerRegion} disabled className="h-10 bg-muted" />
              </div>
            </div>

            {/* Row 4: Commodity, Rates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Commodity</Label>
                <Popover open={commodityOpen} onOpenChange={setCommodityOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={commodityOpen}
                      className="w-full justify-between h-10 font-normal"
                    >
                      {formData.commodity || "Select commodity..."}
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search commodity..." />
                      <CommandList>
                        <CommandEmpty>No commodity found.</CommandEmpty>
                        <CommandGroup>
                          {commodities.map((commodity) => (
                            <CommandItem
                              key={commodity.value}
                              value={commodity.value}
                              onSelect={() => {
                                setFormData({ ...formData, commodity: commodity.value });
                                setCommodityOpen(false);
                              }}
                            >
                              <CheckIcon className={cn("mr-2 h-4 w-4", formData.commodity === commodity.value ? "opacity-100" : "opacity-0")} />
                              {commodity.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Rates</Label>
                <Input value={loadData.rates} disabled className="h-10 bg-muted" />
              </div>
            </div>

            {/* Pickup Section */}
            <div className="space-y-4 border rounded-lg p-4">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="size-4 text-green-600" />
                Pickup Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Pickup Location</Label>
                  <Popover open={pickupLocationOpen} onOpenChange={setPickupLocationOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={pickupLocationOpen}
                        className="w-full justify-between h-10 font-normal"
                      >
                        <span className="truncate">{formData.pickupLocation || "Select location..."}</span>
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search location..." />
                        <CommandList>
                          <CommandEmpty>No location found.</CommandEmpty>
                          <CommandGroup>
                            {locations.map((location) => (
                              <CommandItem
                                key={location.value}
                                value={location.value}
                                onSelect={() => {
                                  setFormData({ ...formData, pickupLocation: location.value });
                                  setPickupLocationOpen(false);
                                }}
                              >
                                <CheckIcon className={cn("mr-2 h-4 w-4", formData.pickupLocation === location.value ? "opacity-100" : "opacity-0")} />
                                {location.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Pickup Date</Label>
                  <Input
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                    className="h-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Contact Name</Label>
                  <Input value={loadData.pickup.contactName} disabled className="h-10 bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Phone</Label>
                  <Input value={loadData.pickup.phone} disabled className="h-10 bg-muted" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Appointment Time</Label>
                  <Input value={loadData.pickup.appointmentTime} disabled className="h-10 bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Start Time</Label>
                  <Input value={loadData.pickup.startTime} disabled className="h-10 bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">End Time</Label>
                  <Input value={loadData.pickup.endTime} disabled className="h-10 bg-muted" />
                </div>
              </div>
            </div>

            {/* Drop Off Section */}
            <div className="space-y-4 border rounded-lg p-4">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="size-4 text-red-600" />
                Drop Off Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Drop Off Location</Label>
                  <Popover open={dropOffLocationOpen} onOpenChange={setDropOffLocationOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={dropOffLocationOpen}
                        className="w-full justify-between h-10 font-normal"
                      >
                        <span className="truncate">{formData.dropOffLocation || "Select location..."}</span>
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search location..." />
                        <CommandList>
                          <CommandEmpty>No location found.</CommandEmpty>
                          <CommandGroup>
                            {locations.map((location) => (
                              <CommandItem
                                key={location.value}
                                value={location.value}
                                onSelect={() => {
                                  setFormData({ ...formData, dropOffLocation: location.value });
                                  setDropOffLocationOpen(false);
                                }}
                              >
                                <CheckIcon className={cn("mr-2 h-4 w-4", formData.dropOffLocation === location.value ? "opacity-100" : "opacity-0")} />
                                {location.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Drop Off Date</Label>
                  <Input
                    type="date"
                    value={formData.dropOffDate}
                    onChange={(e) => setFormData({ ...formData, dropOffDate: e.target.value })}
                    className="h-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Contact Name</Label>
                  <Input value={loadData.dropOff.contactName} disabled className="h-10 bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Phone</Label>
                  <Input value={loadData.dropOff.phone} disabled className="h-10 bg-muted" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Appointment Time</Label>
                  <Input value={loadData.dropOff.appointmentTime} disabled className="h-10 bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Start Time</Label>
                  <Input value={loadData.dropOff.startTime} disabled className="h-10 bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">End Time</Label>
                  <Input value={loadData.dropOff.endTime} disabled className="h-10 bg-muted" />
                </div>
              </div>
            </div>
          </div>

          <SheetFooter className="border-t pt-4 px-6">
            <div className="flex gap-3 w-full">
              <Button variant="outline" className="flex-1" onClick={() => setIsEditSheetOpen(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                onClick={handleSaveEdit}
              >
                Save Changes
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* POD Image Upload Sheet */}
      <Sheet open={isPodUploadSheetOpen} onOpenChange={setIsPodUploadSheetOpen}>
        <SheetContent className="sm:max-w-lg overflow-y-auto flex flex-col">
          <SheetHeader className="border-b pb-4">
            <SheetTitle className="flex items-center gap-2">
              <Upload className="size-5" />
              Upload POD Images
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 py-4 px-6 space-y-4 overflow-y-auto">
            {/* Drop Zone */}
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
              <label className="cursor-pointer block">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handlePodImageSelect}
                />
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                    <Upload className="size-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Click to upload images</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, JPEG up to 10MB each</p>
                  </div>
                </div>
              </label>
            </div>

            {/* Pending Images Preview */}
            {pendingPodImages.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">Selected Images ({pendingPodImages.length})</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground hover:text-destructive"
                    onClick={() => setPendingPodImages([])}
                  >
                    Clear All
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {pendingPodImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <div className="aspect-[4/3] rounded-lg overflow-hidden border bg-muted">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => handleRemovePendingImage(image.id)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                      >
                        <X className="size-3" />
                      </button>
                      <p className="mt-1.5 text-xs text-muted-foreground truncate">{image.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {pendingPodImages.length === 0 && (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">No images selected yet</p>
              </div>
            )}
          </div>

          <SheetFooter className="border-t pt-4 px-6">
            <div className="flex gap-3 w-full">
              <Button variant="outline" className="flex-1" onClick={handleCancelPodUpload}>
                Cancel
              </Button>
              <Button
                className="flex-1 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                onClick={handleSavePodImages}
                disabled={pendingPodImages.length === 0}
              >
                Upload {pendingPodImages.length > 0 && `(${pendingPodImages.length})`}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default LoadDetails;
