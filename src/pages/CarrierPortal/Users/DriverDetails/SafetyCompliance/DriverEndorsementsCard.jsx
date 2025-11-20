import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FaIdBadge, FaEdit, FaPlus } from "react-icons/fa";
import { MultiSelect } from "@/components/ui/multi-select";

const DriverEndorsementsCard = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [hasData, setHasData] = useState(true);
  const [data, setData] = useState({
    endorsements: ["Hazmat", "Tank"],
    issuedDate: "2023-01-15",
    expirationDate: "2026-01-15",
  });

  const endorsementOptions = [
    { value: "Double", label: "Double" },
    { value: "Triple", label: "Triple" },
    { value: "Hazmat", label: "Hazmat" },
    { value: "Tank", label: "Tank" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setData({
      endorsements: formData.getAll("endorsements"),
      issuedDate: formData.get("issuedDate"),
      expirationDate: formData.get("expirationDate"),
    });
    setHasData(true);
    setIsSheetOpen(false);
  };

  return (
    <>
      <div className="border rounded-sm bg-card h-fit">
        <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FaIdBadge className="size-4" />
            Driver Endorsements
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
              <p className="text-xs text-muted-foreground mb-0.5">Endorsement(s)</p>
              <p className="text-sm font-medium text-foreground">
                {data.endorsements.join(", ")}
              </p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-border">
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Issued Date</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(data.issuedDate).toLocaleDateString()}
                </p>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Expiration Date</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(data.expirationDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-4 py-6 flex flex-col items-center justify-center text-center flex-1">
            <p className="text-sm text-muted-foreground mb-3">
              No driver endorsements added yet
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
              {hasData ? "Edit Driver Endorsements" : "Add Driver Endorsements"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4 px-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Select Endorsement(s) <span className="text-red-500">*</span>
              </Label>
              <MultiSelect
                options={endorsementOptions}
                defaultValue={data.endorsements}
                placeholder="Select endorsements"
                name="endorsements"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Issued Date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                name="issuedDate"
                className="h-10"
                defaultValue={data.issuedDate}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Expiration Date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                name="expirationDate"
                className="h-10"
                defaultValue={data.expirationDate}
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

export default DriverEndorsementsCard;
