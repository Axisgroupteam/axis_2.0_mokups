import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import GanttChartView from "@/components/GanttChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SmartFilter from "@/components/SmartFilter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  MoreHorizontal,
  Eye,
  MapPin,
  Calendar,
  Truck,
  FileText,
  CheckIcon,
  ChevronsUpDownIcon,
  Plus,
  Send,
  Sparkles,
  Settings,
  DollarSign,
  ShoppingCart,
  History,
  LayoutList,
  GanttChart,
  User,
  Package,
  Clock,
  Phone,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Planning = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [viewType, setViewType] = useState("table"); // "table" or "gantt"

  // Popover open states
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [commodityOpen, setCommodityOpen] = useState(false);
  const [pickupLocationOpen, setPickupLocationOpen] = useState(false);
  const [dropOffLocationOpen, setDropOffLocationOpen] = useState(false);

  // Collapsible section states
  const [isPickupExpanded, setIsPickupExpanded] = useState(false);
  const [isDropOffExpanded, setIsDropOffExpanded] = useState(false);

  // Add location modal state
  const [isAddLocationModalOpen, setIsAddLocationModalOpen] = useState(false);

  // Dispatch modal state
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [selectedLoadsForDispatch, setSelectedLoadsForDispatch] = useState([]);
  const [locationTypeToAdd, setLocationTypeToAdd] = useState(null); // 'pickup' or 'dropoff'
  const [newLocationData, setNewLocationData] = useState({
    code: "",
    name: "",
    contact: "",
    phone: "",
    email: "",
    address: "",
    latitude: "",
    longitude: "",
    state: "",
    city: "",
    zipCode: "",
  });

  // Form data state
  const [formData, setFormData] = useState({
    vehicle: "",
    customer: "",
    commodity: "",
    pickupLocation: "",
    pickupDate: "",
    dropOffLocation: "",
    dropOffDate: "",
  });

  // Options for searchable selects
  // status: 'available' (green), 'partial' (orange), 'unavailable' (red/rose)
  const vehicles = [
    {
      value: "TRK-2847",
      label: "TRK-2847",
      loads: 2,
      assigned: 0,
      revenue: 1849.12,
      expense: 0,
      status: "unavailable",
    },
    {
      value: "TRK-1923",
      label: "TRK-1923",
      loads: 5,
      assigned: 2,
      revenue: 3250.0,
      expense: 450.0,
      status: "partial",
    },
    {
      value: "TRK-4521",
      label: "TRK-4521",
      loads: 3,
      assigned: 1,
      revenue: 2100.5,
      expense: 125.0,
      status: "partial",
    },
    {
      value: "TRK-7734",
      label: "TRK-7734",
      loads: 4,
      assigned: 0,
      revenue: 4500.0,
      expense: 0,
      status: "available",
    },
    {
      value: "TRK-3356",
      label: "TRK-3356",
      loads: 1,
      assigned: 1,
      revenue: 950.0,
      expense: 200.0,
      status: "unavailable",
    },
    {
      value: "TRK-5589",
      label: "TRK-5589",
      loads: 6,
      assigned: 3,
      revenue: 5200.0,
      expense: 780.0,
      status: "available",
    },
    {
      value: "TRK-6612",
      label: "TRK-6612",
      loads: 2,
      assigned: 0,
      revenue: 1600.0,
      expense: 0,
      status: "partial",
    },
    {
      value: "TRK-8845",
      label: "TRK-8845",
      loads: 3,
      assigned: 2,
      revenue: 2800.0,
      expense: 350.0,
      status: "available",
    },
  ];

  const getVehicleStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "partial":
        return "bg-orange-500";
      case "unavailable":
        return "bg-rose-500";
      default:
        return "bg-gray-400";
    }
  };

  const customers = [
    { value: "Titan", label: "Titan" },
    { value: "Ashgrove", label: "Ashgrove" },
    { value: "TQL", label: "TQL" },
    { value: "Coyote", label: "Coyote" },
    { value: "CH Robinson", label: "CH Robinson" },
  ];

  const commodities = [
    { value: "Cement", label: "Cement" },
    { value: "Sand", label: "Sand" },
    { value: "Flyash", label: "Flyash" },
    { value: "Aggregate", label: "Aggregate" },
    { value: "Limestone", label: "Limestone" },
    { value: "Gravel", label: "Gravel" },
  ];

  const locations = [
    {
      value: "1234 Industrial Blvd, Houston, TX 77001",
      label: "1234 Industrial Blvd, Houston, TX 77001",
    },
    {
      value: "5678 Commerce St, Dallas, TX 75201",
      label: "5678 Commerce St, Dallas, TX 75201",
    },
    {
      value: "890 Quarry Rd, Austin, TX 78701",
      label: "890 Quarry Rd, Austin, TX 78701",
    },
    {
      value: "234 Construction Ave, San Antonio, TX 78201",
      label: "234 Construction Ave, San Antonio, TX 78201",
    },
    {
      value: "567 Sand Pit Ln, Fort Worth, TX 76101",
      label: "567 Sand Pit Ln, Fort Worth, TX 76101",
    },
    {
      value: "789 Steel Works Dr, El Paso, TX 79901",
      label: "789 Steel Works Dr, El Paso, TX 79901",
    },
    {
      value: "1010 Builder Way, Oklahoma City, OK 73101",
      label: "1010 Builder Way, Oklahoma City, OK 73101",
    },
    {
      value: "456 Industrial Park, Phoenix, AZ 85001",
      label: "456 Industrial Park, Phoenix, AZ 85001",
    },
    {
      value: "654 Cement Factory Ln, Little Rock, AR 72201",
      label: "654 Cement Factory Ln, Little Rock, AR 72201",
    },
    {
      value: "222 Road Project Site, Corpus Christi, TX 78401",
      label: "222 Road Project Site, Corpus Christi, TX 78401",
    },
    {
      value: "444 Grain Elevator St, Amarillo, TX 79101",
      label: "444 Grain Elevator St, Amarillo, TX 79101",
    },
    {
      value: "333 Farm Co-op Rd, Lubbock, TX 79401",
      label: "333 Farm Co-op Rd, Lubbock, TX 79401",
    },
    {
      value: "666 Construction Site, New Orleans, LA 70112",
      label: "666 Construction Site, New Orleans, LA 70112",
    },
  ];

  const handleLoadClick = (load) => {
    navigate(`/app/carrier-portal/orders/bulk/planning/load-details?id=${load.loadNo}`);
  };

  const handleOpenEditSheet = (load) => {
    setSelectedLoad(load);
    setFormData({
      vehicle: load.vehicle || "",
      customer: load.customer || "",
      commodity: load.commodity || "",
      pickupLocation: load.pickup || "",
      pickupDate: load.pickupDate || "",
      dropOffLocation: load.dropOff || "",
      dropOffDate: load.dropOffDate || "",
    });
    setIsDetailSheetOpen(true);
  };

  const handleSave = () => {
    // Handle save logic
    console.log("Saving:", formData);
    setIsDetailSheetOpen(false);
  };

  const handleOpenAddLocationModal = (type) => {
    setLocationTypeToAdd(type);
    setNewLocationData({
      code: "",
      name: "",
      contact: "",
      phone: "",
      email: "",
      address: "",
      latitude: "",
      longitude: "",
      state: "",
      city: "",
      zipCode: "",
    });
    setPickupLocationOpen(false);
    setDropOffLocationOpen(false);
    setIsAddLocationModalOpen(true);
  };

  const handleSaveNewLocation = () => {
    const fullAddress = `${newLocationData.address}, ${newLocationData.city}, ${newLocationData.state} ${newLocationData.zipCode}`;

    if (locationTypeToAdd === "pickup") {
      setFormData({ ...formData, pickupLocation: fullAddress });
    } else if (locationTypeToAdd === "dropoff") {
      setFormData({ ...formData, dropOffLocation: fullAddress });
    }

    setIsAddLocationModalOpen(false);
    setNewLocationData({
      code: "",
      name: "",
      contact: "",
      phone: "",
      email: "",
      address: "",
      latitude: "",
      longitude: "",
      state: "",
      city: "",
      zipCode: "",
    });
  };

  // Filter configuration
  const filterGroups = [
    {
      id: "planning-filters",
      label: "Filter Orders",
      filters: [
        {
          key: "time",
          label: "Time",
          type: "select",
          group: "Basic",
          static: true,
          defaultValue: "actual",
          options: [
            { value: "expired", label: "Expired" },
            { value: "actual", label: "Actual" },
            { value: "next", label: "Next" },
          ],
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          static: true,
          defaultValue: "all",
          options: [
            { value: "all", label: "All" },
            { value: "open", label: "Open" },
            { value: "assigned", label: "Assigned" },
          ],
        },
        {
          key: "loadNo",
          label: "Load No",
          type: "input",
          group: "Basic",
          placeholder: "Search load number...",
        },
        {
          key: "vehicle",
          label: "Vehicle",
          type: "input",
          group: "Basic",
          placeholder: "Search vehicle...",
        },
        {
          key: "customer",
          label: "Customer",
          type: "select",
          group: "Basic",
          options: [
            { value: "Titan", label: "Titan" },
            { value: "Ashgrove", label: "Ashgrove" },
            { value: "TQL", label: "TQL" },
            { value: "Coyote", label: "Coyote" },
            { value: "CH Robinson", label: "CH Robinson" },
          ],
        },
        {
          key: "customerRegion",
          label: "Customer Region",
          type: "select",
          group: "Basic",
          options: [
            { value: "North", label: "North" },
            { value: "South", label: "South" },
            { value: "East", label: "East" },
            { value: "West", label: "West" },
            { value: "Central", label: "Central" },
          ],
        },
        {
          key: "pickupDate",
          label: "Pickup Date",
          type: "input",
          group: "Basic",
          placeholder: "YYYY-MM-DD",
        },
        {
          key: "commodity",
          label: "Commodity",
          type: "select",
          group: "Basic",
          options: [
            { value: "Cement", label: "Cement" },
            { value: "Sand", label: "Sand" },
            { value: "Flyash", label: "Flyash" },
            { value: "Aggregate", label: "Aggregate" },
            { value: "Limestone", label: "Limestone" },
          ],
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Mock data for Planning (20 records, some without vehicle assigned)
  const planningData = [
    {
      id: 1,
      vehicle: "TRK-2847",
      loadNo: "ML-2025-001245",
      pickUpNo: "PU-78451",
      customer: "Titan",
      customerContractId: "CTR-TIT-2025-001",
      customerRegion: "South",
      pickup: "1234 Industrial Blvd, Houston, TX 77001",
      pickupDate: "2024-12-10",
      pickupContactName: "John Smith",
      pickupPhone: "(713) 555-0101",
      pickupAppointmentTime: "08:00 AM",
      pickupStartTime: "08:00 AM",
      pickupEndTime: "10:00 AM",
      dropOff: "5678 Commerce St, Dallas, TX 75201",
      dropOffDate: "2024-12-10",
      dropOffContactName: "Sarah Johnson",
      dropOffPhone: "(214) 555-0202",
      dropOffAppointmentTime: "02:00 PM",
      dropOffStartTime: "02:00 PM",
      dropOffEndTime: "04:00 PM",
      commodity: "Cement",
      rates: "$1,850.00",
      status: "assigned",
      aiRecommendedVehicle: "TRK-2847",
    },
    {
      id: 2,
      vehicle: "",
      loadNo: "ML-2025-001246",
      pickUpNo: "PU-78452",
      customer: "Ashgrove",
      customerContractId: "CTR-ASH-2025-003",
      customerRegion: "Central",
      pickup: "890 Quarry Rd, Austin, TX 78701",
      pickupDate: "2024-12-10",
      pickupContactName: "Mike Davis",
      pickupPhone: "(512) 555-0303",
      pickupAppointmentTime: "09:00 AM",
      pickupStartTime: "09:00 AM",
      pickupEndTime: "11:00 AM",
      dropOff: "234 Construction Ave, San Antonio, TX 78201",
      dropOffDate: "2024-12-10",
      dropOffContactName: "Lisa Brown",
      dropOffPhone: "(210) 555-0404",
      dropOffAppointmentTime: "01:00 PM",
      dropOffStartTime: "01:00 PM",
      dropOffEndTime: "03:00 PM",
      commodity: "Flyash",
      rates: "$1,200.00",
      status: "open",
      aiRecommendedVehicle: "TRK-7734",
    },
    {
      id: 3,
      vehicle: "TRK-4521",
      loadNo: "MT-2025-001247",
      pickUpNo: "PU-78453",
      customer: "TQL",
      customerContractId: "CTR-TQL-2025-012",
      customerRegion: "North",
      pickup: "567 Sand Pit Ln, Fort Worth, TX 76101",
      pickupDate: "2024-12-11",
      pickupContactName: "Robert Wilson",
      pickupPhone: "(817) 555-0505",
      pickupAppointmentTime: "07:00 AM",
      pickupStartTime: "07:00 AM",
      pickupEndTime: "09:00 AM",
      dropOff: "1010 Builder Way, Oklahoma City, OK 73101",
      dropOffDate: "2024-12-11",
      dropOffContactName: "Emily Garcia",
      dropOffPhone: "(405) 555-0606",
      dropOffAppointmentTime: "03:00 PM",
      dropOffStartTime: "03:00 PM",
      dropOffEndTime: "05:00 PM",
      commodity: "Sand",
      rates: "$2,400.00",
      status: "assigned",
      aiRecommendedVehicle: "TRK-4521",
    },
    {
      id: 4,
      vehicle: "",
      loadNo: "MT-2025-001248",
      pickUpNo: "PU-78454",
      customer: "Coyote",
      customerContractId: "CTR-COY-2025-007",
      customerRegion: "West",
      pickup: "789 Steel Works Dr, El Paso, TX 79901",
      pickupDate: "2024-12-11",
      pickupContactName: "David Martinez",
      pickupPhone: "(915) 555-0707",
      pickupAppointmentTime: "06:00 AM",
      pickupStartTime: "06:00 AM",
      pickupEndTime: "08:00 AM",
      dropOff: "456 Industrial Park, Phoenix, AZ 85001",
      dropOffDate: "2024-12-12",
      dropOffContactName: "Jennifer Lee",
      dropOffPhone: "(602) 555-0808",
      dropOffAppointmentTime: "10:00 AM",
      dropOffStartTime: "10:00 AM",
      dropOffEndTime: "12:00 PM",
      commodity: "Limestone",
      rates: "$3,100.00",
      status: "open",
      aiRecommendedVehicle: "TRK-8845",
    },
    {
      id: 5,
      vehicle: "TRK-3356",
      loadNo: "MT-2025-001249",
      pickUpNo: "PU-78455",
      customer: "CH Robinson",
      customerContractId: "CTR-CHR-2025-019",
      customerRegion: "East",
      pickup: "5678 Commerce St, Dallas, TX 75201",
      pickupDate: "2024-12-12",
      pickupContactName: "Chris Anderson",
      pickupPhone: "(214) 555-0909",
      pickupAppointmentTime: "08:30 AM",
      pickupStartTime: "08:30 AM",
      pickupEndTime: "10:30 AM",
      dropOff: "654 Cement Factory Ln, Little Rock, AR 72201",
      dropOffDate: "2024-12-12",
      dropOffContactName: "Amanda Taylor",
      dropOffPhone: "(501) 555-1010",
      dropOffAppointmentTime: "04:00 PM",
      dropOffStartTime: "04:00 PM",
      dropOffEndTime: "06:00 PM",
      commodity: "Cement",
      rates: "$2,200.00",
      status: "assigned",
      aiRecommendedVehicle: "TRK-3356",
    },
    {
      id: 6,
      vehicle: "TRK-5589",
      loadNo: "ML-2025-001250",
      pickUpNo: "PU-78456",
      customer: "Titan",
      customerContractId: "CTR-TIT-2025-002",
      customerRegion: "South",
      pickup: "234 Construction Ave, San Antonio, TX 78201",
      pickupDate: "2024-12-13",
      pickupContactName: "Kevin Thomas",
      pickupPhone: "(210) 555-1111",
      pickupAppointmentTime: "07:30 AM",
      pickupStartTime: "07:30 AM",
      pickupEndTime: "09:30 AM",
      dropOff: "222 Road Project Site, Corpus Christi, TX 78401",
      dropOffDate: "2024-12-13",
      dropOffContactName: "Michelle White",
      dropOffPhone: "(361) 555-1212",
      dropOffAppointmentTime: "12:00 PM",
      dropOffStartTime: "12:00 PM",
      dropOffEndTime: "02:00 PM",
      commodity: "Aggregate",
      rates: "$950.00",
      status: "assigned",
      aiRecommendedVehicle: "TRK-5589",
    },
    {
      id: 7,
      vehicle: "",
      loadNo: "ML-2025-001251",
      pickUpNo: "PU-78457",
      customer: "Ashgrove",
      customerContractId: "CTR-ASH-2025-004",
      customerRegion: "Central",
      pickup: "333 Farm Co-op Rd, Lubbock, TX 79401",
      pickupDate: "2024-12-13",
      pickupContactName: "Brian Harris",
      pickupPhone: "(806) 555-1313",
      pickupAppointmentTime: "09:00 AM",
      pickupStartTime: "09:00 AM",
      pickupEndTime: "11:00 AM",
      dropOff: "444 Grain Elevator St, Amarillo, TX 79101",
      dropOffDate: "2024-12-13",
      dropOffContactName: "Nicole Clark",
      dropOffPhone: "(806) 555-1414",
      dropOffAppointmentTime: "01:30 PM",
      dropOffStartTime: "01:30 PM",
      dropOffEndTime: "03:30 PM",
      commodity: "Flyash",
      rates: "$800.00",
      status: "open",
      aiRecommendedVehicle: "TRK-6612",
    },
    {
      id: 8,
      vehicle: "TRK-8845",
      loadNo: "MT-2025-001252",
      pickUpNo: "PU-78458",
      customer: "TQL",
      customerContractId: "CTR-TQL-2025-013",
      customerRegion: "East",
      pickup: "1234 Industrial Blvd, Houston, TX 77001",
      pickupDate: "2024-12-14",
      pickupContactName: "Steven Moore",
      pickupPhone: "(713) 555-1515",
      pickupAppointmentTime: "06:30 AM",
      pickupStartTime: "06:30 AM",
      pickupEndTime: "08:30 AM",
      dropOff: "666 Construction Site, New Orleans, LA 70112",
      dropOffDate: "2024-12-15",
      dropOffContactName: "Rachel King",
      dropOffPhone: "(504) 555-1616",
      dropOffAppointmentTime: "11:00 AM",
      dropOffStartTime: "11:00 AM",
      dropOffEndTime: "01:00 PM",
      commodity: "Sand",
      rates: "$2,800.00",
      status: "assigned",
      aiRecommendedVehicle: "TRK-8845",
    },
    {
      id: 9,
      vehicle: "",
      loadNo: "ML-2025-001253",
      pickUpNo: "PU-78459",
      customer: "Titan",
      customerContractId: "CTR-TIT-2025-003",
      customerRegion: "South",
      pickup: "777 Concrete Way, Houston, TX 77002",
      pickupDate: "2024-12-14",
      pickupContactName: "James Wilson",
      pickupPhone: "(713) 555-1717",
      pickupAppointmentTime: "07:00 AM",
      pickupStartTime: "07:00 AM",
      pickupEndTime: "09:00 AM",
      dropOff: "888 Builder Rd, Austin, TX 78702",
      dropOffDate: "2024-12-14",
      dropOffContactName: "Patricia Lee",
      dropOffPhone: "(512) 555-1818",
      dropOffAppointmentTime: "01:00 PM",
      dropOffStartTime: "01:00 PM",
      dropOffEndTime: "03:00 PM",
      commodity: "Cement",
      rates: "$1,650.00",
      status: "open",
      aiRecommendedVehicle: "TRK-2847",
    },
    {
      id: 10,
      vehicle: "TRK-1923",
      loadNo: "MT-2025-001254",
      pickUpNo: "PU-78460",
      customer: "Coyote",
      customerContractId: "CTR-COY-2025-008",
      customerRegion: "West",
      pickup: "999 Quarry Lane, Phoenix, AZ 85002",
      pickupDate: "2024-12-15",
      pickupContactName: "Daniel Brown",
      pickupPhone: "(602) 555-1919",
      pickupAppointmentTime: "06:00 AM",
      pickupStartTime: "06:00 AM",
      pickupEndTime: "08:00 AM",
      dropOff: "111 Distribution Center, Tucson, AZ 85701",
      dropOffDate: "2024-12-15",
      dropOffContactName: "Sandra Miller",
      dropOffPhone: "(520) 555-2020",
      dropOffAppointmentTime: "12:00 PM",
      dropOffStartTime: "12:00 PM",
      dropOffEndTime: "02:00 PM",
      commodity: "Gravel",
      rates: "$1,450.00",
      status: "assigned",
      aiRecommendedVehicle: "TRK-1923",
    },
    {
      id: 11,
      vehicle: "TRK-7734",
      loadNo: "MT-2025-001255",
      pickUpNo: "PU-78461",
      customer: "CH Robinson",
      customerContractId: "CTR-CHR-2025-020",
      customerRegion: "East",
      pickup: "222 Steel Mill Rd, Birmingham, AL 35201",
      pickupDate: "2024-12-15",
      pickupContactName: "Thomas Garcia",
      pickupPhone: "(205) 555-2121",
      pickupAppointmentTime: "08:00 AM",
      pickupStartTime: "08:00 AM",
      pickupEndTime: "10:00 AM",
      dropOff: "333 Factory Blvd, Atlanta, GA 30301",
      dropOffDate: "2024-12-15",
      dropOffContactName: "Nancy Davis",
      dropOffPhone: "(404) 555-2222",
      dropOffAppointmentTime: "03:00 PM",
      dropOffStartTime: "03:00 PM",
      dropOffEndTime: "05:00 PM",
      commodity: "Limestone",
      rates: "$2,100.00",
      status: "assigned",
      aiRecommendedVehicle: "TRK-7734",
    },
    {
      id: 12,
      vehicle: "",
      loadNo: "ML-2025-001256",
      pickUpNo: "PU-78462",
      customer: "Ashgrove",
      customerContractId: "CTR-ASH-2025-005",
      customerRegion: "Central",
      pickup: "444 Cement Plant Dr, Kansas City, MO 64101",
      pickupDate: "2024-12-16",
      pickupContactName: "Mark Johnson",
      pickupPhone: "(816) 555-2323",
      pickupAppointmentTime: "07:30 AM",
      pickupStartTime: "07:30 AM",
      pickupEndTime: "09:30 AM",
      dropOff: "555 Construction Site, Omaha, NE 68101",
      dropOffDate: "2024-12-16",
      dropOffContactName: "Betty Wilson",
      dropOffPhone: "(402) 555-2424",
      dropOffAppointmentTime: "02:00 PM",
      dropOffStartTime: "02:00 PM",
      dropOffEndTime: "04:00 PM",
      commodity: "Flyash",
      rates: "$1,350.00",
      status: "open",
      aiRecommendedVehicle: "TRK-5589",
    },
    {
      id: 13,
      vehicle: "TRK-6612",
      loadNo: "MT-2025-001257",
      pickUpNo: "PU-78463",
      customer: "TQL",
      customerContractId: "CTR-TQL-2025-014",
      customerRegion: "North",
      pickup: "666 Sand Pit Ave, Minneapolis, MN 55401",
      pickupDate: "2024-12-16",
      pickupContactName: "Paul Martinez",
      pickupPhone: "(612) 555-2525",
      pickupAppointmentTime: "06:30 AM",
      pickupStartTime: "06:30 AM",
      pickupEndTime: "08:30 AM",
      dropOff: "777 Builder Way, Chicago, IL 60601",
      dropOffDate: "2024-12-16",
      dropOffContactName: "Dorothy Anderson",
      dropOffPhone: "(312) 555-2626",
      dropOffAppointmentTime: "01:30 PM",
      dropOffStartTime: "01:30 PM",
      dropOffEndTime: "03:30 PM",
      commodity: "Sand",
      rates: "$2,550.00",
      status: "assigned",
      aiRecommendedVehicle: "TRK-6612",
    },
  ];

  // Get loads with vehicles assigned
  const loadsWithVehicles = planningData.filter((load) => load.vehicle);

  const handleOpenDispatchModal = () => {
    setSelectedLoadsForDispatch(loadsWithVehicles.map((load) => load.id));
    setIsDispatchModalOpen(true);
  };

  const handleToggleLoadSelection = (loadId) => {
    setSelectedLoadsForDispatch((prev) =>
      prev.includes(loadId)
        ? prev.filter((id) => id !== loadId)
        : [...prev, loadId]
    );
  };

  const handleToggleAllLoads = () => {
    if (selectedLoadsForDispatch.length === loadsWithVehicles.length) {
      setSelectedLoadsForDispatch([]);
    } else {
      setSelectedLoadsForDispatch(loadsWithVehicles.map((load) => load.id));
    }
  };

  const handleDispatch = () => {
    console.log("Dispatching loads:", selectedLoadsForDispatch);
    setIsDispatchModalOpen(false);
  };

  // Columns for Planning table
  const planningColumns = [
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="size-8 p-0">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/planning/load-details?id=${row.original.loadNo}&tab=general`)}>
              <Settings className="size-4 mr-2" />
              General
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/planning/load-details?id=${row.original.loadNo}&tab=additional-charge`)}>
              <DollarSign className="size-4 mr-2" />
              Additional Charge
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/planning/load-details?id=${row.original.loadNo}&tab=product-sale`)}>
              <ShoppingCart className="size-4 mr-2" />
              Product Sale
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/app/carrier-portal/orders/bulk/planning/load-details?id=${row.original.loadNo}&tab=history`)}>
              <History className="size-4 mr-2" />
              History
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    {
      accessorKey: "loadNo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Load No" />
      ),
      cell: ({ row }) => (
        <button
          onClick={() => handleOpenEditSheet(row.original)}
          className="font-mono text-sm text-primary underline hover:text-primary/80 cursor-pointer"
        >
          {row.getValue("loadNo")}
        </button>
      ),
    },
    {
      accessorKey: "vehicle",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Vehicle" />
      ),
      cell: ({ row }) => {
        const vehicle = row.getValue("vehicle");
        if (!vehicle) {
          return <span className="text-muted-foreground">-</span>;
        }
        return (
          <div className="flex items-center gap-2">
            <Truck className="size-4 text-muted-foreground" />
            <span className="font-mono text-sm">{vehicle}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "aiRecommendedVehicle",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="AI Recommended Vehicle" />
      ),
      cell: ({ row }) => {
        const aiVehicle = row.getValue("aiRecommendedVehicle");
        if (!aiVehicle) {
          return <span className="text-muted-foreground">-</span>;
        }
        return (
          <Badge className="bg-purple-500/10 text-purple-700 border-purple-500/50 dark:text-purple-400 gap-1.5 font-mono">
            <Sparkles className="size-3" />
            {aiVehicle}
          </Badge>
        );
      },
    },
    {
      accessorKey: "pickUpNo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pick Up No" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm text-muted-foreground">
          {row.getValue("pickUpNo")}
        </span>
      ),
    },
    {
      accessorKey: "customer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("customer")}</span>
      ),
    },
    {
      accessorKey: "customerContractId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer Contract ID" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-xs text-muted-foreground">
          {row.getValue("customerContractId")}
        </span>
      ),
    },
    {
      accessorKey: "customerRegion",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer Region" />
      ),
      cell: ({ row }) => {
        const region = row.getValue("customerRegion");
        const regionColors = {
          North: "bg-blue-500/10 text-blue-700 border-blue-500/50",
          South: "bg-green-500/10 text-green-700 border-green-500/50",
          East: "bg-purple-500/10 text-purple-700 border-purple-500/50",
          West: "bg-orange-500/10 text-orange-700 border-orange-500/50",
          Central: "bg-amber-500/10 text-amber-700 border-amber-500/50",
        };
        return (
          <Badge
            className={regionColors[region] || "bg-gray-500/10 text-gray-700"}
          >
            {region}
          </Badge>
        );
      },
    },
    {
      accessorKey: "pickup",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pickup" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <MapPin className="size-3 text-green-600" />
          {row.getValue("pickup")}
        </div>
      ),
    },
    {
      accessorKey: "pickupDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pickup Date" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="size-3 text-muted-foreground" />
          {row.getValue("pickupDate")}
        </div>
      ),
    },
    {
      accessorKey: "dropOff",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Drop Off" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <MapPin className="size-3 text-red-600" />
          {row.getValue("dropOff")}
        </div>
      ),
    },
    {
      accessorKey: "dropOffDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Drop Off Date" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="size-3 text-muted-foreground" />
          {row.getValue("dropOffDate")}
        </div>
      ),
    },
    {
      accessorKey: "commodity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Commodity" />
      ),
      cell: ({ row }) => (
        <span className="text-sm">{row.getValue("commodity")}</span>
      ),
    },
    {
      accessorKey: "rates",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rates" />
      ),
      cell: ({ row }) => (
        <span className="font-medium text-green-600">
          {row.getValue("rates")}
        </span>
      ),
    },
  ];

  return (
    <div className="h-full p-4 flex flex-col">
      {viewType === "table" && (
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SmartFilter
              filterGroups={filterGroups}
              onFiltersChange={handleFiltersChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 gap-2"
              onClick={handleOpenDispatchModal}
            >
              <Send className="size-4" />
              Dispatch ({loadsWithVehicles.length})
            </Button>
            {/* View Toggle */}
            <div className="flex items-center border rounded-md overflow-hidden">
              <button
                onClick={() => setViewType("table")}
                className={cn(
                  "flex items-center justify-center p-2 transition-colors",
                  viewType === "table"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-muted"
                )}
                title="Table View"
              >
                <LayoutList className="size-4" />
              </button>
              <button
                onClick={() => setViewType("gantt")}
                className={cn(
                  "flex items-center justify-center p-2 transition-colors",
                  viewType === "gantt"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-muted"
                )}
                title="Gantt View"
              >
                <GanttChart className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conditional Rendering: Table or Gantt */}
      <div className="flex-1 min-h-0">
        {viewType === "table" ? (
          <DataTable
            columns={planningColumns}
            data={planningData}
            showViewOptions={false}
          />
        ) : (
          <GanttChartView
            headerActions={
              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  onClick={() => setViewType("table")}
                  className={cn(
                    "flex items-center justify-center p-2 transition-colors",
                    viewType === "table"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  )}
                  title="Table View"
                >
                  <LayoutList className="size-4" />
                </button>
                <button
                  onClick={() => setViewType("gantt")}
                  className={cn(
                    "flex items-center justify-center p-2 transition-colors",
                    viewType === "gantt"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  )}
                  title="Gantt View"
                >
                  <GanttChart className="size-4" />
                </button>
              </div>
            }
          />
        )}
      </div>

      {/* Load Details Sheet */}
      <Sheet open={isDetailSheetOpen} onOpenChange={setIsDetailSheetOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto flex flex-col">
          <SheetHeader className="border-b pb-4">
            <SheetTitle>Load Details</SheetTitle>
          </SheetHeader>

          {selectedLoad && (
            <div className="flex-1 py-4 px-6 space-y-4 overflow-y-auto">
              {/* Load Information - Separate Cards */}
              <div className="space-y-3">
                {/* First Row: Load No, Pick Up No */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Load No */}
                  <div className="border rounded-sm p-3 bg-card">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <FileText className="size-4" />
                      <span className="text-xs">Load No</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{selectedLoad.loadNo}</p>
                  </div>

                  {/* Pick Up No */}
                  <div className="border rounded-sm p-3 bg-card">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Package className="size-4" />
                      <span className="text-xs">Pick Up No</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{selectedLoad.pickUpNo}</p>
                  </div>
                </div>

                {/* Second Row: Contract ID, Region, Rate */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Contract ID */}
                  <div className="border rounded-sm p-3 bg-card">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <FileText className="size-4" />
                      <span className="text-xs">Contract ID</span>
                    </div>
                    <p className="text-xs font-semibold text-foreground">{selectedLoad.customerContractId}</p>
                  </div>

                  {/* Region */}
                  <div className="border rounded-sm p-3 bg-card">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <MapPin className="size-4" />
                      <span className="text-xs">Region</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{selectedLoad.customerRegion}</p>
                  </div>

                  {/* Rate */}
                  <div className="border rounded-sm p-3 bg-card">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <DollarSign className="size-4" />
                      <span className="text-xs">Rate</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{selectedLoad.rates}</p>
                  </div>
                </div>
              </div>

              {/* Customer Selection - Full Width */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Customer</Label>
                <Popover open={customerOpen} onOpenChange={setCustomerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={customerOpen}
                      className="w-full justify-between h-10 font-normal"
                    >
                      {formData.customer || "Select customer..."}
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search customer..." />
                      <CommandList>
                        <CommandEmpty>No customer found.</CommandEmpty>
                        <CommandGroup>
                          {customers.map((customer) => (
                            <CommandItem
                              key={customer.value}
                              value={customer.value}
                              onSelect={() => {
                                setFormData({
                                  ...formData,
                                  customer: customer.value,
                                });
                                setCustomerOpen(false);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.customer === customer.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {customer.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Vehicle and Commodity - Two Columns */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Vehicle</Label>
                  <Popover open={vehicleOpen} onOpenChange={setVehicleOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={vehicleOpen}
                        className="w-full justify-between h-10 font-normal"
                      >
                        {formData.vehicle || "Select vehicle..."}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0"
                      align="start"
                      style={{ width: "var(--radix-popover-trigger-width)" }}
                    >
                      <Command>
                        <CommandInput placeholder="Search vehicle..." />
                        <CommandList>
                          <CommandEmpty>No vehicle found.</CommandEmpty>
                          <CommandGroup className="p-1">
                            {vehicles.map((vehicle) => (
                              <CommandItem
                                key={vehicle.value}
                                value={vehicle.value}
                                onSelect={() => {
                                  setFormData({
                                    ...formData,
                                    vehicle: vehicle.value,
                                  });
                                  setVehicleOpen(false);
                                }}
                                className={cn(
                                  "flex items-center gap-3 w-full p-2 rounded-md cursor-pointer border mb-1",
                                  formData.vehicle === vehicle.value
                                    ? "border-primary bg-primary/5"
                                    : "border-border"
                                )}
                              >
                                <div
                                  className={cn(
                                    "w-1.5 h-8 rounded-full shrink-0",
                                    getVehicleStatusColor(vehicle.status)
                                  )}
                                />
                                <div className="flex items-center justify-between flex-1">
                                  <div className="flex flex-col">
                                    <span className="font-medium text-sm">
                                      {vehicle.label}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {vehicle.loads} Loads
                                    </span>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <span
                                      className={cn(
                                        "text-xs font-medium",
                                        vehicle.assigned === 0
                                          ? "text-rose-600"
                                          : "text-green-600"
                                      )}
                                    >
                                      {vehicle.assigned} Assigned
                                    </span>
                                    <div className="flex items-center gap-2 text-xs">
                                      <span className="text-rose-600">
                                        ${vehicle.expense.toFixed(2)}
                                      </span>
                                      <span className="text-green-600">
                                        ${vehicle.revenue.toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Commodity</Label>
                  <Popover open={commodityOpen} onOpenChange={setCommodityOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={commodityOpen}
                        className="w-full justify-between h-10 font-normal"
                      >
                        {formData.commodity || "Select commodity..."}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search commodity..." />
                        <CommandList>
                          <CommandEmpty>No commodity found.</CommandEmpty>
                          <CommandGroup>
                            {commodities.map((commodity) => (
                              <CommandItem
                                key={commodity.value}
                                value={commodity.value}
                                onSelect={() => {
                                  setFormData({
                                    ...formData,
                                    commodity: commodity.value,
                                  });
                                  setCommodityOpen(false);
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.commodity === commodity.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {commodity.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Pickup Section - Collapsible */}
              <div className="border rounded-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsPickupExpanded(!isPickupExpanded)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-sky-50 dark:bg-sky-950/30 hover:bg-sky-100 dark:hover:bg-sky-950/50 transition-colors"
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-sky-700 dark:text-sky-400">
                    <MapPin className="size-4" />
                    Pickup Location
                  </span>
                  {isPickupExpanded ? (
                    <ChevronUp className="size-4 text-sky-700 dark:text-sky-400" />
                  ) : (
                    <ChevronDown className="size-4 text-sky-700 dark:text-sky-400" />
                  )}
                </button>

                {isPickupExpanded && (
                  <div className="p-4 space-y-4">
                    {/* Pickup Location, Pickup Date */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Location</Label>
                        <Popover
                          open={pickupLocationOpen}
                          onOpenChange={setPickupLocationOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={pickupLocationOpen}
                              className="w-full justify-between h-10 font-normal"
                            >
                              <span className="truncate">
                                {formData.pickupLocation || "Select location..."}
                              </span>
                              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Search location..." />
                              <CommandList>
                                <CommandEmpty>
                                  <div className="py-2 text-center">
                                    <p className="text-sm text-muted-foreground mb-2">
                                      No location found.
                                    </p>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="gap-1"
                                      onClick={() =>
                                        handleOpenAddLocationModal("pickup")
                                      }
                                    >
                                      <Plus className="size-3" />
                                      Add New Location
                                    </Button>
                                  </div>
                                </CommandEmpty>
                                <CommandGroup>
                                  {locations.map((location) => (
                                    <CommandItem
                                      key={location.value}
                                      value={location.value}
                                      onSelect={() => {
                                        setFormData({
                                          ...formData,
                                          pickupLocation: location.value,
                                        });
                                        setPickupLocationOpen(false);
                                      }}
                                    >
                                      <CheckIcon
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          formData.pickupLocation === location.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {location.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Date</Label>
                        <Input
                          type="date"
                          value={formData.pickupDate}
                          onChange={(e) =>
                            setFormData({ ...formData, pickupDate: e.target.value })
                          }
                          className="h-10"
                        />
                      </div>
                    </div>

                    {/* Appointment Time, Start Time, End Time - Editable */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Appointment Time</Label>
                        <Input
                          type="time"
                          defaultValue="08:00"
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Start Time</Label>
                        <Input
                          type="time"
                          defaultValue="08:00"
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">End Time</Label>
                        <Input
                          type="time"
                          defaultValue="10:00"
                          className="h-10"
                        />
                      </div>
                    </div>

                    {/* Contact Info Cards - Read Only */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="border rounded-sm p-3 bg-card">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <User className="size-4" />
                          <span className="text-xs">Contact Name</span>
                        </div>
                        <p className="text-sm font-semibold text-foreground">{selectedLoad?.pickupContactName || "-"}</p>
                      </div>
                      <div className="border rounded-sm p-3 bg-card">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Phone className="size-4" />
                          <span className="text-xs">Phone</span>
                        </div>
                        <p className="text-sm font-semibold text-foreground">{selectedLoad?.pickupPhone || "-"}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Drop Off Section - Collapsible */}
              <div className="border rounded-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsDropOffExpanded(!isDropOffExpanded)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-orange-50 dark:bg-orange-950/30 hover:bg-orange-100 dark:hover:bg-orange-950/50 transition-colors"
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-orange-700 dark:text-orange-400">
                    <MapPin className="size-4" />
                    Drop Off Location
                  </span>
                  {isDropOffExpanded ? (
                    <ChevronUp className="size-4 text-orange-700 dark:text-orange-400" />
                  ) : (
                    <ChevronDown className="size-4 text-orange-700 dark:text-orange-400" />
                  )}
                </button>

                {isDropOffExpanded && (
                  <div className="p-4 space-y-4">
                    {/* Drop Off Location, Drop Off Date */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Location</Label>
                        <Popover
                          open={dropOffLocationOpen}
                          onOpenChange={setDropOffLocationOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={dropOffLocationOpen}
                              className="w-full justify-between h-10 font-normal"
                            >
                              <span className="truncate">
                                {formData.dropOffLocation || "Select location..."}
                              </span>
                              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Search location..." />
                              <CommandList>
                                <CommandEmpty>
                                  <div className="py-2 text-center">
                                    <p className="text-sm text-muted-foreground mb-2">
                                      No location found.
                                    </p>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="gap-1"
                                      onClick={() =>
                                        handleOpenAddLocationModal("dropoff")
                                      }
                                    >
                                      <Plus className="size-3" />
                                      Add New Location
                                    </Button>
                                  </div>
                                </CommandEmpty>
                                <CommandGroup>
                                  {locations.map((location) => (
                                    <CommandItem
                                      key={location.value}
                                      value={location.value}
                                      onSelect={() => {
                                        setFormData({
                                          ...formData,
                                          dropOffLocation: location.value,
                                        });
                                        setDropOffLocationOpen(false);
                                      }}
                                    >
                                      <CheckIcon
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          formData.dropOffLocation ===
                                            location.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {location.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Date</Label>
                        <Input
                          type="date"
                          value={formData.dropOffDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dropOffDate: e.target.value,
                            })
                          }
                          className="h-10"
                        />
                      </div>
                    </div>

                    {/* Appointment Time, Start Time, End Time - Editable */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Appointment Time</Label>
                        <Input
                          type="time"
                          defaultValue="14:00"
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Start Time</Label>
                        <Input
                          type="time"
                          defaultValue="14:00"
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">End Time</Label>
                        <Input
                          type="time"
                          defaultValue="16:00"
                          className="h-10"
                        />
                      </div>
                    </div>

                    {/* Contact Info Cards - Read Only */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="border rounded-sm p-3 bg-card">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <User className="size-4" />
                          <span className="text-xs">Contact Name</span>
                        </div>
                        <p className="text-sm font-semibold text-foreground">{selectedLoad?.dropOffContactName || "-"}</p>
                      </div>
                      <div className="border rounded-sm p-3 bg-card">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Phone className="size-4" />
                          <span className="text-xs">Phone</span>
                        </div>
                        <p className="text-sm font-semibold text-foreground">{selectedLoad?.dropOffPhone || "-"}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <SheetFooter className="border-t pt-4 px-6">
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsDetailSheetOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Add New Location Modal */}
      <Dialog
        open={isAddLocationModalOpen}
        onOpenChange={setIsAddLocationModalOpen}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="border-b pb-4 -mx-6 px-6">
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="size-5" />
              Add New Location
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4 -mx-6 px-6">
            {/* Row 1: Code & Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Enter Code"
                  value={newLocationData.code}
                  onChange={(e) =>
                    setNewLocationData({
                      ...newLocationData,
                      code: e.target.value,
                    })
                  }
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Enter Name"
                  value={newLocationData.name}
                  onChange={(e) =>
                    setNewLocationData({
                      ...newLocationData,
                      name: e.target.value,
                    })
                  }
                  className="h-10"
                />
              </div>
            </div>

            {/* Row 2: Contact & Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Contact</Label>
                <Input
                  placeholder="Enter Contact"
                  value={newLocationData.contact}
                  onChange={(e) =>
                    setNewLocationData({
                      ...newLocationData,
                      contact: e.target.value,
                    })
                  }
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Phone</Label>
                <Input
                  type="tel"
                  placeholder="123-456-7890"
                  value={newLocationData.phone}
                  onChange={(e) =>
                    setNewLocationData({
                      ...newLocationData,
                      phone: e.target.value,
                    })
                  }
                  className="h-10"
                />
              </div>
            </div>

            {/* Row 3: Email & Address */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Email</Label>
                <Input
                  type="email"
                  placeholder="Enter Email"
                  value={newLocationData.email}
                  onChange={(e) =>
                    setNewLocationData({
                      ...newLocationData,
                      email: e.target.value,
                    })
                  }
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Enter your Address"
                  value={newLocationData.address}
                  onChange={(e) =>
                    setNewLocationData({
                      ...newLocationData,
                      address: e.target.value,
                    })
                  }
                  className="h-10"
                />
              </div>
            </div>

            {/* Row 4: Latitude & Longitude */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Latitude <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Enter Latitude"
                  value={newLocationData.latitude}
                  onChange={(e) =>
                    setNewLocationData({
                      ...newLocationData,
                      latitude: e.target.value,
                    })
                  }
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Longitude <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Enter Longitude"
                  value={newLocationData.longitude}
                  onChange={(e) =>
                    setNewLocationData({
                      ...newLocationData,
                      longitude: e.target.value,
                    })
                  }
                  className="h-10"
                />
              </div>
            </div>

            {/* Row 5: City & State */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Enter City"
                  value={newLocationData.city}
                  onChange={(e) =>
                    setNewLocationData({
                      ...newLocationData,
                      city: e.target.value,
                    })
                  }
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  State <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Enter State"
                  value={newLocationData.state}
                  onChange={(e) =>
                    setNewLocationData({
                      ...newLocationData,
                      state: e.target.value,
                    })
                  }
                  className="h-10"
                />
              </div>
            </div>

            {/* Row 6: Zip Code */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Zip Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Enter Zip Code"
                  value={newLocationData.zipCode}
                  onChange={(e) =>
                    setNewLocationData({
                      ...newLocationData,
                      zipCode: e.target.value,
                    })
                  }
                  className="h-10"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="border-t pt-4 -mx-6 px-6">
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsAddLocationModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                onClick={handleSaveNewLocation}
                disabled={
                  !newLocationData.code ||
                  !newLocationData.name ||
                  !newLocationData.address ||
                  !newLocationData.latitude ||
                  !newLocationData.longitude ||
                  !newLocationData.city ||
                  !newLocationData.state ||
                  !newLocationData.zipCode
                }
              >
                Create Location
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dispatch Confirmation Modal */}
      <Dialog open={isDispatchModalOpen} onOpenChange={setIsDispatchModalOpen}>
        <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader className="border-b pb-4 -mx-6 px-6">
            <DialogTitle className="text-base">Confirm Dispatch</DialogTitle>
            <DialogDescription>
              Are you sure you want to dispatch the selected loads?
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto py-4 -mx-6 px-6">
            {/* Select All */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedLoadsForDispatch.length === loadsWithVehicles.length}
                  onCheckedChange={handleToggleAllLoads}
                />
                <span className="text-sm font-medium">Select All</span>
              </label>
              <span className="text-xs text-muted-foreground">
                {selectedLoadsForDispatch.length} of {loadsWithVehicles.length} selected
              </span>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr] gap-3 px-2 pb-2 border-b text-xs font-medium text-muted-foreground">
              <div className="w-4"></div>
              <div>Load No</div>
              <div>Customer</div>
              <div>Vehicle</div>
              <div>Pickup Date</div>
            </div>

            {/* Loads List */}
            <div className="divide-y">
              {loadsWithVehicles.map((load) => (
                <label
                  key={load.id}
                  className="grid grid-cols-[auto_1fr_1fr_1fr_1fr] gap-3 px-2 py-2.5 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedLoadsForDispatch.includes(load.id)}
                    onCheckedChange={() => handleToggleLoadSelection(load.id)}
                  />
                  <span className="font-mono text-sm text-primary">{load.loadNo}</span>
                  <span className="text-sm">{load.customer}</span>
                  <span className="font-mono text-sm">{load.vehicle}</span>
                  <span className="text-sm">{load.pickupDate}</span>
                </label>
              ))}
            </div>
          </div>

          <DialogFooter className="border-t pt-4 -mx-6 px-6">
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsDispatchModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleDispatch}
                disabled={selectedLoadsForDispatch.length === 0}
              >
                Dispatch ({selectedLoadsForDispatch.length})
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Planning;
