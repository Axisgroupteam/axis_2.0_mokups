import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaIdBadge, FaEdit, FaPlus } from "react-icons/fa";
import { FileText, Expand, Download } from "lucide-react";

const LicenseInformationCard = ({
  hasDriverInfo,
  driverInfoData,
  onEdit,
  onAdd
}) => {
  return (
    <div className="border rounded-sm bg-card flex-1 flex flex-col">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaIdBadge className="size-4" />
          License Information
        </h3>
        {hasDriverInfo && (
          <button
            onClick={onEdit}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <FaEdit className="size-3.5" />
          </button>
        )}
      </div>
      {hasDriverInfo ? (
        <div className="divide-y divide-border">
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">License Category</p>
              <p className="text-sm font-medium text-foreground">
                {driverInfoData.licenseCategory}
              </p>
            </div>
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">License State</p>
              <p className="text-sm font-medium text-foreground">
                {driverInfoData.licenseState}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">License Number</p>
              <p className="text-sm font-medium text-foreground">
                {driverInfoData.licenseNumber}
              </p>
            </div>
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">SSN or Fed Id</p>
              <p className="text-sm font-medium text-foreground">
                {driverInfoData.ssnOrFedId}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">License Expire Date</p>
              <p className="text-sm font-medium text-foreground">
                {driverInfoData.licenseExpireDate}
              </p>
            </div>
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">License Effective Date</p>
              <p className="text-sm font-medium text-foreground">
                {driverInfoData.licenseEffectiveDate}
              </p>
            </div>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-1.5">
              Uploaded File (License Image)
            </p>
            <div className="relative bg-muted rounded border h-20 flex items-center justify-center">
              <FileText className="size-8 text-muted-foreground" />
              <div className="absolute top-1.5 right-1.5 flex items-center gap-1">
                <span className="text-xs font-medium text-muted-foreground mr-0.5">
                  {driverInfoData.uploadFile}
                </span>
                <button className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-accent rounded">
                  <Expand className="size-3" />
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-accent rounded">
                  <Download className="size-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 py-6 flex flex-col items-center justify-center text-center flex-1">
          <p className="text-sm text-muted-foreground mb-3">
            No driver information added yet
          </p>
          <Button
            size="sm"
            onClick={onAdd}
            className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            <FaPlus className="size-3 mr-2" />
            Add Information
          </Button>
        </div>
      )}
    </div>
  );
};

export default LicenseInformationCard;
