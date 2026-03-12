import { useState, useCallback } from "react";
import SmartFilter from "@/components/SmartFilter";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  PlusIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2,
  PowerIcon,
} from "lucide-react";

const accessorialCodes = [
  {
    code: "DET",
    name: "Detention",
    unit: "/ hr",
    defaultRate: 75,
    chargeType: "Per Hour",
    driverPayMethod: "percentage",
    driverPayAmount: 50,
    driverPaid: true,
    approvalTier: "tier1",
  },
  {
    code: "LAY",
    name: "Layover",
    unit: "/ day",
    defaultRate: 350,
    chargeType: "Per Day",
    driverPayMethod: "flat",
    driverPayAmount: 150,
    driverPaid: true,
    approvalTier: "tier2",
  },
  {
    code: "STP",
    name: "Stop Off",
    unit: "flat",
    defaultRate: 100,
    chargeType: "Flat + Mileage",
    driverPayMethod: "flat",
    driverPayAmount: 50,
    driverPaid: true,
    approvalTier: "tier2",
  },
  {
    code: "DIV",
    name: "Diversion",
    unit: "flat",
    defaultRate: 150,
    chargeType: "Flat + OOR Miles",
    driverPayMethod: "same",
    driverPayAmount: 0,
    driverPaid: true,
    approvalTier: "tier2",
  },
  {
    code: "TNU",
    name: "TONU",
    unit: "flat",
    defaultRate: 400,
    chargeType: "Flat Fee",
    driverPayMethod: "percentage",
    driverPayAmount: 75,
    driverPaid: true,
    approvalTier: "tier2",
  },
  {
    code: "DRV",
    name: "Driver Assist",
    unit: "flat",
    defaultRate: 75,
    chargeType: "Flat Fee",
    driverPayMethod: "flat",
    driverPayAmount: 75,
    driverPaid: true,
    approvalTier: "tier2",
  },
  {
    code: "TRP",
    name: "Tarping",
    unit: "flat",
    defaultRate: 75,
    chargeType: "Flat Fee",
    driverPayMethod: "flat",
    driverPayAmount: 50,
    driverPaid: true,
    approvalTier: "tier2",
  },
  {
    code: "HAZ",
    name: "Hazmat",
    unit: "flat",
    defaultRate: 150,
    chargeType: "Flat Fee",
    driverPayMethod: "none",
    driverPayAmount: 0,
    driverPaid: false,
    approvalTier: "tier2",
  },
  {
    code: "TOL",
    name: "Tolls",
    unit: "pass-thru",
    defaultRate: 0,
    chargeType: "Pass-Through",
    driverPayMethod: "none",
    driverPayAmount: 0,
    driverPaid: false,
    approvalTier: "tier1",
  },
  {
    code: "OVW",
    name: "Overweight",
    unit: "variable",
    defaultRate: 0,
    chargeType: "Variable",
    driverPayMethod: "none",
    driverPayAmount: 0,
    driverPaid: false,
    approvalTier: "tier2",
  },
  {
    code: "OOR",
    name: "Out of Route Miles",
    unit: "flat + /mi",
    defaultRate: 50,
    chargeType: "Flat + OOR Miles",
    defaultRatePerMile: 3.0,
    driverPayMethod: "same",
    driverPayAmount: 0,
    driverPaid: true,
    approvalTier: "tier2",
  },
  {
    code: "RDL",
    name: "Re-delivery",
    unit: "flat",
    defaultRate: 200,
    chargeType: "Flat Fee",
    driverPayMethod: "percentage",
    driverPayAmount: 50,
    driverPaid: true,
    approvalTier: "tier2",
  },
  {
    code: "PRM",
    name: "Permits",
    unit: "pass-thru",
    defaultRate: 0,
    chargeType: "Pass-Through",
    driverPayMethod: "none",
    driverPayAmount: 0,
    driverPaid: false,
    approvalTier: "tier1",
  },
  {
    code: "EMP",
    name: "Empty Miles",
    unit: "flat + /mi",
    defaultRate: 100,
    chargeType: "Flat + Mileage",
    defaultRatePerMile: 2.5,
    driverPayMethod: "same",
    driverPayAmount: 0,
    driverPaid: true,
    approvalTier: "tier2",
  },
];

const defaultRates = [
  {
    id: 1,
    customer: "Acme Corporation",
    code: "DET",
    name: "Detention",
    unit: "/ hr",
    defaultRate: 75,
    customerRate: 85,
    threshold: "2 hrs",
    chargeDisplay: "Itemized Separately",
    billToCode: "Same as Freight",
    invoiceMethod: "Separate Accessorial Invoice",
    effectiveDate: "2026-01-01",
    status: "Active",
  },
  {
    id: 2,
    customer: "Acme Corporation",
    code: "LAY",
    name: "Layover",
    unit: "/ day",
    defaultRate: 350,
    customerRate: 400,
    threshold: "—",
    chargeDisplay: "Combined with Freight",
    billToCode: "Same as Freight",
    invoiceMethod: "Include on Freight Invoice",
    effectiveDate: "2026-01-01",
    status: "Active",
  },
  {
    id: 3,
    customer: "Acme Corporation",
    code: "STP",
    name: "Stop Off",
    unit: "flat",
    defaultRate: 100,
    customerRate: 100,
    threshold: "—",
    chargeDisplay: "Itemized Separately",
    billToCode: "Same as Freight",
    invoiceMethod: "Include on Freight Invoice",
    effectiveDate: "2026-01-01",
    status: "Active",
  },
  {
    id: 4,
    customer: "Acme Corporation",
    code: "TNU",
    name: "TONU",
    unit: "flat",
    defaultRate: 500,
    customerRate: 475,
    threshold: "—",
    chargeDisplay: "Itemized Separately",
    billToCode: "Same as Freight",
    invoiceMethod: "Include on Freight Invoice",
    effectiveDate: "2026-02-01",
    status: "Active",
  },
  {
    id: 5,
    customer: "Acme Corporation",
    code: "OOR",
    name: "Out of Route Miles",
    unit: "/ mi",
    defaultRate: 3.0,
    customerRate: 2.25,
    threshold: "—",
    chargeDisplay: "Combined with Freight",
    billToCode: "Same as Freight",
    invoiceMethod: "Include on Freight Invoice",
    effectiveDate: "2026-01-15",
    status: "Active",
  },
  {
    id: 6,
    customer: "Acme Corporation",
    code: "EMP",
    name: "Empty Miles",
    unit: "/ mi",
    defaultRate: 2.5,
    customerRate: 1.75,
    threshold: "—",
    chargeDisplay: "Combined with Freight",
    billToCode: "Same as Freight",
    invoiceMethod: "Include on Freight Invoice",
    effectiveDate: "2026-01-15",
    status: "Active",
  },
  {
    id: 7,
    customer: "Acme Corporation",
    code: "HAZ",
    name: "Hazmat",
    unit: "flat",
    defaultRate: 150,
    customerRate: 200,
    threshold: "—",
    chargeDisplay: "Itemized Separately",
    billToCode: "Separate Code",
    invoiceMethod: "Separate Accessorial Invoice",
    effectiveDate: "2026-03-01",
    status: "Inactive",
  },
  {
    id: 8,
    customer: "Titan",
    code: "DET",
    name: "Detention",
    unit: "/ hr",
    defaultRate: 75,
    customerRate: 85,
    threshold: "2 hrs",
    chargeDisplay: "Itemized Separately",
    billToCode: "Same as Freight",
    invoiceMethod: "Separate Accessorial Invoice",
    effectiveDate: "2026-01-01",
    status: "Active",
  },
  {
    id: 9,
    customer: "Ashgrove",
    code: "DET",
    name: "Detention",
    unit: "/ hr",
    defaultRate: 75,
    customerRate: 70,
    threshold: "2.5 hrs",
    chargeDisplay: "Combined with Freight",
    billToCode: "Separate Code",
    invoiceMethod: "Separate Accessorial Invoice",
    effectiveDate: "2026-02-01",
    status: "Active",
  },
  {
    id: 10,
    customer: "TQL",
    code: "DET",
    name: "Detention",
    unit: "/ hr",
    defaultRate: 75,
    customerRate: 90,
    threshold: "1.5 hrs",
    chargeDisplay: "Itemized Separately",
    billToCode: "Same as Freight",
    invoiceMethod: "Separate Accessorial Invoice",
    effectiveDate: "2026-01-15",
    status: "Active",
  },
  {
    id: 11,
    customer: "Vulcan Materials",
    code: "DET",
    name: "Detention",
    unit: "/ hr",
    defaultRate: 75,
    customerRate: 80,
    threshold: "2 hrs",
    chargeDisplay: "Itemized Separately",
    billToCode: "Separate Code",
    invoiceMethod: "Separate Accessorial Invoice",
    effectiveDate: "2026-02-15",
    status: "Active",
  },
];

const emptyForm = {
  customer: "",
  code: "",
  chargeType: "",
  driverPaid: false,
  driverPayMethod: "",
  driverPayAmount: null,
  approvalTier: "",
  customerRate: "",
  customerRatePerMile: "",
  threshold: "",
  chargeDisplay: "Itemized Separately",
  billToCode: "Same as Freight",
  invoiceMethod: "Include on Freight Invoice",
  effectiveDate: new Date().toISOString().split("T")[0],
};

const getDriverPayDisplay = (method, amount) => {
  if (method === "same") return "Same as Billed";
  if (method === "flat") return `$${parseFloat(amount || 0).toFixed(2)} Flat`;
  if (method === "percentage") return `${amount || 0}% of Billed`;
  return "No Pay";
};

const getTierLabel = (tier) => {
  const labels = {
    tier1: "Tier 1 — Auto-Apply",
    tier2: "Tier 2 — Dispatch Manager",
    tier3: "Tier 3 — VP of Operations",
  };
  return labels[tier] || tier;
};

const CustomerRateCard = ({ customerName }) => {
  const [rates, setRates] = useState(defaultRates);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [filters, setFilters] = useState([]);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const filterGroups = [
    {
      name: "Search",
      filters: [
        {
          key: "name",
          label: "Accessorial",
          type: "input",
          placeholder: "Search accessorial...",
        },
      ],
    },
    {
      name: "Filters",
      filters: [
        ...(!customerName
          ? [
              {
                key: "customer",
                label: "Customer",
                type: "select",
                options: [...new Set(rates.map((r) => r.customer))].map(
                  (c) => ({
                    label: c,
                    value: c,
                  }),
                ),
              },
            ]
          : []),
        {
          key: "code",
          label: "Code",
          type: "select",
          options: [...new Set(rates.map((r) => r.code))].map((c) => ({
            label: c,
            value: c,
          })),
        },
        {
          key: "chargeDisplay",
          label: "Charge Display",
          type: "select",
          options: [
            { label: "Itemized Separately", value: "Itemized Separately" },
            { label: "Combined with Freight", value: "Combined with Freight" },
          ],
        },
        {
          key: "invoiceMethod",
          label: "Invoice Method",
          type: "select",
          options: [
            {
              label: "Include on Freight Invoice",
              value: "Include on Freight Invoice",
            },
            {
              label: "Separate Accessorial Invoice",
              value: "Separate Accessorial Invoice",
            },
          ],
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          options: [
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
          ],
        },
      ],
    },
  ];

  const baseRates = customerName
    ? rates.filter((r) => r.customer === customerName)
    : rates;

  const displayedRates = baseRates.filter((r) =>
    filters.every(({ key, value, type }) => {
      if (!value || value === "") return true;
      if (type === "input")
        return r[key]?.toLowerCase().includes(value.toLowerCase());
      if (type === "select") return r[key] === value;
      return true;
    }),
  );

  const openAdd = () => {
    setEditingRow(null);
    setForm({ ...emptyForm, customer: customerName || "" });
    setSheetOpen(true);
  };
  const openEdit = (row) => {
    const codeObj = accessorialCodes.find((c) => c.code === row.code) || {};
    setEditingRow(row);
    setForm({
      ...row,
      chargeType: codeObj.chargeType || row.chargeType || "",
      driverPaid: codeObj.driverPaid ?? row.driverPaid ?? false,
      driverPayMethod: codeObj.driverPayMethod || row.driverPayMethod || "none",
      driverPayAmount: codeObj.driverPayAmount || row.driverPayAmount || null,
      approvalTier: codeObj.approvalTier || row.approvalTier || "",
      customerRatePerMile: row.customerRatePerMile || "",
    });
    setSheetOpen(true);
  };
  const handleDelete = (id) => setRates(rates.filter((r) => r.id !== id));
  const handleToggleStatus = (id) =>
    setRates(
      rates.map((r) =>
        r.id === id
          ? { ...r, status: r.status === "Active" ? "Inactive" : "Active" }
          : r,
      ),
    );

  const handleSave = () => {
    const codeObj = accessorialCodes.find((c) => c.code === form.code) || {};
    if (editingRow) {
      setRates(
        rates.map((r) =>
          r.id === editingRow.id
            ? {
                ...r,
                ...form,
                id: editingRow.id,
                name: codeObj.name || r.name,
                unit: codeObj.unit || r.unit,
                defaultRate: codeObj.defaultRate ?? r.defaultRate,
                customerRate: parseFloat(form.customerRate) || r.customerRate,
                customerRatePerMile:
                  parseFloat(form.customerRatePerMile) ||
                  r.customerRatePerMile ||
                  "",
                status: "Active",
              }
            : r,
        ),
      );
    } else {
      setRates([
        ...rates,
        {
          ...form,
          id: Date.now(),
          name: codeObj.name || "",
          unit: codeObj.unit || "",
          defaultRate: codeObj.defaultRate || 0,
          defaultRatePerMile: codeObj.defaultRatePerMile || "",
          customerRate: parseFloat(form.customerRate) || 0,
          customerRatePerMile: parseFloat(form.customerRatePerMile) || "",
          status: "Active",
        },
      ]);
    }
    setSheetOpen(false);
  };

  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="w-44">
            <div className="px-2 py-1.5 border-b mb-1">
              <p className="font-medium text-sm">{row.original.customer}</p>
              <p className="text-xs text-muted-foreground font-mono">
                {row.original.code} — {row.original.name}
              </p>
            </div>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => openEdit(row.original)}
            >
              <PencilIcon className="h-4 w-4 mr-2" /> Edit Rate
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleToggleStatus(row.original.id)}
            >
              <PowerIcon className="h-4 w-4 mr-2" />
              {row.original.status === "Active" ? "Set Inactive" : "Set Active"}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:text-red-600"
              onClick={() => handleDelete(row.original.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" /> Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...(!customerName
      ? [
          {
            accessorKey: "customer",
            header: ({ column }) => (
              <DataTableColumnHeader column={column} title="Customer" />
            ),
            enableSorting: true,
          },
        ]
      : []),
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      size: 75,
      cell: ({ row }) => (
        <span className="font-mono text-sm bg-blue-500/10 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded">
          {row.getValue("code")}
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Accessorial" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "customerRate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Flat Rate" />
      ),
      size: 100,
      cell: ({ row }) => {
        const rate = row.getValue("customerRate");
        const ratePerMile = row.original.customerRatePerMile;
        return (
          <span className="font-semibold">
            ${rate} {Number(rate) === 0 && !ratePerMile ? "Variable" : ""}
          </span>
        );
      },
    },
    {
      accessorKey: "customerRatePerMile",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rate Per Mile" />
      ),
      size: 120,
      cell: ({ row }) => {
        const ratePerMile = row.getValue("customerRatePerMile");
        const chargeType = row.original.chargeType || "";
        const isMileage =
          chargeType.includes("Mile") ||
          chargeType.includes("OOR") ||
          chargeType === "Flat + OOR Miles";

        if (!isMileage || !ratePerMile) {
          return <span className="text-muted-foreground">—</span>;
        }

        return (
          <span className="text-sm font-medium text-muted-foreground">
            ${ratePerMile}/mi
          </span>
        );
      },
    },
    {
      accessorKey: "threshold",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Threshold Time" />
      ),
      size: 110,
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.getValue("threshold") || "—"}
        </span>
      ),
    },
    {
      accessorKey: "chargeDisplay",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Charge Display" />
      ),
      size: 160,
      cell: ({ row }) => {
        const display = row.getValue("chargeDisplay");
        return (
          <Badge
            className={
              display === "Itemized Separately"
                ? "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/50"
                : display === "Combined with Freight"
                  ? "bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/50"
                  : "bg-gray-500/10 text-gray-700 border border-gray-500/50"
            }
          >
            {display}
          </Badge>
        );
      },
    },
    {
      accessorKey: "billToCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Bill to code" />
      ),
      size: 140,
      cell: ({ row }) => {
        const code = row.getValue("billToCode");
        return (
          <Badge
            className={
              code === "Same as Freight"
                ? "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/50"
                : code === "Separate Code"
                  ? "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/50"
                  : "bg-gray-500/10 text-gray-700 border border-gray-500/50"
            }
          >
            {code}
          </Badge>
        );
      },
    },
    {
      accessorKey: "invoiceMethod",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Invoice Method" />
      ),
      size: 180,
      cell: ({ row }) => {
        const method = row.getValue("invoiceMethod");
        return (
          <Badge
            className={
              method === "Include on Freight Invoice"
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50"
                : method === "Separate Accessorial Invoice"
                  ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/50"
                  : "bg-gray-500/10 text-gray-700 border border-gray-500/50"
            }
          >
            {method}
          </Badge>
        );
      },
    },
    {
      accessorKey: "effectiveDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Effective Date" />
      ),
      size: 130,
      cell: ({ row }) =>
        new Date(row.getValue("effectiveDate")).toLocaleDateString(),
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      size: 100,
      cell: ({ row }) => (
        <Badge
          className={
            row.getValue("status") === "Active"
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50"
              : "bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/50"
          }
        >
          {row.getValue("status")}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SmartFilter
          filterGroups={filterGroups}
          onFiltersChange={handleFiltersChange}
        />

        <Button
          onClick={openAdd}
          className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          <PlusIcon className="size-4 mr-2" /> Add Rate
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={displayedRates}
        showViewOptions={false}
      />

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-lg font-bold text-foreground">
              {editingRow ? "Edit Customer Rate" : "Add Customer Rate"}
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-5 mt-4 px-6">
            {/* Accessorial Code */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Accessorial Code <span className="text-red-500">*</span>
              </Label>
              <Select
                value={form.code}
                onValueChange={(v) => {
                  const codeObj = accessorialCodes.find((c) => c.code === v);
                  setForm((prev) => ({
                    ...prev,
                    code: v,
                    chargeType: codeObj?.chargeType || "",
                    driverPaid: codeObj?.driverPaid ?? false,
                    driverPayMethod: codeObj?.driverPayMethod || "none",
                    driverPayAmount: codeObj?.driverPayAmount || null,
                    approvalTier: codeObj?.approvalTier || "",
                  }));
                }}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select code" />
                </SelectTrigger>
                <SelectContent>
                  {accessorialCodes.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      <span className="font-mono mr-2">{c.code}</span> —{" "}
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Charge Type | Driver Paid | Driver Pay Method — auto-populated from master data */}
            {form.code && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Charge Structure
                    </Label>
                    <Input
                      value={form.chargeType}
                      disabled
                      className="h-10 bg-muted cursor-default"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Driver Paid</Label>
                    <Select value={form.driverPaid ? "yes" : "no"} disabled>
                      <SelectTrigger className="h-10 w-full bg-muted cursor-default">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Driver Pay Method
                    </Label>
                    <Input
                      value={getDriverPayDisplay(
                        form.driverPayMethod,
                        form.driverPayAmount,
                      )}
                      disabled
                      className="h-10 bg-muted cursor-default"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Approval Tier</Label>
                    <Input
                      value={getTierLabel(form.approvalTier)}
                      disabled
                      className="h-10 bg-muted cursor-default"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Rate + Effective Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  {form.chargeType?.includes("Flat")
                    ? "Flat Rate ($)"
                    : "Rate ($)"}{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  value={form.customerRate}
                  onChange={(e) =>
                    setForm({ ...form, customerRate: e.target.value })
                  }
                  placeholder="0.00"
                  className="h-10"
                />
              </div>

              {(form.chargeType?.includes("Mile") ||
                form.chargeType?.includes("OOR") ||
                form.chargeType === "Flat + OOR Miles") && (
                <div className="space-y-2 border-l-2 border-slate-200 dark:border-slate-800 pl-4 py-1 col-span-2 sm:col-span-1">
                  <Label className="text-sm font-medium">Rate Per Mile</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={form.customerRatePerMile}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          customerRatePerMile: e.target.value,
                        })
                      }
                      className="h-10 pl-7"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      / mi
                    </span>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Effective Date</Label>
                <Input
                  type="date"
                  value={form.effectiveDate}
                  onChange={(e) =>
                    setForm({ ...form, effectiveDate: e.target.value })
                  }
                  className="h-10"
                />
              </div>
            </div>

            {/* Threshold */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Threshold Time</Label>
              <Input
                value={form.threshold}
                onChange={(e) =>
                  setForm({ ...form, threshold: e.target.value })
                }
                placeholder="e.g. 2 hrs, 30 min (leave blank if N/A)"
                className="h-10"
              />
              <p className="text-xs text-muted-foreground">
                Customer-specific free time before charge applies (e.g.
                detention hours).
              </p>
            </div>

            {/* Billing Preferences */}
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-semibold">Billing Preferences</p>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Charge Display</Label>
                <Select
                  value={form.chargeDisplay}
                  onValueChange={(v) => setForm({ ...form, chargeDisplay: v })}
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="Itemized Separately"
                      className="font-medium"
                    >
                      Itemized Separately
                    </SelectItem>
                    <SelectItem
                      value="Combined with Freight"
                      className="font-medium"
                    >
                      Combined with Freight
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Bill-To Code</Label>
                <Select
                  value={form.billToCode}
                  onValueChange={(v) => setForm({ ...form, billToCode: v })}
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Same as Freight">
                      Same as Freight
                    </SelectItem>
                    <SelectItem value="Separate Code">Separate Code</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Invoice Method</Label>
                <Select
                  value={form.invoiceMethod}
                  onValueChange={(v) => setForm({ ...form, invoiceMethod: v })}
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="Include on Freight Invoice"
                      className="font-medium"
                    >
                      Include on Freight Invoice
                    </SelectItem>
                    <SelectItem
                      value="Separate Accessorial Invoice"
                      className="font-medium"
                    >
                      Separate Accessorial Invoice
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t -mx-6 px-6">
              <Button
                variant="outline"
                className="flex-1 h-10"
                onClick={() => setSheetOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                onClick={handleSave}
                disabled={
                  (!customerName && !form.customer) ||
                  !form.code ||
                  !form.customerRate
                }
              >
                {editingRow ? "Save Changes" : "Add Rate"}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CustomerRateCard;
