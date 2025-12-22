import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);

  // Mock data - one row per customer with carrier
  const customers = [
    { id: 1, customer: "Titan", carriers: ["Mega Trucking"], code: "TTN-001", email: "contact@titan.com", status: true },
    { id: 2, customer: "Ashgrove", carriers: ["Mega Trucking"], code: "ASH-001", email: "info@ashgrove.com", status: true },
    { id: 3, customer: "TQL", carriers: ["Mega Trucking"], code: "TQL-001", email: "support@tql.com", status: true },
    { id: 4, customer: "Martin Marietta", carriers: ["FastFreight Inc", "SwiftHaul Co"], code: "MMT-001", email: "ops@martinmarietta.com", status: true },
    { id: 5, customer: "Vulcan Materials", carriers: ["ExpressLine Corp", "SpeedyCargo Ltd", "QuickShip LLC"], code: "VLN-001", email: "hello@vulcanmaterials.com", status: true },
    { id: 6, customer: "Heidelberg", carriers: ["TruckMaster Inc", "CargoKing LLC"], code: "HDB-001", email: "contact@heidelberg.com", status: true },
    { id: 7, customer: "Cemex", carriers: ["CityHaul Inc", "UrbanLogix Ltd", "FreightPro Co"], code: "CMX-001", email: "info@cemex.com", status: true },
    { id: 8, customer: "Holcim", carriers: ["CoastLine Cargo", "OceanBound LLC"], code: "HLM-001", email: "ops@holcim.com", status: true },
    { id: 9, customer: "CRH", carriers: ["MidState Trucking", "HeartlandHaul Co", "AtlanticFreight Inc"], code: "CRH-001", email: "dispatch@crh.com", status: true },
    { id: 10, customer: "Summit Materials", carriers: ["SnowLine Cargo", "FrostHaul LLC"], code: "SMT-001", email: "info@summitmaterials.com", status: false },
    { id: 11, customer: "Eagle Materials", carriers: ["SunBelt Trucking", "GulfCoast Haulers", "Alpine Transport"], code: "EGL-001", email: "support@eaglematerials.com", status: true },
    { id: 12, customer: "US Concrete", carriers: ["RiverRun Express", "Delta Freight"], code: "USC-001", email: "ops@usconcrete.com", status: true },
    { id: 13, customer: "Knife River", carriers: ["Harbor Logistics", "Bayfront Trucking"], code: "KNR-001", email: "contact@kniferiver.com", status: true },
    { id: 14, customer: "Granite Construction", carriers: ["Heartland Express", "Plains Hauling", "Summit Carriers"], code: "GRC-001", email: "info@graniteconstruction.com", status: false },
    { id: 15, customer: "Boise Cascade", carriers: ["Timber Transport", "Evergreen Carriers"], code: "BSC-001", email: "hello@boisecascade.com", status: true },
  ];

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "customer",
          label: "Customer",
          type: "input",
          group: "Basic",
          placeholder: "Enter customer name...",
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
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/app/customers/${customer.id}`)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "customer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <span
            className="hover:underline cursor-pointer"
            onClick={() => navigate(`/app/customers/${customer.id}`)}
          >
            {customer.customer}
          </span>
        );
      },
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
        {/* Filter and Add Customer */}
        <div className="flex items-center justify-between mb-4">
          <SmartFilter
            filterGroups={filterGroups}
            onFiltersChange={handleFiltersChange}
          />
          <Button className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
            <PlusIcon className="size-4 mr-2" />
            Add Customer
          </Button>
        </div>

        {/* Data Table */}
        <DataTable columns={columns} data={customers} showViewOptions={false} />
      </div>
    </div>
  );
};

export default Shippers;
