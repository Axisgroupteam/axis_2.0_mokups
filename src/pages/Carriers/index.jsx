import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  SearchIcon,
  PlusIcon,
  MoreHorizontalIcon,
  EyeIcon,
  BanIcon,
} from "lucide-react";
import ResponseDialog from "@/components/responsive-dialog";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SmartFilter from "@/components/SmartFilter";

const Carriers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [carrierName, setCarrierName] = useState("");

  // Sample carrier data - Real USA trucking companies
  const carriers = [
    {
      id: 1,
      name: "Mega Trucking",
      status: "Active",
      createdAt: "2023-10-27",
    },
    {
      id: 2,
      name: "Werner Enterprises",
      status: "Active",
      createdAt: "2023-09-15",
    },
    {
      id: 3,
      name: "J.B. Hunt Transport",
      status: "Active",
      createdAt: "2023-08-01",
    },
    {
      id: 4,
      name: "Schneider National",
      status: "Active",
      createdAt: "2023-07-22",
    },
    {
      id: 5,
      name: "Swift Transportation",
      status: "Active",
      createdAt: "2023-06-18",
    },
    {
      id: 6,
      name: "Landstar System",
      status: "Active",
      createdAt: "2023-05-30",
    },
    {
      id: 7,
      name: "XPO Logistics",
      status: "Active",
      createdAt: "2023-05-12",
    },
    {
      id: 8,
      name: "Old Dominion Freight",
      status: "Active",
      createdAt: "2023-04-28",
    },
    {
      id: 9,
      name: "Saia Inc.",
      status: "Active",
      createdAt: "2023-04-15",
    },
    {
      id: 10,
      name: "Estes Express Lines",
      status: "Inactive",
      createdAt: "2023-03-22",
    },
    {
      id: 11,
      name: "ABF Freight System",
      status: "Active",
      createdAt: "2023-03-10",
    },
    {
      id: 12,
      name: "YRC Worldwide",
      status: "Inactive",
      createdAt: "2023-02-28",
    },
    {
      id: 13,
      name: "Heartland Express",
      status: "Active",
      createdAt: "2023-02-14",
    },
    {
      id: 14,
      name: "Covenant Transportation",
      status: "Active",
      createdAt: "2023-01-30",
    },
    {
      id: 15,
      name: "Knight-Swift Transportation",
      status: "Active",
      createdAt: "2023-01-15",
    },
    {
      id: 16,
      name: "KLLM Transport Services",
      status: "Active",
      createdAt: "2022-12-20",
    },
    {
      id: 17,
      name: "Ryder System",
      status: "Active",
      createdAt: "2022-12-05",
    },
    {
      id: 18,
      name: "Penske Logistics",
      status: "Active",
      createdAt: "2022-11-18",
    },
    {
      id: 19,
      name: "C.R. England",
      status: "Active",
      createdAt: "2022-11-02",
    },
    {
      id: 20,
      name: "Prime Inc.",
      status: "Inactive",
      createdAt: "2022-10-15",
    },
    {
      id: 21,
      name: "U.S. Xpress Enterprises",
      status: "Active",
      createdAt: "2022-09-28",
    },
    {
      id: 22,
      name: "Crete Carrier Corporation",
      status: "Active",
      createdAt: "2022-09-10",
    },
    {
      id: 23,
      name: "CRST International",
      status: "Active",
      createdAt: "2022-08-25",
    },
    {
      id: 24,
      name: "Averitt Express",
      status: "Active",
      createdAt: "2022-08-08",
    },
    {
      id: 25,
      name: "Southeastern Freight Lines",
      status: "Inactive",
      createdAt: "2022-07-22",
    },
    {
      id: 26,
      name: "R+L Carriers",
      status: "Active",
      createdAt: "2022-07-05",
    },
    {
      id: 27,
      name: "Roadrunner Transportation",
      status: "Active",
      createdAt: "2022-06-18",
    },
    {
      id: 28,
      name: "Celadon Group",
      status: "Inactive",
      createdAt: "2022-06-01",
    },
  ];

  // Table columns definition
  const columns = [
    {
      id: "actions",
      header: "Action",
      size: 50,
      cell: ({ row }) => {
        const carrier = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() => navigate(`/app/carriers/${carrier.id}`)}
                className="cursor-pointer"
              >
                <EyeIcon className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Set inactive:", carrier.id)}
                className="cursor-pointer"
              >
                <BanIcon className="mr-2 h-4 w-4" />
                Set as Inactive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Carrier Name" />
      ),
      cell: ({ row }) => (
        <span
          className="font-medium text-primary cursor-pointer hover:underline"
          onClick={() => navigate(`/app/carriers/${row.original.id}`)}
        >
          {row.getValue("name")}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge
            className={
              status === "Active"
                ? "bg-emerald-500/10  hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50"
                : "bg-rose-500/10  hover:bg-rose-500/30 text-rose-700 dark:text-rose-400 border border-rose-500/50"
            }
          >
            {status}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        const formattedDate = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        return <span className="text-muted-foreground">{formattedDate}</span>;
      },
    },
  ];

  // Filter configuration for status
  const filterConfig = [
    {
      columnId: "status",
      title: "Status",
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
    },
  ];

  // Smart filter configuration
  const smartFilterGroups = [
    {
      name: "Basic Filters",
      filters: [
        {
          key: "carrierName",
          label: "Carrier Name",
          type: "input",
          placeholder: "Enter carrier name...",
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          options: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ],
        },
      ],
    },
    {
      name: "Date Filters",
      filters: [
        {
          key: "createdAfter",
          label: "Created After",
          type: "input",
          placeholder: "MM/DD/YYYY",
        },
      ],
    },
  ];

  const handleAddCarrier = () => {
    // Handle add carrier logic here
    console.log("Adding carrier:", carrierName);
    setIsAddDialogOpen(false);
    setCarrierName("");
  };

  const handleCancelDialog = () => {
    setIsAddDialogOpen(false);
    setCarrierName("");
  };

  // Filter carriers based on search term
  const filteredCarriers = carriers.filter((carrier) =>
    carrier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between ">
          {/* Search */}
          <div className=" mr-4">
            {/* Smart Filter */}
            <SmartFilter filterGroups={smartFilterGroups} className="mb-3" />
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusIcon className="size-4 mr-2" />
            Add Carrier
          </Button>
        </div>

        {/* Carriers Table */}
        <DataTable
          columns={columns}
          data={filteredCarriers}
          searchKey=""
          filterConfig={filterConfig}
          showViewOptions={false}
        />
      </div>

      {/* Add Carrier Dialog */}
      <ResponseDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        title="Add Carrier"
        description="Create a new carrier for your organization."
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="carrierName">
              Carrier Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="carrierName"
              placeholder="Enter carrier name"
              value={carrierName}
              onChange={(e) => setCarrierName(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={handleCancelDialog}>
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleAddCarrier}
            >
              <PlusIcon className="size-4 mr-2" />
              Add Carrier
            </Button>
          </div>
        </div>
      </ResponseDialog>
    </div>
  );
};

export default Carriers;
