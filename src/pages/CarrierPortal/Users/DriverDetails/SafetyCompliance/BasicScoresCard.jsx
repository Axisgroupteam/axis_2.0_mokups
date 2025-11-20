import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FaChartBar, FaEdit, FaPlus } from "react-icons/fa";

const BasicScoresCard = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [hasData, setHasData] = useState(true);
  const [data, setData] = useState({
    unsafe: "10",
    fatigued: "5",
    controlledSubstance: "0",
    fitness: "3",
    vehicle: "7",
    cargo: "2",
    crash: "1",
    reportDate: "2024-01-20",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setData({
      unsafe: formData.get("unsafe"),
      fatigued: formData.get("fatigued"),
      controlledSubstance: formData.get("controlledSubstance"),
      fitness: formData.get("fitness"),
      vehicle: formData.get("vehicle"),
      cargo: formData.get("cargo"),
      crash: formData.get("crash"),
      reportDate: formData.get("reportDate"),
    });
    setHasData(true);
    setIsSheetOpen(false);
  };

  return (
    <>
      <div className="border rounded-sm bg-card h-fit">
        <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FaChartBar className="size-4" />
            Basic Scores and Report Date
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
            <div className="grid grid-cols-4 divide-x divide-border">
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Unsafe</p>
                <p className="text-sm font-medium text-foreground">{data.unsafe}</p>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Fatigued</p>
                <p className="text-sm font-medium text-foreground">{data.fatigued}</p>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Controlled Substance</p>
                <p className="text-sm font-medium text-foreground">{data.controlledSubstance}</p>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Fitness</p>
                <p className="text-sm font-medium text-foreground">{data.fitness}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 divide-x divide-border">
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Vehicle</p>
                <p className="text-sm font-medium text-foreground">{data.vehicle}</p>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Cargo</p>
                <p className="text-sm font-medium text-foreground">{data.cargo}</p>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Crash</p>
                <p className="text-sm font-medium text-foreground">{data.crash}</p>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Report Date</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(data.reportDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-4 py-6 flex flex-col items-center justify-center text-center flex-1">
            <p className="text-sm text-muted-foreground mb-3">
              No basic scores information added yet
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
              {hasData ? "Edit Basic Scores" : "Add Basic Scores"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4 px-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Unsafe <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                name="unsafe"
                placeholder="Enter unsafe points"
                className="h-10"
                defaultValue={data.unsafe}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Fatigued <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                name="fatigued"
                placeholder="Enter fatigued points"
                className="h-10"
                defaultValue={data.fatigued}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Controlled Substance <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                name="controlledSubstance"
                placeholder="Enter controlled substance points"
                className="h-10"
                defaultValue={data.controlledSubstance}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Fitness <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                name="fitness"
                placeholder="Enter fitness points"
                className="h-10"
                defaultValue={data.fitness}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Vehicle <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                name="vehicle"
                placeholder="Enter vehicle points"
                className="h-10"
                defaultValue={data.vehicle}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Cargo <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                name="cargo"
                placeholder="Enter cargo points"
                className="h-10"
                defaultValue={data.cargo}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Crash <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                name="crash"
                placeholder="Enter crash points"
                className="h-10"
                defaultValue={data.crash}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Report Date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                name="reportDate"
                className="h-10"
                defaultValue={data.reportDate}
                required
              />
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

export default BasicScoresCard;
