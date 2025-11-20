import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import DriverAssignmentsCard from "./DriverAssignmentsCard";
import AvailabilityCard from "./AvailabilityCard";
import HomeInformationCard from "./HomeInformationCard";

const OperationTab = () => {
  const [isDriverAssignmentSheetOpen, setIsDriverAssignmentSheetOpen] = useState(false);
  const [isAvailabilitySheetOpen, setIsAvailabilitySheetOpen] = useState(false);
  const [isHomeInfoSheetOpen, setIsHomeInfoSheetOpen] = useState(false);

  const [hasDriverAssignment, setHasDriverAssignment] = useState(true);
  const [hasAvailability, setHasAvailability] = useState(true);
  const [hasHomeInfo, setHasHomeInfo] = useState(true);

  // Mock data
  const [driverAssignmentData, setDriverAssignmentData] = useState({
    driverManager: "Sarah Johnson",
    fleet: "Fleet A - West Coast",
  });

  const [availabilityData, setAvailabilityData] = useState({
    driveTimeAvailable: "45.5",
    onDutyTimeAvailable: "12.3",
    asOfDate: "2024-01-20",
    dutyStatus: "On Duty",
  });

  const [homeInfoData, setHomeInfoData] = useState({
    homeTerminal: "Los Angeles Terminal",
    returnHome: "2024-01-25",
  });

  const handleDriverAssignmentSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setDriverAssignmentData({
      driverManager: formData.get("driverManager"),
      fleet: formData.get("fleet"),
    });
    setHasDriverAssignment(true);
    setIsDriverAssignmentSheetOpen(false);
  };

  const handleAvailabilitySubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setAvailabilityData({
      driveTimeAvailable: formData.get("driveTimeAvailable"),
      onDutyTimeAvailable: formData.get("onDutyTimeAvailable"),
      asOfDate: formData.get("asOfDate"),
      dutyStatus: formData.get("dutyStatus"),
    });
    setHasAvailability(true);
    setIsAvailabilitySheetOpen(false);
  };

  const handleHomeInfoSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setHomeInfoData({
      homeTerminal: formData.get("homeTerminal"),
      returnHome: formData.get("returnHome"),
    });
    setHasHomeInfo(true);
    setIsHomeInfoSheetOpen(false);
  };

  return (
    <>
      <div className="flex gap-4 h-fit px-0.5">
        {/* Left Column */}
        <div className="w-1/2 flex flex-col gap-4">
          <DriverAssignmentsCard
            hasData={hasDriverAssignment}
            data={driverAssignmentData}
            onEdit={() => setIsDriverAssignmentSheetOpen(true)}
            onAdd={() => setIsDriverAssignmentSheetOpen(true)}
          />
          <HomeInformationCard
            hasData={hasHomeInfo}
            data={homeInfoData}
            onEdit={() => setIsHomeInfoSheetOpen(true)}
            onAdd={() => setIsHomeInfoSheetOpen(true)}
          />
        </div>

        {/* Right Column */}
        <div className="w-1/2 flex flex-col gap-4">
          <AvailabilityCard
            hasData={hasAvailability}
            data={availabilityData}
            onEdit={() => setIsAvailabilitySheetOpen(true)}
            onAdd={() => setIsAvailabilitySheetOpen(true)}
          />
        </div>
      </div>

      {/* Driver Assignment Sheet */}
      <Sheet
        open={isDriverAssignmentSheetOpen}
        onOpenChange={setIsDriverAssignmentSheetOpen}
      >
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-lg font-bold text-foreground">
              {hasDriverAssignment ? "Edit Driver Assignments" : "Add Driver Assignments"}
            </SheetTitle>
          </SheetHeader>

          <form
            onSubmit={handleDriverAssignmentSubmit}
            className="space-y-4 mt-4 px-6"
          >
            {/* Driver Manager */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Driver Manager <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="driverManager"
                placeholder="Enter driver manager name"
                className="h-10"
                defaultValue={driverAssignmentData.driverManager}
                required
              />
            </div>

            {/* Fleet */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Fleet <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="fleet"
                placeholder="Enter fleet"
                className="h-10"
                defaultValue={driverAssignmentData.fleet}
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDriverAssignmentSheetOpen(false)}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {hasDriverAssignment ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Availability Sheet */}
      <Sheet
        open={isAvailabilitySheetOpen}
        onOpenChange={setIsAvailabilitySheetOpen}
      >
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-lg font-bold text-foreground">
              {hasAvailability ? "Edit Availability" : "Add Availability"}
            </SheetTitle>
          </SheetHeader>

          <form
            onSubmit={handleAvailabilitySubmit}
            className="space-y-4 mt-4 px-6"
          >
            {/* Drive Time Available */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Drive time available (hours) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                step="0.1"
                name="driveTimeAvailable"
                placeholder="Enter drive time available"
                className="h-10"
                defaultValue={availabilityData.driveTimeAvailable}
                required
              />
            </div>

            {/* On Duty Time Available */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                On duty time available (hours) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                step="0.1"
                name="onDutyTimeAvailable"
                placeholder="Enter on duty time available"
                className="h-10"
                defaultValue={availabilityData.onDutyTimeAvailable}
                required
              />
            </div>

            {/* As of Date */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                As of date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                name="asOfDate"
                className="h-10"
                defaultValue={availabilityData.asOfDate}
                required
              />
            </div>

            {/* Duty Status */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Duty status <span className="text-red-500">*</span>
              </Label>
              <Select name="dutyStatus" defaultValue={availabilityData.dutyStatus} required>
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select duty status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Off Duty">Off Duty</SelectItem>
                  <SelectItem value="On Duty">On Duty</SelectItem>
                  <SelectItem value="Driving">Driving</SelectItem>
                  <SelectItem value="Sleeper Berth">Sleeper Berth</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAvailabilitySheetOpen(false)}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {hasAvailability ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Home Information Sheet */}
      <Sheet
        open={isHomeInfoSheetOpen}
        onOpenChange={setIsHomeInfoSheetOpen}
      >
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-lg font-bold text-foreground">
              {hasHomeInfo ? "Edit Home Information" : "Add Home Information"}
            </SheetTitle>
          </SheetHeader>

          <form
            onSubmit={handleHomeInfoSubmit}
            className="space-y-4 mt-4 px-6"
          >
            {/* Home Terminal */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Home terminal <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="homeTerminal"
                placeholder="Enter home terminal"
                className="h-10"
                defaultValue={homeInfoData.homeTerminal}
                required
              />
            </div>

            {/* Return Home */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Return Home <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                name="returnHome"
                className="h-10"
                defaultValue={homeInfoData.returnHome}
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsHomeInfoSheetOpen(false)}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {hasHomeInfo ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default OperationTab;
