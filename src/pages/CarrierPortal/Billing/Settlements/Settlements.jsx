import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import SmartFilter from "@/components/SmartFilter";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Wallet,
  MoreHorizontal,
  EyeIcon,
  DownloadIcon,
  PrinterIcon,
  DollarSign,
  ClockIcon,
  CheckCircle2Icon,
  PlusIcon,
  BanknoteIcon,
  UserIcon,
  TruckIcon,
  WrenchIcon,
  Building2,
  Trash2Icon,
} from "lucide-react";

const Settlements = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);
  const [selectedBU, setSelectedBU] = useState("mega-trucking");
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);

  // Create Settlement Form State
  const [formData, setFormData] = useState({
    businessUnit: "mega-trucking",
    payeeType: "",
    payeeId: "",
    periodStart: "",
    periodEnd: "",
    paymentMethod: "",
    glAccount: "",
    notes: "",
  });
  const [selectedLoads, setSelectedLoads] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [newDeduction, setNewDeduction] = useState({
    type: "",
    amount: "",
    glAccount: "",
    description: "",
  });

  // Mock driver/technician settlements data (Mega Trucking)
  const driverSettlementsData = [
    {
      id: 1,
      settlementNo: "STL-2025-0001",
      payee: "John Smith",
      payeeId: "DRV-001",
      payeeType: "Driver",
      periodStart: "2025-01-01",
      periodEnd: "2025-01-07",
      loadCount: 8,
      grossPay: 3840.00,
      fuelAdvances: 1200.00,
      accessorialPay: 350.00,
      deductions: 75.00,
      netPay: 2915.00,
      status: "Pending",
      paymentMethod: "Direct Deposit",
      createdDate: "2025-01-08",
      bu: "Mega Trucking",
    },
    {
      id: 2,
      settlementNo: "STL-2025-0002",
      payee: "Mike Davis",
      payeeId: "DRV-002",
      payeeType: "Driver",
      periodStart: "2025-01-01",
      periodEnd: "2025-01-07",
      loadCount: 6,
      grossPay: 2880.00,
      fuelAdvances: 900.00,
      accessorialPay: 275.00,
      deductions: 50.00,
      netPay: 2205.00,
      status: "Paid",
      paymentMethod: "Direct Deposit",
      createdDate: "2025-01-08",
      paidDate: "2025-01-09",
      bu: "Mega Trucking",
    },
    {
      id: 3,
      settlementNo: "STL-2025-0003",
      payee: "Carlos Martinez",
      payeeId: "TECH-001",
      payeeType: "Technician",
      periodStart: "2025-01-01",
      periodEnd: "2025-01-07",
      loadCount: 0,
      grossPay: 1800.00,
      fuelAdvances: 0.00,
      accessorialPay: 150.00,
      deductions: 25.00,
      netPay: 1925.00,
      status: "Pending",
      paymentMethod: "Direct Deposit",
      createdDate: "2025-01-08",
      bu: "Mega Trucking",
    },
    {
      id: 4,
      settlementNo: "STL-2025-0004",
      payee: "Sarah Johnson",
      payeeId: "DRV-003",
      payeeType: "Driver",
      periodStart: "2025-01-01",
      periodEnd: "2025-01-07",
      loadCount: 5,
      grossPay: 2400.00,
      fuelAdvances: 750.00,
      accessorialPay: 200.00,
      deductions: 0.00,
      netPay: 1850.00,
      status: "Paid",
      paymentMethod: "Direct Deposit",
      createdDate: "2025-01-08",
      paidDate: "2025-01-09",
      bu: "Mega Trucking",
    },
    {
      id: 5,
      settlementNo: "STL-2025-0005",
      payee: "James Wilson",
      payeeId: "TECH-002",
      payeeType: "Technician",
      periodStart: "2025-01-01",
      periodEnd: "2025-01-07",
      loadCount: 0,
      grossPay: 2100.00,
      fuelAdvances: 0.00,
      accessorialPay: 200.00,
      deductions: 50.00,
      netPay: 2250.00,
      status: "Paid",
      paymentMethod: "Check",
      createdDate: "2025-01-08",
      paidDate: "2025-01-09",
      bu: "Mega Trucking",
    },
  ];

  // Mock carrier settlements data (Mega Logistics)
  const carrierSettlementsData = [
    {
      id: 101,
      settlementNo: "VST-2025-0001",
      payee: "Swift Transport LLC",
      payeeId: "VND-001",
      payeeType: "Carrier",
      periodStart: "2025-01-01",
      periodEnd: "2025-01-07",
      loadCount: 5,
      grossPay: 8750.00,
      fuelAdvances: 0.00,
      accessorialPay: 450.00,
      deductions: 125.00,
      netPay: 9075.00,
      status: "Pending",
      paymentMethod: "ACH",
      createdDate: "2025-01-08",
      bu: "Mega Logistics",
    },
    {
      id: 102,
      settlementNo: "VST-2025-0002",
      payee: "Prime Logistics Inc",
      payeeId: "VND-002",
      payeeType: "Carrier",
      periodStart: "2025-01-01",
      periodEnd: "2025-01-07",
      loadCount: 3,
      grossPay: 5250.00,
      fuelAdvances: 0.00,
      accessorialPay: 275.00,
      deductions: 0.00,
      netPay: 5525.00,
      status: "Paid",
      paymentMethod: "ACH",
      createdDate: "2025-01-08",
      paidDate: "2025-01-10",
      bu: "Mega Logistics",
    },
    {
      id: 103,
      settlementNo: "VST-2025-0003",
      payee: "Roadrunner Freight",
      payeeId: "VND-003",
      payeeType: "Carrier",
      periodStart: "2025-01-01",
      periodEnd: "2025-01-07",
      loadCount: 4,
      grossPay: 7000.00,
      fuelAdvances: 0.00,
      accessorialPay: 350.00,
      deductions: 75.00,
      netPay: 7275.00,
      status: "Processing",
      paymentMethod: "Check",
      createdDate: "2025-01-08",
      bu: "Mega Logistics",
    },
  ];

  // Mock payee data for form
  const payees = {
    Driver: [
      { id: "DRV-001", name: "John Smith" },
      { id: "DRV-002", name: "Mike Davis" },
      { id: "DRV-003", name: "Sarah Johnson" },
    ],
    Technician: [
      { id: "TECH-001", name: "Carlos Martinez" },
      { id: "TECH-002", name: "James Wilson" },
    ],
    Carrier: [
      { id: "VND-001", name: "Swift Transport LLC" },
      { id: "VND-002", name: "Prime Logistics Inc" },
      { id: "VND-003", name: "Roadrunner Freight" },
    ],
  };

  // Mock loads data for form
  const loadsData = {
    "DRV-001": [
      { id: 1, loadNo: "ML-2025-001245", deliveryDate: "2025-01-05", origin: "Houston, TX", destination: "Dallas, TX", lineHaul: 480.00, fuelAdvance: 150.00, accessorial: 75.00, netPay: 405.00 },
      { id: 2, loadNo: "ML-2025-001248", deliveryDate: "2025-01-06", origin: "Fort Worth, TX", destination: "Austin, TX", lineHaul: 380.00, fuelAdvance: 100.00, accessorial: 50.00, netPay: 330.00 },
    ],
    "DRV-002": [
      { id: 3, loadNo: "ML-2025-001246", deliveryDate: "2025-01-05", origin: "Austin, TX", destination: "Dallas, TX", lineHaul: 390.00, fuelAdvance: 120.00, accessorial: 50.00, netPay: 320.00 },
    ],
    "TECH-001": [
      { id: 4, loadNo: "WO-2025-000123", deliveryDate: "2025-01-05", origin: "Houston Yard", destination: "Houston Yard", lineHaul: 450.00, fuelAdvance: 0.00, accessorial: 50.00, netPay: 500.00 },
    ],
    "VND-001": [
      { id: 5, loadNo: "BRK-2025-001289", deliveryDate: "2025-01-08", origin: "Houston, TX", destination: "Phoenix, AZ", lineHaul: 1850.00, fuelAdvance: 0.00, accessorial: 100.00, netPay: 1950.00 },
      { id: 6, loadNo: "BRK-2025-001291", deliveryDate: "2025-01-09", origin: "San Antonio, TX", destination: "Denver, CO", lineHaul: 1650.00, fuelAdvance: 0.00, accessorial: 125.00, netPay: 1775.00 },
    ],
  };

  const glAccounts = [
    { id: "5100", name: "5100 - Driver Payroll" },
    { id: "5110", name: "5110 - Technician Payroll" },
    { id: "5200", name: "5200 - Carrier Payments" },
    { id: "5400", name: "5400 - Equipment Deductions" },
    { id: "5410", name: "5410 - Insurance Deductions" },
    { id: "5420", name: "5420 - Cash Advances" },
  ];

  const deductionTypes = [
    { value: "cash_advance", label: "Cash Advance" },
    { value: "equipment", label: "Equipment" },
    { value: "insurance", label: "Insurance" },
    { value: "damage", label: "Damage" },
    { value: "other", label: "Other" },
  ];

  // Get data based on selected BU
  const filteredData = selectedBU === "mega-trucking"
    ? driverSettlementsData
    : carrierSettlementsData;

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        { key: "settlementNo", label: "Settlement No", type: "input", group: "Basic", placeholder: "Search settlement..." },
        { key: "payee", label: selectedBU === "mega-trucking" ? "Payee" : "Carrier", type: "input", group: "Basic", placeholder: "Search..." },
        { key: "status", label: "Status", type: "select", group: "Basic", options: [
          { value: "Pending", label: "Pending" },
          { value: "Processing", label: "Processing" },
          { value: "Paid", label: "Paid" },
        ]},
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      Pending: "bg-amber-500/10 text-amber-700 border-amber-500/50",
      Paid: "bg-green-500/10 text-green-700 border-green-500/50",
      Processing: "bg-blue-500/10 text-blue-700 border-blue-500/50",
    };
    return statusColors[status] || "bg-gray-500/10 text-gray-700 border-gray-500/50";
  };

  const getPayeeTypeBadge = (type) => {
    const typeColors = {
      Driver: "bg-blue-500/10 text-blue-700 border-blue-500/50",
      Technician: "bg-purple-500/10 text-purple-700 border-purple-500/50",
      Carrier: "bg-cyan-500/10 text-cyan-700 border-cyan-500/50",
    };
    return typeColors[type] || "bg-gray-500/10 text-gray-700 border-gray-500/50";
  };

  const getPayeeTypeIcon = (type) => {
    switch (type) {
      case "Driver": return <UserIcon className="size-3" />;
      case "Technician": return <WrenchIcon className="size-3" />;
      case "Carrier": return <TruckIcon className="size-3" />;
      default: return null;
    }
  };

  // Form handlers
  const handleFormInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "businessUnit") {
      setFormData((prev) => ({ ...prev, payeeType: "", payeeId: "" }));
      setSelectedLoads([]);
    }
    if (field === "payeeType") {
      setFormData((prev) => ({ ...prev, payeeId: "" }));
      setSelectedLoads([]);
    }
    if (field === "payeeId") {
      setSelectedLoads([]);
    }
  };

  const getPayeeTypes = () => {
    return formData.businessUnit === "mega-trucking" ? ["Driver", "Technician"] : ["Carrier"];
  };

  const getFilteredPayees = () => {
    if (!formData.payeeType) return [];
    return payees[formData.payeeType] || [];
  };

  const getPayeeLoads = () => {
    if (!formData.payeeId) return [];
    return loadsData[formData.payeeId] || [];
  };

  const handleLoadSelection = (loadId, checked) => {
    if (checked) {
      setSelectedLoads([...selectedLoads, loadId]);
    } else {
      setSelectedLoads(selectedLoads.filter((id) => id !== loadId));
    }
  };

  const handleSelectAllLoads = (checked) => {
    const loads = getPayeeLoads();
    setSelectedLoads(checked ? loads.map((l) => l.id) : []);
  };

  const handleAddDeduction = () => {
    if (newDeduction.type && newDeduction.amount) {
      setDeductions([...deductions, { ...newDeduction, id: Date.now(), amount: parseFloat(newDeduction.amount) }]);
      setNewDeduction({ type: "", amount: "", glAccount: "", description: "" });
    }
  };

  const handleRemoveDeduction = (id) => {
    setDeductions(deductions.filter((d) => d.id !== id));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    console.log("Settlement created:", { ...formData, selectedLoads, deductions });
    resetForm();
    setIsCreateSheetOpen(false);
  };

  const resetForm = () => {
    setFormData({ businessUnit: "mega-trucking", payeeType: "", payeeId: "", periodStart: "", periodEnd: "", paymentMethod: "", glAccount: "", notes: "" });
    setSelectedLoads([]);
    setDeductions([]);
    setNewDeduction({ type: "", amount: "", glAccount: "", description: "" });
  };

  // Calculate totals for form
  const payeeLoads = getPayeeLoads();
  const selectedLoadsData = payeeLoads.filter((l) => selectedLoads.includes(l.id));
  const totalLineHaul = selectedLoadsData.reduce((sum, l) => sum + l.lineHaul, 0);
  const totalFuelAdvance = selectedLoadsData.reduce((sum, l) => sum + l.fuelAdvance, 0);
  const totalAccessorial = selectedLoadsData.reduce((sum, l) => sum + l.accessorial, 0);
  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
  const grossPay = totalLineHaul + totalAccessorial;
  const netPay = grossPay - totalFuelAdvance - totalDeductions;

  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => {
        const settlement = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/billing/settlements/${settlement.settlementNo}`)}>
                <EyeIcon className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "settlementNo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Settlement No" />,
      cell: ({ row }) => (
        <button onClick={() => navigate(`/app/carrier-portal/billing/settlements/${row.getValue("settlementNo")}`)} className="font-mono text-sm font-medium text-primary hover:underline">
          {row.getValue("settlementNo")}
        </button>
      ),
    },
    {
      accessorKey: "payee",
      header: ({ column }) => <DataTableColumnHeader column={column} title={selectedBU === "mega-trucking" ? "Payee" : "Carrier"} />,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.getValue("payee")}</span>
          <span className="text-xs text-muted-foreground">{row.original.payeeId}</span>
        </div>
      ),
    },
    {
      accessorKey: "payeeType",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => {
        const payeeType = row.getValue("payeeType");
        return (
          <Badge className={`${getPayeeTypeBadge(payeeType)} flex items-center gap-1 w-fit`}>
            {getPayeeTypeIcon(payeeType)}
            {payeeType}
          </Badge>
        );
      },
    },
    {
      accessorKey: "periodStart",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Period" />,
      cell: ({ row }) => (
        <span className="text-sm">{formatDate(row.getValue("periodStart"))} - {formatDate(row.original.periodEnd)}</span>
      ),
    },
    {
      accessorKey: "loadCount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Loads" />,
      cell: ({ row }) => <span className="font-medium">{row.getValue("loadCount") || "-"}</span>,
    },
    {
      accessorKey: "grossPay",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Gross Pay" />,
      cell: ({ row }) => formatCurrency(row.getValue("grossPay")),
    },
    ...(selectedBU === "mega-trucking" ? [{
      accessorKey: "fuelAdvances",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Fuel Adv." />,
      cell: ({ row }) => {
        const fuelAdvances = row.getValue("fuelAdvances");
        return fuelAdvances > 0 ? <span className="text-amber-600">-{formatCurrency(fuelAdvances)}</span> : <span className="text-muted-foreground">-</span>;
      },
    }] : []),
    {
      accessorKey: "deductions",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Deductions" />,
      cell: ({ row }) => {
        const ded = row.getValue("deductions");
        return ded > 0 ? <span className="text-red-600">-{formatCurrency(ded)}</span> : <span className="text-muted-foreground">{formatCurrency(0)}</span>;
      },
    },
    {
      accessorKey: "netPay",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Net Pay" />,
      cell: ({ row }) => <span className="font-bold text-green-600">{formatCurrency(row.getValue("netPay"))}</span>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => <Badge className={getStatusBadge(row.getValue("status"))}>{row.getValue("status")}</Badge>,
    },
    {
      accessorKey: "paidDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Paid Date" />,
      cell: ({ row }) => formatDate(row.getValue("paidDate")),
    },
  ];

  // Calculate summary stats
  const totalGrossPay = filteredData.reduce((sum, s) => sum + s.grossPay, 0);
  const totalNetPay = filteredData.reduce((sum, s) => sum + s.netPay, 0);
  const totalPending = filteredData.filter((s) => s.status === "Pending").reduce((sum, s) => sum + s.netPay, 0);
  const pendingCount = filteredData.filter((s) => s.status === "Pending").length;

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Summary Cards */}
      <div className="flex-shrink-0 px-6 py-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <DollarSign className="size-4" />
              <span className="text-xs font-medium">Total Gross Pay</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalGrossPay)}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-2 text-green-600 mb-1">
              <CheckCircle2Icon className="size-4" />
              <span className="text-xs font-medium">Total Net Pay</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totalNetPay)}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-2 text-amber-600 mb-1">
              <ClockIcon className="size-4" />
              <span className="text-xs font-medium">Pending Payments</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">{formatCurrency(totalPending)}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-2 text-purple-600 mb-1">
              {selectedBU === "mega-trucking" ? <UserIcon className="size-4" /> : <TruckIcon className="size-4" />}
              <span className="text-xs font-medium">Pending Count</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">{pendingCount}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-background">
          <div className="flex items-center justify-between pb-3">
            <SmartFilter filterGroups={filterGroups} onFiltersChange={handleFiltersChange} />
            <div className="flex items-center gap-3">
              <Select value={selectedBU} onValueChange={setSelectedBU}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select BU" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mega-trucking">
                    <div className="flex items-center gap-2"><TruckIcon className="size-4" />Mega Trucking</div>
                  </SelectItem>
                  <SelectItem value="mega-logistics">
                    <div className="flex items-center gap-2"><Building2 className="size-4" />Mega Logistics</div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => setIsCreateSheetOpen(true)} className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
                <PlusIcon className="size-4 mr-2" />
                Create Settlement
              </Button>
            </div>
          </div>
          <div>
            <DataTable columns={columns} data={filteredData} showViewOptions={false} pageSize={10} />
          </div>
        </div>
      </div>

      {/* Create Settlement Sheet */}
      <Sheet open={isCreateSheetOpen} onOpenChange={setIsCreateSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold flex items-center gap-2">
              <Wallet className="size-5" />
              Create Settlement
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleCreateSubmit} className="space-y-6 py-4 px-6">
            {/* Payee Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Payee Information</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm">Business Unit <span className="text-red-500">*</span></Label>
                  <Select value={formData.businessUnit} onValueChange={(v) => handleFormInputChange("businessUnit", v)}>
                    <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mega-trucking">Mega Trucking</SelectItem>
                      <SelectItem value="mega-logistics">Mega Logistics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Payee Type <span className="text-red-500">*</span></Label>
                  <Select value={formData.payeeType} onValueChange={(v) => handleFormInputChange("payeeType", v)}>
                    <SelectTrigger className="h-10"><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      {getPayeeTypes().map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Payee <span className="text-red-500">*</span></Label>
                  <Select value={formData.payeeId} onValueChange={(v) => handleFormInputChange("payeeId", v)} disabled={!formData.payeeType}>
                    <SelectTrigger className="h-10"><SelectValue placeholder="Select payee" /></SelectTrigger>
                    <SelectContent>
                      {getFilteredPayees().map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Settlement Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Settlement Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm">Period Start <span className="text-red-500">*</span></Label>
                  <Input type="date" value={formData.periodStart} onChange={(e) => handleFormInputChange("periodStart", e.target.value)} className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Period End <span className="text-red-500">*</span></Label>
                  <Input type="date" value={formData.periodEnd} onChange={(e) => handleFormInputChange("periodEnd", e.target.value)} className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Payment Method <span className="text-red-500">*</span></Label>
                  <Select value={formData.paymentMethod} onValueChange={(v) => handleFormInputChange("paymentMethod", v)}>
                    <SelectTrigger className="h-10"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="direct_deposit">Direct Deposit</SelectItem>
                      <SelectItem value="ach">ACH</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">GL Account <span className="text-red-500">*</span></Label>
                  <Select value={formData.glAccount} onValueChange={(v) => handleFormInputChange("glAccount", v)}>
                    <SelectTrigger className="h-10"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {glAccounts.map((gl) => (
                        <SelectItem key={gl.id} value={gl.id}>{gl.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Loads Selection */}
            {formData.payeeId && payeeLoads.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Select Loads ({selectedLoads.length}/{payeeLoads.length})
                </h3>
                <div className="border rounded-lg max-h-48 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted sticky top-0">
                      <tr>
                        <th className="p-2 text-left w-8">
                          <Checkbox checked={selectedLoads.length === payeeLoads.length} onCheckedChange={handleSelectAllLoads} />
                        </th>
                        <th className="p-2 text-left">Load No</th>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-right">Line Haul</th>
                        <th className="p-2 text-right">Net Pay</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payeeLoads.map((load) => (
                        <tr key={load.id} className="border-t">
                          <td className="p-2">
                            <Checkbox checked={selectedLoads.includes(load.id)} onCheckedChange={(c) => handleLoadSelection(load.id, c)} />
                          </td>
                          <td className="p-2 font-mono text-xs">{load.loadNo}</td>
                          <td className="p-2">{load.deliveryDate}</td>
                          <td className="p-2 text-right">{formatCurrency(load.lineHaul)}</td>
                          <td className="p-2 text-right font-medium text-green-600">{formatCurrency(load.netPay)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Deductions */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Deductions</h3>
              <div className="grid grid-cols-4 gap-2 p-3 border rounded-lg bg-muted/30">
                <Select value={newDeduction.type} onValueChange={(v) => setNewDeduction({ ...newDeduction, type: v })}>
                  <SelectTrigger className="h-9"><SelectValue placeholder="Type" /></SelectTrigger>
                  <SelectContent>
                    {deductionTypes.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input type="number" step="0.01" placeholder="Amount" value={newDeduction.amount} onChange={(e) => setNewDeduction({ ...newDeduction, amount: e.target.value })} className="h-9" />
                <Input placeholder="Description" value={newDeduction.description} onChange={(e) => setNewDeduction({ ...newDeduction, description: e.target.value })} className="h-9" />
                <Button type="button" variant="outline" size="sm" onClick={handleAddDeduction} className="h-9">
                  <PlusIcon className="size-4 mr-1" />Add
                </Button>
              </div>
              {deductions.length > 0 && (
                <div className="space-y-2">
                  {deductions.map((d) => (
                    <div key={d.id} className="flex items-center justify-between p-2 border rounded-lg text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{deductionTypes.find((t) => t.value === d.type)?.label}</Badge>
                        <span className="text-muted-foreground">{d.description}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 font-medium">-{formatCurrency(d.amount)}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveDeduction(d.id)}>
                          <Trash2Icon className="size-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label className="text-sm">Notes</Label>
              <Textarea placeholder="Add notes..." value={formData.notes} onChange={(e) => handleFormInputChange("notes", e.target.value)} className="min-h-16 resize-none" />
            </div>

            {/* Summary */}
            {selectedLoads.length > 0 && (
              <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
                <h3 className="text-sm font-semibold">Settlement Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Line Haul ({selectedLoads.length} loads)</span><span>{formatCurrency(totalLineHaul)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Accessorial</span><span>{formatCurrency(totalAccessorial)}</span></div>
                  <div className="flex justify-between border-t pt-1"><span className="font-medium">Gross Pay</span><span className="font-medium">{formatCurrency(grossPay)}</span></div>
                  {totalFuelAdvance > 0 && <div className="flex justify-between text-amber-600"><span>Fuel Advances</span><span>-{formatCurrency(totalFuelAdvance)}</span></div>}
                  {totalDeductions > 0 && <div className="flex justify-between text-red-600"><span>Deductions</span><span>-{formatCurrency(totalDeductions)}</span></div>}
                  <div className="flex justify-between border-t pt-1 text-lg font-bold"><span>Net Pay</span><span className="text-green-600">{formatCurrency(netPay)}</span></div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => { resetForm(); setIsCreateSheetOpen(false); }} className="flex-1 h-10">Cancel</Button>
              <Button type="submit" disabled={selectedLoads.length === 0} className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
                Create Settlement
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Settlements;
