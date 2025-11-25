import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TruckIcon,
  WrenchIcon,
  MapPinIcon,
} from "lucide-react";
import GeneralInformationCard from "./AssetDetails/GeneralInformationCard";
import EquipmentCard from "./AssetDetails/EquipmentCard";
import AllocationCard from "./AssetDetails/AllocationCard";

const AssetDetails = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "general";

  // Mock asset data
  const assetData = {
    vehicleNumber: "VIN123456",
    serviceStatus: "In Service",
    inServiceDate: "2023-01-15",
    outServiceDate: null,
    make: "Peterbilt",
    year: "2022",
    type: "Tractor",
    fleet: "Fleet A",
    payeeOption: "Owner Operator",
    owner: "John Doe",
    assignedDriver: "John Smith",
    homeTerminal: "Terminal 1",
    dateAssigned: "2023-01-15",
    assignedBy: "Admin",
    dispatcher: "YPR22",
    serialNumber: "1HGBH41JXMN109186",
    safetyStatus: "Pass",
    driver: "John Smith",
    trailer: "109",
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <Tabs
        defaultValue={activeTab}
        className="w-full h-full flex flex-col overflow-hidden "
      >
        <div className="flex-shrink-0">
          <TabsList className="mb-0 rounded-none ">
            <TabsTrigger value="general" className="h-full">
              <TruckIcon className="size-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="equipment" className="h-full">
              <WrenchIcon className="size-4" />
              Equipment
            </TabsTrigger>
            <TabsTrigger value="allocation" className="h-full">
              <MapPinIcon className="size-4" />
              Allocation
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto mt-2 mx-2">
          <TabsContent
            value="general"
            className="space-y-2 h-full mt-0 px-2"
          >
            <GeneralInformationCard assetData={assetData} />
          </TabsContent>

          <TabsContent
            value="equipment"
            className="space-y-2 h-full mt-0 px-2"
          >
            <EquipmentCard />
          </TabsContent>

          <TabsContent
            value="allocation"
            className="space-y-2 h-full mt-0 px-2"
          >
            <AllocationCard />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AssetDetails;
