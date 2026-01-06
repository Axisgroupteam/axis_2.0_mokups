import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingCode, setEditingCode] = useState(null);
  const [filters, setFilters] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    chargeType: "",
    defaultAmount: "",
    approvalTier: "tier2",
    driverPaid: true,
    driverPayMethod: "same",
    driverPayAmount: "",
    status: "Active",
  });

  // Mock data for accessorial codes based on documentation
  const accessorialCodes = [
    {
      id: 1,
      code: "DET",
      name: "Detention",
      description: "Charge for driver wait time beyond free time threshold",
      chargeType: "Per Hour",
      defaultAmount: 75.00,
      approvalTier: "tier1",
      driverPaid: true,
      driverPayMethod: "percentage",
      driverPayAmount: "50%",
      status: "Active",
    },
    {
      id: 2,
      code: "LAY",
      name: "Layover",
      description: "Overnight stay charge when driver cannot complete delivery same day",
      chargeType: "Per Day",
      defaultAmount: 350.00,
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "flat",
      driverPayAmount: "$150",
      status: "Active",
    },
    {
      id: 3,
      code: "STP",
      name: "Stop Off",
      description: "Additional stop charge for multi-stop deliveries",
      chargeType: "Flat + Mileage",
      defaultAmount: 100.00,
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "flat",
      driverPayAmount: "$50",
      status: "Active",
    },
    {
      id: 4,
      code: "DIV",
      name: "Diversion",
      description: "Charge for rerouting delivery to different destination",
      chargeType: "Flat + OOR Miles",
      defaultAmount: 150.00,
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "same",
      driverPayAmount: "Same as Billed",
      status: "Active",
    },
    {
      id: 5,
      code: "TNU",
      name: "TONU",
      description: "Truck Ordered Not Used - cancellation after dispatch",
      chargeType: "Flat Fee",
      defaultAmount: 400.00,
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "percentage",
      driverPayAmount: "75%",
      status: "Active",
    },
    {
      id: 6,
      code: "DRV",
      name: "Driver Assist",
      description: "Charge when driver assists with loading/unloading",
      chargeType: "Flat Fee",
      defaultAmount: 75.00,
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "flat",
      driverPayAmount: "$75",
      status: "Active",
    },
    {
      id: 7,
      code: "TRP",
      name: "Tarping",
      description: "Charge for tarping/covering load",
      chargeType: "Flat Fee",
      defaultAmount: 75.00,
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "flat",
      driverPayAmount: "$50",
      status: "Active",
    },
    {
      id: 8,
      code: "HAZ",
      name: "Hazmat",
      description: "Hazardous materials handling surcharge",
      chargeType: "Flat Fee",
      defaultAmount: 150.00,
      approvalTier: "tier2",
      driverPaid: false,
      driverPayMethod: "none",
      driverPayAmount: "N/A",
      status: "Active",
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
    },
    {
      id: 11,
      code: "OOR",
      name: "Out of Route Miles",
      description: "Charge for miles driven outside planned route",
      chargeType: "Per Mile",
      defaultAmount: 3.00,
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "same",
      driverPayAmount: "Same as Billed",
      status: "Active",
    },
    {
      id: 12,
      code: "RDL",
      name: "Re-delivery",
      description: "Charge for return delivery attempt",
      chargeType: "Flat Fee",
      defaultAmount: 200.00,
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "percentage",
      driverPayAmount: "50%",
      status: "Active",
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
    },
    {
      id: 14,
      code: "EMP",
      name: "Empty Miles",
      description: "Charge for deadhead/empty miles",
      chargeType: "Per Mile",
      defaultAmount: 2.50,
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "same",
      driverPayAmount: "Same as Billed",
      status: "Active",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    setEditingCode(null);
    setFormData({
      code: "",
      name: "",
      description: "",
      chargeType: "",
      defaultAmount: "",
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "same",
      driverPayAmount: "",
      status: "Active",
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setEditingCode(null);
    setFormData({
      code: "",
      name: "",
      description: "",
      chargeType: "",
      defaultAmount: "",
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "same",
      driverPayAmount: "",
      status: "Active",
    });
  };

  const handleEdit = (code) => {
    setEditingCode(code);
    setFormData({
      code: code.code,
      name: code.name,
      description: code.description,
      chargeType: code.chargeType,
      defaultAmount: code.defaultAmount.toString(),
      approvalTier: code.approvalTier,
      driverPaid: code.driverPaid,
      driverPayMethod: code.driverPayMethod,
      driverPayAmount: code.driverPayAmount,
      status: code.status,
    });
    setIsSheetOpen(true);
  };

  const handleAddNew = () => {
    setEditingCode(null);
    setFormData({
      code: "",
      name: "",
      description: "",
      chargeType: "",
      defaultAmount: "",
      approvalTier: "tier2",
      driverPaid: true,
      driverPayMethod: "same",
      driverPayAmount: "",
      status: "Active",
    });
    setIsSheetOpen(true);
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      Active:
        "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50",
      Inactive:
        "bg-red-500/10 hover:bg-red-500/30 text-red-700 dark:text-red-400 border border-red-500/50",
    };
    return (
      colors[status] ||
      "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50"
    );
  };

  const getTierBadgeColor = (tier) => {
    const colors = {
      tier1:
        "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50",
      tier2:
        "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50",
      tier3:
        "bg-purple-500/10 hover:bg-purple-500/30 text-purple-700 dark:text-purple-400 border border-purple-500/50",
    };
    return (
      colors[tier] ||
      "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50"
    );
  };

  const getTierLabel = (tier) => {
    const labels = {
      tier1: "Tier 1: Auto",
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
            { label: "Tier 1: Auto", value: "tier1" },
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

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
    console.log("Active filters:", newFilters);
  }, []);

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
      cell: ({ row }) => {
        const code = row.getValue("code");
        return (
          <span className="font-mono text-sm bg-blue-500/10 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded">
            {code}
          </span>
        );
      },
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
      cell: ({ row }) => {
        const chargeType = row.getValue("chargeType");
        return <span className="text-muted-foreground">{chargeType}</span>;
      },
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
        return <span className="font-medium">{formatCurrency(amount)}</span>;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "approvalTier",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Approval Tier" />
      ),
      cell: ({ row }) => {
        const tier = row.getValue("approvalTier");
        return (
          <Badge className={getTierBadgeColor(tier)}>
            {getTierLabel(tier)}
          </Badge>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "driverPaid",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Driver Paid" />
      ),
      cell: ({ row }) => {
        const driverPaid = row.getValue("driverPaid");
        return driverPaid ? (
          <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
            <CheckIcon className="h-4 w-4" />
            Yes
          </span>
        ) : (
          <span className="text-muted-foreground flex items-center gap-1">
            <XIcon className="h-4 w-4" />
            No
          </span>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "driverPayAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Driver Pay Method" />
      ),
      cell: ({ row }) => {
        const amount = row.getValue("driverPayAmount");
        return <span className="text-muted-foreground text-sm">{amount}</span>;
      },
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge className={getStatusBadgeColor(status)}>
            {status}
          </Badge>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="px-6 py-4">
        {/* Filter */}
        <div className="flex items-center justify-between mb-1">
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

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={accessorialCodes}
          showViewOptions={false}
        />
      </div>

      {/* Add/Edit Accessorial Code Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingCode ? "Edit Accessorial Code" : "Add New Accessorial Code"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4 px-6">
            {/* Code */}
            <div className="space-y-2">
              <Label
                htmlFor="code"
                className="text-sm font-medium text-foreground"
              >
                Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="code"
                type="text"
                placeholder="e.g., DET"
                value={formData.code}
                onChange={(e) => handleInputChange("code", e.target.value.toUpperCase())}
                className="h-10 font-mono uppercase"
                maxLength={3}
                required
              />
              <p className="text-xs text-muted-foreground">3-character code (e.g., DET, LAY, STP)</p>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
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
              <Label
                htmlFor="description"
                className="text-sm font-medium text-foreground"
              >
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Brief description of this accessorial..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            {/* Charge Type */}
            <div className="space-y-2">
              <Label
                htmlFor="chargeType"
                className="text-sm font-medium text-foreground"
              >
                Charge Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.chargeType}
                onValueChange={(value) => handleInputChange("chargeType", value)}
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
              <Label
                htmlFor="defaultAmount"
                className="text-sm font-medium text-foreground"
              >
                Default Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="defaultAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.defaultAmount}
                  onChange={(e) => handleInputChange("defaultAmount", e.target.value)}
                  className="h-10 pl-7"
                />
              </div>
              <p className="text-xs text-muted-foreground">Leave 0 for variable/pass-through charges</p>
            </div>

            {/* Approval Tier */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Approval Tier <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.approvalTier}
                onValueChange={(value) => handleInputChange("approvalTier", value)}
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
                  className="text-sm font-medium text-foreground cursor-pointer"
                >
                  Driver is paid for this accessorial
                </Label>
              </div>

              {formData.driverPaid && (
                <>
                  {/* Driver Pay Method */}
                  <div className="space-y-2 ml-6">
                    <Label className="text-sm font-medium text-foreground">
                      Driver Pay Method
                    </Label>
                    <Select
                      value={formData.driverPayMethod}
                      onValueChange={(value) => handleInputChange("driverPayMethod", value)}
                    >
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder="Select pay method" />
                      </SelectTrigger>
                      <SelectContent>
                        {driverPayMethodOptions.filter(m => m.value !== "none").map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            {method.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Driver Pay Amount (conditional) */}
                  {(formData.driverPayMethod === "flat" || formData.driverPayMethod === "percentage") && (
                    <div className="space-y-2 ml-6">
                      <Label className="text-sm font-medium text-foreground">
                        {formData.driverPayMethod === "flat" ? "Flat Amount" : "Percentage"}
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {formData.driverPayMethod === "flat" ? "$" : "%"}
                        </span>
                        <Input
                          type="number"
                          step={formData.driverPayMethod === "flat" ? "0.01" : "1"}
                          min="0"
                          max={formData.driverPayMethod === "percentage" ? "100" : undefined}
                          placeholder={formData.driverPayMethod === "flat" ? "0.00" : "50"}
                          value={formData.driverPayAmount}
                          onChange={(e) => handleInputChange("driverPayAmount", e.target.value)}
                          className="h-10 pl-7"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              <p className="text-xs text-muted-foreground ml-6">
                Driver pay follows this configuration - no per-transaction overrides allowed
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t px-6 -mx-6 mt-8">
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
