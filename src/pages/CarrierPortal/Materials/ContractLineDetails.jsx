import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  History,
  DollarSign,
  PlusIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Layers,
  Gift,
} from "lucide-react";
import { MdEdit } from "react-icons/md";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import SmartFilter from "@/components/SmartFilter";

const ContractLineDetails = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "details";
  const lineId = searchParams.get("id") || "1";

  const [isTermSheetOpen, setIsTermSheetOpen] = useState(false);
  const [editingTerm, setEditingTerm] = useState(null);
  const [termFilters, setTermFilters] = useState([]);
  const [termFormData, setTermFormData] = useState({
    termId: "",
    effectiveStartDate: "",
    effectiveEndDate: "",
    basePrice: "",
    minOrderQty: "",
    orderMultipleQty: "",
    leadTimeDays: "",
    freightTerm: "",
    priceType: "Fixed",
  });

  // Price Tiers state
  const [isPriceTierSheetOpen, setIsPriceTierSheetOpen] = useState(false);
  const [editingPriceTier, setEditingPriceTier] = useState(null);
  const [priceTierFilters, setPriceTierFilters] = useState([]);
  const [priceTierFormData, setPriceTierFormData] = useState({
    tierId: "",
    termId: "",
    tierMinQty: "",
    tierMaxQty: "",
    tierPrice: "",
    discountPercent: "",
    pricingMethod: "Price",
  });

  // Rebates state
  const [isRebateSheetOpen, setIsRebateSheetOpen] = useState(false);
  const [editingRebate, setEditingRebate] = useState(null);
  const [rebateFilters, setRebateFilters] = useState([]);
  const [rebateFormData, setRebateFormData] = useState({
    rebateId: "",
    programName: "",
    effectiveStartDate: "",
    effectiveEndDate: "",
    rebateBasis: "Spend",
    settlementFrequency: "Monthly",
    minThreshold: "",
    maxThreshold: "",
    rebatePercent: "",
    rebateAmount: "",
  });

  // Mock data for contract line details
  const contractLineData = {
    1: {
      lineId: "CL-001",
      contractId: "SUP-2024-001",
      product: "#57 Limestone",
      status: "Active",
      notes: "Primary limestone supply for Tampa region",
      contract: {
        supplier: "Rocky's Quarry",
        effectiveDate: "2025-01-01",
        expirationDate: "2025-03-31",
        status: "Active",
      },
    },
    2: {
      lineId: "CL-002",
      contractId: "SUP-2024-001",
      product: "#89 Stone",
      status: "Active",
      notes: "Secondary stone product under same contract",
      contract: {
        supplier: "Rocky's Quarry",
        effectiveDate: "2025-01-01",
        expirationDate: "2025-03-31",
        status: "Active",
      },
    },
    3: {
      lineId: "CL-003",
      contractId: "SUP-2024-002",
      product: "Concrete Sand",
      status: "Active",
      notes: "High-grade concrete sand, ASTM C33 compliant",
      contract: {
        supplier: "Rocky's Quarry",
        effectiveDate: "2025-01-01",
        expirationDate: "2025-03-31",
        status: "Active",
      },
    },
  };

  const data = contractLineData[lineId] || contractLineData[1];

  // Terms data - pricing terms with effective date ranges
  const termsData = [
    {
      id: 1,
      termId: "TERM-001",
      effectiveStartDate: "2025-01-01",
      effectiveEndDate: "2025-03-31",
      basePrice: 45.00,
      minOrderQty: 20,
      orderMultipleQty: 5,
      leadTimeDays: 2,
      freightTerm: "FOB Origin",
      priceType: "Fixed",
    },
    {
      id: 2,
      termId: "TERM-002",
      effectiveStartDate: "2025-04-01",
      effectiveEndDate: "2025-06-30",
      basePrice: 47.50,
      minOrderQty: 20,
      orderMultipleQty: 5,
      leadTimeDays: 2,
      freightTerm: "FOB Origin",
      priceType: "Fixed",
    },
    {
      id: 3,
      termId: "TERM-003",
      effectiveStartDate: "2025-07-01",
      effectiveEndDate: null,
      basePrice: 49.00,
      minOrderQty: 15,
      orderMultipleQty: 5,
      leadTimeDays: 3,
      freightTerm: "FOB Destination",
      priceType: "Index-based",
    },
  ];

  // Audit log data
  const auditLogData = [
    {
      id: 1,
      action: "Contract line created",
      type: "Create",
      oldValue: "-",
      newValue: data.lineId,
      actionBy: "John Smith",
      timestamp: "Jan 15, 2025 09:30:15",
    },
    {
      id: 2,
      action: "Status updated",
      type: "Update",
      oldValue: "Draft",
      newValue: "Active",
      actionBy: "Sarah Johnson",
      timestamp: "Jan 16, 2025 10:45:22",
    },
    {
      id: 3,
      action: "Notes updated",
      type: "Update",
      oldValue: "-",
      newValue: data.notes,
      actionBy: "John Smith",
      timestamp: "Jan 17, 2025 14:20:00",
    },
  ];

  // Price Tiers mock data - quantity discounts tied to terms
  const priceTiersData = [
    {
      id: 1,
      tierId: "TIER-001",
      termId: "TERM-001",
      tierMinQty: 1,
      tierMaxQty: 99,
      tierPrice: 45.00,
      discountPercent: null,
      pricingMethod: "Price",
    },
    {
      id: 2,
      tierId: "TIER-002",
      termId: "TERM-001",
      tierMinQty: 100,
      tierMaxQty: 499,
      tierPrice: 42.75,
      discountPercent: null,
      pricingMethod: "Price",
    },
    {
      id: 3,
      tierId: "TIER-003",
      termId: "TERM-001",
      tierMinQty: 500,
      tierMaxQty: null,
      tierPrice: 40.50,
      discountPercent: null,
      pricingMethod: "Price",
    },
    {
      id: 4,
      tierId: "TIER-004",
      termId: "TERM-002",
      tierMinQty: 1,
      tierMaxQty: 99,
      tierPrice: null,
      discountPercent: 0,
      pricingMethod: "Discount",
    },
    {
      id: 5,
      tierId: "TIER-005",
      termId: "TERM-002",
      tierMinQty: 100,
      tierMaxQty: 499,
      tierPrice: null,
      discountPercent: 5,
      pricingMethod: "Discount",
    },
    {
      id: 6,
      tierId: "TIER-006",
      termId: "TERM-002",
      tierMinQty: 500,
      tierMaxQty: null,
      tierPrice: null,
      discountPercent: 10,
      pricingMethod: "Discount",
    },
  ];

  // Rebates mock data - volume rebate programs
  const rebatesData = [
    {
      id: 1,
      rebateId: "REB-001",
      programName: "Q1 Volume Rebate",
      effectiveStartDate: "2025-01-01",
      effectiveEndDate: "2025-03-31",
      rebateBasis: "Spend",
      settlementFrequency: "Quarterly",
      minThreshold: 10000,
      maxThreshold: 49999,
      rebatePercent: 2,
      rebateAmount: null,
      status: "Active",
    },
    {
      id: 2,
      rebateId: "REB-002",
      programName: "Q1 Volume Rebate - Tier 2",
      effectiveStartDate: "2025-01-01",
      effectiveEndDate: "2025-03-31",
      rebateBasis: "Spend",
      settlementFrequency: "Quarterly",
      minThreshold: 50000,
      maxThreshold: 99999,
      rebatePercent: 3.5,
      rebateAmount: null,
      status: "Active",
    },
    {
      id: 3,
      rebateId: "REB-003",
      programName: "Q1 Volume Rebate - Tier 3",
      effectiveStartDate: "2025-01-01",
      effectiveEndDate: "2025-03-31",
      rebateBasis: "Spend",
      settlementFrequency: "Quarterly",
      minThreshold: 100000,
      maxThreshold: null,
      rebatePercent: 5,
      rebateAmount: null,
      status: "Active",
    },
    {
      id: 4,
      rebateId: "REB-004",
      programName: "Monthly Qty Bonus",
      effectiveStartDate: "2025-01-01",
      effectiveEndDate: "2025-12-31",
      rebateBasis: "Qty",
      settlementFrequency: "Monthly",
      minThreshold: 500,
      maxThreshold: null,
      rebatePercent: null,
      rebateAmount: 250,
      status: "Active",
    },
    {
      id: 5,
      rebateId: "REB-005",
      programName: "2024 Annual Commitment",
      effectiveStartDate: "2024-01-01",
      effectiveEndDate: "2024-12-31",
      rebateBasis: "Spend",
      settlementFrequency: "Quarterly",
      minThreshold: 200000,
      maxThreshold: null,
      rebatePercent: 4,
      rebateAmount: null,
      status: "Expired",
    },
  ];

  const freightTermOptions = ["FOB Origin", "FOB Destination", "CIF", "DDP"];
  const priceTypeOptions = ["Fixed", "Index-based", "Cost+"];
  const pricingMethodOptions = ["Price", "Discount"];
  const rebateBasisOptions = ["Spend", "Qty"];
  const settlementFrequencyOptions = ["Monthly", "Quarterly", "Annually"];
  const rebateStatusOptions = ["Active", "Expired", "Draft"];

  const handleTermInputChange = (field, value) => {
    setTermFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTermSubmit = (e) => {
    e.preventDefault();
    console.log("Term form submitted:", termFormData);
    setIsTermSheetOpen(false);
    setEditingTerm(null);
    setTermFormData({
      termId: "",
      effectiveStartDate: "",
      effectiveEndDate: "",
      basePrice: "",
      minOrderQty: "",
      orderMultipleQty: "",
      leadTimeDays: "",
      freightTerm: "",
      priceType: "Fixed",
    });
  };

  const handleTermCancel = () => {
    setIsTermSheetOpen(false);
    setEditingTerm(null);
    setTermFormData({
      termId: "",
      effectiveStartDate: "",
      effectiveEndDate: "",
      basePrice: "",
      minOrderQty: "",
      orderMultipleQty: "",
      leadTimeDays: "",
      freightTerm: "",
      priceType: "Fixed",
    });
  };

  const handleTermEdit = (term) => {
    setEditingTerm(term);
    setTermFormData({
      termId: term.termId,
      effectiveStartDate: term.effectiveStartDate,
      effectiveEndDate: term.effectiveEndDate || "",
      basePrice: term.basePrice.toString(),
      minOrderQty: term.minOrderQty.toString(),
      orderMultipleQty: term.orderMultipleQty.toString(),
      leadTimeDays: term.leadTimeDays.toString(),
      freightTerm: term.freightTerm,
      priceType: term.priceType,
    });
    setIsTermSheetOpen(true);
  };

  const handleAddNewTerm = () => {
    setEditingTerm(null);
    setTermFormData({
      termId: "",
      effectiveStartDate: "",
      effectiveEndDate: "",
      basePrice: "",
      minOrderQty: "",
      orderMultipleQty: "",
      leadTimeDays: "",
      freightTerm: "",
      priceType: "Fixed",
    });
    setIsTermSheetOpen(true);
  };

  const termFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "termId",
          label: "Term ID",
          type: "input",
          group: "Basic",
          placeholder: "Search term ID...",
        },
        {
          key: "priceType",
          label: "Price Type",
          type: "select",
          group: "Basic",
          options: priceTypeOptions.map((p) => ({ label: p, value: p })),
        },
        {
          key: "freightTerm",
          label: "Freight Term",
          type: "select",
          group: "Basic",
          options: freightTermOptions.map((f) => ({ label: f, value: f })),
        },
      ],
    },
  ];

  const handleTermFiltersChange = useCallback((newFilters) => {
    setTermFilters(newFilters);
    console.log("Active term filters:", newFilters);
  }, []);

  // Price Tier handlers
  const handlePriceTierInputChange = (field, value) => {
    setPriceTierFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePriceTierSubmit = (e) => {
    e.preventDefault();
    console.log("Price tier form submitted:", priceTierFormData);
    setIsPriceTierSheetOpen(false);
    setEditingPriceTier(null);
    setPriceTierFormData({
      tierId: "",
      termId: "",
      tierMinQty: "",
      tierMaxQty: "",
      tierPrice: "",
      discountPercent: "",
      pricingMethod: "Price",
    });
  };

  const handlePriceTierCancel = () => {
    setIsPriceTierSheetOpen(false);
    setEditingPriceTier(null);
    setPriceTierFormData({
      tierId: "",
      termId: "",
      tierMinQty: "",
      tierMaxQty: "",
      tierPrice: "",
      discountPercent: "",
      pricingMethod: "Price",
    });
  };

  const handlePriceTierEdit = (tier) => {
    setEditingPriceTier(tier);
    setPriceTierFormData({
      tierId: tier.tierId,
      termId: tier.termId,
      tierMinQty: tier.tierMinQty.toString(),
      tierMaxQty: tier.tierMaxQty ? tier.tierMaxQty.toString() : "",
      tierPrice: tier.tierPrice ? tier.tierPrice.toString() : "",
      discountPercent: tier.discountPercent !== null ? tier.discountPercent.toString() : "",
      pricingMethod: tier.pricingMethod,
    });
    setIsPriceTierSheetOpen(true);
  };

  const handleAddNewPriceTier = () => {
    setEditingPriceTier(null);
    setPriceTierFormData({
      tierId: "",
      termId: "",
      tierMinQty: "",
      tierMaxQty: "",
      tierPrice: "",
      discountPercent: "",
      pricingMethod: "Price",
    });
    setIsPriceTierSheetOpen(true);
  };

  const priceTierFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "tierId",
          label: "Tier ID",
          type: "input",
          group: "Basic",
          placeholder: "Search tier ID...",
        },
        {
          key: "termId",
          label: "Term",
          type: "select",
          group: "Basic",
          options: termsData.map((t) => ({ label: t.termId, value: t.termId })),
        },
        {
          key: "pricingMethod",
          label: "Pricing Method",
          type: "select",
          group: "Basic",
          options: pricingMethodOptions.map((p) => ({ label: p, value: p })),
        },
      ],
    },
  ];

  const handlePriceTierFiltersChange = useCallback((newFilters) => {
    setPriceTierFilters(newFilters);
    console.log("Active price tier filters:", newFilters);
  }, []);

  // Rebate handlers
  const handleRebateInputChange = (field, value) => {
    setRebateFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRebateSubmit = (e) => {
    e.preventDefault();
    console.log("Rebate form submitted:", rebateFormData);
    setIsRebateSheetOpen(false);
    setEditingRebate(null);
    setRebateFormData({
      rebateId: "",
      programName: "",
      effectiveStartDate: "",
      effectiveEndDate: "",
      rebateBasis: "Spend",
      settlementFrequency: "Monthly",
      minThreshold: "",
      maxThreshold: "",
      rebatePercent: "",
      rebateAmount: "",
    });
  };

  const handleRebateCancel = () => {
    setIsRebateSheetOpen(false);
    setEditingRebate(null);
    setRebateFormData({
      rebateId: "",
      programName: "",
      effectiveStartDate: "",
      effectiveEndDate: "",
      rebateBasis: "Spend",
      settlementFrequency: "Monthly",
      minThreshold: "",
      maxThreshold: "",
      rebatePercent: "",
      rebateAmount: "",
    });
  };

  const handleRebateEdit = (rebate) => {
    setEditingRebate(rebate);
    setRebateFormData({
      rebateId: rebate.rebateId,
      programName: rebate.programName,
      effectiveStartDate: rebate.effectiveStartDate,
      effectiveEndDate: rebate.effectiveEndDate,
      rebateBasis: rebate.rebateBasis,
      settlementFrequency: rebate.settlementFrequency,
      minThreshold: rebate.minThreshold.toString(),
      maxThreshold: rebate.maxThreshold ? rebate.maxThreshold.toString() : "",
      rebatePercent: rebate.rebatePercent !== null ? rebate.rebatePercent.toString() : "",
      rebateAmount: rebate.rebateAmount !== null ? rebate.rebateAmount.toString() : "",
    });
    setIsRebateSheetOpen(true);
  };

  const handleAddNewRebate = () => {
    setEditingRebate(null);
    setRebateFormData({
      rebateId: "",
      programName: "",
      effectiveStartDate: "",
      effectiveEndDate: "",
      rebateBasis: "Spend",
      settlementFrequency: "Monthly",
      minThreshold: "",
      maxThreshold: "",
      rebatePercent: "",
      rebateAmount: "",
    });
    setIsRebateSheetOpen(true);
  };

  const rebateFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "programName",
          label: "Program Name",
          type: "input",
          group: "Basic",
          placeholder: "Search program...",
        },
        {
          key: "rebateBasis",
          label: "Basis",
          type: "select",
          group: "Basic",
          options: rebateBasisOptions.map((b) => ({ label: b, value: b })),
        },
        {
          key: "settlementFrequency",
          label: "Frequency",
          type: "select",
          group: "Basic",
          options: settlementFrequencyOptions.map((f) => ({ label: f, value: f })),
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: rebateStatusOptions.map((s) => ({ label: s, value: s })),
        },
      ],
    },
  ];

  const handleRebateFiltersChange = useCallback((newFilters) => {
    setRebateFilters(newFilters);
    console.log("Active rebate filters:", newFilters);
  }, []);

  const getStatusBadgeColor = (status) => {
    const colors = {
      Active:
        "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50",
      Expired:
        "bg-amber-500/10 hover:bg-amber-500/30 text-amber-700 dark:text-amber-400 border border-amber-500/50",
      Terminated:
        "bg-red-500/10 hover:bg-red-500/30 text-red-700 dark:text-red-400 border border-red-500/50",
      Draft:
        "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50",
    };
    return (
      colors[status] ||
      "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50"
    );
  };

  const getTypeBadgeColor = (type) => {
    const colors = {
      Create: "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50",
      Update: "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50",
      Delete: "bg-red-500/10 hover:bg-red-500/30 text-red-700 dark:text-red-400 border border-red-500/50",
    };
    return colors[type] || "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  const getPriceTypeBadgeColor = (priceType) => {
    const colors = {
      Fixed: "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50",
      "Index-based": "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50",
      "Cost+": "bg-purple-500/10 hover:bg-purple-500/30 text-purple-700 dark:text-purple-400 border border-purple-500/50",
    };
    return colors[priceType] || "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const termsColumns = [
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => {
        const term = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <div className="px-2 py-1.5 border-b mb-1">
                <p className="font-medium text-sm">{term.termId}</p>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleTermEdit(term)}
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "termId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Term ID" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("termId")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "effectiveStartDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Start Date" />
      ),
      cell: ({ row }) => formatDate(row.getValue("effectiveStartDate")),
      enableSorting: true,
    },
    {
      accessorKey: "effectiveEndDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="End Date" />
      ),
      cell: ({ row }) => {
        const endDate = row.getValue("effectiveEndDate");
        return endDate ? formatDate(endDate) : <span className="text-muted-foreground">Open-ended</span>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "basePrice",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Base Price" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{formatCurrency(row.getValue("basePrice"))}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "priceType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price Type" />
      ),
      cell: ({ row }) => {
        const priceType = row.getValue("priceType");
        return <Badge className={getPriceTypeBadgeColor(priceType)}>{priceType}</Badge>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "minOrderQty",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="MOQ" />
      ),
      cell: ({ row }) => `${row.getValue("minOrderQty")} tons`,
      enableSorting: true,
    },
    {
      accessorKey: "orderMultipleQty",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order Multiple" />
      ),
      cell: ({ row }) => `${row.getValue("orderMultipleQty")} tons`,
      enableSorting: true,
    },
    {
      accessorKey: "leadTimeDays",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Lead Time" />
      ),
      cell: ({ row }) => `${row.getValue("leadTimeDays")} days`,
      enableSorting: true,
    },
    {
      accessorKey: "freightTerm",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Freight Term" />
      ),
      enableSorting: true,
    },
  ];

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
        return (
          <Badge className={getTypeBadgeColor(type)}>{type}</Badge>
        );
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

  // Price Tiers columns
  const priceTiersColumns = [
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => {
        const tier = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <div className="px-2 py-1.5 border-b mb-1">
                <p className="font-medium text-sm">{tier.tierId}</p>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handlePriceTierEdit(tier)}
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "tierId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tier ID" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("tierId")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "termId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Term" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("termId")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "tierMinQty",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Min Qty" />
      ),
      cell: ({ row }) => `${row.getValue("tierMinQty")} units`,
      enableSorting: true,
    },
    {
      accessorKey: "tierMaxQty",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Max Qty" />
      ),
      cell: ({ row }) => {
        const maxQty = row.getValue("tierMaxQty");
        return maxQty ? `${maxQty} units` : <span className="text-muted-foreground">Unlimited</span>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "pricingMethod",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Method" />
      ),
      cell: ({ row }) => {
        const method = row.getValue("pricingMethod");
        return (
          <Badge className={method === "Price" ? "bg-green-500/10 text-green-600 border border-green-500/20" : "bg-blue-500/10 text-blue-600 border border-blue-500/20"}>
            {method}
          </Badge>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "tierPrice",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tier Price" />
      ),
      cell: ({ row }) => {
        const price = row.getValue("tierPrice");
        return price ? <span className="font-medium">{formatCurrency(price)}</span> : <span className="text-muted-foreground">-</span>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "discountPercent",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Discount %" />
      ),
      cell: ({ row }) => {
        const discount = row.getValue("discountPercent");
        return discount !== null ? `${discount}%` : <span className="text-muted-foreground">-</span>;
      },
      enableSorting: true,
    },
  ];

  // Rebates columns
  const rebatesColumns = [
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => {
        const rebate = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <div className="px-2 py-1.5 border-b mb-1">
                <p className="font-medium text-sm">{rebate.rebateId}</p>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleRebateEdit(rebate)}
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "rebateId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rebate ID" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("rebateId")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "programName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Program Name" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "rebateBasis",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Basis" />
      ),
      cell: ({ row }) => {
        const basis = row.getValue("rebateBasis");
        return (
          <Badge className={basis === "Spend" ? "bg-purple-500/10 text-purple-600 border border-purple-500/20" : "bg-cyan-500/10 text-cyan-600 border border-cyan-500/20"}>
            {basis}
          </Badge>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "settlementFrequency",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Frequency" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "minThreshold",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Min Threshold" />
      ),
      cell: ({ row }) => {
        const rebate = row.original;
        const min = row.getValue("minThreshold");
        return rebate.rebateBasis === "Spend" ? formatCurrency(min) : `${min} units`;
      },
      enableSorting: true,
    },
    {
      accessorKey: "maxThreshold",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Max Threshold" />
      ),
      cell: ({ row }) => {
        const rebate = row.original;
        const max = row.getValue("maxThreshold");
        if (!max) return <span className="text-muted-foreground">Unlimited</span>;
        return rebate.rebateBasis === "Spend" ? formatCurrency(max) : `${max} units`;
      },
      enableSorting: true,
    },
    {
      accessorKey: "rebatePercent",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rebate %" />
      ),
      cell: ({ row }) => {
        const percent = row.getValue("rebatePercent");
        return percent !== null ? <span className="font-medium">{percent}%</span> : <span className="text-muted-foreground">-</span>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "rebateAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rebate Amount" />
      ),
      cell: ({ row }) => {
        const amount = row.getValue("rebateAmount");
        return amount !== null ? <span className="font-medium">{formatCurrency(amount)}</span> : <span className="text-muted-foreground">-</span>;
      },
      enableSorting: true,
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
      enableSorting: true,
    },
  ];

  // Contract Line Information Card
  const ContractLineInfoCard = () => (
    <div className="w-full border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FileText className="size-4" />
          Contract Line Information
        </h3>
        <div className="flex items-center gap-2">
          <button className="text-slate-500 hover:text-foreground transition-colors">
            <MdEdit className="size-4" />
          </button>
        </div>
      </div>
      <div className="divide-y divide-border">
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Line ID</p>
            <p className="text-sm font-medium text-foreground font-mono">{data.lineId}</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Contract ID</p>
            <p className="text-sm font-medium text-foreground font-mono">{data.contractId}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Product</p>
            <p className="text-sm font-medium text-foreground">{data.product}</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Status</p>
            <Badge className={getStatusBadgeColor(data.status)}>
              {data.status}
            </Badge>
          </div>
        </div>
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Notes</p>
          <p className="text-sm font-medium text-foreground">{data.notes || "-"}</p>
        </div>
      </div>
    </div>
  );

  // Contract Information Card
  const ContractInfoCard = () => (
    <div className="w-full border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FileText className="size-4" />
          Contract Information
        </h3>
      </div>
      <div className="divide-y divide-border">
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Supplier</p>
            <p className="text-sm font-medium text-foreground">{data.contract.supplier}</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Contract Status</p>
            <Badge className={getStatusBadgeColor(data.contract.status)}>
              {data.contract.status}
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Effective Date</p>
            <p className="text-sm font-medium text-foreground">{formatDate(data.contract.effectiveDate)}</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Expiration Date</p>
            <p className="text-sm font-medium text-foreground">{formatDate(data.contract.expirationDate)}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <Tabs
        defaultValue={activeTab}
        className="w-full h-full flex flex-col overflow-hidden"
      >
        <div className="flex-shrink-0">
          <TabsList className="mb-0 rounded-none">
            <TabsTrigger value="details" className="h-full">
              <FileText className="size-4" />
              Details
            </TabsTrigger>
            <TabsTrigger value="terms" className="h-full">
              <DollarSign className="size-4" />
              Terms
            </TabsTrigger>
            <TabsTrigger value="price-tiers" className="h-full">
              <Layers className="size-4" />
              Price Tiers
            </TabsTrigger>
            <TabsTrigger value="rebates" className="h-full">
              <Gift className="size-4" />
              Rebates
            </TabsTrigger>
            <TabsTrigger value="audit" className="h-full">
              <History className="size-4" />
              Audit Log
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4 h-full mt-0 px-4 py-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <ContractLineInfoCard />
              </div>
              <div className="w-1/2">
                <ContractInfoCard />
              </div>
            </div>
          </TabsContent>

          {/* Terms Tab */}
          <TabsContent value="terms" className="space-y-4 px-4 py-4 h-full">
            <div className="flex items-center justify-between mb-1">
              <SmartFilter
                filterGroups={termFilterGroups}
                onFiltersChange={handleTermFiltersChange}
              />
              <Button
                onClick={handleAddNewTerm}
                className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Term
              </Button>
            </div>
            <DataTable
              columns={termsColumns}
              data={termsData}
              showViewOptions={false}
            />
          </TabsContent>

          {/* Price Tiers Tab */}
          <TabsContent value="price-tiers" className="space-y-4 px-4 py-4 h-full">
            <div className="flex items-center justify-between mb-1">
              <SmartFilter
                filterGroups={priceTierFilterGroups}
                onFiltersChange={handlePriceTierFiltersChange}
              />
              <Button
                onClick={handleAddNewPriceTier}
                className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Price Tier
              </Button>
            </div>
            <DataTable
              columns={priceTiersColumns}
              data={priceTiersData}
              showViewOptions={false}
            />
          </TabsContent>

          {/* Rebates Tab */}
          <TabsContent value="rebates" className="space-y-4 px-4 py-4 h-full">
            <div className="flex items-center justify-between mb-1">
              <SmartFilter
                filterGroups={rebateFilterGroups}
                onFiltersChange={handleRebateFiltersChange}
              />
              <Button
                onClick={handleAddNewRebate}
                className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Rebate
              </Button>
            </div>
            <DataTable
              columns={rebatesColumns}
              data={rebatesData}
              showViewOptions={false}
            />
          </TabsContent>

          {/* Audit Log Tab */}
          <TabsContent value="audit" className="space-y-4 px-4 py-4 h-full">
            <DataTable
              columns={auditLogColumns}
              data={auditLogData}
              showViewOptions={false}
            />
          </TabsContent>
        </div>
      </Tabs>

      {/* Add/Edit Term Sheet */}
      <Sheet open={isTermSheetOpen} onOpenChange={setIsTermSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingTerm ? "Edit Term" : "Add New Term"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleTermSubmit} className="space-y-5 mt-4 px-6">
            {/* Term ID */}
            <div className="space-y-2">
              <Label
                htmlFor="termId"
                className="text-sm font-medium text-foreground"
              >
                Term ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="termId"
                type="text"
                placeholder="e.g., TERM-001"
                value={termFormData.termId}
                onChange={(e) => handleTermInputChange("termId", e.target.value)}
                className="h-10 font-mono"
                required
              />
            </div>

            {/* Effective Start Date */}
            <div className="space-y-2">
              <Label
                htmlFor="effectiveStartDate"
                className="text-sm font-medium text-foreground"
              >
                Effective Start Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="effectiveStartDate"
                type="date"
                value={termFormData.effectiveStartDate}
                onChange={(e) => handleTermInputChange("effectiveStartDate", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Effective End Date */}
            <div className="space-y-2">
              <Label
                htmlFor="effectiveEndDate"
                className="text-sm font-medium text-foreground"
              >
                Effective End Date
              </Label>
              <Input
                id="effectiveEndDate"
                type="date"
                value={termFormData.effectiveEndDate}
                onChange={(e) => handleTermInputChange("effectiveEndDate", e.target.value)}
                className="h-10"
              />
              <p className="text-xs text-muted-foreground">Leave empty for open-ended term</p>
            </div>

            {/* Base Price */}
            <div className="space-y-2">
              <Label
                htmlFor="basePrice"
                className="text-sm font-medium text-foreground"
              >
                Base Price ($) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="basePrice"
                type="number"
                step="0.01"
                placeholder="e.g., 45.00"
                value={termFormData.basePrice}
                onChange={(e) => handleTermInputChange("basePrice", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Price Type */}
            <div className="space-y-2">
              <Label
                htmlFor="priceType"
                className="text-sm font-medium text-foreground"
              >
                Price Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={termFormData.priceType}
                onValueChange={(value) => handleTermInputChange("priceType", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select price type" />
                </SelectTrigger>
                <SelectContent>
                  {priceTypeOptions.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Min Order Qty */}
            <div className="space-y-2">
              <Label
                htmlFor="minOrderQty"
                className="text-sm font-medium text-foreground"
              >
                Minimum Order Qty (tons) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="minOrderQty"
                type="number"
                placeholder="e.g., 20"
                value={termFormData.minOrderQty}
                onChange={(e) => handleTermInputChange("minOrderQty", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Order Multiple Qty */}
            <div className="space-y-2">
              <Label
                htmlFor="orderMultipleQty"
                className="text-sm font-medium text-foreground"
              >
                Order Multiple Qty (tons) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="orderMultipleQty"
                type="number"
                placeholder="e.g., 5"
                value={termFormData.orderMultipleQty}
                onChange={(e) => handleTermInputChange("orderMultipleQty", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Lead Time Days */}
            <div className="space-y-2">
              <Label
                htmlFor="leadTimeDays"
                className="text-sm font-medium text-foreground"
              >
                Lead Time (days) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="leadTimeDays"
                type="number"
                placeholder="e.g., 2"
                value={termFormData.leadTimeDays}
                onChange={(e) => handleTermInputChange("leadTimeDays", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Freight Term */}
            <div className="space-y-2">
              <Label
                htmlFor="freightTerm"
                className="text-sm font-medium text-foreground"
              >
                Freight Term <span className="text-red-500">*</span>
              </Label>
              <Select
                value={termFormData.freightTerm}
                onValueChange={(value) => handleTermInputChange("freightTerm", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select freight term" />
                </SelectTrigger>
                <SelectContent>
                  {freightTermOptions.map((term) => (
                    <SelectItem key={term} value={term}>
                      {term}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t px-6 -mx-6 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handleTermCancel}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {editingTerm ? "Update Term" : "Create Term"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Add/Edit Price Tier Sheet */}
      <Sheet open={isPriceTierSheetOpen} onOpenChange={setIsPriceTierSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingPriceTier ? "Edit Price Tier" : "Add New Price Tier"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handlePriceTierSubmit} className="space-y-5 mt-4 px-6">
            {/* Tier ID */}
            <div className="space-y-2">
              <Label
                htmlFor="tierId"
                className="text-sm font-medium text-foreground"
              >
                Tier ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="tierId"
                type="text"
                placeholder="e.g., TIER-001"
                value={priceTierFormData.tierId}
                onChange={(e) => handlePriceTierInputChange("tierId", e.target.value)}
                className="h-10 font-mono"
                required
              />
            </div>

            {/* Term ID */}
            <div className="space-y-2">
              <Label
                htmlFor="termId"
                className="text-sm font-medium text-foreground"
              >
                Term <span className="text-red-500">*</span>
              </Label>
              <Select
                value={priceTierFormData.termId}
                onValueChange={(value) => handlePriceTierInputChange("termId", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  {termsData.map((term) => (
                    <SelectItem key={term.termId} value={term.termId}>
                      {term.termId}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Min Qty */}
            <div className="space-y-2">
              <Label
                htmlFor="tierMinQty"
                className="text-sm font-medium text-foreground"
              >
                Minimum Quantity <span className="text-red-500">*</span>
              </Label>
              <Input
                id="tierMinQty"
                type="number"
                placeholder="e.g., 1"
                value={priceTierFormData.tierMinQty}
                onChange={(e) => handlePriceTierInputChange("tierMinQty", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Max Qty */}
            <div className="space-y-2">
              <Label
                htmlFor="tierMaxQty"
                className="text-sm font-medium text-foreground"
              >
                Maximum Quantity
              </Label>
              <Input
                id="tierMaxQty"
                type="number"
                placeholder="Leave empty for unlimited"
                value={priceTierFormData.tierMaxQty}
                onChange={(e) => handlePriceTierInputChange("tierMaxQty", e.target.value)}
                className="h-10"
              />
              <p className="text-xs text-muted-foreground">Leave empty for unlimited (infinity)</p>
            </div>

            {/* Pricing Method */}
            <div className="space-y-2">
              <Label
                htmlFor="pricingMethod"
                className="text-sm font-medium text-foreground"
              >
                Pricing Method <span className="text-red-500">*</span>
              </Label>
              <Select
                value={priceTierFormData.pricingMethod}
                onValueChange={(value) => handlePriceTierInputChange("pricingMethod", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {pricingMethodOptions.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tier Price (shown when method is Price) */}
            {priceTierFormData.pricingMethod === "Price" && (
              <div className="space-y-2">
                <Label
                  htmlFor="tierPrice"
                  className="text-sm font-medium text-foreground"
                >
                  Tier Price ($) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="tierPrice"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 45.00"
                  value={priceTierFormData.tierPrice}
                  onChange={(e) => handlePriceTierInputChange("tierPrice", e.target.value)}
                  className="h-10"
                  required
                />
              </div>
            )}

            {/* Discount Percent (shown when method is Discount) */}
            {priceTierFormData.pricingMethod === "Discount" && (
              <div className="space-y-2">
                <Label
                  htmlFor="discountPercent"
                  className="text-sm font-medium text-foreground"
                >
                  Discount Percent (%) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="discountPercent"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 5"
                  value={priceTierFormData.discountPercent}
                  onChange={(e) => handlePriceTierInputChange("discountPercent", e.target.value)}
                  className="h-10"
                  required
                />
                <p className="text-xs text-muted-foreground">Discount off base price</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t px-6 -mx-6 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handlePriceTierCancel}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {editingPriceTier ? "Update Tier" : "Create Tier"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Add/Edit Rebate Sheet */}
      <Sheet open={isRebateSheetOpen} onOpenChange={setIsRebateSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingRebate ? "Edit Rebate" : "Add New Rebate"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleRebateSubmit} className="space-y-5 mt-4 px-6">
            {/* Rebate ID */}
            <div className="space-y-2">
              <Label
                htmlFor="rebateId"
                className="text-sm font-medium text-foreground"
              >
                Rebate ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="rebateId"
                type="text"
                placeholder="e.g., REB-001"
                value={rebateFormData.rebateId}
                onChange={(e) => handleRebateInputChange("rebateId", e.target.value)}
                className="h-10 font-mono"
                required
              />
            </div>

            {/* Program Name */}
            <div className="space-y-2">
              <Label
                htmlFor="programName"
                className="text-sm font-medium text-foreground"
              >
                Program Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="programName"
                type="text"
                placeholder="e.g., Q1 Volume Rebate"
                value={rebateFormData.programName}
                onChange={(e) => handleRebateInputChange("programName", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Effective Start Date */}
            <div className="space-y-2">
              <Label
                htmlFor="rebateEffectiveStartDate"
                className="text-sm font-medium text-foreground"
              >
                Effective Start Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="rebateEffectiveStartDate"
                type="date"
                value={rebateFormData.effectiveStartDate}
                onChange={(e) => handleRebateInputChange("effectiveStartDate", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Effective End Date */}
            <div className="space-y-2">
              <Label
                htmlFor="rebateEffectiveEndDate"
                className="text-sm font-medium text-foreground"
              >
                Effective End Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="rebateEffectiveEndDate"
                type="date"
                value={rebateFormData.effectiveEndDate}
                onChange={(e) => handleRebateInputChange("effectiveEndDate", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Rebate Basis */}
            <div className="space-y-2">
              <Label
                htmlFor="rebateBasis"
                className="text-sm font-medium text-foreground"
              >
                Rebate Basis <span className="text-red-500">*</span>
              </Label>
              <Select
                value={rebateFormData.rebateBasis}
                onValueChange={(value) => handleRebateInputChange("rebateBasis", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select basis" />
                </SelectTrigger>
                <SelectContent>
                  {rebateBasisOptions.map((basis) => (
                    <SelectItem key={basis} value={basis}>
                      {basis}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Settlement Frequency */}
            <div className="space-y-2">
              <Label
                htmlFor="settlementFrequency"
                className="text-sm font-medium text-foreground"
              >
                Settlement Frequency <span className="text-red-500">*</span>
              </Label>
              <Select
                value={rebateFormData.settlementFrequency}
                onValueChange={(value) => handleRebateInputChange("settlementFrequency", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {settlementFrequencyOptions.map((freq) => (
                    <SelectItem key={freq} value={freq}>
                      {freq}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Min Threshold */}
            <div className="space-y-2">
              <Label
                htmlFor="minThreshold"
                className="text-sm font-medium text-foreground"
              >
                Minimum Threshold {rebateFormData.rebateBasis === "Spend" ? "($)" : "(units)"} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="minThreshold"
                type="number"
                step="0.01"
                placeholder={rebateFormData.rebateBasis === "Spend" ? "e.g., 10000" : "e.g., 500"}
                value={rebateFormData.minThreshold}
                onChange={(e) => handleRebateInputChange("minThreshold", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Max Threshold */}
            <div className="space-y-2">
              <Label
                htmlFor="maxThreshold"
                className="text-sm font-medium text-foreground"
              >
                Maximum Threshold {rebateFormData.rebateBasis === "Spend" ? "($)" : "(units)"}
              </Label>
              <Input
                id="maxThreshold"
                type="number"
                step="0.01"
                placeholder="Leave empty for unlimited"
                value={rebateFormData.maxThreshold}
                onChange={(e) => handleRebateInputChange("maxThreshold", e.target.value)}
                className="h-10"
              />
              <p className="text-xs text-muted-foreground">Leave empty for unlimited</p>
            </div>

            {/* Rebate Percent */}
            <div className="space-y-2">
              <Label
                htmlFor="rebatePercent"
                className="text-sm font-medium text-foreground"
              >
                Rebate Percent (%)
              </Label>
              <Input
                id="rebatePercent"
                type="number"
                step="0.01"
                placeholder="e.g., 2.5"
                value={rebateFormData.rebatePercent}
                onChange={(e) => handleRebateInputChange("rebatePercent", e.target.value)}
                className="h-10"
              />
            </div>

            {/* Rebate Amount */}
            <div className="space-y-2">
              <Label
                htmlFor="rebateAmount"
                className="text-sm font-medium text-foreground"
              >
                Rebate Amount ($)
              </Label>
              <Input
                id="rebateAmount"
                type="number"
                step="0.01"
                placeholder="e.g., 250"
                value={rebateFormData.rebateAmount}
                onChange={(e) => handleRebateInputChange("rebateAmount", e.target.value)}
                className="h-10"
              />
              <p className="text-xs text-muted-foreground">Use either Rebate Percent or Rebate Amount, not both</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t px-6 -mx-6 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handleRebateCancel}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {editingRebate ? "Update Rebate" : "Create Rebate"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ContractLineDetails;
