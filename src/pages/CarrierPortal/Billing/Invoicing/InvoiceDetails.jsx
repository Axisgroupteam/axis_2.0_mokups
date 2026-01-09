import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeftIcon,
  FileText,
  DownloadIcon,
  MailIcon,
  PrinterIcon,
  DollarSign,
  Building2Icon,
  CalendarIcon,
  TruckIcon,
  MapPinIcon,
  PlusIcon,
} from "lucide-react";

const InvoiceDetails = () => {
  const { invoiceNo } = useParams();
  const navigate = useNavigate();
  const [isPaymentSheetOpen, setIsPaymentSheetOpen] = useState(false);
  const [paymentFormData, setPaymentFormData] = useState({
    amount: "",
    paymentDate: "",
    paymentMethod: "",
    referenceNo: "",
    notes: "",
  });

  // Mock invoice data
  const invoice = {
    invoiceNo: invoiceNo || "INV-2025-0001",
    customer: "Titan Construction",
    customerId: "CUST-001",
    customerAddress: "1234 Industrial Blvd, Houston, TX 77001",
    customerPhone: "(713) 555-0101",
    customerEmail: "billing@titanconstruction.com",
    invoiceDate: "2025-01-05",
    dueDate: "2025-01-20",
    paymentTerms: "Net 15",
    status: "Pending",
    subtotal: 9250.00,
    fuelSurcharge: 925.00,
    accessorials: 475.00,
    totalAmount: 10650.00,
    paidAmount: 0.00,
    balanceDue: 10650.00,
    notes: "Thank you for your business. Payment is due within 15 days.",
  };

  // Mock line items (loads)
  const lineItems = [
    {
      id: 1,
      loadNo: "ML-2025-001245",
      deliveryDate: "2025-01-03",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      commodity: "Cement",
      weight: "24,500 lbs",
      freight: 1850.00,
      fuelSurcharge: 185.00,
      accessorials: 150.00,
      total: 2185.00,
    },
    {
      id: 2,
      loadNo: "ML-2025-001246",
      deliveryDate: "2025-01-03",
      origin: "Austin, TX",
      destination: "Dallas, TX",
      commodity: "Sand",
      weight: "22,000 lbs",
      freight: 1650.00,
      fuelSurcharge: 165.00,
      accessorials: 75.00,
      total: 1890.00,
    },
    {
      id: 3,
      loadNo: "ML-2025-001250",
      deliveryDate: "2025-01-04",
      origin: "Houston, TX",
      destination: "San Antonio, TX",
      commodity: "Cement",
      weight: "25,000 lbs",
      freight: 1900.00,
      fuelSurcharge: 190.00,
      accessorials: 100.00,
      total: 2190.00,
    },
    {
      id: 4,
      loadNo: "ML-2025-001251",
      deliveryDate: "2025-01-04",
      origin: "Fort Worth, TX",
      destination: "Houston, TX",
      commodity: "Flyash",
      weight: "23,500 lbs",
      freight: 1950.00,
      fuelSurcharge: 195.00,
      accessorials: 75.00,
      total: 2220.00,
    },
    {
      id: 5,
      loadNo: "ML-2025-001252",
      deliveryDate: "2025-01-05",
      origin: "Dallas, TX",
      destination: "Houston, TX",
      commodity: "Aggregate",
      weight: "24,000 lbs",
      freight: 1900.00,
      fuelSurcharge: 190.00,
      accessorials: 75.00,
      total: 2165.00,
    },
  ];

  // Mock payment history
  const paymentHistory = [
    // Empty for pending invoice
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
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

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    console.log("Payment submitted:", paymentFormData);
    setIsPaymentSheetOpen(false);
    setPaymentFormData({
      amount: "",
      paymentDate: "",
      paymentMethod: "",
      referenceNo: "",
      notes: "",
    });
  };

  const lineItemColumns = [
    {
      accessorKey: "loadNo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Load No" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm font-medium text-primary">
          {row.getValue("loadNo")}
        </span>
      ),
    },
    {
      accessorKey: "deliveryDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Delivery Date" />
      ),
      cell: ({ row }) => formatDate(row.getValue("deliveryDate")),
    },
    {
      accessorKey: "origin",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Origin" />
      ),
    },
    {
      accessorKey: "destination",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Destination" />
      ),
    },
    {
      accessorKey: "commodity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Commodity" />
      ),
      cell: ({ row }) => (
        <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/50">
          {row.getValue("commodity")}
        </Badge>
      ),
    },
    {
      accessorKey: "weight",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Weight" />
      ),
    },
    {
      accessorKey: "freight",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Freight" />
      ),
      cell: ({ row }) => formatCurrency(row.getValue("freight")),
    },
    {
      accessorKey: "fuelSurcharge",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fuel SC" />
      ),
      cell: ({ row }) => formatCurrency(row.getValue("fuelSurcharge")),
    },
    {
      accessorKey: "accessorials",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Accessorials" />
      ),
      cell: ({ row }) => formatCurrency(row.getValue("accessorials")),
    },
    {
      accessorKey: "total",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total" />
      ),
      cell: ({ row }) => (
        <span className="font-bold">{formatCurrency(row.getValue("total"))}</span>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex-shrink-0 border-b bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/app/carrier-portal/billing/invoices")}
            >
              <ArrowLeftIcon className="size-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <FileText className="size-6" />
                  {invoice.invoiceNo}
                </h1>
                <Badge className={getStatusBadge(invoice.status)}>{invoice.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Invoice for {invoice.customer}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <PrinterIcon className="size-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <DownloadIcon className="size-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm">
              <MailIcon className="size-4 mr-2" />
              Send to Customer
            </Button>
            {invoice.status !== "Paid" && (
              <Button
                onClick={() => setIsPaymentSheetOpen(true)}
                className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                <DollarSign className="size-4 mr-2" />
                Record Payment
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Invoice Header Info */}
          <div className="grid grid-cols-2 gap-6">
            {/* Customer Info */}
            <div className="border rounded-lg bg-card">
              <div className="px-4 py-3 border-b bg-muted">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Building2Icon className="size-4" />
                  Bill To
                </h3>
              </div>
              <div className="p-4 space-y-2">
                <p className="font-bold text-lg">{invoice.customer}</p>
                <p className="text-sm text-muted-foreground">{invoice.customerAddress}</p>
                <p className="text-sm text-muted-foreground">{invoice.customerPhone}</p>
                <p className="text-sm text-primary">{invoice.customerEmail}</p>
              </div>
            </div>

            {/* Invoice Info */}
            <div className="border rounded-lg bg-card">
              <div className="px-4 py-3 border-b bg-muted">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <CalendarIcon className="size-4" />
                  Invoice Details
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Invoice Date</p>
                    <p className="font-medium">{formatDate(invoice.invoiceDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Due Date</p>
                    <p className="font-medium">{formatDate(invoice.dueDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Payment Terms</p>
                    <p className="font-medium">{invoice.paymentTerms}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Customer ID</p>
                    <p className="font-medium font-mono">{invoice.customerId}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="border rounded-lg bg-card">
            <div className="px-4 py-3 border-b bg-muted">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <TruckIcon className="size-4" />
                Line Items ({lineItems.length} loads)
              </h3>
            </div>
            <div className="p-4">
              <DataTable
                columns={lineItemColumns}
                data={lineItems}
                showViewOptions={false}
                pageSize={10}
              />
            </div>
          </div>

          {/* Summary and Payment History */}
          <div className="grid grid-cols-2 gap-6">
            {/* Invoice Summary */}
            <div className="border rounded-lg bg-card">
              <div className="px-4 py-3 border-b bg-muted">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <DollarSign className="size-4" />
                  Invoice Summary
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal (Freight)</span>
                  <span>{formatCurrency(invoice.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fuel Surcharge</span>
                  <span>{formatCurrency(invoice.fuelSurcharge)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Accessorials</span>
                  <span>{formatCurrency(invoice.accessorials)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>Total Amount</span>
                  <span>{formatCurrency(invoice.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Amount Paid</span>
                  <span>{formatCurrency(invoice.paidAmount)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Balance Due</span>
                  <span className={invoice.balanceDue > 0 ? "text-amber-600" : "text-green-600"}>
                    {formatCurrency(invoice.balanceDue)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="border rounded-lg bg-card">
              <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <DollarSign className="size-4" />
                  Payment History
                </h3>
                {invoice.status !== "Paid" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPaymentSheetOpen(true)}
                  >
                    <PlusIcon className="size-3 mr-1" />
                    Add Payment
                  </Button>
                )}
              </div>
              <div className="p-4">
                {paymentHistory.length > 0 ? (
                  <div className="space-y-3">
                    {paymentHistory.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{formatCurrency(payment.amount)}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(payment.date)} via {payment.method}
                          </p>
                        </div>
                        <Badge className="bg-green-500/10 text-green-700 border-green-500/50">
                          Received
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <DollarSign className="size-8 mx-auto mb-2 opacity-50" />
                    <p>No payments recorded yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="border rounded-lg bg-card p-4">
              <p className="text-sm text-muted-foreground">{invoice.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Record Payment Sheet */}
      <Sheet open={isPaymentSheetOpen} onOpenChange={setIsPaymentSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold">Record Payment</SheetTitle>
          </SheetHeader>

          <form onSubmit={handlePaymentSubmit} className="space-y-5 mt-4 mb-2 px-6">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Invoice</span>
                <span className="font-mono font-medium">{invoice.invoiceNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Balance Due</span>
                <span className="font-bold text-amber-600">{formatCurrency(invoice.balanceDue)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Payment Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={paymentFormData.amount}
                  onChange={(e) => setPaymentFormData({ ...paymentFormData, amount: e.target.value })}
                  className="h-10 pl-7"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentDate">Payment Date</Label>
              <Input
                id="paymentDate"
                type="date"
                value={paymentFormData.paymentDate}
                onChange={(e) => setPaymentFormData({ ...paymentFormData, paymentDate: e.target.value })}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                value={paymentFormData.paymentMethod}
                onValueChange={(value) => setPaymentFormData({ ...paymentFormData, paymentMethod: value })}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ach">ACH Transfer</SelectItem>
                  <SelectItem value="wire">Wire Transfer</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="referenceNo">Reference / Check Number</Label>
              <Input
                id="referenceNo"
                type="text"
                placeholder="Enter reference number"
                value={paymentFormData.referenceNo}
                onChange={(e) => setPaymentFormData({ ...paymentFormData, referenceNo: e.target.value })}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter notes..."
                value={paymentFormData.notes}
                onChange={(e) => setPaymentFormData({ ...paymentFormData, notes: e.target.value })}
                className="min-h-20 resize-none"
              />
            </div>

            <div className="flex gap-3 pt-6 border-t px-6 -mx-6 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPaymentSheetOpen(false)}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Record Payment
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default InvoiceDetails;
