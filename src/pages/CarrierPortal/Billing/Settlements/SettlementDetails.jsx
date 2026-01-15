import { useState, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
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
  ArrowLeftIcon,
  Wallet,
  DownloadIcon,
  DollarSign,
  UserIcon,
  CalendarIcon,
  TruckIcon,
  BanknoteIcon,
  FuelIcon,
  MinusCircleIcon,
  PlusIcon,
  FileText,
  History,
  Pencil,
  LayoutDashboard,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Building2,
  Clock,
  CheckCircle2,
} from "lucide-react";

const SettlementDetails = () => {
  const { settlementNo } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  const [isDeductionSheetOpen, setIsDeductionSheetOpen] = useState(false);
  const [showProcessPaymentDialog, setShowProcessPaymentDialog] = useState(false);
  const [loadsFilters, setLoadsFilters] = useState([]);
  const [deductionFormData, setDeductionFormData] = useState({
    type: "",
    amount: "",
    description: "",
  });

  // Mock settlement data
  const settlement = {
    settlementNo: settlementNo || "STL-2025-0001",
    payee: "John Smith",
    payeeId: "DRV-001",
    payeeType: "Driver",
    payeeEmail: "john.smith@email.com",
    payeePhone: "(713) 555-1234",
    payeeAddress: "1234 Main Street, Houston, TX 77001",
    payType: "Per Mile",
    payRate: "$0.55/mile",
    businessUnit: "Mega Trucking",
    periodStart: "2025-01-01",
    periodEnd: "2025-01-07",
    status: "Pending",
    paymentMethod: "Direct Deposit",
    bankName: "Chase Bank",
    bankAccount: "****4521",
    routingNumber: "****6789",
    glAccount: "5100 - Driver Payroll",
    createdDate: "2025-01-08",
    createdBy: "Sarah Johnson",
    grossPay: 3840.00,
    fuelAdvances: 1200.00,
    accessorialPay: 350.00,
    deductions: 75.00,
    netPay: 2915.00,
    notes: "Weekly settlement for John Smith. All loads verified and approved.",
  };

  // Mock load details for settlement
  const loadDetails = [
    {
      id: 1,
      loadNo: "ML-2025-001245",
      deliveryDate: "2025-01-02",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      customer: "Titan Construction",
      miles: 240,
      lineHaulPay: 480.00,
      fuelAdvance: 150.00,
      accessorialPay: 75.00,
      netPay: 405.00,
    },
    {
      id: 2,
      loadNo: "ML-2025-001248",
      deliveryDate: "2025-01-03",
      origin: "Fort Worth, TX",
      destination: "Austin, TX",
      customer: "TQL Logistics",
      miles: 190,
      lineHaulPay: 380.00,
      fuelAdvance: 100.00,
      accessorialPay: 50.00,
      netPay: 330.00,
    },
    {
      id: 3,
      loadNo: "ML-2025-001252",
      deliveryDate: "2025-01-04",
      origin: "Dallas, TX",
      destination: "Houston, TX",
      customer: "CH Robinson",
      miles: 240,
      lineHaulPay: 480.00,
      fuelAdvance: 150.00,
      accessorialPay: 75.00,
      netPay: 405.00,
    },
    {
      id: 4,
      loadNo: "ML-2025-001255",
      deliveryDate: "2025-01-05",
      origin: "San Antonio, TX",
      destination: "Fort Worth, TX",
      customer: "Ashgrove Cement",
      miles: 265,
      lineHaulPay: 530.00,
      fuelAdvance: 175.00,
      accessorialPay: 50.00,
      netPay: 405.00,
    },
    {
      id: 5,
      loadNo: "ML-2025-001258",
      deliveryDate: "2025-01-05",
      origin: "Houston, TX",
      destination: "Austin, TX",
      customer: "Titan Construction",
      miles: 165,
      lineHaulPay: 330.00,
      fuelAdvance: 100.00,
      accessorialPay: 25.00,
      netPay: 255.00,
    },
    {
      id: 6,
      loadNo: "ML-2025-001261",
      deliveryDate: "2025-01-06",
      origin: "Dallas, TX",
      destination: "San Antonio, TX",
      customer: "TQL Logistics",
      miles: 275,
      lineHaulPay: 550.00,
      fuelAdvance: 175.00,
      accessorialPay: 25.00,
      netPay: 400.00,
    },
    {
      id: 7,
      loadNo: "ML-2025-001264",
      deliveryDate: "2025-01-06",
      origin: "Austin, TX",
      destination: "Houston, TX",
      customer: "Coyote Logistics",
      miles: 165,
      lineHaulPay: 330.00,
      fuelAdvance: 100.00,
      accessorialPay: 25.00,
      netPay: 255.00,
    },
    {
      id: 8,
      loadNo: "ML-2025-001267",
      deliveryDate: "2025-01-07",
      origin: "Fort Worth, TX",
      destination: "Houston, TX",
      customer: "CH Robinson",
      miles: 260,
      lineHaulPay: 520.00,
      fuelAdvance: 150.00,
      accessorialPay: 25.00,
      netPay: 395.00,
    },
  ];

  // Mock deductions
  const deductions = [
    {
      id: 1,
      type: "Insurance",
      description: "Weekly insurance deduction",
      amount: 50.00,
      glAccount: "5410 - Insurance Deductions",
      date: "2025-01-08",
      addedBy: "System",
    },
    {
      id: 2,
      type: "Equipment",
      description: "Truck wash - Houston Terminal",
      amount: 25.00,
      glAccount: "5400 - Equipment Deductions",
      date: "2025-01-08",
      addedBy: "Sarah Johnson",
    },
  ];

  // Audit log data
  const auditLogData = [
    {
      id: 1,
      action: "Settlement created",
      type: "Create",
      oldValue: "-",
      newValue: settlement.settlementNo,
      actionBy: "Sarah Johnson",
      timestamp: "Jan 08, 2025 09:30:15",
    },
    {
      id: 2,
      action: "Deduction added",
      type: "Update",
      oldValue: "-",
      newValue: "Insurance - $50.00",
      actionBy: "System",
      timestamp: "Jan 08, 2025 09:30:20",
    },
    {
      id: 3,
      action: "Deduction added",
      type: "Update",
      oldValue: "-",
      newValue: "Equipment - $25.00",
      actionBy: "Sarah Johnson",
      timestamp: "Jan 08, 2025 09:35:00",
    },
    {
      id: 4,
      action: "Settlement approved",
      type: "Status",
      oldValue: "Draft",
      newValue: "Pending",
      actionBy: "Mike Davis",
      timestamp: "Jan 08, 2025 10:00:00",
    },
  ];

  const loadsFilterGroups = [
    {
      name: "Basic",
      filters: [
        { key: "loadNo", label: "Load No", type: "input", group: "Basic", placeholder: "Search load..." },
        { key: "customer", label: "Customer", type: "input", group: "Basic", placeholder: "Search customer..." },
      ],
    },
  ];

  const handleLoadsFiltersChange = useCallback((newFilters) => {
    setLoadsFilters(newFilters);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: { color: "bg-amber-500/10 text-amber-700 border-amber-500/50", icon: Clock },
      Paid: { color: "bg-green-500/10 text-green-700 border-green-500/50", icon: CheckCircle2 },
      Processing: { color: "bg-blue-500/10 text-blue-700 border-blue-500/50", icon: Clock },
    };
    const config = statusConfig[status] || statusConfig["Pending"];
    const Icon = config.icon;
    return (
      <Badge className={config.color}>
        <Icon className="size-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getPayeeTypeBadge = (type) => {
    const typeColors = {
      Driver: "bg-blue-500/10 text-blue-700 border-blue-500/50",
      Technician: "bg-purple-500/10 text-purple-700 border-purple-500/50",
      Carrier: "bg-cyan-500/10 text-cyan-700 border-cyan-500/50",
    };
    return typeColors[type] || "bg-gray-500/10 text-gray-700 border-gray-500/50";
  };

  const getAuditTypeBadgeColor = (type) => {
    const colors = {
      Create: "bg-green-500/10 text-green-700 border-green-500/50",
      Update: "bg-blue-500/10 text-blue-700 border-blue-500/50",
      Status: "bg-amber-500/10 text-amber-700 border-amber-500/50",
      Delete: "bg-red-500/10 text-red-700 border-red-500/50",
    };
    return colors[type] || "bg-gray-500/10 text-gray-700 border-gray-500/50";
  };

  const handleDeductionSubmit = (e) => {
    e.preventDefault();
    console.log("Deduction submitted:", deductionFormData);
    setIsDeductionSheetOpen(false);
    setDeductionFormData({ type: "", amount: "", description: "" });
  };

  const handleProcessPayment = () => {
    console.log("Processing payment for:", settlement.settlementNo);
    setShowProcessPaymentDialog(false);
    navigate("/app/carrier-portal/billing/settlements");
  };

  const loadColumns = [
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
      accessorKey: "deliveryDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Delivery" />,
      cell: ({ row }) => formatDate(row.getValue("deliveryDate")),
    },
    {
      accessorKey: "origin",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Origin" />,
    },
    {
      accessorKey: "destination",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Destination" />,
    },
    {
      accessorKey: "customer",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    },
    {
      accessorKey: "miles",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Miles" />,
      cell: ({ row }) => <span className="font-medium">{row.getValue("miles").toLocaleString()}</span>,
    },
    {
      accessorKey: "lineHaulPay",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Line Haul" />,
      cell: ({ row }) => formatCurrency(row.getValue("lineHaulPay")),
    },
    {
      accessorKey: "fuelAdvance",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Fuel Adv" />,
      cell: ({ row }) => (
        <span className="text-amber-600">-{formatCurrency(row.getValue("fuelAdvance"))}</span>
      ),
    },
    {
      accessorKey: "accessorialPay",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Accessorial" />,
      cell: ({ row }) => formatCurrency(row.getValue("accessorialPay")),
    },
    {
      accessorKey: "netPay",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Net Pay" />,
      cell: ({ row }) => (
        <span className="font-bold text-green-600">{formatCurrency(row.getValue("netPay"))}</span>
      ),
    },
  ];

  const auditLogColumns = [
    {
      accessorKey: "action",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Action" />,
    },
    {
      accessorKey: "type",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => (
        <Badge variant="outline" className={getAuditTypeBadgeColor(row.getValue("type"))}>
          {row.getValue("type")}
        </Badge>
      ),
    },
    {
      accessorKey: "oldValue",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Old Value" />,
      cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("oldValue")}</span>,
    },
    {
      accessorKey: "newValue",
      header: ({ column }) => <DataTableColumnHeader column={column} title="New Value" />,
      cell: ({ row }) => <span className="font-medium">{row.getValue("newValue")}</span>,
    },
    {
      accessorKey: "actionBy",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Modified By" />,
    },
    {
      accessorKey: "timestamp",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Timestamp" />,
    },
  ];

  // Calculate totals
  const totalMiles = loadDetails.reduce((sum, l) => sum + l.miles, 0);
  const totalLineHaul = loadDetails.reduce((sum, l) => sum + l.lineHaulPay, 0);
  const totalFuelAdvance = loadDetails.reduce((sum, l) => sum + l.fuelAdvance, 0);
  const totalAccessorial = loadDetails.reduce((sum, l) => sum + l.accessorialPay, 0);
  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <Tabs defaultValue={activeTab} className="w-full h-full flex flex-col overflow-hidden">
        {/* Header with Back Button and Actions */}
        <div className="flex-shrink-0 px-4 py-3 border-b bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/app/carrier-portal/billing/settlements")}
              >
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
                  <p className="text-sm text-muted-foreground">
                    {settlement.payee} ({settlement.payeeId})
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <DownloadIcon className="size-4 mr-2" />
                Download PDF
              </Button>
              {settlement.status === "Pending" && (
                <Button
                  onClick={() => setShowProcessPaymentDialog(true)}
                  className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                  size="sm"
                >
                  <BanknoteIcon className="size-4 mr-2" />
                  Process Payment
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex-shrink-0 px-4 border-b">
          <TabsList className="mb-0 rounded-none bg-transparent h-12">
            <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <LayoutDashboard className="size-4 mr-1.5" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="loads" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <TruckIcon className="size-4 mr-1.5" />
              Loads ({loadDetails.length})
            </TabsTrigger>
            <TabsTrigger value="deductions" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <MinusCircleIcon className="size-4 mr-1.5" />
              Deductions ({deductions.length})
            </TabsTrigger>
            <TabsTrigger value="audit" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <History className="size-4 mr-1.5" />
              Audit Log
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-auto">
          {/* Overview Tab */}
          <TabsContent value="overview" className="p-4 space-y-4 mt-0 h-full">
            <div className="grid grid-cols-3 gap-4">
              {/* Payee Information */}
              <div className="border rounded-lg bg-card">
                <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <UserIcon className="size-4" />
                    Payee Information
                  </h3>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Pencil className="size-4" />
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <UserIcon className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">{settlement.payee}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground font-mono">{settlement.payeeId}</span>
                        <Badge variant="outline" className={getPayeeTypeBadge(settlement.payeeType)}>
                          {settlement.payeeType}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 pt-2 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="size-3.5 text-muted-foreground" />
                      <span>{settlement.payeePhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="size-3.5 text-muted-foreground" />
                      <span className="text-primary">{settlement.payeeEmail}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="size-3.5 text-muted-foreground mt-0.5" />
                      <span>{settlement.payeeAddress}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Pay Type</p>
                        <p className="text-sm font-medium">{settlement.payType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Pay Rate</p>
                        <p className="text-sm font-medium">{settlement.payRate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settlement Details */}
              <div className="border rounded-lg bg-card">
                <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <CalendarIcon className="size-4" />
                    Settlement Details
                  </h3>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Pencil className="size-4" />
                  </button>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-2 divide-x">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground">Period Start</p>
                      <p className="text-sm font-medium">{formatDate(settlement.periodStart)}</p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground">Period End</p>
                      <p className="text-sm font-medium">{formatDate(settlement.periodEnd)}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground">Business Unit</p>
                      <p className="text-sm font-medium flex items-center gap-1">
                        <Building2 className="size-3.5" />
                        {settlement.businessUnit}
                      </p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground">GL Account</p>
                      <p className="text-sm font-medium">{settlement.glAccount}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground">Created Date</p>
                      <p className="text-sm font-medium">{formatDate(settlement.createdDate)}</p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground">Created By</p>
                      <p className="text-sm font-medium">{settlement.createdBy}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="border rounded-lg bg-card">
                <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <CreditCard className="size-4" />
                    Payment Information
                  </h3>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Pencil className="size-4" />
                  </button>
                </div>
                <div className="divide-y">
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground">Payment Method</p>
                    <p className="text-sm font-medium">{settlement.paymentMethod}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground">Bank Name</p>
                    <p className="text-sm font-medium">{settlement.bankName}</p>
                  </div>
                  <div className="grid grid-cols-2 divide-x">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground">Account Number</p>
                      <p className="text-sm font-medium font-mono">{settlement.bankAccount}</p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground">Routing Number</p>
                      <p className="text-sm font-medium font-mono">{settlement.routingNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="grid grid-cols-2 gap-4">
              {/* Settlement Summary */}
              <div className="border rounded-lg bg-card">
                <div className="px-4 py-3 border-b bg-muted">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <DollarSign className="size-4" />
                    Settlement Summary
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Line Haul Pay ({totalMiles.toLocaleString()} miles)</span>
                    <span>{formatCurrency(totalLineHaul)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Accessorial Pay</span>
                    <span>{formatCurrency(totalAccessorial)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-medium">
                    <span>Gross Pay</span>
                    <span>{formatCurrency(settlement.grossPay)}</span>
                  </div>
                  <div className="flex justify-between text-amber-600">
                    <span className="flex items-center gap-1">
                      <FuelIcon className="size-3" />
                      Fuel Advances
                    </span>
                    <span>-{formatCurrency(totalFuelAdvance)}</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span className="flex items-center gap-1">
                      <MinusCircleIcon className="size-3" />
                      Deductions
                    </span>
                    <span>-{formatCurrency(totalDeductions)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Net Pay</span>
                    <span className="text-green-600">{formatCurrency(settlement.netPay)}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="border rounded-lg bg-card">
                <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <FileText className="size-4" />
                    Notes
                  </h3>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Pencil className="size-4" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">{settlement.notes || "No notes added."}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Loads Tab */}
          <TabsContent value="loads" className="p-4 mt-0 h-full">
            <div className="border rounded-lg bg-card">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <SmartFilter filterGroups={loadsFilterGroups} onFiltersChange={handleLoadsFiltersChange} />
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Total:</span>
                  <span className="font-medium">{loadDetails.length} loads</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="font-medium">{totalMiles.toLocaleString()} miles</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="font-bold text-green-600">{formatCurrency(loadDetails.reduce((sum, l) => sum + l.netPay, 0))}</span>
                </div>
              </div>
              <div className="p-4">
                <DataTable columns={loadColumns} data={loadDetails} showViewOptions={false} pageSize={10} />
              </div>
            </div>
          </TabsContent>

          {/* Deductions Tab */}
          <TabsContent value="deductions" className="p-4 mt-0 h-full">
            <div className="border rounded-lg bg-card">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h3 className="text-sm font-semibold">All Deductions</h3>
                {settlement.status === "Pending" && (
                  <Button
                    size="sm"
                    onClick={() => setIsDeductionSheetOpen(true)}
                    className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                  >
                    <PlusIcon className="size-4 mr-1" />
                    Add Deduction
                  </Button>
                )}
              </div>
              <div className="p-4">
                {deductions.length > 0 ? (
                  <div className="space-y-3">
                    {deductions.map((deduction) => (
                      <div key={deduction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-red-500/10">
                            <MinusCircleIcon className="size-5 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium">{deduction.type}</p>
                            <p className="text-sm text-muted-foreground">{deduction.description}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                              <span>{deduction.glAccount}</span>
                              <span>|</span>
                              <span>Added by {deduction.addedBy} on {formatDate(deduction.date)}</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-red-600">-{formatCurrency(deduction.amount)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-4 flex justify-between font-bold text-lg">
                      <span>Total Deductions</span>
                      <span className="text-red-600">-{formatCurrency(totalDeductions)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <MinusCircleIcon className="size-12 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No deductions applied</p>
                    <p className="text-sm">Click "Add Deduction" to add one</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Audit Log Tab */}
          <TabsContent value="audit" className="p-4 mt-0 h-full">
            <div className="border rounded-lg bg-card">
              <div className="px-4 py-3 border-b">
                <h3 className="text-sm font-semibold">Audit History</h3>
              </div>
              <div className="p-4">
                <DataTable columns={auditLogColumns} data={auditLogData} showViewOptions={false} pageSize={10} />
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Add Deduction Sheet */}
      <Sheet open={isDeductionSheetOpen} onOpenChange={setIsDeductionSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold">Add Deduction</SheetTitle>
          </SheetHeader>

          <form onSubmit={handleDeductionSubmit} className="space-y-5 mt-4 mb-2 px-6">
            <div className="space-y-2">
              <Label htmlFor="type">Deduction Type</Label>
              <Select
                value={deductionFormData.type}
                onValueChange={(value) => setDeductionFormData({ ...deductionFormData, type: value })}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select deduction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="escrow">Escrow</SelectItem>
                  <SelectItem value="cash_advance">Cash Advance</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={deductionFormData.amount}
                  onChange={(e) => setDeductionFormData({ ...deductionFormData, amount: e.target.value })}
                  className="h-10 pl-7"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter description..."
                value={deductionFormData.description}
                onChange={(e) => setDeductionFormData({ ...deductionFormData, description: e.target.value })}
                className="min-h-20 resize-none"
              />
            </div>

            <div className="flex gap-3 pt-6 border-t px-6 -mx-6 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDeductionSheetOpen(false)}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Add Deduction
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Process Payment Dialog */}
      <AlertDialog open={showProcessPaymentDialog} onOpenChange={setShowProcessPaymentDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Process Payment</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to process payment for settlement {settlement.settlementNo}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4 space-y-3">
            <div className="border rounded-lg p-4 bg-muted/50">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Payee</span>
                <span className="font-medium">{settlement.payee}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-medium">{settlement.paymentMethod}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Account</span>
                <span className="font-mono">{settlement.bankAccount}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between">
                <span className="font-medium">Net Pay</span>
                <span className="text-lg font-bold text-green-600">{formatCurrency(settlement.netPay)}</span>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleProcessPayment}
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              Process Payment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SettlementDetails;
