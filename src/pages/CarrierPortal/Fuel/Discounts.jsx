import { useState, useCallback } from "react";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
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
  TrashIcon,
} from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

const Discounts = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [filters, setFilters] = useState([]);
  const [formData, setFormData] = useState({
    cardProvider: "",
    suppliers: "",
    networkType: "",
    fuelType: "",
    discountValue: "",
    validFrom: "",
    validTo: "",
  });

  // Mock data for discounts
  const discounts = [
    {
      id: 1,
      cardProvider: "EFS",
      suppliers: "Pilot, Flying J, TA, Petro",
      networkType: "In-Network",
      fuelType: "Diesel",
      discountValue: 0.08,
      validFrom: "2025-01-01",
      validTo: "2025-12-31",
      status: "Active",
      usageCount: 1245,
      totalSavings: 9960.00,
    },
    {
      id: 2,
      cardProvider: "EFS",
      suppliers: "Pilot, Flying J, TA, Petro",
      networkType: "In-Network",
      fuelType: "DEF",
      discountValue: 0.04,
      validFrom: "2025-01-01",
      validTo: "2025-12-31",
      status: "Active",
      usageCount: 432,
      totalSavings: 1728.00,
    },
    {
      id: 3,
      cardProvider: "EFS",
      suppliers: "Pilot, Flying J",
      networkType: "In-Network",
      fuelType: "Reefer",
      discountValue: 0.06,
      validFrom: "2025-01-01",
      validTo: "2025-12-31",
      status: "Active",
      usageCount: 287,
      totalSavings: 1722.00,
    },
    {
      id: 4,
      cardProvider: "Commdata",
      suppliers: "Love's, Sapp Bros, Kwick Trip",
      networkType: "In-Network",
      fuelType: "Diesel",
      discountValue: 0.07,
      validFrom: "2025-01-01",
      validTo: "2026-03-15",
      status: "Active",
      usageCount: 892,
      totalSavings: 6244.00,
    },
    {
      id: 5,
      cardProvider: "Commdata",
      suppliers: "Love's, Sapp Bros",
      networkType: "In-Network",
      fuelType: "DEF",
      discountValue: 0.03,
      validFrom: "2025-01-01",
      validTo: "2026-03-15",
      status: "Active",
      usageCount: 156,
      totalSavings: 468.00,
    },
    {
      id: 6,
      cardProvider: "Commdata",
      suppliers: "All other suppliers",
      networkType: "Out-of-Network",
      fuelType: "Diesel",
      discountValue: 0.02,
      validFrom: "2025-01-01",
      validTo: "2026-03-15",
      status: "Active",
      usageCount: 234,
      totalSavings: 468.00,
    },
    {
      id: 7,
      cardProvider: "Relay",
      suppliers: "All participating suppliers",
      networkType: "Network-Wide",
      fuelType: "Diesel",
      discountValue: 0.05,
      validFrom: "2025-01-01",
      validTo: "2025-06-30",
      status: "Active",
      usageCount: 567,
      totalSavings: 2835.00,
    },
    {
      id: 8,
      cardProvider: "Relay",
      suppliers: "All participating suppliers",
      networkType: "Network-Wide",
      fuelType: "DEF",
      discountValue: 0.02,
      validFrom: "2025-01-01",
      validTo: "2025-06-30",
      status: "Active",
      usageCount: 123,
      totalSavings: 246.00,
    },
  ];

  const cardProviders = ["EFS", "Commdata", "Relay"];
  const suppliersList = [
    "Pilot Flying J",
    "Love's Travel Stops",
    "TA/Petro",
    "Sapp Bros",
    "Kwick Trip",
    "QuikTrip",
    "Casey's",
    "Buc-ee's",
  ];
  const networkTypes = ["In-Network", "Out-of-Network", "Network-Wide"];
  const fuelTypes = ["Diesel", "DEF", "Reefer"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    setEditingDiscount(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      cardProvider: "",
      suppliers: "",
      networkType: "",
      fuelType: "",
      discountValue: "",
      validFrom: "",
      validTo: "",
    });
  };

  const handleEdit = (discount) => {
    setEditingDiscount(discount);
    setFormData({
      cardProvider: discount.cardProvider,
      suppliers: discount.suppliers,
      networkType: discount.networkType,
      fuelType: discount.fuelType,
      discountValue: discount.discountValue.toString(),
      validFrom: discount.validFrom,
      validTo: discount.validTo,
    });
    setIsSheetOpen(true);
  };

  const handleAddNew = () => {
    setEditingDiscount(null);
    resetForm();
    setIsSheetOpen(true);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getProviderBadgeColor = (provider) => {
    const colors = {
      EFS: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/50",
      Commdata: "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/50",
      Relay: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/50",
    };
    return colors[provider] || "bg-gray-500/10 text-gray-700 border border-gray-500/50";
  };

  const getNetworkBadgeColor = (network) => {
    const colors = {
      "In-Network": "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/50",
      "Out-of-Network": "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/50",
      "Network-Wide": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/50",
    };
    return colors[network] || "bg-gray-500/10 text-gray-700 border border-gray-500/50";
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
          key: "cardProvider",
          label: "Card Provider",
          type: "select",
          group: "Basic",
          options: cardProviders.map((p) => ({ label: p, value: p })),
        },
        {
          key: "networkType",
          label: "Network Type",
          type: "select",
          group: "Basic",
          options: networkTypes.map((n) => ({ label: n, value: n })),
        },
        {
          key: "fuelType",
          label: "Fuel Type",
          type: "select",
          group: "Basic",
          options: fuelTypes.map((f) => ({ label: f, value: f })),
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Table columns
  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => {
        const discount = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-40">
              <DropdownMenuItem className="cursor-pointer" onClick={() => handleEdit(discount)}>
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
      accessorKey: "cardProvider",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Card Provider" />,
      cell: ({ row }) => {
        const provider = row.getValue("cardProvider");
        return <Badge className={getProviderBadgeColor(provider)}>{provider}</Badge>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "suppliers",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Suppliers" />,
      cell: ({ row }) => (
        <span className="text-sm">{row.getValue("suppliers")}</span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "networkType",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Network Type" />,
      cell: ({ row }) => {
        const network = row.getValue("networkType");
        return <Badge className={getNetworkBadgeColor(network)}>{network}</Badge>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "fuelType",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Fuel Type" />,
      cell: ({ row }) => {
        const fuelType = row.getValue("fuelType");
        return <Badge className={getFuelTypeBadgeColor(fuelType)}>{fuelType}</Badge>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "discountValue",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Discount" />,
      cell: ({ row }) => (
        <span className="text-green-600 font-medium">
          -${row.getValue("discountValue").toFixed(2)}/gal
        </span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "validTo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Valid Until" />,
      cell: ({ row }) => formatDate(row.getValue("validTo")),
      enableSorting: true,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <SmartFilter filterGroups={filterGroups} onFiltersChange={handleFiltersChange} />
          <Button
            onClick={handleAddNew}
            className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Discount
          </Button>
        </div>
        <DataTable columns={columns} data={discounts} showViewOptions={false} />
      </div>

      {/* Add/Edit Discount Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingDiscount ? "Edit Discount" : "Add Discount"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4 px-6">
            <div className="space-y-2">
              <Label htmlFor="cardProvider" className="text-sm font-medium">
                Card Provider <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.cardProvider}
                onValueChange={(value) => handleInputChange("cardProvider", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select card provider" />
                </SelectTrigger>
                <SelectContent>
                  {cardProviders.map((provider) => (
                    <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="suppliers" className="text-sm font-medium">
                Supplier <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.suppliers}
                onValueChange={(value) => handleInputChange("suppliers", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliersList.map((supplier) => (
                    <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="networkType" className="text-sm font-medium">
                Network Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.networkType}
                onValueChange={(value) => handleInputChange("networkType", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select network type" />
                </SelectTrigger>
                <SelectContent>
                  {networkTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fuelType" className="text-sm font-medium">
                Fuel Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.fuelType}
                onValueChange={(value) => handleInputChange("fuelType", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  {fuelTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountValue" className="text-sm font-medium">
                Discount ($/gallon) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="discountValue"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.discountValue}
                onChange={(e) => handleInputChange("discountValue", e.target.value)}
                className="h-10"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="validFrom" className="text-sm font-medium">
                  Valid From <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="validFrom"
                  type="date"
                  value={formData.validFrom}
                  onChange={(e) => handleInputChange("validFrom", e.target.value)}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="validTo" className="text-sm font-medium">
                  Valid To <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="validTo"
                  type="date"
                  value={formData.validTo}
                  onChange={(e) => handleInputChange("validTo", e.target.value)}
                  className="h-10"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => setIsSheetOpen(false)} className="flex-1 h-10">
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {editingDiscount ? "Update Discount" : "Create Discount"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Discounts;
