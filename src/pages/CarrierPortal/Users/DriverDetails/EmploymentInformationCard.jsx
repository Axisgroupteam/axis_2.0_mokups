import { FaCogs, FaEdit } from "react-icons/fa";

const EmploymentInformationCard = () => {
  return (
    <div className="border rounded-sm bg-card">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaCogs className="size-4" />
          Employment Information
        </h3>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <FaEdit className="size-3.5" />
        </button>
      </div>
      <div className="divide-y divide-border">
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Eligible for Rehire</p>
            <p className="text-sm font-medium text-foreground">Yes</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Truck Number</p>
            <p className="text-sm font-medium text-foreground">TRK-2024-001</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Dot Logging Required</p>
            <p className="text-sm font-medium text-foreground">Yes</p>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Termination Date</p>
            <p className="text-sm font-medium text-foreground">-</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">PTO</p>
            <p className="text-sm font-medium text-foreground">15 days</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Axis App</p>
            <p className="text-sm font-medium text-foreground">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmploymentInformationCard;
