import { FaDollarSign, FaEdit } from "react-icons/fa";

const PayeeInformationCard = () => {
  return (
    <div className="border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaDollarSign className="size-4" />
          Payee Information
        </h3>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <FaEdit className="size-3.5" />
        </button>
      </div>
      <div className="divide-y divide-border">
        {/* Payee, EIN */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Payee</p>
            <p className="text-sm font-medium text-foreground">John Smith</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">EIN</p>
            <p className="text-sm font-medium text-foreground">XX-XXXXXXX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayeeInformationCard;
