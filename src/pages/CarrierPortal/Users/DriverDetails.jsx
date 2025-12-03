import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  UserCircle,
  IdCard,
  BadgeCheck,
  User,
  DollarSign,
  Fuel,
  ShieldCheck,
  Settings,
  MessageSquare,
  BarChart3,
  History,
  Paperclip,
  Clock,
  Plus,
} from "lucide-react";
import UserInfoCard from "./DriverDetails/UserInfoCard";
import PersonalInformationCard from "./DriverDetails/PersonalInformationCard";
import DriverBasicInformationCard from "./DriverDetails/DriverBasicInformationCard";
import LicenseInformationCard from "./DriverDetails/LicenseInformationCard";
import EmploymentInformationCard from "./DriverDetails/EmploymentInformationCard";
import PayeeInformationCard from "./DriverDetails/PayeeInformationCard";
import OperationTab from "./DriverDetails/OperationTab";
import FuelTab from "./DriverDetails/FuelTab";
import SafetyComplianceTab from "./DriverDetails/SafetyComplianceTab";

const DriverDetails = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";
  const [isDriverInfoSheetOpen, setIsDriverInfoSheetOpen] = useState(false);
  const [hasDriverInfo, setHasDriverInfo] = useState(true);
  const [driverInfoData, setDriverInfoData] = useState({
    licenseCategory: "Class A CDL",
    licenseExpireDate: "2025-12-31",
    licenseEffectiveDate: "2023-01-15",
    uploadFile: "license_doc.pdf",
    ssnOrFedId: "XXX-XX-5678",
    licenseNumber: "DL123456789",
    licenseState: "CA",
  });

  // Mock driver data
  const driverData = {
    firstName: "John",
    middleName: "Michael",
    lastName: "Smith",
    email: "john.smith@company.com",
    phoneNumber: "+1 (555) 123-4567",
    role: "Driver",
    address: "456 Oak Avenue",
    city: "Los Angeles",
    state: "CA",
    zipcode: "90001",
    latitude: "34.0522",
    longitude: "-118.2437",
    birthDate: "1985-03-15",
    pictureProfile: "profile.jpg",
    race: "Caucasian",
    gender: "Male",
    emergencyContact: "+1 (555) 987-6543",
    socialSecurity: "XXX-XX-1234",
    ethnicity: "Non-Hispanic",
    languages: "English, Spanish",
    preferredLanguage: "English",
    spouseName: "Jane Smith",
  };

  const handleDriverInfoSubmit = (e) => {
    e.preventDefault();
    // Mock data after submission
    setDriverInfoData({
      licenseCategory: "Class A CDL",
      licenseExpireDate: "2025-12-31",
      licenseEffectiveDate: "2023-01-15",
      uploadFile: "license_doc.pdf",
      ssnOrFedId: "XXX-XX-5678",
      licenseNumber: "DL123456789",
      licenseState: "CA",
    });
    setHasDriverInfo(true);
    setIsDriverInfoSheetOpen(false);
  };

  const handleDriverInfoEdit = () => {
    setIsDriverInfoSheetOpen(true);
  };

  // Mock comments data
  const commentsData = [
    {
      id: 1,
      dateTime: "2024-01-15 10:30 AM",
      enteredBy: "John Smith",
      type: "General",
      attachment: "document.pdf",
      comment: "Driver completed safety training successfully.",
    },
    {
      id: 2,
      dateTime: "2024-01-10 02:15 PM",
      enteredBy: "Sarah Johnson",
      type: "Warning",
      attachment: null,
      comment: "Late arrival reported for scheduled pickup.",
    },
    {
      id: 3,
      dateTime: "2024-01-05 09:00 AM",
      enteredBy: "Mike Davis",
      type: "Positive",
      attachment: "certificate.pdf",
      comment: "Received commendation from client for excellent service.",
    },
  ];

  // Audit log data
  const auditLogData = [
    {
      id: 1,
      action: "License information updated",
      type: "Update",
      oldValue: "Class B CDL",
      newValue: "Class A CDL",
      actionBy: "John Smith",
      timestamp: "Jan 28, 2024 14:35:22",
    },
    {
      id: 2,
      action: "Safety compliance document uploaded",
      type: "Upload",
      oldValue: "-",
      newValue: "medical_cert.pdf",
      actionBy: "Sarah Johnson",
      timestamp: "Jan 26, 2024 09:12:45",
    },
    {
      id: 3,
      action: "Payee information updated",
      type: "Update",
      oldValue: "Bank of America ****1234",
      newValue: "Chase ****5678",
      actionBy: "John Smith",
      timestamp: "Jan 24, 2024 20:22:34",
    },
    {
      id: 4,
      action: "Driver status changed",
      type: "Status",
      oldValue: "Inactive",
      newValue: "Active",
      actionBy: "Mike Davis",
      timestamp: "Jan 20, 2024 11:45:18",
    },
    {
      id: 5,
      action: "Phone number updated",
      type: "Update",
      oldValue: "+1 (555) 000-0000",
      newValue: "+1 (555) 123-4567",
      actionBy: "John Smith",
      timestamp: "Jan 18, 2024 16:30:00",
    },
    {
      id: 6,
      action: "Employment information added",
      type: "Create",
      oldValue: "-",
      newValue: "Mega Trucking Inc.",
      actionBy: "Sarah Johnson",
      timestamp: "Jan 15, 2024 10:15:33",
    },
    {
      id: 7,
      action: "Driver credentials verified",
      type: "Verify",
      oldValue: "Unverified",
      newValue: "Verified",
      actionBy: "Admin System",
      timestamp: "Jan 12, 2024 08:00:00",
    },
    {
      id: 8,
      action: "Driver created",
      type: "Create",
      oldValue: "-",
      newValue: "John Smith",
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
            <TabsTrigger value="profile" className="h-full">
              <User className="size-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="finance" className="h-full">
              <DollarSign className="size-4" />
              Finance
            </TabsTrigger>
            <TabsTrigger value="fuel" className="h-full">
              <Fuel className="size-4" />
              Fuel
            </TabsTrigger>
            <TabsTrigger value="safety" className="h-full">
              <ShieldCheck className="size-4" />
              Safety Compliance
            </TabsTrigger>
            <TabsTrigger value="operation" className="h-full">
              <Settings className="size-4" />
              Operation
            </TabsTrigger>
            <TabsTrigger value="comments" className="h-full">
              <MessageSquare className="size-4" />
              Comments
            </TabsTrigger>
            <TabsTrigger value="metrics" className="h-full">
              <BarChart3 className="size-4" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="audit" className="h-full">
              <History className="size-4" />
              Audit Log
            </TabsTrigger>
          </TabsList>
        </div>

        <div
          className="flex-1 overflow-auto 
        "
        >
          <TabsContent value="profile" className="space-y-2 h-full mt-0 px-4">
            <Tabs defaultValue="personal" className="w-full mt-0">
              <TabsList className="mb-1 h-14">
                <TabsTrigger
                  value="personal"
                  className="flex items-center gap-1.5"
                >
                  <UserCircle className="size-4" />
                  Personal Information
                </TabsTrigger>
                <TabsTrigger
                  value="credentials"
                  className="flex items-center gap-1.5"
                >
                  <BadgeCheck className="size-4" />
                  Driver Credentials
                </TabsTrigger>
                <TabsTrigger
                  value="license"
                  className="flex items-center gap-1.5"
                >
                  <IdCard className="size-4" />
                  License Information
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4 mt-0">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <UserInfoCard driverData={driverData} />
                  </div>
                  <div className="w-1/2">
                    <PersonalInformationCard driverData={driverData} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="license" className="space-y-4 mt-0">
                <LicenseInformationCard
                  hasDriverInfo={hasDriverInfo}
                  driverInfoData={driverInfoData}
                  onEdit={handleDriverInfoEdit}
                  onAdd={() => setIsDriverInfoSheetOpen(true)}
                />
              </TabsContent>

              <TabsContent value="credentials" className="space-y-4 mt-0">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <DriverBasicInformationCard />
                  </div>
                  <div className="w-1/2">
                    <EmploymentInformationCard />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* License Information Sheet */}
          <Sheet
            open={isDriverInfoSheetOpen}
            onOpenChange={setIsDriverInfoSheetOpen}
          >
            <SheetContent
              side="right"
              className="w-full sm:max-w-md overflow-y-auto"
            >
              <SheetHeader className="pb-4 border-b px-6">
                <SheetTitle className="text-lg font-bold text-foreground">
                  {hasDriverInfo
                    ? "Edit License Information"
                    : "Add License Information"}
                </SheetTitle>
              </SheetHeader>

              <form
                onSubmit={handleDriverInfoSubmit}
                className="space-y-4 mt-4 px-6"
              >
                {/* License Category */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    License Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    defaultValue={driverInfoData.licenseCategory}
                    required
                  >
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Select license category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Class A CDL">Class A CDL</SelectItem>
                      <SelectItem value="Class B CDL">Class B CDL</SelectItem>
                      <SelectItem value="Class C CDL">Class C CDL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* License Expire Date */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    License Expire Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="date"
                    className="h-10"
                    defaultValue={driverInfoData.licenseExpireDate}
                    required
                  />
                </div>

                {/* License Effective Date */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    License Effective Date{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="date"
                    className="h-10"
                    defaultValue={driverInfoData.licenseEffectiveDate}
                    required
                  />
                </div>

                {/* Upload File (License Image) */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Uploaded File (License Image)
                  </Label>
                  <Input type="file" className="h-10" />
                </div>

                {/* SSN or Fed Id */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    SSN or Fed Id <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter SSN or Fed Id"
                    className="h-10"
                    defaultValue={driverInfoData.ssnOrFedId}
                    required
                  />
                </div>

                {/* License Number */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    License Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter license number"
                    className="h-10"
                    defaultValue={driverInfoData.licenseNumber}
                    required
                  />
                </div>

                {/* License State */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    License State <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter license state"
                    className="h-10"
                    defaultValue={driverInfoData.licenseState}
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDriverInfoSheetOpen(false)}
                    className="flex-1 h-10"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                  >
                    {hasDriverInfo ? "Update" : "Save"}
                  </Button>
                </div>
              </form>
            </SheetContent>
          </Sheet>

          <TabsContent value="metrics" className="space-y-4 pb-4 h-full mt-2">
            <div className="border rounded-lg p-6 bg-gray-50">
              <p className="text-gray-500">Metrics content coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent
            value="finance"
            className="space-y-4 px-4 pb-4 h-full mt-2"
          >
            <PayeeInformationCard />
          </TabsContent>

          <TabsContent
            value="comments"
            className="space-y-4 px-4 pb-4 h-full mt-2"
          >
            <div className="border rounded-sm bg-card">
              <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="size-4" />
                  Comments
                </h3>
                <Button
                  size="sm"
                  className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
                >
                  <Plus className="size-3" />
                  Add Comment
                </Button>
              </div>
              <div className="p-4">
                {commentsData.length > 0 ? (
                  <div className="space-y-4">
                    {commentsData.map((comment) => {
                      const typeColors = {
                        General:
                          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                        Warning:
                          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                        Positive:
                          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                      };

                      return (
                        <div
                          key={comment.id}
                          className="border rounded-lg p-3 bg-background hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="size-3 text-primary" />
                              </div>
                              <div>
                                <p className="font-semibold text-xs text-foreground">
                                  {comment.enteredBy}
                                </p>
                                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                  <Clock className="size-2" />
                                  {comment.dateTime}
                                </div>
                              </div>
                            </div>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                typeColors[comment.type] ||
                                "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {comment.type}
                            </span>
                          </div>

                          <p className="text-xs text-foreground mb-2 leading-relaxed">
                            {comment.comment}
                          </p>

                          {comment.attachment && (
                            <div className="flex items-center gap-1.5 p-1.5 bg-muted/50 rounded-md w-fit">
                              <Paperclip className="size-2.5 text-muted-foreground" />
                              <span className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                                {comment.attachment}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No comments added yet
                  </p>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="safety"
            className="space-y-4 px-4 pb-4 h-full mt-2"
          >
            <SafetyComplianceTab />
          </TabsContent>

          <TabsContent
            value="operation"
            className="space-y-4 px-4 pb-4 h-full mt-2"
          >
            <OperationTab />
          </TabsContent>

          <TabsContent value="fuel" className="space-y-4 px-4 pb-4 h-full mt-2">
            <FuelTab />
          </TabsContent>

          <TabsContent
            value="audit"
            className="space-y-4 px-4 pb-4 h-full mt-2"
          >
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

export default DriverDetails;
