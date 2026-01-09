import { useState, useCallback } from "react";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
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
  SheetFooter,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  PencilIcon,
  PlusIcon,
  Building2,
  CheckCircle2,
  XCircle,
  DollarSign,
  FileTextIcon,
  ImageIcon,
  UploadIcon,
  BanknoteIcon,
} from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

const BusinessUnit = () => {
  const [filters, setFilters] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    quickBooksSync: false,
    isActive: true,
    // Invoice Configuration
    invoicePrefix: "",
    invoiceTemplate: "standard",
    defaultPaymentTerms: "net30",
    logoUrl: "",
    bankName: "",
    bankAccountNumber: "",
    bankRoutingNumber: "",
    invoiceFooterText: "",
    autoGeneratePdf: true,
    attachPodToInvoice: true,
  });

  // Mock data for business units
  const businessUnits = [
    {
      id: 1,
      name: "Mega Logistics",
      quickBooksSync: true,
      isActive: true,
      totalRevenue: 2450000,
      invoicePrefix: "ML-INV",
      invoiceTemplate: "standard",
      defaultPaymentTerms: "net30",
      logoUrl: "/logos/mega-logistics.png",
      bankName: "Chase Bank",
      bankAccountNumber: "****4521",
      bankRoutingNumber: "****7890",
      invoiceFooterText: "Thank you for your business!",
      autoGeneratePdf: true,
      attachPodToInvoice: true,
    },
    {
      id: 2,
      name: "Mega Trucking",
      quickBooksSync: true,
      isActive: true,
      totalRevenue: 1875000,
      invoicePrefix: "MT-INV",
      invoiceTemplate: "detailed",
      defaultPaymentTerms: "net15",
      logoUrl: "/logos/mega-trucking.png",
      bankName: "Wells Fargo",
      bankAccountNumber: "****8932",
      bankRoutingNumber: "****1234",
      invoiceFooterText: "Payment due within 15 days. Thank you!",
      autoGeneratePdf: true,
      attachPodToInvoice: false,
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = (unit) => {
    setEditingUnit(unit);
    setFormData({
      name: unit.name,
      quickBooksSync: unit.quickBooksSync,
      isActive: unit.isActive,
      invoicePrefix: unit.invoicePrefix || "",
      invoiceTemplate: unit.invoiceTemplate || "standard",
      defaultPaymentTerms: unit.defaultPaymentTerms || "net30",
      logoUrl: unit.logoUrl || "",
      bankName: unit.bankName || "",
      bankAccountNumber: unit.bankAccountNumber || "",
      bankRoutingNumber: unit.bankRoutingNumber || "",
      invoiceFooterText: unit.invoiceFooterText || "",
      autoGeneratePdf: unit.autoGeneratePdf ?? true,
      attachPodToInvoice: unit.attachPodToInvoice ?? true,
    });
    setIsSheetOpen(true);
  };

  const getInitialFormData = () => ({
    name: "",
    quickBooksSync: false,
    isActive: true,
    invoicePrefix: "",
    invoiceTemplate: "standard",
    defaultPaymentTerms: "net30",
    logoUrl: "",
    bankName: "",
    bankAccountNumber: "",
    bankRoutingNumber: "",
    invoiceFooterText: "",
    autoGeneratePdf: true,
    attachPodToInvoice: true,
  });

  const handleAddNew = () => {
    setEditingUnit(null);
    setFormData(getInitialFormData());
    setIsSheetOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    setEditingUnit(null);
    setFormData(getInitialFormData());
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setEditingUnit(null);
    setFormData(getInitialFormData());
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const filterGroups = [
    {
      id: "business-unit-filters",
      label: "Filter Business Units",
      filters: [
        {
          key: "name",
          label: "Name",
          type: "input",
          group: "Basic",
          placeholder: "Search by name...",
        },
        {
          key: "quickBooksSync",
          label: "QuickBooks Sync",
          type: "select",
          group: "Basic",
          options: [
            { value: "true", label: "Enabled" },
            { value: "false", label: "Disabled" },
          ],
        },
        {
          key: "isActive",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" },
          ],
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
        const unit = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <div className="px-2 py-1.5 border-b mb-1">
                <p className="font-medium text-sm">{unit.name}</p>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleEdit(unit)}
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
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("name")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "quickBooksSync",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="QuickBooks Sync" />
      ),
      cell: ({ row }) => {
        const isEnabled = row.getValue("quickBooksSync");
        return (
          <Badge
            className={
              isEnabled
                ? "bg-green-500/10 text-green-700 border-green-500/50"
                : "bg-gray-500/10 text-gray-500 border-gray-500/50"
            }
          >
            {isEnabled ? (
              <CheckCircle2 className="size-3 mr-1" />
            ) : (
              <XCircle className="size-3 mr-1" />
            )}
            {isEnabled ? "Enabled" : "Disabled"}
          </Badge>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const isActive = row.getValue("isActive");
        return (
          <Badge
            className={
              isActive
                ? "bg-green-500/10 text-green-700 border-green-500/50"
                : "bg-red-500/10 text-red-700 border-red-500/50"
            }
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "invoicePrefix",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Invoice Prefix" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <FileTextIcon className="size-4 text-muted-foreground" />
          <span className="font-mono text-sm">{row.getValue("invoicePrefix") || "—"}</span>
        </div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "invoiceTemplate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Template" />
      ),
      cell: ({ row }) => {
        const template = row.getValue("invoiceTemplate");
        return (
          <Badge variant="outline" className="capitalize">
            {template || "Standard"}
          </Badge>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "totalRevenue",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Revenue" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <span className="font-semibold text-green-600">
            {formatCurrency(row.getValue("totalRevenue"))}
          </span>
        </div>
      ),
      enableSorting: true,
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="px-6 py-4">
        {/* Header with filter and add button */}
        <div className="flex items-center justify-between mb-1">
          <SmartFilter
            filterGroups={filterGroups}
            onFiltersChange={handleFiltersChange}
          />
          <Button
            className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            onClick={handleAddNew}
          >
            <PlusIcon className="size-4 mr-2" />
            Add Business Unit
          </Button>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={businessUnits}
          showViewOptions={false}
        />
      </div>

      {/* Add/Edit Business Unit Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-xl px-6 overflow-y-auto">
          <SheetHeader className="pb-2 border-b">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingUnit ? "Edit Business Unit" : "Add New Business Unit"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4 px-2 pb-24">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="size-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Basic Information</h3>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter business unit name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="h-10"
                  required
                />
              </div>

              {/* QuickBooks Sync */}
              <div className="flex items-center justify-between py-2 border rounded-lg px-4">
                <div className="space-y-0.5">
                  <Label htmlFor="quickBooksSync" className="text-sm font-medium">
                    QuickBooks Sync
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Enable synchronization with QuickBooks accounting
                  </p>
                </div>
                <Switch
                  id="quickBooksSync"
                  checked={formData.quickBooksSync}
                  onCheckedChange={(checked) =>
                    handleInputChange("quickBooksSync", checked)
                  }
                />
              </div>

              {/* Is Active */}
              <div className="flex items-center justify-between py-2 border rounded-lg px-4">
                <div className="space-y-0.5">
                  <Label htmlFor="isActive" className="text-sm font-medium">
                    Active Status
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Set whether this business unit is currently active
                  </p>
                </div>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    handleInputChange("isActive", checked)
                  }
                />
              </div>
            </div>

            <Separator />

            {/* Invoice Configuration Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileTextIcon className="size-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Invoice Configuration</h3>
              </div>

              {/* Invoice Prefix */}
              <div className="space-y-2">
                <Label htmlFor="invoicePrefix" className="text-sm font-medium">
                  Invoice Prefix
                </Label>
                <Input
                  id="invoicePrefix"
                  type="text"
                  placeholder="e.g., ML-INV"
                  value={formData.invoicePrefix}
                  onChange={(e) => handleInputChange("invoicePrefix", e.target.value)}
                  className="h-10"
                />
                <p className="text-xs text-muted-foreground">
                  Prefix added to invoice numbers (e.g., ML-INV-001)
                </p>
              </div>

              {/* Invoice Template */}
              <div className="space-y-2">
                <Label htmlFor="invoiceTemplate" className="text-sm font-medium">
                  Invoice Template
                </Label>
                <Select
                  value={formData.invoiceTemplate}
                  onValueChange={(value) => handleInputChange("invoiceTemplate", value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                    <SelectItem value="summary">Summary</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Default PDF template for generated invoices
                </p>
              </div>

              {/* Default Payment Terms */}
              <div className="space-y-2">
                <Label htmlFor="defaultPaymentTerms" className="text-sm font-medium">
                  Default Payment Terms
                </Label>
                <Select
                  value={formData.defaultPaymentTerms}
                  onValueChange={(value) => handleInputChange("defaultPaymentTerms", value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="due_on_receipt">Due on Receipt</SelectItem>
                    <SelectItem value="net15">Net 15</SelectItem>
                    <SelectItem value="net30">Net 30</SelectItem>
                    <SelectItem value="net45">Net 45</SelectItem>
                    <SelectItem value="net60">Net 60</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Auto Generate PDF */}
              <div className="flex items-center justify-between py-2 border rounded-lg px-4">
                <div className="space-y-0.5">
                  <Label htmlFor="autoGeneratePdf" className="text-sm font-medium">
                    Auto Generate PDF
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically generate PDF when invoice is created
                  </p>
                </div>
                <Switch
                  id="autoGeneratePdf"
                  checked={formData.autoGeneratePdf}
                  onCheckedChange={(checked) =>
                    handleInputChange("autoGeneratePdf", checked)
                  }
                />
              </div>

              {/* Attach POD to Invoice */}
              <div className="flex items-center justify-between py-2 border rounded-lg px-4">
                <div className="space-y-0.5">
                  <Label htmlFor="attachPodToInvoice" className="text-sm font-medium">
                    Attach POD to Invoice
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Include proof of delivery in invoice PDF
                  </p>
                </div>
                <Switch
                  id="attachPodToInvoice"
                  checked={formData.attachPodToInvoice}
                  onCheckedChange={(checked) =>
                    handleInputChange("attachPodToInvoice", checked)
                  }
                />
              </div>
            </div>

            <Separator />

            {/* Logo Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="size-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Invoice Logo</h3>
              </div>

              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                {formData.logoUrl ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <div className="w-32 h-16 bg-muted rounded flex items-center justify-center">
                        <ImageIcon className="size-8 text-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Logo uploaded</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange("logoUrl", "")}
                    >
                      Remove Logo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <UploadIcon className="size-8 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Upload Logo</p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG up to 2MB (Recommended: 300x100px)
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange("logoUrl", "/logos/placeholder.png")}
                    >
                      Choose File
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Bank Details Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BanknoteIcon className="size-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Bank Details</h3>
              </div>
              <p className="text-xs text-muted-foreground -mt-2">
                Bank information to display on invoices for payment
              </p>

              {/* Bank Name */}
              <div className="space-y-2">
                <Label htmlFor="bankName" className="text-sm font-medium">
                  Bank Name
                </Label>
                <Input
                  id="bankName"
                  type="text"
                  placeholder="e.g., Chase Bank"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange("bankName", e.target.value)}
                  className="h-10"
                />
              </div>

              {/* Bank Account Number */}
              <div className="space-y-2">
                <Label htmlFor="bankAccountNumber" className="text-sm font-medium">
                  Account Number
                </Label>
                <Input
                  id="bankAccountNumber"
                  type="text"
                  placeholder="Enter account number"
                  value={formData.bankAccountNumber}
                  onChange={(e) => handleInputChange("bankAccountNumber", e.target.value)}
                  className="h-10"
                />
              </div>

              {/* Bank Routing Number */}
              <div className="space-y-2">
                <Label htmlFor="bankRoutingNumber" className="text-sm font-medium">
                  Routing Number
                </Label>
                <Input
                  id="bankRoutingNumber"
                  type="text"
                  placeholder="Enter routing number"
                  value={formData.bankRoutingNumber}
                  onChange={(e) => handleInputChange("bankRoutingNumber", e.target.value)}
                  className="h-10"
                />
              </div>
            </div>

            <Separator />

            {/* Invoice Footer Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileTextIcon className="size-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Invoice Footer</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoiceFooterText" className="text-sm font-medium">
                  Footer Text
                </Label>
                <Textarea
                  id="invoiceFooterText"
                  placeholder="e.g., Thank you for your business! Payment is due within 30 days."
                  value={formData.invoiceFooterText}
                  onChange={(e) => handleInputChange("invoiceFooterText", e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Custom text displayed at the bottom of each invoice
                </p>
              </div>
            </div>
          </form>

          <SheetFooter className="absolute bottom-0 left-0 right-0 border-t p-4 bg-background px-8">
            <div className="flex gap-3 w-full">
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
                onClick={handleSubmit}
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {editingUnit ? "Update" : "Create"}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BusinessUnit;
