import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, UserIcon, DollarSignIcon, FileTextIcon, PlusIcon } from "lucide-react";
import { FaUser, FaFileInvoiceDollar, FaComments } from "react-icons/fa";
import SmartFilter from "@/components/SmartFilter";

const Payee = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    legalName: "",
    settlement: false,
    address: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: "",
    paymentMethod: "",
  });

  // Mock payee data - 25 records
  const payees = [
    { id: 1, name: "John Smith", legalName: "John Smith LLC", code: "PAY-001", address: "123 Main St, New York, NY", paymentMethod: "Bank Transfer" },
    { id: 2, name: "Sarah Johnson", legalName: "Sarah Johnson Enterprises", code: "PAY-002", address: "456 Oak Ave, Los Angeles, CA", paymentMethod: "Direct Deposit" },
    { id: 3, name: "Michael Brown", legalName: "Brown Transportation Inc.", code: "PAY-003", address: "789 Pine Rd, Chicago, IL", paymentMethod: "Check" },
    { id: 4, name: "Emily Davis", legalName: "Davis Logistics LLC", code: "PAY-004", address: "321 Elm St, Houston, TX", paymentMethod: "Bank Transfer" },
    { id: 5, name: "David Wilson", legalName: "Wilson Freight Services", code: "PAY-005", address: "654 Maple Dr, Phoenix, AZ", paymentMethod: "Direct Deposit" },
    { id: 6, name: "Jessica Martinez", legalName: "Martinez Trucking Co.", code: "PAY-006", address: "987 Cedar Ln, Philadelphia, PA", paymentMethod: "Bank Transfer" },
    { id: 7, name: "Robert Taylor", legalName: "Taylor Hauling Inc.", code: "PAY-007", address: "147 Birch Blvd, San Antonio, TX", paymentMethod: "Check" },
    { id: 8, name: "Amanda Anderson", legalName: "Anderson Carriers LLC", code: "PAY-008", address: "258 Walnut St, San Diego, CA", paymentMethod: "Direct Deposit" },
    { id: 9, name: "James Thomas", legalName: "Thomas Express Inc.", code: "PAY-009", address: "369 Cherry Ave, Dallas, TX", paymentMethod: "Bank Transfer" },
    { id: 10, name: "Jennifer Garcia", legalName: "Garcia Transport LLC", code: "PAY-010", address: "741 Spruce Rd, San Jose, CA", paymentMethod: "Direct Deposit" },
    { id: 11, name: "William Lee", legalName: "Lee Haulers Inc.", code: "PAY-011", address: "852 Oakwood Dr, Austin, TX", paymentMethod: "Check" },
    { id: 12, name: "Lisa White", legalName: "White Logistics Group", code: "PAY-012", address: "963 Pinewood Ave, Jacksonville, FL", paymentMethod: "Bank Transfer" },
    { id: 13, name: "Christopher Harris", legalName: "Harris Freight Solutions", code: "PAY-013", address: "174 Elmwood Ct, Columbus, OH", paymentMethod: "Direct Deposit" },
    { id: 14, name: "Patricia Clark", legalName: "Clark Transport Services", code: "PAY-014", address: "285 Maplewood Ln, Fort Worth, TX", paymentMethod: "Bank Transfer" },
    { id: 15, name: "Daniel Lewis", legalName: "Lewis Trucking LLC", code: "PAY-015", address: "396 Cedarwood Blvd, Charlotte, NC", paymentMethod: "Check" },
    { id: 16, name: "Nancy Walker", legalName: "Walker Express Co.", code: "PAY-016", address: "507 Birchwood St, Indianapolis, IN", paymentMethod: "Direct Deposit" },
    { id: 17, name: "Mark Robinson", legalName: "Robinson Carriers Inc.", code: "PAY-017", address: "618 Willowbrook Rd, San Francisco, CA", paymentMethod: "Bank Transfer" },
    { id: 18, name: "Karen Hall", legalName: "Hall Delivery Services", code: "PAY-018", address: "729 Redwood Ave, Seattle, WA", paymentMethod: "Direct Deposit" },
    { id: 19, name: "Steven Young", legalName: "Young Freight LLC", code: "PAY-019", address: "840 Aspen Dr, Denver, CO", paymentMethod: "Check" },
    { id: 20, name: "Betty King", legalName: "King Logistics Inc.", code: "PAY-020", address: "951 Sycamore Ln, Washington, DC", paymentMethod: "Bank Transfer" },
    { id: 21, name: "Edward Wright", legalName: "Wright Hauling Co.", code: "PAY-021", address: "162 Chestnut St, Boston, MA", paymentMethod: "Direct Deposit" },
    { id: 22, name: "Dorothy Scott", legalName: "Scott Transport Group", code: "PAY-022", address: "273 Hickory Ave, Nashville, TN", paymentMethod: "Bank Transfer" },
    { id: 23, name: "Frank Green", legalName: "Green Express LLC", code: "PAY-023", address: "384 Magnolia Blvd, Detroit, MI", paymentMethod: "Check" },
    { id: 24, name: "Margaret Adams", legalName: "Adams Freight Services", code: "PAY-024", address: "495 Cypress Rd, Portland, OR", paymentMethod: "Direct Deposit" },
    { id: 25, name: "George Baker", legalName: "Baker Trucking Inc.", code: "PAY-025", address: "606 Palm Dr, Las Vegas, NV", paymentMethod: "Bank Transfer" },
  ];

  const getRoleBadgeColor = (role) => {
    return "bg-purple-500/10 hover:bg-purple-500/30 text-purple-700 dark:text-purple-400 border border-purple-500/50";
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
    setIsSheetOpen(false);

    // Reset form
    setFormData({
      name: "",
      code: "",
      legalName: "",
      settlement: false,
      address: "",
      city: "",
      state: "",
      zip: "",
      phoneNumber: "",
      paymentMethod: "",
    });
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    // Reset form
    setFormData({
      name: "",
      code: "",
      legalName: "",
      settlement: false,
      address: "",
      city: "",
      state: "",
      zip: "",
      phoneNumber: "",
      paymentMethod: "",
    });
  };

  const handleActionClick = (action, payee) => {
    console.log(`Action: ${action}, Payee:`, payee);

    const tabMap = {
      "profile": "profile",
      "finance": "finance",
      "settlement": "settlement",
      "comments": "comments",
    };

    if (tabMap[action]) {
      navigate(`/app/carrier-portal/master/payee/payee-details?tab=${tabMap[action]}`);
    }
  };

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "name",
          label: "Name",
          type: "input",
          group: "Basic",
          placeholder: "Enter name...",
        },
        {
          key: "code",
          label: "Code",
          type: "input",
          group: "Basic",
          placeholder: "Enter code...",
        },
        {
          key: "paymentMethod",
          label: "Payment Method",
          type: "select",
          group: "Basic",
          options: [
            { value: "Bank Transfer", label: "Bank Transfer" },
            { value: "Direct Deposit", label: "Direct Deposit" },
            { value: "Check", label: "Check" },
            { value: "Cash", label: "Cash" },
          ],
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
    console.log("Active filters:", newFilters);
  }, []);

  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => {
        const payee = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-56">
              {/* Payee Info Header */}
              <div className="px-3 py-2 border-b flex items-start gap-2">
                <div className="p-1.5 bg-gray-100 rounded-full mt-0.5">
                  <FaUser className="h-5 w-5 text-gray-600" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-medium text-sm">
                    {payee.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{payee.code}</p>
                </div>
              </div>
              {/* Actions */}
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleActionClick("profile", payee)}
              >
                <UserIcon className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleActionClick("finance", payee)}
              >
                <DollarSignIcon className="h-4 w-4 mr-2" />
                Finance
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleActionClick("settlement", payee)}
              >
                <FaFileInvoiceDollar className="h-4 w-4 mr-2" />
                Settlement Details
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleActionClick("comments", payee)}
              >
                <FaComments className="h-4 w-4 mr-2" />
                Comments
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "legalName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Legal Name" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "address",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Address" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "paymentMethod",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Payment Method" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="px-6 py-4">
        {/* Filter and Add Payee */}
        <div className="flex items-center justify-between mb-1">
          <SmartFilter
            filterGroups={filterGroups}
            onFiltersChange={handleFiltersChange}
          />
          <Button
            className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            onClick={() => setIsSheetOpen(true)}
          >
            <PlusIcon className="size-4 mr-2" />
            Add Payee
          </Button>
        </div>

        {/* Data Table with built-in toolbar and pagination */}
        <DataTable columns={columns} data={payees} showViewOptions={false} />
      </div>

      {/* Add Payee Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <div className="flex items-center gap-3">
              <div>
                <SheetTitle className="text-xl font-bold text-gray-900">
                  Add New Payee
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-2n mb-2 px-6">
            {/* Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Smith"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Legal Name */}
            <div className="space-y-2">
              <Label
                htmlFor="legalName"
                className="text-sm font-medium text-gray-700"
              >
                Legal Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="legalName"
                type="text"
                placeholder="John Smith LLC"
                value={formData.legalName}
                onChange={(e) => handleInputChange("legalName", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Code */}
            <div className="space-y-2">
              <Label
                htmlFor="code"
                className="text-sm font-medium text-gray-700"
              >
                Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="code"
                type="text"
                placeholder="PAY-001"
                value={formData.code}
                onChange={(e) => handleInputChange("code", e.target.value)}
                className="h-10"
                required
              />
            </div>

            {/* Settlement Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="settlement"
                checked={formData.settlement}
                onCheckedChange={(checked) => handleInputChange("settlement", checked)}
              />
              <Label
                htmlFor="settlement"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Settlement
              </Label>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="text-sm font-medium text-gray-700"
              >
                Address
              </Label>
              <Input
                id="address"
                type="text"
                placeholder="123 Main Street"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="h-10"
              />
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label
                htmlFor="city"
                className="text-sm font-medium text-gray-700"
              >
                City
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="New York"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="h-10"
              />
            </div>

            {/* State */}
            <div className="space-y-2">
              <Label
                htmlFor="state"
                className="text-sm font-medium text-gray-700"
              >
                State
              </Label>
              <Input
                id="state"
                type="text"
                placeholder="NY"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className="h-10"
              />
            </div>

            {/* ZIP Code */}
            <div className="space-y-2">
              <Label
                htmlFor="zip"
                className="text-sm font-medium text-gray-700"
              >
                ZIP Code
              </Label>
              <Input
                id="zip"
                type="text"
                placeholder="10001"
                value={formData.zip}
                onChange={(e) => handleInputChange("zip", e.target.value)}
                className="h-10"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                className="h-10"
              />
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label
                htmlFor="paymentMethod"
                className="text-sm font-medium text-gray-700"
              >
                Payment Method <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) => handleInputChange("paymentMethod", value)}
                required
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="direct-deposit">Direct Deposit</SelectItem>
                </SelectContent>
              </Select>
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
                Create Payee
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Payee;
