import { useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import SmartFilter from "@/components/SmartFilter";
import { PlusIcon, MoreHorizontalIcon, Search } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

const EquipmentCard = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [formData, setFormData] = useState({
    equipmentType: "",
    status: "",
    memo: "",
    issuedDate: "",
    issuedBy: "",
    location: "",
    receivedDate: "",
    returnedDate: "",
    quantity: "",
    value: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Equipment submitted:", formData);
    setIsSheetOpen(false);
    setFormData({
      equipmentType: "",
      status: "",
      memo: "",
      issuedDate: "",
      issuedBy: "",
      location: "",
      receivedDate: "",
      returnedDate: "",
      quantity: "",
      value: "",
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setFormData({
      equipmentType: "",
      status: "",
      memo: "",
      issuedDate: "",
      issuedBy: "",
      location: "",
      receivedDate: "",
      returnedDate: "",
      quantity: "",
      value: "",
    });
  };

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "equipmentType",
          label: "Equipment Type",
          type: "input",
          group: "Basic",
          placeholder: "Search equipment type...",
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "Issued", label: "Issued" },
            { value: "Returned", label: "Returned" },
            { value: "Lost", label: "Lost" },
          ],
        },
        {
          key: "issuedBy",
          label: "Issued By",
          type: "input",
          group: "Basic",
          placeholder: "Search issued by...",
        },
        {
          key: "location",
          label: "Location",
          type: "input",
          group: "Basic",
          placeholder: "Search location...",
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Mock equipment data
  const equipmentData = [
    {
      id: 1,
      returnedDate: "",
      equipmentType: "CAM - Samsara Ca...",
      status: "Issued",
      memo: "GJKF-D4R-GB5",
      issuedDate: "11/13/2025 0834",
      issuedBy: "John Smith",
      location: "",
      receivedDate: "",
      quantity: 1,
      value: "",
    },
    {
      id: 2,
      returnedDate: "",
      equipmentType: "ELD - Samsara EL...",
      status: "Issued",
      memo: "G6JK-PVV-KDX",
      issuedDate: "11/13/2025 0833",
      issuedBy: "Sarah Johnson",
      location: "",
      receivedDate: "",
      quantity: 1,
      value: "",
    },
    {
      id: 3,
      returnedDate: "",
      equipmentType: "EFS - ELECTRONI...",
      status: "Issued",
      memo: "708305003088494...",
      issuedDate: "11/13/2025 0832",
      issuedBy: "Michael Brown",
      location: "",
      receivedDate: "",
      quantity: 1,
      value: "",
    },
  ];

  const getStatusBadgeColor = (status) => {
    const colors = {
      Issued: "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50",
      Returned: "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50",
      Lost: "bg-red-500/10 hover:bg-red-500/30 text-red-700 dark:text-red-400 border border-red-500/50",
    };
    return colors[status] || "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

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
      accessorKey: "returnedDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Returned Date" />
      ),
      cell: ({ row }) => row.getValue("returnedDate") || "-",
      enableSorting: true,
    },
    {
      accessorKey: "equipmentType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Equipment Type" />
      ),
      enableSorting: true,
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
    },
    {
      accessorKey: "memo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Memo" />
      ),
      cell: ({ row }) => row.getValue("memo") || "-",
      enableSorting: true,
    },
    {
      accessorKey: "issuedDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Issued Date" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "issuedBy",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Issued By" />
      ),
      cell: ({ row }) => row.getValue("issuedBy") || "-",
      enableSorting: true,
    },
    {
      accessorKey: "location",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Location" />
      ),
      cell: ({ row }) => row.getValue("location") || "-",
      enableSorting: true,
    },
    {
      accessorKey: "receivedDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Received" />
      ),
      cell: ({ row }) => row.getValue("receivedDate") || "-",
      enableSorting: true,
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Quantity" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "value",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Value" />
      ),
      cell: ({ row }) => row.getValue("value") || "-",
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
          Add Equipment
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={equipmentData}
        showViewOptions={false}
        pageSize={10}
      />

      {/* Add Equipment Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold">
              Add Equipment
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4 mb-2 px-6">
            {/* Equipment Type */}
            <div className="space-y-2">
              <Label htmlFor="equipmentType">
                Equipment Type <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="equipmentType"
                  type="text"
                  placeholder="Select Equipment Type"
                  value={formData.equipmentType}
                  onChange={(e) => handleInputChange("equipmentType", e.target.value)}
                  className="h-10 pr-10"
                  required
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Status and Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">
                  Status <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Issued">Issued</SelectItem>
                    <SelectItem value="Returned">Returned</SelectItem>
                    <SelectItem value="Lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">
                  Quantity <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter Quantity"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  className="h-10"
                  required
                />
              </div>
            </div>

            {/* Memo */}
            <div className="space-y-2">
              <Label htmlFor="memo">Memo</Label>
              <Textarea
                id="memo"
                placeholder="Enter Memo"
                value={formData.memo}
                onChange={(e) => handleInputChange("memo", e.target.value)}
                className="min-h-20 resize-none"
              />
            </div>

            {/* Issued Date and Issued By */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issuedDate">
                  Issued Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="issuedDate"
                  type="datetime-local"
                  value={formData.issuedDate}
                  onChange={(e) => handleInputChange("issuedDate", e.target.value)}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issuedBy">
                  Issued By <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="issuedBy"
                    type="text"
                    placeholder="Select User"
                    value={formData.issuedBy}
                    onChange={(e) => handleInputChange("issuedBy", e.target.value)}
                    className="h-10 pr-10"
                    required
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <Input
                  id="location"
                  type="text"
                  placeholder="Select Location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="h-10 pr-10"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Received Date and Returned Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="receivedDate">Received Date</Label>
                <Input
                  id="receivedDate"
                  type="datetime-local"
                  value={formData.receivedDate}
                  onChange={(e) => handleInputChange("receivedDate", e.target.value)}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="returnedDate">Returned Date</Label>
                <Input
                  id="returnedDate"
                  type="datetime-local"
                  value={formData.returnedDate}
                  onChange={(e) => handleInputChange("returnedDate", e.target.value)}
                  className="h-10"
                />
              </div>
            </div>

            {/* Value */}
            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="text"
                placeholder="Enter Value"
                value={formData.value}
                onChange={(e) => handleInputChange("value", e.target.value)}
                className="h-10"
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
                Add Equipment
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EquipmentCard;
