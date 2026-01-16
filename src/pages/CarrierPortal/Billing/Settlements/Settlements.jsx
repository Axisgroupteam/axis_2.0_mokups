import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
} from "@/components/ui/sheet";
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
  MoreHorizontal,
  EyeIcon,
  DownloadIcon,
  DollarSign,
  TruckIcon,
  UserIcon,
  WrenchIcon,
  ClockIcon,
  CheckCircle2Icon,
  PlusIcon,
  Building2,
  CreditCardIcon,
  SendIcon,
  UserPlusIcon,
  FileTextIcon,
  CalendarIcon,
  ClipboardListIcon,
  ArrowRightIcon,
  ReceiptIcon,
} from "lucide-react";

const Settlements = () => {
  const navigate = useNavigate();
  const [selectedBU, setSelectedBU] = useState("mega-trucking");
  const [activeTab, setActiveTab] = useState("unsettled");

  // Unsettled loads state
  const [selectedRows, setSelectedRows] = useState([]);
  const [showCreateSettlementDialog, setShowCreateSettlementDialog] = useState(false);
  const [showLoadBreakdownDrawer, setShowLoadBreakdownDrawer] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);

  // ============ MOCK DATA ============

  // Unsettled loads - Mega Trucking (drivers/technicians)
  const driverUnsettledLoads = [
    {
      id: 1,
      loadNo: "ML-2025-001245",
      driverId: "DRV-001",
      driverName: "John Smith",
      driverType: "Driver",
      payeeId: "PAY-001",
      payeeName: "Smith Trucking LLC",
      deliveryDate: "2025-01-05",
      customer: "Titan Construction",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      miles: 240,
      lineHaulPay: 480.00,
      fscPay: 48.00,
      fuelAdvance: 150.00,
      accessorialPay: 75.00,
      deductions: 0.00,
      netPay: 453.00,
      payType: "Per Mile",
      tractorNo: "TRK-2847",
      trailerNo: "TRL-1001",
      podVerified: true,
      status: "Completed",
      settlementCycle: "Weekly",
    },
    {
      id: 2,
      loadNo: "ML-2025-001246",
      driverId: "DRV-002",
      driverName: "Mike Davis",
      driverType: "Driver",
      payeeId: "PAY-001",
      payeeName: "Smith Trucking LLC",
      deliveryDate: "2025-01-05",
      customer: "Titan Construction",
      origin: "Austin, TX",
      destination: "Dallas, TX",
      miles: 195,
      lineHaulPay: 390.00,
      fscPay: 39.00,
      fuelAdvance: 120.00,
      accessorialPay: 50.00,
      deductions: 25.00,
      netPay: 334.00,
      payType: "Per Mile",
      tractorNo: "TRK-1923",
      trailerNo: "TRL-1002",
      podVerified: true,
      status: "Completed",
      settlementCycle: "Weekly",
    },
    {
      id: 3,
      loadNo: "ML-2025-001247",
      driverId: "DRV-003",
      driverName: "Sarah Johnson",
      driverType: "Driver",
      payeeId: "PAY-002",
      payeeName: "Sarah Johnson",
      deliveryDate: "2025-01-06",
      customer: "Ashgrove Cement",
      origin: "San Antonio, TX",
      destination: "Houston, TX",
      miles: 200,
      lineHaulPay: 400.00,
      fscPay: 40.00,
      fuelAdvance: 130.00,
      accessorialPay: 100.00,
      deductions: 0.00,
      netPay: 410.00,
      payType: "Per Mile",
      tractorNo: "TRK-4521",
      trailerNo: "TRL-1003",
      podVerified: true,
      status: "Completed",
      settlementCycle: "Weekly",
    },
    {
      id: 4,
      loadNo: "WO-2025-000123",
      driverId: "TECH-001",
      driverName: "Carlos Martinez",
      driverType: "Technician",
      payeeId: "PAY-003",
      payeeName: "Carlos Martinez",
      deliveryDate: "2025-01-05",
      customer: "Internal",
      origin: "Houston Yard",
      destination: "Houston Yard",
      miles: 0,
      lineHaulPay: 450.00,
      fscPay: 0.00,
      fuelAdvance: 0.00,
      accessorialPay: 50.00,
      deductions: 0.00,
      netPay: 500.00,
      payType: "Hourly",
      tractorNo: "-",
      trailerNo: "-",
      podVerified: true,
      status: "Completed",
      settlementCycle: "Weekly",
    },
    {
      id: 5,
      loadNo: "ML-2025-001248",
      driverId: "DRV-004",
      driverName: "Robert Taylor",
      driverType: "Driver",
      payeeId: "PAY-001",
      payeeName: "Smith Trucking LLC",
      deliveryDate: "2025-01-06",
      customer: "TQL Logistics",
      origin: "Fort Worth, TX",
      destination: "Austin, TX",
      miles: 190,
      lineHaulPay: 380.00,
      fscPay: 38.00,
      fuelAdvance: 100.00,
      accessorialPay: 50.00,
      deductions: 0.00,
      netPay: 368.00,
      payType: "Per Mile",
      tractorNo: "TRK-2847",
      trailerNo: "TRL-1001",
      podVerified: true,
      status: "Completed",
      settlementCycle: "Weekly",
    },
    {
      id: 6,
      loadNo: "WO-2025-000124",
      driverId: "TECH-002",
      driverName: "James Wilson",
      driverType: "Technician",
      payeeId: "PAY-004",
      payeeName: "Wilson Services Inc",
      deliveryDate: "2025-01-06",
      customer: "Internal",
      origin: "Dallas Yard",
      destination: "Dallas Yard",
      miles: 0,
      lineHaulPay: 525.00,
      fscPay: 0.00,
      fuelAdvance: 0.00,
      accessorialPay: 75.00,
      deductions: 25.00,
      netPay: 575.00,
      payType: "Hourly",
      tractorNo: "-",
      trailerNo: "-",
      podVerified: true,
      status: "Completed",
      settlementCycle: "Weekly",
    },
    {
      id: 7,
      loadNo: "ML-2025-001249",
      driverId: "DRV-005",
      driverName: "Emily Davis",
      driverType: "Driver",
      payeeId: "PAY-005",
      payeeName: "Emily Davis",
      deliveryDate: "2025-01-07",
      customer: "CH Robinson",
      origin: "Dallas, TX",
      destination: "Oklahoma City, OK",
      miles: 210,
      lineHaulPay: 420.00,
      fscPay: 42.00,
      fuelAdvance: 0.00,
      accessorialPay: 0.00,
      deductions: 0.00,
      netPay: 462.00,
      payType: "Per Mile",
      tractorNo: "TRK-3344",
      trailerNo: "TRL-1005",
      podVerified: true,
      status: "Completed",
      settlementCycle: "Weekly",
    },
  ];

  // Unsettled loads - Mega Logistics (carriers)
  const carrierUnsettledLoads = [
    {
      id: 101,
      loadNo: "BRK-2025-001289",
      payeeId: "VND-001",
      payeeName: "Swift Transport LLC",
      payeeType: "Carrier",
      deliveryDate: "2025-01-08",
      customer: "Titan Construction",
      origin: "Houston, TX",
      destination: "Phoenix, AZ",
      miles: 1180,
      lineHaulPay: 1850.00,
      fscPay: 185.00,
      fuelAdvance: 0.00,
      accessorialPay: 100.00,
      deductions: 0.00,
      netPay: 2135.00,
      payType: "Flat Rate",
      tractorNo: "-",
      trailerNo: "-",
      podVerified: true,
      status: "Delivered",
      settlementCycle: "Weekly",
    },
    {
      id: 102,
      loadNo: "BRK-2025-001290",
      payeeId: "VND-002",
      payeeName: "Prime Logistics Inc",
      payeeType: "Carrier",
      deliveryDate: "2025-01-08",
      customer: "TQL Logistics",
      origin: "Dallas, TX",
      destination: "Los Angeles, CA",
      miles: 1440,
      lineHaulPay: 2100.00,
      fscPay: 210.00,
      fuelAdvance: 0.00,
      accessorialPay: 75.00,
      deductions: 0.00,
      netPay: 2385.00,
      payType: "Flat Rate",
      tractorNo: "-",
      trailerNo: "-",
      podVerified: true,
      status: "Delivered",
      settlementCycle: "Weekly",
    },
    {
      id: 103,
      loadNo: "BRK-2025-001291",
      payeeId: "VND-001",
      payeeName: "Swift Transport LLC",
      payeeType: "Carrier",
      deliveryDate: "2025-01-09",
      customer: "CH Robinson",
      origin: "San Antonio, TX",
      destination: "Denver, CO",
      miles: 930,
      lineHaulPay: 1650.00,
      fscPay: 165.00,
      fuelAdvance: 0.00,
      accessorialPay: 125.00,
      deductions: 50.00,
      netPay: 1890.00,
      payType: "Flat Rate",
      tractorNo: "-",
      trailerNo: "-",
      podVerified: true,
      status: "Delivered",
      settlementCycle: "Weekly",
    },
  ];

  // Settlements data - Mega Trucking
  const driverSettlements = [
    {
      id: 1,
      settlementNo: "STL-2025-0001",
      payee: "John Smith",
      payeeId: "DRV-001",
      payeeType: "Driver",
      periodStart: "2025-01-08",
      periodEnd: "2025-01-14",
      loadsCount: 5,
      grossPay: 2150.00,
      deductions: 200.00,
      reimbursements: 45.00,
      netPay: 1995.00,
      status: "Active",
      paymentMethod: "Direct Deposit",
      createdDate: "2025-01-15",
    },
    {
      id: 2,
      settlementNo: "STL-2025-0002",
      payee: "Mike Davis",
      payeeId: "DRV-002",
      payeeType: "Driver",
      periodStart: "2025-01-08",
      periodEnd: "2025-01-14",
      loadsCount: 4,
      grossPay: 1850.00,
      deductions: 175.00,
      reimbursements: 0.00,
      netPay: 1675.00,
      status: "Active",
      paymentMethod: "Direct Deposit",
      createdDate: "2025-01-15",
    },
    {
      id: 3,
      settlementNo: "STL-2025-0003",
      payee: "Carlos Martinez",
      payeeId: "TECH-001",
      payeeType: "Technician",
      periodStart: "2025-01-08",
      periodEnd: "2025-01-14",
      loadsCount: 8,
      grossPay: 1200.00,
      deductions: 75.00,
      reimbursements: 85.00,
      netPay: 1210.00,
      status: "Active",
      paymentMethod: "Check",
      createdDate: "2025-01-14",
    },
    {
      id: 4,
      settlementNo: "STL-2025-0004",
      payee: "Sarah Johnson",
      payeeId: "DRV-003",
      payeeType: "Driver",
      periodStart: "2025-01-01",
      periodEnd: "2025-01-07",
      loadsCount: 6,
      grossPay: 2400.00,
      deductions: 150.00,
      reimbursements: 120.00,
      netPay: 2370.00,
      status: "Paid",
      paymentMethod: "Direct Deposit",
      paidDate: "2025-01-10",
      checkNo: null,
      createdDate: "2025-01-08",
    },
  ];

  // Settlements data - Mega Logistics (carriers)
  const carrierSettlements = [
    {
      id: 101,
      settlementNo: "STL-2025-0101",
      payee: "Swift Transport LLC",
      payeeId: "VND-001",
      payeeType: "Carrier",
      periodStart: "2025-01-08",
      periodEnd: "2025-01-14",
      loadsCount: 3,
      grossPay: 5500.00,
      deductions: 0.00,
      reimbursements: 0.00,
      netPay: 5500.00,
      status: "Active",
      paymentMethod: "ACH",
      createdDate: "2025-01-15",
    },
    {
      id: 102,
      settlementNo: "STL-2025-0102",
      payee: "Prime Logistics Inc",
      payeeId: "VND-002",
      payeeType: "Carrier",
      periodStart: "2025-01-08",
      periodEnd: "2025-01-14",
      loadsCount: 2,
      grossPay: 4200.00,
      deductions: 50.00,
      reimbursements: 0.00,
      netPay: 4150.00,
      status: "Active",
      paymentMethod: "ACH",
      createdDate: "2025-01-15",
    },
    {
      id: 103,
      settlementNo: "STL-2025-0103",
      payee: "Roadrunner Freight",
      payeeId: "VND-003",
      payeeType: "Carrier",
      periodStart: "2025-01-01",
      periodEnd: "2025-01-07",
      loadsCount: 4,
      grossPay: 6800.00,
      deductions: 0.00,
      reimbursements: 0.00,
      netPay: 6800.00,
      status: "Paid",
      paymentMethod: "ACH",
      paidDate: "2025-01-09",
      createdDate: "2025-01-08",
    },
  ];

  // Get filtered data based on BU
  const unsettledLoads = selectedBU === "mega-trucking" ? driverUnsettledLoads : carrierUnsettledLoads;
  const settlements = selectedBU === "mega-trucking" ? driverSettlements : carrierSettlements;

  // ============ FILTER GROUPS ============

  const unsettledFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "payee",
          label: selectedBU === "mega-trucking" ? "Payee / Driver" : "Carrier",
          type: "input",
          group: "Basic",
          placeholder: "Search...",
        },
        {
          key: "customer",
          label: "Customer",
          type: "input",
          group: "Basic",
          placeholder: "Search customer...",
        },
        {
          key: "deliveryDate",
          label: "Delivered Date",
          type: "input",
          group: "Basic",
          placeholder: "Date range",
        },
      ],
    },
  ];

  const settlementsFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "settlementNo",
          label: "Settlement #",
          type: "input",
          group: "Basic",
          placeholder: "STL-...",
        },
        {
          key: "payee",
          label: "Payee",
          type: "input",
          group: "Basic",
          placeholder: "Search payee...",
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "Active", label: "Active" },
            { value: "Paid", label: "Paid" },
          ],
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback(() => {}, []);

  // ============ HELPERS ============

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

  // ============ UNSETTLED LOADS HANDLERS ============

  const handleSelectRow = (rowId, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, rowId]);
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(unsettledLoads.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleCreateSettlement = () => {
    console.log("Creating settlement with loads:", selectedRows);
    navigate("/app/carrier-portal/billing/settlements/new");
  };

  const handleOpenLoadBreakdown = (load) => {
    setSelectedLoad(load);
    setShowLoadBreakdownDrawer(true);
  };

  // Calculate selection totals
  const selectedTotal = unsettledLoads
    .filter((row) => selectedRows.includes(row.id))
    .reduce((sum, row) => sum + row.netPay, 0);

  const selectedByPayee = unsettledLoads
    .filter((row) => selectedRows.includes(row.id))
    .reduce((acc, row) => {
      const key = row.payeeId || 'unassigned';
      if (!acc[key]) {
        acc[key] = {
          payee: row.payeeName || 'Unassigned',
          payeeId: row.payeeId,
          payeeType: row.payeeType,
          loads: [],
          totalNetPay: 0,
        };
      }
      acc[key].loads.push(row);
      acc[key].totalNetPay += row.netPay;
      return acc;
    }, {});


  // ============ STATS ============

  // Unsettled stats
  const uniquePayees = new Set(unsettledLoads.filter(r => r.payeeId).map((r) => r.payeeId)).size;
  const unassignedLoads = unsettledLoads.filter((r) => !r.payeeId).length;
  const totalUnsettledPay = unsettledLoads.reduce((sum, row) => sum + row.netPay, 0);

  // Settlements stats
  const draftCount = settlements.filter(s => s.status === "Draft").length;
  const reviewCount = settlements.filter(s => s.status === "Review").length;
  const finalizedCount = settlements.filter(s => s.status === "Finalized").length;
  const paidTotal = settlements.filter(s => s.status === "Paid").reduce((sum, s) => sum + s.netPay, 0);

  // ============ COLUMNS ============

  const unsettledColumns = [
    {
      id: "select",
      header: () => (
        <Checkbox
          checked={selectedRows.length === unsettledLoads.length && unsettledLoads.length > 0}
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
              <DropdownMenuItem onClick={() => handleOpenLoadBreakdown(load)}>
                <EyeIcon className="h-4 w-4 mr-2" />
                View Breakdown
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/complete/load-details?id=${load.loadNo}&mode=view`)}>
                <FileTextIcon className="h-4 w-4 mr-2" />
                View Load Details
              </DropdownMenuItem>
              {!load.payeeId && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    setSelectedLoad(load);
                    setShowAssignPayeeModal(true);
                  }}>
                    <UserPlusIcon className="h-4 w-4 mr-2" />
                    Assign Payee
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "loadNo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Load #" />,
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
      accessorKey: "driverName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Driver/Technician" />,
      cell: ({ row }) => {
        const driverName = row.original.driverName;
        const driverType = row.original.driverType;
        if (!driverName) {
          return <span className="text-muted-foreground">-</span>;
        }
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium">{driverName}</span>
            <Badge className={`${getPayeeTypeBadge(driverType)} flex items-center gap-1`} style={{ fontSize: '10px', padding: '2px 6px' }}>
              {getPayeeTypeIcon(driverType)}
              {driverType}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "payeeName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Payee" />,
      cell: ({ row }) => {
        const payeeName = row.getValue("payeeName");
        if (!payeeName) {
          return <span className="text-muted-foreground">-</span>;
        }
        return <span className="font-medium">{payeeName}</span>;
      },
    },
    {
      accessorKey: "customer",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
      cell: ({ row }) => <span className="font-medium">{row.getValue("customer")}</span>,
    },
    {
      accessorKey: "origin",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Pick Up" />,
      cell: ({ row }) => <span className="text-sm">{row.original.origin}</span>,
    },
    {
      accessorKey: "destination",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Drop Off" />,
      cell: ({ row }) => <span className="text-sm">{row.original.destination}</span>,
    },
    {
      accessorKey: "deliveryDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Delivered" />,
      cell: ({ row }) => formatDate(row.getValue("deliveryDate")),
    },
    {
      accessorKey: "lineHaulPay",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Linehaul" />,
      cell: ({ row }) => formatCurrency(row.getValue("lineHaulPay")),
    },
    {
      accessorKey: "netPay",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Net Pay" />,
      cell: ({ row }) => (
        <span className="font-bold text-green-600">{formatCurrency(row.getValue("netPay"))}</span>
      ),
    },
  ];

  const settlementsColumns = [
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
              {settlement.status === "Draft" && (
                <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/billing/settlements/${settlement.settlementNo}?tab=loads`)}>
                  <Edit2Icon className="h-4 w-4 mr-2" />
                  Edit Settlement
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {settlement.status === "Draft" && (
                <DropdownMenuItem>
                  <PlayIcon className="h-4 w-4 mr-2" />
                  Submit for Review
                </DropdownMenuItem>
              )}
              {settlement.status === "Review" && (
                <DropdownMenuItem>
                  <FileCheck2Icon className="h-4 w-4 mr-2" />
                  Approve & Finalize
                </DropdownMenuItem>
              )}
              {settlement.status === "Finalized" && (
                <DropdownMenuItem>
                  <CreditCardIcon className="h-4 w-4 mr-2" />
                  Process Payment
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download Statement
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SendIcon className="h-4 w-4 mr-2" />
                Email Statement
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "settlementNo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Settlement #" />,
      cell: ({ row }) => (
        <button
          onClick={() => navigate(`/app/carrier-portal/billing/settlements/${row.getValue("settlementNo")}`)}
          className="font-mono text-sm font-medium text-primary hover:underline"
        >
          {row.getValue("settlementNo")}
        </button>
      ),
    },
    {
      accessorKey: "payee",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Payee" />,
      cell: ({ row }) => {
        const type = row.original.payeeType;
        return (
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium">{row.getValue("payee")}</span>
              <Badge className={`${getPayeeTypeBadge(type)} flex items-center gap-1`} style={{ fontSize: '10px', padding: '2px 6px' }}>
                {getPayeeTypeIcon(type)}
                {type}
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground">{row.original.payeeId}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "periodStart",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Period" />,
      cell: ({ row }) => (
        <div className="text-sm">
          {formatDate(row.original.periodStart)} - {formatDate(row.original.periodEnd)}
        </div>
      ),
    },
    {
      accessorKey: "loadsCount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Loads" />,
      cell: ({ row }) => <span className="font-medium">{row.getValue("loadsCount")}</span>,
    },
    {
      accessorKey: "grossPay",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Gross Pay" />,
      cell: ({ row }) => formatCurrency(row.getValue("grossPay")),
    },
    {
      accessorKey: "deductions",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Deductions" />,
      cell: ({ row }) => {
        const deductions = row.getValue("deductions");
        return deductions > 0 ? (
          <span className="text-red-600">-{formatCurrency(deductions)}</span>
        ) : (
          <span className="text-muted-foreground">-</span>
        );
      },
    },
    {
      accessorKey: "netPay",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Net Pay" />,
      cell: ({ row }) => (
        <span className="font-bold text-green-600">{formatCurrency(row.getValue("netPay"))}</span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => getStatusBadge(row.getValue("status")),
    },
    {
      accessorKey: "paymentMethod",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Payment" />,
      cell: ({ row }) => <span className="text-sm">{row.getValue("paymentMethod")}</span>,
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="px-6 py-4">
        {/* Filter and Tabs Row */}
        <div className="flex items-center justify-between mb-4">
          <SmartFilter
            filterGroups={activeTab === "unsettled" ? unsettledFilterGroups : settlementsFilterGroups}
            onFiltersChange={handleFiltersChange}
          />
          <div className="flex items-center gap-2">
            {/* Unsettled/Settlements Tabs */}
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={activeTab === "unsettled" ? "default" : "ghost"}
                className={`rounded-none ${
                  activeTab === "unsettled"
                    ? "bg-amber-500 text-white hover:bg-amber-600"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
                onClick={() => setActiveTab("unsettled")}
              >
                <ClipboardListIcon className="size-4 mr-2" />
                Unsettled Loads
              </Button>
              <Button
                variant={activeTab === "settlements" ? "default" : "ghost"}
                className={`rounded-none ${
                  activeTab === "settlements"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
                onClick={() => setActiveTab("settlements")}
              >
                <Wallet className="size-4 mr-2" />
                Settlements
              </Button>
            </div>
            {/* BU Selector */}
            <Select value={selectedBU} onValueChange={(value) => {
              setSelectedBU(value);
              setSelectedRows([]);
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select BU" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mega-trucking">
                  <div className="flex items-center gap-2">
                    <TruckIcon className="size-4" />
                    Mega Trucking
                  </div>
                </SelectItem>
                <SelectItem value="mega-logistics">
                  <div className="flex items-center gap-2">
                    <Building2 className="size-4" />
                    Mega Logistics
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Unsettled Loads Tab Content */}
        {activeTab === "unsettled" && (
          <>
            {/* Actions Toolbar */}
            <div className="flex items-center justify-between mb-4 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setShowCreateSettlementDialog(true)}
                  disabled={selectedRows.length === 0}
                  className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  <PlusIcon className="size-4 mr-2" />
                  Create Settlement
                </Button>
              </div>
              {selectedRows.length > 0 && (
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Selected:</span>
                  <span className="font-bold">{selectedRows.length} loads</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-muted-foreground">Total Pay:</span>
                  <span className="font-bold text-green-600">{formatCurrency(selectedTotal)}</span>
                </div>
              )}
            </div>

            {/* Data Table */}
            <DataTable columns={unsettledColumns} data={unsettledLoads} showViewOptions={false} pageSize={10} />
          </>
        )}

        {/* Settlements Tab Content */}
        {activeTab === "settlements" && (
          <DataTable columns={settlementsColumns} data={settlements} showViewOptions={false} pageSize={10} />
        )}
      </div>

      {/* Create Settlement Dialog */}
      <AlertDialog open={showCreateSettlementDialog} onOpenChange={setShowCreateSettlementDialog}>
        <AlertDialogContent className="max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Create Settlement</AlertDialogTitle>
            <AlertDialogDescription>
              Create a new draft settlement with {selectedRows.length} selected load(s).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4 space-y-3 max-h-64 overflow-y-auto">
            {Object.values(selectedByPayee).map((group) => (
              <div key={group.payeeId || 'unassigned'} className="border rounded-lg p-3 bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{group.payee}</p>
                      {group.payeeType && (
                        <Badge className={`${getPayeeTypeBadge(group.payeeType)} flex items-center gap-1`} style={{ fontSize: '10px', padding: '2px 6px' }}>
                          {getPayeeTypeIcon(group.payeeType)}
                          {group.payeeType}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{group.loads.length} loads</span>
                  </div>
                  <p className="font-bold text-green-600">{formatCurrency(group.totalNetPay)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 flex items-center justify-between">
            <span className="font-medium">Total</span>
            <span className="text-lg font-bold text-green-600">{formatCurrency(selectedTotal)}</span>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCreateSettlement}
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              <PlusIcon className="size-4 mr-2" />
              Create Settlement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      {/* Load Breakdown Drawer */}
      <Sheet open={showLoadBreakdownDrawer} onOpenChange={setShowLoadBreakdownDrawer}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto px-6">
          <SheetHeader className="pb-4 border-b">
            <SheetTitle className="text-xl font-bold">Load Settlement Breakdown</SheetTitle>
          </SheetHeader>
          {selectedLoad && (
            <div className="py-4 space-y-6">
              {/* Load Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg font-bold text-primary">{selectedLoad.loadNo}</span>
                  <Badge className="bg-green-500/10 text-green-700 border-green-500/50">
                    <CheckCircle2Icon className="size-3 mr-1" />
                    {selectedLoad.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Building2 className="size-4 text-muted-foreground" />
                    <span>{selectedLoad.customer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="size-4 text-muted-foreground" />
                    <span>{formatDate(selectedLoad.deliveryDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TruckIcon className="size-4 text-muted-foreground" />
                    <span>{selectedLoad.tractorNo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ReceiptIcon className="size-4 text-muted-foreground" />
                    <span>{selectedLoad.trailerNo}</span>
                  </div>
                </div>
              </div>

              {/* Route */}
              <div className="border rounded-lg p-4 bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Origin</p>
                    <p className="font-medium">{selectedLoad.origin}</p>
                  </div>
                  <ArrowRightIcon className="size-5 text-muted-foreground" />
                  <div className="flex-1 text-right">
                    <p className="text-xs text-muted-foreground">Destination</p>
                    <p className="font-medium">{selectedLoad.destination}</p>
                  </div>
                </div>
              </div>

              {/* Earnings Breakdown */}
              <div className="border rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-muted border-b">
                  <h3 className="font-semibold flex items-center gap-2">
                    <DollarSign className="size-4" />
                    Earnings Breakdown
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Linehaul</span>
                    <span className="font-medium">{formatCurrency(selectedLoad.lineHaulPay)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">FSC</span>
                    <span className="font-medium">{formatCurrency(selectedLoad.fscPay)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Accessorial</span>
                    <span className="font-medium">{formatCurrency(selectedLoad.accessorialPay)}</span>
                  </div>
                  {selectedLoad.fuelAdvance > 0 && (
                    <div className="flex justify-between text-amber-600">
                      <span>Fuel Advance</span>
                      <span className="font-medium">-{formatCurrency(selectedLoad.fuelAdvance)}</span>
                    </div>
                  )}
                  {selectedLoad.deductions > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Deductions</span>
                      <span className="font-medium">-{formatCurrency(selectedLoad.deductions)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Net Pay</span>
                    <span className="text-green-600">{formatCurrency(selectedLoad.netPay)}</span>
                  </div>
                </div>
              </div>

              {/* Driver/Technician Info */}
              <div className="border rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-muted border-b">
                  <h3 className="font-semibold flex items-center gap-2">
                    <UserIcon className="size-4" />
                    Driver/Technician
                  </h3>
                </div>
                <div className="p-4">
                  {selectedLoad.driverName ? (
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        {selectedLoad.driverType === "Driver" ? (
                          <UserIcon className="size-5 text-primary" />
                        ) : (
                          <WrenchIcon className="size-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold">{selectedLoad.driverName}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{selectedLoad.driverId}</span>
                          <Badge className={getPayeeTypeBadge(selectedLoad.driverType)}>
                            {selectedLoad.driverType}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No driver assigned</p>
                  )}
                </div>
              </div>

              {/* Payee Info */}
              <div className="border rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-muted border-b">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Building2 className="size-4" />
                    Payee Information
                  </h3>
                </div>
                <div className="p-4">
                  {selectedLoad.payeeName ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-green-500/10">
                          <DollarSign className="size-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-bold">{selectedLoad.payeeName}</p>
                          <span className="text-sm text-muted-foreground">{selectedLoad.payeeId}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                        <div>
                          <p className="text-xs text-muted-foreground">Settlement Cycle</p>
                          <p className="text-sm font-medium">{selectedLoad.settlementCycle || "-"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Pay Type</p>
                          <p className="text-sm font-medium">{selectedLoad.payType || "-"}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <UserPlusIcon className="size-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">No payee assigned</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Settlements;
