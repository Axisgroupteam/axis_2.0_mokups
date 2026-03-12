import { DatabaseIcon } from "lucide-react";
import AccessorialCodes from "./AccessorialCodes";

const Accessorial = () => {
  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      

      <div className="flex-1 px-6 py-4 overflow-auto">
        <AccessorialCodes />
      </div>
    </div>
  );
};

export default Accessorial;
