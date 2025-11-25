import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TruckIcon, MessageSquareIcon } from "lucide-react";
import TrailerGeneralInformationCard from "./TrailerDetails/TrailerGeneralInformationCard";
import TrailerCommentsCard from "./TrailerDetails/TrailerCommentsCard";

const TrailerDetails = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "general";

  // Mock trailer data
  const trailerData = {
    trailerNumber: "TRAIL123456",
    serviceStatus: "In Service",
    inServiceDate: "2023-01-15",
    outServiceDate: null,
    type: "Dry Van",
    make: "Great Dane",
    year: "2021",
    serialNumber: "1T9BH41JXMN109186",
    fleet: "Fleet A",
    safetyStatus: "Pass",
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
            <TabsTrigger value="comments" className="h-full">
              <MessageSquareIcon className="size-4" />
              Comments
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto mt-2 mx-2">
          <TabsContent
            value="general"
            className="space-y-2 h-full mt-0 px-2"
          >
            <TrailerGeneralInformationCard trailerData={trailerData} />
          </TabsContent>

          <TabsContent
            value="comments"
            className="space-y-2 h-full mt-0 px-2"
          >
            <TrailerCommentsCard commentsData={commentsData} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TrailerDetails;
