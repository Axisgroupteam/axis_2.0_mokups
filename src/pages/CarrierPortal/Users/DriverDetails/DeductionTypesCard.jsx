import { FaMinusCircle, FaEdit } from "react-icons/fa";

const DeductionTypesCard = () => {
  return (
    <div className="border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaMinusCircle className="size-4" />
          Deduction Types
        </h3>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <FaEdit className="size-3.5" />
        </button>
      </div>
      <div className="divide-y divide-border">
        {/* Deduction code, Deduction type, Amount, Frequency */}
        <div className="grid grid-cols-4 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Deduction Code</p>
            <p className="text-sm font-medium text-foreground">401K</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Deduction Type</p>
            <p className="text-sm font-medium text-foreground">Retirement</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Amount</p>
            <p className="text-sm font-medium text-foreground">$200.00</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Frequency</p>
            <p className="text-sm font-medium text-foreground">Monthly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeductionTypesCard;
