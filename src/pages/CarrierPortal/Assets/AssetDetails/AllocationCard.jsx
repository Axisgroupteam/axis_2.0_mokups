import { Button } from "@/components/ui/button";
import { MapPinIcon, PlusIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AllocationCard = () => {
  // Mock allocation data
  const allocationData = [
    {
      id: 1,
      allocationCode: "ALLOC-001",
      description: "Northeast Region",
      effectiveDate: "2023-01-15",
    },
    {
      id: 2,
      allocationCode: "ALLOC-002",
      description: "Main Terminal",
      effectiveDate: "2023-06-20",
    },
  ];

  return (
    <div className="w-full border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <MapPinIcon className="size-4" />
          Allocation
        </h3>
        <Button
          size="sm"
          className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
        >
          <PlusIcon className="size-3" />
          Add Allocation
        </Button>
      </div>
      <div className="p-4">
        {allocationData.length > 0 ? (
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-semibold border-r h-9 py-2">Allocation Code</TableHead>
                  <TableHead className="text-xs font-semibold border-r h-9 py-2">Description</TableHead>
                  <TableHead className="text-xs font-semibold h-9 py-2">Effective Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allocationData.map((allocation) => (
                  <TableRow key={allocation.id}>
                    <TableCell className="text-xs border-r py-2.5 font-medium">
                      {allocation.allocationCode}
                    </TableCell>
                    <TableCell className="text-xs border-r py-2.5">
                      {allocation.description}
                    </TableCell>
                    <TableCell className="text-xs py-2.5">
                      {allocation.effectiveDate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">
            No allocation records found
          </p>
        )}
      </div>
    </div>
  );
};

export default AllocationCard;
