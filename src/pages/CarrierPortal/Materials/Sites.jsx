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
} from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

const Sites = () => {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingSite, setEditingSite] = useState(null);
  const [filters, setFilters] = useState([]);
  const [formData, setFormData] = useState({
    siteId: "",
    supplier: "",
    siteName: "",
    address: "",
    distance: "",
    status: "Active",
  });

  // Mock data for sites/plants
  const sites = [
    {
      id: 1,
      siteId: "SITE-001",
      supplier: "Rocky's Quarry",
      siteName: "Tampa Main Plant",
      address: "1234 Quarry Rd, Tampa, FL 33601",
      distance: 8,
      status: "Active",
    },
    {
      id: 2,
      siteId: "SITE-002",
      supplier: "Rocky's Quarry",
      siteName: "Brandon Satellite",
      address: "5678 Stone Ave, Brandon, FL 33510",
      distance: 22,
      status: "Active",
    },
    {
      id: 3,
      siteId: "SITE-003",
      supplier: "Tampa Sand Co",
      siteName: "North Tampa Pit",
      address: "910 Sand Pit Ln, Tampa, FL 33602",
      distance: 5,
      status: "Active",
    },
    {
      id: 4,
      siteId: "SITE-004",
      supplier: "Tampa Sand Co",
      siteName: "Hillsborough Location",
      address: "1112 County Rd, Hillsborough, FL 33604",
      distance: 15,
      status: "Active",
    },
    {
      id: 5,
      siteId: "SITE-005",
      supplier: "Gulf Concrete",
      siteName: "Clearwater Plant",
      address: "1314 Mixer Ave, Clearwater, FL 33755",
      distance: 28,
      status: "Active",
    },
    {
      id: 6,
      siteId: "SITE-006",
      supplier: "Gulf Concrete",
      siteName: "St. Pete Facility",
      address: "1516 Concrete Blvd, St. Petersburg, FL 33701",
      distance: 35,
      status: "Inactive",
    },
    {
      id: 7,
      siteId: "SITE-007",
      supplier: "Green Recyclers",
      siteName: "Main Recycling Center",
      address: "1718 Recycle Way, Tampa, FL 33605",
      distance: 12,
      status: "Active",
    },
    {
      id: 8,
      siteId: "SITE-008",
      supplier: "Sunshine Aggregates",
      siteName: "Lakeland Quarry",
      address: "1920 Aggregate Dr, Lakeland, FL 33801",
      distance: 45,
      status: "Active",
    },
    {
      id: 9,
      siteId: "SITE-009",
      supplier: "Sunshine Aggregates",
      siteName: "Plant City Site",
      address: "2122 Rock Rd, Plant City, FL 33563",
      distance: 30,
      status: "Active",
    },
    {
      id: 10,
      siteId: "SITE-010",
      supplier: "Central Florida Sand",
      siteName: "Orlando Main",
      address: "2324 Sandy Ln, Orlando, FL 32801",
      distance: 85,
      status: "Inactive",
    },
  ];

  const suppliers = [
    "Rocky's Quarry",
    "Tampa Sand Co",
    "Gulf Concrete",
    "Green Recyclers",
    "Sunshine Aggregates",
    "Central Florida Sand",
    "Bay Area Concrete",
    "Eco Materials Inc",
  ];

  const statusOptions = ["Active", "Inactive"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    setEditingSite(null);
    setFormData({
      siteId: "",
      supplier: "",
      siteName: "",
      address: "",
      distance: "",
      status: "Active",
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setEditingSite(null);
    setFormData({
      siteId: "",
      supplier: "",
      siteName: "",
      address: "",
      distance: "",
      status: "Active",
    });
  };

  const handleEdit = (site) => {
    setEditingSite(site);
    setFormData({
      siteId: site.siteId,
      supplier: site.supplier,
      siteName: site.siteName,
      address: site.address,
      distance: site.distance.toString(),
      status: site.status,
    });
    setIsSheetOpen(true);
  };

  const handleAddNew = () => {
    setEditingSite(null);
    setFormData({
      siteId: "",
      supplier: "",
      siteName: "",
      address: "",
      distance: "",
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

  const getDistanceBadgeColor = (distance) => {
    if (distance <= 10) {
      return "bg-green-500/10 text-green-600 border border-green-500/20";
    } else if (distance <= 30) {
      return "bg-amber-500/10 text-amber-600 border border-amber-500/20";
    } else {
      return "bg-red-500/10 text-red-600 border border-red-500/20";
    }
  };

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "siteName",
          label: "Site Name",
          type: "input",
          group: "Basic",
          placeholder: "Search site name...",
        },
        {
          key: "supplier",
          label: "Supplier",
          type: "select",
          group: "Basic",
          options: suppliers.map((s) => ({ label: s, value: s })),
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
        const site = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <div className="px-2 py-1.5 border-b mb-1">
                <p className="font-medium text-sm">{site.siteName}</p>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleEdit(site)}
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
      accessorKey: "siteId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Site ID" />
      ),
      cell: ({ row }) => {
        const siteId = row.getValue("siteId");
        return <span className="font-mono text-sm">{siteId}</span>;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "supplier",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Supplier" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "siteName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Site Name" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "address",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Address" />
      ),
      cell: ({ row }) => {
        const address = row.getValue("address");
        return (
          <span className="text-sm text-muted-foreground line-clamp-1 max-w-xs">
            {address}
          </span>
        );
      },
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: "distance",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Distance" />
      ),
      cell: ({ row }) => {
        const distance = row.getValue("distance");
        return (
          <Badge className={getDistanceBadgeColor(distance)}>
            {distance} km
          </Badge>
        );
      },
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
            Add Site
          </Button>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={sites}
          showViewOptions={false}
        />
      </div>

      {/* Add/Edit Site Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingSite ? "Edit Site" : "Add New Site"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4 px-6">
            {/* Site ID */}
            <div className="space-y-2">
              <Label
                htmlFor="siteId"
                className="text-sm font-medium text-foreground"
              >
                Site ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="siteId"
                type="text"
                placeholder="e.g., SITE-001"
                value={formData.siteId}
                onChange={(e) => handleInputChange("siteId", e.target.value)}
                className="h-10 font-mono"
                required
              />
            </div>

            {/* Supplier */}
            <div className="space-y-2">
              <Label
                htmlFor="supplier"
                className="text-sm font-medium text-foreground"
              >
                Supplier <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.supplier}
                onValueChange={(value) => handleInputChange("supplier", value)}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier} value={supplier}>
                      {supplier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Site Name */}
            <div className="space-y-2">
              <Label
                htmlFor="siteName"
                className="text-sm font-medium text-foreground"
              >
                Site Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="siteName"
                type="text"
                placeholder="e.g., Tampa Main Plant"
                value={formData.siteName}
                onChange={(e) => handleInputChange("siteName", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="text-sm font-medium text-foreground"
              >
                Address <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="address"
                placeholder="Enter site address..."
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="min-h-[80px]"
                required
              />
            </div>

            {/* Distance */}
            <div className="space-y-2">
              <Label
                htmlFor="distance"
                className="text-sm font-medium text-foreground"
              >
                Distance (km) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="distance"
                type="number"
                step="0.1"
                placeholder="e.g., 15"
                value={formData.distance}
                onChange={(e) => handleInputChange("distance", e.target.value)}
                className="h-10"
                required
              />
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
                <SelectTrigger className="h-10">
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
                {editingSite ? "Update Site" : "Create Site"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sites;
