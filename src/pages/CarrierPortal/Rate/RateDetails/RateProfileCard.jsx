import { TrendingUpIcon } from "lucide-react";
import { MdEdit } from "react-icons/md";

const RateProfileCard = ({ rateData }) => {
  return (
    <div className="w-1/2 border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <TrendingUpIcon className="size-4" />
          Rate Profile
        </h3>
        <button className="text-slate-500 hover:text-foreground transition-colors">
          <MdEdit className="size-4" />
        </button>
      </div>
      <div className="divide-y divide-border">
        {/* Rate Name */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Rate Name</p>
          <p className="text-sm font-medium text-foreground">
            {rateData.rateName || "-"}
          </p>
        </div>

        {/* Customer */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Customer</p>
          <p className="text-sm font-medium text-foreground">
            {rateData.customer || "-"}
          </p>
        </div>

        {/* Description */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Description</p>
          <p className="text-sm font-medium text-foreground">
            {rateData.description || "-"}
          </p>
        </div>

        {/* Origin Method, Destination Method */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Origin Method</p>
            <p className="text-sm font-medium text-foreground">
              {rateData.originMethod || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Destination Method</p>
            <p className="text-sm font-medium text-foreground">
              {rateData.destinationMethod || "-"}
            </p>
          </div>
        </div>

        {/* Origin Location */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Origin Location</p>
          <p className="text-sm font-medium text-foreground">
            {rateData.originLocation || "-"}
          </p>
        </div>

        {/* Destination Location */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Destination Location</p>
          <p className="text-sm font-medium text-foreground">
            {rateData.destinationLocation || "-"}
          </p>
        </div>

        {/* Customer Rate Method, Driver Rate Method */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Customer Rate Method</p>
            <p className="text-sm font-medium text-foreground">
              {rateData.customerRateMethod || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Driver Rate Method</p>
            <p className="text-sm font-medium text-foreground">
              {rateData.driverRateMethod || "-"}
            </p>
          </div>
        </div>

        {/* Customer Rate, Driver Rate */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Customer Rate</p>
            <p className="text-sm font-medium text-foreground">
              {rateData.customerRate ? `$${rateData.customerRate}` : "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Driver Rate</p>
            <p className="text-sm font-medium text-foreground">
              {rateData.driverRate ? `$${rateData.driverRate}` : "-"}
            </p>
          </div>
        </div>

        {/* Distance */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Distance</p>
          <p className="text-sm font-medium text-foreground">
            {rateData.distance || "-"}
          </p>
        </div>

        {/* PO */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">PO</p>
          <p className="text-sm font-medium text-foreground">
            {rateData.po || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateProfileCard;
