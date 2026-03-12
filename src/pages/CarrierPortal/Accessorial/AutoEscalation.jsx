import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  PlusIcon,
  MoreHorizontalIcon,
  ShieldAlertIcon,
  BellIcon,
  ClockIcon,
  TrendingUpIcon,
  CheckCircle2Icon,
} from "lucide-react";

const escalationRules = [
  { id: 1, trigger: "Amount Threshold", condition: "Charge amount > $500", escalateTo: "VP of Operations", notifyMethod: "Email + SMS", action: "Require VP approval before sending to customer", active: true },
  { id: 2, trigger: "SLA Breach", condition: "Customer not responded in 48hrs", escalateTo: "Dispatch Manager", notifyMethod: "Email", action: "Escalate to internal manager for follow-up", active: true },
  { id: 3, trigger: "Detention Auto (Tier 1)", condition: "GPS-triggered DET charge", escalateTo: "Customer (auto)", notifyMethod: "Portal + Email", action: "Auto-send warning at threshold -1hr; invoice on exit", active: true },
  { id: 4, trigger: "Repeated Dispute", condition: "Same customer disputes 3+ charges/month", escalateTo: "VP of Sales", notifyMethod: "Email", action: "Flag account for contract review", active: true },
  { id: 5, trigger: "Overweight Permit", condition: "OVW or PRM charge flagged", escalateTo: "Compliance Team", notifyMethod: "Email", action: "Compliance team review before billing", active: false },
];

const recentEscalations = [
  { id: 1, loadId: "LD-2026-0412", customer: "Titan", code: "DET", charge: "Detention", amount: 680, trigger: "Amount Threshold", escalatedTo: "VP of Operations", escalatedAt: "2026-03-07 14:22", status: "Pending VP Approval" },
  { id: 2, loadId: "LD-2026-0408", customer: "TQL", code: "STP", charge: "Stop Off", amount: 200, trigger: "SLA Breach", escalatedTo: "Dispatch Manager", escalatedAt: "2026-03-06 09:10", status: "Resolved" },
  { id: 3, loadId: "LD-2026-0401", customer: "Heidelberg", code: "DET", charge: "Detention", amount: 255, trigger: "SLA Breach", escalatedTo: "Dispatch Manager", escalatedAt: "2026-03-04 16:45", status: "Resolved" },
  { id: 4, loadId: "LD-2026-0395", customer: "Vulcan Materials", code: "OVW", charge: "Overweight", amount: 900, trigger: "Amount Threshold", escalatedTo: "VP of Operations", escalatedAt: "2026-03-02 11:30", status: "Approved" },
  { id: 5, loadId: "LD-2026-0388", customer: "Cemex", code: "TNU", charge: "TONU", amount: 750, trigger: "Amount Threshold", escalatedTo: "VP of Operations", escalatedAt: "2026-02-28 08:55", status: "Approved" },
];

const escalationStatusConfig = {
  "Pending VP Approval": "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/50",
  "Resolved": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50",
  "Approved": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50",
  "Pending": "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/50",
};

const summaryCards = [
  { label: "Active Rules", value: 4, icon: ShieldAlertIcon, color: "text-violet-600" },
  { label: "Escalated This Month", value: 5, icon: TrendingUpIcon, color: "text-amber-600" },
  { label: "Pending VP Approval", value: 1, icon: ClockIcon, color: "text-red-600" },
  { label: "Resolved", value: 4, icon: CheckCircle2Icon, color: "text-emerald-600" },
];

const AutoEscalation = () => {
  const [rules, setRules] = useState(escalationRules);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [newRule, setNewRule] = useState({ trigger: "", condition: "", escalateTo: "", notifyMethod: "Email", action: "", active: true });

  const toggleRule = (id) => setRules(rules.map((r) => r.id === id ? { ...r, active: !r.active } : r));

  const handleAddRule = () => {
    setRules([...rules, { ...newRule, id: Date.now() }]);
    setSheetOpen(false);
    setNewRule({ trigger: "", condition: "", escalateTo: "", notifyMethod: "Email", action: "", active: true });
  };

  const ruleColumns = [
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontalIcon className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Edit Rule</DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleRule(row.original.id)}>
              {row.original.active ? "Disable" : "Enable"}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete Rule</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "trigger",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Trigger" />,
      cell: ({ row }) => <span className="font-medium">{row.getValue("trigger")}</span>,
    },
    {
      accessorKey: "condition",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Condition" />,
      cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.getValue("condition")}</span>,
    },
    {
      accessorKey: "escalateTo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Escalate To" />,
      cell: ({ row }) => (
        <Badge className="bg-violet-500/10 text-violet-700 dark:text-violet-400 border border-violet-500/50">
          {row.getValue("escalateTo")}
        </Badge>
      ),
    },
    {
      accessorKey: "notifyMethod",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Notify Via" />,
      size: 130,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <BellIcon className="size-3 text-muted-foreground" />
          <span className="text-sm">{row.getValue("notifyMethod")}</span>
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Action" />,
      cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.getValue("action")}</span>,
    },
    {
      accessorKey: "active",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Active" />,
      size: 90,
      cell: ({ row }) => (
        <Switch
          checked={row.getValue("active")}
          onCheckedChange={() => toggleRule(row.original.id)}
        />
      ),
    },
  ];

  const historyColumns = [
    {
      accessorKey: "loadId",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Load #" />,
      size: 140,
      cell: ({ row }) => <span className="font-mono text-sm font-medium">{row.getValue("loadId")}</span>,
    },
    { accessorKey: "customer", header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" /> },
    {
      accessorKey: "code",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Code" />,
      size: 70,
      cell: ({ row }) => <span className="font-mono font-semibold text-sm">{row.getValue("code")}</span>,
    },
    { accessorKey: "charge", header: ({ column }) => <DataTableColumnHeader column={column} title="Charge" /> },
    {
      accessorKey: "amount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
      size: 100,
      cell: ({ row }) => <span className="font-semibold">${row.getValue("amount")}</span>,
    },
    {
      accessorKey: "trigger",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Trigger" />,
      cell: ({ row }) => (
        <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/50">
          {row.getValue("trigger")}
        </Badge>
      ),
    },
    { accessorKey: "escalatedTo", header: ({ column }) => <DataTableColumnHeader column={column} title="Escalated To" /> },
    {
      accessorKey: "escalatedAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Escalated At" />,
      size: 160,
      cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.getValue("escalatedAt")}</span>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      size: 160,
      cell: ({ row }) => (
        <Badge className={escalationStatusConfig[row.getValue("status")] || ""}>{row.getValue("status")}</Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">Automatic Escalation</h3>
          <p className="text-sm text-muted-foreground">Configure rules for automatic charge escalation based on amount thresholds, SLA breaches, and trigger types.</p>
        </div>
        <Button onClick={() => setSheetOpen(true)} className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
          <PlusIcon className="size-4 mr-2" /> Add Rule
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {summaryCards.map((s) => {
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

      {/* Key rule highlight */}
      <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
        <ShieldAlertIcon className="size-4 text-red-600 mt-0.5 shrink-0" />
        <div className="text-sm text-red-700 dark:text-red-400">
          <strong>Key Rule:</strong> Any charge exceeding <strong>$500</strong> automatically escalates to <strong>VP of Operations</strong> for approval before customer notification. SLA breach after <strong>48 hours</strong> escalates to Dispatch Manager.
        </div>
      </div>

      {/* Escalation Rules Table */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Escalation Rules</h4>
        <DataTable columns={ruleColumns} data={rules} showViewOptions={false} />
      </div>

      {/* Escalation History Table */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Escalation History</h4>
        <DataTable columns={historyColumns} data={recentEscalations} showViewOptions={false} />
      </div>

      {/* Add Rule Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldAlertIcon className="size-5" /> Add Escalation Rule
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-5 mt-4 px-6">
            <div className="space-y-1.5">
              <Label>Trigger Name</Label>
              <Input value={newRule.trigger} onChange={(e) => setNewRule({ ...newRule, trigger: e.target.value })} placeholder="e.g. Amount Threshold" />
            </div>
            <div className="space-y-1.5">
              <Label>Condition</Label>
              <Input value={newRule.condition} onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })} placeholder="e.g. Charge amount > $500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Escalate To</Label>
                <Select value={newRule.escalateTo} onValueChange={(v) => setNewRule({ ...newRule, escalateTo: v })}>
                  <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VP of Operations">VP of Operations</SelectItem>
                    <SelectItem value="VP of Sales">VP of Sales</SelectItem>
                    <SelectItem value="Dispatch Manager">Dispatch Manager</SelectItem>
                    <SelectItem value="Compliance Team">Compliance Team</SelectItem>
                    <SelectItem value="Customer (auto)">Customer (auto)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Notify Method</Label>
                <Select value={newRule.notifyMethod} onValueChange={(v) => setNewRule({ ...newRule, notifyMethod: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="SMS">SMS</SelectItem>
                    <SelectItem value="Email + SMS">Email + SMS</SelectItem>
                    <SelectItem value="Portal + Email">Portal + Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Action</Label>
              <Input value={newRule.action} onChange={(e) => setNewRule({ ...newRule, action: e.target.value })} placeholder="Describe what happens when this rule fires" />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={newRule.active} onCheckedChange={(v) => setNewRule({ ...newRule, active: v })} />
              <Label>Enable this rule</Label>
            </div>
          </div>

          <SheetFooter className="px-6 py-4 border-t mt-6">
            <Button variant="outline" onClick={() => setSheetOpen(false)}>Cancel</Button>
            <Button onClick={handleAddRule} className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">Add Rule</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AutoEscalation;
