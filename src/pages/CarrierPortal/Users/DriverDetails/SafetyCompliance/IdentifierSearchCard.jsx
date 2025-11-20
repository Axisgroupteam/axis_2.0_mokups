import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaSearch } from "react-icons/fa";

const IdentifierSearchCard = () => {
  const [identifier, setIdentifier] = useState("DOT #");
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic
    console.log(`Searching ${identifier}: ${searchValue}`);
  };

  return (
    <div className="border rounded-sm bg-card h-fit">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FaSearch className="size-4" />
          Identifier Search
        </h3>
      </div>
      <div className="p-4">
        <form onSubmit={handleSearch} className="space-y-3">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Identifier <span className="text-red-500">*</span>
            </Label>
            <Select value={identifier} onValueChange={setIdentifier} required>
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder="Select identifier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DOT #">DOT #</SelectItem>
                <SelectItem value="MC #">MC #</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Search Value <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={`Enter ${identifier}`}
              className="h-10"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center justify-center gap-2"
          >
            <FaSearch className="size-3" />
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};

export default IdentifierSearchCard;
