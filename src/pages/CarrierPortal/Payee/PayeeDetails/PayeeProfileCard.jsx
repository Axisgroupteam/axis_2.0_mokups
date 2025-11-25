import { FaUserCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Check } from "lucide-react";

const PayeeProfileCard = ({ payeeData }) => {
  return (
    <div className="w-1/2 border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaUserCircle className="size-4" />
          Payee Profile
        </h3>
        <button className="text-slate-500 hover:text-foreground transition-colors">
          <MdEdit className="size-4" />
        </button>
      </div>
      <div className="divide-y divide-border">
        {/* Name */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Name</p>
          <p className="text-sm font-medium text-foreground">
            {payeeData.name || "-"}
          </p>
        </div>

        {/* Legal Name */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Legal Name</p>
          <p className="text-sm font-medium text-foreground">
            {payeeData.legalName || "-"}
          </p>
        </div>

        {/* Code */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Code</p>
          <p className="text-sm font-medium text-foreground">
            {payeeData.code || "-"}
          </p>
        </div>

        {/* Settlement */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Settlement</p>
          <div className="flex items-center gap-2">
            <div className={`flex items-center justify-center w-4 h-4 border-2 rounded ${
              payeeData.settlement
                ? "border-green-500 bg-green-500"
                : "border-gray-300 bg-transparent"
            }`}>
              {payeeData.settlement && (
                <Check className="size-3 text-white" />
              )}
            </div>
            <span className="text-sm font-medium text-foreground">
              {payeeData.settlement ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>

        {/* Address */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Address</p>
          <p className="text-sm font-medium text-foreground">
            {payeeData.address || "-"}
          </p>
        </div>

        {/* City, State, ZIP */}
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">City</p>
            <p className="text-sm font-medium text-foreground">
              {payeeData.city || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">State</p>
            <p className="text-sm font-medium text-foreground">
              {payeeData.state || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">ZIP Code</p>
            <p className="text-sm font-medium text-foreground">
              {payeeData.zip || "-"}
            </p>
          </div>
        </div>

        {/* Phone Number */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Phone Number</p>
          <p className="text-sm font-medium text-foreground">
            {payeeData.phoneNumber || "-"}
          </p>
        </div>

        {/* Payment Method */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Payment Method</p>
          <p className="text-sm font-medium text-foreground">
            {payeeData.paymentMethod || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PayeeProfileCard;
