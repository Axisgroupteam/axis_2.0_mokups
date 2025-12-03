import { MdEdit } from "react-icons/md";
import { DollarSign } from "lucide-react";

const BalanceSummaryCard = () => {
  // Mock balance data
  const balanceData = {
    balance: 55650.00,
    openCredits: 3200.00,
    agingBalance: 52450.00,
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
          <DollarSign className="size-4" />
          Balance Summary
        </h3>
        <div className="flex items-center gap-2">
          <button className="text-slate-500 hover:text-foreground transition-colors">
            <MdEdit className="size-4" />
          </button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {/* Balance */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Balance</p>
          <p className="text-sm font-medium text-foreground">
            {formatCurrency(balanceData.balance)}
          </p>
        </div>

        {/* Open Credits */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Open Credits</p>
          <p className="text-sm font-medium text-blue-600">
            {formatCurrency(balanceData.openCredits)}
          </p>
        </div>

        {/* Aging Balance */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Aging Balance</p>
          <p className="text-sm font-medium text-foreground">
            {formatCurrency(balanceData.agingBalance)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BalanceSummaryCard;
