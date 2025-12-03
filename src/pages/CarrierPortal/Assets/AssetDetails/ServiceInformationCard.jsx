import { Badge } from "@/components/ui/badge";
import { MdEdit } from "react-icons/md";
import { ClipboardList } from "lucide-react";

const ServiceInformationCard = ({ assetData }) => {
  const getSafetyStatusBadgeColor = (status) => {
    const colors = {
      Active: "bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50",
      Inactive: "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50",
      "In Shop": "bg-yellow-500/10 hover:bg-yellow-500/30 text-yellow-700 dark:text-yellow-400 border border-yellow-500/50",
      "Out of Service": "bg-red-500/10 hover:bg-red-500/30 text-red-700 dark:text-red-400 border border-red-500/50",
    };
    return colors[status] || "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  return (
    <div className="w-full border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <ClipboardList className="size-4" />
          Service & Assignment Information
        </h3>
        <div className="flex items-center gap-2">
          <button className="text-slate-500 hover:text-foreground transition-colors">
            <MdEdit className="size-4" />
          </button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {/* Safety Status and Reason */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Safety Status</p>
            <Badge className={getSafetyStatusBadgeColor(assetData.safetyStatus)}>
              {assetData.safetyStatus || "-"}
            </Badge>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Reason</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.reason || "-"}
            </p>
          </div>
        </div>

        {/* Service Status and In Service Date */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Service Status</p>
            <Badge className="bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50">
              {assetData.serviceStatus || "-"}
            </Badge>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">In Service Date</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.inServiceDate || "-"}
            </p>
          </div>
        </div>

        {/* Out Service Date and Payee Option */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Out Service Date</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.outServiceDate || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Payee Option</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.payeeOption || "-"}
            </p>
          </div>
        </div>

        {/* Owner and Home Terminal */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Owner</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.owner || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Home Terminal</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.homeTerminal || "-"}
            </p>
          </div>
        </div>

        {/* Operator and Dispatcher */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Operator</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.operator || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Dispatcher</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.dispatcher || "-"}
            </p>
          </div>
        </div>

        {/* Trailer and Date Assigned */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Trailer</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.trailer || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Date Assigned</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.dateAssigned || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInformationCard;
