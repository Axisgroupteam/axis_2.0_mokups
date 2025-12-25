import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ReceiptText,
  User,
  CreditCard,
  MapPin,
  DollarSign,
  MessageSquare,
  History,
  ArrowLeft,
  Clock,
  Fuel,
  Truck,
  Building2,
  Phone,
  Plus,
  Paperclip,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { MdEdit } from "react-icons/md";

const TransactionDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get("tab") || "details";

  // Mock transaction data
  const transactionData = {
    transactionId: "TXN-2025-00001",
    cardNumber: "7089-4521-8834-0012",
    maskedCardNumber: "****-****-****-0012",
    platform: "EFS",
    transactionDate: "2025-01-15T14:32:00",
    stationName: "Love's Travel Stop #245",
    stationAddress: "1234 Interstate Highway 35",
    city: "Dallas",
    state: "TX",
    zip: "75201",
    latitude: "32.7767",
    longitude: "-96.7970",
    fuelType: "Diesel",
    gallons: 125.5,
    pricePerGallon: 3.45,
    grossAmount: 432.98,
    discountAmount: 12.55,
    netAmount: 420.43,
    odometer: 245678,
    tripNumber: "TRP-2025-0045",
    settlementStatus: "Settled",
    settlementDate: "2025-01-16",
    driverId: "DRV-001",
    driverName: "John Smith",
    driverPhone: "+1 (555) 123-4567",
    driverEmail: "john.smith@company.com",
    entityType: "Company Driver",
    vehicleId: "TRK-101",
    vehicleNumber: "Truck #101",
  };

  // Pricing breakdown
  const pricingBreakdown = {
    retailPrice: 3.65,
    opsDiscount: 0.10,
    networkDiscount: 0.05,
    volumeDiscount: 0.03,
    tierDiscount: 0.02,
    finalPrice: 3.45,
    gallons: 125.5,
    grossTotal: 458.08,
    totalDiscount: 25.10,
    netTotal: 432.98,
    carrierMargin: 12.55,
    driverPrice: 420.43,
  };

  // Comments data
  const commentsData = [
    {
      id: 1,
      dateTime: "2025-01-15 03:45 PM",
      enteredBy: "John Smith",
      type: "General",
      attachment: null,
      comment: "Fuel purchase completed at Love's Travel Stop. Odometer reading verified.",
    },
    {
      id: 2,
      dateTime: "2025-01-15 04:00 PM",
      enteredBy: "System",
      type: "Info",
      attachment: "receipt_TXN-2025-00001.pdf",
      comment: "Receipt automatically captured and attached.",
    },
  ];

  // Audit log data
  const auditLogData = [
    {
      id: 1,
      action: "Transaction created",
      type: "Create",
      oldValue: "-",
      newValue: "TXN-2025-00001",
      actionBy: "EFS System",
      timestamp: "Jan 15, 2025 14:32:00",
    },
    {
      id: 2,
      action: "Discount applied",
      type: "Update",
      oldValue: "$0.00",
      newValue: "$12.55",
      actionBy: "Pricing Engine",
      timestamp: "Jan 15, 2025 14:32:01",
    },
    {
      id: 3,
      action: "Settlement status updated",
      type: "Status",
      oldValue: "Pending",
      newValue: "Settled",
      actionBy: "Settlement System",
      timestamp: "Jan 16, 2025 08:00:00",
    },
  ];

  const getTypeBadgeColor = (type) => {
    const colors = {
      Create: "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50",
      Update: "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50",
      Status: "bg-orange-500/10 hover:bg-orange-500/30 text-orange-700 dark:text-orange-400 border border-orange-500/50",
      Delete: "bg-red-500/10 hover:bg-red-500/30 text-red-700 dark:text-red-400 border border-red-500/50",
    };
    return colors[type] || "bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      Settled: "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/50",
      Pending: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/50",
      Disputed: "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/50",
      "Pending Review": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/50",
    };
    return colors[status] || "bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  const getPlatformBadgeColor = (platform) => {
    const colors = {
      EFS: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/50",
      Commdata: "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/50",
      Relay: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/50",
    };
    return colors[platform] || "bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const auditLogColumns = [
    {
      accessorKey: "action",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Operation" />,
      enableSorting: true,
    },
    {
      accessorKey: "type",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => {
        const type = row.getValue("type");
        return <Badge className={getTypeBadgeColor(type)}>{type}</Badge>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "oldValue",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Old Value" />,
      enableSorting: true,
    },
    {
      accessorKey: "newValue",
      header: ({ column }) => <DataTableColumnHeader column={column} title="New Value" />,
      enableSorting: true,
    },
    {
      accessorKey: "actionBy",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Modified By" />,
      enableSorting: true,
    },
    {
      accessorKey: "timestamp",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Timestamp" />,
      enableSorting: true,
    },
  ];

  // Transaction Info Card
  const TransactionInfoCard = () => (
    <div className="w-full border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <ReceiptText className="size-4" />
          Transaction Information
        </h3>
      </div>
      <div className="divide-y divide-border">
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Transaction ID</p>
            <p className="text-sm font-mono font-medium text-foreground">{transactionData.transactionId}</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Date & Time</p>
            <p className="text-sm font-medium text-foreground">{formatDateTime(transactionData.transactionDate)}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Platform</p>
            <Badge className={getPlatformBadgeColor(transactionData.platform)}>{transactionData.platform}</Badge>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Settlement Status</p>
            <Badge className={getStatusBadgeColor(transactionData.settlementStatus)}>{transactionData.settlementStatus}</Badge>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Fuel Type</p>
            <p className="text-sm font-medium text-foreground">{transactionData.fuelType}</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Gallons</p>
            <p className="text-sm font-medium text-foreground">{transactionData.gallons.toFixed(1)}</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Price/Gallon</p>
            <p className="text-sm font-medium text-foreground">{formatCurrency(transactionData.pricePerGallon)}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Gross Amount</p>
            <p className="text-sm font-medium text-foreground">{formatCurrency(transactionData.grossAmount)}</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Discount</p>
            <p className="text-sm font-medium text-green-600">-{formatCurrency(transactionData.discountAmount)}</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Net Amount</p>
            <p className="text-sm font-bold text-foreground">{formatCurrency(transactionData.netAmount)}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Odometer</p>
            <p className="text-sm font-medium text-foreground">{transactionData.odometer.toLocaleString()} mi</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Trip Number</p>
            <p className="text-sm font-mono font-medium text-foreground">{transactionData.tripNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Driver Info Card
  const DriverInfoCard = () => (
    <div className="w-full border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <User className="size-4" />
          Driver Information
        </h3>
      </div>
      <div className="divide-y divide-border">
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Driver Name</p>
            <p className="text-sm font-medium text-foreground">{transactionData.driverName}</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Driver ID</p>
            <p className="text-sm font-mono font-medium text-foreground">{transactionData.driverId}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
            <p className="text-sm font-medium text-foreground">{transactionData.driverPhone}</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Email</p>
            <p className="text-sm font-medium text-foreground">{transactionData.driverEmail}</p>
          </div>
        </div>
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Entity Type</p>
          <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/50">
            {transactionData.entityType}
          </Badge>
        </div>
      </div>
    </div>
  );

  // Card Info Card
  const CardInfoCard = () => (
    <div className="w-full border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <CreditCard className="size-4" />
          Card Information
        </h3>
      </div>
      <div className="divide-y divide-border">
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Card Number</p>
          <p className="text-sm font-mono font-medium text-foreground">{transactionData.maskedCardNumber}</p>
        </div>
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Platform</p>
            <Badge className={getPlatformBadgeColor(transactionData.platform)}>{transactionData.platform}</Badge>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Vehicle</p>
            <p className="text-sm font-medium text-foreground">{transactionData.vehicleNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Location Info Card
  const LocationInfoCard = () => (
    <div className="w-full border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <MapPin className="size-4" />
          Location Information
        </h3>
      </div>
      <div className="divide-y divide-border">
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Station Name</p>
          <p className="text-sm font-medium text-foreground">{transactionData.stationName}</p>
        </div>
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Address</p>
          <p className="text-sm font-medium text-foreground">{transactionData.stationAddress}</p>
        </div>
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">City</p>
            <p className="text-sm font-medium text-foreground">{transactionData.city}</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">State</p>
            <p className="text-sm font-medium text-foreground">{transactionData.state}</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">ZIP</p>
            <p className="text-sm font-medium text-foreground">{transactionData.zip}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Latitude</p>
            <p className="text-sm font-mono font-medium text-foreground">{transactionData.latitude}</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Longitude</p>
            <p className="text-sm font-mono font-medium text-foreground">{transactionData.longitude}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Pricing Waterfall Card
  const PricingWaterfallCard = () => (
    <div className="w-full border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <DollarSign className="size-4" />
          Pricing Breakdown (Per Gallon)
        </h3>
      </div>
      <div className="p-4">
        <div className="space-y-2">
          {/* Retail Price */}
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm text-foreground">Retail Price</span>
            <span className="text-sm font-medium">{formatCurrency(pricingBreakdown.retailPrice)}</span>
          </div>
          {/* Discounts */}
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm text-muted-foreground pl-4">- OPIS Discount</span>
            <span className="text-sm font-medium text-green-600">-{formatCurrency(pricingBreakdown.opsDiscount)}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm text-muted-foreground pl-4">- Network Discount</span>
            <span className="text-sm font-medium text-green-600">-{formatCurrency(pricingBreakdown.networkDiscount)}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm text-muted-foreground pl-4">- Volume Discount</span>
            <span className="text-sm font-medium text-green-600">-{formatCurrency(pricingBreakdown.volumeDiscount)}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm text-muted-foreground pl-4">- Tier Discount</span>
            <span className="text-sm font-medium text-green-600">-{formatCurrency(pricingBreakdown.tierDiscount)}</span>
          </div>
          {/* Final Price */}
          <div className="flex items-center justify-between py-2 bg-muted rounded px-2">
            <span className="text-sm font-semibold text-foreground">Final Price/Gallon</span>
            <span className="text-sm font-bold text-foreground">{formatCurrency(pricingBreakdown.finalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Pricing Summary Card
  const PricingSummaryCard = () => (
    <div className="w-full border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Fuel className="size-4" />
          Transaction Summary
        </h3>
      </div>
      <div className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm text-foreground">Gallons Purchased</span>
            <span className="text-sm font-medium">{pricingBreakdown.gallons.toFixed(1)} gal</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm text-foreground">Gross Total (Retail)</span>
            <span className="text-sm font-medium">{formatCurrency(pricingBreakdown.grossTotal)}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm text-muted-foreground pl-4">- Total Discount</span>
            <span className="text-sm font-medium text-green-600">-{formatCurrency(pricingBreakdown.totalDiscount)}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b bg-blue-50 dark:bg-blue-950/30 rounded px-2">
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">Net Total (Carrier Cost)</span>
            <span className="text-sm font-bold text-blue-700 dark:text-blue-400">{formatCurrency(pricingBreakdown.netTotal)}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm text-muted-foreground pl-4">- Carrier Margin</span>
            <span className="text-sm font-medium text-amber-600">-{formatCurrency(pricingBreakdown.carrierMargin)}</span>
          </div>
          <div className="flex items-center justify-between py-2 bg-green-50 dark:bg-green-950/30 rounded px-2">
            <span className="text-sm font-semibold text-green-700 dark:text-green-400">Driver Price (Final)</span>
            <span className="text-sm font-bold text-green-700 dark:text-green-400">{formatCurrency(pricingBreakdown.driverPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 px-4 py-3 border-b bg-muted/30">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/app/carrier-portal/fuel/transactions")}
          className="h-8 px-2"
        >
          <ArrowLeft className="size-4 mr-1" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <span className="font-mono text-lg font-semibold">{transactionData.transactionId}</span>
          <Badge className={getStatusBadgeColor(transactionData.settlementStatus)}>
            {transactionData.settlementStatus}
          </Badge>
          <Badge className={getPlatformBadgeColor(transactionData.platform)}>
            {transactionData.platform}
          </Badge>
        </div>
        <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="size-4" />
          {formatDateTime(transactionData.transactionDate)}
        </div>
      </div>

      <Tabs defaultValue={activeTab} className="w-full h-full flex flex-col overflow-hidden">
        <div className="flex-shrink-0">
          <TabsList className="mb-0 rounded-none">
            <TabsTrigger value="details" className="h-full">
              <ReceiptText className="size-4" />
              Details
            </TabsTrigger>
            <TabsTrigger value="pricing" className="h-full">
              <DollarSign className="size-4" />
              Pricing
            </TabsTrigger>
            <TabsTrigger value="location" className="h-full">
              <MapPin className="size-4" />
              Location
            </TabsTrigger>
            <TabsTrigger value="comments" className="h-full">
              <MessageSquare className="size-4" />
              Comments
            </TabsTrigger>
            <TabsTrigger value="audit" className="h-full">
              <History className="size-4" />
              Audit Log
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4 px-4 pb-4 h-full mt-2">
            <div className="grid grid-cols-2 gap-4">
              <TransactionInfoCard />
              <div className="space-y-4">
                <DriverInfoCard />
                <CardInfoCard />
              </div>
            </div>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-4 px-4 pb-4 h-full mt-2">
            <div className="grid grid-cols-2 gap-4">
              <PricingWaterfallCard />
              <PricingSummaryCard />
            </div>
            {/* Pricing Confidentiality Note */}
            <div className="border rounded-sm bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="size-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-400">Pricing Confidentiality</p>
                  <p className="text-sm text-amber-700 dark:text-amber-500 mt-1">
                    This pricing breakdown follows the 3-level waterfall model. Base costs and carrier margins are confidential
                    and should not be shared with drivers. Drivers only see the final "Driver Price" amount.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Location Tab */}
          <TabsContent value="location" className="space-y-4 px-4 pb-4 h-full mt-2">
            <div className="grid grid-cols-2 gap-4">
              <LocationInfoCard />
              {/* Map Placeholder */}
              <div className="w-full border rounded-sm bg-card flex flex-col">
                <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <MapPin className="size-4" />
                    Station Location
                  </h3>
                </div>
                <div className="flex-1 min-h-[300px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="size-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Map View</p>
                    <p className="text-xs">{transactionData.latitude}, {transactionData.longitude}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Comments Tab */}
          <TabsContent value="comments" className="space-y-4 px-4 pb-4 h-full mt-2">
            <div className="border rounded-sm bg-card">
              <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="size-4" />
                  Comments
                </h3>
                <Button
                  size="sm"
                  className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
                >
                  <Plus className="size-3" />
                  Add Comment
                </Button>
              </div>
              <div className="p-4">
                {commentsData.length > 0 ? (
                  <div className="space-y-4">
                    {commentsData.map((comment) => {
                      const typeColors = {
                        General: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                        Warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                        Positive: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                        Info: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
                      };

                      return (
                        <div
                          key={comment.id}
                          className="border rounded-lg p-3 bg-background hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="size-3 text-primary" />
                              </div>
                              <div>
                                <p className="font-semibold text-xs text-foreground">{comment.enteredBy}</p>
                                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                  <Clock className="size-2" />
                                  {comment.dateTime}
                                </div>
                              </div>
                            </div>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                typeColors[comment.type] || "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {comment.type}
                            </span>
                          </div>

                          <p className="text-xs text-foreground mb-2 leading-relaxed">{comment.comment}</p>

                          {comment.attachment && (
                            <div className="flex items-center gap-1.5 p-1.5 bg-muted/50 rounded-md w-fit">
                              <Paperclip className="size-2.5 text-muted-foreground" />
                              <span className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                                {comment.attachment}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">No comments added yet</p>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Audit Log Tab */}
          <TabsContent value="audit" className="space-y-4 px-4 pb-4 h-full mt-2">
            <DataTable columns={auditLogColumns} data={auditLogData} showViewOptions={false} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TransactionDetails;
