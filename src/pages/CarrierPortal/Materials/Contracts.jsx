import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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

const Contracts = () => {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingContract, setEditingContract] = useState(null);
  const [filters, setFilters] = useState([]);
  const [formData, setFormData] = useState({
    contractId: "",
    supplier: "",
    materialType: "",
    negotiatedRate: "",
    effectiveDate: "",
    expirationDate: "",
    paymentTerms: "",
    status: "Active",
  });

  // Mock data for contracts based on Mega Materials documentation
  const contracts = [
    {
      id: 1,
      contractId: "SUP-2024-001",
      supplier: "Rocky's Quarry",
      materialType: "#57 Limestone",
      negotiatedRate: 12.50,
      effectiveDate: "2025-01-01",
      expirationDate: "2025-03-31",
      paymentTerms: "NET 30",
      status: "Active",
    },
    {
      id: 2,
      contractId: "SUP-2024-002",
      supplier: "Rocky's Quarry",
      materialType: "Concrete Sand",
      negotiatedRate: 15.00,
      effectiveDate: "2025-01-01",
      expirationDate: "2025-03-31",
      paymentTerms: "NET 30",
      status: "Active",
    },
    {
      id: 3,
      contractId: "SUP-2024-003",
      supplier: "Tampa Sand Co",
      materialType: "Fill Sand",
      negotiatedRate: 8.00,
      effectiveDate: "2025-01-01",
      expirationDate: "2025-06-30",
      paymentTerms: "NET 30",
      status: "Active",
    },
    {
      id: 4,
      contractId: "SUP-2024-004",
      supplier: "Gulf Concrete",
      materialType: "Ready-Mix Concrete",
      negotiatedRate: 95.00,
      effectiveDate: "2025-01-15",
      expirationDate: "2025-04-15",
      paymentTerms: "NET 15",
      status: "Draft",
    },
    {
      id: 5,
      contractId: "SUP-2024-005",
      supplier: "Green Recyclers",
      materialType: "Recycled Concrete",
      negotiatedRate: 6.50,
      effectiveDate: "2024-10-01",
      expirationDate: "2024-12-31",
      paymentTerms: "NET 30",
      status: "Expired",
    },
    {
      id: 6,
      contractId: "SUP-2025-001",
      supplier: "Sunshine Aggregates",
      materialType: "#89 Stone",
      negotiatedRate: 14.00,
      effectiveDate: "2025-02-01",
      expirationDate: "2025-07-31",
      paymentTerms: "NET 30",
      status: "Active",
    },
    {
      id: 7,
      contractId: "SUP-2025-002",
      supplier: "Central Florida Sand",
      materialType: "Masonry Sand",
      negotiatedRate: 11.00,
      effectiveDate: "2025-01-01",
      expirationDate: "2025-12-31",
      paymentTerms: "NET 45",
      status: "Terminated",
    },
    {
      id: 8,
      contractId: "SUP-2025-003",
      supplier: "Bay Area Concrete",
      materialType: "Ready-Mix Concrete",
      negotiatedRate: 92.00,
      effectiveDate: "2025-03-01",
      expirationDate: "2025-08-31",
      paymentTerms: "NET 30",
      status: "Draft",
    },
  ];

  const suppliers = [
    "Rocky's Quarry",
    "Tampa Sand Co",
    "Gulf Concrete",
    "Green Recyclers",
    "Sunshine Aggregates",
    "Central Florida Sand",
    "Bay Area Concrete",
    "Eco Materials Inc",
  ];

  const materialTypes = [
    "#57 Limestone",
    "Concrete Sand",
    "Fill Sand",
    "Ready-Mix Concrete",
    "Recycled Concrete",
    "#89 Stone",
    "Masonry Sand",
    "Rip Rap",
    "Asphalt Millings",
    "Granite Gravel",
  ];

  const paymentTermsOptions = ["NET 15", "NET 30", "NET 45", "NET 60", "COD"];
  const statusOptions = ["Draft", "Active", "Expired", "Terminated"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    setEditingContract(null);
    setFormData({
      contractId: "",
      supplier: "",
      materialType: "",
      negotiatedRate: "",
      effectiveDate: "",
      expirationDate: "",
      paymentTerms: "",
      status: "Active",
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setEditingContract(null);
    setFormData({
      contractId: "",
      supplier: "",
      materialType: "",
      negotiatedRate: "",
      effectiveDate: "",
      expirationDate: "",
      paymentTerms: "",
      status: "Active",
    });
  };

  const handleEdit = (contract) => {
    setEditingContract(contract);
    setFormData({
      contractId: contract.contractId,
      supplier: contract.supplier,
      materialType: contract.materialType,
      negotiatedRate: contract.negotiatedRate.toString(),
      effectiveDate: contract.effectiveDate,
      expirationDate: contract.expirationDate,
      paymentTerms: contract.paymentTerms,
      status: contract.status,
    });
    setIsSheetOpen(true);
  };

  const handleAddNew = () => {
    setEditingContract(null);
    setFormData({
      contractId: "",
      supplier: "",
      materialType: "",
      negotiatedRate: "",
      effectiveDate: "",
      expirationDate: "",
      paymentTerms: "",
      status: "Draft",
    });
    setIsSheetOpen(true);
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      Active:
        "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50",
      Expired:
        "bg-amber-500/10 hover:bg-amber-500/30 text-amber-700 dark:text-amber-400 border border-amber-500/50",
      Terminated:
        "bg-red-500/10 hover:bg-red-500/30 text-red-700 dark:text-red-400 border border-red-500/50",
      Draft:
        "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50",
    };
    return (
      colors[status] ||
      "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50"
    );
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

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "contractId",
          label: "Contract ID",
          type: "input",
          group: "Basic",
          placeholder: "Search contract ID...",
        },
        {
          key: "supplier",
          label: "Supplier",
          type: "select",
          group: "Basic",
          options: suppliers.map((s) => ({ label: s, value: s })),
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: statusOptions.map((s) => ({ label: s, value: s })),
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
        const contract = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <div className="px-2 py-1.5 border-b mb-1">
                <p className="font-medium text-sm">{contract.contractId}</p>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleEdit(contract)}
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
      accessorKey: "contractId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Contract ID" />
      ),
      cell: ({ row }) => {
        const contractId = row.getValue("contractId");
        return <span className="font-mono text-sm">{contractId}</span>;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "supplier",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Supplier" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "materialType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Material" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "effectiveDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Effective Date" />
      ),
      cell: ({ row }) => {
        const date = row.getValue("effectiveDate");
        return <span className="text-muted-foreground">{formatDate(date)}</span>;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "expirationDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Expiration Date" />
      ),
      cell: ({ row }) => {
        const date = row.getValue("expirationDate");
        return <span className="text-muted-foreground">{formatDate(date)}</span>;
      },
      enableSorting: true,
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
            Add Contract
          </Button>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={contracts}
          showViewOptions={false}
        />
      </div>

      {/* Add/Edit Contract Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingContract ? "Edit Contract" : "Add New Contract"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4 px-6">
            {/* Contract ID */}
            <div className="space-y-2">
              <Label
                htmlFor="contractId"
                className="text-sm font-medium text-foreground"
              >
                Contract ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contractId"
                type="text"
                placeholder="e.g., SUP-2025-001"
                value={formData.contractId}
                onChange={(e) => handleInputChange("contractId", e.target.value)}
                className="h-10 font-mono"
                required
              />
            </div>

            {/* Supplier */}
            <div className="space-y-2">
              <Label
                htmlFor="supplier"
                className="text-sm font-medium text-foreground"
              >
                Supplier <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.supplier}
                onValueChange={(value) => handleInputChange("supplier", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier} value={supplier}>
                      {supplier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Material Type */}
            <div className="space-y-2">
              <Label
                htmlFor="materialType"
                className="text-sm font-medium text-foreground"
              >
                Material Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.materialType}
                onValueChange={(value) => handleInputChange("materialType", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  {materialTypes.map((material) => (
                    <SelectItem key={material} value={material}>
                      {material}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Negotiated Rate */}
            <div className="space-y-2">
              <Label
                htmlFor="negotiatedRate"
                className="text-sm font-medium text-foreground"
              >
                Negotiated Rate (per unit) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="negotiatedRate"
                type="number"
                step="0.01"
                placeholder="e.g., 12.50"
                value={formData.negotiatedRate}
                onChange={(e) => handleInputChange("negotiatedRate", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Effective Date */}
            <div className="space-y-2">
              <Label
                htmlFor="effectiveDate"
                className="text-sm font-medium text-foreground"
              >
                Effective Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="effectiveDate"
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => handleInputChange("effectiveDate", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Expiration Date */}
            <div className="space-y-2">
              <Label
                htmlFor="expirationDate"
                className="text-sm font-medium text-foreground"
              >
                Expiration Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="expirationDate"
                type="date"
                value={formData.expirationDate}
                onChange={(e) => handleInputChange("expirationDate", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Payment Terms */}
            <div className="space-y-2">
              <Label
                htmlFor="paymentTerms"
                className="text-sm font-medium text-foreground"
              >
                Payment Terms <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.paymentTerms}
                onValueChange={(value) => handleInputChange("paymentTerms", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select payment terms" />
                </SelectTrigger>
                <SelectContent>
                  {paymentTermsOptions.map((term) => (
                    <SelectItem key={term} value={term}>
                      {term}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label
                htmlFor="status"
                className="text-sm font-medium text-foreground"
              >
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
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
                {editingContract ? "Update Contract" : "Create Contract"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Contracts;
