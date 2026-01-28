import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  Building2,
  CreditCardIcon,
  SendIcon,
  ClipboardListIcon,
  AlertTriangleIcon,
  AlertCircleIcon,
  ShieldAlertIcon,
  PlayIcon,
  RefreshCwIcon,
  XCircleIcon,
  CheckCircleIcon,
  FileSpreadsheetIcon,
  BanknoteIcon,
  MinusCircleIcon,
  UsersIcon,
} from "lucide-react";

const Settlements = () => {
  const navigate = useNavigate();
  const [selectedBU, setSelectedBU] = useState("mega-trucking");
  const [activeTab, setActiveTab] = useState("inbox");


  // Worksheet state
  const [selectedWorksheetItems, setSelectedWorksheetItems] = useState([]);
  const [showRunBatchDialog, setShowRunBatchDialog] = useState(false);
  const [selectedPayeeTypeFilter, setSelectedPayeeTypeFilter] = useState(null); // null = all types

  // Exception aging filter state
  const [selectedAgingFilter, setSelectedAgingFilter] = useState(null); // null = all, "0-7", "8-15", "16+"

  // Settlement list state
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedSettlement, setSelectedSettlement] = useState(null);

  // History tab filter state
  const [selectedHistoryStatusFilter, setSelectedHistoryStatusFilter] = useState(null); // null = all, "Approved", "Settled"

  // ============ MOCK DATA ============

  // ============ MEGA TRUCKING HOLDS (Asset-based - Drivers, Payee Entities, Technicians) ============
  // Distribution: 4 Recent (0-7 days), 1 Pending (8-15 days), 1 Overdue (16+ days)
  const truckingHolds = [
    // RECENT (0-7 days)
    {
      id: 1,
      loadNo: "ML-2026-001251",
      holdReason: "pending_accessorial",
      holdDescription: "Detention charge of $150 pending shipper approval",
      driverName: "Mike Davis",
      driverType: "Driver",
      payeeId: "PAY-001",
      payeeName: "Smith Trucking LLC",
      payeeType: "Owner Operator",
      customer: "TQL Logistics",
      origin: "Austin, TX",
      destination: "San Antonio, TX",
      deliveredDate: "2026-01-26",
      grossPay: 1245.00,
      holdSince: "2026-01-27",
      priority: "low",
      redirectPath: "/app/carrier-portal/accessorial/codes",
      redirectLabel: "View Accessorial",
    },
    {
      id: 2,
      loadNo: "ML-2026-001253",
      holdReason: "pending_accessorial",
      holdDescription: "Lumper fee receipt of $275 awaiting verification",
      driverName: "James Wilson",
      driverType: "Driver",
      payeeId: "PAY-004",
      payeeName: "Wilson Transport",
      payeeType: "Owner Operator",
      customer: "Walmart DC",
      origin: "Memphis, TN",
      destination: "Little Rock, AR",
      deliveredDate: "2026-01-24",
      grossPay: 985.00,
      holdSince: "2026-01-25",
      priority: "low",
      redirectPath: "/app/carrier-portal/accessorial/codes",
      redirectLabel: "View Accessorial",
    },
    {
      id: 3,
      loadNo: "ML-2026-001255",
      holdReason: "disputed_load",
      holdDescription: "Load under dispute - customer claims short delivery of 2 pallets",
      driverName: "Sarah Johnson",
      driverType: "Driver",
      payeeId: "PAY-002",
      payeeName: "Sarah Johnson",
      payeeType: "Company Driver",
      customer: "CH Robinson",
      origin: "Fort Worth, TX",
      destination: "Oklahoma City, OK",
      deliveredDate: "2026-01-22",
      grossPay: 1875.50,
      holdSince: "2026-01-23",
      priority: "medium",
      redirectPath: "/app/carrier-portal/orders/bulk/complete/load-details?id=ML-2026-001255&mode=view",
      redirectLabel: "View Load",
    },
    {
      id: 4,
      loadNo: "WO-2026-000125",
      holdReason: "invalid_fuel_card",
      holdDescription: "Fuel transaction of $387.50 on card ending 4521 not assigned to technician",
      driverName: "Carlos Martinez",
      driverType: "Technician",
      payeeId: "PAY-003",
      payeeName: "Carlos Martinez",
      payeeType: "Technician",
      customer: "Internal",
      origin: "Houston Yard",
      destination: "Dallas Yard",
      deliveredDate: "2026-01-21",
      grossPay: 825.00,
      holdSince: "2026-01-22",
      priority: "low",
      redirectPath: "/app/carrier-portal/fuel/transactions/TXN-2026-4521",
      redirectLabel: "View Transaction",
    },
    // PENDING (8-15 days)
    {
      id: 5,
      loadNo: "ML-2026-001248",
      holdReason: "disputed_load",
      holdDescription: "Rate discrepancy - customer billed at incorrect rate",
      driverName: "Tom Anderson",
      driverType: "Driver",
      payeeId: "PAY-005",
      payeeName: "Anderson Trucking",
      payeeType: "Owner Operator",
      customer: "Target Distribution",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      deliveredDate: "2026-01-13",
      grossPay: 2150.00,
      holdSince: "2026-01-14",
      priority: "medium",
      redirectPath: "/app/carrier-portal/orders/bulk/complete/load-details?id=ML-2026-001248&mode=view",
      redirectLabel: "View Load",
    },
    // OVERDUE (16+ days)
    {
      id: 6,
      loadNo: "ML-2026-001240",
      holdReason: "driver_inactive",
      holdDescription: "Driver status changed to inactive on 01/05 - pending HR review",
      driverName: "Robert Taylor",
      driverType: "Driver",
      payeeId: "PAY-001",
      payeeName: "Smith Trucking LLC",
      payeeType: "Owner Operator",
      customer: "Ashgrove Cement",
      origin: "Dallas, TX",
      destination: "Lubbock, TX",
      deliveredDate: "2026-01-04",
      grossPay: 1650.00,
      holdSince: "2026-01-05",
      priority: "high",
      redirectPath: "/app/carrier-portal/master/users/driver-details",
      redirectLabel: "View Driver",
    },
  ];

  // ============ MEGA LOGISTICS HOLDS (Brokerage - External Carriers) ============
  const logisticsHolds = [
    {
      id: 101,
      loadNo: "BL-2026-002451",
      holdReason: "pending_accessorial",
      holdDescription: "Detention charge of $225 pending customer approval",
      driverName: "N/A",
      driverType: "Carrier",
      payeeId: "CAR-001",
      payeeName: "Swift Transport LLC",
      payeeType: "Carrier",
      customer: "Home Depot",
      origin: "Los Angeles, CA",
      destination: "Phoenix, AZ",
      deliveredDate: "2026-01-10",
      grossPay: 2850.00,
      holdSince: "2026-01-11",
      priority: "medium",
      redirectPath: "/app/carrier-portal/accessorial/codes",
      redirectLabel: "View Accessorial",
    },
    {
      id: 102,
      loadNo: "BL-2026-002455",
      holdReason: "disputed_load",
      holdDescription: "Rate dispute - carrier claims $200 additional for overweight shipment",
      driverName: "N/A",
      driverType: "Carrier",
      payeeId: "CAR-002",
      payeeName: "Prime Logistics Inc",
      payeeType: "Carrier",
      customer: "Target Distribution",
      origin: "Dallas, TX",
      destination: "Denver, CO",
      deliveredDate: "2026-01-09",
      grossPay: 3425.00,
      holdSince: "2026-01-10",
      priority: "high",
      redirectPath: "/app/carrier-portal/orders/bulk/complete/load-details?id=BL-2026-002455&mode=view",
      redirectLabel: "View Load",
    },
    {
      id: 103,
      loadNo: "BL-2026-002458",
      holdReason: "missing_pod",
      holdDescription: "Proof of delivery not received from carrier",
      driverName: "N/A",
      driverType: "Carrier",
      payeeId: "CAR-003",
      payeeName: "Roadrunner Freight",
      payeeType: "Carrier",
      customer: "Costco",
      origin: "Chicago, IL",
      destination: "Milwaukee, WI",
      deliveredDate: "2026-01-12",
      grossPay: 1650.00,
      holdSince: "2026-01-13",
      priority: "high",
      redirectPath: "/app/carrier-portal/orders/bulk/complete/load-details?id=BL-2026-002458&mode=view",
      redirectLabel: "View Load",
    },
    {
      id: 104,
      loadNo: "BL-2026-002460",
      holdReason: "carrier_compliance",
      holdDescription: "Carrier insurance expired - awaiting updated COI",
      driverName: "N/A",
      driverType: "Carrier",
      payeeId: "CAR-004",
      payeeName: "FastFreight Carriers",
      payeeType: "Carrier",
      customer: "Walmart DC",
      origin: "Memphis, TN",
      destination: "Nashville, TN",
      deliveredDate: "2026-01-11",
      grossPay: 1180.00,
      holdSince: "2026-01-12",
      priority: "high",
      redirectPath: "/app/carrier-portal/brokerage/carriers",
      redirectLabel: "View Carrier",
    },
  ];

  // Get holds based on selected BU
  const settlementHolds = selectedBU === "mega-trucking" ? truckingHolds : logisticsHolds;

  // ============ MEGA TRUCKING WORKSHEETS (Drivers, Owner Operators, Technicians) ============
  const truckingWorksheetItems = [
    {
      id: 1,
      worksheetNo: "WS-2026-0001",
      payeeId: "PAY-001",
      payeeName: "Smith Trucking LLC",
      payeeType: "Owner Operator",
      cycleType: "Weekly",
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      loadsCount: 3,
      driversCount: 2,
      grossEarnings: 5934.00,
      totalReimbursements: 119.50,
      totalDeductions: 2095.00,
      netPay: 3958.50,
      status: "Pending Review",
      generatedDate: "2026-01-15",
      paymentMethod: "Bank Transfer",
      // Detailed breakdown for sheet view
      drivers: [
        {
          driverId: "DRV-001",
          driverName: "John Smith",
          driverType: "Driver",
          loads: [
            {
              loadNo: "ML-2026-001245",
              deliveredDate: "2026-01-08",
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
              loadNo: "ML-2026-001248",
              deliveredDate: "2026-01-09",
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
              loadNo: "ML-2026-001246",
              deliveredDate: "2026-01-08",
              customer: "Titan Construction",
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
      ],
      recurringDeductions: [
        { type: "Equipment Insurance", amount: 275.00 },
        { type: "Lease Payment", amount: 875.00 },
        { type: "Maintenance Escrow", amount: 150.00 },
      ],
      oneTimeDeductions: [
        { type: "Cash Advance", amount: 500.00, description: "Advance taken 01/07" },
      ],
      reimbursements: [
        { type: "Tolls", amount: 87.50, receipt: "RCP-2026-0142" },
        { type: "Scale Tickets", amount: 32.00, receipt: "RCP-2026-0143" },
      ],
    },
    {
      id: 2,
      worksheetNo: "WS-2026-0002",
      payeeId: "PAY-002",
      payeeName: "Sarah Johnson",
      payeeType: "Company Driver",
      cycleType: "Weekly",
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      loadsCount: 2,
      driversCount: 1,
      grossEarnings: 2836.20,
      totalReimbursements: 45.75,
      totalDeductions: 0.00,
      netPay: 2881.95,
      status: "Pending Review",
      generatedDate: "2026-01-15",
      paymentMethod: "Direct Deposit",
      drivers: [
        {
          driverId: "DRV-003",
          driverName: "Sarah Johnson",
          driverType: "Driver",
          loads: [
            {
              loadNo: "ML-2026-001247",
              deliveredDate: "2026-01-09",
              customer: "Ashgrove Cement",
              origin: "San Antonio, TX",
              destination: "Houston, TX",
              miles: 199,
              linehaul: 1194.00,
              fsc: 119.40,
              accessorials: [{ type: "Detention", amount: 150.00 }],
              fuelAdvance: 0,
              grossPay: 1463.40,
              netPay: 1463.40,
            },
            {
              loadNo: "ML-2026-001249",
              deliveredDate: "2026-01-10",
              customer: "CH Robinson",
              origin: "Dallas, TX",
              destination: "Oklahoma City, OK",
              miles: 208,
              linehaul: 1248.00,
              fsc: 124.80,
              accessorials: [],
              fuelAdvance: 0,
              grossPay: 1372.80,
              netPay: 1372.80,
            },
          ],
        },
      ],
      recurringDeductions: [],
      oneTimeDeductions: [],
      reimbursements: [
        { type: "Tolls", amount: 45.75, receipt: "RCP-2026-0150" },
      ],
    },
    {
      id: 3,
      worksheetNo: "WS-2026-0003",
      payeeId: "PAY-003",
      payeeName: "Carlos Martinez",
      payeeType: "Technician",
      cycleType: "Weekly",
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      loadsCount: 2,
      driversCount: 1,
      grossEarnings: 1730.00,
      totalReimbursements: 142.50,
      totalDeductions: 185.00,
      netPay: 1687.50,
      status: "Reviewed",
      generatedDate: "2026-01-15",
      paymentMethod: "Check",
      drivers: [
        {
          driverId: "TECH-001",
          driverName: "Carlos Martinez",
          driverType: "Technician",
          loads: [
            {
              loadNo: "WO-2026-000123",
              deliveredDate: "2026-01-08",
              customer: "Internal",
              origin: "Houston Yard",
              destination: "Houston Yard",
              miles: 0,
              linehaul: 680.00,
              fsc: 0,
              accessorials: [{ type: "Parts Allowance", amount: 125.00 }],
              fuelAdvance: 0,
              grossPay: 805.00,
              netPay: 805.00,
            },
            {
              loadNo: "WO-2026-000126",
              deliveredDate: "2026-01-10",
              customer: "Internal",
              origin: "Dallas Yard",
              destination: "Dallas Yard",
              miles: 0,
              linehaul: 750.00,
              fsc: 0,
              accessorials: [{ type: "Emergency Call", amount: 175.00 }],
              fuelAdvance: 0,
              grossPay: 925.00,
              netPay: 925.00,
            },
          ],
        },
      ],
      recurringDeductions: [
        { type: "Health Insurance", amount: 185.00 },
      ],
      oneTimeDeductions: [],
      reimbursements: [
        { type: "Materials", amount: 142.50, receipt: "RCP-2026-0148" },
      ],
    },
    {
      id: 4,
      worksheetNo: "WS-2026-0004",
      payeeId: "PAY-004",
      payeeName: "Wilson Transport",
      payeeType: "Owner Operator",
      cycleType: "Weekly",
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      loadsCount: 4,
      driversCount: 1,
      grossEarnings: 5280.00,
      totalReimbursements: 95.00,
      totalDeductions: 1125.00,
      netPay: 4250.00,
      status: "Pending Review",
      generatedDate: "2026-01-15",
      paymentMethod: "Bank Transfer",
      drivers: [
        {
          driverId: "DRV-004",
          driverName: "James Wilson",
          driverType: "Driver",
          loads: [
            {
              loadNo: "ML-2026-001255",
              deliveredDate: "2026-01-08",
              customer: "Walmart DC",
              origin: "Memphis, TN",
              destination: "Little Rock, AR",
              miles: 135,
              linehaul: 810.00,
              fsc: 81.00,
              accessorials: [],
              fuelAdvance: 275.00,
              grossPay: 891.00,
              netPay: 616.00,
            },
            {
              loadNo: "ML-2026-001257",
              deliveredDate: "2026-01-09",
              customer: "Target DC",
              origin: "Little Rock, AR",
              destination: "Dallas, TX",
              miles: 318,
              linehaul: 1908.00,
              fsc: 190.80,
              accessorials: [{ type: "Detention", amount: 125.00 }],
              fuelAdvance: 450.00,
              grossPay: 2223.80,
              netPay: 1773.80,
            },
            {
              loadNo: "ML-2026-001259",
              deliveredDate: "2026-01-11",
              customer: "Home Depot",
              origin: "Dallas, TX",
              destination: "Houston, TX",
              miles: 239,
              linehaul: 1434.00,
              fsc: 143.40,
              accessorials: [],
              fuelAdvance: 400.00,
              grossPay: 1577.40,
              netPay: 1177.40,
            },
            {
              loadNo: "ML-2026-001261",
              deliveredDate: "2026-01-12",
              customer: "Lowes DC",
              origin: "Houston, TX",
              destination: "Austin, TX",
              miles: 165,
              linehaul: 495.00,
              fsc: 49.50,
              accessorials: [{ type: "Lumper", amount: 43.30 }],
              fuelAdvance: 0,
              grossPay: 587.80,
              netPay: 587.80,
            },
          ],
        },
      ],
      recurringDeductions: [
        { type: "Equipment Insurance", amount: 250.00 },
        { type: "Trailer Lease", amount: 650.00 },
        { type: "ELD Service", amount: 45.00 },
      ],
      oneTimeDeductions: [
        { type: "Tire Repair", amount: 180.00, description: "Roadside tire replacement" },
      ],
      reimbursements: [
        { type: "Tolls", amount: 62.00, receipt: "RCP-2026-0155" },
        { type: "Scale Tickets", amount: 33.00, receipt: "RCP-2026-0156" },
      ],
    },
    {
      id: 5,
      worksheetNo: "WS-2026-0005",
      payeeId: "PAY-005",
      payeeName: "Emily Thompson",
      payeeType: "Company Driver",
      cycleType: "Weekly",
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      loadsCount: 3,
      driversCount: 1,
      grossEarnings: 3450.60,
      totalReimbursements: 28.00,
      totalDeductions: 0.00,
      netPay: 3478.60,
      status: "Pending Review",
      generatedDate: "2026-01-15",
      paymentMethod: "Direct Deposit",
      drivers: [
        {
          driverId: "DRV-005",
          driverName: "Emily Thompson",
          driverType: "Driver",
          loads: [
            {
              loadNo: "ML-2026-001262",
              deliveredDate: "2026-01-09",
              customer: "Sysco Foods",
              origin: "Houston, TX",
              destination: "San Antonio, TX",
              miles: 199,
              linehaul: 1194.00,
              fsc: 119.40,
              accessorials: [],
              fuelAdvance: 0,
              grossPay: 1313.40,
              netPay: 1313.40,
            },
            {
              loadNo: "ML-2026-001264",
              deliveredDate: "2026-01-10",
              customer: "US Foods",
              origin: "San Antonio, TX",
              destination: "Austin, TX",
              miles: 80,
              linehaul: 480.00,
              fsc: 48.00,
              accessorials: [{ type: "Wait Time", amount: 75.00 }],
              fuelAdvance: 0,
              grossPay: 603.00,
              netPay: 603.00,
            },
            {
              loadNo: "ML-2026-001266",
              deliveredDate: "2026-01-12",
              customer: "McLane Company",
              origin: "Austin, TX",
              destination: "Dallas, TX",
              miles: 195,
              linehaul: 1170.00,
              fsc: 117.00,
              accessorials: [{ type: "Detention", amount: 247.20 }],
              fuelAdvance: 0,
              grossPay: 1534.20,
              netPay: 1534.20,
            },
          ],
        },
      ],
      recurringDeductions: [],
      oneTimeDeductions: [],
      reimbursements: [
        { type: "Tolls", amount: 28.00, receipt: "RCP-2026-0160" },
      ],
    },
    {
      id: 6,
      worksheetNo: "WS-2026-0006",
      payeeId: "PAY-006",
      payeeName: "Quick Haul Express",
      payeeType: "Owner Operator",
      cycleType: "Daily",
      periodStart: "2026-01-15",
      periodEnd: "2026-01-15",
      loadsCount: 2,
      driversCount: 1,
      grossEarnings: 1850.40,
      totalReimbursements: 0.00,
      totalDeductions: 275.00,
      netPay: 1575.40,
      status: "Pending Review",
      generatedDate: "2026-01-16",
      paymentMethod: "Bank Transfer",
      drivers: [
        {
          driverId: "DRV-006",
          driverName: "David Brown",
          driverType: "Driver",
          loads: [
            {
              loadNo: "ML-2026-001270",
              deliveredDate: "2026-01-15",
              customer: "FedEx Ground",
              origin: "Houston, TX",
              destination: "Galveston, TX",
              miles: 50,
              linehaul: 400.00,
              fsc: 40.00,
              accessorials: [],
              fuelAdvance: 125.00,
              grossPay: 440.00,
              netPay: 315.00,
            },
            {
              loadNo: "ML-2026-001271",
              deliveredDate: "2026-01-15",
              customer: "Amazon",
              origin: "Galveston, TX",
              destination: "Houston, TX",
              miles: 50,
              linehaul: 1280.00,
              fsc: 128.00,
              accessorials: [{ type: "TONU", amount: 2.40 }],
              fuelAdvance: 150.00,
              grossPay: 1410.40,
              netPay: 1260.40,
            },
          ],
        },
      ],
      recurringDeductions: [],
      oneTimeDeductions: [],
      reimbursements: [],
    },
    {
      id: 7,
      worksheetNo: "WS-2026-0007",
      payeeId: "PAY-007",
      payeeName: "Horizon Freight Services",
      payeeType: "Owner Operator",
      cycleType: "Monthly",
      periodStart: "2026-01-01",
      periodEnd: "2026-01-31",
      loadsCount: 12,
      driversCount: 2,
      grossEarnings: 24680.00,
      totalReimbursements: 485.00,
      totalDeductions: 4250.00,
      netPay: 20915.00,
      status: "Pending Review",
      generatedDate: "2026-02-01",
      paymentMethod: "Bank Transfer",
      drivers: [
        {
          driverId: "DRV-007",
          driverName: "Robert Garcia",
          driverType: "Driver",
          loads: [
            {
              loadNo: "ML-2026-001100",
              deliveredDate: "2026-01-05",
              customer: "Home Depot",
              origin: "Dallas, TX",
              destination: "Phoenix, AZ",
              miles: 870,
              linehaul: 5220.00,
              fsc: 522.00,
              accessorials: [{ type: "Detention", amount: 200.00 }],
              fuelAdvance: 850.00,
              grossPay: 5942.00,
              netPay: 5092.00,
            },
          ],
        },
      ],
      recurringDeductions: [
        { type: "Equipment Insurance", amount: 1100.00 },
        { type: "Lease Payment", amount: 3150.00 },
      ],
      oneTimeDeductions: [],
      reimbursements: [
        { type: "Tolls", amount: 285.00, receipt: "RCP-2026-0180" },
        { type: "Scale Tickets", amount: 200.00, receipt: "RCP-2026-0181" },
      ],
    },
    {
      id: 8,
      worksheetNo: "WS-2026-0008",
      payeeId: "VND-001",
      payeeName: "Texas Fleet Services",
      payeeType: "Vendor",
      cycleType: "Weekly",
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      loadsCount: 8,
      driversCount: 3,
      grossEarnings: 12927.80,
      totalReimbursements: 119.50,
      totalDeductions: 1800.00,
      netPay: 11247.30,
      status: "Pending Review",
      generatedDate: "2026-01-15",
      paymentMethod: "Bank Transfer",
      // Vendor has multiple drivers under it
      vendorDrivers: [
        { id: "DRV-001", name: "John Smith", loadsCount: 3, earnings: 5934.00 },
        { id: "DRV-002", name: "Mike Johnson", loadsCount: 3, earnings: 3761.60 },
        { id: "DRV-003", name: "Carlos Rodriguez", loadsCount: 2, earnings: 3232.20 },
      ],
      drivers: [
        {
          driverId: "DRV-001",
          driverName: "John Smith",
          driverType: "Driver",
          loads: [
            {
              loadNo: "ML-2026-001245",
              deliveredDate: "2026-01-08",
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
          ],
        },
        {
          driverId: "DRV-002",
          driverName: "Mike Johnson",
          driverType: "Driver",
          loads: [
            {
              loadNo: "ML-2026-001260",
              deliveredDate: "2026-01-08",
              customer: "XPO Logistics",
              origin: "Houston, TX",
              destination: "San Antonio, TX",
              miles: 197,
              linehaul: 1182.00,
              fsc: 118.20,
              accessorials: [],
              fuelAdvance: 380.00,
              grossPay: 1300.20,
              netPay: 920.20,
            },
          ],
        },
        {
          driverId: "DRV-003",
          driverName: "Carlos Rodriguez",
          driverType: "Driver",
          loads: [
            {
              loadNo: "ML-2026-001275",
              deliveredDate: "2026-01-08",
              customer: "Coyote Logistics",
              origin: "Dallas, TX",
              destination: "Oklahoma City, OK",
              miles: 208,
              linehaul: 1248.00,
              fsc: 124.80,
              accessorials: [{ type: "Detention", amount: 150.00 }],
              fuelAdvance: 410.00,
              grossPay: 1522.80,
              netPay: 1112.80,
            },
          ],
        },
      ],
      recurringDeductions: [
        { type: "Agency Fee", amount: 500.00 },
        { type: "Equipment Insurance", amount: 800.00 },
        { type: "Maintenance Escrow", amount: 500.00 },
      ],
      oneTimeDeductions: [],
      reimbursements: [
        { type: "Tolls", amount: 87.50, receipt: "RCP-2026-0190" },
        { type: "Scale Tickets", amount: 32.00, receipt: "RCP-2026-0191" },
      ],
    },
  ];

  // ============ MEGA LOGISTICS WORKSHEETS (External Carriers) ============
  const logisticsWorksheetItems = [
    {
      id: 201,
      worksheetNo: "WS-2026-0201",
      payeeId: "CAR-001",
      payeeName: "Swift Transport LLC",
      payeeType: "Carrier",
      cycleType: "Weekly",
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      loadsCount: 3,
      driversCount: 0,
      grossEarnings: 8745.00,
      totalReimbursements: 0.00,
      totalDeductions: 0.00,
      netPay: 8745.00,
      status: "Pending Review",
      generatedDate: "2026-01-15",
      paymentMethod: "Bank Transfer",
      mcNumber: "MC-456789",
      dotNumber: "DOT-1234567",
      drivers: [],
      loads: [
        {
          loadNo: "BL-2026-002445",
          deliveredDate: "2026-01-08",
          customer: "Home Depot",
          origin: "Los Angeles, CA",
          destination: "Phoenix, AZ",
          miles: 372,
          rate: 2850.00,
          fsc: 285.00,
          accessorials: [],
          grossPay: 3135.00,
        },
        {
          loadNo: "BL-2026-002448",
          deliveredDate: "2026-01-10",
          customer: "Lowe's DC",
          origin: "Phoenix, AZ",
          destination: "Albuquerque, NM",
          miles: 450,
          rate: 2700.00,
          fsc: 270.00,
          accessorials: [{ type: "Detention", amount: 150.00 }],
          grossPay: 3120.00,
        },
        {
          loadNo: "BL-2026-002452",
          deliveredDate: "2026-01-12",
          customer: "Target DC",
          origin: "Albuquerque, NM",
          destination: "El Paso, TX",
          miles: 268,
          rate: 2250.00,
          fsc: 225.00,
          accessorials: [{ type: "Lumper", amount: 15.00 }],
          grossPay: 2490.00,
        },
      ],
      recurringDeductions: [],
      oneTimeDeductions: [],
      reimbursements: [],
    },
    {
      id: 202,
      worksheetNo: "WS-2026-0202",
      payeeId: "CAR-002",
      payeeName: "Prime Logistics Inc",
      payeeType: "Carrier",
      cycleType: "Weekly",
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      loadsCount: 2,
      driversCount: 0,
      grossEarnings: 6280.00,
      totalReimbursements: 0.00,
      totalDeductions: 125.60,
      netPay: 6154.40,
      status: "Reviewed",
      generatedDate: "2026-01-15",
      paymentMethod: "Bank Transfer",
      mcNumber: "MC-567890",
      dotNumber: "DOT-2345678",
      drivers: [],
      loads: [
        {
          loadNo: "BL-2026-002446",
          deliveredDate: "2026-01-09",
          customer: "Target Distribution",
          origin: "Dallas, TX",
          destination: "Denver, CO",
          miles: 780,
          rate: 3425.00,
          fsc: 342.50,
          accessorials: [],
          grossPay: 3767.50,
        },
        {
          loadNo: "BL-2026-002450",
          deliveredDate: "2026-01-11",
          customer: "Walmart DC",
          origin: "Denver, CO",
          destination: "Kansas City, MO",
          miles: 600,
          rate: 2280.00,
          fsc: 228.00,
          accessorials: [{ type: "Stop-off", amount: 4.50 }],
          grossPay: 2512.50,
        },
      ],
      recurringDeductions: [],
      oneTimeDeductions: [
        { type: "Cargo Claim Deduction", amount: 125.60, description: "Damaged pallet claim - BL-2026-002446" },
      ],
      reimbursements: [],
    },
    {
      id: 203,
      worksheetNo: "WS-2026-0203",
      payeeId: "CAR-003",
      payeeName: "Roadrunner Freight",
      payeeType: "Carrier",
      cycleType: "Weekly",
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      loadsCount: 4,
      driversCount: 0,
      grossEarnings: 12450.00,
      totalReimbursements: 0.00,
      totalDeductions: 0.00,
      netPay: 12450.00,
      status: "Pending Review",
      generatedDate: "2026-01-15",
      paymentMethod: "Bank Transfer",
      mcNumber: "MC-678901",
      dotNumber: "DOT-3456789",
      drivers: [],
      loads: [
        {
          loadNo: "BL-2026-002447",
          deliveredDate: "2026-01-08",
          customer: "Costco",
          origin: "Chicago, IL",
          destination: "Milwaukee, WI",
          miles: 92,
          rate: 1650.00,
          fsc: 165.00,
          accessorials: [],
          grossPay: 1815.00,
        },
        {
          loadNo: "BL-2026-002449",
          deliveredDate: "2026-01-09",
          customer: "Amazon",
          origin: "Milwaukee, WI",
          destination: "Minneapolis, MN",
          miles: 337,
          rate: 2850.00,
          fsc: 285.00,
          accessorials: [{ type: "Detention", amount: 200.00 }],
          grossPay: 3335.00,
        },
        {
          loadNo: "BL-2026-002453",
          deliveredDate: "2026-01-11",
          customer: "Best Buy DC",
          origin: "Minneapolis, MN",
          destination: "Des Moines, IA",
          miles: 245,
          rate: 2100.00,
          fsc: 210.00,
          accessorials: [],
          grossPay: 2310.00,
        },
        {
          loadNo: "BL-2026-002456",
          deliveredDate: "2026-01-13",
          customer: "Sam's Club",
          origin: "Des Moines, IA",
          destination: "Omaha, NE",
          miles: 140,
          rate: 4500.00,
          fsc: 450.00,
          accessorials: [{ type: "Layover", amount: 40.00 }],
          grossPay: 4990.00,
        },
      ],
      recurringDeductions: [],
      oneTimeDeductions: [],
      reimbursements: [],
    },
    {
      id: 204,
      worksheetNo: "WS-2026-0204",
      payeeId: "CAR-004",
      payeeName: "FastFreight Carriers",
      payeeType: "Carrier",
      cycleType: "Bi-Weekly",
      periodStart: "2026-01-01",
      periodEnd: "2026-01-14",
      loadsCount: 6,
      driversCount: 0,
      grossEarnings: 18920.00,
      totalReimbursements: 0.00,
      totalDeductions: 0.00,
      netPay: 18920.00,
      status: "Pending Review",
      generatedDate: "2026-01-15",
      paymentMethod: "Check",
      mcNumber: "MC-789012",
      dotNumber: "DOT-4567890",
      drivers: [],
      loads: [
        {
          loadNo: "BL-2026-002420",
          deliveredDate: "2026-01-03",
          customer: "Walmart DC",
          origin: "Memphis, TN",
          destination: "Nashville, TN",
          miles: 210,
          rate: 1680.00,
          fsc: 168.00,
          accessorials: [],
          grossPay: 1848.00,
        },
        {
          loadNo: "BL-2026-002425",
          deliveredDate: "2026-01-05",
          customer: "FedEx Ground",
          origin: "Nashville, TN",
          destination: "Atlanta, GA",
          miles: 250,
          rate: 2125.00,
          fsc: 212.50,
          accessorials: [],
          grossPay: 2337.50,
        },
        {
          loadNo: "BL-2026-002430",
          deliveredDate: "2026-01-07",
          customer: "UPS Freight",
          origin: "Atlanta, GA",
          destination: "Charlotte, NC",
          miles: 245,
          rate: 2450.00,
          fsc: 245.00,
          accessorials: [{ type: "Detention", amount: 175.00 }],
          grossPay: 2870.00,
        },
        {
          loadNo: "BL-2026-002435",
          deliveredDate: "2026-01-09",
          customer: "Dollar General DC",
          origin: "Charlotte, NC",
          destination: "Raleigh, NC",
          miles: 170,
          rate: 1870.00,
          fsc: 187.00,
          accessorials: [],
          grossPay: 2057.00,
        },
        {
          loadNo: "BL-2026-002440",
          deliveredDate: "2026-01-11",
          customer: "Kroger DC",
          origin: "Raleigh, NC",
          destination: "Richmond, VA",
          miles: 155,
          rate: 1705.00,
          fsc: 170.50,
          accessorials: [],
          grossPay: 1875.50,
        },
        {
          loadNo: "BL-2026-002444",
          deliveredDate: "2026-01-13",
          customer: "Sysco Foods",
          origin: "Richmond, VA",
          destination: "Washington, DC",
          miles: 110,
          rate: 7200.00,
          fsc: 720.00,
          accessorials: [{ type: "TONU", amount: 12.00 }],
          grossPay: 7932.00,
        },
      ],
      recurringDeductions: [],
      oneTimeDeductions: [],
      reimbursements: [],
    },
    {
      id: 205,
      worksheetNo: "WS-2026-0205",
      payeeId: "CAR-005",
      payeeName: "Mountain West Trucking",
      payeeType: "Carrier",
      cycleType: "Weekly",
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      loadsCount: 2,
      driversCount: 0,
      grossEarnings: 5640.00,
      totalReimbursements: 0.00,
      totalDeductions: 0.00,
      netPay: 5640.00,
      status: "Reviewed",
      generatedDate: "2026-01-15",
      paymentMethod: "Bank Transfer",
      mcNumber: "MC-890123",
      dotNumber: "DOT-5678901",
      drivers: [],
      loads: [
        {
          loadNo: "BL-2026-002454",
          deliveredDate: "2026-01-10",
          customer: "IKEA Distribution",
          origin: "Salt Lake City, UT",
          destination: "Boise, ID",
          miles: 340,
          rate: 2720.00,
          fsc: 272.00,
          accessorials: [],
          grossPay: 2992.00,
        },
        {
          loadNo: "BL-2026-002457",
          deliveredDate: "2026-01-12",
          customer: "Trader Joe's DC",
          origin: "Boise, ID",
          destination: "Portland, OR",
          miles: 430,
          rate: 2408.00,
          fsc: 240.00,
          accessorials: [],
          grossPay: 2648.00,
        },
      ],
      recurringDeductions: [],
      oneTimeDeductions: [],
      reimbursements: [],
    },
  ];

  // Get worksheet items based on selected BU
  const worksheetItems = selectedBU === "mega-trucking" ? truckingWorksheetItems : logisticsWorksheetItems;

  // Settlements data - simple workflow: Pending → Paid
  const driverSettlements = [
    {
      id: 1,
      settlementNo: "STL-2026-0001",
      batchNo: "BATCH-2026-W02",
      payee: "Smith Trucking LLC",
      payeeId: "PAY-001",
      payeeType: "Owner Operator",
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      loadsCount: 3,
      grossPay: 5934.00,
      deductions: 2095.00,
      reimbursements: 119.50,
      netPay: 3958.50,
      status: "Approved",
      paymentMethod: "Bank Transfer",
      createdDate: "2026-01-15",
    },
    {
      id: 2,
      settlementNo: "STL-2026-0002",
      batchNo: "BATCH-2026-W02",
      payee: "Sarah Johnson",
      payeeId: "PAY-002",
      payeeType: "Company Driver",
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      loadsCount: 2,
      grossPay: 2836.20,
      deductions: 0.00,
      reimbursements: 45.75,
      netPay: 2881.95,
      status: "Approved",
      paymentMethod: "Direct Deposit",
      createdDate: "2026-01-15",
    },
    {
      id: 3,
      settlementNo: "STL-2026-0003",
      batchNo: "BATCH-2026-W02",
      payee: "Carlos Martinez",
      payeeId: "PAY-003",
      payeeType: "Technician",
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      loadsCount: 2,
      grossPay: 1730.00,
      deductions: 185.00,
      reimbursements: 142.50,
      netPay: 1687.50,
      status: "Approved",
      paymentMethod: "Check",
      createdDate: "2026-01-14",
    },
    {
      id: 4,
      settlementNo: "STL-2026-0004",
      batchNo: "BATCH-2026-W01",
      payee: "Wilson Transport",
      payeeId: "PAY-004",
      payeeType: "Owner Operator",
      periodStart: "2026-01-01",
      periodEnd: "2026-01-07",
      loadsCount: 4,
      grossPay: 6842.50,
      deductions: 1450.00,
      reimbursements: 215.00,
      netPay: 5607.50,
      status: "Settled",
      paymentMethod: "Bank Transfer",
      createdDate: "2026-01-08",
      paidDate: "2026-01-10",
      paymentRef: "TRF-78451234",
    },
    {
      id: 5,
      settlementNo: "STL-2026-0005",
      batchNo: "BATCH-2026-W01",
      payee: "Emily Thompson",
      payeeId: "PAY-005",
      payeeType: "Company Driver",
      periodStart: "2026-01-01",
      periodEnd: "2026-01-07",
      loadsCount: 5,
      grossPay: 4125.80,
      deductions: 245.00,
      reimbursements: 68.25,
      netPay: 3949.05,
      status: "Settled",
      paymentMethod: "Direct Deposit",
      createdDate: "2026-01-08",
      paidDate: "2026-01-10",
      paymentRef: "TRF-78451236",
    },
    {
      id: 6,
      settlementNo: "STL-2026-0006",
      batchNo: "BATCH-2026-W02",
      payee: "Texas Fleet Services",
      payeeId: "VND-001",
      payeeType: "Vendor",
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      loadsCount: 8,
      grossPay: 12927.80,
      deductions: 1800.00,
      reimbursements: 119.50,
      netPay: 11247.30,
      status: "Approved",
      paymentMethod: "Bank Transfer",
      createdDate: "2026-01-15",
      driversCount: 3,
      vendorDrivers: [
        { id: "DRV-001", name: "John Smith", loadsCount: 3, earnings: 5934.00 },
        { id: "DRV-002", name: "Mike Johnson", loadsCount: 3, earnings: 3761.60 },
        { id: "DRV-003", name: "Carlos Rodriguez", loadsCount: 2, earnings: 3232.20 },
      ],
    },
    {
      id: 7,
      settlementNo: "STL-2026-0007",
      batchNo: "BATCH-2026-W01",
      payee: "Metro Fleet Services",
      payeeId: "VND-002",
      payeeType: "Vendor",
      periodStart: "2026-01-01",
      periodEnd: "2026-01-07",
      loadsCount: 6,
      grossPay: 9850.00,
      deductions: 1200.00,
      reimbursements: 150.00,
      netPay: 8800.00,
      status: "Settled",
      paymentMethod: "Bank Transfer",
      createdDate: "2026-01-08",
      paidDate: "2026-01-10",
      paymentRef: "TRF-78451240",
      driversCount: 2,
      vendorDrivers: [
        { id: "DRV-010", name: "David Martinez", loadsCount: 4, earnings: 6200.00 },
        { id: "DRV-011", name: "Lisa Chen", loadsCount: 2, earnings: 3650.00 },
      ],
    },
  ];

  // Carrier settlements for Mega Logistics
  const carrierSettlements = [
    {
      id: 101,
      settlementNo: "STL-2026-0101",
      batchNo: "BATCH-2026-W02",
      payee: "Swift Transport LLC",
      payeeId: "VND-001",
      payeeType: "Carrier",
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      loadsCount: 3,
      grossPay: 8745.00,
      deductions: 0.00,
      reimbursements: 0.00,
      netPay: 8745.00,
      status: "Approved",
      paymentMethod: "Bank Transfer",
      createdDate: "2026-01-15",
    },
    {
      id: 102,
      settlementNo: "STL-2026-0102",
      batchNo: "BATCH-2026-W02",
      payee: "Prime Logistics Inc",
      payeeId: "VND-002",
      payeeType: "Carrier",
      periodStart: "2026-01-08",
      periodEnd: "2026-01-14",
      loadsCount: 2,
      grossPay: 6280.00,
      deductions: 125.60,
      reimbursements: 0.00,
      netPay: 6154.40,
      status: "Approved",
      paymentMethod: "Bank Transfer",
      createdDate: "2026-01-15",
    },
    {
      id: 103,
      settlementNo: "STL-2026-0103",
      batchNo: "BATCH-2026-W01",
      payee: "Roadrunner Freight",
      payeeId: "VND-003",
      payeeType: "Carrier",
      periodStart: "2026-01-01",
      periodEnd: "2026-01-07",
      loadsCount: 4,
      grossPay: 12450.00,
      deductions: 0.00,
      reimbursements: 0.00,
      netPay: 12450.00,
      status: "Settled",
      paymentMethod: "Bank Transfer",
      createdDate: "2026-01-08",
      paidDate: "2026-01-09",
      paymentRef: "TRF-78451100",
    },
  ];

  // Get data based on BU
  const settlements = selectedBU === "mega-trucking" ? driverSettlements : carrierSettlements;

  // ============ FILTER GROUPS ============

  const holdsFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "loadNo",
          label: "Load #",
          type: "input",
          group: "Basic",
          placeholder: "Search load...",
        },
        {
          key: "payeeName",
          label: selectedBU === "mega-trucking" ? "Payee" : "Carrier",
          type: "input",
          group: "Basic",
          placeholder: selectedBU === "mega-trucking" ? "Search payee..." : "Search carrier...",
        },
        {
          key: "holdReason",
          label: "Hold Reason",
          type: "select",
          group: "Basic",
          options: selectedBU === "mega-trucking"
            ? [
                { value: "pending_accessorial", label: "Pending Accessorial" },
                { value: "disputed_load", label: "Disputed Load" },
                { value: "invalid_fuel_card", label: "Invalid Fuel Card" },
                { value: "driver_inactive", label: "Driver Inactive" },
              ]
            : [
                { value: "pending_accessorial", label: "Pending Accessorial" },
                { value: "disputed_load", label: "Disputed Load" },
                { value: "missing_pod", label: "Missing POD" },
                { value: "carrier_compliance", label: "Carrier Compliance" },
              ],
        },
      ],
    },
  ];

  const worksheetFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "payeeName",
          label: selectedBU === "mega-trucking" ? "Payee" : "Carrier",
          type: "input",
          group: "Basic",
          placeholder: selectedBU === "mega-trucking" ? "Search payee..." : "Search carrier...",
        },
        {
          key: "cycleType",
          label: "Cycle",
          type: "select",
          group: "Basic",
          options: [
            { value: "Daily", label: "Daily" },
            { value: "Weekly", label: "Weekly" },
            { value: "Bi-Weekly", label: "Bi-Weekly" },
            { value: "Monthly", label: "Monthly" },
          ],
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "Pending Review", label: "Pending Review" },
            { value: "Reviewed", label: "Reviewed" },
          ],
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
          label: selectedBU === "mega-trucking" ? "Payee" : "Carrier",
          type: "input",
          group: "Basic",
          placeholder: selectedBU === "mega-trucking" ? "Search payee..." : "Search carrier...",
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "Approved", label: "Approved" },
            { value: "Settled", label: "Settled" },
          ],
        },
        {
          key: "paymentMethod",
          label: "Payment Method",
          type: "select",
          group: "Basic",
          options: [
            { value: "Direct Deposit", label: "Direct Deposit" },
            { value: "Bank Transfer", label: "Bank Transfer" },
            { value: "Check", label: "Check" },
          ],
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((filters) => {
    console.log("Filters changed:", filters);
  }, []);

  // ============ HELPER FUNCTIONS ============

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const getStatusBadge = (status) => {
    const config = {
      Approved: { color: "bg-blue-500/10 text-blue-700 border-blue-500/50", icon: CheckCircleIcon },
      Settled: { color: "bg-green-500/10 text-green-700 border-green-500/50", icon: CheckCircle2Icon },
    };
    const c = config[status] || config["Approved"];
    const Icon = c.icon;
    return (
      <Badge className={c.color}>
        <Icon className="size-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getHoldReasonBadge = (reason) => {
    const config = {
      // Trucking hold reasons
      pending_accessorial: { label: "Pending Accessorial", color: "bg-amber-500/10 text-amber-700 border-amber-500/50", icon: ClipboardListIcon },
      disputed_load: { label: "Disputed Load", color: "bg-orange-500/10 text-orange-700 border-orange-500/50", icon: AlertTriangleIcon },
      invalid_fuel_card: { label: "Invalid Fuel Card", color: "bg-purple-500/10 text-purple-700 border-purple-500/50", icon: CreditCardIcon },
      driver_inactive: { label: "Driver Inactive", color: "bg-slate-500/10 text-slate-700 border-slate-500/50", icon: XCircleIcon },
      missing_charges: { label: "Missing Charges", color: "bg-blue-500/10 text-blue-700 border-blue-500/50", icon: DollarSign },
      // Logistics hold reasons
      missing_pod: { label: "Missing POD", color: "bg-red-500/10 text-red-700 border-red-500/50", icon: ClipboardListIcon },
      carrier_compliance: { label: "Carrier Compliance", color: "bg-rose-500/10 text-rose-700 border-rose-500/50", icon: ShieldAlertIcon },
    };
    const c = config[reason] || { label: reason, color: "bg-gray-500/10 text-gray-700", icon: AlertCircleIcon };
    const Icon = c.icon;
    return (
      <Badge className={c.color}>
        <Icon className="size-3 mr-1" />
        {c.label}
      </Badge>
    );
  };


  const getPayeeTypeBadge = (type) => {
    const typeColors = {
      Driver: "bg-blue-500/10 text-blue-700 border-blue-500/50",
      Technician: "bg-purple-500/10 text-purple-700 border-purple-500/50",
      Carrier: "bg-cyan-500/10 text-cyan-700 border-cyan-500/50",
      "Owner Operator": "bg-emerald-500/10 text-emerald-700 border-emerald-500/50",
      "Company Driver": "bg-indigo-500/10 text-indigo-700 border-indigo-500/50",
      Vendor: "bg-orange-500/10 text-orange-700 border-orange-500/50",
    };
    return typeColors[type] || "bg-gray-500/10 text-gray-700 border-gray-500/50";
  };

  const getPayeeTypeIcon = (type) => {
    switch (type) {
      case "Driver": return <UserIcon className="size-3" />;
      case "Technician": return <WrenchIcon className="size-3" />;
      case "Carrier": return <TruckIcon className="size-3" />;
      case "Vendor": return <UsersIcon className="size-3" />;
      default: return null;
    }
  };

  // ============ WORKSHEET HANDLERS ============

  const handleSelectWorksheetItem = (itemId, checked) => {
    if (checked) {
      setSelectedWorksheetItems([...selectedWorksheetItems, itemId]);
    } else {
      setSelectedWorksheetItems(selectedWorksheetItems.filter((id) => id !== itemId));
    }
  };

  const handleSelectAllWorksheetItems = (checked) => {
    if (checked) {
      setSelectedWorksheetItems(filteredWorksheetItems.map((w) => w.id));
    } else {
      setSelectedWorksheetItems([]);
    }
  };

  const openWorksheetDetail = (worksheet) => {
    navigate(`/app/carrier-portal/billing/settlements/inbox/${worksheet.worksheetNo}`);
  };

  // Calculate type counts for filtering
  const payeeTypeCounts = useMemo(() => {
    const counts = {};
    worksheetItems.forEach((item) => {
      const type = item.payeeType;
      if (!counts[type]) {
        counts[type] = { count: 0, netPay: 0, loadsCount: 0 };
      }
      counts[type].count += 1;
      counts[type].netPay += item.netPay;
      counts[type].loadsCount += item.loadsCount;
    });
    return counts;
  }, [worksheetItems]);

  // Filter worksheet items based on selected type
  const filteredWorksheetItems = useMemo(() => {
    if (!selectedPayeeTypeFilter) return worksheetItems;
    return worksheetItems.filter((item) => item.payeeType === selectedPayeeTypeFilter);
  }, [worksheetItems, selectedPayeeTypeFilter]);

  // Calculate totals based on filtered items
  const worksheetTotals = useMemo(() => {
    return filteredWorksheetItems.reduce((acc, item) => ({
      payeesCount: acc.payeesCount + 1,
      loadsCount: acc.loadsCount + item.loadsCount,
      grossEarnings: acc.grossEarnings + item.grossEarnings,
      totalDeductions: acc.totalDeductions + item.totalDeductions,
      totalReimbursements: acc.totalReimbursements + item.totalReimbursements,
      netPay: acc.netPay + item.netPay,
    }), { payeesCount: 0, loadsCount: 0, grossEarnings: 0, totalDeductions: 0, totalReimbursements: 0, netPay: 0 });
  }, [filteredWorksheetItems]);

  // Calculate stats for holds with aging buckets
  // Using fixed reference date to match mock data timeframe
  const referenceDate = new Date("2026-01-28");
  const getAgingDays = useCallback((holdSince) => {
    const holdDate = new Date(holdSince);
    const diffTime = Math.abs(referenceDate - holdDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, []);

  const holdsAgingCounts = useMemo(() => {
    const counts = {
      all: { count: 0, value: 0 },
      "0-7": { count: 0, value: 0 },
      "8-15": { count: 0, value: 0 },
      "16+": { count: 0, value: 0 },
    };
    settlementHolds.forEach((hold) => {
      const days = getAgingDays(hold.holdSince);
      counts.all.count += 1;
      counts.all.value += hold.grossPay;
      if (days <= 7) {
        counts["0-7"].count += 1;
        counts["0-7"].value += hold.grossPay;
      } else if (days <= 15) {
        counts["8-15"].count += 1;
        counts["8-15"].value += hold.grossPay;
      } else {
        counts["16+"].count += 1;
        counts["16+"].value += hold.grossPay;
      }
    });
    return counts;
  }, [settlementHolds, getAgingDays]);

  // Filter holds based on selected aging filter
  const filteredHolds = useMemo(() => {
    if (!selectedAgingFilter) return settlementHolds;
    return settlementHolds.filter((hold) => {
      const days = getAgingDays(hold.holdSince);
      if (selectedAgingFilter === "0-7") return days <= 7;
      if (selectedAgingFilter === "8-15") return days > 7 && days <= 15;
      if (selectedAgingFilter === "16+") return days > 15;
      return true;
    });
  }, [settlementHolds, selectedAgingFilter, getAgingDays]);

  // Calculate stats for settlements
  const approvedCount = settlements.filter((s) => s.status === "Approved").length;
  const settledCount = settlements.filter((s) => s.status === "Settled").length;

  // Filter settlements based on selected status
  const filteredSettlements = useMemo(() => {
    if (!selectedHistoryStatusFilter) return settlements;
    return settlements.filter((s) => s.status === selectedHistoryStatusFilter);
  }, [settlements, selectedHistoryStatusFilter]);

  // ============ COLUMNS ============

  // Holds columns (Informational)
  const holdsColumns = [
    {
      accessorKey: "loadNo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Load #" />,
      cell: ({ row }) => (
        <button
          onClick={() => navigate(`/app/carrier-portal/orders/bulk/complete/load-details?id=${row.getValue("loadNo")}&mode=view`)}
          className="font-mono text-sm font-medium text-primary hover:underline"
        >
          {row.getValue("loadNo")}
        </button>
      ),
    },
    {
      accessorKey: "holdReason",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Hold Reason" />,
      cell: ({ row }) => getHoldReasonBadge(row.getValue("holdReason")),
    },
    {
      accessorKey: "holdDescription",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">{row.original.holdDescription}</span>
      ),
    },
    ...(selectedBU === "mega-trucking" ? [{
      accessorKey: "driverName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Driver" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.original.driverName}</span>
          <Badge className={`${getPayeeTypeBadge(row.original.driverType)} flex items-center gap-1`} style={{ fontSize: '10px', padding: '2px 6px' }}>
            {getPayeeTypeIcon(row.original.driverType)}
            {row.original.driverType}
          </Badge>
        </div>
      ),
    }] : []),
    {
      accessorKey: "payeeName",
      header: ({ column }) => <DataTableColumnHeader column={column} title={selectedBU === "mega-trucking" ? "Payee" : "Carrier"} />,
      cell: ({ row }) => (
        <span className="font-medium">{row.original.payeeName}</span>
      ),
    },
    {
      accessorKey: "grossPay",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
      cell: ({ row }) => formatCurrency(row.getValue("grossPay")),
    },
    {
      accessorKey: "holdSince",
      header: ({ column }) => <DataTableColumnHeader column={column} title="On Hold Since" />,
      cell: ({ row }) => formatDate(row.getValue("holdSince")),
    },
  ];

  // Worksheet columns
  const worksheetColumns = [
    {
      id: "select",
      header: () => (
        <Checkbox
          checked={selectedWorksheetItems.length === filteredWorksheetItems.length && filteredWorksheetItems.length > 0}
          onCheckedChange={handleSelectAllWorksheetItems}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedWorksheetItems.includes(row.original.id)}
          onCheckedChange={(checked) => handleSelectWorksheetItem(row.original.id, checked)}
          aria-label="Select row"
        />
      ),
      size: 40,
    },
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => {
        const worksheet = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => openWorksheetDetail(worksheet)}>
                <EyeIcon className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <CheckCircleIcon className="h-4 w-4 mr-2" />
                Mark as Reviewed
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PlayIcon className="h-4 w-4 mr-2" />
                Create Settlement
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "worksheetNo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Settlement #" />,
      cell: ({ row }) => (
        <button
          className="font-mono text-sm font-medium text-primary hover:underline"
          onClick={() => openWorksheetDetail(row.original)}
        >
          {row.getValue("worksheetNo")}
        </button>
      ),
    },
    {
      accessorKey: "payeeName",
      header: ({ column }) => <DataTableColumnHeader column={column} title={selectedBU === "mega-trucking" ? "Payee" : "Carrier"} />,
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.payeeName}</p>
          <p className="text-xs text-muted-foreground">{row.original.payeeId}</p>
        </div>
      ),
    },
    {
      accessorKey: "payeeType",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => (
        <Badge className={getPayeeTypeBadge(row.getValue("payeeType"))}>
          {row.getValue("payeeType")}
        </Badge>
      ),
    },
    {
      accessorKey: "cycleType",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Cycle" />,
      cell: ({ row }) => <span className="text-sm">{row.getValue("cycleType")}</span>,
    },
    {
      id: "period",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Period" />,
      cell: ({ row }) => (
        <span className="text-sm">
          {formatDate(row.original.periodStart)} - {formatDate(row.original.periodEnd)}
        </span>
      ),
    },
    {
      accessorKey: "loadsCount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Loads" />,
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("loadsCount")}</span>
      ),
    },
    {
      accessorKey: "grossEarnings",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Gross" />,
      cell: ({ row }) => formatCurrency(row.getValue("grossEarnings")),
    },
    {
      accessorKey: "totalDeductions",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Deductions" />,
      cell: ({ row }) => {
        const deductions = row.getValue("totalDeductions");
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
      cell: () => (
        <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/50">
          <ClockIcon className="size-3 mr-1" />
          Pending Review
        </Badge>
      ),
    },
    {
      accessorKey: "paymentMethod",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Payment Method" />,
      cell: ({ row }) => <span className="text-sm">{row.getValue("paymentMethod")}</span>,
    },
  ];

  // Settlements columns
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
              <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/billing/settlements/${settlement.settlementNo}?status=${settlement.status}`)}>
                <EyeIcon className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              {settlement.status === "Approved" && (
                <DropdownMenuItem onClick={() => { setSelectedSettlement(settlement); setShowPaymentDialog(true); }}>
                  <CheckCircle2Icon className="h-4 w-4 mr-2" />
                  Mark as Settled
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
          className="font-mono text-sm font-medium text-primary hover:underline"
          onClick={() => navigate(`/app/carrier-portal/billing/settlements/${row.getValue("settlementNo")}?status=${row.original.status}`)}
        >
          {row.getValue("settlementNo")}
        </button>
      ),
    },
    {
      accessorKey: "payee",
      header: ({ column }) => <DataTableColumnHeader column={column} title={selectedBU === "mega-trucking" ? "Payee" : "Carrier"} />,
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.payee}</p>
          <p className="text-xs text-muted-foreground">{row.original.payeeId}</p>
        </div>
      ),
    },
    {
      accessorKey: "payeeType",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => (
        <Badge className={getPayeeTypeBadge(row.getValue("payeeType"))}>
          {row.getValue("payeeType")}
        </Badge>
      ),
    },
    {
      id: "period",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Period" />,
      cell: ({ row }) => (
        <span className="text-sm">
          {formatDate(row.original.periodStart)} - {formatDate(row.original.periodEnd)}
        </span>
      ),
    },
    {
      accessorKey: "loadsCount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Loads" />,
      cell: ({ row }) => row.getValue("loadsCount"),
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
      header: ({ column }) => <DataTableColumnHeader column={column} title="Payment Method" />,
      cell: ({ row }) => <span className="text-sm">{row.getValue("paymentMethod")}</span>,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col overflow-hidden">
        <div className="flex-shrink-0 flex items-center justify-between border-b">
          <TabsList className="mb-0 rounded-none border-b-0">
            <TabsTrigger value="inbox" className="h-full">
              <FileSpreadsheetIcon className="size-4" />
              Inbox
            </TabsTrigger>
            <TabsTrigger value="history" className="h-full">
              <Wallet className="size-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="exception" className="h-full">
              <ShieldAlertIcon className="size-4" />
              Exceptions
            </TabsTrigger>
          </TabsList>
          <div className="px-4">
            <Select value={selectedBU} onValueChange={(value) => {
              setSelectedBU(value);
              setSelectedWorksheetItems([]);
              setSelectedPayeeTypeFilter(null);
              setSelectedAgingFilter(null);
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

          <div className="flex-1 overflow-auto">
          {/* ============ EXCEPTION TAB (Previously Holds Queue) ============ */}
          <TabsContent value="exception" className="mt-0 p-4">
            {/* Exception Aging Cards */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              {/* All Exceptions Card */}
              <button
                onClick={() => setSelectedAgingFilter(null)}
                className={`rounded-lg p-4 bg-card text-left transition-all ${
                  !selectedAgingFilter ? "border-2 border-blue-500" : "border border-border hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <AlertTriangleIcon className="size-4" />
                  <span className="text-xs">All Exceptions</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{holdsAgingCounts.all.count}</p>
              </button>

              {/* Recent (0-7 days) Card */}
              <button
                onClick={() => setSelectedAgingFilter(selectedAgingFilter === "0-7" ? null : "0-7")}
                className={`rounded-lg p-4 bg-card text-left transition-all ${
                  selectedAgingFilter === "0-7" ? "border-2 border-green-500" : "border border-border hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2 text-green-600 mb-1">
                  <ClockIcon className="size-4" />
                  <span className="text-xs">Recent (0-7 days)</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{holdsAgingCounts["0-7"].count}</p>
              </button>

              {/* Pending (8-15 days) Card */}
              <button
                onClick={() => setSelectedAgingFilter(selectedAgingFilter === "8-15" ? null : "8-15")}
                className={`rounded-lg p-4 bg-card text-left transition-all ${
                  selectedAgingFilter === "8-15" ? "border-2 border-amber-500" : "border border-border hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2 text-amber-600 mb-1">
                  <ClockIcon className="size-4" />
                  <span className="text-xs">Pending (8-15 days)</span>
                </div>
                <p className="text-2xl font-bold text-amber-600">{holdsAgingCounts["8-15"].count}</p>
              </button>

              {/* Overdue (16+ days) Card */}
              <button
                onClick={() => setSelectedAgingFilter(selectedAgingFilter === "16+" ? null : "16+")}
                className={`rounded-lg p-4 bg-card text-left transition-all ${
                  selectedAgingFilter === "16+" ? "border-2 border-red-500" : "border border-border hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2 text-red-600 mb-1">
                  <AlertTriangleIcon className="size-4" />
                  <span className="text-xs">Overdue (16+ days)</span>
                </div>
                <p className="text-2xl font-bold text-red-600">{holdsAgingCounts["16+"].count}</p>
              </button>
            </div>

            {/* Filter Row */}
            <div className="flex items-center justify-between mb-4">
              <SmartFilter
                filterGroups={holdsFilterGroups}
                onFiltersChange={handleFiltersChange}
              />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="[&_td]:py-2 [&_th]:py-2">
              <DataTable columns={holdsColumns} data={filteredHolds} showViewOptions={false} pageSize={10} />
            </div>
          </TabsContent>

          {/* ============ INBOX TAB (Previously Worksheet) ============ */}
          <TabsContent value="inbox" className="mt-0 p-4">
            {/* Type-Based Metrics Cards */}
            {selectedBU === "mega-trucking" ? (
              <div className="grid grid-cols-5 gap-4 mb-4">
                {/* All Types Card */}
                <button
                  onClick={() => { setSelectedPayeeTypeFilter(null); setSelectedWorksheetItems([]); }}
                  className={`rounded-lg p-4 bg-card text-left transition-all ${
                    !selectedPayeeTypeFilter ? "border-2 border-blue-500" : "border border-border hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <FileSpreadsheetIcon className="size-4" />
                    <span className="text-xs">All Types</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{worksheetItems.length}</p>
                </button>

                {/* Owner Operator Card */}
                {payeeTypeCounts["Owner Operator"] && (
                  <button
                    onClick={() => { setSelectedPayeeTypeFilter(selectedPayeeTypeFilter === "Owner Operator" ? null : "Owner Operator"); setSelectedWorksheetItems([]); }}
                    className={`rounded-lg p-4 bg-card text-left transition-all ${
                      selectedPayeeTypeFilter === "Owner Operator" ? "border-2 border-emerald-500" : "border border-border hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-emerald-600 mb-1">
                      <UserIcon className="size-4" />
                      <span className="text-xs">Owner Operator</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-600">{payeeTypeCounts["Owner Operator"].count}</p>
                  </button>
                )}

                {/* Company Driver Card */}
                {payeeTypeCounts["Company Driver"] && (
                  <button
                    onClick={() => { setSelectedPayeeTypeFilter(selectedPayeeTypeFilter === "Company Driver" ? null : "Company Driver"); setSelectedWorksheetItems([]); }}
                    className={`rounded-lg p-4 bg-card text-left transition-all ${
                      selectedPayeeTypeFilter === "Company Driver" ? "border-2 border-indigo-500" : "border border-border hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-indigo-600 mb-1">
                      <UserIcon className="size-4" />
                      <span className="text-xs">Company Driver</span>
                    </div>
                    <p className="text-2xl font-bold text-indigo-600">{payeeTypeCounts["Company Driver"].count}</p>
                  </button>
                )}

                {/* Technician Card */}
                {payeeTypeCounts["Technician"] && (
                  <button
                    onClick={() => { setSelectedPayeeTypeFilter(selectedPayeeTypeFilter === "Technician" ? null : "Technician"); setSelectedWorksheetItems([]); }}
                    className={`rounded-lg p-4 bg-card text-left transition-all ${
                      selectedPayeeTypeFilter === "Technician" ? "border-2 border-purple-500" : "border border-border hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-purple-600 mb-1">
                      <WrenchIcon className="size-4" />
                      <span className="text-xs">Technician</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">{payeeTypeCounts["Technician"].count}</p>
                  </button>
                )}

                {/* Vendor Card */}
                {payeeTypeCounts["Vendor"] && (
                  <button
                    onClick={() => { setSelectedPayeeTypeFilter(selectedPayeeTypeFilter === "Vendor" ? null : "Vendor"); setSelectedWorksheetItems([]); }}
                    className={`rounded-lg p-4 bg-card text-left transition-all ${
                      selectedPayeeTypeFilter === "Vendor" ? "border-2 border-orange-500" : "border border-border hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-orange-600 mb-1">
                      <UsersIcon className="size-4" />
                      <span className="text-xs">Vendor</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-600">{payeeTypeCounts["Vendor"].count}</p>
                  </button>
                )}
              </div>
            ) : (
              /* Carrier Stats for Mega Logistics */
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="border rounded-lg p-4 bg-card">
                  <div className="flex items-center gap-2 text-cyan-600 mb-1">
                    <TruckIcon className="size-4" />
                    <span className="text-xs">Carriers</span>
                  </div>
                  <p className="text-2xl font-bold text-cyan-600">{worksheetTotals.payeesCount}</p>
                </div>
                <div className="border rounded-lg p-4 bg-card">
                  <div className="flex items-center gap-2 text-green-600 mb-1">
                    <BanknoteIcon className="size-4" />
                    <span className="text-xs">Net Pay</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(worksheetTotals.netPay)}</p>
                </div>
              </div>
            )}

            {/* Filter Row */}
            <div className="flex items-center justify-between mb-4">
              <SmartFilter
                filterGroups={worksheetFilterGroups}
                onFiltersChange={handleFiltersChange}
              />
              <div className="flex items-center gap-2">
                {selectedWorksheetItems.length > 0 && (
                  <>
                    <span className="text-sm text-muted-foreground">{selectedWorksheetItems.length} selected</span>
                    <Button variant="outline" size="sm">
                      <CheckCircleIcon className="size-4 mr-2" />
                      Mark Reviewed
                    </Button>
                    <Button
                      size="sm"
                      className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                    >
                      <PlayIcon className="size-4 mr-2" />
                      Create Settlements
                    </Button>
                  </>
                )}
                <Button variant="outline" size="sm">
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <DataTable columns={worksheetColumns} data={filteredWorksheetItems} showViewOptions={false} pageSize={10} />
          </TabsContent>

          {/* ============ HISTORY TAB (Previously Settlements) ============ */}
          <TabsContent value="history" className="mt-0 p-4">
            {/* Settlement Status Stats - Filterable */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {/* All Settlements */}
              <button
                onClick={() => setSelectedHistoryStatusFilter(null)}
                className={`rounded-lg p-4 bg-card text-left transition-all ${
                  !selectedHistoryStatusFilter ? "border-2 border-violet-500" : "border border-border hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2 text-violet-600 mb-1">
                  <FileSpreadsheetIcon className="size-4" />
                  <span className="text-xs">All</span>
                </div>
                <p className="text-2xl font-bold text-violet-600">{settlements.length}</p>
              </button>

              {/* Approved */}
              <button
                onClick={() => setSelectedHistoryStatusFilter(selectedHistoryStatusFilter === "Approved" ? null : "Approved")}
                className={`rounded-lg p-4 bg-card text-left transition-all ${
                  selectedHistoryStatusFilter === "Approved" ? "border-2 border-blue-500" : "border border-border hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <CheckCircleIcon className="size-4" />
                  <span className="text-xs">Approved</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{approvedCount}</p>
              </button>

              {/* Settled */}
              <button
                onClick={() => setSelectedHistoryStatusFilter(selectedHistoryStatusFilter === "Settled" ? null : "Settled")}
                className={`rounded-lg p-4 bg-card text-left transition-all ${
                  selectedHistoryStatusFilter === "Settled" ? "border-2 border-green-500" : "border border-border hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2 text-green-600 mb-1">
                  <CheckCircle2Icon className="size-4" />
                  <span className="text-xs">Settled</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{settledCount}</p>
              </button>
            </div>

            {/* Filter Row */}
            <div className="flex items-center justify-between mb-4">
              <SmartFilter
                filterGroups={settlementsFilterGroups}
                onFiltersChange={handleFiltersChange}
              />
              <Button variant="outline" size="sm">
                <DownloadIcon className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            <DataTable columns={settlementsColumns} data={filteredSettlements} showViewOptions={false} pageSize={10} />
          </TabsContent>
          </div>
        </Tabs>

      {/* ============ RUN BATCH DIALOG ============ */}
      <AlertDialog open={showRunBatchDialog} onOpenChange={setShowRunBatchDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Run Settlement Batch Job</AlertDialogTitle>
            <AlertDialogDescription>
              Generate worksheet items for all eligible payees based on their settlement cycle settings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Settlement Cycle</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cycles Due</SelectItem>
                  <SelectItem value="daily">Daily Only</SelectItem>
                  <SelectItem value="weekly">Weekly Only</SelectItem>
                  <SelectItem value="biweekly">Bi-Weekly Only</SelectItem>
                  <SelectItem value="monthly">Monthly Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Eligible Payees</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Loads</span>
                <span className="font-medium">47</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Total</span>
                <span className="font-bold text-green-600">{formatCurrency(52840)}</span>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
              <RefreshCwIcon className="size-4 mr-2" />
              Run Batch Job
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ============ MARK AS SETTLED DIALOG ============ */}
      <AlertDialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark as Settled</AlertDialogTitle>
            <AlertDialogDescription>
              Mark settlement {selectedSettlement?.settlementNo} as settled.
              Amount: {selectedSettlement && formatCurrency(selectedSettlement.netPay)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select defaultValue={selectedSettlement?.paymentMethod?.toLowerCase().replace(' ', '-')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="direct-deposit">Direct Deposit</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Settlement Date</Label>
              <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
              <CheckCircle2Icon className="size-4 mr-2" />
              Mark as Settled
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settlements;
