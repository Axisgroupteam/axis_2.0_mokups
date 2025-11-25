import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WrenchIcon, PlusIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EquipmentCard = () => {
  // Mock equipment data
  const equipmentData = [
    {
      id: 1,
      returnedDate: "2024-01-15",
      equipmentType: "Tire Chains",
      status: "Returned",
      issuedDate: "2024-01-10",
      issuedBy: "John Doe",
      quantity: 2,
    },
    {
      id: 2,
      returnedDate: null,
      equipmentType: "Fire Extinguisher",
      status: "Issued",
      issuedDate: "2023-12-01",
      issuedBy: "Sarah Johnson",
      quantity: 1,
    },
    {
      id: 3,
      returnedDate: null,
      equipmentType: "First Aid Kit",
      status: "Issued",
      issuedDate: "2023-12-01",
      issuedBy: "Sarah Johnson",
      quantity: 1,
    },
  ];

  const getStatusBadgeColor = (status) => {
    const colors = {
      Issued: "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50",
      Returned: "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50",
      Lost: "bg-red-500/10 hover:bg-red-500/30 text-red-700 dark:text-red-400 border border-red-500/50",
    };
    return colors[status] || "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  return (
    <div className="w-full border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <WrenchIcon className="size-4" />
          Equipment
        </h3>
        <Button
          size="sm"
          className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
        >
          <PlusIcon className="size-3" />
          Add Equipment
        </Button>
      </div>
      <div className="p-4">
        {equipmentData.length > 0 ? (
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-semibold border-r h-9 py-2">Returned Date</TableHead>
                  <TableHead className="text-xs font-semibold border-r h-9 py-2">Equipment Type</TableHead>
                  <TableHead className="text-xs font-semibold border-r h-9 py-2">Status</TableHead>
                  <TableHead className="text-xs font-semibold border-r h-9 py-2">Issued Date</TableHead>
                  <TableHead className="text-xs font-semibold border-r h-9 py-2">Issued By</TableHead>
                  <TableHead className="text-xs font-semibold h-9 py-2">Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipmentData.map((equipment) => (
                  <TableRow key={equipment.id}>
                    <TableCell className="text-xs border-r py-2.5">
                      {equipment.returnedDate || "-"}
                    </TableCell>
                    <TableCell className="text-xs border-r py-2.5 font-medium">
                      {equipment.equipmentType}
                    </TableCell>
                    <TableCell className="text-xs border-r py-2.5">
                      <Badge className={getStatusBadgeColor(equipment.status)}>
                        {equipment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs border-r py-2.5">
                      {equipment.issuedDate}
                    </TableCell>
                    <TableCell className="text-xs border-r py-2.5">
                      {equipment.issuedBy}
                    </TableCell>
                    <TableCell className="text-xs py-2.5 text-center">
                      {equipment.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">
            No equipment records found
          </p>
        )}
      </div>
    </div>
  );
};

export default EquipmentCard;
