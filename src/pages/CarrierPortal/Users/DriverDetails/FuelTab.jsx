import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import SmartFilter from "@/components/SmartFilter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusIcon, MoreHorizontalIcon } from "lucide-react";

const FuelTab = () => {
  const [isFuelCardSheetOpen, setIsFuelCardSheetOpen] = useState(false);
  const [editingFuelCard, setEditingFuelCard] = useState(null);
  const [filters, setFilters] = useState([]);

  // Filter configurations
  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "cardProvider",
          label: "Card Provider",
          type: "select",
          group: "Basic",
          options: [
            { value: "EFS", label: "EFS" },
            { value: "Comdata", label: "Comdata" },
            { value: "T-Chek", label: "T-Chek" },
            { value: "Fleet One", label: "Fleet One" },
          ],
        },
        {
          key: "cardStatus",
          label: "Card Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" },
            { value: "Suspended", label: "Suspended" },
          ],
        },
        {
          key: "cardType",
          label: "Card Type",
          type: "select",
          group: "Basic",
          options: [
            { value: "Fuel", label: "Fuel" },
            { value: "Cash", label: "Cash" },
            { value: "Both", label: "Both" },
          ],
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Mock fuel card data
  const [fuelCards, setFuelCards] = useState([
    {
      id: 1,
      cardProvider: "EFS",
      account: "ACC-12345",
      subaccount: "SUB-001",
      cardNumber: "**** **** **** 1234",
      tractor: "TRC-101",
      cardPayee: "John Smith",
      chargePayee: "John Smith",
      expenseCode: "FUEL-001",
      cardStatus: "Active",
      assignType: "Driver",
      cardType: "Fuel",
    },
    {
      id: 2,
      cardProvider: "Comdata",
      account: "ACC-67890",
      subaccount: "SUB-002",
      cardNumber: "**** **** **** 5678",
      tractor: "TRC-102",
      cardPayee: "John Smith",
      chargePayee: "John Smith",
      expenseCode: "FUEL-002",
      cardStatus: "Active",
      assignType: "Driver",
      cardType: "Fuel",
    },
    {
      id: 3,
      cardProvider: "T-Chek",
      account: "ACC-11111",
      subaccount: "SUB-003",
      cardNumber: "**** **** **** 9012",
      tractor: "TRC-103",
      cardPayee: "John Smith",
      chargePayee: "John Smith",
      expenseCode: "FUEL-003",
      cardStatus: "Inactive",
      assignType: "Tractor",
      cardType: "Both",
    },
  ]);

  // Column definitions
  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => {
        const card = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => handleEditFuelCard(card)}>Edit</DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => handleDeleteFuelCard(card.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "cardProvider",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Card Provider" />
      ),
      size: 120,
    },
    {
      accessorKey: "account",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Account" />
      ),
      size: 110,
    },
    {
      accessorKey: "subaccount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Subaccount" />
      ),
      size: 100,
    },
    {
      accessorKey: "cardNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Card Number" />
      ),
      size: 150,
    },
    {
      accessorKey: "tractor",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tractor" />
      ),
      size: 90,
    },
    {
      accessorKey: "cardPayee",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Card Payee" />
      ),
      size: 120,
    },
    {
      accessorKey: "chargePayee",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Charge Payee" />
      ),
      size: 120,
    },
    {
      accessorKey: "expenseCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Expense Code" />
      ),
      size: 110,
    },
    {
      accessorKey: "cardStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Card Status" />
      ),
      size: 100,
      cell: ({ row }) => {
        const status = row.getValue("cardStatus");
        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
              status === "Active"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : status === "Inactive"
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "assignType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Assign Type" />
      ),
      size: 100,
    },
    {
      accessorKey: "cardType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Card Type" />
      ),
      size: 90,
    },
  ];

  const handleAddFuelCard = () => {
    setEditingFuelCard(null);
    setIsFuelCardSheetOpen(true);
  };

  const handleEditFuelCard = (fuelCard) => {
    setEditingFuelCard(fuelCard);
    setIsFuelCardSheetOpen(true);
  };

  const handleDeleteFuelCard = (id) => {
    setFuelCards(fuelCards.filter((card) => card.id !== id));
  };

  const handleSubmitFuelCard = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const fuelCardData = {
      id: editingFuelCard ? editingFuelCard.id : Date.now(),
      cardProvider: formData.get("cardProvider"),
      account: formData.get("account"),
      subaccount: formData.get("subaccount"),
      cardNumber: formData.get("cardNumber"),
      tractor: formData.get("tractor"),
      cardPayee: formData.get("cardPayee"),
      chargePayee: formData.get("chargePayee"),
      expenseCode: formData.get("expenseCode"),
      cardStatus: formData.get("cardStatus"),
      assignType: formData.get("assignType"),
      cardType: formData.get("cardType"),
    };

    if (editingFuelCard) {
      setFuelCards(fuelCards.map((card) =>
        card.id === editingFuelCard.id ? fuelCardData : card
      ));
    } else {
      setFuelCards([...fuelCards, fuelCardData]);
    }

    setIsFuelCardSheetOpen(false);
    setEditingFuelCard(null);
  };

  return (
    <>
      <div className="space-y-4 px-0.5 pb-4">
        <div className="border border-border rounded-lg overflow-hidden bg-background">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border">
            <SmartFilter
              filterGroups={filterGroups}
              onFiltersChange={handleFiltersChange}
            />
            <Button
              size="sm"
              onClick={handleAddFuelCard}
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
            >
              <PlusIcon className="size-3" />
              Add Fuel Card
            </Button>
          </div>
          <div className="p-4">
          <DataTable
            columns={columns}
            data={fuelCards}
            showViewOptions={false}
            pageSize={10}
          />
          </div>
        </div>
      </div>

      {/* Add/Edit Fuel Card Sheet */}
      <Sheet open={isFuelCardSheetOpen} onOpenChange={setIsFuelCardSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-lg font-bold text-foreground">
              {editingFuelCard ? "Edit Fuel Card" : "Add Fuel Card"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmitFuelCard} className="space-y-4 mt-4 px-6">
            {/* Card Provider */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Card Provider <span className="text-red-500">*</span>
              </Label>
              <Select
                name="cardProvider"
                defaultValue={editingFuelCard?.cardProvider}
                required
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select card provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EFS">EFS</SelectItem>
                  <SelectItem value="Comdata">Comdata</SelectItem>
                  <SelectItem value="T-Chek">T-Chek</SelectItem>
                  <SelectItem value="Fleet One">Fleet One</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Account */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Account <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="account"
                placeholder="Enter account"
                className="h-10"
                defaultValue={editingFuelCard?.account}
                required
              />
            </div>

            {/* Subaccount */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Subaccount <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="subaccount"
                placeholder="Enter subaccount"
                className="h-10"
                defaultValue={editingFuelCard?.subaccount}
                required
              />
            </div>

            {/* Card Number */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Card Number <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="cardNumber"
                placeholder="Enter card number"
                className="h-10"
                defaultValue={editingFuelCard?.cardNumber}
                required
              />
            </div>

            {/* Tractor */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Tractor <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="tractor"
                placeholder="Enter tractor"
                className="h-10"
                defaultValue={editingFuelCard?.tractor}
                required
              />
            </div>

            {/* Card Payee */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Card Payee <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="cardPayee"
                placeholder="Enter card payee"
                className="h-10"
                defaultValue={editingFuelCard?.cardPayee}
                required
              />
            </div>

            {/* Charge Payee */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Charge Payee <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="chargePayee"
                placeholder="Enter charge payee"
                className="h-10"
                defaultValue={editingFuelCard?.chargePayee}
                required
              />
            </div>

            {/* Expense Code */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Expense Code <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="expenseCode"
                placeholder="Enter expense code"
                className="h-10"
                defaultValue={editingFuelCard?.expenseCode}
                required
              />
            </div>

            {/* Card Status */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Card Status <span className="text-red-500">*</span>
              </Label>
              <Select
                name="cardStatus"
                defaultValue={editingFuelCard?.cardStatus || "Active"}
                required
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select card status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Assign Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Assign Type <span className="text-red-500">*</span>
              </Label>
              <Select
                name="assignType"
                defaultValue={editingFuelCard?.assignType || "Driver"}
                required
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select assign type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Driver">Driver</SelectItem>
                  <SelectItem value="Tractor">Tractor</SelectItem>
                  <SelectItem value="Both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Card Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Card Type <span className="text-red-500">*</span>
              </Label>
              <Select
                name="cardType"
                defaultValue={editingFuelCard?.cardType || "Fuel"}
                required
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select card type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fuel">Fuel</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFuelCardSheetOpen(false)}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {editingFuelCard ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default FuelTab;
