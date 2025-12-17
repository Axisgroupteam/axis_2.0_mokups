import { useState, useCallback } from "react";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
  MapPin,
  Calendar,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  Globe,
  Plus,
  MessageSquare,
  MessageCircle,
  FileEdit,
  Truck,
  Forward,
  Save,
  Send,
  ChevronsUpDown,
  Check,
  Loader2,
  CheckCircle2,
  XCircle as XCircleIcon,
  User,
  CreditCard,
  DollarSign,
  ClipboardCheck,
  PartyPopper,
  Bug,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Lightbulb,
  Info,
  History,
  Clock,
  ArrowRight,
  Package,
  FileCheck,
  Handshake,
  CircleDot,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Orders = () => {
  const [filters, setFilters] = useState([]);
  const [isNewLoadOpen, setIsNewLoadOpen] = useState(false);
  const [isEditLoadOpen, setIsEditLoadOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [fleetTypeOpen, setFleetTypeOpen] = useState(false);
  const [selectedFleetType, setSelectedFleetType] = useState("");
  const [commodityOpen, setCommodityOpen] = useState(false);
  const [selectedCommodity, setSelectedCommodity] = useState("");

  // Edit form states
  const [editCustomerOpen, setEditCustomerOpen] = useState(false);
  const [editSelectedCustomer, setEditSelectedCustomer] = useState("");
  const [editFleetTypeOpen, setEditFleetTypeOpen] = useState(false);
  const [editSelectedFleetType, setEditSelectedFleetType] = useState("");
  const [editCommodityOpen, setEditCommodityOpen] = useState(false);
  const [editSelectedCommodity, setEditSelectedCommodity] = useState("");

  // Source detail modal states
  const [isSourceDetailOpen, setIsSourceDetailOpen] = useState(false);
  const [sourceDetailType, setSourceDetailType] = useState("");
  const [sourceDetailData, setSourceDetailData] = useState(null);

  // Load history sheet states
  const [isLoadHistoryOpen, setIsLoadHistoryOpen] = useState(false);
  const [selectedLoadForHistory, setSelectedLoadForHistory] = useState(null);

  // Handle load history click
  const handleLoadHistoryClick = (load) => {
    setSelectedLoadForHistory(load);
    setIsLoadHistoryOpen(true);
  };

  // Mock load history data
  const getLoadHistory = (load) => {
    const baseHistory = [
      {
        id: 1,
        action: "Load Created",
        status: "Draft",
        timestamp: "Dec 10, 2025 09:15 AM",
        user: "John Smith",
        icon: Package,
        color: "text-blue-600",
        bgColor: "bg-blue-100 dark:bg-blue-900/50",
      },
    ];

    if (load?.status === "Draft") {
      return baseHistory;
    }

    if (load?.status === "Validation Failed") {
      return [
        ...baseHistory,
        {
          id: 2,
          action: "Sent for Validation",
          status: "Pending",
          timestamp: "Dec 10, 2025 10:30 AM",
          user: "John Smith",
          icon: Send,
          color: "text-purple-600",
          bgColor: "bg-purple-100 dark:bg-purple-900/50",
        },
        {
          id: 3,
          action: "Validation Failed",
          status: "Failed",
          timestamp: "Dec 10, 2025 10:31 AM",
          user: "AI Validator",
          details: "Credit limit exceeded",
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-100 dark:bg-red-900/50",
        },
      ];
    }

    if (load?.status === "Offered") {
      return [
        ...baseHistory,
        {
          id: 2,
          action: "Sent for Validation",
          status: "Pending",
          timestamp: "Dec 10, 2025 10:30 AM",
          user: "John Smith",
          icon: Send,
          color: "text-purple-600",
          bgColor: "bg-purple-100 dark:bg-purple-900/50",
        },
        {
          id: 3,
          action: "Validation Passed",
          status: "Validated",
          timestamp: "Dec 10, 2025 10:31 AM",
          user: "AI Validator",
          icon: FileCheck,
          color: "text-green-600",
          bgColor: "bg-green-100 dark:bg-green-900/50",
        },
        {
          id: 4,
          action: "Offered to Trucking",
          status: "Offered",
          timestamp: "Dec 10, 2025 10:32 AM",
          user: "System",
          icon: Truck,
          color: "text-blue-600",
          bgColor: "bg-blue-100 dark:bg-blue-900/50",
        },
      ];
    }

    if (load?.status === "Released") {
      return [
        ...baseHistory,
        {
          id: 2,
          action: "Sent for Validation",
          status: "Pending",
          timestamp: "Dec 10, 2025 10:30 AM",
          user: "John Smith",
          icon: Send,
          color: "text-purple-600",
          bgColor: "bg-purple-100 dark:bg-purple-900/50",
        },
        {
          id: 3,
          action: "Validation Passed",
          status: "Validated",
          timestamp: "Dec 10, 2025 10:31 AM",
          user: "AI Validator",
          icon: FileCheck,
          color: "text-green-600",
          bgColor: "bg-green-100 dark:bg-green-900/50",
        },
        {
          id: 4,
          action: "Offered to Trucking",
          status: "Offered",
          timestamp: "Dec 10, 2025 10:32 AM",
          user: "System",
          icon: Truck,
          color: "text-blue-600",
          bgColor: "bg-blue-100 dark:bg-blue-900/50",
        },
        {
          id: 5,
          action: "Accepted by Trucking",
          status: "Accepted",
          timestamp: "Dec 10, 2025 11:45 AM",
          user: "Mike Johnson",
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-100 dark:bg-green-900/50",
        },
        {
          id: 6,
          action: "Released for Dispatch",
          status: "Released",
          timestamp: "Dec 10, 2025 02:15 PM",
          user: "Mike Johnson",
          icon: Handshake,
          color: "text-emerald-600",
          bgColor: "bg-emerald-100 dark:bg-emerald-900/50",
        },
      ];
    }

    return baseHistory;
  };

  // Handle source click (Email or Text)
  const handleSourceClick = (source, loadData) => {
    setSourceDetailType(source);
    setSourceDetailData(loadData);
    setIsSourceDetailOpen(true);
  };


  // Validation states
  const [isValidationOpen, setIsValidationOpen] = useState(false);
  const [validationStep, setValidationStep] = useState(0);
  const [validationResults, setValidationResults] = useState([]);
  const [isValidating, setIsValidating] = useState(false);
  const [validationComplete, setValidationComplete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [forceFailValidation, setForceFailValidation] = useState(false);

  // Validation checks configuration with detailed failure messages
  const validationChecks = [
    {
      id: "customer",
      label: "Customer Active",
      icon: User,
      passRate: 0.95,
      failureTitle: "Customer Account Inactive",
      failureDescription: "The selected customer account is currently marked as inactive in the system.",
      failureDetails: [
        "Account was deactivated on Dec 1, 2024",
        "Reason: Non-payment of invoices",
        "Outstanding balance: $12,450.00"
      ],
      resolution: "Contact the customer or accounting team to resolve the account status before proceeding."
    },
    {
      id: "credit",
      label: "Credit Check",
      icon: CreditCard,
      passRate: 0.85,
      failureTitle: "Credit Limit Exceeded",
      failureDescription: "This order would exceed the customer's available credit limit.",
      failureDetails: [
        "Current credit limit: $50,000.00",
        "Current balance: $47,800.00",
        "Available credit: $2,200.00",
        "This order value: $8,500.00"
      ],
      resolution: "Request a credit limit increase or collect payment on outstanding invoices."
    },
    {
      id: "rate",
      label: "Rate Card Valid",
      icon: DollarSign,
      passRate: 0.9,
      failureTitle: "Rate Card Expired",
      failureDescription: "The rate card associated with this customer has expired.",
      failureDetails: [
        "Rate card ID: RC-2024-0892",
        "Expired on: Nov 30, 2024",
        "Last negotiated rate: $3.25/mile"
      ],
      resolution: "Negotiate a new rate card with the customer or apply standard rates."
    },
    {
      id: "equipment",
      label: "Equipment Available",
      icon: Truck,
      passRate: 0.88,
      failureTitle: "No Equipment Available",
      failureDescription: "No suitable equipment is available for the requested pickup date and location.",
      failureDetails: [
        "Requested: Flatbed trailer",
        "Pickup location: Houston, TX",
        "Pickup date: Jan 29, 2025",
        "Nearest available unit: 145 miles away"
      ],
      resolution: "Consider adjusting the pickup date or forwarding to brokerage for external carrier coverage."
    },
  ];

  // Track expanded failure cards
  const [expandedFailures, setExpandedFailures] = useState([]);

  const toggleFailureExpanded = (id) => {
    setExpandedFailures(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Start validation process
  const startValidation = () => {
    setIsValidationOpen(true);
    setIsValidating(true);
    setValidationStep(0);
    setValidationResults([]);
    setValidationComplete(false);
    setShowSuccess(false);

    // Simulate AI validation (runs all checks in background)
    setTimeout(() => {
      const results = validationChecks.map((check, index) => ({
        ...check,
        passed: forceFailValidation ? (index < 2 ? false : true) : Math.random() < check.passRate,
      }));

      const allPassed = results.every((r) => r.passed);
      const failedResults = results.filter((r) => !r.passed);

      setValidationResults(failedResults);
      setIsValidating(false);
      setValidationComplete(true);

      if (allPassed) {
        setShowSuccess(true);
        setTimeout(() => {
          setIsValidationOpen(false);
          setIsNewLoadOpen(false);
          // Reset form states
          setSelectedCustomer("");
          setSelectedFleetType("");
          setSelectedCommodity("");
          // Reset validation states
          setValidationStep(0);
          setValidationResults([]);
          setValidationComplete(false);
          setShowSuccess(false);
        }, 3000);
      }
    }, 2500); // AI validation takes ~2.5 seconds
  };

  // Handle validation complete
  const handleValidationClose = () => {
    setIsValidationOpen(false);

    // Reset validation states
    setValidationStep(0);
    setValidationResults([]);
    setValidationComplete(false);
    setExpandedFailures([]);
  };

  // Customer data for combobox
  const customers = [
    { value: "abc-logistics", label: "ABC Logistics" },
    { value: "metro-materials", label: "Metro Materials" },
    { value: "buildright-construction", label: "BuildRight Construction" },
    { value: "premier-precast", label: "Premier Precast" },
    { value: "texas-steel-co", label: "Texas Steel Co" },
    { value: "gulf-coast-materials", label: "Gulf Coast Materials" },
    { value: "mountain-west-trucking", label: "Mountain West Trucking" },
    { value: "coastal-transport-llc", label: "Coastal Transport LLC" },
    { value: "southwest-aggregates", label: "Southwest Aggregates" },
    { value: "lone-star-concrete", label: "Lone Star Concrete" },
    { value: "rocky-mountain-supply", label: "Rocky Mountain Supply" },
  ];

  // Fleet types
  const fleetTypes = [
    { value: "flatbed", label: "Flatbed" },
    { value: "pneumatic", label: "Pneumatic" },
    { value: "walking-floor", label: "Walking Floor" },
  ];

  // Commodities based on fleet type
  const commoditiesByFleetType = {
    flatbed: [
      { value: "steel-beams", label: "Steel Beams" },
      { value: "lumber", label: "Lumber" },
      { value: "machinery", label: "Machinery" },
      { value: "equipment", label: "Equipment" },
      { value: "building-materials", label: "Building Materials" },
      { value: "pipes", label: "Pipes" },
      { value: "precast-concrete", label: "Precast Concrete" },
    ],
    pneumatic: [
      { value: "cement", label: "Cement" },
      { value: "flyash", label: "Flyash" },
      { value: "sand", label: "Sand" },
      { value: "ite", label: "ITE" },
      { value: "slag", label: "Slag" },
      { value: "calcium", label: "Calcium" },
      { value: "flour", label: "Flour" },
    ],
    "walking-floor": [
      { value: "wood-chips", label: "Wood Chips" },
      { value: "mulch", label: "Mulch" },
      { value: "recycled-materials", label: "Recycled Materials" },
      { value: "grain", label: "Grain" },
      { value: "feed", label: "Feed" },
      { value: "sawdust", label: "Sawdust" },
    ],
  };

  // Get commodities based on selected fleet type
  const availableCommodities = selectedFleetType
    ? commoditiesByFleetType[selectedFleetType] || []
    : [];

  // Get commodities for edit form based on selected fleet type
  const editAvailableCommodities = editSelectedFleetType
    ? commoditiesByFleetType[editSelectedFleetType] || []
    : [];

  // Handle edit load
  const handleEditLoad = (load) => {
    setSelectedLoad(load);
    // Pre-fill the form with load data
    const customerValue = customers.find(c => c.label === load.customer)?.value || "";
    setEditSelectedCustomer(customerValue);
    // For fleet type and commodity, we'd need to map from the data
    setEditSelectedFleetType(load.fleetType?.toLowerCase() || "");
    setEditSelectedCommodity("");
    setIsEditLoadOpen(true);
  };

  // Filter configuration
  const filterGroups = [
    {
      id: "orders-filters",
      label: "Filter Orders",
      filters: [
        {
          key: "customer",
          label: "Customer",
          type: "input",
          group: "Basic",
          placeholder: "Search customer...",
        },
        {
          key: "origin",
          label: "Origin",
          type: "input",
          group: "Basic",
          placeholder: "Search origin...",
        },
        {
          key: "destination",
          label: "Destination",
          type: "input",
          group: "Basic",
          placeholder: "Search destination...",
        },
        {
          key: "source",
          label: "Source",
          type: "select",
          group: "Basic",
          options: [
            { value: "Call", label: "Call" },
            { value: "Email", label: "Email" },
            { value: "Portal", label: "Portal" },
            { value: "Text", label: "Text" },
          ],
        },
        {
          key: "fleetType",
          label: "Fleet Type",
          type: "select",
          group: "Basic",
          options: [
            { value: "Flatbed", label: "Flatbed" },
            { value: "Pneumatic", label: "Pneumatic" },
            { value: "Walking Floor", label: "Walking Floor" },
          ],
        },
        {
          key: "pickup",
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

  const ordersData = [
    {
      id: 1,
      loadId: "ML-2025-001234",
      customer: "ABC Logistics",
      origin: "Houston, TX",
      destination: "Phoenix, AZ",
      pickup: "2024-01-29",
      dropoff: "2024-01-31",
      source: "Call",
      fleetType: "Flatbed",
      status: "Draft",
    },
    {
      id: 2,
      loadId: "ML-2025-001235",
      customer: "Metro Materials",
      origin: "Dallas, TX",
      destination: "Oklahoma City, OK",
      pickup: "2024-01-29",
      dropoff: "2024-01-30",
      source: "Email",
      fleetType: "Pneumatic",
      status: "Offered",
    },
    {
      id: 3,
      loadId: "ML-2025-001236",
      customer: "BuildRight Construction",
      origin: "Austin, TX",
      destination: "San Antonio, TX",
      pickup: "2024-01-30",
      dropoff: "2024-01-30",
      source: "Portal",
      fleetType: "Walking Floor",
      status: "Released",
    },
    {
      id: 4,
      loadId: "ML-2025-001237",
      customer: "Premier Precast",
      origin: "El Paso, TX",
      destination: "Albuquerque, NM",
      pickup: "2024-01-30",
      dropoff: "2024-02-01",
      source: "Call",
      fleetType: "Flatbed",
      status: "Validation Failed",
    },
    {
      id: 5,
      loadId: "ML-2025-001238",
      customer: "Texas Steel Co",
      origin: "Fort Worth, TX",
      destination: "Tulsa, OK",
      pickup: "2024-01-31",
      dropoff: "2024-02-01",
      source: "Email",
      fleetType: "Flatbed",
      status: "Draft",
    },
    {
      id: 6,
      loadId: "ML-2025-001239",
      customer: "Gulf Coast Materials",
      origin: "Corpus Christi, TX",
      destination: "Houston, TX",
      pickup: "2024-01-31",
      dropoff: "2024-01-31",
      source: "Portal",
      fleetType: "Pneumatic",
      status: "Offered",
    },
    {
      id: 7,
      loadId: "ML-2025-001240",
      customer: "Mountain West Trucking",
      origin: "Denver, CO",
      destination: "Salt Lake City, UT",
      pickup: "2024-02-01",
      dropoff: "2024-02-02",
      source: "Call",
      fleetType: "Walking Floor",
      status: "Released",
    },
    {
      id: 8,
      loadId: "ML-2025-001241",
      customer: "Coastal Transport LLC",
      origin: "New Orleans, LA",
      destination: "Mobile, AL",
      pickup: "2024-02-01",
      dropoff: "2024-02-01",
      source: "Email",
      fleetType: "Flatbed",
      status: "Draft",
    },
    {
      id: 9,
      loadId: "ML-2025-001242",
      customer: "Southwest Aggregates",
      origin: "Phoenix, AZ",
      destination: "Las Vegas, NV",
      pickup: "2024-02-02",
      dropoff: "2024-02-03",
      source: "Text",
      fleetType: "Pneumatic",
      status: "Validation Failed",
    },
    {
      id: 10,
      loadId: "ML-2025-001243",
      customer: "Lone Star Concrete",
      origin: "San Antonio, TX",
      destination: "Laredo, TX",
      pickup: "2024-02-02",
      dropoff: "2024-02-02",
      source: "Text",
      fleetType: "Flatbed",
      status: "Offered",
    },
    {
      id: 11,
      loadId: "ML-2025-001244",
      customer: "Rocky Mountain Supply",
      origin: "Denver, CO",
      destination: "Cheyenne, WY",
      pickup: "2024-02-03",
      dropoff: "2024-02-03",
      source: "Text",
      fleetType: "Walking Floor",
      status: "Released",
    },
  ];

  const getSourceBadge = (source, loadData = null) => {
    const config = {
      Call: {
        color: "bg-blue-500/10 text-blue-700 border-blue-500/50",
        icon: <Phone className="size-3" />,
        clickable: false,
      },
      Email: {
        color: "bg-purple-500/10 text-purple-700 border-purple-500/50",
        icon: <Mail className="size-3" />,
        clickable: true,
      },
      Portal: {
        color: "bg-green-500/10 text-green-700 border-green-500/50",
        icon: <Globe className="size-3" />,
        clickable: false,
      },
      Text: {
        color: "bg-amber-500/10 text-amber-700 border-amber-500/50",
        icon: <MessageCircle className="size-3" />,
        clickable: true,
      },
    };
    const { color, icon, clickable } = config[source] || {};

    if (clickable && loadData) {
      return (
        <Badge
          className={`${color} flex items-center gap-1 cursor-pointer hover:opacity-80 underline`}
          onClick={(e) => {
            e.stopPropagation();
            handleSourceClick(source, loadData);
          }}
        >
          {icon}
          {source}
        </Badge>
      );
    }

    return (
      <Badge className={`${color} flex items-center gap-1`}>
        {icon}
        {source}
      </Badge>
    );
  };

  const getFleetTypeBadge = (fleetType) => {
    const colors = {
      Flatbed: "bg-orange-500/10 text-orange-700 border-orange-500/50",
      Pneumatic: "bg-cyan-500/10 text-cyan-700 border-cyan-500/50",
      "Walking Floor": "bg-indigo-500/10 text-indigo-700 border-indigo-500/50",
    };
    return <Badge className={colors[fleetType] || ""}>{fleetType}</Badge>;
  };

  const getStatusBadge = (status) => {
    const colors = {
      Draft: "bg-amber-500/10 text-amber-700 border-amber-500/50",
      Offered: "bg-blue-500/10 text-blue-700 border-blue-500/50",
      Released: "bg-green-500/10 text-green-700 border-green-500/50",
      "Validation Failed": "bg-red-500/10 text-red-700 border-red-500/50",
    };
    return <Badge className={colors[status] || ""}>{status}</Badge>;
  };

  const columns = [
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const status = row.original.status;
        const canEdit = status === "Draft" || status === "Validation Failed";

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
              {canEdit && (
                <DropdownMenuItem onClick={() => handleEditLoad(row.original)}>
                  <FileEdit className="size-4 mr-2" />
                  Edit Load
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: "loadId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Load ID" />
      ),
      cell: ({ row }) => (
        <button
          onClick={() => handleLoadHistoryClick(row.original)}
          className="font-mono text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
        >
          {row.getValue("loadId")}
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
      accessorKey: "customer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("customer")}</span>
      ),
    },
    {
      accessorKey: "source",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Source" />
      ),
      cell: ({ row }) => getSourceBadge(row.getValue("source"), row.original),
    },
    {
      accessorKey: "origin",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Origin" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <MapPin className="size-3 text-green-600" />
          {row.getValue("origin")}
        </div>
      ),
    },
    {
      accessorKey: "destination",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Destination" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <MapPin className="size-3 text-red-600" />
          {row.getValue("destination")}
        </div>
      ),
    },
    {
      accessorKey: "fleetType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fleet Type" />
      ),
      cell: ({ row }) => getFleetTypeBadge(row.getValue("fleetType")),
    },
    {
      accessorKey: "pickup",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pickup" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="size-3 text-muted-foreground" />
          {row.getValue("pickup")}
        </div>
      ),
    },
    {
      accessorKey: "dropoff",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Drop Off" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="size-3 text-muted-foreground" />
          {row.getValue("dropoff")}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden p-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-amber-600 mb-1">
            <FileEdit className="size-4" />
            <span className="text-xs">Draft</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">5</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <Truck className="size-4" />
            <span className="text-xs">Accepted By Trucking</span>
          </div>
          <p className="text-2xl font-bold text-green-600">12</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-red-600 mb-1">
            <XCircle className="size-4" />
            <span className="text-xs">Declined By Trucking</span>
          </div>
          <p className="text-2xl font-bold text-red-600">3</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Forward className="size-4" />
            <span className="text-xs">Orders Forwarded To Brokerage</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">8</p>
        </div>
      </div>

      {/* Header with filter and button */}
      <div className="flex items-center justify-between mb-4">
        <SmartFilter
          filterGroups={filterGroups}
          onFiltersChange={handleFiltersChange}
        />
        <div className="flex items-center gap-4">
          {/* Test toggle for forcing validation failure */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-orange-300 bg-orange-50 dark:bg-orange-950/30 dark:border-orange-700">
            <Bug className="size-4 text-orange-600" />
            <span className="text-xs text-orange-700 dark:text-orange-400">Force Fail</span>
            <Switch
              checked={forceFailValidation}
              onCheckedChange={setForceFailValidation}
              className="data-[state=checked]:bg-orange-500"
            />
          </div>
          <Button
            className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            onClick={() => setIsNewLoadOpen(true)}
          >
            <Plus className="size-4 mr-2" />
            New Load
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={ordersData} showViewOptions={false} />

      {/* New Load Sheet */}
      <Sheet open={isNewLoadOpen} onOpenChange={setIsNewLoadOpen}>
        <SheetContent className="sm:max-w-2xl flex flex-col h-full">
          <SheetHeader className="border-b pb-4">
            <SheetTitle className="text-xl font-semibold">Add New Load</SheetTitle>
          </SheetHeader>

          {/* Form Content Area */}
          <div className="flex-1 overflow-y-auto py-2 px-4 min-h-0">
            <div className="space-y-4">
              {/* Customer Select */}
              <div className="space-y-2">
                <Label htmlFor="customer">Customer</Label>
                <Popover open={customerOpen} onOpenChange={setCustomerOpen} modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={customerOpen}
                      className="w-full justify-between"
                    >
                      {selectedCustomer
                        ? customers.find((customer) => customer.value === selectedCustomer)?.label
                        : "Select customer..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="p-0"
                    align="start"
                    style={{ width: "var(--radix-popover-trigger-width)" }}
                  >
                    <Command>
                      <CommandInput placeholder="Search customer..." />
                      <CommandList>
                        <CommandEmpty>No customer found.</CommandEmpty>
                        <CommandGroup>
                          {customers.map((customer) => (
                            <CommandItem
                              key={customer.value}
                              value={customer.value}
                              onSelect={(currentValue) => {
                                setSelectedCustomer(currentValue === selectedCustomer ? "" : currentValue);
                                setCustomerOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedCustomer === customer.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {customer.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Fleet Type and Commodity - Side by Side */}
              <div className="grid grid-cols-2 gap-4">
                {/* Fleet Type Select */}
                <div className="space-y-2">
                  <Label htmlFor="fleetType">Fleet Type</Label>
                  <Popover open={fleetTypeOpen} onOpenChange={setFleetTypeOpen} modal={true}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={fleetTypeOpen}
                        className="w-full justify-between"
                      >
                        {selectedFleetType
                          ? fleetTypes.find((type) => type.value === selectedFleetType)?.label
                          : "Select fleet type..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0"
                      align="start"
                      style={{ width: "var(--radix-popover-trigger-width)" }}
                    >
                      <Command>
                        <CommandInput placeholder="Search fleet type..." />
                        <CommandList>
                          <CommandEmpty>No fleet type found.</CommandEmpty>
                          <CommandGroup>
                            {fleetTypes.map((type) => (
                              <CommandItem
                                key={type.value}
                                value={type.value}
                                onSelect={(currentValue) => {
                                  setSelectedFleetType(currentValue === selectedFleetType ? "" : currentValue);
                                  setSelectedCommodity(""); // Reset commodity when fleet type changes
                                  setFleetTypeOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedFleetType === type.value ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {type.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Commodity Select */}
                <div className="space-y-2">
                  <Label htmlFor="commodity">Commodity</Label>
                  <Popover open={commodityOpen} onOpenChange={setCommodityOpen} modal={true}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={commodityOpen}
                        className="w-full justify-between"
                        disabled={!selectedFleetType}
                      >
                        {selectedCommodity
                          ? availableCommodities.find((c) => c.value === selectedCommodity)?.label
                          : "Select commodity..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0"
                      align="start"
                      style={{ width: "var(--radix-popover-trigger-width)" }}
                    >
                      <Command>
                        <CommandInput placeholder="Search commodity..." />
                        <CommandList>
                          <CommandEmpty>No commodity found.</CommandEmpty>
                          <CommandGroup>
                            {availableCommodities.map((commodity) => (
                              <CommandItem
                                key={commodity.value}
                                value={commodity.value}
                                onSelect={(currentValue) => {
                                  setSelectedCommodity(currentValue === selectedCommodity ? "" : currentValue);
                                  setCommodityOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedCommodity === commodity.value ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {commodity.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Origin Details */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Origin Details</Label>
                <div className="border rounded-lg p-4 space-y-4">
                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="originAddress">Address</Label>
                    <Input id="originAddress" placeholder="Enter address..." />
                  </div>

                  {/* City, State, Zip Code - 3 columns */}
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

                  {/* Latitude and Longitude - 2 columns */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="originLat">Latitude</Label>
                      <Input id="originLat" placeholder="Latitude" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="originLng">Longitude</Label>
                      <Input id="originLng" placeholder="Longitude" />
                    </div>
                  </div>

                  {/* Contact Name, Phone, Pickup Appointment Time - 3 columns */}
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
                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="destAddress">Address</Label>
                    <Input id="destAddress" placeholder="Enter address..." />
                  </div>

                  {/* City, State, Zip Code - 3 columns */}
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

                  {/* Latitude and Longitude - 2 columns */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="destLat">Latitude</Label>
                      <Input id="destLat" placeholder="Latitude" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destLng">Longitude</Label>
                      <Input id="destLng" placeholder="Longitude" />
                    </div>
                  </div>

                  {/* Contact Name, Phone, Delivery Appointment Time - 3 columns */}
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

              {/* Dates/Times */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Dates/Times</Label>
                <div className="border rounded-lg p-4 space-y-4">
                  {/* Pickup Window - Date, Start Time, End Time */}
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

                  {/* Delivery Deadline - Date, Start Time, End Time */}
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
          </div>

          {/* Footer with buttons */}
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
                onClick={startValidation}
              >
                <Send className="size-4 mr-2" />
                Send to Trucking
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Edit Load Sheet */}
      <Sheet open={isEditLoadOpen} onOpenChange={setIsEditLoadOpen}>
        <SheetContent className="sm:max-w-2xl flex flex-col h-full">
          <SheetHeader className="border-b pb-4">
            <SheetTitle className="text-xl font-semibold">
              Edit Load {selectedLoad?.loadId && <span className="font-mono text-muted-foreground">({selectedLoad.loadId})</span>}
            </SheetTitle>
          </SheetHeader>

          {/* Form Content Area */}
          <div className="flex-1 overflow-y-auto py-2 px-4 min-h-0">
            <div className="space-y-4">
              {/* Customer Select */}
              <div className="space-y-2">
                <Label htmlFor="editCustomer">Customer</Label>
                <Popover open={editCustomerOpen} onOpenChange={setEditCustomerOpen} modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={editCustomerOpen}
                      className="w-full justify-between"
                    >
                      {editSelectedCustomer
                        ? customers.find((customer) => customer.value === editSelectedCustomer)?.label
                        : "Select customer..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="p-0"
                    align="start"
                    style={{ width: "var(--radix-popover-trigger-width)" }}
                  >
                    <Command>
                      <CommandInput placeholder="Search customer..." />
                      <CommandList>
                        <CommandEmpty>No customer found.</CommandEmpty>
                        <CommandGroup>
                          {customers.map((customer) => (
                            <CommandItem
                              key={customer.value}
                              value={customer.value}
                              onSelect={(currentValue) => {
                                setEditSelectedCustomer(currentValue === editSelectedCustomer ? "" : currentValue);
                                setEditCustomerOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  editSelectedCustomer === customer.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {customer.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Fleet Type and Commodity - Side by Side */}
              <div className="grid grid-cols-2 gap-4">
                {/* Fleet Type Select */}
                <div className="space-y-2">
                  <Label htmlFor="editFleetType">Fleet Type</Label>
                  <Popover open={editFleetTypeOpen} onOpenChange={setEditFleetTypeOpen} modal={true}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={editFleetTypeOpen}
                        className="w-full justify-between"
                      >
                        {editSelectedFleetType
                          ? fleetTypes.find((type) => type.value === editSelectedFleetType)?.label
                          : "Select fleet type..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0"
                      align="start"
                      style={{ width: "var(--radix-popover-trigger-width)" }}
                    >
                      <Command>
                        <CommandInput placeholder="Search fleet type..." />
                        <CommandList>
                          <CommandEmpty>No fleet type found.</CommandEmpty>
                          <CommandGroup>
                            {fleetTypes.map((type) => (
                              <CommandItem
                                key={type.value}
                                value={type.value}
                                onSelect={(currentValue) => {
                                  setEditSelectedFleetType(currentValue === editSelectedFleetType ? "" : currentValue);
                                  setEditSelectedCommodity(""); // Reset commodity when fleet type changes
                                  setEditFleetTypeOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    editSelectedFleetType === type.value ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {type.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Commodity Select */}
                <div className="space-y-2">
                  <Label htmlFor="editCommodity">Commodity</Label>
                  <Popover open={editCommodityOpen} onOpenChange={setEditCommodityOpen} modal={true}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={editCommodityOpen}
                        className="w-full justify-between"
                        disabled={!editSelectedFleetType}
                      >
                        {editSelectedCommodity
                          ? editAvailableCommodities.find((c) => c.value === editSelectedCommodity)?.label
                          : "Select commodity..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0"
                      align="start"
                      style={{ width: "var(--radix-popover-trigger-width)" }}
                    >
                      <Command>
                        <CommandInput placeholder="Search commodity..." />
                        <CommandList>
                          <CommandEmpty>No commodity found.</CommandEmpty>
                          <CommandGroup>
                            {editAvailableCommodities.map((commodity) => (
                              <CommandItem
                                key={commodity.value}
                                value={commodity.value}
                                onSelect={(currentValue) => {
                                  setEditSelectedCommodity(currentValue === editSelectedCommodity ? "" : currentValue);
                                  setEditCommodityOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    editSelectedCommodity === commodity.value ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {commodity.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Origin Details */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Origin Details</Label>
                <div className="border rounded-lg p-4 space-y-4">
                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="editOriginAddress">Address</Label>
                    <Input id="editOriginAddress" placeholder="Enter address..." defaultValue={selectedLoad?.origin || ""} />
                  </div>

                  {/* City, State, Zip Code - 3 columns */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editOriginCity">City</Label>
                      <Input id="editOriginCity" placeholder="City" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editOriginState">State</Label>
                      <Input id="editOriginState" placeholder="State" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editOriginZip">Zip Code</Label>
                      <Input id="editOriginZip" placeholder="Zip Code" />
                    </div>
                  </div>

                  {/* Latitude and Longitude - 2 columns */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editOriginLat">Latitude</Label>
                      <Input id="editOriginLat" placeholder="Latitude" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editOriginLng">Longitude</Label>
                      <Input id="editOriginLng" placeholder="Longitude" />
                    </div>
                  </div>

                  {/* Contact Name, Phone, Pickup Appointment Time - 3 columns */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editOriginContact">Contact Name</Label>
                      <Input id="editOriginContact" placeholder="Contact name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editOriginPhone">Phone</Label>
                      <Input id="editOriginPhone" placeholder="Phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editOriginPickupTime">Appointment Time</Label>
                      <Input id="editOriginPickupTime" type="time" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Destination Details */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Destination Details</Label>
                <div className="border rounded-lg p-4 space-y-4">
                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="editDestAddress">Address</Label>
                    <Input id="editDestAddress" placeholder="Enter address..." defaultValue={selectedLoad?.destination || ""} />
                  </div>

                  {/* City, State, Zip Code - 3 columns */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editDestCity">City</Label>
                      <Input id="editDestCity" placeholder="City" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editDestState">State</Label>
                      <Input id="editDestState" placeholder="State" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editDestZip">Zip Code</Label>
                      <Input id="editDestZip" placeholder="Zip Code" />
                    </div>
                  </div>

                  {/* Latitude and Longitude - 2 columns */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editDestLat">Latitude</Label>
                      <Input id="editDestLat" placeholder="Latitude" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editDestLng">Longitude</Label>
                      <Input id="editDestLng" placeholder="Longitude" />
                    </div>
                  </div>

                  {/* Contact Name, Phone, Delivery Appointment Time - 3 columns */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editDestContact">Contact Name</Label>
                      <Input id="editDestContact" placeholder="Contact name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editDestPhone">Phone</Label>
                      <Input id="editDestPhone" placeholder="Phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editDestDeliveryTime">Appointment Time</Label>
                      <Input id="editDestDeliveryTime" type="time" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dates/Times */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Dates/Times</Label>
                <div className="border rounded-lg p-4 space-y-4">
                  {/* Pickup Window - Date, Start Time, End Time */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editPickupDate">Pickup Date</Label>
                      <Input id="editPickupDate" type="date" defaultValue={selectedLoad?.pickup || ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editPickupStartTime">Start Time</Label>
                      <Input id="editPickupStartTime" type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editPickupEndTime">End Time</Label>
                      <Input id="editPickupEndTime" type="time" />
                    </div>
                  </div>

                  {/* Delivery Deadline - Date, Start Time, End Time */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editDeliveryDate">Delivery Date</Label>
                      <Input id="editDeliveryDate" type="date" defaultValue={selectedLoad?.dropoff || ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editDeliveryStartTime">Start Time</Label>
                      <Input id="editDeliveryStartTime" type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editDeliveryEndTime">End Time</Label>
                      <Input id="editDeliveryEndTime" type="time" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="editNotes">Notes</Label>
                <Textarea
                  id="editNotes"
                  placeholder="Enter any additional notes or appointment requirements..."
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Footer with buttons */}
          <SheetFooter className="flex-shrink-0 border-t pt-4">
            <div className="grid grid-cols-3 gap-3 w-full">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsEditLoadOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="outline" className="w-full">
                <Save className="size-4 mr-2" />
                Save as Draft
              </Button>
              <Button
                className="w-full bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                onClick={startValidation}
              >
                <Send className="size-4 mr-2" />
                Send to Trucking
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Validation Dialog */}
      <Dialog open={isValidationOpen} onOpenChange={setIsValidationOpen}>
        <DialogContent
          className={cn(
            "transition-all duration-300 z-[100]",
            validationComplete && validationResults.length > 0 ? "sm:max-w-3xl" : "sm:max-w-md"
          )}
          overlayClassName="z-[100]"
        >
          {isValidating ? (
            // AI Agent Loading State
            <div className="flex flex-col items-center justify-center py-10 space-y-6">
              <div className="relative">
                {/* Outer pulsing rings */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-ping" style={{ animationDuration: "2s" }} />
                <div className="absolute inset-2 rounded-full border-2 border-blue-400/40 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />

                {/* Main icon container */}
                <div className="relative size-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <ClipboardCheck className="size-10 text-white" />
                </div>

                {/* Orbiting dot */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "2s" }}>
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 size-3 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Validating Order</h3>
                <p className="text-sm text-muted-foreground">AI agent is reviewing your load details...</p>
              </div>

              {/* Animated dots */}
              <div className="flex items-center gap-1">
                <div className="size-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="size-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="size-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          ) : showSuccess ? (
            // Success State
            <div className="flex flex-col items-center justify-center py-10 space-y-5">
              <div className="relative">
                <div className="absolute -inset-3 bg-green-400/20 rounded-full animate-ping" style={{ animationDuration: "1.5s" }} />
                <div className="relative size-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <CheckCircle2 className="size-10 text-white" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-green-600">Successfully Transferred!</h3>
                <p className="text-sm text-muted-foreground">Load has been sent to Trucking for processing</p>
              </div>
            </div>
          ) : validationComplete && validationResults.length > 0 ? (
            // Failed Validation - Professional expandable view
            <div className="flex flex-col">
              {/* Header */}
              <div className="flex items-start gap-4 pb-4 border-b pr-8 -mx-6 px-6">
                <div className="size-12 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="size-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-foreground">Validation Failed</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {validationResults.length} issue{validationResults.length > 1 ? 's' : ''} found that need{validationResults.length === 1 ? 's' : ''} to be resolved before this load can be sent to trucking.
                  </p>
                </div>
              </div>

              {/* Scrollable content area */}
              <ScrollArea className="max-h-[50vh] py-4">
                <div className="space-y-3 pr-4">
                {validationResults.map((result) => {
                  const IconComponent = result.icon;
                  const isExpanded = expandedFailures.includes(result.id);

                  return (
                    <div
                      key={result.id}
                      className="rounded-lg border border-red-200 dark:border-red-800 overflow-hidden"
                    >
                      {/* Clickable header */}
                      <button
                        onClick={() => toggleFailureExpanded(result.id)}
                        className="w-full flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors text-left"
                      >
                        <div className="size-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="size-5 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-red-700 dark:text-red-400">{result.failureTitle}</p>
                          <p className="text-sm text-red-600/80 dark:text-red-400/80 truncate">{result.failureDescription}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-red-500 dark:text-red-400">
                            {isExpanded ? 'Hide details' : 'View details'}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="size-5 text-red-500" />
                          ) : (
                            <ChevronDown className="size-5 text-red-500" />
                          )}
                        </div>
                      </button>

                      {/* Expandable details */}
                      {isExpanded && (
                        <div className="border-t border-red-200 dark:border-red-800 bg-white dark:bg-background p-4 space-y-4">
                          {/* Details list */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                              <Info className="size-4" />
                              Details
                            </div>
                            <ul className="space-y-1.5 pl-6">
                              {result.failureDetails.map((detail, idx) => (
                                <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                                  <span className="size-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Resolution */}
                          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3">
                            <div className="flex items-start gap-2">
                              <Lightbulb className="size-4 text-amber-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-amber-800 dark:text-amber-400">Suggested Resolution</p>
                                <p className="text-sm text-amber-700 dark:text-amber-500 mt-1">{result.resolution}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                </div>
              </ScrollArea>

              {/* Footer */}
              <div className="pt-4 border-t -mx-6 px-6 flex justify-end">
                <Button
                  onClick={handleValidationClose}
                  className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  Close
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Source Detail Modal (Email/Text) */}
      <Dialog open={isSourceDetailOpen} onOpenChange={setIsSourceDetailOpen}>
        <DialogContent className="sm:max-w-xl">
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b -mx-6 px-6">
            <div className={cn(
              "size-10 rounded-full flex items-center justify-center",
              sourceDetailType === "Email"
                ? "bg-purple-500/10"
                : "bg-amber-500/10"
            )}>
              {sourceDetailType === "Email" ? (
                <Mail className="size-5 text-purple-600" />
              ) : (
                <MessageCircle className="size-5 text-amber-600" />
              )}
            </div>
            <h2 className="text-lg font-semibold">
              {sourceDetailType === "Email" ? "Email Details" : "Text Message Details"}
            </h2>
          </div>

          {sourceDetailData && (
            <div className="space-y-4 py-4">
              {/* Message Content */}
              {sourceDetailType === "Email" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">From</p>
                      <p className="text-sm">dispatch@{sourceDetailData.customer?.toLowerCase().replace(/\s+/g, '')}.com</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Received</p>
                      <p className="text-sm">Dec 10, 2025 at 9:32 AM</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Message</p>
                    <div className="p-4 bg-purple-500/5 rounded-lg border border-purple-500/20 text-sm space-y-3">
                      <p>Hi,</p>
                      <p>We need to schedule a {sourceDetailData.fleetType?.toLowerCase()} load from {sourceDetailData.origin} to {sourceDetailData.destination}.</p>
                      <p>Pickup date: {sourceDetailData.pickup}<br/>Delivery date: {sourceDetailData.dropoff}</p>
                      <p>Please confirm availability and provide a rate quote at your earliest convenience.</p>
                      <p className="pt-2 text-muted-foreground">Best regards,<br/>Dispatch Team<br/>{sourceDetailData.customer}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">From</p>
                      <p className="text-sm">+1 (555) 123-4567</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Received</p>
                      <p className="text-sm">Dec 10, 2025 at 10:15 AM</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Message</p>
                    <div className="p-4 bg-amber-500/5 rounded-lg border border-amber-500/20 text-sm">
                      <p>Need {sourceDetailData.fleetType?.toLowerCase()} from {sourceDetailData.origin} to {sourceDetailData.destination}. PU: {sourceDetailData.pickup}, DEL: {sourceDetailData.dropoff}. Can you cover? Reply w/ rate. - {sourceDetailData.customer}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="pt-4 border-t -mx-6 px-6 flex justify-end">
            <Button
              onClick={() => setIsSourceDetailOpen(false)}
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Load History Sheet */}
      <Sheet open={isLoadHistoryOpen} onOpenChange={setIsLoadHistoryOpen}>
        <SheetContent className="sm:max-w-md flex flex-col h-full p-0">
          {/* Header */}
          <div className="px-6 py-4 border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <span className="font-mono text-base font-semibold">{selectedLoadForHistory?.loadId}</span>
              {selectedLoadForHistory && getStatusBadge(selectedLoadForHistory.status)}
            </div>
            {selectedLoadForHistory && (
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <span>{selectedLoadForHistory.origin}</span>
                <ArrowRight className="size-3" />
                <span>{selectedLoadForHistory.destination}</span>
              </div>
            )}
          </div>

          {/* Content */}
          {selectedLoadForHistory && (
            <ScrollArea className="flex-1">
              <div className="px-6 py-4">
                {/* Timeline */}
                <div className="relative">
                  {getLoadHistory(selectedLoadForHistory).map((event, index, arr) => {
                    const IconComponent = event.icon;
                    const isLast = index === arr.length - 1;
                    return (
                      <div key={event.id} className="flex gap-4 pb-6 last:pb-0">
                        {/* Left side - icon and line */}
                        <div className="flex flex-col items-center">
                          <div className={`size-8 rounded-full ${event.bgColor} flex items-center justify-center shrink-0`}>
                            <IconComponent className={`size-4 ${event.color}`} />
                          </div>
                          {!isLast && (
                            <div className="w-0.5 flex-1 bg-border mt-2" />
                          )}
                        </div>
                        {/* Right side - content */}
                        <div className="flex-1 pt-1">
                          <p className="text-sm font-medium">{event.action}</p>
                          {event.details && (
                            <p className="text-xs text-red-600 mt-0.5">{event.details}</p>
                          )}
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span>{event.timestamp}</span>
                            <span>•</span>
                            <span>{event.user}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollArea>
          )}

          {/* Footer */}
          <div className="px-6 py-4 border-t mt-auto">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsLoadHistoryOpen(false)}
            >
              Close
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Orders;
