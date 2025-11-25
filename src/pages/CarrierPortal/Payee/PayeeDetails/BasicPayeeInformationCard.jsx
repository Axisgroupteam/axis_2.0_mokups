import { Badge } from "@/components/ui/badge";
import { FaInfoCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Check } from "lucide-react";

const BasicPayeeInformationCard = () => {
  return (
    <div className="border rounded-sm bg-card flex-1 flex flex-col">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaInfoCircle className="size-4" />
          Basic Payee Information
        </h3>
        <button className="text-slate-500 hover:text-foreground transition-colors">
          <MdEdit className="size-4" />
        </button>
      </div>
      <div className="divide-y divide-border">
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Legal Name</p>
            <p className="text-sm font-medium text-foreground">
              John Michael Smith LLC
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Code</p>
            <p className="text-sm font-medium text-foreground">PAY-001</p>
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
            <p className="text-xs text-muted-foreground mb-0.5">Settlement</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-4 h-4 border-2 border-green-500 bg-green-500 rounded">
                <Check className="size-3 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">Enabled</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Tax ID</p>
            <p className="text-sm font-medium text-foreground">XX-XXXXXXX123</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Payment Method</p>
            <p className="text-sm font-medium text-foreground">Bank Transfer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicPayeeInformationCard;
