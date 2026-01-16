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
  DollarSign,
  TruckIcon,
  PlusIcon,
  History,
  LayoutDashboard,
  CreditCard,
  CheckCircle2Icon,
  ClockIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  Trash2Icon,
  SendIcon,
  ArrowRightIcon,
} from "lucide-react";

const SettlementDetails = () => {
  const { settlementNo } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "general";

  const [showAddDeductionSheet, setShowAddDeductionSheet] = useState(false);
  const [showAddReimbursementSheet, setShowAddReimbursementSheet] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

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

  // Mock settlement data
  const settlement = {
    settlementNo: settlementNo || "STL-2025-0001",
    payee: "John Smith",
    legalName: "John David Smith",
    payeeId: "DRV-001",
    payeeType: "Driver",
    payeeEmail: "john.smith@email.com",
    payeePhone: "(713) 555-1234",
    payeeAddress: "1234 Main Street",
    payeeCity: "Houston",
    payeeState: "TX",
    payeeZip: "77001",
    taxId: "***-**-1234",
    settlementCycle: "Weekly",
    payType: "Per Mile",
    payRate: "$0.55/mile",
    businessUnit: "Mega Trucking",
    periodStart: "2025-01-08",
    periodEnd: "2025-01-14",
    status: "Active",
    paymentMethod: "Direct Deposit",
    bankName: "Chase Bank",
    bankAccount: "****4521",
    createdDate: "2025-01-15",
    createdBy: "Sarah Johnson",
  };

  // Mock loads data
  const loads = [
    { id: 1, loadNo: "ML-2025-001245", origin: "Houston, TX", destination: "Dallas, TX", deliveredDate: "2025-01-08", revenue: 480.00, fsc: 48.00, accessorials: 75.00, grossPay: 603.00 },
    { id: 2, loadNo: "ML-2025-001248", origin: "Dallas, TX", destination: "Austin, TX", deliveredDate: "2025-01-09", revenue: 320.00, fsc: 32.00, accessorials: 50.00, grossPay: 402.00 },
    { id: 3, loadNo: "ML-2025-001252", origin: "Austin, TX", destination: "San Antonio, TX", deliveredDate: "2025-01-10", revenue: 180.00, fsc: 18.00, accessorials: 0.00, grossPay: 198.00 },
    { id: 4, loadNo: "ML-2025-001256", origin: "San Antonio, TX", destination: "Houston, TX", deliveredDate: "2025-01-11", revenue: 420.00, fsc: 42.00, accessorials: 100.00, grossPay: 562.00 },
    { id: 5, loadNo: "ML-2025-001260", origin: "Houston, TX", destination: "Fort Worth, TX", deliveredDate: "2025-01-12", revenue: 350.00, fsc: 35.00, accessorials: 0.00, grossPay: 385.00 },
  ];

  // Mock deductions
  const [deductions, setDeductions] = useState([
    { id: 1, type: "Insurance", description: "Weekly health insurance premium", amount: 50.00, recurring: true },
    { id: 2, type: "Fuel Advance", description: "Fuel advance - ML-2025-001245", amount: 150.00, recurring: false },
  ]);

  // Mock reimbursements
  const [reimbursements, setReimbursements] = useState([
    { id: 1, type: "Tolls", description: "Toll receipts - Dallas trip", amount: 45.00, receipt: "RCP-001" },
  ]);

  // Mock activity log
  const activityLog = [
    { id: 1, action: "Settlement created", user: "Sarah Johnson", timestamp: "2025-01-15 09:30 AM", details: "Created from 5 loads" },
    { id: 2, action: "Deduction added", user: "Sarah Johnson", timestamp: "2025-01-15 09:35 AM", details: "Insurance - $50.00" },
    { id: 3, action: "Deduction added", user: "Sarah Johnson", timestamp: "2025-01-15 09:36 AM", details: "Fuel Advance - $150.00" },
    { id: 4, action: "Reimbursement added", user: "Sarah Johnson", timestamp: "2025-01-15 09:40 AM", details: "Tolls - $45.00" },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const getStatusBadge = (status) => {
    const config = {
      Active: { color: "bg-amber-500/10 text-amber-700 border-amber-500/50", icon: ClockIcon },
      Paid: { color: "bg-green-500/10 text-green-700 border-green-500/50", icon: CheckCircle2Icon },
    };
    const c = config[status] || config["Active"];
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

  // Calculate totals
  const grossPay = loads.reduce((sum, l) => sum + l.grossPay, 0);
  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
  const totalReimbursements = reimbursements.reduce((sum, r) => sum + r.amount, 0);
  const netPay = grossPay - totalDeductions + totalReimbursements;

  const isActive = settlement.status === "Active";

  // Table columns
  const loadColumns = [
    {
      accessorKey: "loadNo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Load #" />,
      cell: ({ row }) => <span className="font-mono text-sm font-medium text-primary">{row.getValue("loadNo")}</span>,
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
      accessorKey: "deliveredDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Delivered" />,
      cell: ({ row }) => formatDate(row.getValue("deliveredDate")),
    },
    {
      accessorKey: "revenue",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Revenue" />,
      cell: ({ row }) => formatCurrency(row.getValue("revenue")),
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
      accessorKey: "grossPay",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Gross Pay" />,
      cell: ({ row }) => <span className="font-bold text-green-600">{formatCurrency(row.getValue("grossPay"))}</span>,
    },
  ];

  const deductionColumns = [
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
      accessorKey: "recurring",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Recurring" />,
      cell: ({ row }) => row.getValue("recurring") ? <Badge variant="outline">Yes</Badge> : <span className="text-muted-foreground">No</span>,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
      cell: ({ row }) => <span className="font-bold text-red-600">-{formatCurrency(row.getValue("amount"))}</span>,
    },
    ...(isActive ? [{
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => setDeductions(deductions.filter(d => d.id !== row.original.id))}>
          <Trash2Icon className="size-4" />
        </Button>
      ),
    }] : []),
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
      cell: ({ row }) => row.getValue("receipt") ? <span className="font-mono text-sm">{row.getValue("receipt")}</span> : <span className="text-muted-foreground">-</span>,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
      cell: ({ row }) => <span className="font-bold text-green-600">+{formatCurrency(row.getValue("amount"))}</span>,
    },
    ...(isActive ? [{
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => setReimbursements(reimbursements.filter(r => r.id !== row.original.id))}>
          <Trash2Icon className="size-4" />
        </Button>
      ),
    }] : []),
  ];

  const handleAddDeduction = (e) => {
    e.preventDefault();
    const newDeduction = {
      id: deductions.length + 1,
      type: deductionForm.type,
      description: deductionForm.description,
      amount: parseFloat(deductionForm.amount),
      recurring: false,
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
            {isActive && (
              <Button variant="outline" size="sm" onClick={() => setShowPaymentDialog(true)}>
                <CreditCard className="size-4 mr-2" />
                Mark as Paid
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

      {/* Tabs */}
      <Tabs defaultValue={activeTab} className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-shrink-0 px-6">
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
                  <DollarSign className="size-4" />
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
                <div className="px-4 py-3 bg-muted">
                  <p className="text-xs text-muted-foreground mb-2 font-semibold">Summary</p>
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">Loads</span>
                      <span className="text-sm font-medium">{loads.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">Gross Pay</span>
                      <span className="text-sm font-medium">{formatCurrency(grossPay)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">Deductions</span>
                      <span className="text-sm font-medium text-red-600">-{formatCurrency(totalDeductions)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">Reimbursements</span>
                      <span className="text-sm font-medium text-green-600">+{formatCurrency(totalReimbursements)}</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 flex justify-between items-center bg-green-50 dark:bg-green-950/20">
                  <span className="text-sm font-semibold text-green-700 dark:text-green-400">Net Pay</span>
                  <span className="text-lg font-bold text-green-600">{formatCurrency(netPay)}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Loads Tab */}
        <TabsContent value="loads" className="flex-1 overflow-auto p-6 mt-0">
          <DataTable columns={loadColumns} data={loads} showViewOptions={false} pageSize={10} />
          <div className="mt-4 flex justify-end">
            <div className="border rounded-lg p-4 bg-muted/50 w-64">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Total Revenue</span>
                <span className="font-medium">{formatCurrency(loads.reduce((s, l) => s + l.revenue, 0))}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Total FSC</span>
                <span className="font-medium">{formatCurrency(loads.reduce((s, l) => s + l.fsc, 0))}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Total Accessorials</span>
                <span className="font-medium">{formatCurrency(loads.reduce((s, l) => s + l.accessorials, 0))}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-medium">Gross Pay</span>
                <span className="font-bold text-green-600">{formatCurrency(grossPay)}</span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Deductions Tab */}
        <TabsContent value="deductions" className="flex-1 overflow-auto p-6 mt-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Deductions</h3>
            {isActive && (
              <Button size="sm" onClick={() => setShowAddDeductionSheet(true)}>
                <PlusIcon className="size-4 mr-2" />
                Add Deduction
              </Button>
            )}
          </div>
          <DataTable columns={deductionColumns} data={deductions} showViewOptions={false} pageSize={10} />
          <div className="mt-4 flex justify-end">
            <div className="border rounded-lg p-4 bg-red-50 dark:bg-red-950/20 w-64">
              <div className="flex justify-between">
                <span className="font-medium text-red-600">Total Deductions</span>
                <span className="font-bold text-red-600">-{formatCurrency(totalDeductions)}</span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Reimbursements Tab */}
        <TabsContent value="reimbursements" className="flex-1 overflow-auto p-6 mt-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Reimbursements</h3>
            {isActive && (
              <Button size="sm" onClick={() => setShowAddReimbursementSheet(true)}>
                <PlusIcon className="size-4 mr-2" />
                Add Reimbursement
              </Button>
            )}
          </div>
          <DataTable columns={reimbursementColumns} data={reimbursements} showViewOptions={false} pageSize={10} />
          <div className="mt-4 flex justify-end">
            <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950/20 w-64">
              <div className="flex justify-between">
                <span className="font-medium text-green-600">Total Reimbursements</span>
                <span className="font-bold text-green-600">+{formatCurrency(totalReimbursements)}</span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="flex-1 overflow-auto p-6 mt-0">
          <div className="space-y-4">
            {activityLog.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg bg-card">
                <div className="p-2 rounded-full bg-muted">
                  <History className="size-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.details}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span>{activity.user}</span>
                    <span>•</span>
                    <span>{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

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
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Insurance">Insurance</SelectItem>
                  <SelectItem value="Fuel Advance">Fuel Advance</SelectItem>
                  <SelectItem value="Cash Advance">Cash Advance</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
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
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tolls">Tolls</SelectItem>
                  <SelectItem value="Scale Tickets">Scale Tickets</SelectItem>
                  <SelectItem value="Lumper Fees">Lumper Fees</SelectItem>
                  <SelectItem value="Detention">Detention</SelectItem>
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

      {/* Mark as Paid Dialog */}
      <AlertDialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark as Paid</AlertDialogTitle>
            <AlertDialogDescription>
              Mark this settlement as paid. This will update the status to Paid.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <div className="border rounded-lg p-4 bg-muted/50 space-y-2">
              <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><span className="font-bold text-green-600">{formatCurrency(netPay)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Payee</span><span className="font-medium">{settlement.payee}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Method</span><span className="font-medium">{settlement.paymentMethod}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Account</span><span className="font-mono">{settlement.bankAccount}</span></div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Mark as Paid</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SettlementDetails;
