import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusIcon, MoreHorizontalIcon, FileText } from "lucide-react";

const InvoicesTable = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    paymentAmount: "",
    paymentDate: "",
    paymentMethod: "",
    notes: "",
  });

  // Mock invoices data
  const invoices = [
    {
      id: 1,
      invoiceId: "INV-2024-001",
      amount: "$5,250.00",
      dueDate: "2024-12-15",
      status: "Paid",
    },
    {
      id: 2,
      invoiceId: "INV-2024-002",
      amount: "$3,800.00",
      dueDate: "2024-12-20",
      status: "Pending",
    },
    {
      id: 3,
      invoiceId: "INV-2024-003",
      amount: "$7,500.00",
      dueDate: "2024-12-10",
      status: "Overdue",
    },
    {
      id: 4,
      invoiceId: "INV-2024-004",
      amount: "$2,100.00",
      dueDate: "2024-12-25",
      status: "Paid",
    },
    {
      id: 5,
      invoiceId: "INV-2024-005",
      amount: "$4,600.00",
      dueDate: "2024-12-18",
      status: "Pending",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSheetOpen(false);
    setFormData({
      invoiceNumber: "",
      paymentAmount: "",
      paymentDate: "",
      paymentMethod: "",
      notes: "",
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setFormData({
      invoiceNumber: "",
      paymentAmount: "",
      paymentDate: "",
      paymentMethod: "",
      notes: "",
    });
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      Paid: "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50",
      Pending: "bg-yellow-500/10 hover:bg-yellow-500/30 text-yellow-700 dark:text-yellow-400 border border-yellow-500/50",
      Overdue: "bg-red-500/10 hover:bg-red-500/30 text-red-700 dark:text-red-400 border border-red-500/50",
    };
    return statusColors[status] || "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  return (
    <div className="border rounded-sm bg-card">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FileText className="size-4" />
          Invoices
        </h3>
        <Button
          size="sm"
          className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
          onClick={() => setIsSheetOpen(true)}
        >
          <PlusIcon className="size-3" />
          Add Invoice
        </Button>
      </div>
      <div className="p-4">
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-semibold border-r h-9 py-2">
                  Invoice Id
                </TableHead>
                <TableHead className="text-xs font-semibold border-r h-9 py-2">
                  Amount
                </TableHead>
                <TableHead className="text-xs font-semibold border-r h-9 py-2">
                  Due Date
                </TableHead>
                <TableHead className="text-xs font-semibold border-r h-9 py-2">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold h-9 py-2">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="text-xs border-r py-2.5">
                    {invoice.invoiceId}
                  </TableCell>
                  <TableCell className="text-xs border-r py-2.5">
                    {invoice.amount}
                  </TableCell>
                  <TableCell className="text-xs border-r py-2.5">
                    {invoice.dueDate}
                  </TableCell>
                  <TableCell className="text-xs border-r py-2.5">
                    <Badge className={getStatusBadge(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs py-2.5">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Invoice Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <div className="flex items-center gap-3">
              <div>
                <SheetTitle className="text-xl font-bold text-gray-900">
                  Add Invoice
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-2 mb-2 px-6">
            {/* Invoice Number */}
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber" className="text-sm font-medium text-gray-700">
                Invoice Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="invoiceNumber"
                type="text"
                placeholder="INV-2024-001"
                value={formData.invoiceNumber}
                onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Payment Amount */}
            <div className="space-y-2">
              <Label htmlFor="paymentAmount" className="text-sm font-medium text-gray-700">
                Payment Amount <span className="text-red-500">*</span>
              </Label>
              <Input
                id="paymentAmount"
                type="number"
                placeholder="0.00"
                value={formData.paymentAmount}
                onChange={(e) => handleInputChange("paymentAmount", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Payment Date */}
            <div className="space-y-2">
              <Label htmlFor="paymentDate" className="text-sm font-medium text-gray-700">
                Payment Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="paymentDate"
                type="date"
                value={formData.paymentDate}
                onChange={(e) => handleInputChange("paymentDate", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label htmlFor="paymentMethod" className="text-sm font-medium text-gray-700">
                Payment Method <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) => handleInputChange("paymentMethod", value)}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="wire_transfer">Wire Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                Notes
              </Label>
              <Input
                id="notes"
                type="text"
                placeholder="Additional notes..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="h-10"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t px-6 -mx-6 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Add Invoice
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default InvoicesTable;
