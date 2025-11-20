import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FaShieldAlt, FaEdit, FaPlus } from "react-icons/fa";

const InsuranceCard = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [hasData, setHasData] = useState(true);
  const [data, setData] = useState({
    insuranceCompany: "Progressive Commercial",
    insurancePolicy: "PC-123456789",
    policyTerminationDate: "2025-12-31",
    companyRating: "A+",
    coverageLimits: "Auto Liability",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setData({
      insuranceCompany: formData.get("insuranceCompany"),
      insurancePolicy: formData.get("insurancePolicy"),
      policyTerminationDate: formData.get("policyTerminationDate"),
      companyRating: formData.get("companyRating"),
      coverageLimits: formData.get("coverageLimits"),
    });
    setHasData(true);
    setIsSheetOpen(false);
  };

  return (
    <>
      <div className="border rounded-sm bg-card h-fit">
        <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FaShieldAlt className="size-4" />
            Insurance
          </h3>
          {hasData && (
            <button
              onClick={() => setIsSheetOpen(true)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaEdit className="size-3.5" />
            </button>
          )}
        </div>
        {hasData ? (
          <div className="divide-y divide-border">
            <div className="grid grid-cols-2 divide-x divide-border">
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Insurance Company</p>
                <p className="text-sm font-medium text-foreground">{data.insuranceCompany}</p>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Insurance Policy #</p>
                <p className="text-sm font-medium text-foreground">{data.insurancePolicy}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-border">
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Policy Termination Date</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(data.policyTerminationDate).toLocaleDateString()}
                </p>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Insurance Company Rating</p>
                <p className="text-sm font-medium text-foreground">{data.companyRating}</p>
              </div>
            </div>
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">Insurance Coverage Limits</p>
              <p className="text-sm font-medium text-foreground">{data.coverageLimits}</p>
            </div>
          </div>
        ) : (
          <div className="px-4 py-6 flex flex-col items-center justify-center text-center flex-1">
            <p className="text-sm text-muted-foreground mb-3">
              No insurance information added yet
            </p>
            <Button
              size="sm"
              onClick={() => setIsSheetOpen(true)}
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              <FaPlus className="size-3 mr-2" />
              Add Information
            </Button>
          </div>
        )}
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-lg font-bold text-foreground">
              {hasData ? "Edit Insurance" : "Add Insurance"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4 px-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Insurance Company <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="insuranceCompany"
                placeholder="Enter insurance company"
                className="h-10"
                defaultValue={data.insuranceCompany}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Insurance Policy # <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="insurancePolicy"
                placeholder="Enter insurance policy number"
                className="h-10"
                defaultValue={data.insurancePolicy}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Insurance Policy Termination Date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                name="policyTerminationDate"
                className="h-10"
                defaultValue={data.policyTerminationDate}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Insurance Company Rating <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="companyRating"
                placeholder="Enter company rating"
                className="h-10"
                defaultValue={data.companyRating}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Insurance Coverage Limits <span className="text-red-500">*</span>
              </Label>
              <Select name="coverageLimits" defaultValue={data.coverageLimits} required>
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select coverage limits" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Auto Liability">Auto Liability</SelectItem>
                  <SelectItem value="General Liability">General Liability</SelectItem>
                  <SelectItem value="Cargo">Cargo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSheetOpen(false)}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {hasData ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default InsuranceCard;
