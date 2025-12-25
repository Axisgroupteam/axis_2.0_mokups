import { useState, useCallback } from "react";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
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

const CardProviders = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState(null);
  const [filters, setFilters] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    apiCredentials: "",
    status: "Active",
  });

  // Mock data for card providers (fuel_platforms table)
  const cardProviders = [
    {
      id: 1,
      name: "EFS",
      apiCredentials: "********",
      syncStatus: "Connected",
      lastSyncTimestamp: "2025-01-15 14:30:00",
    },
    {
      id: 2,
      name: "Comdata",
      apiCredentials: "********",
      syncStatus: "Connected",
      lastSyncTimestamp: "2025-01-15 14:25:00",
    },
    {
      id: 3,
      name: "Relay",
      apiCredentials: "********",
      syncStatus: "Connected",
      lastSyncTimestamp: "2025-01-15 14:28:00",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    setEditingProvider(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      apiCredentials: "",
      status: "Active",
    });
  };

  const handleEdit = (provider) => {
    setEditingProvider(provider);
    setFormData({
      name: provider.name,
      apiCredentials: "",
      status: provider.syncStatus === "Connected" ? "Active" : "Inactive",
    });
    setIsSheetOpen(true);
  };

  const handleAddNew = () => {
    setEditingProvider(null);
    resetForm();
    setIsSheetOpen(true);
  };

  const getSyncStatusBadgeColor = (status) => {
    const colors = {
      Connected: "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/50",
      Disconnected: "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/50",
      Syncing: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/50",
    };
    return colors[status] || "bg-gray-500/10 text-gray-700 border border-gray-500/50";
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "name",
          label: "Platform Name",
          type: "input",
          group: "Basic",
          placeholder: "Search platform...",
        },
        {
          key: "syncStatus",
          label: "Sync Status",
          type: "select",
          group: "Basic",
          options: [
            { label: "Connected", value: "Connected" },
            { label: "Disconnected", value: "Disconnected" },
          ],
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Columns per fuel_platforms table: platform_id, name, api_credentials (encrypted), sync_status, last_sync_timestamp
  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => {
        const provider = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-40">
              <DropdownMenuItem className="cursor-pointer" onClick={() => handleEdit(provider)}>
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <TrashIcon className="h-4 w-4 mr-2" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "apiCredentials",
      header: ({ column }) => <DataTableColumnHeader column={column} title="API Credentials" />,
      cell: ({ row }) => (
        <span className="text-muted-foreground font-mono">{row.getValue("apiCredentials")}</span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "syncStatus",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Sync Status" />,
      cell: ({ row }) => (
        <Badge className={getSyncStatusBadgeColor(row.getValue("syncStatus"))}>
          {row.getValue("syncStatus")}
        </Badge>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "lastSyncTimestamp",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Last Sync" />,
      cell: ({ row }) => formatDateTime(row.getValue("lastSyncTimestamp")),
      enableSorting: true,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden p-4">
      {/* Filter and Add Button */}
      <div className="flex items-center justify-between mb-1">
        <SmartFilter filterGroups={filterGroups} onFiltersChange={handleFiltersChange} />
        <Button
          onClick={handleAddNew}
          className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Platform
        </Button>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={cardProviders} showViewOptions={false} />

      {/* Add/Edit Provider Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingProvider ? "Edit Platform" : "Add Platform"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4 px-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Platform Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g., EFS"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiCredentials" className="text-sm font-medium">
                API Credentials <span className="text-red-500">*</span>
              </Label>
              <Input
                id="apiCredentials"
                type="password"
                placeholder="Enter API key or credentials"
                value={formData.apiCredentials}
                onChange={(e) => handleInputChange("apiCredentials", e.target.value)}
                className="h-10"
                required={!editingProvider}
              />
              {editingProvider && (
                <p className="text-xs text-muted-foreground">Leave blank to keep existing credentials</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">
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
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => setIsSheetOpen(false)} className="flex-1 h-10">
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {editingProvider ? "Update Platform" : "Add Platform"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CardProviders;
