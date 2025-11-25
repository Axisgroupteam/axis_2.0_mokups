import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  DollarSign,
  BarChart3,
  History,
  UserCircle,
  BadgeCheck,
} from "lucide-react";
import UserInfoCard from "./TechnicianDetails/UserInfoCard";
import TechnicianDetailsCard from "./TechnicianDetails/TechnicianDetailsCard";
import EmploymentInformationCard from "./TechnicianDetails/EmploymentInformationCard";
import PayeeInformationCard from "./DriverDetails/PayeeInformationCard";

const TechnicianDetails = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";

  // Mock technician data
  const technicianData = {
    firstName: "Matthew",
    middleName: "James",
    lastName: "Clark",
    email: "matthew.clark@company.com",
    phoneNumber: "+1 (555) 234-5678",
    role: "Technician",
    address: "159 Willow Street",
    city: "Fort Worth",
    state: "TX",
    zipcode: "76102",
    latitude: "32.7555",
    longitude: "-97.3308",
    birthDate: "1988-07-22",
    pictureProfile: "profile.jpg",
    race: "Caucasian",
    gender: "Male",
    emergencyContact: "+1 (555) 876-5432",
    socialSecurity: "XXX-XX-5678",
    ethnicity: "Non-Hispanic",
    languages: "English",
    preferredLanguage: "English",
    spouseName: "Sarah Clark",
  };

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

        <div className="flex-1 overflow-auto -mt-1">
          <TabsContent value="profile" className="space-y-2 h-full mt-1 px-4">
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
                  Technician Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4 mt-0">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <UserInfoCard technicianData={technicianData} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="credentials" className="space-y-4 mt-0">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <TechnicianDetailsCard />
                  </div>
                  <div className="w-1/2">
                    <EmploymentInformationCard />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

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

          <TabsContent value="audit" className="space-y-4 pb-4 h-full mt-2">
            <div className="border rounded-lg p-6 bg-gray-50">
              <p className="text-gray-500">Audit Log content coming soon...</p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TechnicianDetails;
