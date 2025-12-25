import { useState, useCallback } from "react";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  PlusIcon,
  MoreHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

const NetworkPartners = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [filters, setFilters] = useState([]);
  const [formData, setFormData] = useState({
    supplierName: "",
    fuelTypes: [],
    contactPerson: "",
    email: "",
    phone: "",
  });

  // Mock data for suppliers
  const suppliers = [
    {
      id: 1,
      supplierName: "Pilot Flying J",
      fuelTypes: ["Diesel", "DEF", "Reefer"],
      contactPerson: "John Smith",
      email: "john.smith@pilotflyingj.com",
      phone: "(615) 555-0123",
    },
    {
      id: 2,
      supplierName: "Love's Travel Stops",
      fuelTypes: ["Diesel", "DEF"],
      contactPerson: "Sarah Johnson",
      email: "sarah.johnson@loves.com",
      phone: "(405) 555-0456",
    },
    {
      id: 3,
      supplierName: "TA/Petro",
      fuelTypes: ["Diesel", "DEF", "Reefer"],
      contactPerson: "Mike Williams",
      email: "mike.williams@ta-petro.com",
      phone: "(440) 555-0789",
    },
    {
      id: 4,
      supplierName: "Sapp Bros",
      fuelTypes: ["Diesel", "DEF"],
      contactPerson: "Emily Davis",
      email: "emily.davis@sappbros.com",
      phone: "(402) 555-0321",
    },
    {
      id: 5,
      supplierName: "Kwick Trip",
      fuelTypes: ["Diesel"],
      contactPerson: "Robert Brown",
      email: "robert.brown@kwicktrip.com",
      phone: "(608) 555-0654",
    },
    {
      id: 6,
      supplierName: "QuikTrip",
      fuelTypes: ["Diesel", "DEF"],
      contactPerson: "Lisa Anderson",
      email: "lisa.anderson@quiktrip.com",
      phone: "(918) 555-0987",
    },
    {
      id: 7,
      supplierName: "Casey's",
      fuelTypes: ["Diesel"],
      contactPerson: "David Martinez",
      email: "david.martinez@caseys.com",
      phone: "(515) 555-0147",
    },
    {
      id: 8,
      supplierName: "Buc-ee's",
      fuelTypes: ["Diesel", "DEF", "Reefer"],
      contactPerson: "Jennifer Wilson",
      email: "jennifer.wilson@buc-ees.com",
      phone: "(979) 555-0258",
    },
  ];

  const fuelTypeOptions = ["Diesel", "DEF", "Reefer"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFuelTypeChange = (fuelType, checked) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        fuelTypes: [...prev.fuelTypes, fuelType],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        fuelTypes: prev.fuelTypes.filter((f) => f !== fuelType),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    setEditingSupplier(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      supplierName: "",
      fuelTypes: [],
      contactPerson: "",
      email: "",
      phone: "",
    });
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      supplierName: supplier.supplierName,
      fuelTypes: supplier.fuelTypes,
      contactPerson: supplier.contactPerson,
      email: supplier.email,
      phone: supplier.phone,
    });
    setIsSheetOpen(true);
  };

  const handleAddNew = () => {
    setEditingSupplier(null);
    resetForm();
    setIsSheetOpen(true);
  };

  const getFuelTypeBadgeColor = (fuelType) => {
    const colors = {
      Diesel: "bg-slate-500/10 text-slate-700 dark:text-slate-400 border border-slate-500/50",
      DEF: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/50",
      Reefer: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/50",
    };
    return colors[fuelType] || "bg-gray-500/10 text-gray-700 border border-gray-500/50";
  };

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "supplierName",
          label: "Supplier Name",
          type: "input",
          group: "Basic",
          placeholder: "Search supplier...",
        },
        {
          key: "fuelType",
          label: "Fuel Type",
          type: "select",
          group: "Basic",
          options: fuelTypeOptions.map((f) => ({ label: f, value: f })),
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
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
            <DropdownMenuContent side="right" align="start" className="w-40">
              <DropdownMenuItem className="cursor-pointer" onClick={() => handleEdit(supplier)}>
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "supplierName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Supplier" />,
      cell: ({ row }) => <span className="font-medium">{row.getValue("supplierName")}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "fuelTypes",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Fuel Types" />,
      cell: ({ row }) => {
        const fuelTypes = row.getValue("fuelTypes");
        return (
          <div className="flex flex-wrap gap-1">
            {fuelTypes.map((type) => (
              <Badge key={type} className={getFuelTypeBadgeColor(type)}>
                {type}
              </Badge>
            ))}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "contactPerson",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Contact Person" />,
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
      cell: ({ row }) => (
        <a href={`mailto:${row.getValue("email")}`} className="text-blue-600 hover:underline">
          {row.getValue("email")}
        </a>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "phone",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Phone" />,
      enableSorting: true,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-auto p-4">
      {/* Filter and Add Button */}
      <div className="flex items-center justify-between mb-1">
        <SmartFilter filterGroups={filterGroups} onFiltersChange={handleFiltersChange} />
        <Button
          onClick={handleAddNew}
          className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={suppliers} showViewOptions={false} />

      {/* Add/Edit Supplier Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingSupplier ? "Edit Supplier" : "Add Supplier"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4 px-6">
            <div className="space-y-2">
              <Label htmlFor="supplierName" className="text-sm font-medium">
                Supplier Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="supplierName"
                placeholder="e.g., Pilot Flying J"
                value={formData.supplierName}
                onChange={(e) => handleInputChange("supplierName", e.target.value)}
                className="h-10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Fuel Types <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-wrap gap-4 pt-2">
                {fuelTypeOptions.map((fuelType) => (
                  <div key={fuelType} className="flex items-center space-x-2">
                    <Checkbox
                      id={fuelType}
                      checked={formData.fuelTypes.includes(fuelType)}
                      onCheckedChange={(checked) => handleFuelTypeChange(fuelType, checked)}
                    />
                    <label
                      htmlFor={fuelType}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {fuelType}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPerson" className="text-sm font-medium">
                Contact Person <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactPerson"
                placeholder="e.g., John Smith"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                className="h-10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g., john.smith@company.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="e.g., (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="h-10"
                required
              />
            </div>

            <div className="flex gap-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => setIsSheetOpen(false)} className="flex-1 h-10">
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {editingSupplier ? "Update Supplier" : "Add Supplier"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NetworkPartners;
