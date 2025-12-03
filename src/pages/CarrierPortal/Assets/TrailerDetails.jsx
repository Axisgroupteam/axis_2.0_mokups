import { useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import SmartFilter from "@/components/SmartFilter";
import { FaTrailer } from "react-icons/fa";
import { MessageSquareIcon, History, ClockIcon } from "lucide-react";
import TrailerGeneralInformationCard from "./TrailerDetails/TrailerGeneralInformationCard";
import TrailerServiceInformationCard from "./TrailerDetails/TrailerServiceInformationCard";
import TrailerCommentsCard from "./TrailerDetails/TrailerCommentsCard";

const TrailerDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "general";
  const [historyFilters, setHistoryFilters] = useState([]);

  const handleHistoryFiltersChange = useCallback((newFilters) => {
    setHistoryFilters(newFilters);
  }, []);

  // Filter configuration for trailer history
  const historyFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "date",
          label: "Date",
          type: "date",
          group: "Basic",
        },
        {
          key: "driverCode",
          label: "Driver Code",
          type: "input",
          group: "Basic",
          placeholder: "Enter driver code...",
        },
        {
          key: "driverName",
          label: "Driver Name",
          type: "input",
          group: "Basic",
          placeholder: "Enter driver name...",
        },
        {
          key: "loadNo",
          label: "Load No",
          type: "input",
          group: "Basic",
          placeholder: "Enter load number...",
        },
        {
          key: "customer",
          label: "Customer",
          type: "input",
          group: "Basic",
          placeholder: "Enter customer name...",
        },
        {
          key: "origin",
          label: "Origin",
          type: "input",
          group: "Basic",
          placeholder: "Enter origin...",
        },
        {
          key: "destination",
          label: "Destination",
          type: "input",
          group: "Basic",
          placeholder: "Enter destination...",
        },
      ],
    },
  ];

  // Mock trailer history data
  const trailerHistoryData = [
    { id: 1, date: "Jan 28, 2024", driverCode: "DRV-001", driverName: "John Smith", loadNo: "LD-2024-0125", customer: "ABC Logistics Inc.", origin: "New York, NY", destination: "Boston, MA", miles: 215 },
    { id: 2, date: "Jan 27, 2024", driverCode: "DRV-001", driverName: "John Smith", loadNo: "LD-2024-0124", customer: "XYZ Transport", origin: "Boston, MA", destination: "Hartford, CT", miles: 102 },
    { id: 3, date: "Jan 26, 2024", driverCode: "DRV-003", driverName: "Mike Davis", loadNo: "LD-2024-0122", customer: "Global Freight Co.", origin: "Hartford, CT", destination: "Newark, NJ", miles: 118 },
    { id: 4, date: "Jan 25, 2024", driverCode: "DRV-003", driverName: "Mike Davis", loadNo: "LD-2024-0120", customer: "ABC Logistics Inc.", origin: "Newark, NJ", destination: "Philadelphia, PA", miles: 85 },
    { id: 5, date: "Jan 24, 2024", driverCode: "DRV-002", driverName: "Sarah Johnson", loadNo: "LD-2024-0118", customer: "Metro Shipping", origin: "Philadelphia, PA", destination: "Baltimore, MD", miles: 101 },
    { id: 6, date: "Jan 23, 2024", driverCode: "DRV-002", driverName: "Sarah Johnson", loadNo: "LD-2024-0115", customer: "East Coast Haulers", origin: "Baltimore, MD", destination: "Washington, DC", miles: 40 },
    { id: 7, date: "Jan 22, 2024", driverCode: "DRV-001", driverName: "John Smith", loadNo: "LD-2024-0112", customer: "Capital Freight", origin: "Washington, DC", destination: "Richmond, VA", miles: 109 },
    { id: 8, date: "Jan 21, 2024", driverCode: "DRV-001", driverName: "John Smith", loadNo: "LD-2024-0110", customer: "ABC Logistics Inc.", origin: "Richmond, VA", destination: "Raleigh, NC", miles: 154 },
    { id: 9, date: "Jan 20, 2024", driverCode: "DRV-004", driverName: "David Wilson", loadNo: "LD-2024-0108", customer: "Southern Transport", origin: "Raleigh, NC", destination: "Charlotte, NC", miles: 167 },
    { id: 10, date: "Jan 19, 2024", driverCode: "DRV-004", driverName: "David Wilson", loadNo: "LD-2024-0105", customer: "XYZ Transport", origin: "Charlotte, NC", destination: "Atlanta, GA", miles: 245 },
    { id: 11, date: "Jan 18, 2024", driverCode: "DRV-003", driverName: "Mike Davis", loadNo: "LD-2024-0102", customer: "Peach State Logistics", origin: "Atlanta, GA", destination: "Birmingham, AL", miles: 147 },
    { id: 12, date: "Jan 17, 2024", driverCode: "DRV-003", driverName: "Mike Davis", loadNo: "LD-2024-0100", customer: "Gulf Coast Shipping", origin: "Birmingham, AL", destination: "Nashville, TN", miles: 191 },
    { id: 13, date: "Jan 16, 2024", driverCode: "DRV-002", driverName: "Sarah Johnson", loadNo: "LD-2024-0098", customer: "Music City Freight", origin: "Nashville, TN", destination: "Louisville, KY", miles: 176 },
    { id: 14, date: "Jan 15, 2024", driverCode: "DRV-002", driverName: "Sarah Johnson", loadNo: "LD-2024-0095", customer: "Midwest Express", origin: "Louisville, KY", destination: "Cincinnati, OH", miles: 100 },
    { id: 15, date: "Jan 14, 2024", driverCode: "DRV-001", driverName: "John Smith", loadNo: "LD-2024-0092", customer: "ABC Logistics Inc.", origin: "Cincinnati, OH", destination: "Columbus, OH", miles: 107 },
    { id: 16, date: "Jan 13, 2024", driverCode: "DRV-001", driverName: "John Smith", loadNo: "LD-2024-0090", customer: "Buckeye Transport", origin: "Columbus, OH", destination: "Cleveland, OH", miles: 143 },
    { id: 17, date: "Jan 12, 2024", driverCode: "DRV-005", driverName: "Emily Brown", loadNo: "LD-2024-0088", customer: "Lake Erie Shipping", origin: "Cleveland, OH", destination: "Pittsburgh, PA", miles: 133 },
    { id: 18, date: "Jan 11, 2024", driverCode: "DRV-005", driverName: "Emily Brown", loadNo: "LD-2024-0085", customer: "Steel City Haulers", origin: "Pittsburgh, PA", destination: "Buffalo, NY", miles: 219 },
    { id: 19, date: "Jan 10, 2024", driverCode: "DRV-004", driverName: "David Wilson", loadNo: "LD-2024-0082", customer: "Great Lakes Freight", origin: "Buffalo, NY", destination: "Syracuse, NY", miles: 150 },
    { id: 20, date: "Jan 09, 2024", driverCode: "DRV-004", driverName: "David Wilson", loadNo: "LD-2024-0080", customer: "XYZ Transport", origin: "Syracuse, NY", destination: "Albany, NY", miles: 148 },
    { id: 21, date: "Jan 08, 2024", driverCode: "DRV-003", driverName: "Mike Davis", loadNo: "LD-2024-0078", customer: "Empire State Logistics", origin: "Albany, NY", destination: "Springfield, MA", miles: 89 },
    { id: 22, date: "Jan 07, 2024", driverCode: "DRV-003", driverName: "Mike Davis", loadNo: "LD-2024-0075", customer: "New England Carriers", origin: "Springfield, MA", destination: "Providence, RI", miles: 82 },
    { id: 23, date: "Jan 06, 2024", driverCode: "DRV-002", driverName: "Sarah Johnson", loadNo: "LD-2024-0072", customer: "Ocean State Transport", origin: "Providence, RI", destination: "New Haven, CT", miles: 98 },
    { id: 24, date: "Jan 05, 2024", driverCode: "DRV-002", driverName: "Sarah Johnson", loadNo: "LD-2024-0070", customer: "ABC Logistics Inc.", origin: "New Haven, CT", destination: "Stamford, CT", miles: 45 },
    { id: 25, date: "Jan 04, 2024", driverCode: "DRV-001", driverName: "John Smith", loadNo: "LD-2024-0068", customer: "Metro Shipping", origin: "Stamford, CT", destination: "New York, NY", miles: 38 },
  ];

  const trailerHistoryColumns = [
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "driverCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Driver Code" />
      ),
      cell: ({ row }) => (
        <span
          className="text-foreground underline cursor-pointer"
          onClick={() => navigate("/app/carrier-portal/master/users/driver-details")}
        >
          {row.getValue("driverCode")}
        </span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "driverName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Driver Name" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "loadNo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Load No" />
      ),
      cell: ({ row }) => (
        <span
          className="text-foreground underline cursor-pointer"
          onClick={() => navigate("/app/carrier-portal/orders/bulk")}
        >
          {row.getValue("loadNo")}
        </span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "customer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
      cell: ({ row }) => (
        <span
          className="text-foreground underline cursor-pointer"
          onClick={() => navigate("/app/carrier-portal/master/customers/customer-details?id=1&tab=profile")}
        >
          {row.getValue("customer")}
        </span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "origin",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Origin" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "destination",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Destination" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "miles",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Miles" />
      ),
      cell: ({ row }) => (
        <span>{row.getValue("miles")} mi</span>
      ),
      enableSorting: true,
    },
  ];

  // Mock trailer data
  const trailerData = {
    trailerName: "TRAIL123456",
    vinSn: "1T9BH41JXMN109186",
    licensePlate: "TRL-1001",
    year: "2021",
    model: "53FT",
    make: "Great Dane",
    fleetType: "TMF",
    group: "TMF-Central",
    type: "Flatbed Trailer",
    ownership: "Owned",
    bodyType: "Flatbed",
    bodySubtype: "Standard",
    color: "Silver",
    msrp: "$45,000",
    registrationDocuments: "registration_doc.pdf",
    trailerImages: "trailer_image.jpg",
    // Service & Assignment fields
    safetyStatus: "Active",
    reason: "Monthly Maintenance",
    serviceStatus: "In Service",
    inServiceDate: "2023-01-15",
    outServiceDate: "-",
    owner: "John Smith",
    homeTerminal: "Terminal 1",
    dateAssigned: "2023-01-15",
  };

  // Mock comments data
  const commentsData = [
    {
      id: 1,
      dateTime: "2024-01-15 10:30 AM",
      enteredBy: "John Smith",
      type: "Maintenance",
      attachment: "inspection_report.pdf",
      comment: "Annual safety inspection completed. All checks passed.",
    },
    {
      id: 2,
      dateTime: "2024-02-20 02:15 PM",
      enteredBy: "Sarah Johnson",
      type: "Repair",
      attachment: null,
      comment: "Brake system serviced and replaced worn pads.",
    },
    {
      id: 3,
      dateTime: "2024-03-10 09:45 AM",
      enteredBy: "Mike Davis",
      type: "General",
      attachment: null,
      comment: "Routine maintenance performed. No issues found.",
    },
  ];

  // Audit log data
  const auditLogData = [
    {
      id: 1,
      action: "Trailer inspection completed",
      type: "Verify",
      oldValue: "Pending",
      newValue: "Passed",
      actionBy: "Mike Davis",
      timestamp: "Jan 28, 2024 14:35:22",
    },
    {
      id: 2,
      action: "Brake system serviced",
      type: "Update",
      oldValue: "Worn - 30%",
      newValue: "New - 100%",
      actionBy: "Sarah Johnson",
      timestamp: "Jan 26, 2024 09:12:45",
    },
    {
      id: 3,
      action: "Assigned to vehicle",
      type: "Update",
      oldValue: "Unassigned",
      newValue: "VIN123456",
      actionBy: "John Smith",
      timestamp: "Jan 24, 2024 20:22:34",
    },
    {
      id: 4,
      action: "Trailer status changed",
      type: "Status",
      oldValue: "Inactive",
      newValue: "Active",
      actionBy: "Mike Davis",
      timestamp: "Jan 20, 2024 11:45:18",
    },
    {
      id: 5,
      action: "Registration documents uploaded",
      type: "Upload",
      oldValue: "-",
      newValue: "registration_doc.pdf",
      actionBy: "Sarah Johnson",
      timestamp: "Jan 18, 2024 16:30:00",
    },
    {
      id: 6,
      action: "License plate updated",
      type: "Update",
      oldValue: "TRL-0999",
      newValue: "TRL-1001",
      actionBy: "John Smith",
      timestamp: "Jan 15, 2024 10:15:33",
    },
    {
      id: 7,
      action: "Trailer created",
      type: "Create",
      oldValue: "-",
      newValue: "TRAIL123456",
      actionBy: "John Smith",
      timestamp: "Jan 10, 2024 09:30:15",
    },
  ];

  const getTypeBadgeColor = (type) => {
    const colors = {
      Create: "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50",
      Update: "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50",
      Upload: "bg-purple-500/10 hover:bg-purple-500/30 text-purple-700 dark:text-purple-400 border border-purple-500/50",
      Status: "bg-orange-500/10 hover:bg-orange-500/30 text-orange-700 dark:text-orange-400 border border-orange-500/50",
      Verify: "bg-teal-500/10 hover:bg-teal-500/30 text-teal-700 dark:text-teal-400 border border-teal-500/50",
    };
    return colors[type] || "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  const auditLogColumns = [
    {
      accessorKey: "action",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Operation" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => {
        const type = row.getValue("type");
        return (
          <Badge className={getTypeBadgeColor(type)}>{type}</Badge>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "oldValue",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Old Value" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "newValue",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="New Value" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "actionBy",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Modified By" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "timestamp",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Timestamp" />
      ),
      enableSorting: true,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <Tabs
        defaultValue={activeTab}
        className="w-full h-full flex flex-col overflow-hidden "
      >
        <div className="flex-shrink-0">
          <TabsList className="mb-0 rounded-none ">
            <TabsTrigger value="general" className="h-full">
              <FaTrailer className="size-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="history" className="h-full">
              <ClockIcon className="size-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="comments" className="h-full">
              <MessageSquareIcon className="size-4" />
              Comments
            </TabsTrigger>
            <TabsTrigger value="audit" className="h-full">
              <History className="size-4" />
              Audit Log
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto mt-2 mx-2">
          <TabsContent value="general" className="space-y-2 h-full mt-0 px-2">
            <div className="grid grid-cols-2 gap-4 items-start">
              <TrailerGeneralInformationCard trailerData={trailerData} />
              <TrailerServiceInformationCard trailerData={trailerData} />
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-2 h-full mt-0 px-2">
            <SmartFilter
              filterGroups={historyFilterGroups}
              onFiltersChange={handleHistoryFiltersChange}
            />
            <DataTable
              columns={trailerHistoryColumns}
              data={trailerHistoryData}
              showViewOptions={false}
            />
          </TabsContent>

          <TabsContent value="comments" className="space-y-2 h-full mt-0 px-2">
            <TrailerCommentsCard commentsData={commentsData} />
          </TabsContent>

          <TabsContent value="audit" className="space-y-2 h-full mt-0 px-2">
            <DataTable
              columns={auditLogColumns}
              data={auditLogData}
              showViewOptions={false}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TrailerDetails;
