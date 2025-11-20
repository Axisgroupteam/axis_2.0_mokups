import { useState, useCallback } from "react";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusIcon, MoreHorizontalIcon } from "lucide-react";
import SmartFilter from "@/components/SmartFilter";

const Shippers = () => {
  const [filters, setFilters] = useState([]);

  // Mock data - 20 customers
  const customers = [
    { id: 1, customerName: "Acme Corporation", code: "ACM-001", email: "contact@acmecorp.com", status: true },
    { id: 2, customerName: "TechFlow Industries", code: "TFI-002", email: "info@techflow.com", status: true },
    { id: 3, customerName: "Global Solutions Ltd", code: "GSL-003", email: "support@globalsol.com", status: true },
    { id: 4, customerName: "Pioneer Manufacturing", code: "PMF-004", email: "sales@pioneermfg.com", status: false },
    { id: 5, customerName: "Stellar Enterprises", code: "STE-005", email: "hello@stellarent.com", status: true },
    { id: 6, customerName: "NextGen Systems", code: "NGS-006", email: "contact@nextgensys.com", status: true },
    { id: 7, customerName: "Atlas Distribution", code: "ATD-007", email: "ops@atlasdist.com", status: false },
    { id: 8, customerName: "Vertex Technologies", code: "VTX-008", email: "info@vertextech.com", status: true },
    { id: 9, customerName: "Omega Logistics", code: "OML-009", email: "dispatch@omegalog.com", status: true },
    { id: 10, customerName: "Summit Partners", code: "SMP-010", email: "partners@summitpart.com", status: true },
    { id: 11, customerName: "Horizon Group", code: "HRG-011", email: "contact@horizongrp.com", status: false },
    { id: 12, customerName: "Quantum Dynamics", code: "QTD-012", email: "info@quantumdyn.com", status: true },
    { id: 13, customerName: "Eagle Transport", code: "EGT-013", email: "dispatch@eagletrans.com", status: true },
    { id: 14, customerName: "Nova Industries", code: "NVI-014", email: "sales@novaind.com", status: true },
    { id: 15, customerName: "Prime Ventures", code: "PRV-015", email: "invest@primevent.com", status: false },
    { id: 16, customerName: "Delta Manufacturing", code: "DLM-016", email: "orders@deltamfg.com", status: true },
    { id: 17, customerName: "Apex Solutions", code: "APS-017", email: "support@apexsol.com", status: true },
    { id: 18, customerName: "Titan Holdings", code: "TTH-018", email: "info@titanhld.com", status: true },
    { id: 19, customerName: "Fusion Corp", code: "FSC-019", email: "contact@fusioncorp.com", status: false },
    { id: 20, customerName: "Pinnacle Group", code: "PNG-020", email: "hello@pinnaclegr.com", status: true },
  ];

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "customerName",
          label: "Customer Name",
          type: "input",
          group: "Basic",
          placeholder: "Enter customer name...",
        },
        {
          key: "code",
          label: "Code",
          type: "input",
          group: "Basic",
          placeholder: "Enter code...",
        },
        {
          key: "email",
          label: "Email",
          type: "input",
          group: "Basic",
          placeholder: "Enter email...",
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" },
          ],
        },
      ],
    },
  ];

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
    console.log("Active filters:", newFilters);
  }, []);

  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "customerName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer Name" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      size: 120,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      size: 100,
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge
            className={
              status
                ? "bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50"
                : "bg-rose-500/10 hover:bg-rose-500/30 text-rose-700 dark:text-rose-400 border border-rose-500/50"
            }
          >
            {status ? "Active" : "Inactive"}
          </Badge>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="px-6 py-4">
        {/* Filter and Add Customer */}
        <div className="flex items-center justify-between mb-4">
          <SmartFilter
            filterGroups={filterGroups}
            onFiltersChange={handleFiltersChange}
          />
          <Button className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
            <PlusIcon className="size-4 mr-2" />
            Add Customer
          </Button>
        </div>

        {/* Data Table */}
        <DataTable columns={columns} data={customers} showViewOptions={false} />
      </div>
    </div>
  );
};

export default Shippers;
