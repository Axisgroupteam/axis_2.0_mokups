import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontalIcon,
  PlusIcon,
  TrendingUpIcon,
  EyeIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  RefreshCwIcon,
} from "lucide-react";
import SmartFilter from "@/components/SmartFilter";
import { cn } from "@/lib/utils";

const Rate = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [originLocationOpen, setOriginLocationOpen] = useState(false);
  const [destinationLocationOpen, setDestinationLocationOpen] = useState(false);

  const [formData, setFormData] = useState({
    customer: "",
    rateName: "",
    description: "",
    originMethod: "",
    destinationMethod: "",
    originLocation: "",
    destinationLocation: "",
    customerRateMethod: "",
    driverRateMethod: "",
    customerRate: "",
    driverRate: "",
    distance: "",
    po: "",
  });

  // Mock customers data
  const customers = [
    { value: "cust-001", label: "ABC Logistics Inc." },
    { value: "cust-002", label: "XYZ Transport Co." },
    { value: "cust-003", label: "Global Shipping LLC" },
    { value: "cust-004", label: "Metro Freight Services" },
    { value: "cust-005", label: "Summit Carriers" },
    { value: "cust-006", label: "Pioneer Trucking" },
    { value: "cust-007", label: "Eagle Express" },
    { value: "cust-008", label: "Rapid Haul Inc." },
  ];

  // Mock locations data
  const locations = [
    { value: "loc-001", label: "LOC-001 - Main Warehouse" },
    { value: "loc-002", label: "LOC-002 - Distribution Center East" },
    { value: "loc-003", label: "LOC-003 - North Terminal" },
    { value: "loc-004", label: "LOC-004 - Central Depot" },
    { value: "loc-005", label: "LOC-005 - South Processing" },
    { value: "loc-006", label: "LOC-006 - West Hub" },
    { value: "loc-007", label: "LOC-007 - Airport Cargo Facility" },
    { value: "loc-008", label: "LOC-008 - Port Terminal A" },
  ];

  // Mock rates data - 25 records
  const rates = [
    { id: 1, rateName: "Standard Bulk Rate", customer: "ABC Logistics Inc.", origin: "LOC-001 - Main Warehouse", destination: "LOC-003 - North Terminal", customerRate: 150.0, driverRate: 120.0, distance: "45.5 mi" },
    { id: 2, rateName: "Express Delivery Rate", customer: "XYZ Transport Co.", origin: "LOC-002 - Distribution Center East", destination: "LOC-005 - South Processing", customerRate: 200.0, driverRate: 160.0, distance: "78.2 mi" },
    { id: 3, rateName: "Economy Rate", customer: "Global Shipping LLC", origin: "LOC-004 - Central Depot", destination: "LOC-006 - West Hub", customerRate: 120.0, driverRate: 95.0, distance: "32.8 mi" },
    { id: 4, rateName: "Premium Freight", customer: "Metro Freight Services", origin: "LOC-007 - Airport Cargo Facility", destination: "LOC-008 - Port Terminal A", customerRate: 250.0, driverRate: 200.0, distance: "56.1 mi" },
    { id: 5, rateName: "Long Haul Rate", customer: "Summit Carriers", origin: "LOC-001 - Main Warehouse", destination: "LOC-008 - Port Terminal A", customerRate: 350.0, driverRate: 280.0, distance: "125.3 mi" },
    { id: 6, rateName: "Short Distance Rate", customer: "Pioneer Trucking", origin: "LOC-002 - Distribution Center East", destination: "LOC-003 - North Terminal", customerRate: 85.0, driverRate: 68.0, distance: "15.2 mi" },
    { id: 7, rateName: "Overnight Express", customer: "Eagle Express", origin: "LOC-001 - Main Warehouse", destination: "LOC-006 - West Hub", customerRate: 275.0, driverRate: 220.0, distance: "92.4 mi" },
    { id: 8, rateName: "Bulk Material Rate", customer: "Rapid Haul Inc.", origin: "LOC-004 - Central Depot", destination: "LOC-007 - Airport Cargo Facility", customerRate: 180.0, driverRate: 144.0, distance: "61.8 mi" },
    { id: 9, rateName: "Regional Standard", customer: "ABC Logistics Inc.", origin: "LOC-003 - North Terminal", destination: "LOC-005 - South Processing", customerRate: 165.0, driverRate: 132.0, distance: "53.6 mi" },
    { id: 10, rateName: "Cross-Town Rate", customer: "XYZ Transport Co.", origin: "LOC-006 - West Hub", destination: "LOC-002 - Distribution Center East", customerRate: 140.0, driverRate: 112.0, distance: "38.9 mi" },
    { id: 11, rateName: "Priority Shipment", customer: "Global Shipping LLC", origin: "LOC-008 - Port Terminal A", destination: "LOC-001 - Main Warehouse", customerRate: 225.0, driverRate: 180.0, distance: "82.1 mi" },
    { id: 12, rateName: "Flatbed Special", customer: "Metro Freight Services", origin: "LOC-005 - South Processing", destination: "LOC-004 - Central Depot", customerRate: 195.0, driverRate: 156.0, distance: "67.3 mi" },
    { id: 13, rateName: "Container Rate", customer: "Summit Carriers", origin: "LOC-007 - Airport Cargo Facility", destination: "LOC-003 - North Terminal", customerRate: 310.0, driverRate: 248.0, distance: "104.7 mi" },
    { id: 14, rateName: "Local Delivery", customer: "Pioneer Trucking", origin: "LOC-001 - Main Warehouse", destination: "LOC-002 - Distribution Center East", customerRate: 75.0, driverRate: 60.0, distance: "12.4 mi" },
    { id: 15, rateName: "Interstate Rate", customer: "Eagle Express", origin: "LOC-004 - Central Depot", destination: "LOC-008 - Port Terminal A", customerRate: 420.0, driverRate: 336.0, distance: "156.8 mi" },
    { id: 16, rateName: "Same Day Delivery", customer: "Rapid Haul Inc.", origin: "LOC-006 - West Hub", destination: "LOC-007 - Airport Cargo Facility", customerRate: 185.0, driverRate: 148.0, distance: "58.2 mi" },
    { id: 17, rateName: "Warehouse Transfer", customer: "ABC Logistics Inc.", origin: "LOC-002 - Distribution Center East", destination: "LOC-004 - Central Depot", customerRate: 110.0, driverRate: 88.0, distance: "28.5 mi" },
    { id: 18, rateName: "Rush Hour Rate", customer: "XYZ Transport Co.", origin: "LOC-003 - North Terminal", destination: "LOC-006 - West Hub", customerRate: 155.0, driverRate: 124.0, distance: "47.9 mi" },
    { id: 19, rateName: "Weekend Special", customer: "Global Shipping LLC", origin: "LOC-005 - South Processing", destination: "LOC-001 - Main Warehouse", customerRate: 175.0, driverRate: 140.0, distance: "55.3 mi" },
    { id: 20, rateName: "Heavy Load Rate", customer: "Metro Freight Services", origin: "LOC-008 - Port Terminal A", destination: "LOC-004 - Central Depot", customerRate: 295.0, driverRate: 236.0, distance: "98.6 mi" },
    { id: 21, rateName: "Economy Plus", customer: "Summit Carriers", origin: "LOC-001 - Main Warehouse", destination: "LOC-005 - South Processing", customerRate: 135.0, driverRate: 108.0, distance: "41.2 mi" },
    { id: 22, rateName: "Direct Route Rate", customer: "Pioneer Trucking", origin: "LOC-007 - Airport Cargo Facility", destination: "LOC-002 - Distribution Center East", customerRate: 205.0, driverRate: 164.0, distance: "71.4 mi" },
    { id: 23, rateName: "Multi-Stop Rate", customer: "Eagle Express", origin: "LOC-003 - North Terminal", destination: "LOC-008 - Port Terminal A", customerRate: 380.0, driverRate: 304.0, distance: "142.5 mi" },
    { id: 24, rateName: "Scheduled Delivery", customer: "Rapid Haul Inc.", origin: "LOC-006 - West Hub", destination: "LOC-005 - South Processing", customerRate: 145.0, driverRate: 116.0, distance: "44.8 mi" },
    { id: 25, rateName: "Expedited Freight", customer: "ABC Logistics Inc.", origin: "LOC-004 - Central Depot", destination: "LOC-003 - North Terminal", customerRate: 190.0, driverRate: 152.0, distance: "63.7 mi" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRecalculateDistance = () => {
    // Mock recalculation - in real app this would call an API
    const mockDistance = (Math.random() * 100 + 10).toFixed(1);
    setFormData((prev) => ({ ...prev, distance: mockDistance }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    resetForm();
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      customer: "",
      rateName: "",
      description: "",
      originMethod: "",
      destinationMethod: "",
      originLocation: "",
      destinationLocation: "",
      customerRateMethod: "",
      driverRateMethod: "",
      customerRate: "",
      driverRate: "",
      distance: "",
      po: "",
    });
  };

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "rateName",
          label: "Rate Name",
          type: "input",
          group: "Basic",
          placeholder: "Enter rate name...",
        },
        {
          key: "customer",
          label: "Customer",
          type: "input",
          group: "Basic",
          placeholder: "Enter customer...",
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
        const rate = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <div className="px-3 py-2 border-b flex items-start gap-2">
                <div className="p-1.5 bg-gray-100 rounded-full mt-0.5">
                  <TrendingUpIcon className="h-4 w-4 text-gray-600" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-medium text-sm">{rate.rateName}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {rate.customer}
                  </p>
                </div>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/app/carrier-portal/master/rates/rate-details")}
              >
                <EyeIcon className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "rateName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rate Name" />
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
      accessorKey: "origin",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Origin" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "destination",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Destination" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "customerRate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer Rate" />
      ),
      cell: ({ row }) => `$${row.original.customerRate.toFixed(2)}`,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "driverRate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Driver Rate" />
      ),
      cell: ({ row }) => `$${row.original.driverRate.toFixed(2)}`,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "distance",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Distance" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="px-6 py-4">
        {/* Filter and Add Rate */}
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
            Add Rate
          </Button>
        </div>

        {/* Data Table */}
        <DataTable columns={columns} data={rates} showViewOptions={false} />
      </div>

      {/* Add Rate Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-2xl overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <div className="flex items-center gap-3">
              <div>
                <SheetTitle className="text-xl font-bold text-gray-900">
                  Add New Rate
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4 mb-2 px-6">
            {/* Customer - Combobox */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Customer <span className="text-red-500">*</span>
              </Label>
              <Popover open={customerOpen} onOpenChange={setCustomerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={customerOpen}
                    className="w-full justify-between h-10 font-normal"
                  >
                    {formData.customer
                      ? customers.find((c) => c.value === formData.customer)
                          ?.label
                      : "Select customer..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search customer..." />
                    <CommandList>
                      <CommandEmpty>No customer found.</CommandEmpty>
                      <CommandGroup>
                        {customers.map((customer) => (
                          <CommandItem
                            key={customer.value}
                            value={customer.label}
                            onSelect={() => {
                              handleInputChange("customer", customer.value);
                              setCustomerOpen(false);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.customer === customer.value
                                  ? "opacity-100"
                                  : "opacity-0"
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

            {/* Rate Name */}
            <div className="space-y-2">
              <Label
                htmlFor="rateName"
                className="text-sm font-medium text-gray-700"
              >
                Rate Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="rateName"
                type="text"
                placeholder="Enter rate name"
                value={formData.rateName}
                onChange={(e) => handleInputChange("rateName", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="min-h-[80px] resize-none"
              />
            </div>

            {/* Origin Method & Destination Method */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Origin Method <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.originMethod}
                  onValueChange={(value) =>
                    handleInputChange("originMethod", value)
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="location_code">Location Code</SelectItem>
                    <SelectItem value="zipcode">Zipcode</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Destination Method <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.destinationMethod}
                  onValueChange={(value) =>
                    handleInputChange("destinationMethod", value)
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="location_code">Location Code</SelectItem>
                    <SelectItem value="zipcode">Zipcode</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Origin Location & Destination Location */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Origin Location <span className="text-red-500">*</span>
                </Label>
                <Popover
                  open={originLocationOpen}
                  onOpenChange={setOriginLocationOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={originLocationOpen}
                      className="w-full justify-between h-10 font-normal"
                    >
                      <span className="truncate">
                        {formData.originLocation
                          ? locations.find(
                              (l) => l.value === formData.originLocation
                            )?.label
                          : "Select location..."}
                      </span>
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search location..." />
                      <CommandList>
                        <CommandEmpty>No location found.</CommandEmpty>
                        <CommandGroup>
                          {locations.map((location) => (
                            <CommandItem
                              key={location.value}
                              value={location.label}
                              onSelect={() => {
                                handleInputChange(
                                  "originLocation",
                                  location.value
                                );
                                setOriginLocationOpen(false);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.originLocation === location.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {location.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Destination Location <span className="text-red-500">*</span>
                </Label>
                <Popover
                  open={destinationLocationOpen}
                  onOpenChange={setDestinationLocationOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={destinationLocationOpen}
                      className="w-full justify-between h-10 font-normal"
                    >
                      <span className="truncate">
                        {formData.destinationLocation
                          ? locations.find(
                              (l) => l.value === formData.destinationLocation
                            )?.label
                          : "Select location..."}
                      </span>
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search location..." />
                      <CommandList>
                        <CommandEmpty>No location found.</CommandEmpty>
                        <CommandGroup>
                          {locations.map((location) => (
                            <CommandItem
                              key={location.value}
                              value={location.label}
                              onSelect={() => {
                                handleInputChange(
                                  "destinationLocation",
                                  location.value
                                );
                                setDestinationLocationOpen(false);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.destinationLocation === location.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {location.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Customer Rate Method & Driver Rate Method */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Customer Rate Method <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.customerRateMethod}
                  onValueChange={(value) =>
                    handleInputChange("customerRateMethod", value)
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat</SelectItem>
                    <SelectItem value="tons">Tons</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Driver Rate Method <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.driverRateMethod}
                  onValueChange={(value) =>
                    handleInputChange("driverRateMethod", value)
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat</SelectItem>
                    <SelectItem value="tons">Tons</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Customer Rate & Driver Rate */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="customerRate"
                  className="text-sm font-medium text-gray-700"
                >
                  Customer Rate <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="customerRate"
                    type="number"
                    placeholder="0.00"
                    value={formData.customerRate}
                    onChange={(e) =>
                      handleInputChange("customerRate", e.target.value)
                    }
                    className="h-10 pl-7"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="driverRate"
                  className="text-sm font-medium text-gray-700"
                >
                  Driver Rate <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="driverRate"
                    type="number"
                    placeholder="0.00"
                    value={formData.driverRate}
                    onChange={(e) =>
                      handleInputChange("driverRate", e.target.value)
                    }
                    className="h-10 pl-7"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Distance */}
            <div className="space-y-2">
              <Label
                htmlFor="distance"
                className="text-sm font-medium text-gray-700"
              >
                Distance
              </Label>
              <div className="flex gap-2">
                <Input
                  id="distance"
                  type="text"
                  placeholder="0.0"
                  value={formData.distance}
                  onChange={(e) =>
                    handleInputChange("distance", e.target.value)
                  }
                  className="h-10 flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="h-10"
                  onClick={handleRecalculateDistance}
                >
                  <RefreshCwIcon className="h-4 w-4 mr-2" />
                  Recalculate
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                The distance has been calculated automatically. If you want to
                adjust it manually, you can edit the value directly.
              </p>
            </div>

            {/* PO */}
            <div className="space-y-2">
              <Label
                htmlFor="po"
                className="text-sm font-medium text-gray-700"
              >
                PO
              </Label>
              <Input
                id="po"
                type="text"
                placeholder="Enter PO"
                value={formData.po}
                onChange={(e) => handleInputChange("po", e.target.value)}
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
                Create Rate
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Rate;
