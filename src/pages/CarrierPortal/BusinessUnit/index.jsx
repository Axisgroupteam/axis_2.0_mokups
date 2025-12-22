import { useState, useCallback } from "react";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  PencilIcon,
  PlusIcon,
  Building2,
  CheckCircle2,
  XCircle,
  DollarSign,
} from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

const BusinessUnit = () => {
  const [filters, setFilters] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    quickBooksSync: false,
    isActive: true,
  });

  // Mock data for business units
  const businessUnits = [
    {
      id: 1,
      name: "Mega Logistics",
      quickBooksSync: true,
      isActive: true,
      totalRevenue: 2450000,
    },
    {
      id: 2,
      name: "Mega Trucking",
      quickBooksSync: true,
      isActive: true,
      totalRevenue: 1875000,
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = (unit) => {
    setEditingUnit(unit);
    setFormData({
      name: unit.name,
      quickBooksSync: unit.quickBooksSync,
      isActive: unit.isActive,
    });
    setIsSheetOpen(true);
  };

  const handleAddNew = () => {
    setEditingUnit(null);
    setFormData({
      name: "",
      quickBooksSync: false,
      isActive: true,
    });
    setIsSheetOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    setEditingUnit(null);
    setFormData({
      name: "",
      quickBooksSync: false,
      isActive: true,
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setEditingUnit(null);
    setFormData({
      name: "",
      quickBooksSync: false,
      isActive: true,
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const filterGroups = [
    {
      id: "business-unit-filters",
      label: "Filter Business Units",
      filters: [
        {
          key: "name",
          label: "Name",
          type: "input",
          group: "Basic",
          placeholder: "Search by name...",
        },
        {
          key: "quickBooksSync",
          label: "QuickBooks Sync",
          type: "select",
          group: "Basic",
          options: [
            { value: "true", label: "Enabled" },
            { value: "false", label: "Disabled" },
          ],
        },
        {
          key: "isActive",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" },
          ],
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => {
        const unit = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <div className="px-2 py-1.5 border-b mb-1">
                <p className="font-medium text-sm">{unit.name}</p>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleEdit(unit)}
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
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("name")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "quickBooksSync",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="QuickBooks Sync" />
      ),
      cell: ({ row }) => {
        const isEnabled = row.getValue("quickBooksSync");
        return (
          <Badge
            className={
              isEnabled
                ? "bg-green-500/10 text-green-700 border-green-500/50"
                : "bg-gray-500/10 text-gray-500 border-gray-500/50"
            }
          >
            {isEnabled ? (
              <CheckCircle2 className="size-3 mr-1" />
            ) : (
              <XCircle className="size-3 mr-1" />
            )}
            {isEnabled ? "Enabled" : "Disabled"}
          </Badge>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const isActive = row.getValue("isActive");
        return (
          <Badge
            className={
              isActive
                ? "bg-green-500/10 text-green-700 border-green-500/50"
                : "bg-red-500/10 text-red-700 border-red-500/50"
            }
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "totalRevenue",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Revenue" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <span className="font-semibold text-green-600">
            {formatCurrency(row.getValue("totalRevenue"))}
          </span>
        </div>
      ),
      enableSorting: true,
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="px-6 py-4">
        {/* Header with filter and add button */}
        <div className="flex items-center justify-between mb-1">
          <SmartFilter
            filterGroups={filterGroups}
            onFiltersChange={handleFiltersChange}
          />
          <Button
            className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            onClick={handleAddNew}
          >
            <PlusIcon className="size-4 mr-2" />
            Add Business Unit
          </Button>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={businessUnits}
          showViewOptions={false}
        />
      </div>

      {/* Add/Edit Business Unit Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg px-6">
          <SheetHeader className="pb-2 border-b">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingUnit ? "Edit Business Unit" : "Add New Business Unit"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4 px-2">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter business unit name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* QuickBooks Sync */}
            <div className="flex items-center justify-between py-2 border rounded-lg px-4">
              <div className="space-y-0.5">
                <Label htmlFor="quickBooksSync" className="text-sm font-medium">
                  QuickBooks Sync
                </Label>
                <p className="text-xs text-muted-foreground">
                  Enable synchronization with QuickBooks accounting
                </p>
              </div>
              <Switch
                id="quickBooksSync"
                checked={formData.quickBooksSync}
                onCheckedChange={(checked) =>
                  handleInputChange("quickBooksSync", checked)
                }
              />
            </div>

            {/* Is Active */}
            <div className="flex items-center justify-between py-2 border rounded-lg px-4">
              <div className="space-y-0.5">
                <Label htmlFor="isActive" className="text-sm font-medium">
                  Active Status
                </Label>
                <p className="text-xs text-muted-foreground">
                  Set whether this business unit is currently active
                </p>
              </div>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  handleInputChange("isActive", checked)
                }
              />
            </div>
          </form>

          <SheetFooter className="absolute bottom-0 left-0 right-0 border-t p-4 bg-background px-8">
            <div className="flex gap-3 w-full">
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
                onClick={handleSubmit}
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {editingUnit ? "Update" : "Create"}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BusinessUnit;
