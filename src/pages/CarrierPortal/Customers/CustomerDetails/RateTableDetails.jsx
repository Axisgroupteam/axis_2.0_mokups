import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import EditRateTableSheet from "./EditRateTableSheet";

const RateTableDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "1";
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  // Mock rate tables data - in real app, fetch based on id
  const rateTablesData = {
    1: {
      tableName: "Standard Rates 2024",
      commodities: ["GU", "Slag", "Sand 40-140", "Masonry", "Cement"],
      rows: [
        { id: 1, min: 0, max: 5, customerRate: 9.14, driverRate: 8.70 },
        { id: 2, min: 5.01, max: 10, customerRate: 9.14, driverRate: 8.70 },
        { id: 3, min: 10.01, max: 15, customerRate: 9.14, driverRate: 8.70 },
        { id: 4, min: 15.01, max: 20, customerRate: 9.14, driverRate: 8.70 },
        { id: 5, min: 20.01, max: 25, customerRate: 9.68, driverRate: 9.22 },
        { id: 6, min: 25.01, max: 30, customerRate: 10.25, driverRate: 9.75 },
        { id: 7, min: 30.01, max: 35, customerRate: 10.85, driverRate: 10.30 },
        { id: 8, min: 35.01, max: 40, customerRate: 11.50, driverRate: 10.90 },
        { id: 9, min: 40.01, max: 45, customerRate: 12.20, driverRate: 11.60 },
        { id: 10, min: 45.01, max: 50, customerRate: 12.95, driverRate: 12.30 },
      ],
    },
    2: {
      tableName: "Standard Rates 2025",
      commodities: ["Glass 40-140", "1/2", "IT", "Type 3"],
      rows: [
        { id: 1, min: 0, max: 5, customerRate: 9.50, driverRate: 9.00 },
        { id: 2, min: 5.01, max: 10, customerRate: 9.50, driverRate: 9.00 },
        { id: 3, min: 10.01, max: 15, customerRate: 9.50, driverRate: 9.00 },
        { id: 4, min: 15.01, max: 20, customerRate: 9.50, driverRate: 9.00 },
        { id: 5, min: 20.01, max: 25, customerRate: 10.05, driverRate: 9.55 },
        { id: 6, min: 25.01, max: 30, customerRate: 10.65, driverRate: 10.10 },
        { id: 7, min: 30.01, max: 35, customerRate: 11.30, driverRate: 10.70 },
        { id: 8, min: 35.01, max: 40, customerRate: 12.00, driverRate: 11.40 },
      ],
    },
    3: {
      tableName: "Premium Rates",
      commodities: ["Dumb", "1L", "FlatB"],
      rows: [
        { id: 1, min: 0, max: 5, customerRate: 11.00, driverRate: 10.50 },
        { id: 2, min: 5.01, max: 10, customerRate: 11.00, driverRate: 10.50 },
        { id: 3, min: 10.01, max: 15, customerRate: 11.50, driverRate: 11.00 },
        { id: 4, min: 15.01, max: 20, customerRate: 12.00, driverRate: 11.50 },
        { id: 5, min: 20.01, max: 25, customerRate: 12.50, driverRate: 12.00 },
      ],
    },
    4: {
      tableName: "Bulk Transport Rates",
      commodities: ["Gravel", "Limestone", "Asphalt", "Concrete", "Crusite"],
      rows: [
        { id: 1, min: 0, max: 10, customerRate: 8.50, driverRate: 8.00 },
        { id: 2, min: 10.01, max: 20, customerRate: 9.00, driverRate: 8.50 },
        { id: 3, min: 20.01, max: 30, customerRate: 9.50, driverRate: 9.00 },
        { id: 4, min: 30.01, max: 40, customerRate: 10.00, driverRate: 9.50 },
        { id: 5, min: 40.01, max: 50, customerRate: 10.50, driverRate: 10.00 },
        { id: 6, min: 50.01, max: 60, customerRate: 11.00, driverRate: 10.50 },
      ],
    },
    5: {
      tableName: "Express Rates",
      commodities: ["Flyash", "Portland", "Ready Mix"],
      rows: [
        { id: 1, min: 0, max: 5, customerRate: 12.00, driverRate: 11.50 },
        { id: 2, min: 5.01, max: 10, customerRate: 12.50, driverRate: 12.00 },
        { id: 3, min: 10.01, max: 15, customerRate: 13.00, driverRate: 12.50 },
        { id: 4, min: 15.01, max: 20, customerRate: 13.50, driverRate: 13.00 },
      ],
    },
  };

  const rateTable = rateTablesData[id] || rateTablesData[1];

  const handleSaveRateTable = (formData) => {
    console.log("Save Rate Table:", formData);
  };

  const columns = [
    {
      accessorKey: "min",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Min" className="justify-center text-center" />
      ),
      cell: ({ row }) => <div className="text-right">{row.original.min}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "max",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Max" className="justify-center text-center" />
      ),
      cell: ({ row }) => <div className="text-right">{row.original.max}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "customerRate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer Rate" className="justify-center text-center" />
      ),
      cell: ({ row }) => <div className="text-right">$ {row.original.customerRate.toFixed(2)}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "driverRate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Driver Rate" className="justify-center text-center" />
      ),
      cell: ({ row }) => <div className="text-right">$ {row.original.driverRate.toFixed(2)}</div>,
      enableSorting: true,
      enableHiding: true,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-auto">
      <div className="px-6 py-4">
        {/* Header Info */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground">Table Name</p>
          <h2 className="text-lg font-semibold">{rateTable.tableName}</h2>
        </div>

        {/* Rate Table */}
        <div className="border border-border rounded-lg bg-background">
          {/* Commodities and Edit Button */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Commodities</p>
              <div className="flex flex-wrap gap-1">
                {rateTable.commodities.map((commodity, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 border border-blue-500 text-blue-700 dark:bg-blue-400/10 dark:border-blue-400 dark:text-blue-400"
                  >
                    {commodity}
                  </span>
                ))}
              </div>
            </div>
            <Button
              size="sm"
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
              onClick={() => setIsEditSheetOpen(true)}
            >
              <PencilIcon className="size-3" />
              Edit
            </Button>
          </div>

          {/* Data Table */}
          <div className="px-4 pb-3">
            <DataTable
              columns={columns}
              data={rateTable.rows}
              showViewOptions={false}
              pageSize={10}
            />
          </div>
        </div>
      </div>

      {/* Edit Rate Table Sheet */}
      <EditRateTableSheet
        open={isEditSheetOpen}
        onOpenChange={setIsEditSheetOpen}
        rateTable={rateTable}
        onSave={handleSaveRateTable}
        allRateTables={Object.values(rateTablesData)}
      />
    </div>
  );
};

export default RateTableDetails;
