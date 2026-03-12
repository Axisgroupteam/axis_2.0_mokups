import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
  AlertTriangleIcon,
  CircleDotIcon,
  MoreHorizontalIcon,
  BanknoteIcon,
  ShieldAlertIcon,
} from "lucide-react";

const statusConfig = {
  "Pending": { color: "bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/50", icon: ClockIcon },
  "Awaiting Customer Approval": { color: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/50", icon: ClockIcon },
  "Pending Dispatch Manager": { color: "bg-violet-500/10 text-violet-700 dark:text-violet-400 border border-violet-500/50", icon: CircleDotIcon },
  "Escalated — VP Approval": { color: "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/50", icon: ShieldAlertIcon },
  "Approved": { color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50", icon: CheckCircle2Icon },
  "Absorbed": { color: "bg-violet-500/10 text-violet-700 dark:text-violet-400 border border-violet-500/50", icon: CircleDotIcon },
  "Disputed": { color: "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/50", icon: XCircleIcon },
  "Waived": { color: "bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/50", icon: XCircleIcon },
  "Invoiced": { color: "bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/50", icon: CheckCircle2Icon },
};

const loadsData = [
  {
    id: "LD-2026-0412",
    customer: "Titan",
    driver: "James Harmon",
    totalCharges: 3,
    pendingCount: 1,
    awaitingCount: 1,
    approvedCount: 1,
    totalAmount: 361.50,
    billingStatus: "Blocked",
    charges: [
      { id: 1, code: "DET", name: "Detention", total: 255, status: "Awaiting Customer Approval" },
      { id: 2, code: "TOL", name: "Tolls", total: 18.5, status: "Approved" },
      { id: 3, code: "STP", name: "Stop Off", total: 88, status: "Pending" },
    ],
  },
  {
    id: "LD-2026-0411",
    customer: "Vulcan Materials",
    driver: "Maria Santos",
    totalCharges: 2,
    pendingCount: 0,
    awaitingCount: 0,
    approvedCount: 2,
    totalAmount: 175,
    billingStatus: "Ready",
    charges: [
      { id: 4, code: "EMP", name: "Empty Miles", total: 87.5, status: "Approved" },
      { id: 5, code: "PRM", name: "Permits", total: 87.5, status: "Approved" },
    ],
  },
  {
    id: "LD-2026-0408",
    customer: "TQL",
    driver: "Derek Cole",
    totalCharges: 4,
    pendingCount: 1,
    awaitingCount: 0,
    approvedCount: 2,
    totalAmount: 862,
    billingStatus: "Blocked",
    charges: [
      { id: 6, code: "STP", name: "Stop Off", total: 200, status: "Pending" },
      { id: 7, code: "TNU", name: "TONU", total: 450, status: "Absorbed" },
      { id: 8, code: "OOR", name: "Out of Route Miles", total: 112, status: "Approved" },
      { id: 9, code: "DET", name: "Detention", total: 100, status: "Approved" },
    ],
  },
  {
    id: "LD-2026-0405",
    customer: "Ashgrove",
    driver: "Tonya Reeves",
    totalCharges: 1,
    pendingCount: 0,
    awaitingCount: 0,
    approvedCount: 0,
    totalAmount: 90,
    billingStatus: "Invoiced",
    charges: [
      { id: 10, code: "DET", name: "Detention", total: 90, status: "Invoiced" },
    ],
  },
  {
    id: "LD-2026-0402",
    customer: "Heidelberg",
    driver: "Carl Whitman",
    totalCharges: 2,
    pendingCount: 0,
    awaitingCount: 0,
    approvedCount: 1,
    totalAmount: 325,
    billingStatus: "Disputed",
    charges: [
      { id: 11, code: "DET", name: "Detention", total: 255, status: "Disputed" },
      { id: 12, code: "TOL", name: "Tolls", total: 70, status: "Approved" },
    ],
  },
];

const summaryStats = [
  { label: "Ready to Invoice", value: 1, icon: CheckCircle2Icon, color: "text-emerald-600" },
  { label: "Blocked — Pending", value: 2, icon: AlertTriangleIcon, color: "text-amber-600" },
  { label: "Disputed", value: 1, icon: XCircleIcon, color: "text-red-600" },
  { label: "Invoiced (Month)", value: 1, icon: BanknoteIcon, color: "text-blue-600" },
];

const BillingIntegration = () => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);

  const openDetail = (load) => { setSelectedLoad(load); setDetailOpen(true); };

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
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => openDetail(row.original)}>View Charges</DropdownMenuItem>
            {row.original.billingStatus === "Ready" && (
              <DropdownMenuItem className="text-emerald-600">Send to Invoice</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Load #" />,
      size: 140,
      cell: ({ row }) => (
        <button className="font-mono font-medium text-sm hover:underline" onClick={() => openDetail(row.original)}>
          {row.getValue("id")}
        </button>
      ),
    },
    {
      accessorKey: "customer",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    },
    {
      accessorKey: "driver",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Driver" />,
    },
    {
      accessorKey: "totalCharges",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Charges" />,
      size: 90,
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <span className="font-semibold">{row.getValue("totalCharges")}</span>
          {row.original.pendingCount > 0 && (
            <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/50 text-xs">
              {row.original.pendingCount} open
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "totalAmount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
      size: 100,
      cell: ({ row }) => <span className="font-semibold">${row.getValue("totalAmount").toFixed(2)}</span>,
    },
    {
      accessorKey: "billingStatus",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Billing Status" />,
      size: 140,
      cell: ({ row }) => {
        const status = row.getValue("billingStatus");
        const colorMap = {
          "Ready": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50",
          "Blocked": "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/50",
          "Invoiced": "bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/50",
          "Disputed": "bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/50",
        };
        return <Badge className={colorMap[status] || ""}>{status}</Badge>;
      },
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-semibold">Billing Integration</h3>
        <p className="text-sm text-muted-foreground">
          Loads cannot proceed to billing if any charge is in <strong>Pending</strong> or <strong>Awaiting Customer Approval</strong> status.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {summaryStats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="shadow-none">
              <CardHeader className="pb-1 pt-4 px-4">
                <CardTitle className="text-xs font-medium text-muted-foreground">{s.label}</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="flex items-center gap-2">
                  <Icon className={`size-5 ${s.color}`} />
                  <span className="text-2xl font-bold">{s.value}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Billing Rule Banner */}
      <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
        <ShieldAlertIcon className="size-4 text-blue-600 mt-0.5 shrink-0" />
        <div className="text-sm text-blue-700 dark:text-blue-400">
          <strong>Billing Validation Rule:</strong> System checks all charges with status <code className="bg-blue-100 dark:bg-blue-900/50 px-1 rounded text-xs">pending</code> or <code className="bg-blue-100 dark:bg-blue-900/50 px-1 rounded text-xs">awaiting_customer</code> before invoicing. Any open charge blocks the load.
        </div>
      </div>

      <DataTable columns={columns} data={loadsData} showViewOptions={false} />

      {/* Charge Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Charges — {selectedLoad?.id} ({selectedLoad?.customer})
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-2">
            {selectedLoad?.charges.map((c) => {
              const cfg = statusConfig[c.status] || {};
              const Icon = cfg.icon || ClockIcon;
              return (
                <div key={c.id} className="flex items-center justify-between px-3 py-2.5 rounded-lg border bg-muted/40">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold w-8">{c.code}</span>
                    <span className="text-sm">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm">${c.total.toFixed(2)}</span>
                    <Badge className={cfg.color || ""}>{c.status}</Badge>
                  </div>
                </div>
              );
            })}
            {selectedLoad?.billingStatus === "Blocked" && (
              <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
                <XCircleIcon className="size-4 shrink-0" />
                Resolve all pending accessorial charges before invoicing.
              </div>
            )}
            {selectedLoad?.billingStatus === "Ready" && (
              <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-sm text-emerald-700 dark:text-emerald-400">
                <CheckCircle2Icon className="size-4 shrink-0" />
                All charges resolved — load is ready to invoice.
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailOpen(false)}>Close</Button>
            {selectedLoad?.billingStatus === "Ready" && (
              <Button className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
                Send to Invoice
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BillingIntegration;
