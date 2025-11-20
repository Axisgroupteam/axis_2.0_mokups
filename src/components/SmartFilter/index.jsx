import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { XIcon, FilterIcon } from "lucide-react";

const SmartFilter = ({ filterGroups, onFiltersChange, initialFilters = {}, className = "" }) => {
  const [activeFilters, setActiveFilters] = useState([]);

  // Initialize filters from initialFilters prop
  useEffect(() => {
    const initial = Object.entries(initialFilters).map(([key, value]) => {
      const config = filterGroups
        .flatMap((group) => group.filters)
        .find((filter) => filter.key === key);
      return config ? { config, value } : null;
    }).filter(Boolean);
    setActiveFilters(initial);
  }, []);

  // Notify parent when filters change
  useEffect(() => {
    if (onFiltersChange) {
      const filterValues = activeFilters.map(({ config, value }) => ({
        key: config.key,
        value,
        type: config.type,
      }));
      onFiltersChange(filterValues);
    }
  }, [activeFilters, onFiltersChange]);

  const getAvailableFilters = () => {
    const activeKeys = activeFilters.map((f) => f.config.key);
    return filterGroups
      .map((group) => ({
        ...group,
        filters: group.filters.filter((f) => !activeKeys.includes(f.key) && !f.isDisabled),
      }))
      .filter((group) => group.filters.length > 0);
  };

  const handleFilterSelect = (filterKey) => {
    const filterConfig = filterGroups
      .flatMap((group) => group.filters)
      .find((filter) => filter.key === filterKey);

    if (filterConfig) {
      const initialValue = filterConfig.type === "multiSelect" ? [] : "";
      setActiveFilters([...activeFilters, { config: filterConfig, value: initialValue }]);
    }
  };

  const updateFilterValue = (filterKey, value) => {
    setActiveFilters(activeFilters.map((filter) =>
      filter.config.key === filterKey ? { ...filter, value } : filter
    ));
  };

  const removeFilter = (filterKey) => {
    setActiveFilters(activeFilters.filter((f) => f.config.key !== filterKey));
  };

  const renderFilter = (activeFilter) => {
    const { config, value } = activeFilter;

    switch (config.type) {
      case "input":
        return (
          <div key={config.key} className="flex items-center rounded-full pl-2 border overflow-hidden py-0.5 pr-0.5">
            <div className="relative flex-shrink-0 group mr-1">
              <FilterIcon className="size-3 text-primary mr-1 group-hover:opacity-0 transition-opacity duration-200" />
              <XIcon
                className="size-3 text-foreground cursor-pointer absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:text-foreground rounded"
                onClick={() => removeFilter(config.key)}
              />
            </div>
            <span className="text-sm text-primary whitespace-nowrap mr-2">
              {config.label}
            </span>
            <Separator orientation="vertical" />
            <Input
              type="text"
              placeholder={config.placeholder || `Enter ${config.label}...`}
              value={value}
              onChange={(e) => updateFilterValue(config.key, e.target.value)}
              className="w-50 h-8 text-sm border-none rounded-l-none rounded-r-full bg-secondary/50"
            />
          </div>
        );

      case "select":
        return (
          <div key={config.key} className="flex items-center gap-1 rounded-full pl-2 border overflow-hidden">
            <div className="relative flex-shrink-0 group">
              <FilterIcon className="size-3 text-primary mr-1 group-hover:opacity-0 transition-opacity duration-200" />
              <XIcon
                className="size-3 text-foreground cursor-pointer absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:text-foreground rounded"
                onClick={() => removeFilter(config.key)}
              />
            </div>
            <span className="text-sm text-primary whitespace-nowrap">
              {config.label}
            </span>
            <Separator orientation="vertical" />
            <Select value={value} onValueChange={(val) => updateFilterValue(config.key, val)}>
              <SelectTrigger className="-ml-1 text-sm border-none rounded-l-none bg-secondary/50">
                <SelectValue placeholder={config.placeholder || "Select..."} />
              </SelectTrigger>
              <SelectContent>
                {config.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      default:
        return null;
    }
  };

  const availableFilterGroups = getAvailableFilters();

  return (
    <div className={`px-1 py-1 bg-background ${className}`}>
      <div className="flex flex-nowrap gap-2 items-center">
        {/* Add new filter dropdown */}
        {availableFilterGroups.length > 0 && (
          <Select value="" onValueChange={handleFilterSelect}>
            <SelectTrigger className="w-[200px] rounded-full min-h-9 flex-shrink-0">
              <SelectValue placeholder="Add filter..." />
            </SelectTrigger>
            <SelectContent className="max-h-[40vh] overflow-y-auto">
              {availableFilterGroups.map((group) => (
                <SelectGroup key={group.name}>
                  <SelectLabel>{group.name}</SelectLabel>
                  {group.filters.map((filter) => (
                    <SelectItem key={filter.key} value={filter.key} disabled={filter.isDisabled}>
                      {filter.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Render active filters */}
        {activeFilters.map((activeFilter) => renderFilter(activeFilter))}
      </div>
    </div>
  );
};

export default SmartFilter;
