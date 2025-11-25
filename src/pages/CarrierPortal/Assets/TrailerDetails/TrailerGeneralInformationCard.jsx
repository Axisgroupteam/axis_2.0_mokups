import { Badge } from "@/components/ui/badge";
import { MdEdit } from "react-icons/md";
import { FaTrailer } from "react-icons/fa";

const TrailerGeneralInformationCard = ({ trailerData }) => {
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
          <FaTrailer className="size-4" />
          Trailer Information
        </h3>
        <div className="flex items-center gap-2">
          <button className="text-slate-500 hover:text-foreground transition-colors">
            <MdEdit className="size-4" />
          </button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {/* Trailer Number and Service Status */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Trailer Number</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.trailerNumber || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Service Status</p>
            <Badge className="bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50">
              {trailerData.serviceStatus || "-"}
            </Badge>
          </div>
        </div>

        {/* In Service Date and Out Service Date */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">In Service Date</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.inServiceDate || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Out Service Date</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.outServiceDate || "-"}
            </p>
          </div>
        </div>

        {/* Type and Make */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Type</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.type || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Make</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.make || "-"}
            </p>
          </div>
        </div>

        {/* Year and Serial Number */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Year</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.year || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Serial Number</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.serialNumber || "-"}
            </p>
          </div>
        </div>

        {/* Fleet and Safety Status */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Fleet</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.fleet || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Safety Status</p>
            <Badge className={getSafetyStatusBadgeColor(trailerData.safetyStatus)}>
              {trailerData.safetyStatus || "-"}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerGeneralInformationCard;
