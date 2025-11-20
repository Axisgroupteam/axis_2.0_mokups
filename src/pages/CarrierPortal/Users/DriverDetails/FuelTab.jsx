import { useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaGasPump, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const FuelTab = () => {
  const [isFuelCardSheetOpen, setIsFuelCardSheetOpen] = useState(false);
  const [editingFuelCard, setEditingFuelCard] = useState(null);

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
  ]);

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
        <div className="border rounded-sm bg-card">
          <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <FaGasPump className="size-4" />
              Fuel Card
            </h3>
            <Button
              size="sm"
              onClick={handleAddFuelCard}
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
            >
              <FaPlus className="size-3" />
              Add Fuel Card
            </Button>
          </div>
          <div className="p-4">
            {fuelCards.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs font-semibold border-r h-9 py-2">Card Provider</TableHead>
                      <TableHead className="text-xs font-semibold border-r h-9 py-2">Account</TableHead>
                      <TableHead className="text-xs font-semibold border-r h-9 py-2">Subaccount</TableHead>
                      <TableHead className="text-xs font-semibold border-r h-9 py-2">Card Number</TableHead>
                      <TableHead className="text-xs font-semibold border-r h-9 py-2">Tractor</TableHead>
                      <TableHead className="text-xs font-semibold border-r h-9 py-2">Card Payee</TableHead>
                      <TableHead className="text-xs font-semibold border-r h-9 py-2">Charge Payee</TableHead>
                      <TableHead className="text-xs font-semibold border-r h-9 py-2">Expense Code</TableHead>
                      <TableHead className="text-xs font-semibold border-r h-9 py-2">Card Status</TableHead>
                      <TableHead className="text-xs font-semibold border-r h-9 py-2">Assign Type</TableHead>
                      <TableHead className="text-xs font-semibold border-r h-9 py-2">Card Type</TableHead>
                      <TableHead className="text-xs font-semibold text-right h-9 py-2">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fuelCards.map((card) => (
                      <TableRow key={card.id}>
                        <TableCell className="text-xs border-r py-2.5">{card.cardProvider}</TableCell>
                        <TableCell className="text-xs border-r py-2.5">{card.account}</TableCell>
                        <TableCell className="text-xs border-r py-2.5">{card.subaccount}</TableCell>
                        <TableCell className="text-xs border-r py-2.5">{card.cardNumber}</TableCell>
                        <TableCell className="text-xs border-r py-2.5">{card.tractor}</TableCell>
                        <TableCell className="text-xs border-r py-2.5">{card.cardPayee}</TableCell>
                        <TableCell className="text-xs border-r py-2.5">{card.chargePayee}</TableCell>
                        <TableCell className="text-xs border-r py-2.5">{card.expenseCode}</TableCell>
                        <TableCell className="text-xs border-r py-2.5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {card.cardStatus}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs border-r py-2.5">{card.assignType}</TableCell>
                        <TableCell className="text-xs border-r py-2.5">{card.cardType}</TableCell>
                        <TableCell className="text-right py-2.5">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditFuelCard(card)}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <FaEdit className="size-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteFuelCard(card.id)}
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
                No fuel cards added yet
              </p>
            )}
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
