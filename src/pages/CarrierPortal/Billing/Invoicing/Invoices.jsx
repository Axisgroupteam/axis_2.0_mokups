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
  DialogFooter,
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  Scale,
  CloudIcon,
  Loader2Icon,
  FileIcon,
  PackageIcon,
  SendIcon,
  Building2Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  UserIcon,
  XCircleIcon,
  RefreshCwIcon,
  SparklesIcon,
  ExternalLinkIcon,
  AlertTriangleIcon,
  BanIcon,
  ArrowRightIcon,
  LinkIcon,
  CalendarIcon,
  CalendarCheckIcon,
  PlayIcon,
  BotIcon,
  RotateCwIcon,
  CircleCheckIcon,
  CircleDotIcon,
  CircleAlertIcon,
  CircleMinusIcon,
  ZapIcon,
} from "lucide-react";

const Invoices = () => {
  const navigate = useNavigate();

  // ============================================================================
  // SCHEDULED TODAY UI CONFIGURATION (Now as state with UI selector)
  // ============================================================================
  // Options: "hidden" | "current" | "alternative"
  // ============================================================================
  const [scheduledTodayUIVariant, setScheduledTodayUIVariant] = useState("hidden");

  const [activeTab, setActiveTab] = useState("check-failed");
  const [filters, setFilters] = useState([]);
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);
  const [selectedInvoiceForPdf, setSelectedInvoiceForPdf] = useState(null);
  const [validationDetailsOpen, setValidationDetailsOpen] = useState(false);
  const [selectedLoadForValidation, setSelectedLoadForValidation] = useState(null);

  // Ready to Invoice state
  const [selectedRows, setSelectedRows] = useState([]);
  const [showBatchInvoiceDialog, setShowBatchInvoiceDialog] = useState(false);
  const [invoiceType, setInvoiceType] = useState("summary");
  const [syncToQuickBooks, setSyncToQuickBooks] = useState(true);
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  const [invoiceCreationStatus, setInvoiceCreationStatus] = useState(null); // 'processing', 'success', 'failed'

  // Create Invoice Sheet state
  const [showCreateInvoiceDialog, setShowCreateInvoiceDialog] = useState(false);
  const [createInvoiceType, setCreateInvoiceType] = useState("");
  const [selectedLoadsForInvoice, setSelectedLoadsForInvoice] = useState([]);
  const [expandedCustomers, setExpandedCustomers] = useState([]);

  // Re-run Automation state
  const [showRerunConfirmDialog, setShowRerunConfirmDialog] = useState(false);
  const [isRerunning, setIsRerunning] = useState(false);
  const [rerunProgress, setRerunProgress] = useState({ step: 0, total: 4, message: "" });
  const [showRerunResultDialog, setShowRerunResultDialog] = useState(false);
  const [rerunResult, setRerunResult] = useState(null);

  // Scheduled Today pagination state
  const [scheduledPage, setScheduledPage] = useState(1);
  const scheduledPageSize = 5;

  // Per-Load Invoices Dialog state
  const [showPerLoadInvoicesDialog, setShowPerLoadInvoicesDialog] = useState(false);
  const [selectedCustomerForInvoices, setSelectedCustomerForInvoices] = useState(null);

  // Mock data - loads ready to be invoiced (passed all validation checks)
  const readyToInvoiceData = [
    {
      id: 1,
      loadNo: "ML-2025-001245",
      customer: "Titan Construction",
      customerId: "CUST-001",
      customerCadence: "weekly",
      invoiceType: "summary",
      businessUnit: "Mega Logistics",
      businessUnitId: "BU-001",
      completedDate: "2025-01-05",
      commodity: "Cement",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      weight: "24,500 lbs",
      expectedWeight: "24,500 lbs",
      freightCharges: 1850.00,
      expectedAmount: 1850.00,
      fuelSurcharge: 185.00,
      accessorials: 150.00,
      totalCharges: 2185.00,
      driverName: "John Smith",
      vehicleNo: "TRK-2847",
      ticketNo: "TKT-78501",
      validation: {
        status: "passed",
        weightMatches: true,
        amountMatches: true,
        checkedAt: "2025-01-05T14:30:00Z",
      },
    },
    {
      id: 2,
      loadNo: "ML-2025-001246",
      customer: "Titan Construction",
      customerId: "CUST-001",
      customerCadence: "weekly",
      invoiceType: "summary",
      businessUnit: "Mega Logistics",
      businessUnitId: "BU-001",
      completedDate: "2025-01-05",
      commodity: "Sand",
      origin: "Austin, TX",
      destination: "Dallas, TX",
      weight: "22,000 lbs",
      expectedWeight: "22,000 lbs",
      freightCharges: 1650.00,
      expectedAmount: 1650.00,
      fuelSurcharge: 165.00,
      accessorials: 75.00,
      totalCharges: 1890.00,
      driverName: "Mike Davis",
      vehicleNo: "TRK-1923",
      ticketNo: "TKT-78502",
      validation: {
        status: "passed",
        weightMatches: true,
        amountMatches: true,
        checkedAt: "2025-01-05T15:00:00Z",
      },
    },
    {
      id: 3,
      loadNo: "MT-2025-001247",
      customer: "Ashgrove Cement",
      customerId: "CUST-002",
      customerCadence: "immediate",
      invoiceType: "per-load",
      businessUnit: "Mega Trucking",
      businessUnitId: "BU-002",
      completedDate: "2025-01-06",
      commodity: "Flyash",
      origin: "San Antonio, TX",
      destination: "Houston, TX",
      weight: "26,000 lbs",
      expectedWeight: "26,000 lbs",
      freightCharges: 2100.00,
      expectedAmount: 2100.00,
      fuelSurcharge: 210.00,
      accessorials: 200.00,
      totalCharges: 2510.00,
      driverName: "Sarah Johnson",
      vehicleNo: "TRK-4521",
      ticketNo: "TKT-78503",
      validation: {
        status: "passed",
        weightMatches: true,
        amountMatches: true,
        checkedAt: "2025-01-06T10:15:00Z",
      },
    },
    {
      id: 4,
      loadNo: "MT-2025-001248",
      customer: "TQL Logistics",
      customerId: "CUST-003",
      customerCadence: "daily",
      invoiceType: "summary",
      businessUnit: "Mega Trucking",
      businessUnitId: "BU-002",
      completedDate: "2025-01-06",
      commodity: "Aggregate",
      origin: "Fort Worth, TX",
      destination: "Austin, TX",
      weight: "25,500 lbs",
      expectedWeight: "25,500 lbs",
      freightCharges: 1950.00,
      expectedAmount: 1950.00,
      fuelSurcharge: 195.00,
      accessorials: 100.00,
      totalCharges: 2245.00,
      driverName: "Robert Wilson",
      vehicleNo: "TRK-7734",
      ticketNo: "TKT-78504",
      validation: {
        status: "passed",
        weightMatches: true,
        amountMatches: true,
        checkedAt: "2025-01-06T11:45:00Z",
      },
    },
  ];

  // Expanded customers state for scheduled today tab
  const [expandedScheduledCustomers, setExpandedScheduledCustomers] = useState([]);

  // Today's date for display
  const today = new Date();
  const todayFormatted = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" });

  // Mock data - Billing Schedules (customers scheduled for today)
  const scheduledTodayData = [
    {
      id: 1,
      customerId: "CUST-001",
      customer: "Titan Construction",
      billingFrequency: "Weekly",
      billingDay: "Monday",
      invoiceType: "Summary",
      autoGenerate: true,
      lastInvoiceDate: "2025-01-06",
      nextInvoiceDate: "2025-01-13",
      status: "Created", // Created, Pending, Partial, Failed
      invoiceNo: "INV-2025-0042",
      loadsReady: 8,
      loadsInvoiced: 8,
      totalAmount: 17480.00,
      loads: [
        { loadNo: "ML-2025-001245", amount: 2185.00, status: "Invoiced" },
        { loadNo: "ML-2025-001246", amount: 2350.00, status: "Invoiced" },
        { loadNo: "ML-2025-001250", amount: 1980.00, status: "Invoiced" },
        { loadNo: "ML-2025-001253", amount: 2150.00, status: "Invoiced" },
        { loadNo: "ML-2025-001256", amount: 2280.00, status: "Invoiced" },
        { loadNo: "ML-2025-001259", amount: 2100.00, status: "Invoiced" },
        { loadNo: "ML-2025-001262", amount: 2235.00, status: "Invoiced" },
        { loadNo: "ML-2025-001265", amount: 2200.00, status: "Invoiced" },
      ],
    },
    {
      id: 2,
      customerId: "CUST-003",
      customer: "CH Robinson",
      billingFrequency: "Weekly",
      billingDay: "Monday",
      invoiceType: "Per-Load",
      autoGenerate: true,
      lastInvoiceDate: "2025-01-06",
      nextInvoiceDate: "2025-01-13",
      status: "Created",
      invoiceNo: null, // Per-Load doesn't have single invoice
      invoiceCount: 5, // Number of invoices generated
      loadsReady: 5,
      loadsInvoiced: 5,
      totalAmount: 11250.00,
      loads: [
        { loadNo: "ML-2025-001247", amount: 2250.00, status: "Invoiced", invoiceNo: "INV-2025-0043" },
        { loadNo: "ML-2025-001251", amount: 2150.00, status: "Invoiced", invoiceNo: "INV-2025-0044" },
        { loadNo: "ML-2025-001254", amount: 2300.00, status: "Invoiced", invoiceNo: "INV-2025-0045" },
        { loadNo: "ML-2025-001257", amount: 2200.00, status: "Invoiced", invoiceNo: "INV-2025-0046" },
        { loadNo: "ML-2025-001260", amount: 2350.00, status: "Invoiced", invoiceNo: "INV-2025-0047" },
      ],
    },
    {
      id: 3,
      customerId: "CUST-004",
      customer: "TQL Logistics",
      billingFrequency: "Weekly",
      billingDay: "Monday",
      invoiceType: "Summary",
      autoGenerate: true,
      lastInvoiceDate: "2025-01-06",
      nextInvoiceDate: "2025-01-13",
      status: "Created",
      invoiceNo: "INV-2025-0044",
      loadsReady: 3,
      loadsInvoiced: 3,
      totalAmount: 6750.00,
      loads: [
        { loadNo: "ML-2025-001248", amount: 2250.00, status: "Invoiced" },
        { loadNo: "ML-2025-001252", amount: 2150.00, status: "Invoiced" },
        { loadNo: "ML-2025-001255", amount: 2350.00, status: "Invoiced" },
      ],
    },
    {
      id: 4,
      customerId: "CUST-002",
      customer: "Ashgrove Cement",
      billingFrequency: "Weekly",
      billingDay: "Monday",
      invoiceType: "Summary",
      autoGenerate: true,
      lastInvoiceDate: "2025-01-06",
      nextInvoiceDate: "2025-01-13",
      status: "Pending",
      invoiceNo: null,
      loadsReady: 6,
      loadsInvoiced: 0,
      totalAmount: 13500.00,
      loads: [
        { loadNo: "ML-2025-001249", amount: 2250.00, status: "Ready" },
        { loadNo: "ML-2025-001258", amount: 2150.00, status: "Ready" },
        { loadNo: "ML-2025-001261", amount: 2350.00, status: "Ready" },
        { loadNo: "ML-2025-001264", amount: 2250.00, status: "Ready" },
        { loadNo: "ML-2025-001267", amount: 2200.00, status: "Ready" },
        { loadNo: "ML-2025-001270", amount: 2300.00, status: "Ready" },
      ],
    },
    {
      id: 5,
      customerId: "CUST-005",
      customer: "Coyote Logistics",
      billingFrequency: "Monthly",
      billingDay: "13th",
      invoiceType: "Per-Load",
      autoGenerate: true,
      lastInvoiceDate: "2024-12-13",
      nextInvoiceDate: "2025-01-13",
      status: "Partial",
      invoiceNo: null, // Per-Load doesn't have single invoice
      invoiceCount: 2, // Number of invoices generated so far
      loadsReady: 4,
      loadsInvoiced: 2,
      totalAmount: 9000.00,
      loads: [
        { loadNo: "ML-2025-001263", amount: 2250.00, status: "Invoiced", invoiceNo: "INV-2025-0048" },
        { loadNo: "ML-2025-001266", amount: 2150.00, status: "Invoiced", invoiceNo: "INV-2025-0049" },
        { loadNo: "ML-2025-001269", amount: 2350.00, status: "Failed", invoiceNo: null, failureReason: "Weight mismatch" },
        { loadNo: "ML-2025-001272", amount: 2250.00, status: "Failed", invoiceNo: null, failureReason: "Amount mismatch" },
      ],
    },
    {
      id: 6,
      customerId: "CUST-006",
      customer: "XPO Logistics",
      billingFrequency: "Immediate",
      billingDay: null, // Immediate = as soon as load completes
      invoiceType: "Per-Load",
      autoGenerate: true,
      lastInvoiceDate: "2025-01-13",
      nextInvoiceDate: null, // No scheduled date - happens on completion
      status: "Created",
      invoiceNo: null,
      invoiceCount: 3,
      loadsReady: 3,
      loadsInvoiced: 3,
      totalAmount: 6900.00,
      loads: [
        { loadNo: "ML-2025-001275", amount: 2300.00, status: "Invoiced", invoiceNo: "INV-2025-0050" },
        { loadNo: "ML-2025-001278", amount: 2250.00, status: "Invoiced", invoiceNo: "INV-2025-0051" },
        { loadNo: "ML-2025-001281", amount: 2350.00, status: "Invoiced", invoiceNo: "INV-2025-0052" },
      ],
    },
    {
      id: 7,
      customerId: "CUST-007",
      customer: "Echo Global",
      billingFrequency: "Manual",
      billingDay: null, // Manual = user decides when to invoice
      invoiceType: "Summary",
      autoGenerate: false,
      lastInvoiceDate: "2025-01-06",
      nextInvoiceDate: null, // No scheduled date
      status: "Pending",
      invoiceNo: null,
      invoiceCount: 0,
      loadsReady: 5,
      loadsInvoiced: 0,
      totalAmount: 11500.00,
      loads: [
        { loadNo: "ML-2025-001284", amount: 2300.00, status: "Ready" },
        { loadNo: "ML-2025-001287", amount: 2250.00, status: "Ready" },
        { loadNo: "ML-2025-001290", amount: 2350.00, status: "Ready" },
        { loadNo: "ML-2025-001293", amount: 2300.00, status: "Ready" },
        { loadNo: "ML-2025-001296", amount: 2300.00, status: "Ready" },
      ],
    },
  ];

  // Automation status mock data
  const automationStatus = {
    lastRun: "2025-01-13T06:00:00Z",
    status: "Completed", // Completed, Running, Failed
    invoicesGenerated: 12, // Summary: 2 invoices + Per-Load: 10 invoices (5+2+3)
    loadsProcessed: 19, // Total loads processed (4+3+5+4+3)
    skipped: 2,
    errors: 0,
    nextScheduledRun: "2025-01-13T18:00:00Z",
  };

  // Calculate scheduled today stats
  const scheduledStats = {
    expected: scheduledTodayData.length,
    created: scheduledTodayData.filter(s => s.status === "Created").length,
    pending: scheduledTodayData.filter(s => s.status === "Pending").length,
    partial: scheduledTodayData.filter(s => s.status === "Partial").length,
    failed: scheduledTodayData.filter(s => s.status === "Failed").length,
  };

  // Mock data - loads that failed validation checks
  const checkFailedData = [
    {
      id: 101,
      loadNo: "ML-2025-001249",
      customer: "Ashgrove Cement",
      customerId: "CUST-002",
      businessUnit: "Mega Logistics",
      businessUnitId: "BU-001",
      completedDate: "2025-01-07",
      commodity: "Limestone",
      origin: "Dallas, TX",
      destination: "San Antonio, TX",
      weight: "23,000 lbs",
      expectedWeight: "25,000 lbs",
      freightCharges: 1750.00,
      expectedAmount: 1925.00,
      fuelSurcharge: 175.00,
      accessorials: 0.00,
      totalCharges: 1925.00,
      driverName: "Emily Brown",
      vehicleNo: "TRK-3356",
      ticketNo: "TKT-78505",
      validation: {
        status: "failed",
        weightMatches: false,
        amountMatches: false,
        failureReasons: [
          "Weight mismatch: Expected 25,000 lbs, Actual 23,000 lbs",
          "Amount mismatch: Expected $1,925.00, Actual $1,750.00"
        ],
        checkedAt: "2025-01-07T09:30:00Z",
      },
      // New fields for resolution workflow
      subStatus: "Pending Resolution", // "Pending Resolution" | "Awaiting Re-Check"
      missedScheduledCycle: true,
      missedCycleCount: 2,
      scheduledDate: "2025-01-11", // When it was supposed to be invoiced
      nextScheduledRun: "2025-01-18", // Next cycle date
    },
    {
      id: 102,
      loadNo: "MT-2025-001250",
      customer: "CH Robinson",
      customerId: "CUST-004",
      businessUnit: "Mega Trucking",
      businessUnitId: "BU-002",
      completedDate: "2025-01-07",
      commodity: "Gravel",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      weight: "24,800 lbs",
      expectedWeight: "25,500 lbs",
      freightCharges: 1800.00,
      expectedAmount: 1800.00,
      fuelSurcharge: 180.00,
      accessorials: 50.00,
      totalCharges: 2030.00,
      driverName: "James Miller",
      vehicleNo: "TRK-5521",
      ticketNo: "TKT-78506",
      validation: {
        status: "failed",
        weightMatches: false,
        amountMatches: true,
        failureReasons: ["Weight mismatch: Expected 25,500 lbs, Actual 24,800 lbs"],
        checkedAt: "2025-01-07T10:00:00Z",
      },
      // New fields for resolution workflow
      subStatus: "Awaiting Re-Check", // Recently fixed, waiting for auto-validation
      missedScheduledCycle: true,
      missedCycleCount: 1,
      scheduledDate: "2025-01-11",
      nextScheduledRun: "2025-01-18",
    },
    {
      id: 103,
      loadNo: "ML-2025-001251",
      customer: "Coyote Logistics",
      customerId: "CUST-005",
      businessUnit: "Mega Logistics",
      businessUnitId: "BU-001",
      completedDate: "2025-01-08",
      commodity: "Cement",
      origin: "Austin, TX",
      destination: "Fort Worth, TX",
      weight: "22,500 lbs",
      expectedWeight: "24,000 lbs",
      freightCharges: 1700.00,
      expectedAmount: 1850.00,
      fuelSurcharge: 170.00,
      accessorials: 75.00,
      totalCharges: 1945.00,
      driverName: "Lisa Anderson",
      vehicleNo: "TRK-8812",
      ticketNo: "TKT-78507",
      validation: {
        status: "failed",
        weightMatches: false,
        amountMatches: false,
        failureReasons: [
          "Weight mismatch: Expected 24,000 lbs, Actual 22,500 lbs",
          "Amount mismatch: Expected $1,850.00, Actual $1,700.00"
        ],
        checkedAt: "2025-01-08T08:15:00Z",
      },
      // New fields for resolution workflow
      subStatus: "Pending Resolution",
      missedScheduledCycle: false, // Fresh failure, hasn't missed a cycle yet
      missedCycleCount: 0,
      scheduledDate: "2025-01-15",
      nextScheduledRun: "2025-01-15",
    },
  ];

  // Mock invoices data - Industry standard statuses
  // Status: Invoiced, Paid, Partial, Overdue, Cancelled
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
      status: "Invoiced",
      sentDate: "2025-01-05",
      paymentTerms: "Net 15",
      invoiceType: "summary",
      cadence: "weekly",
      pdfStatus: "generated",
      pdfUrl: "/invoices/ML-INV-2025-0001.pdf",
      qbSyncStatus: "synced",
      qbInvoiceId: "10045",
      qbInvoiceUrl: "https://app.qbo.intuit.com/app/invoice?txnId=10045",
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
      cadence: "immediate",
      pdfStatus: "generated",
      pdfUrl: "/invoices/MT-INV-2025-0002.pdf",
      qbSyncStatus: "synced",
      qbInvoiceId: "10044",
      qbInvoiceUrl: "https://app.qbo.intuit.com/app/invoice?txnId=10044",
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
      cadence: "daily",
      pdfStatus: "generated",
      pdfUrl: "/invoices/MT-INV-2025-0003.pdf",
      qbSyncStatus: "synced",
      qbInvoiceId: "10043",
      qbInvoiceUrl: "https://app.qbo.intuit.com/app/invoice?txnId=10043",
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
      cadence: "weekly",
      pdfStatus: "generated",
      pdfUrl: "/invoices/ML-INV-2024-0245.pdf",
      qbSyncStatus: "synced",
      qbInvoiceId: "10042",
      qbInvoiceUrl: "https://app.qbo.intuit.com/app/invoice?txnId=10042",
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
      cadence: "manual",
      pdfStatus: "generated",
      pdfUrl: "/invoices/MT-INV-2024-0244.pdf",
      qbSyncStatus: "synced",
      qbInvoiceId: "10040",
      qbInvoiceUrl: "https://app.qbo.intuit.com/app/invoice?txnId=10040",
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
      cadence: "weekly",
      pdfStatus: "generated",
      pdfUrl: "/invoices/ML-INV-2024-0243.pdf",
      qbSyncStatus: "synced",
      qbInvoiceId: "10035",
      qbInvoiceUrl: "https://app.qbo.intuit.com/app/invoice?txnId=10035",
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
      status: "Invoiced",
      sentDate: "2025-01-08",
      paymentTerms: "Net 15",
      invoiceType: "summary",
      cadence: "monthly",
      pdfStatus: "generated",
      pdfUrl: "/invoices/ML-INV-2025-0004.pdf",
      qbSyncStatus: "pending",
      qbInvoiceId: null,
      qbInvoiceUrl: null,
    },
    {
      id: 8,
      invoiceNo: "MT-INV-2024-0240",
      customer: "XPO Logistics",
      customerId: "CUST-007",
      businessUnit: "Mega Trucking",
      businessUnitId: "BU-002",
      invoiceDate: "2024-11-15",
      dueDate: "2024-11-30",
      loadCount: 2,
      subtotal: 3200.00,
      fuelSurcharge: 320.00,
      accessorials: 0.00,
      totalAmount: 3520.00,
      paidAmount: 0.00,
      balanceDue: 0.00,
      status: "Cancelled",
      sentDate: null,
      paymentTerms: "Net 15",
      invoiceType: "per-load",
      cadence: "manual",
      pdfStatus: "generated",
      pdfUrl: "/invoices/MT-INV-2024-0240.pdf",
      qbSyncStatus: "synced",
      qbInvoiceId: "10030",
      qbInvoiceUrl: "https://app.qbo.intuit.com/app/invoice?txnId=10030",
      voidReason: "Duplicate invoice - customer already invoiced",
    },
  ];

  // Mock internal/intercompany billing data
  // When truck belongs to Mega Trucking but customer is Mega Logistics customer:
  // - External invoice: Mega Logistics → Customer
  // - Internal invoice: Mega Trucking → Mega Logistics (auto-created when external invoice is created)
  // - Cadence: Immediate (mirrors external invoice)
  const internalBillingData = [
    {
      id: 1,
      internalInvoiceNo: "INT-2025-0001",
      customer: "Mega Logistics",
      customerId: "BU-001",
      billingUnit: "Mega Trucking",
      billingUnitId: "BU-002",
      invoiceDate: "2025-01-05",
      loadNo: "MT-2025-001100",
      externalInvoiceNo: "ML-INV-2025-0001",
      totalAmount: 1850.00,
      status: "Invoiced",
      cadence: "immediate", // Auto-created when external invoice is created
      qbSyncStatus: "synced",
      qbInvoiceId: "INT-10001",
    },
    {
      id: 2,
      internalInvoiceNo: "INT-2025-0002",
      customer: "Mega Logistics",
      customerId: "BU-001",
      billingUnit: "Mega Trucking",
      billingUnitId: "BU-002",
      invoiceDate: "2025-01-06",
      loadNo: "MT-2025-001101",
      externalInvoiceNo: "ML-INV-2025-0001",
      totalAmount: 2100.00,
      status: "Paid",
      cadence: "immediate", // Auto-created when external invoice is created
      qbSyncStatus: "synced",
      qbInvoiceId: "INT-10002",
    },
  ];

  // Filter groups
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
        { key: "cadence", label: "Cadence", type: "select", group: "Basic", options: [
          { value: "manual", label: "Manual" },
          { value: "immediate", label: "Immediate" },
          { value: "daily", label: "Daily" },
          { value: "weekly", label: "Weekly" },
          { value: "monthly", label: "Monthly" },
        ]},
      ],
    },
  ];

  const checkFailedFilterGroups = [
    {
      name: "Basic",
      filters: [
        { key: "businessUnit", label: "Business Unit", type: "select", group: "Basic", options: [
          { value: "Mega Logistics", label: "Mega Logistics" },
          { value: "Mega Trucking", label: "Mega Trucking" },
        ]},
        { key: "loadNo", label: "Load No", type: "input", group: "Basic", placeholder: "Search load..." },
        { key: "customer", label: "Customer", type: "input", group: "Basic", placeholder: "Search customer..." },
        { key: "failureType", label: "Failure Type", type: "select", group: "Basic", options: [
          { value: "pod_missing", label: "POD Missing" },
          { value: "pod_illegible", label: "POD Not Legible" },
          { value: "weight_mismatch", label: "Weight Mismatch" },
          { value: "amount_mismatch", label: "Amount Mismatch" },
        ]},
      ],
    },
  ];

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
          { value: "Invoiced", label: "Invoiced" },
          { value: "Paid", label: "Paid" },
          { value: "Partial", label: "Partial" },
          { value: "Overdue", label: "Overdue" },
          { value: "Cancelled", label: "Cancelled" },
        ]},
        { key: "invoiceType", label: "Type", type: "select", group: "Basic", options: [
          { value: "summary", label: "Summary" },
          { value: "per-load", label: "Per-Load" },
        ]},
        { key: "cadence", label: "Cadence", type: "select", group: "Basic", options: [
          { value: "manual", label: "Manual" },
          { value: "immediate", label: "Immediate" },
          { value: "daily", label: "Daily" },
          { value: "weekly", label: "Weekly" },
          { value: "monthly", label: "Monthly" },
        ]},
        { key: "dateRange", label: "Date Range", type: "daterange", group: "Basic" },
      ],
    },
  ];

  const internalBillingFilterGroups = [
    {
      name: "Basic",
      filters: [
        { key: "customer", label: "Customer", type: "select", group: "Basic", options: [
          { value: "Mega Logistics", label: "Mega Logistics" },
          { value: "Mega Trucking", label: "Mega Trucking" },
        ]},
        { key: "billingUnit", label: "Billing Unit", type: "select", group: "Basic", options: [
          { value: "Mega Logistics", label: "Mega Logistics" },
          { value: "Mega Trucking", label: "Mega Trucking" },
        ]},
        { key: "status", label: "Status", type: "select", group: "Basic", options: [
          { value: "Invoiced", label: "Invoiced" },
          { value: "Paid", label: "Paid" },
        ]},
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Handle Re-run Automation
  const handleRerunAutomation = async () => {
    setShowRerunConfirmDialog(false);
    setIsRerunning(true);
    setRerunProgress({ step: 1, total: 4, message: "Scanning scheduled customers..." });

    // Simulate step 1: Scanning customers
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRerunProgress({ step: 2, total: 4, message: "Validating pending loads..." });

    // Simulate step 2: Validating loads
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRerunProgress({ step: 3, total: 4, message: "Generating invoices..." });

    // Simulate step 3: Generating invoices
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRerunProgress({ step: 4, total: 4, message: "Finalizing and syncing..." });

    // Simulate step 4: Finalizing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Set mock result
    setRerunResult({
      success: true,
      customersProcessed: 5,
      invoicesGenerated: 12, // 2 Summary + 10 Per-Load (5+2+3)
      loadsProcessed: 19,
      skipped: 2,
      errors: 0,
      details: [
        { customer: "Martin Marietta Materials", status: "created", invoiceNo: "INV-2025-0043", loads: 4, invoiceType: "Summary" },
        { customer: "CH Robinson", status: "created", invoiceNo: "5 invoices", loads: 5, invoiceType: "Per-Load" },
        { customer: "TQL Logistics", status: "created", invoiceNo: "INV-2025-0044", loads: 3, invoiceType: "Summary" },
        { customer: "Coyote Logistics", status: "partial", invoiceNo: "2 invoices", loads: 4, invoiceType: "Per-Load", failed: 2, reason: "Validation failed" },
        { customer: "XPO Logistics", status: "created", invoiceNo: "3 invoices", loads: 3, invoiceType: "Per-Load" },
      ],
    });

    setIsRerunning(false);
    setShowRerunResultDialog(true);
  };

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

  const handleSelectAll = (data) => (checked) => {
    if (checked) {
      setSelectedRows(data.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleCreateInvoice = async (loadIds) => {
    setIsCreatingInvoice(true);
    setInvoiceCreationStatus("processing");

    // Simulate async invoice creation
    setTimeout(() => {
      setInvoiceCreationStatus("success");
      setTimeout(() => {
        setShowBatchInvoiceDialog(false);
        setSelectedRows([]);
        setIsCreatingInvoice(false);
        setInvoiceCreationStatus(null);
        setActiveTab("invoiced");
      }, 1500);
    }, 2000);
  };

  const handleRetriggerValidation = (loadId) => {
    console.log("Re-triggering validation for load:", loadId);
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
    handleCreateInvoice(selectedLoadsForInvoice);
    setShowCreateInvoiceDialog(false);
    setCreateInvoiceType("");
    setSelectedLoadsForInvoice([]);
    setExpandedCustomers([]);
  };

  // Group ready to invoice loads by customer
  const loadsByCustomer = readyToInvoiceData.reduce((acc, row) => {
    if (!acc[row.customerId]) {
      acc[row.customerId] = { customer: row.customer, customerId: row.customerId, loads: [], total: 0 };
    }
    acc[row.customerId].loads.push(row);
    acc[row.customerId].total += row.totalCharges;
    return acc;
  }, {});

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

  const toggleCustomerExpanded = (customerId) => {
    if (expandedCustomers.includes(customerId)) {
      setExpandedCustomers(expandedCustomers.filter((id) => id !== customerId));
    } else {
      setExpandedCustomers([...expandedCustomers, customerId]);
    }
  };

  const isCustomerFullySelected = (customerId) => {
    const customerLoads = loadsByCustomer[customerId]?.loads || [];
    return customerLoads.length > 0 && customerLoads.every((load) => selectedLoadsForInvoice.includes(load.id));
  };

  const isCustomerPartiallySelected = (customerId) => {
    const customerLoads = loadsByCustomer[customerId]?.loads || [];
    const selectedCount = customerLoads.filter((load) => selectedLoadsForInvoice.includes(load.id)).length;
    return selectedCount > 0 && selectedCount < customerLoads.length;
  };

  const handleSelectCustomerLoads = (customerId, checked) => {
    const customerLoads = loadsByCustomer[customerId]?.loads || [];
    const customerLoadIds = customerLoads.map((load) => load.id);

    if (checked) {
      const newSelections = customerLoadIds.filter((id) => !selectedLoadsForInvoice.includes(id));
      setSelectedLoadsForInvoice([...selectedLoadsForInvoice, ...newSelections]);
    } else {
      setSelectedLoadsForInvoice(selectedLoadsForInvoice.filter((id) => !customerLoadIds.includes(id)));
    }
  };

  // Status badges - Industry standard
  const getStatusBadge = (status) => {
    const statusConfig = {
      Invoiced: { color: "bg-blue-500/10 text-blue-700 border-blue-500/50", icon: <FileText className="size-3 mr-1" /> },
      "Paid": { color: "bg-green-500/10 text-green-700 border-green-500/50", icon: <CheckCircle2Icon className="size-3 mr-1" /> },
      Partial: { color: "bg-amber-500/10 text-amber-700 border-amber-500/50", icon: <ClockIcon className="size-3 mr-1" /> },
      Overdue: { color: "bg-red-500/10 text-red-700 border-red-500/50", icon: <AlertCircleIcon className="size-3 mr-1" /> },
      Cancelled: { color: "bg-gray-500/10 text-gray-700 border-gray-500/50", icon: <BanIcon className="size-3 mr-1" /> },
    };
    const config = statusConfig[status] || statusConfig.Invoiced;
    return (
      <Badge className={config.color}>
        {config.icon}
        {status}
      </Badge>
    );
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

  const getCadenceBadge = (cadence) => {
    const cadenceLabels = {
      manual: "Manual",
      immediate: "Immediate",
      daily: "Daily",
      weekly: "Weekly",
      monthly: "Monthly",
    };
    return (
      <Badge variant="outline" className="text-xs">
        {cadenceLabels[cadence] || cadence}
      </Badge>
    );
  };

  const getQbSyncCell = (invoice) => {
    const { qbSyncStatus, qbInvoiceId, qbInvoiceUrl } = invoice;
    if (qbSyncStatus === "synced" && qbInvoiceUrl) {
      return (
        <div className="flex items-center gap-1">
          <Badge className="bg-green-500/10 text-green-700 border-green-500/50">
            <CheckCircle2Icon className="size-3 mr-1" />
            Synced
          </Badge>
          <a
            href={qbInvoiceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 p-1"
          >
            <ExternalLinkIcon className="size-3" />
          </a>
        </div>
      );
    }
    if (qbSyncStatus === "pending") {
      return (
        <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/50">
          <ClockIcon className="size-3 mr-1" />
          Pending
        </Badge>
      );
    }
    if (qbSyncStatus === "failed") {
      return (
        <div className="flex items-center gap-1">
          <Badge className="bg-red-500/10 text-red-700 border-red-500/50">
            <XCircleIcon className="size-3 mr-1" />
            Failed
          </Badge>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <RefreshCwIcon className="size-3" />
          </Button>
        </div>
      );
    }
    return <span className="text-muted-foreground text-sm">—</span>;
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
    if (status === "Paid" || status === "Cancelled") return null;
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
          onCheckedChange={handleSelectAll(readyToInvoiceData)}
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
              <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/history/load-details?id=${load.loadNo}&mode=view`)}>
                <EyeIcon className="h-4 w-4 mr-2" />
                View Load
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
      cell: ({ row }) => (
        <button
          onClick={() => navigate(`/app/carrier-portal/orders/bulk/history/load-details?id=${row.getValue("loadNo")}&mode=view`)}
          className="font-mono text-sm font-medium text-primary hover:underline"
        >
          {row.getValue("loadNo")}
        </button>
      ),
    },
    {
      accessorKey: "customer",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("customer")}</span>
      ),
    },
    {
      accessorKey: "invoiceType",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Invoice Type" />,
      cell: ({ row }) => {
        const type = row.getValue("invoiceType");
        const isPerLoad = type === "per-load";
        return (
          <Badge
            className={
              isPerLoad
                ? "bg-blue-500/10 text-blue-700 border-blue-500/50"
                : "bg-purple-500/10 text-purple-700 border-purple-500/50"
            }
          >
            {isPerLoad ? (
              <><Truck className="size-3 mr-1" /> Per-Load</>
            ) : (
              <><FileStack className="size-3 mr-1" /> Summary</>
            )}
          </Badge>
        );
      },
    },
    {
      accessorKey: "customerCadence",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Cadence" />,
      cell: ({ row }) => getCadenceBadge(row.getValue("customerCadence")),
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
      accessorKey: "completedDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Completed" />,
      cell: ({ row }) => formatDate(row.getValue("completedDate")),
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
  ];

  // Check Failed columns
  const checkFailedColumns = [
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
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleRetriggerValidation(load.id)}>
                <RefreshCwIcon className="h-4 w-4 mr-2" />
                Re-trigger Validation
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  // Manual invoice override - skip validation and invoice immediately
                  console.log("Manual invoice override for load:", load.loadNo);
                }}
                className="text-amber-600"
              >
                <ZapIcon className="h-4 w-4 mr-2" />
                Invoice Now (Override)
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
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <button
            onClick={() => navigate(`/app/carrier-portal/orders/bulk/complete/load-details?id=${row.getValue("loadNo")}&mode=view`)}
            className="font-mono text-sm font-medium text-primary hover:underline text-left"
          >
            {row.getValue("loadNo")}
          </button>
          {row.original.missedScheduledCycle && (
            <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-700 border-amber-500/50 w-fit">
              <ClockIcon className="size-2.5 mr-1" />
              Missed {row.original.missedCycleCount} cycle{row.original.missedCycleCount > 1 ? "s" : ""}
            </Badge>
          )}
        </div>
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
      accessorKey: "subStatus",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Resolution Status" />,
      cell: ({ row }) => {
        const subStatus = row.getValue("subStatus");
        const statusConfig = {
          "Pending Resolution": { color: "bg-red-500/10 text-red-700 border-red-500/50", icon: CircleAlertIcon },
          "Awaiting Re-Check": { color: "bg-blue-500/10 text-blue-700 border-blue-500/50", icon: RotateCwIcon },
        };
        const config = statusConfig[subStatus] || statusConfig["Pending Resolution"];
        const Icon = config.icon;
        return (
          <Badge variant="outline" className={`text-xs ${config.color}`}>
            <Icon className="size-3 mr-1" />
            {subStatus}
          </Badge>
        );
      },
    },
    {
      accessorKey: "completedDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Completed" />,
      cell: ({ row }) => formatDate(row.getValue("completedDate")),
    },
    {
      accessorKey: "nextScheduledRun",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Next Cycle" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-sm">
          <CalendarIcon className="size-3.5 text-muted-foreground" />
          <span>{formatDate(row.getValue("nextScheduledRun"))}</span>
        </div>
      ),
    },
    {
      accessorKey: "totalCharges",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
      cell: ({ row }) => <span className="font-medium">{formatCurrency(row.getValue("totalCharges"))}</span>,
    },
    {
      accessorKey: "validation",
      header: ({ column }) => (
        <div className="flex items-center gap-1.5">
          <SparklesIcon className="size-4 text-purple-500" />
          <DataTableColumnHeader column={column} title="Validation Issues" />
        </div>
      ),
      cell: ({ row }) => {
        const validation = row.original.validation;
        return (
          <button
            onClick={() => {
              setSelectedLoadForValidation(row.original);
              setValidationDetailsOpen(true);
            }}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <Badge variant="outline" className="text-xs bg-red-500/10 text-red-700 border-red-500/50">
              <AlertTriangleIcon className="size-3 mr-1" />
              {validation.failureReasons.length} issue{validation.failureReasons.length > 1 ? "s" : ""}
            </Badge>
            <span className="text-xs text-blue-600 hover:underline">
              View
            </span>
          </button>
        );
      },
    },
  ];

  // Scheduled Today - Alternative Simple Table Columns
  const scheduledTodaySimpleColumns = [
    {
      accessorKey: "customer",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
      cell: ({ row }) => (
        <div>
          <span className="font-medium">{row.getValue("customer")}</span>
          <p className="text-xs text-muted-foreground">{row.original.customerId}</p>
        </div>
      ),
    },
    {
      accessorKey: "billingFrequency",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Frequency" />,
      cell: ({ row }) => <Badge variant="outline">{row.getValue("billingFrequency")}</Badge>,
    },
    {
      accessorKey: "invoiceType",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => <Badge variant="outline">{row.getValue("invoiceType")}</Badge>,
    },
    {
      accessorKey: "loadsReady",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Loads" />,
      cell: ({ row }) => <span className="font-medium">{row.getValue("loadsReady")}</span>,
    },
    {
      accessorKey: "totalAmount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
      cell: ({ row }) => <span className="font-bold">{formatCurrency(row.getValue("totalAmount"))}</span>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.getValue("status");
        const schedule = row.original;
        if (status === "Created") {
          return (
            <Badge className="bg-green-500/10 text-green-700 border-green-500/50">
              <CheckCircle2Icon className="size-3 mr-1" />
              Created
            </Badge>
          );
        }
        if (status === "Pending") {
          return (
            <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/50">
              <ClockIcon className="size-3 mr-1" />
              Pending
            </Badge>
          );
        }
        if (status === "Partial") {
          return (
            <Badge className="bg-orange-500/10 text-orange-700 border-orange-500/50">
              <CircleAlertIcon className="size-3 mr-1" />
              Partial
            </Badge>
          );
        }
        return (
          <Badge className="bg-red-500/10 text-red-700 border-red-500/50">
            <XCircleIcon className="size-3 mr-1" />
            Failed
          </Badge>
        );
      },
    },
    {
      accessorKey: "invoiceNo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Invoice #" />,
      cell: ({ row }) => {
        const schedule = row.original;
        if (schedule.invoiceType === "Summary" && schedule.invoiceNo) {
          return (
            <button
              onClick={() => navigate(`/app/carrier-portal/billing/invoices/${schedule.invoiceNo}`)}
              className="font-mono text-sm text-primary hover:underline"
            >
              {schedule.invoiceNo}
            </button>
          );
        }
        if (schedule.invoiceType === "Per-Load" && schedule.invoiceCount > 0) {
          return (
            <button
              onClick={() => {
                setSelectedCustomerForInvoices(schedule);
                setShowPerLoadInvoicesDialog(true);
              }}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              <FileStack className="size-3" />
              {schedule.invoiceCount} invoice{schedule.invoiceCount > 1 ? "s" : ""}
            </button>
          );
        }
        return <span className="text-muted-foreground">—</span>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      size: 100,
      cell: ({ row }) => {
        const schedule = row.original;
        if (schedule.status === "Pending") {
          return (
            <Button size="sm" className="h-7 text-xs bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
              <PlusIcon className="size-3 mr-1" />
              Generate
            </Button>
          );
        }
        if (schedule.status === "Partial") {
          return (
            <Button size="sm" variant="outline" className="h-7 text-xs">
              <RefreshCwIcon className="size-3 mr-1" />
              Retry
            </Button>
          );
        }
        return null;
      },
      enableSorting: false,
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
              {invoice.status !== "Cancelled" && invoice.status !== "Paid" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <MailIcon className="h-4 w-4 mr-2" />
                    Send to Customer
                  </DropdownMenuItem>
                </>
              )}
              {invoice.qbInvoiceUrl && (
                <DropdownMenuItem asChild>
                  <a href={invoice.qbInvoiceUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLinkIcon className="h-4 w-4 mr-2" />
                    View in QuickBooks
                  </a>
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
      cell: ({ row }) => getStatusBadge(row.getValue("status")),
    },
    {
      accessorKey: "pdfStatus",
      header: ({ column }) => <DataTableColumnHeader column={column} title="PDF" />,
      cell: ({ row }) => getPdfStatusCell(row.original),
    },
  ];

  // Internal Billing columns
  const internalBillingColumns = [
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
              <DropdownMenuItem>
                <EyeIcon className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/history/load-details?id=${invoice.loadNo}&mode=view`)}>
                <Truck className="h-4 w-4 mr-2" />
                View Load
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "internalInvoiceNo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Internal Invoice #" />,
      cell: ({ row }) => <span className="font-mono text-sm font-medium">{row.getValue("internalInvoiceNo")}</span>,
    },
    {
      accessorKey: "customer",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer (Internal)" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Building2Icon className="size-4 text-muted-foreground" />
          <span className="font-medium">{row.getValue("customer")}</span>
        </div>
      ),
    },
    {
      accessorKey: "billingUnit",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Billing Unit" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Building2Icon className="size-4 text-muted-foreground" />
          <span className="text-sm">{row.getValue("billingUnit")}</span>
        </div>
      ),
    },
    {
      accessorKey: "loadNo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Load #" />,
      cell: ({ row }) => (
        <button
          onClick={() => navigate(`/app/carrier-portal/orders/bulk/complete/load-details?id=${row.getValue("loadNo")}&mode=view`)}
          className="font-mono text-sm text-primary hover:underline"
        >
          {row.getValue("loadNo")}
        </button>
      ),
    },
    {
      accessorKey: "externalInvoiceNo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="External Invoice #" />,
      cell: ({ row }) => {
        const extInvoiceNo = row.getValue("externalInvoiceNo");
        return extInvoiceNo ? (
          <button
            onClick={() => navigate(`/app/carrier-portal/billing/invoices/${extInvoiceNo}`)}
            className="font-mono text-sm text-primary hover:underline flex items-center gap-1"
          >
            {extInvoiceNo}
            <ExternalLinkIcon className="size-3" />
          </button>
        ) : (
          <span className="text-muted-foreground">—</span>
        );
      },
    },
    {
      accessorKey: "cadence",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Cadence" />,
      cell: ({ row }) => {
        const cadence = row.getValue("cadence");
        return (
          <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/50">
            <ZapIcon className="size-3 mr-1" />
            Immediate
          </Badge>
        );
      },
    },
    {
      accessorKey: "invoiceDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
      cell: ({ row }) => formatDate(row.getValue("invoiceDate")),
    },
    {
      accessorKey: "totalAmount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
      cell: ({ row }) => <span className="font-bold">{formatCurrency(row.getValue("totalAmount"))}</span>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => getStatusBadge(row.getValue("status")),
    },
  ];

  // Calculate summary stats
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

  const totalInvoiced = invoicesData.filter(inv => inv.status !== "Cancelled").reduce((sum, inv) => sum + inv.totalAmount, 0);
  const totalPaid = invoicesData.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const totalUnpaid = invoicesData.filter(inv => inv.status !== "Cancelled").reduce((sum, inv) => sum + inv.balanceDue, 0);
  const overdueCount = invoicesData.filter((inv) => inv.status === "Overdue").length;

  // Scheduled Today filter groups
  const scheduledTodayFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "customer",
          label: "Customer",
          type: "input",
          group: "Basic",
          placeholder: "Search customer...",
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "Created", label: "Created" },
            { value: "Pending", label: "Pending" },
            { value: "Partial", label: "Partial" },
            { value: "Failed", label: "Failed" },
          ],
        },
        {
          key: "billingFrequency",
          label: "Frequency",
          type: "select",
          group: "Basic",
          options: [
            { value: "Immediate", label: "Immediate" },
            { value: "Weekly", label: "Weekly" },
            { value: "Monthly", label: "Monthly" },
            { value: "Manual", label: "Manual" },
          ],
        },
      ],
    },
  ];

  const getFilterGroupsForTab = () => {
    switch (activeTab) {
      case "scheduled-today":
        return scheduledTodayFilterGroups;
      case "ready-to-invoice":
        return readyToInvoiceFilterGroups;
      case "check-failed":
        return checkFailedFilterGroups;
      case "invoiced":
        return invoicesFilterGroups;
      case "internal-billing":
        return internalBillingFilterGroups;
      default:
        return readyToInvoiceFilterGroups;
    }
  };

  // Handle UI variant change - switch to appropriate tab when hiding
  const handleUIVariantChange = (variant) => {
    setScheduledTodayUIVariant(variant);
    if (variant === "hidden" && activeTab === "scheduled-today") {
      setActiveTab("ready-to-invoice");
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* UI Variant Selector - For Demo/Testing (Subtle) */}
      <div className="flex-shrink-0 px-6 pt-3 flex justify-end">
        <Select value={scheduledTodayUIVariant} onValueChange={handleUIVariantChange}>
          <SelectTrigger className="h-6 w-[110px] text-[10px] text-muted-foreground border-dashed">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current" className="text-xs">Detailed</SelectItem>
            <SelectItem value="alternative" className="text-xs">Simple</SelectItem>
            <SelectItem value="hidden" className="text-xs">Hidden</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="flex-shrink-0 px-6 py-4">
        <div className={`grid gap-4 ${scheduledTodayUIVariant === "hidden" ? "grid-cols-4" : "grid-cols-5"}`}>
          {/* Scheduled Today Card - Conditionally rendered */}
          {/* Check Failed - FIRST (Exception-driven workflow) */}
          <button
            onClick={() => setActiveTab("check-failed")}
            className={`border rounded-lg p-4 bg-card text-left transition-all hover:shadow-md ${activeTab === "check-failed" ? "ring-2 ring-red-500" : ""}`}
          >
            <div className="flex items-center gap-2 text-red-600 mb-1">
              <AlertTriangleIcon className="size-4" />
              <span className="text-xs font-medium">Check Failed</span>
            </div>
            <p className="text-2xl font-bold text-red-600">{checkFailedData.length}</p>
          </button>
          {/* Ready to Invoice */}
          <button
            onClick={() => setActiveTab("ready-to-invoice")}
            className={`border rounded-lg p-4 bg-card text-left transition-all hover:shadow-md ${activeTab === "ready-to-invoice" ? "ring-2 ring-orange-500" : ""}`}
          >
            <div className="flex items-center gap-2 text-orange-600 mb-1">
              <PackageIcon className="size-4" />
              <span className="text-xs font-medium">Ready to Invoice</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">{readyToInvoiceData.length}</p>
          </button>
          {/* Scheduled Today Card - Conditionally rendered */}
          {scheduledTodayUIVariant !== "hidden" && (
            <button
              onClick={() => setActiveTab("scheduled-today")}
              className={`border rounded-lg p-4 bg-card text-left transition-all hover:shadow-md ${activeTab === "scheduled-today" ? "ring-2 ring-emerald-500" : ""}`}
            >
              <div className="flex items-center gap-2 text-emerald-600 mb-1">
                <CalendarCheckIcon className="size-4" />
                <span className="text-xs font-medium">Scheduled Today</span>
              </div>
              <p className="text-2xl font-bold text-emerald-600">{scheduledStats.expected}</p>
            </button>
          )}
          <button
            onClick={() => setActiveTab("invoiced")}
            className={`border rounded-lg p-4 bg-card text-left transition-all hover:shadow-md ${activeTab === "invoiced" ? "ring-2 ring-blue-500" : ""}`}
          >
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <FileText className="size-4" />
              <span className="text-xs font-medium">Invoiced</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{invoicesData.filter(i => i.status !== "Cancelled").length}</p>
          </button>
          <button
            onClick={() => setActiveTab("internal-billing")}
            className={`border rounded-lg p-4 bg-card text-left transition-all hover:shadow-md ${activeTab === "internal-billing" ? "ring-2 ring-purple-500" : ""}`}
          >
            <div className="flex items-center gap-2 text-purple-600 mb-1">
              <Building2Icon className="size-4" />
              <span className="text-xs font-medium">Internal Billing</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">{internalBillingData.length}</p>
          </button>
        </div>
      </div>

      {/* Filter, Tabs and Actions */}
      <div className="flex-shrink-0 px-6 pb-4">
        <div className="flex items-center justify-between">
          <SmartFilter
            filterGroups={getFilterGroupsForTab()}
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
              {/* Check Failed - FIRST (Exception-driven workflow) */}
              <Button
                variant={activeTab === "check-failed" ? "default" : "ghost"}
                className={`rounded-none text-xs px-3 ${
                  activeTab === "check-failed"
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
                onClick={() => setActiveTab("check-failed")}
              >
                <AlertTriangleIcon className="size-3.5 mr-1.5" />
                Failed
              </Button>
              {/* Ready to Invoice */}
              <Button
                variant={activeTab === "ready-to-invoice" ? "default" : "ghost"}
                className={`rounded-none text-xs px-3 ${
                  activeTab === "ready-to-invoice"
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
                onClick={() => setActiveTab("ready-to-invoice")}
              >
                <PackageIcon className="size-3.5 mr-1.5" />
                Ready
              </Button>
              {/* Scheduled Today Tab Button - Conditionally rendered */}
              {scheduledTodayUIVariant !== "hidden" && (
                <Button
                  variant={activeTab === "scheduled-today" ? "default" : "ghost"}
                  className={`rounded-none text-xs px-3 ${
                    activeTab === "scheduled-today"
                      ? "bg-emerald-500 text-white hover:bg-emerald-600"
                      : "bg-background text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setActiveTab("scheduled-today")}
                >
                  <CalendarCheckIcon className="size-3.5 mr-1.5" />
                  Scheduled
                </Button>
              )}
              <Button
                variant={activeTab === "invoiced" ? "default" : "ghost"}
                className={`rounded-none text-xs px-3 ${
                  activeTab === "invoiced"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
                onClick={() => setActiveTab("invoiced")}
              >
                <FileText className="size-3.5 mr-1.5" />
                Invoiced
              </Button>
              <Button
                variant={activeTab === "internal-billing" ? "default" : "ghost"}
                className={`rounded-none text-xs px-3 ${
                  activeTab === "internal-billing"
                    ? "bg-purple-500 text-white hover:bg-purple-600"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
                onClick={() => setActiveTab("internal-billing")}
              >
                <Building2Icon className="size-3.5 mr-1.5" />
                Internal
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto px-6">
        {/* SCHEDULED TODAY - CURRENT UI VARIANT */}
        {activeTab === "scheduled-today" && scheduledTodayUIVariant === "current" && (
          <div className="space-y-4">
            {/* Header Bar with Date & Automation Status */}
            <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
              {/* Left: Date */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-emerald-500/10">
                  <CalendarIcon className="size-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Invoicing Schedule</p>
                  <p className="text-xl font-bold">{todayFormatted}</p>
                </div>
              </div>

              {/* Center: Quick Stats */}
              <div className="flex items-center gap-6 px-6 border-l border-r">
                <div className="text-center">
                  <p className="text-2xl font-bold">{scheduledStats.expected}</p>
                  <p className="text-xs text-muted-foreground">Expected</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{scheduledStats.created}</p>
                  <p className="text-xs text-muted-foreground">Created</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-600">{scheduledStats.pending}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{scheduledStats.partial}</p>
                  <p className="text-xs text-muted-foreground">Partial</p>
                </div>
              </div>

              {/* Right: Automation Status */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <Badge
                      variant="outline"
                      className={
                        automationStatus.status === "Completed"
                          ? "bg-green-500/10 text-green-700 border-green-500/50"
                          : automationStatus.status === "Running"
                          ? "bg-blue-500/10 text-blue-700 border-blue-500/50"
                          : "bg-red-500/10 text-red-700 border-red-500/50"
                      }
                    >
                      {automationStatus.status === "Completed" && <CheckCircle2Icon className="size-3 mr-1" />}
                      {automationStatus.status === "Running" && <Loader2Icon className="size-3 mr-1 animate-spin" />}
                      {automationStatus.status === "Failed" && <XCircleIcon className="size-3 mr-1" />}
                      {automationStatus.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last run: {new Date(automationStatus.lastRun).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowRerunConfirmDialog(true)}
                  disabled={isRerunning}
                  className="h-9"
                >
                  {isRerunning ? (
                    <>
                      <Loader2Icon className="size-4 mr-2 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <RotateCwIcon className="size-4 mr-2" />
                      Re-run
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Automation Run Summary - Only show if there were issues */}
            {(automationStatus.skipped > 0 || automationStatus.errors > 0) && (
              <div className="flex items-center gap-4 p-3 border rounded-lg bg-amber-50 dark:bg-amber-500/5 border-amber-200 dark:border-amber-500/30">
                <AlertTriangleIcon className="size-5 text-amber-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-400">
                    Last automation run had {automationStatus.skipped > 0 && `${automationStatus.skipped} skipped loads`}
                    {automationStatus.skipped > 0 && automationStatus.errors > 0 && " and "}
                    {automationStatus.errors > 0 && `${automationStatus.errors} errors`}
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-500">
                    {automationStatus.invoicesGenerated} invoices generated from {automationStatus.loadsProcessed} loads processed
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-amber-700 hover:text-amber-800 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-500/10"
                  onClick={() => setActiveTab("check-failed")}
                >
                  View Issues
                  <ChevronRightIcon className="size-4 ml-1" />
                </Button>
              </div>
            )}

            {/* Scheduled Customers Table */}
            <div className="border rounded-lg bg-card">
              <div className="px-4 py-3 border-b bg-muted/50 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Customers Scheduled for Today</h3>
                <span className="text-xs text-muted-foreground">
                  {scheduledTodayData.length} customer{scheduledTodayData.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="divide-y">
                {scheduledTodayData
                  .slice((scheduledPage - 1) * scheduledPageSize, scheduledPage * scheduledPageSize)
                  .map((schedule) => {
                  const isExpanded = expandedScheduledCustomers.includes(schedule.id);
                  const toggleExpanded = () => {
                    setExpandedScheduledCustomers(prev =>
                      prev.includes(schedule.id)
                        ? prev.filter(id => id !== schedule.id)
                        : [...prev, schedule.id]
                    );
                  };

                  return (
                    <div key={schedule.id}>
                      {/* Customer Row */}
                      <div
                        className="px-4 py-3 flex items-center gap-4 hover:bg-muted/30 cursor-pointer"
                        onClick={toggleExpanded}
                      >
                        <button className="text-muted-foreground hover:text-foreground">
                          {isExpanded ? (
                            <ChevronDownIcon className="size-4" />
                          ) : (
                            <ChevronRightIcon className="size-4" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{schedule.customer}</span>
                            <Badge variant="outline" className="text-xs">
                              {schedule.billingFrequency}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {schedule.invoiceType}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {schedule.customerId} · Last invoiced: {formatDate(schedule.lastInvoiceDate)}
                          </p>
                        </div>

                        <div className="text-center px-4">
                          <p className="text-sm font-bold">{schedule.loadsReady}</p>
                          <p className="text-xs text-muted-foreground">Loads</p>
                        </div>

                        <div className="text-center px-4">
                          <p className="text-sm font-bold">{formatCurrency(schedule.totalAmount)}</p>
                          <p className="text-xs text-muted-foreground">Total</p>
                        </div>

                        <div className="w-24">
                          {schedule.status === "Created" && (
                            <Badge className="bg-green-500/10 text-green-700 border-green-500/50 w-full justify-center">
                              <CheckCircle2Icon className="size-3 mr-1" />
                              Created
                            </Badge>
                          )}
                          {schedule.status === "Pending" && (
                            <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/50 w-full justify-center">
                              <ClockIcon className="size-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                          {schedule.status === "Partial" && (
                            <Badge className="bg-orange-500/10 text-orange-700 border-orange-500/50 w-full justify-center">
                              <CircleAlertIcon className="size-3 mr-1" />
                              Partial
                            </Badge>
                          )}
                          {schedule.status === "Failed" && (
                            <Badge className="bg-red-500/10 text-red-700 border-red-500/50 w-full justify-center">
                              <XCircleIcon className="size-3 mr-1" />
                              Failed
                            </Badge>
                          )}
                        </div>

                        <div className="w-36 text-right">
                          {/* Summary Invoice - Single Invoice Number */}
                          {schedule.invoiceType === "Summary" && schedule.invoiceNo && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/app/carrier-portal/billing/invoices/${schedule.invoiceNo}`);
                              }}
                              className="font-mono text-sm text-primary hover:underline"
                            >
                              {schedule.invoiceNo}
                            </button>
                          )}

                          {/* Per-Load Invoice - Show Invoice Count */}
                          {schedule.invoiceType === "Per-Load" && schedule.invoiceCount > 0 && (
                            <Badge variant="outline" className="font-normal">
                              <FileStack className="size-3 mr-1" />
                              {schedule.invoiceCount} invoice{schedule.invoiceCount > 1 ? "s" : ""}
                            </Badge>
                          )}

                          {/* Pending - Show Generate Button */}
                          {schedule.status === "Pending" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle generate invoice
                              }}
                            >
                              <PlusIcon className="size-3 mr-1" />
                              Generate
                            </Button>
                          )}

                          {/* Per-Load Partial with no invoices yet */}
                          {schedule.invoiceType === "Per-Load" && schedule.status === "Partial" && schedule.invoiceCount === 0 && (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </div>
                      </div>

                      {/* Expanded Loads */}
                      {isExpanded && (
                        <div className="bg-muted/20 border-t">
                          {/* Header - Different columns based on invoice type */}
                          <div className="px-4 py-2 grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground border-b bg-muted/30">
                            <div className="col-span-3 pl-8">Load #</div>
                            <div className="col-span-2">Amount</div>
                            <div className="col-span-2">Status</div>
                            {schedule.invoiceType === "Per-Load" ? (
                              <div className="col-span-3">Invoice #</div>
                            ) : (
                              <div className="col-span-3">—</div>
                            )}
                            <div className="col-span-2">Notes</div>
                          </div>
                          {schedule.loads.map((load, idx) => (
                            <div key={idx} className="px-4 py-2 grid grid-cols-12 gap-2 text-sm border-b last:border-b-0 items-center">
                              <div className="col-span-3 pl-8">
                                <button
                                  onClick={() => navigate(`/app/carrier-portal/orders/bulk/history/load-details?id=${load.loadNo}&mode=view`)}
                                  className="font-mono text-xs text-primary hover:underline"
                                >
                                  {load.loadNo}
                                </button>
                              </div>
                              <div className="col-span-2 font-medium">{formatCurrency(load.amount)}</div>
                              <div className="col-span-2">
                                {load.status === "Invoiced" && (
                                  <span className="inline-flex items-center gap-1 text-green-600 text-xs">
                                    <CheckCircle2Icon className="size-3" />
                                    Invoiced
                                  </span>
                                )}
                                {load.status === "Ready" && (
                                  <span className="inline-flex items-center gap-1 text-amber-600 text-xs">
                                    <ClockIcon className="size-3" />
                                    Ready
                                  </span>
                                )}
                                {load.status === "Failed" && (
                                  <span className="inline-flex items-center gap-1 text-red-600 text-xs">
                                    <XCircleIcon className="size-3" />
                                    Failed
                                  </span>
                                )}
                              </div>
                              <div className="col-span-3">
                                {schedule.invoiceType === "Per-Load" && load.invoiceNo ? (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(`/app/carrier-portal/billing/invoices/${load.invoiceNo}`);
                                    }}
                                    className="font-mono text-xs text-primary hover:underline"
                                  >
                                    {load.invoiceNo}
                                  </button>
                                ) : schedule.invoiceType === "Per-Load" ? (
                                  <span className="text-xs text-muted-foreground">—</span>
                                ) : (
                                  <span className="text-xs text-muted-foreground">—</span>
                                )}
                              </div>
                              <div className="col-span-2 text-xs text-muted-foreground">
                                {load.failureReason || "—"}
                              </div>
                            </div>
                          ))}
                          {schedule.status === "Partial" && (
                            <div className="px-4 py-2 bg-muted/30 flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {schedule.loadsInvoiced} of {schedule.loadsReady} loads invoiced
                              </span>
                              <Button size="sm" variant="outline" className="h-7 text-xs">
                                <RefreshCwIcon className="size-3 mr-1" />
                                Retry Failed Loads
                              </Button>
                            </div>
                          )}
                          {schedule.status === "Pending" && (
                            <div className="px-4 py-2 bg-muted/30 flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {schedule.loadsReady} loads ready to invoice
                              </span>
                              <Button size="sm" className="h-7 text-xs bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
                                <PlusIcon className="size-3 mr-1" />
                                Generate Invoice
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Pagination - matching DataTable pattern */}
              {scheduledTodayData.length > scheduledPageSize && (() => {
                const totalPages = Math.ceil(scheduledTodayData.length / scheduledPageSize);
                const startItem = (scheduledPage - 1) * scheduledPageSize + 1;
                const endItem = Math.min(scheduledPage * scheduledPageSize, scheduledTodayData.length);

                // Generate page numbers with ellipsis
                const getPageNumbers = () => {
                  const pages = [];
                  const maxVisiblePages = 5;

                  if (totalPages <= maxVisiblePages + 2) {
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    pages.push(1);
                    if (scheduledPage > 3) pages.push("...");
                    const startPage = Math.max(2, scheduledPage - 1);
                    const endPage = Math.min(totalPages - 1, scheduledPage + 1);
                    for (let i = startPage; i <= endPage; i++) {
                      pages.push(i);
                    }
                    if (scheduledPage < totalPages - 2) pages.push("...");
                    if (totalPages > 1) pages.push(totalPages);
                  }
                  return pages;
                };

                return (
                  <div className="flex items-center justify-between px-4 py-1.5 border-t border-border bg-muted">
                    <div className="flex items-center gap-2">
                      {/* First Page */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setScheduledPage(1)}
                        disabled={scheduledPage === 1}
                      >
                        <ChevronsLeftIcon className="h-4 w-4" />
                      </Button>

                      {/* Previous Page */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setScheduledPage(p => Math.max(1, p - 1))}
                        disabled={scheduledPage === 1}
                      >
                        <ChevronLeftIcon className="h-4 w-4" />
                      </Button>

                      {/* Page Numbers */}
                      {getPageNumbers().map((page, index) => {
                        if (page === "...") {
                          return (
                            <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                              ...
                            </span>
                          );
                        }
                        return (
                          <Button
                            key={page}
                            variant={scheduledPage === page ? "default" : "ghost"}
                            size="sm"
                            className={
                              scheduledPage === page
                                ? "h-8 w-8 bg-accent hover:bg-accent/80 text-accent-foreground"
                                : "h-8 w-8"
                            }
                            onClick={() => setScheduledPage(page)}
                          >
                            {page}
                          </Button>
                        );
                      })}

                      {/* Next Page */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setScheduledPage(p => Math.min(totalPages, p + 1))}
                        disabled={scheduledPage === totalPages}
                      >
                        <ChevronRightIcon className="h-4 w-4" />
                      </Button>

                      {/* Last Page */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setScheduledPage(totalPages)}
                        disabled={scheduledPage === totalPages}
                      >
                        <ChevronsRightIcon className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Right Side - Item range */}
                    <span className="text-sm text-muted-foreground">
                      {startItem} - {endItem} of {scheduledTodayData.length} items
                    </span>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* SCHEDULED TODAY - ALTERNATIVE UI VARIANT (Simple Table) */}
        {activeTab === "scheduled-today" && scheduledTodayUIVariant === "alternative" && (
          <div className="space-y-4">
            {/* Simple Header Bar */}
            <div className="flex items-center justify-between p-3 border rounded-lg bg-card">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{todayFormatted}</span>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-4 text-sm">
                  <span><span className="font-bold">{scheduledStats.expected}</span> total</span>
                  <span className="text-green-600"><span className="font-bold">{scheduledStats.created}</span> created</span>
                  <span className="text-amber-600"><span className="font-bold">{scheduledStats.pending}</span> pending</span>
                  {scheduledStats.partial > 0 && (
                    <span className="text-orange-600"><span className="font-bold">{scheduledStats.partial}</span> partial</span>
                  )}
                </div>
                {automationStatus.skipped > 0 && (
                  <>
                    <div className="h-4 w-px bg-border" />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-amber-600 hover:text-amber-700 h-7 text-xs"
                      onClick={() => setActiveTab("check-failed")}
                    >
                      <AlertTriangleIcon className="size-3 mr-1" />
                      {automationStatus.skipped} skipped
                    </Button>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={
                    automationStatus.status === "Completed"
                      ? "bg-green-500/10 text-green-700 border-green-500/50"
                      : "bg-blue-500/10 text-blue-700 border-blue-500/50"
                  }
                >
                  {automationStatus.status === "Completed" && <CheckCircle2Icon className="size-3 mr-1" />}
                  {automationStatus.status}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowRerunConfirmDialog(true)}
                  disabled={isRerunning}
                  className="h-8"
                >
                  {isRerunning ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : (
                    <RotateCwIcon className="size-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Simple DataTable */}
            <DataTable
              columns={scheduledTodaySimpleColumns}
              data={scheduledTodayData}
              showViewOptions={false}
              pageSize={10}
            />
          </div>
        )}

        {activeTab === "ready-to-invoice" && (
          <DataTable columns={readyToInvoiceColumns} data={readyToInvoiceData} showViewOptions={false} pageSize={10} />
        )}

        {activeTab === "check-failed" && (
          <DataTable columns={checkFailedColumns} data={checkFailedData} showViewOptions={false} pageSize={10} />
        )}

        {activeTab === "invoiced" && (
          <DataTable columns={invoiceColumns} data={invoicesData} showViewOptions={false} pageSize={10} />
        )}

        {activeTab === "internal-billing" && (
          <DataTable columns={internalBillingColumns} data={internalBillingData} showViewOptions={false} pageSize={10} />
        )}
      </div>

      {/* AI Validation Details Dialog */}
      <Dialog open={validationDetailsOpen} onOpenChange={setValidationDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <XCircleIcon className="size-5" />
              Validation Failed
            </DialogTitle>
          </DialogHeader>
          {selectedLoadForValidation && (
            <div className="space-y-4">
              {/* Load Info */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Load Number</p>
                <p className="font-mono font-medium">{selectedLoadForValidation.loadNo}</p>
              </div>

              {/* Validation Checks */}
              <div className="space-y-2">
                <p className="text-sm font-medium">AI Validation Checks</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Scale className="size-4 text-muted-foreground" />
                      <span className="text-sm">Weight Matches</span>
                    </div>
                    {selectedLoadForValidation.validation?.weightMatches ? (
                      <CheckCircle2Icon className="size-4 text-green-600" />
                    ) : (
                      <XCircleIcon className="size-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <DollarSign className="size-4 text-muted-foreground" />
                      <span className="text-sm">Amount Matches</span>
                    </div>
                    {selectedLoadForValidation.validation?.amountMatches ? (
                      <CheckCircle2Icon className="size-4 text-green-600" />
                    ) : (
                      <XCircleIcon className="size-4 text-red-600" />
                    )}
                  </div>
                </div>
              </div>

              {/* Failure Reasons */}
              {selectedLoadForValidation.validation?.failureReasons?.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-red-600">Failure Reasons</p>
                  <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg">
                    <ul className="space-y-1.5">
                      {selectedLoadForValidation.validation.failureReasons.map((reason, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-red-700 dark:text-red-400">
                          <span className="mt-1.5 size-1.5 rounded-full bg-red-500 flex-shrink-0" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Checked At */}
              {selectedLoadForValidation.validation?.checkedAt && (
                <p className="text-xs text-muted-foreground">
                  Validated at: {new Date(selectedLoadForValidation.validation.checkedAt).toLocaleString()}
                </p>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setValidationDetailsOpen(false)}
              className="w-full"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                {selectedInvoiceForPdf?.qbInvoiceUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={selectedInvoiceForPdf.qbInvoiceUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLinkIcon className="size-4 mr-2" />
                      View in QuickBooks
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Re-run Automation Confirmation Dialog */}
      <AlertDialog open={showRerunConfirmDialog} onOpenChange={setShowRerunConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <RotateCwIcon className="size-5 text-emerald-600" />
              Re-run Invoice Automation
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will trigger the automated invoicing process for today's scheduled customers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4 space-y-3">
            <div className="text-sm font-medium">The automation will:</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2Icon className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                Scan {scheduledStats.pending + scheduledStats.partial} pending/partial customers
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2Icon className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                Validate loads using AI Billing Validation
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2Icon className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                Generate invoices for validated loads
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2Icon className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                Sync to QuickBooks (if enabled)
              </li>
            </ul>

            <div className="p-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-lg">
              <p className="text-sm text-amber-700 dark:text-amber-400 flex items-start gap-2">
                <AlertTriangleIcon className="size-4 mt-0.5 flex-shrink-0" />
                Already invoiced loads will NOT be re-processed
              </p>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRerunAutomation}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <PlayIcon className="size-4 mr-2" />
              Run Automation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Re-run Progress Dialog */}
      <Dialog open={isRerunning} onOpenChange={() => {}}>
        <DialogContent className="max-w-md" hideCloseButton>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Loader2Icon className="size-5 animate-spin text-emerald-600" />
              Running Automation
            </DialogTitle>
          </DialogHeader>

          <div className="py-6 space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{rerunProgress.step} of {rerunProgress.total}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${(rerunProgress.step / rerunProgress.total) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Step */}
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="p-2 bg-emerald-500/10 rounded-full">
                <Loader2Icon className="size-4 animate-spin text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{rerunProgress.message}</p>
                <p className="text-xs text-muted-foreground">Please wait...</p>
              </div>
            </div>

            {/* Steps List */}
            <div className="space-y-2">
              {[
                "Scanning scheduled customers",
                "Validating pending loads",
                "Generating invoices",
                "Finalizing and syncing"
              ].map((step, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  {rerunProgress.step > idx + 1 ? (
                    <CheckCircle2Icon className="size-4 text-green-500" />
                  ) : rerunProgress.step === idx + 1 ? (
                    <Loader2Icon className="size-4 animate-spin text-emerald-500" />
                  ) : (
                    <div className="size-4 rounded-full border-2 border-muted-foreground/30" />
                  )}
                  <span className={rerunProgress.step >= idx + 1 ? "text-foreground" : "text-muted-foreground"}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Re-run Result Dialog */}
      <Dialog open={showRerunResultDialog} onOpenChange={setShowRerunResultDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {rerunResult?.success ? (
                <>
                  <CheckCircle2Icon className="size-5 text-green-600" />
                  Automation Completed
                </>
              ) : (
                <>
                  <XCircleIcon className="size-5 text-red-600" />
                  Automation Failed
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          {rerunResult && (
            <div className="py-4 space-y-4">
              {/* Summary Stats */}
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xl font-bold">{rerunResult.customersProcessed}</p>
                  <p className="text-xs text-muted-foreground">Customers</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xl font-bold text-green-600">{rerunResult.invoicesGenerated}</p>
                  <p className="text-xs text-muted-foreground">Invoices</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xl font-bold">{rerunResult.loadsProcessed}</p>
                  <p className="text-xs text-muted-foreground">Loads</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xl font-bold text-amber-600">{rerunResult.skipped}</p>
                  <p className="text-xs text-muted-foreground">Skipped</p>
                </div>
              </div>

              {/* Details */}
              <div className="border rounded-lg">
                <div className="px-3 py-2 border-b bg-muted/50">
                  <p className="text-sm font-medium">Processing Details</p>
                </div>
                <div className="divide-y">
                  {rerunResult.details.map((detail, idx) => (
                    <div key={idx} className="px-3 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {detail.status === "created" ? (
                          <CheckCircle2Icon className="size-4 text-green-500" />
                        ) : detail.status === "partial" ? (
                          <CircleAlertIcon className="size-4 text-orange-500" />
                        ) : (
                          <XCircleIcon className="size-4 text-red-500" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{detail.customer}</p>
                          <p className="text-xs text-muted-foreground">
                            {detail.loads} loads processed
                            {detail.failed && ` · ${detail.failed} failed`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {detail.invoiceNo && (
                          <button
                            onClick={() => {
                              setShowRerunResultDialog(false);
                              navigate(`/app/carrier-portal/billing/invoices/${detail.invoiceNo}`);
                            }}
                            className="font-mono text-xs text-primary hover:underline"
                          >
                            {detail.invoiceNo}
                          </button>
                        )}
                        {detail.status === "created" && (
                          <Badge className="bg-green-500/10 text-green-700 border-green-500/50 text-xs ml-2">
                            Created
                          </Badge>
                        )}
                        {detail.status === "partial" && (
                          <Badge className="bg-orange-500/10 text-orange-700 border-orange-500/50 text-xs ml-2">
                            Partial
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {rerunResult.skipped > 0 && (
                <div className="p-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-lg">
                  <p className="text-sm text-amber-700 dark:text-amber-400 flex items-start gap-2">
                    <AlertTriangleIcon className="size-4 mt-0.5 flex-shrink-0" />
                    {rerunResult.skipped} loads were skipped due to validation failures. Check the "Check Failed" tab for details.
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRerunResultDialog(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setShowRerunResultDialog(false);
                setActiveTab("check-failed");
              }}
              variant="outline"
            >
              View Failed Loads
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Per-Load Invoices Dialog */}
      <Dialog open={showPerLoadInvoicesDialog} onOpenChange={setShowPerLoadInvoicesDialog}>
        <DialogContent className="sm:max-w-[900px] w-[90vw]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileStack className="size-5" />
              Per-Load Invoices
            </DialogTitle>
          </DialogHeader>

          {selectedCustomerForInvoices && (
            <div className="py-2 space-y-4">
              {/* Customer Info */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{selectedCustomerForInvoices.customer}</p>
                  <p className="text-xs text-muted-foreground">{selectedCustomerForInvoices.customerId}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Total: </span>
                    <span className="font-bold">{formatCurrency(selectedCustomerForInvoices.totalAmount)}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedCustomerForInvoices.invoiceCount} invoice{selectedCustomerForInvoices.invoiceCount > 1 ? "s" : ""} · {selectedCustomerForInvoices.loadsReady} loads
                  </p>
                </div>
              </div>

              {/* Invoice List Table */}
              <div className="border rounded-lg">
                <div className="grid grid-cols-12 gap-2 px-4 py-2 border-b bg-muted/50 text-xs font-medium text-muted-foreground">
                  <div className="col-span-3">Invoice #</div>
                  <div className="col-span-3">Load #</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Actions</div>
                </div>
                <div className="divide-y max-h-[300px] overflow-auto">
                  {selectedCustomerForInvoices.loads?.map((load, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 px-4 py-3 items-center text-sm">
                      <div className="col-span-3">
                        {load.invoiceNo ? (
                          <button
                            onClick={() => {
                              setShowPerLoadInvoicesDialog(false);
                              navigate(`/app/carrier-portal/billing/invoices/${load.invoiceNo}`);
                            }}
                            className="font-mono text-primary hover:underline"
                          >
                            {load.invoiceNo}
                          </button>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </div>
                      <div className="col-span-3">
                        <button
                          onClick={() => {
                            setShowPerLoadInvoicesDialog(false);
                            navigate(`/app/carrier-portal/orders/bulk/history/load-details?id=${load.loadNo}&mode=view`);
                          }}
                          className="font-mono text-xs text-primary hover:underline"
                        >
                          {load.loadNo}
                        </button>
                      </div>
                      <div className="col-span-2 font-medium">
                        {formatCurrency(load.amount)}
                      </div>
                      <div className="col-span-2">
                        {load.status === "Invoiced" && (
                          <Badge className="bg-green-500/10 text-green-700 border-green-500/50 text-xs">
                            <CheckCircle2Icon className="size-3 mr-1" />
                            Invoiced
                          </Badge>
                        )}
                        {load.status === "Ready" && (
                          <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/50 text-xs">
                            <ClockIcon className="size-3 mr-1" />
                            Ready
                          </Badge>
                        )}
                        {load.status === "Failed" && (
                          <Badge className="bg-red-500/10 text-red-700 border-red-500/50 text-xs">
                            <XCircleIcon className="size-3 mr-1" />
                            Failed
                          </Badge>
                        )}
                      </div>
                      <div className="col-span-2">
                        {load.invoiceNo && (
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => {
                                setShowPerLoadInvoicesDialog(false);
                                navigate(`/app/carrier-portal/billing/invoices/${load.invoiceNo}`);
                              }}
                            >
                              <EyeIcon className="size-3.5" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <DownloadIcon className="size-3.5" />
                            </Button>
                          </div>
                        )}
                        {load.status === "Failed" && (
                          <span className="text-xs text-red-600">{load.failureReason}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Footer */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {selectedCustomerForInvoices.loadsInvoiced} of {selectedCustomerForInvoices.loadsReady} loads invoiced
                </span>
                <span className="font-medium">
                  Total Invoiced: {formatCurrency(
                    selectedCustomerForInvoices.loads?.filter(l => l.status === "Invoiced").reduce((sum, l) => sum + l.amount, 0) || 0
                  )}
                </span>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPerLoadInvoicesDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Invoices;
