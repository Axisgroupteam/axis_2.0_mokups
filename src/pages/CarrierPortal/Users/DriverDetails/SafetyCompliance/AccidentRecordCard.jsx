import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaCarCrash, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const AccidentRecordCard = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const [accidentRecords, setAccidentRecords] = useState([
    {
      id: 1,
      location: "I-10, Los Angeles, CA",
      date: "2024-01-15",
      time: "14:30",
      preventability: "Preventable",
      weatherConditions: "Clear",
      description: "Minor rear-end collision at traffic stop",
      claimRequested: "Yes",
      claimAmount: "$5,000",
      claimNumber: "CLM-2024-001",
      claimDate: "2024-01-16",
      claimAdjustor: "John Smith",
      pictures: "accident_001.jpg",
    },
  ]);

  const handleAddRecord = () => {
    setEditingRecord(null);
    setIsSheetOpen(true);
  };

  const handleEditRecord = (record) => {
    setEditingRecord(record);
    setIsSheetOpen(true);
  };

  const handleDeleteRecord = (id) => {
    setAccidentRecords(accidentRecords.filter((record) => record.id !== id));
  };

  const handleSubmitRecord = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const recordData = {
      id: editingRecord ? editingRecord.id : Date.now(),
      location: formData.get("location"),
      date: formData.get("date"),
      time: formData.get("time"),
      preventability: formData.get("preventability"),
      weatherConditions: formData.get("weatherConditions"),
      description: formData.get("description"),
      claimRequested: formData.get("claimRequested"),
      claimAmount: formData.get("claimAmount"),
      claimNumber: formData.get("claimNumber"),
      claimDate: formData.get("claimDate"),
      claimAdjustor: formData.get("claimAdjustor"),
      pictures: formData.get("pictures")?.name || editingRecord?.pictures || "",
    };

    if (editingRecord) {
      setAccidentRecords(accidentRecords.map((record) =>
        record.id === editingRecord.id ? recordData : record
      ));
    } else {
      setAccidentRecords([...accidentRecords, recordData]);
    }

    setIsSheetOpen(false);
    setEditingRecord(null);
  };

  return (
    <>
      <div className="border rounded-sm bg-card">
        <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FaCarCrash className="size-4" />
            Accident Record
          </h3>
          <Button
            size="sm"
            onClick={handleAddRecord}
            className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
          >
            <FaPlus className="size-3" />
            Add Accident Record
          </Button>
        </div>
        <div className="p-4">
          {accidentRecords.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs font-semibold border-r h-9 py-2">Location</TableHead>
                    <TableHead className="text-xs font-semibold border-r h-9 py-2">Date</TableHead>
                    <TableHead className="text-xs font-semibold border-r h-9 py-2">Time</TableHead>
                    <TableHead className="text-xs font-semibold border-r h-9 py-2">Preventability</TableHead>
                    <TableHead className="text-xs font-semibold border-r h-9 py-2">Weather</TableHead>
                    <TableHead className="text-xs font-semibold border-r h-9 py-2">Description</TableHead>
                    <TableHead className="text-xs font-semibold border-r h-9 py-2">Claim Requested</TableHead>
                    <TableHead className="text-xs font-semibold border-r h-9 py-2">Claim Amount</TableHead>
                    <TableHead className="text-xs font-semibold border-r h-9 py-2">Claim Number</TableHead>
                    <TableHead className="text-xs font-semibold border-r h-9 py-2">Claim Date</TableHead>
                    <TableHead className="text-xs font-semibold border-r h-9 py-2">Claim Adjustor</TableHead>
                    <TableHead className="text-xs font-semibold border-r h-9 py-2">Pictures</TableHead>
                    <TableHead className="text-xs font-semibold text-right h-9 py-2">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accidentRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="text-xs border-r py-2.5">{record.location}</TableCell>
                      <TableCell className="text-xs border-r py-2.5">
                        {new Date(record.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-xs border-r py-2.5">{record.time}</TableCell>
                      <TableCell className="text-xs border-r py-2.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            record.preventability === "Preventable"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          }`}
                        >
                          {record.preventability}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs border-r py-2.5">{record.weatherConditions}</TableCell>
                      <TableCell className="text-xs border-r py-2.5 max-w-xs truncate">{record.description}</TableCell>
                      <TableCell className="text-xs border-r py-2.5">{record.claimRequested}</TableCell>
                      <TableCell className="text-xs border-r py-2.5">{record.claimAmount}</TableCell>
                      <TableCell className="text-xs border-r py-2.5">{record.claimNumber}</TableCell>
                      <TableCell className="text-xs border-r py-2.5">
                        {new Date(record.claimDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-xs border-r py-2.5">{record.claimAdjustor}</TableCell>
                      <TableCell className="text-xs border-r py-2.5">{record.pictures}</TableCell>
                      <TableCell className="text-right py-2.5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditRecord(record)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <FaEdit className="size-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteRecord(record.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <FaTrash className="size-3.5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No accident records added yet
            </p>
          )}
        </div>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-lg font-bold text-foreground">
              {editingRecord ? "Edit Accident Record" : "Add Accident Record"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmitRecord} className="space-y-4 mt-4 px-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Location <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="location"
                placeholder="Enter location"
                className="h-10"
                defaultValue={editingRecord?.location}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                name="date"
                className="h-10"
                defaultValue={editingRecord?.date}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Time <span className="text-red-500">*</span>
              </Label>
              <Input
                type="time"
                name="time"
                className="h-10"
                defaultValue={editingRecord?.time}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Preventability <span className="text-red-500">*</span>
              </Label>
              <Select name="preventability" defaultValue={editingRecord?.preventability} required>
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select preventability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Preventable">Preventable</SelectItem>
                  <SelectItem value="Non Preventable">Non Preventable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Weather Conditions <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="weatherConditions"
                placeholder="Enter weather conditions"
                className="h-10"
                defaultValue={editingRecord?.weatherConditions}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                name="description"
                placeholder="Enter description"
                className="min-h-20"
                defaultValue={editingRecord?.description}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Claim Requested <span className="text-red-500">*</span>
              </Label>
              <Select name="claimRequested" defaultValue={editingRecord?.claimRequested} required>
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select claim requested" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Claim Amount <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="claimAmount"
                placeholder="Enter claim amount"
                className="h-10"
                defaultValue={editingRecord?.claimAmount}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Claim Number <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="claimNumber"
                placeholder="Enter claim number"
                className="h-10"
                defaultValue={editingRecord?.claimNumber}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Claim Date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                name="claimDate"
                className="h-10"
                defaultValue={editingRecord?.claimDate}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Claim Adjustor <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="claimAdjustor"
                placeholder="Enter claim adjustor"
                className="h-10"
                defaultValue={editingRecord?.claimAdjustor}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Upload Pictures
              </Label>
              <Input
                type="file"
                name="pictures"
                className="h-10"
                accept="image/*"
                multiple
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
                {editingRecord ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AccidentRecordCard;
