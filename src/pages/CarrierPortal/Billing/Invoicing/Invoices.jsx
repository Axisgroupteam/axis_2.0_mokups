import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import SmartFilter from "@/components/SmartFilter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  MoreHorizontal,
  EyeIcon,
  DownloadIcon,
  MailIcon,
  PrinterIcon,
  DollarSign,
  ClockIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  PlusIcon,
} from "lucide-react";

const Invoices = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);

  // Mock invoices data
  const invoicesData = [
    {
      id: 1,
      invoiceNo: "INV-2025-0001",
      customer: "Titan Construction",
      customerId: "CUST-001",
      invoiceDate: "2025-01-05",
      dueDate: "2025-01-20",
      loadCount: 5,
      subtotal: 9250.00,
      fuelSurcharge: 925.00,
      accessorials: 475.00,
      totalAmount: 10650.00,
      paidAmount: 0.00,
      balanceDue: 10650.00,
      status: "Pending",
      sentDate: null,
      paymentTerms: "Net 15",
    },
    {
      id: 2,
      invoiceNo: "INV-2025-0002",
      customer: "Ashgrove Cement",
      customerId: "CUST-002",
      invoiceDate: "2025-01-04",
      dueDate: "2025-01-19",
      loadCount: 3,
      subtotal: 5850.00,
      fuelSurcharge: 585.00,
      accessorials: 200.00,
      totalAmount: 6635.00,
      paidAmount: 6635.00,
      balanceDue: 0.00,
      status: "Paid",
      sentDate: "2025-01-04",
      paymentTerms: "Net 15",
    },
    {
      id: 3,
      invoiceNo: "INV-2025-0003",
      customer: "TQL Logistics",
      customerId: "CUST-003",
      invoiceDate: "2025-01-03",
      dueDate: "2025-01-18",
      loadCount: 2,
      subtotal: 3700.00,
      fuelSurcharge: 370.00,
      accessorials: 150.00,
      totalAmount: 4220.00,
      paidAmount: 2000.00,
      balanceDue: 2220.00,
      status: "Partial",
      sentDate: "2025-01-03",
      paymentTerms: "Net 15",
    },
    {
      id: 4,
      invoiceNo: "INV-2024-0245",
      customer: "CH Robinson",
      customerId: "CUST-004",
      invoiceDate: "2024-12-15",
      dueDate: "2024-12-30",
      loadCount: 4,
      subtotal: 7400.00,
      fuelSurcharge: 740.00,
      accessorials: 300.00,
      totalAmount: 8440.00,
      paidAmount: 0.00,
      balanceDue: 8440.00,
      status: "Overdue",
      sentDate: "2024-12-15",
      paymentTerms: "Net 15",
    },
    {
      id: 5,
      invoiceNo: "INV-2024-0244",
      customer: "Coyote Logistics",
      customerId: "CUST-005",
      invoiceDate: "2024-12-10",
      dueDate: "2024-12-25",
      loadCount: 6,
      subtotal: 11100.00,
      fuelSurcharge: 1110.00,
      accessorials: 450.00,
      totalAmount: 12660.00,
      paidAmount: 12660.00,
      balanceDue: 0.00,
      status: "Paid",
      sentDate: "2024-12-10",
      paymentTerms: "Net 15",
    },
    {
      id: 6,
      invoiceNo: "INV-2024-0243",
      customer: "Titan Construction",
      customerId: "CUST-001",
      invoiceDate: "2024-12-05",
      dueDate: "2024-12-20",
      loadCount: 8,
      subtotal: 14800.00,
      fuelSurcharge: 1480.00,
      accessorials: 600.00,
      totalAmount: 16880.00,
      paidAmount: 16880.00,
      balanceDue: 0.00,
      status: "Paid",
      sentDate: "2024-12-05",
      paymentTerms: "Net 15",
    },
  ];

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "invoiceNo",
          label: "Invoice No",
          type: "input",
          group: "Basic",
          placeholder: "Search invoice...",
        },
        {
          key: "customer",
          label: "Customer",
          type: "input",
          group: "Basic",
          placeholder: "Search customer...",
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "Pending", label: "Pending" },
            { value: "Paid", label: "Paid" },
            { value: "Partial", label: "Partial" },
            { value: "Overdue", label: "Overdue" },
          ],
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      Pending: "bg-amber-500/10 text-amber-700 border-amber-500/50",
      Paid: "bg-green-500/10 text-green-700 border-green-500/50",
      Partial: "bg-blue-500/10 text-blue-700 border-blue-500/50",
      Overdue: "bg-red-500/10 text-red-700 border-red-500/50",
    };
    return statusColors[status] || "bg-gray-500/10 text-gray-700 border-gray-500/50";
  };

  const getDaysOverdue = (dueDate, status) => {
    if (status === "Paid") return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diff = Math.floor((today - due) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : null;
  };

  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => {
        const invoice = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/billing/invoices/${invoice.invoiceNo}`)}>
                <EyeIcon className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PrinterIcon className="h-4 w-4 mr-2" />
                Print
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <MailIcon className="h-4 w-4 mr-2" />
                Send to Customer
              </DropdownMenuItem>
              {invoice.status !== "Paid" && (
                <DropdownMenuItem>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Record Payment
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "invoiceNo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Invoice No" />
      ),
      cell: ({ row }) => (
        <button
          onClick={() => navigate(`/app/carrier-portal/billing/invoices/${row.getValue("invoiceNo")}`)}
          className="font-mono text-sm font-medium text-primary hover:underline"
        >
          {row.getValue("invoiceNo")}
        </button>
      ),
    },
    {
      accessorKey: "customer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.getValue("customer")}</span>
          <span className="text-xs text-muted-foreground">{row.original.customerId}</span>
        </div>
      ),
    },
    {
      accessorKey: "invoiceDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Invoice Date" />
      ),
      cell: ({ row }) => formatDate(row.getValue("invoiceDate")),
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Due Date" />
      ),
      cell: ({ row }) => {
        const daysOverdue = getDaysOverdue(row.getValue("dueDate"), row.original.status);
        return (
          <div className="flex flex-col">
            <span>{formatDate(row.getValue("dueDate"))}</span>
            {daysOverdue && (
              <span className="text-xs text-red-600 font-medium">{daysOverdue} days overdue</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "loadCount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Loads" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("loadCount")}</span>
      ),
    },
    {
      accessorKey: "totalAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Amount" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{formatCurrency(row.getValue("totalAmount"))}</span>
      ),
    },
    {
      accessorKey: "paidAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Paid" />
      ),
      cell: ({ row }) => (
        <span className="text-green-600">{formatCurrency(row.getValue("paidAmount"))}</span>
      ),
    },
    {
      accessorKey: "balanceDue",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Balance Due" />
      ),
      cell: ({ row }) => {
        const balance = row.getValue("balanceDue");
        return (
          <span className={balance > 0 ? "font-bold text-amber-600" : "text-muted-foreground"}>
            {formatCurrency(balance)}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        return <Badge className={getStatusBadge(status)}>{status}</Badge>;
      },
    },
  ];

  // Calculate summary stats
  const totalInvoiced = invoicesData.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const totalPaid = invoicesData.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const totalOutstanding = invoicesData.reduce((sum, inv) => sum + inv.balanceDue, 0);
  const overdueCount = invoicesData.filter((inv) => inv.status === "Overdue").length;

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex-shrink-0 border-b bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <FileText className="size-6" />
              Customer Invoices
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and track all customer invoices
            </p>
          </div>
          <Button
            onClick={() => navigate("/app/carrier-portal/billing/ready-to-invoice")}
            className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            <PlusIcon className="size-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="flex-shrink-0 px-6 py-4 border-b">
        <div className="grid grid-cols-4 gap-4">
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <FileText className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Invoiced</p>
                <p className="text-xl font-bold">{formatCurrency(totalInvoiced)}</p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle2Icon className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Received</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <ClockIcon className="size-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Outstanding</p>
                <p className="text-xl font-bold text-amber-600">{formatCurrency(totalOutstanding)}</p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10">
                <AlertCircleIcon className="size-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Overdue</p>
                <p className="text-xl font-bold text-red-600">{overdueCount} invoices</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="border border-border rounded-lg bg-background">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <SmartFilter
              filterGroups={filterGroups}
              onFiltersChange={handleFiltersChange}
            />
          </div>
          <div className="px-4 pb-3">
            <DataTable
              columns={columns}
              data={invoicesData}
              showViewOptions={false}
              pageSize={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
