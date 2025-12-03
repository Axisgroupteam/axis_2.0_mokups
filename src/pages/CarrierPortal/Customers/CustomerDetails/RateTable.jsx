import { useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusIcon, MoreHorizontalIcon, TrendingUp, Trash2 } from "lucide-react";

const RateTable = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [formData, setFormData] = useState({
    tableName: "",
    importFile: null,
    commodities: [],
  });
  const [tableRows, setTableRows] = useState([
    { id: 1, min: "0", max: "1", customerRate: "0", driverRate: "0" },
  ]);

  // Mock rate tables data
  const rateTables = [
    {
      id: 1,
      tableName: "Standard Rates 2024",
      min: 0,
      max: 50,
      customerRate: 150.0,
      driverRate: 120.0,
    },
    {
      id: 2,
      tableName: "Standard Rates 2025",
      min: 51,
      max: 100,
      customerRate: 200.0,
      driverRate: 160.0,
    },
    {
      id: 3,
      tableName: "Premium Rates",
      min: 0,
      max: 25,
      customerRate: 180.0,
      driverRate: 145.0,
    },
    {
      id: 4,
      tableName: "Premium Rates",
      min: 26,
      max: 75,
      customerRate: 250.0,
      driverRate: 200.0,
    },
    {
      id: 5,
      tableName: "Economy Rates",
      min: 0,
      max: 100,
      customerRate: 120.0,
      driverRate: 95.0,
    },
  ];

  // Commodities options
  const commoditiesOptions = [
    "All",
    "Masonry",
    "1/2",
    "Flyash",
    "Test edited asd",
    "test",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTableRowChange = (id, field, value) => {
    setTableRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const addTableRow = () => {
    const newId = Math.max(...tableRows.map((r) => r.id), 0) + 1;
    setTableRows((prev) => [
      ...prev,
      { id: newId, min: "0", max: "1", customerRate: "0", driverRate: "0" },
    ]);
  };

  const removeTableRow = (id) => {
    if (tableRows.length > 1) {
      setTableRows((prev) => prev.filter((row) => row.id !== id));
    }
  };

  const handleCommodityToggle = (commodity) => {
    setFormData((prev) => ({
      ...prev,
      commodities: prev.commodities.includes(commodity)
        ? prev.commodities.filter((c) => c !== commodity)
        : [...prev.commodities, commodity],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, tableRows });
    setIsSheetOpen(false);
    setFormData({
      tableName: "",
      importFile: null,
      commodities: [],
    });
    setTableRows([
      { id: 1, min: "0", max: "1", customerRate: "0", driverRate: "0" },
    ]);
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setFormData({
      tableName: "",
      importFile: null,
      commodities: [],
    });
    setTableRows([
      { id: 1, min: "0", max: "1", customerRate: "0", driverRate: "0" },
    ]);
  };

  return (
    <div className="border rounded-sm bg-card">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="size-4" />
          Rate Tables
        </h3>
        <Button
          size="sm"
          className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
          onClick={() => setIsSheetOpen(true)}
        >
          <PlusIcon className="size-3" />
          Add Rate Table
        </Button>
      </div>
      <div className="p-4">
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-semibold border-r h-9 py-2">
                  Actions
                </TableHead>
                <TableHead className="text-xs font-semibold border-r h-9 py-2">
                  Table Name
                </TableHead>
                <TableHead className="text-xs font-semibold border-r h-9 py-2">
                  Min
                </TableHead>
                <TableHead className="text-xs font-semibold border-r h-9 py-2">
                  Max
                </TableHead>
                <TableHead className="text-xs font-semibold border-r h-9 py-2">
                  Customer Rate
                </TableHead>
                <TableHead className="text-xs font-semibold h-9 py-2">
                  Driver Rate
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rateTables.map((rate) => (
                <TableRow key={rate.id}>
                  <TableCell className="text-xs border-r py-2.5">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell className="text-xs border-r py-2.5">
                    {rate.tableName}
                  </TableCell>
                  <TableCell className="text-xs border-r py-2.5">
                    {rate.min}
                  </TableCell>
                  <TableCell className="text-xs border-r py-2.5">
                    {rate.max}
                  </TableCell>
                  <TableCell className="text-xs border-r py-2.5">
                    ${rate.customerRate.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-xs py-2.5">
                    ${rate.driverRate.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Rate Table Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-3xl overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <div className="flex items-center gap-3">
              <div>
                <SheetTitle className="text-xl font-bold text-gray-900">
                  Add Rate Table
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-2 mb-2 px-6">
            {/* Table Name and Import Table */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="tableName"
                  className="text-sm font-medium text-gray-700"
                >
                  Table Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="tableName"
                  type="text"
                  placeholder="Enter Table Name"
                  value={formData.tableName}
                  onChange={(e) =>
                    handleInputChange("tableName", e.target.value)
                  }
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="importFile"
                  className="text-sm font-medium text-gray-700"
                >
                  Import Table
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10"
                    onClick={() =>
                      document.getElementById("importFile").click()
                    }
                  >
                    Choose File
                  </Button>
                  <Input
                    id="importFile"
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleInputChange("importFile", e.target.files[0])
                    }
                  />
                  <span className="text-sm text-muted-foreground">
                    {formData.importFile
                      ? formData.importFile.name
                      : "No file chosen"}
                  </span>
                </div>
              </div>
            </div>

            {/* Table Rows */}
            <div className="space-y-3">
              {tableRows.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-3"
                >
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-700">Min</Label>
                    <Input
                      type="number"
                      value={row.min}
                      onChange={(e) =>
                        handleTableRowChange(row.id, "min", e.target.value)
                      }
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-700">Max</Label>
                    <Input
                      type="number"
                      value={row.max}
                      onChange={(e) =>
                        handleTableRowChange(row.id, "max", e.target.value)
                      }
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-700">
                      Customer Rate
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        type="number"
                        value={row.customerRate}
                        onChange={(e) =>
                          handleTableRowChange(
                            row.id,
                            "customerRate",
                            e.target.value
                          )
                        }
                        className="h-10 pl-7"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-700">Driver Rate</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        type="number"
                        value={row.driverRate}
                        onChange={(e) =>
                          handleTableRowChange(
                            row.id,
                            "driverRate",
                            e.target.value
                          )
                        }
                        className="h-10 pl-7"
                      />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => removeTableRow(row.id)}
                      disabled={tableRows.length === 1}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Add Table Row Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full border-dashed"
                onClick={addTableRow}
              >
                <PlusIcon className="size-4 mr-2" />
                Table Row
              </Button>
            </div>

            {/* Commodities */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Commodities <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {commoditiesOptions.map((commodity) => (
                  <div key={commodity} className="flex items-center space-x-2">
                    <Checkbox
                      id={commodity}
                      checked={formData.commodities.includes(commodity)}
                      onCheckedChange={() => handleCommodityToggle(commodity)}
                    />
                    <Label
                      htmlFor={commodity}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {commodity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t px-6 -mx-6 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Create
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default RateTable;
