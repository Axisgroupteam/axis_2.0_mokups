import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil } from "lucide-react";

// Setting Row Component
function SettingRow({ label, description, value, type, enabled, options }) {
  const [isEnabled, setIsEnabled] = useState(enabled);

  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {type === "toggle" ? (
        <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
      ) : type === "select" ? (
        <Select defaultValue={options?.[0]}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options?.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className="flex items-center gap-2">
          <span className="bg-muted border rounded px-3 py-1.5 text-sm">{value}</span>
          <Pencil className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
        </div>
      )}
    </div>
  );
}

export default function Settings() {
  return (
    <div className="flex flex-col h-full bg-background overflow-auto p-6">
      <div className="space-y-6">
        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Auto-Suspension Rules */}
            <div className="bg-card rounded-lg border">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Auto-Suspension Rules</h3>
                <p className="text-sm text-muted-foreground mt-1">Cards automatically suspend when conditions are met</p>
              </div>
              <div className="p-4 space-y-1 divide-y">
                <SettingRow
                  label="Driver Score Threshold"
                  description="Suspend card when driver score falls below"
                  value="50"
                  type="number"
                />
                <SettingRow
                  label="Failed Drug Test"
                  description="Auto-suspend on failed test result"
                  type="toggle"
                  enabled={true}
                />
                <SettingRow
                  label="Driver Inactive"
                  description="Suspend when driver marked inactive in AXIS"
                  type="toggle"
                  enabled={true}
                />
                <SettingRow
                  label="Settlement Balance Exceeded"
                  description="Suspend when balance exceeds threshold"
                  value="$2,500"
                  type="number"
                />
              </div>
            </div>

            {/* Card Provisioning */}
            <div className="bg-card rounded-lg border">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Card Provisioning</h3>
              </div>
              <div className="p-4 space-y-1 divide-y">
                <SettingRow
                  label="Auto-Issue on Onboarding"
                  description="Automatically provision card when driver completes onboarding"
                  type="toggle"
                  enabled={true}
                />
                <SettingRow
                  label="Ship To"
                  description="Where physical cards are shipped"
                  type="select"
                  options={["Driver's Terminal", "Driver's Address", "Main Office"]}
                />
                <SettingRow
                  label="Default Platform"
                  description="Platform for new company driver cards"
                  type="select"
                  options={["EFS", "Comdata", "Relay"]}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Fuel Advance Program */}
            <div className="bg-card rounded-lg border">
              <div className="p-4 border-b flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Fuel Advance Program</h3>
                  <p className="text-sm text-muted-foreground mt-1">For Mega Logistics carrier advances</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Disabled for Mega Trucking</span>
                  <Switch />
                </div>
              </div>
              <div className="p-4 space-y-1 divide-y opacity-60">
                <SettingRow
                  label="Max Advance (%)"
                  description="Maximum % of load value for fuel advance"
                  value="50%"
                  type="number"
                />
                <SettingRow
                  label="Advance Fee"
                  description="Fee charged on fuel advances"
                  value="3%"
                  type="number"
                />
                <SettingRow
                  label="Auto-Recapture"
                  description="Automatically deduct from settlement"
                  type="toggle"
                  enabled={true}
                />
              </div>
            </div>

            {/* Driver Notifications */}
            <div className="bg-card rounded-lg border">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Driver Notifications</h3>
              </div>
              <div className="p-4 space-y-1 divide-y">
                <SettingRow
                  label="Fuel Stop Recommendations"
                  description="Push notification + in-app display"
                  type="select"
                  options={["Both", "Push Only", "In-App Only", "Disabled"]}
                />
                <SettingRow
                  label="Tier Change Alerts"
                  description="Notify driver when pricing tier changes"
                  type="toggle"
                  enabled={true}
                />
                <SettingRow
                  label="Daily Limit Warning"
                  description="Alert when approaching daily limit"
                  value="80%"
                  type="number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
