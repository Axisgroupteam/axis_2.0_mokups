import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaUser, FaShieldAlt } from "react-icons/fa";
import UserInfoCard from "./DriverDetails/UserInfoCard";

const UserDetails = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";

  // Mock user data
  const userData = {
    firstName: "John",
    middleName: "Michael",
    lastName: "Smith",
    email: "john.smith@company.com",
    role: "Administrator",
    address: "456 Oak Avenue",
    city: "Los Angeles",
    state: "CA",
    zipcode: "90001",
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
            <TabsTrigger value="permissions" className="h-full">
              <FaShieldAlt className="size-4" />
              Permissions
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto -mt-1">
          <TabsContent value="profile" className="space-y-4 px-4 pb-4 h-full mt-2">
            <div className="w-1/2">
              <UserInfoCard driverData={userData} />
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4 px-4 pb-4 h-full mt-2">
            <div className="border rounded-lg p-6 bg-card">
              <p className="text-muted-foreground">Permissions content coming soon...</p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default UserDetails;
