import { MdEdit } from "react-icons/md";
import { Clock } from "lucide-react";

const AgingSummaryCard = () => {
  // Mock aging data
  const agingData = {
    current: 28500.00,
    over30: 12350.00,
    over60: 8200.00,
    over90: 4500.00,
    over120: 2100.00,
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="w-1/2 border rounded-sm bg-card flex flex-col h-fit">
      <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Clock className="size-4" />
          Aging Summary
        </h3>
        <div className="flex items-center gap-2">
          <button className="text-slate-500 hover:text-foreground transition-colors">
            <MdEdit className="size-4" />
          </button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {/* Current and Over 30 */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Current</p>
            <p className="text-sm font-medium text-green-600">
              {formatCurrency(agingData.current)}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Over 30</p>
            <p className="text-sm font-medium text-yellow-600">
              {formatCurrency(agingData.over30)}
            </p>
          </div>
        </div>

        {/* Over 60 and Over 90 */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Over 60</p>
            <p className="text-sm font-medium text-orange-600">
              {formatCurrency(agingData.over60)}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Over 90</p>
            <p className="text-sm font-medium text-red-500">
              {formatCurrency(agingData.over90)}
            </p>
          </div>
        </div>

        {/* Over 120 */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Over 120</p>
          <p className="text-sm font-medium text-red-700">
            {formatCurrency(agingData.over120)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgingSummaryCard;
