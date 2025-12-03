import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, PlusIcon, MapPinIcon, EyeIcon } from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

const Location = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    contact: "",
    phone: "",
    email: "",
    address: "",
    latitude: "",
    longitude: "",
    state: "",
    city: "",
    zipCode: "",
  });

  // Mock location data - 25 records
  const locations = [
    { id: 1, code: "LOC-001", name: "Main Warehouse", contact: "John Smith", phone: "(555) 123-4567", email: "john.smith@warehouse.com", address: "123 Industrial Blvd, New York, NY 10001" },
    { id: 2, code: "LOC-002", name: "Distribution Center East", contact: "Sarah Johnson", phone: "(555) 234-5678", email: "sarah.j@distcenter.com", address: "456 Commerce St, Brooklyn, NY 11201" },
    { id: 3, code: "LOC-003", name: "North Terminal", contact: "Michael Brown", phone: "(555) 345-6789", email: "m.brown@terminal.com", address: "789 Logistics Way, Queens, NY 11354" },
    { id: 4, code: "LOC-004", name: "Central Depot", contact: "Emily Davis", phone: "(555) 456-7890", email: "emily.d@depot.com", address: "321 Supply Chain Dr, Bronx, NY 10451" },
    { id: 5, code: "LOC-005", name: "South Processing", contact: "David Wilson", phone: "(555) 567-8901", email: "d.wilson@processing.com", address: "654 Transport Ave, Staten Island, NY 10301" },
    { id: 6, code: "LOC-006", name: "West Hub", contact: "Jessica Martinez", phone: "(555) 678-9012", email: "j.martinez@hub.com", address: "987 Freight Rd, Newark, NJ 07102" },
    { id: 7, code: "LOC-007", name: "Airport Cargo Facility", contact: "Robert Taylor", phone: "(555) 789-0123", email: "r.taylor@cargo.com", address: "147 Airport Blvd, Elizabeth, NJ 07201" },
    { id: 8, code: "LOC-008", name: "Port Terminal A", contact: "Amanda Anderson", phone: "(555) 890-1234", email: "a.anderson@port.com", address: "258 Harbor Dr, Jersey City, NJ 07305" },
    { id: 9, code: "LOC-009", name: "Rail Yard Station", contact: "James Thomas", phone: "(555) 901-2345", email: "j.thomas@railyard.com", address: "369 Railway St, Hoboken, NJ 07030" },
    { id: 10, code: "LOC-010", name: "Cold Storage Facility", contact: "Jennifer Garcia", phone: "(555) 012-3456", email: "jen.garcia@coldstorage.com", address: "741 Refrigeration Ln, Secaucus, NJ 07094" },
    { id: 11, code: "LOC-011", name: "Cross-Dock Center", contact: "William Lee", phone: "(555) 111-2222", email: "w.lee@crossdock.com", address: "852 Transfer Rd, Kearny, NJ 07032" },
    { id: 12, code: "LOC-012", name: "Bulk Storage Yard", contact: "Lisa White", phone: "(555) 222-3333", email: "l.white@bulkstorage.com", address: "963 Container Ave, Bayonne, NJ 07002" },
    { id: 13, code: "LOC-013", name: "Fulfillment Center", contact: "Christopher Harris", phone: "(555) 333-4444", email: "c.harris@fulfillment.com", address: "174 Ecommerce Blvd, Edison, NJ 08817" },
    { id: 14, code: "LOC-014", name: "Intermodal Facility", contact: "Patricia Clark", phone: "(555) 444-5555", email: "p.clark@intermodal.com", address: "285 Multimodal Way, Linden, NJ 07036" },
    { id: 15, code: "LOC-015", name: "Hazmat Storage", contact: "Daniel Lewis", phone: "(555) 555-6666", email: "d.lewis@hazmat.com", address: "396 Chemical Dr, Rahway, NJ 07065" },
    { id: 16, code: "LOC-016", name: "Regional Hub Northeast", contact: "Nancy Walker", phone: "(555) 666-7777", email: "n.walker@regionalhub.com", address: "507 Distribution Pkwy, Cranford, NJ 07016" },
    { id: 17, code: "LOC-017", name: "Consolidation Center", contact: "Mark Robinson", phone: "(555) 777-8888", email: "m.robinson@consolidation.com", address: "618 Merge Ln, Westfield, NJ 07090" },
    { id: 18, code: "LOC-018", name: "Last Mile Station", contact: "Karen Hall", phone: "(555) 888-9999", email: "k.hall@lastmile.com", address: "729 Delivery St, Summit, NJ 07901" },
    { id: 19, code: "LOC-019", name: "Returns Processing", contact: "Steven Young", phone: "(555) 999-0000", email: "s.young@returns.com", address: "840 Reverse Logistics Rd, Morristown, NJ 07960" },
    { id: 20, code: "LOC-020", name: "Overflow Storage", contact: "Betty King", phone: "(555) 101-1010", email: "b.king@overflow.com", address: "951 Expansion Ave, Parsippany, NJ 07054" },
    { id: 21, code: "LOC-021", name: "Customs Bonded Warehouse", contact: "Edward Wright", phone: "(555) 202-2020", email: "e.wright@customs.com", address: "162 Import Blvd, Fort Lee, NJ 07024" },
    { id: 22, code: "LOC-022", name: "Packaging Center", contact: "Dorothy Scott", phone: "(555) 303-3030", email: "d.scott@packaging.com", address: "273 Pack Ln, Teaneck, NJ 07666" },
    { id: 23, code: "LOC-023", name: "Quality Control Hub", contact: "Frank Green", phone: "(555) 404-4040", email: "f.green@qc.com", address: "384 Inspection Dr, Hackensack, NJ 07601" },
    { id: 24, code: "LOC-024", name: "Assembly Station", contact: "Margaret Adams", phone: "(555) 505-5050", email: "m.adams@assembly.com", address: "495 Build Ave, Paramus, NJ 07652" },
    { id: 25, code: "LOC-025", name: "Kitting Facility", contact: "George Baker", phone: "(555) 606-6060", email: "g.baker@kitting.com", address: "606 Bundle St, Ridgewood, NJ 07450" },
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
      contact: "",
      phone: "",
      email: "",
      address: "",
      latitude: "",
      longitude: "",
      state: "",
      city: "",
      zipCode: "",
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setFormData({
      code: "",
      name: "",
      contact: "",
      phone: "",
      email: "",
      address: "",
      latitude: "",
      longitude: "",
      state: "",
      city: "",
      zipCode: "",
    });
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
          placeholder: "Enter name...",
        },
        {
          key: "code",
          label: "Code",
          type: "input",
          group: "Basic",
          placeholder: "Enter code...",
        },
        {
          key: "contact",
          label: "Contact",
          type: "input",
          group: "Basic",
          placeholder: "Enter contact...",
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
        const location = row.original;

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
                  <MapPinIcon className="h-4 w-4 text-gray-600" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-medium text-sm">{location.name}</p>
                  <p className="text-xs text-gray-500 truncate">{location.code}</p>
                </div>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/app/carrier-portal/master/location/location-details")}
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
        <DataTableColumnHeader column={column} title="Name" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "contact",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Contact" />
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
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
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
        {/* Filter and Add Location */}
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
            Add Location
          </Button>
        </div>

        {/* Data Table with built-in toolbar and pagination */}
        <DataTable columns={columns} data={locations} showViewOptions={false} />
      </div>

      {/* Add Location Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <div className="flex items-center gap-3">
              <div>
                <SheetTitle className="text-xl font-bold text-gray-900">
                  Add New Location
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-2 mb-2 px-6">
            {/* Code */}
            <div className="space-y-2">
              <Label
                htmlFor="code"
                className="text-sm font-medium text-gray-700"
              >
                Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter Code"
                value={formData.code}
                onChange={(e) => handleInputChange("code", e.target.value)}
                className="h-10"
                required
              />
            </div>

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
                placeholder="Enter Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <Label
                htmlFor="contact"
                className="text-sm font-medium text-gray-700"
              >
                Contact
              </Label>
              <Input
                id="contact"
                type="text"
                placeholder="Enter Contact"
                value={formData.contact}
                onChange={(e) => handleInputChange("contact", e.target.value)}
                className="h-10"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="123-456-7890"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="h-10"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-10"
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="text-sm font-medium text-gray-700"
              >
                Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                type="text"
                placeholder="Enter your Address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Latitude */}
            <div className="space-y-2">
              <Label
                htmlFor="latitude"
                className="text-sm font-medium text-gray-700"
              >
                Latitude <span className="text-red-500">*</span>
              </Label>
              <Input
                id="latitude"
                type="text"
                placeholder="Enter Latitude"
                value={formData.latitude}
                onChange={(e) => handleInputChange("latitude", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Longitude */}
            <div className="space-y-2">
              <Label
                htmlFor="longitude"
                className="text-sm font-medium text-gray-700"
              >
                Longitude <span className="text-red-500">*</span>
              </Label>
              <Input
                id="longitude"
                type="text"
                placeholder="Enter Longitude"
                value={formData.longitude}
                onChange={(e) => handleInputChange("longitude", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* State */}
            <div className="space-y-2">
              <Label
                htmlFor="state"
                className="text-sm font-medium text-gray-700"
              >
                State <span className="text-red-500">*</span>
              </Label>
              <Input
                id="state"
                type="text"
                placeholder="Enter State"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label
                htmlFor="city"
                className="text-sm font-medium text-gray-700"
              >
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="Enter City"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Zip Code */}
            <div className="space-y-2">
              <Label
                htmlFor="zipCode"
                className="text-sm font-medium text-gray-700"
              >
                Zip Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="zipCode"
                type="text"
                placeholder="Enter Zip Code"
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
                Create Location
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Location;
