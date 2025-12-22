import { useState, useCallback, useRef } from "react";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon, AlertTriangleIcon, Trash2Icon, PlusIcon, ChevronsUpDownIcon, CheckIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import SmartFilter from "@/components/SmartFilter";

const allFleetTypes = ["Aggregate", "Bulk", "Flatbed", "Heavy Haul", "Precast", "TMF", "Walking Floor"];

const fleetTypeColors = {
  Aggregate: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/50",
  Bulk: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/50",
  Flatbed: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/50",
  "Heavy Haul": "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/50",
  Precast: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/50",
  TMF: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/50",
  "Walking Floor": "bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/50",
};

const CustomerMembers = () => {
  const [filters, setFilters] = useState([]);
  const [fleetTypesModal, setFleetTypesModal] = useState({ open: false, member: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, member: null });
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [fleetTypesOpen, setFleetTypesOpen] = useState(false);
  const fleetTypesTriggerRef = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
    role: "",
    fleetTypes: [],
  });

  const openAddSheet = () => {
    setEditingMember(null);
    setFormData({
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNumber: "",
      role: "",
      fleetTypes: [],
    });
    setIsSheetOpen(true);
  };

  const openEditSheet = (member) => {
    setEditingMember(member);
    setFormData({
      email: member.email || "",
      firstName: member.firstName || "",
      middleName: member.middleName || "",
      lastName: member.lastName || "",
      mobileNumber: member.mobileNumber || "",
      role: member.role || "",
      fleetTypes: member.fleetTypes || [],
    });
    setIsSheetOpen(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFleetTypeToggle = (type) => {
    setFormData((prev) => ({
      ...prev,
      fleetTypes: prev.fleetTypes.includes(type)
        ? prev.fleetTypes.filter((t) => t !== type)
        : [...prev.fleetTypes, type],
    }));
  };

  const removeFleetType = (type) => {
    setFormData((prev) => ({
      ...prev,
      fleetTypes: prev.fleetTypes.filter((t) => t !== type),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(editingMember ? "Updating member:" : "Creating member:", formData);
    setIsSheetOpen(false);
    setEditingMember(null);
    setFormData({
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNumber: "",
      role: "",
      fleetTypes: [],
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setEditingMember(null);
    setFormData({
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNumber: "",
      role: "",
      fleetTypes: [],
    });
  };

  // Mock data for members - Customer Admin gets all fleet types
  const members = [
    { id: 1, firstName: "John", lastName: "Smith", email: "john.smith@titan.com", status: true, role: "Customer Admin", fleetTypes: allFleetTypes },
    { id: 2, firstName: "Sarah", lastName: "Johnson", email: "sarah.johnson@titan.com", status: true, role: "Employee", fleetTypes: ["Flatbed", "Heavy Haul"] },
    { id: 3, firstName: "Michael", lastName: "Brown", email: "michael.brown@titan.com", status: true, role: "Employee", fleetTypes: ["Bulk"] },
    { id: 4, firstName: "Emily", lastName: "Davis", email: "emily.davis@titan.com", status: false, role: "Employee", fleetTypes: ["Precast", "TMF"] },
    { id: 5, firstName: "David", lastName: "Wilson", email: "david.wilson@titan.com", status: true, role: "Customer Admin", fleetTypes: allFleetTypes },
    { id: 6, firstName: "Jessica", lastName: "Taylor", email: "jessica.taylor@titan.com", status: true, role: "Employee", fleetTypes: ["Flatbed"] },
    { id: 7, firstName: "Robert", lastName: "Anderson", email: "robert.anderson@titan.com", status: true, role: "Employee", fleetTypes: ["Heavy Haul", "Precast"] },
    { id: 8, firstName: "Ashley", lastName: "Thomas", email: "ashley.thomas@titan.com", status: false, role: "Employee", fleetTypes: ["TMF", "Walking Floor"] },
    { id: 9, firstName: "James", lastName: "Jackson", email: "james.jackson@titan.com", status: true, role: "Customer Admin", fleetTypes: allFleetTypes },
    { id: 10, firstName: "Amanda", lastName: "White", email: "amanda.white@titan.com", status: true, role: "Employee", fleetTypes: ["Aggregate", "Precast"] },
    { id: 11, firstName: "Christopher", lastName: "Harris", email: "chris.harris@titan.com", status: true, role: "Employee", fleetTypes: ["TMF"] },
    { id: 12, firstName: "Stephanie", lastName: "Martin", email: "stephanie.martin@titan.com", status: true, role: "Customer Admin", fleetTypes: allFleetTypes },
  ];

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "firstName",
          label: "First Name",
          type: "input",
          group: "Basic",
          placeholder: "Enter first name...",
        },
        {
          key: "lastName",
          label: "Last Name",
          type: "input",
          group: "Basic",
          placeholder: "Enter last name...",
        },
        {
          key: "email",
          label: "Email",
          type: "input",
          group: "Basic",
          placeholder: "Enter email...",
        },
        {
          key: "role",
          label: "Role",
          type: "select",
          group: "Basic",
          options: [
            { value: "Customer Admin", label: "Customer Admin" },
            { value: "Employee", label: "Employee" },
          ],
        },
        {
          key: "fleetType",
          label: "Fleet Type",
          type: "select",
          group: "Basic",
          options: [
            { value: "Aggregate", label: "Aggregate" },
            { value: "Bulk", label: "Bulk" },
            { value: "Flatbed", label: "Flatbed" },
            { value: "Heavy Haul", label: "Heavy Haul" },
            { value: "Precast", label: "Precast" },
            { value: "TMF", label: "TMF" },
            { value: "Walking Floor", label: "Walking Floor" },
          ],
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" },
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
      size: 80,
      cell: ({ row }) => {
        const member = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => openEditSheet(member)}>Update</DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => setDeleteModal({ open: true, member })}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="First Name" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Name" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      size: 120,
      cell: ({ row }) => {
        const role = row.getValue("role");
        const roleColors = {
          "Customer Admin": "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/50",
          "Employee": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/50",
        };
        return (
          <Badge className={`${roleColors[role] || "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/50"} hover:opacity-80 border`}>
            {role}
          </Badge>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "fleetTypes",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fleet Types" />
      ),
      size: 250,
      cell: ({ row }) => {
        const fleetTypes = row.getValue("fleetTypes") || [];
        const maxVisible = 2;
        const visibleTypes = fleetTypes.slice(0, maxVisible);
        const remainingCount = fleetTypes.length - maxVisible;
        const member = row.original;

        return (
          <div className="flex flex-wrap gap-1 items-center">
            {visibleTypes.map((type) => (
              <Badge
                key={type}
                className={`${fleetTypeColors[type] || "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/50"} hover:opacity-80 border text-xs`}
              >
                {type}
              </Badge>
            ))}
            {remainingCount > 0 && (
              <Badge
                className="bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/50 hover:bg-gray-500/20 border text-xs cursor-pointer"
                onClick={() => setFleetTypesModal({ open: true, member })}
              >
                +{remainingCount} more
              </Badge>
            )}
          </div>
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
      size: 100,
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge
            className={
              status
                ? "bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50"
                : "bg-rose-500/10 hover:bg-rose-500/30 text-rose-700 dark:text-rose-400 border border-rose-500/50"
            }
          >
            {status ? "Active" : "Inactive"}
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
        {/* Filter and Add Button */}
        <div className="flex items-center justify-between mb-4">
          <SmartFilter
            filterGroups={filterGroups}
            onFiltersChange={handleFiltersChange}
          />
          <Button
            className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            onClick={openAddSheet}
          >
            <PlusIcon className="size-4 mr-2" />
            Add Member
          </Button>
        </div>

        {/* Data Table */}
        <DataTable columns={columns} data={members} showViewOptions={false} />
      </div>

      {/* Fleet Types Modal */}
      <Dialog
        open={fleetTypesModal.open}
        onOpenChange={(open) => setFleetTypesModal({ open, member: open ? fleetTypesModal.member : null })}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Fleet Types - {fleetTypesModal.member?.firstName} {fleetTypesModal.member?.lastName}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap gap-2 py-4">
            {fleetTypesModal.member?.fleetTypes?.map((type) => (
              <Badge
                key={type}
                className={`${fleetTypeColors[type] || "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/50"} border text-sm py-1 px-3`}
              >
                {type}
              </Badge>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteModal.open}
        onOpenChange={(open) => setDeleteModal({ open, member: open ? deleteModal.member : null })}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Delete Member User</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              This action cannot be undone. Please confirm that you want to delete this user.
            </DialogDescription>
          </DialogHeader>

          {/* Warning Banner */}
          <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/50 rounded-lg px-4 py-3">
            <AlertTriangleIcon className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span className="text-sm text-red-600 dark:text-red-400">
              Are you sure you want to delete the following user?
            </span>
          </div>

          {/* User Info */}
          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex">
              <span className="text-sm text-muted-foreground w-20">Name:</span>
              <span className="text-sm font-medium">{deleteModal.member?.firstName} {deleteModal.member?.lastName}</span>
            </div>
            <div className="flex">
              <span className="text-sm text-muted-foreground w-20">Email:</span>
              <span className="text-sm font-medium">{deleteModal.member?.email}</span>
            </div>
            <div className="flex">
              <span className="text-sm text-muted-foreground w-20">Role:</span>
              <span className="text-sm font-medium">{deleteModal.member?.role}</span>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2 mt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setDeleteModal({ open: false, member: null })}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => {
                console.log("Deleting member:", deleteModal.member);
                setDeleteModal({ open: false, member: null });
              }}
            >
              <Trash2Icon className="w-4 h-4 mr-2" />
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Member Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg flex flex-col p-0"
        >
          <SheetHeader className="py-4 border-b px-6">
            <SheetTitle className="text-xl font-bold">
              {editingMember ? "Edit Member" : "Add Member"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-10"
                  required
                  disabled={!!editingMember}
                />
              </div>

              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="h-10"
                  required
                />
              </div>

              {/* Middle Name */}
              <div className="space-y-2">
                <Label htmlFor="middleName" className="text-sm font-medium">
                  Middle Name
                </Label>
                <Input
                  id="middleName"
                  type="text"
                  placeholder="William"
                  value={formData.middleName}
                  onChange={(e) => handleInputChange("middleName", e.target.value)}
                  className="h-10"
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="h-10"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div className="space-y-2">
                <Label htmlFor="mobileNumber" className="text-sm font-medium">
                  Mobile Number
                </Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                  className="h-10"
                />
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Role <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange("role", value)}
                  disabled={!!editingMember}
                >
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Select role..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Customer Admin">Customer Admin</SelectItem>
                    <SelectItem value="Employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Fleet Types - Multiselect */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Fleet Types <span className="text-red-500">*</span>
                </Label>
                <Popover open={fleetTypesOpen} onOpenChange={setFleetTypesOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      ref={fleetTypesTriggerRef}
                      variant="outline"
                      role="combobox"
                      aria-expanded={fleetTypesOpen}
                      className="w-full justify-between h-10 font-normal"
                    >
                      {formData.fleetTypes.length > 0
                        ? `${formData.fleetTypes.length} selected`
                        : "Select fleet types..."}
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="p-0"
                    align="start"
                    style={{ width: fleetTypesTriggerRef.current?.offsetWidth || 'auto' }}
                  >
                    <Command>
                      <CommandInput placeholder="Search fleet types..." />
                      <CommandList>
                        <CommandEmpty>No fleet type found.</CommandEmpty>
                        <CommandGroup>
                          {allFleetTypes.map((type) => (
                            <CommandItem
                              key={type}
                              value={type}
                              onSelect={() => handleFleetTypeToggle(type)}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.fleetTypes.includes(type) ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {type}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Action Buttons - Fixed at bottom */}
            <div className="flex gap-3 p-6 border-t mt-auto">
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
                {editingMember ? "Update Member" : "Create Member"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CustomerMembers;
