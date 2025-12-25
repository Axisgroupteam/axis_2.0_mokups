import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  EyeIcon,
} from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

const ContractLines = () => {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingLine, setEditingLine] = useState(null);
  const [filters, setFilters] = useState([]);
  const [formData, setFormData] = useState({
    lineId: "",
    contractId: "",
    product: "",
    status: "Active",
    notes: "",
  });

  // Mock data for contract lines
  const contractLines = [
    {
      id: 1,
      lineId: "CL-001",
      contractId: "SUP-2024-001",
      product: "#57 Limestone",
      status: "Active",
      notes: "Primary limestone supply for Tampa region",
    },
    {
      id: 2,
      lineId: "CL-002",
      contractId: "SUP-2024-001",
      product: "#89 Stone",
      status: "Active",
      notes: "Secondary stone product under same contract",
    },
    {
      id: 3,
      lineId: "CL-003",
      contractId: "SUP-2024-002",
      product: "Concrete Sand",
      status: "Active",
      notes: "High-grade concrete sand, ASTM C33 compliant",
    },
    {
      id: 4,
      lineId: "CL-004",
      contractId: "SUP-2024-003",
      product: "Fill Sand",
      status: "Active",
      notes: "General purpose fill sand",
    },
    {
      id: 5,
      lineId: "CL-005",
      contractId: "SUP-2024-004",
      product: "Ready-Mix Concrete",
      status: "Draft",
      notes: "3000 PSI standard mix, pending approval",
    },
    {
      id: 6,
      lineId: "CL-006",
      contractId: "SUP-2024-004",
      product: "Ready-Mix Concrete",
      status: "Draft",
      notes: "4000 PSI high-strength mix, pending approval",
    },
    {
      id: 7,
      lineId: "CL-007",
      contractId: "SUP-2024-005",
      product: "Recycled Concrete",
      status: "Expired",
      notes: "Contract expired, pending renewal",
    },
    {
      id: 8,
      lineId: "CL-008",
      contractId: "SUP-2025-001",
      product: "#89 Stone",
      status: "Active",
      notes: "Decorative stone for landscaping projects",
    },
    {
      id: 9,
      lineId: "CL-009",
      contractId: "SUP-2025-002",
      product: "Masonry Sand",
      status: "Terminated",
      notes: "Contract terminated due to quality issues",
    },
    {
      id: 10,
      lineId: "CL-010",
      contractId: "SUP-2025-003",
      product: "Ready-Mix Concrete",
      status: "Draft",
      notes: "New supplier evaluation in progress",
    },
  ];

  const contracts = [
    "SUP-2024-001",
    "SUP-2024-002",
    "SUP-2024-003",
    "SUP-2024-004",
    "SUP-2024-005",
    "SUP-2025-001",
    "SUP-2025-002",
    "SUP-2025-003",
  ];

  const products = [
    "#57 Limestone",
    "#89 Stone",
    "Concrete Sand",
    "Fill Sand",
    "Ready-Mix Concrete",
    "Recycled Concrete",
    "Masonry Sand",
    "Rip Rap",
    "Asphalt Millings",
    "Granite Gravel",
  ];

  const statusOptions = ["Draft", "Active", "Expired", "Terminated"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    setEditingLine(null);
    setFormData({
      lineId: "",
      contractId: "",
      product: "",
      status: "Active",
      notes: "",
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setEditingLine(null);
    setFormData({
      lineId: "",
      contractId: "",
      product: "",
      status: "Active",
      notes: "",
    });
  };

  const handleEdit = (line) => {
    setEditingLine(line);
    setFormData({
      lineId: line.lineId,
      contractId: line.contractId,
      product: line.product,
      status: line.status,
      notes: line.notes,
    });
    setIsSheetOpen(true);
  };

  const handleAddNew = () => {
    setEditingLine(null);
    setFormData({
      lineId: "",
      contractId: "",
      product: "",
      status: "Draft",
      notes: "",
    });
    setIsSheetOpen(true);
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      Active:
        "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50",
      Expired:
        "bg-amber-500/10 hover:bg-amber-500/30 text-amber-700 dark:text-amber-400 border border-amber-500/50",
      Terminated:
        "bg-red-500/10 hover:bg-red-500/30 text-red-700 dark:text-red-400 border border-red-500/50",
      Draft:
        "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50",
    };
    return (
      colors[status] ||
      "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50"
    );
  };

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "lineId",
          label: "Line ID",
          type: "input",
          group: "Basic",
          placeholder: "Search line ID...",
        },
        {
          key: "contractId",
          label: "Contract",
          type: "select",
          group: "Basic",
          options: contracts.map((c) => ({ label: c, value: c })),
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

  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => {
        const line = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <div className="px-2 py-1.5 border-b mb-1">
                <p className="font-medium text-sm">{line.lineId}</p>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate(`/app/carrier-portal/materials/contract-lines/details?id=${line.id}`)}
              >
                <EyeIcon className="h-4 w-4 mr-2" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleEdit(line)}
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
      accessorKey: "lineId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Line ID" />
      ),
      cell: ({ row }) => {
        const lineId = row.getValue("lineId");
        return <span className="font-mono text-sm">{lineId}</span>;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "contractId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Contract ID" />
      ),
      cell: ({ row }) => {
        const contractId = row.getValue("contractId");
        return <span className="font-mono text-sm">{contractId}</span>;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "product",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Product" />
      ),
      enableSorting: true,
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
    {
      accessorKey: "notes",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Notes" />
      ),
      cell: ({ row }) => {
        const notes = row.getValue("notes");
        return (
          <span className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
            {notes}
          </span>
        );
      },
      enableSorting: false,
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
            Add Contract Line
          </Button>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={contractLines}
          showViewOptions={false}
        />
      </div>

      {/* Add/Edit Contract Line Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingLine ? "Edit Contract Line" : "Add New Contract Line"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4 px-6">
            {/* Line ID */}
            <div className="space-y-2">
              <Label
                htmlFor="lineId"
                className="text-sm font-medium text-foreground"
              >
                Line ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lineId"
                type="text"
                placeholder="e.g., CL-001"
                value={formData.lineId}
                onChange={(e) => handleInputChange("lineId", e.target.value)}
                className="h-10 font-mono"
                required
              />
            </div>

            {/* Contract ID */}
            <div className="space-y-2">
              <Label
                htmlFor="contractId"
                className="text-sm font-medium text-foreground"
              >
                Contract ID <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.contractId}
                onValueChange={(value) => handleInputChange("contractId", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select contract" />
                </SelectTrigger>
                <SelectContent>
                  {contracts.map((contract) => (
                    <SelectItem key={contract} value={contract}>
                      {contract}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Product */}
            <div className="space-y-2">
              <Label
                htmlFor="product"
                className="text-sm font-medium text-foreground"
              >
                Product <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.product}
                onValueChange={(value) => handleInputChange("product", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product} value={product}>
                      {product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label
                htmlFor="status"
                className="text-sm font-medium text-foreground"
              >
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label
                htmlFor="notes"
                className="text-sm font-medium text-foreground"
              >
                Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Enter notes..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="min-h-[100px]"
              />
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
                {editingLine ? "Update Line" : "Create Line"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ContractLines;
