import { DollarSign, AlertCircle, Clock } from "lucide-react";

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
      <div className="rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="size-4 text-teal-700 dark:text-teal-400" />
          <p className="text-sm font-bold text-teal-700 dark:text-teal-400">
            Total Receivables
          </p>
        </div>
        <p className="text-2xl font-bold text-teal-700 dark:text-teal-400">
          {metricsData.totalReceivables}
        </p>
      </div>

      {/* Overdue Invoices Card */}
      <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="size-4 text-red-600 dark:text-red-400" />
          <p className="text-sm font-bold text-red-600 dark:text-red-400">
            Overdue Invoices
          </p>
        </div>
        <p className="text-2xl font-bold text-red-600 dark:text-red-400">
          {metricsData.overdueInvoices}
        </p>
      </div>

      {/* Average Payment Time Card */}
      <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="size-4 text-green-700 dark:text-green-400" />
          <p className="text-sm font-bold text-green-700 dark:text-green-400">
            Average Payment Time
          </p>
        </div>
        <p className="text-2xl font-bold text-green-700 dark:text-green-400">
          {metricsData.averagePaymentTime}
        </p>
      </div>

      {/* Upcoming Skeleton Card 1 */}
      <div className="rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 p-4">
        <div className="h-4 bg-purple-200/50 dark:bg-purple-800/30 rounded w-28 mb-2 animate-pulse"></div>
        <div className="h-6 bg-purple-200/50 dark:bg-purple-800/30 rounded w-20 animate-pulse"></div>
      </div>

      {/* Upcoming Skeleton Card 2 */}
      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4">
        <div className="h-4 bg-amber-200/50 dark:bg-amber-800/30 rounded w-28 mb-2 animate-pulse"></div>
        <div className="h-6 bg-amber-200/50 dark:bg-amber-800/30 rounded w-20 animate-pulse"></div>
      </div>

      {/* Upcoming Skeleton Card 3 */}
      <div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 p-4">
        <div className="h-4 bg-indigo-200/50 dark:bg-indigo-800/30 rounded w-28 mb-2 animate-pulse"></div>
        <div className="h-6 bg-indigo-200/50 dark:bg-indigo-800/30 rounded w-20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default PaymentsMetricsCards;
