import { MdEdit } from "react-icons/md";
import { FileText, FileStack, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BillCard = () => {
  // Mock bill data
  const billData = {
    ordersBilled: 156,
    ordersPaid: 142,
    lastBillDate: "2024-01-28",
    lastPayment: "2024-01-25",
    averageDays: 18,
    since: "2022-03-15",
    // Invoice Preferences
    invoiceType: "summary", // "summary" or "per-load"
    invoiceGrouping: "weekly", // "weekly", "bi-weekly", "monthly", "none"
    attachPodToInvoice: true,
    emailInvoice: true,
    invoiceEmailRecipients: "billing@titanconstruction.com",
  };

  const InvoiceTypeBadge = ({ type }) => {
    const isPerLoad = type === "per-load";
    return (
      <Badge
        className={
          isPerLoad
            ? "bg-blue-500/10 text-blue-700 border-blue-500/50"
            : "bg-purple-500/10 text-purple-700 border-purple-500/50"
        }
      >
        {isPerLoad ? (
          <><Truck className="size-3 mr-1" /> Per-Load</>
        ) : (
          <><FileStack className="size-3 mr-1" /> Summary</>
        )}
      </Badge>
    );
  };

  const GroupingBadge = ({ grouping }) => {
    const labels = {
      weekly: "Weekly",
      "bi-weekly": "Bi-Weekly",
      monthly: "Monthly",
      none: "No Grouping",
    };
    return (
      <span className="text-sm font-medium text-foreground">{labels[grouping] || grouping}</span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="w-1/2 border rounded-sm bg-card flex flex-col h-fit">
      <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FileText className="size-4" />
          Bill Information
        </h3>
        <div className="flex items-center gap-2">
          <button className="text-slate-500 hover:text-foreground transition-colors">
            <MdEdit className="size-4" />
          </button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {/* Orders Billed and Orders Paid */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Orders Billed</p>
            <p className="text-sm font-medium text-foreground">{billData.ordersBilled}</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Orders Paid</p>
            <p className="text-sm font-medium text-foreground">{billData.ordersPaid}</p>
          </div>
        </div>

        {/* Last Bill Date and Last Payment */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Last Bill Date</p>
            <p className="text-sm font-medium text-foreground">{formatDate(billData.lastBillDate)}</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Last Payment</p>
            <p className="text-sm font-medium text-foreground">{formatDate(billData.lastPayment)}</p>
          </div>
        </div>

        {/* Average Days and Since */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Average Days</p>
            <p className="text-sm font-medium text-foreground">{billData.averageDays} days</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Since</p>
            <p className="text-sm font-medium text-foreground">{formatDate(billData.since)}</p>
          </div>
        </div>

        {/* Invoice Preferences Header */}
        <div className="px-4 py-3 bg-muted/50">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Invoice Preferences</p>
        </div>

        {/* Invoice Type and Grouping */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-1">Invoice Type</p>
            <InvoiceTypeBadge type={billData.invoiceType} />
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Invoice Grouping</p>
            <GroupingBadge grouping={billData.invoiceGrouping} />
          </div>
        </div>

        {/* Attach POD and Email Invoice */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Attach POD to Invoice</p>
            <Badge
              className={
                billData.attachPodToInvoice
                  ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/50"
                  : "bg-gray-500/10 text-gray-700 border-gray-500/50"
              }
            >
              {billData.attachPodToInvoice ? "Yes" : "No"}
            </Badge>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Email Invoice</p>
            <Badge
              className={
                billData.emailInvoice
                  ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/50"
                  : "bg-gray-500/10 text-gray-700 border-gray-500/50"
              }
            >
              {billData.emailInvoice ? "Yes" : "No"}
            </Badge>
          </div>
        </div>

        {/* Email Recipients */}
        {billData.emailInvoice && (
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Invoice Email Recipients</p>
            <p className="text-sm font-medium text-primary">{billData.invoiceEmailRecipients}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillCard;
