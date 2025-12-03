import { MdEdit } from "react-icons/md";
import { FaTrailer } from "react-icons/fa";
import { FileText, Image } from "lucide-react";

const TrailerGeneralInformationCard = ({ trailerData }) => {
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
        {/* Trailer Name and VIN/SN */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Trailer Name</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.trailerName || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">VIN/SN</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.vinSn || "-"}
            </p>
          </div>
        </div>

        {/* License Plate and Year */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">License Plate</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.licensePlate || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Year</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.year || "-"}
            </p>
          </div>
        </div>

        {/* Model and Make */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Model</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.model || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Make</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.make || "-"}
            </p>
          </div>
        </div>

        {/* Fleet Type and Group */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Fleet Type</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.fleetType || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Group</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.group || "-"}
            </p>
          </div>
        </div>

        {/* Type and Ownership */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Type</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.type || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Ownership</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.ownership || "-"}
            </p>
          </div>
        </div>

        {/* Body Type and Body Subtype */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Body Type</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.bodyType || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Body Subtype</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.bodySubtype || "-"}
            </p>
          </div>
        </div>

        {/* Color and MSRP */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Color</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.color || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">MSRP</p>
            <p className="text-sm font-medium text-foreground">
              {trailerData.msrp || "-"}
            </p>
          </div>
        </div>

        {/* Registration Documents and Trailer Images */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Registration Documents</p>
            {trailerData.registrationDocuments ? (
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <FileText className="size-4" />
                <span className="hover:underline cursor-pointer">{trailerData.registrationDocuments}</span>
              </div>
            ) : (
              <p className="text-sm font-medium text-foreground">-</p>
            )}
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Trailer Images</p>
            {trailerData.trailerImages ? (
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Image className="size-4" />
                <span className="hover:underline cursor-pointer">{trailerData.trailerImages}</span>
              </div>
            ) : (
              <p className="text-sm font-medium text-foreground">-</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerGeneralInformationCard;
