import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import SmartFilter from "@/components/SmartFilter";
import { PlusIcon, MoreHorizontalIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AllocationCard = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [formData, setFormData] = useState({
    allocationCode: "",
    description: "",
    effectiveDate: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Allocation submitted:", formData);
    setIsSheetOpen(false);
    setFormData({
      allocationCode: "",
      description: "",
      effectiveDate: "",
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setFormData({
      allocationCode: "",
      description: "",
      effectiveDate: "",
    });
  };

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "allocationCode",
          label: "Allocation Code",
          type: "input",
          group: "Basic",
          placeholder: "Search allocation code...",
        },
        {
          key: "description",
          label: "Description",
          type: "input",
          group: "Basic",
          placeholder: "Search description...",
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Mock allocation data
  const allocationData = [
    {
      id: 1,
      allocationCode: "MIAFBO",
      description: "South Intra-State OO",
      effectiveDate: "11/13/2025",
    },
    {
      id: 2,
      allocationCode: "DALCEN",
      description: "Dallas Central Region",
      effectiveDate: "10/25/2025",
    },
    {
      id: 3,
      allocationCode: "HOUNOR",
      description: "Houston North Division",
      effectiveDate: "09/15/2025",
    },
  ];

  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "allocationCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Allocation Code" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "effectiveDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Effective Date" />
      ),
      enableSorting: true,
    },
  ];

  return (
    <div className="border border-border rounded-lg p-4 bg-background">
      <div className="flex items-center justify-between mb-3">
        <SmartFilter
          filterGroups={filterGroups}
          onFiltersChange={handleFiltersChange}
        />
        <Button
          size="sm"
          className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
          onClick={() => setIsSheetOpen(true)}
        >
          <PlusIcon className="size-3" />
          Add Allocation
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={allocationData}
        showViewOptions={false}
        pageSize={10}
      />

      {/* Add Allocation Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold">
              Add Allocation
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4 mb-2 px-6">
            {/* Allocation Code */}
            <div className="space-y-2">
              <Label htmlFor="allocationCode">
                Allocation Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="allocationCode"
                type="text"
                placeholder="Enter Allocation Code"
                value={formData.allocationCode}
                onChange={(e) => handleInputChange("allocationCode", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Input
                id="description"
                type="text"
                placeholder="Enter Description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Effective Date */}
            <div className="space-y-2">
              <Label htmlFor="effectiveDate">
                Effective Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="effectiveDate"
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => handleInputChange("effectiveDate", e.target.value)}
                className="h-10"
                required
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
                Add Allocation
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AllocationCard;
