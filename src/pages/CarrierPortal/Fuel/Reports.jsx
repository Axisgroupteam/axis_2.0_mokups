import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import {
  Map,
  AlertTriangle,
  Building2,
  TrendingUp,
  Fuel,
  DollarSign,
  Droplets,
  RefreshCw,
  Download,
} from "lucide-react";

// Mock data for IFTA Summary
const iftaData = [
  { id: 1, state: "Texas", diesel: 42847, def: 4218, reefer: 2847 },
  { id: 2, state: "Florida", diesel: 38421, def: 3842, reefer: 2421 },
  { id: 3, state: "Louisiana", diesel: 24218, def: 2422, reefer: 1218 },
  { id: 4, state: "Mississippi", diesel: 18942, def: 1894, reefer: 942 },
  { id: 5, state: "Alabama", diesel: 14218, def: 1422, reefer: 718 },
  { id: 6, state: "Georgia", diesel: 12847, def: 1285, reefer: 647 },
];

// Margin data
const marginData = [
  { id: 1, entity: "Company Drivers", gallons: 127842, ourCost: 408108, billed: 457895, margin: 49787 },
  { id: 2, entity: "Owner-Operators", gallons: 89421, ourCost: 286148, billed: 314763, margin: 28615 },
  { id: 3, entity: "Franchises", gallons: 62184, ourCost: 198989, billed: 218867, margin: 19878 },
  { id: 4, entity: "Carriers (Brokerage)", gallons: 18247, ourCost: 58390, billed: 62057, margin: 3667 },
];

// Fraud data
const fraudMetrics = [
  { label: "Out-of-Route Purchases", count: 7, severity: "warning" },
  { label: "Unusual Volume", count: 3, severity: "info" },
  { label: "Duplicate Transactions", count: 0, severity: "success" },
  { label: "Velocity Flags", count: 2, severity: "warning" },
];

const flaggedTransactions = [
  {
    id: 1,
    driver: "James Wilson",
    issue: "Out-of-route: 47 miles from assigned path",
    location: "Shell #2847 - Abilene, TX",
    date: "Dec 11",
    amount: 287.42,
  },
  {
    id: 2,
    driver: "Unknown Card",
    issue: "Unusual volume: 198 gal single transaction",
    location: "Pilot #8821 - Memphis, TN",
    date: "Dec 10",
    amount: 648.24,
  },
];


// Fraud Metric Component
function FraudMetric({ label, count, severity }) {
  const severityColors = {
    warning: "text-amber-600",
    info: "text-blue-600",
    success: "text-green-600",
  };

  return (
    <div className="border rounded-lg p-4 bg-card">
      <div className={`flex items-center gap-2 ${severityColors[severity]} mb-1`}>
        <AlertTriangle className="size-4" />
        <span className="text-xs">{label}</span>
      </div>
      <p className={`text-2xl font-bold ${severityColors[severity]}`}>{count}</p>
    </div>
  );
}

export default function Reports() {
  const [activeTab, setActiveTab] = useState("margin");

  // IFTA columns
  const iftaColumns = [
    {
      accessorKey: "state",
      header: ({ column }) => <DataTableColumnHeader column={column} title="State" />,
      cell: ({ row }) => <span className="font-medium">{row.getValue("state")}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "diesel",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Diesel (Gal)" />,
      cell: ({ row }) => row.getValue("diesel").toLocaleString(),
      enableSorting: true,
    },
    {
      accessorKey: "def",
      header: ({ column }) => <DataTableColumnHeader column={column} title="DEF (Gal)" />,
      cell: ({ row }) => row.getValue("def").toLocaleString(),
      enableSorting: true,
    },
    {
      accessorKey: "reefer",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Reefer (Gal)" />,
      cell: ({ row }) => row.getValue("reefer").toLocaleString(),
      enableSorting: true,
    },
    {
      id: "total",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
      cell: ({ row }) => {
        const total = row.getValue("diesel") + row.getValue("def") + row.getValue("reefer");
        return <span className="font-medium">{total.toLocaleString()}</span>;
      },
      enableSorting: false,
    },
  ];

  // Flagged transactions columns
  const flaggedColumns = [
    {
      accessorKey: "driver",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Driver" />,
      cell: ({ row }) => <span className="font-medium">{row.getValue("driver")}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "issue",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Issue" />,
      cell: ({ row }) => (
        <span className="text-amber-500 text-sm">{row.getValue("issue")}</span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "location",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />,
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">{row.getValue("location")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "date",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
      enableSorting: true,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
      cell: ({ row }) => (
        <span className="font-medium">${row.getValue("amount").toFixed(2)}</span>
      ),
      enableSorting: true,
    },
  ];

  // Margin columns
  const marginColumns = [
    {
      accessorKey: "entity",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Entity Type" />,
      cell: ({ row }) => <span className="font-medium">{row.getValue("entity")}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "gallons",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Gallons" />,
      cell: ({ row }) => row.getValue("gallons").toLocaleString(),
      enableSorting: true,
    },
    {
      accessorKey: "ourCost",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Our Cost" />,
      cell: ({ row }) => `$${row.getValue("ourCost").toLocaleString()}`,
      enableSorting: true,
    },
    {
      accessorKey: "billed",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Billed" />,
      cell: ({ row }) => `$${row.getValue("billed").toLocaleString()}`,
      enableSorting: true,
    },
    {
      accessorKey: "margin",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Margin" />,
      cell: ({ row }) => (
        <span className="font-medium text-green-500">${row.getValue("margin").toLocaleString()}</span>
      ),
      enableSorting: true,
    },
    {
      id: "marginPercent",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Margin %" />,
      cell: ({ row }) => {
        const margin = row.getValue("margin");
        const ourCost = row.getValue("ourCost");
        const percent = ((margin / ourCost) * 100).toFixed(1);
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
            +{percent}%
          </Badge>
        );
      },
      enableSorting: false,
    },
  ];

  // Calculate totals for margin
  const totalMargin = marginData.reduce((sum, item) => sum + item.margin, 0);
  const totalGallons = marginData.reduce((sum, item) => sum + item.gallons, 0);

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full h-full flex flex-col overflow-hidden"
      >
        <div className="flex-shrink-0">
          <TabsList className="mb-0 rounded-none">
            <TabsTrigger value="margin" className="h-full">
              <TrendingUp className="size-4" />
              Margin Analysis
            </TabsTrigger>
            <TabsTrigger value="mpg" className="h-full">
              <Fuel className="size-4" />
              MPG Fleet Analysis
            </TabsTrigger>
            <TabsTrigger value="fraud" className="h-full">
              <AlertTriangle className="size-4" />
              Fraud Detection
            </TabsTrigger>
            <TabsTrigger value="ifta" className="h-full">
              <Map className="size-4" />
              IFTA Summary
            </TabsTrigger>
            <TabsTrigger value="franchise" className="h-full">
              <Building2 className="size-4" />
              Franchise Audit
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          {/* Margin Analysis Tab */}
          <TabsContent value="margin" className="mt-0 p-4">
            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mb-4">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Now
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="border rounded-lg p-4 bg-card">
                <div className="flex items-center gap-2 text-green-600 mb-1">
                  <DollarSign className="size-4" />
                  <span className="text-xs">Total Revenue (MTD)</span>
                </div>
                <p className="text-2xl font-bold text-green-600">${totalMargin.toLocaleString()}</p>
              </div>
              <div className="border rounded-lg p-4 bg-card">
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <Droplets className="size-4" />
                  <span className="text-xs">Total Gallons (MTD)</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{totalGallons.toLocaleString()}</p>
              </div>
              <div className="border rounded-lg p-4 bg-card">
                <div className="flex items-center gap-2 text-purple-600 mb-1">
                  <TrendingUp className="size-4" />
                  <span className="text-xs">Avg Margin %</span>
                </div>
                <p className="text-2xl font-bold text-purple-600">12.2%</p>
              </div>
              <div className="border rounded-lg p-4 bg-card">
                <div className="flex items-center gap-2 text-amber-600 mb-1">
                  <Building2 className="size-4" />
                  <span className="text-xs">Entity Types</span>
                </div>
                <p className="text-2xl font-bold text-amber-600">4</p>
              </div>
            </div>

            {/* Margin Table */}
            <DataTable
              columns={marginColumns}
              data={marginData}
              showViewOptions={false}
            />
          </TabsContent>

          {/* MPG Fleet Analysis Tab */}
          <TabsContent value="mpg" className="mt-0 p-4">
            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mb-4">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Now
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            <div className="bg-card rounded-lg border p-6">
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </TabsContent>

          {/* Fraud Detection Tab */}
          <TabsContent value="fraud" className="mt-0 p-4">
            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mb-4">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Now
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            {/* Fraud Metrics */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              {fraudMetrics.map((metric) => (
                <FraudMetric key={metric.label} {...metric} />
              ))}
            </div>

            {/* Flagged Transactions */}
            <DataTable
              columns={flaggedColumns}
              data={flaggedTransactions}
              showViewOptions={false}
            />
          </TabsContent>

          {/* IFTA Summary Tab */}
          <TabsContent value="ifta" className="mt-0 p-4">
            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mb-4">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Now
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            <DataTable
              columns={iftaColumns}
              data={iftaData}
              showViewOptions={false}
            />
          </TabsContent>

          {/* Franchise Audit Tab */}
          <TabsContent value="franchise" className="mt-0 p-4">
            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mb-4">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Now
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            <div className="bg-card rounded-lg border p-6">
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
