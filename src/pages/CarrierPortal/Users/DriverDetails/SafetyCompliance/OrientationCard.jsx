import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FaCalendarCheck, FaEdit, FaPlus } from "react-icons/fa";

const OrientationCard = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [hasData, setHasData] = useState(true);
  const [data, setData] = useState({
    orientationDate: "2023-12-15",
    orientationHost: "Sarah Johnson",
    orientationLocation: "Los Angeles Office",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setData({
      orientationDate: formData.get("orientationDate"),
      orientationHost: formData.get("orientationHost"),
      orientationLocation: formData.get("orientationLocation"),
    });
    setHasData(true);
    setIsSheetOpen(false);
  };

  return (
    <>
      <div className="border rounded-sm bg-card h-fit">
        <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FaCalendarCheck className="size-4" />
            Orientation
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
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">Orientation Date</p>
              <p className="text-sm font-medium text-foreground">
                {new Date(data.orientationDate).toLocaleDateString()}
              </p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-border">
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Orientation Host</p>
                <p className="text-sm font-medium text-foreground">{data.orientationHost}</p>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Orientation Location</p>
                <p className="text-sm font-medium text-foreground">{data.orientationLocation}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-4 py-6 flex flex-col items-center justify-center text-center flex-1">
            <p className="text-sm text-muted-foreground mb-3">
              No orientation information added yet
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
              {hasData ? "Edit Orientation" : "Add Orientation"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4 px-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Orientation Date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                name="orientationDate"
                className="h-10"
                defaultValue={data.orientationDate}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Orientation Host <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="orientationHost"
                placeholder="Enter orientation host"
                className="h-10"
                defaultValue={data.orientationHost}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Orientation Location <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="orientationLocation"
                placeholder="Enter orientation location"
                className="h-10"
                defaultValue={data.orientationLocation}
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

export default OrientationCard;
