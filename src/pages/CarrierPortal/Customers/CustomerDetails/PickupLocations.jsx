import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import SmartFilter from "@/components/SmartFilter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusIcon, MoreHorizontalIcon, ChevronsUpDownIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const PickupLocations = () => {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationPopoverOpen, setLocationPopoverOpen] = useState(false);

  // Available locations to select from (master list)
  const availableLocations = [
    { id: 101, code: "LOC-101", name: "Downtown Warehouse", address: "100 Main St", city: "Manhattan", state: "NY", zipCode: "10001" },
    { id: 102, code: "LOC-102", name: "Harbor Terminal", address: "200 Port Ave", city: "Jersey City", state: "NJ", zipCode: "07302" },
    { id: 103, code: "LOC-103", name: "Airport Cargo Hub", address: "300 Airport Rd", city: "Newark", state: "NJ", zipCode: "07114" },
    { id: 104, code: "LOC-104", name: "Industrial Park East", address: "400 Industrial Blvd", city: "Edison", state: "NJ", zipCode: "08817" },
    { id: 105, code: "LOC-105", name: "Midtown Distribution", address: "500 5th Ave", city: "New York", state: "NY", zipCode: "10018" },
    { id: 106, code: "LOC-106", name: "Suburban Depot", address: "600 Commerce Dr", city: "Paramus", state: "NJ", zipCode: "07652" },
    { id: 107, code: "LOC-107", name: "Riverside Facility", address: "700 River Rd", city: "Hoboken", state: "NJ", zipCode: "07030" },
    { id: 108, code: "LOC-108", name: "Gateway Center", address: "800 Gateway Blvd", city: "Newark", state: "NJ", zipCode: "07102" },
    { id: 109, code: "LOC-109", name: "Metro Storage", address: "900 Metro Pkwy", city: "Secaucus", state: "NJ", zipCode: "07094" },
    { id: 110, code: "LOC-110", name: "Express Terminal", address: "1000 Express Way", city: "Elizabeth", state: "NJ", zipCode: "07201" },
  ];

  // Filter configurations
  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "name",
          label: "Name",
          type: "input",
          group: "Basic",
          placeholder: "Search name...",
        },
        {
          key: "city",
          label: "City",
          type: "input",
          group: "Basic",
          placeholder: "Search city...",
        },
        {
          key: "state",
          label: "State",
          type: "select",
          group: "Basic",
          options: [
            { value: "NY", label: "NY" },
            { value: "NJ", label: "NJ" },
            { value: "CA", label: "CA" },
          ],
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Mock pickup locations data
  const pickupLocations = [
    {
      id: 1,
      code: "PU-001",
      name: "Main Warehouse",
      address: "123 Industrial Blvd",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
    {
      id: 2,
      code: "PU-002",
      name: "Distribution Center East",
      address: "456 Commerce St",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11201",
    },
    {
      id: 3,
      code: "PU-003",
      name: "North Terminal",
      address: "789 Logistics Way",
      city: "Queens",
      state: "NY",
      zipCode: "11354",
    },
    {
      id: 4,
      code: "PU-004",
      name: "Central Depot",
      address: "321 Supply Chain Dr",
      city: "Bronx",
      state: "NY",
      zipCode: "10451",
    },
    {
      id: 5,
      code: "PU-005",
      name: "South Processing",
      address: "654 Transport Ave",
      city: "Staten Island",
      state: "NY",
      zipCode: "10301",
    },
  ];

  // Column definitions
  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() =>
                  navigate("/app/carrier-portal/master/location/location-details")
                }
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      size: 100,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      size: 180,
    },
    {
      accessorKey: "address",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Address" />
      ),
      size: 200,
    },
    {
      accessorKey: "city",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="City" />
      ),
      size: 120,
    },
    {
      accessorKey: "state",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="State" />
      ),
      size: 80,
    },
    {
      accessorKey: "zipCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Zip Code" />
      ),
      size: 100,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedLocation) {
      console.log("Location added:", selectedLocation);
      setIsSheetOpen(false);
      setSelectedLocation(null);
    }
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setSelectedLocation(null);
  };

  return (
    <div className="border border-border rounded-lg p-4 bg-background">
      <div className="flex items-center justify-between mb-3">
        <SmartFilter
          filterGroups={filterGroups}
          onFiltersChange={handleFiltersChange}
        />
        <Button
          size="sm"
          className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
          onClick={() => setIsSheetOpen(true)}
        >
          <PlusIcon className="size-3" />
          Add Location
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={pickupLocations}
        showViewOptions={false}
        pageSize={10}
      />

      {/* Add Location Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              Add Pickup Location
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4 px-6">
            {/* Location Select with Search */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Select Location <span className="text-red-500">*</span>
              </Label>
              <Popover open={locationPopoverOpen} onOpenChange={setLocationPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={locationPopoverOpen}
                    className="w-full h-10 justify-between font-normal"
                  >
                    {selectedLocation
                      ? `${selectedLocation.name} - ${selectedLocation.city}, ${selectedLocation.state}`
                      : "Search and select location..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search location..." />
                    <CommandList>
                      <CommandEmpty>No location found.</CommandEmpty>
                      <CommandGroup>
                        {availableLocations.map((location) => (
                          <CommandItem
                            key={location.id}
                            value={`${location.name} ${location.city} ${location.state} ${location.code}`}
                            onSelect={() => {
                              setSelectedLocation(location);
                              setLocationPopoverOpen(false);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedLocation?.id === location.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <div className="flex flex-col">
                              <span className="font-medium">{location.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {location.address}, {location.city}, {location.state} {location.zipCode}
                              </span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Selected Location Details Preview */}
            {selectedLocation && (
              <div className="p-4 border border-border rounded-lg bg-muted/50">
                <p className="text-sm font-medium text-foreground mb-2">Selected Location Details</p>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Code:</span> {selectedLocation.code}</p>
                  <p><span className="font-medium text-foreground">Name:</span> {selectedLocation.name}</p>
                  <p><span className="font-medium text-foreground">Address:</span> {selectedLocation.address}</p>
                  <p><span className="font-medium text-foreground">City:</span> {selectedLocation.city}</p>
                  <p><span className="font-medium text-foreground">State:</span> {selectedLocation.state}</p>
                  <p><span className="font-medium text-foreground">Zip Code:</span> {selectedLocation.zipCode}</p>
                </div>
              </div>
            )}

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
                disabled={!selectedLocation}
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Add Location
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PickupLocations;
