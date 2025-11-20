import { Button } from "@/components/ui/button";
import { FaExternalLinkAlt } from "react-icons/fa";

const ExternalLinksCard = () => {
  const handleGoToSaferwatch = () => {
    // Handle navigation to Saferwatch
    window.open("https://saferwatch.com", "_blank");
  };

  const handleGoToRMIS = () => {
    // Handle navigation to RMIS
    window.open("https://rmis.com", "_blank");
  };

  return (
    <div className="border rounded-sm bg-card h-fit">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaExternalLinkAlt className="size-4" />
          External Links
        </h3>
      </div>
      <div className="p-4 flex gap-3">
        <Button
          onClick={handleGoToSaferwatch}
          className="flex-1 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center justify-center gap-2"
        >
          <FaExternalLinkAlt className="size-3" />
          Go to Saferwatch
        </Button>
        <Button
          onClick={handleGoToRMIS}
          className="flex-1 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center justify-center gap-2"
        >
          <FaExternalLinkAlt className="size-3" />
          Go to RMIS (Default)
        </Button>
      </div>
    </div>
  );
};

export default ExternalLinksCard;
