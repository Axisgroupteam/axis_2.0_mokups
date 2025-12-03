import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import SmartFilter from "@/components/SmartFilter";
import {
  Landmark,
  Receipt,
  User,
  MessageSquare,
  Paperclip,
  Clock,
  Plus,
  DollarSign,
  Pencil,
  Trash2,
  FileText,
  History,
} from "lucide-react";
import PayeeProfileCard from "./PayeeDetails/PayeeProfileCard";

const PayeeDetails = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";
  const [directDepositFilters, setDirectDepositFilters] = useState([]);
  const [recurringDeductionsFilters, setRecurringDeductionsFilters] = useState(
    []
  );

  // Filter configurations for Direct Deposit
  const directDepositFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "type",
          label: "Type",
          type: "select",
          group: "Basic",
          options: [
            { value: "Primary", label: "Primary" },
            { value: "Secondary", label: "Secondary" },
          ],
        },
        {
          key: "bank",
          label: "Bank",
          type: "input",
          group: "Basic",
          placeholder: "Enter bank name...",
        },
        {
          key: "active",
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

  // Filter configurations for Recurring Deductions
  const recurringDeductionsFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" },
          ],
        },
        {
          key: "frequency",
          label: "Frequency",
          type: "select",
          group: "Basic",
          options: [
            { value: "Weekly", label: "Weekly" },
            { value: "Monthly", label: "Monthly" },
            { value: "Bi-Weekly", label: "Bi-Weekly" },
          ],
        },
        {
          key: "deductionType",
          label: "Deduction Type",
          type: "select",
          group: "Basic",
          options: [
            { value: "Fixed", label: "Fixed" },
            { value: "Percentage", label: "Percentage" },
          ],
        },
      ],
    },
  ];

  const handleDirectDepositFiltersChange = useCallback((newFilters) => {
    setDirectDepositFilters(newFilters);
  }, []);

  const handleRecurringDeductionsFiltersChange = useCallback((newFilters) => {
    setRecurringDeductionsFilters(newFilters);
  }, []);

  // Mock payee data
  const payeeData = {
    name: "John Smith",
    legalName: "John Michael Smith LLC",
    code: "PAY-001",
    settlement: true,
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    phoneNumber: "+1 (555) 123-4567",
    paymentMethod: "Bank Transfer",
  };

  // Mock direct deposit data
  const directDeposits = [
    {
      id: 1,
      type: "Primary",
      bank: "Chase Bank",
      accountNumber: "**** **** 1234",
      amount: "$5,000.00",
      method: "Fixed",
      newAmount: "-",
      nextMethod: "-",
      firstDeposite: "2024-01-01",
      lastDeposite: "2024-11-21",
      active: true,
    },
    {
      id: 2,
      type: "Secondary",
      bank: "Bank of America",
      accountNumber: "**** **** 5678",
      amount: "$2,500.00",
      method: "Percentage",
      newAmount: "-",
      nextMethod: "-",
      firstDeposite: "2024-02-15",
      lastDeposite: "2024-11-20",
      active: true,
    },
    {
      id: 3,
      type: "Savings",
      bank: "Wells Fargo",
      accountNumber: "**** **** 9012",
      amount: "$1,000.00",
      method: "Fixed",
      newAmount: "$1,200.00",
      nextMethod: "Fixed",
      firstDeposite: "2024-03-01",
      lastDeposite: "2024-11-18",
      active: false,
    },
  ];

  // Mock recurring deductions data
  const recurringDeductions = [
    {
      id: 1,
      tractor: "TRC-101",
      status: "Active",
      deductionCode: "DED-001",
      description: "Truck Payment",
      frequency: "Weekly",
      lastDateTaken: "2024-11-15",
      cycleCode: "CYC-01",
      amount: "$250.00",
      percent: "5%",
      deductionType: "Fixed",
      loanBalance: "$10,000.00",
      originalAmount: "$15,000.00",
      glAccount: "GL-5001",
      startDate: "2024-01-01",
      stopDate: "2024-12-31",
      totalToDate: "$2,500.00",
    },
    {
      id: 2,
      tractor: "TRC-102",
      status: "Active",
      deductionCode: "DED-002",
      description: "Insurance Premium",
      frequency: "Monthly",
      lastDateTaken: "2024-11-01",
      cycleCode: "CYC-02",
      amount: "$150.00",
      percent: "3%",
      deductionType: "Percentage",
      loanBalance: "$5,000.00",
      originalAmount: "$8,000.00",
      glAccount: "GL-5002",
      startDate: "2024-01-01",
      stopDate: "2024-12-31",
      totalToDate: "$1,650.00",
    },
    {
      id: 3,
      tractor: "TRC-103",
      status: "Active",
      deductionCode: "DED-003",
      description: "Fuel Advance",
      frequency: "Bi-Weekly",
      lastDateTaken: "2024-11-10",
      cycleCode: "CYC-03",
      amount: "$500.00",
      percent: "10%",
      deductionType: "Fixed",
      loanBalance: "$3,500.00",
      originalAmount: "$6,000.00",
      glAccount: "GL-5003",
      startDate: "2024-02-01",
      stopDate: "2024-12-31",
      totalToDate: "$2,500.00",
    },
  ];

  // Mock comments data
  const commentsData = [
    {
      id: 1,
      dateTime: "2024-01-15 10:30 AM",
      enteredBy: "John Smith",
      type: "General",
      attachment: "document.pdf",
      comment: "Payment processed successfully for invoice #12345.",
    },
    {
      id: 2,
      dateTime: "2024-01-10 02:15 PM",
      enteredBy: "Sarah Johnson",
      type: "Warning",
      attachment: null,
      comment: "Missing tax documentation. Please update.",
    },
    {
      id: 3,
      dateTime: "2024-01-05 09:00 AM",
      enteredBy: "Mike Davis",
      type: "Positive",
      attachment: "certificate.pdf",
      comment: "Verified payee information and bank details.",
    },
  ];

  // Audit log data
  const auditLogData = [
    {
      id: 1,
      action: "Direct deposit account added",
      type: "Create",
      oldValue: "-",
      newValue: "Chase Bank ****1234",
      actionBy: "John Smith",
      timestamp: "Jan 28, 2024 14:35:22",
    },
    {
      id: 2,
      action: "Payment processed",
      type: "Update",
      oldValue: "Pending",
      newValue: "$5,000.00 - Completed",
      actionBy: "System",
      timestamp: "Jan 26, 2024 09:12:45",
    },
    {
      id: 3,
      action: "Recurring deduction modified",
      type: "Update",
      oldValue: "$200.00/week",
      newValue: "$250.00/week",
      actionBy: "Sarah Johnson",
      timestamp: "Jan 24, 2024 20:22:34",
    },
    {
      id: 4,
      action: "Payee status changed",
      type: "Status",
      oldValue: "Pending",
      newValue: "Active",
      actionBy: "Mike Davis",
      timestamp: "Jan 20, 2024 11:45:18",
    },
    {
      id: 5,
      action: "W-9 document uploaded",
      type: "Upload",
      oldValue: "-",
      newValue: "w9_2024.pdf",
      actionBy: "Sarah Johnson",
      timestamp: "Jan 18, 2024 16:30:00",
    },
    {
      id: 6,
      action: "Bank details verified",
      type: "Verify",
      oldValue: "Unverified",
      newValue: "Verified",
      actionBy: "Admin System",
      timestamp: "Jan 15, 2024 10:15:33",
    },
    {
      id: 7,
      action: "Pay frequency updated",
      type: "Update",
      oldValue: "Monthly",
      newValue: "Weekly",
      actionBy: "John Smith",
      timestamp: "Jan 12, 2024 08:00:00",
    },
    {
      id: 8,
      action: "Payee created",
      type: "Create",
      oldValue: "-",
      newValue: "John Smith - PAY-001",
      actionBy: "John Smith",
      timestamp: "Jan 10, 2024 09:30:15",
    },
  ];

  const getAuditTypeBadgeColor = (type) => {
    const colors = {
      Create: "bg-green-500/10 hover:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50",
      Update: "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50",
      Upload: "bg-purple-500/10 hover:bg-purple-500/30 text-purple-700 dark:text-purple-400 border border-purple-500/50",
      Status: "bg-orange-500/10 hover:bg-orange-500/30 text-orange-700 dark:text-orange-400 border border-orange-500/50",
      Verify: "bg-teal-500/10 hover:bg-teal-500/30 text-teal-700 dark:text-teal-400 border border-teal-500/50",
    };
    return colors[type] || "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  const auditLogColumns = [
    {
      accessorKey: "action",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Operation" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => {
        const type = row.getValue("type");
        return (
          <Badge className={getAuditTypeBadgeColor(type)}>{type}</Badge>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "oldValue",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Old Value" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "newValue",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="New Value" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "actionBy",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Modified By" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "timestamp",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Timestamp" />
      ),
      enableSorting: true,
    },
  ];

  // Direct Deposit columns
  const directDepositColumns = [
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      size: 100,
    },
    {
      accessorKey: "bank",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Bank" />
      ),
      size: 150,
    },
    {
      accessorKey: "accountNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Account Number" />
      ),
      size: 150,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      size: 120,
    },
    {
      accessorKey: "method",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="M" />
      ),
      size: 100,
    },
    {
      accessorKey: "newAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="New Amount" />
      ),
      size: 120,
    },
    {
      accessorKey: "nextMethod",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="M" />
      ),
      size: 80,
    },
    {
      accessorKey: "firstDeposite",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="First Deposit" />
      ),
      size: 120,
    },
    {
      accessorKey: "lastDeposite",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Deposit" />
      ),
      size: 120,
    },
    {
      accessorKey: "active",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Active" />
      ),
      size: 100,
      cell: ({ row }) => {
        const isActive = row.getValue("active");
        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
              isActive
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        );
      },
    },
  ];

  // Recurring Deductions columns
  const recurringDeductionsColumns = [
    {
      accessorKey: "tractor",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tractor" />
      ),
      size: 100,
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
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "deductionCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Deduction Code" />
      ),
      size: 130,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      size: 150,
    },
    {
      accessorKey: "frequency",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Frequency" />
      ),
      size: 100,
    },
    {
      accessorKey: "lastDateTaken",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Date Taken" />
      ),
      size: 130,
    },
    {
      accessorKey: "cycleCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cycle Code" />
      ),
      size: 100,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      size: 100,
    },
    {
      accessorKey: "percent",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Percent" />
      ),
      size: 80,
    },
    {
      accessorKey: "deductionType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Deduction Type" />
      ),
      size: 120,
    },
    {
      accessorKey: "loanBalance",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Loan Balance" />
      ),
      size: 120,
    },
    {
      accessorKey: "originalAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Original Amount" />
      ),
      size: 130,
    },
    {
      accessorKey: "glAccount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="GL Account" />
      ),
      size: 110,
    },
    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Start Date" />
      ),
      size: 110,
    },
    {
      accessorKey: "stopDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Stop Date" />
      ),
      size: 110,
    },
    {
      accessorKey: "totalToDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total to Date" />
      ),
      size: 120,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <Tabs
        defaultValue={activeTab}
        className="w-full h-full flex flex-col overflow-hidden"
      >
        <div className="flex-shrink-0">
          <TabsList className="mb-0 rounded-none ">
            <TabsTrigger value="profile" className="h-full">
              <User className="size-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="finance" className="h-full">
              <DollarSign className="size-4" />
              Finance
            </TabsTrigger>
            <TabsTrigger value="settlement" className="h-full">
              <FileText className="size-4" />
              Settlement Details
            </TabsTrigger>
            <TabsTrigger value="comments" className="h-full">
              <MessageSquare className="size-4" />
              Comments
            </TabsTrigger>
            <TabsTrigger value="audit" className="h-full">
              <History className="size-4" />
              Audit Log
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto -mt-1">
          <TabsContent
            value="profile"
            className="space-y-4 px-2 py-2 h-full mt-0"
          >
            <div className="flex gap-4 h-fit">
              {/* Payee Profile Card */}
              <PayeeProfileCard payeeData={payeeData} />
            </div>
          </TabsContent>

          <TabsContent value="finance" className="space-y-4 px-4 h-full mt-0">
            <Tabs defaultValue="direct-deposit" className="w-full mt-1">
              <TabsList className="mb-1 h-14">
                <TabsTrigger
                  value="direct-deposit"
                  className="flex items-center gap-1.5"
                >
                  <Landmark className="size-4" />
                  Direct Deposit
                </TabsTrigger>
                <TabsTrigger
                  value="recurring-deductions"
                  className="flex items-center gap-1.5"
                >
                  <Receipt className="size-4" />
                  Recurring Deductions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="direct-deposit" className="space-y-4 mt-0">
                {/* Direct Deposit Section */}
                <div className="border border-border rounded-lg overflow-hidden bg-background">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                    <SmartFilter
                      filterGroups={directDepositFilterGroups}
                      onFiltersChange={handleDirectDepositFiltersChange}
                    />
                    <Button
                      size="sm"
                      className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
                    >
                      <Plus className="size-3" />
                      Add Direct Deposit
                    </Button>
                  </div>
                  <div className="p-4">
                    <DataTable
                      columns={directDepositColumns}
                      data={directDeposits}
                      showViewOptions={false}
                      pageSize={10}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="recurring-deductions"
                className="space-y-4 mt-0"
              >
                {/* Recurring Deductions Section */}
                <div className="border border-border rounded-lg overflow-hidden bg-background">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                    <SmartFilter
                      filterGroups={recurringDeductionsFilterGroups}
                      onFiltersChange={handleRecurringDeductionsFiltersChange}
                    />
                    <Button
                      size="sm"
                      className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
                    >
                      <Plus className="size-3" />
                      Add Recurring Deduction
                    </Button>
                  </div>
                  <div className="p-4">
                    <DataTable
                      columns={recurringDeductionsColumns}
                      data={recurringDeductions}
                      showViewOptions={false}
                      pageSize={10}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent
            value="settlement"
            className="space-y-4 px-2 py-2 h-full mt-0"
          >
            <div className="flex gap-4">
              {/* Left Column */}
              <div className="w-1/2 flex flex-col gap-4">
                {/* General Card */}
                <div className="border rounded-sm bg-card">
                  <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">
                      General
                    </h3>
                    <button className="text-slate-500 hover:text-foreground transition-colors">
                      <Pencil className="size-4" />
                    </button>
                  </div>
                  <div className="divide-y divide-border">
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          Payee type
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          Individual
                        </p>
                      </div>
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          Pay Frequency
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          Weekly
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          W-9 on file
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-4 h-4 border-2 border-green-500 bg-green-500 rounded">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            Yes
                          </span>
                        </div>
                      </div>
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          Expense account
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          EXP-5001
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          Payroll PIN
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          PIN-12345
                        </p>
                      </div>
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          Print
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-4 h-4 border-2 border-green-500 bg-green-500 rounded">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            Enabled
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">
                        Box
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        Box 123
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rates Card */}
                <div className="border rounded-sm bg-card">
                  <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">
                      Rates
                    </h3>
                    <button className="text-slate-500 hover:text-foreground transition-colors">
                      <Pencil className="size-4" />
                    </button>
                  </div>
                  <div className="divide-y divide-border">
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          Pay method
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          Direct Deposit
                        </p>
                      </div>
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          Loaded pay rate
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          $25.50/hr
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="w-1/2 flex flex-col gap-4">
                {/* Year to date (YTD Wages) Card */}
                <div className="border rounded-sm bg-card">
                  <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">
                      Year to date (YTD Wages)
                    </h3>
                    <button className="text-slate-500 hover:text-foreground transition-colors">
                      <Pencil className="size-4" />
                    </button>
                  </div>
                  <div className="divide-y divide-border">
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          Gross
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          $45,000.00
                        </p>
                      </div>
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          Gross non-taxable
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          $2,500.00
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          YTD Distance
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          25,000 mi
                        </p>
                      </div>
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          PTD Distance
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          2,500 mi
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Allocation Card */}
                <div className="border rounded-sm bg-card">
                  <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">
                      Allocation
                    </h3>
                    <button className="text-slate-500 hover:text-foreground transition-colors">
                      <Pencil className="size-4" />
                    </button>
                  </div>
                  <div className="divide-y divide-border">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">
                        Allocation code
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        ALLOC-001
                      </p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">
                        Description
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        Standard Allocation
                      </p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">
                        Effective date
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        2024-01-01
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="comments"
            className="space-y-4 px-2 py-2 h-full mt-0"
          >
            <div className="border rounded-sm bg-card">
              <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="size-4" />
                  Comments
                </h3>
                <Button
                  size="sm"
                  className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
                >
                  <Plus className="size-3" />
                  Add Comment
                </Button>
              </div>
              <div className="p-4">
                {commentsData.length > 0 ? (
                  <div className="space-y-4">
                    {commentsData.map((comment) => {
                      const typeColors = {
                        General:
                          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                        Warning:
                          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                        Positive:
                          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                      };

                      return (
                        <div
                          key={comment.id}
                          className="border rounded-lg p-3 bg-background hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="size-3 text-primary" />
                              </div>
                              <div>
                                <p className="font-semibold text-xs text-foreground">
                                  {comment.enteredBy}
                                </p>
                                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                  <Clock className="size-2" />
                                  {comment.dateTime}
                                </div>
                              </div>
                            </div>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                typeColors[comment.type] ||
                                "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {comment.type}
                            </span>
                          </div>

                          <p className="text-xs text-foreground mb-2 leading-relaxed">
                            {comment.comment}
                          </p>

                          {comment.attachment && (
                            <div className="flex items-center gap-1.5 p-1.5 bg-muted/50 rounded-md w-fit">
                              <Paperclip className="size-2.5 text-muted-foreground" />
                              <span className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                                {comment.attachment}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No comments added yet
                  </p>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="audit"
            className="space-y-2 px-2 py-2 h-full mt-0"
          >
            <DataTable
              columns={auditLogColumns}
              data={auditLogData}
              showViewOptions={false}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PayeeDetails;
