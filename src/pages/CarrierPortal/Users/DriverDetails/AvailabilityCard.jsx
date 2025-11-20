import { Button } from "@/components/ui/button";
import { FaCalendarAlt, FaEdit, FaPlus } from "react-icons/fa";

const AvailabilityCard = ({ hasData = true, data, onEdit, onAdd }) => {
  return (
    <div className="border rounded-sm bg-card h-fit">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaCalendarAlt className="size-4" />
          Availability
        </h3>
        {hasData && (
          <button
            onClick={onEdit}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <FaEdit className="size-3.5" />
          </button>
        )}
      </div>
      {hasData ? (
        <div className="divide-y divide-border">
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">Drive time available</p>
              <p className="text-sm font-medium text-foreground">
                {data.driveTimeAvailable} hours
              </p>
            </div>
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">On duty time available</p>
              <p className="text-sm font-medium text-foreground">
                {data.onDutyTimeAvailable} hours
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">As of date</p>
              <p className="text-sm font-medium text-foreground">
                {new Date(data.asOfDate).toLocaleDateString()}
              </p>
            </div>
            <div className="px-4 py-2.5">
              <p className="text-xs text-muted-foreground mb-0.5">Duty status</p>
              <p className="text-sm font-medium text-foreground">
                {data.dutyStatus}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 py-6 flex flex-col items-center justify-center text-center flex-1">
          <p className="text-sm text-muted-foreground mb-3">
            No availability information added yet
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

export default AvailabilityCard;
