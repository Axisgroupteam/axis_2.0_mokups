import { Badge } from "@/components/ui/badge";
import { FaIdCard, FaEdit } from "react-icons/fa";

const PersonalInformationCard = ({ driverData }) => {
  return (
    <div className="w-1/2 border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaIdCard className="size-4" />
          Personal Information
        </h3>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <FaEdit className="size-3.5" />
        </button>
      </div>
      <div className="divide-y divide-border">
        {/* First Name, Middle Name, Last Name */}
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">First Name</p>
            <p className="text-sm font-medium text-foreground">
              {driverData.firstName}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Middle Name</p>
            <p className="text-sm font-medium text-foreground">
              {driverData.middleName || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Last Name</p>
            <p className="text-sm font-medium text-foreground">
              {driverData.lastName}
            </p>
          </div>
        </div>

        {/* Email, Phone, Role */}
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Email Address</p>
            <p className="text-sm font-medium text-foreground truncate">
              {driverData.email}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Phone Number</p>
            <p className="text-sm font-medium text-foreground">
              {driverData.phoneNumber || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Role</p>
            <Badge className="bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50 text-xs">
              {driverData.role}
            </Badge>
          </div>
        </div>

        {/* Address, City, State, Zipcode */}
        <div className="grid divide-x divide-border" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Address</p>
            <p className="text-sm font-medium text-foreground">
              {driverData.address || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">City</p>
            <p className="text-sm font-medium text-foreground">
              {driverData.city || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">State</p>
            <p className="text-sm font-medium text-foreground">
              {driverData.state || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">ZIP Code</p>
            <p className="text-sm font-medium text-foreground">
              {driverData.zipcode || "-"}
            </p>
          </div>
        </div>

        {/* Picture Profile, Gender, Emergency Contact */}
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Picture Profile</p>
            <p className="text-sm font-medium text-foreground">
              {driverData.pictureProfile || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Gender</p>
            <p className="text-sm font-medium text-foreground">
              {driverData.gender || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Emergency Contact</p>
            <p className="text-sm font-medium text-foreground">
              {driverData.emergencyContact || "-"}
            </p>
          </div>
        </div>

        {/* Birth Date, Social Security */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Birth Date</p>
            <p className="text-sm font-medium text-foreground">
              {driverData.birthDate || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Social Security</p>
            <p className="text-sm font-medium text-foreground">
              {driverData.socialSecurity || "-"}
            </p>
          </div>
        </div>

        {/* Latitude, Longitude */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Latitude</p>
            <p className="text-sm font-medium text-foreground">
              {driverData.latitude || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Longitude</p>
            <p className="text-sm font-medium text-foreground">
              {driverData.longitude || "-"}
            </p>
          </div>
        </div>

        {/* Race, Ethnicity */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Race</p>
            <p className="text-sm font-medium text-foreground">
              {driverData.race || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Ethnicity</p>
            <p className="text-sm font-medium text-foreground">
              {driverData.ethnicity || "-"}
            </p>
          </div>
        </div>

        {/* Languages, Preferred Language */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Languages</p>
            <p className="text-sm font-medium text-foreground">
              {driverData.languages || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Preferred Language</p>
            <p className="text-sm font-medium text-foreground">
              {driverData.preferredLanguage || "-"}
            </p>
          </div>
        </div>

        {/* Spouse Name */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Spouse Name</p>
          <p className="text-sm font-medium text-foreground">
            {driverData.spouseName || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationCard;
