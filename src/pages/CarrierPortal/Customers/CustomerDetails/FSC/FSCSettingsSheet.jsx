import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SaveIcon, SettingsIcon, XIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const FSCSettingsSheet = ({ open, onOpenChange, settings, onSave }) => {
  const [fscApplies, setFscApplies] = useState(settings?.fscApplies || "YES_ITEMIZED");

  useEffect(() => {
    if (settings?.fscApplies) setFscApplies(settings.fscApplies);
  }, [settings]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[420px] sm:max-w-none p-0 flex flex-col h-full border-l border-border bg-background">
        <SheetHeader className="px-6 py-4 border-b flex-shrink-0">
          <SheetTitle className="text-base flex items-center gap-2">
            <SettingsIcon className="h-4 w-4 text-muted-foreground" />
            Customer FSC Settings
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 min-h-0">
          <div className="p-6 space-y-4">
            <div className="border rounded-sm p-4 space-y-3 bg-muted/20">
              <p className="text-sm font-semibold text-foreground">FSC Applicability</p>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Does FSC Apply?</Label>
                <Select value={fscApplies} onValueChange={setFscApplies}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YES_ITEMIZED">Yes, Itemized on Invoice</SelectItem>
                    <SelectItem value="YES_ALL_IN">Yes, All-in Rate (Hidden)</SelectItem>
                    <SelectItem value="NO">No FSC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {fscApplies === "YES_ALL_IN" && (
                <div className="rounded-sm bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800">
                  Fuel cost is built into the linehaul rate. No FSC line will appear on invoices.
                </div>
              )}
              {fscApplies === "NO" && (
                <div className="rounded-sm bg-rose-50 border border-rose-200 px-3 py-2 text-xs text-rose-800">
                  This customer will not be charged any fuel surcharge.
                </div>
              )}
              {fscApplies === "YES_ITEMIZED" && (
                <div className="rounded-sm bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-800">
                  FSC will be calculated and shown as a separate line item on invoices.
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t bg-background flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="gap-1.5">
            <XIcon className="h-4 w-4" /> Cancel
          </Button>
          <Button
            onClick={() => {
              if (onSave) onSave({ ...settings, fscApplies });
              onOpenChange(false);
            }}
            className="gap-1.5"
          >
            <SaveIcon className="h-4 w-4" /> Save Settings
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default FSCSettingsSheet;
