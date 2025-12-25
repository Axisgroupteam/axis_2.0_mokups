import { useState, useCallback } from "react";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  TrashIcon,
} from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

const Pricing = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingModel, setEditingModel] = useState(null);
  const [filters, setFilters] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    value: "",
    applicableEntities: [],
    isActive: true,
  });

  // 8 Pricing Models based on documentation
  const pricingModels = [
    {
      id: 1,
      name: "Company Driver Tiered",
      type: "Tiered (Score)",
      formula: "Cost + Tier %",
      description: "Platinum: +3%, Gold: +5%, Silver: +7%, Bronze: +10%",
      applicableEntities: ["Company Driver"],
      isActive: true,
    },
    {
      id: 2,
      name: "Owner-Operator Standard",
      type: "Cost-Plus (%)",
      formula: "Cost + 8%",
      description: "Our cost plus 8% markup",
      applicableEntities: ["Owner-Operator"],
      isActive: true,
    },
    {
      id: 3,
      name: "Franchise Ceiling Rate",
      type: "Cost-Plus (%)",
      formula: "Cost + 8%",
      description: "Ceiling rate for franchise partners",
      applicableEntities: ["Franchise Driver"],
      isActive: true,
    },
    {
      id: 4,
      name: "Carrier Fuel Advance",
      type: "Cost-Plus (%)",
      formula: "Cost + 10%",
      description: "Rate for carrier fuel advances",
      applicableEntities: ["Carrier"],
      isActive: true,
    },
    {
      id: 5,
      name: "Fixed Rate Program",
      type: "Fixed Rate",
      formula: "$3.25/gal",
      description: "Static price regardless of pump price",
      applicableEntities: ["Company Driver", "Owner-Operator"],
      isActive: true,
    },
    {
      id: 6,
      name: "Pump Discount - Standard",
      type: "Pump Discount (Flat)",
      formula: "Pump - $0.15",
      description: "Pump price minus $0.15 per gallon",
      applicableEntities: ["Company Driver", "Owner-Operator", "Franchise Driver"],
      isActive: true,
    },
    {
      id: 7,
      name: "Per-Mile Allowance",
      type: "Per-Mile",
      formula: "$0.52/mile",
      description: "Fuel allowance based on dispatched miles",
      applicableEntities: ["Owner-Operator"],
      isActive: true,
    },
    {
      id: 8,
      name: "Volume Discount Program",
      type: "Pump Discount (%)",
      formula: "Pump - 3%",
      description: "3% discount off pump price for high volume",
      applicableEntities: ["Carrier"],
      isActive: false,
    },
  ];

  // 8 Pricing Types from documentation
  const pricingTypes = [
    "Fixed Rate",
    "Pump Discount (Flat)",
    "Pump Discount (%)",
    "Per-Mile",
    "Cost-Plus (Flat)",
    "Cost-Plus (%)",
    "Tiered (Score)",
    "Custom",
  ];

  const entityTypes = ["Company Driver", "Owner-Operator", "Franchise Driver", "Carrier"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEntityChange = (entity, checked) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        applicableEntities: [...prev.applicableEntities, entity],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        applicableEntities: prev.applicableEntities.filter((e) => e !== entity),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    setEditingModel(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      value: "",
      applicableEntities: [],
      isActive: true,
    });
  };

  const handleEdit = (model) => {
    setEditingModel(model);
    setFormData({
      name: model.name,
      type: model.type,
      value: model.formula,
      applicableEntities: model.applicableEntities,
      isActive: model.isActive,
    });
    setIsSheetOpen(true);
  };

  const handleAddNew = () => {
    setEditingModel(null);
    resetForm();
    setIsSheetOpen(true);
  };

  const getTypeBadgeColor = (type) => {
    const colors = {
      "Fixed Rate": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/50",
      "Pump Discount (Flat)": "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/50",
      "Pump Discount (%)": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50",
      "Per-Mile": "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/50",
      "Cost-Plus (Flat)": "bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/50",
      "Cost-Plus (%)": "bg-violet-500/10 text-violet-700 dark:text-violet-400 border border-violet-500/50",
      "Tiered (Score)": "bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/50",
      "Custom": "bg-pink-500/10 text-pink-700 dark:text-pink-400 border border-pink-500/50",
    };
    return colors[type] || "bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "name",
          label: "Model Name",
          type: "input",
          group: "Basic",
          placeholder: "Search model...",
        },
        {
          key: "type",
          label: "Type",
          type: "select",
          group: "Basic",
          options: pricingTypes.map((t) => ({ label: t, value: t })),
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
  }, []);

  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => {
        const model = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-40">
              <DropdownMenuItem className="cursor-pointer" onClick={() => handleEdit(model)}>
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Model Name" />,
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("name")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "type",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => {
        const type = row.getValue("type");
        return <Badge className={getTypeBadgeColor(type)}>{type}</Badge>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "formula",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Formula" />,
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("formula")}</span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "description",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">{row.getValue("description")}</span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "applicableEntities",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Applies To" />,
      cell: ({ row }) => {
        const entities = row.getValue("applicableEntities");
        return (
          <div className="flex flex-wrap gap-1">
            {entities.map((entity, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {entity}
              </Badge>
            ))}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const isActive = row.getValue("isActive");
        return (
          <Badge className={isActive
            ? "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/50"
            : "bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/50"
          }>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
      enableSorting: true,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-auto p-4">
      <div className="flex items-center justify-between mb-1">
        <SmartFilter filterGroups={filterGroups} onFiltersChange={handleFiltersChange} />
        <Button
          onClick={handleAddNew}
          className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Pricing Model
        </Button>
      </div>
      <DataTable columns={columns} data={pricingModels} showViewOptions={false} />

      {/* Add/Edit Pricing Model Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingModel ? "Edit Pricing Model" : "Add Pricing Model"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4 px-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Model Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g., Company Driver Tiered"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-medium">
                Pricing Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select pricing type" />
                </SelectTrigger>
                <SelectContent>
                  {pricingTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="value" className="text-sm font-medium">
                Value/Formula <span className="text-red-500">*</span>
              </Label>
              <Input
                id="value"
                placeholder="e.g., Cost + 5%, $3.25/gal, Pump - $0.15"
                value={formData.value}
                onChange={(e) => handleInputChange("value", e.target.value)}
                className="h-10"
                required
              />
              <p className="text-xs text-muted-foreground">
                Examples: "Cost + 5%", "$3.25/gal", "Pump - $0.15", "$0.52/mile"
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Applicable Entities <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-wrap gap-4 pt-2">
                {entityTypes.map((entity) => (
                  <div key={entity} className="flex items-center space-x-2">
                    <Checkbox
                      id={entity}
                      checked={formData.applicableEntities.includes(entity)}
                      onCheckedChange={(checked) => handleEntityChange(entity, checked)}
                    />
                    <label
                      htmlFor={entity}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {entity}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => setIsSheetOpen(false)} className="flex-1 h-10">
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {editingModel ? "Update Model" : "Create Model"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Pricing;
