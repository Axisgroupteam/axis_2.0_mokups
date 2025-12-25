import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlusIcon,
  MoreHorizontalIcon,
  PencilIcon,
} from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

const Suppliers = () => {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [filters, setFilters] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    duns: "",
    contactName: "",
    phone: "",
    email: "",
    address: "",
    status: "Active",
  });

  // Mock data for suppliers based on Mega Materials documentation
  const suppliers = [
    {
      id: 1,
      name: "Rocky's Quarry",
      duns: "123456789",
      contactName: "John Rocky",
      phone: "(813) 555-0123",
      email: "john@rockysquarry.com",
      address: "1234 Quarry Rd, Tampa, FL 33601",
      status: "Active",
    },
    {
      id: 2,
      name: "Tampa Sand Co",
      duns: "234567890",
      contactName: "Mike Sanders",
      phone: "(813) 555-0456",
      email: "mike@tampasand.com",
      address: "5678 Sand Pit Ln, Tampa, FL 33602",
      status: "Active",
    },
    {
      id: 3,
      name: "Gulf Concrete",
      duns: "345678901",
      contactName: "Sarah Mixwell",
      phone: "(813) 555-0789",
      email: "sarah@gulfconcrete.com",
      address: "910 Mixer Ave, Clearwater, FL 33755",
      status: "Active",
    },
    {
      id: 4,
      name: "Green Recyclers",
      duns: "456789012",
      contactName: "Tom Green",
      phone: "(813) 555-1011",
      email: "tom@greenrecyclers.com",
      address: "1112 Recycle Way, St. Petersburg, FL 33701",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Sunshine Aggregates",
      duns: "567890123",
      contactName: "Lisa Stone",
      phone: "(813) 555-1213",
      email: "lisa@sunshineagg.com",
      address: "1415 Aggregate Blvd, Brandon, FL 33510",
      status: "Active",
    },
    {
      id: 6,
      name: "Central Florida Sand",
      duns: "678901234",
      contactName: "David Beach",
      phone: "(407) 555-1415",
      email: "david@cflsand.com",
      address: "1617 Sandy Rd, Orlando, FL 32801",
      status: "Active",
    },
    {
      id: 7,
      name: "Bay Area Concrete",
      duns: "789012345",
      contactName: "Jennifer Mix",
      phone: "(813) 555-1617",
      email: "jennifer@bayareaconcrete.com",
      address: "1819 Cement Dr, Tampa, FL 33603",
      status: "Active",
    },
    {
      id: 8,
      name: "Eco Materials Inc",
      duns: "890123456",
      contactName: "Robert Eco",
      phone: "(813) 555-1819",
      email: "robert@ecomaterials.com",
      address: "2021 Green St, Lakeland, FL 33801",
      status: "Inactive",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    setEditingSupplier(null);
    setFormData({
      name: "",
      duns: "",
      contactName: "",
      phone: "",
      email: "",
      address: "",
      status: "Active",
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setEditingSupplier(null);
    setFormData({
      name: "",
      duns: "",
      contactName: "",
      phone: "",
      email: "",
      address: "",
      status: "Active",
    });
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      name: supplier.name,
      duns: supplier.duns || "",
      contactName: supplier.contactName,
      phone: supplier.phone,
      email: supplier.email,
      address: supplier.address,
      status: supplier.status,
    });
    setIsSheetOpen(true);
  };

  const handleAddNew = () => {
    setEditingSupplier(null);
    setFormData({
      name: "",
      duns: "",
      contactName: "",
      phone: "",
      email: "",
      address: "",
      status: "Active",
    });
    setIsSheetOpen(true);
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      Active:
        "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50",
      Inactive:
        "bg-red-500/10 hover:bg-red-500/30 text-red-700 dark:text-red-400 border border-red-500/50",
    };
    return (
      colors[status] ||
      "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50"
    );
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
          placeholder: "Search supplier name...",
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
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
        const supplier = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <div className="px-2 py-1.5 border-b mb-1">
                <p className="font-medium text-sm">{supplier.name}</p>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleEdit(supplier)}
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
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
        <DataTableColumnHeader column={column} title="Supplier Name" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "duns",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="DUNS" />
      ),
      cell: ({ row }) => {
        const duns = row.getValue("duns");
        return <span className="font-mono text-muted-foreground">{duns}</span>;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "contactName",
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
      cell: ({ row }) => {
        const phone = row.getValue("phone");
        return <span className="text-muted-foreground">{phone}</span>;
      },
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => {
        const email = row.getValue("email");
        return <span className="text-muted-foreground">{email}</span>;
      },
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge className={getStatusBadgeColor(status)}>
            {status}
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
        {/* Filter */}
        <div className="flex items-center justify-between mb-1">
          <SmartFilter
            filterGroups={filterGroups}
            onFiltersChange={handleFiltersChange}
          />
          <Button
            onClick={handleAddNew}
            className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={suppliers}
          showViewOptions={false}
        />
      </div>

      {/* Add/Edit Supplier Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingSupplier ? "Edit Supplier" : "Add New Supplier"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4 px-6">
            {/* Supplier Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Supplier Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., Rocky's Quarry"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* DUNS */}
            <div className="space-y-2">
              <Label
                htmlFor="duns"
                className="text-sm font-medium text-foreground"
              >
                DUNS
              </Label>
              <Input
                id="duns"
                type="text"
                placeholder="e.g., 123456789"
                value={formData.duns}
                onChange={(e) => handleInputChange("duns", e.target.value)}
                className="h-10 font-mono"
                maxLength={9}
              />
            </div>

            {/* Contact Name */}
            <div className="space-y-2">
              <Label
                htmlFor="contactName"
                className="text-sm font-medium text-foreground"
              >
                Contact Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactName"
                type="text"
                placeholder="e.g., John Rocky"
                value={formData.contactName}
                onChange={(e) => handleInputChange("contactName", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-foreground"
              >
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="e.g., (813) 555-0123"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g., john@rockysquarry.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="text-sm font-medium text-foreground"
              >
                Address
              </Label>
              <Textarea
                id="address"
                placeholder="Enter supplier address..."
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="min-h-[80px]"
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
                {editingSupplier ? "Update Supplier" : "Create Supplier"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Suppliers;
