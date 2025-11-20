import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

export function DataTableToolbar({ table, searchKey, filterConfig = [], showViewOptions = true }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchKey && (
          <Input
            placeholder={`Search ${searchKey}...`}
            value={table.getColumn(searchKey)?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="h-10 w-[150px] lg:w-[250px]"
          />
        )}
        {filterConfig && filterConfig.length > 0 && filterConfig.map((config) => {
          const column = table.getColumn(config.column);
          if (!column) return null;

          return (
            <DataTableFacetedFilter
              key={config.column}
              column={column}
              title={config.title}
              options={config.options}
            />
          );
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-10 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {showViewOptions && <DataTableViewOptions table={table} />}
    </div>
  );
}
