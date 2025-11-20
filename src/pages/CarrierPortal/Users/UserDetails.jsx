import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaUser, FaShieldAlt, FaTrash } from "react-icons/fa";

const UserDetails = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="px-4 py-4">
        {/* Tabs */}
        <Tabs defaultValue={activeTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" className="h-full">
              <FaUser className="size-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="permissions" className="h-full">
              <FaShieldAlt className="size-4" />
              Permissions
            </TabsTrigger>
            <TabsTrigger value="delete" className="h-full">
              <FaTrash className="size-4" />
              Delete
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <div className="border rounded-lg p-6 bg-gray-50">
              <p className="text-gray-500">Profile content coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <div className="border rounded-lg p-6 bg-gray-50">
              <p className="text-gray-500">Permissions content coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="delete" className="space-y-4">
            <div className="border rounded-lg p-6 bg-gray-50">
              <p className="text-gray-500">Delete content coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDetails;
