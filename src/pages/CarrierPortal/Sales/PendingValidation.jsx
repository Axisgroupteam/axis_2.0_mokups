import { useState, useCallback } from "react";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SmartFilter from "@/components/SmartFilter";
import {
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";

const PendingValidation = () => {
  const [filters, setFilters] = useState([]);

  // Filter configuration
  const filterGroups = [
    {
      id: "validation-filters",
      label: "Filter Orders",
      filters: [
        {
          key: "loadId",
          label: "Load ID",
          type: "input",
          group: "Basic",
          placeholder: "Search load ID...",
        },
        {
          key: "customerName",
          label: "Customer",
          type: "input",
          group: "Basic",
          placeholder: "Search customer...",
        },
        {
          key: "validationStatus",
          label: "Overall Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "In Progress", label: "In Progress" },
            { value: "Passed", label: "Passed" },
            { value: "Failed", label: "Failed" },
          ],
        },
        {
          key: "creditStatus",
          label: "Credit Check",
          type: "select",
          group: "Basic",
          options: [
            { value: "Passed", label: "Passed" },
            { value: "Failed", label: "Failed" },
            { value: "Pending", label: "Pending" },
          ],
        },
        {
          key: "rateStatus",
          label: "Rate Card",
          type: "select",
          group: "Basic",
          options: [
            { value: "Passed", label: "Passed" },
            { value: "Failed", label: "Failed" },
            { value: "Pending", label: "Pending" },
          ],
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);
  // Mock data for orders pending validation
  const pendingOrdersData = [
    {
      id: 1,
      loadId: "ML-2025-001234",
      customerName: "ABC Logistics",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      submittedAt: "2024-01-28 10:30 AM",
      validationStatus: "In Progress",
      customerStatus: "Active",
      creditStatus: "Passed",
      rateStatus: "Pending",
      equipmentStatus: "Passed",
      fieldsStatus: "Passed",
    },
    {
      id: 2,
      loadId: "ML-2025-001235",
      customerName: "XYZ Freight",
      origin: "Austin, TX",
      destination: "San Antonio, TX",
      submittedAt: "2024-01-28 10:15 AM",
      validationStatus: "Failed",
      customerStatus: "Active",
      creditStatus: "Failed",
      rateStatus: "Passed",
      equipmentStatus: "Passed",
      fieldsStatus: "Passed",
    },
    {
      id: 3,
      loadId: "ML-2025-001236",
      customerName: "BuildRight Construction",
      origin: "Fort Worth, TX",
      destination: "Arlington, TX",
      submittedAt: "2024-01-28 09:45 AM",
      validationStatus: "In Progress",
      customerStatus: "Active",
      creditStatus: "Passed",
      rateStatus: "Passed",
      equipmentStatus: "Checking",
      fieldsStatus: "Passed",
    },
  ];

  const getValidationBadge = (status) => {
    const config = {
      "In Progress": { color: "bg-blue-500/10 text-blue-700 border-blue-500/50", icon: RefreshCw },
      "Passed": { color: "bg-green-500/10 text-green-700 border-green-500/50", icon: CheckCircle },
      "Failed": { color: "bg-red-500/10 text-red-700 border-red-500/50", icon: XCircle },
      "Pending": { color: "bg-yellow-500/10 text-yellow-700 border-yellow-500/50", icon: Clock },
      "Checking": { color: "bg-purple-500/10 text-purple-700 border-purple-500/50", icon: RefreshCw },
    };
    const { color, icon: Icon } = config[status] || config["Pending"];
    return (
      <Badge className={`${color} flex items-center gap-1`}>
        <Icon className="size-3" />
        {status}
      </Badge>
    );
  };

  const pendingColumns = [
    {
      accessorKey: "loadId",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Load ID" />,
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("loadId")}</span>
      ),
    },
    {
      accessorKey: "customerName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    },
    {
      accessorKey: "origin",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Origin" />,
    },
    {
      accessorKey: "destination",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Destination" />,
    },
    {
      accessorKey: "customerStatus",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Active" />,
      cell: ({ row }) => getValidationBadge(row.getValue("customerStatus")),
    },
    {
      accessorKey: "creditStatus",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Credit Check" />,
      cell: ({ row }) => getValidationBadge(row.getValue("creditStatus")),
    },
    {
      accessorKey: "rateStatus",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Rate Card" />,
      cell: ({ row }) => getValidationBadge(row.getValue("rateStatus")),
    },
    {
      accessorKey: "equipmentStatus",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Equipment" />,
      cell: ({ row }) => getValidationBadge(row.getValue("equipmentStatus")),
    },
    {
      accessorKey: "validationStatus",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Overall Status" />,
      cell: ({ row }) => getValidationBadge(row.getValue("validationStatus")),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const status = row.getValue("validationStatus");
        if (status === "Failed") {
          return (
            <Button size="sm" variant="outline" className="text-red-600">
              <AlertCircle className="size-3 mr-1" />
              Review
            </Button>
          );
        }
        return (
          <Button size="sm" variant="outline" disabled>
            <Clock className="size-3 mr-1" />
            Validating...
          </Button>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden p-4">
      {/* Validation Summary Cards */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="size-4" />
            <span className="text-xs">Total Pending</span>
          </div>
          <p className="text-2xl font-bold">3</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <RefreshCw className="size-4" />
            <span className="text-xs">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">2</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-red-600 mb-1">
            <XCircle className="size-4" />
            <span className="text-xs">Failed</span>
          </div>
          <p className="text-2xl font-bold text-red-600">1</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-yellow-600 mb-1">
            <AlertCircle className="size-4" />
            <span className="text-xs">Credit Review</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">1</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-purple-600 mb-1">
            <Clock className="size-4" />
            <span className="text-xs">Spot Quote Needed</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">0</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between mb-4">
        <SmartFilter
          filterGroups={filterGroups}
          onFiltersChange={handleFiltersChange}
        />
      </div>

      {/* Orders Table */}
      <DataTable
        columns={pendingColumns}
        data={pendingOrdersData}
        showViewOptions={false}
      />
    </div>
  );
};

export default PendingValidation;
