import { MdEdit } from "react-icons/md";
import { Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const OptionalSettingsCard = () => {
  // Mock optional settings data
  const settingsData = {
    billingMethod: "Invoice",
    postDetails: true,
    billWithoutPaperwork: false,
    autoRenditionProcess: true,
    autoBill: true,
    readyToBill: false,
  };

  const BooleanBadge = ({ value }) => {
    return (
      <Badge
        className={
          value
            ? "bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50"
            : "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50"
        }
      >
        {value ? "Yes" : "No"}
      </Badge>
    );
  };

  return (
    <div className="border rounded-sm bg-card flex flex-col h-fit">
      <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Settings className="size-4" />
          Optional Settings
        </h3>
        <div className="flex items-center gap-2">
          <button className="text-slate-500 hover:text-foreground transition-colors">
            <MdEdit className="size-4" />
          </button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {/* Billing Method and Post Details */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Billing Method</p>
            <p className="text-sm font-medium text-foreground">{settingsData.billingMethod}</p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Post Details</p>
            <BooleanBadge value={settingsData.postDetails} />
          </div>
        </div>

        {/* Bill Without Paperwork and Auto Rendition Process */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Bill Without Paperwork</p>
            <BooleanBadge value={settingsData.billWithoutPaperwork} />
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Auto Rendition Process</p>
            <BooleanBadge value={settingsData.autoRenditionProcess} />
          </div>
        </div>

        {/* Auto Bill and Ready to Bill */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Auto Bill</p>
            <BooleanBadge value={settingsData.autoBill} />
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Ready to Bill</p>
            <BooleanBadge value={settingsData.readyToBill} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionalSettingsCard;
