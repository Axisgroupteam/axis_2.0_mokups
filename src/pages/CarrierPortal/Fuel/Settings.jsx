import { useState, useCallback } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SmartFilter from "@/components/SmartFilter";
import {
  Settings2,
  Link2,
  Bell,
  Shield,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Trash2,
  PencilIcon,
  PlusIcon,
  AlertTriangle,
  Clock,
  DollarSign,
  Fuel,
  CreditCard,
  MapPin
} from "lucide-react";

// Mock data for integrations
const integrationsData = [
  {
    id: "INT-001",
    platform: "EFS (Electronic Funds Source)",
    status: "Connected",
    lastSync: "2025-01-15 14:30:00",
    accountId: "EFS-789456",
    transactionsToday: 45,
    cardsActive: 156,
  },
  {
    id: "INT-002",
    platform: "Comdata",
    status: "Connected",
    lastSync: "2025-01-15 14:28:00",
    accountId: "CMD-123789",
    transactionsToday: 32,
    cardsActive: 89,
  },
  {
    id: "INT-003",
    platform: "Relay Payments",
    status: "Disconnected",
    lastSync: "2025-01-10 09:15:00",
    accountId: "RLY-456123",
    transactionsToday: 0,
    cardsActive: 0,
  },
  {
    id: "INT-004",
    platform: "TCS Fuel",
    status: "Pending",
    lastSync: null,
    accountId: "TCS-789123",
    transactionsToday: 0,
    cardsActive: 0,
  },
];

// Mock data for alert rules
const alertRulesData = [
  {
    id: "ALT-001",
    name: "High Transaction Amount",
    type: "Fraud Prevention",
    trigger: "Single transaction > $500",
    action: "Email + SMS",
    status: "Active",
    recipients: "operations@company.com",
  },
  {
    id: "ALT-002",
    name: "Daily Limit Exceeded",
    type: "Limit Alert",
    trigger: "Daily spend > 90% of limit",
    action: "Email",
    status: "Active",
    recipients: "fleet@company.com",
  },
  {
    id: "ALT-003",
    name: "Out-of-Network Purchase",
    type: "Fraud Prevention",
    trigger: "Non-network fuel purchase",
    action: "Email + In-App",
    status: "Active",
    recipients: "security@company.com",
  },
  {
    id: "ALT-004",
    name: "Unusual Location",
    type: "Fraud Prevention",
    trigger: "Transaction > 500 miles from route",
    action: "SMS + Call",
    status: "Active",
    recipients: "dispatch@company.com",
  },
  {
    id: "ALT-005",
    name: "After Hours Purchase",
    type: "Policy Violation",
    trigger: "Transaction between 11PM - 5AM",
    action: "Email",
    status: "Paused",
    recipients: "hr@company.com",
  },
  {
    id: "ALT-006",
    name: "Duplicate Transaction",
    type: "Fraud Prevention",
    trigger: "Same amount within 5 minutes",
    action: "Email + Block Card",
    status: "Active",
    recipients: "security@company.com",
  },
];

// Mock data for notification preferences
const notificationCategories = [
  {
    category: "Transactions",
    items: [
      { id: "trans-1", label: "New transaction received", email: true, sms: false, inApp: true },
      { id: "trans-2", label: "Transaction approved", email: false, sms: false, inApp: true },
      { id: "trans-3", label: "Transaction disputed", email: true, sms: true, inApp: true },
      { id: "trans-4", label: "Transaction reconciled", email: true, sms: false, inApp: true },
    ],
  },
  {
    category: "Cards",
    items: [
      { id: "card-1", label: "New card request", email: true, sms: false, inApp: true },
      { id: "card-2", label: "Card activated", email: true, sms: true, inApp: true },
      { id: "card-3", label: "Card suspended", email: true, sms: true, inApp: true },
      { id: "card-4", label: "Card limit changed", email: true, sms: false, inApp: true },
    ],
  },
  {
    category: "Alerts",
    items: [
      { id: "alert-1", label: "Fraud alert triggered", email: true, sms: true, inApp: true },
      { id: "alert-2", label: "Limit warning", email: true, sms: false, inApp: true },
      { id: "alert-3", label: "Policy violation", email: true, sms: false, inApp: true },
    ],
  },
  {
    category: "Reports",
    items: [
      { id: "report-1", label: "Scheduled report ready", email: true, sms: false, inApp: true },
      { id: "report-2", label: "IFTA report due", email: true, sms: true, inApp: true },
      { id: "report-3", label: "Monthly summary", email: true, sms: false, inApp: false },
    ],
  },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState("add");
  const [selectedItem, setSelectedItem] = useState(null);
  const [notifications, setNotifications] = useState(notificationCategories);

  const handleAddRule = useCallback(() => {
    setSheetMode("add");
    setSelectedItem(null);
    setIsSheetOpen(true);
  }, []);

  const handleEditRule = useCallback((rule) => {
    setSheetMode("edit");
    setSelectedItem(rule);
    setIsSheetOpen(true);
  }, []);

  const toggleNotification = (categoryIdx, itemIdx, channel) => {
    setNotifications(prev => {
      const updated = [...prev];
      updated[categoryIdx] = {
        ...updated[categoryIdx],
        items: [...updated[categoryIdx].items],
      };
      updated[categoryIdx].items[itemIdx] = {
        ...updated[categoryIdx].items[itemIdx],
        [channel]: !updated[categoryIdx].items[itemIdx][channel],
      };
      return updated;
    });
  };

  // Filter groups
  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "name",
          label: "Name",
          type: "input",
          group: "Basic",
          placeholder: "Search...",
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { label: "Active", value: "Active" },
            { label: "Paused", value: "Paused" },
          ],
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    // Handle filters
  }, []);

  // Integration columns
  const integrationColumns = [
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              {status === "Connected" && (
                <>
                  <DropdownMenuItem className="cursor-pointer">
                    <RefreshCw className="h-4 w-4 mr-2" /> Sync Now
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <PencilIcon className="h-4 w-4 mr-2" /> Edit Connection
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600">
                    <XCircle className="h-4 w-4 mr-2" /> Disconnect
                  </DropdownMenuItem>
                </>
              )}
              {status === "Disconnected" && (
                <DropdownMenuItem className="cursor-pointer">
                  <Link2 className="h-4 w-4 mr-2" /> Reconnect
                </DropdownMenuItem>
              )}
              {status === "Pending" && (
                <>
                  <DropdownMenuItem className="cursor-pointer">
                    <CheckCircle2 className="h-4 w-4 mr-2" /> Complete Setup
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" /> Cancel
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
      accessorKey: "platform",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Platform" />,
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("platform")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.getValue("status");
        const variants = {
          "Connected": "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/50",
          "Disconnected": "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/50",
          "Pending": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/50",
        };
        const icons = {
          "Connected": <CheckCircle2 className="h-3 w-3 mr-1" />,
          "Disconnected": <XCircle className="h-3 w-3 mr-1" />,
          "Pending": <Clock className="h-3 w-3 mr-1" />,
        };
        return (
          <Badge className={`flex items-center w-fit ${variants[status]}`}>
            {icons[status]}
            {status}
          </Badge>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "accountId",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Account ID" />,
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("accountId")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "lastSync",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Last Sync" />,
      cell: ({ row }) => row.getValue("lastSync") || "Never",
      enableSorting: true,
    },
    {
      accessorKey: "cardsActive",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Active Cards" />,
      enableSorting: true,
    },
    {
      accessorKey: "transactionsToday",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Today's Transactions" />,
      enableSorting: true,
    },
  ];

  // Alert rules columns
  const alertColumns = [
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="w-48">
            <DropdownMenuItem className="cursor-pointer" onClick={() => handleEditRule(row.original)}>
              <PencilIcon className="h-4 w-4 mr-2" /> Edit Rule
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              {row.original.status === "Active" ? (
                <>
                  <XCircle className="h-4 w-4 mr-2" /> Pause Rule
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" /> Activate Rule
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600">
              <Trash2 className="h-4 w-4 mr-2" /> Delete Rule
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Rule Name" />,
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("name")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "type",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => {
        const type = row.getValue("type");
        const colors = {
          "Fraud Prevention": "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/50",
          "Limit Alert": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/50",
          "Policy Violation": "bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/50",
        };
        return (
          <Badge className={colors[type] || "bg-gray-500/10 text-gray-700 border border-gray-500/50"}>
            {type}
          </Badge>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "trigger",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Trigger Condition" />,
      enableSorting: true,
    },
    {
      accessorKey: "action",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Action" />,
      cell: ({ row }) => (
        <span className="text-sm">{row.getValue("action")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge className={status === "Active"
            ? "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/50"
            : "bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/50"
          }>
            {status}
          </Badge>
        );
      },
      enableSorting: true,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full h-full flex flex-col overflow-hidden"
      >
        <div className="flex-shrink-0">
          <TabsList className="mb-0 rounded-none">
            <TabsTrigger value="general" className="h-full">
              <Settings2 className="size-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="integrations" className="h-full">
              <Link2 className="size-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="alerts" className="h-full">
              <Shield className="size-4" />
              Alert Rules
            </TabsTrigger>
            <TabsTrigger value="notifications" className="h-full">
              <Bell className="size-4" />
              Notifications
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          <TabsContent value="general" className="mt-0 p-4">
          <div className="max-w-3xl space-y-6">
            {/* Card Limits */}
            <div className="border rounded-sm">
              <div className="flex items-center gap-2 p-4 bg-muted/50 border-b">
                <CreditCard className="h-5 w-5" />
                <h2 className="font-semibold">Default Card Limits</h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dailyLimit">Daily Transaction Limit</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="dailyLimit" defaultValue="500" className="pl-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weeklyLimit">Weekly Transaction Limit</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="weeklyLimit" defaultValue="2000" className="pl-9" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="perTransaction">Per-Transaction Limit</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="perTransaction" defaultValue="300" className="pl-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gallonLimit">Daily Gallon Limit</Label>
                    <div className="relative">
                      <Fuel className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="gallonLimit" defaultValue="150" className="pl-9" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Restrictions */}
            <div className="border rounded-sm">
              <div className="flex items-center gap-2 p-4 bg-muted/50 border-b">
                <Shield className="h-5 w-5" />
                <h2 className="font-semibold">Purchase Restrictions</h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Fuel Purchases Only</Label>
                    <p className="text-sm text-muted-foreground">Restrict cards to fuel purchases only</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Network Stations Only</Label>
                    <p className="text-sm text-muted-foreground">Only allow purchases at network locations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Odometer Entry</Label>
                    <p className="text-sm text-muted-foreground">Drivers must enter odometer reading at pump</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Driver ID</Label>
                    <p className="text-sm text-muted-foreground">Require driver ID/PIN for all transactions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            {/* Location Settings */}
            <div className="border rounded-sm">
              <div className="flex items-center gap-2 p-4 bg-muted/50 border-b">
                <MapPin className="h-5 w-5" />
                <h2 className="font-semibold">Location Settings</h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Geographic Restrictions</Label>
                    <p className="text-sm text-muted-foreground">Limit transactions to specific states/regions</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Allowed States</Label>
                  <Textarea
                    placeholder="Enter state codes separated by commas (e.g., TX, OK, KS, MO)"
                    defaultValue="TX, OK, KS, MO, AR, LA, MS, AL, TN, GA, NM, CO"
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="routeRadius">Route Deviation Tolerance (miles)</Label>
                  <Input id="routeRadius" type="number" defaultValue="50" />
                  <p className="text-xs text-muted-foreground">
                    Alert if transaction occurs more than this distance from planned route
                  </p>
                </div>
              </div>
            </div>

            {/* Approval Settings */}
            <div className="border rounded-sm">
              <div className="flex items-center gap-2 p-4 bg-muted/50 border-b">
                <AlertTriangle className="h-5 w-5" />
                <h2 className="font-semibold">Approval Settings</h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Approval for New Cards</Label>
                    <p className="text-sm text-muted-foreground">Manager approval needed for card requests</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Approval for Limit Increases</Label>
                    <p className="text-sm text-muted-foreground">Approval needed for limit changes above threshold</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="approvalThreshold">Approval Threshold</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="approvalThreshold" defaultValue="1000" className="pl-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Transactions above this amount require manager approval
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

          <TabsContent value="integrations" className="mt-0 p-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="border rounded-sm p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Connected
                </div>
                <div className="text-2xl font-bold">2</div>
                <div className="text-xs text-muted-foreground">Active integrations</div>
              </div>
              <div className="border rounded-sm p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <XCircle className="h-4 w-4 text-red-600" />
                  Disconnected
                </div>
                <div className="text-2xl font-bold">1</div>
                <div className="text-xs text-muted-foreground">Needs attention</div>
              </div>
              <div className="border rounded-sm p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  Pending
                </div>
                <div className="text-2xl font-bold">1</div>
                <div className="text-xs text-muted-foreground">Awaiting setup</div>
              </div>
              <div className="border rounded-sm p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <CreditCard className="h-4 w-4" />
                  Total Cards
                </div>
                <div className="text-2xl font-bold">245</div>
                <div className="text-xs text-muted-foreground">Across all platforms</div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-1">
              <SmartFilter filterGroups={filterGroups} onFiltersChange={handleFiltersChange} />
              <Button
                className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Integration
              </Button>
            </div>
            <DataTable
              columns={integrationColumns}
              data={integrationsData}
              showViewOptions={false}
            />
          </TabsContent>

          <TabsContent value="alerts" className="mt-0 p-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="border rounded-sm p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Active Rules
                </div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-xs text-muted-foreground">Currently monitoring</div>
              </div>
              <div className="border rounded-sm p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  Paused Rules
                </div>
                <div className="text-2xl font-bold">1</div>
                <div className="text-xs text-muted-foreground">Temporarily disabled</div>
              </div>
              <div className="border rounded-sm p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  Alerts Today
                </div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs text-muted-foreground">Triggered alerts</div>
              </div>
              <div className="border rounded-sm p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Shield className="h-4 w-4 text-blue-600" />
                  This Week
                </div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-muted-foreground">Total alerts</div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-1">
              <SmartFilter filterGroups={filterGroups} onFiltersChange={handleFiltersChange} />
              <Button
                onClick={handleAddRule}
                className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
            </div>
            <DataTable
              columns={alertColumns}
              data={alertRulesData}
              showViewOptions={false}
            />
          </TabsContent>

          <TabsContent value="notifications" className="mt-0 p-4">
            <div className="max-w-3xl space-y-6">
              {notifications.map((category, categoryIdx) => (
                <div key={category.category} className="border rounded-sm">
                  <div className="p-4 bg-muted/50 border-b">
                    <h3 className="font-semibold">{category.category}</h3>
                  </div>
                  <div className="divide-y">
                    {/* Header row */}
                    <div className="grid grid-cols-[1fr,80px,80px,80px] gap-4 p-4 bg-muted/30 text-sm font-medium">
                      <div>Notification</div>
                      <div className="text-center">Email</div>
                      <div className="text-center">SMS</div>
                      <div className="text-center">In-App</div>
                    </div>
                    {category.items.map((item, itemIdx) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-[1fr,80px,80px,80px] gap-4 p-4 items-center"
                      >
                        <div className="text-sm">{item.label}</div>
                        <div className="flex justify-center">
                          <Switch
                            checked={item.email}
                            onCheckedChange={() =>
                              toggleNotification(categoryIdx, itemIdx, "email")
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={item.sms}
                            onCheckedChange={() =>
                              toggleNotification(categoryIdx, itemIdx, "sms")
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={item.inApp}
                            onCheckedChange={() =>
                              toggleNotification(categoryIdx, itemIdx, "inApp")
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {sheetMode === "add" ? "Add Alert Rule" : "Edit Alert Rule"}
            </SheetTitle>
          </SheetHeader>

          <form className="space-y-5 mt-4 px-6">
            <div className="space-y-2">
              <Label htmlFor="ruleName" className="text-sm font-medium">
                Rule Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="ruleName"
                placeholder="e.g., High Transaction Amount"
                defaultValue={selectedItem?.name || ""}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ruleType" className="text-sm font-medium">
                Alert Type <span className="text-red-500">*</span>
              </Label>
              <Select defaultValue={selectedItem?.type || "fraud"}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fraud">Fraud Prevention</SelectItem>
                  <SelectItem value="limit">Limit Alert</SelectItem>
                  <SelectItem value="policy">Policy Violation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="triggerType" className="text-sm font-medium">
                Trigger Type <span className="text-red-500">*</span>
              </Label>
              <Select defaultValue="amount">
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select trigger" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amount">Transaction Amount</SelectItem>
                  <SelectItem value="daily">Daily Spend</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                  <SelectItem value="time">Time of Day</SelectItem>
                  <SelectItem value="frequency">Transaction Frequency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="triggerValue" className="text-sm font-medium">
                Trigger Value <span className="text-red-500">*</span>
              </Label>
              <Input
                id="triggerValue"
                placeholder="e.g., 500"
                defaultValue={selectedItem?.trigger?.match(/\d+/)?.[0] || ""}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="action" className="text-sm font-medium">
                Action <span className="text-red-500">*</span>
              </Label>
              <Select defaultValue="email">
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email Only</SelectItem>
                  <SelectItem value="sms">SMS Only</SelectItem>
                  <SelectItem value="email-sms">Email + SMS</SelectItem>
                  <SelectItem value="email-inapp">Email + In-App</SelectItem>
                  <SelectItem value="block">Block Card + Email</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipients" className="text-sm font-medium">
                Recipients
              </Label>
              <Input
                id="recipients"
                type="email"
                placeholder="email@company.com"
                defaultValue={selectedItem?.recipients || ""}
                className="h-10"
              />
            </div>

            <div className="flex gap-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => setIsSheetOpen(false)} className="flex-1 h-10">
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {sheetMode === "add" ? "Create Rule" : "Save Changes"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
