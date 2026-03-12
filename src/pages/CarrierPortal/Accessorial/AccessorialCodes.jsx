import { useState, useCallback } from "react";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlusIcon,
  MoreHorizontalIcon,
  PencilIcon,
  CheckIcon,
  XIcon,
} from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

const AccessorialCodes = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingCode, setEditingCode] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    chargeType: "",
    defaultAmount: "",
    defaultRatePerMile: "",
    approvalTier: "tier2",
    driverPaid: true,
    driverPayMethod: "same",
    driverPayAmount: "",
    status: "Active",
    chargeDisplay: "Itemized Separately",
    billToCode: "Same as Freight",
    invoiceMethod: "Include on Freight Invoice",
  });

  const accessorialCodes = [
    {
      id: 1,
      code: "DET",
      name: "Detention",
      description: "Charge for driver wait time beyond free time threshold",
      chargeType: "Per Hour",
      defaultAmount: 75.0,
      approvalTier: "tier1",
      driverPaid: true,
      driverPayMethod: "percentage",
      driverPayAmount: "50%",
      status: "Active",
      chargeDisplay: "Itemized Separately",
      billToCode: "Same as Freight",
      invoiceMethod: "Include on Freight Invoice",
    },
    {
      id: 2,
      code: "LAY",
      name: "Layover",
      description:
        "Overnight stay charge when driver cannot complete delivery same day",
      chargeType: "Per Day",
      defaultAmount: 350.0,
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "flat",
      driverPayAmount: "$150",
      status: "Active",
      chargeDisplay: "Itemized Separately",
      billToCode: "Same as Freight",
      invoiceMethod: "Include on Freight Invoice",
    },
    {
      id: 3,
      code: "STP",
      name: "Stop Off",
      description: "Accessorial stop charge for multi-stop deliveries",
      chargeType: "Flat + Mileage",
      defaultAmount: 100.0,
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "flat",
      driverPayAmount: "$50",
      status: "Active",
      chargeDisplay: "Itemized Separately",
      billToCode: "Same as Freight",
      invoiceMethod: "Include on Freight Invoice",
    },
    {
      id: 4,
      code: "DIV",
      name: "Diversion",
      description: "Charge for rerouting delivery to different destination",
      chargeType: "Flat + OOR Miles",
      defaultAmount: 150.0,
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "same",
      driverPayAmount: "Same as Billed",
      status: "Active",
      chargeDisplay: "Itemized Separately",
      billToCode: "Same as Freight",
      invoiceMethod: "Include on Freight Invoice",
    },
    {
      id: 5,
      code: "TNU",
      name: "TONU",
      description: "Truck Ordered Not Used - cancellation after dispatch",
      chargeType: "Flat Fee",
      defaultAmount: 400.0,
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "percentage",
      driverPayAmount: "75%",
      status: "Active",
      chargeDisplay: "Itemized Separately",
      billToCode: "Same as Freight",
      invoiceMethod: "Include on Freight Invoice",
    },
    {
      id: 6,
      code: "DRV",
      name: "Driver Assist",
      description: "Charge when driver assists with loading/unloading",
      chargeType: "Flat Fee",
      defaultAmount: 75.0,
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "flat",
      driverPayAmount: "$75",
      status: "Active",
      chargeDisplay: "Itemized Separately",
      billToCode: "Same as Freight",
      invoiceMethod: "Include on Freight Invoice",
    },
    {
      id: 7,
      code: "TRP",
      name: "Tarping",
      description: "Charge for tarping/covering load",
      chargeType: "Flat Fee",
      defaultAmount: 75.0,
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "flat",
      driverPayAmount: "$50",
      status: "Active",
      chargeDisplay: "Itemized Separately",
      billToCode: "Same as Freight",
      invoiceMethod: "Include on Freight Invoice",
    },
    {
      id: 8,
      code: "HAZ",
      name: "Hazmat",
      description: "Hazardous materials handling surcharge",
      chargeType: "Flat Fee",
      defaultAmount: 150.0,
      approvalTier: "tier2",
      driverPaid: false,
      driverPayMethod: "none",
      driverPayAmount: "N/A",
      status: "Active",
      chargeDisplay: "Itemized Separately",
      billToCode: "Same as Freight",
      invoiceMethod: "Include on Freight Invoice",
    },
    {
      id: 9,
      code: "TOL",
      name: "Tolls",
      description: "Pass-through toll charges",
      chargeType: "Pass-through",
      defaultAmount: 0,
      approvalTier: "tier1",
      driverPaid: false,
      driverPayMethod: "none",
      driverPayAmount: "N/A",
      status: "Active",
      chargeDisplay: "Itemized Separately",
      billToCode: "Same as Freight",
      invoiceMethod: "Include on Freight Invoice",
    },
    {
      id: 10,
      code: "OVW",
      name: "Overweight",
      description: "Surcharge for overweight loads requiring permits",
      chargeType: "Variable",
      defaultAmount: 0,
      approvalTier: "tier2",
      driverPaid: false,
      driverPayMethod: "none",
      driverPayAmount: "N/A",
      status: "Active",
      chargeDisplay: "Itemized Separately",
      billToCode: "Same as Freight",
      invoiceMethod: "Include on Freight Invoice",
    },
    {
      id: 11,
      code: "OOR",
      name: "Out of Route Miles",
      description: "Charge for miles driven outside planned route",
      chargeType: "Flat + OOR Miles",
      defaultAmount: 50.0,
      defaultRatePerMile: 3.0,
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "same",
      driverPayAmount: "Same as Billed",
      status: "Active",
      chargeDisplay: "Itemized Separately",
      billToCode: "Same as Freight",
      invoiceMethod: "Include on Freight Invoice",
    },
    {
      id: 12,
      code: "RDL",
      name: "Re-delivery",
      description: "Charge for return delivery attempt",
      chargeType: "Flat Fee",
      defaultAmount: 200.0,
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "percentage",
      driverPayAmount: "50%",
      status: "Active",
      chargeDisplay: "Itemized Separately",
      billToCode: "Same as Freight",
      invoiceMethod: "Include on Freight Invoice",
    },
    {
      id: 13,
      code: "PRM",
      name: "Permits",
      description: "Pass-through permit costs for oversize/overweight",
      chargeType: "Pass-through",
      defaultAmount: 0,
      approvalTier: "tier1",
      driverPaid: false,
      driverPayMethod: "none",
      driverPayAmount: "N/A",
      status: "Active",
      chargeDisplay: "Itemized Separately",
      billToCode: "Same as Freight",
      invoiceMethod: "Include on Freight Invoice",
    },
    {
      id: 14,
      code: "EMP",
      name: "Empty Miles",
      description: "Charge for deadhead/empty miles",
      chargeType: "Flat + Mileage",
      defaultAmount: 100.0,
      defaultRatePerMile: 2.5,
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "same",
      driverPayAmount: "Same as Billed",
      status: "Active",
      chargeDisplay: "Itemized Separately",
      billToCode: "Same as Freight",
      invoiceMethod: "Include on Freight Invoice",
    },
  ];

  const chargeTypeOptions = [
    "Flat Fee",
    "Per Hour",
    "Per Day",
    "Per Mile",
    "Percentage of Freight",
    "Pass-through",
    "Flat + Mileage",
    "Flat + OOR Miles",
    "Variable",
  ];

  const approvalTierOptions = [
    { value: "tier1", label: "Tier 1: Auto-Apply" },
    { value: "tier2", label: "Tier 2: Dispatch Manager" },
    { value: "tier3", label: "Tier 3: VP of Operations" },
  ];

  const driverPayMethodOptions = [
    { value: "same", label: "Same as Billed" },
    { value: "flat", label: "Flat Amount" },
    { value: "percentage", label: "Percentage of Billed" },
    { value: "none", label: "No Pay" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => ({
    code: "",
    name: "",
    description: "",
    chargeType: "",
    defaultAmount: "",
    defaultRatePerMile: "",
    approvalTier: "tier2",
    driverPaid: true,
    driverPayMethod: "same",
    driverPayAmount: "",
    status: "Active",
    chargeDisplay: "Itemized Separately",
    billToCode: "Same as Freight",
    invoiceMethod: "Include on Freight Invoice",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSheetOpen(false);
    setEditingCode(null);
    setFormData(resetForm());
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setEditingCode(null);
    setFormData(resetForm());
  };

  const handleEdit = (code) => {
    setEditingCode(code);
    setFormData({
      code: code.code,
      name: code.name,
      description: code.description,
      chargeType: code.chargeType,
      defaultAmount: code.defaultAmount?.toString() || "",
      defaultRatePerMile: code.defaultRatePerMile?.toString() || "",
      approvalTier: code.approvalTier,
      driverPaid: code.driverPaid,
      driverPayMethod: code.driverPayMethod,
      driverPayAmount: code.driverPayAmount,
      status: code.status,
      chargeDisplay: code.chargeDisplay || "Itemized Separately",
      billToCode: code.billToCode || "Same as Freight",
      invoiceMethod: code.invoiceMethod || "Include on Freight Invoice",
    });
    setIsSheetOpen(true);
  };

  const handleAddNew = () => {
    setEditingCode(null);
    setFormData(resetForm());
    setIsSheetOpen(true);
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      Active:
        "bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50",
      Inactive:
        "bg-rose-500/10 hover:bg-rose-500/30 text-rose-700 dark:text-rose-400 border border-rose-500/50",
    };
    return (
      colors[status] ||
      "bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/50"
    );
  };

  const getTierBadgeColor = (tier) => {
    const colors = {
      tier1:
        "bg-violet-500/10 text-violet-700 dark:text-violet-400 border border-violet-500/50",
      tier2:
        "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/50",
      tier3:
        "bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/50",
    };
    return (
      colors[tier] ||
      "bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/50"
    );
  };

  const getTierLabel = (tier) => {
    const labels = {
      tier1: "Tier 1: Auto-Apply",
      tier2: "Tier 2: Dispatch Mgr",
      tier3: "Tier 3: VP Ops",
    };
    return labels[tier] || tier;
  };

  const formatCurrency = (amount) => {
    if (amount === 0) return "Variable";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "name",
          label: "Name",
          type: "input",
          group: "Basic",
          placeholder: "Search accessorial name...",
        },
        {
          key: "approvalTier",
          label: "Approval Tier",
          type: "select",
          group: "Basic",
          options: [
            { label: "Tier 1: Auto-Apply", value: "tier1" },
            { label: "Tier 2: Dispatch Mgr", value: "tier2" },
            { label: "Tier 3: VP Ops", value: "tier3" },
          ],
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
          ],
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((_newFilters) => {}, []);

  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => {
        const code = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <div className="px-2 py-1.5 border-b mb-1">
                <p className="font-medium text-sm">{code.name}</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {code.code}
                </p>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleEdit(code)}
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm bg-blue-500/10 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded">
          {row.getValue("code")}
        </span>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "chargeType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Charge Structure" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.getValue("chargeType")}
        </span>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "defaultAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Default Amount" />
      ),
      cell: ({ row }) => {
        const amount = row.getValue("defaultAmount");
        return (
          <span className="font-medium">
            {Number(amount) === 0 ? "Variable" : formatCurrency(amount)}
          </span>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "defaultRatePerMile",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Default Rate Per Mile" />
      ),
      cell: ({ row }) => {
        const chargeType = row.getValue("chargeType") || "";
        const ratePerMile = row.original.defaultRatePerMile;

        if (
          !(
            chargeType.includes("Mile") ||
            chargeType.includes("OOR") ||
            chargeType === "Flat + OOR Miles"
          ) ||
          !ratePerMile
        ) {
          return <span className="text-muted-foreground">—</span>;
        }

        return (
          <span className="font-medium text-muted-foreground">
            {formatCurrency(ratePerMile)}/mi
          </span>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "approvalTier",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Approval Tier" />
      ),
      cell: ({ row }) => (
        <Badge className={getTierBadgeColor(row.getValue("approvalTier"))}>
          {getTierLabel(row.getValue("approvalTier"))}
        </Badge>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "driverPaid",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Driver Paid" />
      ),
      cell: ({ row }) =>
        row.getValue("driverPaid") ? (
          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <CheckIcon className="h-4 w-4" /> Yes
          </span>
        ) : (
          <span className="text-muted-foreground flex items-center gap-1">
            <XIcon className="h-4 w-4" /> No
          </span>
        ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "driverPayAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Driver Pay Method" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {row.getValue("driverPayAmount")}
        </span>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <Badge className={getStatusBadgeColor(row.getValue("status"))}>
          {row.getValue("status")}
        </Badge>
      ),
      enableSorting: true,
      enableHiding: true,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <SmartFilter
          filterGroups={filterGroups}
          onFiltersChange={handleFiltersChange}
        />
        <Button
          onClick={handleAddNew}
          className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Accessorial Code
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={accessorialCodes}
        showViewOptions={false}
      />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-lg font-bold text-foreground">
              {editingCode
                ? "Edit Accessorial Code"
                : "Add New Accessorial Code"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4 px-6">
            {/* Code */}
            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm font-medium">
                Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="code"
                type="text"
                placeholder="e.g., DET"
                value={formData.code}
                onChange={(e) =>
                  handleInputChange("code", e.target.value.toUpperCase())
                }
                className="h-10 font-mono uppercase"
                maxLength={3}
                required
              />
              <p className="text-xs text-muted-foreground">
                3-character code (e.g., DET, LAY, STP)
              </p>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., Detention"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Brief description of this accessorial..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="min-h-[80px]"
              />
            </div>

            {/* Charge Structure */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Charge Structure <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.chargeType}
                onValueChange={(v) => handleInputChange("chargeType", v)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select charge type" />
                </SelectTrigger>
                <SelectContent>
                  {chargeTypeOptions.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Default Amount */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {formData.chargeType?.includes("Flat")
                  ? "Default Flat Amount"
                  : "Default Amount"}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.defaultAmount}
                  onChange={(e) =>
                    handleInputChange("defaultAmount", e.target.value)
                  }
                  className="h-10 pl-7"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Leave 0 for variable/pass-through charges
              </p>
            </div>

            {/* Conditionally Rendered Mileage/OOR Rate */}
            {(formData.chargeType?.includes("Mile") ||
              formData.chargeType?.includes("OOR") ||
              formData.chargeType === "Flat + OOR Miles") && (
              <div className="space-y-2 border-l-2 border-slate-200 dark:border-slate-800 pl-4 py-1">
                <Label className="text-sm font-medium">
                  Default Rate Per Mile
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.defaultRatePerMile}
                    onChange={(e) =>
                      handleInputChange("defaultRatePerMile", e.target.value)
                    }
                    className="h-10 pl-7"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    / mi
                  </span>
                </div>
              </div>
            )}

            {/* Approval Tier */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Approval Tier <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.approvalTier}
                onValueChange={(v) => handleInputChange("approvalTier", v)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select approval tier" />
                </SelectTrigger>
                <SelectContent>
                  {approvalTierOptions.map((tier) => (
                    <SelectItem key={tier.value} value={tier.value}>
                      {tier.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Note: Charges over $500 automatically escalate to Tier 3
              </p>
            </div>

            {/* Driver Paid */}
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="driverPaid"
                  checked={formData.driverPaid}
                  onCheckedChange={(checked) => {
                    handleInputChange("driverPaid", checked);
                    if (!checked) {
                      handleInputChange("driverPayMethod", "none");
                      handleInputChange("driverPayAmount", "");
                    }
                  }}
                />
                <Label
                  htmlFor="driverPaid"
                  className="text-sm font-medium cursor-pointer"
                >
                  Driver is paid for this accessorial
                </Label>
              </div>

              {formData.driverPaid && (
                <>
                  <div className="space-y-2 ml-6">
                    <Label className="text-sm font-medium">
                      Driver Pay Method
                    </Label>
                    <Select
                      value={formData.driverPayMethod}
                      onValueChange={(v) =>
                        handleInputChange("driverPayMethod", v)
                      }
                    >
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder="Select pay method" />
                      </SelectTrigger>
                      <SelectContent>
                        {driverPayMethodOptions
                          .filter((m) => m.value !== "none")
                          .map((method) => (
                            <SelectItem key={method.value} value={method.value}>
                              {method.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {(formData.driverPayMethod === "flat" ||
                    formData.driverPayMethod === "percentage") && (
                    <div className="space-y-2 ml-6">
                      <Label className="text-sm font-medium">
                        {formData.driverPayMethod === "flat"
                          ? "Flat Amount"
                          : "Percentage"}
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {formData.driverPayMethod === "flat" ? "$" : "%"}
                        </span>
                        <Input
                          type="number"
                          step={
                            formData.driverPayMethod === "flat" ? "0.01" : "1"
                          }
                          min="0"
                          max={
                            formData.driverPayMethod === "percentage"
                              ? "100"
                              : undefined
                          }
                          placeholder={
                            formData.driverPayMethod === "flat" ? "0.00" : "50"
                          }
                          value={formData.driverPayAmount}
                          onChange={(e) =>
                            handleInputChange("driverPayAmount", e.target.value)
                          }
                          className="h-10 pl-7"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              <p className="text-xs text-muted-foreground ml-6">
                Driver pay follows this configuration - no per-transaction
                overrides allowed
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t -mx-6 px-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {editingCode ? "Update Code" : "Create Code"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AccessorialCodes;
