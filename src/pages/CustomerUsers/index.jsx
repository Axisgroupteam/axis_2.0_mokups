import { useState, useCallback, useRef } from "react";
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
import { PlusIcon, MoreHorizontalIcon, ChevronsUpDownIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import SmartFilter from "@/components/SmartFilter";

const CustomerUsers = () => {
  const [filters, setFilters] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);
  const triggerRef = useRef(null);
  const [formData, setFormData] = useState({
    customer: "",
    email: "",
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
  });

  // Mock customer list for searchable select
  const customers = [
    { value: "abc-logistics", label: "ABC Logistics" },
    { value: "global-transport", label: "Global Transport" },
    { value: "prime-shipping", label: "Prime Shipping" },
    { value: "metro-freight", label: "Metro Freight" },
    { value: "pacific-movers", label: "Pacific Movers" },
    { value: "central-distribution", label: "Central Distribution" },
    { value: "eastern-express", label: "Eastern Express" },
    { value: "northern-logistics", label: "Northern Logistics" },
    { value: "southern-freight", label: "Southern Freight Co" },
    { value: "mountain-logistics", label: "Mountain Logistics" },
    { value: "valley-shipping", label: "Valley Shipping" },
    { value: "coastal-carriers", label: "Coastal Carriers" },
    { value: "prairie-transport", label: "Prairie Transport" },
    { value: "desert-logistics", label: "Desert Logistics" },
    { value: "lakeside-shipping", label: "Lakeside Shipping" },
  ];

  // Mock data for customer users
  const customerUsers = [
    { id: 1, firstName: "John", email: "john.smith@abclogistics.com", customer: "ABC Logistics", role: "Customer Admin", status: true },
    { id: 2, firstName: "Sarah", email: "sarah.jones@globaltransport.com", customer: "Global Transport", role: "Customer Admin", status: true },
    { id: 3, firstName: "Michael", email: "michael.brown@primeshipping.com", customer: "Prime Shipping", role: "Customer Admin", status: true },
    { id: 4, firstName: "Emily", email: "emily.davis@metrofreight.com", customer: "Metro Freight", role: "Customer Admin", status: false },
    { id: 5, firstName: "David", email: "david.wilson@pacificmovers.com", customer: "Pacific Movers", role: "Customer Admin", status: true },
    { id: 6, firstName: "Jessica", email: "jessica.taylor@centraldist.com", customer: "Central Distribution", role: "Customer Admin", status: true },
    { id: 7, firstName: "Robert", email: "robert.anderson@easternexpress.com", customer: "Eastern Express", role: "Customer Admin", status: true },
    { id: 8, firstName: "Ashley", email: "ashley.thomas@northernlog.com", customer: "Northern Logistics", role: "Customer Admin", status: false },
    { id: 9, firstName: "James", email: "james.jackson@southernfreight.com", customer: "Southern Freight Co", role: "Customer Admin", status: true },
    { id: 10, firstName: "Amanda", email: "amanda.white@mountainlog.com", customer: "Mountain Logistics", role: "Customer Admin", status: true },
    { id: 11, firstName: "Christopher", email: "chris.harris@valleyship.com", customer: "Valley Shipping", role: "Customer Admin", status: true },
    { id: 12, firstName: "Stephanie", email: "stephanie.martin@coastalcarriers.com", customer: "Coastal Carriers", role: "Customer Admin", status: true },
    { id: 13, firstName: "Daniel", email: "daniel.garcia@prairietrans.com", customer: "Prairie Transport", role: "Customer Admin", status: false },
    { id: 14, firstName: "Michelle", email: "michelle.martinez@desertlog.com", customer: "Desert Logistics", role: "Customer Admin", status: true },
    { id: 15, firstName: "Matthew", email: "matthew.robinson@lakesideship.com", customer: "Lakeside Shipping", role: "Customer Admin", status: true },
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
          key: "email",
          label: "Email",
          type: "input",
          group: "Basic",
          placeholder: "Enter email...",
        },
        {
          key: "customer",
          label: "Customer",
          type: "input",
          group: "Basic",
          placeholder: "Enter customer name...",
        },
        {
          key: "role",
          label: "Role",
          type: "select",
          group: "Basic",
          options: [
            { value: "Customer Admin", label: "Customer Admin" },
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    // Reset form
    setFormData({
      customer: "",
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNumber: "",
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    // Reset form
    setFormData({
      customer: "",
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNumber: "",
    });
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
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "customer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
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
        {/* Filter and Add Customer User */}
        <div className="flex items-center justify-between mb-4">
          <SmartFilter
            filterGroups={filterGroups}
            onFiltersChange={handleFiltersChange}
          />
          <Button
            className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            onClick={() => setIsSheetOpen(true)}
          >
            <PlusIcon className="size-4 mr-2" />
            Add Customer User
          </Button>
        </div>

        {/* Data Table */}
        <DataTable columns={columns} data={customerUsers} showViewOptions={false} />
      </div>

      {/* Add Customer User Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-gray-900">
              Add Customer User
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4 mb-2 px-6">
            {/* Customer - Searchable Select */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Customer <span className="text-red-500">*</span>
              </Label>
              <Popover open={customerOpen} onOpenChange={setCustomerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    ref={triggerRef}
                    variant="outline"
                    role="combobox"
                    aria-expanded={customerOpen}
                    className="w-full justify-between h-10 font-normal"
                  >
                    {formData.customer
                      ? customers.find((c) => c.value === formData.customer)?.label
                      : "Select customer..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="p-0"
                  align="start"
                  style={{ width: triggerRef.current?.offsetWidth || 'auto' }}
                >
                  <Command>
                    <CommandInput placeholder="Search customer..." />
                    <CommandList>
                      <CommandEmpty>No customer found.</CommandEmpty>
                      <CommandGroup>
                        {customers.map((customer) => (
                          <CommandItem
                            key={customer.value}
                            value={customer.value}
                            onSelect={(currentValue) => {
                              handleInputChange("customer", currentValue === formData.customer ? "" : currentValue);
                              setCustomerOpen(false);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.customer === customer.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {customer.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
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
              />
            </div>

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

            {/* Middle Name */}
            <div className="space-y-2">
              <Label
                htmlFor="middleName"
                className="text-sm font-medium text-gray-700"
              >
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

            {/* Mobile Number */}
            <div className="space-y-2">
              <Label
                htmlFor="mobileNumber"
                className="text-sm font-medium text-gray-700"
              >
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
    </div>
  );
};

export default CustomerUsers;
