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
import { SaveIcon, ShieldCheckIcon, UploadIcon, Trash2Icon, PlusIcon, XIcon, AlertTriangleIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FSCFileSheet = ({ open, onOpenChange, initialData, settings }) => {
  const [formData, setFormData] = useState({
    calculationMethod: "PERCENT_LINEHAUL",
    indexSource: "DOE_NATIONAL",
    updateFrequency: "WEEKLY",
    effectiveDateLogic: "PICKUP_DATE",
    effectiveStartDate: new Date().toISOString().split("T")[0],
    basePrice: "2.00",
    incrementPrice: "0.10",
    incrementValue: "1.0",
    flatFeeAmount: "0.00",
    flatFeeType: "DOLLAR",
    // Cap & Floor (REQ.md Lines 87-90, 103)
    capType: "NONE",
    capValue: "",
    floorType: "NONE",
    floorValue: "",
    // Custom Rules (REQ.md Lines 84-87)
    customFrequencyRule: "",
    customerSpecifiedDateRule: "",
    // Additional Settings (REQ.md Lines 92, 99)
    sanityThreshold: "50.00",
    notes: "",
  });

  const [validationErrors, setValidationErrors] = useState([]);

  const [tableRows, setTableRows] = useState([
    { id: 1, from: "2.00", to: "2.04", value: "0", type: "PERCENTAGE" },
    { id: 2, from: "2.05", to: "2.09", value: "1", type: "PERCENTAGE" },
  ]);

  useEffect(() => {
    if (initialData) setFormData((prev) => ({ ...prev, ...initialData }));
  }, [initialData]);

  const set = (key, val) => setFormData((prev) => ({ ...prev, [key]: val }));

  const handleUploadMock = () => {
    setTableRows([
      { id: 1, from: "2.00", to: "2.09", value: "0", type: "PERCENTAGE" },
      { id: 2, from: "2.10", to: "2.19", value: "1", type: "PERCENTAGE" },
      { id: 3, from: "2.20", to: "2.29", value: "2", type: "PERCENTAGE" },
      { id: 4, from: "2.30", to: "999.99", value: "3", type: "PERCENTAGE" },
    ]);
  };

  const updateRow = (idx, key, val) => {
    const rows = [...tableRows];
    rows[idx][key] = val;
    setTableRows(rows);
  };

  // Validation function - REQ.md Section 12.1 (V1-V15)
  const validateForm = () => {
    const errors = [];

    // V2: If fsc_applies = YES_ITEMIZED, index_source is required
    if (formData.calculationMethod !== "FLAT_FEE" && !formData.indexSource) {
      errors.push("Index source required when FSC is itemized");
    }

    // V3: If fsc_applies = YES_ITEMIZED, calculation_method is required
    if (!formData.calculationMethod) {
      errors.push("Calculation method required when FSC is itemized");
    }

    // V4: If method = PERCENT_LINEHAUL or PER_MILE, formula fields required
    if (["PERCENT_LINEHAUL", "PER_MILE"].includes(formData.calculationMethod)) {
      if (!formData.basePrice || !formData.incrementPrice || !formData.incrementValue) {
        errors.push("Base price, increment price, and increment value required for formula-based methods");
      }
    }

    // V5: base_price must be >= 0
    if (formData.basePrice && parseFloat(formData.basePrice) < 0) {
      errors.push("Base price cannot be negative");
    }

    // V6: increment_price must be > 0 (no division by zero)
    if (formData.incrementPrice && parseFloat(formData.incrementPrice) <= 0) {
      errors.push("Increment price must be greater than zero");
    }

    // V7: effective_start_date is required
    if (!formData.effectiveStartDate) {
      errors.push("Start date is required");
    }

    // V9: If both cap and floor are PERCENTAGE, cap must be > floor
    if (
      formData.capType === "PERCENTAGE" &&
      formData.floorType === "PERCENTAGE" &&
      formData.capValue &&
      formData.floorValue &&
      parseFloat(formData.capValue) <= parseFloat(formData.floorValue)
    ) {
      errors.push("Cap must be greater than floor");
    }

    // V12: If effective_date_logic = CUSTOMER_SPECIFIED, rule must not be empty
    if (formData.effectiveDateLogic === "CUSTOMER_SPECIFIED" && !formData.customerSpecifiedDateRule.trim()) {
      errors.push("Custom date rule description required");
    }

    // V13: If method = FLAT_FEE, flat_fee_amount and flat_fee_type required
    if (formData.calculationMethod === "FLAT_FEE") {
      if (!formData.flatFeeAmount || parseFloat(formData.flatFeeAmount) <= 0) {
        errors.push("Flat fee amount and type required and must be positive");
      }
      if (!formData.flatFeeType) {
        errors.push("Flat fee type required");
      }
    }

    // V14: If update_frequency = CUSTOM, custom_frequency_rule required
    if (formData.updateFrequency === "CUSTOM" && !formData.customFrequencyRule.trim()) {
      errors.push("Custom frequency rule description required");
    }

    // V15: Cap and floor must be same type if both are set
    if (
      formData.capType !== "NONE" &&
      formData.floorType !== "NONE" &&
      formData.capType !== formData.floorType
    ) {
      errors.push("Cap and floor must be the same type (both % or both $)");
    }

    // Cap/Floor value required if type is set
    if (formData.capType !== "NONE" && !formData.capValue) {
      errors.push("Cap value is required when cap type is set");
    }
    if (formData.floorType !== "NONE" && !formData.floorValue) {
      errors.push("Floor value is required when floor type is set");
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log("FSC File Data:", formData);
      console.log("Custom Table Rows:", tableRows);
      onOpenChange(false);
      // TODO: Submit to backend
    }
  };

  // Derive from settings prop
  const isItemized = settings?.fscApplies !== "NO" && settings?.fscApplies !== "YES_ALL_IN";
  const isFormula = ["PERCENT_LINEHAUL", "PER_MILE"].includes(formData.calculationMethod);
  const isFlatFee = formData.calculationMethod === "FLAT_FEE";
  const isCustomerTable = formData.calculationMethod === "CUSTOMER_TABLE";
  const isFlat = formData.calculationMethod === "FLAT_FEE";

  // Blocked state when Settings says not itemized
  if (!isItemized) {
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

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertTriangleIcon className="h-4 w-4" />
                <AlertDescription>
                  <p className="font-semibold text-sm mb-1">Please fix the following errors:</p>
                  <ul className="list-disc list-inside text-xs space-y-0.5">
                    {validationErrors.map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {/* Section 1 — Calculation Setup */}
            <div className="border rounded-sm p-4 space-y-3 bg-muted/20">
              <p className="text-sm font-semibold text-foreground">Calculation Setup</p>

              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Calculation Method</Label>
                <Select value={formData.calculationMethod} onValueChange={(v) => set("calculationMethod", v)}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERCENT_LINEHAUL">Percentage of Linehaul</SelectItem>
                    <SelectItem value="PER_MILE">Per-Mile Rate</SelectItem>
                    <SelectItem value="FLAT_FEE">Flat Fee</SelectItem>
                    <SelectItem value="CUSTOMER_TABLE">Customer Table</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {!isFlat && (
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Index Source</Label>
                  <Select value={formData.indexSource} onValueChange={(v) => set("indexSource", v)}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DOE_NATIONAL">DOE National Average</SelectItem>
                      <SelectItem value="DOE_GULF_COAST">DOE Gulf Coast</SelectItem>
                      <SelectItem value="DOE_EAST_COAST">DOE East Coast</SelectItem>
                      <SelectItem value="OPIS">OPIS API</SelectItem>
                      <SelectItem value="CUSTOM">Custom Manual Entries</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Section 2 — Date & Frequency */}
            <div className="border rounded-sm p-4 space-y-3 bg-muted/20">
              <p className="text-sm font-semibold text-foreground">Date & Frequency</p>

              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Effective Start Date</Label>
                <Input type="date" value={formData.effectiveStartDate} onChange={(e) => set("effectiveStartDate", e.target.value)} className="w-full" />
              </div>

              {!isFlat && (
                <>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Update Frequency</Label>
                    <Select value={formData.updateFrequency} onValueChange={(v) => set("updateFrequency", v)}>
                      <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WEEKLY">Weekly</SelectItem>
                        <SelectItem value="MONTHLY">Monthly</SelectItem>
                        <SelectItem value="QUARTERLY">Quarterly</SelectItem>
                        <SelectItem value="CUSTOM">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Custom Frequency Rule - REQ.md Lines 84-85, V14 */}
                  {formData.updateFrequency === "CUSTOM" && (
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Custom Frequency Rule <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        value={formData.customFrequencyRule}
                        onChange={(e) => set("customFrequencyRule", e.target.value)}
                        placeholder="Example: Calculate FSC on the second-to-last Monday of each month using that day's DOE. Apply to all loads for the following month."
                        className="text-xs min-h-[80px]"
                      />
                      <p className="text-[10px] text-muted-foreground">
                        Must specify: (1) WHEN the FSC is calculated, (2) WHAT PERIOD it applies to, (3) WHAT INDEX VALUE is used
                      </p>
                    </div>
                  )}
                </>
              )}

              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Effective Date Logic</Label>
                <Select value={formData.effectiveDateLogic} onValueChange={(v) => set("effectiveDateLogic", v)}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PICKUP_DATE">Load Pickup Date</SelectItem>
                    <SelectItem value="INVOICE_DATE">Invoice Generation Date</SelectItem>
                    <SelectItem value="WEEK_OF_SERVICE">Monday of Service Week</SelectItem>
                    <SelectItem value="CUSTOMER_SPECIFIED">Customer Specified</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Customer Specified Date Rule - REQ.md Lines 86-87, V12 */}
              {formData.effectiveDateLogic === "CUSTOMER_SPECIFIED" && (
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">
                    Customer Specified Date Rule <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    value={formData.customerSpecifiedDateRule}
                    onChange={(e) => set("customerSpecifiedDateRule", e.target.value)}
                    placeholder="Describe the custom date logic for this customer..."
                    className="text-xs min-h-[60px]"
                  />
                </div>
              )}
            </div>

            {/* Section 3a — Formula Variables (Percentage / Per-Mile) */}
            {isFormula && (
              <div className="border rounded-sm p-4 space-y-3 bg-muted/20">
                <p className="text-sm font-semibold text-foreground">Formula Variables</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Base Price ($)</Label>
                    <Input type="number" step="0.01" value={formData.basePrice} onChange={(e) => set("basePrice", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Increment ($)</Label>
                    <Input type="number" step="0.01" value={formData.incrementPrice} onChange={(e) => set("incrementPrice", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Value per Inc</Label>
                    <Input type="number" step="0.001" value={formData.incrementValue} onChange={(e) => set("incrementValue", e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* Section 3b — Flat Fee */}
            {isFlatFee && (
              <div className="border rounded-sm p-4 space-y-3 bg-muted/20">
                <p className="text-sm font-semibold text-foreground">Flat Fee Parameters</p>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Flat Fee Type</Label>
                  <Select value={formData.flatFeeType} onValueChange={(v) => set("flatFeeType", v)}>
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
                  <Input type="number" step="0.01" value={formData.flatFeeAmount} onChange={(e) => set("flatFeeAmount", e.target.value)} className="w-full" />
                </div>
              </div>
            )}

            {/* Section 3c — Customer Table */}
            {isCustomerTable && (
              <div className="border rounded-sm p-4 space-y-3 bg-muted/20">
                <p className="text-sm font-semibold text-foreground">Custom Surcharge Table</p>

                <div
                  className="border-2 border-dashed border-border rounded-sm p-5 text-center cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={handleUploadMock}
                >
                  <UploadIcon className="h-5 w-5 text-muted-foreground mx-auto mb-1.5" />
                  <p className="text-sm font-medium text-foreground">Click to upload CSV / Excel</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Populates the grid below automatically</p>
                </div>

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
                          <Input value={row.from} onChange={(e) => updateRow(idx, "from", e.target.value)} type="number" step="0.01" className="h-7 text-sm" />
                        </div>
                        <div className="col-span-3">
                          <Input value={row.to} onChange={(e) => updateRow(idx, "to", e.target.value)} type="number" step="0.01" className="h-7 text-sm" />
                        </div>
                        <div className="col-span-3">
                          <Input value={row.value} onChange={(e) => updateRow(idx, "value", e.target.value)} type="number" step="0.01" className="h-7 text-sm" />
                        </div>
                        <div className="col-span-2">
                          <Select value={row.type} onValueChange={(v) => updateRow(idx, "type", v)}>
                            <SelectTrigger className="h-7 px-2 text-xs w-full"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PERCENTAGE">%</SelectItem>
                              <SelectItem value="DOLLAR">$</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-1 flex justify-center">
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-rose-500 hover:bg-rose-50"
                            onClick={() => setTableRows(tableRows.filter((_, i) => i !== idx))}>
                            <Trash2Icon className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t">
                    <Button variant="outline" size="sm" className="w-full text-xs"
                      onClick={() => setTableRows([...tableRows, { id: Date.now(), from: "", to: "", value: "", type: "PERCENTAGE" }])}>
                      <PlusIcon className="h-3.5 w-3.5 mr-1.5" /> Add Row
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Section 4 — Cap & Floor (Applies to ALL methods) - REQ.md Lines 87-90, 103, 239-246 */}
            <div className="border rounded-sm p-4 space-y-3 bg-muted/20">
              <p className="text-sm font-semibold text-foreground">Cap & Floor (Optional)</p>
              <p className="text-xs text-muted-foreground">
                Applied after FSC calculation. Cap and floor must be the same type (both % or both $).
              </p>

              <div className="grid grid-cols-2 gap-3">
                {/* Cap */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-semibold">Cap (Maximum FSC)</Label>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Cap Type</Label>
                    <Select value={formData.capType} onValueChange={(v) => set("capType", v)}>
                      <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NONE">None</SelectItem>
                        <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                        <SelectItem value="AMOUNT">Dollar Amount ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.capType !== "NONE" && (
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Cap Value {formData.capType === "PERCENTAGE" ? "(%)" : "($)"} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.capValue}
                        onChange={(e) => set("capValue", e.target.value)}
                        placeholder={formData.capType === "PERCENTAGE" ? "e.g., 20.00 for 20%" : "e.g., 200.00"}
                      />
                    </div>
                  )}
                </div>

                {/* Floor */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-semibold">Floor (Minimum FSC)</Label>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Floor Type</Label>
                    <Select value={formData.floorType} onValueChange={(v) => set("floorType", v)}>
                      <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NONE">None</SelectItem>
                        <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                        <SelectItem value="AMOUNT">Dollar Amount ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.floorType !== "NONE" && (
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Floor Value {formData.floorType === "PERCENTAGE" ? "(%)" : "($)"} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.floorValue}
                        onChange={(e) => set("floorValue", e.target.value)}
                        placeholder={formData.floorType === "PERCENTAGE" ? "e.g., 3.00 for 3%" : "e.g., 50.00"}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 5 — Sanity Threshold & Approval - REQ.md Lines 92-99 */}
            <div className="border rounded-sm p-4 space-y-3 bg-muted/20">
              <p className="text-sm font-semibold text-foreground">Additional Settings</p>

              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Sanity Threshold (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.sanityThreshold}
                  onChange={(e) => set("sanityThreshold", e.target.value)}
                  placeholder="50.00"
                />
                <p className="text-[10px] text-muted-foreground">
                  If FSC exceeds this % of linehaul, hold for manual review (default: 50%)
                </p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Approval Reference</Label>
                <Input
                  type="text"
                  value={formData.approvalReference}
                  onChange={(e) => set("approvalReference", e.target.value)}
                  placeholder="Customer email/document reference"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Notes</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Reason for changes, special instructions, etc."
                  className="text-xs min-h-[60px]"
                />
              </div>
            </div>

          </div>
        </ScrollArea>

        {/* Sticky Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t bg-background flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="gap-1.5">
            <XIcon className="h-4 w-4" /> Cancel
          </Button>
          <Button onClick={handleSave} className="gap-1.5">
            <SaveIcon className="h-4 w-4" /> Queue for Approval
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default FSCFileSheet;
