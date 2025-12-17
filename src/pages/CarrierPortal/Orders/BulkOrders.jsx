import { useState, useEffect, useCallback, useRef } from "react";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SmartFilter from "@/components/SmartFilter";
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Inbox,
  CalendarClock,
  Truck,
  PackageCheck,
  CheckCircle2,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  MapPin,
  Calendar,
  Clock,
  AlertTriangle,
  DollarSign,
  Building2,
  Sparkles,
  Navigation,
  Timer,
  CircleCheck,
  CircleAlert,
  CircleMinus,
  TrendingUp,
  Route,
  Loader2,
} from "lucide-react";

// Countdown component for Mega Logistics
const CountdownTimer = ({ minutes }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const isUrgent = mins < 10;

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs font-medium border ${
        isUrgent
          ? "bg-red-500/10 text-red-700 border-red-500/50 dark:text-red-400"
          : "bg-amber-500/10 text-amber-700 border-amber-500/50 dark:text-amber-400"
      }`}
    >
      {isUrgent ? (
        <AlertTriangle className="size-3 animate-pulse" />
      ) : (
        <Clock className="size-3" />
      )}
      <span>
        {mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
      </span>
    </div>
  );
};

const BulkOrders = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const [filters, setFilters] = useState([]);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [aiLoadingStep, setAiLoadingStep] = useState(0);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [declineNotes, setDeclineNotes] = useState("");

  const aiRecommendationKeys = [
    "driverLocation",
    "hosStatus",
    "equipmentMatch",
    "deadhead",
    "profitability",
    "nextLoadPositioning",
  ];

  const handleViewDetails = (load) => {
    setSelectedLoad(load);
    setIsDetailSheetOpen(true);

    // Start AI loading animation
    if (load.aiRecommendations) {
      setIsAiLoading(true);
      setAiLoadingStep(0);

      // Animate through each recommendation
      aiRecommendationKeys.forEach((_, index) => {
        setTimeout(() => {
          setAiLoadingStep(index + 1);
          if (index === aiRecommendationKeys.length - 1) {
            setTimeout(() => {
              setIsAiLoading(false);
            }, 300);
          }
        }, (index + 1) * 400);
      });
    }
  };

  const handleAccept = () => {
    // Handle accept logic
    setIsDetailSheetOpen(false);
    setSelectedLoad(null);
  };

  const handleDecline = () => {
    // Open decline dialog
    setIsDeclineDialogOpen(true);
  };

  const handleDeclineSubmit = () => {
    // Handle decline submission logic
    console.log("Declined:", selectedLoad?.loadId, "Reason:", declineReason, "Notes:", declineNotes);
    setIsDeclineDialogOpen(false);
    setIsDetailSheetOpen(false);
    setSelectedLoad(null);
    setDeclineReason("");
    setDeclineNotes("");
  };

  const handleDeclineCancel = () => {
    setIsDeclineDialogOpen(false);
    setDeclineReason("");
    setDeclineNotes("");
  };

  // Filter configuration
  const filterGroups = [
    {
      id: "bulk-filters",
      label: "Filter Orders",
      filters: [
        {
          key: "loadId",
          label: "Load ID",
          type: "input",
          group: "Basic",
          placeholder: "Search load ID...",
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
          key: "fleetType",
          label: "Fleet Type",
          type: "select",
          group: "Basic",
          options: [
            { value: "Bulk", label: "Bulk" },
            { value: "Aggregate", label: "Aggregate" },
            { value: "TMF", label: "TMF" },
            { value: "Flatbed", label: "Flatbed" },
          ],
        },
        {
          key: "origin",
          label: "Origin",
          type: "input",
          group: "Basic",
          placeholder: "Search origin...",
        },
        {
          key: "destination",
          label: "Destination",
          type: "input",
          group: "Basic",
          placeholder: "Search destination...",
        },
        {
          key: "pickup",
          label: "Pickup Date",
          type: "input",
          group: "Basic",
          placeholder: "YYYY-MM-DD",
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Mock data for Inbox
  const inboxData = [
    {
      id: 1,
      loadId: "ML-2025-001245",
      customer: "Titan",
      fleetType: "Bulk",
      commodity: "Cement",
      customerRate: "$1,850.00",
      origin: {
        address: "1234 Industrial Blvd",
        city: "Houston",
        state: "TX",
        zip: "77001",
        lat: "29.7604",
        lng: "-95.3698",
        contact: "John Smith",
        phone: "(713) 555-1234",
        appointmentTime: "08:00",
      },
      destination: {
        address: "5678 Commerce St",
        city: "Dallas",
        state: "TX",
        zip: "75201",
        lat: "32.7767",
        lng: "-96.7970",
        contact: "Mike Johnson",
        phone: "(214) 555-5678",
        appointmentTime: "14:00",
      },
      pickup: {
        date: "2024-02-01",
        startTime: "08:00",
        endTime: "10:00",
      },
      dropoff: {
        date: "2024-02-01",
        startTime: "14:00",
        endTime: "16:00",
      },
      notes: "Require tarp for cement load. Call 30 min before arrival.",
      countdown: 30,
      aiRecommendations: {
        driverLocation: { status: "good", driver: "Mike Thompson", distance: "12 miles", location: "Houston, TX" },
        hosStatus: { status: "good", hoursAvailable: "9.5 hrs", message: "Sufficient hours for trip" },
        equipmentMatch: { status: "good", trailer: "Pneumatic Tank #PT-2847", position: "Same yard" },
        deadhead: { status: "good", miles: "12 miles", cost: "$18.00" },
        profitability: { status: "good", score: "87%", margin: "$425.00" },
        nextLoadPositioning: { status: "warning", message: "Limited loads from Dallas area", suggestion: "Consider relay option" },
      },
    },
    {
      id: 2,
      loadId: "TQL-2025-001002",
      customer: "TQL",
      fleetType: "Aggregate",
      commodity: "DOT 57 Stone",
      customerRate: "$1,200.00",
      origin: {
        address: "890 Quarry Rd",
        city: "Austin",
        state: "TX",
        zip: "78701",
        lat: "30.2672",
        lng: "-97.7431",
        contact: "Sarah Davis",
        phone: "(512) 555-8901",
        appointmentTime: "07:00",
      },
      destination: {
        address: "234 Construction Ave",
        city: "San Antonio",
        state: "TX",
        zip: "78201",
        lat: "29.4241",
        lng: "-98.4936",
        contact: "Tom Wilson",
        phone: "(210) 555-2345",
        appointmentTime: "11:00",
      },
      pickup: {
        date: "2024-02-01",
        startTime: "07:00",
        endTime: "09:00",
      },
      dropoff: {
        date: "2024-02-01",
        startTime: "11:00",
        endTime: "13:00",
      },
      notes: "Weight station required before delivery.",
      aiRecommendations: {
        driverLocation: { status: "warning", driver: "Carlos Rodriguez", distance: "45 miles", location: "San Marcos, TX" },
        hosStatus: { status: "good", hoursAvailable: "11 hrs", message: "Full hours available" },
        equipmentMatch: { status: "good", trailer: "End Dump #ED-1923", position: "En route" },
        deadhead: { status: "warning", miles: "45 miles", cost: "$67.50" },
        profitability: { status: "good", score: "72%", margin: "$280.00" },
        nextLoadPositioning: { status: "good", message: "High demand in San Antonio", suggestion: "Good positioning" },
      },
    },
    {
      id: 3,
      loadId: "COY-2025-001003",
      customer: "Coyote",
      fleetType: "TMF",
      commodity: "Sand",
      customerRate: "$2,400.00",
      origin: {
        address: "567 Sand Pit Ln",
        city: "Fort Worth",
        state: "TX",
        zip: "76101",
        lat: "32.7555",
        lng: "-97.3308",
        contact: "Lisa Brown",
        phone: "(817) 555-5670",
        appointmentTime: "06:00",
      },
      destination: {
        address: "1010 Builder Way",
        city: "Oklahoma City",
        state: "OK",
        zip: "73101",
        lat: "35.4676",
        lng: "-97.5164",
        contact: "James Miller",
        phone: "(405) 555-1010",
        appointmentTime: "14:00",
      },
      pickup: {
        date: "2024-02-02",
        startTime: "06:00",
        endTime: "08:00",
      },
      dropoff: {
        date: "2024-02-02",
        startTime: "14:00",
        endTime: "16:00",
      },
      notes: "",
      aiRecommendations: {
        driverLocation: { status: "good", driver: "James Wilson", distance: "8 miles", location: "Fort Worth, TX" },
        hosStatus: { status: "warning", hoursAvailable: "6.5 hrs", message: "May need 30-min break" },
        equipmentMatch: { status: "good", trailer: "Walking Floor #WF-4521", position: "Available" },
        deadhead: { status: "good", miles: "8 miles", cost: "$12.00" },
        profitability: { status: "good", score: "91%", margin: "$680.00" },
        nextLoadPositioning: { status: "warning", message: "Moderate demand in OKC", suggestion: "Check return loads" },
      },
    },
    {
      id: 4,
      loadId: "CHR-2025-001004",
      customer: "CH Robinson",
      fleetType: "Flatbed",
      commodity: "Steel Beams",
      customerRate: "$3,100.00",
      origin: {
        address: "789 Steel Works Dr",
        city: "El Paso",
        state: "TX",
        zip: "79901",
        lat: "31.7619",
        lng: "-106.4850",
        contact: "Robert Garcia",
        phone: "(915) 555-7890",
        appointmentTime: "05:00",
      },
      destination: {
        address: "456 Industrial Park",
        city: "Phoenix",
        state: "AZ",
        zip: "85001",
        lat: "33.4484",
        lng: "-112.0740",
        contact: "Emily Chen",
        phone: "(602) 555-4567",
        appointmentTime: "15:00",
      },
      pickup: {
        date: "2024-02-02",
        startTime: "05:00",
        endTime: "07:00",
      },
      dropoff: {
        date: "2024-02-03",
        startTime: "15:00",
        endTime: "17:00",
      },
      notes: "Oversized load - escort required. Check permits.",
      aiRecommendations: {
        driverLocation: { status: "bad", driver: "No driver nearby", distance: "120+ miles", location: "Nearest in Midland, TX" },
        hosStatus: { status: "neutral", hoursAvailable: "-", message: "Pending driver assignment" },
        equipmentMatch: { status: "warning", trailer: "Flatbed #FB-7734", position: "85 miles away" },
        deadhead: { status: "bad", miles: "120 miles", cost: "$180.00" },
        profitability: { status: "warning", score: "58%", margin: "$320.00" },
        nextLoadPositioning: { status: "good", message: "Phoenix has high demand", suggestion: "Good market" },
      },
    },
    {
      id: 5,
      loadId: "ML-2025-001246",
      customer: "Ashgrove",
      fleetType: "Bulk",
      commodity: "Flyash",
      customerRate: "$2,200.00",
      origin: {
        address: "321 Power Plant Rd",
        city: "Dallas",
        state: "TX",
        zip: "75202",
        lat: "32.7831",
        lng: "-96.8067",
        contact: "Amy White",
        phone: "(214) 555-3210",
        appointmentTime: "09:00",
      },
      destination: {
        address: "654 Cement Factory Ln",
        city: "Little Rock",
        state: "AR",
        zip: "72201",
        lat: "34.7465",
        lng: "-92.2896",
        contact: "Chris Taylor",
        phone: "(501) 555-6543",
        appointmentTime: "16:00",
      },
      pickup: {
        date: "2024-02-03",
        startTime: "09:00",
        endTime: "11:00",
      },
      dropoff: {
        date: "2024-02-03",
        startTime: "16:00",
        endTime: "18:00",
      },
      notes: "Hazmat certified driver required.",
      countdown: 8,
      aiRecommendations: {
        driverLocation: { status: "good", driver: "Robert Chen", distance: "5 miles", location: "Dallas, TX" },
        hosStatus: { status: "good", hoursAvailable: "10.5 hrs", message: "Sufficient hours" },
        equipmentMatch: { status: "good", trailer: "Pneumatic Tank #PT-3356", position: "Same location" },
        deadhead: { status: "good", miles: "5 miles", cost: "$7.50" },
        profitability: { status: "good", score: "82%", margin: "$520.00" },
        nextLoadPositioning: { status: "neutral", message: "Moderate demand in Little Rock", suggestion: "May need repositioning" },
      },
    },
    {
      id: 6,
      loadId: "TQL-2025-001006",
      customer: "TQL",
      fleetType: "Aggregate",
      commodity: "Recycled Base Rock",
      customerRate: "$950.00",
      origin: {
        address: "111 Recycling Center",
        city: "San Antonio",
        state: "TX",
        zip: "78202",
        lat: "29.4252",
        lng: "-98.4946",
        contact: "David Lee",
        phone: "(210) 555-1112",
        appointmentTime: "08:00",
      },
      destination: {
        address: "222 Road Project Site",
        city: "Corpus Christi",
        state: "TX",
        zip: "78401",
        lat: "27.8006",
        lng: "-97.3964",
        contact: "Nancy Adams",
        phone: "(361) 555-2223",
        appointmentTime: "12:00",
      },
      pickup: {
        date: "2024-02-03",
        startTime: "08:00",
        endTime: "10:00",
      },
      dropoff: {
        date: "2024-02-03",
        startTime: "12:00",
        endTime: "14:00",
      },
      notes: "",
    },
    {
      id: 7,
      loadId: "COY-2025-001007",
      customer: "Coyote",
      fleetType: "TMF",
      commodity: "Grain",
      customerRate: "$800.00",
      origin: {
        address: "333 Farm Co-op Rd",
        city: "Lubbock",
        state: "TX",
        zip: "79401",
        lat: "33.5779",
        lng: "-101.8552",
        contact: "Mark Thompson",
        phone: "(806) 555-3334",
        appointmentTime: "07:00",
      },
      destination: {
        address: "444 Grain Elevator St",
        city: "Amarillo",
        state: "TX",
        zip: "79101",
        lat: "35.2220",
        lng: "-101.8313",
        contact: "Susan Harris",
        phone: "(806) 555-4445",
        appointmentTime: "11:00",
      },
      pickup: {
        date: "2024-02-04",
        startTime: "07:00",
        endTime: "09:00",
      },
      dropoff: {
        date: "2024-02-04",
        startTime: "11:00",
        endTime: "13:00",
      },
      notes: "",
    },
    {
      id: 8,
      loadId: "CHR-2025-001008",
      customer: "CH Robinson",
      fleetType: "Flatbed",
      commodity: "Equipment",
      customerRate: "$2,800.00",
      origin: {
        address: "555 Equipment Yard",
        city: "Houston",
        state: "TX",
        zip: "77002",
        lat: "29.7605",
        lng: "-95.3699",
        contact: "Kevin Martinez",
        phone: "(713) 555-5556",
        appointmentTime: "06:00",
      },
      destination: {
        address: "666 Construction Site",
        city: "New Orleans",
        state: "LA",
        zip: "70112",
        lat: "29.9511",
        lng: "-90.0715",
        contact: "Patricia Clark",
        phone: "(504) 555-6667",
        appointmentTime: "14:00",
      },
      pickup: {
        date: "2024-02-04",
        startTime: "06:00",
        endTime: "08:00",
      },
      dropoff: {
        date: "2024-02-05",
        startTime: "14:00",
        endTime: "16:00",
      },
      notes: "Forklift needed at delivery site.",
    },
  ];

  // Columns for Inbox table
  const inboxColumns = [
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
            <DropdownMenuItem onClick={() => handleViewDetails(row.original)}>
              <Eye className="size-4 mr-2" />
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    {
      accessorKey: "loadId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Load ID" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("loadId")}</span>
      ),
    },
    {
      id: "countdown",
      header: "Accept Within",
      cell: ({ row }) => {
        const countdown = row.original.countdown;
        const isMegaLogistics = ["Titan", "Ashgrove"].includes(row.original.customer);
        if (countdown && isMegaLogistics) {
          return (
            <div className="flex justify-center">
              <CountdownTimer minutes={countdown} />
            </div>
          );
        }
        return <div className="text-center text-muted-foreground">-</div>;
      },
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
      id: "division",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Division" />
      ),
      cell: ({ row }) => {
        const isMegaLogistics = ["Titan", "Ashgrove"].includes(row.original.customer);
        return (
          <Badge className={isMegaLogistics
            ? "bg-purple-500/10 text-purple-700 border-purple-500/50"
            : "bg-blue-500/10 text-blue-700 border-blue-500/50"
          }>
            {isMegaLogistics ? "Mega Logistics" : "Mega Trucking"}
          </Badge>
        );
      },
    },
    {
      id: "origin",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Origin" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <MapPin className="size-3 text-green-600" />
          {row.original.origin.city}, {row.original.origin.state}
        </div>
      ),
    },
    {
      id: "destination",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Destination" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <MapPin className="size-3 text-red-600" />
          {row.original.destination.city}, {row.original.destination.state}
        </div>
      ),
    },
    {
      accessorKey: "customerRate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer Rate" />
      ),
      cell: ({ row }) => (
        <span className="font-medium text-green-600">
          {row.getValue("customerRate")}
        </span>
      ),
    },
    {
      id: "pickup",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pickup" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="size-3 text-muted-foreground" />
          {row.original.pickup.date}
        </div>
      ),
    },
    {
      id: "dropoff",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Drop Off" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="size-3 text-muted-foreground" />
          {row.original.dropoff.date}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full h-full flex flex-col overflow-hidden"
      >
        <div className="flex-shrink-0">
          <TabsList className="mb-0 rounded-none">
            <TabsTrigger value="inbox" className="h-full">
              <Inbox className="size-4" />
              Inbox
            </TabsTrigger>
            <TabsTrigger value="planning" className="h-full">
              <CalendarClock className="size-4" />
              Planning
            </TabsTrigger>
            <TabsTrigger value="dispatch" className="h-full">
              <Truck className="size-4" />
              Dispatch
            </TabsTrigger>
            <TabsTrigger value="delivered" className="h-full">
              <PackageCheck className="size-4" />
              Delivered
            </TabsTrigger>
            <TabsTrigger value="complete" className="h-full">
              <CheckCircle2 className="size-4" />
              Complete
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          <TabsContent value="inbox" className="h-full mt-0 p-4">
            <div className="mb-4">
              <SmartFilter
                filterGroups={filterGroups}
                onFiltersChange={handleFiltersChange}
              />
            </div>
            <DataTable
              columns={inboxColumns}
              data={inboxData}
              showViewOptions={false}
            />
          </TabsContent>

          <TabsContent value="planning" className="h-full mt-0 p-4">
            <div className="border rounded-lg p-8 h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <CalendarClock className="size-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium">Planning</h3>
                <p className="text-sm">Orders being planned and scheduled</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dispatch" className="h-full mt-0 p-4">
            <div className="border rounded-lg p-8 h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Truck className="size-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium">Dispatch</h3>
                <p className="text-sm">Orders dispatched and in transit</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="delivered" className="h-full mt-0 p-4">
            <div className="border rounded-lg p-8 h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <PackageCheck className="size-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium">Delivered</h3>
                <p className="text-sm">Orders that have been delivered</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="complete" className="h-full mt-0 p-4">
            <div className="border rounded-lg p-8 h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <CheckCircle2 className="size-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium">Complete</h3>
                <p className="text-sm">Fully completed orders</p>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Load Details Sheet */}
      <Sheet open={isDetailSheetOpen} onOpenChange={setIsDetailSheetOpen}>
        <SheetContent className="sm:max-w-xl flex flex-col">
          <SheetHeader className="border-b pb-4">
            <SheetTitle>Load Details</SheetTitle>
          </SheetHeader>

          {selectedLoad && (
            <div className="flex-1 overflow-auto py-4 px-6 space-y-4">
              {/* Load Details Card */}
              <div className="border rounded-sm bg-card">
                <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-semibold text-foreground font-mono">{selectedLoad.loadId}</h3>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-sm text-foreground">{selectedLoad.customer}</span>
                  </div>
                  {selectedLoad.countdown && ["Titan", "Ashgrove"].includes(selectedLoad.customer) && (
                    <CountdownTimer minutes={selectedLoad.countdown} />
                  )}
                </div>
                <div className="p-4 space-y-4">
                  {/* Load Details Row */}
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Truck className="size-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{selectedLoad.fleetType}</span>
                      <span className="text-foreground font-medium">{selectedLoad.commodity}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="size-4 text-green-600" />
                      <span className="font-semibold text-green-600">{selectedLoad.customerRate}</span>
                    </div>
                  </div>

                  {/* Route Section */}
                  <div className="space-y-2">
                    {/* Origin */}
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="size-2.5 rounded-full bg-green-500" />
                        <div className="w-px h-8 bg-border" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-foreground truncate">
                            {selectedLoad.origin.city}, {selectedLoad.origin.state}
                          </p>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {selectedLoad.pickup.date} • {selectedLoad.pickup.startTime}-{selectedLoad.pickup.endTime}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {selectedLoad.origin.address}, {selectedLoad.origin.zip}
                        </p>
                      </div>
                    </div>
                    {/* Destination */}
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="size-2.5 rounded-full bg-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-foreground truncate">
                            {selectedLoad.destination.city}, {selectedLoad.destination.state}
                          </p>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {selectedLoad.dropoff.date} • {selectedLoad.dropoff.startTime}-{selectedLoad.dropoff.endTime}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {selectedLoad.destination.address}, {selectedLoad.destination.zip}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedLoad.notes && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">{selectedLoad.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Recommendations Card */}
              {selectedLoad.aiRecommendations && (
                <div className="border rounded-sm bg-card">
                  <div className="px-4 py-3 border-b bg-gradient-to-r from-purple-500/10 to-blue-500/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isAiLoading ? (
                        <Loader2 className="size-4 text-purple-600 animate-spin" />
                      ) : (
                        <Sparkles className="size-4 text-purple-600" />
                      )}
                      <h3 className="text-sm font-semibold text-foreground">AI Recommendations</h3>
                    </div>
                    {isAiLoading && (
                      <span className="text-xs text-muted-foreground">Analyzing...</span>
                    )}
                  </div>
                  <div className="divide-y divide-border">
                    {/* Driver Location */}
                    <div className={`px-4 py-2.5 flex items-start gap-3 transition-all duration-300 ${aiLoadingStep >= 1 ? "opacity-100" : "opacity-30"}`}>
                      <Navigation className="size-4 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">Driver Location</p>
                          {aiLoadingStep >= 1 ? (
                            <>
                              {selectedLoad.aiRecommendations.driverLocation.status === "good" && (
                                <CircleCheck className="size-4 text-green-600" />
                              )}
                              {selectedLoad.aiRecommendations.driverLocation.status === "warning" && (
                                <CircleAlert className="size-4 text-amber-500" />
                              )}
                              {selectedLoad.aiRecommendations.driverLocation.status === "bad" && (
                                <XCircle className="size-4 text-red-500" />
                              )}
                            </>
                          ) : (
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                          )}
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          {aiLoadingStep >= 1 ? selectedLoad.aiRecommendations.driverLocation.driver : "Searching..."}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {aiLoadingStep >= 1 ? `${selectedLoad.aiRecommendations.driverLocation.distance} from pickup • ${selectedLoad.aiRecommendations.driverLocation.location}` : ""}
                        </p>
                      </div>
                    </div>

                    {/* HOS Status */}
                    <div className={`px-4 py-2.5 flex items-start gap-3 transition-all duration-300 ${aiLoadingStep >= 2 ? "opacity-100" : "opacity-30"}`}>
                      <Timer className="size-4 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">HOS Status</p>
                          {aiLoadingStep >= 2 ? (
                            <>
                              {selectedLoad.aiRecommendations.hosStatus.status === "good" && (
                                <CircleCheck className="size-4 text-green-600" />
                              )}
                              {selectedLoad.aiRecommendations.hosStatus.status === "warning" && (
                                <CircleAlert className="size-4 text-amber-500" />
                              )}
                              {selectedLoad.aiRecommendations.hosStatus.status === "neutral" && (
                                <CircleMinus className="size-4 text-gray-400" />
                              )}
                            </>
                          ) : (
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                          )}
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          {aiLoadingStep >= 2 ? `${selectedLoad.aiRecommendations.hosStatus.hoursAvailable} available` : "Checking..."}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {aiLoadingStep >= 2 ? selectedLoad.aiRecommendations.hosStatus.message : ""}
                        </p>
                      </div>
                    </div>

                    {/* Equipment Match */}
                    <div className={`px-4 py-2.5 flex items-start gap-3 transition-all duration-300 ${aiLoadingStep >= 3 ? "opacity-100" : "opacity-30"}`}>
                      <Truck className="size-4 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">Equipment Match</p>
                          {aiLoadingStep >= 3 ? (
                            <>
                              {selectedLoad.aiRecommendations.equipmentMatch.status === "good" && (
                                <CircleCheck className="size-4 text-green-600" />
                              )}
                              {selectedLoad.aiRecommendations.equipmentMatch.status === "warning" && (
                                <CircleAlert className="size-4 text-amber-500" />
                              )}
                            </>
                          ) : (
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                          )}
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          {aiLoadingStep >= 3 ? selectedLoad.aiRecommendations.equipmentMatch.trailer : "Matching..."}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {aiLoadingStep >= 3 ? selectedLoad.aiRecommendations.equipmentMatch.position : ""}
                        </p>
                      </div>
                    </div>

                    {/* Deadhead Calculation */}
                    <div className={`px-4 py-2.5 flex items-start gap-3 transition-all duration-300 ${aiLoadingStep >= 4 ? "opacity-100" : "opacity-30"}`}>
                      <Route className="size-4 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">Deadhead Calculation</p>
                          {aiLoadingStep >= 4 ? (
                            <>
                              {selectedLoad.aiRecommendations.deadhead.status === "good" && (
                                <CircleCheck className="size-4 text-green-600" />
                              )}
                              {selectedLoad.aiRecommendations.deadhead.status === "warning" && (
                                <CircleAlert className="size-4 text-amber-500" />
                              )}
                              {selectedLoad.aiRecommendations.deadhead.status === "bad" && (
                                <XCircle className="size-4 text-red-500" />
                              )}
                            </>
                          ) : (
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                          )}
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          {aiLoadingStep >= 4 ? `${selectedLoad.aiRecommendations.deadhead.miles} empty miles` : "Calculating..."}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {aiLoadingStep >= 4 ? `Estimated cost: ${selectedLoad.aiRecommendations.deadhead.cost}` : ""}
                        </p>
                      </div>
                    </div>

                    {/* Profitability Score */}
                    <div className={`px-4 py-2.5 flex items-start gap-3 transition-all duration-300 ${aiLoadingStep >= 5 ? "opacity-100" : "opacity-30"}`}>
                      <TrendingUp className="size-4 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">Profitability Score</p>
                          {aiLoadingStep >= 5 ? (
                            <>
                              {selectedLoad.aiRecommendations.profitability.status === "good" && (
                                <CircleCheck className="size-4 text-green-600" />
                              )}
                              {selectedLoad.aiRecommendations.profitability.status === "warning" && (
                                <CircleAlert className="size-4 text-amber-500" />
                              )}
                            </>
                          ) : (
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                          )}
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          {aiLoadingStep >= 5 ? `${selectedLoad.aiRecommendations.profitability.score} profitable` : "Analyzing..."}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {aiLoadingStep >= 5 ? `Estimated margin: ${selectedLoad.aiRecommendations.profitability.margin}` : ""}
                        </p>
                      </div>
                    </div>

                    {/* Next Load Positioning */}
                    <div className={`px-4 py-2.5 flex items-start gap-3 transition-all duration-300 ${aiLoadingStep >= 6 ? "opacity-100" : "opacity-30"}`}>
                      <MapPin className="size-4 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">Next Load Positioning</p>
                          {aiLoadingStep >= 6 ? (
                            <>
                              {selectedLoad.aiRecommendations.nextLoadPositioning.status === "good" && (
                                <CircleCheck className="size-4 text-green-600" />
                              )}
                              {selectedLoad.aiRecommendations.nextLoadPositioning.status === "warning" && (
                                <CircleAlert className="size-4 text-amber-500" />
                              )}
                              {selectedLoad.aiRecommendations.nextLoadPositioning.status === "neutral" && (
                                <CircleMinus className="size-4 text-gray-400" />
                              )}
                            </>
                          ) : (
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                          )}
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          {aiLoadingStep >= 6 ? selectedLoad.aiRecommendations.nextLoadPositioning.message : "Evaluating..."}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {aiLoadingStep >= 6 ? selectedLoad.aiRecommendations.nextLoadPositioning.suggestion : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <SheetFooter className="border-t pt-4">
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                onClick={handleDecline}
              >
                <XCircle className="size-4 mr-2" />
                Decline
              </Button>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                onClick={handleAccept}
              >
                <CheckCircle className="size-4 mr-2" />
                Accept
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Decline Dialog */}
      <Dialog open={isDeclineDialogOpen} onOpenChange={setIsDeclineDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-rose-600">
              <XCircle className="size-5" />
              Decline Load
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {selectedLoad && (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm font-mono font-medium">{selectedLoad.loadId}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedLoad.origin.city}, {selectedLoad.origin.state} → {selectedLoad.destination.city}, {selectedLoad.destination.state}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="declineReason">Reason for Declining <span className="text-rose-500">*</span></Label>
              <Select value={declineReason} onValueChange={setDeclineReason}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a reason..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-driver">No Driver Available</SelectItem>
                  <SelectItem value="no-equipment">No Equipment Available</SelectItem>
                  <SelectItem value="rate-too-low">Rate Too Low</SelectItem>
                  <SelectItem value="route-not-serviceable">Route Not Serviceable</SelectItem>
                  <SelectItem value="time-constraint">Cannot Meet Time Requirements</SelectItem>
                  <SelectItem value="capacity-full">At Full Capacity</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="declineNotes">Additional Notes</Label>
              <Textarea
                id="declineNotes"
                placeholder="Provide any additional details about why this load is being declined..."
                value={declineNotes}
                onChange={(e) => setDeclineNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleDeclineCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeclineSubmit}
              disabled={!declineReason}
              className="flex-1 bg-rose-600 hover:bg-rose-700 text-white"
            >
              Confirm Decline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BulkOrders;
