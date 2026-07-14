import { useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import SmartFilter from "@/components/SmartFilter";
import {
  BuildingIcon,
  ChartBarIcon,
  ShoppingCartIcon,
  FileTextIcon,
  CreditCardIcon,
  DollarSignIcon,
  TrendingUpIcon,
  BadgeDollarSignIcon,
  FileIcon,
  LockIcon,
  MapPinIcon,
  TableIcon,
  PercentIcon,
  PlusIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  History,
  MessageSquare,
  PencilIcon,
  Trash2,
  Package,
  ReceiptIcon,
  CalendarIcon,
  MailIcon,
  FileSpreadsheetIcon,
  CheckIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon, HandshakeIcon } from "lucide-react";
import BasicInformationCard from "./CustomerDetails/BasicInformationCard";
import ContactDetailsCard from "./CustomerDetails/ContactDetailsCard";
import PaymentsMetricsCards from "./CustomerDetails/PaymentsMetricsCards";
import InvoicesTable from "./CustomerDetails/InvoicesTable";
import PickupLocations from "./CustomerDetails/PickupLocations";
import Lanes from "./CustomerDetails/Lanes";
import CustomerCommentsCard from "./CustomerDetails/CustomerCommentsCard";
import BalanceCard from "./CustomerDetails/Vault/BalanceCard";
import BillCard from "./CustomerDetails/Vault/BillCard";
import OptionalSettingsCard from "./CustomerDetails/Vault/OptionalSettingsCard";
import FuelSurchargeTable from "./CustomerDetails/Vault/FuelSurchargeTable";
import CreditCollectionsCard from "./CustomerDetails/Vault/CreditCollectionsCard";
import ReceivablesMetricsCards from "./CustomerDetails/Receivables/ReceivablesMetricsCards";
import ReceivablesTable from "./CustomerDetails/Receivables/ReceivablesTable";
import UnpostedMetricsCards from "./CustomerDetails/Unposted/UnpostedMetricsCards";
import UnpostedTable from "./CustomerDetails/Unposted/UnpostedTable";
import CustomerRateCard from "@/pages/CarrierPortal/Accessorial/CustomerRateCard";
import FSCTab from "./CustomerDetails/FSC/FSCTab";

const CustomerDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get("tab") || "profile";
  const [rateTablesFilters, setRateTablesFilters] = useState([]);
  const [accessorialFilters, setAccessorialFilters] = useState([]);
  const [isRateTableSheetOpen, setIsRateTableSheetOpen] = useState(false);
  const [isRemainingCommoditiesOpen, setIsRemainingCommoditiesOpen] =
    useState(false);
  const [rateTableForm, setRateTableForm] = useState({
    tableName: "",
    importFile: null,
    rows: [{ id: 1, min: 0, max: 1, customerRate: 0, driverRate: 0 }],
    selectedCommodities: [],
  });

  // Accessorial Charges state
  const [additionalChargesFilters, setAdditionalChargesFilters] = useState([]);
  const [isChargeSheetOpen, setIsChargeSheetOpen] = useState(false);
  const [editingCharge, setEditingCharge] = useState(null);
  const [chargeFormData, setChargeFormData] = useState({
    code: "",
    name: "",
    chargeType: "",
    defaultAmount: "",
    customerRate: "",
    effectiveDate: new Date().toISOString().split("T")[0],
    status: "Active",
  });

  // Product Sales state
  const [productSalesFilters, setProductSalesFilters] = useState([]);
  const [isProductSheetOpen, setIsProductSheetOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productFormData, setProductFormData] = useState({
    sku: "",
    name: "",
    uom: "",
    defaultPrice: "",
    status: "Active",
  });

  // All commodities list
  const allCommoditiesList = [
    "All",
    "Commercial 89 Stone",
    "COMMERCIAL Screenings /131",
    "Bahama 57",
    '1/4" Rock',
    "15cr Graded Aggr Base",
    "Dot Sand",
    "DOT 67 ROCK",
    "STALITE AD BLK UNLD FINES D",
    "Trailers",
    "BANK RUN SHELL",
    "recycled base rock",
    "DOT 57 Stone",
    "DOT 89 Stone",
    "7 Stone",
    "Screenings Granite",
    "67 STONE",
    "10SM MFG SAND",
    "GU",
    "Slag",
    "Sand 40-140",
    "Masonry",
    "Cement",
    "Glass 40-140",
    "1/2",
    "IT",
    "Type 3",
    "Dumb",
    "1L",
    "FlatB",
    "Gravel",
    "Limestone",
    "Asphalt",
    "Concrete",
    "Crusite",
    "Flyash",
    "Portland",
    "Ready Mix",
  ];

  const handleAddRow = () => {
    setRateTableForm((prev) => ({
      ...prev,
      rows: [
        ...prev.rows,
        {
          id: prev.rows.length + 1,
          min: 0,
          max: 1,
          customerRate: 0,
          driverRate: 0,
        },
      ],
    }));
  };

  const handleRemoveRow = (id) => {
    if (rateTableForm.rows.length > 1) {
      setRateTableForm((prev) => ({
        ...prev,
        rows: prev.rows.filter((row) => row.id !== id),
      }));
    }
  };

  const handleRowChange = (id, field, value) => {
    setRateTableForm((prev) => ({
      ...prev,
      rows: prev.rows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row,
      ),
    }));
  };

  const handleCommodityChange = (commodity, checked) => {
    setRateTableForm((prev) => ({
      ...prev,
      selectedCommodities: checked
        ? [...prev.selectedCommodities, commodity]
        : prev.selectedCommodities.filter((c) => c !== commodity),
    }));
  };

  const handleCreateRateTable = () => {
    console.log("Rate Table Form:", rateTableForm);
    setIsRateTableSheetOpen(false);
    // Reset form
    setRateTableForm({
      tableName: "",
      importFile: null,
      rows: [{ id: 1, min: 0, max: 1, customerRate: 0, driverRate: 0 }],
      selectedCommodities: [],
    });
  };

  // Filter configurations for Rate Tables
  const rateTablesFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "tableName",
          label: "Table Name",
          type: "input",
          group: "Basic",
          placeholder: "Search table name...",
        },
        {
          key: "commodity",
          label: "Commodity",
          type: "select",
          group: "Basic",
          options: [
            { value: "All", label: "All" },
            { value: "Masonry", label: "Masonry" },
            { value: "Flyash", label: "Flyash" },
          ],
        },
      ],
    },
  ];

  // Filter configurations for Accessorial Charges
  const accessorialFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "chargeType",
          label: "Charge Structure",
          type: "select",
          group: "Basic",
          options: [
            { value: "Fuel Surcharge", label: "Fuel Surcharge" },
            { value: "Detention", label: "Detention" },
            { value: "Lumper", label: "Lumper" },
          ],
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" },
          ],
        },
      ],
    },
  ];

  const handleRateTablesFiltersChange = useCallback((newFilters) => {
    setRateTablesFilters(newFilters);
  }, []);

  const handleAccessorialFiltersChange = useCallback((newFilters) => {
    setAccessorialFilters(newFilters);
  }, []);

  // Mock rate tables data
  const rateTables = [
    {
      id: 1,
      tableName: "Standard Rates 2024",
      min: 0,
      max: 50,
      customerRate: 150.0,
      driverRate: 120.0,
      commodities: ["GU", "Slag", "Sand 40-140", "Masonry", "Cement"],
    },
    {
      id: 2,
      tableName: "Standard Rates 2025",
      min: 51,
      max: 100,
      customerRate: 200.0,
      driverRate: 160.0,
      commodities: ["Glass 40-140", "1/2", "IT", "Type 3"],
    },
    {
      id: 3,
      tableName: "Premium Rates",
      min: 0,
      max: 25,
      customerRate: 180.0,
      driverRate: 145.0,
      commodities: ["Dumb", "1L", "FlatB"],
    },
    {
      id: 4,
      tableName: "Bulk Transport Rates",
      min: 0,
      max: 75,
      customerRate: 165.0,
      driverRate: 130.0,
      commodities: ["Gravel", "Limestone", "Asphalt", "Concrete", "Crusite"],
    },
    {
      id: 5,
      tableName: "Express Rates",
      min: 0,
      max: 100,
      customerRate: 220.0,
      driverRate: 175.0,
      commodities: ["Flyash", "Portland", "Ready Mix"],
    },
  ];

  // Get commodities already used in existing rate tables
  const usedCommodities = rateTables.flatMap((table) => table.commodities);

  // Filter out used commodities from the available list for Add Rate Table form
  const availableCommodities = allCommoditiesList.filter(
    (commodity) => !usedCommodities.includes(commodity),
  );

  // Mock accessorial charges data (existing - for rates tab)
  const accessorialCharges = [
    {
      id: 1,
      chargeType: "Fuel Surcharge",
      description: "Standard fuel surcharge",
      rate: "15%",
      minCharge: "$25.00",
      maxCharge: "$500.00",
      status: "Active",
    },
    {
      id: 2,
      chargeType: "Detention",
      description: "Waiting time charges",
      rate: "$75.00/hr",
      minCharge: "$75.00",
      maxCharge: "$600.00",
      status: "Active",
    },
    {
      id: 3,
      chargeType: "Lumper",
      description: "Loading/unloading assistance",
      rate: "Flat",
      minCharge: "$50.00",
      maxCharge: "$200.00",
      status: "Inactive",
    },
  ];

  // Accessorial Charges mock data (for customer-specific accessorial codes)
  const [additionalChargesData, setAdditionalChargesData] = useState([
    {
      id: 1,
      code: "DET",
      name: "Detention",
      chargeType: "Per Hour",
      defaultAmount: 75.0,
      customerRate: 85.0,
      unit: "/ hr",
      approvalTier: "tier1",
      driverPayAmount: "50%",
      effectiveDate: "2026-01-01",
      status: "Active",
    },
    {
      id: 2,
      code: "LAY",
      name: "Layover",
      chargeType: "Per Day",
      defaultAmount: 350.0,
      customerRate: 400.0,
      unit: "/ day",
      approvalTier: "tier2",
      driverPayAmount: "$150",
      effectiveDate: "2026-01-01",
      status: "Active",
    },
    {
      id: 3,
      code: "STP",
      name: "Stop Off",
      chargeType: "Flat + Mileage",
      defaultAmount: 100.0,
      customerRate: 100.0,
      unit: "flat",
      approvalTier: "tier2",
      driverPayAmount: "$50",
      effectiveDate: "2026-01-01",
      status: "Active",
    },
    {
      id: 4,
      code: "TNU",
      name: "TONU",
      chargeType: "Flat Fee",
      defaultAmount: 400.0,
      customerRate: 475.0,
      unit: "flat",
      approvalTier: "tier2",
      driverPayAmount: "75%",
      effectiveDate: "2026-02-01",
      status: "Active",
    },
    {
      id: 5,
      code: "DRV",
      name: "Driver Assist",
      chargeType: "Flat Fee",
      defaultAmount: 75.0,
      customerRate: 75.0,
      unit: "flat",
      approvalTier: "tier2",
      driverPayAmount: "$75",
      effectiveDate: "2026-01-01",
      status: "Active",
    },
    {
      id: 6,
      code: "TRP",
      name: "Tarping",
      chargeType: "Flat Fee",
      defaultAmount: 75.0,
      customerRate: 50.0,
      unit: "flat",
      approvalTier: "tier2",
      driverPayAmount: "$50",
      effectiveDate: "2026-01-01",
      status: "Inactive",
    },
    {
      id: 7,
      code: "OOR",
      name: "Out of Route Miles",
      chargeType: "Per Mile",
      defaultAmount: 2.5,
      customerRate: 2.25,
      unit: "/ mi",
      approvalTier: "tier2",
      driverPayAmount: "Same",
      effectiveDate: "2026-01-15",
      status: "Active",
    },
    {
      id: 8,
      code: "EMP",
      name: "Empty Miles",
      chargeType: "Per Mile",
      defaultAmount: 2.0,
      customerRate: 1.75,
      unit: "/ mi",
      approvalTier: "tier2",
      driverPayAmount: "Same",
      effectiveDate: "2026-01-15",
      status: "Active",
    },
    {
      id: 9,
      code: "HAZ",
      name: "Hazmat",
      chargeType: "Flat Fee",
      defaultAmount: 200.0,
      customerRate: 200.0,
      unit: "flat",
      approvalTier: "tier2",
      driverPayAmount: "No pay",
      effectiveDate: "2026-03-01",
      status: "Pending",
    },
  ]);

  // Product Sales mock data (customer-specific materials/products)
  const productSalesData = [
    {
      id: 1,
      sku: "MAT-LS-057",
      name: "#57 Limestone",
      uom: "ton",
      defaultPrice: 45.0,
      status: "Active",
    },
    {
      id: 2,
      sku: "MAT-SD-001",
      name: "Concrete Sand",
      uom: "ton",
      defaultPrice: 35.0,
      status: "Active",
    },
    {
      id: 3,
      sku: "MAT-SD-002",
      name: "Fill Sand",
      uom: "ton",
      defaultPrice: 30.0,
      status: "Active",
    },
    {
      id: 4,
      sku: "MAT-CON-001",
      name: "Ready-Mix Concrete",
      uom: "cubic yard",
      defaultPrice: 125.0,
      status: "Active",
    },
    {
      id: 5,
      sku: "MAT-REC-001",
      name: "Recycled Concrete",
      uom: "ton",
      defaultPrice: 28.0,
      status: "Inactive",
    },
  ];

  // Accessorial Charges filter groups
  const additionalChargesFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "name",
          label: "Name",
          type: "input",
          group: "Basic",
          placeholder: "Search name...",
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
          ],
        },
      ],
    },
  ];

  // Product Sales filter groups
  const productSalesFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "name",
          label: "Name",
          type: "input",
          group: "Basic",
          placeholder: "Search name...",
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
          ],
        },
      ],
    },
  ];

  const handleAdditionalChargesFiltersChange = useCallback((newFilters) => {
    setAdditionalChargesFilters(newFilters);
  }, []);

  const handleProductSalesFiltersChange = useCallback((newFilters) => {
    setProductSalesFilters(newFilters);
  }, []);

  // Charge handlers
  const handleEditCharge = (charge) => {
    setEditingCharge(charge);
    setChargeFormData({
      code: charge.code,
      name: charge.name,
      chargeType: charge.chargeType,
      defaultAmount: charge.defaultAmount.toString(),
      customerRate: charge.customerRate.toString(),
      effectiveDate:
        charge.effectiveDate || new Date().toISOString().split("T")[0],
      status: charge.status,
    });
    setIsChargeSheetOpen(true);
  };

  const handleCloseChargeSheet = () => {
    setIsChargeSheetOpen(false);
    setEditingCharge(null);
    setChargeFormData({
      code: "",
      name: "",
      chargeType: "",
      defaultAmount: "",
      customerRate: "",
      effectiveDate: new Date().toISOString().split("T")[0],
      status: "Active",
    });
  };

  const handleSaveCharge = () => {
    const rate =
      parseFloat(chargeFormData.customerRate) ||
      parseFloat(chargeFormData.defaultAmount) ||
      0;
    const defRate = parseFloat(chargeFormData.defaultAmount) || 0;
    if (editingCharge) {
      setAdditionalChargesData(
        additionalChargesData.map((c) =>
          c.id === editingCharge.id
            ? {
                ...c,
                customerRate: rate,
                effectiveDate: chargeFormData.effectiveDate,
                status: chargeFormData.status,
              }
            : c,
        ),
      );
    } else {
      setAdditionalChargesData([
        ...additionalChargesData,
        {
          id: Date.now(),
          code: chargeFormData.code,
          name: chargeFormData.name,
          chargeType: chargeFormData.chargeType,
          defaultAmount: defRate,
          customerRate: rate,
          unit: "flat",
          approvalTier: "tier2",
          driverPayAmount: "—",
          effectiveDate: chargeFormData.effectiveDate,
          status: chargeFormData.status,
        },
      ]);
    }
    handleCloseChargeSheet();
  };

  // Product handlers
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductFormData({
      sku: product.sku,
      name: product.name,
      uom: product.uom,
      defaultPrice: product.defaultPrice.toString(),
      status: product.status,
    });
    setIsProductSheetOpen(true);
  };

  const handleCloseProductSheet = () => {
    setIsProductSheetOpen(false);
    setEditingProduct(null);
    setProductFormData({
      sku: "",
      name: "",
      uom: "",
      defaultPrice: "",
      status: "Active",
    });
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      Active:
        "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50",
      Inactive:
        "bg-red-500/10 hover:bg-red-500/30 text-red-700 dark:text-red-400 border border-red-500/50",
    };
    return (
      colors[status] ||
      "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50"
    );
  };

  const getTierBadgeColor = (tier) => {
    const colors = {
      tier1: "bg-green-500/10 text-green-700 border-green-500/50",
      tier2: "bg-blue-500/10 text-blue-700 border-blue-500/50",
      tier3: "bg-purple-500/10 text-purple-700 border-purple-500/50",
    };
    return colors[tier] || "bg-gray-500/10 text-gray-700 border-gray-500/50";
  };

  const getTierLabel = (tier) => {
    const labels = {
      tier1: "Tier 1: Auto Apply",
      tier2: "Tier 2: Dispatch Mgr",
      tier3: "Tier 3: VP Ops",
    };
    return labels[tier] || tier;
  };

  // Accessorial Charges columns
  const additionalChargesColumns = [
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => {
        const charge = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <div className="px-2 py-1.5 border-b mb-1">
                <p className="font-medium text-sm">{charge.name}</p>
                <p className="text-xs text-muted-foreground">{charge.code}</p>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleEditCharge(charge)}
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm bg-blue-500/10 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded">
          {row.getValue("code")}
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "chargeType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Charge Structure" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.getValue("chargeType")}
        </span>
      ),
    },
    {
      accessorKey: "defaultAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Default Rate" />
      ),
      size: 120,
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          ${row.getValue("defaultAmount").toFixed(2)} {row.original.unit}
        </span>
      ),
    },
    {
      accessorKey: "customerRate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer Rate" />
      ),
      size: 150,
      cell: ({ row }) => {
        const def = row.original.defaultAmount;
        const cust = row.getValue("customerRate");
        const diff = def > 0 ? ((cust - def) / def) * 100 : 0;
        return (
          <div className="flex items-center gap-2">
            <span className="font-semibold">
              ${cust.toFixed(2)} {row.original.unit}
            </span>
            {Math.abs(diff) > 0.1 && (
              <span
                className={`text-xs font-medium ${diff > 0 ? "text-emerald-600" : "text-rose-600"}`}
              >
                {diff > 0 ? "+" : ""}
                {diff.toFixed(0)}%
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "effectiveDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Effective Date" />
      ),
      size: 130,
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {new Date(row.getValue("effectiveDate")).toLocaleDateString()}
        </span>
      ),
    },
    {
      accessorKey: "approvalTier",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Approval Tier" />
      ),
      cell: ({ row }) => {
        const tier = row.getValue("approvalTier");
        return (
          <Badge className={getTierBadgeColor(tier)}>
            {getTierLabel(tier)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "driverPayAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Driver Pay" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {row.getValue("driverPayAmount")}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      size: 100,
      cell: ({ row }) => {
        const status = row.getValue("status");
        const statusColors = {
          Active:
            "bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50",
          Inactive:
            "bg-rose-500/10 hover:bg-rose-500/30 text-rose-700 dark:text-rose-400 border border-rose-500/50",
          Pending:
            "bg-amber-500/10 hover:bg-amber-500/30 text-amber-700 dark:text-amber-400 border border-amber-500/50",
        };
        return (
          <Badge
            className={
              statusColors[status] ||
              "bg-gray-500/10 text-gray-700 border-gray-500/50"
            }
          >
            {status}
          </Badge>
        );
      },
    },
  ];

  // Product Sales columns
  const productSalesColumns = [
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <div className="px-2 py-1.5 border-b mb-1">
                <p className="font-medium text-sm">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.sku}</p>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleEditProduct(product)}
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "sku",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="SKU" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("sku")}</span>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Material Name" />
      ),
    },
    {
      accessorKey: "uom",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="UOM" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.getValue("uom")}</span>
      ),
    },
    {
      accessorKey: "defaultPrice",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Default Price" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">
          ${row.getValue("defaultPrice").toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        return <Badge className={getStatusBadgeColor(status)}>{status}</Badge>;
      },
    },
  ];

  // Rate Tables columns
  const rateTablesColumns = [
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/app/carrier-portal/master/customers/customer-details/rate-table-details?id=${row.original.id}`,
                  )
                }
              >
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "tableName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Table Name" />
      ),
      size: 180,
    },
    {
      accessorKey: "commodities",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Commodities" />
      ),
      size: 300,
      cell: ({ row }) => {
        const commodities = row.getValue("commodities") || [];
        const uniqueCommodities = [...new Set(commodities)];
        return (
          <div className="flex flex-wrap gap-1">
            {uniqueCommodities.map((commodity, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 border border-blue-500 text-blue-700 dark:bg-blue-400/10 dark:border-blue-400 dark:text-blue-400"
              >
                {commodity}
              </span>
            ))}
          </div>
        );
      },
    },
  ];

  // Accessorial Charges columns
  const accessorialColumns = [
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "chargeType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Charge Structure" />
      ),
      size: 150,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      size: 200,
    },
    {
      accessorKey: "rate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rate" />
      ),
      size: 100,
    },
    {
      accessorKey: "minCharge",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Min Charge" />
      ),
      size: 100,
    },
    {
      accessorKey: "maxCharge",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Max Charge" />
      ),
      size: 100,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      size: 100,
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
              status === "Active"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  // Mock customer data
  const customerData = {
    name: "Acme Corporation",
    code: "ACM-001",
    email: "contact@acmecorp.com",
    phone: "+1 (555) 123-4567",
    addressLine1: "123 Main St",
    state: "NY",
    city: "New York",
    zipCode: "10001",
    customerRegion: "Northeast",
    billingType: "Factored customer",
    milesMeterSystem: "Google",
    fleetType: "Bulk",
    milesCalcType: "Point to point",
    autoEmailExport: "on",
  };

  // Mock contact data
  const contactData = {
    name: "John Anderson",
    email: "john.anderson@acmecorp.com",
    contactNo: "+1 (555) 987-6543",
  };

  // Mock comments data
  const commentsData = [
    {
      id: 1,
      dateTime: "2024-01-15 10:30 AM",
      enteredBy: "James Wilson",
      type: "Billing",
      attachment: "invoice_adjustment.pdf",
      comment:
        "Adjusted billing cycle per customer request. Now aligned with their fiscal quarter.",
    },
    {
      id: 2,
      dateTime: "2024-02-20 02:15 PM",
      enteredBy: "Sarah Mitchell",
      type: "Service",
      attachment: null,
      comment:
        "Customer requested priority scheduling for all bulk deliveries during Q2.",
    },
    {
      id: 3,
      dateTime: "2024-03-10 09:45 AM",
      enteredBy: "Michael Thompson",
      type: "General",
      attachment: null,
      comment:
        "Updated primary contact information. New point of contact is Jennifer Adams.",
    },
    {
      id: 4,
      dateTime: "2024-03-25 11:00 AM",
      enteredBy: "Emily Roberts",
      type: "Positive",
      attachment: "feedback_letter.pdf",
      comment:
        "Customer expressed satisfaction with recent service improvements. Letter attached.",
    },
  ];

  // Audit log data
  const auditLogData = [
    {
      id: 1,
      action: "Rate table updated",
      type: "Update",
      oldValue: "Standard Rates 2023",
      newValue: "Standard Rates 2024",
      actionBy: "John Smith",
      timestamp: "Jan 28, 2024 14:35:22",
    },
    {
      id: 2,
      action: "New lane added",
      type: "Create",
      oldValue: "-",
      newValue: "Miami to Atlanta",
      actionBy: "Sarah Johnson",
      timestamp: "Jan 26, 2024 09:12:45",
    },
    {
      id: 3,
      action: "Billing type updated",
      type: "Update",
      oldValue: "Direct Bill",
      newValue: "Factored customer",
      actionBy: "John Smith",
      timestamp: "Jan 24, 2024 20:22:34",
    },
    {
      id: 4,
      action: "Customer status changed",
      type: "Status",
      oldValue: "Pending",
      newValue: "Active",
      actionBy: "Mike Davis",
      timestamp: "Jan 20, 2024 11:45:18",
    },
    {
      id: 5,
      action: "Contract documents uploaded",
      type: "Upload",
      oldValue: "-",
      newValue: "contract_2024.pdf",
      actionBy: "Sarah Johnson",
      timestamp: "Jan 18, 2024 16:30:00",
    },
    {
      id: 6,
      action: "Pickup location added",
      type: "Create",
      oldValue: "-",
      newValue: "Warehouse A - 123 Industrial Blvd",
      actionBy: "John Smith",
      timestamp: "Jan 15, 2024 10:15:33",
    },
    {
      id: 7,
      action: "Credit limit verified",
      type: "Verify",
      oldValue: "$25,000",
      newValue: "$50,000",
      actionBy: "Admin System",
      timestamp: "Jan 12, 2024 08:00:00",
    },
    {
      id: 8,
      action: "Customer created",
      type: "Create",
      oldValue: "-",
      newValue: "Acme Corporation",
      actionBy: "John Smith",
      timestamp: "Jan 10, 2024 09:30:15",
    },
  ];

  const getAuditTypeBadgeColor = (type) => {
    const colors = {
      Create:
        "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50",
      Update:
        "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50",
      Upload:
        "bg-purple-500/10 hover:bg-purple-500/30 text-purple-700 dark:text-purple-400 border border-purple-500/50",
      Status:
        "bg-orange-500/10 hover:bg-orange-500/30 text-orange-700 dark:text-orange-400 border border-orange-500/50",
      Verify:
        "bg-teal-500/10 hover:bg-teal-500/30 text-teal-700 dark:text-teal-400 border border-teal-500/50",
    };
    return (
      colors[type] ||
      "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50"
    );
  };

  const auditLogColumns = [
    {
      accessorKey: "action",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Operation" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => {
        const type = row.getValue("type");
        return <Badge className={getAuditTypeBadgeColor(type)}>{type}</Badge>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "oldValue",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Old Value" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "newValue",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="New Value" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "actionBy",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Modified By" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "timestamp",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Timestamp" />
      ),
      enableSorting: true,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <Tabs
        defaultValue={activeTab}
        className="w-full h-full flex flex-col overflow-hidden "
      >
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="mb-0 rounded-none w-max">
            <TabsTrigger value="profile" className="h-full">
              <BuildingIcon className="size-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="rates" className="h-full">
              <TrendingUpIcon className="size-4" />
              Rates
            </TabsTrigger>
            <TabsTrigger value="fsc-profile" className="h-full">
              <TrendingUpIcon className="size-4" />
              FSC Profile
            </TabsTrigger>
            <TabsTrigger value="accessorial-charges" className="h-full">
              <DollarSignIcon className="size-4" />
              Accessorial Charges
            </TabsTrigger>
            <TabsTrigger value="product-sales" className="h-full">
              <Package className="size-4" />
              Product Sales
            </TabsTrigger>
            <TabsTrigger value="pickup-locations" className="h-full">
              <MapPinIcon className="size-4" />
              Pickup Locations
            </TabsTrigger>
            <TabsTrigger value="lanes" className="h-full">
              <MapPinIcon className="size-4" />
              Lanes
            </TabsTrigger>
            <TabsTrigger value="orders" className="h-full">
              <ShoppingCartIcon className="size-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="payments" className="h-full">
              <CreditCardIcon className="size-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="metrics" className="h-full">
              <ChartBarIcon className="size-4" />
              Metrics
            </TabsTrigger>

            <TabsTrigger value="reports" className="h-full">
              <FileTextIcon className="size-4" />
              Reports
            </TabsTrigger>

            <TabsTrigger value="receivables" className="h-full">
              <DollarSignIcon className="size-4" />
              Receivables
            </TabsTrigger>

            <TabsTrigger value="unposted" className="h-full">
              <FileTextIcon className="size-4" />
              Unposted
            </TabsTrigger>

            <TabsTrigger value="sales" className="h-full">
              <BadgeDollarSignIcon className="size-4" />
              Sales
            </TabsTrigger>
            <TabsTrigger value="instructions" className="h-full">
              <FileIcon className="size-4" />
              Instructions
            </TabsTrigger>
            <TabsTrigger value="vault" className="h-full">
              <LockIcon className="size-4" />
              Vault
            </TabsTrigger>
            <TabsTrigger value="comments" className="h-full">
              <MessageSquare className="size-4" />
              Comments
            </TabsTrigger>
            <TabsTrigger value="audit" className="h-full">
              <History className="size-4" />
              Audit Log
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="flex-1 overflow-auto mt-2 mx-2">
          <TabsContent value="profile" className="space-y-2 h-full mt-0 px-2">
            <div className="flex gap-4 h-fit">
              <BasicInformationCard customerData={customerData} />
              <ContactDetailsCard contactData={contactData} />
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-2 h-full mt-0 px-2">
            <div className="border rounded-lg p-6 bg-card">
              <p className="text-muted-foreground">
                Metrics content coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-2 h-full mt-0 px-2">
            <div className="border rounded-lg p-6 bg-card">
              <p className="text-muted-foreground">
                Orders content coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-2 h-full mt-0 px-2">
            <div className="border rounded-lg p-6 bg-card">
              <p className="text-muted-foreground">
                Reports content coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-2 h-full mt-0 px-2">
            <PaymentsMetricsCards />
            <InvoicesTable />
          </TabsContent>

          <TabsContent
            value="receivables"
            className="space-y-4 h-full mt-0 px-2"
          >
            <ReceivablesMetricsCards />
            <ReceivablesTable />
          </TabsContent>

          <TabsContent value="unposted" className="space-y-4 h-full mt-0 px-2">
            <UnpostedMetricsCards />
            <UnpostedTable />
          </TabsContent>

          <TabsContent value="fsc-profile" className="h-full mt-0 px-2 pt-2">
            <FSCTab />
          </TabsContent>

          <TabsContent value="rates" className="space-y-4 px-2 h-full mt-0">
            {/* Rate Tables Section */}
            <div className="border border-border rounded-lg bg-background">
              <div className="flex items-center justify-between px-2  py-2 border-b border-border">
                <SmartFilter
                  filterGroups={rateTablesFilterGroups}
                  onFiltersChange={handleRateTablesFiltersChange}
                />
                <Button
                  size="sm"
                  className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
                  onClick={() => setIsRateTableSheetOpen(true)}
                >
                  <PlusIcon className="size-3" />
                  Add Rate Table
                </Button>
              </div>

              {/* Remaining Commodities */}
              {availableCommodities.filter((c) => c !== "All").length > 0 && (
                <div className="px-4 py-3 border-b border-border">
                  <button
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    onClick={() =>
                      setIsRemainingCommoditiesOpen(!isRemainingCommoditiesOpen)
                    }
                  >
                    {isRemainingCommoditiesOpen ? (
                      <ChevronUpIcon className="size-4" />
                    ) : (
                      <ChevronDownIcon className="size-4" />
                    )}
                    <span>
                      Remaining Commodities (
                      {availableCommodities.filter((c) => c !== "All").length})
                    </span>
                  </button>
                  {isRemainingCommoditiesOpen && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {availableCommodities
                        .filter((c) => c !== "All")
                        .map((commodity, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400"
                          >
                            {commodity}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              )}

              <div className="px-4 pb-3">
                <DataTable
                  columns={rateTablesColumns}
                  data={rateTables}
                  showViewOptions={false}
                  pageSize={10}
                />
              </div>
            </div>
          </TabsContent>

          {/* Accessorial Charges Tab */}
          <TabsContent
            value="accessorial-charges"
            className="space-y-3 px-2 h-full mt-0"
          >
            <CustomerRateCard customerName={customerData.name} />
          </TabsContent>

          {/* Product Sales Tab */}
          <TabsContent
            value="product-sales"
            className="space-y-4 px-2 h-full mt-0"
          >
            <div className="border border-border rounded-lg bg-background">
              <div className="flex items-center justify-between px-2 py-2 border-b border-border">
                <SmartFilter
                  filterGroups={productSalesFilterGroups}
                  onFiltersChange={handleProductSalesFiltersChange}
                />
                <Button
                  size="sm"
                  className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
                  onClick={() => setIsProductSheetOpen(true)}
                >
                  <PlusIcon className="size-3" />
                  Add Product
                </Button>
              </div>
              <div className="px-4 pb-3">
                <DataTable
                  columns={productSalesColumns}
                  data={productSalesData}
                  showViewOptions={false}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-2 h-full mt-0 px-2">
            <div className="border rounded-lg p-6 bg-card">
              <p className="text-muted-foreground">
                Sales content coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent
            value="instructions"
            className="space-y-2 h-full mt-0 px-2"
          >
            <div className="border rounded-lg p-6 bg-card">
              <p className="text-muted-foreground">
                Instructions content coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="vault" className="h-full mt-0 px-2 ">
            <Tabs
              defaultValue="billing"
              className="w-full h-full flex flex-col  "
            >
              <TabsList className="mb-1 h-14 flex-shrink-0 sticky top-0 z-10 bg-background ">
                <TabsTrigger
                  value="billing"
                  className="flex items-center gap-1.5"
                >
                  <FileTextIcon className="size-4" />
                  Billing & Balance
                </TabsTrigger>
                <TabsTrigger
                  value="fuel-surcharge"
                  className="flex items-center gap-1.5"
                >
                  <PercentIcon className="size-4" />
                  Fuel Surcharge
                </TabsTrigger>
                <TabsTrigger
                  value="credit"
                  className="flex items-center gap-1.5"
                >
                  <CreditCardIcon className="size-4" />
                  Credit & Collections
                </TabsTrigger>
              </TabsList>

              <TabsContent value="billing" className="space-y-4 mt-0 flex-1">
                <div className="flex gap-4">
                  <div className="w-1/2 flex flex-col gap-4">
                    <BalanceCard />
                    <OptionalSettingsCard />
                  </div>
                  <BillCard />
                </div>
              </TabsContent>

              <TabsContent
                value="fuel-surcharge"
                className="space-y-4 mt-0 flex-1"
              >
                <FuelSurchargeTable />
              </TabsContent>

              <TabsContent value="credit" className="space-y-4 mt-0 flex-1">
                <CreditCollectionsCard />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="comments" className="space-y-2 h-full mt-0 px-2">
            <CustomerCommentsCard commentsData={commentsData} />
          </TabsContent>

          <TabsContent
            value="pickup-locations"
            className="space-y-2 h-full mt-0 px-2"
          >
            <PickupLocations />
          </TabsContent>

          <TabsContent value="lanes" className="space-y-2 h-full mt-0 px-2">
            <Lanes />
          </TabsContent>

          <TabsContent value="audit" className="space-y-2 h-full mt-0 px-2">
            <DataTable
              columns={auditLogColumns}
              data={auditLogData}
              showViewOptions={false}
            />
          </TabsContent>
        </div>
      </Tabs>

      {/* Add Rate Table Sheet */}
      <Sheet open={isRateTableSheetOpen} onOpenChange={setIsRateTableSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-2xl overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              Add Rate Table
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-6 mt-4 px-6">
            {/* Table Name and Import Table */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Table Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Enter Table Name"
                  value={rateTableForm.tableName}
                  onChange={(e) =>
                    setRateTableForm((prev) => ({
                      ...prev,
                      tableName: e.target.value,
                    }))
                  }
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Import Table
                </Label>
                <Input
                  type="file"
                  onChange={(e) =>
                    setRateTableForm((prev) => ({
                      ...prev,
                      importFile: e.target.files[0],
                    }))
                  }
                  className="h-10"
                />
              </div>
            </div>

            {/* Rate Rows */}
            <div className="space-y-3">
              {/* Header */}
              <div className="grid grid-cols-[1fr_1fr_1fr_1fr_40px] gap-2">
                <Label className="text-sm font-medium text-foreground">
                  Min
                </Label>
                <Label className="text-sm font-medium text-foreground">
                  Max
                </Label>
                <Label className="text-sm font-medium text-foreground">
                  Customer Rate
                </Label>
                <Label className="text-sm font-medium text-foreground">
                  Driver Rate
                </Label>
                <div></div>
              </div>

              {/* Rows */}
              {rateTableForm.rows.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-[1fr_1fr_1fr_1fr_40px] gap-2"
                >
                  <Input
                    type="number"
                    value={row.min}
                    onChange={(e) =>
                      handleRowChange(row.id, "min", e.target.value)
                    }
                    className="h-10"
                  />
                  <Input
                    type="number"
                    value={row.max}
                    onChange={(e) =>
                      handleRowChange(row.id, "max", e.target.value)
                    }
                    className="h-10"
                  />
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      value={row.customerRate}
                      onChange={(e) =>
                        handleRowChange(row.id, "customerRate", e.target.value)
                      }
                      className="h-10 pl-7"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      value={row.driverRate}
                      onChange={(e) =>
                        handleRowChange(row.id, "driverRate", e.target.value)
                      }
                      className="h-10 pl-7"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveRow(row.id)}
                    disabled={rateTableForm.rows.length === 1}
                    className="h-10 w-10"
                  >
                    <TrashIcon className="size-4 text-muted-foreground" />
                  </Button>
                </div>
              ))}

              {/* Add Table Row Button */}
              <Button
                type="button"
                variant="outline"
                onClick={handleAddRow}
                className="w-full h-10 border-dashed border-2 text-muted-foreground hover:text-foreground"
              >
                <PlusIcon className="size-4 mr-2" />
                Table Row
              </Button>
            </div>

            {/* Commodities */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">
                Commodities <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-x-3 gap-y-4">
                {availableCommodities.map((commodity) => (
                  <div key={commodity} className="flex items-center space-x-2">
                    <Checkbox
                      id={commodity}
                      checked={rateTableForm.selectedCommodities.includes(
                        commodity,
                      )}
                      onCheckedChange={(checked) =>
                        handleCommodityChange(commodity, checked)
                      }
                    />
                    <label
                      htmlFor={commodity}
                      className="text-sm text-foreground cursor-pointer"
                    >
                      {commodity}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t -mx-6 px-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsRateTableSheetOpen(false)}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateRateTable}
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Create
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Add/Edit Charge Sheet */}
      <Sheet
        open={isChargeSheetOpen}
        onOpenChange={(open) => {
          if (!open) handleCloseChargeSheet();
        }}
      >
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingCharge
                ? "Edit Customer Rate"
                : "Add Customer Rate Charge"}
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-5 mt-4 px-6">
            {!editingCharge && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Code <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      placeholder="e.g., DET"
                      value={chargeFormData.code}
                      onChange={(e) =>
                        setChargeFormData({
                          ...chargeFormData,
                          code: e.target.value.toUpperCase(),
                        })
                      }
                      className="h-10 font-mono"
                      maxLength={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      placeholder="e.g., Detention"
                      value={chargeFormData.name}
                      onChange={(e) =>
                        setChargeFormData({
                          ...chargeFormData,
                          name: e.target.value,
                        })
                      }
                      className="h-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Charge Structure
                  </Label>
                  <Select
                    value={chargeFormData.chargeType}
                    onValueChange={(v) =>
                      setChargeFormData({ ...chargeFormData, chargeType: v })
                    }
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Per Hour",
                        "Per Day",
                        "Per Mile",
                        "Flat Fee",
                        "Flat + Mileage",
                        "Flat + OOR Miles",
                        "Pass-through",
                        "Variable",
                      ].map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Default Rate ($)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={chargeFormData.defaultAmount}
                      onChange={(e) =>
                        setChargeFormData({
                          ...chargeFormData,
                          defaultAmount: e.target.value,
                        })
                      }
                      className="h-10 pl-7"
                    />
                  </div>
                </div>
              </>
            )}

            {editingCharge && (
              <div className="px-3 py-2.5 rounded-md bg-muted text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Code</span>
                  <span className="font-mono font-semibold">
                    {editingCharge.code}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{editingCharge.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Default Rate</span>
                  <span className="text-muted-foreground">
                    ${editingCharge.defaultAmount.toFixed(2)}{" "}
                    {editingCharge.unit}
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Customer Rate ($) <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={chargeFormData.customerRate}
                  onChange={(e) =>
                    setChargeFormData({
                      ...chargeFormData,
                      customerRate: e.target.value,
                    })
                  }
                  className="h-10 pl-7"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Override rate applied to all loads for this customer.
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Effective Date</Label>
              <Input
                type="date"
                value={chargeFormData.effectiveDate}
                onChange={(e) =>
                  setChargeFormData({
                    ...chargeFormData,
                    effectiveDate: e.target.value,
                  })
                }
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Status</Label>
              <Select
                value={chargeFormData.status}
                onValueChange={(v) =>
                  setChargeFormData({ ...chargeFormData, status: v })
                }
              >
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseChargeSheet}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                disabled={!chargeFormData.customerRate}
                onClick={handleSaveCharge}
              >
                {editingCharge ? "Save Changes" : "Add Rate"}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Add/Edit Product Sheet */}
      <Sheet
        open={isProductSheetOpen}
        onOpenChange={(open) => {
          if (!open) handleCloseProductSheet();
        }}
      >
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-5 mt-4 px-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                SKU <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="e.g., MAT-LS-057"
                value={productFormData.sku}
                onChange={(e) =>
                  setProductFormData({
                    ...productFormData,
                    sku: e.target.value.toUpperCase(),
                  })
                }
                className="h-10 font-mono"
                disabled={!!editingProduct}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Material Name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="e.g., #57 Limestone"
                value={productFormData.name}
                onChange={(e) =>
                  setProductFormData({
                    ...productFormData,
                    name: e.target.value,
                  })
                }
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                UOM (Unit of Measure) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="e.g., ton, cubic yard"
                value={productFormData.uom}
                onChange={(e) =>
                  setProductFormData({
                    ...productFormData,
                    uom: e.target.value,
                  })
                }
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Default Price <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={productFormData.defaultPrice}
                  onChange={(e) =>
                    setProductFormData({
                      ...productFormData,
                      defaultPrice: e.target.value,
                    })
                  }
                  className="h-10 pl-7"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseProductSheet}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                disabled={
                  !productFormData.sku ||
                  !productFormData.name ||
                  !productFormData.defaultPrice
                }
              >
                {editingProduct ? "Update Product" : "Create Product"}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CustomerDetails;
