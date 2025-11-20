import { FaUniversity, FaEdit } from "react-icons/fa";

const BankInformationCard = () => {
  return (
    <div className="border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaUniversity className="size-4" />
          Bank Information
        </h3>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <FaEdit className="size-3.5" />
        </button>
      </div>
      <div className="divide-y divide-border">
        {/* Bank name, Frequency, Pay type */}
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Bank Name</p>
            <p className="text-sm font-medium text-foreground">Chase Bank</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Frequency</p>
            <p className="text-sm font-medium text-foreground">Bi-weekly</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Pay Type</p>
            <p className="text-sm font-medium text-foreground">Direct Deposit</p>
          </div>
        </div>

        {/* Pay type (again), Pay rate, Default pay rate */}
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Pay Type</p>
            <p className="text-sm font-medium text-foreground">Hourly</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Pay Rate</p>
            <p className="text-sm font-medium text-foreground">$25.00/hr</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Default Pay Rate</p>
            <p className="text-sm font-medium text-foreground">$25.00/hr</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankInformationCard;
