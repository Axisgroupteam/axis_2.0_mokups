import { MdEdit } from "react-icons/md";
import { Settings, CloudIcon, FileTextIcon, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
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
    // QuickBooks Integration
    qbSyncEnabled: true,
    qbAccountId: "QB-ACC-4521",
    qbLastSync: "2024-01-28T14:30:00Z",
    qbSyncStatus: "connected", // "connected", "disconnected", "error"
    // PDF Settings
    autoGeneratePdf: true,
    pdfTemplate: "Standard",
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

  const QBStatusBadge = ({ status }) => {
    const statusConfig = {
      connected: {
        className: "bg-emerald-500/10 text-emerald-700 border-emerald-500/50",
        icon: <CheckCircle2 className="size-3 mr-1" />,
        label: "Connected",
      },
      disconnected: {
        className: "bg-gray-500/10 text-gray-700 border-gray-500/50",
        icon: <XCircle className="size-3 mr-1" />,
        label: "Disconnected",
      },
      error: {
        className: "bg-red-500/10 text-red-700 border-red-500/50",
        icon: <AlertCircle className="size-3 mr-1" />,
        label: "Error",
      },
    };
    const config = statusConfig[status] || statusConfig.disconnected;
    return (
      <Badge className={config.className}>
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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

        {/* QuickBooks Integration Header */}
        <div className="px-4 py-3 bg-muted/50 flex items-center gap-2">
          <CloudIcon className="size-4 text-muted-foreground" />
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">QuickBooks Integration</p>
        </div>

        {/* QB Sync Enabled and Status */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Sync to QuickBooks</p>
            <BooleanBadge value={settingsData.qbSyncEnabled} />
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Connection Status</p>
            <QBStatusBadge status={settingsData.qbSyncStatus} />
          </div>
        </div>

        {/* QB Account ID and Last Sync */}
        {settingsData.qbSyncEnabled && (
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">QB Account ID</p>
              <p className="text-sm font-mono font-medium text-foreground">{settingsData.qbAccountId}</p>
            </div>
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">Last Sync</p>
              <p className="text-sm font-medium text-foreground">{formatDateTime(settingsData.qbLastSync)}</p>
            </div>
          </div>
        )}

        {/* PDF Settings Header */}
        <div className="px-4 py-3 bg-muted/50 flex items-center gap-2">
          <FileTextIcon className="size-4 text-muted-foreground" />
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">PDF Settings</p>
        </div>

        {/* Auto Generate PDF and Template */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Auto Generate PDF</p>
            <BooleanBadge value={settingsData.autoGeneratePdf} />
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">PDF Template</p>
            <p className="text-sm font-medium text-foreground">{settingsData.pdfTemplate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionalSettingsCard;
