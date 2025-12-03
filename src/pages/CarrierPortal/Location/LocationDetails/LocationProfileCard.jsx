import { MapPinIcon } from "lucide-react";
import { MdEdit } from "react-icons/md";

const LocationProfileCard = ({ locationData }) => {
  return (
    <div className="w-1/2 border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <MapPinIcon className="size-4" />
          Location Profile
        </h3>
        <button className="text-slate-500 hover:text-foreground transition-colors">
          <MdEdit className="size-4" />
        </button>
      </div>
      <div className="divide-y divide-border">
        {/* Code */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Code</p>
          <p className="text-sm font-medium text-foreground">
            {locationData.code || "-"}
          </p>
        </div>

        {/* Name */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Name</p>
          <p className="text-sm font-medium text-foreground">
            {locationData.name || "-"}
          </p>
        </div>

        {/* Contact */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Contact</p>
          <p className="text-sm font-medium text-foreground">
            {locationData.contact || "-"}
          </p>
        </div>

        {/* Phone */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
          <p className="text-sm font-medium text-foreground">
            {locationData.phone || "-"}
          </p>
        </div>

        {/* Email */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Email</p>
          <p className="text-sm font-medium text-foreground">
            {locationData.email || "-"}
          </p>
        </div>

        {/* Address */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Address</p>
          <p className="text-sm font-medium text-foreground">
            {locationData.address || "-"}
          </p>
        </div>

        {/* City, State, ZIP */}
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">City</p>
            <p className="text-sm font-medium text-foreground">
              {locationData.city || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">State</p>
            <p className="text-sm font-medium text-foreground">
              {locationData.state || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">ZIP Code</p>
            <p className="text-sm font-medium text-foreground">
              {locationData.zipCode || "-"}
            </p>
          </div>
        </div>

        {/* Latitude, Longitude */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Latitude</p>
            <p className="text-sm font-medium text-foreground">
              {locationData.latitude || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Longitude</p>
            <p className="text-sm font-medium text-foreground">
              {locationData.longitude || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationProfileCard;
