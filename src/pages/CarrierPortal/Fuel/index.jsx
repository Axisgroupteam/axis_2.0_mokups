import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlusIcon,
  MoreHorizontalIcon,
  PencilIcon,
  CreditCardIcon,
  BanIcon,
  UserIcon,
  ReceiptIcon,
  AlertTriangleIcon,
  RefreshCwIcon,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

const FuelCards = () => {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [filters, setFilters] = useState([]);
  const [formData, setFormData] = useState({
    cardNumber: "",
    platform: "",
    driverId: "",
    driverName: "",
    entityType: "",
    pricingModel: "",
    dailyLimit: "",
    weeklyLimit: "",
    monthlyLimit: "",
    status: "Active",
  });

  // Pricing models with applicable entity types
  const pricingModels = [
    {
      id: 1,
      name: "Company Driver Tiered",
      type: "Tiered (Score)",
      formula: "Cost + Tier %",
      applicableEntities: ["Company Driver"],
    },
    {
      id: 2,
      name: "Owner-Operator Standard",
      type: "Cost-Plus (%)",
      formula: "Cost + 8%",
      applicableEntities: ["Owner-Operator"],
    },
    {
      id: 3,
      name: "Franchise Ceiling Rate",
      type: "Cost-Plus (%)",
      formula: "Cost + 8%",
      applicableEntities: ["Franchise Driver"],
    },
    {
      id: 4,
      name: "Carrier Fuel Advance",
      type: "Cost-Plus (%)",
      formula: "Cost + 10%",
      applicableEntities: ["Carrier"],
    },
    {
      id: 5,
      name: "Fixed Rate Program",
      type: "Fixed Rate",
      formula: "$3.25/gal",
      applicableEntities: ["Company Driver", "Owner-Operator"],
    },
    {
      id: 6,
      name: "Pump Discount - Standard",
      type: "Pump Discount (Flat)",
      formula: "Pump - $0.15",
      applicableEntities: ["Company Driver", "Owner-Operator", "Franchise Driver"],
    },
    {
      id: 7,
      name: "Per-Mile Allowance",
      type: "Per-Mile",
      formula: "$0.52/mile",
      applicableEntities: ["Owner-Operator"],
    },
    {
      id: 8,
      name: "Volume Discount Program",
      type: "Pump Discount (%)",
      formula: "Pump - 3%",
      applicableEntities: ["Carrier"],
    },
  ];

  // Get applicable pricing models for selected entity type
  const getApplicablePricingModels = (entityType) => {
    if (!entityType) return [];
    return pricingModels.filter((model) =>
      model.applicableEntities.includes(entityType)
    );
  };

  // Mock data for fuel cards - all cards in one array
  const fuelCards = [
    {
      id: 1,
      cardNumber: "7089-4521-8834-0012",
      platform: "EFS",
      driverId: "DRV-001",
      driverName: "John Smith",
      entityType: "Company Driver",
      pricingModel: "Company Driver Tiered",
      status: "Active",
      dailyLimit: 500,
      weeklyLimit: 2500,
      monthlyLimit: 10000,
      currentBalance: 8234.50,
      lastUsedDate: "2025-01-15",
      lastUsedLocation: "Love's Travel Stop, Dallas TX",
      issuedDate: "2024-06-15",
      expirationDate: "2027-06-15",
    },
    {
      id: 2,
      cardNumber: "7089-4521-8834-0023",
      platform: "Commdata",
      driverId: "DRV-002",
      driverName: "Maria Garcia",
      entityType: "Owner-Operator",
      pricingModel: "Owner-Operator Standard",
      status: "Active",
      dailyLimit: 750,
      weeklyLimit: 3500,
      monthlyLimit: 15000,
      currentBalance: 12450.00,
      lastUsedDate: "2025-01-14",
      lastUsedLocation: "Pilot Flying J, Houston TX",
      issuedDate: "2024-03-20",
      expirationDate: "2027-03-20",
    },
    {
      id: 3,
      cardNumber: "7089-4521-8834-0034",
      platform: "Relay",
      driverId: "DRV-003",
      driverName: "Robert Johnson",
      entityType: "Franchise Driver",
      pricingModel: "Franchise Ceiling Rate",
      status: "Active",
      dailyLimit: 400,
      weeklyLimit: 2000,
      monthlyLimit: 8000,
      currentBalance: 5670.25,
      lastUsedDate: "2025-01-13",
      lastUsedLocation: "TA Travel Center, Atlanta GA",
      issuedDate: "2024-09-10",
      expirationDate: "2027-09-10",
    },
    {
      id: 4,
      cardNumber: "7089-4521-8834-0045",
      platform: "EFS",
      driverId: "DRV-004",
      driverName: "Sarah Williams",
      entityType: "Company Driver",
      pricingModel: "Fixed Rate Program",
      status: "Suspended",
      dailyLimit: 500,
      weeklyLimit: 2500,
      monthlyLimit: 10000,
      currentBalance: 3200.00,
      lastUsedDate: "2025-01-10",
      lastUsedLocation: "Loves Travel Stop, Phoenix AZ",
      issuedDate: "2024-01-05",
      expirationDate: "2027-01-05",
    },
    {
      id: 5,
      cardNumber: "7089-4521-8834-0056",
      platform: "Commdata",
      driverId: "DRV-005",
      driverName: "Michael Brown",
      entityType: "Owner-Operator",
      pricingModel: "Per-Mile Allowance",
      status: "Lost",
      dailyLimit: 600,
      weeklyLimit: 3000,
      monthlyLimit: 12000,
      currentBalance: 0,
      lastUsedDate: "2025-01-08",
      lastUsedLocation: "Petro Stopping Center, Memphis TN",
      issuedDate: "2023-11-15",
      expirationDate: "2026-11-15",
    },
    {
      id: 6,
      cardNumber: "7089-4521-8834-0067",
      platform: "Relay",
      driverId: "DRV-006",
      driverName: "Emily Davis",
      entityType: "Franchise Driver",
      pricingModel: "Pump Discount - Standard",
      status: "Active",
      dailyLimit: 450,
      weeklyLimit: 2250,
      monthlyLimit: 9000,
      currentBalance: 7890.75,
      lastUsedDate: "2025-01-15",
      lastUsedLocation: "QuikTrip, Oklahoma City OK",
      issuedDate: "2024-07-22",
      expirationDate: "2027-07-22",
    },
    {
      id: 7,
      cardNumber: "7089-4521-8834-0078",
      platform: "EFS",
      driverId: "DRV-007",
      driverName: "David Martinez",
      entityType: "Company Driver",
      pricingModel: "Company Driver Tiered",
      status: "Expired",
      dailyLimit: 500,
      weeklyLimit: 2500,
      monthlyLimit: 10000,
      currentBalance: 0,
      lastUsedDate: "2024-12-01",
      lastUsedLocation: "Sapp Bros, Denver CO",
      issuedDate: "2021-12-15",
      expirationDate: "2024-12-15",
    },
    {
      id: 8,
      cardNumber: "7089-4521-8834-0089",
      platform: "Commdata",
      driverId: "DRV-008",
      driverName: "Jennifer Wilson",
      entityType: "Owner-Operator",
      pricingModel: "Owner-Operator Standard",
      status: "Active",
      dailyLimit: 800,
      weeklyLimit: 4000,
      monthlyLimit: 16000,
      currentBalance: 14320.50,
      lastUsedDate: "2025-01-15",
      lastUsedLocation: "Buc-ee's, San Antonio TX",
      issuedDate: "2024-02-28",
      expirationDate: "2027-02-28",
    },
    {
      id: 9,
      cardNumber: "7089-4521-8834-0090",
      platform: "EFS",
      driverId: "DRV-009",
      driverName: "Carlos Rodriguez",
      entityType: "Company Driver",
      pricingModel: "Company Driver Tiered",
      status: "Pending",
      dailyLimit: 500,
      weeklyLimit: 2500,
      monthlyLimit: 10000,
      currentBalance: 0,
      lastUsedDate: null,
      lastUsedLocation: null,
      issuedDate: null,
      expirationDate: null,
    },
    {
      id: 10,
      cardNumber: "7089-4521-8834-0091",
      platform: "Commdata",
      driverId: "DRV-010",
      driverName: "Amanda Thompson",
      entityType: "Owner-Operator",
      pricingModel: "Fixed Rate Program",
      status: "Pending",
      dailyLimit: 750,
      weeklyLimit: 3500,
      monthlyLimit: 15000,
      currentBalance: 0,
      lastUsedDate: null,
      lastUsedLocation: null,
      issuedDate: null,
      expirationDate: null,
    },
    {
      id: 11,
      cardNumber: "7089-4521-8834-0092",
      platform: "Relay",
      driverId: "DRV-011",
      driverName: "Kevin Lee",
      entityType: "Franchise Driver",
      pricingModel: "Franchise Ceiling Rate",
      status: "Pending",
      dailyLimit: 400,
      weeklyLimit: 2000,
      monthlyLimit: 8000,
      currentBalance: 0,
      lastUsedDate: null,
      lastUsedLocation: null,
      issuedDate: null,
      expirationDate: null,
    },
  ];

  const platforms = ["EFS", "Commdata", "Relay"];
  const entityTypes = ["Company Driver", "Owner-Operator", "Franchise Driver", "Carrier"];
  const statusOptions = ["Active", "Pending", "Suspended", "Lost", "Expired"];

  // Calculate counts for summary cards
  const activeCount = fuelCards.filter((c) => c.status === "Active").length;
  const pendingCount = fuelCards.filter((c) => c.status === "Pending").length;
  const suspendedCount = fuelCards.filter((c) => c.status === "Suspended").length;
  const lostCount = fuelCards.filter((c) => c.status === "Lost").length;
  const expiredCount = fuelCards.filter((c) => c.status === "Expired").length;

  const handleInputChange = (field, value) => {
    if (field === "entityType") {
      // Auto-select first applicable pricing model when entity type changes
      const applicableModels = getApplicablePricingModels(value);
      const defaultModel = applicableModels.length > 0 ? applicableModels[0].name : "";
      setFormData((prev) => ({
        ...prev,
        entityType: value,
        pricingModel: defaultModel,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    setEditingCard(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      cardNumber: "",
      platform: "",
      driverId: "",
      driverName: "",
      entityType: "",
      pricingModel: "",
      dailyLimit: "",
      weeklyLimit: "",
      monthlyLimit: "",
      status: "Active",
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setEditingCard(null);
    resetForm();
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData({
      cardNumber: card.cardNumber,
      platform: card.platform,
      driverId: card.driverId,
      driverName: card.driverName,
      entityType: card.entityType,
      pricingModel: card.pricingModel,
      dailyLimit: card.dailyLimit.toString(),
      weeklyLimit: card.weeklyLimit.toString(),
      monthlyLimit: card.monthlyLimit.toString(),
      status: card.status,
    });
    setIsSheetOpen(true);
  };

  const handleAddNew = () => {
    setEditingCard(null);
    resetForm();
    setIsSheetOpen(true);
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      Active: "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50",
      Suspended: "bg-amber-500/10 hover:bg-amber-500/30 text-amber-700 dark:text-amber-400 border border-amber-500/50",
      Lost: "bg-red-500/10 hover:bg-red-500/30 text-red-700 dark:text-red-400 border border-red-500/50",
      Expired: "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50",
      Pending: "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50",
    };
    return colors[status] || "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  const getPlatformBadgeColor = (platform) => {
    const colors = {
      EFS: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/50",
      Commdata: "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/50",
      Relay: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/50",
    };
    return colors[platform] || "bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const maskCardNumber = (cardNumber) => {
    const parts = cardNumber.split("-");
    return `****-****-****-${parts[3]}`;
  };

  const filterGroups = [
    {
      id: "card-filters",
      label: "Filter Cards",
      filters: [
        {
          key: "cardNumber",
          label: "Card Number",
          type: "input",
          group: "Basic",
          placeholder: "Search card number...",
        },
        {
          key: "driverName",
          label: "Driver",
          type: "input",
          group: "Basic",
          placeholder: "Search driver name...",
        },
        {
          key: "platform",
          label: "Platform",
          type: "select",
          group: "Basic",
          options: platforms.map((p) => ({ label: p, value: p })),
        },
        {
          key: "entityType",
          label: "Entity Type",
          type: "select",
          group: "Basic",
          options: entityTypes.map((e) => ({ label: e, value: e })),
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: statusOptions.map((s) => ({ label: s, value: s })),
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
    console.log("Active filters:", newFilters);
  }, []);

  // Columns for the unified table
  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => {
        const card = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <div className="px-2 py-1.5 border-b mb-1">
                <p className="font-medium text-sm">{maskCardNumber(card.cardNumber)}</p>
                <p className="text-xs text-muted-foreground">{card.driverName}</p>
              </div>
              {card.status === "Active" && (
                <>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => handleEdit(card)}>
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Edit Limits
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <ReceiptIcon className="h-4 w-4 mr-2" />
                    View Transactions
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <UserIcon className="h-4 w-4 mr-2" />
                    Reassign Driver
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-amber-600">
                    <BanIcon className="h-4 w-4 mr-2" />
                    Suspend Card
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-600">
                    <AlertTriangleIcon className="h-4 w-4 mr-2" />
                    Report Lost/Stolen
                  </DropdownMenuItem>
                </>
              )}
              {card.status === "Pending" && (
                <>
                  <DropdownMenuItem className="cursor-pointer text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Request
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-600">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Request
                  </DropdownMenuItem>
                </>
              )}
              {card.status === "Suspended" && (
                <>
                  <DropdownMenuItem className="cursor-pointer text-green-600">
                    <RefreshCwIcon className="h-4 w-4 mr-2" />
                    Reactivate Card
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <ReceiptIcon className="h-4 w-4 mr-2" />
                    View Transactions
                  </DropdownMenuItem>
                </>
              )}
              {card.status === "Lost" && (
                <>
                  <DropdownMenuItem className="cursor-pointer">
                    <CreditCardIcon className="h-4 w-4 mr-2" />
                    Issue Replacement
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <ReceiptIcon className="h-4 w-4 mr-2" />
                    View Transactions
                  </DropdownMenuItem>
                </>
              )}
              {card.status === "Expired" && (
                <>
                  <DropdownMenuItem className="cursor-pointer">
                    <RefreshCwIcon className="h-4 w-4 mr-2" />
                    Renew Card
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <ReceiptIcon className="h-4 w-4 mr-2" />
                    View Transactions
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "cardNumber",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Card Number" />,
      cell: ({ row }) => {
        const cardNumber = row.getValue("cardNumber");
        return (
          <div className="flex items-center gap-2">
            <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono text-sm">{maskCardNumber(cardNumber)}</span>
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "driverName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Driver" />,
      cell: ({ row }) => {
        const card = row.original;
        return (
          <div>
            <p className="font-medium">{card.driverName}</p>
            <p className="text-xs text-muted-foreground">{card.driverId}</p>
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "platform",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Platform" />,
      cell: ({ row }) => {
        const platform = row.getValue("platform");
        return <Badge className={getPlatformBadgeColor(platform)}>{platform}</Badge>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "entityType",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Entity Type" />,
      enableSorting: true,
    },
    {
      accessorKey: "pricingModel",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Pricing Model" />,
      cell: ({ row }) => {
        const model = row.getValue("pricingModel");
        const pricingModelData = pricingModels.find((m) => m.name === model);
        return (
          <div>
            <p className="text-sm font-medium">{model}</p>
            {pricingModelData && (
              <p className="text-xs text-muted-foreground">{pricingModelData.formula}</p>
            )}
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "dailyLimit",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Daily Limit" />,
      cell: ({ row }) => formatCurrency(row.getValue("dailyLimit")),
      enableSorting: true,
    },
    {
      accessorKey: "currentBalance",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Balance" />,
      cell: ({ row }) => {
        const balance = row.getValue("currentBalance");
        if (balance === 0 || balance === null) return "-";
        return (
          <span className="font-medium text-green-600 dark:text-green-400">
            {formatCurrency(balance)}
          </span>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "lastUsedDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Last Used" />,
      cell: ({ row }) => {
        const card = row.original;
        if (!card.lastUsedDate) return <span className="text-muted-foreground">-</span>;
        return (
          <div>
            <p className="text-sm">{formatDate(card.lastUsedDate)}</p>
            <p className="text-xs text-muted-foreground truncate max-w-[150px]">{card.lastUsedLocation}</p>
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.getValue("status");
        return <Badge className={getStatusBadgeColor(status)}>{status}</Badge>;
      },
      enableSorting: true,
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="px-6 py-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-5 gap-4 mb-4">
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-2 text-green-600 mb-1">
              <CheckCircle className="size-4" />
              <span className="text-xs">Active</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{activeCount}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <Clock className="size-4" />
              <span className="text-xs">Pending</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{pendingCount}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-2 text-amber-600 mb-1">
              <BanIcon className="size-4" />
              <span className="text-xs">Suspended</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">{suspendedCount}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-2 text-red-600 mb-1">
              <AlertCircle className="size-4" />
              <span className="text-xs">Lost</span>
            </div>
            <p className="text-2xl font-bold text-red-600">{lostCount}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <XCircle className="size-4" />
              <span className="text-xs">Expired</span>
            </div>
            <p className="text-2xl font-bold text-gray-600">{expiredCount}</p>
          </div>
        </div>

        {/* Filter and Actions Row */}
        <div className="flex items-center justify-between mb-1">
          <SmartFilter filterGroups={filterGroups} onFiltersChange={handleFiltersChange} />
          <Button
            onClick={handleAddNew}
            className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Request New Card
          </Button>
        </div>

        {/* Data Table */}
        <DataTable columns={columns} data={fuelCards} showViewOptions={false} />
      </div>

      {/* Add/Edit Card Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingCard ? "Edit Card Limits" : "Request New Fuel Card"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4 px-6">
            {!editingCard && (
              <>
                {/* Driver Selection */}
                <div className="space-y-2">
                  <Label htmlFor="driverName" className="text-sm font-medium text-foreground">
                    Driver Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="driverName"
                    type="text"
                    placeholder="Enter driver name"
                    value={formData.driverName}
                    onChange={(e) => handleInputChange("driverName", e.target.value)}
                    className="h-10"
                    required
                  />
                </div>

                {/* Platform */}
                <div className="space-y-2">
                  <Label htmlFor="platform" className="text-sm font-medium text-foreground">
                    Platform <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.platform}
                    onValueChange={(value) => handleInputChange("platform", value)}
                  >
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((platform) => (
                        <SelectItem key={platform} value={platform}>
                          {platform}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Entity Type */}
                <div className="space-y-2">
                  <Label htmlFor="entityType" className="text-sm font-medium text-foreground">
                    Entity Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.entityType}
                    onValueChange={(value) => handleInputChange("entityType", value)}
                  >
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                    <SelectContent>
                      {entityTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Pricing Model - shows after entity type is selected */}
                {formData.entityType && (
                  <div className="space-y-2">
                    <Label htmlFor="pricingModel" className="text-sm font-medium text-foreground">
                      Pricing Model <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.pricingModel}
                      onValueChange={(value) => handleInputChange("pricingModel", value)}
                    >
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder="Select pricing model" />
                      </SelectTrigger>
                      <SelectContent>
                        {getApplicablePricingModels(formData.entityType).map((model) => (
                          <SelectItem key={model.id} value={model.name}>
                            <div className="flex flex-col">
                              <span>{model.name}</span>
                              <span className="text-xs text-muted-foreground">{model.formula}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Auto-selected based on entity type. You can change if needed.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Daily Limit */}
            <div className="space-y-2">
              <Label htmlFor="dailyLimit" className="text-sm font-medium text-foreground">
                Daily Limit ($) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="dailyLimit"
                type="number"
                step="50"
                placeholder="e.g., 500"
                value={formData.dailyLimit}
                onChange={(e) => handleInputChange("dailyLimit", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Weekly Limit */}
            <div className="space-y-2">
              <Label htmlFor="weeklyLimit" className="text-sm font-medium text-foreground">
                Weekly Limit ($) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="weeklyLimit"
                type="number"
                step="100"
                placeholder="e.g., 2500"
                value={formData.weeklyLimit}
                onChange={(e) => handleInputChange("weeklyLimit", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Monthly Limit */}
            <div className="space-y-2">
              <Label htmlFor="monthlyLimit" className="text-sm font-medium text-foreground">
                Monthly Limit ($) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="monthlyLimit"
                type="number"
                step="500"
                placeholder="e.g., 10000"
                value={formData.monthlyLimit}
                onChange={(e) => handleInputChange("monthlyLimit", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t px-6 -mx-6 mt-8">
              <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 h-10">
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {editingCard ? "Update Limits" : "Submit Request"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FuelCards;
