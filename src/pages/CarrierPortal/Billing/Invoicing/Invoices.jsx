import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import SmartFilter from "@/components/SmartFilter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  MoreHorizontal,
  EyeIcon,
  DownloadIcon,
  MailIcon,
  PrinterIcon,
  DollarSign,
  ClockIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  PlusIcon,
  FileStack,
  Truck,
  CloudIcon,
  Loader2Icon,
  FileIcon,
  PackageIcon,
  SendIcon,
  PaperclipIcon,
  Building2Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  UserIcon,
} from "lucide-react";

const Invoices = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ready-to-invoice");
  const [filters, setFilters] = useState([]);
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);
  const [selectedInvoiceForPdf, setSelectedInvoiceForPdf] = useState(null);

  // Ready to Invoice state
  const [selectedRows, setSelectedRows] = useState([]);
  const [showBatchInvoiceDialog, setShowBatchInvoiceDialog] = useState(false);
  const [invoiceType, setInvoiceType] = useState("summary");
  const [autoGeneratePdf, setAutoGeneratePdf] = useState(true);
  const [syncToQuickBooks, setSyncToQuickBooks] = useState(true);
  const [attachPodDocuments, setAttachPodDocuments] = useState(true);

  // Create Invoice Dialog state (from All Invoices tab)
  const [showCreateInvoiceDialog, setShowCreateInvoiceDialog] = useState(false);
  const [createInvoiceStep, setCreateInvoiceStep] = useState(1);
  const [createInvoiceType, setCreateInvoiceType] = useState("");
  const [selectedLoadsForInvoice, setSelectedLoadsForInvoice] = useState([]);
  const [expandedCustomers, setExpandedCustomers] = useState([]);

  // Mock data - loads ready to be invoiced
  const readyToInvoiceData = [
    {
      id: 1,
      loadNo: "ML-2025-001245",
      customer: "Titan Construction",
      customerId: "CUST-001",
      businessUnit: "Mega Logistics",
      businessUnitId: "BU-001",
      deliveryDate: "2025-01-05",
      commodity: "Cement",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      weight: "24,500 lbs",
      freightCharges: 1850.00,
      fuelSurcharge: 185.00,
      accessorials: 150.00,
      totalCharges: 2185.00,
      driverName: "John Smith",
      vehicleNo: "TRK-2847",
      podUploaded: true,
      ticketNo: "TKT-78501",
    },
    {
      id: 2,
      loadNo: "ML-2025-001246",
      customer: "Titan Construction",
      customerId: "CUST-001",
      businessUnit: "Mega Logistics",
      businessUnitId: "BU-001",
      deliveryDate: "2025-01-05",
      commodity: "Sand",
      origin: "Austin, TX",
      destination: "Dallas, TX",
      weight: "22,000 lbs",
      freightCharges: 1650.00,
      fuelSurcharge: 165.00,
      accessorials: 75.00,
      totalCharges: 1890.00,
      driverName: "Mike Davis",
      vehicleNo: "TRK-1923",
      podUploaded: true,
      ticketNo: "TKT-78502",
    },
    {
      id: 3,
      loadNo: "MT-2025-001247",
      customer: "Ashgrove Cement",
      customerId: "CUST-002",
      businessUnit: "Mega Trucking",
      businessUnitId: "BU-002",
      deliveryDate: "2025-01-06",
      commodity: "Flyash",
      origin: "San Antonio, TX",
      destination: "Houston, TX",
      weight: "26,000 lbs",
      freightCharges: 2100.00,
      fuelSurcharge: 210.00,
      accessorials: 200.00,
      totalCharges: 2510.00,
      driverName: "Sarah Johnson",
      vehicleNo: "TRK-4521",
      podUploaded: true,
      ticketNo: "TKT-78503",
    },
    {
      id: 4,
      loadNo: "MT-2025-001248",
      customer: "TQL Logistics",
      customerId: "CUST-003",
      businessUnit: "Mega Trucking",
      businessUnitId: "BU-002",
      deliveryDate: "2025-01-06",
      commodity: "Aggregate",
      origin: "Fort Worth, TX",
      destination: "Austin, TX",
      weight: "25,500 lbs",
      freightCharges: 1950.00,
      fuelSurcharge: 195.00,
      accessorials: 100.00,
      totalCharges: 2245.00,
      driverName: "Robert Wilson",
      vehicleNo: "TRK-7734",
      podUploaded: true,
      ticketNo: "TKT-78504",
    },
    {
      id: 5,
      loadNo: "ML-2025-001249",
      customer: "Ashgrove Cement",
      customerId: "CUST-002",
      businessUnit: "Mega Logistics",
      businessUnitId: "BU-001",
      deliveryDate: "2025-01-07",
      commodity: "Limestone",
      origin: "Dallas, TX",
      destination: "San Antonio, TX",
      weight: "23,000 lbs",
      freightCharges: 1750.00,
      fuelSurcharge: 175.00,
      accessorials: 0.00,
      totalCharges: 1925.00,
      driverName: "Emily Brown",
      vehicleNo: "TRK-3356",
      podUploaded: false,
      ticketNo: "TKT-78505",
    },
  ];

  // Mock invoices data with PDF and QB sync status
  // Status flow: Draft → Synced to QB → Sent → Paid
  const invoicesData = [
    {
      id: 1,
      invoiceNo: "ML-INV-2025-0001",
      customer: "Titan Construction",
      customerId: "CUST-001",
      businessUnit: "Mega Logistics",
      businessUnitId: "BU-001",
      invoiceDate: "2025-01-05",
      dueDate: "2025-01-20",
      loadCount: 5,
      subtotal: 9250.00,
      fuelSurcharge: 925.00,
      accessorials: 475.00,
      totalAmount: 10650.00,
      paidAmount: 0.00,
      balanceDue: 10650.00,
      status: "Synced to QB", // Exists in QuickBooks, not yet sent
      sentDate: null,
      paymentTerms: "Net 15",
      invoiceType: "summary",
      pdfStatus: "generated",
      pdfUrl: "/invoices/ML-INV-2025-0001.pdf",
      qbSyncStatus: "synced",
      qbInvoiceId: "10045",
    },
    {
      id: 2,
      invoiceNo: "MT-INV-2025-0002",
      customer: "Ashgrove Cement",
      customerId: "CUST-002",
      businessUnit: "Mega Trucking",
      businessUnitId: "BU-002",
      invoiceDate: "2025-01-04",
      dueDate: "2025-01-19",
      loadCount: 3,
      subtotal: 5850.00,
      fuelSurcharge: 585.00,
      accessorials: 200.00,
      totalAmount: 6635.00,
      paidAmount: 6635.00,
      balanceDue: 0.00,
      status: "Paid",
      sentDate: "2025-01-04",
      paymentTerms: "Net 15",
      invoiceType: "summary",
      pdfStatus: "generated",
      pdfUrl: "/invoices/MT-INV-2025-0002.pdf",
      qbSyncStatus: "synced",
      qbInvoiceId: "10044",
    },
    {
      id: 3,
      invoiceNo: "MT-INV-2025-0003",
      customer: "TQL Logistics",
      customerId: "CUST-003",
      businessUnit: "Mega Trucking",
      businessUnitId: "BU-002",
      invoiceDate: "2025-01-03",
      dueDate: "2025-01-18",
      loadCount: 1,
      subtotal: 3700.00,
      fuelSurcharge: 370.00,
      accessorials: 150.00,
      totalAmount: 4220.00,
      paidAmount: 2000.00,
      balanceDue: 2220.00,
      status: "Partial",
      sentDate: "2025-01-03",
      paymentTerms: "Net 15",
      invoiceType: "per-load",
      pdfStatus: "generated",
      pdfUrl: "/invoices/MT-INV-2025-0003.pdf",
      qbSyncStatus: "synced",
      qbInvoiceId: "10043",
    },
    {
      id: 4,
      invoiceNo: "ML-INV-2024-0245",
      customer: "CH Robinson",
      customerId: "CUST-004",
      businessUnit: "Mega Logistics",
      businessUnitId: "BU-001",
      invoiceDate: "2024-12-15",
      dueDate: "2024-12-30",
      loadCount: 4,
      subtotal: 7400.00,
      fuelSurcharge: 740.00,
      accessorials: 300.00,
      totalAmount: 8440.00,
      paidAmount: 0.00,
      balanceDue: 8440.00,
      status: "Overdue",
      sentDate: "2024-12-15",
      paymentTerms: "Net 15",
      invoiceType: "summary",
      pdfStatus: "generated",
      pdfUrl: "/invoices/ML-INV-2024-0245.pdf",
      qbSyncStatus: "synced",
      qbInvoiceId: "10042",
    },
    {
      id: 5,
      invoiceNo: "MT-INV-2024-0244",
      customer: "Coyote Logistics",
      customerId: "CUST-005",
      businessUnit: "Mega Trucking",
      businessUnitId: "BU-002",
      invoiceDate: "2024-12-10",
      dueDate: "2024-12-25",
      loadCount: 1,
      subtotal: 11100.00,
      fuelSurcharge: 1110.00,
      accessorials: 450.00,
      totalAmount: 12660.00,
      paidAmount: 12660.00,
      balanceDue: 0.00,
      status: "Paid",
      sentDate: "2024-12-10",
      paymentTerms: "Net 15",
      invoiceType: "per-load",
      pdfStatus: "generated",
      pdfUrl: "/invoices/MT-INV-2024-0244.pdf",
      qbSyncStatus: "synced",
      qbInvoiceId: "10040",
    },
    {
      id: 6,
      invoiceNo: "ML-INV-2024-0243",
      customer: "Titan Construction",
      customerId: "CUST-001",
      businessUnit: "Mega Logistics",
      businessUnitId: "BU-001",
      invoiceDate: "2024-12-05",
      dueDate: "2024-12-20",
      loadCount: 8,
      subtotal: 14800.00,
      fuelSurcharge: 1480.00,
      accessorials: 600.00,
      totalAmount: 16880.00,
      paidAmount: 16880.00,
      balanceDue: 0.00,
      status: "Paid",
      sentDate: "2024-12-05",
      paymentTerms: "Net 15",
      invoiceType: "summary",
      pdfStatus: "generated",
      pdfUrl: "/invoices/ML-INV-2024-0243.pdf",
      qbSyncStatus: "synced",
      qbInvoiceId: "10035",
    },
    {
      id: 7,
      invoiceNo: "ML-INV-2025-0004",
      customer: "Echo Global",
      customerId: "CUST-006",
      businessUnit: "Mega Logistics",
      businessUnitId: "BU-001",
      invoiceDate: "2025-01-08",
      dueDate: "2025-01-23",
      loadCount: 2,
      subtotal: 4200.00,
      fuelSurcharge: 420.00,
      accessorials: 100.00,
      totalAmount: 4720.00,
      paidAmount: 0.00,
      balanceDue: 4720.00,
      status: "Draft", // Created internally, not yet synced to QB
      sentDate: null,
      paymentTerms: "Net 15",
      invoiceType: "summary",
      pdfStatus: "generated",
      pdfUrl: "/invoices/ML-INV-2025-0004.pdf",
      qbSyncStatus: "pending",
      qbInvoiceId: null,
    },
    {
      id: 8,
      invoiceNo: "MT-INV-2025-0005",
      customer: "XPO Logistics",
      customerId: "CUST-007",
      businessUnit: "Mega Trucking",
      businessUnitId: "BU-002",
      invoiceDate: "2025-01-07",
      dueDate: "2025-01-22",
      loadCount: 3,
      subtotal: 5600.00,
      fuelSurcharge: 560.00,
      accessorials: 175.00,
      totalAmount: 6335.00,
      paidAmount: 0.00,
      balanceDue: 6335.00,
      status: "Sent", // Emailed to customer via QuickBooks
      sentDate: "2025-01-07",
      paymentTerms: "Net 15",
      invoiceType: "per-load",
      pdfStatus: "generated",
      pdfUrl: "/invoices/MT-INV-2025-0005.pdf",
      qbSyncStatus: "synced",
      qbInvoiceId: "10046",
    },
  ];

  // Filter groups for Ready to Invoice
  const readyToInvoiceFilterGroups = [
    {
      name: "Basic",
      filters: [
        { key: "businessUnit", label: "Business Unit", type: "select", group: "Basic", options: [
          { value: "Mega Logistics", label: "Mega Logistics" },
          { value: "Mega Trucking", label: "Mega Trucking" },
        ]},
        { key: "loadNo", label: "Load No", type: "input", group: "Basic", placeholder: "Search load..." },
        { key: "customer", label: "Customer", type: "input", group: "Basic", placeholder: "Search customer..." },
        { key: "podStatus", label: "POD Status", type: "select", group: "Basic", options: [
          { value: "uploaded", label: "Uploaded" },
          { value: "pending", label: "Pending" },
        ]},
      ],
    },
  ];

  // Filter groups for Invoices
  const invoicesFilterGroups = [
    {
      name: "Basic",
      filters: [
        { key: "businessUnit", label: "Business Unit", type: "select", group: "Basic", options: [
          { value: "Mega Logistics", label: "Mega Logistics" },
          { value: "Mega Trucking", label: "Mega Trucking" },
        ]},
        { key: "invoiceNo", label: "Invoice No", type: "input", group: "Basic", placeholder: "Search invoice..." },
        { key: "customer", label: "Customer", type: "input", group: "Basic", placeholder: "Search customer..." },
        { key: "status", label: "Status", type: "select", group: "Basic", options: [
          { value: "Draft", label: "Draft" },
          { value: "Synced to QB", label: "Synced to QB" },
          { value: "Sent", label: "Sent" },
          { value: "Paid", label: "Paid" },
          { value: "Partial", label: "Partial" },
          { value: "Overdue", label: "Overdue" },
        ]},
        { key: "invoiceType", label: "Type", type: "select", group: "Basic", options: [
          { value: "summary", label: "Summary" },
          { value: "per-load", label: "Per-Load" },
        ]},
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Ready to Invoice handlers
  const handleSelectRow = (rowId, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, rowId]);
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(readyToInvoiceData.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleCreateInvoice = (loadIds) => {
    console.log("Creating invoice for loads:", loadIds, { invoiceType, autoGeneratePdf, syncToQuickBooks, attachPodDocuments });
    setShowBatchInvoiceDialog(false);
    setSelectedRows([]);
    setActiveTab("invoices");
  };

  // Create Invoice Dialog handlers
  const handleSelectLoadForInvoice = (loadId, checked) => {
    if (checked) {
      setSelectedLoadsForInvoice([...selectedLoadsForInvoice, loadId]);
    } else {
      setSelectedLoadsForInvoice(selectedLoadsForInvoice.filter((id) => id !== loadId));
    }
  };

  const handleSelectAllLoadsForInvoice = (checked) => {
    if (checked) {
      setSelectedLoadsForInvoice(readyToInvoiceData.map((row) => row.id));
    } else {
      setSelectedLoadsForInvoice([]);
    }
  };

  const handleSubmitCreateInvoice = () => {
    console.log("Creating invoice:", {
      type: createInvoiceType,
      loads: selectedLoadsForInvoice,
      autoGeneratePdf,
      syncToQuickBooks,
      attachPodDocuments
    });
    setShowCreateInvoiceDialog(false);
    setCreateInvoiceStep(1);
    setCreateInvoiceType("");
    setSelectedLoadsForInvoice([]);
    setExpandedCustomers([]);
  };

  // Calculate selected loads data for Create Invoice Dialog
  const selectedLoadsData = readyToInvoiceData.filter((row) => selectedLoadsForInvoice.includes(row.id));
  const selectedLoadsTotal = selectedLoadsData.reduce((sum, row) => sum + row.totalCharges, 0);
  const selectedLoadsByCustomer = selectedLoadsData.reduce((acc, row) => {
    if (!acc[row.customerId]) {
      acc[row.customerId] = { customer: row.customer, customerId: row.customerId, loads: [], total: 0 };
    }
    acc[row.customerId].loads.push(row);
    acc[row.customerId].total += row.totalCharges;
    return acc;
  }, {});

  // Group ALL ready to invoice loads by customer (for the selection UI)
  const loadsByCustomer = readyToInvoiceData.reduce((acc, row) => {
    if (!acc[row.customerId]) {
      acc[row.customerId] = { customer: row.customer, customerId: row.customerId, loads: [], total: 0 };
    }
    acc[row.customerId].loads.push(row);
    acc[row.customerId].total += row.totalCharges;
    return acc;
  }, {});

  // Toggle customer expansion
  const toggleCustomerExpanded = (customerId) => {
    if (expandedCustomers.includes(customerId)) {
      setExpandedCustomers(expandedCustomers.filter((id) => id !== customerId));
    } else {
      setExpandedCustomers([...expandedCustomers, customerId]);
    }
  };

  // Check if all loads for a customer are selected
  const isCustomerFullySelected = (customerId) => {
    const customerLoads = loadsByCustomer[customerId]?.loads || [];
    return customerLoads.length > 0 && customerLoads.every((load) => selectedLoadsForInvoice.includes(load.id));
  };

  // Check if some (but not all) loads for a customer are selected
  const isCustomerPartiallySelected = (customerId) => {
    const customerLoads = loadsByCustomer[customerId]?.loads || [];
    const selectedCount = customerLoads.filter((load) => selectedLoadsForInvoice.includes(load.id)).length;
    return selectedCount > 0 && selectedCount < customerLoads.length;
  };

  // Select/deselect all loads for a customer
  const handleSelectCustomerLoads = (customerId, checked) => {
    const customerLoads = loadsByCustomer[customerId]?.loads || [];
    const customerLoadIds = customerLoads.map((load) => load.id);

    if (checked) {
      // Add all customer loads that aren't already selected
      const newSelections = customerLoadIds.filter((id) => !selectedLoadsForInvoice.includes(id));
      setSelectedLoadsForInvoice([...selectedLoadsForInvoice, ...newSelections]);
    } else {
      // Remove all customer loads
      setSelectedLoadsForInvoice(selectedLoadsForInvoice.filter((id) => !customerLoadIds.includes(id)));
    }
  };

  // Status badges - Flow: Draft → Synced to QB → Sent → Paid
  const getStatusBadge = (status) => {
    const statusColors = {
      Draft: "bg-gray-500/10 text-gray-700 border-gray-500/50",
      "Synced to QB": "bg-purple-500/10 text-purple-700 border-purple-500/50",
      Sent: "bg-blue-500/10 text-blue-700 border-blue-500/50",
      Paid: "bg-green-500/10 text-green-700 border-green-500/50",
      Partial: "bg-amber-500/10 text-amber-700 border-amber-500/50",
      Overdue: "bg-red-500/10 text-red-700 border-red-500/50",
    };
    return statusColors[status] || "bg-gray-500/10 text-gray-700 border-gray-500/50";
  };

  const getInvoiceTypeBadge = (type) => {
    if (type === "per-load") {
      return (
        <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/50">
          <Truck className="size-3 mr-1" />
          Per-Load
        </Badge>
      );
    }
    return (
      <Badge className="bg-purple-500/10 text-purple-700 border-purple-500/50">
        <FileStack className="size-3 mr-1" />
        Summary
      </Badge>
    );
  };

  const getPdfStatusCell = (invoice) => {
    const { pdfStatus, pdfUrl } = invoice;
    if (pdfStatus === "generated" && pdfUrl) {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          onClick={() => {
            setSelectedInvoiceForPdf(invoice);
            setPdfPreviewOpen(true);
          }}
        >
          <FileIcon className="size-4 mr-1" />
          View
        </Button>
      );
    }
    if (pdfStatus === "generating") {
      return (
        <span className="flex items-center text-amber-600 text-sm">
          <Loader2Icon className="size-4 mr-1 animate-spin" />
          Generating...
        </span>
      );
    }
    return (
      <Button variant="ghost" size="sm" className="h-7 px-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50">
        <AlertCircleIcon className="size-4 mr-1" />
        Generate
      </Button>
    );
  };

  const getDaysOverdue = (dueDate, status) => {
    if (status === "Paid") return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diff = Math.floor((today - due) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : null;
  };

  // Ready to Invoice columns
  const readyToInvoiceColumns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={selectedRows.length === readyToInvoiceData.length}
          onCheckedChange={handleSelectAll}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedRows.includes(row.original.id)}
          onCheckedChange={(checked) => handleSelectRow(row.original.id, checked)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      size: 40,
    },
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => {
        const load = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/complete/load-details?id=${load.loadNo}&mode=view`)}>
                <EyeIcon className="h-4 w-4 mr-2" />
                View Load
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCreateInvoice([load.id])}>
                <SendIcon className="h-4 w-4 mr-2" />
                Create Invoice
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "loadNo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Load No" />,
      cell: ({ row }) => <span className="font-mono text-sm font-medium text-primary">{row.getValue("loadNo")}</span>,
    },
    {
      accessorKey: "customer",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.getValue("customer")}</span>
          <span className="text-xs text-muted-foreground">{row.original.customerId}</span>
        </div>
      ),
    },
    {
      accessorKey: "businessUnit",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Business Unit" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Building2Icon className="size-4 text-muted-foreground" />
          <span className="text-sm">{row.getValue("businessUnit")}</span>
        </div>
      ),
    },
    {
      accessorKey: "deliveryDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Delivery Date" />,
      cell: ({ row }) => formatDate(row.getValue("deliveryDate")),
    },
    {
      accessorKey: "commodity",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Commodity" />,
      cell: ({ row }) => <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/50">{row.getValue("commodity")}</Badge>,
    },
    {
      accessorKey: "ticketNo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ticket No" />,
      cell: ({ row }) => <span className="font-mono text-sm">{row.getValue("ticketNo")}</span>,
    },
    {
      accessorKey: "totalCharges",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
      cell: ({ row }) => <span className="font-bold text-green-600">{formatCurrency(row.getValue("totalCharges"))}</span>,
    },
    {
      accessorKey: "podUploaded",
      header: ({ column }) => <DataTableColumnHeader column={column} title="POD" />,
      cell: ({ row }) => {
        const podUploaded = row.getValue("podUploaded");
        return (
          <Badge className={podUploaded ? "bg-green-500/10 text-green-700 border-green-500/50" : "bg-amber-500/10 text-amber-700 border-amber-500/50"}>
            {podUploaded ? "Uploaded" : "Pending"}
          </Badge>
        );
      },
    },
  ];

  // Invoice columns
  const invoiceColumns = [
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => {
        const invoice = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/billing/invoices/${invoice.invoiceNo}`)}>
                <EyeIcon className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PrinterIcon className="h-4 w-4 mr-2" />
                Print
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <MailIcon className="h-4 w-4 mr-2" />
                Send to Customer
              </DropdownMenuItem>
              {invoice.status !== "Paid" && (
                <DropdownMenuItem>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Record Payment
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "invoiceNo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Invoice No" />,
      cell: ({ row }) => (
        <button
          onClick={() => navigate(`/app/carrier-portal/billing/invoices/${row.getValue("invoiceNo")}`)}
          className="font-mono text-sm font-medium text-primary hover:underline"
        >
          {row.getValue("invoiceNo")}
        </button>
      ),
    },
    {
      accessorKey: "customer",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.getValue("customer")}</span>
          <span className="text-xs text-muted-foreground">{row.original.customerId}</span>
        </div>
      ),
    },
    {
      accessorKey: "businessUnit",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Business Unit" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Building2Icon className="size-4 text-muted-foreground" />
          <span className="text-sm">{row.getValue("businessUnit")}</span>
        </div>
      ),
    },
    {
      accessorKey: "invoiceType",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => getInvoiceTypeBadge(row.getValue("invoiceType")),
    },
    {
      accessorKey: "invoiceDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Invoice Date" />,
      cell: ({ row }) => formatDate(row.getValue("invoiceDate")),
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Due Date" />,
      cell: ({ row }) => {
        const daysOverdue = getDaysOverdue(row.getValue("dueDate"), row.original.status);
        return (
          <div className="flex flex-col">
            <span>{formatDate(row.getValue("dueDate"))}</span>
            {daysOverdue && <span className="text-xs text-red-600 font-medium">{daysOverdue} days overdue</span>}
          </div>
        );
      },
    },
    {
      accessorKey: "loadCount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Loads" />,
      cell: ({ row }) => <span className="font-medium">{row.getValue("loadCount")}</span>,
    },
    {
      accessorKey: "totalAmount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
      cell: ({ row }) => <span className="font-medium">{formatCurrency(row.getValue("totalAmount"))}</span>,
    },
    {
      accessorKey: "balanceDue",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Balance" />,
      cell: ({ row }) => {
        const balance = row.getValue("balanceDue");
        return (
          <span className={balance > 0 ? "font-bold text-amber-600" : "text-muted-foreground"}>
            {formatCurrency(balance)}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.getValue("status");
        const statusIcons = {
          Draft: <FileText className="size-3 mr-1" />,
          "Synced to QB": <CloudIcon className="size-3 mr-1" />,
          Sent: <SendIcon className="size-3 mr-1" />,
          Paid: <CheckCircle2Icon className="size-3 mr-1" />,
          Partial: <ClockIcon className="size-3 mr-1" />,
          Overdue: <AlertCircleIcon className="size-3 mr-1" />,
        };
        return (
          <Badge className={getStatusBadge(status)}>
            {statusIcons[status]}
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "pdfStatus",
      header: ({ column }) => <DataTableColumnHeader column={column} title="PDF" />,
      cell: ({ row }) => getPdfStatusCell(row.original),
    },
  ];

  // Calculate totals
  const selectedTotal = readyToInvoiceData
    .filter((row) => selectedRows.includes(row.id))
    .reduce((sum, row) => sum + row.totalCharges, 0);

  const selectedByCustomer = readyToInvoiceData
    .filter((row) => selectedRows.includes(row.id))
    .reduce((acc, row) => {
      if (!acc[row.customerId]) {
        acc[row.customerId] = { customer: row.customer, customerId: row.customerId, loads: [], total: 0 };
      }
      acc[row.customerId].loads.push(row);
      acc[row.customerId].total += row.totalCharges;
      return acc;
    }, {});

  // Summary stats
  const totalInvoiced = invoicesData.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const totalPaid = invoicesData.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const totalUnpaid = invoicesData.reduce((sum, inv) => sum + inv.balanceDue, 0);
  const overdueCount = invoicesData.filter((inv) => inv.status === "Overdue").length;
  const readyToInvoiceTotal = readyToInvoiceData.reduce((sum, row) => sum + row.totalCharges, 0);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Summary Cards */}
      <div className="flex-shrink-0 px-6 py-4">
        <div className="grid grid-cols-5 gap-4">
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-2 text-orange-600 mb-1">
              <PackageIcon className="size-4" />
              <span className="text-xs">Ready to Invoice</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">{readyToInvoiceData.length}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <FileText className="size-4" />
              <span className="text-xs">Total Invoiced</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalInvoiced)}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-2 text-green-600 mb-1">
              <CheckCircle2Icon className="size-4" />
              <span className="text-xs">Received</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-2 text-amber-600 mb-1">
              <ClockIcon className="size-4" />
              <span className="text-xs">Unpaid</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">{formatCurrency(totalUnpaid)}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-2 text-red-600 mb-1">
              <AlertCircleIcon className="size-4" />
              <span className="text-xs">Overdue</span>
            </div>
            <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
          </div>
        </div>
      </div>

      {/* Filter, Tabs and Actions */}
      <div className="flex-shrink-0 px-6 pb-4">
        <div className="flex items-center justify-between">
          <SmartFilter
            filterGroups={activeTab === "ready-to-invoice" ? readyToInvoiceFilterGroups : invoicesFilterGroups}
            onFiltersChange={handleFiltersChange}
          />
          <div className="flex items-center gap-3">
            {activeTab === "ready-to-invoice" && selectedRows.length > 0 && (
              <div className="text-sm">
                <span className="text-muted-foreground">Selected: </span>
                <span className="font-bold">{selectedRows.length} loads</span>
                <span className="mx-2 text-muted-foreground">|</span>
                <span className="font-bold text-green-600">{formatCurrency(selectedTotal)}</span>
              </div>
            )}
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={activeTab === "ready-to-invoice" ? "default" : "ghost"}
                className={`rounded-none ${
                  activeTab === "ready-to-invoice"
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
                onClick={() => setActiveTab("ready-to-invoice")}
              >
                <PackageIcon className="size-4 mr-2" />
                Ready to Invoice
              </Button>
              <Button
                variant={activeTab === "invoices" ? "default" : "ghost"}
                className={`rounded-none ${
                  activeTab === "invoices"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
                onClick={() => setActiveTab("invoices")}
              >
                <FileText className="size-4 mr-2" />
                All Invoices
              </Button>
            </div>
            <Button
              onClick={() => {
                setShowCreateInvoiceDialog(true);
                setCreateInvoiceStep(1);
                setCreateInvoiceType("");
                setSelectedLoadsForInvoice([]);
              }}
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              <PlusIcon className="size-4 mr-2" />
              Create Invoice
            </Button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto px-6">
        {activeTab === "ready-to-invoice" && (
          <DataTable columns={readyToInvoiceColumns} data={readyToInvoiceData} showViewOptions={false} pageSize={10} />
        )}

        {activeTab === "invoices" && (
          <DataTable columns={invoiceColumns} data={invoicesData} showViewOptions={false} pageSize={10} />
        )}
      </div>

      {/* PDF Preview Dialog */}
      <Dialog open={pdfPreviewOpen} onOpenChange={setPdfPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="size-5" />
              Invoice Preview - {selectedInvoiceForPdf?.invoiceNo}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="border rounded-lg bg-gray-50 min-h-[500px] flex items-center justify-center">
              <div className="text-center p-8 bg-white rounded-lg shadow-sm border max-w-md">
                <FileText className="size-16 mx-auto text-gray-300 mb-4" />
                <h3 className="font-bold text-lg mb-2">{selectedInvoiceForPdf?.invoiceNo}</h3>
                <p className="text-muted-foreground text-sm mb-1">{selectedInvoiceForPdf?.customer}</p>
                <p className="text-2xl font-bold text-primary">
                  {selectedInvoiceForPdf && formatCurrency(selectedInvoiceForPdf.totalAmount)}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {selectedInvoiceForPdf?.loadCount} load(s) • {selectedInvoiceForPdf?.invoiceType === "per-load" ? "Per-Load Invoice" : "Summary Invoice"}
                </p>
                <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
                  PDF preview would render here using a PDF viewer library
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <DownloadIcon className="size-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm">
                  <PrinterIcon className="size-4 mr-2" />
                  Print
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <MailIcon className="size-4 mr-2" />
                  Email to Customer
                </Button>
                {selectedInvoiceForPdf?.qbSyncStatus !== "synced" && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <CloudIcon className="size-4 mr-2" />
                    Sync to QuickBooks
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Invoice Dialog */}
      <AlertDialog open={showBatchInvoiceDialog} onOpenChange={setShowBatchInvoiceDialog}>
        <AlertDialogContent className="max-w-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Create Invoices</AlertDialogTitle>
            <AlertDialogDescription>
              Configure invoice settings for {selectedRows.length} loads.
              {Object.keys(selectedByCustomer).length > 1 && (
                <span className="block mt-1">Creating invoices for {Object.keys(selectedByCustomer).length} customers.</span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4 space-y-4">
            {/* Customer Summary */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Customers</p>
              {Object.values(selectedByCustomer).map((group) => (
                <div key={group.customerId} className="border rounded-lg p-3 bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{group.customer}</p>
                      <p className="text-xs text-muted-foreground">{group.loads.length} loads</p>
                    </div>
                    <p className="font-bold text-green-600">{formatCurrency(group.total)}</p>
                  </div>
                </div>
              ))}
              <div className="border-t pt-3 flex items-center justify-between">
                <span className="font-medium">Grand Total</span>
                <span className="text-lg font-bold text-green-600">{formatCurrency(selectedTotal)}</span>
              </div>
            </div>

            {/* Invoice Type Selection */}
            <div className="space-y-3 pt-2 border-t">
              <p className="text-sm font-medium">Invoice Type</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setInvoiceType("summary")}
                  className={`p-3 border rounded-lg text-left transition-all ${
                    invoiceType === "summary" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FileStack className={`size-4 ${invoiceType === "summary" ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="font-medium">Summary Invoice</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Combine all loads into one invoice per customer</p>
                  {invoiceType === "summary" && (
                    <p className="text-xs text-primary mt-2 font-medium">Creates {Object.keys(selectedByCustomer).length} invoice(s)</p>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setInvoiceType("per-load")}
                  className={`p-3 border rounded-lg text-left transition-all ${
                    invoiceType === "per-load" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Truck className={`size-4 ${invoiceType === "per-load" ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="font-medium">Per-Load Invoice</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Create separate invoice for each load</p>
                  {invoiceType === "per-load" && (
                    <p className="text-xs text-primary mt-2 font-medium">Creates {selectedRows.length} invoice(s)</p>
                  )}
                </button>
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-3 pt-2 border-t">
              <p className="text-sm font-medium">Options</p>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Checkbox checked={autoGeneratePdf} onCheckedChange={setAutoGeneratePdf} />
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-muted-foreground" />
                    <span className="text-sm">Auto-generate PDF after creation</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Checkbox checked={syncToQuickBooks} onCheckedChange={setSyncToQuickBooks} />
                  <div className="flex items-center gap-2">
                    <CloudIcon className="size-4 text-muted-foreground" />
                    <span className="text-sm">Sync to QuickBooks</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Checkbox checked={attachPodDocuments} onCheckedChange={setAttachPodDocuments} />
                  <div className="flex items-center gap-2">
                    <PaperclipIcon className="size-4 text-muted-foreground" />
                    <span className="text-sm">Attach POD documents</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleCreateInvoice(selectedRows)}
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              Create {invoiceType === "summary" ? Object.keys(selectedByCustomer).length : selectedRows.length} Invoice(s)
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create Invoice Sheet (from All Invoices tab) */}
      <Sheet open={showCreateInvoiceDialog} onOpenChange={setShowCreateInvoiceDialog}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              Create Invoice
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-5 mt-4 px-6 pb-24">
            {/* Invoice Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="invoiceType" className="text-sm font-medium text-foreground">
                Invoice Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={createInvoiceType}
                onValueChange={(value) => setCreateInvoiceType(value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select invoice type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">
                    <div className="flex items-center gap-2">
                      <FileStack className="size-4" />
                      <span>Summary Invoice</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="per-load">
                    <div className="flex items-center gap-2">
                      <Truck className="size-4" />
                      <span>Per-Load Invoice</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {createInvoiceType === "summary"
                  ? "Combines multiple loads into one invoice per customer"
                  : createInvoiceType === "per-load"
                  ? "Creates separate invoice for each load"
                  : "Choose how to generate invoices"}
              </p>
            </div>

            {/* Select Loads - Only show after type is selected */}
            {createInvoiceType && (
              <>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-foreground">
                      Select Loads <span className="text-red-500">*</span>
                    </Label>
                    {selectedLoadsForInvoice.length > 0 && (
                      <Badge variant="secondary">
                        {selectedLoadsForInvoice.length} selected • {formatCurrency(selectedLoadsTotal)}
                      </Badge>
                    )}
                  </div>

                  {readyToInvoiceData.length === 0 ? (
                    <div className="text-center py-6 border rounded-lg bg-muted/30">
                      <PackageIcon className="size-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm font-medium">No loads available</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Loads appear here after delivery
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Select All */}
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Checkbox
                          id="selectAllLoads"
                          checked={selectedLoadsForInvoice.length === readyToInvoiceData.length}
                          onCheckedChange={handleSelectAllLoadsForInvoice}
                        />
                        <Label htmlFor="selectAllLoads" className="text-sm font-medium cursor-pointer">
                          Select All ({readyToInvoiceData.length} loads from {Object.keys(loadsByCustomer).length} customers)
                        </Label>
                      </div>

                      {/* Customer-wise Loads List */}
                      <div className="space-y-2 max-h-[320px] overflow-y-auto">
                        {Object.values(loadsByCustomer).map((customerGroup) => (
                          <div
                            key={customerGroup.customerId}
                            className={`border rounded-lg overflow-hidden transition-all ${
                              isCustomerFullySelected(customerGroup.customerId)
                                ? "border-primary"
                                : "border-border"
                            }`}
                          >
                            {/* Customer Header */}
                            <div
                              className={`flex items-center gap-3 p-3 cursor-pointer transition-all ${
                                isCustomerFullySelected(customerGroup.customerId)
                                  ? "bg-primary/5"
                                  : "bg-muted/30 hover:bg-muted/50"
                              }`}
                            >
                              <Checkbox
                                checked={isCustomerFullySelected(customerGroup.customerId)}
                                ref={(el) => {
                                  if (el) el.indeterminate = isCustomerPartiallySelected(customerGroup.customerId);
                                }}
                                onCheckedChange={(checked) => handleSelectCustomerLoads(customerGroup.customerId, checked)}
                              />
                              <button
                                type="button"
                                onClick={() => toggleCustomerExpanded(customerGroup.customerId)}
                                className="flex-1 flex items-center justify-between"
                              >
                                <div className="flex items-center gap-2">
                                  {expandedCustomers.includes(customerGroup.customerId) ? (
                                    <ChevronDownIcon className="size-4 text-muted-foreground" />
                                  ) : (
                                    <ChevronRightIcon className="size-4 text-muted-foreground" />
                                  )}
                                  <UserIcon className="size-4 text-muted-foreground" />
                                  <span className="font-medium text-sm">{customerGroup.customer}</span>
                                  <Badge variant="secondary" className="text-xs">
                                    {customerGroup.loads.length} loads
                                  </Badge>
                                </div>
                                <span className="font-bold text-sm text-green-600">
                                  {formatCurrency(customerGroup.total)}
                                </span>
                              </button>
                            </div>

                            {/* Expanded Loads */}
                            {expandedCustomers.includes(customerGroup.customerId) && (
                              <div className="border-t bg-background">
                                {customerGroup.loads.map((load) => (
                                  <label
                                    key={load.id}
                                    className={`flex items-start gap-3 p-3 cursor-pointer transition-all border-b last:border-b-0 ${
                                      selectedLoadsForInvoice.includes(load.id)
                                        ? "bg-primary/5"
                                        : "hover:bg-muted/30"
                                    }`}
                                  >
                                    <Checkbox
                                      checked={selectedLoadsForInvoice.includes(load.id)}
                                      onCheckedChange={(checked) => handleSelectLoadForInvoice(load.id, checked)}
                                      className="mt-0.5 ml-6"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between gap-2">
                                        <span className="font-medium text-sm">{load.loadNo}</span>
                                        <span className="font-bold text-sm text-green-600">{formatCurrency(load.totalCharges)}</span>
                                      </div>
                                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                        <span>{load.origin} → {load.destination}</span>
                                        <span>•</span>
                                        <span>{load.commodity}</span>
                                        {load.podUploaded && (
                                          <>
                                            <span>•</span>
                                            <Badge variant="outline" className="text-[10px] py-0 h-4 bg-green-500/10 text-green-700 border-green-500/50">
                                              POD
                                            </Badge>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </label>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Invoice Preview for Summary */}
                      {createInvoiceType === "summary" && selectedLoadsForInvoice.length > 0 && (
                        <div className="p-3 bg-purple-500/5 border border-purple-500/20 rounded-lg">
                          <p className="text-xs font-medium text-purple-700 mb-2">Invoice Preview</p>
                          <div className="space-y-1">
                            {Object.values(selectedLoadsByCustomer).map((group) => (
                              <div key={group.customerId} className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{group.customer} ({group.loads.length})</span>
                                <span className="font-medium">{formatCurrency(group.total)}</span>
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-purple-600 mt-2">
                            Creates {Object.keys(selectedLoadsByCustomer).length} invoice(s)
                          </p>
                        </div>
                      )}

                      {/* Invoice Preview for Per-Load */}
                      {createInvoiceType === "per-load" && selectedLoadsForInvoice.length > 0 && (
                        <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                          <p className="text-xs text-blue-600">
                            Creates {selectedLoadsForInvoice.length} individual invoice(s)
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <Separator />

                {/* Options */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-foreground">Options</Label>

                  <div className="flex items-center justify-between py-2 border rounded-lg px-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="syncToQuickBooks" className="text-sm font-medium">
                        Sync to QuickBooks
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Auto-sync invoice to QuickBooks
                      </p>
                    </div>
                    <Checkbox
                      id="syncToQuickBooks"
                      checked={syncToQuickBooks}
                      onCheckedChange={setSyncToQuickBooks}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <SheetFooter className="absolute bottom-0 left-0 right-0 border-t p-4 bg-background px-6">
            <div className="flex gap-3 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowCreateInvoiceDialog(false);
                  setCreateInvoiceType("");
                  setSelectedLoadsForInvoice([]);
                  setExpandedCustomers([]);
                }}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSubmitCreateInvoice}
                disabled={!createInvoiceType || selectedLoadsForInvoice.length === 0}
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Create Invoice
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Invoices;
