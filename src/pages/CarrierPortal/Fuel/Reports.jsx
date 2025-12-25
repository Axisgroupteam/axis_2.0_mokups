import { useState, useCallback } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import SmartFilter from "@/components/SmartFilter";
import {
  Plus,
  MoreHorizontal,
  Download,
  Eye,
  Send,
  Printer,
  FileText,
  Calendar,
  Map,
  BarChart3,
  RefreshCw,
  PencilIcon,
  TrashIcon,
} from "lucide-react";

// Mock data for IFTA reports
const iftaReportsData = [
  {
    id: "IFTA-2024-Q4",
    quarter: "Q4 2024",
    status: "Submitted",
    totalMiles: 125680,
    totalGallons: 18452,
    jurisdictions: 12,
    taxOwed: 2845.50,
    taxCredit: 1250.00,
    netTax: 1595.50,
    dueDate: "2025-01-31",
    submittedDate: "2025-01-15",
  },
  {
    id: "IFTA-2024-Q3",
    quarter: "Q3 2024",
    status: "Filed",
    totalMiles: 132450,
    totalGallons: 19560,
    jurisdictions: 14,
    taxOwed: 3120.75,
    taxCredit: 1480.00,
    netTax: 1640.75,
    dueDate: "2024-10-31",
    submittedDate: "2024-10-22",
  },
  {
    id: "IFTA-2024-Q2",
    quarter: "Q2 2024",
    status: "Filed",
    totalMiles: 118920,
    totalGallons: 17580,
    jurisdictions: 11,
    taxOwed: 2650.25,
    taxCredit: 1120.00,
    netTax: 1530.25,
    dueDate: "2024-07-31",
    submittedDate: "2024-07-18",
  },
  {
    id: "IFTA-2024-Q1",
    quarter: "Q1 2024",
    status: "Filed",
    totalMiles: 108500,
    totalGallons: 16200,
    jurisdictions: 10,
    taxOwed: 2380.00,
    taxCredit: 980.00,
    netTax: 1400.00,
    dueDate: "2024-04-30",
    submittedDate: "2024-04-12",
  },
  {
    id: "IFTA-2025-Q1",
    quarter: "Q1 2025",
    status: "Draft",
    totalMiles: 45680,
    totalGallons: 6720,
    jurisdictions: 8,
    taxOwed: 1050.25,
    taxCredit: 420.00,
    netTax: 630.25,
    dueDate: "2025-04-30",
    submittedDate: null,
  },
];

// Mock data for fuel usage reports
const fuelUsageData = [
  {
    id: "RPT-001",
    reportName: "Monthly Fuel Usage - December 2024",
    reportType: "Monthly Summary",
    period: "Dec 2024",
    createdDate: "2025-01-02",
    createdBy: "System",
    totalGallons: 6150.5,
    totalCost: 18451.50,
    avgMPG: 6.8,
    status: "Complete",
  },
  {
    id: "RPT-002",
    reportName: "Driver Fuel Efficiency Report",
    reportType: "Driver Analysis",
    period: "Q4 2024",
    createdDate: "2025-01-05",
    createdBy: "John Smith",
    totalGallons: 18452,
    totalCost: 55356.00,
    avgMPG: 6.5,
    status: "Complete",
  },
  {
    id: "RPT-003",
    reportName: "Fleet Fuel Comparison",
    reportType: "Fleet Analysis",
    period: "2024",
    createdDate: "2025-01-10",
    createdBy: "Jane Doe",
    totalGallons: 72192,
    totalCost: 216576.00,
    avgMPG: 6.6,
    status: "Complete",
  },
  {
    id: "RPT-004",
    reportName: "Network vs Retail Analysis",
    reportType: "Cost Analysis",
    period: "Q4 2024",
    createdDate: "2025-01-08",
    createdBy: "System",
    totalGallons: 18452,
    totalCost: 55356.00,
    avgMPG: null,
    status: "Complete",
  },
  {
    id: "RPT-005",
    reportName: "January 2025 Fuel Usage",
    reportType: "Monthly Summary",
    period: "Jan 2025",
    createdDate: "2025-01-15",
    createdBy: "System",
    totalGallons: 2150.25,
    totalCost: 6450.75,
    avgMPG: 6.7,
    status: "In Progress",
  },
];

// Mock data for jurisdiction breakdown
const jurisdictionData = [
  { state: "TX", miles: 28500, gallons: 4200, taxRate: 0.20, taxOwed: 840.00, taxPaid: 920.00, credit: 80.00 },
  { state: "OK", miles: 18200, gallons: 2680, taxRate: 0.19, taxOwed: 509.20, taxPaid: 450.00, credit: -59.20 },
  { state: "KS", miles: 15600, gallons: 2300, taxRate: 0.24, taxOwed: 552.00, taxPaid: 500.00, credit: -52.00 },
  { state: "MO", miles: 12400, gallons: 1825, taxRate: 0.195, taxOwed: 355.88, taxPaid: 380.00, credit: 24.12 },
  { state: "AR", miles: 10800, gallons: 1590, taxRate: 0.285, taxOwed: 453.15, taxPaid: 420.00, credit: -33.15 },
  { state: "LA", miles: 9500, gallons: 1400, taxRate: 0.20, taxOwed: 280.00, taxPaid: 310.00, credit: 30.00 },
  { state: "MS", miles: 8200, gallons: 1205, taxRate: 0.184, taxOwed: 221.72, taxPaid: 250.00, credit: 28.28 },
  { state: "AL", miles: 7800, gallons: 1150, taxRate: 0.29, taxOwed: 333.50, taxPaid: 300.00, credit: -33.50 },
  { state: "TN", miles: 6500, gallons: 955, taxRate: 0.27, taxOwed: 257.85, taxPaid: 280.00, credit: 22.15 },
  { state: "GA", miles: 5200, gallons: 765, taxRate: 0.315, taxOwed: 240.98, taxPaid: 220.00, credit: -20.98 },
  { state: "NM", miles: 2080, gallons: 306, taxRate: 0.21, taxOwed: 64.26, taxPaid: 70.00, credit: 5.74 },
  { state: "CO", miles: 900, gallons: 132, taxRate: 0.22, taxOwed: 29.04, taxPaid: 35.00, credit: 5.96 },
];

// Mock data for scheduled reports
const scheduledReportsData = [
  {
    id: "SCH-001",
    reportName: "Weekly Fuel Summary",
    frequency: "Weekly",
    nextRun: "2025-01-20",
    recipients: "operations@company.com",
    format: "PDF",
    status: "Active",
  },
  {
    id: "SCH-002",
    reportName: "Monthly IFTA Prep",
    frequency: "Monthly",
    nextRun: "2025-02-01",
    recipients: "accounting@company.com",
    format: "Excel",
    status: "Active",
  },
  {
    id: "SCH-003",
    reportName: "Driver MPG Report",
    frequency: "Bi-Weekly",
    nextRun: "2025-01-27",
    recipients: "fleet@company.com, managers@company.com",
    format: "PDF",
    status: "Active",
  },
  {
    id: "SCH-004",
    reportName: "Cost Variance Alert",
    frequency: "Daily",
    nextRun: "2025-01-16",
    recipients: "finance@company.com",
    format: "Email",
    status: "Paused",
  },
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState("ifta");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState("add");
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedQuarter, setSelectedQuarter] = useState("Q1 2025");

  const handleAddReport = useCallback(() => {
    setSheetMode("add");
    setSelectedReport(null);
    setIsSheetOpen(true);
  }, []);

  const handleEditReport = useCallback((report) => {
    setSheetMode("edit");
    setSelectedReport(report);
    setIsSheetOpen(true);
  }, []);

  // IFTA Reports columns
  const iftaColumns = [
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
            <DropdownMenuItem className="cursor-pointer">
              <Eye className="h-4 w-4 mr-2" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <FileText className="h-4 w-4 mr-2" /> Export to Excel
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Send className="h-4 w-4 mr-2" /> Submit to State
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Printer className="h-4 w-4 mr-2" /> Print Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Report ID" />,
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("id")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "quarter",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Quarter" />,
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("quarter")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.getValue("status");
        const variants = {
          "Submitted": "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/50",
          "Filed": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/50",
          "Draft": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/50",
          "Pending": "bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/50",
        };
        return (
          <Badge className={variants[status] || "bg-gray-500/10 text-gray-700 border border-gray-500/50"}>
            {status}
          </Badge>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "totalMiles",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Total Miles" />,
      cell: ({ row }) => row.getValue("totalMiles").toLocaleString(),
      enableSorting: true,
    },
    {
      accessorKey: "totalGallons",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Total Gallons" />,
      cell: ({ row }) => row.getValue("totalGallons").toLocaleString(),
      enableSorting: true,
    },
    {
      accessorKey: "jurisdictions",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Jurisdictions" />,
      cell: ({ row }) => row.getValue("jurisdictions"),
      enableSorting: true,
    },
    {
      accessorKey: "netTax",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Net Tax" />,
      cell: ({ row }) => {
        const value = row.getValue("netTax");
        return (
          <span className={`font-medium ${value >= 0 ? "text-red-600" : "text-green-600"}`}>
            ${value.toFixed(2)}
          </span>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Due Date" />,
      enableSorting: true,
    },
  ];

  // Fuel Usage Reports columns
  const usageColumns = [
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
            <DropdownMenuItem className="cursor-pointer">
              <Eye className="h-4 w-4 mr-2" /> View Report
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Download className="h-4 w-4 mr-2" /> Download
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Send className="h-4 w-4 mr-2" /> Email Report
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <RefreshCw className="h-4 w-4 mr-2" /> Regenerate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Report ID" />,
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("id")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "reportName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Report Name" />,
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("reportName")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "reportType",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => (
        <Badge variant="outline">{row.getValue("reportType")}</Badge>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "period",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Period" />,
      enableSorting: true,
    },
    {
      accessorKey: "totalGallons",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Total Gallons" />,
      cell: ({ row }) => row.getValue("totalGallons")?.toLocaleString() || "-",
      enableSorting: true,
    },
    {
      accessorKey: "totalCost",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Total Cost" />,
      cell: ({ row }) => `$${row.getValue("totalCost")?.toLocaleString() || "0"}`,
      enableSorting: true,
    },
    {
      accessorKey: "avgMPG",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Avg MPG" />,
      cell: ({ row }) => row.getValue("avgMPG") || "-",
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.getValue("status");
        const variants = {
          "Complete": "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/50",
          "In Progress": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/50",
          "Failed": "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/50",
        };
        return (
          <Badge className={variants[status] || "bg-gray-500/10 text-gray-700 border border-gray-500/50"}>
            {status}
          </Badge>
        );
      },
      enableSorting: true,
    },
  ];

  // Jurisdiction columns
  const jurisdictionColumns = [
    {
      accessorKey: "state",
      header: ({ column }) => <DataTableColumnHeader column={column} title="State" />,
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("state")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "miles",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Miles" />,
      cell: ({ row }) => row.getValue("miles").toLocaleString(),
      enableSorting: true,
    },
    {
      accessorKey: "gallons",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Gallons" />,
      cell: ({ row }) => row.getValue("gallons").toLocaleString(),
      enableSorting: true,
    },
    {
      accessorKey: "taxRate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tax Rate" />,
      cell: ({ row }) => `$${row.getValue("taxRate").toFixed(3)}/gal`,
      enableSorting: true,
    },
    {
      accessorKey: "taxOwed",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tax Owed" />,
      cell: ({ row }) => `$${row.getValue("taxOwed").toFixed(2)}`,
      enableSorting: true,
    },
    {
      accessorKey: "taxPaid",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tax Paid" />,
      cell: ({ row }) => `$${row.getValue("taxPaid").toFixed(2)}`,
      enableSorting: true,
    },
    {
      accessorKey: "credit",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Credit/(Due)" />,
      cell: ({ row }) => {
        const value = row.getValue("credit");
        return (
          <span className={`font-medium ${value >= 0 ? "text-green-600" : "text-red-600"}`}>
            {value >= 0 ? `$${value.toFixed(2)}` : `($${Math.abs(value).toFixed(2)})`}
          </span>
        );
      },
      enableSorting: true,
    },
  ];

  // Scheduled Reports columns
  const scheduledColumns = [
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
            <DropdownMenuItem className="cursor-pointer" onClick={() => handleEditReport(row.original)}>
              <PencilIcon className="h-4 w-4 mr-2" /> Edit Schedule
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <RefreshCw className="h-4 w-4 mr-2" /> Run Now
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600">
              <TrashIcon className="h-4 w-4 mr-2" /> Delete Schedule
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Schedule ID" />,
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("id")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "reportName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Report Name" />,
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("reportName")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "frequency",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Frequency" />,
      cell: ({ row }) => (
        <Badge variant="outline">{row.getValue("frequency")}</Badge>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "nextRun",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Next Run" />,
      enableSorting: true,
    },
    {
      accessorKey: "recipients",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Recipients" />,
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground max-w-[200px] truncate block">
          {row.getValue("recipients")}
        </span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "format",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Format" />,
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
            : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/50"
          }>
            {status}
          </Badge>
        );
      },
      enableSorting: true,
    },
  ];


  // Filter groups for different tabs
  const iftaFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "quarter",
          label: "Quarter",
          type: "select",
          group: "Basic",
          options: [
            { value: "Q1 2025", label: "Q1 2025" },
            { value: "Q4 2024", label: "Q4 2024" },
            { value: "Q3 2024", label: "Q3 2024" },
            { value: "Q2 2024", label: "Q2 2024" },
            { value: "Q1 2024", label: "Q1 2024" },
          ],
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "Draft", label: "Draft" },
            { value: "Submitted", label: "Submitted" },
            { value: "Filed", label: "Filed" },
          ],
        },
      ],
    },
  ];

  const usageFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "reportName",
          label: "Report Name",
          type: "input",
          group: "Basic",
          placeholder: "Search report...",
        },
        {
          key: "reportType",
          label: "Report Type",
          type: "select",
          group: "Basic",
          options: [
            { value: "Monthly Summary", label: "Monthly Summary" },
            { value: "Driver Analysis", label: "Driver Analysis" },
            { value: "Fleet Analysis", label: "Fleet Analysis" },
            { value: "Cost Analysis", label: "Cost Analysis" },
          ],
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "Complete", label: "Complete" },
            { value: "In Progress", label: "In Progress" },
          ],
        },
      ],
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
            <TabsTrigger value="ifta" className="h-full">
              <Map className="size-4" />
              IFTA Reports
            </TabsTrigger>
            <TabsTrigger value="usage" className="h-full">
              <BarChart3 className="size-4" />
              Fuel Usage
            </TabsTrigger>
            <TabsTrigger value="jurisdiction" className="h-full">
              <FileText className="size-4" />
              Jurisdiction Breakdown
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="h-full">
              <Calendar className="size-4" />
              Scheduled Reports
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          {/* IFTA Reports Tab */}
          <TabsContent value="ifta" className="mt-0 p-4">
            <div className="flex items-center justify-between mb-1">
              <SmartFilter
                filterGroups={iftaFilterGroups}
                onFiltersChange={(filters) => console.log("Filters:", filters)}
              />
              <Button
                onClick={handleAddReport}
                className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Generate IFTA Report
              </Button>
            </div>
            <DataTable
              columns={iftaColumns}
              data={iftaReportsData}
              showViewOptions={false}
            />
          </TabsContent>

          {/* Fuel Usage Tab */}
          <TabsContent value="usage" className="mt-0 p-4">
            <div className="flex items-center justify-between mb-1">
              <SmartFilter
                filterGroups={usageFilterGroups}
                onFiltersChange={(filters) => console.log("Filters:", filters)}
              />
              <Button
                onClick={handleAddReport}
                className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
            <DataTable
              columns={usageColumns}
              data={fuelUsageData}
              showViewOptions={false}
            />
          </TabsContent>

          {/* Jurisdiction Breakdown Tab */}
          <TabsContent value="jurisdiction" className="mt-0 p-4">
            <div className="flex items-center justify-between mb-1">
              <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select quarter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Q1 2025">Q1 2025</SelectItem>
                  <SelectItem value="Q4 2024">Q4 2024</SelectItem>
                  <SelectItem value="Q3 2024">Q3 2024</SelectItem>
                  <SelectItem value="Q2 2024">Q2 2024</SelectItem>
                  <SelectItem value="Q1 2024">Q1 2024</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Breakdown
              </Button>
            </div>
            <DataTable
              columns={jurisdictionColumns}
              data={jurisdictionData}
              showViewOptions={false}
            />
          </TabsContent>

          {/* Scheduled Reports Tab */}
          <TabsContent value="scheduled" className="mt-0 p-4">
            <div className="flex items-center justify-between mb-1">
              <SmartFilter
                filterGroups={usageFilterGroups}
                onFiltersChange={(filters) => console.log("Filters:", filters)}
              />
              <Button
                onClick={handleAddReport}
                className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Schedule
              </Button>
            </div>
            <DataTable
              columns={scheduledColumns}
              data={scheduledReportsData}
              showViewOptions={false}
            />
          </TabsContent>
        </div>
      </Tabs>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {sheetMode === "add" ? "Generate New Report" : "Edit Schedule"}
            </SheetTitle>
          </SheetHeader>

          <form className="space-y-5 mt-4 px-6">
            <div className="space-y-2">
              <Label htmlFor="reportType" className="text-sm font-medium">
                Report Type <span className="text-red-500">*</span>
              </Label>
              <Select defaultValue="monthly">
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Summary</SelectItem>
                  <SelectItem value="driver">Driver Analysis</SelectItem>
                  <SelectItem value="fleet">Fleet Analysis</SelectItem>
                  <SelectItem value="cost">Cost Analysis</SelectItem>
                  <SelectItem value="ifta">IFTA Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="period" className="text-sm font-medium">
                Period <span className="text-red-500">*</span>
              </Label>
              <Select defaultValue="current">
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Month</SelectItem>
                  <SelectItem value="last">Last Month</SelectItem>
                  <SelectItem value="quarter">Current Quarter</SelectItem>
                  <SelectItem value="year">Year to Date</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="format" className="text-sm font-medium">
                Output Format <span className="text-red-500">*</span>
              </Label>
              <Select defaultValue="pdf">
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Recipients
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="email@company.com"
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
                {sheetMode === "add" ? "Generate Report" : "Save Changes"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
