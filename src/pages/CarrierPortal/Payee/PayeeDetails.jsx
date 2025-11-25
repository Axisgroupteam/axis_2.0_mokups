import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FaUser,
  FaComments,
  FaPaperclip,
  FaClock,
  FaPlus,
  FaDollarSign,
  FaEdit,
  FaTrash,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import PayeeProfileCard from "./PayeeDetails/PayeeProfileCard";

const PayeeDetails = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";

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

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <Tabs
        defaultValue={activeTab}
        className="w-full h-full flex flex-col overflow-hidden"
      >
        <div className="flex-shrink-0">
          <TabsList className="mb-0 rounded-none ">
            <TabsTrigger value="profile" className="h-full">
              <FaUser className="size-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="finance" className="h-full">
              <FaDollarSign className="size-4" />
              Finance
            </TabsTrigger>
            <TabsTrigger value="settlement" className="h-full">
              <FaFileInvoiceDollar className="size-4" />
              Settlement Details
            </TabsTrigger>
            <TabsTrigger value="comments" className="h-full">
              <FaComments className="size-4" />
              Comments
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

          <TabsContent
            value="finance"
            className="space-y-4 px-2 py-2 h-full mt-0"
          >
            {/* First Direct Deposit Section */}
            <div className="border rounded-sm bg-card">
              <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FaDollarSign className="size-4" />
                  Direct Deposite
                </h3>
                <Button
                  size="sm"
                  className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
                >
                  <FaPlus className="size-3" />
                  Add Direct Deposite
                </Button>
              </div>
              <div className="p-4">
                {directDeposits.length > 0 ? (
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">Type</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">Bank</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">Account Number</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">Amount</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">M</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">New amount</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">M</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">First Deposite</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">Last Deposite</TableHead>
                          <TableHead className="text-xs font-semibold h-9 py-2">Active</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {directDeposits.map((deposit) => (
                          <TableRow key={deposit.id}>
                            <TableCell className="text-xs border-r py-2.5">{deposit.type}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deposit.bank}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deposit.accountNumber}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deposit.amount}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deposit.method}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deposit.newAmount}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deposit.nextMethod}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deposit.firstDeposite}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deposit.lastDeposite}</TableCell>
                            <TableCell className="text-xs py-2.5">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                deposit.active
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              }`}>
                                {deposit.active ? "Active" : "Inactive"}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No direct deposits added yet
                  </p>
                )}
              </div>
            </div>

            {/* Recurring Deductions Section */}
            <div className="border rounded-sm bg-card">
              <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FaDollarSign className="size-4" />
                  Recurring Deductions
                </h3>
                <Button
                  size="sm"
                  className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
                >
                  <FaPlus className="size-3" />
                  Add Recurring Deduction
                </Button>
              </div>
              <div className="p-4">
                {recurringDeductions.length > 0 ? (
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">Tractor</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">Status</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">Deduction/Earning Code</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">Description</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">Frequency</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">Last date taken</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">Cycle code</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">Amount</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">Percent</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">Deduction type</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">Loan balance</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">Original Amount</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">GL Account</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">Start date</TableHead>
                          <TableHead className="text-xs font-semibold border-r h-9 py-2">Stop date</TableHead>
                          <TableHead className="text-xs font-semibold h-9 py-2">Total to date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recurringDeductions.map((deduction) => (
                          <TableRow key={deduction.id}>
                            <TableCell className="text-xs border-r py-2.5">{deduction.tractor}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                {deduction.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deduction.deductionCode}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deduction.description}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deduction.frequency}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deduction.lastDateTaken}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deduction.cycleCode}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deduction.amount}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deduction.percent}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deduction.deductionType}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deduction.loanBalance}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deduction.originalAmount}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deduction.glAccount}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deduction.startDate}</TableCell>
                            <TableCell className="text-xs border-r py-2.5">{deduction.stopDate}</TableCell>
                            <TableCell className="text-xs py-2.5">{deduction.totalToDate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No recurring deductions added yet
                  </p>
                )}
              </div>
            </div>
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
                    <h3 className="text-sm font-semibold text-foreground">General</h3>
                    <button className="text-slate-500 hover:text-foreground transition-colors">
                      <MdEdit className="size-4" />
                    </button>
                  </div>
                  <div className="divide-y divide-border">
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Payee type</p>
                        <p className="text-sm font-medium text-foreground">Individual</p>
                      </div>
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Pay Frequency</p>
                        <p className="text-sm font-medium text-foreground">Weekly</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">W-9 on file</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-4 h-4 border-2 border-green-500 bg-green-500 rounded">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-foreground">Yes</span>
                        </div>
                      </div>
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Expense account</p>
                        <p className="text-sm font-medium text-foreground">EXP-5001</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Payroll PIN</p>
                        <p className="text-sm font-medium text-foreground">PIN-12345</p>
                      </div>
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Print</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-4 h-4 border-2 border-green-500 bg-green-500 rounded">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-foreground">Enabled</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Box</p>
                      <p className="text-sm font-medium text-foreground">Box 123</p>
                    </div>
                  </div>
                </div>

                {/* Rates Card */}
                <div className="border rounded-sm bg-card">
                  <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">Rates</h3>
                    <button className="text-slate-500 hover:text-foreground transition-colors">
                      <MdEdit className="size-4" />
                    </button>
                  </div>
                  <div className="divide-y divide-border">
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Pay method</p>
                        <p className="text-sm font-medium text-foreground">Direct Deposit</p>
                      </div>
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Loaded pay rate</p>
                        <p className="text-sm font-medium text-foreground">$25.50/hr</p>
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
                    <h3 className="text-sm font-semibold text-foreground">Year to date (YTD Wages)</h3>
                    <button className="text-slate-500 hover:text-foreground transition-colors">
                      <MdEdit className="size-4" />
                    </button>
                  </div>
                  <div className="divide-y divide-border">
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Gross</p>
                        <p className="text-sm font-medium text-foreground">$45,000.00</p>
                      </div>
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">Gross non-taxable</p>
                        <p className="text-sm font-medium text-foreground">$2,500.00</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">YTD Distance</p>
                        <p className="text-sm font-medium text-foreground">25,000 mi</p>
                      </div>
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground mb-0.5">PTD Distance</p>
                        <p className="text-sm font-medium text-foreground">2,500 mi</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Allocation Card */}
                <div className="border rounded-sm bg-card">
                  <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">Allocation</h3>
                    <button className="text-slate-500 hover:text-foreground transition-colors">
                      <MdEdit className="size-4" />
                    </button>
                  </div>
                  <div className="divide-y divide-border">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Allocation code</p>
                      <p className="text-sm font-medium text-foreground">ALLOC-001</p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Description</p>
                      <p className="text-sm font-medium text-foreground">Standard Allocation</p>
                    </div>
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground mb-0.5">Effective date</p>
                      <p className="text-sm font-medium text-foreground">2024-01-01</p>
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
                  <FaComments className="size-4" />
                  Comments
                </h3>
                <Button
                  size="sm"
                  className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
                >
                  <FaPlus className="size-3" />
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
                                <FaUser className="size-3 text-primary" />
                              </div>
                              <div>
                                <p className="font-semibold text-xs text-foreground">
                                  {comment.enteredBy}
                                </p>
                                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                  <FaClock className="size-2" />
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
                              <FaPaperclip className="size-2.5 text-muted-foreground" />
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
        </div>
      </Tabs>
    </div>
  );
};

export default PayeeDetails;
