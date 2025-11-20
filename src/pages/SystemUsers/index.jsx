import { useState, useCallback } from "react";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusIcon, MoreHorizontalIcon } from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

const SystemUsers = () => {
  const [filters, setFilters] = useState([]);

  // Mock data - one row per user with multiple roles in array
  const users = [
    { id: 1, firstName: "John", lastName: "Smith", email: "john.smith@company.com", roles: ["superadmin", "portaladmin"], status: true },
    { id: 2, firstName: "Sarah", lastName: "Johnson", email: "sarah.johnson@company.com", roles: ["portaladmin", "portalmanager"], status: true },
    { id: 3, firstName: "Michael", lastName: "Brown", email: "michael.brown@company.com", roles: ["superadmin"], status: true },
    { id: 4, firstName: "Emily", lastName: "Davis", email: "emily.davis@company.com", roles: ["portalmanager"], status: false },
    { id: 5, firstName: "David", lastName: "Wilson", email: "david.wilson@company.com", roles: ["portaladmin", "portalmanager"], status: true },
    { id: 6, firstName: "Jessica", lastName: "Martinez", email: "jessica.martinez@company.com", roles: ["superadmin", "portaladmin", "portalmanager"], status: true },
    { id: 7, firstName: "Robert", lastName: "Taylor", email: "robert.taylor@company.com", roles: ["portaladmin"], status: true },
    { id: 8, firstName: "Amanda", lastName: "Anderson", email: "amanda.anderson@company.com", roles: ["portalmanager"], status: false },
    { id: 9, firstName: "James", lastName: "Thomas", email: "james.thomas@company.com", roles: ["superadmin", "portalmanager"], status: true },
    { id: 10, firstName: "Jennifer", lastName: "Garcia", email: "jennifer.garcia@company.com", roles: ["portaladmin"], status: true },
    { id: 11, firstName: "Christopher", lastName: "Lee", email: "christopher.lee@company.com", roles: ["superadmin"], status: true },
    { id: 12, firstName: "Ashley", lastName: "Harris", email: "ashley.harris@company.com", roles: ["portaladmin", "portalmanager"], status: false },
    { id: 13, firstName: "Matthew", lastName: "Clark", email: "matthew.clark@company.com", roles: ["portalmanager"], status: true },
    { id: 14, firstName: "Brittany", lastName: "Lewis", email: "brittany.lewis@company.com", roles: ["superadmin", "portaladmin"], status: true },
    { id: 15, firstName: "Daniel", lastName: "Robinson", email: "daniel.robinson@company.com", roles: ["portaladmin"], status: true },
    { id: 16, firstName: "Samantha", lastName: "Walker", email: "samantha.walker@company.com", roles: ["superadmin", "portalmanager"], status: false },
    { id: 17, firstName: "Andrew", lastName: "Young", email: "andrew.young@company.com", roles: ["portalmanager"], status: true },
    { id: 18, firstName: "Megan", lastName: "Allen", email: "megan.allen@company.com", roles: ["portaladmin", "portalmanager"], status: true },
    { id: 19, firstName: "Joshua", lastName: "King", email: "joshua.king@company.com", roles: ["superadmin"], status: true },
    { id: 20, firstName: "Lauren", lastName: "Wright", email: "lauren.wright@company.com", roles: ["superadmin", "portaladmin", "portalmanager"], status: true },
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
            { value: "superadmin", label: "Super Admin" },
            { value: "portaladmin", label: "Portal Admin" },
            { value: "portalmanager", label: "Portal Manager" },
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

  const getRoleColor = (role) => {
    const colors = {
      superadmin: "bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-500/30 border border-red-500/50",
      portaladmin: "bg-blue-500/10 text-blue-700 dark:text-blue-400 hover:bg-blue-500/30 border border-blue-500/50",
      portalmanager: "bg-purple-500/10 text-purple-700 dark:text-purple-400 hover:bg-purple-500/30 border border-purple-500/50",
    };
    return colors[role] || "bg-gray-500/10 text-gray-700 dark:text-gray-400 hover:bg-gray-500/30 border border-gray-500/50";
  };

  const getRoleLabel = (role) => {
    const labels = {
      superadmin: "Super Admin",
      portaladmin: "Portal Admin",
      portalmanager: "Portal Manager",
    };
    return labels[role] || role;
  };

  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
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
      size: 300,
      cell: ({ row }) => {
        const roles = row.getValue("roles");
        return (
          <div className="flex flex-wrap gap-1 max-h-[60px] overflow-y-auto">
            {roles.map((role, index) => (
              <Badge
                key={index}
                className={`${getRoleColor(role)} text-xs whitespace-nowrap`}
              >
                {getRoleLabel(role)}
              </Badge>
            ))}
          </div>
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
        {/* Filter and Add User */}
        <div className="flex items-center justify-between mb-4">
          <SmartFilter
            filterGroups={filterGroups}
            onFiltersChange={handleFiltersChange}
          />
          <Button className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
            <PlusIcon className="size-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Data Table */}
        <DataTable columns={columns} data={users} showViewOptions={false} />
      </div>
    </div>
  );
};

export default SystemUsers;
