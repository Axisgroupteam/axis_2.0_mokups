import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Inbox,
  CalendarClock,
  Truck,
  PackageCheck,
  MoreHorizontalIcon,
} from "lucide-react";

// Mock data for loads
const inboxLoads = [
  {
    loadNo: "LD-001",
    carrierLoadNo: "CLN-5001",
    commodity: "Steel Coils",
    status: "New",
    rate: "$1,850",
    customerContractId: "CTR-2024-001",
    dropOffDate: "2024-01-22",
    dropOffLocation: "Detroit, MI",
    weight: "42,000 lbs",
    miles: 285,
    pickupDate: "2024-01-20",
    pickupLocation: "Chicago, IL",
    pickupNo: "PU-10234",
    pod: false,
    ticketNo: "TKT-78901",
    timeState: "On Time",
    trailer: "TRL-501",
    deliveryAppointment: "10:00 AM",
    customer: "Titan",
    driver: "John Smith",
  },
  {
    loadNo: "LD-002",
    carrierLoadNo: "CLN-5002",
    commodity: "Aggregate",
    status: "New",
    rate: "$1,200",
    customerContractId: "CTR-2024-002",
    dropOffDate: "2024-01-23",
    dropOffLocation: "Dallas, TX",
    weight: "38,500 lbs",
    miles: 240,
    pickupDate: "2024-01-21",
    pickupLocation: "Houston, TX",
    pickupNo: "PU-10235",
    pod: false,
    ticketNo: "TKT-78902",
    timeState: "Early",
    trailer: "TRL-502",
    deliveryAppointment: "2:00 PM",
    customer: "Titan",
    driver: "Mike Johnson",
  },
  {
    loadNo: "LD-003",
    carrierLoadNo: "CLN-5003",
    commodity: "Lumber",
    status: "Pending",
    rate: "$1,650",
    customerContractId: "CTR-2024-003",
    dropOffDate: "2024-01-24",
    dropOffLocation: "Los Angeles, CA",
    weight: "44,000 lbs",
    miles: 370,
    pickupDate: "2024-01-22",
    pickupLocation: "Phoenix, AZ",
    pickupNo: "PU-10236",
    pod: false,
    ticketNo: "TKT-78903",
    timeState: "Delayed",
    trailer: "TRL-503",
    deliveryAppointment: "9:00 AM",
    customer: "Titan",
    driver: "Sarah Davis",
  },
  {
    loadNo: "LD-004",
    carrierLoadNo: "CLN-5004",
    commodity: "Electronics",
    status: "New",
    rate: "$2,100",
    customerContractId: "CTR-2024-004",
    dropOffDate: "2024-01-25",
    dropOffLocation: "Miami, FL",
    weight: "40,000 lbs",
    miles: 660,
    pickupDate: "2024-01-23",
    pickupLocation: "Atlanta, GA",
    pickupNo: "PU-10237",
    pod: false,
    ticketNo: "TKT-78904",
    timeState: "On Time",
    trailer: "TRL-504",
    deliveryAppointment: "11:30 AM",
    customer: "Titan",
    driver: "Tom Wilson",
  },
];

const planningLoads = [
  { id: "LD-010", origin: "Denver, CO", destination: "Salt Lake City, UT", pickupDate: "2024-01-25", driver: "John Smith", truck: "TRK-101", status: "Assigned", weight: "41,000 lbs", rate: "$1,450" },
  { id: "LD-011", origin: "Seattle, WA", destination: "Portland, OR", pickupDate: "2024-01-26", driver: "Mike Johnson", truck: "TRK-102", status: "Scheduled", weight: "39,500 lbs", rate: "$950" },
  { id: "LD-012", origin: "Boston, MA", destination: "New York, NY", pickupDate: "2024-01-27", driver: "Sarah Davis", truck: "TRK-103", status: "Assigned", weight: "43,000 lbs", rate: "$1,100" },
];

const dispatchedLoads = [
  { id: "LD-020", origin: "San Francisco, CA", destination: "Sacramento, CA", pickupDate: "2024-01-18", driver: "Tom Wilson", truck: "TRK-104", status: "In Transit", eta: "2024-01-19 14:00", weight: "40,500 lbs", rate: "$850" },
  { id: "LD-021", origin: "Minneapolis, MN", destination: "Chicago, IL", pickupDate: "2024-01-17", driver: "James Brown", truck: "TRK-105", status: "In Transit", eta: "2024-01-18 18:30", weight: "42,500 lbs", rate: "$1,350" },
  { id: "LD-022", origin: "Nashville, TN", destination: "Memphis, TN", pickupDate: "2024-01-18", driver: "Robert Lee", truck: "TRK-106", status: "At Pickup", eta: "2024-01-18 20:00", weight: "38,000 lbs", rate: "$750" },
  { id: "LD-023", origin: "Philadelphia, PA", destination: "Baltimore, MD", pickupDate: "2024-01-18", driver: "Chris Martin", truck: "TRK-107", status: "In Transit", eta: "2024-01-18 16:00", weight: "41,500 lbs", rate: "$650" },
];

const deliveredLoads = [
  { id: "LD-030", origin: "Las Vegas, NV", destination: "Phoenix, AZ", deliveredDate: "2024-01-15", driver: "Alan Walker", pod: true, weight: "39,000 lbs", rate: "$1,100" },
  { id: "LD-031", origin: "Kansas City, MO", destination: "St. Louis, MO", deliveredDate: "2024-01-14", driver: "Emma Stone", pod: true, weight: "42,000 lbs", rate: "$750" },
  { id: "LD-032", origin: "Orlando, FL", destination: "Tampa, FL", deliveredDate: "2024-01-13", driver: "David Clark", pod: false, weight: "37,500 lbs", rate: "$550" },
  { id: "LD-033", origin: "Cincinnati, OH", destination: "Columbus, OH", deliveredDate: "2024-01-12", driver: "Lisa White", pod: true, weight: "40,000 lbs", rate: "$600" },
  { id: "LD-034", origin: "San Diego, CA", destination: "Los Angeles, CA", deliveredDate: "2024-01-11", driver: "Kevin Hart", pod: true, weight: "43,500 lbs", rate: "$450" },
];

const CustomerLoads = () => {
  const [activeTab, setActiveTab] = useState("inbox");

  const getStatusBadge = (status) => {
    const statusColors = {
      New: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/50",
      Pending: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/50",
      Assigned: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/50",
      Scheduled: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/50",
      "In Transit": "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/50",
      "At Pickup": "bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/50",
    };
    return (
      <Badge className={`${statusColors[status] || "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/50"} border`}>
        {status}
      </Badge>
    );
  };

  const inboxColumns = [
    {
      id: "actions",
      header: "Action",
      size: 80,
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "commodity",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Commodity" />,
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => getStatusBadge(row.getValue("status")),
      enableSorting: true,
    },
    {
      accessorKey: "rate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Rate" />,
      enableSorting: true,
    },
    {
      accessorKey: "customerContractId",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Contract ID" />,
      enableSorting: true,
    },
    {
      accessorKey: "dropOffDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Drop Off Date" />,
      enableSorting: true,
    },
    {
      accessorKey: "dropOffLocation",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Drop Off Location" />,
      enableSorting: true,
    },
    {
      accessorKey: "weight",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Weight" />,
      enableSorting: true,
    },
    {
      accessorKey: "miles",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Miles" />,
      enableSorting: true,
    },
    {
      accessorKey: "pickupDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Pickup Date" />,
      enableSorting: true,
    },
    {
      accessorKey: "pickupLocation",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Pickup Location" />,
      enableSorting: true,
    },
    {
      accessorKey: "pickupNo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Pickup No" />,
      enableSorting: true,
    },
    {
      accessorKey: "pod",
      header: ({ column }) => <DataTableColumnHeader column={column} title="POD" />,
      cell: ({ row }) => {
        const hasPod = row.getValue("pod");
        return (
          <Badge className={hasPod
            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/50 border"
            : "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/50 border"
          }>
            {hasPod ? "Yes" : "No"}
          </Badge>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "ticketNo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ticket No" />,
      enableSorting: true,
    },
    {
      accessorKey: "timeState",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Time State" />,
      cell: ({ row }) => {
        const timeState = row.getValue("timeState");
        const colors = {
          "On Time": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/50",
          "Early": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/50",
          "Delayed": "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/50",
        };
        return (
          <Badge className={`${colors[timeState] || "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/50"} border`}>
            {timeState}
          </Badge>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "trailer",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Trailer" />,
      enableSorting: true,
    },
    {
      accessorKey: "deliveryAppointment",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Time (Delivery Appointment)" />,
      enableSorting: true,
    },
    {
      accessorKey: "customer",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
      enableSorting: true,
    },
    {
      accessorKey: "driver",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Driver" />,
      enableSorting: true,
    },
    {
      accessorKey: "carrierLoadNo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Carrier Load Number" />,
      enableSorting: true,
    },
    {
      accessorKey: "loadNo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Load No" />,
      enableSorting: true,
    },
  ];

  const planningColumns = [
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Load ID" />,
      enableSorting: true,
    },
    {
      accessorKey: "origin",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Origin" />,
      enableSorting: true,
    },
    {
      accessorKey: "destination",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Destination" />,
      enableSorting: true,
    },
    {
      accessorKey: "pickupDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Pickup Date" />,
      enableSorting: true,
    },
    {
      accessorKey: "driver",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Driver" />,
      enableSorting: true,
    },
    {
      accessorKey: "truck",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Truck" />,
      enableSorting: true,
    },
    {
      accessorKey: "rate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Rate" />,
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => getStatusBadge(row.getValue("status")),
      enableSorting: true,
    },
    {
      id: "actions",
      header: "Action",
      size: 80,
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const dispatchedColumns = [
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Load ID" />,
      enableSorting: true,
    },
    {
      accessorKey: "origin",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Origin" />,
      enableSorting: true,
    },
    {
      accessorKey: "destination",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Destination" />,
      enableSorting: true,
    },
    {
      accessorKey: "driver",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Driver" />,
      enableSorting: true,
    },
    {
      accessorKey: "truck",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Truck" />,
      enableSorting: true,
    },
    {
      accessorKey: "eta",
      header: ({ column }) => <DataTableColumnHeader column={column} title="ETA" />,
      enableSorting: true,
    },
    {
      accessorKey: "rate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Rate" />,
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => getStatusBadge(row.getValue("status")),
      enableSorting: true,
    },
    {
      id: "actions",
      header: "Action",
      size: 80,
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Track</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const deliveredColumns = [
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Load ID" />,
      enableSorting: true,
    },
    {
      accessorKey: "origin",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Origin" />,
      enableSorting: true,
    },
    {
      accessorKey: "destination",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Destination" />,
      enableSorting: true,
    },
    {
      accessorKey: "deliveredDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Delivered Date" />,
      enableSorting: true,
    },
    {
      accessorKey: "driver",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Driver" />,
      enableSorting: true,
    },
    {
      accessorKey: "rate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Rate" />,
      enableSorting: true,
    },
    {
      accessorKey: "pod",
      header: ({ column }) => <DataTableColumnHeader column={column} title="POD" />,
      cell: ({ row }) => {
        const hasPod = row.getValue("pod");
        return (
          <Badge className={hasPod
            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/50 border"
            : "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/50 border"
          }>
            {hasPod ? "Uploaded" : "Pending"}
          </Badge>
        );
      },
      enableSorting: true,
    },
    {
      id: "actions",
      header: "Action",
      size: 80,
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Download POD</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
      enableHiding: false,
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
            <TabsTrigger value="dispatched" className="h-full">
              <Truck className="size-4" />
              Dispatched
            </TabsTrigger>
            <TabsTrigger value="delivered" className="h-full">
              <PackageCheck className="size-4" />
              Delivered
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          <TabsContent value="inbox" className="h-full mt-0 px-4 py-4">
            <DataTable columns={inboxColumns} data={inboxLoads} showViewOptions={false} />
          </TabsContent>

          <TabsContent value="planning" className="h-full mt-0 px-4 py-4">
            <DataTable columns={planningColumns} data={planningLoads} showViewOptions={false} />
          </TabsContent>

          <TabsContent value="dispatched" className="h-full mt-0 px-4 py-4">
            <DataTable columns={dispatchedColumns} data={dispatchedLoads} showViewOptions={false} />
          </TabsContent>

          <TabsContent value="delivered" className="h-full mt-0 px-4 py-4">
            <DataTable columns={deliveredColumns} data={deliveredLoads} showViewOptions={false} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CustomerLoads;
