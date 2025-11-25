import { Badge } from "@/components/ui/badge";
import { FaUser } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const UserInfoCard = ({ technicianData }) => {
  return (
    <div className="w-full border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaUser className="size-4" />
          User Information
        </h3>
        <div className="flex items-center gap-2">
          <button className="text-slate-500 hover:text-foreground transition-colors">
            <MdEdit className="size-4" />
          </button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {/* Full Name, Email */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Full Name</p>
            <p className="text-sm font-medium text-foreground">
              {technicianData.firstName} {technicianData.middleName}{" "}
              {technicianData.lastName}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">
              Email Address
            </p>
            <p className="text-sm font-medium text-foreground">
              {technicianData.email}
            </p>
          </div>
        </div>

        {/* Role - Full Width */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Role</p>
          <Badge className="bg-teal-500/10 hover:bg-teal-500/30 text-teal-700 dark:text-teal-400 border border-teal-500/50 text-xs">
            {technicianData.role}
          </Badge>
        </div>

        {/* Address - Full Width */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Address</p>
          <p className="text-sm font-medium text-foreground">
            {technicianData.address || "-"}
          </p>
        </div>

        {/* City, State */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">City</p>
            <p className="text-sm font-medium text-foreground">
              {technicianData.city || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">State</p>
            <p className="text-sm font-medium text-foreground">
              {technicianData.state || "-"}
            </p>
          </div>
        </div>

        {/* ZIP Code - Full Width */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">ZIP Code</p>
          <p className="text-sm font-medium text-foreground">
            {technicianData.zipcode || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
