import { useState, useCallback } from "react";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusIcon, MoreHorizontalIcon } from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

const Shippers = () => {
  const [filters, setFilters] = useState([]);

  // Mock data - one row per shipper with multiple carriers in array
  const shippers = [
    { id: 1, shipper: "ABC Logistics", carriers: ["FastFreight Inc", "SwiftHaul Co", "QuickShip LLC"], code: "ABC-001", email: "contact@abclogistics.com", status: true },
    { id: 2, shipper: "Global Transport", carriers: ["ExpressLine Corp", "SpeedyCargo Ltd"], code: "GLB-001", email: "info@globaltransport.com", status: true },
    { id: 3, shipper: "Prime Shipping", carriers: ["TruckMaster Inc", "CargoKing LLC", "FreightPro Co"], code: "PRM-001", email: "support@primeshipping.com", status: true },
    { id: 4, shipper: "Metro Freight", carriers: ["CityHaul Inc", "UrbanLogix Ltd"], code: "MTR-001", email: "ops@metrofreight.com", status: true },
    { id: 5, shipper: "Pacific Movers", carriers: ["CoastLine Cargo", "OceanBound LLC", "WestCoast Transit"], code: "PAC-001", email: "hello@pacificmovers.com", status: false },
    { id: 6, shipper: "Central Distribution", carriers: ["MidState Trucking", "HeartlandHaul Co"], code: "CTR-001", email: "contact@centraldist.com", status: true },
    { id: 7, shipper: "Eastern Express", carriers: ["AtlanticFreight Inc", "EastBound Logistics"], code: "EST-001", email: "info@easternexpress.com", status: true },
    { id: 8, shipper: "Northern Logistics", carriers: ["SnowLine Cargo", "FrostHaul LLC", "ArcticTransit Co"], code: "NTH-001", email: "ops@northernlog.com", status: true },
    { id: 9, shipper: "Southern Freight Co", carriers: ["SunBelt Trucking", "GulfCoast Haulers"], code: "STH-001", email: "dispatch@southernfreight.com", status: true },
    { id: 10, shipper: "Mountain Logistics", carriers: ["Alpine Transport", "Summit Carriers", "Peak Delivery"], code: "MTN-001", email: "info@mountainlog.com", status: false },
    { id: 11, shipper: "Valley Shipping", carriers: ["RiverRun Express", "Delta Freight"], code: "VLY-001", email: "support@valleyship.com", status: true },
    { id: 12, shipper: "Coastal Carriers", carriers: ["Harbor Logistics", "Bayfront Trucking", "Shoreline Express"], code: "CST-001", email: "ops@coastalcarriers.com", status: true },
    { id: 13, shipper: "Prairie Transport", carriers: ["Heartland Express", "Plains Hauling"], code: "PRT-001", email: "contact@prairietrans.com", status: true },
    { id: 14, shipper: "Desert Logistics", carriers: ["Sandstone Freight", "Cactus Carriers", "Oasis Transport"], code: "DST-001", email: "info@desertlog.com", status: false },
    { id: 15, shipper: "Lakeside Shipping", carriers: ["Waterfront Haulers", "Marina Logistics"], code: "LKS-001", email: "hello@lakesideship.com", status: true },
    { id: 16, shipper: "Forest Freight", carriers: ["Timber Transport", "Evergreen Carriers", "Woodland Express"], code: "FRT-001", email: "ops@forestfreight.com", status: true },
    { id: 17, shipper: "Island Logistics", carriers: ["Archipelago Shipping", "Reef Transport"], code: "ISL-001", email: "support@islandlog.com", status: true },
    { id: 18, shipper: "Canyon Carriers", carriers: ["Gorge Express", "Ravine Trucking", "Cliff Haulers"], code: "CNY-001", email: "info@canyoncarriers.com", status: false },
    { id: 19, shipper: "Tundra Transport", carriers: ["Permafrost Logistics", "IceCap Freight"], code: "TND-001", email: "dispatch@tundratrans.com", status: true },
    { id: 20, shipper: "Savanna Shipping", carriers: ["Grassland Carriers", "Safari Logistics", "Veldt Express"], code: "SVN-001", email: "contact@savannaship.com", status: true },
  ];

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "shipper",
          label: "Shipper",
          type: "input",
          group: "Basic",
          placeholder: "Enter shipper name...",
        },
        {
          key: "carrier",
          label: "Carrier",
          type: "input",
          group: "Basic",
          placeholder: "Enter carrier name...",
        },
        {
          key: "code",
          label: "Code",
          type: "input",
          group: "Basic",
          placeholder: "Enter code...",
        },
        {
          key: "email",
          label: "Email",
          type: "input",
          group: "Basic",
          placeholder: "Enter email...",
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

  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 80,
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
      accessorKey: "shipper",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Shipper" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "carriers",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Carrier" />
      ),
      size: 350,
      cell: ({ row }) => {
        const carriers = row.getValue("carriers");
        return (
          <div className="flex flex-wrap gap-1 max-h-[60px] overflow-y-auto">
            {carriers.map((carrier, index) => (
              <Badge
                key={index}
                className="bg-blue-500/10 text-blue-700 dark:text-blue-400 hover:bg-blue-500/30 border border-blue-500/50 text-xs whitespace-nowrap"
              >
                {carrier}
              </Badge>
            ))}
          </div>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      size: 100,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      size: 100,
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

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="px-6 py-4">
        {/* Filter and Add Shipper */}
        <div className="flex items-center justify-between mb-4">
          <SmartFilter
            filterGroups={filterGroups}
            onFiltersChange={handleFiltersChange}
          />
          <Button className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
            <PlusIcon className="size-4 mr-2" />
            Add Shipper
          </Button>
        </div>

        {/* Data Table */}
        <DataTable columns={columns} data={shippers} showViewOptions={false} />
      </div>
    </div>
  );
};

export default Shippers;
