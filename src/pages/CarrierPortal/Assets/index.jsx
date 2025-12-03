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
import { PlusIcon, MoreHorizontalIcon, ChevronDown, Search, Upload } from "lucide-react";
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
    licensePlate: "",
    year: "",
    model: "",
    fleetType: "",
    group: "",
    make: "",
    registrationDocuments: null,
    vehicleImages: null,
    operator: "",
    safetyStatus: "",
    reason: "",
    color: "",
    ownership: "",
    dispatcher: "",
    trailer: "",
    type: "",
    msrp: "",
    bodyType: "",
    bodySubtype: "",
  });
  const [trailerFormData, setTrailerFormData] = useState({
    trailerName: "",
    vinSn: "",
    licensePlate: "",
    year: "",
    model: "",
    fleetType: "",
    group: "",
    make: "",
    registrationDocuments: null,
    trailerImages: null,
    color: "",
    ownership: "",
    safetyStatus: "",
    reason: "",
    type: "",
    msrp: "",
    bodyType: "",
    bodySubtype: "",
  });

  // Combined mock data for Vehicles and Trailers
  const assets = [
    // Vehicles (25 entries)
    {
      id: 1,
      type: "Vehicle",
      name: "VIN123456",
      vinSn: "1HGBH41JXMN109186",
      safetyStatus: "Pass",
      status: true,
      dispatcher: "YPR22",
      trailer: "109",
      driver: "John Smith",
    },
    {
      id: 2,
      type: "Vehicle",
      name: "VIN234567",
      vinSn: "2HGBH41JXMN109187",
      safetyStatus: "Pass",
      status: true,
      dispatcher: "YPR23",
      trailer: "110",
      driver: "Sarah Johnson",
    },
    {
      id: 3,
      type: "Vehicle",
      name: "VIN345678",
      vinSn: "3HGBH41JXMN109188",
      safetyStatus: "Fail",
      status: false,
      dispatcher: "YPR24",
      trailer: "111",
      driver: "Michael Brown",
    },
    {
      id: 4,
      type: "Vehicle",
      name: "VIN456789",
      vinSn: "4HGBH41JXMN109189",
      safetyStatus: "Pass",
      status: true,
      dispatcher: "YPR25",
      trailer: "112",
      driver: "Emily Davis",
    },
    {
      id: 5,
      type: "Vehicle",
      name: "VIN567890",
      vinSn: "5HGBH41JXMN109190",
      safetyStatus: "Pass",
      status: true,
      dispatcher: "YPR26",
      trailer: "113",
      driver: "David Wilson",
    },
    {
      id: 6,
      type: "Vehicle",
      name: "VIN678901",
      vinSn: "6HGBH41JXMN109191",
      safetyStatus: "Pending",
      status: true,
      dispatcher: "YPR27",
      trailer: "114",
      driver: "Jessica Martinez",
    },
    {
      id: 7,
      type: "Vehicle",
      name: "VIN789012",
      vinSn: "7HGBH41JXMN109192",
      safetyStatus: "Pass",
      status: true,
      dispatcher: "YPR28",
      trailer: "115",
      driver: "Robert Taylor",
    },
    {
      id: 8,
      type: "Vehicle",
      name: "VIN890123",
      vinSn: "8HGBH41JXMN109193",
      safetyStatus: "Fail",
      status: false,
      dispatcher: "YPR29",
      trailer: "116",
      driver: "Amanda Anderson",
    },
    {
      id: 9,
      type: "Vehicle",
      name: "VIN901234",
      vinSn: "9HGBH41JXMN109194",
      safetyStatus: "Pass",
      status: true,
      dispatcher: "YPR30",
      trailer: "117",
      driver: "James Thomas",
    },
    {
      id: 10,
      type: "Vehicle",
      name: "VIN012345",
      vinSn: "0HGBH41JXMN109195",
      safetyStatus: "Pass",
      status: true,
      dispatcher: "YPR31",
      trailer: "118",
      driver: "Jennifer Garcia",
    },
    {
      id: 11,
      type: "Vehicle",
      name: "VIN112233",
      vinSn: "1HGBH41JXMN109196",
      safetyStatus: "Pass",
      status: true,
      dispatcher: "YPR32",
      trailer: "119",
      driver: "Christopher Lee",
    },
    {
      id: 12,
      type: "Vehicle",
      name: "VIN223344",
      vinSn: "2HGBH41JXMN109197",
      safetyStatus: "Pending",
      status: true,
      dispatcher: "YPR33",
      trailer: "120",
      driver: "Ashley Harris",
    },
    {
      id: 13,
      type: "Vehicle",
      name: "VIN334455",
      vinSn: "3HGBH41JXMN109198",
      safetyStatus: "Pass",
      status: true,
      dispatcher: "YPR34",
      trailer: "121",
      driver: "Matthew Clark",
    },
    {
      id: 14,
      type: "Vehicle",
      name: "VIN445566",
      vinSn: "4HGBH41JXMN109199",
      safetyStatus: "Fail",
      status: false,
      dispatcher: "YPR35",
      trailer: "122",
      driver: "Brittany Lewis",
    },
    {
      id: 15,
      type: "Vehicle",
      name: "VIN556677",
      vinSn: "5HGBH41JXMN109200",
      safetyStatus: "Pass",
      status: true,
      dispatcher: "YPR36",
      trailer: "123",
      driver: "Daniel Robinson",
    },
    {
      id: 16,
      type: "Vehicle",
      name: "VIN667788",
      vinSn: "6HGBH41JXMN109201",
      safetyStatus: "Pass",
      status: true,
      dispatcher: "YPR37",
      trailer: "124",
      driver: "Samantha Walker",
    },
    {
      id: 17,
      type: "Vehicle",
      name: "VIN778899",
      vinSn: "7HGBH41JXMN109202",
      safetyStatus: "Pass",
      status: true,
      dispatcher: "YPR38",
      trailer: "125",
      driver: "Andrew Young",
    },
    {
      id: 18,
      type: "Vehicle",
      name: "VIN889900",
      vinSn: "8HGBH41JXMN109203",
      safetyStatus: "Pending",
      status: true,
      dispatcher: "YPR39",
      trailer: "126",
      driver: "Megan Allen",
    },
    {
      id: 19,
      type: "Vehicle",
      name: "VIN990011",
      vinSn: "9HGBH41JXMN109204",
      safetyStatus: "Pass",
      status: true,
      dispatcher: "YPR40",
      trailer: "127",
      driver: "Joshua King",
    },
    {
      id: 20,
      type: "Vehicle",
      name: "VIN001122",
      vinSn: "0HGBH41JXMN109205",
      safetyStatus: "Fail",
      status: false,
      dispatcher: "YPR41",
      trailer: "128",
      driver: "Lauren Wright",
    },
    {
      id: 21,
      type: "Vehicle",
      name: "VIN112244",
      vinSn: "1HGBH41JXMN109206",
      safetyStatus: "Pass",
      status: true,
      dispatcher: "YPR42",
      trailer: "129",
      driver: "Ryan Scott",
    },
    {
      id: 22,
      type: "Vehicle",
      name: "VIN223355",
      vinSn: "2HGBH41JXMN109207",
      safetyStatus: "Pass",
      status: true,
      dispatcher: "YPR43",
      trailer: "130",
      driver: "Kayla Green",
    },
    {
      id: 23,
      type: "Vehicle",
      name: "VIN334466",
      vinSn: "3HGBH41JXMN109208",
      safetyStatus: "Pass",
      status: true,
      dispatcher: "YPR44",
      trailer: "131",
      driver: "Brandon Adams",
    },
    {
      id: 24,
      type: "Vehicle",
      name: "VIN445577",
      vinSn: "4HGBH41JXMN109209",
      safetyStatus: "Pending",
      status: true,
      dispatcher: "YPR45",
      trailer: "132",
      driver: "Nicole Baker",
    },
    {
      id: 25,
      type: "Vehicle",
      name: "VIN556688",
      vinSn: "5HGBH41JXMN109210",
      safetyStatus: "Pass",
      status: true,
      dispatcher: "YPR46",
      trailer: "133",
      driver: "Tyler Nelson",
    },
    // Trailers (25 entries)
    {
      id: 26,
      type: "Trailer",
      name: "TRAIL123456",
      vinSn: "1T9BH41JXMN109186",
      licensePlate: "TRL-1001",
      fleetType: "TMF",
      group: "TMF-Central",
      safetyStatus: "Pass",
      owner: "John Smith",
    },
    {
      id: 27,
      type: "Trailer",
      name: "TRAIL234567",
      vinSn: "2T9BH41JXMN109187",
      licensePlate: "TRL-1002",
      fleetType: "Flatbed",
      group: "TMF-Gulf Coast",
      safetyStatus: "Pass",
      owner: "Sarah Johnson",
    },
    {
      id: 28,
      type: "Trailer",
      name: "TRAIL345678",
      vinSn: "3T9BH41JXMN109188",
      licensePlate: "TRL-1003",
      fleetType: "TMF",
      group: "TMF-Mid South",
      safetyStatus: "Fail",
      owner: "Michael Brown",
    },
    {
      id: 29,
      type: "Trailer",
      name: "TRAIL456789",
      vinSn: "4T9BH41JXMN109189",
      licensePlate: "TRL-1004",
      fleetType: "Aggregate",
      group: "TMF-North",
      safetyStatus: "Pass",
      owner: "Emily Davis",
    },
    {
      id: 30,
      type: "Trailer",
      name: "TRAIL567890",
      vinSn: "5T9BH41JXMN109190",
      licensePlate: "TRL-1005",
      fleetType: "Heavy Haul",
      group: "TMF-Central",
      safetyStatus: "Pass",
      owner: "David Wilson",
    },
    {
      id: 31,
      type: "Trailer",
      name: "TRAIL678901",
      vinSn: "6T9BH41JXMN109191",
      licensePlate: "TRL-1006",
      fleetType: "TMF",
      group: "TMF-Gulf Coast",
      safetyStatus: "Pending",
      owner: "Jessica Martinez",
    },
    {
      id: 32,
      type: "Trailer",
      name: "TRAIL789012",
      vinSn: "7T9BH41JXMN109192",
      licensePlate: "TRL-1007",
      fleetType: "Flatbed",
      group: "TMF-Mid South",
      safetyStatus: "Pass",
      owner: "Robert Taylor",
    },
    {
      id: 33,
      type: "Trailer",
      name: "TRAIL890123",
      vinSn: "8T9BH41JXMN109193",
      licensePlate: "TRL-1008",
      fleetType: "TMF",
      group: "TMF-North",
      safetyStatus: "Fail",
      owner: "Amanda Anderson",
    },
    {
      id: 34,
      type: "Trailer",
      name: "TRAIL901234",
      vinSn: "9T9BH41JXMN109194",
      licensePlate: "TRL-1009",
      fleetType: "Aggregate",
      group: "TMF-Central",
      safetyStatus: "Pass",
      owner: "James Thomas",
    },
    {
      id: 35,
      type: "Trailer",
      name: "TRAIL012345",
      vinSn: "0T9BH41JXMN109195",
      licensePlate: "TRL-1010",
      fleetType: "Heavy Haul",
      group: "TMF-Gulf Coast",
      safetyStatus: "Pass",
      owner: "Jennifer Garcia",
    },
    {
      id: 36,
      type: "Trailer",
      name: "TRAIL112233",
      vinSn: "1T9BH41JXMN109196",
      licensePlate: "TRL-1011",
      fleetType: "TMF",
      group: "TMF-Mid South",
      safetyStatus: "Pass",
      owner: "Christopher Lee",
    },
    {
      id: 37,
      type: "Trailer",
      name: "TRAIL223344",
      vinSn: "2T9BH41JXMN109197",
      licensePlate: "TRL-1012",
      fleetType: "Flatbed",
      group: "TMF-North",
      safetyStatus: "Pending",
      owner: "Ashley Harris",
    },
    {
      id: 38,
      type: "Trailer",
      name: "TRAIL334455",
      vinSn: "3T9BH41JXMN109198",
      licensePlate: "TRL-1013",
      fleetType: "TMF",
      group: "TMF-Central",
      safetyStatus: "Pass",
      owner: "Matthew Clark",
    },
    {
      id: 39,
      type: "Trailer",
      name: "TRAIL445566",
      vinSn: "4T9BH41JXMN109199",
      licensePlate: "TRL-1014",
      fleetType: "Aggregate",
      group: "TMF-Gulf Coast",
      safetyStatus: "Fail",
      owner: "Brittany Lewis",
    },
    {
      id: 40,
      type: "Trailer",
      name: "TRAIL556677",
      vinSn: "5T9BH41JXMN109200",
      licensePlate: "TRL-1015",
      fleetType: "Heavy Haul",
      group: "TMF-Mid South",
      safetyStatus: "Pass",
      owner: "Daniel Robinson",
    },
    {
      id: 41,
      type: "Trailer",
      name: "TRAIL667788",
      vinSn: "6T9BH41JXMN109201",
      licensePlate: "TRL-1016",
      fleetType: "TMF",
      group: "TMF-North",
      safetyStatus: "Pass",
      owner: "Samantha Walker",
    },
    {
      id: 42,
      type: "Trailer",
      name: "TRAIL778899",
      vinSn: "7T9BH41JXMN109202",
      licensePlate: "TRL-1017",
      fleetType: "Flatbed",
      group: "TMF-Central",
      safetyStatus: "Pass",
      owner: "Andrew Young",
    },
    {
      id: 43,
      type: "Trailer",
      name: "TRAIL889900",
      vinSn: "8T9BH41JXMN109203",
      licensePlate: "TRL-1018",
      fleetType: "TMF",
      group: "TMF-Gulf Coast",
      safetyStatus: "Pending",
      owner: "Megan Allen",
    },
    {
      id: 44,
      type: "Trailer",
      name: "TRAIL990011",
      vinSn: "9T9BH41JXMN109204",
      licensePlate: "TRL-1019",
      fleetType: "Aggregate",
      group: "TMF-Mid South",
      safetyStatus: "Pass",
      owner: "Joshua King",
    },
    {
      id: 45,
      type: "Trailer",
      name: "TRAIL001122",
      vinSn: "0T9BH41JXMN109205",
      licensePlate: "TRL-1020",
      fleetType: "Heavy Haul",
      group: "TMF-North",
      safetyStatus: "Fail",
      owner: "Lauren Wright",
    },
    {
      id: 46,
      type: "Trailer",
      name: "TRAIL112244",
      vinSn: "1T9BH41JXMN109206",
      licensePlate: "TRL-1021",
      fleetType: "TMF",
      group: "TMF-Central",
      safetyStatus: "Pass",
      owner: "Ryan Scott",
    },
    {
      id: 47,
      type: "Trailer",
      name: "TRAIL223355",
      vinSn: "2T9BH41JXMN109207",
      licensePlate: "TRL-1022",
      fleetType: "Flatbed",
      group: "TMF-Gulf Coast",
      safetyStatus: "Pass",
      owner: "Kayla Green",
    },
    {
      id: 48,
      type: "Trailer",
      name: "TRAIL334466",
      vinSn: "3T9BH41JXMN109208",
      licensePlate: "TRL-1023",
      fleetType: "TMF",
      group: "TMF-Mid South",
      safetyStatus: "Pass",
      owner: "Brandon Adams",
    },
    {
      id: 49,
      type: "Trailer",
      name: "TRAIL445577",
      vinSn: "4T9BH41JXMN109209",
      licensePlate: "TRL-1024",
      fleetType: "Aggregate",
      group: "TMF-North",
      safetyStatus: "Pending",
      owner: "Nicole Baker",
    },
    {
      id: 50,
      type: "Trailer",
      name: "TRAIL556688",
      vinSn: "5T9BH41JXMN109210",
      licensePlate: "TRL-1025",
      fleetType: "Heavy Haul",
      group: "TMF-Central",
      safetyStatus: "Pass",
      owner: "Tyler Nelson",
    },
  ];

  const getSafetyStatusBadgeColor = (status) => {
    const colors = {
      Pass: "bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50",
      Fail: "bg-red-500/10 hover:bg-red-500/30 text-red-700 dark:text-red-400 border border-red-500/50",
      Pending:
        "bg-yellow-500/10 hover:bg-yellow-500/30 text-yellow-700 dark:text-yellow-400 border border-yellow-500/50",
    };
    return (
      colors[status] ||
      "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50"
    );
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
      licensePlate: "",
      year: "",
      model: "",
      fleetType: "",
      group: "",
      make: "",
      registrationDocuments: null,
      vehicleImages: null,
      operator: "",
      safetyStatus: "",
      reason: "",
      color: "",
      ownership: "",
      dispatcher: "",
      trailer: "",
      type: "",
      msrp: "",
      bodyType: "",
      bodySubtype: "",
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
      licensePlate: "",
      year: "",
      model: "",
      fleetType: "",
      group: "",
      make: "",
      registrationDocuments: null,
      trailerImages: null,
      color: "",
      ownership: "",
      safetyStatus: "",
      reason: "",
      type: "",
      msrp: "",
      bodyType: "",
      bodySubtype: "",
    });
  };

  const handleVehicleCancel = () => {
    setIsVehicleSheetOpen(false);
    setVehicleFormData({
      vehicleName: "",
      vinSn: "",
      licensePlate: "",
      year: "",
      model: "",
      fleetType: "",
      group: "",
      make: "",
      registrationDocuments: null,
      vehicleImages: null,
      operator: "",
      safetyStatus: "",
      reason: "",
      color: "",
      ownership: "",
      dispatcher: "",
      trailer: "",
      type: "",
      msrp: "",
      bodyType: "",
      bodySubtype: "",
    });
  };

  const handleTrailerCancel = () => {
    setIsTrailerSheetOpen(false);
    setTrailerFormData({
      trailerName: "",
      vinSn: "",
      licensePlate: "",
      year: "",
      model: "",
      fleetType: "",
      group: "",
      make: "",
      registrationDocuments: null,
      trailerImages: null,
      color: "",
      ownership: "",
      safetyStatus: "",
      reason: "",
      type: "",
      msrp: "",
      bodyType: "",
      bodySubtype: "",
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
            <DropdownMenuItem
              onClick={() =>
                navigate(
                  "/app/carrier-portal/master/assets/vehicle-details?tab=general"
                )
              }
            >
              General
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate(
                  "/app/carrier-portal/master/assets/vehicle-details?tab=equipment"
                )
              }
            >
              Equipment
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate(
                  "/app/carrier-portal/master/assets/vehicle-details?tab=allocation"
                )
              }
            >
              Allocation
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate(
                  "/app/carrier-portal/master/assets/vehicle-details?tab=comments"
                )
              }
            >
              Comments
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate(
                  "/app/carrier-portal/master/assets/vehicle-details?tab=audit"
                )
              }
            >
              Audit Log
            </DropdownMenuItem>
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
            <DropdownMenuItem
              onClick={() =>
                navigate(
                  "/app/carrier-portal/master/assets/trailer-details?tab=general"
                )
              }
            >
              General
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate(
                  "/app/carrier-portal/master/assets/trailer-details?tab=comments"
                )
              }
            >
              Comments
            </DropdownMenuItem>
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
      accessorKey: "licensePlate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="License Plate" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "fleetType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fleet Type" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "group",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Group" />
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
      accessorKey: "owner",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Owner" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
  ];

  // Get filtered data and columns based on active tab
  const filteredData = assets.filter((asset) =>
    activeTab === "vehicle"
      ? asset.type === "Vehicle"
      : asset.type === "Trailer"
  );
  const currentColumns =
    activeTab === "vehicle" ? vehicleColumns : trailerColumns;

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
        <DataTable
          columns={currentColumns}
          data={filteredData}
          showViewOptions={false}
        />
      </div>

      {/* Add Vehicle Sheet */}
      <Sheet open={isVehicleSheetOpen} onOpenChange={setIsVehicleSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-3xl overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <div className="flex items-center gap-3">
              <div>
                <SheetTitle className="text-xl font-bold">
                  Add Vehicle
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>

          <form
            onSubmit={handleVehicleSubmit}
            className="space-y-5 mt-4 mb-2 px-6"
          >
            {/* Vehicle Name with Search Samsara */}
            <div className="space-y-2">
              <Label htmlFor="vehicleName">
                Vehicle Name <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id="vehicleName"
                  type="text"
                  placeholder="Enter Vehicle Name"
                  value={vehicleFormData.vehicleName}
                  onChange={(e) =>
                    handleVehicleInputChange("vehicleName", e.target.value)
                  }
                  className="h-10 flex-1"
                  required
                />
                <Button type="button" variant="outline" className="h-10">
                  Search Samsara
                </Button>
              </div>
            </div>

            {/* VIN/SN and License Plate */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vinSn">
                  VIN/SN <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="vinSn"
                  type="text"
                  placeholder="Enter VIN/SN"
                  value={vehicleFormData.vinSn}
                  onChange={(e) =>
                    handleVehicleInputChange("vinSn", e.target.value)
                  }
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licensePlate">
                  License Plate <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="licensePlate"
                  type="text"
                  placeholder="Enter license plate"
                  value={vehicleFormData.licensePlate}
                  onChange={(e) =>
                    handleVehicleInputChange("licensePlate", e.target.value)
                  }
                  className="h-10"
                  required
                />
              </div>
            </div>

            {/* Year and Model */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">
                  Year <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="year"
                  type="text"
                  placeholder="Enter Year"
                  value={vehicleFormData.year}
                  onChange={(e) =>
                    handleVehicleInputChange("year", e.target.value)
                  }
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">
                  Model <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="model"
                  type="text"
                  placeholder="Enter Model"
                  value={vehicleFormData.model}
                  onChange={(e) =>
                    handleVehicleInputChange("model", e.target.value)
                  }
                  className="h-10"
                  required
                />
              </div>
            </div>

            {/* Fleet Type and Group */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fleetType">
                  Fleet Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={vehicleFormData.fleetType}
                  onValueChange={(value) =>
                    handleVehicleInputChange("fleetType", value)
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select Fleet Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TMF">TMF</SelectItem>
                    <SelectItem value="Flatbed">Flatbed</SelectItem>
                    <SelectItem value="Aggregate">Aggregate</SelectItem>
                    <SelectItem value="Heavy Haul">Heavy Haul</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="group">
                  Group <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={vehicleFormData.group}
                  onValueChange={(value) =>
                    handleVehicleInputChange("group", value)
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TMF-Central">TMF-Central</SelectItem>
                    <SelectItem value="TMF-Gulf Coast">TMF-Gulf Coast</SelectItem>
                    <SelectItem value="TMF-Mid South">TMF-Mid South</SelectItem>
                    <SelectItem value="TMF-North">TMF-North</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Make and Registration Documents */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make">
                  Make <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="make"
                  type="text"
                  placeholder="Enter Make"
                  value={vehicleFormData.make}
                  onChange={(e) =>
                    handleVehicleInputChange("make", e.target.value)
                  }
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationDocuments">
                  Registration Documents <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="registrationDocuments"
                  type="file"
                  onChange={(e) =>
                    handleVehicleInputChange("registrationDocuments", e.target.files[0])
                  }
                  className="h-10"
                />
              </div>
            </div>

            {/* Vehicle Images */}
            <div className="space-y-2">
              <Label htmlFor="vehicleImages">
                Vehicle Images <span className="text-red-500">*</span>
              </Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm">
                  <span className="text-primary font-medium">Click to upload</span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  SVG, PNG, JPG or GIF (MAX. 800×400px)
                </p>
                <Input
                  id="vehicleImages"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleVehicleInputChange("vehicleImages", e.target.files[0])
                  }
                  className="hidden"
                />
              </div>
            </div>

            {/* Operator */}
            <div className="space-y-2">
              <Label htmlFor="operator">Operator</Label>
              <div className="relative">
                <Input
                  id="operator"
                  type="text"
                  placeholder="Select Operator"
                  value={vehicleFormData.operator}
                  onChange={(e) =>
                    handleVehicleInputChange("operator", e.target.value)
                  }
                  className="h-10 pr-10"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Safety Status and Reason */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="safetyStatus">
                  Safety Status <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={vehicleFormData.safetyStatus}
                  onValueChange={(value) =>
                    handleVehicleInputChange("safetyStatus", value)
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select Safety Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="In Shop">In Shop</SelectItem>
                    <SelectItem value="Out of Service">Out of Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">
                  Reason <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={vehicleFormData.reason}
                  onValueChange={(value) =>
                    handleVehicleInputChange("reason", value)
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Please select one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Safety Shutdown - Call Safety">Safety Shutdown - Call Safety</SelectItem>
                    <SelectItem value="Monthly Maintenance">Monthly Maintenance</SelectItem>
                    <SelectItem value="Tag Expired">Tag Expired</SelectItem>
                    <SelectItem value="DOT Inspected Expired">DOT Inspected Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Color and Ownership */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  type="text"
                  placeholder="Enter Color"
                  value={vehicleFormData.color}
                  onChange={(e) =>
                    handleVehicleInputChange("color", e.target.value)
                  }
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownership">
                  Ownership <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={vehicleFormData.ownership}
                  onValueChange={(value) =>
                    handleVehicleInputChange("ownership", value)
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Please select one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Owned">Owned</SelectItem>
                    <SelectItem value="Leased">Leased</SelectItem>
                    <SelectItem value="Rented">Rented</SelectItem>
                    <SelectItem value="Customer">Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dispatcher and Trailer */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dispatcher">Dispatcher</Label>
                <div className="relative">
                  <Input
                    id="dispatcher"
                    type="text"
                    placeholder="Select Dispatcher"
                    value={vehicleFormData.dispatcher}
                    onChange={(e) =>
                      handleVehicleInputChange("dispatcher", e.target.value)
                    }
                    className="h-10 pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="trailer">Trailer</Label>
                <div className="relative">
                  <Input
                    id="trailer"
                    type="text"
                    placeholder="Select Trailer"
                    value={vehicleFormData.trailer}
                    onChange={(e) =>
                      handleVehicleInputChange("trailer", e.target.value)
                    }
                    className="h-10 pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Type and MSRP */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">
                  Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={vehicleFormData.type}
                  onValueChange={(value) =>
                    handleVehicleInputChange("type", value)
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Please select one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Semi Truck">Semi Truck</SelectItem>
                    <SelectItem value="Box Truck">Box Truck</SelectItem>
                    <SelectItem value="Car">Car</SelectItem>
                    <SelectItem value="Dump Truck">Dump Truck</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="msrp">MSRP</Label>
                <Input
                  id="msrp"
                  type="text"
                  placeholder="Enter MSRP"
                  value={vehicleFormData.msrp}
                  onChange={(e) =>
                    handleVehicleInputChange("msrp", e.target.value)
                  }
                  className="h-10"
                />
              </div>
            </div>

            {/* Body Type and Body Subtype */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bodyType">
                  Body Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={vehicleFormData.bodyType}
                  onValueChange={(value) =>
                    handleVehicleInputChange("bodyType", value)
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Please select one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Car Over Engine">Car Over Engine</SelectItem>
                    <SelectItem value="Chassis">Chassis</SelectItem>
                    <SelectItem value="Conventional">Conventional</SelectItem>
                    <SelectItem value="Pickup">Pickup</SelectItem>
                    <SelectItem value="Sleeper">Sleeper</SelectItem>
                    <SelectItem value="Sleeper Cab">Sleeper Cab</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bodySubtype">Body Subtype</Label>
                <Input
                  id="bodySubtype"
                  type="text"
                  placeholder="Enter Body Subtype"
                  value={vehicleFormData.bodySubtype}
                  onChange={(e) =>
                    handleVehicleInputChange("bodySubtype", e.target.value)
                  }
                  className="h-10"
                />
              </div>
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
          className="w-full sm:max-w-3xl overflow-y-auto"
        >
          <SheetHeader className="pb-4 border-b px-6">
            <SheetTitle className="text-xl font-bold">
              Add Trailer
            </SheetTitle>
          </SheetHeader>

          <form
            onSubmit={handleTrailerSubmit}
            className="space-y-5 mt-4 mb-2 px-6"
          >
            {/* Trailer Name with Search Samsara */}
            <div className="space-y-2">
              <Label htmlFor="trailerName">
                Trailer Name <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id="trailerName"
                  type="text"
                  placeholder="Enter Trailer Name"
                  value={trailerFormData.trailerName}
                  onChange={(e) =>
                    handleTrailerInputChange("trailerName", e.target.value)
                  }
                  className="h-10 flex-1"
                  required
                />
                <Button type="button" variant="outline" className="h-10">
                  Search Samsara
                </Button>
              </div>
            </div>

            {/* VIN/SN and License Plate */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trailerVinSn">
                  VIN/SN <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="trailerVinSn"
                  type="text"
                  placeholder="Enter VIN/SN"
                  value={trailerFormData.vinSn}
                  onChange={(e) =>
                    handleTrailerInputChange("vinSn", e.target.value)
                  }
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trailerLicensePlate">
                  License Plate <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="trailerLicensePlate"
                  type="text"
                  placeholder="Enter License Plate"
                  value={trailerFormData.licensePlate}
                  onChange={(e) =>
                    handleTrailerInputChange("licensePlate", e.target.value)
                  }
                  className="h-10"
                  required
                />
              </div>
            </div>

            {/* Year and Model */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trailerYear">
                  Year <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="trailerYear"
                  type="text"
                  placeholder="Enter Year"
                  value={trailerFormData.year}
                  onChange={(e) =>
                    handleTrailerInputChange("year", e.target.value)
                  }
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trailerModel">
                  Model <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="trailerModel"
                  type="text"
                  placeholder="Enter Model"
                  value={trailerFormData.model}
                  onChange={(e) =>
                    handleTrailerInputChange("model", e.target.value)
                  }
                  className="h-10"
                  required
                />
              </div>
            </div>

            {/* Fleet Type and Group */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trailerFleetType">
                  Fleet Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={trailerFormData.fleetType}
                  onValueChange={(value) =>
                    handleTrailerInputChange("fleetType", value)
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select fleet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TMF">TMF</SelectItem>
                    <SelectItem value="Flatbed">Flatbed</SelectItem>
                    <SelectItem value="Aggregate">Aggregate</SelectItem>
                    <SelectItem value="Heavy Haul">Heavy Haul</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="trailerGroup">
                  Group <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={trailerFormData.group}
                  onValueChange={(value) =>
                    handleTrailerInputChange("group", value)
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TMF-Central">TMF-Central</SelectItem>
                    <SelectItem value="TMF-Gulf Coast">TMF-Gulf Coast</SelectItem>
                    <SelectItem value="TMF-Mid South">TMF-Mid South</SelectItem>
                    <SelectItem value="TMF-North">TMF-North</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Make and Registration Documents */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trailerMake">
                  Make <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="trailerMake"
                  type="text"
                  placeholder="Enter Make"
                  value={trailerFormData.make}
                  onChange={(e) =>
                    handleTrailerInputChange("make", e.target.value)
                  }
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trailerRegistrationDocuments">
                  Registration Documents
                </Label>
                <Input
                  id="trailerRegistrationDocuments"
                  type="file"
                  onChange={(e) =>
                    handleTrailerInputChange("registrationDocuments", e.target.files[0])
                  }
                  className="h-10"
                />
              </div>
            </div>

            {/* Upload File (Trailer Images) */}
            <div className="space-y-2">
              <Label htmlFor="trailerImages">Upload file</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm">
                  <span className="text-primary font-medium">Click to upload</span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  SVG, PNG, JPG or GIF (MAX. 800×400px)
                </p>
                <Input
                  id="trailerImages"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleTrailerInputChange("trailerImages", e.target.files[0])
                  }
                  className="hidden"
                />
              </div>
            </div>

            {/* Color and Ownership */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trailerColor">Color</Label>
                <Input
                  id="trailerColor"
                  type="text"
                  placeholder="Enter Color"
                  value={trailerFormData.color}
                  onChange={(e) =>
                    handleTrailerInputChange("color", e.target.value)
                  }
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trailerOwnership">
                  Ownership <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={trailerFormData.ownership}
                  onValueChange={(value) =>
                    handleTrailerInputChange("ownership", value)
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select ownership" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Owned">Owned</SelectItem>
                    <SelectItem value="Leased">Leased</SelectItem>
                    <SelectItem value="Rented">Rented</SelectItem>
                    <SelectItem value="Customer">Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Safety Status and Reason */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trailerSafetyStatus">
                  Safety Status <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={trailerFormData.safetyStatus}
                  onValueChange={(value) =>
                    handleTrailerInputChange("safetyStatus", value)
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select safety status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="In Shop">In Shop</SelectItem>
                    <SelectItem value="Out of Service">Out of Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="trailerReason">
                  Reason <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={trailerFormData.reason}
                  onValueChange={(value) =>
                    handleTrailerInputChange("reason", value)
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Safety Shutdown - Call Safety">Safety Shutdown - Call Safety</SelectItem>
                    <SelectItem value="Monthly Maintenance">Monthly Maintenance</SelectItem>
                    <SelectItem value="Tag Expired">Tag Expired</SelectItem>
                    <SelectItem value="DOT Inspected Expired">DOT Inspected Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Type and MSRP */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trailerType">
                  Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={trailerFormData.type}
                  onValueChange={(value) =>
                    handleTrailerInputChange("type", value)
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Drop Deck Trailer">Drop Deck Trailer</SelectItem>
                    <SelectItem value="Dump Trailer">Dump Trailer</SelectItem>
                    <SelectItem value="Flatbed Trailer">Flatbed Trailer</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="trailerMsrp">MSRP</Label>
                <Input
                  id="trailerMsrp"
                  type="text"
                  placeholder="Enter MSRP"
                  value={trailerFormData.msrp}
                  onChange={(e) =>
                    handleTrailerInputChange("msrp", e.target.value)
                  }
                  className="h-10"
                />
              </div>
            </div>

            {/* Body Type and Body Subtype */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trailerBodyType">Body Type</Label>
                <Select
                  value={trailerFormData.bodyType}
                  onValueChange={(value) =>
                    handleTrailerInputChange("bodyType", value)
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cab Over Engine">Cab Over Engine</SelectItem>
                    <SelectItem value="Chassis">Chassis</SelectItem>
                    <SelectItem value="Conventional">Conventional</SelectItem>
                    <SelectItem value="Pickup">Pickup</SelectItem>
                    <SelectItem value="Sleeper">Sleeper</SelectItem>
                    <SelectItem value="Sleeper Cab">Sleeper Cab</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="trailerBodySubtype">Body Subtype</Label>
                <Input
                  id="trailerBodySubtype"
                  type="text"
                  placeholder="Enter Body Subtype"
                  value={trailerFormData.bodySubtype}
                  onChange={(e) =>
                    handleTrailerInputChange("bodySubtype", e.target.value)
                  }
                  className="h-10"
                />
              </div>
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
