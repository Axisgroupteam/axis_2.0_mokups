import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
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
  ArrowLeftIcon,
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
  InfoIcon,
  AlertTriangleIcon,
  FileSpreadsheetIcon,
  ExternalLinkIcon,
} from "lucide-react";

const SettlementDetails = () => {
  const { settlementNo } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "general";
  const statusParam = searchParams.get("status") || "Approved";

  const [showAddDeductionSheet, setShowAddDeductionSheet] = useState(false);
  const [showAddReimbursementSheet, setShowAddReimbursementSheet] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

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
  const [paymentForm, setPaymentForm] = useState({
    method: "ach",
    date: new Date().toISOString().split('T')[0],
    reference: "",
  });

  // Mock settlement data with full workflow info
  const settlement = {
    settlementNo: settlementNo || "STL-2025-0001",
    batchNo: "BATCH-2025-W02",
    payee: "Smith Trucking LLC",
    legalName: "Smith Trucking LLC",
    payeeId: "PAY-001",
    payeeType: "Owner Operator",
    payeeEmail: "john.smith@smithtrucking.com",
    payeePhone: "(713) 555-1234",
    payeeAddress: "4521 Industrial Blvd, Suite 200",
    payeeCity: "Houston",
    payeeState: "TX",
    payeeZip: "77041",
    taxId: "**-***4567",
    settlementCycle: "Weekly",
    payType: "Per Mile",
    payRate: "$0.58/mile + FSC",
    businessUnit: "Mega Trucking",
    periodStart: "2025-01-08",
    periodEnd: "2025-01-14",
    status: statusParam, // Approved or Settled
    paymentMethod: "ACH",
    bankName: "Chase Business",
    bankAccount: "****4521",
    routingNumber: "****1234",
    // Workflow timestamps
    createdDate: "2025-01-15",
    createdBy: "Amanda Wilson",
    readyDate: "2025-01-15",
    readyBy: "Amanda Wilson",
    approvedDate: "2025-01-16",
    approvedBy: "Robert Chen",
    approvalNotes: "All load pay verified against rate confirmations. Deductions confirmed.",
    postedDate: null,
    postedBy: null,
    paidDate: null,
    paidBy: null,
    paymentRef: null,
    // Factoring info
    factoringEnabled: false,
    factoringCompany: null,
  };

  // Mock loads data with more detail
  const loads = [
    {
      id: 1,
      loadNo: "ML-2025-001245",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      deliveredDate: "2025-01-08",
      customer: "Titan Construction",
      miles: 243,
      linehaul: 1458.00,
      fsc: 145.80,
      stopOffs: 0,
      detention: 175.00,
      layover: 0,
      lumper: 0,
      accessorials: 175.00,
      fuelAdvance: 425.00,
      grossPay: 1778.80,
      netPay: 1353.80,
    },
    {
      id: 2,
      loadNo: "ML-2025-001248",
      origin: "Dallas, TX",
      destination: "Austin, TX",
      customer: "TQL Logistics",
      deliveredDate: "2025-01-09",
      miles: 195,
      linehaul: 1170.00,
      fsc: 117.00,
      stopOffs: 75.00,
      detention: 0,
      layover: 0,
      lumper: 0,
      accessorials: 75.00,
      fuelAdvance: 350.00,
      grossPay: 1362.00,
      netPay: 1012.00,
    },
    {
      id: 3,
      loadNo: "ML-2025-001252",
      origin: "Austin, TX",
      destination: "El Paso, TX",
      customer: "CH Robinson",
      deliveredDate: "2025-01-10",
      miles: 578,
      linehaul: 2312.00,
      fsc: 231.20,
      stopOffs: 0,
      detention: 0,
      layover: 250.00,
      lumper: 0,
      accessorials: 250.00,
      fuelAdvance: 520.00,
      grossPay: 2793.20,
      netPay: 2273.20,
    },
  ];

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

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric", month: "short", day: "numeric",
      hour: "numeric", minute: "2-digit"
    });
  };

  const getStatusBadge = (status) => {
    const config = {
      Draft: { color: "bg-slate-500/10 text-slate-700 border-slate-500/50", icon: Edit2Icon },
      Ready: { color: "bg-blue-500/10 text-blue-700 border-blue-500/50", icon: ListChecksIcon },
      Approved: { color: "bg-amber-500/10 text-amber-700 border-amber-500/50", icon: CheckCircleIcon },
      Posted: { color: "bg-purple-500/10 text-purple-700 border-purple-500/50", icon: LockIcon },
      Paid: { color: "bg-green-500/10 text-green-700 border-green-500/50", icon: CheckCircle2Icon },
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
      Technician: "bg-purple-500/10 text-purple-700 border-purple-500/50",
      Carrier: "bg-cyan-500/10 text-cyan-700 border-cyan-500/50",
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
  const isSettled = settlement.status === "Settled";
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
      cell: ({ row }) => <span className="font-medium">{row.getValue("type")}</span>,
    },
    {
      accessorKey: "category",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
      cell: ({ row }) => (
        <Badge className={getCategoryBadge(row.getValue("category"))}>
          {row.getValue("category")}
        </Badge>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
      cell: ({ row }) => {
        const loadNo = row.original.loadNo;
        return (
          <div>
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
      cell: ({ row }) => <span className="font-bold text-red-600">-{formatCurrency(row.getValue("amount"))}</span>,
    },
  ];

  const reimbursementColumns = [
    {
      accessorKey: "type",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => <span className="font-medium">{row.getValue("type")}</span>,
    },
    {
      accessorKey: "description",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
    },
    {
      accessorKey: "receipt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Receipt" />,
      cell: ({ row }) => row.getValue("receipt") ? (
        <button className="font-mono text-sm text-primary hover:underline flex items-center gap-1">
          {row.getValue("receipt")}
          <ExternalLinkIcon className="size-3" />
        </button>
      ) : (
        <span className="text-muted-foreground">-</span>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
      cell: ({ row }) => <span className="font-bold text-green-600">+{formatCurrency(row.getValue("amount"))}</span>,
    },
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
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/app/carrier-portal/billing/settlements")}>
              <ArrowLeftIcon className="size-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Wallet className="size-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold">{settlement.settlementNo}</h1>
                  {getStatusBadge(settlement.status)}
                  <span className="text-xs text-muted-foreground font-mono">{settlement.batchNo}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{settlement.payee}</span>
                  <Badge variant="outline" className={getPayeeTypeBadge(settlement.payeeType)}>
                    {settlement.payeeType}
                  </Badge>
                  <span className="mx-1">•</span>
                  <span>{formatDate(settlement.periodStart)} - {formatDate(settlement.periodEnd)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Status-based action buttons */}
            {canMarkSettled && (
              <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => setShowPaymentDialog(true)}>
                <CheckCircle2Icon className="size-4 mr-2" />
                Mark as Settled
              </Button>
            )}
            <Button variant="outline" size="sm">
              <DownloadIcon className="size-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <SendIcon className="size-4 mr-2" />
              Email
            </Button>
          </div>
        </div>
      </div>

      {/* Workflow Progress Bar */}
      <div className="flex-shrink-0 px-6 py-3 border-b bg-muted/30">
        <div className="flex items-center">
          {/* Generated */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-green-500">
              <FileSpreadsheetIcon className="size-3 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium">Generated</p>
              <p className="text-[10px] text-muted-foreground">{formatDateTime(settlement.createdDate)}</p>
            </div>
          </div>
          <div className="flex-1 h-0.5 mx-4 bg-green-500" />

          {/* Approved */}
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-full transition-all duration-500 ${isApproved || isSettled ? 'bg-green-500' : 'bg-slate-300'}`}>
              <CheckCircleIcon className="size-3 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium">Approved</p>
              <p className="text-[10px] text-muted-foreground">{formatDateTime(settlement.approvedDate)}</p>
            </div>
          </div>
          <div className={`flex-1 h-0.5 mx-4 transition-all duration-700 ${isSettled ? 'bg-green-500' : 'bg-slate-300'}`} />

          {/* Settled */}
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-full transition-all duration-500 ${isSettled ? 'bg-green-500' : 'bg-slate-300'}`}>
              <CheckCircle2Icon className="size-3 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium">Settled</p>
              <p className="text-[10px] text-muted-foreground">{isSettled ? formatDateTime(settlement.paidDate || new Date().toISOString()) : '-'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue={activeTab} className="flex-1 flex flex-col overflow-hidden">
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
            <TabsTrigger value="statement" className="h-full">
              <FileTextIcon className="size-4" />
              Statement
            </TabsTrigger>
            <TabsTrigger value="activity" className="h-full">
              <History className="size-4" />
              Audit Log
            </TabsTrigger>
          </TabsList>
        </div>

        {/* General Tab */}
        <TabsContent value="general" className="flex-1 overflow-auto px-4 py-4 mt-0">
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

            {/* Settlement Details Card */}
            <div className="flex-1 border rounded-sm bg-card">
              <div className="px-4 py-3 border-b bg-muted">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Wallet className="size-4" />
                  Settlement Details
                </h3>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Period Start</p>
                    <p className="text-sm font-medium text-foreground">{formatDate(settlement.periodStart)}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Period End</p>
                    <p className="text-sm font-medium text-foreground">{formatDate(settlement.periodEnd)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Business Unit</p>
                    <p className="text-sm font-medium text-foreground">{settlement.businessUnit}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Settlement Cycle</p>
                    <p className="text-sm font-medium text-foreground">{settlement.settlementCycle}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Pay Type</p>
                    <p className="text-sm font-medium text-foreground">{settlement.payType}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Pay Rate</p>
                    <p className="text-sm font-medium text-foreground">{settlement.payRate}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Created Date</p>
                    <p className="text-sm font-medium text-foreground">{formatDate(settlement.createdDate)}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Created By</p>
                    <p className="text-sm font-medium text-foreground">{settlement.createdBy}</p>
                  </div>
                </div>
                {settlement.approvedBy && (
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Approved Date</p>
                      <p className="text-sm font-medium text-foreground">{formatDate(settlement.approvedDate)}</p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Approved By</p>
                      <p className="text-sm font-medium text-foreground">{settlement.approvedBy}</p>
                    </div>
                  </div>
                )}
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
        </TabsContent>

        {/* Loads Tab */}
        <TabsContent value="loads" className="flex-1 overflow-auto p-6 mt-0">
          <DataTable columns={loadColumns} data={loads} showViewOptions={false} pageSize={10} />
          <div className="mt-4 flex justify-end">
            <div className="border rounded-lg p-4 bg-muted/50 w-80">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Linehaul</span>
                  <span className="font-medium">{formatCurrency(loads.reduce((s, l) => s + l.linehaul, 0))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total FSC</span>
                  <span className="font-medium">{formatCurrency(loads.reduce((s, l) => s + l.fsc, 0))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Accessorials</span>
                  <span className="font-medium">{formatCurrency(loads.reduce((s, l) => s + l.accessorials, 0))}</span>
                </div>
                <div className="flex justify-between text-amber-600">
                  <span>Total Fuel Advances</span>
                  <span className="font-medium">-{formatCurrency(loads.reduce((s, l) => s + l.fuelAdvance, 0))}</span>
                </div>
              </div>
              <div className="flex justify-between pt-3 mt-3 border-t">
                <span className="font-semibold">Total Gross Pay</span>
                <span className="font-bold text-green-600">{formatCurrency(grossPay)}</span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Deductions Tab */}
        <TabsContent value="deductions" className="flex-1 overflow-auto p-6 mt-0">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold">Deductions</h3>
              <p className="text-sm text-muted-foreground">Recurring, one-time, and load-based deductions</p>
            </div>
          </div>
          <DataTable columns={deductionColumns} data={deductions} showViewOptions={false} pageSize={10} />
          <div className="mt-4 flex justify-end">
            <div className="border rounded-lg p-4 bg-red-50 dark:bg-red-950/20 w-80">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recurring</span>
                  <span className="font-medium text-red-600">-{formatCurrency(recurringDeductions)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">One-Time</span>
                  <span className="font-medium text-red-600">-{formatCurrency(oneTimeDeductions)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Load-Based (Advances)</span>
                  <span className="font-medium text-red-600">-{formatCurrency(deductions.filter(d => d.category === "Load").reduce((s, d) => s + d.amount, 0))}</span>
                </div>
              </div>
              <div className="flex justify-between pt-3 mt-3 border-t border-red-200">
                <span className="font-semibold text-red-700">Total Deductions</span>
                <span className="font-bold text-red-600">-{formatCurrency(totalDeductions)}</span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Reimbursements Tab */}
        <TabsContent value="reimbursements" className="flex-1 overflow-auto p-6 mt-0">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold">Reimbursements</h3>
              <p className="text-sm text-muted-foreground">Tolls, scale tickets, lumper fees, and other reimbursements</p>
            </div>
          </div>
          <DataTable columns={reimbursementColumns} data={reimbursements} showViewOptions={false} pageSize={10} />
          <div className="mt-4 flex justify-end">
            <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950/20 w-64">
              <div className="flex justify-between">
                <span className="font-semibold text-green-700">Total Reimbursements</span>
                <span className="font-bold text-green-600">+{formatCurrency(totalReimbursements)}</span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Statement Tab */}
        <TabsContent value="statement" className="flex-1 overflow-auto p-6 mt-0">
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
        <TabsContent value="activity" className="flex-1 overflow-auto p-6 mt-0">
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
      </Tabs>

      {/* ============ DIALOGS AND SHEETS ============ */}

      {/* Add Deduction Sheet */}
      <Sheet open={showAddDeductionSheet} onOpenChange={setShowAddDeductionSheet}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader className="pb-4 border-b">
            <SheetTitle>Add Deduction</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleAddDeduction} className="space-y-4 mt-4">
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
          <SheetHeader className="pb-4 border-b">
            <SheetTitle>Add Reimbursement</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleAddReimbursement} className="space-y-4 mt-4">
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
        <AlertDialogContent className="max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Process Payment</AlertDialogTitle>
            <AlertDialogDescription>
              Execute payment for this settlement. This will mark the settlement as Paid.
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
                <span className="text-muted-foreground">Amount</span>
                <span className="font-bold text-green-600">{formatCurrency(netPay)}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select value={paymentForm.method} onValueChange={(v) => setPaymentForm({ ...paymentForm, method: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ach">ACH Transfer</SelectItem>
                    <SelectItem value="direct-deposit">Direct Deposit</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="manual">Mark as Paid (Manual)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Payment Date</Label>
                <Input type="date" value={paymentForm.date} onChange={(e) => setPaymentForm({ ...paymentForm, date: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Reference # (Optional)</Label>
                <Input placeholder="ACH-123456 or Check #" value={paymentForm.reference} onChange={(e) => setPaymentForm({ ...paymentForm, reference: e.target.value })} />
              </div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-2">
                <InfoIcon className="size-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium">Payment Details:</p>
                  <p className="text-xs mt-1">
                    {settlement.bankName} - Account ending in {settlement.bankAccount?.slice(-4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-green-500 hover:bg-green-600 text-white">
              <CreditCard className="size-4 mr-2" />
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
    </div>
  );
};

export default SettlementDetails;
