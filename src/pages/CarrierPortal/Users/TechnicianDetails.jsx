import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaUser, FaDollarSign, FaChartLine, FaHistory } from "react-icons/fa";
import { UserCircle, BadgeCheck } from "lucide-react";
import UserInfoCard from "./TechnicianDetails/UserInfoCard";
import TechnicianDetailsCard from "./TechnicianDetails/TechnicianDetailsCard";
import EmploymentInformationCard from "./TechnicianDetails/EmploymentInformationCard";
import PayeeInformationCard from "./DriverDetails/PayeeInformationCard";
import BankInformationCard from "./DriverDetails/BankInformationCard";
import QuickCashCard from "./DriverDetails/QuickCashCard";
import FeeManagementCard from "./DriverDetails/FeeManagementCard";
import DeductionTypesCard from "./DriverDetails/DeductionTypesCard";

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
              <FaUser className="size-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="finance" className="h-full">
              <FaDollarSign className="size-4" />
              Finance
            </TabsTrigger>
            <TabsTrigger value="metrics" className="h-full">
              <FaChartLine className="size-4" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="audit" className="h-full">
              <FaHistory className="size-4" />
              Audit Log
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto -mt-1">
          <TabsContent value="profile" className="space-y-2  h-full mt-0 px-2">
            <Tabs
              defaultValue="personal"
              className="w-full border-none shadow-none"
            >
              <TabsList className="border-none shadow-none  bg-transparent h-auto px-2  gap-2 justify-start">
                <TabsTrigger
                  className="rounded-full bg-transparent data-[state=active]:bg-muted data-[state=active]:shadow-sm px-6 "
                  value="personal"
                >
                  <UserCircle className="size-4 mr-1" />
                  Personal Information
                </TabsTrigger>
                <TabsTrigger
                  className="rounded-full bg-transparent data-[state=active]:bg-muted data-[state=active]:shadow-sm px-6 "
                  value="credentials"
                >
                  <BadgeCheck className="size-4 mr-1" />
                  Technician Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className=" px-2 ">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <UserInfoCard technicianData={technicianData} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="credentials" className="px-2">
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
            <div className="flex gap-4 h-fit">
              {/* Left Column */}
              <div className="w-1/2 flex flex-col gap-4">
                <PayeeInformationCard />
                <QuickCashCard />
              </div>

              {/* Right Column */}
              <div className="w-1/2 flex flex-col gap-4">
                <BankInformationCard />
                <FeeManagementCard />
              </div>
            </div>

            {/* Deduction Types - Full Width */}
            <DeductionTypesCard />
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
