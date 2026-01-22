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
  FileSpreadsheetIcon,
  DownloadIcon,
  TruckIcon,
  PlusIcon,
  History,
  LayoutDashboard,
  ClockIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  Trash2Icon,
  ArrowRightIcon,
  UserIcon,
  WrenchIcon,
  PrinterIcon,
  CheckCircleIcon,
  CheckCircle2Icon,
  ExternalLinkIcon,
  PlayIcon,
  CreditCard,
} from "lucide-react";

const WorksheetDetails = () => {
  const { worksheetNo } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "general";
  const statusParam = searchParams.get("status"); // "reviewed" or null (defaults to pending)

  const [showAddDeductionSheet, setShowAddDeductionSheet] = useState(false);
  const [showAddReimbursementSheet, setShowAddReimbursementSheet] = useState(false);
  const [showMarkApprovedDialog, setShowMarkApprovedDialog] = useState(false);
  const [showCreateSettlementDialog, setShowCreateSettlementDialog] = useState(false);

  // Local state to track worksheet status (for animation)
  const [worksheetStatus, setWorksheetStatus] = useState(statusParam === "reviewed" ? "Approved" : "Pending Review");
  const [reviewedTimestamp, setApprovedTimestamp] = useState(statusParam === "reviewed" ? "2025-01-15T14:30:00" : null);

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

  // Determine if reviewed based on local state
  const isApprovedStatus = worksheetStatus === "Approved";

  // Mock worksheet data - uses local state for status
  const worksheet = {
    worksheetNo: worksheetNo || "WS-2025-0001",
    payeeId: "PAY-001",
    payeeName: "Smith Trucking LLC",
    legalName: "Smith Trucking LLC",
    payeeType: "Owner Operator",
    payeeEmail: "john.smith@smithtrucking.com",
    payeePhone: "(713) 555-1234",
    payeeAddress: "4521 Industrial Blvd, Suite 200",
    payeeCity: "Houston",
    payeeState: "TX",
    payeeZip: "77041",
    taxId: "**-***4567",
    cycleType: "Weekly",
    periodStart: "2025-01-08",
    periodEnd: "2025-01-14",
    status: worksheetStatus,
    paymentMethod: "Bank Transfer",
    bankName: "Chase Business",
    bankAccount: "****4521",
    generatedDate: "2025-01-15",
    generatedBy: "System",
    reviewedDate: reviewedTimestamp,
    reviewedBy: isApprovedStatus ? "Amanda Wilson" : null,
    businessUnit: "Mega Trucking",
  };

  // Mock loads data with driver breakdown
  const [drivers] = useState([
    {
      driverId: "DRV-001",
      driverName: "John Smith",
      driverType: "Driver",
      loads: [
        {
          id: 1,
          loadNo: "ML-2025-001245",
          deliveredDate: "2025-01-08",
          customer: "Titan Construction",
          origin: "Houston, TX",
          destination: "Dallas, TX",
          miles: 243,
          linehaul: 1458.00,
          fsc: 145.80,
          accessorials: [{ type: "Detention", amount: 175.00 }],
          fuelAdvance: 425.00,
          grossPay: 1778.80,
          netPay: 1353.80,
        },
        {
          id: 2,
          loadNo: "ML-2025-001248",
          deliveredDate: "2025-01-09",
          customer: "TQL Logistics",
          origin: "Dallas, TX",
          destination: "Austin, TX",
          miles: 195,
          linehaul: 1170.00,
          fsc: 117.00,
          accessorials: [{ type: "Stop-off", amount: 75.00 }],
          fuelAdvance: 350.00,
          grossPay: 1362.00,
          netPay: 1012.00,
        },
      ],
    },
    {
      driverId: "DRV-002",
      driverName: "Mike Davis",
      driverType: "Driver",
      loads: [
        {
          id: 3,
          loadNo: "ML-2025-001252",
          deliveredDate: "2025-01-10",
          customer: "CH Robinson",
          origin: "Austin, TX",
          destination: "El Paso, TX",
          miles: 578,
          linehaul: 2312.00,
          fsc: 231.20,
          accessorials: [{ type: "Layover", amount: 250.00 }],
          fuelAdvance: 520.00,
          grossPay: 2793.20,
          netPay: 2273.20,
        },
      ],
    },
  ]);

  // Flatten loads for table display
  const allLoads = drivers.flatMap(driver =>
    driver.loads.map(load => ({
      ...load,
      driverName: driver.driverName,
      driverId: driver.driverId,
      driverType: driver.driverType,
    }))
  );

  // Mock deductions
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

  // Activity log - conditional based on status
  const baseActivityLog = [
    { id: 1, action: "Worksheet Generated", status: "Pending Review", user: "System", timestamp: "2025-01-15 06:00 AM", details: "Auto-generated from batch job for weekly cycle", icon: FileSpreadsheetIcon },
    { id: 2, action: "Loads Added", status: "Pending Review", user: "System", timestamp: "2025-01-15 06:00 AM", details: "3 loads from DRV-001 (John Smith), DRV-002 (Mike Davis)", icon: TruckIcon },
    { id: 3, action: "Recurring Deductions Applied", status: "Pending Review", user: "System", timestamp: "2025-01-15 06:00 AM", details: "Equipment Insurance ($275), Lease Payment ($875), Escrow ($150)", icon: MinusCircleIcon },
    { id: 4, action: "Fuel Advances Applied", status: "Pending Review", user: "System", timestamp: "2025-01-15 06:00 AM", details: "3 fuel advances totaling $1,295.00 from load data", icon: MinusCircleIcon },
    { id: 5, action: "Reimbursement Added", status: "Pending Review", user: "Amanda Wilson", timestamp: "2025-01-15 09:45 AM", details: "Tolls - $87.50 (Receipt: RCP-2025-0142)", icon: PlusCircleIcon },
    { id: 6, action: "Reimbursement Added", status: "Pending Review", user: "Amanda Wilson", timestamp: "2025-01-15 09:47 AM", details: "Scale Tickets - $32.00 (Receipt: RCP-2025-0143)", icon: PlusCircleIcon },
    { id: 7, action: "One-Time Deduction Added", status: "Pending Review", user: "Amanda Wilson", timestamp: "2025-01-15 09:50 AM", details: "Cash Advance - $500.00", icon: MinusCircleIcon },
  ];

  // Add review activity if worksheet is reviewed
  const activityLog = isApprovedStatus
    ? [
        ...baseActivityLog,
        { id: 8, action: "Worksheet Approved", status: "Approved", user: "Amanda Wilson", timestamp: "2025-01-15 02:30 PM", details: "All loads, deductions, and reimbursements verified. Ready for settlement.", icon: CheckCircleIcon },
      ]
    : baseActivityLog;

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
      "Pending Review": { color: "bg-amber-500/10 text-amber-700 border-amber-500/50", icon: ClockIcon },
      "Approved": { color: "bg-green-500/10 text-green-700 border-green-500/50", icon: CheckCircleIcon },
    };
    const c = config[status] || config["Pending Review"];
    const Icon = c.icon;
    return (
      <Badge className={`${c.color} transition-all duration-500 ease-in-out`}>
        <Icon className="size-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getPayeeTypeBadge = (type) => {
    const colors = {
      "Owner Operator": "bg-emerald-500/10 text-emerald-700 border-emerald-500/50",
      "Company Driver": "bg-indigo-500/10 text-indigo-700 border-indigo-500/50",
      Technician: "bg-purple-500/10 text-purple-700 border-purple-500/50",
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
  const grossPay = allLoads.reduce((sum, l) => sum + l.grossPay, 0);
  const recurringDeductions = deductions.filter(d => d.category === "Recurring").reduce((sum, d) => sum + d.amount, 0);
  const oneTimeDeductions = deductions.filter(d => d.category === "One-Time").reduce((sum, d) => sum + d.amount, 0);
  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
  const totalReimbursements = reimbursements.reduce((sum, r) => sum + r.amount, 0);
  const netPay = grossPay - totalDeductions + totalReimbursements;

  // Status checks
  const isPendingReview = worksheet.status === "Pending Review";
  const isApproved = worksheet.status === "Approved";
  const canEdit = isPendingReview;

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
      accessorKey: "driverName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Driver" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.driverType === "Technician" ? (
            <WrenchIcon className="size-3 text-purple-600" />
          ) : (
            <UserIcon className="size-3 text-blue-600" />
          )}
          <span className="text-sm">{row.getValue("driverName")}</span>
        </div>
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
      id: "accessorials",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Accessorials" />,
      cell: ({ row }) => {
        const acc = row.original.accessorials.reduce((s, a) => s + a.amount, 0);
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
    ...(canEdit ? [{
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
    ...(canEdit ? [{
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
                <FileSpreadsheetIcon className="size-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold">{worksheet.worksheetNo}</h1>
                  {getStatusBadge(worksheet.status)}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{worksheet.payeeName}</span>
                  <Badge variant="outline" className={getPayeeTypeBadge(worksheet.payeeType)}>
                    {worksheet.payeeType}
                  </Badge>
                  <span className="mx-1">•</span>
                  <span>{formatDate(worksheet.periodStart)} - {formatDate(worksheet.periodEnd)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Status-based action buttons */}
            {isPendingReview && (
              <>
                <Button size="sm" variant="outline" onClick={() => setShowMarkApprovedDialog(true)}>
                  <CheckCircleIcon className="size-4 mr-2" />
                  Mark as Approved
                </Button>
                <Button size="sm" className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90" onClick={() => setShowCreateSettlementDialog(true)}>
                  <PlayIcon className="size-4 mr-2" />
                  Create Settlement
                </Button>
              </>
            )}
            {isApproved && (
              <Button size="sm" className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90" onClick={() => setShowCreateSettlementDialog(true)}>
                <PlayIcon className="size-4 mr-2" />
                Create Settlement
              </Button>
            )}
            <Button variant="outline" size="sm">
              <DownloadIcon className="size-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <PrinterIcon className="size-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </div>

      {/* Workflow Progress Bar */}
      <div className="flex-shrink-0 px-6 py-3 border-b bg-muted/30">
        <div className="flex items-center">
          {/* Generated */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-green-500 transition-all duration-500">
              <FileSpreadsheetIcon className="size-3 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium">Generated</p>
              <p className="text-[10px] text-muted-foreground">{formatDateTime(worksheet.generatedDate)}</p>
            </div>
          </div>
          <div className={`flex-1 h-0.5 mx-4 transition-all duration-700 ease-in-out ${isApproved ? 'bg-green-500' : 'bg-slate-300'}`} />

          {/* Approved */}
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-full transition-all duration-500 ease-in-out ${isApproved ? 'bg-green-500 scale-110' : 'bg-slate-300'}`}>
              <CheckCircleIcon className={`size-3 transition-all duration-500 ${isApproved ? 'text-white' : 'text-white'}`} />
            </div>
            <div>
              <p className={`text-xs font-medium transition-colors duration-500 ${isApproved ? 'text-green-600' : ''}`}>Approved</p>
              <p className="text-[10px] text-muted-foreground transition-all duration-500">{isApproved ? formatDateTime(worksheet.reviewedDate) : '-'}</p>
            </div>
          </div>
          <div className="flex-1 h-0.5 mx-4 bg-slate-300 transition-all duration-700" />

          {/* Settled */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-slate-300 transition-all duration-500">
              <CheckCircle2Icon className="size-3 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium">Settled</p>
              <p className="text-[10px] text-muted-foreground">-</p>
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
              Loads ({allLoads.length})
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
              Activity Log
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
                    <p className="text-sm font-medium text-foreground">{worksheet.payeeName}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Payee ID</p>
                    <p className="text-sm font-medium text-foreground font-mono">{worksheet.payeeId}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Legal Name</p>
                    <p className="text-sm font-medium text-foreground">{worksheet.legalName}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Tax ID</p>
                    <p className="text-sm font-medium text-foreground font-mono">{worksheet.taxId}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                    <p className="text-sm font-medium text-foreground">{worksheet.payeePhone}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                    <p className="text-sm font-medium text-primary">{worksheet.payeeEmail}</p>
                  </div>
                </div>
                <div className="px-4 py-2.5">
                  <p className="text-xs text-muted-foreground mb-0.5">Address</p>
                  <p className="text-sm font-medium text-foreground">{worksheet.payeeAddress}, {worksheet.payeeCity}, {worksheet.payeeState} {worksheet.payeeZip}</p>
                </div>
              </div>
            </div>

            {/* Worksheet Details Card */}
            <div className="flex-1 border rounded-sm bg-card">
              <div className="px-4 py-3 border-b bg-muted">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FileSpreadsheetIcon className="size-4" />
                  Worksheet Details
                </h3>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Period Start</p>
                    <p className="text-sm font-medium text-foreground">{formatDate(worksheet.periodStart)}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Period End</p>
                    <p className="text-sm font-medium text-foreground">{formatDate(worksheet.periodEnd)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Business Unit</p>
                    <p className="text-sm font-medium text-foreground">{worksheet.businessUnit}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Settlement Cycle</p>
                    <p className="text-sm font-medium text-foreground">{worksheet.cycleType}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Generated Date</p>
                    <p className="text-sm font-medium text-foreground">{formatDate(worksheet.generatedDate)}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Generated By</p>
                    <p className="text-sm font-medium text-foreground">{worksheet.generatedBy}</p>
                  </div>
                </div>
                {worksheet.reviewedBy && (
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Approved Date</p>
                      <p className="text-sm font-medium text-foreground">{formatDate(worksheet.reviewedDate)}</p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Approved By</p>
                      <p className="text-sm font-medium text-foreground">{worksheet.reviewedBy}</p>
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
                  <p className="text-sm font-medium text-foreground">{worksheet.paymentMethod}</p>
                </div>
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Bank</p>
                    <p className="text-sm font-medium text-foreground">{worksheet.bankName}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Account</p>
                    <p className="text-sm font-medium text-foreground font-mono">{worksheet.bankAccount}</p>
                  </div>
                </div>
                <div className="px-4 py-3 bg-muted">
                  <p className="text-xs text-muted-foreground mb-2 font-semibold">Summary</p>
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">Loads ({allLoads.length})</span>
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
          {/* Loads by Driver Summary */}
          <div className="mb-6 grid grid-cols-3 gap-4">
            {drivers.map((driver) => (
              <div key={driver.driverId} className="border rounded-lg p-4 bg-card">
                <div className="flex items-center gap-2 mb-3">
                  {driver.driverType === "Technician" ? (
                    <WrenchIcon className="size-4 text-purple-600" />
                  ) : (
                    <UserIcon className="size-4 text-blue-600" />
                  )}
                  <span className="font-medium">{driver.driverName}</span>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {driver.loads.length} loads
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gross Pay</span>
                    <span className="font-medium">{formatCurrency(driver.loads.reduce((s, l) => s + l.grossPay, 0))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fuel Advances</span>
                    <span className="font-medium text-amber-600">-{formatCurrency(driver.loads.reduce((s, l) => s + l.fuelAdvance, 0))}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-medium">Net Pay</span>
                    <span className="font-bold text-green-600">{formatCurrency(driver.loads.reduce((s, l) => s + l.netPay, 0))}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DataTable columns={loadColumns} data={allLoads} showViewOptions={false} pageSize={10} />
          <div className="mt-4 flex justify-end">
            <div className="border rounded-lg p-4 bg-muted/50 w-80">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Linehaul</span>
                  <span className="font-medium">{formatCurrency(allLoads.reduce((s, l) => s + l.linehaul, 0))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total FSC</span>
                  <span className="font-medium">{formatCurrency(allLoads.reduce((s, l) => s + l.fsc, 0))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Accessorials</span>
                  <span className="font-medium">{formatCurrency(allLoads.reduce((s, l) => s + l.accessorials.reduce((a, c) => a + c.amount, 0), 0))}</span>
                </div>
                <div className="flex justify-between text-amber-600">
                  <span>Total Fuel Advances</span>
                  <span className="font-medium">-{formatCurrency(allLoads.reduce((s, l) => s + l.fuelAdvance, 0))}</span>
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
            {canEdit && (
              <Button size="sm" onClick={() => setShowAddDeductionSheet(true)}>
                <PlusIcon className="size-4 mr-2" />
                Add Deduction
              </Button>
            )}
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
            {canEdit && (
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
                <span className="font-semibold text-green-700">Total Reimbursements</span>
                <span className="font-bold text-green-600">+{formatCurrency(totalReimbursements)}</span>
              </div>
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
                        activity.status === "Approved" ? "bg-green-500/10" :
                        "bg-amber-500/10"
                      }`}>
                        <Icon className={`size-4 ${
                          activity.status === "Approved" ? "text-green-600" :
                          "text-amber-600"
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
        <SheetContent side="right" className="w-full sm:max-w-md px-6">
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
        <SheetContent side="right" className="w-full sm:max-w-md px-6">
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

      {/* Mark as Approved Dialog */}
      <AlertDialog open={showMarkApprovedDialog} onOpenChange={setShowMarkApprovedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark Worksheet as Approved</AlertDialogTitle>
            <AlertDialogDescription>
              This confirms you have reviewed all loads, deductions, and reimbursements in this worksheet.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <div className="border rounded-lg p-4 bg-muted/50 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Worksheet #</span>
                <span className="font-mono font-medium">{worksheet.worksheetNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payee</span>
                <span className="font-medium">{worksheet.payeeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Net Pay</span>
                <span className="font-bold text-green-600">{formatCurrency(netPay)}</span>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              onClick={() => {
                // Update local state to trigger animation
                setWorksheetStatus("Approved");
                setApprovedTimestamp(new Date().toISOString());
              }}
            >
              <CheckCircleIcon className="size-4 mr-2" />
              Mark as Approved
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create Settlement Dialog */}
      <AlertDialog open={showCreateSettlementDialog} onOpenChange={setShowCreateSettlementDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Settlement</AlertDialogTitle>
            <AlertDialogDescription>
              Create a settlement from this worksheet. The settlement will be created with Pending status, ready for payment processing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <div className="border rounded-lg p-4 bg-muted/50 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Worksheet #</span>
                <span className="font-mono font-medium">{worksheet.worksheetNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payee</span>
                <span className="font-medium">{worksheet.payeeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Period</span>
                <span className="font-medium">{formatDate(worksheet.periodStart)} - {formatDate(worksheet.periodEnd)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Loads</span>
                <span className="font-medium">{allLoads.length}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-muted-foreground">Net Pay</span>
                <span className="font-bold text-green-600">{formatCurrency(netPay)}</span>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
              <PlayIcon className="size-4 mr-2" />
              Create Settlement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default WorksheetDetails;
