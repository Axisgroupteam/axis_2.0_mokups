import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusIcon, MoreHorizontalIcon, MapPin } from "lucide-react";

const PickupLocations = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    setFormData({
      code: "",
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setFormData({
      code: "",
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    });
  };

  return (
    <div className="w-full border rounded-sm bg-card">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <MapPin className="size-4" />
          Pickup Locations
        </h3>
        <Button
          size="sm"
          className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
          onClick={() => setIsSheetOpen(true)}
        >
          <PlusIcon className="size-3" />
          Add Location
        </Button>
      </div>
      <div className="p-4">
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-semibold border-r h-9 py-2">
                  Actions
                </TableHead>
                <TableHead className="text-xs font-semibold border-r h-9 py-2">
                  Code
                </TableHead>
                <TableHead className="text-xs font-semibold border-r h-9 py-2">
                  Name
                </TableHead>
                <TableHead className="text-xs font-semibold border-r h-9 py-2">
                  Address
                </TableHead>
                <TableHead className="text-xs font-semibold border-r h-9 py-2">
                  City
                </TableHead>
                <TableHead className="text-xs font-semibold border-r h-9 py-2">
                  State
                </TableHead>
                <TableHead className="text-xs font-semibold h-9 py-2">
                  Zip Code
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pickupLocations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell className="text-xs border-r py-2.5">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell className="text-xs border-r py-2.5">
                    {location.code}
                  </TableCell>
                  <TableCell className="text-xs border-r py-2.5">
                    {location.name}
                  </TableCell>
                  <TableCell className="text-xs border-r py-2.5">
                    {location.address}
                  </TableCell>
                  <TableCell className="text-xs border-r py-2.5">
                    {location.city}
                  </TableCell>
                  <TableCell className="text-xs border-r py-2.5">
                    {location.state}
                  </TableCell>
                  <TableCell className="text-xs py-2.5">
                    {location.zipCode}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Location Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <div className="flex items-center gap-3">
              <div>
                <SheetTitle className="text-xl font-bold text-gray-900">
                  Add Pickup Location
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-2 mb-2 px-6">
            {/* Code */}
            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm font-medium text-gray-700">
                Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="code"
                type="text"
                placeholder="PU-001"
                value={formData.code}
                onChange={(e) => handleInputChange("code", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Main Warehouse"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                type="text"
                placeholder="123 Industrial Blvd"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="New York"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* State */}
            <div className="space-y-2">
              <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                State <span className="text-red-500">*</span>
              </Label>
              <Input
                id="state"
                type="text"
                placeholder="NY"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Zip Code */}
            <div className="space-y-2">
              <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
                Zip Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="zipCode"
                type="text"
                placeholder="10001"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                className="h-10"
                required
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
