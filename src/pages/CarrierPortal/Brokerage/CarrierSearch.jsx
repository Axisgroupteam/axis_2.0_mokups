import { useState } from "react";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Search,
  Star,
  Shield,
  Phone,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

const CarrierSearch = () => {
  const [searchPerformed, setSearchPerformed] = useState(true);

  // Mock data for carrier search results
  const carriersData = [
    {
      id: 1,
      carrierName: "Swift Transport LLC",
      mcNumber: "MC-123456",
      dotNumber: "DOT-789012",
      contactName: "Mike Johnson",
      phone: "+1 (555) 111-2222",
      email: "dispatch@swifttransport.com",
      insuranceStatus: "Current",
      safetyScore: 98,
      laneHistory: "15 loads",
      avgRate: "$2.50/mi",
      onTimeDelivery: "96%",
      status: "Active",
    },
    {
      id: 2,
      carrierName: "Reliable Freight Inc",
      mcNumber: "MC-234567",
      dotNumber: "DOT-890123",
      contactName: "Sarah Williams",
      phone: "+1 (555) 222-3333",
      email: "ops@reliablefreight.com",
      insuranceStatus: "Current",
      safetyScore: 95,
      laneHistory: "8 loads",
      avgRate: "$2.65/mi",
      onTimeDelivery: "94%",
      status: "Active",
    },
    {
      id: 3,
      carrierName: "Premier Hauling Co",
      mcNumber: "MC-345678",
      dotNumber: "DOT-901234",
      contactName: "John Davis",
      phone: "+1 (555) 333-4444",
      email: "john@premierhauling.com",
      insuranceStatus: "Expiring Soon",
      safetyScore: 92,
      laneHistory: "3 loads",
      avgRate: "$2.45/mi",
      onTimeDelivery: "91%",
      status: "Active",
    },
  ];

  const getInsuranceBadge = (status) => {
    const colors = {
      "Current": "bg-green-500/10 text-green-700 border-green-500/50",
      "Expiring Soon": "bg-yellow-500/10 text-yellow-700 border-yellow-500/50",
      "Expired": "bg-red-500/10 text-red-700 border-red-500/50",
    };
    return (
      <Badge className={`${colors[status] || ""} flex items-center gap-1`}>
        {status === "Current" ? <CheckCircle className="size-3" /> : <AlertCircle className="size-3" />}
        {status}
      </Badge>
    );
  };

  const getSafetyBadge = (score) => {
    let color = "bg-green-500/10 text-green-700 border-green-500/50";
    if (score < 90) color = "bg-yellow-500/10 text-yellow-700 border-yellow-500/50";
    if (score < 80) color = "bg-red-500/10 text-red-700 border-red-500/50";
    return (
      <Badge className={`${color} flex items-center gap-1`}>
        <Shield className="size-3" />
        {score}%
      </Badge>
    );
  };

  const carriersColumns = [
    {
      accessorKey: "carrierName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Carrier" />,
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.getValue("carrierName")}</p>
          <p className="text-xs text-muted-foreground">{row.original.mcNumber}</p>
        </div>
      ),
    },
    {
      accessorKey: "contactName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Contact" />,
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.getValue("contactName")}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="size-3" />
            {row.original.phone}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "insuranceStatus",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Insurance" />,
      cell: ({ row }) => getInsuranceBadge(row.getValue("insuranceStatus")),
    },
    {
      accessorKey: "safetyScore",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Safety Score" />,
      cell: ({ row }) => getSafetyBadge(row.getValue("safetyScore")),
    },
    {
      accessorKey: "laneHistory",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Lane History" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <TrendingUp className="size-3 text-blue-600" />
          {row.getValue("laneHistory")}
        </div>
      ),
    },
    {
      accessorKey: "avgRate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Avg Rate" />,
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("avgRate")}</span>
      ),
    },
    {
      accessorKey: "onTimeDelivery",
      header: ({ column }) => <DataTableColumnHeader column={column} title="On-Time %" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Star className="size-3 text-yellow-500" />
          {row.getValue("onTimeDelivery")}
        </div>
      ),
    },
    {
      id: "actions",
      cell: () => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Phone className="size-3 mr-1" />
            Call
          </Button>
          <Button size="sm" className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
            <Send className="size-3 mr-1" />
            Tender
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden p-4">
      {/* Search Filters */}
      <div className="border rounded-lg p-4 bg-card mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
          <Search className="size-4" />
          Carrier Search - Find External Coverage
        </h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label>Origin</Label>
            <Input placeholder="City, State" defaultValue="Houston, TX" />
          </div>
          <div className="space-y-2">
            <Label>Destination</Label>
            <Input placeholder="City, State" defaultValue="Phoenix, AZ" />
          </div>
          <div className="space-y-2">
            <Label>Equipment Type</Label>
            <Select defaultValue="flatbed">
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flatbed">Flatbed</SelectItem>
                <SelectItem value="pneumatic">Pneumatic</SelectItem>
                <SelectItem value="end-dump">End Dump</SelectItem>
                <SelectItem value="lowboy">Lowboy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Min Safety Score</Label>
            <Select defaultValue="90">
              <SelectTrigger>
                <SelectValue placeholder="Select score" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="95">95+</SelectItem>
                <SelectItem value="90">90+</SelectItem>
                <SelectItem value="85">85+</SelectItem>
                <SelectItem value="80">80+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>&nbsp;</Label>
            <Button className="w-full bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
              <Search className="size-4 mr-2" />
              Search Carriers
            </Button>
          </div>
        </div>
      </div>

      {/* AI Carrier Matching Info */}
      <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/30 mb-4">
        <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2 mb-2">
          <Search className="size-4" />
          AI Carrier Matching Agent
        </h3>
        <div className="grid grid-cols-4 gap-4 text-xs text-blue-700 dark:text-blue-300">
          <div>
            <p className="font-medium">Lane History</p>
            <p className="text-muted-foreground">Previous loads on this lane</p>
          </div>
          <div>
            <p className="font-medium">Compliance Check</p>
            <p className="text-muted-foreground">Insurance & Authority status</p>
          </div>
          <div>
            <p className="font-medium">Safety Score</p>
            <p className="text-muted-foreground">FMCSA safety rating</p>
          </div>
          <div>
            <p className="font-medium">Performance</p>
            <p className="text-muted-foreground">On-time delivery rate</p>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchPerformed && (
        <div className="border rounded-sm bg-card flex-1">
          <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <CheckCircle className="size-4 text-green-600" />
              {carriersData.length} Carriers Found (Ranked by AI)
            </h3>
            <span className="text-xs text-muted-foreground">
              Load: ML-2025-001240 | Houston, TX → Phoenix, AZ | Flatbed
            </span>
          </div>
          <div className="p-4">
            <DataTable
              columns={carriersColumns}
              data={carriersData}
              showViewOptions={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CarrierSearch;
