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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon, PencilIcon, ShieldIcon } from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

// ALL_PERMISSIONS from PermissionAssignment is used to mock lengths etc., for demo purposes.
const ALL_PERMISSIONS = [
  { id: 1, keyName: "locationPermission" },
  { id: 11, keyName: "locationCreate" },
  { id: 12, keyName: "locationView" },
  { id: 13, keyName: "locationUpdate" },
  { id: 14, keyName: "locationArchive" },
  { id: 2, keyName: "userPermission" },
  { id: 21, keyName: "userCreate" },
  { id: 22, keyName: "userView" },
  { id: 23, keyName: "userUpdate" },
  { id: 24, keyName: "userArchive" },
  { id: 3, keyName: "orderPermission" },
  { id: 31, keyName: "orderCreate" },
  { id: 32, keyName: "orderView" },
  { id: 33, keyName: "orderUpdate" },
  { id: 34, keyName: "orderArchive" },
  { id: 4, keyName: "assetPermission" },
  { id: 41, keyName: "assetCreate" },
  { id: 42, keyName: "assetView" },
  { id: 43, keyName: "assetUpdate" },
  { id: 44, keyName: "assetArchive" },
  { id: 5, keyName: "customerPermission" },
  { id: 51, keyName: "customerCreate" },
  { id: 52, keyName: "customerView" },
  { id: 53, keyName: "customerUpdate" },
  { id: 54, keyName: "customerArchive" },
  { id: 6, keyName: "payeePermission" },
  { id: 61, keyName: "payeeCreate" },
  { id: 62, keyName: "payeeView" },
  { id: 63, keyName: "payeeUpdate" },
  { id: 64, keyName: "payeeArchive" },
  { id: 7, keyName: "surchargeApprovalPermission" },
  { id: 71, keyName: "surchargeTier1Auto" },
  { id: 72, keyName: "surchargeTier2Dispatcher" },
  { id: 73, keyName: "surchargeTier3VP" },
];

const RolesAndPermissions = () => {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [filters, setFilters] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    keyName: "",
    description: "",
  });

  // Mock data for roles based on DB Schema
  const [roles, setRoles] = useState([
    {
      id: 1,
      code: "ADM01",
      keyName: "admin",
      name: "Administrator",
      description:
        "Full system access including creating and archiving resources",
      permissions: ALL_PERMISSIONS.map((p) => p.id), // All permissions
      isArchived: false,
    },
    {
      id: 2,
      code: "DSP01",
      keyName: "dispatcher",
      name: "Dispatcher",
      description: "Can manage orders and view locations/users.",
      permissions: [1, 12, 2, 22, 3, 31, 32, 33], // Order all except archive, location/user view only
      isArchived: false,
    },
    {
      id: 3,
      code: "DRV01",
      keyName: "driver",
      name: "Driver",
      description: "Can only view assigned orders and locations",
      permissions: [1, 12, 3, 32],
      isArchived: false,
    },
    {
      id: 4,
      code: "OPR01",
      keyName: "operator",
      name: "Operator",
      description: "Operational staff for daily activities",
      permissions: [3, 31, 32],
      isArchived: false,
    },
    {
      id: 5,
      code: "MNG01",
      keyName: "manager",
      name: "Manager",
      description: "Management level access with overview capabilities",
      permissions: [1, 12, 2, 22, 3, 31, 32, 33, 4, 42, 5, 52],
      isArchived: false,
    },
    {
      id: 6,
      code: "TECH01",
      keyName: "technician",
      name: "Technician",
      description: "Technical and maintenance access",
      permissions: [4, 41, 42, 43],
      isArchived: false,
    },
  ]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingRole) {
      setRoles(
        roles.map((r) => (r.id === editingRole.id ? { ...r, ...formData } : r)),
      );
    } else {
      setRoles([
        ...roles,
        {
          id: Date.now(),
          ...formData,
          permissions: [], // New roles start with no permissions
          isArchived: false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }

    setIsSheetOpen(false);
    setEditingRole(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      keyName: "",
      description: "",
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setEditingRole(null);
    resetForm();
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      code: role.code,
      keyName: role.keyName,
      description: role.description || "",
    });

    setIsSheetOpen(true);
  };

  const handleAdd = () => {
    setEditingRole(null);
    resetForm();
    setIsSheetOpen(true);
  };

  const handleAssignPermissions = (role) => {
    navigate(`/app/carrier-portal/master/roles/${role.id}/permissions`);
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
          placeholder: "Search roles...",
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const filteredRoles = roles
    .filter((role) => !role.isArchived)
    .filter((role) => {
      if (filters.length === 0) return true;
      const nameFilter = filters.find((f) => f.key === "name");
      if (
        nameFilter &&
        role.name.toLowerCase().indexOf(nameFilter.value.toLowerCase()) === -1
      ) {
        return false;
      }
      return true;
    });

  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => {
        const role = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <div className="px-2 py-1.5 border-b mb-1">
                <p className="font-medium text-sm">{role.name}</p>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleEdit(role)}
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleAssignPermissions(role)}
              >
                <ShieldIcon className="h-4 w-4 mr-2" />
                Assign Permissions
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role Name" />
      ),
      enableSorting: true,
      enableHiding: true,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">
            {row.original.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {row.original.keyName}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      enableSorting: false,
      enableHiding: true,
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm line-clamp-1 max-w-sm">
          {row.original.description || "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "permissions_count",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Permissions" />
      ),
      cell: ({ row }) => {
        const hasPerms = row.original.permissions?.length > 0;
        return (
          <Badge variant={hasPerms ? "outline" : "secondary"}>
            {hasPerms ? `${row.original.permissions.length} Assigned` : "None"}
          </Badge>
        );
      },
      enableSorting: false,
      enableHiding: true,
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="px-6 py-4">
        {/* Actions & Filters */}
        <div className="flex items-center justify-between mb-4">
          <SmartFilter
            filterGroups={filterGroups}
            onFiltersChange={handleFiltersChange}
          />
          <Button
            onClick={handleAdd}
            className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Create Role
          </Button>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredRoles}
          showViewOptions={false}
        />
      </div>

      {/* Add/Edit Role Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingRole ? "Edit Role Details" : "Add New Role"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6 px-6 pb-20">
            {/* Header Fields Section */}
            <div className="grid grid-cols-1 gap-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Role Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g. Administrator"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              {/* Code */}
              <div className="space-y-2">
                <Label htmlFor="code" className="text-sm font-medium">
                  Code <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="code"
                  placeholder="e.g. ADM01"
                  value={formData.code}
                  onChange={(e) =>
                    handleInputChange("code", e.target.value.toUpperCase())
                  }
                  required
                  maxLength={10}
                />
              </div>

              {/* Key Name */}
              <div className="space-y-2">
                <Label htmlFor="keyName" className="text-sm font-medium">
                  Key Name (Internal Identifier){" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="keyName"
                  placeholder="e.g. system_admin"
                  value={formData.keyName}
                  onChange={(e) =>
                    handleInputChange(
                      "keyName",
                      e.target.value.toLowerCase().replace(/\s+/g, "_"),
                    )
                  }
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of this role's purpose..."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="resize-none h-24"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t mt-8">
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
                disabled={
                  !formData.name.trim() ||
                  !formData.code.trim() ||
                  !formData.keyName.trim()
                }
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {editingRole ? "Save Changes" : "Create Role"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default RolesAndPermissions;
