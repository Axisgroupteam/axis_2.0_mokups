import { Badge } from "@/components/ui/badge";
import { FaWrench } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const TechnicianDetailsCard = () => {
  return (
    <div className="w-full border rounded-sm bg-card">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaWrench className="size-4" />
          Technician Details
        </h3>
        <button className="text-slate-500 hover:text-foreground transition-colors">
          <MdEdit className="size-4" />
        </button>
      </div>
      <div className="divide-y divide-border">
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Job Title</p>
            <p className="text-sm font-medium text-foreground">
              Senior Mechanic
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Qualification</p>
            <p className="text-sm font-medium text-foreground">
              ASE Certified
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Status</p>
            <Badge className="bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50 text-xs">
              Active
            </Badge>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">
              Reason for Inactive
            </p>
            <p className="text-sm font-medium text-foreground">-</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDetailsCard;
