import { useState, useCallback } from "react";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import SmartFilter from "@/components/SmartFilter";
import {
  Phone,
  Mail,
  Globe,
  Plus,
  Clock,
  User,
  MapPin,
  Package,
  Truck,
  FileText,
  MessageSquare,
  AlertTriangle,
  MoreHorizontal,
  FileEdit,
  Eye,
  ClipboardList,
  Copy,
  X,
} from "lucide-react";

const CustomerContact = () => {
  const [isOrderEntrySheetOpen, setIsOrderEntrySheetOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [inquiryFilters, setInquiryFilters] = useState([]);

  // Combined mock data for inbound inquiries (calls + emails)
  const inquiriesData = [
    {
      id: 1,
      source: "Phone",
      customerName: "ABC Logistics",
      contactInfo: "John Miller | +1 (555) 123-4567",
      receivedAt: "2024-01-28 09:15 AM",
      status: "New",
      type: "Quote Request",
      priority: "Normal",
      assignedTo: "Jesus Fernandez",
      summary: "Requesting quote for 20 loads from TX to CA",
    },
    {
      id: 2,
      source: "Email",
      customerName: "BuildRight Construction",
      contactInfo: "orders@buildright.com",
      receivedAt: "2024-01-28 08:30 AM",
      status: "Pending",
      type: "Quote Request",
      priority: "High",
      assignedTo: "Jesus Fernandez",
      summary: "Origin: Dallas, TX | Dest: Houston, TX | 10 loads aggregate",
    },
    {
      id: 3,
      source: "Phone",
      customerName: "XYZ Freight",
      contactInfo: "Sarah Johnson | +1 (555) 987-6543",
      receivedAt: "2024-01-28 09:45 AM",
      status: "Pending",
      type: "Follow Up",
      priority: "Normal",
      assignedTo: "Maria Santos",
      summary: "Follow up on previous quote",
    },
    {
      id: 4,
      source: "Email",
      customerName: "Premier Precast",
      contactInfo: "dispatch@premierprecast.com",
      receivedAt: "2024-01-28 09:00 AM",
      status: "Pending",
      type: "Urgent Order",
      priority: "Urgent",
      assignedTo: "Carlos Reyes",
      summary:
        "Origin: Austin, TX | Dest: San Antonio, TX | Precast panels | ASAP",
    },
    {
      id: 5,
      source: "Phone",
      customerName: "Global Shipping Inc",
      contactInfo: "Mike Davis | +1 (555) 456-7890",
      receivedAt: "2024-01-28 10:30 AM",
      status: "New",
      type: "Urgent Order",
      priority: "Urgent",
      assignedTo: "Jesus Fernandez",
      summary: "Urgent shipment needed for construction materials",
    },
    {
      id: 6,
      source: "Email",
      customerName: "Texas Aggregate Co",
      contactInfo: "orders@texasaggregate.com",
      receivedAt: "2024-01-28 06:45 AM",
      status: "Pending",
      type: "Quote Request",
      priority: "Normal",
      assignedTo: "Jesus Fernandez",
      summary: "Quote request for 50 loads/month bulk material",
    },
    {
      id: 7,
      source: "Phone",
      customerName: "Premier Precast",
      contactInfo: "Robert Chen | +1 (555) 234-5678",
      receivedAt: "2024-01-28 11:00 AM",
      status: "Closed",
      type: "New Order",
      priority: "Normal",
      assignedTo: "Maria Santos",
      summary: "Regular precast delivery order - 5 loads",
    },
    {
      id: 8,
      source: "Email",
      customerName: "ABC Logistics",
      contactInfo: "freight@abclogistics.com",
      receivedAt: "2024-01-28 11:00 AM",
      status: "Pending",
      type: "New Order",
      priority: "High",
      assignedTo: "Jesus Fernandez",
      summary:
        "New lane: Los Angeles, CA → El Paso, TX | Flatbed | 5 loads/week",
    },
    {
      id: 9,
      source: "Phone",
      customerName: "Metro Materials",
      contactInfo: "Jennifer Lee | +1 (555) 345-6789",
      receivedAt: "2024-01-28 11:30 AM",
      status: "New",
      type: "Quote Request",
      priority: "Normal",
      assignedTo: "Jesus Fernandez",
      summary: "Need bulk material transport quote",
    },
    {
      id: 10,
      source: "Email",
      customerName: "Not Found",
      contactInfo: "newcustomer@unknown.com",
      receivedAt: "2024-01-28 11:30 AM",
      status: "Pending",
      type: "Quote Request",
      priority: "Normal",
      assignedTo: "Maria Santos",
      summary: "New customer inquiry - needs customer setup",
    },
    {
      id: 11,
      source: "Phone",
      customerName: "BuildRight Construction",
      contactInfo: "Tom Williams | +1 (555) 456-7891",
      receivedAt: "2024-01-28 12:15 PM",
      status: "Pending",
      type: "Issue",
      priority: "High",
      assignedTo: "Carlos Reyes",
      summary: "Complaint about late delivery yesterday",
    },
    {
      id: 12,
      source: "Email",
      customerName: "Not Found",
      contactInfo: "info@newcompany.net",
      receivedAt: "2024-01-28 12:00 PM",
      status: "Pending",
      type: "Quote Request",
      priority: "High",
      assignedTo: "Jesus Fernandez",
      summary:
        "Origin: Phoenix, AZ | Dest: Denver, CO | New customer - not in system",
    },
    {
      id: 13,
      source: "Phone",
      customerName: "Texas Aggregate Co",
      contactInfo: "Amanda Foster | +1 (555) 567-8901",
      receivedAt: "2024-01-28 01:00 PM",
      status: "New",
      type: "New Order",
      priority: "Normal",
      assignedTo: "Maria Santos",
      summary: "Weekly recurring order - aggregate materials",
    },
    {
      id: 14,
      source: "Email",
      customerName: "Metro Materials",
      contactInfo: "shipping@metromaterials.com",
      receivedAt: "2024-01-28 07:15 AM",
      status: "Closed",
      type: "Follow Up",
      priority: "Normal",
      assignedTo: "Maria Santos",
      summary: "Recurring weekly order - confirmed schedule",
    },
    {
      id: 15,
      source: "Phone",
      customerName: "Southwest Builders",
      contactInfo: "David Martinez | +1 (555) 678-9012",
      receivedAt: "2024-01-28 01:45 PM",
      status: "Closed",
      type: "Follow Up",
      priority: "Low",
      assignedTo: "Jesus Fernandez",
      summary: "Customer confirmed receipt of invoice",
    },
    {
      id: 16,
      source: "Email",
      customerName: "Southwest Builders",
      contactInfo: "logistics@swbuilders.com",
      receivedAt: "2024-01-28 10:15 AM",
      status: "Closed",
      type: "Follow Up",
      priority: "Low",
      assignedTo: "Maria Santos",
      summary: "Customer confirmed delivery receipt - no action needed",
    },
    // Portal Orders
    {
      id: 17,
      source: "Portal",
      customerName: "Premier Precast",
      contactInfo: "PO-2024-0045",
      receivedAt: "2024-01-28 11:00 AM",
      status: "Draft",
      type: "New Order",
      priority: "Normal",
      assignedTo: "Unassigned",
      summary: "Houston, TX → Dallas, TX | Flatbed | 42,000 lbs | Precast",
    },
    {
      id: 18,
      source: "Portal",
      customerName: "ABC Logistics",
      contactInfo: "PO-2024-0046",
      receivedAt: "2024-01-28 10:45 AM",
      status: "Draft",
      type: "New Order",
      priority: "Normal",
      assignedTo: "Unassigned",
      summary: "Austin, TX → San Antonio, TX | Pneumatic | 48,000 lbs | Bulk",
    },
    {
      id: 19,
      source: "Portal",
      customerName: "Metro Materials",
      contactInfo: "PO-2024-0047",
      receivedAt: "2024-01-28 09:30 AM",
      status: "Draft",
      type: "New Order",
      priority: "Normal",
      assignedTo: "Unassigned",
      summary:
        "El Paso, TX → Albuquerque, NM | End Dump | 50,000 lbs | Aggregate",
    },
    {
      id: 20,
      source: "Portal",
      customerName: "BuildRight Construction",
      contactInfo: "PO-2024-0048",
      receivedAt: "2024-01-28 08:15 AM",
      status: "Pending",
      type: "New Order",
      priority: "Normal",
      assignedTo: "Jesus Fernandez",
      summary: "Dallas, TX → Fort Worth, TX | Lowboy | 35,000 lbs | Precast",
    },
    {
      id: 21,
      source: "Portal",
      customerName: "Texas Aggregate Co",
      contactInfo: "PO-2024-0049",
      receivedAt: "2024-01-28 07:45 AM",
      status: "Draft",
      type: "New Order",
      priority: "Normal",
      assignedTo: "Unassigned",
      summary: "Lubbock, TX → Amarillo, TX | Walking Floor | 45,000 lbs | Bulk",
    },
    {
      id: 22,
      source: "Portal",
      customerName: "Southwest Builders",
      contactInfo: "PO-2024-0050",
      receivedAt: "2024-01-28 06:30 AM",
      status: "Pending",
      type: "New Order",
      priority: "Normal",
      assignedTo: "Maria Santos",
      summary: "Phoenix, AZ → Tucson, AZ | Side Dump | 52,000 lbs | Aggregate",
    },
  ];

  // Filter configuration for inquiries
  const inquiryFilterGroups = [
    {
      id: "inquiry-filters",
      label: "Filter Inquiries",
      filters: [
        {
          key: "source",
          label: "Source",
          type: "select",
          group: "Basic",
          options: [
            { value: "Phone", label: "Phone" },
            { value: "Email", label: "Email" },
            { value: "Portal", label: "Portal" },
          ],
        },
        {
          key: "customerName",
          label: "Customer",
          type: "input",
          group: "Basic",
          placeholder: "Search customer...",
        },
        {
          key: "contactInfo",
          label: "Contact / Order Ref",
          type: "input",
          group: "Basic",
          placeholder: "Search contact...",
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "New", label: "New" },
            { value: "Pending", label: "Pending" },
            { value: "Draft", label: "Draft" },
            { value: "Closed", label: "Closed" },
          ],
        },
        {
          key: "type",
          label: "Type",
          type: "select",
          group: "Basic",
          options: [
            { value: "Quote Request", label: "Quote Request" },
            { value: "New Order", label: "New Order" },
            { value: "Follow Up", label: "Follow Up" },
            { value: "Urgent Order", label: "Urgent Order" },
            { value: "Issue", label: "Issue" },
          ],
        },
        {
          key: "priority",
          label: "Priority",
          type: "select",
          group: "Basic",
          options: [
            { value: "Urgent", label: "Urgent" },
            { value: "High", label: "High" },
            { value: "Normal", label: "Normal" },
            { value: "Low", label: "Low" },
          ],
        },
        {
          key: "assignedTo",
          label: "Assigned To",
          type: "select",
          group: "Basic",
          options: [
            { value: "Jesus Fernandez", label: "Jesus Fernandez" },
            { value: "Maria Santos", label: "Maria Santos" },
            { value: "Carlos Reyes", label: "Carlos Reyes" },
            { value: "Unassigned", label: "Unassigned" },
          ],
        },
      ],
    },
  ];

  const handleInquiryFiltersChange = useCallback((newFilters) => {
    setInquiryFilters(newFilters);
  }, []);

  const getStatusBadge = (status) => {
    const colors = {
      New: "bg-blue-500/10 text-blue-700 border-blue-500/50",
      Pending: "bg-orange-500/10 text-orange-700 border-orange-500/50",
      Draft: "bg-gray-500/10 text-gray-700 border-gray-500/50",
      Closed: "bg-green-500/10 text-green-700 border-green-500/50",
    };
    return <Badge className={colors[status] || ""}>{status}</Badge>;
  };

  const getTypeBadge = (type) => {
    const colors = {
      "Quote Request": "bg-purple-500/10 text-purple-700 border-purple-500/50",
      "New Order": "bg-green-500/10 text-green-700 border-green-500/50",
      "Follow Up": "bg-blue-500/10 text-blue-700 border-blue-500/50",
      "Urgent Order": "bg-red-500/10 text-red-700 border-red-500/50",
      Issue: "bg-orange-500/10 text-orange-700 border-orange-500/50",
    };
    return <Badge className={colors[type] || ""}>{type}</Badge>;
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      Urgent: "bg-red-500/10 text-red-700 border-red-500/50",
      High: "bg-orange-500/10 text-orange-700 border-orange-500/50",
      Normal: "bg-blue-500/10 text-blue-700 border-blue-500/50",
      Low: "bg-gray-500/10 text-gray-700 border-gray-500/50",
    };
    return <Badge className={colors[priority] || ""}>{priority}</Badge>;
  };

  const getSourceIcon = (source) => {
    if (source === "Phone") {
      return <Phone className="size-4 text-green-600" />;
    }
    if (source === "Portal") {
      return <Globe className="size-4 text-purple-600" />;
    }
    return <Mail className="size-4 text-blue-600" />;
  };

  const handleConvertToOrder = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsOrderEntrySheetOpen(true);
  };

  const inquiriesColumns = [
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const status = row.getValue("status");
        const inquiry = row.original;
        const isCompleted = status === "Closed";

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() => handleConvertToOrder(inquiry)}
                disabled={isCompleted}
              >
                <FileEdit className="size-4 mr-2" />
                Create Order
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="size-4 mr-2" />
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: "source",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Source" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {getSourceIcon(row.getValue("source"))}
          <span className="text-sm">{row.getValue("source")}</span>
        </div>
      ),
    },
    {
      accessorKey: "customerName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
      cell: ({ row }) => {
        const customer = row.getValue("customerName");
        if (!customer || customer === "Not Found") {
          return (
            <Badge className="bg-red-500/10 text-red-700 border-red-500/50">
              Not Found
            </Badge>
          );
        }
        return <span className="font-medium">{customer}</span>;
      },
    },
    {
      accessorKey: "contactInfo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Contact" />
      ),
      cell: ({ row }) => (
        <span className="text-sm">{row.getValue("contactInfo")}</span>
      ),
    },
    {
      accessorKey: "receivedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Received" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <Clock className="size-3 text-muted-foreground" />
          {row.getValue("receivedAt")}
        </div>
      ),
    },
    {
      accessorKey: "priority",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Priority" />
      ),
      cell: ({ row }) => getPriorityBadge(row.getValue("priority")),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => getStatusBadge(row.getValue("status")),
    },
    {
      accessorKey: "assignedTo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Assigned To" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <User className="size-3 text-muted-foreground" />
          <span className="text-sm">{row.getValue("assignedTo")}</span>
        </div>
      ),
    },
    {
      accessorKey: "summary",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Summary" />
      ),
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground truncate max-w-[250px] block">
          {row.getValue("summary")}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-auto p-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <MessageSquare className="size-4" />
            <span className="text-xs">Total Inquiries</span>
          </div>
          <p className="text-2xl font-bold">22</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <Phone className="size-4" />
            <span className="text-xs">Phone Calls</span>
          </div>
          <p className="text-2xl font-bold text-green-600">8</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Mail className="size-4" />
            <span className="text-xs">Emails</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">8</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-purple-600 mb-1">
            <Globe className="size-4" />
            <span className="text-xs">Portal Orders</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">6</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-red-600 mb-1">
            <AlertTriangle className="size-4" />
            <span className="text-xs">Urgent</span>
          </div>
          <p className="text-2xl font-bold text-red-600">3</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between mb-4">
        <SmartFilter
          filterGroups={inquiryFilterGroups}
          onFiltersChange={handleInquiryFiltersChange}
        />
      </div>

      {/* Data Table */}
      <DataTable
        columns={inquiriesColumns}
        data={inquiriesData}
        showViewOptions={false}
      />

      {/* Order Entry Sheet */}
      <Sheet
        open={isOrderEntrySheetOpen}
        onOpenChange={(open) => {
          setIsOrderEntrySheetOpen(open);
          if (!open) setSelectedInquiry(null);
        }}
      >
        <SheetContent
          side="right"
          className="w-[700px] sm:max-w-[700px] p-0 flex flex-col"
        >
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-background border-b">
            <SheetHeader>
              <div className="flex items-center justify-between">
                <SheetTitle className={"text-lg font-bold"}>
                  Order Entry
                </SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsOrderEntrySheetOpen(false)}
                >
                  <X className="size-4" />
                </Button>
              </div>
            </SheetHeader>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {/* Inquiry Context */}
            {selectedInquiry && (
              <div className="border rounded-sm bg-card">
                <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <MessageSquare className="size-4" />
                    Inquiry Context
                  </h3>
                  <Badge variant="outline">{selectedInquiry.source}</Badge>
                </div>
                <div className="divide-y divide-border">
                  {/* Customer, Contact */}
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Customer</p>
                      <p className="text-sm font-medium text-foreground">
                        {selectedInquiry.customerName}
                      </p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Contact</p>
                      <p className="text-sm font-medium text-foreground">
                        {selectedInquiry.contactInfo}
                      </p>
                    </div>
                  </div>
                  {/* Priority */}
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Priority</p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedInquiry.priority}
                    </p>
                  </div>
                  {/* Summary / Details */}
                  <div className="px-4 py-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-muted-foreground">Summary / Details</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs px-2"
                        onClick={() =>
                          navigator.clipboard.writeText(selectedInquiry.summary)
                        }
                      >
                        <Copy className="size-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <div className="p-3 bg-muted rounded border text-sm font-mono whitespace-pre-wrap select-all cursor-text">
                      {selectedInquiry.summary}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Origin */}
            <div className="border rounded-sm bg-card">
              <div className="px-4 py-3 border-b bg-muted">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="size-4 text-green-600" />
                  Origin
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="space-y-2">
                  <Label>
                    Full Address <span className="text-red-500">*</span>
                  </Label>
                  <Input placeholder="Enter pickup address" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>
                      Contact Name <span className="text-red-500">*</span>
                    </Label>
                    <Input placeholder="Contact name" />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      Phone <span className="text-red-500">*</span>
                    </Label>
                    <Input placeholder="Phone number" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Pickup Appointment Time</Label>
                  <Input type="datetime-local" />
                </div>
              </div>
            </div>

            {/* Destination */}
            <div className="border rounded-sm bg-card">
              <div className="px-4 py-3 border-b bg-muted">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="size-4 text-red-600" />
                  Destination
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="space-y-2">
                  <Label>
                    Full Address <span className="text-red-500">*</span>
                  </Label>
                  <Input placeholder="Enter delivery address" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>
                      Contact Name <span className="text-red-500">*</span>
                    </Label>
                    <Input placeholder="Contact name" />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      Phone <span className="text-red-500">*</span>
                    </Label>
                    <Input placeholder="Phone number" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>
                    Delivery Deadline <span className="text-red-500">*</span>
                  </Label>
                  <Input type="datetime-local" />
                </div>
              </div>
            </div>

            {/* Equipment */}
            <div className="border rounded-sm bg-card">
              <div className="px-4 py-3 border-b bg-muted">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Truck className="size-4" />
                  Equipment
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  <Label>
                    Equipment Type <span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select equipment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flatbed">Flatbed</SelectItem>
                      <SelectItem value="pneumatic">Pneumatic</SelectItem>
                      <SelectItem value="walking-floor">Walking Floor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Freight Details */}
            <div className="border rounded-sm bg-card">
              <div className="px-4 py-3 border-b bg-muted">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Package className="size-4" />
                  Freight Details
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>
                      Commodity <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select commodity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gu">GU</SelectItem>
                        <SelectItem value="slag">Slag</SelectItem>
                        <SelectItem value="sand-40-140">Sand 40-140</SelectItem>
                        <SelectItem value="glass-40-140">Glass 40-140</SelectItem>
                        <SelectItem value="masonry">Masonry</SelectItem>
                        <SelectItem value="1-2">1/2</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="dumb">Dumb</SelectItem>
                        <SelectItem value="1l">1L</SelectItem>
                        <SelectItem value="type-3">Type 3</SelectItem>
                        <SelectItem value="cement">Cement</SelectItem>
                        <SelectItem value="flatb">FlatB</SelectItem>
                        <SelectItem value="flyash">Flyash</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>
                      Weight (lbs) <span className="text-red-500">*</span>
                    </Label>
                    <Input type="number" placeholder="Total weight" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label>Length (ft)</Label>
                    <Input type="number" placeholder="Length" />
                  </div>
                  <div className="space-y-2">
                    <Label>Width (ft)</Label>
                    <Input type="number" placeholder="Width" />
                  </div>
                  <div className="space-y-2">
                    <Label>Height (ft)</Label>
                    <Input type="number" placeholder="Height" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Piece Count</Label>
                  <Input type="number" placeholder="Number of pieces" />
                </div>
              </div>
            </div>

            {/* Special Requirements */}
            <div className="border rounded-sm bg-card">
              <div className="px-4 py-3 border-b bg-muted">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FileText className="size-4" />
                  Special Requirements
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label>Tarps</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="smoke">Smoke Tarp</SelectItem>
                        <SelectItem value="lumber">Lumber Tarp</SelectItem>
                        <SelectItem value="steel">Steel Tarp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Chains</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Permits</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="oversize">Oversize</SelectItem>
                        <SelectItem value="overweight">Overweight</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Hazmat</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Team Drivers</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Additional Notes</Label>
                  <Textarea
                    placeholder="Enter any special instructions or requirements..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 z-10 bg-background border-t px-6 py-3">
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsOrderEntrySheetOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="outline">Save as Draft</Button>
              <Button className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
                Submit for Validation
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CustomerContact;
