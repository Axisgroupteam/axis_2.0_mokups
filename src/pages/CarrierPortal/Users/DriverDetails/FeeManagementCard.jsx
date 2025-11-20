import { FaFileInvoiceDollar, FaEdit } from "react-icons/fa";

const FeeManagementCard = () => {
  return (
    <div className="border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaFileInvoiceDollar className="size-4" />
          Fee Management
        </h3>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <FaEdit className="size-3.5" />
        </button>
      </div>
      <div className="divide-y divide-border">
        {/* Fee type */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Fee Type</p>
          <p className="text-sm font-medium text-foreground">Monthly Fee</p>
        </div>
      </div>
    </div>
  );
};

export default FeeManagementCard;
