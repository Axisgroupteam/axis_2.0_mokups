import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaCheckCircle, FaPaperPlane } from "react-icons/fa";

const EmploymentVerificationCard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("");

  const handleSendVerification = (e) => {
    e.preventDefault();
    // Handle send verification logic
    setIsDialogOpen(false);
  };

  return (
    <div className="border rounded-sm bg-card h-fit">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaCheckCircle className="size-4" />
          Employment Verification
        </h3>
      </div>
      <div className="p-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="w-full bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              <FaPaperPlane className="size-3 mr-2" />
              Employment Verification
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Send Employment Verification</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSendVerification} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Delivery Option <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={deliveryOption}
                  onValueChange={setDeliveryOption}
                  required
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select delivery option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Text">Text</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {deliveryOption === "Text" && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Enter 9-digit phone number"
                    className="h-10"
                    pattern="[0-9]{9,}"
                    required
                  />
                </div>
              )}

              {deliveryOption === "Email" && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    className="h-10"
                    required
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1 h-10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-10 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  Send Verification
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmploymentVerificationCard;
