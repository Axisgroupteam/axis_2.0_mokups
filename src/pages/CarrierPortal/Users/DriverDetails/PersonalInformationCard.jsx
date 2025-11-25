import { FaUserCircle } from "react-icons/fa";
import { User, Edit, Trash2 } from "lucide-react";
import { MdEdit } from "react-icons/md";

const PersonalInformationCard = ({ driverData }) => {
  return (
    <div className="w-full border rounded-sm bg-card flex flex-col">
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
        {/* Profile Section with Image - 3 rows next to image */}
        <div className="grid grid-cols-[2fr_200px] divide-x divide-border">
          {/* Left side - Information in 3 rows with 3 columns each */}
          <div className="divide-y divide-border">
            {/* Row 1: Phone Number, Birth Date, Gender */}
            <div className="grid grid-cols-3 divide-x divide-border">
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">
                  Phone Number
                </p>
                <p className="text-sm font-medium text-foreground">
                  {driverData.phoneNumber || "-"}
                </p>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">
                  Birth Date
                </p>
                <p className="text-sm font-medium text-foreground">
                  {driverData.birthDate || "-"}
                </p>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Gender</p>
                <p className="text-sm font-medium text-foreground">
                  {driverData.gender || "-"}
                </p>
              </div>
            </div>

            {/* Row 2: Social Security, Emergency Contact, Spouse Name */}
            <div className="grid grid-cols-3 divide-x divide-border">
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">
                  Social Security
                </p>
                <p className="text-sm font-medium text-foreground">
                  {driverData.socialSecurity || "-"}
                </p>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">
                  Emergency Contact
                </p>
                <p className="text-sm font-medium text-foreground">
                  {driverData.emergencyContact || "-"}
                </p>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">
                  Spouse Name
                </p>
                <p className="text-sm font-medium text-foreground">
                  {driverData.spouseName || "-"}
                </p>
              </div>
            </div>

            {/* Row 3: Race, Ethnicity, Languages */}
            <div className="grid grid-cols-3 divide-x divide-border">
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
              <div className="px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Languages</p>
                <p className="text-sm font-medium text-foreground">
                  {driverData.languages || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Profile Image */}
          <div className="relative px-6 py-4 flex items-center justify-center">
            <div className="w-36 h-36 rounded-full border-2 border-border overflow-hidden bg-muted">
              {driverData.pictureProfile ? (
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

        {/* Preferred Language, Latitude, Longitude */}
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">
              Preferred Language
            </p>
            <p className="text-sm font-medium text-foreground">
              {driverData.preferredLanguage || "-"}
            </p>
          </div>
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
      </div>
    </div>
  );
};

export default PersonalInformationCard;
