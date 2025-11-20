import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FaBook, FaEdit, FaPlus } from "react-icons/fa";

const LogbookManagementCard = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [hasData, setHasData] = useState(true);
  const [data, setData] = useState({
    logbookProvider: "Samsara",
    violationsStartDate: "2024-01-01",
    violationsEndDate: "2024-12-31",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setData({
      logbookProvider: formData.get("logbookProvider"),
      violationsStartDate: formData.get("violationsStartDate"),
      violationsEndDate: formData.get("violationsEndDate"),
    });
    setHasData(true);
    setIsSheetOpen(false);
  };

  return (
    <>
      <div className="border rounded-sm bg-card h-fit">
        <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FaBook className="size-4" />
            Logbook Management
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
              <p className="text-xs text-muted-foreground mb-0.5">Logbook Provider</p>
              <p className="text-sm font-medium text-foreground">{data.logbookProvider}</p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-border">
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Violations Start Date</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(data.violationsStartDate).toLocaleDateString()}
                </p>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Violations End Date</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(data.violationsEndDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-4 py-6 flex flex-col items-center justify-center text-center flex-1">
            <p className="text-sm text-muted-foreground mb-3">
              No logbook management information added yet
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
              {hasData ? "Edit Logbook Management" : "Add Logbook Management"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4 px-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Logbook Provider <span className="text-red-500">*</span>
              </Label>
              <Select name="logbookProvider" defaultValue={data.logbookProvider} required>
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select logbook provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Samsara">Samsara</SelectItem>
                  <SelectItem value="Motive">Motive</SelectItem>
                  <SelectItem value="Verizon Connect">Verizon Connect</SelectItem>
                  <SelectItem value="Lytx">Lytx</SelectItem>
                  <SelectItem value="OnFleet">OnFleet</SelectItem>
                  <SelectItem value="Geotab">Geotab</SelectItem>
                  <SelectItem value="Omnitracs">Omnitracs</SelectItem>
                  <SelectItem value="Reddit">Reddit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Logbook Violations Start Date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                name="violationsStartDate"
                className="h-10"
                defaultValue={data.violationsStartDate}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Logbook Violations End Date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                name="violationsEndDate"
                className="h-10"
                defaultValue={data.violationsEndDate}
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

export default LogbookManagementCard;
