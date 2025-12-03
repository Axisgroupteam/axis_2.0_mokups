import { Button } from "@/components/ui/button";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, MoreHorizontal } from "lucide-react";

const ReceivablesTable = () => {
  // Mock receivables data
  const receivablesData = [
    {
      id: 1,
      calls: 2,
      type: "Invoice",
      order: "ORD-2024-001",
      reference: "REF-001",
      invoice: "INV-2024-0156",
      billDate: "2024-01-15",
      glDate: "2024-01-15",
      amount: 8500.00,
      balance: 8500.00,
      customer: "Acme Corporation",
      memo: "Bulk delivery - January",
      age: 45,
      current: false,
    },
    {
      id: 2,
      calls: 0,
      type: "Invoice",
      order: "ORD-2024-002",
      reference: "REF-002",
      invoice: "INV-2024-0157",
      billDate: "2024-01-20",
      glDate: "2024-01-20",
      amount: 12350.00,
      balance: 12350.00,
      customer: "Acme Corporation",
      memo: "Express shipment",
      age: 40,
      current: false,
    },
    {
      id: 3,
      calls: 1,
      type: "Credit",
      order: "ORD-2024-003",
      reference: "REF-003",
      invoice: "CR-2024-0012",
      billDate: "2024-02-01",
      glDate: "2024-02-01",
      amount: -3200.00,
      balance: -3200.00,
      customer: "Acme Corporation",
      memo: "Credit adjustment",
      age: 28,
      current: true,
    },
    {
      id: 4,
      calls: 0,
      type: "Invoice",
      order: "ORD-2024-004",
      reference: "REF-004",
      invoice: "INV-2024-0178",
      billDate: "2024-02-10",
      glDate: "2024-02-10",
      amount: 15200.00,
      balance: 15200.00,
      customer: "Acme Corporation",
      memo: "Monthly service fee",
      age: 19,
      current: true,
    },
    {
      id: 5,
      calls: 3,
      type: "Invoice",
      order: "ORD-2024-005",
      reference: "REF-005",
      invoice: "INV-2024-0189",
      billDate: "2023-11-15",
      glDate: "2023-11-15",
      amount: 4500.00,
      balance: 4500.00,
      customer: "Acme Corporation",
      memo: "Equipment rental",
      age: 105,
      current: false,
    },
    {
      id: 6,
      calls: 4,
      type: "Invoice",
      order: "ORD-2023-098",
      reference: "REF-098",
      invoice: "INV-2023-0892",
      billDate: "2023-10-01",
      glDate: "2023-10-01",
      amount: 2100.00,
      balance: 2100.00,
      customer: "Acme Corporation",
      memo: "Late delivery charge",
      age: 150,
      current: false,
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

  const getAgeColor = (age) => {
    if (age <= 30) return "text-green-600";
    if (age <= 60) return "text-yellow-600";
    if (age <= 90) return "text-orange-600";
    return "text-red-600";
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
              <DropdownMenuItem>Record Payment</DropdownMenuItem>
              <DropdownMenuItem>Send Reminder</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "calls",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Calls" />
      ),
      size: 70,
      cell: ({ row }) => (
        <span className={row.getValue("calls") > 2 ? "text-red-600 font-medium" : ""}>
          {row.getValue("calls")}
        </span>
      ),
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      size: 90,
      cell: ({ row }) => {
        const type = row.getValue("type");
        return (
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
            type === "Invoice"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          }`}>
            {type}
          </span>
        );
      },
    },
    {
      accessorKey: "order",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order" />
      ),
      size: 130,
    },
    {
      accessorKey: "reference",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Reference" />
      ),
      size: 100,
    },
    {
      accessorKey: "invoice",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Invoice" />
      ),
      size: 130,
    },
    {
      accessorKey: "billDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Bill Date" />
      ),
      size: 110,
      cell: ({ row }) => formatDate(row.getValue("billDate")),
    },
    {
      accessorKey: "glDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="GL Date" />
      ),
      size: 110,
      cell: ({ row }) => formatDate(row.getValue("glDate")),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      size: 110,
      cell: ({ row }) => {
        const amount = row.getValue("amount");
        return (
          <span className={amount < 0 ? "text-green-600" : ""}>
            {formatCurrency(amount)}
          </span>
        );
      },
    },
    {
      accessorKey: "balance",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Balance" />
      ),
      size: 110,
      cell: ({ row }) => {
        const balance = row.getValue("balance");
        return (
          <span className={balance < 0 ? "text-green-600 font-medium" : "font-medium"}>
            {formatCurrency(balance)}
          </span>
        );
      },
    },
    {
      accessorKey: "memo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Memo" />
      ),
      size: 180,
    },
    {
      accessorKey: "age",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Age" />
      ),
      size: 80,
      cell: ({ row }) => {
        const age = row.getValue("age");
        return (
          <span className={`font-medium ${getAgeColor(age)}`}>
            {age} days
          </span>
        );
      },
    },
    {
      accessorKey: "current",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Current" />
      ),
      size: 90,
      cell: ({ row }) => {
        const current = row.getValue("current");
        return (
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
            current
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}>
            {current ? "Yes" : "No"}
          </span>
        );
      },
    },
  ];

  return (
    <div className="border border-border rounded-sm bg-card">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FileText className="size-4" />
          Receivables Details
        </h3>
      </div>
      <div className="px-4 pb-3">
        <DataTable
          columns={columns}
          data={receivablesData}
          showViewOptions={false}
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ReceivablesTable;
