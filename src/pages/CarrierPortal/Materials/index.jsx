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
  EyeOffIcon,
} from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

const Materials = () => {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [filters, setFilters] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    uom: "",
    description: "",
    status: "Active",
  });

  // Mock data for materials based on Mega Materials documentation
  const materials = [
    {
      id: 1,
      name: "#57 Limestone",
      sku: "MAT-LS-057",
      uom: "ton",
      description: "Crushed limestone, 3/4 inch nominal size. FDOT approved for base and drainage applications.",
      status: "Active",
    },
    {
      id: 2,
      name: "Concrete Sand",
      sku: "MAT-SD-001",
      uom: "ton",
      description: "Fine aggregate for concrete mix. Meets ASTM C33 specifications.",
      status: "Active",
    },
    {
      id: 3,
      name: "Fill Sand",
      sku: "MAT-SD-002",
      uom: "ton",
      description: "General purpose fill sand for grading and backfill applications.",
      status: "Active",
    },
    {
      id: 4,
      name: "Ready-Mix Concrete",
      sku: "MAT-CON-001",
      uom: "cubic yard",
      description: "Standard 3000 PSI ready-mix concrete. Custom mixes available.",
      status: "Active",
    },
    {
      id: 5,
      name: "Recycled Concrete",
      sku: "MAT-REC-001",
      uom: "ton",
      description: "Crushed recycled concrete aggregate. Eco-friendly alternative for base material.",
      status: "Active",
    },
    {
      id: 6,
      name: "#89 Stone",
      sku: "MAT-ST-089",
      uom: "ton",
      description: "Pea gravel size crushed stone. Used for drainage and decorative applications.",
      status: "Active",
    },
    {
      id: 7,
      name: "Masonry Sand",
      sku: "MAT-SD-003",
      uom: "ton",
      description: "Fine washed sand for mortar and masonry work.",
      status: "Active",
    },
    {
      id: 8,
      name: "Rip Rap",
      sku: "MAT-ST-RRP",
      uom: "ton",
      description: "Large stone for erosion control and slope stabilization.",
      status: "Inactive",
    },
    {
      id: 9,
      name: "Asphalt Millings",
      sku: "MAT-REC-002",
      uom: "ton",
      description: "Recycled asphalt pavement for driveways and parking areas.",
      status: "Active",
    },
    {
      id: 10,
      name: "Granite Gravel",
      sku: "MAT-ST-GRN",
      uom: "ton",
      description: "Decorative granite stone for landscaping applications.",
      status: "Inactive",
    },
  ];

  const uomOptions = ["ton", "cubic yard", "piece", "bag"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    setEditingMaterial(null);
    setFormData({
      name: "",
      sku: "",
      uom: "",
      description: "",
      status: "Active",
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setEditingMaterial(null);
    setFormData({
      name: "",
      sku: "",
      uom: "",
      description: "",
      status: "Active",
    });
  };

  const handleEdit = (material) => {
    setEditingMaterial(material);
    setFormData({
      name: material.name,
      sku: material.sku,
      uom: material.uom,
      description: material.description,
      status: material.status,
    });
    setIsSheetOpen(true);
  };

  const handleAddNew = () => {
    setEditingMaterial(null);
    setFormData({
      name: "",
      sku: "",
      uom: "",
      description: "",
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

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "name",
          label: "Name",
          type: "input",
          group: "Basic",
          placeholder: "Search material name...",
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
        const material = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <div className="px-2 py-1.5 border-b mb-1">
                <p className="font-medium text-sm">{material.name}</p>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleEdit(material)}
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
        <DataTableColumnHeader column={column} title="Material Name" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "sku",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="SKU" />
      ),
      cell: ({ row }) => {
        const sku = row.getValue("sku");
        return <span className="font-mono text-sm">{sku}</span>;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "uom",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="UOM" />
      ),
      cell: ({ row }) => {
        const uom = row.getValue("uom");
        return <span className="text-muted-foreground">{uom}</span>;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => {
        const description = row.getValue("description");
        return (
          <span className="text-sm text-muted-foreground line-clamp-2 max-w-md">
            {description}
          </span>
        );
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
            Add Material
          </Button>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={materials}
          showViewOptions={false}
        />
      </div>

      {/* Add/Edit Material Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingMaterial ? "Edit Material" : "Add New Material"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4 px-6">
            {/* Material Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Material Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., #57 Limestone"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* SKU */}
            <div className="space-y-2">
              <Label
                htmlFor="sku"
                className="text-sm font-medium text-foreground"
              >
                SKU (Stock Keeping Unit) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="sku"
                type="text"
                placeholder="e.g., MAT-LS-057"
                value={formData.sku}
                onChange={(e) => handleInputChange("sku", e.target.value)}
                className="h-10 font-mono"
                required
              />
            </div>

            {/* UOM */}
            <div className="space-y-2">
              <Label
                htmlFor="uom"
                className="text-sm font-medium text-foreground"
              >
                UOM (Unit of Measure) <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.uom}
                onValueChange={(value) => handleInputChange("uom", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select UOM" />
                </SelectTrigger>
                <SelectContent>
                  {uomOptions.map((uom) => (
                    <SelectItem key={uom} value={uom}>
                      {uom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                placeholder="Enter material specifications and details..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
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
                {editingMaterial ? "Update Material" : "Create Material"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Materials;
