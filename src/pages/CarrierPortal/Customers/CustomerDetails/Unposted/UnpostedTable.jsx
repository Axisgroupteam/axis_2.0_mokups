import { Button } from "@/components/ui/button";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, MoreHorizontal } from "lucide-react";

const UnpostedTable = () => {
  // Mock unposted data
  const unpostedData = [
    {
      id: 1,
      order: "ORD-2024-0234",
      status: "Pending",
      bol: "BOL-78234",
      shipDate: "2024-02-25",
      deliveryDate: "2024-02-27",
      freightCharges: 1250.00,
      otherCharges: 150.00,
      totalCharges: 1400.00,
    },
    {
      id: 2,
      order: "ORD-2024-0235",
      status: "In Transit",
      bol: "BOL-78235",
      shipDate: "2024-02-26",
      deliveryDate: "2024-02-28",
      freightCharges: 2100.00,
      otherCharges: 200.00,
      totalCharges: 2300.00,
    },
    {
      id: 3,
      order: "ORD-2024-0236",
      status: "Delivered",
      bol: "BOL-78236",
      shipDate: "2024-02-24",
      deliveryDate: "2024-02-26",
      freightCharges: 1800.00,
      otherCharges: 0.00,
      totalCharges: 1800.00,
    },
    {
      id: 4,
      order: "ORD-2024-0237",
      status: "Pending",
      bol: "BOL-78237",
      shipDate: "2024-02-27",
      deliveryDate: "2024-03-01",
      freightCharges: 3200.00,
      otherCharges: 350.00,
      totalCharges: 3550.00,
    },
    {
      id: 5,
      order: "ORD-2024-0238",
      status: "Ready",
      bol: "BOL-78238",
      shipDate: "2024-02-28",
      deliveryDate: "2024-03-02",
      freightCharges: 950.00,
      otherCharges: 100.00,
      totalCharges: 1050.00,
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

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
              <DropdownMenuItem>Post Order</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "order",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order" />
      ),
      size: 140,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      size: 100,
      cell: ({ row }) => {
        const status = row.getValue("status");
        const statusColors = {
          "Pending": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
          "In Transit": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
          "Delivered": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
          "Ready": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
        };
        return (
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[status] || "bg-gray-100 text-gray-800"}`}>
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "bol",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="BOL" />
      ),
      size: 120,
    },
    {
      accessorKey: "shipDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ship Date" />
      ),
      size: 120,
      cell: ({ row }) => formatDate(row.getValue("shipDate")),
    },
    {
      accessorKey: "deliveryDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Delivery Date" />
      ),
      size: 120,
      cell: ({ row }) => formatDate(row.getValue("deliveryDate")),
    },
    {
      accessorKey: "freightCharges",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Freight Charges" />
      ),
      size: 130,
      cell: ({ row }) => formatCurrency(row.getValue("freightCharges")),
    },
    {
      accessorKey: "otherCharges",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Other Charges" />
      ),
      size: 120,
      cell: ({ row }) => formatCurrency(row.getValue("otherCharges")),
    },
    {
      accessorKey: "totalCharges",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Charges" />
      ),
      size: 120,
      cell: ({ row }) => (
        <span className="font-medium">
          {formatCurrency(row.getValue("totalCharges"))}
        </span>
      ),
    },
  ];

  return (
    <div className="border border-border rounded-sm bg-card">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FileText className="size-4" />
          Unposted Details
        </h3>
      </div>
      <div className="px-4 pb-3">
        <DataTable
          columns={columns}
          data={unpostedData}
          showViewOptions={false}
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default UnpostedTable;
