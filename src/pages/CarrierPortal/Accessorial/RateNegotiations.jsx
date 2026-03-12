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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, MoreHorizontalIcon, HandshakeIcon } from "lucide-react";

const customers = ["Titan", "Ashgrove", "TQL", "Martin Marietta", "Vulcan Materials", "Heidelberg", "Cemex", "Holcim"];
const accessorialCodes = [
  { code: "DET", name: "Detention" }, { code: "LAY", name: "Layover" }, { code: "STP", name: "Stop Off" },
  { code: "DIV", name: "Diversion" }, { code: "TNU", name: "TONU" }, { code: "DRV", name: "Driver Assist" },
  { code: "TRP", name: "Tarping" }, { code: "HAZ", name: "Hazmat" }, { code: "OOR", name: "Out of Route Miles" },
  { code: "EMP", name: "Empty Miles" }, { code: "RDL", name: "Re-delivery" }, { code: "OVW", name: "Overweight" },
];

const defaultNegotiations = [
  { id: 1, customer: "Acme Corporation", code: "DET", name: "Detention", currentRate: 85, requestedRate: 95, counterRate: null, approvedRate: null, status: "Pending", date: "2026-03-01", negotiatedBy: "Sarah Kim", notes: "Customer agreed in principle, awaiting sign-off" },
  { id: 2, customer: "Acme Corporation", code: "LAY", name: "Layover", currentRate: 400, requestedRate: 450, counterRate: 425, approvedRate: null, status: "Counter-offered", date: "2026-03-05", negotiatedBy: "Tom Rivera", notes: "Counter-offered $425/day, pending approval" },
  { id: 3, customer: "Acme Corporation", code: "TNU", name: "TONU", currentRate: 475, requestedRate: 500, counterRate: null, approvedRate: 500, status: "Approved", date: "2026-01-20", negotiatedBy: "Dana Moore", notes: "" },
  { id: 4, customer: "Titan", code: "DET", name: "Detention", currentRate: 85, requestedRate: 95, counterRate: null, approvedRate: null, status: "Pending", date: "2026-03-01", negotiatedBy: "Sarah Kim", notes: "Customer agreed in principle, awaiting sign-off" },
  { id: 5, customer: "Ashgrove", code: "DET", name: "Detention", currentRate: 70, requestedRate: 80, counterRate: 75, approvedRate: 75, status: "Approved", date: "2026-02-15", negotiatedBy: "Tom Rivera", notes: "Agreed on $75/hr effective March 1" },
  { id: 6, customer: "TQL", code: "OOR", name: "Out of Route Miles", currentRate: 2.25, requestedRate: 2.75, counterRate: null, approvedRate: null, status: "Rejected", date: "2026-02-10", negotiatedBy: "Dana Moore", notes: "Customer declined — contract rate applies" },
];

const statusConfig = {
  "Pending": "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/50",
  "Approved": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50",
  "Rejected": "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/50",
  "Counter-offered": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/50",
};

const emptyForm = { customer: "", code: "", requestedRate: "", notes: "", negotiatedBy: "" };

const RateNegotiations = ({ customerName }) => {
  const [negotiations, setNegotiations] = useState(defaultNegotiations);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const displayedNegotiations = customerName
    ? negotiations.filter((n) => n.customer === customerName)
    : negotiations;

  const openAdd = () => {
    setEditingRow(null);
    setForm({ ...emptyForm, customer: customerName || "" });
    setSheetOpen(true);
  };
  const openDetail = (row) => { setEditingRow(row); setDetailOpen(true); };

  const handleSave = () => {
    const codeObj = accessorialCodes.find((c) => c.code === form.code) || {};
    setNegotiations([
      ...negotiations,
      {
        id: Date.now(),
        customer: customerName || form.customer,
        code: form.code,
        name: codeObj.name || "",
        currentRate: 0,
        requestedRate: parseFloat(form.requestedRate) || 0,
        counterRate: null,
        approvedRate: null,
        status: "Pending",
        date: new Date().toISOString().split("T")[0],
        negotiatedBy: form.negotiatedBy,
        notes: form.notes,
      },
    ]);
    setSheetOpen(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setNegotiations(negotiations.map((n) => n.id === id ? { ...n, status: newStatus, approvedRate: newStatus === "Approved" ? n.requestedRate : n.approvedRate } : n));
    setDetailOpen(false);
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
            <DropdownMenuItem onClick={() => openDetail(row.original)}>View Details</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange(row.original.id, "Approved")}>Approve</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange(row.original.id, "Rejected")} className="text-red-600">Reject</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
    },
    ...(!customerName ? [{
      accessorKey: "customer",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
      enableSorting: true,
    }] : []),
    {
      accessorKey: "code",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Code" />,
      size: 75,
      cell: ({ row }) => <span className="font-mono font-semibold text-sm">{row.getValue("code")}</span>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Accessorial" />,
    },
    {
      accessorKey: "currentRate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Current Rate" />,
      size: 120,
      cell: ({ row }) => <span className="text-muted-foreground">${row.getValue("currentRate")}</span>,
    },
    {
      accessorKey: "requestedRate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Requested Rate" />,
      size: 130,
      cell: ({ row }) => <span className="font-semibold">${row.getValue("requestedRate")}</span>,
    },
    {
      accessorKey: "counterRate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Counter Rate" />,
      size: 120,
      cell: ({ row }) => row.getValue("counterRate") ? <span className="text-blue-600 font-medium">${row.getValue("counterRate")}</span> : <span className="text-muted-foreground text-xs">—</span>,
    },
    {
      accessorKey: "approvedRate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Approved Rate" />,
      size: 120,
      cell: ({ row }) => row.getValue("approvedRate") ? <span className="text-emerald-600 font-semibold">${row.getValue("approvedRate")}</span> : <span className="text-muted-foreground text-xs">—</span>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      size: 130,
      cell: ({ row }) => (
        <Badge className={statusConfig[row.getValue("status")] || ""}>{row.getValue("status")}</Badge>
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
      size: 110,
      cell: ({ row }) => new Date(row.getValue("date")).toLocaleDateString(),
      enableSorting: true,
    },
    {
      accessorKey: "negotiatedBy",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Negotiated By" />,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">Customer Rate Negotiations</h3>
          <p className="text-sm text-muted-foreground">Track and manage customer-initiated accessorial rate negotiation requests.</p>
        </div>
        <Button onClick={openAdd} className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
          <PlusIcon className="size-4 mr-2" /> New Negotiation
        </Button>
      </div>

      <DataTable columns={columns} data={displayedNegotiations} showViewOptions={false} />

      {/* Add Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              <HandshakeIcon className="size-5" /> New Rate Negotiation
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-5 mt-4 px-6">
            {!customerName && (
              <div className="space-y-1.5">
                <Label>Customer</Label>
                <Select value={form.customer} onValueChange={(v) => setForm({ ...form, customer: v })}>
                  <SelectTrigger><SelectValue placeholder="Select customer" /></SelectTrigger>
                  <SelectContent>{customers.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-1.5">
              <Label>Accessorial Code</Label>
              <Select value={form.code} onValueChange={(v) => setForm({ ...form, code: v })}>
                <SelectTrigger><SelectValue placeholder="Select code" /></SelectTrigger>
                <SelectContent>
                  {accessorialCodes.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      <span className="font-mono mr-2">{c.code}</span> — {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Requested Rate ($)</Label>
                <Input type="number" value={form.requestedRate} onChange={(e) => setForm({ ...form, requestedRate: e.target.value })} placeholder="0.00" />
              </div>
              <div className="space-y-1.5">
                <Label>Negotiated By</Label>
                <Input value={form.negotiatedBy} onChange={(e) => setForm({ ...form, negotiatedBy: e.target.value })} placeholder="Your name" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Notes</Label>
              <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Context, terms, or conditions..." rows={3} />
            </div>
          </div>

          <SheetFooter className="px-6 py-4 border-t mt-6">
            <Button variant="outline" onClick={() => setSheetOpen(false)}>Cancel</Button>
            <Button
              onClick={handleSave}
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              disabled={(!customerName && !form.customer) || !form.code || !form.requestedRate}
            >
              Submit
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Negotiation Detail</DialogTitle>
          </DialogHeader>
          {editingRow && (
            <div className="space-y-3 py-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Customer</span><p className="font-medium">{editingRow.customer}</p></div>
                <div><span className="text-muted-foreground">Code</span><p className="font-mono font-semibold">{editingRow.code} — {editingRow.name}</p></div>
                <div><span className="text-muted-foreground">Current Rate</span><p className="font-medium">${editingRow.currentRate}</p></div>
                <div><span className="text-muted-foreground">Requested Rate</span><p className="font-semibold">${editingRow.requestedRate}</p></div>
                {editingRow.counterRate && <div><span className="text-muted-foreground">Counter Rate</span><p className="font-medium text-blue-600">${editingRow.counterRate}</p></div>}
                {editingRow.approvedRate && <div><span className="text-muted-foreground">Approved Rate</span><p className="font-semibold text-emerald-600">${editingRow.approvedRate}</p></div>}
                <div><span className="text-muted-foreground">Status</span><p><Badge className={statusConfig[editingRow.status] || ""}>{editingRow.status}</Badge></p></div>
                <div><span className="text-muted-foreground">Negotiated By</span><p className="font-medium">{editingRow.negotiatedBy}</p></div>
              </div>
              {editingRow.notes && (
                <div className="px-3 py-2 bg-muted rounded-md text-muted-foreground">{editingRow.notes}</div>
              )}
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDetailOpen(false)}>Close</Button>
            {editingRow?.status === "Pending" || editingRow?.status === "Counter-offered" ? (
              <>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50" onClick={() => handleStatusChange(editingRow.id, "Rejected")}>Reject</Button>
                <Button className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90" onClick={() => handleStatusChange(editingRow.id, "Approved")}>Approve</Button>
              </>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RateNegotiations;
