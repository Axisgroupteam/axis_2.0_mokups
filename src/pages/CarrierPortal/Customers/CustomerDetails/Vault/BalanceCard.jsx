import { MdEdit } from "react-icons/md";
import { DollarSign } from "lucide-react";

const BalanceCard = () => {
  // Mock balance data
  const balanceData = {
    balance: 45250.00,
    highBalance: 78500.00,
    totalPastDue: 12350.00,
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="border rounded-sm bg-card flex flex-col h-fit">
      <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <DollarSign className="size-4" />
          Balance
        </h3>
        <div className="flex items-center gap-2">
          <button className="text-slate-500 hover:text-foreground transition-colors">
            <MdEdit className="size-4" />
          </button>
        </div>
      </div>
      <div className="divide-y divide-border">
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Balance</p>
            <p className="text-sm font-medium text-foreground">
              {formatCurrency(balanceData.balance)}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">High Balance</p>
            <p className="text-sm font-medium text-foreground">
              {formatCurrency(balanceData.highBalance)}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Total Past Due</p>
            <p className="text-sm font-medium text-red-600">
              {formatCurrency(balanceData.totalPastDue)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
