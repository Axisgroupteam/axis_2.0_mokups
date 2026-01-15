import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { FileText, FileStack, Truck, Clock, Calendar, CalendarDays, Zap, Hand, FileSpreadsheet, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const BillCard = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Mock bill data with Invoice Cadence settings
  const billData = {
    // Billing Statistics
    ordersBilled: 156,
    ordersPaid: 142,
    lastBillDate: "2024-01-28",
    lastPayment: "2024-01-25",
    averageDays: 18,
    since: "2022-03-15",
    // Invoice Settings
    invoiceType: "summary", // "summary" or "per-load"
    invoiceCadence: "weekly", // "manual", "immediate", "daily", "weekly", "monthly"
    cadenceTime: "08:00", // Time for daily/weekly/monthly
    cadenceWeekday: "monday", // For weekly cadence
    cadenceMonthDay: 1, // For monthly cadence (1-28)
    invoiceTemplate: "standard", // "standard", "detailed", "summary"
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

  const TemplateBadge = ({ template }) => {
    const templateConfig = {
      standard: {
        label: "Standard",
        color: "bg-slate-500/10 text-slate-700 border-slate-500/50",
      },
      detailed: {
        label: "Detailed",
        color: "bg-blue-500/10 text-blue-700 border-blue-500/50",
      },
      summary: {
        label: "Summary Only",
        color: "bg-green-500/10 text-green-700 border-green-500/50",
      },
    };
    const config = templateConfig[template] || templateConfig.standard;
    return (
      <Badge className={config.color}>
        <FileSpreadsheet className="size-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const CadenceBadge = ({ cadence, time, weekday, monthDay }) => {
    const cadenceConfig = {
      manual: {
        label: "Manual",
        icon: <Hand className="size-3 mr-1" />,
        color: "bg-gray-500/10 text-gray-700 border-gray-500/50",
       // description: "Invoices created manually by user"
      },
      immediate: {
        label: "Immediate",
        icon: <Zap className="size-3 mr-1" />,
        color: "bg-amber-500/10 text-amber-700 border-amber-500/50",
        //description: "Invoice generated on load completion"
      },
      daily: {
        label: `Daily at ${formatTime(time)}`,
        icon: <Clock className="size-3 mr-1" />,
        color: "bg-blue-500/10 text-blue-700 border-blue-500/50",
        //description: `Auto-generates daily at ${formatTime(time)}`
      },
      weekly: {
        label: `Weekly (${capitalizeFirst(weekday)} at ${formatTime(time)})`,
        icon: <Calendar className="size-3 mr-1" />,
        color: "bg-green-500/10 text-green-700 border-green-500/50",
        //description: `Auto-generates every ${capitalizeFirst(weekday)} at ${formatTime(time)}`
      },
      monthly: {
        label: `Monthly (Day ${monthDay} at ${formatTime(time)})`,
        icon: <CalendarDays className="size-3 mr-1" />,
        color: "bg-purple-500/10 text-purple-700 border-purple-500/50",
        //description: `Auto-generates on day ${monthDay} of each month`
      },
    };

    const config = cadenceConfig[cadence] || cadenceConfig.manual;

    return (
      <div className="flex flex-col gap-1">
        <Badge className={config.color}>
          {config.icon}
          {config.label}
        </Badge>
        {/* <p className="text-[10px] text-muted-foreground">{config.description}</p> */}
      </div>
    );
  };

  function formatTime(time) {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const h = parseInt(hours);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  }

  function capitalizeFirst(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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
            <p className="text-xs text-muted-foreground mb-0.5">Average Days to Pay</p>
            <p className="text-sm font-medium text-foreground">{billData.averageDays} days</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Customer Since</p>
            <p className="text-sm font-medium text-foreground">{formatDate(billData.since)}</p>
          </div>
        </div>

        {/* Invoice Settings Header */}
        <div className="px-4 py-3 bg-muted/50">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Invoice Settings</p>
        </div>

        {/* Invoice Type and Invoice Cadence */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-1">Invoice Type</p>
            <InvoiceTypeBadge type={billData.invoiceType} />
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-1">Invoice Cadence</p>
            <CadenceBadge
              cadence={billData.invoiceCadence}
              time={billData.cadenceTime}
              weekday={billData.cadenceWeekday}
              monthDay={billData.cadenceMonthDay}
            />
          </div>
        </div>

        {/* Invoice Template */}
        <div className="px-4 py-2.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Invoice Template</p>
              <TemplateBadge template={billData.invoiceTemplate} />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs"
              onClick={() => setIsPreviewOpen(true)}
            >
              <Eye className="size-3 mr-1" />
              Preview
            </Button>
          </div>
        </div>

      </div>

      {/* Invoice Template Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileSpreadsheet className="size-5" />
              Invoice Template Preview - {billData.invoiceTemplate === "standard" ? "Standard" : billData.invoiceTemplate === "detailed" ? "Detailed" : "Summary"}
            </DialogTitle>
          </DialogHeader>

          {/* Invoice Preview */}
          <div className="border rounded-lg bg-white p-6 space-y-6">
            {/* Invoice Header */}
            <div className="flex justify-between items-start border-b pb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">INVOICE</h2>
                <p className="text-sm text-gray-600 mt-1">Mega Logistics LLC</p>
                <p className="text-xs text-gray-500">123 Transport Way, Houston, TX 77001</p>
                <p className="text-xs text-gray-500">Phone: (713) 555-0100</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">Invoice #: INV-2025-0042</p>
                <p className="text-xs text-gray-600">Date: Jan 15, 2025</p>
                <p className="text-xs text-gray-600">Due Date: Jan 30, 2025</p>
                <Badge className="mt-2 bg-blue-500/10 text-blue-700 border-blue-500/50">Net 15</Badge>
              </div>
            </div>

            {/* Bill To */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Bill To</p>
                <p className="text-sm font-semibold text-gray-900">Titan Construction Inc.</p>
                <p className="text-xs text-gray-600">456 Builder Ave, Dallas, TX 75201</p>
                <p className="text-xs text-gray-600">billing@titanconstruction.com</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Reference</p>
                <p className="text-xs text-gray-600">PO #: PO-2025-1234</p>
                <p className="text-xs text-gray-600">Job: Downtown Tower Project</p>
              </div>
            </div>

            {/* Line Items Table */}
            <div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-semibold text-gray-600">Description</th>
                    {billData.invoiceTemplate === "detailed" && (
                      <>
                        <th className="text-left py-2 font-semibold text-gray-600">Load #</th>
                        <th className="text-left py-2 font-semibold text-gray-600">Ticket #</th>
                        <th className="text-right py-2 font-semibold text-gray-600">Weight</th>
                      </>
                    )}
                    <th className="text-right py-2 font-semibold text-gray-600">Qty</th>
                    <th className="text-right py-2 font-semibold text-gray-600">Rate</th>
                    <th className="text-right py-2 font-semibold text-gray-600">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {billData.invoiceTemplate === "detailed" ? (
                    <>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">Cement Hauling - Houston to Dallas</td>
                        <td className="py-2 font-mono">ML-001245</td>
                        <td className="py-2 font-mono">TKT-78501</td>
                        <td className="text-right py-2">24.5 tons</td>
                        <td className="text-right py-2">1</td>
                        <td className="text-right py-2">$75.00/ton</td>
                        <td className="text-right py-2">$1,837.50</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">Cement Hauling - Houston to Dallas</td>
                        <td className="py-2 font-mono">ML-001246</td>
                        <td className="py-2 font-mono">TKT-78502</td>
                        <td className="text-right py-2">23.8 tons</td>
                        <td className="text-right py-2">1</td>
                        <td className="text-right py-2">$75.00/ton</td>
                        <td className="text-right py-2">$1,785.00</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">Sand Hauling - Austin to Dallas</td>
                        <td className="py-2 font-mono">ML-001247</td>
                        <td className="py-2 font-mono">TKT-78503</td>
                        <td className="text-right py-2">25.2 tons</td>
                        <td className="text-right py-2">1</td>
                        <td className="text-right py-2">$68.00/ton</td>
                        <td className="text-right py-2">$1,713.60</td>
                      </tr>
                    </>
                  ) : billData.invoiceTemplate === "summary" ? (
                    <>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">Hauling Services - Week of Jan 8-14</td>
                        <td className="text-right py-2">12 loads</td>
                        <td className="text-right py-2">-</td>
                        <td className="text-right py-2">$8,450.00</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">Fuel Surcharge (10%)</td>
                        <td className="text-right py-2">-</td>
                        <td className="text-right py-2">-</td>
                        <td className="text-right py-2">$845.00</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">Cement Hauling - Houston to Dallas (3 loads)</td>
                        <td className="text-right py-2">73.5 tons</td>
                        <td className="text-right py-2">$75.00/ton</td>
                        <td className="text-right py-2">$5,512.50</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">Sand Hauling - Austin to Dallas (2 loads)</td>
                        <td className="text-right py-2">48.6 tons</td>
                        <td className="text-right py-2">$68.00/ton</td>
                        <td className="text-right py-2">$3,304.80</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">Fuel Surcharge (10%)</td>
                        <td className="text-right py-2">-</td>
                        <td className="text-right py-2">-</td>
                        <td className="text-right py-2">$881.73</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">$8,817.30</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Fuel Surcharge:</span>
                  <span className="font-medium">$881.73</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t pt-2 mt-2">
                  <span>Total Due:</span>
                  <span>$9,699.03</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t pt-4 text-xs text-gray-500 text-center">
              <p>Thank you for your business!</p>
              <p className="mt-1">Please remit payment to: Mega Logistics LLC | Account #: XXXX-1234</p>
            </div>
          </div>

          {/* Template Info */}
          <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
            <p className="font-medium mb-1">Template: {billData.invoiceTemplate === "standard" ? "Standard" : billData.invoiceTemplate === "detailed" ? "Detailed" : "Summary Only"}</p>
            <p>
              {billData.invoiceTemplate === "detailed"
                ? "Shows individual load details with ticket numbers and weights for each delivery."
                : billData.invoiceTemplate === "summary"
                ? "Shows only totals without individual load breakdown. Best for high-volume customers."
                : "Groups loads by commodity/route with combined totals. Balanced detail and readability."}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BillCard;
