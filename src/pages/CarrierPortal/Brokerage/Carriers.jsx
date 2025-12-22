import { Truck } from "lucide-react";

const Carriers = () => {
  return (
    <div className="h-full p-4">
      <div className="border rounded-lg p-8 h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Truck className="size-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium">Carriers</h3>
          <p className="text-sm">Coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default Carriers;
