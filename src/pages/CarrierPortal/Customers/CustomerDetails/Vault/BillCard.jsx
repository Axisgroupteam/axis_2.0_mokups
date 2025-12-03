import { MdEdit } from "react-icons/md";
import { FileText } from "lucide-react";

const BillCard = () => {
  // Mock bill data
  const billData = {
    ordersBilled: 156,
    ordersPaid: 142,
    lastBillDate: "2024-01-28",
    lastPayment: "2024-01-25",
    averageDays: 18,
    since: "2022-03-15",
    summaryBillFormat: "Detailed",
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

        {/* Summary Bill Format */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Summary Bill Format</p>
          <p className="text-sm font-medium text-foreground">{billData.summaryBillFormat}</p>
        </div>
      </div>
    </div>
  );
};

export default BillCard;
