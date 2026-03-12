import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
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
import { Switch } from "@/components/ui/switch";
import { PlusIcon, MoreHorizontalIcon, AlertTriangleIcon, TruckIcon, PaperclipIcon } from "lucide-react";

const accessorialOptions = [
  { code: "DET", name: "Detention", rate: 85, unit: "/ hr" },
  { code: "LAY", name: "Layover", rate: 400, unit: "/ day" },
  { code: "STP", name: "Stop Off", rate: 100, unit: "flat" },
  { code: "DIV", name: "Diversion", rate: 150, unit: "flat" },
  { code: "TNU", name: "TONU", rate: 450, unit: "flat" },
  { code: "DRV", name: "Driver Assist", rate: 75, unit: "flat" },
  { code: "TRP", name: "Tarping", rate: 50, unit: "flat" },
  { code: "HAZ", name: "Hazmat", rate: 200, unit: "flat" },
  { code: "TOL", name: "Tolls", rate: 0, unit: "pass-thru" },
  { code: "OVW", name: "Overweight", rate: 250, unit: "variable" },
  { code: "OOR", name: "Out of Route Miles", rate: 2.25, unit: "/ mi" },
  { code: "RDL", name: "Re-delivery", rate: 125, unit: "flat" },
  { code: "PRM", name: "Permits", rate: 0, unit: "pass-thru" },
  { code: "EMP", name: "Empty Miles", rate: 1.75, unit: "/ mi" },
];

const absorptionReasons = [
  "Driver error",
  "Operations error",
  "Customer goodwill / relationship",
  "Operational decision",
  "Pricing already accounted for it",
  "Dispute avoidance",
  "Other — requires a note",
];

const mockLoads = [
  { id: "LD-2026-0412", customer: "Titan", driver: "James Harmon", origin: "Atlanta, GA", destination: "Nashville, TN", hasPending: true },
  { id: "LD-2026-0411", customer: "Vulcan Materials", driver: "Maria Santos", origin: "Birmingham, AL", destination: "Memphis, TN", hasPending: false },
  { id: "LD-2026-0408", customer: "TQL", driver: "Derek Cole", origin: "Charlotte, NC", destination: "Richmond, VA", hasPending: true },
];

const defaultCharges = [
  { id: 1, loadId: "LD-2026-0412", code: "DET", name: "Detention", disposition: "Bill Customer", amount: 85, quantity: 3, total: 255, notes: "Driver waited 3hrs at shipper", driverPay: "$127.50", status: "Awaiting Customer Approval", triggerType: "auto" },
  { id: 2, loadId: "LD-2026-0412", code: "TOL", name: "Tolls", disposition: "Bill Customer", amount: 18.5, quantity: 1, total: 18.5, notes: "I-75 tolls EFS", driverPay: "No pay", status: "Approved", triggerType: "auto" },
  { id: 3, loadId: "LD-2026-0408", code: "STP", name: "Stop Off", disposition: "Bill Customer", amount: 100, quantity: 2, total: 200, notes: "2 extra stops added by customer", driverPay: "$100", status: "Pending", triggerType: "manual" },
  { id: 4, loadId: "LD-2026-0408", code: "TNU", name: "TONU", disposition: "Absorb", amount: 450, quantity: 1, total: 450, notes: "Customer canceled last minute", driverPay: "$337.50", status: "Absorbed", triggerType: "manual", absorptionReason: "Customer goodwill / relationship" },
];

const statusConfig = {
  "Pending": "bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/50",
  "Awaiting Customer Approval": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/50",
  "Pending Dispatch Manager": "bg-violet-500/10 text-violet-700 dark:text-violet-400 border border-violet-500/50",
  "Escalated — VP Approval": "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/50",
  "Approved": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50",
  "Absorbed": "bg-violet-500/10 text-violet-700 dark:text-violet-400 border border-violet-500/50",
  "Disputed": "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/50",
  "Waived": "bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/50",
  "Invoiced": "bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/50",
};

const emptyForm = {
  loadId: "",
  code: "",
  disposition: "Bill Customer",
  absorptionReason: "",
  amount: "",
  quantity: "1",
  notes: "",
  driverPay: "",
};

const AssignToLoads = () => {
  const [selectedLoad, setSelectedLoad] = useState("All");
  const [charges, setCharges] = useState(defaultCharges);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const displayed = selectedLoad === "All" ? charges : charges.filter((c) => c.loadId === selectedLoad);

  const selectedCode = accessorialOptions.find((a) => a.code === form.code);
  const ratePreview = selectedCode ? `$${selectedCode.rate} ${selectedCode.unit}` : "—";
  const driverPayInfo = selectedCode
    ? form.disposition === "Absorb"
      ? "Company absorbs — driver pay per standard rule"
      : form.code === "HAZ" || form.code === "TOL" || form.code === "PRM" || form.code === "OVW"
        ? "No pay"
        : "Auto-calculated from rule"
    : "—";

  const openAdd = () => { setForm(emptyForm); setSheetOpen(true); };

  const handleSave = () => {
    const codeObj = accessorialOptions.find((a) => a.code === form.code) || {};
    const qty = parseFloat(form.quantity) || 1;
    const amt = parseFloat(form.amount) || codeObj.rate || 0;
    setCharges([
      ...charges,
      {
        id: Date.now(),
        loadId: form.loadId || selectedLoad,
        code: form.code,
        name: codeObj.name || "",
        disposition: form.disposition,
        amount: amt,
        quantity: qty,
        total: amt * qty,
        notes: form.notes,
        driverPay: driverPayInfo,
        status: "Pending",
        triggerType: "manual",
        absorptionReason: form.absorptionReason,
      },
    ]);
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
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Send for Approval</DropdownMenuItem>
            <DropdownMenuItem>Waive</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "loadId",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Load #" />,
      size: 130,
      cell: ({ row }) => <span className="font-mono text-sm font-medium">{row.getValue("loadId")}</span>,
    },
    {
      accessorKey: "code",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Code" />,
      size: 75,
      cell: ({ row }) => <span className="font-mono font-semibold text-sm">{row.getValue("code")}</span>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Charge" />,
    },
    {
      accessorKey: "triggerType",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Source" />,
      size: 90,
      cell: ({ row }) => (
        <Badge
          className={
            row.getValue("triggerType") === "auto"
              ? "bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/50"
              : "bg-gray-500/10 text-gray-600 dark:text-gray-400 border border-gray-500/50"
          }
        >
          {row.getValue("triggerType") === "auto" ? "Auto" : "Manual"}
        </Badge>
      ),
    },
    {
      accessorKey: "disposition",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Disposition" />,
      size: 120,
      cell: ({ row }) => (
        <Badge
          className={
            row.getValue("disposition") === "Bill Customer"
              ? "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/50"
              : "bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/50"
          }
        >
          {row.getValue("disposition")}
        </Badge>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Rate" />,
      size: 90,
      cell: ({ row }) => `$${row.getValue("amount")}`,
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Qty" />,
      size: 70,
    },
    {
      accessorKey: "total",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
      size: 90,
      cell: ({ row }) => <span className="font-semibold">${row.getValue("total").toFixed(2)}</span>,
    },
    {
      accessorKey: "driverPay",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Driver Pay" />,
      size: 130,
      cell: ({ row }) => <span className="text-muted-foreground text-sm">{row.getValue("driverPay")}</span>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      size: 180,
      cell: ({ row }) => (
        <Badge className={statusConfig[row.getValue("status")] || ""}>
          {row.getValue("status")}
        </Badge>
      ),
    },
  ];

  const pendingLoads = mockLoads.filter((l) => l.hasPending);

  return (
    <div className="space-y-4">
      {/* Pending banner */}
      {pendingLoads.length > 0 && (
        <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <AlertTriangleIcon className="size-4 text-amber-600 mt-0.5 shrink-0" />
          <div className="text-sm text-amber-700 dark:text-amber-400">
            <span className="font-semibold">{pendingLoads.length} load{pendingLoads.length > 1 ? "s" : ""} with unresolved charges</span>
            {" — "}{pendingLoads.map((l) => l.id).join(", ")} cannot proceed to billing until all charges are resolved.
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">Assign Accessorials to Loads / Orders</h3>
          <p className="text-sm text-muted-foreground">View, add, and manage accessorial charges per load.</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedLoad} onValueChange={setSelectedLoad}>
            <SelectTrigger className="w-52">
              <TruckIcon className="size-3.5 mr-2 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Loads</SelectItem>
              {mockLoads.map((l) => (
                <SelectItem key={l.id} value={l.id}>
                  {l.id} — {l.customer}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={openAdd} className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
            <PlusIcon className="size-4 mr-2" /> Add Charge
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={displayed} showViewOptions={false} />

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-lg font-bold text-foreground">Add Accessorial Charge</SheetTitle>
          </SheetHeader>

          <div className="space-y-5 mt-4 px-6">
            <div className="space-y-1.5">
              <Label>Load #</Label>
              <Select value={form.loadId} onValueChange={(v) => setForm({ ...form, loadId: v })}>
                <SelectTrigger><SelectValue placeholder="Select load" /></SelectTrigger>
                <SelectContent>
                  {mockLoads.map((l) => (
                    <SelectItem key={l.id} value={l.id}>{l.id} — {l.customer}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Accessorial Type</Label>
              <Select value={form.code} onValueChange={(v) => setForm({ ...form, code: v })}>
                <SelectTrigger><SelectValue placeholder="Select charge type" /></SelectTrigger>
                <SelectContent>
                  {accessorialOptions.map((a) => (
                    <SelectItem key={a.code} value={a.code}>
                      <span className="font-mono mr-2">{a.code}</span> — {a.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {form.code && (
              <div className="px-3 py-2 rounded-md bg-muted text-sm flex justify-between">
                <span className="text-muted-foreground">Rate Preview</span>
                <span className="font-semibold">{ratePreview}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label>Disposition</Label>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${form.disposition === "Bill Customer" ? "" : "text-muted-foreground"}`}>Bill to Customer</span>
                <Switch
                  checked={form.disposition === "Absorb"}
                  onCheckedChange={(v) => setForm({ ...form, disposition: v ? "Absorb" : "Bill Customer", absorptionReason: "" })}
                />
                <span className={`text-sm font-medium ${form.disposition === "Absorb" ? "text-orange-600" : "text-muted-foreground"}`}>Absorb (Eat Cost)</span>
              </div>
            </div>

            {form.disposition === "Absorb" && (
              <div className="space-y-1.5">
                <Label>Absorption Reason <span className="text-red-500">*</span></Label>
                <Select value={form.absorptionReason} onValueChange={(v) => setForm({ ...form, absorptionReason: v })}>
                  <SelectTrigger><SelectValue placeholder="Select reason" /></SelectTrigger>
                  <SelectContent>
                    {absorptionReasons.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Amount ($)</Label>
                <Input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder={selectedCode ? String(selectedCode.rate) : "0.00"}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Quantity (hrs / mi / days)</Label>
                <Input
                  type="number"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  placeholder="1"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Notes</Label>
              <Textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Add context, reason, or documentation..."
                rows={2}
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground border rounded-md px-3 py-2">
              <PaperclipIcon className="size-4 shrink-0" />
              <span>Attachments — BOL, receipt, photo, permit (upload in production)</span>
            </div>

            {form.code && (
              <div className="px-3 py-2 rounded-md bg-muted text-sm flex justify-between">
                <span className="text-muted-foreground">Driver Pay (read-only)</span>
                <span className="font-medium text-muted-foreground">{driverPayInfo}</span>
              </div>
            )}
          </div>

          <SheetFooter className="px-6 py-4 border-t mt-6">
            <Button variant="outline" onClick={() => setSheetOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
              Add Charge
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AssignToLoads;
