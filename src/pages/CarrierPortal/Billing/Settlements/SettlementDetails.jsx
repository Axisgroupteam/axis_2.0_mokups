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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeftIcon,
  Wallet,
  DownloadIcon,
  PrinterIcon,
  DollarSign,
  UserIcon,
  CalendarIcon,
  TruckIcon,
  BanknoteIcon,
  FuelIcon,
  MinusCircleIcon,
  PlusIcon,
} from "lucide-react";

const SettlementDetails = () => {
  const { settlementNo } = useParams();
  const navigate = useNavigate();
  const [isDeductionSheetOpen, setIsDeductionSheetOpen] = useState(false);
  const [showProcessPaymentDialog, setShowProcessPaymentDialog] = useState(false);
  const [deductionFormData, setDeductionFormData] = useState({
    type: "",
    amount: "",
    description: "",
  });

  // Mock settlement data
  const settlement = {
    settlementNo: settlementNo || "STL-2025-0001",
    driver: "John Smith",
    driverId: "DRV-001",
    driverEmail: "john.smith@email.com",
    driverPhone: "(713) 555-1234",
    payType: "Per Mile",
    payRate: "$2.00/mile",
    periodStart: "2025-01-01",
    periodEnd: "2025-01-07",
    status: "Pending",
    paymentMethod: "Direct Deposit",
    bankAccount: "****4521",
    createdDate: "2025-01-08",
    grossPay: 3840.00,
    fuelAdvances: 1200.00,
    accessorialPay: 350.00,
    deductions: 75.00,
    netPay: 2915.00,
    notes: "Weekly settlement for John Smith. All loads verified.",
  };

  // Mock load details for settlement
  const loadDetails = [
    {
      id: 1,
      loadNo: "ML-2025-001245",
      deliveryDate: "2025-01-02",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      customer: "Titan Construction",
      miles: 240,
      lineHaulPay: 480.00,
      fuelAdvance: 150.00,
      accessorialPay: 75.00,
      netPay: 405.00,
    },
    {
      id: 2,
      loadNo: "ML-2025-001248",
      deliveryDate: "2025-01-03",
      origin: "Fort Worth, TX",
      destination: "Austin, TX",
      customer: "TQL Logistics",
      miles: 190,
      lineHaulPay: 380.00,
      fuelAdvance: 100.00,
      accessorialPay: 50.00,
      netPay: 330.00,
    },
    {
      id: 3,
      loadNo: "ML-2025-001252",
      deliveryDate: "2025-01-04",
      origin: "Dallas, TX",
      destination: "Houston, TX",
      customer: "CH Robinson",
      miles: 240,
      lineHaulPay: 480.00,
      fuelAdvance: 150.00,
      accessorialPay: 75.00,
      netPay: 405.00,
    },
    {
      id: 4,
      loadNo: "ML-2025-001255",
      deliveryDate: "2025-01-05",
      origin: "San Antonio, TX",
      destination: "Fort Worth, TX",
      customer: "Ashgrove Cement",
      miles: 265,
      lineHaulPay: 530.00,
      fuelAdvance: 175.00,
      accessorialPay: 50.00,
      netPay: 405.00,
    },
    {
      id: 5,
      loadNo: "ML-2025-001258",
      deliveryDate: "2025-01-05",
      origin: "Houston, TX",
      destination: "Austin, TX",
      customer: "Titan Construction",
      miles: 165,
      lineHaulPay: 330.00,
      fuelAdvance: 100.00,
      accessorialPay: 25.00,
      netPay: 255.00,
    },
    {
      id: 6,
      loadNo: "ML-2025-001261",
      deliveryDate: "2025-01-06",
      origin: "Dallas, TX",
      destination: "San Antonio, TX",
      customer: "TQL Logistics",
      miles: 275,
      lineHaulPay: 550.00,
      fuelAdvance: 175.00,
      accessorialPay: 25.00,
      netPay: 400.00,
    },
    {
      id: 7,
      loadNo: "ML-2025-001264",
      deliveryDate: "2025-01-06",
      origin: "Austin, TX",
      destination: "Houston, TX",
      customer: "Coyote Logistics",
      miles: 165,
      lineHaulPay: 330.00,
      fuelAdvance: 100.00,
      accessorialPay: 25.00,
      netPay: 255.00,
    },
    {
      id: 8,
      loadNo: "ML-2025-001267",
      deliveryDate: "2025-01-07",
      origin: "Fort Worth, TX",
      destination: "Houston, TX",
      customer: "CH Robinson",
      miles: 260,
      lineHaulPay: 520.00,
      fuelAdvance: 150.00,
      accessorialPay: 25.00,
      netPay: 395.00,
    },
  ];

  // Mock deductions
  const deductions = [
    {
      id: 1,
      type: "Insurance",
      description: "Weekly insurance deduction",
      amount: 50.00,
      date: "2025-01-08",
    },
    {
      id: 2,
      type: "Equipment",
      description: "Truck wash",
      amount: 25.00,
      date: "2025-01-08",
    },
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
      Processing: "bg-blue-500/10 text-blue-700 border-blue-500/50",
    };
    return statusColors[status] || "bg-gray-500/10 text-gray-700 border-gray-500/50";
  };

  const handleDeductionSubmit = (e) => {
    e.preventDefault();
    console.log("Deduction submitted:", deductionFormData);
    setIsDeductionSheetOpen(false);
    setDeductionFormData({
      type: "",
      amount: "",
      description: "",
    });
  };

  const handleProcessPayment = () => {
    console.log("Processing payment for:", settlement.settlementNo);
    setShowProcessPaymentDialog(false);
    navigate("/app/carrier-portal/billing/settlements");
  };

  const loadColumns = [
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
        <DataTableColumnHeader column={column} title="Delivery" />
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
      accessorKey: "customer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
    },
    {
      accessorKey: "miles",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Miles" />
      ),
      cell: ({ row }) => <span className="font-medium">{row.getValue("miles")}</span>,
    },
    {
      accessorKey: "lineHaulPay",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Line Haul" />
      ),
      cell: ({ row }) => formatCurrency(row.getValue("lineHaulPay")),
    },
    {
      accessorKey: "fuelAdvance",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fuel Adv" />
      ),
      cell: ({ row }) => (
        <span className="text-amber-600">-{formatCurrency(row.getValue("fuelAdvance"))}</span>
      ),
    },
    {
      accessorKey: "accessorialPay",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Accessorial" />
      ),
      cell: ({ row }) => formatCurrency(row.getValue("accessorialPay")),
    },
    {
      accessorKey: "netPay",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Net Pay" />
      ),
      cell: ({ row }) => (
        <span className="font-bold text-green-600">{formatCurrency(row.getValue("netPay"))}</span>
      ),
    },
  ];

  // Calculate totals
  const totalMiles = loadDetails.reduce((sum, l) => sum + l.miles, 0);
  const totalLineHaul = loadDetails.reduce((sum, l) => sum + l.lineHaulPay, 0);
  const totalFuelAdvance = loadDetails.reduce((sum, l) => sum + l.fuelAdvance, 0);
  const totalAccessorial = loadDetails.reduce((sum, l) => sum + l.accessorialPay, 0);
  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex-shrink-0 border-b bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/app/carrier-portal/billing/settlements")}
            >
              <ArrowLeftIcon className="size-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Wallet className="size-6" />
                  {settlement.settlementNo}
                </h1>
                <Badge className={getStatusBadge(settlement.status)}>{settlement.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Settlement for {settlement.driver}
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
            {settlement.status === "Pending" && (
              <Button
                onClick={() => setShowProcessPaymentDialog(true)}
                className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                <BanknoteIcon className="size-4 mr-2" />
                Process Payment
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Driver Info & Settlement Info */}
          <div className="grid grid-cols-2 gap-6">
            {/* Driver Info */}
            <div className="border rounded-lg bg-card">
              <div className="px-4 py-3 border-b bg-muted">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <UserIcon className="size-4" />
                  Driver Information
                </h3>
              </div>
              <div className="p-4 space-y-2">
                <p className="font-bold text-lg">{settlement.driver}</p>
                <p className="text-sm text-muted-foreground font-mono">{settlement.driverId}</p>
                <p className="text-sm text-muted-foreground">{settlement.driverPhone}</p>
                <p className="text-sm text-primary">{settlement.driverEmail}</p>
                <div className="pt-2 border-t mt-3">
                  <p className="text-xs text-muted-foreground">Pay Type</p>
                  <p className="font-medium">{settlement.payType} - {settlement.payRate}</p>
                </div>
              </div>
            </div>

            {/* Settlement Info */}
            <div className="border rounded-lg bg-card">
              <div className="px-4 py-3 border-b bg-muted">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <CalendarIcon className="size-4" />
                  Settlement Details
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Period</p>
                    <p className="font-medium">{formatDate(settlement.periodStart)} - {formatDate(settlement.periodEnd)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Created Date</p>
                    <p className="font-medium">{formatDate(settlement.createdDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Payment Method</p>
                    <p className="font-medium">{settlement.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Bank Account</p>
                    <p className="font-medium font-mono">{settlement.bankAccount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Load Details */}
          <div className="border rounded-lg bg-card">
            <div className="px-4 py-3 border-b bg-muted">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <TruckIcon className="size-4" />
                Load Details ({loadDetails.length} loads | {totalMiles.toLocaleString()} miles)
              </h3>
            </div>
            <div className="p-4">
              <DataTable
                columns={loadColumns}
                data={loadDetails}
                showViewOptions={false}
                pageSize={10}
              />
            </div>
          </div>

          {/* Summary & Deductions */}
          <div className="grid grid-cols-2 gap-6">
            {/* Settlement Summary */}
            <div className="border rounded-lg bg-card">
              <div className="px-4 py-3 border-b bg-muted">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <DollarSign className="size-4" />
                  Settlement Summary
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Line Haul Pay ({totalMiles} miles)</span>
                  <span>{formatCurrency(totalLineHaul)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Accessorial Pay</span>
                  <span>{formatCurrency(totalAccessorial)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-medium">
                  <span>Gross Pay</span>
                  <span>{formatCurrency(settlement.grossPay)}</span>
                </div>
                <div className="flex justify-between text-amber-600">
                  <span className="flex items-center gap-1">
                    <FuelIcon className="size-3" />
                    Fuel Advances
                  </span>
                  <span>-{formatCurrency(totalFuelAdvance)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span className="flex items-center gap-1">
                    <MinusCircleIcon className="size-3" />
                    Deductions
                  </span>
                  <span>-{formatCurrency(totalDeductions)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Net Pay</span>
                  <span className="text-green-600">{formatCurrency(settlement.netPay)}</span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div className="border rounded-lg bg-card">
              <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <MinusCircleIcon className="size-4" />
                  Deductions
                </h3>
                {settlement.status === "Pending" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsDeductionSheetOpen(true)}
                  >
                    <PlusIcon className="size-3 mr-1" />
                    Add Deduction
                  </Button>
                )}
              </div>
              <div className="p-4">
                {deductions.length > 0 ? (
                  <div className="space-y-3">
                    {deductions.map((deduction) => (
                      <div key={deduction.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{deduction.type}</p>
                          <p className="text-xs text-muted-foreground">{deduction.description}</p>
                        </div>
                        <span className="font-medium text-red-600">-{formatCurrency(deduction.amount)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-3 flex justify-between font-medium">
                      <span>Total Deductions</span>
                      <span className="text-red-600">-{formatCurrency(totalDeductions)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MinusCircleIcon className="size-8 mx-auto mb-2 opacity-50" />
                    <p>No deductions applied</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notes */}
          {settlement.notes && (
            <div className="border rounded-lg bg-card p-4">
              <p className="text-sm text-muted-foreground">{settlement.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Deduction Sheet */}
      <Sheet open={isDeductionSheetOpen} onOpenChange={setIsDeductionSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold">Add Deduction</SheetTitle>
          </SheetHeader>

          <form onSubmit={handleDeductionSubmit} className="space-y-5 mt-4 mb-2 px-6">
            <div className="space-y-2">
              <Label htmlFor="type">Deduction Type</Label>
              <Select
                value={deductionFormData.type}
                onValueChange={(value) => setDeductionFormData({ ...deductionFormData, type: value })}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select deduction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="escrow">Escrow</SelectItem>
                  <SelectItem value="cash_advance">Cash Advance</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={deductionFormData.amount}
                  onChange={(e) => setDeductionFormData({ ...deductionFormData, amount: e.target.value })}
                  className="h-10 pl-7"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter description..."
                value={deductionFormData.description}
                onChange={(e) => setDeductionFormData({ ...deductionFormData, description: e.target.value })}
                className="min-h-20 resize-none"
              />
            </div>

            <div className="flex gap-3 pt-6 border-t px-6 -mx-6 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDeductionSheetOpen(false)}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Add Deduction
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Process Payment Dialog */}
      <AlertDialog open={showProcessPaymentDialog} onOpenChange={setShowProcessPaymentDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Process Payment</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to process payment for settlement {settlement.settlementNo}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4 space-y-3">
            <div className="border rounded-lg p-4 bg-muted/50">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Driver</span>
                <span className="font-medium">{settlement.driver}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-medium">{settlement.paymentMethod}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Account</span>
                <span className="font-mono">{settlement.bankAccount}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between">
                <span className="font-medium">Net Pay</span>
                <span className="text-lg font-bold text-green-600">{formatCurrency(settlement.netPay)}</span>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleProcessPayment}
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              Process Payment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SettlementDetails;
