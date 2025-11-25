import { Badge } from "@/components/ui/badge";
import { MdEdit } from "react-icons/md";
import { TruckIcon } from "lucide-react";

const GeneralInformationCard = ({ assetData }) => {
  const getSafetyStatusBadgeColor = (status) => {
    const colors = {
      Pass: "bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50",
      Fail: "bg-red-500/10 hover:bg-red-500/30 text-red-700 dark:text-red-400 border border-red-500/50",
      Pending: "bg-yellow-500/10 hover:bg-yellow-500/30 text-yellow-700 dark:text-yellow-400 border border-yellow-500/50",
    };
    return colors[status] || "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  return (
    <div className="w-full border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <TruckIcon className="size-4" />
          Asset Information
        </h3>
        <div className="flex items-center gap-2">
          <button className="text-slate-500 hover:text-foreground transition-colors">
            <MdEdit className="size-4" />
          </button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {/* Vehicle Number and Service Status */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Vehicle Number</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.vehicleNumber || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Service Status</p>
            <Badge className="bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50">
              {assetData.serviceStatus || "-"}
            </Badge>
          </div>
        </div>

        {/* In Service Date and Out Service Date */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">In Service Date</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.inServiceDate || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Out Service Date</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.outServiceDate || "-"}
            </p>
          </div>
        </div>

        {/* Make and Year */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Make</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.make || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Year</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.year || "-"}
            </p>
          </div>
        </div>

        {/* Type and Fleet */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Type</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.type || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Fleet</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.fleet || "-"}
            </p>
          </div>
        </div>

        {/* Payee Option and Owner */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Payee Option</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.payeeOption || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Owner</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.owner || "-"}
            </p>
          </div>
        </div>

        {/* Assigned Driver and Home Terminal */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Assigned Driver</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.assignedDriver || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Home Terminal</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.homeTerminal || "-"}
            </p>
          </div>
        </div>

        {/* Date Assigned and Assigned By */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Date Assigned</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.dateAssigned || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Assigned By</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.assignedBy || "-"}
            </p>
          </div>
        </div>

        {/* Dispatcher and Serial Number */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Dispatcher</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.dispatcher || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Serial Number</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.serialNumber || "-"}
            </p>
          </div>
        </div>

        {/* Safety Status and Driver */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Safety Status</p>
            <Badge className={getSafetyStatusBadgeColor(assetData.safetyStatus)}>
              {assetData.safetyStatus || "-"}
            </Badge>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Driver</p>
            <p className="text-sm font-medium text-foreground">
              {assetData.driver || "-"}
            </p>
          </div>
        </div>

        {/* Trailer */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Trailer</p>
          <p className="text-sm font-medium text-foreground">
            {assetData.trailer || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralInformationCard;
