import { useState } from "react";
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
  return (
    <>
      {/* Row 1: Identifier Search + External Links and Driver Endorsements + Logbook Management */}
      <div className="flex gap-4 h-fit">
        <div className="w-1/2 flex flex-col gap-4">
          <IdentifierSearchCard />
          <ExternalLinksCard />
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <DriverEndorsementsCard />
          <LogbookManagementCard />
        </div>
      </div>

      {/* Row 2: Training and Safety Management */}
      <div className="flex gap-4 h-fit">
        <div className="w-1/2">
          <TrainingCard />
        </div>
        <div className="w-1/2">
          <SafetyManagementCard />
        </div>
      </div>

      {/* Row 3: Driver PSP and Basic Scores */}
      <div className="flex gap-4 h-fit">
        <div className="w-1/2">
          <DriverPSPCard />
        </div>
        <div className="w-1/2">
          <BasicScoresCard />
        </div>
      </div>

      {/* Row 4: Employment Verification and Additional Safety Fields */}
      <div className="flex gap-4 h-fit">
        <div className="w-1/2">
          <EmploymentVerificationCard />
        </div>
        <div className="w-1/2">
          <AdditionalSafetyFieldsCard />
        </div>
      </div>

      {/* Row 5: Orientation and Insurance */}
      <div className="flex gap-4 h-fit">
        <div className="w-1/2">
          <OrientationCard />
        </div>
        <div className="w-1/2">
          <InsuranceCard />
        </div>
      </div>

      {/* Row 6: Accident Record - Full Width */}
      <AccidentRecordCard />
    </>
  );
};

export default SafetyComplianceTab;
