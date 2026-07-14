import React from 'react';
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, PencilIcon, CopyIcon } from "lucide-react";

const getStatusBadgeColor = (status) => {
  const colors = {
    Active: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50",
    Expired: "bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/50",
    Scheduled: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/50",
    Pending: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/50",
  };
  return colors[status] || colors.Expired;
};

const fscColumns = (onEdit) => [
  {
    id: "actions",
    header: "Actions",
    size: 60,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => onEdit(row.original)} className="cursor-pointer">
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit / View
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <CopyIcon className="h-4 w-4 mr-2" />
            Duplicate to New
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <Badge className={getStatusBadgeColor(row.getValue("status"))}>
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "effectiveStart",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Start Date" />,
  },
  {
    accessorKey: "effectiveEnd",
    header: ({ column }) => <DataTableColumnHeader column={column} title="End Date" />,
    cell: ({ row }) => row.getValue("effectiveEnd") || <span className="text-muted-foreground italic">Present</span>,
  },
  {
    accessorKey: "fscApplies",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Applicability" />,
  },
  {
    accessorKey: "method",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Method" />,
  },
  {
    accessorKey: "indexSource",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Index Source" />,
  },
  {
    id: "details",
    header: "Calculation Details",
    cell: ({ row }) => {
      const data = row.original;
      if (data.method === "PERCENT_LINEHAUL" || data.method === "PER_MILE") {
        return <span className="text-sm">Base: ${data.basePrice?.toFixed(2)}{data.incrementPrice ? ` / Inc: $${data.incrementPrice}` : ''}</span>;
      }
      return <span className="text-sm text-muted-foreground">N/A</span>;
    }
  }
];

const FSCListTable = ({ data, onEdit }) => {
  return (
    <div className="bg-background">
      <DataTable
        columns={fscColumns(onEdit)}
        data={data}
        showViewOptions={false}
      />
    </div>
  );
};

export default FSCListTable;
