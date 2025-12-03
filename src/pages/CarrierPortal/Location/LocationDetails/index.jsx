import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { MapPin, History, MessageSquare } from "lucide-react";
import LocationProfileCard from "./LocationProfileCard";
import LocationCommentsCard from "./LocationCommentsCard";

const LocationDetails = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "details";

  // Mock location data
  const locationData = {
    code: "LOC-001",
    name: "Main Warehouse",
    contact: "John Smith",
    phone: "(555) 123-4567",
    email: "john.smith@warehouse.com",
    address: "123 Industrial Blvd",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    latitude: "40.7128",
    longitude: "-74.0060",
  };

  // Mock comments data
  const commentsData = [
    {
      id: 1,
      dateTime: "2024-01-15 10:30 AM",
      enteredBy: "James Wilson",
      type: "Operations",
      attachment: "site_inspection.pdf",
      comment: "Completed quarterly site inspection. All facilities in good condition.",
    },
    {
      id: 2,
      dateTime: "2024-02-20 02:15 PM",
      enteredBy: "Sarah Mitchell",
      type: "Access",
      attachment: null,
      comment: "Updated gate access codes. New codes distributed to authorized personnel.",
    },
    {
      id: 3,
      dateTime: "2024-03-10 09:45 AM",
      enteredBy: "Michael Thompson",
      type: "General",
      attachment: null,
      comment: "Changed primary contact to John Smith per management request.",
    },
    {
      id: 4,
      dateTime: "2024-03-25 11:00 AM",
      enteredBy: "Emily Roberts",
      type: "Positive",
      attachment: "safety_cert.pdf",
      comment: "Location passed safety certification. Certificate valid until March 2025.",
    },
  ];

  // Audit log data
  const auditLogData = [
    {
      id: 1,
      action: "Contact information updated",
      type: "Update",
      oldValue: "Mike Johnson",
      newValue: "John Smith",
      actionBy: "James Wilson",
      timestamp: "Jan 28, 2024 14:35:22",
    },
    {
      id: 2,
      action: "GPS coordinates updated",
      type: "Update",
      oldValue: "40.7100, -74.0050",
      newValue: "40.7128, -74.0060",
      actionBy: "Emily Roberts",
      timestamp: "Jan 26, 2024 09:12:45",
    },
    {
      id: 3,
      action: "Address changed",
      type: "Update",
      oldValue: "100 Commerce St",
      newValue: "123 Industrial Blvd",
      actionBy: "Michael Thompson",
      timestamp: "Jan 24, 2024 20:22:34",
    },
    {
      id: 4,
      action: "Location status changed",
      type: "Status",
      oldValue: "Pending",
      newValue: "Active",
      actionBy: "Sarah Mitchell",
      timestamp: "Jan 20, 2024 11:45:18",
    },
    {
      id: 5,
      action: "Location documents uploaded",
      type: "Upload",
      oldValue: "-",
      newValue: "site_map.pdf",
      actionBy: "Emily Roberts",
      timestamp: "Jan 18, 2024 16:30:00",
    },
    {
      id: 6,
      action: "Location verified",
      type: "Verify",
      oldValue: "Unverified",
      newValue: "Verified",
      actionBy: "System",
      timestamp: "Jan 15, 2024 10:15:33",
    },
    {
      id: 7,
      action: "Location created",
      type: "Create",
      oldValue: "-",
      newValue: "LOC-001 - Main Warehouse",
      actionBy: "James Wilson",
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
        className="w-full h-full flex flex-col overflow-hidden"
      >
        <div className="flex-shrink-0">
          <TabsList className="mb-0 rounded-none">
            <TabsTrigger value="details" className="h-full">
              <MapPin className="size-4" />
              Details
            </TabsTrigger>
            <TabsTrigger value="comments" className="h-full">
              <MessageSquare className="size-4" />
              Comments
            </TabsTrigger>
            <TabsTrigger value="audit" className="h-full">
              <History className="size-4" />
              Audit Log
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto -mt-1">
          <TabsContent
            value="details"
            className="space-y-4 px-2 py-2 h-full mt-0"
          >
            <div className="flex gap-4 h-fit">
              {/* Location Profile Card */}
              <LocationProfileCard locationData={locationData} />
            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-2 px-2 py-2 h-full mt-0">
            <LocationCommentsCard commentsData={commentsData} />
          </TabsContent>

          <TabsContent value="audit" className="space-y-2 px-2 py-2 h-full mt-0">
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

export default LocationDetails;
