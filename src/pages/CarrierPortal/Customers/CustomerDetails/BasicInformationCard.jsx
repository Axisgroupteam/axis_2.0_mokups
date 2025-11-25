import { Badge } from "@/components/ui/badge";
import { MdEdit } from "react-icons/md";
import { Building2 } from "lucide-react";

const BasicInformationCard = ({ customerData }) => {
  return (
    <div className="w-1/2 border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Building2 className="size-4" />
          Customer Information
        </h3>
        <div className="flex items-center gap-2">
          <button className="text-slate-500 hover:text-foreground transition-colors">
            <MdEdit className="size-4" />
          </button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {/* Name and Code */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Name</p>
            <p className="text-sm font-medium text-foreground">
              {customerData.name || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Code</p>
            <p className="text-sm font-medium text-foreground">
              {customerData.code || "-"}
            </p>
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Email</p>
            <p className="text-sm font-medium text-foreground">
              {customerData.email || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
            <p className="text-sm font-medium text-foreground">
              {customerData.phone || "-"}
            </p>
          </div>
        </div>

        {/* Address Line 1 */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Address Line 1</p>
          <p className="text-sm font-medium text-foreground">
            {customerData.addressLine1 || "-"}
          </p>
        </div>

        {/* State, City, Zip Code */}
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">State</p>
            <p className="text-sm font-medium text-foreground">
              {customerData.state || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">City</p>
            <p className="text-sm font-medium text-foreground">
              {customerData.city || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Zip Code</p>
            <p className="text-sm font-medium text-foreground">
              {customerData.zipCode || "-"}
            </p>
          </div>
        </div>

        {/* Customer Region */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Customer Region</p>
          <p className="text-sm font-medium text-foreground">
            {customerData.customerRegion || "-"}
          </p>
        </div>

        {/* Billing Type and Miles Meter System */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Billing Type</p>
            <Badge
              className={
                customerData.billingType === "Factored customer"
                  ? "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50"
                  : "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50"
              }
            >
              {customerData.billingType || "-"}
            </Badge>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Miles Meter System</p>
            <p className="text-sm font-medium text-foreground">
              {customerData.milesMeterSystem || "-"}
            </p>
          </div>
        </div>

        {/* Fleet Type and Miles Calc Type */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Fleet Type</p>
            <p className="text-sm font-medium text-foreground">
              {customerData.fleetType || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Miles Calc Type</p>
            <p className="text-sm font-medium text-foreground">
              {customerData.milesCalcType || "-"}
            </p>
          </div>
        </div>

        {/* Auto Email Export */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Auto Email Export</p>
          <Badge
            className={
              customerData.autoEmailExport === "on"
                ? "bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50"
                : "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50"
            }
          >
            {customerData.autoEmailExport === "on" ? "On" : "Off"}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default BasicInformationCard;
