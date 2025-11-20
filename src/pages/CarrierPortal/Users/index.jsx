import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  PlusIcon,
  MoreVerticalIcon,
  MoreHorizontalIcon,
  UserIcon,
  ChartBarIcon,
  BanknoteIcon,
  ShieldCheckIcon,
  SettingsIcon,
  FuelIcon,
  FileTextIcon,
  KeyIcon,
  TrashIcon,
} from "lucide-react";
import { FaUser } from "react-icons/fa";
import SmartFilter from "@/components/SmartFilter";

const Users = () => {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isNextStepsOpen, setIsNextStepsOpen] = useState(false);
  const [nextStepsData, setNextStepsData] = useState({ roles: [], userName: "" });
  const [filters, setFilters] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    roles: [],
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });
  // Mock data
  const users = [
    { id: 1, firstName: "John", lastName: "Smith", email: "john.smith@megatrucking.com", roles: ["Administrator"], address: "123 Main St, New York, NY" },
    { id: 2, firstName: "Sarah", lastName: "Johnson", email: "sarah.johnson@megatrucking.com", roles: ["Manager"], address: "456 Oak Ave, Los Angeles, CA" },
    { id: 3, firstName: "Michael", lastName: "Brown", email: "michael.brown@megatrucking.com", roles: ["Driver", "Dispatcher"], address: "789 Pine Rd, Chicago, IL" },
    { id: 4, firstName: "Emily", lastName: "Davis", email: "emily.davis@megatrucking.com", roles: ["Dispatcher"], address: "321 Elm St, Houston, TX" },
    { id: 5, firstName: "David", lastName: "Wilson", email: "david.wilson@megatrucking.com", roles: ["Technician", "Driver"], address: "654 Maple Dr, Phoenix, AZ" },
    { id: 6, firstName: "Jessica", lastName: "Martinez", email: "jessica.martinez@megatrucking.com", roles: ["Employee"], address: "987 Cedar Ln, Philadelphia, PA" },
    { id: 7, firstName: "Robert", lastName: "Taylor", email: "robert.taylor@megatrucking.com", roles: ["Driver"], address: "147 Birch Blvd, San Antonio, TX" },
    { id: 8, firstName: "Amanda", lastName: "Anderson", email: "amanda.anderson@megatrucking.com", roles: ["Employee"], address: "258 Walnut St, San Diego, CA" },
    { id: 9, firstName: "James", lastName: "Thomas", email: "james.thomas@megatrucking.com", roles: ["Employee"], address: "369 Cherry Ave, Dallas, TX" },
    { id: 10, firstName: "Jennifer", lastName: "Garcia", email: "jennifer.garcia@megatrucking.com", roles: ["Manager"], address: "741 Spruce Rd, San Jose, CA" },
    { id: 11, firstName: "Christopher", lastName: "Lee", email: "christopher.lee@megatrucking.com", roles: ["Driver"], address: "852 Ash Dr, Austin, TX" },
    { id: 12, firstName: "Ashley", lastName: "Harris", email: "ashley.harris@megatrucking.com", roles: ["Dispatcher"], address: "963 Hickory Ln, Jacksonville, FL" },
    { id: 13, firstName: "Matthew", lastName: "Clark", email: "matthew.clark@megatrucking.com", roles: ["Technician"], address: "159 Willow St, Fort Worth, TX" },
    { id: 14, firstName: "Brittany", lastName: "Lewis", email: "brittany.lewis@megatrucking.com", roles: ["Employee"], address: "267 Poplar Ave, Columbus, OH" },
    { id: 15, firstName: "Daniel", lastName: "Robinson", email: "daniel.robinson@megatrucking.com", roles: ["Driver"], address: "378 Cypress Rd, Charlotte, NC" },
    { id: 16, firstName: "Samantha", lastName: "Walker", email: "samantha.walker@megatrucking.com", roles: ["Administrator", "Manager"], address: "489 Magnolia Dr, Indianapolis, IN" },
    { id: 17, firstName: "Andrew", lastName: "Young", email: "andrew.young@megatrucking.com", roles: ["Driver"], address: "591 Redwood Ln, Seattle, WA" },
    { id: 18, firstName: "Megan", lastName: "Allen", email: "megan.allen@megatrucking.com", roles: ["Dispatcher"], address: "612 Sequoia St, Denver, CO" },
    { id: 19, firstName: "Joshua", lastName: "King", email: "joshua.king@megatrucking.com", roles: ["Technician"], address: "723 Palm Ave, Washington, DC" },
    { id: 20, firstName: "Lauren", lastName: "Wright", email: "lauren.wright@megatrucking.com", roles: ["Employee"], address: "834 Juniper Rd, Boston, MA" },
    { id: 21, firstName: "Ryan", lastName: "Scott", email: "ryan.scott@megatrucking.com", roles: ["Driver", "Technician"], address: "945 Dogwood Dr, Nashville, TN" },
    { id: 22, firstName: "Kayla", lastName: "Green", email: "kayla.green@megatrucking.com", roles: ["Manager"], address: "156 Chestnut Ln, Baltimore, MD" },
    { id: 23, firstName: "Brandon", lastName: "Adams", email: "brandon.adams@megatrucking.com", roles: ["Driver"], address: "267 Beech St, Oklahoma City, OK" },
    { id: 24, firstName: "Nicole", lastName: "Baker", email: "nicole.baker@megatrucking.com", roles: ["Dispatcher"], address: "378 Hawthorn Ave, Louisville, KY" },
    { id: 25, firstName: "Tyler", lastName: "Nelson", email: "tyler.nelson@megatrucking.com", roles: ["Employee"], address: "489 Linden Rd, Portland, OR" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
    setIsSheetOpen(false);

    // Check if both Dispatcher and Driver are selected
    const hasDispatcher = formData.roles.includes("Dispatcher");
    const hasDriver = formData.roles.includes("Driver");

    if (hasDispatcher && hasDriver) {
      setNextStepsData({
        roles: formData.roles,
        userName: `${formData.firstName} ${formData.lastName}`,
      });
      setIsNextStepsOpen(true);
    }

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      roles: [],
      address: "",
      city: "",
      state: "",
      zipcode: "",
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      roles: [],
      address: "",
      city: "",
      state: "",
      zipcode: "",
    });
  };

  // Role options for MultiSelect
  const roleOptions = [
    { value: "Administrator", label: "Administrator" },
    { value: "Manager", label: "Manager" },
    { value: "Driver", label: "Driver" },
    { value: "Dispatcher", label: "Dispatcher" },
    { value: "Technician", label: "Technician" },
    { value: "Employee", label: "Employee" },
  ];

  const getRoleBadgeColor = (role) => {
    const colors = {
      Administrator: "bg-purple-500/10 hover:bg-purple-500/30 text-purple-700 dark:text-purple-400 border border-purple-500/50",
      Manager: "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50",
      Driver: "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50",
      Dispatcher: "bg-orange-500/10 hover:bg-orange-500/30 text-orange-700 dark:text-orange-400 border border-orange-500/50",
      Technician: "bg-teal-500/10 hover:bg-teal-500/30 text-teal-700 dark:text-teal-400 border border-teal-500/50",
      Employee: "bg-pink-500/10 hover:bg-pink-500/30 text-pink-700 dark:text-pink-400 border border-pink-500/50",
    };
    return colors[role] || "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  // Role-based actions configuration with icons
  const getRoleActions = (roles) => {
    const roleActions = {
      Administrator: [
        { label: "Profile", action: "profile", icon: UserIcon },
        { label: "Permissions", action: "permissions", icon: KeyIcon },
        {
          label: "Delete",
          action: "delete",
          icon: TrashIcon,
          className: "text-red-600",
        },
      ],
      Manager: [
        { label: "Profile", action: "profile", icon: UserIcon },
        { label: "Permissions", action: "permissions", icon: KeyIcon },
        {
          label: "Delete",
          action: "delete",
          icon: TrashIcon,
          className: "text-red-600",
        },
      ],
      Dispatcher: [
        { label: "Profile", action: "profile", icon: UserIcon },
        { label: "Permissions", action: "permissions", icon: KeyIcon },
        {
          label: "Delete",
          action: "delete",
          icon: TrashIcon,
          className: "text-red-600",
        },
      ],
      Employee: [
        { label: "Profile", action: "profile", icon: UserIcon },
        { label: "Permissions", action: "permissions", icon: KeyIcon },
        {
          label: "Delete",
          action: "delete",
          icon: TrashIcon,
          className: "text-red-600",
        },
      ],
      Driver: [
        { label: "Profile", action: "profile", icon: UserIcon },
        { label: "Metrics", action: "metrics", icon: ChartBarIcon },
        { label: "Finance", action: "finance", icon: BanknoteIcon },
        {
          label: "Safety Compliance",
          action: "safety-compliance",
          icon: ShieldCheckIcon,
        },
        { label: "Operation", action: "operation", icon: SettingsIcon },
        { label: "Fuel", action: "fuel", icon: FuelIcon },
        { label: "Audit Log", action: "audit-log", icon: FileTextIcon },
      ],
      Technician: [
        { label: "Metrics", action: "metrics", icon: ChartBarIcon },
        { label: "Finance", action: "finance", icon: BanknoteIcon },
        { label: "Audit Log", action: "audit-log", icon: FileTextIcon },
      ],
    };

    // Combine actions from all roles, avoiding duplicates
    const combinedActions = [];
    const seenActions = new Set();

    roles.forEach((role) => {
      const actions = roleActions[role] || [];
      actions.forEach((action) => {
        if (!seenActions.has(action.action)) {
          seenActions.add(action.action);
          combinedActions.push(action);
        }
      });
    });

    return combinedActions;
  };

  const handleActionClick = (action, user) => {
    console.log(`Action: ${action}, User:`, user);

    // Map action to tab value for Driver role
    const driverTabMap = {
      "profile": "profile",
      "metrics": "metrics",
      "finance": "finance",
      "safety-compliance": "safety",
      "operation": "operation",
      "fuel": "fuel",
      "audit-log": "audit",
    };

    // Map action to tab value for Admin/Manager/Dispatcher/Employee roles
    const userTabMap = {
      "profile": "profile",
      "permissions": "permissions",
      "delete": "delete",
    };

    // Check if action belongs to Driver actions
    if (driverTabMap[action] && user.roles.includes("Driver")) {
      navigate(`/app/carrier-portal/master/users/driver-details?tab=${driverTabMap[action]}`);
      return;
    }

    // Check if action belongs to Technician actions
    if (driverTabMap[action] && user.roles.includes("Technician")) {
      navigate(`/app/carrier-portal/master/users/driver-details?tab=${driverTabMap[action]}`);
      return;
    }

    // Handle Administrator, Manager, Dispatcher, Employee
    if (userTabMap[action]) {
      navigate(`/app/carrier-portal/master/users/user-details?tab=${userTabMap[action]}`);
      return;
    }
  };

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
            { value: "Administrator", label: "Administrator" },
            { value: "Manager", label: "Manager" },
            { value: "Driver", label: "Driver" },
            { value: "Dispatcher", label: "Dispatcher" },
            { value: "Technician", label: "Technician" },
            { value: "Employee", label: "Employee" },
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
        const user = row.original;
        const actions = getRoleActions(user.roles);

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-56">
              {/* User Info Header */}
              <div className="px-3 py-2 border-b flex items-start gap-2">
                <div className="p-1.5 bg-gray-100 rounded-full mt-0.5">
                  <FaUser className="h-5 w-5 text-gray-600" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-medium text-sm">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              {/* Role-based Actions */}
              {actions.map((actionItem, index) => {
                const Icon = actionItem.icon;
                const needsSeparator = [
                  "delete",
                  "safety-compliance",
                  "audit-log",
                ].includes(actionItem.action);
                return (
                  <div key={actionItem.action}>
                    {needsSeparator && <DropdownMenuSeparator />}
                    <DropdownMenuItem
                      className={`cursor-pointer ${actionItem.className || ""}`}
                      onClick={() => handleActionClick(actionItem.action, user)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {actionItem.label}
                    </DropdownMenuItem>
                  </div>
                );
              })}
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
      accessorKey: "roles",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => {
        const roles = row.getValue("roles");
        return (
          <div className="flex flex-wrap gap-1">
            {roles.map((role) => (
              <Badge key={role} className={getRoleBadgeColor(role)}>{role}</Badge>
            ))}
          </div>
        );
      },
      filterFn: (row, id, value) => {
        const roles = row.getValue(id);
        return roles.some((role) => value.includes(role));
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "address",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Address" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="px-6 py-4">
        {/* Filter and Add User */}
        <div className="flex items-center justify-between mb-1">
          <SmartFilter
            filterGroups={filterGroups}
            onFiltersChange={handleFiltersChange}
          />
          <Button
            className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            onClick={() => setIsSheetOpen(true)}
          >
            <PlusIcon className="size-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Data Table with built-in toolbar and pagination */}
        <DataTable columns={columns} data={users} showViewOptions={false} />
      </div>

      {/* Add User Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <div className="flex items-center gap-3">
              <div>
                <SheetTitle className="text-xl font-bold text-gray-900">
                  Add New User
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-2n mb-2 px-6">
            {/* First Name */}
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700"
              >
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

            {/* Last Name */}
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700"
              >
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

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                className="h-10"
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label
                htmlFor="roles"
                className="text-sm font-medium text-gray-700"
              >
                Role <span className="text-red-500">*</span>
              </Label>
              <MultiSelect
                options={roleOptions}
                onValueChange={(values) => handleInputChange("roles", values)}
                defaultValue={formData.roles}
                placeholder="Select roles"
                maxCount={2}
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="text-sm font-medium text-gray-700"
              >
                Address
              </Label>
              <Input
                id="address"
                type="text"
                placeholder="123 Main Street"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="h-10"
              />
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label
                htmlFor="city"
                className="text-sm font-medium text-gray-700"
              >
                City
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="New York"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="h-10"
              />
            </div>

            {/* State */}
            <div className="space-y-2">
              <Label
                htmlFor="state"
                className="text-sm font-medium text-gray-700"
              >
                State
              </Label>
              <Input
                id="state"
                type="text"
                placeholder="NY"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className="h-10"
              />
            </div>

            {/* ZIP Code */}
            <div className="space-y-2">
              <Label
                htmlFor="zipcode"
                className="text-sm font-medium text-gray-700"
              >
                ZIP Code
              </Label>
              <Input
                id="zipcode"
                type="text"
                placeholder="10001"
                value={formData.zipcode}
                onChange={(e) => handleInputChange("zipcode", e.target.value)}
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
                Create User
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Next Steps Dialog */}
      <Dialog open={isNextStepsOpen} onOpenChange={setIsNextStepsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Next Steps</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Dispatcher Steps */}
            {nextStepsData.roles.includes("Dispatcher") && (
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-700">Dispatcher</h4>
                <div
                  className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setIsNextStepsOpen(false);
                    navigate("/app/carrier-portal/master/users/user-details?tab=permissions");
                  }}
                >
                  <span className="text-sm font-medium">
                    Provide permissions for that user
                  </span>
                </div>
              </div>
            )}

            {/* Driver Steps */}
            {nextStepsData.roles.includes("Driver") && (
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-700">Driver</h4>
                <div
                  className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setIsNextStepsOpen(false);
                    navigate("/app/carrier-portal/master/users/driver-details?tab=finance");
                  }}
                >
                  <span className="text-sm font-medium">
                    Add finance related information
                  </span>
                </div>
                <div
                  className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setIsNextStepsOpen(false);
                    navigate("/app/carrier-portal/master/users/driver-details?tab=profile");
                  }}
                >
                  <span className="text-sm font-medium">
                    Complete profile of the driver
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsNextStepsOpen(false)}
            >
              Skip for now
            </Button>
            <Button
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              onClick={() => setIsNextStepsOpen(false)}
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
