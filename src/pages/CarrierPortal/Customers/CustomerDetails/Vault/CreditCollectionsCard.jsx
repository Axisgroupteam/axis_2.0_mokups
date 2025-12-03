import { MdEdit } from "react-icons/md";
import { CreditCard, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CreditCollectionsCard = () => {
  // Mock credit and collections data
  const creditData = {
    creditLimit: 100000.00,
    creditLimitWarning: 80000.00,
    balance: 45250.00,
    availableCredit: 54750.00,
    unbilled: 8500.00,
  };

  const collectionData = {
    collectionsActive: false,
    assignedTo: "John Smith",
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const BooleanBadge = ({ value }) => {
    return (
      <Badge
        className={
          value
            ? "bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50"
            : "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50"
        }
      >
        {value ? "Yes" : "No"}
      </Badge>
    );
  };

  return (
    <div className="flex gap-4">
      {/* Credit and Collections Card */}
      <div className="w-1/2 border rounded-sm bg-card flex flex-col h-fit">
        <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <CreditCard className="size-4" />
            Credit and Collections
          </h3>
          <div className="flex items-center gap-2">
            <button className="text-slate-500 hover:text-foreground transition-colors">
              <MdEdit className="size-4" />
            </button>
          </div>
        </div>
        <div className="divide-y divide-border">
          {/* Credit Limit and Credit Limit Warning */}
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">Credit Limit</p>
              <p className="text-sm font-medium text-foreground">
                {formatCurrency(creditData.creditLimit)}
              </p>
            </div>
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">Credit Limit Warning</p>
              <p className="text-sm font-medium text-yellow-600">
                {formatCurrency(creditData.creditLimitWarning)}
              </p>
            </div>
          </div>

          {/* Balance and Available Credit */}
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">Balance</p>
              <p className="text-sm font-medium text-foreground">
                {formatCurrency(creditData.balance)}
              </p>
            </div>
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">Available Credit</p>
              <p className="text-sm font-medium text-green-600">
                {formatCurrency(creditData.availableCredit)}
              </p>
            </div>
          </div>

          {/* Unbilled */}
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Unbilled</p>
            <p className="text-sm font-medium text-foreground">
              {formatCurrency(creditData.unbilled)}
            </p>
          </div>
        </div>
      </div>

      {/* Collection Information Card */}
      <div className="w-1/2 border rounded-sm bg-card flex flex-col h-fit">
        <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Users className="size-4" />
            Collection Information
          </h3>
          <div className="flex items-center gap-2">
            <button className="text-slate-500 hover:text-foreground transition-colors">
              <MdEdit className="size-4" />
            </button>
          </div>
        </div>
        <div className="divide-y divide-border">
          {/* Collections Active and Assigned To */}
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">Collections Active</p>
              <BooleanBadge value={collectionData.collectionsActive} />
            </div>
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">Assigned To</p>
              <p className="text-sm font-medium text-foreground">
                {collectionData.assignedTo || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCollectionsCard;
