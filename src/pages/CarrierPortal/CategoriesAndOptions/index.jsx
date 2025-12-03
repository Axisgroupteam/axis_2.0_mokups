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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  PlusIcon,
  MoreHorizontalIcon,
  PencilIcon,
  ListIcon,
  EyeIcon,
  EyeOffIcon,
  Trash2Icon,
} from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

const CategoriesAndOptions = () => {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [filters, setFilters] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    options: [],
  });
  const [newOption, setNewOption] = useState("");
  const [viewOptionsModal, setViewOptionsModal] = useState({ open: false, category: null });

  // Mock data for categories
  const categories = [
    {
      id: 1,
      name: "Role",
      options: [
        { name: "Administrator", active: true },
        { name: "Manager", active: true },
        { name: "Driver", active: false },
        { name: "Dispatcher", active: true },
        { name: "Technician", active: false },
        { name: "Employee", active: true },
      ],
    },
    {
      id: 2,
      name: "Fleet Type",
      options: [
        { name: "Bulk", active: true },
        { name: "Aggregate", active: true },
        { name: "Flatbed", active: false },
        { name: "Tanker", active: true },
      ],
    },
    {
      id: 3,
      name: "Driver Status",
      options: [
        { name: "Active", active: true },
        { name: "Inactive", active: true },
        { name: "On Leave", active: true },
        { name: "Suspended", active: false },
        { name: "Terminated", active: true },
      ],
    },
    {
      id: 4,
      name: "Vehicle Status",
      options: [
        { name: "Active", active: true },
        { name: "Inactive", active: true },
        { name: "In Maintenance", active: true },
        { name: "Retired", active: false },
      ],
    },
    {
      id: 5,
      name: "Trailer Type",
      options: [
        { name: "Dry Van", active: true },
        { name: "Refrigerated", active: true },
        { name: "Flatbed", active: true },
        { name: "Tanker", active: true },
        { name: "Hopper", active: false },
        { name: "Lowboy", active: true },
        { name: "Step Deck", active: true },
        { name: "Dump", active: false },
      ],
    },
    {
      id: 6,
      name: "Payment Method",
      options: [
        { name: "Check", active: true },
        { name: "Direct Deposit", active: true },
        { name: "Wire Transfer", active: true },
        { name: "Cash", active: false },
        { name: "Credit Card", active: true },
      ],
    },
    {
      id: 7,
      name: "Document Type",
      options: [
        { name: "License", active: true },
        { name: "Insurance", active: true },
        { name: "Registration", active: true },
        { name: "Permit", active: true },
        { name: "Medical Card", active: true },
        { name: "Contract", active: true },
        { name: "Invoice", active: true },
        { name: "BOL", active: true },
        { name: "POD", active: true },
        { name: "Agreement", active: false },
      ],
    },
    {
      id: 8,
      name: "Fuel Type",
      options: [
        { name: "Diesel", active: true },
        { name: "Gasoline", active: true },
        { name: "Electric", active: false },
      ],
    },
    {
      id: 9,
      name: "License Category",
      options: [
        { name: "Class A CDL", active: true },
        { name: "Class B CDL", active: true },
        { name: "Class C CDL", active: true },
        { name: "Non-CDL", active: false },
      ],
    },
    {
      id: 10,
      name: "Endorsement Type",
      options: [
        { name: "Hazmat", active: true },
        { name: "Tanker", active: true },
        { name: "Double/Triple", active: true },
        { name: "Passenger", active: false },
        { name: "School Bus", active: false },
        { name: "Air Brakes", active: true },
        { name: "Combination", active: true },
      ],
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddOption = () => {
    if (newOption.trim()) {
      setFormData((prev) => ({
        ...prev,
        options: [...prev.options, { name: newOption.trim(), active: true }],
      }));
      setNewOption("");
    }
  };

  const handleRemoveOption = (index) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleToggleOptionStatus = (index) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) =>
        i === index ? { ...opt, active: !opt.active } : opt
      ),
    }));
  };

  const handleEditOption = (index) => {
    const optionToEdit = formData.options[index];
    setNewOption(optionToEdit.name);
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    setEditingCategory(null);
    setFormData({
      name: "",
      options: [],
    });
    setNewOption("");
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setEditingCategory(null);
    setFormData({
      name: "",
      options: [],
    });
    setNewOption("");
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      options: category.options.map((opt) => ({ name: opt.name, active: opt.active })),
    });
    setNewOption("");
    setIsSheetOpen(true);
  };

  const handleManageOptions = (category) => {
    navigate(`/app/carrier-portal/master/categories/${category.id}/options`);
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
          placeholder: "Enter category name...",
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
        const category = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <div className="px-2 py-1.5 border-b mb-1">
                <p className="font-medium text-sm">{category.name}</p>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleEdit(category)}
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
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "options",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Options" />
      ),
      cell: ({ row }) => {
        const options = row.getValue("options");
        const category = row.original;
        const maxVisible = 3;
        const visibleOptions = options.slice(0, maxVisible);
        const remainingCount = options.length - maxVisible;

        return (
          <div className="flex flex-wrap items-center gap-1">
            {visibleOptions.map((option, index) => (
              <Badge
                key={index}
                className={`text-xs ${
                  option.active
                    ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                    : "bg-gray-500/10 text-gray-400 border border-gray-500/20 line-through"
                }`}
              >
                {option.name}
              </Badge>
            ))}
            {remainingCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={() => setViewOptionsModal({ open: true, category })}
              >
                +{remainingCount} more
              </Button>
            )}
          </div>
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
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={categories}
          showViewOptions={false}
        />
      </div>

      {/* Add/Edit Category Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4 px-6">
            {/* Name - Only show for new category, show as read-only for edit */}
            {!editingCategory ? (
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Category Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter category name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="h-10"
                  required
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Category Name
                </Label>
                <div className="h-10 px-3 flex items-center bg-muted rounded-md border">
                  <span className="text-sm text-foreground">{formData.name}</span>
                </div>
              </div>
            )}

            {/* Options */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">
                Options <span className="text-red-500">*</span>
              </Label>

              {/* Add Option Input */}
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Enter option name"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  className="h-10 flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddOption();
                    }
                  }}
                />
                <Button
                  type="button"
                  className="h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                  disabled={!newOption.trim()}
                  onClick={handleAddOption}
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>

              {/* Added Options List */}
              {formData.options.length > 0 && (
                <div className="space-y-2 mt-3">
                  {formData.options.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between py-2 px-3 border rounded-md ${
                        editingCategory && !option.active ? "opacity-50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ListIcon className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm text-foreground">
                          {option.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 text-foreground hover:bg-muted rounded-sm border-none"
                          onClick={() => handleEditOption(index)}
                        >
                          <PencilIcon className="size-3.5" />
                        </Button>
                        {editingCategory ? (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-sm text-foreground hover:bg-muted border-none"
                            onClick={() => handleToggleOptionStatus(index)}
                          >
                            {option.active ? (
                              <EyeIcon className="h-3.5 w-3.5" />
                            ) : (
                              <EyeOffIcon className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 rounded-sm"
                            onClick={() => handleRemoveOption(index)}
                          >
                            <Trash2Icon className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                {editingCategory ? "Update Category" : "Create Category"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* View Options Modal */}
      <Dialog
        open={viewOptionsModal.open}
        onOpenChange={(open) => setViewOptionsModal({ open, category: open ? viewOptionsModal.category : null })}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {viewOptionsModal.category?.name} Options
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {viewOptionsModal.category?.options.map((option, index) => (
                <Badge
                  key={index}
                  className={`px-3 py-1.5 text-sm ${
                    option.active
                      ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                      : "bg-gray-500/10 text-gray-400 border border-gray-500/20 line-through"
                  }`}
                >
                  {option.name}
                </Badge>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoriesAndOptions;
