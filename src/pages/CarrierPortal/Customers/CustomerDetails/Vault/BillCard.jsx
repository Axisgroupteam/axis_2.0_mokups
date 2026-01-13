import { MdEdit } from "react-icons/md";
import { FileText, FileStack, Truck, Clock, Calendar, CalendarDays, Zap, Hand } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BillCard = () => {
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

      </div>
    </div>
  );
};

export default BillCard;
