import { Button } from "@/components/ui/button";
import { FaHome, FaEdit, FaPlus } from "react-icons/fa";

const HomeInformationCard = ({ hasData = true, data, onEdit, onAdd }) => {
  return (
    <div className="border rounded-sm bg-card h-fit">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaHome className="size-4" />
          Home Information
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
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Home terminal</p>
            <p className="text-sm font-medium text-foreground">
              {data.homeTerminal}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Return Home</p>
            <p className="text-sm font-medium text-foreground">
              {new Date(data.returnHome).toLocaleDateString()}
            </p>
          </div>
        </div>
      ) : (
        <div className="px-4 py-6 flex flex-col items-center justify-center text-center flex-1">
          <p className="text-sm text-muted-foreground mb-3">
            No home information added yet
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

export default HomeInformationCard;
