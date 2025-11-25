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
import { PlusIcon, MoreHorizontalIcon, BuildingIcon } from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

const Customers = () => {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    code: "",
    addressLine1: "",
    state: "",
    city: "",
    zipCode: "",
    customerRegion: "",
    billingType: "",
    milesMeterSystem: "",
    fleetType: "",
    milesCalcType: "",
    autoEmailExport: false,
  });

  // Mock customer data
  const customers = [
    {
      id: 1,
      name: "ABC Logistics",
      email: "contact@abclogistics.com",
      phone: "+1 (555) 123-4567",
      city: "New York",
      state: "NY",
      billingType: "Factored customer",
      fleetType: "Bulk",
    },
    {
      id: 2,
      name: "XYZ Transport",
      email: "info@xyztransport.com",
      phone: "+1 (555) 234-5678",
      city: "Los Angeles",
      state: "CA",
      billingType: "Non factored customer",
      fleetType: "Aggregate",
    },
    {
      id: 3,
      name: "Global Shipping Co",
      email: "support@globalshipping.com",
      phone: "+1 (555) 345-6789",
      city: "Chicago",
      state: "IL",
      billingType: "Factored customer",
      fleetType: "Flatbed",
    },
    {
      id: 4,
      name: "FastTrack Freight",
      email: "hello@fasttrack.com",
      phone: "+1 (555) 456-7890",
      city: "Houston",
      state: "TX",
      billingType: "Non factored customer",
      fleetType: "Bulk",
    },
    {
      id: 5,
      name: "Express Carriers",
      email: "contact@expresscarriers.com",
      phone: "+1 (555) 567-8901",
      city: "Phoenix",
      state: "AZ",
      billingType: "Factored customer",
      fleetType: "Aggregate",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      code: "",
      addressLine1: "",
      state: "",
      city: "",
      zipCode: "",
      customerRegion: "",
      billingType: "",
      milesMeterSystem: "",
      fleetType: "",
      milesCalcType: "",
      autoEmailExport: false,
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      code: "",
      addressLine1: "",
      state: "",
      city: "",
      zipCode: "",
      customerRegion: "",
      billingType: "",
      milesMeterSystem: "",
      fleetType: "",
      milesCalcType: "",
      autoEmailExport: false,
    });
  };

  const handleActionClick = (action, customer) => {
    console.log(`Action: ${action}, Customer:`, customer);
    if (action === "view") {
      navigate(
        `/app/carrier-portal/master/customers/customer-details?id=${customer.id}`
      );
    }
  };

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "name",
          label: "Customer Name",
          type: "input",
          group: "Basic",
          placeholder: "Enter customer name...",
        },
        {
          key: "email",
          label: "Email",
          type: "input",
          group: "Basic",
          placeholder: "Enter email...",
        },
        {
          key: "billingType",
          label: "Billing Type",
          type: "select",
          group: "Basic",
          options: [
            { value: "Factored customer", label: "Factored customer" },
            { value: "Non factored customer", label: "Non factored customer" },
          ],
        },
        {
          key: "fleetType",
          label: "Fleet Type",
          type: "select",
          group: "Basic",
          options: [
            { value: "Bulk", label: "Bulk" },
            { value: "Aggregate", label: "Aggregate" },
            { value: "Flatbed", label: "Flatbed" },
          ],
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
    console.log("Active filters:", newFilters);
  }, []);

  const getBillingTypeBadgeColor = (type) => {
    return type === "Factored customer"
      ? "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50"
      : "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50";
  };

  const getFleetTypeBadgeColor = (type) => {
    const colors = {
      Bulk: "bg-purple-500/10 hover:bg-purple-500/30 text-purple-700 dark:text-purple-400 border border-purple-500/50",
      Aggregate:
        "bg-orange-500/10 hover:bg-orange-500/30 text-orange-700 dark:text-orange-400 border border-orange-500/50",
      Flatbed:
        "bg-teal-500/10 hover:bg-teal-500/30 text-teal-700 dark:text-teal-400 border border-teal-500/50",
    };
    return (
      colors[type] ||
      "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50"
    );
  };

  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-56">
              <div className="px-3 py-2 border-b flex items-start gap-2">
                <div className="p-1.5 bg-gray-100 rounded-full mt-0.5">
                  <BuildingIcon className="h-5 w-5 text-gray-600" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-medium text-sm">{customer.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {customer.email}
                  </p>
                </div>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleActionClick("view", customer)}
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleActionClick("edit", customer)}
              >
                Edit Customer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer Name" />
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
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "city",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="City" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "state",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="State" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "billingType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Billing Type" />
      ),
      cell: ({ row }) => {
        const type = row.getValue("billingType");
        return <Badge className={getBillingTypeBadgeColor(type)}>{type}</Badge>;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "fleetType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fleet Type" />
      ),
      cell: ({ row }) => {
        const type = row.getValue("fleetType");
        return <Badge className={getFleetTypeBadgeColor(type)}>{type}</Badge>;
      },
      enableSorting: true,
      enableHiding: true,
    },
  ];

  return (
    <div className="flex flex-col h-full w-full border bg-red-5000 overflow-auto bg-background">
      <div className="px-6 py-4">
        {/* Filter and Add Customer */}
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
            Add Customer here
          </Button>
        </div>

        {/* Data Table */}
        <DataTable columns={columns} data={customers} showViewOptions={false} />
      </div>

      {/* Add Customer Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <div className="flex items-center gap-3">
              <div>
                <SheetTitle className="text-xl font-bold text-gray-900">
                  Add New Customer
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-2 mb-2 px-6">
            {/* Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="ABC Logistics"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
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
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="contact@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Code */}
            <div className="space-y-2">
              <Label
                htmlFor="code"
                className="text-sm font-medium text-gray-700"
              >
                Code
              </Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter customer code"
                value={formData.code}
                onChange={(e) => handleInputChange("code", e.target.value)}
                className="h-10"
              />
            </div>

            {/* Address Line 1 */}
            <div className="space-y-2">
              <Label
                htmlFor="addressLine1"
                className="text-sm font-medium text-gray-700"
              >
                Address Line 1
              </Label>
              <Input
                id="addressLine1"
                type="text"
                placeholder="123 Main Street"
                value={formData.addressLine1}
                onChange={(e) =>
                  handleInputChange("addressLine1", e.target.value)
                }
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

            {/* Zip Code */}
            <div className="space-y-2">
              <Label
                htmlFor="zipCode"
                className="text-sm font-medium text-gray-700"
              >
                Zip Code
              </Label>
              <Input
                id="zipCode"
                type="number"
                placeholder="10001"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                className="h-10"
              />
            </div>

            {/* Customer Region */}
            <div className="space-y-2">
              <Label
                htmlFor="customerRegion"
                className="text-sm font-medium text-gray-700"
              >
                Customer Region
              </Label>
              <Select
                value={formData.customerRegion}
                onValueChange={(value) =>
                  handleInputChange("customerRegion", value)
                }
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="northeast">Northeast</SelectItem>
                  <SelectItem value="southeast">Southeast</SelectItem>
                  <SelectItem value="midwest">Midwest</SelectItem>
                  <SelectItem value="southwest">Southwest</SelectItem>
                  <SelectItem value="west">West</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Billing Type */}
            <div className="space-y-2">
              <Label
                htmlFor="billingType"
                className="text-sm font-medium text-gray-700"
              >
                Billing Type
              </Label>
              <Select
                value={formData.billingType}
                onValueChange={(value) =>
                  handleInputChange("billingType", value)
                }
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select billing type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Factored customer">
                    Factored customer
                  </SelectItem>
                  <SelectItem value="Non factored customer">
                    Non factored customer
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Miles Meter System */}
            <div className="space-y-2">
              <Label
                htmlFor="milesMeterSystem"
                className="text-sm font-medium text-gray-700"
              >
                Miles Meter System
              </Label>
              <Select
                value={formData.milesMeterSystem}
                onValueChange={(value) =>
                  handleInputChange("milesMeterSystem", value)
                }
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select system" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Google">Google</SelectItem>
                  <SelectItem value="PC miler">PC miler</SelectItem>
                  <SelectItem value="select">Select</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fleet Type */}
            <div className="space-y-2">
              <Label
                htmlFor="fleetType"
                className="text-sm font-medium text-gray-700"
              >
                Fleet Type
              </Label>
              <Select
                value={formData.fleetType}
                onValueChange={(value) => handleInputChange("fleetType", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select fleet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bulk">Bulk</SelectItem>
                  <SelectItem value="Aggregate">Aggregate</SelectItem>
                  <SelectItem value="Flatbed">Flatbed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Miles Calc Type */}
            <div className="space-y-2">
              <Label
                htmlFor="milesCalcType"
                className="text-sm font-medium text-gray-700"
              >
                Miles Calc Type
              </Label>
              <Select
                value={formData.milesCalcType}
                onValueChange={(value) =>
                  handleInputChange("milesCalcType", value)
                }
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select calculation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Point to point">Point to point</SelectItem>
                  <SelectItem value="zipcode to zipcode">
                    Zipcode to zipcode
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Auto Email Export */}
            <div className="space-y-2">
              <Label
                htmlFor="autoEmailExport"
                className="text-sm font-medium text-gray-700"
              >
                Auto Email Export
              </Label>
              <Select
                value={formData.autoEmailExport ? "on" : "off"}
                onValueChange={(value) =>
                  handleInputChange("autoEmailExport", value === "on")
                }
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="on">On</SelectItem>
                  <SelectItem value="off">Off</SelectItem>
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
                Create Customer
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Customers;
