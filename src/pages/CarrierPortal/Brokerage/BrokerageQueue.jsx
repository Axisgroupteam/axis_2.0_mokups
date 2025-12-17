import { useState } from "react";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
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
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Inbox,
  MapPin,
  Calendar,
  Truck,
  DollarSign,
  MoreHorizontal,
  Eye,
  Search,
  XCircle,
  CheckCircle,
  Send,
  Star,
  X,
  Sparkles,
  Loader2,
  CircleCheck,
  CircleAlert,
  ShieldCheck,
  Route,
  Clock,
  TrendingUp,
  Navigation,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const BrokerageQueue = () => {
  const [isTenderSheetOpen, setIsTenderSheetOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [carrierRate, setCarrierRate] = useState("");
  const [selectedCarrier, setSelectedCarrier] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiLoadingStep, setAiLoadingStep] = useState(0);

  const aiAnalysisKeys = [
    "safetyScore",
    "equipmentAvailability",
    "laneHistory",
    "currentLocation",
    "rateCompetitiveness",
    "onTimePerformance",
  ];

  // All available carriers for manual search
  const allCarriers = [
    "Swift Transport",
    "JB Hunt",
    "Werner Logistics",
    "Schneider National",
    "Landstar",
    "Knight Transportation",
    "Heartland Express",
    "USA Truck",
    "Covenant Transport",
    "Celadon Trucking",
  ];

  const [visibleCarriers, setVisibleCarriers] = useState(0);
  const [expandedCarrier, setExpandedCarrier] = useState(0); // Index of expanded carrier, 0 = first carrier

  const handleTenderLoad = (load) => {
    setSelectedLoad(load);
    setCarrierRate("");
    setSelectedCarrier("");
    setIsTenderSheetOpen(true);
    setVisibleCarriers(0);
    setExpandedCarrier(0); // Reset to first carrier expanded

    // Start AI loading animation
    setIsAiLoading(true);
    setAiLoadingStep(0);

    // Animate carriers appearing one by one
    const carriersCount = load.carriersFound?.length || 0;
    for (let i = 0; i < carriersCount; i++) {
      setTimeout(() => {
        setVisibleCarriers(i + 1);
        // Auto-select first carrier when it appears
        if (i === 0) {
          setSelectedCarrier(load.carriersFound?.[0]?.name || "");
        }
      }, (i + 1) * 600);
    }

    // Animate through each analysis step after first carrier appears
    setTimeout(() => {
      aiAnalysisKeys.forEach((_, index) => {
        setTimeout(() => {
          setAiLoadingStep(index + 1);
          if (index === aiAnalysisKeys.length - 1) {
            setTimeout(() => {
              setIsAiLoading(false);
            }, 300);
          }
        }, (index + 1) * 300);
      });
    }, 600);
  };

  // Mock data for all brokerage loads with different statuses
  const queueData = [
    // Released
    {
      id: 1,
      loadId: "ML-2025-001240",
      customerName: "ABC Logistics",
      origin: "Houston, TX",
      destination: "Phoenix, AZ",
      pickupDate: "2024-01-29",
      equipment: "Flatbed",
      customerRate: "$3,200.00",
      carrierRate: "-",
      margin: "-",
      status: "Released",
      carriersFound: [
        {
          name: "Swift Transport",
          matchScore: 98,
          aiAnalysis: {
            safetyScore: { status: "good", score: "98%", message: "Excellent safety record" },
            equipmentAvailability: { status: "good", equipment: "Flatbed available", location: "Houston yard" },
            laneHistory: { status: "good", trips: "47 trips", message: "Experienced on this lane" },
            currentLocation: { status: "good", distance: "15 miles", location: "Katy, TX" },
            rateCompetitiveness: { status: "good", rate: "$2,750", message: "Below market avg" },
            onTimePerformance: { status: "good", rate: "96%", message: "Highly reliable" },
          },
        },
        {
          name: "JB Hunt",
          matchScore: 92,
          aiAnalysis: {
            safetyScore: { status: "good", score: "95%", message: "Strong safety record" },
            equipmentAvailability: { status: "warning", equipment: "Flatbed en route", location: "30 miles out" },
            laneHistory: { status: "good", trips: "28 trips", message: "Familiar with lane" },
            currentLocation: { status: "warning", distance: "45 miles", location: "Sugar Land, TX" },
            rateCompetitiveness: { status: "good", rate: "$2,850", message: "Market rate" },
            onTimePerformance: { status: "good", rate: "94%", message: "Very reliable" },
          },
        },
        {
          name: "Werner Logistics",
          matchScore: 85,
          aiAnalysis: {
            safetyScore: { status: "good", score: "92%", message: "Good safety record" },
            equipmentAvailability: { status: "good", equipment: "Flatbed available", location: "Same city" },
            laneHistory: { status: "warning", trips: "8 trips", message: "Limited lane experience" },
            currentLocation: { status: "good", distance: "20 miles", location: "Houston, TX" },
            rateCompetitiveness: { status: "warning", rate: "$2,950", message: "Above market avg" },
            onTimePerformance: { status: "good", rate: "91%", message: "Reliable" },
          },
        },
      ],
    },
    {
      id: 2,
      loadId: "ML-2025-001241",
      customerName: "BuildRight Construction",
      origin: "Dallas, TX",
      destination: "Oklahoma City, OK",
      pickupDate: "2024-01-29",
      equipment: "Walking Floor",
      customerRate: "$1,500.00",
      carrierRate: "-",
      margin: "-",
      status: "Released",
    },
    // Tendered
    {
      id: 3,
      loadId: "ML-2025-001238",
      customerName: "Metro Materials",
      origin: "Austin, TX",
      destination: "El Paso, TX",
      pickupDate: "2024-01-30",
      equipment: "Pneumatic",
      customerRate: "$2,800.00",
      carrierRate: "$2,400.00",
      margin: "$400.00",
      status: "Tendered",
      carrierName: "Swift Transport LLC",
    },
    {
      id: 4,
      loadId: "ML-2025-001239",
      customerName: "Texas Steel Works",
      origin: "Fort Worth, TX",
      destination: "Memphis, TN",
      pickupDate: "2024-01-30",
      equipment: "Flatbed",
      customerRate: "$2,500.00",
      carrierRate: "$2,100.00",
      margin: "$400.00",
      status: "Tendered",
      carrierName: "Reliable Freight Inc",
    },
    // Covered
    {
      id: 5,
      loadId: "ML-2025-001235",
      customerName: "Gulf Coast Concrete",
      origin: "Corpus Christi, TX",
      destination: "San Antonio, TX",
      pickupDate: "2024-01-31",
      equipment: "Walking Floor",
      customerRate: "$1,800.00",
      carrierRate: "$1,400.00",
      margin: "$400.00",
      status: "Covered",
      carrierName: "Schneider National",
    },
    {
      id: 6,
      loadId: "ML-2025-001236",
      customerName: "Premier Precast",
      origin: "El Paso, TX",
      destination: "Albuquerque, NM",
      pickupDate: "2024-01-29",
      equipment: "Flatbed",
      customerRate: "$4,800.00",
      carrierRate: "$4,200.00",
      margin: "$600.00",
      status: "Covered",
      carrierName: "Mountain West Trucking",
    },
    // In Transit
    {
      id: 7,
      loadId: "ML-2025-001232",
      customerName: "Texas Steel Co",
      origin: "Fort Worth, TX",
      destination: "Tulsa, OK",
      pickupDate: "2024-01-28",
      equipment: "Flatbed",
      customerRate: "$2,400.00",
      carrierRate: "$2,000.00",
      margin: "$400.00",
      status: "In Transit",
      carrierName: "Central Plains Freight",
    },
    // Delivered
    {
      id: 8,
      loadId: "ML-2025-001230",
      customerName: "Gulf Coast Materials",
      origin: "Corpus Christi, TX",
      destination: "Houston, TX",
      pickupDate: "2024-01-27",
      equipment: "Pneumatic",
      customerRate: "$1,600.00",
      carrierRate: "$1,300.00",
      margin: "$300.00",
      status: "Delivered",
      carrierName: "Coastal Transport LLC",
    },
    // Failed
    {
      id: 9,
      loadId: "ML-2025-001233",
      customerName: "ABC Logistics",
      origin: "Lubbock, TX",
      destination: "Amarillo, TX",
      pickupDate: "2024-01-30",
      equipment: "Flatbed",
      customerRate: "$1,200.00",
      carrierRate: "-",
      margin: "-",
      status: "Failed",
    },
  ];

  const getStatusBadge = (status) => {
    const colors = {
      "Released": "bg-orange-500/10 text-orange-700 border-orange-500/50",
      "Tendered": "bg-yellow-500/10 text-yellow-700 border-yellow-500/50",
      "Covered": "bg-blue-500/10 text-blue-700 border-blue-500/50",
      "In Transit": "bg-purple-500/10 text-purple-700 border-purple-500/50",
      "Delivered": "bg-green-500/10 text-green-700 border-green-500/50",
      "Failed": "bg-red-500/10 text-red-700 border-red-500/50",
    };
    const icons = {
      "Released": <Inbox className="size-3 mr-1" />,
      "Tendered": <Send className="size-3 mr-1" />,
      "Covered": <CheckCircle className="size-3 mr-1" />,
      "In Transit": <Truck className="size-3 mr-1" />,
      "Delivered": <CheckCircle className="size-3 mr-1" />,
      "Failed": <XCircle className="size-3 mr-1" />,
    };
    return (
      <Badge className={`${colors[status] || ""} flex items-center`}>
        {icons[status]}
        {status}
      </Badge>
    );
  };

  const queueColumns = [
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const status = row.original.status;
        const hasCarriers = row.original.carriersFound?.length > 0;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="size-8 p-0">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <Eye className="size-4 mr-2" />
                View Details
              </DropdownMenuItem>
              {status === "Released" && hasCarriers && (
                <DropdownMenuItem onClick={() => handleTenderLoad(row.original)}>
                  <Send className="size-4 mr-2" />
                  Tender Load
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: "loadId",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Load ID" />,
      cell: ({ row }) => (
        <span className="font-mono text-sm font-medium">{row.getValue("loadId")}</span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => getStatusBadge(row.getValue("status")),
    },
    {
      accessorKey: "customerName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    },
    {
      accessorKey: "origin",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Origin" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <MapPin className="size-3 text-green-600" />
          {row.getValue("origin")}
        </div>
      ),
    },
    {
      accessorKey: "destination",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Destination" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <MapPin className="size-3 text-red-600" />
          {row.getValue("destination")}
        </div>
      ),
    },
    {
      accessorKey: "pickupDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Pickup" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Calendar className="size-3 text-muted-foreground" />
          {row.getValue("pickupDate")}
        </div>
      ),
    },
    {
      accessorKey: "equipment",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Equipment" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Truck className="size-3 text-muted-foreground" />
          {row.getValue("equipment")}
        </div>
      ),
    },
    {
      accessorKey: "customerRate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Rate" />,
      cell: ({ row }) => (
        <span className="font-medium text-green-600">{row.getValue("customerRate")}</span>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden p-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-orange-600 mb-1">
            <Inbox className="size-4" />
            <span className="text-xs">Released</span>
          </div>
          <p className="text-2xl font-bold text-orange-600">{queueData.filter(d => d.status === "Released").length}</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-yellow-600 mb-1">
            <Send className="size-4" />
            <span className="text-xs">Tendered</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{queueData.filter(d => d.status === "Tendered").length}</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-purple-600 mb-1">
            <Truck className="size-4" />
            <span className="text-xs">In Transit</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">{queueData.filter(d => d.status === "In Transit").length}</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-red-600 mb-1">
            <XCircle className="size-4" />
            <span className="text-xs">Ignored by Carrier</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{queueData.filter(d => d.status === "Failed").length}</p>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <CheckCircle className="size-4" />
            <span className="text-xs">Covered</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{queueData.filter(d => d.status === "Covered").length}</p>
        </div>
      </div>

      {/* Queue Table */}
      <DataTable
        columns={queueColumns}
        data={queueData}
        showViewOptions={false}
      />

      {/* Tender Load Sheet */}
      <Sheet open={isTenderSheetOpen} onOpenChange={setIsTenderSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl p-0 flex flex-col [&>button]:hidden">
          {/* Header */}
          <div className="px-6 py-3 border-b bg-muted flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold">Tender Load</SheetTitle>
            <Button
              variant="ghost"
              size="sm"
              className="size-8 p-0"
              onClick={() => setIsTenderSheetOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6 space-y-6">
            {/* Load Info */}
            <div className="border rounded-sm bg-card">
              <div className="px-4 py-3 border-b bg-muted">
                <h3 className="text-sm font-semibold">Load Information</h3>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Load ID</p>
                    <p className="text-sm font-medium font-mono">{selectedLoad?.loadId}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Customer</p>
                    <p className="text-sm font-medium">{selectedLoad?.customerName}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Origin</p>
                    <p className="text-sm font-medium">{selectedLoad?.origin}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Destination</p>
                    <p className="text-sm font-medium">{selectedLoad?.destination}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Equipment</p>
                    <p className="text-sm font-medium">{selectedLoad?.equipment}</p>
                  </div>
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Customer Rate</p>
                    <p className="text-sm font-medium text-green-600">{selectedLoad?.customerRate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Carrier Matching */}
            <div className="border rounded-sm bg-card">
              <div className="px-4 py-3 border-b bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isAiLoading ? (
                    <Loader2 className="size-4 text-purple-600 animate-spin" />
                  ) : (
                    <Sparkles className="size-4 text-purple-600" />
                  )}
                  <h3 className="text-sm font-semibold">AI Carrier Matching</h3>
                </div>
                {isAiLoading && (
                  <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-700 border-purple-500/30">
                    Finding carriers...
                  </Badge>
                )}
              </div>
              <div className="p-4 space-y-3">
                {/* Loading placeholder when no carriers visible yet */}
                {visibleCarriers === 0 && (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="size-8 text-purple-600 animate-spin" />
                      <p className="text-sm text-muted-foreground">Searching for best carriers...</p>
                    </div>
                  </div>
                )}

                {/* Best Match - First Carrier */}
                {visibleCarriers >= 1 && selectedLoad?.carriersFound?.[0] && (
                  <div className="rounded-sm overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 bg-card border shadow-sm">
                    <div
                      className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-muted/50"
                      onClick={() => setExpandedCarrier(expandedCarrier === 0 ? -1 : 0)}
                    >
                      <div className="flex items-center gap-3">
                        <Truck className="size-4 text-foreground" />
                        <span className="text-sm font-medium">{selectedLoad?.carriersFound?.[0]?.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="text-[10px] h-5 bg-green-500/10 text-green-700 border-green-500/50">
                          {selectedLoad?.carriersFound?.[0]?.matchScore}% Match
                        </Badge>
                        <ChevronDown className={`size-4 text-muted-foreground transition-transform duration-200 ${expandedCarrier === 0 ? "rotate-180" : ""}`} />
                      </div>
                    </div>

                    {/* AI Analysis */}
                    {expandedCarrier === 0 && selectedLoad?.carriersFound?.[0]?.aiAnalysis && (
                      <div className="border-t p-3">
                        <div className="grid grid-cols-3 gap-2">
                          {(() => {
                            const analysis = selectedLoad?.carriersFound?.[0]?.aiAnalysis;
                            const metrics = [
                              { label: "Safety", value: analysis.safetyScore.score, status: analysis.safetyScore.status, step: 1, icon: ShieldCheck },
                              { label: "Equipment", value: analysis.equipmentAvailability.equipment, status: analysis.equipmentAvailability.status, step: 2, icon: Truck },
                              { label: "Lane Exp.", value: analysis.laneHistory.trips, status: analysis.laneHistory.status, step: 3, icon: Route },
                              { label: "Distance", value: analysis.currentLocation.distance, status: analysis.currentLocation.status, step: 4, icon: Navigation },
                              { label: "Est. Rate", value: analysis.rateCompetitiveness.rate, status: analysis.rateCompetitiveness.status, step: 5, icon: DollarSign },
                              { label: "On-Time", value: analysis.onTimePerformance.rate, status: analysis.onTimePerformance.status, step: 6, icon: Clock },
                            ];
                            return metrics.map((metric, idx) => {
                              const Icon = metric.icon;
                              const isGood = metric.status === "good";
                              return (
                                <div key={idx} className="rounded-sm border bg-card p-2.5 relative">
                                  {aiLoadingStep >= metric.step && (
                                    <div className={`absolute top-2 right-2 size-2 rounded-full ${isGood ? "bg-emerald-500" : "bg-orange-500"}`} />
                                  )}
                                  <div className="flex items-center gap-1.5 mb-1">
                                    {aiLoadingStep >= metric.step ? (
                                      <Icon className="size-3.5 text-muted-foreground" />
                                    ) : (
                                      <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
                                    )}
                                    <span className="text-[11px] text-muted-foreground">{metric.label}</span>
                                  </div>
                                  <p className={`text-sm font-semibold ${aiLoadingStep >= metric.step ? "text-foreground" : "text-muted-foreground"}`}>
                                    {aiLoadingStep >= metric.step ? metric.value : "..."}
                                  </p>
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Other Matches - Animated */}
                {selectedLoad?.carriersFound?.slice(1).map((carrier, index) => (
                  visibleCarriers >= index + 2 && (
                    <div
                      key={index}
                      className="rounded-sm overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 bg-card border shadow-sm"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div
                        className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-muted/50"
                        onClick={() => setExpandedCarrier(expandedCarrier === index + 1 ? -1 : index + 1)}
                      >
                        <div className="flex items-center gap-3">
                          <Truck className="size-4 text-foreground" />
                          <span className="text-sm font-medium">{carrier.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="text-[10px] h-5 bg-blue-500/10 text-blue-700 border-blue-500/50">
                            {carrier.matchScore}% Match
                          </Badge>
                          <ChevronDown className={`size-4 text-muted-foreground transition-transform duration-200 ${expandedCarrier === index + 1 ? "rotate-180" : ""}`} />
                        </div>
                      </div>

                      {/* AI Analysis */}
                      {expandedCarrier === index + 1 && carrier.aiAnalysis && (
                        <div className="border-t p-3">
                          <div className="grid grid-cols-3 gap-2">
                            {(() => {
                              const analysis = carrier.aiAnalysis;
                              const metrics = [
                                { label: "Safety", value: analysis.safetyScore.score, status: analysis.safetyScore.status, icon: ShieldCheck },
                                { label: "Equipment", value: analysis.equipmentAvailability.equipment, status: analysis.equipmentAvailability.status, icon: Truck },
                                { label: "Lane Exp.", value: analysis.laneHistory.trips, status: analysis.laneHistory.status, icon: Route },
                                { label: "Distance", value: analysis.currentLocation.distance, status: analysis.currentLocation.status, icon: Navigation },
                                { label: "Est. Rate", value: analysis.rateCompetitiveness.rate, status: analysis.rateCompetitiveness.status, icon: DollarSign },
                                { label: "On-Time", value: analysis.onTimePerformance.rate, status: analysis.onTimePerformance.status, icon: Clock },
                              ];
                              return metrics.map((metric, idx) => {
                                const Icon = metric.icon;
                                const isGood = metric.status === "good";
                                return (
                                  <div key={idx} className="rounded-sm border bg-card p-2.5 relative">
                                    <div className={`absolute top-2 right-2 size-2 rounded-full ${isGood ? "bg-emerald-500" : "bg-orange-500"}`} />
                                    <div className="flex items-center gap-1.5 mb-1">
                                      <Icon className="size-3.5 text-muted-foreground" />
                                      <span className="text-[11px] text-muted-foreground">{metric.label}</span>
                                    </div>
                                    <p className="text-sm font-semibold text-foreground">
                                      {metric.value}
                                    </p>
                                  </div>
                                );
                              });
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Carrier Selection & Rate */}
            <div className="border rounded-sm bg-card">
              <div className="px-4 py-3 border-b bg-muted">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Truck className="size-4" />
                  Carrier Selection & Rate
                </h3>
              </div>
              <div className="p-4 space-y-4">
                {/* Carrier Selection */}
                <div>
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Search className="size-4" />
                    Select Carrier
                  </Label>
                  <Select
                    value={selectedCarrier}
                    onValueChange={(value) => setSelectedCarrier(value)}
                  >
                    <SelectTrigger className="w-full mt-1.5">
                      <SelectValue placeholder="Search and select carrier..." />
                    </SelectTrigger>
                    <SelectContent>
                      {allCarriers.map((carrier) => (
                        <SelectItem key={carrier} value={carrier}>
                          {carrier}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Customer Rate</Label>
                    <div className="mt-1.5 h-9 px-3 flex items-center border rounded-sm bg-muted">
                      <span className="text-sm font-medium text-green-600">
                        {selectedLoad?.customerRate}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Carrier Rate</Label>
                    <Input
                      type="text"
                      placeholder="Enter carrier rate"
                      className="mt-1.5"
                      value={carrierRate}
                      onChange={(e) => setCarrierRate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                      Margin
                    </span>
                    <span className="text-lg font-bold text-blue-700 dark:text-blue-400">
                      {carrierRate
                        ? `$${(
                            parseFloat(selectedLoad?.customerRate?.replace(/[$,]/g, "") || 0) -
                            parseFloat(carrierRate.replace(/[$,]/g, "") || 0)
                          ).toFixed(2)}`
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t bg-muted flex items-center justify-end gap-3">
            <Button variant="outline" onClick={() => setIsTenderSheetOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
              <Send className="size-4 mr-1" />
              Tender Load
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BrokerageQueue;
