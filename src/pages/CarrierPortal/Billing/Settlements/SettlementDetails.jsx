import { useState, useCallback } from "react";
import { useParams, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import SmartFilter from "@/components/SmartFilter";
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
  Wallet,
  DownloadIcon,
  TruckIcon,
  History,
  LayoutDashboard,
  CreditCard,
  CheckCircle2Icon,
  PlusCircleIcon,
  MinusCircleIcon,
  SendIcon,
  ArrowRightIcon,
  UserIcon,
  FileTextIcon,
  Edit2Icon,
  ListChecksIcon,
  CheckCircleIcon,
  LockIcon,
  ExternalLinkIcon,
  InfoIcon,
  AlertTriangleIcon,
  FileSpreadsheetIcon,
  UsersIcon,
  ClockIcon,
  Trash2Icon,
} from "lucide-react";

const SettlementDetails = () => {
  const { settlementNo } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "general";
  const statusParam = searchParams.get("status") || "Approved";

  // Determine mode based on URL path - "inbox" for worksheets, "history" for settlements
  const isWorksheetMode = location.pathname.includes("/inbox/");
  const isSettlementMode = !isWorksheetMode;

  const [showAddDeductionSheet, setShowAddDeductionSheet] = useState(false);
  const [showAddReimbursementSheet, setShowAddReimbursementSheet] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  // Worksheet-specific state
  const [showMarkApprovedDialog, setShowMarkApprovedDialog] = useState(false);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [worksheetStatus, setWorksheetStatus] = useState(statusParam === "reviewed" ? "Approved" : "Pending Review");
  const [reviewedTimestamp, setReviewedTimestamp] = useState(statusParam === "reviewed" ? "2026-01-15T14:30:00" : null);

  const [deductionForm, setDeductionForm] = useState({
    type: "",
    amount: "",
    description: "",
  });

  const [reimbursementForm, setReimbursementForm] = useState({
    type: "",
    amount: "",
    description: "",
  });

  const [approvalNotes, setApprovalNotes] = useState("");

  // Filter states
  const [loadFilters, setLoadFilters] = useState([]);
  const [deductionFilters, setDeductionFilters] = useState([]);
  const [reimbursementFilters, setReimbursementFilters] = useState([]);

  // Data mapping for different payee types - works for both worksheet and settlement modes
  const dataMap = {
    "WS-2026-0001": { payeeType: "Owner Operator", payeeName: "Smith Trucking LLC", payeeId: "PAY-001" },
    "WS-2026-0002": { payeeType: "Company Driver", payeeName: "Sarah Johnson", payeeId: "PAY-002" },
    "WS-2026-0003": { payeeType: "Technician", payeeName: "Carlos Martinez", payeeId: "PAY-003" },
    "WS-2026-0008": { payeeType: "Vendor", payeeName: "Texas Fleet Services", payeeId: "VND-001" },
    "STL-2026-0001": { payeeType: "Owner Operator", payeeName: "Smith Trucking LLC", payeeId: "PAY-001" },
    "STL-2026-0002": { payeeType: "Company Driver", payeeName: "Sarah Johnson", payeeId: "PAY-002" },
    "STL-2026-0006": { payeeType: "Vendor", payeeName: "Texas Fleet Services", payeeId: "VND-001" },
    "STL-2026-0007": { payeeType: "Vendor", payeeName: "Metro Fleet Services", payeeId: "VND-002" },
    "STL-2026-0008": { payeeType: "Vendor", payeeName: "Texas Fleet Services", payeeId: "VND-001" },
  };

  // Get payee info from data map or use defaults
  const currentId = settlementNo || (isWorksheetMode ? "WS-2026-0001" : "STL-2026-0001");
  const payeeInfo = dataMap[currentId] || { payeeType: "Owner Operator", payeeName: "Smith Trucking LLC", payeeId: "PAY-001" };

  // Filter configurations - dynamic based on settlement
  const loadFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "driver",
          label: "Driver",
          type: "select",
          group: "Basic",
          options: currentId === "STL-2026-0007" ? [
            { value: "David Martinez", label: "David Martinez" },
            { value: "Lisa Chen", label: "Lisa Chen" },
          ] : [
            { value: "John Smith", label: "John Smith" },
            { value: "Mike Johnson", label: "Mike Johnson" },
            { value: "Carlos Rodriguez", label: "Carlos Rodriguez" },
          ],
        },
        {
          key: "customer",
          label: "Customer",
          type: "select",
          group: "Basic",
          options: [
            { value: "Titan Construction", label: "Titan Construction" },
            { value: "TQL Logistics", label: "TQL Logistics" },
            { value: "CH Robinson", label: "CH Robinson" },
            { value: "XPO Logistics", label: "XPO Logistics" },
            { value: "Echo Global", label: "Echo Global" },
            { value: "Coyote Logistics", label: "Coyote Logistics" },
            { value: "Landstar", label: "Landstar" },
          ],
        },
        {
          key: "origin",
          label: "Origin",
          type: "select",
          group: "Basic",
          options: [
            { value: "Houston, TX", label: "Houston, TX" },
            { value: "Dallas, TX", label: "Dallas, TX" },
            { value: "Austin, TX", label: "Austin, TX" },
            { value: "San Antonio, TX", label: "San Antonio, TX" },
            { value: "Corpus Christi, TX", label: "Corpus Christi, TX" },
            { value: "Oklahoma City, OK", label: "Oklahoma City, OK" },
            { value: "Amarillo, TX", label: "Amarillo, TX" },
            { value: "Lubbock, TX", label: "Lubbock, TX" },
          ],
        },
      ],
    },
  ];

  const deductionFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "type",
          label: "Type",
          type: "select",
          group: "Basic",
          options: [
            { value: "Equipment Insurance", label: "Equipment Insurance" },
            { value: "Lease Payment", label: "Lease Payment" },
            { value: "Maintenance Escrow", label: "Maintenance Escrow" },
            { value: "Fuel Advance", label: "Fuel Advance" },
            { value: "Cash Advance", label: "Cash Advance" },
          ],
        },
        {
          key: "category",
          label: "Category",
          type: "select",
          group: "Basic",
          options: [
            { value: "Recurring", label: "Recurring" },
            { value: "One-Time", label: "One-Time" },
            { value: "Load", label: "Load" },
          ],
        },
      ],
    },
  ];

  const reimbursementFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "type",
          label: "Type",
          type: "select",
          group: "Basic",
          options: [
            { value: "Tolls", label: "Tolls" },
            { value: "Scale Tickets", label: "Scale Tickets" },
            { value: "Lumper Fees", label: "Lumper Fees" },
            { value: "Detention", label: "Detention" },
            { value: "Layover", label: "Layover" },
          ],
        },
      ],
    },
  ];

  const handleLoadFiltersChange = useCallback((newFilters) => {
    setLoadFilters(newFilters);
  }, []);

  const handleDeductionFiltersChange = useCallback((newFilters) => {
    setDeductionFilters(newFilters);
  }, []);

  const handleReimbursementFiltersChange = useCallback((newFilters) => {
    setReimbursementFilters(newFilters);
  }, []);

  // Mock settlement/worksheet data with full workflow info
  const settlement = {
    settlementNo: currentId,
    worksheetNo: isWorksheetMode ? currentId : null,
    batchNo: isSettlementMode ? "BATCH-2026-W02" : null,
    payee: payeeInfo.payeeName,
    legalName: payeeInfo.payeeName + (payeeInfo.payeeType === "Vendor" ? " LLC" : ""),
    payeeId: payeeInfo.payeeId,
    payeeType: payeeInfo.payeeType,
    payeeEmail: payeeInfo.payeeName.toLowerCase().replace(/\s+/g, '.') + "@example.com",
    payeePhone: "(713) 555-1234",
    payeeAddress: "4521 Industrial Blvd, Suite 200",
    payeeCity: "Houston",
    payeeState: "TX",
    payeeZip: "77041",
    taxId: "**-***4567",
    settlementCycle: "Weekly",
    cycleType: "Weekly",
    payType: "Per Mile",
    payRate: "$0.58/mile + FSC",
    businessUnit: "Mega Trucking",
    periodStart: "2026-01-08",
    periodEnd: "2026-01-14",
    status: isWorksheetMode ? worksheetStatus : statusParam,
    paymentMethod: "ACH",
    bankName: "Chase Business",
    bankAccount: "****4521",
    routingNumber: "****1234",
    // Workflow timestamps
    createdDate: "2026-01-15",
    createdBy: "Amanda Wilson",
    generatedDate: "2026-01-15",
    generatedBy: "System",
    readyDate: isSettlementMode ? "2026-01-15" : null,
    readyBy: isSettlementMode ? "Amanda Wilson" : null,
    approvedDate: isSettlementMode ? "2026-01-16" : null,
    approvedBy: isSettlementMode ? "Robert Chen" : null,
    reviewedDate: isWorksheetMode ? reviewedTimestamp : null,
    reviewedBy: isWorksheetMode && worksheetStatus === "Approved" ? "Amanda Wilson" : null,
    approvalNotes: isSettlementMode ? "All load pay verified against rate confirmations. Deductions confirmed." : null,
    postedDate: null,
    postedBy: null,
    paidDate: null,
    paidBy: null,
    paymentRef: null,
    // Factoring info
    factoringEnabled: false,
    factoringCompany: null,
    // Vendor info - drivers under this vendor (only for Vendor type)
    vendorDrivers: payeeInfo.payeeType === "Vendor" ? (
      currentId === "STL-2026-0007" ? [
        { id: "DRV-010", name: "David Martinez", loadsCount: 4, earnings: 6200.00 },
        { id: "DRV-011", name: "Lisa Chen", loadsCount: 2, earnings: 3650.00 },
      ] : [
        { id: "DRV-001", name: "John Smith", loadsCount: 3, earnings: 5934.00 },
        { id: "DRV-002", name: "Mike Johnson", loadsCount: 3, earnings: 3761.60 },
        { id: "DRV-003", name: "Carlos Rodriguez", loadsCount: 2, earnings: 3232.20 },
      ]
    ) : null,
  };

  // Mock loads data with multiple drivers - dynamic based on settlement
  const metroFleetLoads = [
    {
      id: 1,
      loadNo: "ML-2025-001300",
      driver: "David Martinez",
      driverId: "DRV-010",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      deliveredDate: "2025-01-02",
      customer: "Titan Construction",
      miles: 243,
      linehaul: 1458.00,
      fsc: 145.80,
      accessorials: 175.00,
      fuelAdvance: 400.00,
      grossPay: 1778.80,
      netPay: 1378.80,
    },
    {
      id: 2,
      loadNo: "ML-2025-001305",
      driver: "David Martinez",
      driverId: "DRV-010",
      origin: "Dallas, TX",
      destination: "San Antonio, TX",
      customer: "TQL Logistics",
      deliveredDate: "2025-01-03",
      miles: 275,
      linehaul: 1650.00,
      fsc: 165.00,
      accessorials: 100.00,
      fuelAdvance: 380.00,
      grossPay: 1915.00,
      netPay: 1535.00,
    },
    {
      id: 3,
      loadNo: "ML-2025-001310",
      driver: "David Martinez",
      driverId: "DRV-010",
      origin: "San Antonio, TX",
      destination: "Austin, TX",
      customer: "CH Robinson",
      deliveredDate: "2025-01-04",
      miles: 82,
      linehaul: 492.00,
      fsc: 49.20,
      accessorials: 50.00,
      fuelAdvance: 200.00,
      grossPay: 591.20,
      netPay: 391.20,
    },
    {
      id: 4,
      loadNo: "ML-2025-001315",
      driver: "David Martinez",
      driverId: "DRV-010",
      origin: "Austin, TX",
      destination: "Houston, TX",
      customer: "XPO Logistics",
      deliveredDate: "2025-01-05",
      miles: 165,
      linehaul: 1650.00,
      fsc: 165.00,
      accessorials: 100.00,
      fuelAdvance: 320.00,
      grossPay: 1915.00,
      netPay: 1595.00,
    },
    {
      id: 5,
      loadNo: "ML-2025-001320",
      driver: "Lisa Chen",
      driverId: "DRV-011",
      origin: "Houston, TX",
      destination: "Corpus Christi, TX",
      customer: "Echo Global",
      deliveredDate: "2025-01-03",
      miles: 211,
      linehaul: 1266.00,
      fsc: 126.60,
      accessorials: 125.00,
      fuelAdvance: 350.00,
      grossPay: 1517.60,
      netPay: 1167.60,
    },
    {
      id: 6,
      loadNo: "ML-2025-001325",
      driver: "Lisa Chen",
      driverId: "DRV-011",
      origin: "Corpus Christi, TX",
      destination: "Houston, TX",
      customer: "Coyote Logistics",
      deliveredDate: "2025-01-05",
      miles: 211,
      linehaul: 1899.00,
      fsc: 189.90,
      accessorials: 75.00,
      fuelAdvance: 350.00,
      grossPay: 2163.90,
      netPay: 1813.90,
    },
  ];

  const texasFleetLoads = [
    {
      id: 1,
      loadNo: "ML-2025-001245",
      driver: "John Smith",
      driverId: "DRV-001",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      deliveredDate: "2025-01-08",
      customer: "Titan Construction",
      miles: 243,
      linehaul: 1458.00,
      fsc: 145.80,
      accessorials: 175.00,
      fuelAdvance: 425.00,
      grossPay: 1778.80,
      netPay: 1353.80,
    },
    {
      id: 2,
      loadNo: "ML-2025-001248",
      driver: "John Smith",
      driverId: "DRV-001",
      origin: "Dallas, TX",
      destination: "Austin, TX",
      customer: "TQL Logistics",
      deliveredDate: "2025-01-09",
      miles: 195,
      linehaul: 1170.00,
      fsc: 117.00,
      accessorials: 75.00,
      fuelAdvance: 350.00,
      grossPay: 1362.00,
      netPay: 1012.00,
    },
    {
      id: 3,
      loadNo: "ML-2025-001252",
      driver: "John Smith",
      driverId: "DRV-001",
      origin: "Austin, TX",
      destination: "El Paso, TX",
      customer: "CH Robinson",
      deliveredDate: "2025-01-10",
      miles: 578,
      linehaul: 2312.00,
      fsc: 231.20,
      accessorials: 250.00,
      fuelAdvance: 520.00,
      grossPay: 2793.20,
      netPay: 2273.20,
    },
    {
      id: 4,
      loadNo: "ML-2025-001260",
      driver: "Mike Johnson",
      driverId: "DRV-002",
      origin: "Houston, TX",
      destination: "San Antonio, TX",
      customer: "XPO Logistics",
      deliveredDate: "2025-01-08",
      miles: 197,
      linehaul: 1182.00,
      fsc: 118.20,
      accessorials: 0,
      fuelAdvance: 380.00,
      grossPay: 1300.20,
      netPay: 920.20,
    },
    {
      id: 5,
      loadNo: "ML-2025-001263",
      driver: "Mike Johnson",
      driverId: "DRV-002",
      origin: "San Antonio, TX",
      destination: "Corpus Christi, TX",
      customer: "Titan Construction",
      deliveredDate: "2025-01-09",
      miles: 143,
      linehaul: 858.00,
      fsc: 85.80,
      accessorials: 125.00,
      fuelAdvance: 290.00,
      grossPay: 1068.80,
      netPay: 778.80,
    },
    {
      id: 6,
      loadNo: "ML-2025-001267",
      driver: "Mike Johnson",
      driverId: "DRV-002",
      origin: "Corpus Christi, TX",
      destination: "Houston, TX",
      customer: "Echo Global",
      deliveredDate: "2025-01-10",
      miles: 211,
      linehaul: 1266.00,
      fsc: 126.60,
      accessorials: 0,
      fuelAdvance: 400.00,
      grossPay: 1392.60,
      netPay: 992.60,
    },
    {
      id: 7,
      loadNo: "ML-2025-001275",
      driver: "Carlos Rodriguez",
      driverId: "DRV-003",
      origin: "Dallas, TX",
      destination: "Oklahoma City, OK",
      customer: "Coyote Logistics",
      deliveredDate: "2025-01-08",
      miles: 208,
      linehaul: 1248.00,
      fsc: 124.80,
      accessorials: 150.00,
      fuelAdvance: 410.00,
      grossPay: 1522.80,
      netPay: 1112.80,
    },
    {
      id: 8,
      loadNo: "ML-2025-001278",
      driver: "Carlos Rodriguez",
      driverId: "DRV-003",
      origin: "Oklahoma City, OK",
      destination: "Amarillo, TX",
      customer: "TQL Logistics",
      deliveredDate: "2025-01-09",
      miles: 259,
      linehaul: 1554.00,
      fsc: 155.40,
      accessorials: 0,
      fuelAdvance: 480.00,
      grossPay: 1709.40,
      netPay: 1229.40,
    },
  ];

  // Select loads based on settlement
  const loads = currentId === "STL-2026-0007" ? metroFleetLoads : texasFleetLoads;

  // Mock deductions - categorized
  const [deductions, setDeductions] = useState([
    { id: 1, type: "Equipment Insurance", category: "Recurring", description: "Weekly equipment insurance premium", amount: 275.00 },
    { id: 2, type: "Lease Payment", category: "Recurring", description: "Truck lease - TRK-2847", amount: 875.00 },
    { id: 3, type: "Maintenance Escrow", category: "Recurring", description: "Weekly maintenance escrow contribution", amount: 150.00 },
    { id: 4, type: "Fuel Advance", category: "Load", description: "Fuel advance - ML-2025-001245", amount: 425.00, loadNo: "ML-2025-001245" },
    { id: 5, type: "Fuel Advance", category: "Load", description: "Fuel advance - ML-2025-001248", amount: 350.00, loadNo: "ML-2025-001248" },
    { id: 6, type: "Fuel Advance", category: "Load", description: "Fuel advance - ML-2025-001252", amount: 520.00, loadNo: "ML-2025-001252" },
    { id: 7, type: "Cash Advance", category: "One-Time", description: "Cash advance taken 01/10/2025", amount: 500.00 },
  ]);

  // Mock reimbursements
  const [reimbursements, setReimbursements] = useState([
    { id: 1, type: "Tolls", description: "Toll receipts - Dallas & Austin trips", amount: 87.50, receipt: "RCP-2025-0142" },
    { id: 2, type: "Scale Tickets", description: "CAT scale receipts (4 tickets)", amount: 32.00, receipt: "RCP-2025-0143" },
  ]);

  // Enhanced activity log with workflow events
  const activityLog = [
    { id: 1, action: "Settlement Created", status: "Draft", user: "Amanda Wilson", timestamp: "2025-01-15 09:30 AM", details: "Created from 3 loads in BATCH-2025-W02 for Smith Trucking LLC", icon: PlusCircleIcon },
    { id: 2, action: "Recurring Deductions Applied", status: "Draft", user: "System", timestamp: "2025-01-15 09:31 AM", details: "Equipment Insurance ($275), Lease Payment ($875), Escrow ($150)", icon: MinusCircleIcon },
    { id: 3, action: "Fuel Advances Applied", status: "Draft", user: "System", timestamp: "2025-01-15 09:31 AM", details: "3 fuel advances totaling $1,295.00 from load data", icon: MinusCircleIcon },
    { id: 4, action: "Reimbursement Added", status: "Draft", user: "Amanda Wilson", timestamp: "2025-01-15 09:45 AM", details: "Tolls - $87.50 (Receipt: RCP-2025-0142)", icon: PlusCircleIcon },
    { id: 5, action: "Reimbursement Added", status: "Draft", user: "Amanda Wilson", timestamp: "2025-01-15 09:47 AM", details: "Scale Tickets - $32.00 (Receipt: RCP-2025-0143)", icon: PlusCircleIcon },
    { id: 6, action: "One-Time Deduction Added", status: "Draft", user: "Amanda Wilson", timestamp: "2025-01-15 09:50 AM", details: "Cash Advance - $500.00", icon: MinusCircleIcon },
    { id: 7, action: "Marked as Ready", status: "Ready", user: "Amanda Wilson", timestamp: "2025-01-15 10:15 AM", details: "Settlement submitted for approval review. Net pay: $3,958.50", icon: ListChecksIcon },
    { id: 8, action: "Settlement Approved", status: "Approved", user: "Robert Chen", timestamp: "2025-01-16 11:30 AM", details: "All load pay verified against rate confirmations. Deductions confirmed.", icon: CheckCircleIcon },
  ];

  // Calculation helpers
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const getStatusBadge = (status) => {
    const config = {
      Draft: { color: "bg-slate-500/10 text-slate-700 border-slate-500/50", icon: Edit2Icon },
      Ready: { color: "bg-blue-500/10 text-blue-700 border-blue-500/50", icon: ListChecksIcon },
      "Pending Review": { color: "bg-amber-500/10 text-amber-700 border-amber-500/50", icon: ClockIcon },
      Approved: { color: "bg-green-500/10 text-green-700 border-green-500/50", icon: CheckCircleIcon },
      Posted: { color: "bg-purple-500/10 text-purple-700 border-purple-500/50", icon: LockIcon },
      Paid: { color: "bg-green-500/10 text-green-700 border-green-500/50", icon: CheckCircle2Icon },
      Settled: { color: "bg-green-500/10 text-green-700 border-green-500/50", icon: CheckCircle2Icon },
    };
    const c = config[status] || config["Draft"];
    const Icon = c.icon;
    return (
      <Badge className={c.color}>
        <Icon className="size-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getPayeeTypeBadge = (type) => {
    const colors = {
      Driver: "bg-blue-500/10 text-blue-700 border-blue-500/50",
      "Company Driver": "bg-blue-500/10 text-blue-700 border-blue-500/50",
      Technician: "bg-purple-500/10 text-purple-700 border-purple-500/50",
      Carrier: "bg-cyan-500/10 text-cyan-700 border-cyan-500/50",
      Vendor: "bg-orange-500/10 text-orange-700 border-orange-500/50",
      "Owner Operator": "bg-emerald-500/10 text-emerald-700 border-emerald-500/50",
    };
    return colors[type] || "bg-gray-500/10 text-gray-700";
  };

  const getCategoryBadge = (category) => {
    const colors = {
      Recurring: "bg-purple-500/10 text-purple-700 border-purple-500/50",
      "One-Time": "bg-blue-500/10 text-blue-700 border-blue-500/50",
      Load: "bg-amber-500/10 text-amber-700 border-amber-500/50",
    };
    return colors[category] || "bg-gray-500/10 text-gray-700";
  };

  // Calculate totals
  const grossPay = loads.reduce((sum, l) => sum + l.grossPay, 0);
  const recurringDeductions = deductions.filter(d => d.category === "Recurring").reduce((sum, d) => sum + d.amount, 0);
  const oneTimeDeductions = deductions.filter(d => d.category === "One-Time").reduce((sum, d) => sum + d.amount, 0);
  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
  const totalReimbursements = reimbursements.reduce((sum, r) => sum + r.amount, 0);
  const netPay = grossPay - totalDeductions + totalReimbursements;

  // Status checks (Simplified: Approved → Settled)
  const isApproved = settlement.status === "Approved";
  const canMarkSettled = isApproved;

  // Table columns
  const loadColumns = [
    {
      accessorKey: "loadNo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Load #" />,
      cell: ({ row }) => (
        <button
          onClick={() => navigate(`/app/carrier-portal/orders/bulk/history/load-details?id=${row.getValue("loadNo")}&mode=view`)}
          className="font-mono text-sm font-medium text-primary hover:underline flex items-center gap-1"
        >
          {row.getValue("loadNo")}
          <ExternalLinkIcon className="size-3" />
        </button>
      ),
    },
    {
      accessorKey: "driver",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Driver" />,
      cell: ({ row }) => {
        const isVendor = settlement.payeeType === "Vendor";
        const driverData = isVendor && settlement.vendorDrivers
          ? settlement.vendorDrivers.find(d => d.id === row.original.driverId)
          : null;

        if (isVendor && driverData) {
          return (
            <button
              onClick={() => {
                setSelectedDriver(driverData);
                setShowDriverModal(true);
              }}
              className="text-left hover:text-primary"
            >
              <p className="text-sm font-medium hover:underline">{row.getValue("driver")}</p>
              <p className="text-xs text-muted-foreground">{row.original.driverId}</p>
            </button>
          );
        }

        return (
          <div>
            <p className="text-sm font-medium">{row.getValue("driver")}</p>
            <p className="text-xs text-muted-foreground">{row.original.driverId}</p>
          </div>
        );
      },
    },
    {
      id: "route",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Route" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <span>{row.original.origin.split(',')[0]}</span>
          <ArrowRightIcon className="size-3 text-muted-foreground" />
          <span>{row.original.destination.split(',')[0]}</span>
        </div>
      ),
    },
    {
      accessorKey: "customer",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
      cell: ({ row }) => <span className="text-sm">{row.getValue("customer")}</span>,
    },
    {
      accessorKey: "deliveredDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Delivered" />,
      cell: ({ row }) => formatDate(row.getValue("deliveredDate")),
    },
    {
      accessorKey: "miles",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Miles" />,
      cell: ({ row }) => <span className="font-medium">{row.getValue("miles")}</span>,
    },
    {
      accessorKey: "linehaul",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Linehaul" />,
      cell: ({ row }) => formatCurrency(row.getValue("linehaul")),
    },
    {
      accessorKey: "fsc",
      header: ({ column }) => <DataTableColumnHeader column={column} title="FSC" />,
      cell: ({ row }) => formatCurrency(row.getValue("fsc")),
    },
    {
      accessorKey: "accessorials",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Accessorials" />,
      cell: ({ row }) => {
        const acc = row.getValue("accessorials");
        return acc > 0 ? formatCurrency(acc) : <span className="text-muted-foreground">-</span>;
      },
    },
    {
      accessorKey: "fuelAdvance",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Fuel Adv." />,
      cell: ({ row }) => {
        const fuel = row.getValue("fuelAdvance");
        return fuel > 0 ? (
          <span className="text-amber-600">-{formatCurrency(fuel)}</span>
        ) : (
          <span className="text-muted-foreground">-</span>
        );
      },
    },
    {
      accessorKey: "netPay",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Net Pay" />,
      cell: ({ row }) => <span className="font-bold text-green-600">{formatCurrency(row.getValue("netPay"))}</span>,
    },
  ];

  const deductionColumns = [
    {
      accessorKey: "type",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => <div className="py-1 font-medium">{row.getValue("type")}</div>,
    },
    {
      accessorKey: "category",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
      cell: ({ row }) => (
        <div className="py-1">
          <Badge className={getCategoryBadge(row.getValue("category"))}>
            {row.getValue("category")}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
      cell: ({ row }) => {
        const loadNo = row.original.loadNo;
        return (
          <div className="py-1">
            <span>{row.getValue("description")}</span>
            {loadNo && (
              <button className="ml-2 text-xs text-primary hover:underline">
                ({loadNo})
              </button>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
      cell: ({ row }) => <div className="py-1 font-bold text-red-600">-{formatCurrency(row.getValue("amount"))}</div>,
    },
    ...(isWorksheetMode ? [{
      id: "actions",
      header: "Actions",
      size: 100,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <Edit2Icon className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => setDeductions(deductions.filter(d => d.id !== row.original.id))}
          >
            <Trash2Icon className="size-3.5" />
          </Button>
        </div>
      ),
    }] : []),
  ];

  const reimbursementColumns = [
    {
      accessorKey: "type",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => <div className="py-1 font-medium">{row.getValue("type")}</div>,
    },
    {
      accessorKey: "description",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
      cell: ({ row }) => <div className="py-1">{row.getValue("description")}</div>,
    },
    {
      accessorKey: "receipt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Receipt" />,
      cell: ({ row }) => (
        <div className="py-1">
          {row.getValue("receipt") ? (
            <button className="font-mono text-sm text-primary hover:underline flex items-center gap-1">
              {row.getValue("receipt")}
              <ExternalLinkIcon className="size-3" />
            </button>
          ) : (
            <span className="text-muted-foreground">-</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
      cell: ({ row }) => <div className="py-1 font-bold text-green-600">+{formatCurrency(row.getValue("amount"))}</div>,
    },
    ...(isWorksheetMode ? [{
      id: "actions",
      header: "Actions",
      size: 100,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <Edit2Icon className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => setReimbursements(reimbursements.filter(r => r.id !== row.original.id))}
          >
            <Trash2Icon className="size-3.5" />
          </Button>
        </div>
      ),
    }] : []),
  ];

  const handleAddDeduction = (e) => {
    e.preventDefault();
    const newDeduction = {
      id: deductions.length + 1,
      type: deductionForm.type,
      category: "One-Time",
      description: deductionForm.description,
      amount: parseFloat(deductionForm.amount),
    };
    setDeductions([...deductions, newDeduction]);
    setShowAddDeductionSheet(false);
    setDeductionForm({ type: "", amount: "", description: "" });
  };

  const handleAddReimbursement = (e) => {
    e.preventDefault();
    const newReimbursement = {
      id: reimbursements.length + 1,
      type: reimbursementForm.type,
      description: reimbursementForm.description,
      amount: parseFloat(reimbursementForm.amount),
      receipt: null,
    };
    setReimbursements([...reimbursements, newReimbursement]);
    setShowAddReimbursementSheet(false);
    setReimbursementForm({ type: "", amount: "", description: "" });
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <Tabs defaultValue={activeTab} className="w-full h-full flex flex-col overflow-hidden">
        {/* Tabs Header */}
        <div className="flex-shrink-0">
          <TabsList className="mb-0 rounded-none">
            <TabsTrigger value="general" className="h-full">
              <LayoutDashboard className="size-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="loads" className="h-full">
              <TruckIcon className="size-4" />
              Loads ({loads.length})
            </TabsTrigger>
            <TabsTrigger value="deductions" className="h-full">
              <MinusCircleIcon className="size-4" />
              Deductions ({deductions.length})
            </TabsTrigger>
            <TabsTrigger value="reimbursements" className="h-full">
              <PlusCircleIcon className="size-4" />
              Reimbursements ({reimbursements.length})
            </TabsTrigger>
            {isSettlementMode && (
              <TabsTrigger value="statement" className="h-full">
                <FileTextIcon className="size-4" />
                Statement
              </TabsTrigger>
            )}
            <TabsTrigger value="activity" className="h-full">
              <History className="size-4" />
              Audit Log
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          {/* General Tab */}
          <TabsContent value="general" className="h-full mt-0 p-4">
            <div className="space-y-4">
              {/* Settlement/Worksheet Header Card */}
              <div className="border rounded-sm bg-card">
                <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    {isWorksheetMode ? <FileSpreadsheetIcon className="size-4" /> : <Wallet className="size-4" />}
                    {isWorksheetMode ? "Worksheet Details" : "Settlement Details"}
                  </h3>
                  <div className="flex items-center gap-2">
                    {/* Worksheet mode buttons */}
                    {isWorksheetMode && worksheetStatus === "Pending Review" && (
                      <Button size="sm" variant="outline" onClick={() => setShowMarkApprovedDialog(true)}>
                        <CheckCircleIcon className="size-4 mr-2" />
                        Mark as Approved
                      </Button>
                    )}
                    {/* Settlement mode buttons */}
                    {isSettlementMode && canMarkSettled && (
                      <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => setShowPaymentDialog(true)}>
                        <CheckCircle2Icon className="size-4 mr-2" />
                        Mark as Settled
                      </Button>
                    )}
                  </div>
                </div>
                <div className="divide-y divide-border">
                  <div className="grid grid-cols-4 divide-x divide-border">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">{isWorksheetMode ? "Worksheet #" : "Settlement #"}</p>
                      <p className="text-sm font-medium text-foreground font-mono">{settlement.settlementNo}</p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Status</p>
                      <div className="mt-0.5">{getStatusBadge(settlement.status)}</div>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Period</p>
                      <p className="text-sm font-medium text-foreground">{formatDate(settlement.periodStart)} - {formatDate(settlement.periodEnd)}</p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Business Unit</p>
                      <p className="text-sm font-medium text-foreground">{settlement.businessUnit}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 divide-x divide-border">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Payee</p>
                      <p className="text-sm font-medium text-foreground">{settlement.payee}</p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Payee Type</p>
                      <Badge variant="outline" className={getPayeeTypeBadge(settlement.payeeType)}>
                        {settlement.payeeType}
                      </Badge>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Settlement Cycle</p>
                      <p className="text-sm font-medium text-foreground">{settlement.settlementCycle || settlement.cycleType}</p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">{isWorksheetMode ? "Generated" : "Batch #"}</p>
                      <p className="text-sm font-medium text-foreground font-mono">{isWorksheetMode ? formatDate(settlement.generatedDate) : settlement.batchNo}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                {/* Payee Information Card */}
                <div className="flex-1 border rounded-sm bg-card">
                  <div className="px-4 py-3 border-b bg-muted">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <UserIcon className="size-4" />
                      Payee Information
                    </h3>
                  </div>
                  <div className="divide-y divide-border">
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Payee Name</p>
                        <p className="text-sm font-medium text-foreground">{settlement.payee}</p>
                      </div>
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Payee ID</p>
                        <p className="text-sm font-medium text-foreground font-mono">{settlement.payeeId}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Legal Name</p>
                        <p className="text-sm font-medium text-foreground">{settlement.legalName}</p>
                      </div>
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Tax ID</p>
                        <p className="text-sm font-medium text-foreground font-mono">{settlement.taxId}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                        <p className="text-sm font-medium text-foreground">{settlement.payeePhone}</p>
                      </div>
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                        <p className="text-sm font-medium text-primary">{settlement.payeeEmail}</p>
                      </div>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Address</p>
                      <p className="text-sm font-medium text-foreground">{settlement.payeeAddress}, {settlement.payeeCity}, {settlement.payeeState} {settlement.payeeZip}</p>
                    </div>
                  </div>
                </div>

                {/* Payment & Summary Card */}
                <div className="flex-1 border rounded-sm bg-card">
                  <div className="px-4 py-3 border-b bg-muted">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <CreditCard className="size-4" />
                      Payment Information
                    </h3>
                  </div>
                  <div className="divide-y divide-border">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Payment Method</p>
                      <p className="text-sm font-medium text-foreground">{settlement.paymentMethod}</p>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Bank</p>
                        <p className="text-sm font-medium text-foreground">{settlement.bankName}</p>
                      </div>
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Account</p>
                        <p className="text-sm font-medium text-foreground font-mono">{settlement.bankAccount}</p>
                      </div>
                    </div>
                    {settlement.factoringEnabled && (
                      <div className="px-4 py-2.5 bg-amber-50 dark:bg-amber-950/20">
                        <p className="text-xs text-amber-700 mb-0.5 font-medium">Factoring Company</p>
                        <p className="text-sm font-medium text-amber-800">{settlement.factoringCompany}</p>
                      </div>
                    )}
                    <div className="px-4 py-3 bg-muted">
                      <p className="text-xs text-muted-foreground mb-2 font-semibold">Summary</p>
                      <div className="space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Loads ({loads.length})</span>
                          <span className="text-sm font-medium">{formatCurrency(grossPay)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Recurring Deductions</span>
                          <span className="text-sm font-medium text-red-600">-{formatCurrency(recurringDeductions)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">One-Time Deductions</span>
                          <span className="text-sm font-medium text-red-600">-{formatCurrency(oneTimeDeductions)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Reimbursements</span>
                          <span className="text-sm font-medium text-green-600">+{formatCurrency(totalReimbursements)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 flex justify-between items-center bg-green-50 dark:bg-green-950/20">
                      <span className="text-sm font-semibold text-green-700 dark:text-green-400">Net Pay</span>
                      <span className="text-xl font-bold text-green-600">{formatCurrency(netPay)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

        {/* Loads Tab */}
        <TabsContent value="loads" className="p-6 mt-0">
          {/* Filter */}
          <div className="mb-4">
            <SmartFilter
              filterGroups={loadFilterGroups}
              activeFilters={loadFilters}
              onFiltersChange={handleLoadFiltersChange}
            />
          </div>

          {/* Table */}
          <div className="[&_td]:py-2 [&_th]:py-2">
            <DataTable columns={loadColumns} data={loads} showViewOptions={false} pageSize={10} />
          </div>

          {/* Earnings Breakdown - Full Width */}
          <div className="mt-4 border rounded-sm bg-card">
            <div className="px-4 py-2.5 border-b bg-muted">
              <h4 className="text-sm font-semibold">Earnings Breakdown</h4>
            </div>
            <div className="grid grid-cols-5 divide-x divide-border">
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Linehaul</p>
                <p className="text-sm font-semibold">{formatCurrency(loads.reduce((s, l) => s + l.linehaul, 0))}</p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Fuel Surcharge</p>
                <p className="text-sm font-semibold">{formatCurrency(loads.reduce((s, l) => s + l.fsc, 0))}</p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Accessorials</p>
                <p className="text-sm font-semibold">{formatCurrency(loads.reduce((s, l) => s + l.accessorials, 0))}</p>
              </div>
              <div className="px-4 py-3 text-center bg-amber-50 dark:bg-amber-950/20">
                <p className="text-xs text-amber-700 dark:text-amber-400 mb-1">Fuel Advances</p>
                <p className="text-sm font-semibold text-amber-600">-{formatCurrency(loads.reduce((s, l) => s + l.fuelAdvance, 0))}</p>
              </div>
              <div className="px-4 py-3 text-center bg-green-50 dark:bg-green-950/20">
                <p className="text-xs text-green-700 dark:text-green-400 mb-1">Total Gross Pay</p>
                <p className="text-lg font-bold text-green-600">{formatCurrency(grossPay)}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Deductions Tab */}
        <TabsContent value="deductions" className="p-6 mt-0">
          {isWorksheetMode && (
            <div className="flex justify-end mb-4">
              <Button size="sm" onClick={() => setShowAddDeductionSheet(true)}>
                <PlusCircleIcon className="size-4 mr-2" />
                Add Deduction
              </Button>
            </div>
          )}
          <div className="mb-4">
            <SmartFilter
              filterGroups={deductionFilterGroups}
              activeFilters={deductionFilters}
              onFiltersChange={handleDeductionFiltersChange}
            />
          </div>
          <DataTable columns={deductionColumns} data={deductions} showViewOptions={false} pageSize={10} />

          {/* Deductions Breakdown - Full Width */}
          <div className="mt-4 border rounded-sm bg-card">
            <div className="px-4 py-2.5 border-b bg-muted">
              <h4 className="text-sm font-semibold">Deductions Breakdown</h4>
            </div>
            <div className="grid grid-cols-4 divide-x divide-border">
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Recurring</p>
                <p className="text-sm font-semibold text-red-600">-{formatCurrency(recurringDeductions)}</p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">One-Time</p>
                <p className="text-sm font-semibold text-red-600">-{formatCurrency(oneTimeDeductions)}</p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Load-Based (Advances)</p>
                <p className="text-sm font-semibold text-red-600">-{formatCurrency(deductions.filter(d => d.category === "Load").reduce((s, d) => s + d.amount, 0))}</p>
              </div>
              <div className="px-4 py-3 text-center bg-red-50 dark:bg-red-950/20">
                <p className="text-xs text-red-700 dark:text-red-400 mb-1">Total Deductions</p>
                <p className="text-lg font-bold text-red-600">-{formatCurrency(totalDeductions)}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Reimbursements Tab */}
        <TabsContent value="reimbursements" className="p-6 mt-0">
          {isWorksheetMode && (
            <div className="flex justify-end mb-4">
              <Button size="sm" onClick={() => setShowAddReimbursementSheet(true)}>
                <PlusCircleIcon className="size-4 mr-2" />
                Add Reimbursement
              </Button>
            </div>
          )}
          <div className="mb-4">
            <SmartFilter
              filterGroups={reimbursementFilterGroups}
              activeFilters={reimbursementFilters}
              onFiltersChange={handleReimbursementFiltersChange}
            />
          </div>
          <DataTable columns={reimbursementColumns} data={reimbursements} showViewOptions={false} pageSize={10} />

          {/* Reimbursements Breakdown - Full Width */}
          <div className="mt-4 border rounded-sm bg-card">
            <div className="px-4 py-2.5 border-b bg-muted">
              <h4 className="text-sm font-semibold">Reimbursements Breakdown</h4>
            </div>
            <div className="grid grid-cols-4 divide-x divide-border">
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Tolls</p>
                <p className="text-sm font-semibold text-green-600">+{formatCurrency(reimbursements.filter(r => r.type === "Tolls").reduce((s, r) => s + r.amount, 0))}</p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Scale Tickets</p>
                <p className="text-sm font-semibold text-green-600">+{formatCurrency(reimbursements.filter(r => r.type === "Scale Tickets").reduce((s, r) => s + r.amount, 0))}</p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Other</p>
                <p className="text-sm font-semibold text-green-600">+{formatCurrency(reimbursements.filter(r => r.type !== "Tolls" && r.type !== "Scale Tickets").reduce((s, r) => s + r.amount, 0))}</p>
              </div>
              <div className="px-4 py-3 text-center bg-green-50 dark:bg-green-950/20">
                <p className="text-xs text-green-700 dark:text-green-400 mb-1">Total Reimbursements</p>
                <p className="text-lg font-bold text-green-600">+{formatCurrency(totalReimbursements)}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Statement Tab */}
        <TabsContent value="statement" className="p-6 mt-0">
          <div className="max-w-4xl mx-auto">
            {/* Statement Preview */}
            <div className="border rounded-lg bg-white dark:bg-card shadow-sm">
              {/* Statement Header */}
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">Settlement Statement</h2>
                    <p className="text-muted-foreground">{settlement.settlementNo}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{settlement.businessUnit}</p>
                    <p className="text-sm text-muted-foreground">Settlement Period: {formatDate(settlement.periodStart)} - {formatDate(settlement.periodEnd)}</p>
                  </div>
                </div>
              </div>

              {/* Payee Info */}
              <div className="p-6 border-b bg-muted/30">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Payee</p>
                    <p className="font-bold">{settlement.legalName}</p>
                    <p className="text-sm">{settlement.payeeAddress}</p>
                    <p className="text-sm">{settlement.payeeCity}, {settlement.payeeState} {settlement.payeeZip}</p>
                    {settlement.payeeType === "Vendor" && (
                      <Badge className="mt-2 bg-orange-500/10 text-orange-700 border-orange-500/50">
                        <UsersIcon className="size-3 mr-1" />
                        Vendor ({settlement.vendorDrivers?.length || 0} Drivers)
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Payment Method</p>
                    <p className="font-medium">{settlement.paymentMethod}</p>
                    <p className="text-sm text-muted-foreground">{settlement.bankName} - {settlement.bankAccount}</p>
                  </div>
                </div>
              </div>

              {/* Loads Summary */}
              <div className="p-6 border-b">
                <h3 className="font-semibold mb-4">Load Breakdown</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Load #</th>
                      <th className="text-left py-2">Route</th>
                      <th className="text-left py-2">Date</th>
                      <th className="text-right py-2">Miles</th>
                      <th className="text-right py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loads.map((load) => (
                      <tr key={load.id} className="border-b">
                        <td className="py-2 font-mono">{load.loadNo}</td>
                        <td className="py-2">{load.origin.split(',')[0]} → {load.destination.split(',')[0]}</td>
                        <td className="py-2">{formatDate(load.deliveredDate)}</td>
                        <td className="py-2 text-right">{load.miles}</td>
                        <td className="py-2 text-right font-medium">{formatCurrency(load.grossPay)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-semibold">
                      <td colSpan={3} className="py-2">Total Earnings</td>
                      <td className="py-2 text-right">{loads.reduce((s, l) => s + l.miles, 0)}</td>
                      <td className="py-2 text-right">{formatCurrency(grossPay)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Deductions */}
              <div className="p-6 border-b">
                <h3 className="font-semibold mb-4">Deductions</h3>
                <table className="w-full text-sm">
                  <tbody>
                    {deductions.map((d) => (
                      <tr key={d.id} className="border-b">
                        <td className="py-2">{d.type}</td>
                        <td className="py-2 text-muted-foreground">{d.description}</td>
                        <td className="py-2 text-right text-red-600">-{formatCurrency(d.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-semibold text-red-600">
                      <td colSpan={2} className="py-2">Total Deductions</td>
                      <td className="py-2 text-right">-{formatCurrency(totalDeductions)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Reimbursements */}
              {reimbursements.length > 0 && (
                <div className="p-6 border-b">
                  <h3 className="font-semibold mb-4">Reimbursements</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      {reimbursements.map((r) => (
                        <tr key={r.id} className="border-b">
                          <td className="py-2">{r.type}</td>
                          <td className="py-2 text-muted-foreground">{r.description}</td>
                          <td className="py-2 text-right text-green-600">+{formatCurrency(r.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="font-semibold text-green-600">
                        <td colSpan={2} className="py-2">Total Reimbursements</td>
                        <td className="py-2 text-right">+{formatCurrency(totalReimbursements)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}

              {/* Net Pay */}
              <div className="p-6 bg-green-50 dark:bg-green-950/20">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold text-green-700">Net Settlement Amount</p>
                    <p className="text-sm text-muted-foreground">Payment will be processed via {settlement.paymentMethod}</p>
                  </div>
                  <p className="text-3xl font-bold text-green-600">{formatCurrency(netPay)}</p>
                </div>
              </div>
            </div>

            {/* Statement Actions */}
            <div className="flex justify-center gap-3 mt-6">
              <Button variant="outline">
                <DownloadIcon className="size-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline">
                <FileSpreadsheetIcon className="size-4 mr-2" />
                Download CSV
              </Button>
              <Button variant="outline">
                <SendIcon className="size-4 mr-2" />
                Email to Payee
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="p-6 mt-0">
          <div className="max-w-3xl">
            <div className="space-y-0">
              {activityLog.map((activity, index) => {
                const Icon = activity.icon;
                const isLast = index === activityLog.length - 1;
                return (
                  <div key={activity.id} className="flex gap-4">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div className={`p-2 rounded-full ${
                        activity.status === "Paid" ? "bg-green-500/10" :
                        activity.status === "Posted" ? "bg-purple-500/10" :
                        activity.status === "Approved" ? "bg-amber-500/10" :
                        activity.status === "Ready" ? "bg-blue-500/10" :
                        "bg-slate-500/10"
                      }`}>
                        <Icon className={`size-4 ${
                          activity.status === "Paid" ? "text-green-600" :
                          activity.status === "Posted" ? "text-purple-600" :
                          activity.status === "Approved" ? "text-amber-600" :
                          activity.status === "Ready" ? "text-blue-600" :
                          "text-slate-600"
                        }`} />
                      </div>
                      {!isLast && <div className="w-0.5 h-full bg-border flex-1 my-2" />}
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{activity.action}</p>
                        {getStatusBadge(activity.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{activity.details}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span>{activity.user}</span>
                        <span>•</span>
                        <span>{activity.timestamp}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>
        </div>
      </Tabs>

      {/* ============ DIALOGS AND SHEETS ============ */}

      {/* Add Deduction Sheet */}
      <Sheet open={showAddDeductionSheet} onOpenChange={setShowAddDeductionSheet}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader className="pb-4 border-b px-4">
            <SheetTitle>Add Deduction</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleAddDeduction} className="space-y-4 mt-4 px-4">
            <div className="space-y-2">
              <Label>Deduction Type</Label>
              <Select value={deductionForm.type} onValueChange={(v) => setDeductionForm({ ...deductionForm, type: v })}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Insurance">Insurance</SelectItem>
                  <SelectItem value="Fuel Advance">Fuel Advance</SelectItem>
                  <SelectItem value="Cash Advance">Cash Advance</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Lease Payment">Lease Payment</SelectItem>
                  <SelectItem value="Escrow">Escrow</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input type="number" step="0.01" placeholder="0.00" className="pl-7" value={deductionForm.amount} onChange={(e) => setDeductionForm({ ...deductionForm, amount: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Enter description..." value={deductionForm.description} onChange={(e) => setDeductionForm({ ...deductionForm, description: e.target.value })} />
            </div>
            <div className="flex gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setShowAddDeductionSheet(false)} className="flex-1">Cancel</Button>
              <Button type="submit" className="flex-1">Add Deduction</Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Add Reimbursement Sheet */}
      <Sheet open={showAddReimbursementSheet} onOpenChange={setShowAddReimbursementSheet}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader className="pb-4 border-b px-4">
            <SheetTitle>Add Reimbursement</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleAddReimbursement} className="space-y-4 mt-4 px-4">
            <div className="space-y-2">
              <Label>Reimbursement Type</Label>
              <Select value={reimbursementForm.type} onValueChange={(v) => setReimbursementForm({ ...reimbursementForm, type: v })}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tolls">Tolls</SelectItem>
                  <SelectItem value="Scale Tickets">Scale Tickets</SelectItem>
                  <SelectItem value="Lumper Fees">Lumper Fees</SelectItem>
                  <SelectItem value="Detention">Detention</SelectItem>
                  <SelectItem value="Layover">Layover</SelectItem>
                  <SelectItem value="Materials">Materials</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input type="number" step="0.01" placeholder="0.00" className="pl-7" value={reimbursementForm.amount} onChange={(e) => setReimbursementForm({ ...reimbursementForm, amount: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Enter description..." value={reimbursementForm.description} onChange={(e) => setReimbursementForm({ ...reimbursementForm, description: e.target.value })} />
            </div>
            <div className="flex gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setShowAddReimbursementSheet(false)} className="flex-1">Cancel</Button>
              <Button type="submit" className="flex-1">Add Reimbursement</Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Approve Dialog */}
      <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Settlement</AlertDialogTitle>
            <AlertDialogDescription>
              Approve this settlement for posting. This confirms all amounts are correct and verified.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4 space-y-4">
            <div className="border rounded-lg p-4 bg-muted/50 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Settlement #</span>
                <span className="font-mono font-medium">{settlement.settlementNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payee</span>
                <span className="font-medium">{settlement.payee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Net Pay</span>
                <span className="font-bold text-green-600">{formatCurrency(netPay)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Approval Notes (Optional)</Label>
              <Textarea
                placeholder="Add any notes about this approval..."
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-amber-500 hover:bg-amber-600 text-white">
              <CheckCircleIcon className="size-4 mr-2" />
              Approve Settlement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Post Dialog */}
      <AlertDialog open={showPostDialog} onOpenChange={setShowPostDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Post & Lock Settlement</AlertDialogTitle>
            <AlertDialogDescription>
              Posting will lock this settlement and generate documents. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <div className="border rounded-lg p-4 bg-muted/50 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Settlement #</span>
                <span className="font-mono font-medium">{settlement.settlementNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payee</span>
                <span className="font-medium">{settlement.payee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Net Pay</span>
                <span className="font-bold text-green-600">{formatCurrency(netPay)}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-2">
                <InfoIcon className="size-4 text-amber-600 mt-0.5" />
                <div className="text-sm text-amber-800 dark:text-amber-200">
                  <p className="font-medium">Actions on Post:</p>
                  <ul className="list-disc list-inside mt-1 text-xs">
                    <li>Status changes to Posted (locked)</li>
                    <li>Settlement items marked as Settled</li>
                    <li>Recurring deductions recorded</li>
                    <li>Escrow buckets updated</li>
                    <li>Settlement statement generated</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-purple-500 hover:bg-purple-600 text-white">
              <LockIcon className="size-4 mr-2" />
              Post & Lock
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Payment Dialog */}
      <AlertDialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark as Settled</AlertDialogTitle>
            <AlertDialogDescription>
              Confirm payment has been processed for this settlement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4 space-y-4">
            <div className="border rounded-lg p-4 bg-muted/50 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Settlement #</span>
                <span className="font-mono font-medium">{settlement.settlementNo}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payee</span>
                <span className="font-medium">{settlement.payee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Net Pay</span>
                <span className="font-bold text-green-600">{formatCurrency(netPay)}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Settlement Date</span>
              <span className="font-medium">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => {
                setShowPaymentDialog(false);
                navigate("/app/carrier-portal/billing/settlements?tab=history");
              }}
            >
              <CheckCircle2Icon className="size-4 mr-2" />
              Process Payment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Settlement</AlertDialogTitle>
            <AlertDialogDescription>
              Reject this settlement and send it back to Draft status for corrections.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4 space-y-4">
            <div className="border rounded-lg p-4 bg-muted/50 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Settlement #</span>
                <span className="font-mono font-medium">{settlement.settlementNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payee</span>
                <span className="font-medium">{settlement.payee}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Rejection Reason (Required)</Label>
              <Textarea
                placeholder="Please provide a reason for rejection..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white">
              <AlertTriangleIcon className="size-4 mr-2" />
              Reject Settlement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Worksheet-specific dialogs */}
      {isWorksheetMode && (
        <>
          {/* Mark as Approved Dialog */}
          <AlertDialog open={showMarkApprovedDialog} onOpenChange={setShowMarkApprovedDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Mark Worksheet as Approved</AlertDialogTitle>
                <AlertDialogDescription>
                  This will mark the worksheet as approved. Once approved, no further changes can be made to loads, deductions, or reimbursements.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    setWorksheetStatus("Approved");
                    setReviewedTimestamp(new Date().toISOString());
                    setShowMarkApprovedDialog(false);
                    // Redirect to History tab
                    navigate("/app/carrier-portal/billing/settlements?tab=history");
                  }}
                >
                  <CheckCircleIcon className="size-4 mr-2" />
                  Mark as Approved
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </>
      )}

      {/* Driver Details Modal - Available for Vendor type in both modes */}
      {settlement.payeeType === "Vendor" && (
        <AlertDialog open={showDriverModal} onOpenChange={setShowDriverModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{selectedDriver?.name}</AlertDialogTitle>
              <AlertDialogDescription>
                Driver performance for this settlement period
              </AlertDialogDescription>
            </AlertDialogHeader>
            {selectedDriver && (() => {
              const driverLoads = loads.filter(l => l.driverId === selectedDriver.id);
              const totalGross = driverLoads.reduce((sum, l) => sum + l.grossPay, 0);
              const totalFuelAdvance = driverLoads.reduce((sum, l) => sum + (l.fuelAdvance || 0), 0);

              return (
                <div className="py-4 space-y-4">
                  <div className="border rounded-lg p-4 bg-muted/50 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Driver ID</span>
                      <span className="font-mono font-medium">{selectedDriver.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Loads</span>
                      <span className="font-medium">{selectedDriver.loadsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gross Pay</span>
                      <span className="font-medium">{formatCurrency(totalGross)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fuel Advances</span>
                      <span className="font-medium text-orange-600">-{formatCurrency(totalFuelAdvance)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-medium">Net Pay</span>
                      <span className="font-bold text-green-600">{formatCurrency(totalGross - totalFuelAdvance)}</span>
                    </div>
                  </div>
                </div>
              );
            })()}
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default SettlementDetails;
