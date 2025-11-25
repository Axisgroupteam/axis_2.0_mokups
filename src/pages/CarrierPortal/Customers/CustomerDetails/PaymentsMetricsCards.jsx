import { DollarSign, AlertCircle, Clock, TrendingUp, CreditCard, FileText } from "lucide-react";

const PaymentsMetricsCards = () => {
  // Mock data
  const metricsData = {
    totalReceivables: "$125,450.00",
    overdueInvoices: "12",
    averagePaymentTime: "18 days",
  };

  return (
    <div className="grid grid-cols-6 gap-4 mb-6">
      {/* Total Receivables Card */}
      <div className="border rounded-lg bg-blue-500/5 p-4 hover:shadow-md transition-shadow">
        <p className="text-sm text-muted-foreground mb-2">Total Receivables</p>
        <p className="text-lg font-bold text-foreground">
          {metricsData.totalReceivables}
        </p>
      </div>

      {/* Overdue Invoices Card */}
      <div className="border rounded-lg bg-red-500/5 p-4 hover:shadow-md transition-shadow">
        <p className="text-sm text-muted-foreground mb-2">Overdue Invoices</p>
        <p className="text-lg font-bold text-foreground">
          {metricsData.overdueInvoices}
        </p>
      </div>

      {/* Average Payment Time Card */}
      <div className="border rounded-lg bg-green-500/5 p-4 hover:shadow-md transition-shadow">
        <p className="text-sm text-muted-foreground mb-2">
          Average Payment Time
        </p>
        <p className="text-lg font-bold text-foreground">
          {metricsData.averagePaymentTime}
        </p>
      </div>

      {/* Upcoming Skeleton Card 1 */}
      <div className="border rounded-lg bg-purple-500/5 p-4 hover:shadow-md transition-shadow">
        <div className="h-4 bg-muted rounded w-28 mb-2 animate-pulse"></div>
        <div className="h-5 bg-muted rounded w-20 animate-pulse"></div>
      </div>

      {/* Upcoming Skeleton Card 2 */}
      <div className="border rounded-lg bg-orange-500/5 p-4 hover:shadow-md transition-shadow">
        <div className="h-4 bg-muted rounded w-28 mb-2 animate-pulse"></div>
        <div className="h-5 bg-muted rounded w-20 animate-pulse"></div>
      </div>

      {/* Upcoming Skeleton Card 3 */}
      <div className="border rounded-lg bg-indigo-500/5 p-4 hover:shadow-md transition-shadow">
        <div className="h-4 bg-muted rounded w-28 mb-2 animate-pulse"></div>
        <div className="h-5 bg-muted rounded w-20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default PaymentsMetricsCards;
