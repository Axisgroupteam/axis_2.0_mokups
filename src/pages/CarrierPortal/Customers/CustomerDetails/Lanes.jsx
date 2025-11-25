import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusIcon, MoreHorizontalIcon, Search } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const Lanes = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [formData, setFormData] = useState({
    templateRate: "",
    description: "",
    originMethod: "",
    destinationMethod: "",
    originLocation: "",
    destinationLocation: "",
    customerRateMethod: "",
    driverRateMethod: "",
    customerRate: "",
    driverRate: "",
    distance: "",
    po: "",
  });

  // Filter configurations
  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "templateRateName",
          label: "Template Name",
          type: "input",
          group: "Basic",
          placeholder: "Search template...",
        },
        {
          key: "customerRateMethod",
          label: "Customer Rate Method",
          type: "select",
          group: "Basic",
          options: [
            { value: "Per Mile", label: "Per Mile" },
            { value: "Flat Rate", label: "Flat Rate" },
            { value: "Per Hour", label: "Per Hour" },
          ],
        },
        {
          key: "driverRateMethod",
          label: "Driver Rate Method",
          type: "select",
          group: "Basic",
          options: [
            { value: "Per Mile", label: "Per Mile" },
            { value: "Flat Rate", label: "Flat Rate" },
            { value: "Per Hour", label: "Per Hour" },
          ],
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Mock lanes data
  const lanes = [
    {
      id: 1,
      templateRateName: "NY to LA Express",
      miles: 2789,
      customerRate: 2500.0,
      customerRateMethod: "Per Mile",
      driverRate: 2000.0,
      driverRateMethod: "Per Mile",
      originRate: 150.0,
      originMethod: "Flat Rate",
      destinyRate: 150.0,
      destinationMethod: "Flat Rate",
      po: "PO-12345",
    },
    {
      id: 2,
      templateRateName: "Chicago to Houston",
      miles: 1084,
      customerRate: 1200.0,
      customerRateMethod: "Flat Rate",
      driverRate: 950.0,
      driverRateMethod: "Flat Rate",
      originRate: 100.0,
      originMethod: "Per Hour",
      destinyRate: 100.0,
      destinationMethod: "Per Hour",
      po: "PO-12346",
    },
    {
      id: 3,
      templateRateName: "Atlanta to Miami",
      miles: 663,
      customerRate: 850.0,
      customerRateMethod: "Per Mile",
      driverRate: 680.0,
      driverRateMethod: "Per Mile",
      originRate: 75.0,
      originMethod: "Flat Rate",
      destinyRate: 75.0,
      destinationMethod: "Flat Rate",
      po: "PO-12347",
    },
    {
      id: 4,
      templateRateName: "Boston to DC",
      miles: 442,
      customerRate: 600.0,
      customerRateMethod: "Flat Rate",
      driverRate: 480.0,
      driverRateMethod: "Flat Rate",
      originRate: 50.0,
      originMethod: "Per Hour",
      destinyRate: 50.0,
      destinationMethod: "Per Hour",
      po: "PO-12348",
    },
    {
      id: 5,
      templateRateName: "Seattle to Portland",
      miles: 174,
      customerRate: 350.0,
      customerRateMethod: "Per Mile",
      driverRate: 280.0,
      driverRateMethod: "Per Mile",
      originRate: 40.0,
      originMethod: "Flat Rate",
      destinyRate: 40.0,
      destinationMethod: "Flat Rate",
      po: "PO-12349",
    },
  ];

  // Column definitions
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
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "templateRateName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Template Rate Name" />
      ),
      size: 160,
    },
    {
      accessorKey: "miles",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Miles" />
      ),
      size: 80,
    },
    {
      accessorKey: "customerRate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer Rate" />
      ),
      size: 120,
      cell: ({ row }) => `$${row.getValue("customerRate").toFixed(2)}`,
    },
    {
      accessorKey: "customerRateMethod",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cust. Rate Method" />
      ),
      size: 130,
    },
    {
      accessorKey: "driverRate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Driver Rate" />
      ),
      size: 110,
      cell: ({ row }) => `$${row.getValue("driverRate").toFixed(2)}`,
    },
    {
      accessorKey: "driverRateMethod",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Driver Rate Method" />
      ),
      size: 140,
    },
    {
      accessorKey: "originRate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Origin Rate" />
      ),
      size: 100,
      cell: ({ row }) => `$${row.getValue("originRate").toFixed(2)}`,
    },
    {
      accessorKey: "originMethod",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Origin Method" />
      ),
      size: 120,
    },
    {
      accessorKey: "destinyRate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dest. Rate" />
      ),
      size: 100,
      cell: ({ row }) => `$${row.getValue("destinyRate").toFixed(2)}`,
    },
    {
      accessorKey: "destinationMethod",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dest. Method" />
      ),
      size: 120,
    },
    {
      accessorKey: "po",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="PO" />
      ),
      size: 100,
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    setFormData({
      templateRate: "",
      description: "",
      originMethod: "",
      destinationMethod: "",
      originLocation: "",
      destinationLocation: "",
      customerRateMethod: "",
      driverRateMethod: "",
      customerRate: "",
      driverRate: "",
      distance: "",
      po: "",
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setFormData({
      templateRate: "",
      description: "",
      originMethod: "",
      destinationMethod: "",
      originLocation: "",
      destinationLocation: "",
      customerRateMethod: "",
      driverRateMethod: "",
      customerRate: "",
      driverRate: "",
      distance: "",
      po: "",
    });
  };

  const handleRecalculate = () => {
    // Logic to recalculate distance
    console.log("Recalculating distance...");
  };

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
          Add Lane
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={lanes}
        showViewOptions={false}
        pageSize={10}
      />

      {/* Add Lane Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-3xl overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <div className="flex items-center gap-3">
              <div>
                <SheetTitle className="text-xl font-bold text-gray-900">
                  Add Lane
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-2 mb-2 px-6">
            {/* Template Rate */}
            <div className="space-y-2">
              <Label htmlFor="templateRate" className="text-sm font-medium text-gray-700">
                Template Rate <span className="text-red-500">*</span>
              </Label>
              <Input
                id="templateRate"
                type="text"
                placeholder="Enter Template Rate"
                value={formData.templateRate}
                onChange={(e) => handleInputChange("templateRate", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter Description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="min-h-24 resize-none"
              />
            </div>

            {/* Origin Method and Destination Method */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="originMethod" className="text-sm font-medium text-gray-700">
                  Origin Method <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.originMethod}
                  onValueChange={(value) => handleInputChange("originMethod", value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Location Code" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Location Code">Location Code</SelectItem>
                    <SelectItem value="Address">Address</SelectItem>
                    <SelectItem value="GPS Coordinates">GPS Coordinates</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="destinationMethod" className="text-sm font-medium text-gray-700">
                  Destination Method <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.destinationMethod}
                  onValueChange={(value) => handleInputChange("destinationMethod", value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Location Code" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Location Code">Location Code</SelectItem>
                    <SelectItem value="Address">Address</SelectItem>
                    <SelectItem value="GPS Coordinates">GPS Coordinates</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Origin Location and Destination Location */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="originLocation" className="text-sm font-medium text-gray-700">
                  Origin Location <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="originLocation"
                    type="text"
                    placeholder="Select Origin Location"
                    value={formData.originLocation}
                    onChange={(e) => handleInputChange("originLocation", e.target.value)}
                    className="h-10 pr-10"
                    required
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="destinationLocation" className="text-sm font-medium text-gray-700">
                  Destination Location
                </Label>
                <div className="relative">
                  <Input
                    id="destinationLocation"
                    type="text"
                    placeholder="Select Destination Location"
                    value={formData.destinationLocation}
                    onChange={(e) => handleInputChange("destinationLocation", e.target.value)}
                    className="h-10 pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Customer Rate Method and Driver Rate Method */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerRateMethod" className="text-sm font-medium text-gray-700">
                  Customer Rate Method <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.customerRateMethod}
                  onValueChange={(value) => handleInputChange("customerRateMethod", value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Please select one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Per Mile">Per Mile</SelectItem>
                    <SelectItem value="Flat Rate">Flat Rate</SelectItem>
                    <SelectItem value="Per Hour">Per Hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="driverRateMethod" className="text-sm font-medium text-gray-700">
                  Driver Rate Method <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.driverRateMethod}
                  onValueChange={(value) => handleInputChange("driverRateMethod", value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Please select one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Per Mile">Per Mile</SelectItem>
                    <SelectItem value="Flat Rate">Flat Rate</SelectItem>
                    <SelectItem value="Per Hour">Per Hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Customer Rate and Driver Rate */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerRate" className="text-sm font-medium text-gray-700">
                  Customer Rate <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="customerRate"
                  type="number"
                  placeholder="Enter Customer Rate"
                  value={formData.customerRate}
                  onChange={(e) => handleInputChange("customerRate", e.target.value)}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="driverRate" className="text-sm font-medium text-gray-700">
                  Driver Rate <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="driverRate"
                  type="number"
                  placeholder="Enter Driver Rate"
                  value={formData.driverRate}
                  onChange={(e) => handleInputChange("driverRate", e.target.value)}
                  className="h-10"
                  required
                />
              </div>
            </div>

            {/* Distance and PO */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="distance" className="text-sm font-medium text-gray-700">
                  Distance <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="distance"
                    type="number"
                    placeholder="Enter Distance"
                    value={formData.distance}
                    onChange={(e) => handleInputChange("distance", e.target.value)}
                    className="h-10 flex-1"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleRecalculate}
                    className="h-10"
                  >
                    Recalculate
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  The distance has been calculated automatically. If you want to adjust it manually, you can edit the value directly.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="po" className="text-sm font-medium text-gray-700">
                  PO
                </Label>
                <Input
                  id="po"
                  type="text"
                  placeholder="Enter PO"
                  value={formData.po}
                  onChange={(e) => handleInputChange("po", e.target.value)}
                  className="h-10"
                />
              </div>
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
                Add Lane
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Lanes;
