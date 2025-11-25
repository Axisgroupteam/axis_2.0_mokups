import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SearchIcon,
  BadgeCheckIcon,
  ShieldAlertIcon,
  GraduationCapIcon,
} from "lucide-react";
import DriverEndorsementsCard from "./SafetyCompliance/DriverEndorsementsCard";
import LogbookManagementCard from "./SafetyCompliance/LogbookManagementCard";
import TrainingCard from "./SafetyCompliance/TrainingCard";
import SafetyManagementCard from "./SafetyCompliance/SafetyManagementCard";
import DriverPSPCard from "./SafetyCompliance/DriverPSPCard";
import BasicScoresCard from "./SafetyCompliance/BasicScoresCard";
import EmploymentVerificationCard from "./SafetyCompliance/EmploymentVerificationCard";
import AdditionalSafetyFieldsCard from "./SafetyCompliance/AdditionalSafetyFieldsCard";
import OrientationCard from "./SafetyCompliance/OrientationCard";
import InsuranceCard from "./SafetyCompliance/InsuranceCard";
import AccidentRecordCard from "./SafetyCompliance/AccidentRecordCard";
import ExternalLinksCard from "./SafetyCompliance/ExternalLinksCard";
import IdentifierSearchCard from "./SafetyCompliance/IdentifierSearchCard";

const SafetyComplianceTab = () => {
  const [activeSubTab, setActiveSubTab] = useState("overview");

  return (
    <Tabs
      value={activeSubTab}
      onValueChange={setActiveSubTab}
      className="w-full -mt-1 rounded-sm -ml-1"
    >
      <TabsList className="mb-1 h-14 rounded-sm ">
        <TabsTrigger value="overview" className="flex items-center gap-1.5">
          <SearchIcon className="size-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="qualifications"
          className="flex items-center gap-1.5"
        >
          <BadgeCheckIcon className="size-4" />
          Qualifications
        </TabsTrigger>
        <TabsTrigger
          value="safety-records"
          className="flex items-center gap-1.5"
        >
          <ShieldAlertIcon className="size-4" />
          Safety Records
        </TabsTrigger>
        <TabsTrigger value="training" className="flex items-center gap-1.5">
          <GraduationCapIcon className="size-4" />
          Training
        </TabsTrigger>
      </TabsList>

      {/* Overview Sub-Tab */}
      <TabsContent value="overview" className="space-y-4 mt-0">
        <div className="flex gap-4 h-fit">
          <div className="w-1/2 flex flex-col gap-4">
            <IdentifierSearchCard />
            <ExternalLinksCard />
          </div>
          <div className="w-1/2">
            <InsuranceCard />
          </div>
        </div>
      </TabsContent>

      {/* Qualifications Sub-Tab */}
      <TabsContent value="qualifications" className="space-y-4 mt-0">
        <div className="flex gap-4 h-fit">
          <div className="w-1/2">
            <DriverEndorsementsCard />
          </div>
          <div className="w-1/2">
            <EmploymentVerificationCard />
          </div>
        </div>
        <AdditionalSafetyFieldsCard />
      </TabsContent>

      {/* Safety Records Sub-Tab */}
      <TabsContent value="safety-records" className="space-y-4 mt-0">
        <div className="flex gap-4 h-fit">
          <div className="w-1/2">
            <SafetyManagementCard />
          </div>
          <div className="w-1/2">
            <DriverPSPCard />
          </div>
        </div>
        <div className="flex gap-4 h-fit">
          <div className="w-1/2">
            <BasicScoresCard />
          </div>
          <div className="w-1/2">
            <AccidentRecordCard />
          </div>
        </div>
      </TabsContent>

      {/* Training Sub-Tab */}
      <TabsContent value="training" className="space-y-4 mt-0">
        <div className="flex gap-4 h-fit">
          <div className="w-1/2">
            <TrainingCard />
          </div>
          <div className="w-1/2">
            <OrientationCard />
          </div>
        </div>
        <LogbookManagementCard />
      </TabsContent>
    </Tabs>
  );
};

export default SafetyComplianceTab;
