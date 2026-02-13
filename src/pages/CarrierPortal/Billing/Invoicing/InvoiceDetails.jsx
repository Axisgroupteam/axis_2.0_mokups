import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useInvoicePdfGenerator } from "../InvoiceTemplates/InvoicePdfRenderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import {
  ArrowLeftIcon,
  FileText,
  DownloadIcon,
  MailIcon,
  DollarSign,
  Building2Icon,
  CalendarIcon,
  TruckIcon,
  PlusIcon,
  PaperclipIcon,
  CloudIcon,
  CheckCircle2Icon,
  RefreshCwIcon,
  ExternalLinkIcon,
  FileIcon,
  ImageIcon,
  FileStack,
  Truck,
  EyeIcon,
  Settings,
  History,
  CreditCard,
  BanIcon,
  RotateCcwIcon,
  AlertTriangleIcon,
  SendIcon,
  MailOpenIcon,
  MailXIcon,
  ClockIcon,
  CheckCheckIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const InvoiceDetails = () => {
  const { invoiceNo } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "general";
  const [isVoidDialogOpen, setIsVoidDialogOpen] = useState(false);
  const [voidReason, setVoidReason] = useState("");
  const [isReInvoiceDialogOpen, setIsReInvoiceDialogOpen] = useState(false);

  // PDF Template state
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const { generatePdf } = useInvoicePdfGenerator();

  // Load templates from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("axis-invoice-templates");
      if (stored) {
        const parsedTemplates = JSON.parse(stored);
        const activeTemplates = parsedTemplates.filter((t) => t.status === "Active");
        setTemplates(activeTemplates);
        if (activeTemplates.length > 0 && !selectedTemplateId) {
          setSelectedTemplateId(activeTemplates[0].templateId);
        }
      }
    } catch (error) {
      console.error("Failed to load templates:", error);
    }
  }, []);

  // Mock invoice data - Industry standard statuses: Invoiced, Paid, Partial, Overdue, Cancelled
  const invoice = {
    invoiceNo: invoiceNo || "INV-2025-0001",
    customer: "Titan Construction",
    customerId: "CUST-001",
    customerAddress: "1234 Industrial Blvd, Houston, TX 77001",
    customerPhone: "(713) 555-0101",
    customerEmail: "billing@titanconstruction.com",
    businessUnit: "Mega Logistics",
    businessUnitId: "BU-001",
    businessUnitLogo: "https://ui-avatars.com/api/?name=Mega+Logistics&background=1a1a2e&color=fff&size=128&bold=true&format=png",
    businessUnitAddress: "1234 Industrial Blvd, Houston, TX 77001",
    businessUnitPhone: "(713) 555-9000",
    invoiceDate: "2025-01-05",
    dueDate: "2025-01-20",
    paymentTerms: "Net 15",
    status: "Invoiced",
    cadence: "weekly",
    subtotal: 9250.0,
    fuelSurcharge: 925.0,
    accessorials: 475.0,
    totalAmount: 10650.0,
    paidAmount: 0.0,
    balanceDue: 10650.0,
    invoiceType: "summary",
    loadCount: 5,
    pdfStatus: "generated",
    pdfUrl: "/invoices/INV-2025-0001.pdf",
    pdfGeneratedAt: "2025-01-05T14:30:00Z",
    qbSyncStatus: "synced",
    qbInvoiceId: "10045",
    qbInvoiceUrl: "https://app.qbo.intuit.com/app/invoice?txnId=10045",
    qbLastSyncAt: "2025-01-05T14:35:00Z",
    qbPdfAttached: true,
    // Email tracking
    emailStatus: "delivered", // pending, sent, delivered, opened, bounced, failed
    emailSentAt: "2025-01-05T15:00:00Z",
    emailDeliveredAt: "2025-01-05T15:00:15Z",
    emailOpenedAt: "2025-01-06T09:30:00Z",
    emailRecipient: "billing@titanconstruction.com",
    emailCc: ["ap@titanconstruction.com"],
    // Void/Re-invoice tracking
    isVoided: false,
    voidedAt: null,
    voidedBy: null,
    voidReason: null,
    replacedByInvoice: null,
    replacesInvoice: null,
  };

  // Mock attachments
  const attachments = [
    {
      id: 1,
      type: "invoice_pdf",
      name: "INV-2025-0001.pdf",
      url: "/invoices/INV-2025-0001.pdf",
      size: "245 KB",
      uploadedAt: "2025-01-05T14:30:00Z",
    },
    {
      id: 2,
      type: "pod",
      name: "POD-ML-2025-001245.pdf",
      url: "/documents/POD-ML-2025-001245.pdf",
      size: "1.2 MB",
      loadNo: "ML-2025-001245",
      uploadedAt: "2025-01-03T16:45:00Z",
    },
    {
      id: 3,
      type: "pod",
      name: "POD-ML-2025-001246.pdf",
      url: "/documents/POD-ML-2025-001246.pdf",
      size: "980 KB",
      loadNo: "ML-2025-001246",
      uploadedAt: "2025-01-03T17:20:00Z",
    },
    {
      id: 4,
      type: "scale_ticket",
      name: "TKT-78501.pdf",
      url: "/documents/TKT-78501.pdf",
      size: "156 KB",
      uploadedAt: "2025-01-03T16:50:00Z",
    },
  ];

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
      freight: 1850.0,
      fuelSurcharge: 185.0,
      accessorials: 150.0,
      total: 2185.0,
    },
    {
      id: 2,
      loadNo: "ML-2025-001246",
      deliveryDate: "2025-01-03",
      origin: "Austin, TX",
      destination: "Dallas, TX",
      commodity: "Sand",
      weight: "22,000 lbs",
      freight: 1650.0,
      fuelSurcharge: 165.0,
      accessorials: 75.0,
      total: 1890.0,
    },
    {
      id: 3,
      loadNo: "ML-2025-001250",
      deliveryDate: "2025-01-04",
      origin: "Houston, TX",
      destination: "San Antonio, TX",
      commodity: "Cement",
      weight: "25,000 lbs",
      freight: 1900.0,
      fuelSurcharge: 190.0,
      accessorials: 100.0,
      total: 2190.0,
    },
    {
      id: 4,
      loadNo: "ML-2025-001251",
      deliveryDate: "2025-01-04",
      origin: "Fort Worth, TX",
      destination: "Houston, TX",
      commodity: "Flyash",
      weight: "23,500 lbs",
      freight: 1950.0,
      fuelSurcharge: 195.0,
      accessorials: 75.0,
      total: 2220.0,
    },
    {
      id: 5,
      loadNo: "ML-2025-001252",
      deliveryDate: "2025-01-05",
      origin: "Dallas, TX",
      destination: "Houston, TX",
      commodity: "Aggregate",
      weight: "24,000 lbs",
      freight: 1900.0,
      fuelSurcharge: 190.0,
      accessorials: 75.0,
      total: 2165.0,
    },
  ];

  // Mock payment history
  const paymentHistory = [];

  // Mock audit log
  const auditLog = [
    {
      id: 1,
      action: "Invoice Created",
      user: "System",
      timestamp: "2025-01-05T14:30:00Z",
      details: "Invoice generated from 5 completed loads",
    },
    {
      id: 2,
      action: "PDF Generated",
      user: "System",
      timestamp: "2025-01-05T14:30:15Z",
      details: "Invoice PDF created successfully",
    },
    {
      id: 3,
      action: "QuickBooks Synced",
      user: "System",
      timestamp: "2025-01-05T14:35:00Z",
      details: "Invoice synced to QuickBooks (ID: 10045)",
    },
    {
      id: 4,
      action: "Email Sent",
      user: "John Smith",
      timestamp: "2025-01-05T15:00:00Z",
      details: "Invoice emailed to billing@titanconstruction.com",
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

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getAttachmentIcon = (type) => {
    switch (type) {
      case "invoice_pdf":
        return <FileText className="size-4 text-red-500" />;
      case "pod":
        return <ImageIcon className="size-4 text-blue-500" />;
      case "scale_ticket":
        return <FileIcon className="size-4 text-amber-500" />;
      default:
        return <FileIcon className="size-4 text-gray-500" />;
    }
  };

  const getAttachmentTypeLabel = (type) => {
    switch (type) {
      case "invoice_pdf":
        return "Invoice PDF";
      case "pod":
        return "POD";
      case "scale_ticket":
        return "Scale Ticket";
      default:
        return "Document";
    }
  };

  const getInvoiceTypeBadge = () => {
    if (invoice.invoiceType === "per-load") {
      return (
        <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/50">
          <Truck className="size-3 mr-1" />
          Per-Load
        </Badge>
      );
    }
    return (
      <Badge className="bg-purple-500/10 text-purple-700 border-purple-500/50">
        <FileStack className="size-3 mr-1" />
        Summary
      </Badge>
    );
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      Invoiced: "bg-blue-500/10 text-blue-700 border-blue-500/50",
      Paid: "bg-green-500/10 text-green-700 border-green-500/50",
      Partial: "bg-amber-500/10 text-amber-700 border-amber-500/50",
      Overdue: "bg-red-500/10 text-red-700 border-red-500/50",
      Cancelled: "bg-gray-500/10 text-gray-700 border-gray-500/50",
      Voided: "bg-gray-500/10 text-gray-700 border-gray-500/50 line-through",
    };
    return statusColors[status] || "bg-gray-500/10 text-gray-700 border-gray-500/50";
  };

  const getEmailStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        color: "bg-gray-500/10 text-gray-700 border-gray-500/50",
        icon: <ClockIcon className="size-3 mr-1" />,
        label: "Pending",
      },
      sent: {
        color: "bg-blue-500/10 text-blue-700 border-blue-500/50",
        icon: <SendIcon className="size-3 mr-1" />,
        label: "Sent",
      },
      delivered: {
        color: "bg-green-500/10 text-green-700 border-green-500/50",
        icon: <CheckCheckIcon className="size-3 mr-1" />,
        label: "Delivered",
      },
      opened: {
        color: "bg-purple-500/10 text-purple-700 border-purple-500/50",
        icon: <MailOpenIcon className="size-3 mr-1" />,
        label: "Opened",
      },
      bounced: {
        color: "bg-red-500/10 text-red-700 border-red-500/50",
        icon: <MailXIcon className="size-3 mr-1" />,
        label: "Bounced",
      },
      failed: {
        color: "bg-red-500/10 text-red-700 border-red-500/50",
        icon: <MailXIcon className="size-3 mr-1" />,
        label: "Failed",
      },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Badge className={config.color}>
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const handleVoidInvoice = () => {
    console.log("Voiding invoice:", invoice.invoiceNo, "Reason:", voidReason);
    setIsVoidDialogOpen(false);
    setVoidReason("");
    // In real app, would call API and update state
  };

  const handleReInvoice = () => {
    console.log("Re-invoicing:", invoice.invoiceNo);
    setIsReInvoiceDialogOpen(false);
    // In real app, would create new invoice with same loads
  };

  const handleGeneratePdf = async () => {
    if (!selectedTemplateId) {
      alert("Please select a template first");
      return;
    }

    const selectedTemplate = templates.find((t) => t.templateId === selectedTemplateId);
    if (!selectedTemplate) {
      alert("Template not found");
      return;
    }

    setIsGeneratingPdf(true);

    // Prepare invoice data for PDF
    const invoiceDataForPdf = {
      invoiceNo: invoice.invoiceNo,
      invoiceDate: invoice.invoiceDate,
      dueDate: invoice.dueDate,
      paymentTerms: invoice.paymentTerms,
      customer: invoice.customer,
      customerAddress: invoice.customerAddress,
      customerEmail: invoice.customerEmail,
      customerContact: invoice.customerPhone,
      businessUnit: invoice.businessUnit,
      subtotal: invoice.subtotal,
      taxRate: "0%",
      taxAmount: 0,
      totalAmount: invoice.totalAmount,
      paidAmount: invoice.paidAmount,
      balanceDue: invoice.balanceDue,
      lineItems: lineItems,
    };

    try {
      await generatePdf(selectedTemplate, invoiceDataForPdf, `${invoice.invoiceNo}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("PDF generation failed: " + error.message);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const lineItemColumns = [
    {
      accessorKey: "loadNo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Load No" />,
      cell: ({ row }) => (
        <button
          onClick={() =>
            navigate(`/app/carrier-portal/orders/bulk/history/load-details?id=${row.getValue("loadNo")}&mode=view`)
          }
          className="font-mono text-sm font-medium text-primary hover:underline"
        >
          {row.getValue("loadNo")}
        </button>
      ),
    },
    {
      accessorKey: "deliveryDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Delivery Date" />,
      cell: ({ row }) => formatDate(row.getValue("deliveryDate")),
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
      accessorKey: "commodity",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Commodity" />,
      cell: ({ row }) => (
        <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/50">{row.getValue("commodity")}</Badge>
      ),
    },
    {
      accessorKey: "weight",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Weight" />,
    },
    {
      accessorKey: "freight",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Freight" />,
      cell: ({ row }) => formatCurrency(row.getValue("freight")),
    },
    {
      accessorKey: "fuelSurcharge",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Fuel SC" />,
      cell: ({ row }) => formatCurrency(row.getValue("fuelSurcharge")),
    },
    {
      accessorKey: "accessorials",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Accessorials" />,
      cell: ({ row }) => formatCurrency(row.getValue("accessorials")),
    },
    {
      accessorKey: "total",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
      cell: ({ row }) => <span className="font-bold">{formatCurrency(row.getValue("total"))}</span>,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <Tabs defaultValue={activeTab} className="w-full h-full flex flex-col overflow-hidden">
        {/* Tabs Header */}
        <div className="flex-shrink-0">
          <TabsList className="mb-0 rounded-none">
            <TabsTrigger value="general" className="h-full">
              <Settings className="size-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="line-items" className="h-full">
              <TruckIcon className="size-4" />
              Line Items
            </TabsTrigger>
            <TabsTrigger value="payments" className="h-full">
              <CreditCard className="size-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="documents" className="h-full">
              <PaperclipIcon className="size-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="audit" className="h-full">
              <History className="size-4" />
              Audit Log
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          {/* General Tab */}
          <TabsContent value="general" className="h-full mt-0 p-4">
            <div className="space-y-4">
              {/* Invoice Header Card */}
              <div className="border rounded-sm bg-card">
                <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <FileText className="size-4" />
                    Invoice Details
                  </h3>
                  <div className="flex items-center gap-2">
                    {templates.length > 0 && (
                      <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
                        <SelectTrigger className="w-[180px] h-8">
                          <SelectValue placeholder="Select Template" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.map((template) => (
                            <SelectItem key={template.templateId} value={template.templateId}>
                              {template.templateName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleGeneratePdf}
                      disabled={isGeneratingPdf || templates.length === 0}
                    >
                      <DownloadIcon className="size-4 mr-2" />
                      {isGeneratingPdf ? "Generating..." : "Generate PDF"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <MailIcon className="size-4 mr-2" />
                      Send to Customer
                    </Button>
                    {!invoice.isVoided && invoice.status !== "Paid" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-300 hover:bg-red-50"
                          onClick={() => setIsVoidDialogOpen(true)}
                        >
                          <BanIcon className="size-4 mr-2" />
                          Void Invoice
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsReInvoiceDialogOpen(true)}
                        >
                          <RotateCcwIcon className="size-4 mr-2" />
                          Re-Invoice
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <h2 className="text-2xl font-bold">{invoice.invoiceNo}</h2>
                      {getInvoiceTypeBadge()}
                      <Badge className={getStatusBadge(invoice.isVoided ? "Voided" : invoice.status)}>
                        {invoice.isVoided ? "Voided" : invoice.status}
                      </Badge>
                    </div>
                    {invoice.isVoided && invoice.replacedByInvoice && (
                      <div className="text-sm text-muted-foreground">
                        Replaced by: <button className="text-primary underline">{invoice.replacedByInvoice}</button>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-4 gap-4">
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
                      <p className="font-medium">{invoice.paymentTerms} <span className="text-muted-foreground font-normal">(Due within 15 days)</span></p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Load Count</p>
                      <p className="font-medium">{invoice.loadCount} loads</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Tracking Card */}
              <div className="border rounded-sm bg-card">
                <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <MailIcon className="size-4" />
                    Email Delivery Status
                  </h3>
                  {getEmailStatusBadge(invoice.emailStatus)}
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Sent To</p>
                      <p className="font-medium text-sm">{invoice.emailRecipient}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Sent At</p>
                      <p className="font-medium text-sm">{invoice.emailSentAt ? formatDateTime(invoice.emailSentAt) : "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Delivered At</p>
                      <p className="font-medium text-sm">{invoice.emailDeliveredAt ? formatDateTime(invoice.emailDeliveredAt) : "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Opened At</p>
                      <p className="font-medium text-sm">
                        {invoice.emailOpenedAt ? (
                          <span className="text-purple-600">{formatDateTime(invoice.emailOpenedAt)}</span>
                        ) : (
                          <span className="text-muted-foreground">Not yet opened</span>
                        )}
                      </p>
                    </div>
                  </div>
                  {invoice.emailCc && invoice.emailCc.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs text-muted-foreground">CC Recipients</p>
                      <p className="text-sm">{invoice.emailCc.join(", ")}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Bill To Card */}
                <div className="border rounded-sm bg-card">
                  <div className="px-4 py-4 border-b bg-muted">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Building2Icon className="size-4" />
                      Bill To
                    </h3>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="font-bold text-lg">{invoice.customer}</p>
                    <p className="text-sm text-muted-foreground">{invoice.customerAddress}</p>
                    <p className="text-sm text-muted-foreground">{invoice.customerPhone}</p>
                    <p className="text-sm text-primary">{invoice.customerEmail}</p>
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground">Customer ID</p>
                      <p className="font-mono font-medium">{invoice.customerId}</p>
                    </div>
                  </div>
                </div>

                {/* Invoice Summary Card */}
                <div className="border rounded-sm bg-card">
                  <div className="px-4 py-4 border-b bg-muted">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
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
              </div>

              {/* QuickBooks Integration */}
              <div className="border rounded-sm bg-card">
                <div className="px-4 py-4 border-b bg-muted">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <CloudIcon className="size-4" />
                    QuickBooks Integration
                  </h3>
                </div>
                <div className="p-4">
                  {invoice.qbSyncStatus === "synced" ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-green-500/10">
                            <CheckCircle2Icon className="size-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-green-700">Synced to QuickBooks</p>
                            <p className="text-xs text-muted-foreground">
                              Last synced: {formatDateTime(invoice.qbLastSyncAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <RefreshCwIcon className="size-4 mr-2" />
                            Re-sync
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href={invoice.qbInvoiceUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLinkIcon className="size-4 mr-2" />
                              View in QB
                            </a>
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                        <div>
                          <p className="text-xs text-muted-foreground">QB Invoice #</p>
                          <p className="font-mono font-medium">{invoice.qbInvoiceId}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">PDF Attached</p>
                          <Badge
                            className={
                              invoice.qbPdfAttached
                                ? "bg-green-500/10 text-green-700 border-green-500/50"
                                : "bg-gray-500/10 text-gray-700 border-gray-500/50"
                            }
                          >
                            {invoice.qbPdfAttached ? "Yes" : "No"}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Customer Synced</p>
                          <Badge className="bg-green-500/10 text-green-700 border-green-500/50">Linked</Badge>
                        </div>
                      </div>
                    </div>
                  ) : invoice.qbSyncStatus === "pending" ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-amber-500/10">
                          <CloudIcon className="size-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium text-amber-700">Pending Sync</p>
                          <p className="text-xs text-muted-foreground">Invoice will be synced to QuickBooks</p>
                        </div>
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <CloudIcon className="size-4 mr-2" />
                        Sync Now
                      </Button>
                    </div>
                  ) : invoice.qbSyncStatus === "failed" ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-red-500/10">
                          <CloudIcon className="size-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-red-700">Sync Failed</p>
                          <p className="text-xs text-muted-foreground">Unable to sync to QuickBooks. Please retry.</p>
                        </div>
                      </div>
                      <Button variant="outline">
                        <RefreshCwIcon className="size-4 mr-2" />
                        Retry Sync
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-gray-500/10">
                          <CloudIcon className="size-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">QuickBooks Not Enabled</p>
                          <p className="text-xs text-muted-foreground">Enable QuickBooks sync in customer settings</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom spacer */}
              <div className="h-4"></div>
            </div>
          </TabsContent>

          {/* Line Items Tab */}
          <TabsContent value="line-items" className="h-full mt-0 p-4">
            <div className="border rounded-sm bg-card">
              <div className="px-4 py-4 border-b bg-muted">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <TruckIcon className="size-4" />
                  Line Items ({lineItems.length} loads)
                </h3>
              </div>
              <div className="p-4">
                <DataTable columns={lineItemColumns} data={lineItems} showViewOptions={false} pageSize={10} />
              </div>
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="h-full mt-0 p-4">
            <div className="border rounded-sm bg-card">
              <div className="px-4 py-4 border-b bg-muted">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <CreditCard className="size-4" />
                  Payment History
                </h3>
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
                        <Badge className="bg-green-500/10 text-green-700 border-green-500/50">Received</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <DollarSign className="size-12 mx-auto mb-3 opacity-30" />
                    <p className="text-lg font-medium">No payments recorded yet</p>
                    <p className="text-sm">Payments will appear here once received</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="h-full mt-0 p-4">
            <div className="border rounded-sm bg-card">
              <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <PaperclipIcon className="size-4" />
                  Attachments & Documents ({attachments.length})
                </h3>
                <Button variant="outline" size="sm">
                  <PlusIcon className="size-3 mr-1" />
                  Add Attachment
                </Button>
              </div>
              <div className="divide-y">
                {attachments.map((attachment) => (
                  <div key={attachment.id} className="px-4 py-3 flex items-center justify-between hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">{getAttachmentIcon(attachment.type)}</div>
                      <div>
                        <p className="font-medium text-sm">{attachment.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs px-1.5 py-0">
                            {getAttachmentTypeLabel(attachment.type)}
                          </Badge>
                          <span>{attachment.size}</span>
                          {attachment.loadNo && <span className="font-mono">{attachment.loadNo}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <EyeIcon className="size-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <DownloadIcon className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Audit Log Tab */}
          <TabsContent value="audit" className="h-full mt-0 p-4">
            <div className="border rounded-sm bg-card">
              <div className="px-4 py-4 border-b bg-muted">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <History className="size-4" />
                  Audit Log
                </h3>
              </div>
              <div className="divide-y">
                {auditLog.map((entry) => (
                  <div key={entry.id} className="px-4 py-3 hover:bg-muted/50">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sm">{entry.action}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{entry.details}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{formatDateTime(entry.timestamp)}</p>
                        <p className="text-xs font-medium">{entry.user}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Void Invoice Dialog */}
      <Dialog open={isVoidDialogOpen} onOpenChange={setIsVoidDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangleIcon className="size-5" />
              Void Invoice
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to void invoice <span className="font-mono font-bold">{invoice.invoiceNo}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-400">
                <strong>Warning:</strong> Voiding this invoice will:
              </p>
              <ul className="mt-2 text-sm text-red-600 dark:text-red-400 space-y-1 list-disc list-inside">
                <li>Mark the invoice as voided in your system</li>
                <li>Void the corresponding QuickBooks invoice</li>
                <li>Release {invoice.loadCount} loads for re-invoicing</li>
              </ul>
            </div>

            <div className="space-y-2">
              <Label htmlFor="void-reason">Reason for voiding <span className="text-red-500">*</span></Label>
              <Textarea
                id="void-reason"
                placeholder="Enter reason for voiding this invoice..."
                value={voidReason}
                onChange={(e) => setVoidReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVoidDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleVoidInvoice}
              disabled={!voidReason.trim()}
            >
              <BanIcon className="size-4 mr-2" />
              Void Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Re-Invoice Dialog */}
      <Dialog open={isReInvoiceDialogOpen} onOpenChange={setIsReInvoiceDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RotateCcwIcon className="size-5 text-blue-600" />
              Re-Invoice Loads
            </DialogTitle>
            <DialogDescription>
              Create a new invoice with the same loads from <span className="font-mono font-bold">{invoice.invoiceNo}</span>.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-400">
                <strong>This action will:</strong>
              </p>
              <ul className="mt-2 text-sm text-blue-600 dark:text-blue-400 space-y-1 list-disc list-inside">
                <li>Void the current invoice ({invoice.invoiceNo})</li>
                <li>Create a new invoice with the same {invoice.loadCount} loads</li>
                <li>Generate a new invoice number</li>
                <li>Sync the new invoice to QuickBooks</li>
              </ul>
            </div>

            <div className="border rounded-lg p-3 bg-muted/50">
              <p className="text-xs text-muted-foreground mb-2">Invoice Summary</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Loads:</span> {invoice.loadCount}
                </div>
                <div>
                  <span className="text-muted-foreground">Customer:</span> {invoice.customer}
                </div>
                <div>
                  <span className="text-muted-foreground">Amount:</span> {formatCurrency(invoice.totalAmount)}
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span> {invoice.invoiceType}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReInvoiceDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleReInvoice}
            >
              <RotateCcwIcon className="size-4 mr-2" />
              Void & Re-Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceDetails;
