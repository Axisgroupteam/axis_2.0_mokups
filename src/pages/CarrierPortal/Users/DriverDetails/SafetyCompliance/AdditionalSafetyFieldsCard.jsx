import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FaClipboard, FaEdit, FaPlus } from "react-icons/fa";

const AdditionalSafetyFieldsCard = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [hasData, setHasData] = useState(true);
  const [data, setData] = useState({
    previousJobType: "Long Haul Driver",
    experience: "5 years",
    roadTestEvaluation: "Passed with excellent marks",
    safetyMeetingAttendance: "100%",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setData({
      previousJobType: formData.get("previousJobType"),
      experience: formData.get("experience"),
      roadTestEvaluation: formData.get("roadTestEvaluation"),
      safetyMeetingAttendance: formData.get("safetyMeetingAttendance"),
    });
    setHasData(true);
    setIsSheetOpen(false);
  };

  return (
    <>
      <div className="border rounded-sm bg-card h-fit">
        <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FaClipboard className="size-4" />
            Additional Safety Fields
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
                <p className="text-xs text-muted-foreground mb-0.5">Previous Job Type</p>
                <p className="text-sm font-medium text-foreground">{data.previousJobType}</p>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Experience</p>
                <p className="text-sm font-medium text-foreground">{data.experience}</p>
              </div>
            </div>
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">Road Test Evaluation</p>
              <p className="text-sm font-medium text-foreground">{data.roadTestEvaluation}</p>
            </div>
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">Safety Meeting Attendance</p>
              <p className="text-sm font-medium text-foreground">{data.safetyMeetingAttendance}</p>
            </div>
          </div>
        ) : (
          <div className="px-4 py-6 flex flex-col items-center justify-center text-center flex-1">
            <p className="text-sm text-muted-foreground mb-3">
              No additional safety fields added yet
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
              {hasData ? "Edit Additional Safety Fields" : "Add Additional Safety Fields"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4 px-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Previous Job Type <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="previousJobType"
                placeholder="Enter previous job type"
                className="h-10"
                defaultValue={data.previousJobType}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Experience <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="experience"
                placeholder="Enter experience"
                className="h-10"
                defaultValue={data.experience}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Road Test Evaluation <span className="text-red-500">*</span>
              </Label>
              <Textarea
                name="roadTestEvaluation"
                placeholder="Enter road test evaluation"
                className="min-h-20"
                defaultValue={data.roadTestEvaluation}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Safety Meeting Attendance <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="safetyMeetingAttendance"
                placeholder="Enter safety meeting attendance"
                className="h-10"
                defaultValue={data.safetyMeetingAttendance}
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

export default AdditionalSafetyFieldsCard;
