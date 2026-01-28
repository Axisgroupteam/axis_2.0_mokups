import { useState, useCallback, useMemo } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
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
  CheckCircleIcon,
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
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

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

  // Filter states
  const [loadFilters, setLoadFilters] = useState([]);
  const [deductionFilters, setDeductionFilters] = useState([]);
  const [reimbursementFilters, setReimbursementFilters] = useState([]);

  // Filter configurations
  const loadFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "loadNo",
          label: "Load No",
          type: "input",
          group: "Basic",
          placeholder: "Search load number...",
        },
        {
          key: "driverName",
          label: "Driver",
          type: "select",
          group: "Basic",
          options: [
            { value: "John Smith", label: "John Smith" },
            { value: "Mike Davis", label: "Mike Davis" },
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
          ],
        },
        {
          key: "origin",
          label: "Origin",
          type: "input",
          group: "Basic",
          placeholder: "Search origin...",
        },
        {
          key: "destination",
          label: "Destination",
          type: "input",
          group: "Basic",
          placeholder: "Search destination...",
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

  // Determine if reviewed based on local state
  const isApprovedStatus = worksheetStatus === "Approved";

  // Mock worksheet data mapping based on worksheetNo
  const worksheetDataMap = {
    "WS-2026-0001": {
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
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      paymentMethod: "Bank Transfer",
      bankName: "Chase Business",
      bankAccount: "****4521",
      generatedDate: "2026-01-15",
      businessUnit: "Mega Trucking",
      drivers: [
        {
          driverId: "DRV-001",
          driverName: "John Smith",
          driverType: "Driver",
          loads: [
            { id: 1, loadNo: "ML-2026-001245", deliveredDate: "2026-01-08", customer: "Titan Construction", origin: "Houston, TX", destination: "Dallas, TX", miles: 243, linehaul: 1458.00, fsc: 145.80, accessorials: [{ type: "Detention", amount: 175.00 }], fuelAdvance: 425.00, grossPay: 1778.80, netPay: 1353.80 },
            { id: 2, loadNo: "ML-2026-001248", deliveredDate: "2026-01-09", customer: "TQL Logistics", origin: "Dallas, TX", destination: "Austin, TX", miles: 195, linehaul: 1170.00, fsc: 117.00, accessorials: [{ type: "Stop-off", amount: 75.00 }], fuelAdvance: 350.00, grossPay: 1362.00, netPay: 1012.00 },
            { id: 3, loadNo: "ML-2026-001252", deliveredDate: "2026-01-10", customer: "CH Robinson", origin: "Austin, TX", destination: "El Paso, TX", miles: 578, linehaul: 2312.00, fsc: 231.20, accessorials: [{ type: "Layover", amount: 250.00 }], fuelAdvance: 520.00, grossPay: 2793.20, netPay: 2273.20 },
          ],
        },
      ],
    },
    "WS-2026-0002": {
      payeeId: "PAY-002",
      payeeName: "Sarah Johnson",
      legalName: "Sarah Johnson",
      payeeType: "Company Driver",
      payeeEmail: "sarah.johnson@company.com",
      payeePhone: "(713) 555-2345",
      payeeAddress: "789 Driver Lane",
      payeeCity: "Houston",
      payeeState: "TX",
      payeeZip: "77042",
      taxId: "**-***5678",
      cycleType: "Weekly",
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      paymentMethod: "Direct Deposit",
      bankName: "Bank of America",
      bankAccount: "****7890",
      generatedDate: "2026-01-15",
      businessUnit: "Mega Trucking",
      drivers: [
        {
          driverId: "DRV-002",
          driverName: "Sarah Johnson",
          driverType: "Company Driver",
          loads: [
            { id: 1, loadNo: "ML-2026-001301", deliveredDate: "2026-01-08", customer: "ABC Corp", origin: "Houston, TX", destination: "Austin, TX", miles: 165, linehaul: 990.00, fsc: 99.00, accessorials: [], fuelAdvance: 0, grossPay: 1089.00, netPay: 1089.00 },
            { id: 2, loadNo: "ML-2026-001305", deliveredDate: "2026-01-10", customer: "XYZ Industries", origin: "Austin, TX", destination: "San Antonio, TX", miles: 80, linehaul: 480.00, fsc: 48.00, accessorials: [{ type: "Detention", amount: 100.00 }], fuelAdvance: 0, grossPay: 628.00, netPay: 628.00 },
          ],
        },
      ],
    },
    "WS-2026-0003": {
      payeeId: "PAY-003",
      payeeName: "Carlos Martinez",
      legalName: "Carlos Martinez",
      payeeType: "Technician",
      payeeEmail: "carlos.martinez@company.com",
      payeePhone: "(713) 555-3456",
      payeeAddress: "456 Tech Road",
      payeeCity: "Houston",
      payeeState: "TX",
      payeeZip: "77043",
      taxId: "**-***6789",
      cycleType: "Weekly",
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      paymentMethod: "Direct Deposit",
      bankName: "Wells Fargo",
      bankAccount: "****1234",
      generatedDate: "2026-01-15",
      businessUnit: "Mega Trucking",
      drivers: [
        {
          driverId: "TECH-001",
          driverName: "Carlos Martinez",
          driverType: "Technician",
          loads: [
            { id: 1, loadNo: "SVC-2026-0045", deliveredDate: "2026-01-08", customer: "Fleet Maintenance", origin: "Houston, TX", destination: "Houston, TX", miles: 0, linehaul: 450.00, fsc: 0, accessorials: [{ type: "Service Call", amount: 150.00 }], fuelAdvance: 0, grossPay: 600.00, netPay: 600.00 },
            { id: 2, loadNo: "SVC-2026-0048", deliveredDate: "2026-01-11", customer: "Fleet Maintenance", origin: "Houston, TX", destination: "Katy, TX", miles: 30, linehaul: 380.00, fsc: 0, accessorials: [{ type: "Parts", amount: 225.00 }], fuelAdvance: 0, grossPay: 605.00, netPay: 605.00 },
          ],
        },
      ],
    },
    "WS-2026-0008": {
      payeeId: "VND-001",
      payeeName: "Texas Fleet Services",
      legalName: "Texas Fleet Services LLC",
      payeeType: "Vendor",
      payeeEmail: "dispatch@texasfleet.com",
      payeePhone: "(713) 555-8888",
      payeeAddress: "8800 Fleet Center Drive",
      payeeCity: "Houston",
      payeeState: "TX",
      payeeZip: "77099",
      taxId: "**-***9999",
      cycleType: "Weekly",
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      paymentMethod: "Bank Transfer",
      bankName: "Texas Capital Bank",
      bankAccount: "****5555",
      generatedDate: "2026-01-15",
      businessUnit: "Mega Trucking",
      vendorDrivers: [
        { id: "DRV-V01", name: "John Smith", loadsCount: 3, earnings: 5934.00 },
        { id: "DRV-V02", name: "Mike Johnson", loadsCount: 3, earnings: 3761.60 },
        { id: "DRV-V03", name: "Carlos Rodriguez", loadsCount: 2, earnings: 3232.20 },
      ],
      drivers: [
        {
          driverId: "DRV-V01",
          driverName: "John Smith",
          driverType: "Driver",
          loads: [
            { id: 1, loadNo: "ML-2026-001401", deliveredDate: "2026-01-08", customer: "Titan Construction", origin: "Houston, TX", destination: "Dallas, TX", miles: 243, linehaul: 1458.00, fsc: 145.80, accessorials: [{ type: "Detention", amount: 175.00 }], fuelAdvance: 425.00, grossPay: 1778.80, netPay: 1353.80 },
            { id: 2, loadNo: "ML-2026-001405", deliveredDate: "2026-01-09", customer: "TQL Logistics", origin: "Dallas, TX", destination: "Austin, TX", miles: 195, linehaul: 1170.00, fsc: 117.00, accessorials: [], fuelAdvance: 350.00, grossPay: 1287.00, netPay: 937.00 },
            { id: 3, loadNo: "ML-2026-001410", deliveredDate: "2026-01-10", customer: "CH Robinson", origin: "Austin, TX", destination: "San Antonio, TX", miles: 80, linehaul: 480.00, fsc: 48.00, accessorials: [{ type: "Layover", amount: 200.00 }], fuelAdvance: 200.00, grossPay: 728.00, netPay: 528.00 },
          ],
        },
        {
          driverId: "DRV-V02",
          driverName: "Mike Johnson",
          driverType: "Driver",
          loads: [
            { id: 4, loadNo: "ML-2026-001415", deliveredDate: "2026-01-08", customer: "XPO Logistics", origin: "Houston, TX", destination: "San Antonio, TX", miles: 197, linehaul: 1182.00, fsc: 118.20, accessorials: [], fuelAdvance: 380.00, grossPay: 1300.20, netPay: 920.20 },
            { id: 5, loadNo: "ML-2026-001420", deliveredDate: "2026-01-09", customer: "Coyote Logistics", origin: "San Antonio, TX", destination: "Dallas, TX", miles: 275, linehaul: 1650.00, fsc: 165.00, accessorials: [{ type: "Stop-off", amount: 75.00 }], fuelAdvance: 450.00, grossPay: 1890.00, netPay: 1440.00 },
            { id: 6, loadNo: "ML-2026-001425", deliveredDate: "2026-01-11", customer: "Echo Global", origin: "Dallas, TX", destination: "Houston, TX", miles: 239, linehaul: 1434.00, fsc: 143.40, accessorials: [], fuelAdvance: 400.00, grossPay: 1577.40, netPay: 1177.40 },
          ],
        },
        {
          driverId: "DRV-V03",
          driverName: "Carlos Rodriguez",
          driverType: "Driver",
          loads: [
            { id: 7, loadNo: "ML-2026-001430", deliveredDate: "2026-01-09", customer: "JB Hunt", origin: "Houston, TX", destination: "Austin, TX", miles: 165, linehaul: 990.00, fsc: 99.00, accessorials: [{ type: "Detention", amount: 150.00 }], fuelAdvance: 300.00, grossPay: 1239.00, netPay: 939.00 },
            { id: 8, loadNo: "ML-2026-001435", deliveredDate: "2026-01-10", customer: "Schneider", origin: "Austin, TX", destination: "Oklahoma City, OK", miles: 390, linehaul: 2340.00, fsc: 234.00, accessorials: [], fuelAdvance: 520.00, grossPay: 2574.00, netPay: 2054.00 },
          ],
        },
      ],
    },
  };

  // Get worksheet data based on URL param, fallback to Owner Operator
  const currentWorksheetNo = worksheetNo || "WS-2026-0001";
  const worksheetData = worksheetDataMap[currentWorksheetNo] || worksheetDataMap["WS-2026-0001"];

  // Mock worksheet data - uses local state for status
  const worksheet = {
    worksheetNo: currentWorksheetNo,
    ...worksheetData,
    status: worksheetStatus,
    generatedBy: "System",
    reviewedDate: reviewedTimestamp,
    reviewedBy: isApprovedStatus ? "Amanda Wilson" : null,
  };

  // Mock loads data with driver breakdown
  const [drivers] = useState(worksheetData.drivers);

  // Flatten loads for table display
  const allLoads = drivers.flatMap(driver =>
    driver.loads.map(load => ({
      ...load,
      driverName: driver.driverName,
      driverId: driver.driverId,
      driverType: driver.driverType,
    }))
  );

  // Filter loads based on active filters
  const filteredLoads = useMemo(() => {
    if (loadFilters.length === 0) return allLoads;

    return allLoads.filter(load => {
      return loadFilters.every(filter => {
        const { key, value, type } = filter;
        if (!value || value === "") return true;

        if (type === "input") {
          // For input filters, do case-insensitive partial match
          const fieldValue = load[key]?.toString().toLowerCase() || "";
          return fieldValue.includes(value.toLowerCase());
        } else if (type === "select") {
          // For select filters, do exact match
          return load[key] === value;
        }
        return true;
      });
    });
  }, [allLoads, loadFilters]);

  // Mock deductions based on payee type
  const getInitialDeductions = () => {
    if (worksheet.payeeType === "Vendor") {
      return [
        { id: 1, type: "Agency Fee", category: "Recurring", description: "Weekly vendor agency fee", amount: 500.00 },
        { id: 2, type: "Equipment Insurance", category: "Recurring", description: "Fleet equipment insurance premium", amount: 800.00 },
        { id: 3, type: "Maintenance Escrow", category: "Recurring", description: "Fleet maintenance escrow contribution", amount: 500.00 },
        { id: 4, type: "Fuel Advance", category: "Load", description: "Fuel advance - ML-2026-001401", amount: 425.00, loadNo: "ML-2026-001401" },
        { id: 5, type: "Fuel Advance", category: "Load", description: "Fuel advance - ML-2026-001405", amount: 350.00, loadNo: "ML-2026-001405" },
        { id: 6, type: "Fuel Advance", category: "Load", description: "Fuel advance - ML-2026-001415", amount: 380.00, loadNo: "ML-2026-001415" },
      ];
    } else if (worksheet.payeeType === "Company Driver") {
      return [
        { id: 1, type: "Health Insurance", category: "Recurring", description: "Weekly health insurance premium", amount: 125.00 },
        { id: 2, type: "401k Contribution", category: "Recurring", description: "Weekly 401k contribution", amount: 75.00 },
      ];
    } else if (worksheet.payeeType === "Technician") {
      return [
        { id: 1, type: "Tool Allowance", category: "Recurring", description: "Weekly tool allowance deduction", amount: 50.00 },
        { id: 2, type: "Uniform", category: "Recurring", description: "Uniform maintenance", amount: 25.00 },
      ];
    }
    // Owner Operator default
    return [
      { id: 1, type: "Equipment Insurance", category: "Recurring", description: "Weekly equipment insurance premium", amount: 275.00 },
      { id: 2, type: "Lease Payment", category: "Recurring", description: "Truck lease - TRK-2847", amount: 875.00 },
      { id: 3, type: "Maintenance Escrow", category: "Recurring", description: "Weekly maintenance escrow contribution", amount: 150.00 },
      { id: 4, type: "Fuel Advance", category: "Load", description: "Fuel advance - ML-2026-001245", amount: 425.00, loadNo: "ML-2026-001245" },
      { id: 5, type: "Fuel Advance", category: "Load", description: "Fuel advance - ML-2026-001248", amount: 350.00, loadNo: "ML-2026-001248" },
      { id: 6, type: "Fuel Advance", category: "Load", description: "Fuel advance - ML-2026-001252", amount: 520.00, loadNo: "ML-2026-001252" },
      { id: 7, type: "Cash Advance", category: "One-Time", description: "Cash advance taken 01/10/2026", amount: 500.00 },
    ];
  };

  const [deductions, setDeductions] = useState(getInitialDeductions());

  // Mock reimbursements
  const [reimbursements, setReimbursements] = useState([
    { id: 1, type: "Tolls", description: "Toll receipts - Dallas & Austin trips", amount: 87.50, receipt: "RCP-2026-0142" },
    { id: 2, type: "Scale Tickets", description: "CAT scale receipts (4 tickets)", amount: 32.00, receipt: "RCP-2026-0143" },
  ]);

  // Filter deductions based on active filters
  const filteredDeductions = useMemo(() => {
    if (deductionFilters.length === 0) return deductions;

    return deductions.filter(deduction => {
      return deductionFilters.every(filter => {
        const { key, value } = filter;
        if (!value || value === "") return true;
        return deduction[key] === value;
      });
    });
  }, [deductions, deductionFilters]);

  // Filter reimbursements based on active filters
  const filteredReimbursements = useMemo(() => {
    if (reimbursementFilters.length === 0) return reimbursements;

    return reimbursements.filter(reimbursement => {
      return reimbursementFilters.every(filter => {
        const { key, value } = filter;
        if (!value || value === "") return true;
        return reimbursement[key] === value;
      });
    });
  }, [reimbursements, reimbursementFilters]);

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
      cell: ({ row }) => {
        const driverData = drivers.find(d => d.driverId === row.original.driverId);
        const isVendor = worksheet.payeeType === "Vendor";

        if (isVendor) {
          return (
            <button
              onClick={() => {
                setSelectedDriver(driverData);
                setShowDriverModal(true);
              }}
              className="text-left hover:text-primary"
            >
              <p className="text-sm font-medium hover:underline">{row.getValue("driverName")}</p>
              <p className="text-xs text-muted-foreground">{row.original.driverId}</p>
            </button>
          );
        }

        return (
          <div>
            <p className="text-sm font-medium">{row.getValue("driverName")}</p>
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

        <div className="flex-1 overflow-auto">
          {/* General Tab */}
          <TabsContent value="general" className="h-full mt-0 p-4">
            <div className="space-y-4">
              {/* Settlement Header Card */}
              <div className="border rounded-sm bg-card">
                <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <FileSpreadsheetIcon className="size-4" />
                    Settlement Details
                  </h3>
                  <div className="flex items-center gap-2">
                    {isPendingReview && (
                      <Button size="sm" variant="outline" onClick={() => setShowMarkApprovedDialog(true)}>
                        <CheckCircleIcon className="size-4 mr-2" />
                        Mark as Approved
                      </Button>
                    )}
                    {(isPendingReview || isApproved) && (
                      <Button size="sm" className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90" onClick={() => setShowCreateSettlementDialog(true)}>
                        <PlayIcon className="size-4 mr-2" />
                        Create Settlement
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <DownloadIcon className="size-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  <div className="grid grid-cols-4 divide-x divide-border">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Settlement #</p>
                      <p className="text-sm font-medium text-foreground font-mono">{worksheet.worksheetNo}</p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Status</p>
                      <div className="mt-0.5">{getStatusBadge(worksheet.status)}</div>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Period</p>
                      <p className="text-sm font-medium text-foreground">{formatDate(worksheet.periodStart)} - {formatDate(worksheet.periodEnd)}</p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Business Unit</p>
                      <p className="text-sm font-medium text-foreground">{worksheet.businessUnit}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 divide-x divide-border">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Payee</p>
                      <p className="text-sm font-medium text-foreground">{worksheet.payeeName}</p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Payee Type</p>
                      <Badge variant="outline" className={getPayeeTypeBadge(worksheet.payeeType)}>
                        {worksheet.payeeType}
                      </Badge>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Settlement Cycle</p>
                      <p className="text-sm font-medium text-foreground">{worksheet.cycleType}</p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Generated Date</p>
                      <p className="text-sm font-medium text-foreground">{formatDate(worksheet.generatedDate)}</p>
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

              {/* Vendor Drivers Card - Only shown for Vendor payee type */}
              {worksheet.payeeType === "Vendor" && worksheetData.vendorDrivers && (
                <div className="border rounded-sm bg-card">
                  <div className="px-4 py-3 border-b bg-muted">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <UserIcon className="size-4" />
                      Drivers Under This Vendor ({worksheetData.vendorDrivers.length})
                    </h3>
                  </div>
                  <div className="divide-y divide-border">
                    {worksheetData.vendorDrivers.map((driver, index) => (
                      <div key={driver.id} className="grid grid-cols-4 divide-x divide-border">
                        <div className="px-4 py-2.5">
                          <p className="text-xs text-muted-foreground mb-0.5">Driver</p>
                          <p className="text-sm font-medium text-foreground">{driver.name}</p>
                        </div>
                        <div className="px-4 py-2.5">
                          <p className="text-xs text-muted-foreground mb-0.5">Driver ID</p>
                          <p className="text-sm font-medium text-foreground font-mono">{driver.id}</p>
                        </div>
                        <div className="px-4 py-2.5">
                          <p className="text-xs text-muted-foreground mb-0.5">Loads</p>
                          <p className="text-sm font-medium text-foreground">{driver.loadsCount}</p>
                        </div>
                        <div className="px-4 py-2.5">
                          <p className="text-xs text-muted-foreground mb-0.5">Earnings</p>
                          <p className="text-sm font-medium text-green-600">{formatCurrency(driver.earnings)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </TabsContent>

        {/* Loads Tab */}
        <TabsContent value="loads" className="p-6 mt-0">
          <div className="mb-4">
            <SmartFilter
              filterGroups={loadFilterGroups}
              onFiltersChange={handleLoadFiltersChange}
            />
          </div>

          <DataTable
            columns={loadColumns}
            data={filteredLoads}
            showViewOptions={false}
            pageSize={10}
          />

          {/* Earnings Breakdown - Full Width */}
          <div className="mt-4 border rounded-sm bg-card">
            <div className="px-4 py-2.5 border-b bg-muted">
              <h4 className="text-sm font-semibold">Earnings Breakdown</h4>
            </div>
            <div className="grid grid-cols-5 divide-x divide-border">
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Linehaul</p>
                <p className="text-sm font-semibold">{formatCurrency(allLoads.reduce((s, l) => s + l.linehaul, 0))}</p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">FSC</p>
                <p className="text-sm font-semibold">{formatCurrency(allLoads.reduce((s, l) => s + l.fsc, 0))}</p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Accessorials</p>
                <p className="text-sm font-semibold">{formatCurrency(allLoads.reduce((s, l) => s + l.accessorials.reduce((a, c) => a + c.amount, 0), 0))}</p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Fuel Advances</p>
                <p className="text-sm font-semibold text-amber-600">-{formatCurrency(allLoads.reduce((s, l) => s + l.fuelAdvance, 0))}</p>
              </div>
              <div className="px-4 py-3 text-center bg-green-50 dark:bg-green-950/20">
                <p className="text-xs text-green-700 dark:text-green-400 mb-1 font-medium">Total Gross Pay</p>
                <p className="text-lg font-bold text-green-600">{formatCurrency(grossPay)}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Deductions Tab */}
        <TabsContent value="deductions" className="p-6 mt-0">
          <div className="flex justify-between items-center mb-4">
            <SmartFilter
              filterGroups={deductionFilterGroups}
              onFiltersChange={handleDeductionFiltersChange}
            />
            {canEdit && (
              <Button size="sm" onClick={() => setShowAddDeductionSheet(true)}>
                <PlusIcon className="size-4 mr-2" />
                Add Deduction
              </Button>
            )}
          </div>
          <DataTable columns={deductionColumns} data={filteredDeductions} showViewOptions={false} pageSize={10} />

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
                <p className="text-xs text-red-700 dark:text-red-400 mb-1 font-medium">Total Deductions</p>
                <p className="text-lg font-bold text-red-600">-{formatCurrency(totalDeductions)}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Reimbursements Tab */}
        <TabsContent value="reimbursements" className="p-6 mt-0">
          <div className="flex justify-between items-center mb-4">
            <SmartFilter
              filterGroups={reimbursementFilterGroups}
              onFiltersChange={handleReimbursementFiltersChange}
            />
            {canEdit && (
              <Button size="sm" onClick={() => setShowAddReimbursementSheet(true)}>
                <PlusIcon className="size-4 mr-2" />
                Add Reimbursement
              </Button>
            )}
          </div>
          <DataTable columns={reimbursementColumns} data={filteredReimbursements} showViewOptions={false} pageSize={10} />

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
                <p className="text-sm font-semibold text-green-600">+{formatCurrency(reimbursements.filter(r => !["Tolls", "Scale Tickets"].includes(r.type)).reduce((s, r) => s + r.amount, 0))}</p>
              </div>
              <div className="px-4 py-3 text-center bg-green-50 dark:bg-green-950/20">
                <p className="text-xs text-green-700 dark:text-green-400 mb-1 font-medium">Total Reimbursements</p>
                <p className="text-lg font-bold text-green-600">+{formatCurrency(totalReimbursements)}</p>
              </div>
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
        </div>
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

      {/* Driver Details Modal */}
      <AlertDialog open={showDriverModal} onOpenChange={setShowDriverModal}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {selectedDriver?.driverType === "Technician" ? (
                <WrenchIcon className="size-5 text-purple-600" />
              ) : (
                <UserIcon className="size-5 text-blue-600" />
              )}
              {selectedDriver?.driverName}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedDriver?.loads?.length || 0} {selectedDriver?.loads?.length === 1 ? 'load' : 'loads'} in this settlement period
            </AlertDialogDescription>
          </AlertDialogHeader>
          {selectedDriver && (
            <div className="py-4">
              <div className="border rounded-sm bg-card">
                <div className="grid grid-cols-3 divide-x divide-border">
                  <div className="px-4 py-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Gross Pay</p>
                    <p className="text-sm font-semibold">{formatCurrency(selectedDriver.loads.reduce((s, l) => s + l.grossPay, 0))}</p>
                  </div>
                  <div className="px-4 py-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Fuel Advances</p>
                    <p className="text-sm font-semibold text-amber-600">-{formatCurrency(selectedDriver.loads.reduce((s, l) => s + l.fuelAdvance, 0))}</p>
                  </div>
                  <div className="px-4 py-3 text-center bg-green-50 dark:bg-green-950/20">
                    <p className="text-xs text-green-700 dark:text-green-400 mb-1 font-medium">Net Pay</p>
                    <p className="text-lg font-bold text-green-600">{formatCurrency(selectedDriver.loads.reduce((s, l) => s + l.netPay, 0))}</p>
                  </div>
                </div>
              </div>

              {/* Load details list */}
              <div className="mt-4 space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Load Details</p>
                {selectedDriver.loads.map((load) => (
                  <div key={load.id} className="border rounded-sm p-3 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-medium text-primary">{load.loadNo}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(load.deliveredDate)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <span>{load.origin.split(',')[0]}</span>
                      <ArrowRightIcon className="size-3" />
                      <span>{load.destination.split(',')[0]}</span>
                      <span className="ml-2">({load.miles} mi)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Net Pay</span>
                      <span className="font-medium text-green-600">{formatCurrency(load.netPay)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default WorksheetDetails;
