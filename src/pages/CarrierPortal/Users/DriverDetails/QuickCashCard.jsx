import { FaBolt, FaEdit } from "react-icons/fa";

const QuickCashCard = () => {
  return (
    <div className="border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaBolt className="size-4" />
          Quick Cash
        </h3>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <FaEdit className="size-3.5" />
        </button>
      </div>
      <div className="divide-y divide-border">
        {/* Select Provider, Amount */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Select Provider</p>
            <p className="text-sm font-medium text-foreground">PayCard</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Amount</p>
            <p className="text-sm font-medium text-foreground">$500.00</p>
          </div>
        </div>

        {/* Reason for rapid cash */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Reason for Rapid Cash</p>
          <p className="text-sm font-medium text-foreground">Emergency expense</p>
        </div>

        {/* Confirmation Code */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Confirmation Code</p>
          <p className="text-sm font-medium text-foreground">ABC123XYZ</p>
        </div>
      </div>
    </div>
  );
};

export default QuickCashCard;
