import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaUserCircle } from "react-icons/fa";
import { User, Edit, Trash2 } from "lucide-react";
import { MdEdit } from "react-icons/md";

const PersonalInformationCard = ({ payeeData }) => {
  return (
    <div className="w-1/2 border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaUserCircle className="size-4" />
          Personal Information
        </h3>
        <div className="flex items-center gap-2">
          <button className="text-slate-500 hover:text-foreground transition-colors">
            <MdEdit className="size-4" />
          </button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {/* Profile Section with Image */}
        <div className="grid grid-cols-[1fr_200px] divide-x divide-border">
          {/* Left side - Information */}
          <div className="divide-y divide-border">
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">Full Name</p>
              <p className="text-sm font-medium text-foreground">
                {payeeData.firstName} {payeeData.middleName}{" "}
                {payeeData.lastName}
              </p>
            </div>
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">
                Email Address
              </p>
              <p className="text-sm font-medium text-foreground">
                {payeeData.email}
              </p>
            </div>
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">Role</p>
              <Badge className="bg-purple-500/10 hover:bg-purple-500/30 text-purple-700 dark:text-purple-400 border border-purple-500/50 text-xs">
                {payeeData.role}
              </Badge>
            </div>
          </div>

          {/* Right side - Profile Image */}
          <div className="relative px-6 py-4 flex items-center justify-center">
            <div className="w-36 h-36 rounded-full border-2 border-border overflow-hidden bg-muted">
              {payeeData.pictureProfile ? (
                <img
                  src="https://imgs.search.brave.com/0lv__h3DhQ2vTyW5lTr5pOgrIR2oUVnuJ3qBfOHNt9Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by91c2VyLXByb2Zp/bGUtcG5nLXByb2Zl/c3Npb25hbC1idXNp/bmVzc21hbi1zdGlj/a2VyLXRyYW5zcGFy/ZW50LWJhY2tncm91/bmRfNTM4NzYtMTA0/ODkyOS5qcGc_c2Vt/dD1haXNfaHlicmlk/Jnc9NzQwJnE9ODA"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="size-16 text-muted-foreground" />
                </div>
              )}
            </div>
            {/* Edit and Delete Icons at bottom right of card */}
            <div className="absolute bottom-2 right-2 flex gap-2">
              <button className="hover:opacity-70 transition-opacity">
                <Edit className="size-4 text-blue-600 dark:text-blue-400" />
              </button>
              <button className="hover:opacity-70 transition-opacity">
                <Trash2 className="size-4 text-rose-600 dark:text-rose-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Phone Number, Birth Date, Gender, Generate Password */}
        <div className="grid grid-cols-[1fr_1fr_1fr_200px] divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Phone Number</p>
            <p className="text-sm font-medium text-foreground">
              {payeeData.phoneNumber || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Birth Date</p>
            <p className="text-sm font-medium text-foreground">
              {payeeData.birthDate || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Gender</p>
            <p className="text-sm font-medium text-foreground">
              {payeeData.gender || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-1">
              {" "}
              Temporary Password
            </p>
            <Button
              size="sm"
              variant="outline"
              className="h-7 rounded-sm  w-full text-xs"
            >
              Regenerate Password
            </Button>
          </div>
        </div>

        {/* Address */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Address</p>
          <p className="text-sm font-medium text-foreground">
            {payeeData.address || "-"}
          </p>
        </div>

        {/* City, State, ZIP Code */}
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">City</p>
            <p className="text-sm font-medium text-foreground">
              {payeeData.city || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">State</p>
            <p className="text-sm font-medium text-foreground">
              {payeeData.state || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">ZIP Code</p>
            <p className="text-sm font-medium text-foreground">
              {payeeData.zipcode || "-"}
            </p>
          </div>
        </div>

        {/* Social Security */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">
            Social Security
          </p>
          <p className="text-sm font-medium text-foreground">
            {payeeData.socialSecurity || "-"}
          </p>
        </div>

        {/* Emergency Contact, Spouse Name */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">
              Emergency Contact
            </p>
            <p className="text-sm font-medium text-foreground">
              {payeeData.emergencyContact || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Spouse Name</p>
            <p className="text-sm font-medium text-foreground">
              {payeeData.spouseName || "-"}
            </p>
          </div>
        </div>

        {/* Race, Ethnicity */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Race</p>
            <p className="text-sm font-medium text-foreground">
              {payeeData.race || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Ethnicity</p>
            <p className="text-sm font-medium text-foreground">
              {payeeData.ethnicity || "-"}
            </p>
          </div>
        </div>

        {/* Languages, Preferred Language */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Languages</p>
            <p className="text-sm font-medium text-foreground">
              {payeeData.languages || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">
              Preferred Language
            </p>
            <p className="text-sm font-medium text-foreground">
              {payeeData.preferredLanguage || "-"}
            </p>
          </div>
        </div>

        {/* Latitude, Longitude */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Latitude</p>
            <p className="text-sm font-medium text-foreground">
              {payeeData.latitude || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Longitude</p>
            <p className="text-sm font-medium text-foreground">
              {payeeData.longitude || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationCard;
