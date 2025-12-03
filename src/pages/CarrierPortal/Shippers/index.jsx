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
import { PlusIcon, MoreHorizontalIcon } from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

const Shippers = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
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
    autoEmailExport: "off",
  });

  // Mock data - 20 customers with all fields
  const customers = [
    {
      id: 1,
      name: "Acme Corporation",
      code: "ACM-001",
      email: "contact@acmecorp.com",
      phone: "+1 (555) 123-4567",
      addressLine1: "123 Main St",
      state: "NY",
      city: "New York",
      zipCode: "10001",
      customerRegion: "Northeast",
      billingType: "Factored customer",
      milesMeterSystem: "Google",
      fleetType: "Bulk",
      milesCalcType: "Point to point",
      autoEmailExport: "on",
    },
    {
      id: 2,
      name: "TechFlow Industries",
      code: "TFI-002",
      email: "info@techflow.com",
      phone: "+1 (555) 234-5678",
      addressLine1: "456 Oak Ave",
      state: "CA",
      city: "Los Angeles",
      zipCode: "90001",
      customerRegion: "West",
      billingType: "Non factored customer",
      milesMeterSystem: "PC miler",
      fleetType: "Aggregate",
      milesCalcType: "zipcode to zipcode",
      autoEmailExport: "off",
    },
    {
      id: 3,
      name: "Global Solutions Ltd",
      code: "GSL-003",
      email: "support@globalsol.com",
      phone: "+1 (555) 345-6789",
      addressLine1: "789 Pine Rd",
      state: "IL",
      city: "Chicago",
      zipCode: "60601",
      customerRegion: "Midwest",
      billingType: "Factored customer",
      milesMeterSystem: "Google",
      fleetType: "Flatbed",
      milesCalcType: "Point to point",
      autoEmailExport: "on",
    },
    {
      id: 4,
      name: "Pioneer Manufacturing",
      code: "PMF-004",
      email: "sales@pioneermfg.com",
      phone: "+1 (555) 456-7890",
      addressLine1: "321 Elm St",
      state: "TX",
      city: "Houston",
      zipCode: "77001",
      customerRegion: "Southwest",
      billingType: "Non factored customer",
      milesMeterSystem: "PC miler",
      fleetType: "Bulk",
      milesCalcType: "zipcode to zipcode",
      autoEmailExport: "off",
    },
    {
      id: 5,
      name: "Stellar Enterprises",
      code: "STE-005",
      email: "hello@stellarent.com",
      phone: "+1 (555) 567-8901",
      addressLine1: "654 Maple Dr",
      state: "AZ",
      city: "Phoenix",
      zipCode: "85001",
      customerRegion: "Southwest",
      billingType: "Factored customer",
      milesMeterSystem: "Google",
      fleetType: "Aggregate",
      milesCalcType: "Point to point",
      autoEmailExport: "on",
    },
    {
      id: 6,
      name: "NextGen Systems",
      code: "NGS-006",
      email: "contact@nextgensys.com",
      phone: "+1 (555) 678-9012",
      addressLine1: "987 Cedar Ln",
      state: "PA",
      city: "Philadelphia",
      zipCode: "19101",
      customerRegion: "Northeast",
      billingType: "Factored customer",
      milesMeterSystem: "PC miler",
      fleetType: "Bulk",
      milesCalcType: "zipcode to zipcode",
      autoEmailExport: "on",
    },
    {
      id: 7,
      name: "Atlas Distribution",
      code: "ATD-007",
      email: "ops@atlasdist.com",
      phone: "+1 (555) 789-0123",
      addressLine1: "147 Birch Blvd",
      state: "TX",
      city: "San Antonio",
      zipCode: "78201",
      customerRegion: "Southwest",
      billingType: "Non factored customer",
      milesMeterSystem: "Google",
      fleetType: "Flatbed",
      milesCalcType: "Point to point",
      autoEmailExport: "off",
    },
    {
      id: 8,
      name: "Vertex Technologies",
      code: "VTX-008",
      email: "info@vertextech.com",
      phone: "+1 (555) 890-1234",
      addressLine1: "258 Walnut St",
      state: "CA",
      city: "San Diego",
      zipCode: "92101",
      customerRegion: "West",
      billingType: "Factored customer",
      milesMeterSystem: "PC miler",
      fleetType: "Aggregate",
      milesCalcType: "zipcode to zipcode",
      autoEmailExport: "on",
    },
    {
      id: 9,
      name: "Omega Logistics",
      code: "OML-009",
      email: "dispatch@omegalog.com",
      phone: "+1 (555) 901-2345",
      addressLine1: "369 Cherry Ave",
      state: "TX",
      city: "Dallas",
      zipCode: "75201",
      customerRegion: "Southwest",
      billingType: "Factored customer",
      milesMeterSystem: "Google",
      fleetType: "Bulk",
      milesCalcType: "Point to point",
      autoEmailExport: "on",
    },
    {
      id: 10,
      name: "Summit Partners",
      code: "SMP-010",
      email: "partners@summitpart.com",
      phone: "+1 (555) 012-3456",
      addressLine1: "741 Spruce Rd",
      state: "CA",
      city: "San Jose",
      zipCode: "95101",
      customerRegion: "West",
      billingType: "Non factored customer",
      milesMeterSystem: "PC miler",
      fleetType: "Flatbed",
      milesCalcType: "zipcode to zipcode",
      autoEmailExport: "off",
    },
    {
      id: 11,
      name: "Horizon Group",
      code: "HRG-011",
      email: "contact@horizongrp.com",
      phone: "+1 (555) 111-2222",
      addressLine1: "852 Ash Dr",
      state: "WA",
      city: "Seattle",
      zipCode: "98101",
      customerRegion: "West",
      billingType: "Factored customer",
      milesMeterSystem: "Google",
      fleetType: "Bulk",
      milesCalcType: "Point to point",
      autoEmailExport: "on",
    },
    {
      id: 12,
      name: "Quantum Dynamics",
      code: "QTD-012",
      email: "info@quantumdyn.com",
      phone: "+1 (555) 222-3333",
      addressLine1: "963 Hickory Ln",
      state: "FL",
      city: "Miami",
      zipCode: "33101",
      customerRegion: "Southeast",
      billingType: "Non factored customer",
      milesMeterSystem: "PC miler",
      fleetType: "Aggregate",
      milesCalcType: "zipcode to zipcode",
      autoEmailExport: "off",
    },
    {
      id: 13,
      name: "Eagle Transport",
      code: "EGT-013",
      email: "dispatch@eagletrans.com",
      phone: "+1 (555) 333-4444",
      addressLine1: "159 Willow St",
      state: "GA",
      city: "Atlanta",
      zipCode: "30301",
      customerRegion: "Southeast",
      billingType: "Factored customer",
      milesMeterSystem: "Google",
      fleetType: "Flatbed",
      milesCalcType: "Point to point",
      autoEmailExport: "on",
    },
    {
      id: 14,
      name: "Nova Industries",
      code: "NVI-014",
      email: "sales@novaind.com",
      phone: "+1 (555) 444-5555",
      addressLine1: "267 Poplar Ave",
      state: "OH",
      city: "Columbus",
      zipCode: "43201",
      customerRegion: "Midwest",
      billingType: "Factored customer",
      milesMeterSystem: "PC miler",
      fleetType: "Bulk",
      milesCalcType: "zipcode to zipcode",
      autoEmailExport: "on",
    },
    {
      id: 15,
      name: "Prime Ventures",
      code: "PRV-015",
      email: "invest@primevent.com",
      phone: "+1 (555) 555-6666",
      addressLine1: "378 Cypress Rd",
      state: "NC",
      city: "Charlotte",
      zipCode: "28201",
      customerRegion: "Southeast",
      billingType: "Non factored customer",
      milesMeterSystem: "Google",
      fleetType: "Aggregate",
      milesCalcType: "Point to point",
      autoEmailExport: "off",
    },
    {
      id: 16,
      name: "Delta Manufacturing",
      code: "DLM-016",
      email: "orders@deltamfg.com",
      phone: "+1 (555) 666-7777",
      addressLine1: "489 Magnolia Dr",
      state: "IN",
      city: "Indianapolis",
      zipCode: "46201",
      customerRegion: "Midwest",
      billingType: "Factored customer",
      milesMeterSystem: "PC miler",
      fleetType: "Flatbed",
      milesCalcType: "zipcode to zipcode",
      autoEmailExport: "on",
    },
    {
      id: 17,
      name: "Apex Solutions",
      code: "APS-017",
      email: "support@apexsol.com",
      phone: "+1 (555) 777-8888",
      addressLine1: "591 Redwood Ln",
      state: "CO",
      city: "Denver",
      zipCode: "80201",
      customerRegion: "West",
      billingType: "Factored customer",
      milesMeterSystem: "Google",
      fleetType: "Bulk",
      milesCalcType: "Point to point",
      autoEmailExport: "on",
    },
    {
      id: 18,
      name: "Titan Holdings",
      code: "TTH-018",
      email: "info@titanhld.com",
      phone: "+1 (555) 888-9999",
      addressLine1: "612 Sequoia St",
      state: "MA",
      city: "Boston",
      zipCode: "02101",
      customerRegion: "Northeast",
      billingType: "Non factored customer",
      milesMeterSystem: "PC miler",
      fleetType: "Aggregate",
      milesCalcType: "zipcode to zipcode",
      autoEmailExport: "off",
    },
    {
      id: 19,
      name: "Fusion Corp",
      code: "FSC-019",
      email: "contact@fusioncorp.com",
      phone: "+1 (555) 999-0000",
      addressLine1: "723 Palm Ave",
      state: "TN",
      city: "Nashville",
      zipCode: "37201",
      customerRegion: "Southeast",
      billingType: "Factored customer",
      milesMeterSystem: "Google",
      fleetType: "Flatbed",
      milesCalcType: "Point to point",
      autoEmailExport: "on",
    },
    {
      id: 20,
      name: "Pinnacle Group",
      code: "PNG-020",
      email: "hello@pinnaclegr.com",
      phone: "+1 (555) 000-1111",
      addressLine1: "834 Juniper Rd",
      state: "OR",
      city: "Portland",
      zipCode: "97201",
      customerRegion: "West",
      billingType: "Factored customer",
      milesMeterSystem: "PC miler",
      fleetType: "Bulk",
      milesCalcType: "zipcode to zipcode",
      autoEmailExport: "on",
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
      autoEmailExport: "off",
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
      autoEmailExport: "off",
    });
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
          key: "code",
          label: "Code",
          type: "input",
          group: "Basic",
          placeholder: "Enter code...",
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

  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <div className="px-3 py-2 border-b flex items-start gap-2">
                <div className="overflow-hidden">
                  <p className="font-medium text-sm">{customer.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {customer.code}
                  </p>
                </div>
              </div>
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/app/carrier-portal/master/customers/customer-details?id=${customer.id}&tab=profile`
                  )
                }
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/app/carrier-portal/master/customers/customer-details?id=${customer.id}&tab=metrics`
                  )
                }
              >
                Metrics
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/app/carrier-portal/master/customers/customer-details?id=${customer.id}&tab=orders`
                  )
                }
              >
                Orders
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/app/carrier-portal/master/customers/customer-details?id=${customer.id}&tab=reports`
                  )
                }
              >
                Reports
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/app/carrier-portal/master/customers/customer-details?id=${customer.id}&tab=payments`
                  )
                }
              >
                Payments
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/app/carrier-portal/master/customers/customer-details?id=${customer.id}&tab=receivables`
                  )
                }
              >
                Receivables
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/app/carrier-portal/master/customers/customer-details?id=${customer.id}&tab=rates`
                  )
                }
              >
                Rates
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/app/carrier-portal/master/customers/customer-details?id=${customer.id}&tab=sales`
                  )
                }
              >
                Sales
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/app/carrier-portal/master/customers/customer-details?id=${customer.id}&tab=instructions`
                  )
                }
              >
                Instructions
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/app/carrier-portal/master/customers/customer-details?id=${customer.id}&tab=vault`
                  )
                }
              >
                Vault
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/app/carrier-portal/master/customers/customer-details?id=${customer.id}&tab=locations`
                  )
                }
              >
                Locations
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
        <DataTableColumnHeader column={column} title="Name" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      size: 120,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "addressLine1",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Address Line 1" />
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
      accessorKey: "milesMeterSystem",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Miles Meter System" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "fleetType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fleet Type" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "milesCalcType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Miles Calc Type" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "autoEmailExport",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Auto Email Export" />
      ),
      cell: ({ row }) => {
        const value = row.getValue("autoEmailExport");
        return (
          <Badge
            className={
              value === "on"
                ? "bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50"
                : "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50"
            }
          >
            {value === "on" ? "On" : "Off"}
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
            Add Customer
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
                  <SelectItem value="Northeast">Northeast</SelectItem>
                  <SelectItem value="Southeast">Southeast</SelectItem>
                  <SelectItem value="Midwest">Midwest</SelectItem>
                  <SelectItem value="Southwest">Southwest</SelectItem>
                  <SelectItem value="West">West</SelectItem>
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
                value={formData.autoEmailExport}
                onValueChange={(value) =>
                  handleInputChange("autoEmailExport", value)
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

export default Shippers;
