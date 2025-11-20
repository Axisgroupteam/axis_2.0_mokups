import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaUser, FaEdit } from "react-icons/fa";

const DriverBasicInformationCard = () => {
  return (
    <div className="border rounded-sm bg-card flex-1 flex flex-col">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaUser className="size-4" />
          Driver Basic Information
        </h3>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <FaEdit className="size-3.5" />
        </button>
      </div>
      <div className="divide-y divide-border">
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Driver Code</p>
            <p className="text-sm font-medium text-foreground">DRV-001</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Driver Type</p>
            <p className="text-sm font-medium text-foreground">
              Company Driver
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
        <div className="px-4 py-2.5 flex justify-start">
          <Button size="sm" variant={"ghost"} className="h-8    w-full">
            Generate Temporary Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DriverBasicInformationCard;
