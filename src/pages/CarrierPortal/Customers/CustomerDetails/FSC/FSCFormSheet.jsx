import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SaveIcon, ShieldCheckIcon, UploadIcon, Trash2Icon, PlusIcon, XIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const FSCFormSheet = ({ open, onOpenChange, initialData, settings }) => {
  const [formData, setFormData] = useState({
    basePrice: "2.00",
    incrementPrice: "0.10",
    incrementValue: "1.0",
    flatFeeAmount: "0.00",
    flatFeeType: "DOLLAR",
    effectiveStartDate: new Date().toISOString().split("T")[0],
  });

  const [tableRows, setTableRows] = useState([
    { id: 1, from: "2.00", to: "2.04", value: "0", type: "PERCENTAGE" },
    { id: 2, from: "2.05", to: "2.09", value: "1", type: "PERCENTAGE" }
  ]);

  const method = settings?.calculationMethod || "PERCENT_LINEHAUL";
  const isFormula = ["PERCENT_LINEHAUL", "PER_MILE"].includes(method);
  const isFlatFee = method === "FLAT_FEE";
  const isCustomerTable = method === "CUSTOMER_TABLE";

  const handleUploadMock = () => {
    setTableRows([
      { id: 1, from: "2.00", to: "2.09", value: "0", type: "PERCENTAGE" },
      { id: 2, from: "2.10", to: "2.19", value: "1", type: "PERCENTAGE" },
      { id: 3, from: "2.20", to: "2.29", value: "2", type: "PERCENTAGE" },
      { id: 4, from: "2.30", to: "999.99", value: "3", type: "PERCENTAGE" }
    ]);
  };

  useEffect(() => {
    if (initialData) setFormData({ ...initialData });
  }, [initialData]);

  // Not applicable state (ALL_IN or NO)
  if (settings?.fscApplies !== "YES_ITEMIZED") {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-[520px] sm:max-w-none p-0 flex flex-col h-full border-l border-border bg-background">
          <SheetHeader className="px-6 py-4 border-b flex-shrink-0">
            <SheetTitle className="text-base flex items-center gap-2">
              <ShieldCheckIcon className="h-4 w-4 text-muted-foreground" />
              New FSC File
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">FSC Itemization Not Enabled</p>
              <p className="text-xs text-muted-foreground">
                This customer is set to <strong>{settings?.fscApplies === "YES_ALL_IN" ? "All-In Rate" : "No FSC"}</strong>.
                <br />Update Customer Settings to create itemized FSC files.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 px-6 py-4 border-t bg-background flex-shrink-0">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="gap-1.5">
              <XIcon className="h-4 w-4" /> Close
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[520px] sm:max-w-none p-0 flex flex-col h-full border-l border-border bg-background">
        <SheetHeader className="px-6 py-4 border-b flex-shrink-0">
          <SheetTitle className="text-base flex items-center gap-2">
            <ShieldCheckIcon className="h-4 w-4 text-emerald-600" />
            {initialData ? "Edit FSC File" : "New FSC File"}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 min-h-0">
          <div className="p-6 space-y-4">

            {/* Formula-based: Percentage or Per-Mile */}
            {isFormula && (
              <div className="border rounded-sm p-4 space-y-3 bg-muted/20">
                <p className="text-sm font-semibold text-foreground">Formula Variables</p>

                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Effective Start Date</Label>
                  <Input
                    type="date"
                    value={formData.effectiveStartDate}
                    onChange={(e) => setFormData({ ...formData, effectiveStartDate: e.target.value })}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Base Price ($)</Label>
                    <Input type="number" step="0.01" value={formData.basePrice} onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Increment ($)</Label>
                    <Input type="number" step="0.01" value={formData.incrementPrice} onChange={(e) => setFormData({ ...formData, incrementPrice: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Value per Inc</Label>
                    <Input type="number" step="0.001" value={formData.incrementValue} onChange={(e) => setFormData({ ...formData, incrementValue: e.target.value })} />
                  </div>
                </div>
              </div>
            )}

            {/* Flat Fee */}
            {isFlatFee && (
              <div className="border rounded-sm p-4 space-y-3 bg-muted/20">
                <p className="text-sm font-semibold text-foreground">Flat Fee Parameters</p>

                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Effective Start Date</Label>
                  <Input
                    type="date"
                    value={formData.effectiveStartDate}
                    onChange={(e) => setFormData({ ...formData, effectiveStartDate: e.target.value })}
                    className="w-full"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Flat Fee Type</Label>
                  <Select value={formData.flatFeeType} onValueChange={(v) => setFormData({ ...formData, flatFeeType: v })}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DOLLAR">Fixed Dollar Amount</SelectItem>
                      <SelectItem value="PERCENTAGE">Fixed Percentage of Linehaul</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">
                    Flat Fee Amount ({formData.flatFeeType === "DOLLAR" ? "$" : "%"})
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.flatFeeAmount}
                    onChange={(e) => setFormData({ ...formData, flatFeeAmount: e.target.value })}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Customer Table */}
            {isCustomerTable && (
              <div className="border rounded-sm p-4 space-y-3 bg-muted/20">
                <p className="text-sm font-semibold text-foreground">Custom Surcharge Table</p>

                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Effective Start Date</Label>
                  <Input
                    type="date"
                    value={formData.effectiveStartDate}
                    onChange={(e) => setFormData({ ...formData, effectiveStartDate: e.target.value })}
                    className="w-full"
                  />
                </div>

                {/* Upload Zone */}
                <div
                  className="border-2 border-dashed border-border rounded-sm p-5 text-center cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={handleUploadMock}
                >
                  <UploadIcon className="h-5 w-5 text-muted-foreground mx-auto mb-1.5" />
                  <p className="text-sm font-medium text-foreground">Click to upload CSV / Excel</p>
                  <p className="text-xs text-muted-foreground mt-0.5">File will populate the grid below automatically</p>
                </div>

                {/* Grid */}
                <div className="border rounded-sm bg-background overflow-hidden">
                  <div className="grid grid-cols-12 gap-2 px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider border-b bg-muted/30">
                    <div className="col-span-3">From ($)</div>
                    <div className="col-span-3">To ($)</div>
                    <div className="col-span-3">Value</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-1"></div>
                  </div>

                  <div className="divide-y">
                    {tableRows.map((row, idx) => (
                      <div key={row.id} className="grid grid-cols-12 gap-2 items-center px-3 py-1.5">
                        <div className="col-span-3">
                          <Input value={row.from} onChange={(e) => { const r = [...tableRows]; r[idx].from = e.target.value; setTableRows(r); }} type="number" step="0.01" className="h-7 text-sm" />
                        </div>
                        <div className="col-span-3">
                          <Input value={row.to} onChange={(e) => { const r = [...tableRows]; r[idx].to = e.target.value; setTableRows(r); }} type="number" step="0.01" className="h-7 text-sm" />
                        </div>
                        <div className="col-span-3">
                          <Input value={row.value} onChange={(e) => { const r = [...tableRows]; r[idx].value = e.target.value; setTableRows(r); }} type="number" step="0.01" className="h-7 text-sm" />
                        </div>
                        <div className="col-span-2">
                          <Select value={row.type} onValueChange={(v) => { const r = [...tableRows]; r[idx].type = v; setTableRows(r); }}>
                            <SelectTrigger className="h-7 px-2 text-xs w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PERCENTAGE">%</SelectItem>
                              <SelectItem value="DOLLAR">$</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-1 flex justify-center">
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-rose-500 hover:bg-rose-50" onClick={() => setTableRows(tableRows.filter((_, i) => i !== idx))}>
                            <Trash2Icon className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-2 border-t">
                    <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => setTableRows([...tableRows, { id: Date.now(), from: "", to: "", value: "", type: "PERCENTAGE" }])}>
                      <PlusIcon className="h-3.5 w-3.5 mr-1.5" /> Add Row
                    </Button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </ScrollArea>

        {/* Sticky Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t bg-background flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="gap-1.5">
            <XIcon className="h-4 w-4" /> Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)} className="gap-1.5">
            <SaveIcon className="h-4 w-4" /> Queue for Approval
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default FSCFormSheet;
