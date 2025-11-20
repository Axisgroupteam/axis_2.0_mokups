import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  SheetDescription,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusIcon, MoreHorizontalIcon, ChevronDown } from "lucide-react";
import { FaTruck, FaTrailer } from "react-icons/fa";
import SmartFilter from "@/components/SmartFilter";

const Assets = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("vehicle");
  const [isVehicleSheetOpen, setIsVehicleSheetOpen] = useState(false);
  const [isTrailerSheetOpen, setIsTrailerSheetOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [vehicleFormData, setVehicleFormData] = useState({
    vehicleName: "",
    vinSn: "",
    safetyStatus: "",
    status: "",
    dispatcher: "",
    trailer: "",
    driver: "",
  });
  const [trailerFormData, setTrailerFormData] = useState({
    trailerName: "",
    vinSn: "",
    safetyStatus: "",
    status: "",
  });

  // Combined mock data for Vehicles and Trailers
  const assets = [
    // Vehicles (25 entries)
    { id: 1, type: "Vehicle", name: "VIN123456", vinSn: "1HGBH41JXMN109186", safetyStatus: "Pass", status: true, dispatcher: "YPR22", trailer: "109", driver: "John Smith" },
    { id: 2, type: "Vehicle", name: "VIN234567", vinSn: "2HGBH41JXMN109187", safetyStatus: "Pass", status: true, dispatcher: "YPR23", trailer: "110", driver: "Sarah Johnson" },
    { id: 3, type: "Vehicle", name: "VIN345678", vinSn: "3HGBH41JXMN109188", safetyStatus: "Fail", status: false, dispatcher: "YPR24", trailer: "111", driver: "Michael Brown" },
    { id: 4, type: "Vehicle", name: "VIN456789", vinSn: "4HGBH41JXMN109189", safetyStatus: "Pass", status: true, dispatcher: "YPR25", trailer: "112", driver: "Emily Davis" },
    { id: 5, type: "Vehicle", name: "VIN567890", vinSn: "5HGBH41JXMN109190", safetyStatus: "Pass", status: true, dispatcher: "YPR26", trailer: "113", driver: "David Wilson" },
    { id: 6, type: "Vehicle", name: "VIN678901", vinSn: "6HGBH41JXMN109191", safetyStatus: "Pending", status: true, dispatcher: "YPR27", trailer: "114", driver: "Jessica Martinez" },
    { id: 7, type: "Vehicle", name: "VIN789012", vinSn: "7HGBH41JXMN109192", safetyStatus: "Pass", status: true, dispatcher: "YPR28", trailer: "115", driver: "Robert Taylor" },
    { id: 8, type: "Vehicle", name: "VIN890123", vinSn: "8HGBH41JXMN109193", safetyStatus: "Fail", status: false, dispatcher: "YPR29", trailer: "116", driver: "Amanda Anderson" },
    { id: 9, type: "Vehicle", name: "VIN901234", vinSn: "9HGBH41JXMN109194", safetyStatus: "Pass", status: true, dispatcher: "YPR30", trailer: "117", driver: "James Thomas" },
    { id: 10, type: "Vehicle", name: "VIN012345", vinSn: "0HGBH41JXMN109195", safetyStatus: "Pass", status: true, dispatcher: "YPR31", trailer: "118", driver: "Jennifer Garcia" },
    { id: 11, type: "Vehicle", name: "VIN112233", vinSn: "1HGBH41JXMN109196", safetyStatus: "Pass", status: true, dispatcher: "YPR32", trailer: "119", driver: "Christopher Lee" },
    { id: 12, type: "Vehicle", name: "VIN223344", vinSn: "2HGBH41JXMN109197", safetyStatus: "Pending", status: true, dispatcher: "YPR33", trailer: "120", driver: "Ashley Harris" },
    { id: 13, type: "Vehicle", name: "VIN334455", vinSn: "3HGBH41JXMN109198", safetyStatus: "Pass", status: true, dispatcher: "YPR34", trailer: "121", driver: "Matthew Clark" },
    { id: 14, type: "Vehicle", name: "VIN445566", vinSn: "4HGBH41JXMN109199", safetyStatus: "Fail", status: false, dispatcher: "YPR35", trailer: "122", driver: "Brittany Lewis" },
    { id: 15, type: "Vehicle", name: "VIN556677", vinSn: "5HGBH41JXMN109200", safetyStatus: "Pass", status: true, dispatcher: "YPR36", trailer: "123", driver: "Daniel Robinson" },
    { id: 16, type: "Vehicle", name: "VIN667788", vinSn: "6HGBH41JXMN109201", safetyStatus: "Pass", status: true, dispatcher: "YPR37", trailer: "124", driver: "Samantha Walker" },
    { id: 17, type: "Vehicle", name: "VIN778899", vinSn: "7HGBH41JXMN109202", safetyStatus: "Pass", status: true, dispatcher: "YPR38", trailer: "125", driver: "Andrew Young" },
    { id: 18, type: "Vehicle", name: "VIN889900", vinSn: "8HGBH41JXMN109203", safetyStatus: "Pending", status: true, dispatcher: "YPR39", trailer: "126", driver: "Megan Allen" },
    { id: 19, type: "Vehicle", name: "VIN990011", vinSn: "9HGBH41JXMN109204", safetyStatus: "Pass", status: true, dispatcher: "YPR40", trailer: "127", driver: "Joshua King" },
    { id: 20, type: "Vehicle", name: "VIN001122", vinSn: "0HGBH41JXMN109205", safetyStatus: "Fail", status: false, dispatcher: "YPR41", trailer: "128", driver: "Lauren Wright" },
    { id: 21, type: "Vehicle", name: "VIN112244", vinSn: "1HGBH41JXMN109206", safetyStatus: "Pass", status: true, dispatcher: "YPR42", trailer: "129", driver: "Ryan Scott" },
    { id: 22, type: "Vehicle", name: "VIN223355", vinSn: "2HGBH41JXMN109207", safetyStatus: "Pass", status: true, dispatcher: "YPR43", trailer: "130", driver: "Kayla Green" },
    { id: 23, type: "Vehicle", name: "VIN334466", vinSn: "3HGBH41JXMN109208", safetyStatus: "Pass", status: true, dispatcher: "YPR44", trailer: "131", driver: "Brandon Adams" },
    { id: 24, type: "Vehicle", name: "VIN445577", vinSn: "4HGBH41JXMN109209", safetyStatus: "Pending", status: true, dispatcher: "YPR45", trailer: "132", driver: "Nicole Baker" },
    { id: 25, type: "Vehicle", name: "VIN556688", vinSn: "5HGBH41JXMN109210", safetyStatus: "Pass", status: true, dispatcher: "YPR46", trailer: "133", driver: "Tyler Nelson" },
    // Trailers (25 entries)
    { id: 26, type: "Trailer", name: "TRAIL123456", vinSn: "1T9BH41JXMN109186", safetyStatus: "Pass", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 27, type: "Trailer", name: "TRAIL234567", vinSn: "2T9BH41JXMN109187", safetyStatus: "Pass", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 28, type: "Trailer", name: "TRAIL345678", vinSn: "3T9BH41JXMN109188", safetyStatus: "Fail", status: false, dispatcher: null, trailer: null, driver: null },
    { id: 29, type: "Trailer", name: "TRAIL456789", vinSn: "4T9BH41JXMN109189", safetyStatus: "Pass", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 30, type: "Trailer", name: "TRAIL567890", vinSn: "5T9BH41JXMN109190", safetyStatus: "Pass", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 31, type: "Trailer", name: "TRAIL678901", vinSn: "6T9BH41JXMN109191", safetyStatus: "Pending", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 32, type: "Trailer", name: "TRAIL789012", vinSn: "7T9BH41JXMN109192", safetyStatus: "Pass", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 33, type: "Trailer", name: "TRAIL890123", vinSn: "8T9BH41JXMN109193", safetyStatus: "Fail", status: false, dispatcher: null, trailer: null, driver: null },
    { id: 34, type: "Trailer", name: "TRAIL901234", vinSn: "9T9BH41JXMN109194", safetyStatus: "Pass", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 35, type: "Trailer", name: "TRAIL012345", vinSn: "0T9BH41JXMN109195", safetyStatus: "Pass", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 36, type: "Trailer", name: "TRAIL112233", vinSn: "1T9BH41JXMN109196", safetyStatus: "Pass", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 37, type: "Trailer", name: "TRAIL223344", vinSn: "2T9BH41JXMN109197", safetyStatus: "Pending", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 38, type: "Trailer", name: "TRAIL334455", vinSn: "3T9BH41JXMN109198", safetyStatus: "Pass", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 39, type: "Trailer", name: "TRAIL445566", vinSn: "4T9BH41JXMN109199", safetyStatus: "Fail", status: false, dispatcher: null, trailer: null, driver: null },
    { id: 40, type: "Trailer", name: "TRAIL556677", vinSn: "5T9BH41JXMN109200", safetyStatus: "Pass", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 41, type: "Trailer", name: "TRAIL667788", vinSn: "6T9BH41JXMN109201", safetyStatus: "Pass", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 42, type: "Trailer", name: "TRAIL778899", vinSn: "7T9BH41JXMN109202", safetyStatus: "Pass", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 43, type: "Trailer", name: "TRAIL889900", vinSn: "8T9BH41JXMN109203", safetyStatus: "Pending", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 44, type: "Trailer", name: "TRAIL990011", vinSn: "9T9BH41JXMN109204", safetyStatus: "Pass", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 45, type: "Trailer", name: "TRAIL001122", vinSn: "0T9BH41JXMN109205", safetyStatus: "Fail", status: false, dispatcher: null, trailer: null, driver: null },
    { id: 46, type: "Trailer", name: "TRAIL112244", vinSn: "1T9BH41JXMN109206", safetyStatus: "Pass", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 47, type: "Trailer", name: "TRAIL223355", vinSn: "2T9BH41JXMN109207", safetyStatus: "Pass", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 48, type: "Trailer", name: "TRAIL334466", vinSn: "3T9BH41JXMN109208", safetyStatus: "Pass", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 49, type: "Trailer", name: "TRAIL445577", vinSn: "4T9BH41JXMN109209", safetyStatus: "Pending", status: true, dispatcher: null, trailer: null, driver: null },
    { id: 50, type: "Trailer", name: "TRAIL556688", vinSn: "5T9BH41JXMN109210", safetyStatus: "Pass", status: true, dispatcher: null, trailer: null, driver: null },
  ];

  const getSafetyStatusBadgeColor = (status) => {
    const colors = {
      Pass: "bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50",
      Fail: "bg-red-500/10 hover:bg-red-500/30 text-red-700 dark:text-red-400 border border-red-500/50",
      Pending: "bg-yellow-500/10 hover:bg-yellow-500/30 text-yellow-700 dark:text-yellow-400 border border-yellow-500/50",
    };
    return colors[status] || "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  const getTypeBadgeColor = (type) => {
    return type === "Vehicle"
      ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
      : "bg-blue-100 text-blue-700 hover:bg-blue-100";
  };

  const handleVehicleInputChange = (field, value) => {
    setVehicleFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTrailerInputChange = (field, value) => {
    setTrailerFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleVehicleSubmit = (e) => {
    e.preventDefault();
    console.log("Vehicle submitted:", vehicleFormData);
    setIsVehicleSheetOpen(false);
    // Reset form
    setVehicleFormData({
      vehicleName: "",
      vinSn: "",
      safetyStatus: "",
      status: "",
      dispatcher: "",
      trailer: "",
      driver: "",
    });
  };

  const handleTrailerSubmit = (e) => {
    e.preventDefault();
    console.log("Trailer submitted:", trailerFormData);
    setIsTrailerSheetOpen(false);
    // Reset form
    setTrailerFormData({
      trailerName: "",
      vinSn: "",
      safetyStatus: "",
      status: "",
    });
  };

  const handleVehicleCancel = () => {
    setIsVehicleSheetOpen(false);
    setVehicleFormData({
      vehicleName: "",
      vinSn: "",
      safetyStatus: "",
      status: "",
      dispatcher: "",
      trailer: "",
      driver: "",
    });
  };

  const handleTrailerCancel = () => {
    setIsTrailerSheetOpen(false);
    setTrailerFormData({
      trailerName: "",
      vinSn: "",
      safetyStatus: "",
      status: "",
    });
  };

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "type",
          label: "Type",
          type: "select",
          group: "Basic",
          options: [
            { value: "Vehicle", label: "Vehicle" },
            { value: "Trailer", label: "Trailer" },
          ],
        },
        {
          key: "name",
          label: "Name",
          type: "input",
          group: "Basic",
          placeholder: "Enter name...",
        },
        {
          key: "vinSn",
          label: "VIN/SN",
          type: "input",
          group: "Basic",
          placeholder: "Enter VIN/SN...",
        },
        {
          key: "safetyStatus",
          label: "Safety Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "Pass", label: "Pass" },
            { value: "Fail", label: "Fail" },
            { value: "Pending", label: "Pending" },
          ],
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" },
          ],
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
    console.log("Active filters:", newFilters);
  }, []);

  // Vehicle Columns
  const vehicleColumns = [
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Vehicle Name" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "vinSn",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="VIN/SN" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "safetyStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Safety Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("safetyStatus");
        return (
          <Badge className={getSafetyStatusBadgeColor(status)}>{status}</Badge>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge
            className={
              status
                ? "bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50"
                : "bg-rose-500/10 hover:bg-rose-500/30 text-rose-700 dark:text-rose-400 border border-rose-500/50"
            }
          >
            {status ? "Active" : "Inactive"}
          </Badge>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "dispatcher",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dispatcher" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "trailer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Trailer" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "driver",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Driver" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
  ];

  // Trailer Columns
  const trailerColumns = [
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Trailer Name" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "vinSn",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="VIN/SN" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "safetyStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Safety Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("safetyStatus");
        return (
          <Badge className={getSafetyStatusBadgeColor(status)}>{status}</Badge>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge
            className={
              status
                ? "bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50"
                : "bg-rose-500/10 hover:bg-rose-500/30 text-rose-700 dark:text-rose-400 border border-rose-500/50"
            }
          >
            {status ? "Active" : "Inactive"}
          </Badge>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
  ];

  // Get filtered data and columns based on active tab
  const filteredData = assets.filter((asset) =>
    activeTab === "vehicle" ? asset.type === "Vehicle" : asset.type === "Trailer"
  );
  const currentColumns = activeTab === "vehicle" ? vehicleColumns : trailerColumns;

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="px-6 py-4">
        {/* Filter and Add Asset */}
        <div className="flex items-center justify-between mb-4">
          <SmartFilter
            filterGroups={filterGroups}
            onFiltersChange={handleFiltersChange}
          />
          <div className="flex items-center gap-2">
            {/* Vehicle/Trailer Tabs */}
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={activeTab === "vehicle" ? "default" : "ghost"}
                className={`rounded-none ${
                  activeTab === "vehicle"
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
                onClick={() => setActiveTab("vehicle")}
              >
                <FaTruck className="size-4 mr-2" />
                Vehicle
              </Button>
              <Button
                variant={activeTab === "trailer" ? "default" : "ghost"}
                className={`rounded-none ${
                  activeTab === "trailer"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
                onClick={() => setActiveTab("trailer")}
              >
                <FaTrailer className="size-4 mr-2" />
                Trailer
              </Button>
            </div>
            {/* Add Asset Button */}
            <Button
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              onClick={() =>
                activeTab === "vehicle"
                  ? setIsVehicleSheetOpen(true)
                  : setIsTrailerSheetOpen(true)
              }
            >
              <PlusIcon className="size-4 mr-2" />
              Add {activeTab === "vehicle" ? "Vehicle" : "Trailer"}
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <DataTable columns={currentColumns} data={filteredData} showViewOptions={false} />
      </div>

      {/* Add Vehicle Sheet */}
      <Sheet open={isVehicleSheetOpen} onOpenChange={setIsVehicleSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <div className="flex items-center gap-3">
              <div>
                <SheetTitle className="text-xl font-bold text-gray-900">
                  Add New Vehicle
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>

          <form
            onSubmit={handleVehicleSubmit}
            className="space-y-5 mt-2 mb-2 px-6"
          >
            {/* Vehicle Name */}
            <div className="space-y-2">
              <Label
                htmlFor="vehicleName"
                className="text-sm font-medium text-gray-700"
              >
                Vehicle Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="vehicleName"
                type="text"
                placeholder="VIN123456"
                value={vehicleFormData.vehicleName}
                onChange={(e) =>
                  handleVehicleInputChange("vehicleName", e.target.value)
                }
                className="h-10"
                required
              />
            </div>

            {/* VIN/SN */}
            <div className="space-y-2">
              <Label
                htmlFor="vinSn"
                className="text-sm font-medium text-gray-700"
              >
                VIN/SN <span className="text-red-500">*</span>
              </Label>
              <Input
                id="vinSn"
                type="text"
                placeholder="1HGBH41JXMN109186"
                value={vehicleFormData.vinSn}
                onChange={(e) =>
                  handleVehicleInputChange("vinSn", e.target.value)
                }
                className="h-10"
                required
              />
            </div>

            {/* Safety Status */}
            <div className="space-y-2">
              <Label
                htmlFor="safetyStatus"
                className="text-sm font-medium text-gray-700"
              >
                Safety Status <span className="text-red-500">*</span>
              </Label>
              <Select
                value={vehicleFormData.safetyStatus}
                onValueChange={(value) =>
                  handleVehicleInputChange("safetyStatus", value)
                }
                required
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select safety status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pass">Pass</SelectItem>
                  <SelectItem value="Fail">Fail</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label
                htmlFor="status"
                className="text-sm font-medium text-gray-700"
              >
                Status <span className="text-red-500">*</span>
              </Label>
              <Select
                value={vehicleFormData.status}
                onValueChange={(value) =>
                  handleVehicleInputChange("status", value)
                }
                required
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dispatcher */}
            <div className="space-y-2">
              <Label
                htmlFor="dispatcher"
                className="text-sm font-medium text-gray-700"
              >
                Dispatcher
              </Label>
              <Input
                id="dispatcher"
                type="text"
                placeholder="YPR22"
                value={vehicleFormData.dispatcher}
                onChange={(e) =>
                  handleVehicleInputChange("dispatcher", e.target.value)
                }
                className="h-10"
              />
            </div>

            {/* Trailer */}
            <div className="space-y-2">
              <Label
                htmlFor="trailer"
                className="text-sm font-medium text-gray-700"
              >
                Trailer
              </Label>
              <Input
                id="trailer"
                type="text"
                placeholder="109"
                value={vehicleFormData.trailer}
                onChange={(e) =>
                  handleVehicleInputChange("trailer", e.target.value)
                }
                className="h-10"
              />
            </div>

            {/* Driver */}
            <div className="space-y-2">
              <Label
                htmlFor="driver"
                className="text-sm font-medium text-gray-700"
              >
                Driver
              </Label>
              <Input
                id="driver"
                type="text"
                placeholder="John Smith"
                value={vehicleFormData.driver}
                onChange={(e) =>
                  handleVehicleInputChange("driver", e.target.value)
                }
                className="h-10"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t px-6 -mx-6 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handleVehicleCancel}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Add Vehicle
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Add Trailer Sheet */}
      <Sheet open={isTrailerSheetOpen} onOpenChange={setIsTrailerSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <div className="flex items-center gap-3">
              <div>
                <SheetTitle className="text-xl font-bold text-gray-900">
                  Add New Trailer
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>

          <form
            onSubmit={handleTrailerSubmit}
            className="space-y-5 mt-2 mb-2 px-6"
          >
            {/* Trailer Name */}
            <div className="space-y-2">
              <Label
                htmlFor="trailerName"
                className="text-sm font-medium text-gray-700"
              >
                Trailer Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="trailerName"
                type="text"
                placeholder="TRAIL123456"
                value={trailerFormData.trailerName}
                onChange={(e) =>
                  handleTrailerInputChange("trailerName", e.target.value)
                }
                className="h-10"
                required
              />
            </div>

            {/* VIN/SN */}
            <div className="space-y-2">
              <Label
                htmlFor="trailerVinSn"
                className="text-sm font-medium text-gray-700"
              >
                VIN/SN <span className="text-red-500">*</span>
              </Label>
              <Input
                id="trailerVinSn"
                type="text"
                placeholder="1T9BH41JXMN109186"
                value={trailerFormData.vinSn}
                onChange={(e) =>
                  handleTrailerInputChange("vinSn", e.target.value)
                }
                className="h-10"
                required
              />
            </div>

            {/* Safety Status */}
            <div className="space-y-2">
              <Label
                htmlFor="trailerSafetyStatus"
                className="text-sm font-medium text-gray-700"
              >
                Safety Status <span className="text-red-500">*</span>
              </Label>
              <Select
                value={trailerFormData.safetyStatus}
                onValueChange={(value) =>
                  handleTrailerInputChange("safetyStatus", value)
                }
                required
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select safety status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pass">Pass</SelectItem>
                  <SelectItem value="Fail">Fail</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label
                htmlFor="trailerStatus"
                className="text-sm font-medium text-gray-700"
              >
                Status <span className="text-red-500">*</span>
              </Label>
              <Select
                value={trailerFormData.status}
                onValueChange={(value) =>
                  handleTrailerInputChange("status", value)
                }
                required
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t px-6 -mx-6 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handleTrailerCancel}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Add Trailer
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Assets;
