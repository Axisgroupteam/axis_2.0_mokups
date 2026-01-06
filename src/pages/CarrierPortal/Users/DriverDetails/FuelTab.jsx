import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/sheet";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import SmartFilter from "@/components/SmartFilter";
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
  CreditCardIcon,
  PencilIcon,
  BanIcon,
  AlertTriangleIcon,
  RefreshCwIcon,
  ReceiptIcon,
  CheckCircle,
  XCircle,
} from "lucide-react";

const FuelTab = () => {
  const [isFuelCardSheetOpen, setIsFuelCardSheetOpen] = useState(false);
  const [editingFuelCard, setEditingFuelCard] = useState(null);
  const [filters, setFilters] = useState([]);
  const [formData, setFormData] = useState({
    cardNumber: "",
    platform: "",
    entityType: "",
    pricingModel: "",
    dailyLimit: "",
    weeklyLimit: "",
    monthlyLimit: "",
    status: "Pending",
  });

  // Platforms matching main Fuel module
  const platforms = ["EFS", "Commdata", "Relay"];

  // Entity types matching main Fuel module
  const entityTypes = ["Company Driver", "Owner-Operator", "Franchise Driver", "Carrier"];

  // Status options matching main Fuel module
  const statusOptions = ["Active", "Pending", "Suspended", "Lost", "Expired"];

  // Pricing models matching main Fuel module
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

  // Filter configurations matching main Fuel module
  const filterGroups = [
    {
      id: "fuel-card-filters",
      label: "Filter Cards",
      filters: [
        {
          key: "platform",
          label: "Platform",
          type: "select",
          group: "Basic",
          options: platforms.map((p) => ({ label: p, value: p })),
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: statusOptions.map((s) => ({ label: s, value: s })),
        },
        {
          key: "pricingModel",
          label: "Pricing Model",
          type: "select",
          group: "Basic",
          options: pricingModels.map((m) => ({ label: m.name, value: m.name })),
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Mock fuel card data for this driver - matching main Fuel module structure
  const [fuelCards, setFuelCards] = useState([
    {
      id: 1,
      cardNumber: "7089-4521-8834-0012",
      platform: "EFS",
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
      entityType: "Company Driver",
      pricingModel: "Fixed Rate Program",
      status: "Suspended",
      dailyLimit: 500,
      weeklyLimit: 2500,
      monthlyLimit: 10000,
      currentBalance: 3200.00,
      lastUsedDate: "2025-01-10",
      lastUsedLocation: "Pilot Flying J, Houston TX",
      issuedDate: "2024-03-20",
      expirationDate: "2027-03-20",
    },
  ]);

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

  const resetForm = () => {
    setFormData({
      cardNumber: "",
      platform: "",
      entityType: "",
      pricingModel: "",
      dailyLimit: "",
      weeklyLimit: "",
      monthlyLimit: "",
      status: "Pending",
    });
  };

  const handleAddFuelCard = () => {
    setEditingFuelCard(null);
    resetForm();
    setIsFuelCardSheetOpen(true);
  };

  const handleEditFuelCard = (fuelCard) => {
    setEditingFuelCard(fuelCard);
    setFormData({
      cardNumber: fuelCard.cardNumber,
      platform: fuelCard.platform,
      entityType: fuelCard.entityType,
      pricingModel: fuelCard.pricingModel,
      dailyLimit: fuelCard.dailyLimit.toString(),
      weeklyLimit: fuelCard.weeklyLimit.toString(),
      monthlyLimit: fuelCard.monthlyLimit.toString(),
      status: fuelCard.status,
    });
    setIsFuelCardSheetOpen(true);
  };

  const handleSubmitFuelCard = (e) => {
    e.preventDefault();

    const fuelCardData = {
      id: editingFuelCard ? editingFuelCard.id : Date.now(),
      cardNumber: formData.cardNumber || `7089-4521-8834-${String(Date.now()).slice(-4)}`,
      platform: formData.platform,
      entityType: formData.entityType,
      pricingModel: formData.pricingModel,
      status: editingFuelCard ? formData.status : "Pending",
      dailyLimit: parseInt(formData.dailyLimit) || 500,
      weeklyLimit: parseInt(formData.weeklyLimit) || 2500,
      monthlyLimit: parseInt(formData.monthlyLimit) || 10000,
      currentBalance: editingFuelCard ? editingFuelCard.currentBalance : 0,
      lastUsedDate: editingFuelCard ? editingFuelCard.lastUsedDate : null,
      lastUsedLocation: editingFuelCard ? editingFuelCard.lastUsedLocation : null,
      issuedDate: editingFuelCard ? editingFuelCard.issuedDate : null,
      expirationDate: editingFuelCard ? editingFuelCard.expirationDate : null,
    };

    if (editingFuelCard) {
      setFuelCards(fuelCards.map((card) =>
        card.id === editingFuelCard.id ? fuelCardData : card
      ));
    } else {
      setFuelCards([...fuelCards, fuelCardData]);
    }

    setIsFuelCardSheetOpen(false);
    setEditingFuelCard(null);
    resetForm();
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

  // Column definitions matching main Fuel module
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
                <p className="text-xs text-muted-foreground">{card.platform}</p>
              </div>
              {card.status === "Active" && (
                <>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => handleEditFuelCard(card)}>
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Edit Limits
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <ReceiptIcon className="h-4 w-4 mr-2" />
                    View Transactions
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
    },
    {
      accessorKey: "cardNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Card Number" />
      ),
      cell: ({ row }) => {
        const cardNumber = row.getValue("cardNumber");
        return (
          <div className="flex items-center gap-2">
            <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono text-sm">{maskCardNumber(cardNumber)}</span>
          </div>
        );
      },
      size: 160,
    },
    {
      accessorKey: "platform",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Platform" />
      ),
      cell: ({ row }) => {
        const platform = row.getValue("platform");
        return <Badge className={getPlatformBadgeColor(platform)}>{platform}</Badge>;
      },
      size: 100,
    },
    {
      accessorKey: "pricingModel",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pricing Model" />
      ),
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
      size: 180,
    },
    {
      accessorKey: "dailyLimit",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Daily Limit" />
      ),
      cell: ({ row }) => formatCurrency(row.getValue("dailyLimit")),
      size: 100,
    },
    {
      accessorKey: "currentBalance",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Balance" />
      ),
      cell: ({ row }) => {
        const balance = row.getValue("currentBalance");
        if (balance === 0 || balance === null) return "-";
        return (
          <span className="font-medium text-green-600 dark:text-green-400">
            {formatCurrency(balance)}
          </span>
        );
      },
      size: 100,
    },
    {
      accessorKey: "lastUsedDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Used" />
      ),
      cell: ({ row }) => {
        const card = row.original;
        if (!card.lastUsedDate) return <span className="text-muted-foreground">-</span>;
        return (
          <div>
            <p className="text-sm">{formatDate(card.lastUsedDate)}</p>
            <p className="text-xs text-muted-foreground truncate max-w-[120px]">{card.lastUsedLocation}</p>
          </div>
        );
      },
      size: 140,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        return <Badge className={getStatusBadgeColor(status)}>{status}</Badge>;
      },
      size: 100,
    },
  ];

  return (
    <>
      <div className="space-y-4 px-0.5 pb-4">
        <div className="border border-border rounded-lg overflow-hidden bg-background">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border">
            <SmartFilter
              filterGroups={filterGroups}
              onFiltersChange={handleFiltersChange}
            />
            <Button
              size="sm"
              onClick={handleAddFuelCard}
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
            >
              <PlusIcon className="size-3" />
              Request Fuel Card
            </Button>
          </div>
          <div className="p-4">
            <DataTable
              columns={columns}
              data={fuelCards}
              showViewOptions={false}
              pageSize={10}
            />
          </div>
        </div>
      </div>

      {/* Add/Edit Fuel Card Sheet */}
      <Sheet open={isFuelCardSheetOpen} onOpenChange={setIsFuelCardSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-lg font-bold text-foreground">
              {editingFuelCard ? "Edit Fuel Card" : "Request New Fuel Card"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmitFuelCard} className="space-y-4 mt-4 px-6">
            {!editingFuelCard && (
              <>
                {/* Platform */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Platform <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.platform}
                    onValueChange={(value) => handleInputChange("platform", value)}
                    required
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
                  <Label className="text-sm font-medium text-foreground">
                    Entity Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.entityType}
                    onValueChange={(value) => handleInputChange("entityType", value)}
                    required
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
                    <Label className="text-sm font-medium text-foreground">
                      Pricing Model <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.pricingModel}
                      onValueChange={(value) => handleInputChange("pricingModel", value)}
                      required
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
              <Label className="text-sm font-medium text-foreground">
                Daily Limit ($) <span className="text-red-500">*</span>
              </Label>
              <Input
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
              <Label className="text-sm font-medium text-foreground">
                Weekly Limit ($) <span className="text-red-500">*</span>
              </Label>
              <Input
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
              <Label className="text-sm font-medium text-foreground">
                Monthly Limit ($) <span className="text-red-500">*</span>
              </Label>
              <Input
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
            <div className="flex gap-3 pt-6 border-t mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsFuelCardSheetOpen(false);
                  resetForm();
                }}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {editingFuelCard ? "Update Card" : "Submit Request"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default FuelTab;
