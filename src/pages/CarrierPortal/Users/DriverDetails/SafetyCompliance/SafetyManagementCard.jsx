import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FaShieldAlt, FaEdit, FaPlus } from "react-icons/fa";

const SafetyManagementCard = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [hasData, setHasData] = useState(true);
  const [data, setData] = useState({
    safetyRegion: "West Coast",
    safetyManager: "Sarah Johnson",
    safetySupervisor: "Mike Davis",
    driverCurrentCSAPoints: "15",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setData({
      safetyRegion: formData.get("safetyRegion"),
      safetyManager: formData.get("safetyManager"),
      safetySupervisor: formData.get("safetySupervisor"),
      driverCurrentCSAPoints: formData.get("driverCurrentCSAPoints"),
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
            Safety Management
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
                <p className="text-xs text-muted-foreground mb-0.5">Safety Region</p>
                <p className="text-sm font-medium text-foreground">{data.safetyRegion}</p>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Safety Manager</p>
                <p className="text-sm font-medium text-foreground">{data.safetyManager}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-border">
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Safety Supervisor</p>
                <p className="text-sm font-medium text-foreground">{data.safetySupervisor}</p>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Driver Current CSA Points</p>
                <p className="text-sm font-medium text-foreground">{data.driverCurrentCSAPoints}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-4 py-6 flex flex-col items-center justify-center text-center flex-1">
            <p className="text-sm text-muted-foreground mb-3">
              No safety management information added yet
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
              {hasData ? "Edit Safety Management" : "Add Safety Management"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4 px-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Safety Region <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="safetyRegion"
                placeholder="Enter safety region"
                className="h-10"
                defaultValue={data.safetyRegion}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Safety Manager <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="safetyManager"
                placeholder="Enter safety manager"
                className="h-10"
                defaultValue={data.safetyManager}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Safety Supervisor <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="safetySupervisor"
                placeholder="Enter safety supervisor"
                className="h-10"
                defaultValue={data.safetySupervisor}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Driver Current CSA Points <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                name="driverCurrentCSAPoints"
                placeholder="Enter CSA points"
                className="h-10"
                defaultValue={data.driverCurrentCSAPoints}
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

export default SafetyManagementCard;
