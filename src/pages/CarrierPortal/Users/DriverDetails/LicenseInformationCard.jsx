import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaPlus, FaIdCard } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FileText, Eye, Download, Trash2 } from "lucide-react";

const LicenseInformationCard = ({
  hasDriverInfo,
  driverInfoData,
  onEdit,
  onAdd,
}) => {
  return (
    <div className="border rounded-sm bg-card flex-1 flex flex-col">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaIdCard className="size-4" />
          License Information
        </h3>
        {hasDriverInfo && (
          <button
            onClick={onEdit}
            className="text-slate-500 hover:text-foreground transition-colors"
          >
            <MdEdit className="size-4" />
          </button>
        )}
      </div>
      {hasDriverInfo ? (
        <div className="divide-y divide-border">
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">
                License Category
              </p>
              <p className="text-sm font-medium text-foreground">
                {driverInfoData.licenseCategory}
              </p>
            </div>
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">
                License State
              </p>
              <p className="text-sm font-medium text-foreground">
                {driverInfoData.licenseState}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">
                License Number
              </p>
              <p className="text-sm font-medium text-foreground">
                {driverInfoData.licenseNumber}
              </p>
            </div>
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">
                SSN or Fed Id
              </p>
              <p className="text-sm font-medium text-foreground">
                {driverInfoData.ssnOrFedId}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">
                License Expire Date
              </p>
              <p className="text-sm font-medium text-foreground">
                {driverInfoData.licenseExpireDate}
              </p>
            </div>
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">
                License Effective Date
              </p>
              <p className="text-sm font-medium text-foreground">
                {driverInfoData.licenseEffectiveDate}
              </p>
            </div>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-1.5">
              Uploaded File (License Image)
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-rose-500" />
                <a
                  href="#"
                  className="text-sm font-medium text-rose-500  underline hover:underline cursor-pointer"
                >
                  {driverInfoData.uploadFile}
                </a>
              </div>
              <div className="flex items-center">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10"
                  title="View"
                >
                  <Eye className="size-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 text-green-600 dark:text-green-400 hover:bg-green-500/10"
                  title="Download"
                >
                  <Download className="size-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10"
                  title="Delete"
                >
                  <Trash2 className="size-4" />
                </Button>
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
