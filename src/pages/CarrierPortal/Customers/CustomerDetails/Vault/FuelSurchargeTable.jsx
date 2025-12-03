import { Button } from "@/components/ui/button";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Fuel, MoreHorizontal, Plus } from "lucide-react";

const FuelSurchargeTable = () => {
  // Mock fuel surcharge data
  const fuelSurchargeData = [
    {
      id: 1,
      code: "FSC-001",
      startDate: "2024-01-01",
      endDate: "2024-06-30",
      mode: "Percentage",
      rateType: "Variable",
      dateToUse: "Pickup Date",
      method: "DOE National Average",
      amount: "15%",
    },
    {
      id: 2,
      code: "FSC-002",
      startDate: "2024-02-01",
      endDate: "2024-12-31",
      mode: "Flat Rate",
      rateType: "Fixed",
      dateToUse: "Delivery Date",
      method: "Regional Average",
      amount: "$0.45/mile",
    },
    {
      id: 3,
      code: "FSC-003",
      startDate: "2024-03-15",
      endDate: "2024-09-15",
      mode: "Percentage",
      rateType: "Tiered",
      dateToUse: "Invoice Date",
      method: "EIA Weekly",
      amount: "12%",
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      size: 100,
    },
    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Start Date" />
      ),
      size: 120,
      cell: ({ row }) => formatDate(row.getValue("startDate")),
    },
    {
      accessorKey: "endDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="End Date" />
      ),
      size: 120,
      cell: ({ row }) => formatDate(row.getValue("endDate")),
    },
    {
      accessorKey: "mode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mode" />
      ),
      size: 100,
      cell: ({ row }) => {
        const mode = row.getValue("mode");
        return (
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
            mode === "Percentage"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
          }`}>
            {mode}
          </span>
        );
      },
    },
    {
      accessorKey: "rateType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rate Type" />
      ),
      size: 100,
    },
    {
      accessorKey: "dateToUse",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date to Use" />
      ),
      size: 120,
    },
    {
      accessorKey: "method",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Method" />
      ),
      size: 150,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      size: 100,
      cell: ({ row }) => (
        <span className="font-semibold text-foreground">
          {row.getValue("amount")}
        </span>
      ),
    },
  ];

  return (
    <div className="border border-border rounded-sm bg-card">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Fuel className="size-4" />
          Fuel Surcharge
        </h3>
        <Button
          size="sm"
          className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
        >
          <Plus className="size-3" />
          Add Fuel Surcharge
        </Button>
      </div>
      <div className="px-4 pb-3">
        <DataTable
          columns={columns}
          data={fuelSurchargeData}
          showViewOptions={false}
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default FuelSurchargeTable;
