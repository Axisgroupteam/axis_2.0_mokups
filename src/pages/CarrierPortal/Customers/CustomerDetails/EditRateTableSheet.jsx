import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { PlusIcon, TrashIcon } from "lucide-react";

// All available commodities
const allCommoditiesList = [
  "All",
  "Commercial 89 Stone",
  "COMMERCIAL Screenings /131",
  "Bahama 57",
  "1/4\" Rock",
  "15cr Graded Aggr Base",
  "Dot Sand",
  "DOT 67 ROCK",
  "STALITE AD BLK UNLD FINES D",
  "Trailers",
  "BANK RUN SHELL",
  "recycled base rock",
  "DOT 57 Stone",
  "DOT 89 Stone",
  "7 Stone",
  "Screenings Granite",
  "67 STONE",
  "10SM MFG SAND",
  "GU",
  "Slag",
  "Sand 40-140",
  "Masonry",
  "Cement",
  "Glass 40-140",
  "1/2",
  "IT",
  "Type 3",
  "Dumb",
  "1L",
  "FlatB",
  "Gravel",
  "Limestone",
  "Asphalt",
  "Concrete",
  "Crusite",
  "Flyash",
  "Portland",
  "Ready Mix",
];

const EditRateTableSheet = ({ open, onOpenChange, rateTable, onSave, allRateTables = [] }) => {
  const [editForm, setEditForm] = useState({
    tableName: "",
    importFile: null,
    rows: [],
    selectedCommodities: [],
  });

  // Initialize edit form when sheet opens
  useEffect(() => {
    if (open && rateTable) {
      setEditForm({
        tableName: rateTable.tableName,
        importFile: null,
        rows: rateTable.rows.map((row) => ({
          id: row.id,
          min: row.min,
          max: row.max,
          customerRate: row.customerRate,
          driverRate: row.driverRate,
        })),
        selectedCommodities: [...rateTable.commodities],
      });
    }
  }, [open, rateTable]);

  // Get commodities used by OTHER rate tables (not the current one being edited)
  const commoditiesUsedByOtherTables = allRateTables
    .filter((table) => table.tableName !== rateTable?.tableName)
    .flatMap((table) => table.commodities);

  // Available commodities = current table's commodities + unassigned commodities
  const availableCommodities = allCommoditiesList.filter(
    (commodity) =>
      rateTable?.commodities?.includes(commodity) ||
      !commoditiesUsedByOtherTables.includes(commodity)
  );

  const handleAddRow = () => {
    setEditForm((prev) => ({
      ...prev,
      rows: [
        ...prev.rows,
        {
          id: prev.rows.length + 1,
          min: 0,
          max: 1,
          customerRate: 0,
          driverRate: 0,
        },
      ],
    }));
  };

  const handleRemoveRow = (rowId) => {
    if (editForm.rows.length > 1) {
      setEditForm((prev) => ({
        ...prev,
        rows: prev.rows.filter((row) => row.id !== rowId),
      }));
    }
  };

  const handleRowChange = (rowId, field, value) => {
    setEditForm((prev) => ({
      ...prev,
      rows: prev.rows.map((row) =>
        row.id === rowId ? { ...row, [field]: parseFloat(value) || 0 } : row
      ),
    }));
  };

  const handleCommodityChange = (commodity, checked) => {
    setEditForm((prev) => ({
      ...prev,
      selectedCommodities: checked
        ? [...prev.selectedCommodities, commodity]
        : prev.selectedCommodities.filter((c) => c !== commodity),
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(editForm);
    }
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="pb-4 border-b px-6">
          <SheetTitle className="text-xl font-bold text-foreground">
            Edit Rate Table
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-4 px-6">
          {/* Table Name and Import Table */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Table Name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Enter Table Name"
                value={editForm.tableName}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    tableName: e.target.value,
                  }))
                }
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Import Table
              </Label>
              <Input
                type="file"
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    importFile: e.target.files[0],
                  }))
                }
                className="h-10"
              />
            </div>
          </div>

          {/* Rate Rows */}
          <div className="space-y-3">
            {/* Header */}
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr_40px] gap-2">
              <Label className="text-sm font-medium text-foreground">Min</Label>
              <Label className="text-sm font-medium text-foreground">Max</Label>
              <Label className="text-sm font-medium text-foreground">Customer Rate</Label>
              <Label className="text-sm font-medium text-foreground">Driver Rate</Label>
              <div></div>
            </div>

            {/* Rows */}
            {editForm.rows.map((row) => (
              <div key={row.id} className="grid grid-cols-[1fr_1fr_1fr_1fr_40px] gap-2">
                <Input
                  type="number"
                  value={row.min}
                  onChange={(e) =>
                    handleRowChange(row.id, "min", e.target.value)
                  }
                  className="h-10"
                />
                <Input
                  type="number"
                  value={row.max}
                  onChange={(e) =>
                    handleRowChange(row.id, "max", e.target.value)
                  }
                  className="h-10"
                />
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    value={row.customerRate}
                    onChange={(e) =>
                      handleRowChange(row.id, "customerRate", e.target.value)
                    }
                    className="h-10 pl-7"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    value={row.driverRate}
                    onChange={(e) =>
                      handleRowChange(row.id, "driverRate", e.target.value)
                    }
                    className="h-10 pl-7"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveRow(row.id)}
                  disabled={editForm.rows.length === 1}
                  className="h-10 w-10"
                >
                  <TrashIcon className="size-4 text-muted-foreground" />
                </Button>
              </div>
            ))}

            {/* Add Table Row Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleAddRow}
              className="w-full h-10 border-dashed border-2 text-muted-foreground hover:text-foreground"
            >
              <PlusIcon className="size-4 mr-2" />
              Table Row
            </Button>
          </div>

          {/* Commodities */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              Commodities <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
              {availableCommodities.map((commodity) => (
                <div key={commodity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`edit-${commodity}`}
                    checked={editForm.selectedCommodities.includes(commodity)}
                    onCheckedChange={(checked) =>
                      handleCommodityChange(commodity, checked)
                    }
                  />
                  <label
                    htmlFor={`edit-${commodity}`}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {commodity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t -mx-6 px-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              Save
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditRateTableSheet;
