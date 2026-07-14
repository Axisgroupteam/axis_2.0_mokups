import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SmartFilter from "@/components/SmartFilter";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  MoreHorizontalIcon,
  EyeIcon,
  RefreshCw,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const IndexManagement = () => {
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [selectedError, setSelectedError] = useState(null);

  // Helper function to check if data is stale (>14 days old)
  const isStaleData = (dateString) => {
    const fetchDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - fetchDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 14;
  };

  // Helper function to get days since last fetch
  const getDaysSince = (dateString) => {
    const fetchDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - fetchDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Helper functions
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    }).format(value);
  };

  const getNextFetchDate = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + daysUntilMonday);
    nextMonday.setHours(10, 0, 0, 0);

    return nextMonday.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Mock data for current index cards
  const currentIndexData = [
    {
      source: "DOE National",
      sourceKey: "DOE_NATIONAL",
      price: 3.45, // Using last successful value from Feb 24
      lastFetched: "2026-02-24 10:15 AM", // Last successful before 3 failures
      lastFetchedDisplay: "Feb 24, 2026 10:15 AM",
      nextFetch: getNextFetchDate(),
      change: -0.01,
      changePercent: "-0.3%",
      status: "Failed", // Has 3 consecutive failures
      colorTheme: "amber",
    },
    {
      source: "DOE Gulf Coast",
      sourceKey: "DOE_GULF_COAST",
      price: 3.48,
      lastFetched: "2026-03-24 10:15 AM",
      lastFetchedDisplay: "Mar 24, 2026 10:15 AM",
      nextFetch: getNextFetchDate(),
      change: +0.05,
      changePercent: "+1.5%",
      status: "Current",
      colorTheme: "violet",
    },
    {
      source: "DOE East Coast",
      sourceKey: "DOE_EAST_COAST",
      price: 3.61,
      lastFetched: "2026-02-10 10:15 AM", // Stale data (>14 days old)
      lastFetchedDisplay: "Feb 10, 2026 10:15 AM",
      nextFetch: getNextFetchDate(),
      change: +0.08,
      changePercent: "+2.3%",
      status: "Stale",
      colorTheme: "teal",
    },
    {
      source: "OPIS",
      sourceKey: "OPIS",
      price: 3.55,
      lastFetched: "2026-03-24 11:30 AM",
      lastFetchedDisplay: "Mar 24, 2026 11:30 AM",
      nextFetch: "Monday, Mar 31 11:00 AM",
      change: +0.06,
      changePercent: "+1.7%",
      status: "Current",
      colorTheme: "rose",
    },
  ].map(index => ({
    ...index,
    status: isStaleData(index.lastFetched) ? "Stale" : index.status,
    daysSince: getDaysSince(index.lastFetched),
  }));

  // Mock data for historical table (20 records showing all status types)
  const historicalIndexData = [
    // Latest - DOE_NATIONAL has 3 consecutive failures
    {
      id: "1",
      indexSource: "DOE_NATIONAL",
      effectiveDate: "2026-03-24",
      pricePerGallon: 3.45,
      fetchedAt: "2026-03-24 10:15 AM",
      status: "Failed",
      sourceUrl: "https://api.eia.gov/petroleum/gasdiesel/",
      change: -0.01,
    },
    {
      id: "2",
      indexSource: "DOE_GULF_COAST",
      effectiveDate: "2026-03-24",
      pricePerGallon: 3.48,
      fetchedAt: "2026-03-24 10:15 AM",
      status: "Success",
      sourceUrl: "https://api.eia.gov/petroleum/gasdiesel/",
      change: +0.05,
    },
    {
      id: "3",
      indexSource: "OPIS",
      effectiveDate: "2026-03-24",
      pricePerGallon: 3.55,
      fetchedAt: "2026-03-24 11:30 AM",
      status: "Success",
      sourceUrl: "https://opis.com/api/v1/diesel",
      change: +0.06,
    },
    // Previous week - DOE_NATIONAL Failed again
    {
      id: "4",
      indexSource: "DOE_NATIONAL",
      effectiveDate: "2026-03-17",
      pricePerGallon: 3.45,
      fetchedAt: "2026-03-17 10:12 AM",
      status: "Failed",
      sourceUrl: "https://api.eia.gov/petroleum/gasdiesel/",
      change: 0.0,
    },
    {
      id: "5",
      indexSource: "DOE_GULF_COAST",
      effectiveDate: "2026-03-17",
      pricePerGallon: 3.43,
      fetchedAt: "2026-03-17 10:12 AM",
      status: "Success",
      sourceUrl: "https://api.eia.gov/petroleum/gasdiesel/",
      change: +0.02,
    },
    {
      id: "6",
      indexSource: "OPIS",
      effectiveDate: "2026-03-17",
      pricePerGallon: 3.49,
      fetchedAt: "2026-03-17 11:25 AM",
      status: "Success",
      sourceUrl: "https://opis.com/api/v1/diesel",
      change: +0.03,
    },
    // 2 weeks ago - DOE_NATIONAL 3rd consecutive failure
    {
      id: "7",
      indexSource: "DOE_NATIONAL",
      effectiveDate: "2026-03-10",
      pricePerGallon: 3.46,
      fetchedAt: "2026-03-10 10:18 AM",
      status: "Failed",
      sourceUrl: "https://api.eia.gov/petroleum/gasdiesel/",
      change: 0.0,
    },
    {
      id: "8",
      indexSource: "DOE_GULF_COAST",
      effectiveDate: "2026-03-10",
      pricePerGallon: 3.41,
      fetchedAt: "2026-03-10 10:18 AM",
      status: "Success",
      sourceUrl: "https://api.eia.gov/petroleum/gasdiesel/",
      change: -0.04,
    },
    // Retry entries (3PM retry same day)
    {
      id: "9",
      indexSource: "DOE_NATIONAL",
      effectiveDate: "2026-03-03",
      pricePerGallon: 3.47,
      fetchedAt: "2026-03-03 15:05 PM",
      status: "Retry",
      sourceUrl: "https://api.eia.gov/petroleum/gasdiesel/",
      change: +0.02,
    },
    {
      id: "10",
      indexSource: "DOE_GULF_COAST",
      effectiveDate: "2026-03-03",
      pricePerGallon: 3.45,
      fetchedAt: "2026-03-03 15:05 PM",
      status: "Retry",
      sourceUrl: "https://api.eia.gov/petroleum/gasdiesel/",
      change: +0.01,
    },
    {
      id: "11",
      indexSource: "OPIS",
      effectiveDate: "2026-03-03",
      pricePerGallon: 3.48,
      fetchedAt: "2026-03-03 15:30 PM",
      status: "Retry",
      sourceUrl: "https://opis.com/api/v1/diesel",
      change: +0.02,
    },
    // Stale data (>14 days old) - Still Success status but old
    {
      id: "12",
      indexSource: "DOE_EAST_COAST",
      effectiveDate: "2026-02-10",
      pricePerGallon: 3.47,
      fetchedAt: "2026-02-10 10:05 AM",
      status: "Success",
      sourceUrl: "https://api.eia.gov/petroleum/gasdiesel/",
      change: -0.02,
    },
    // DOE_NATIONAL - Last successful fetch (before 3 failures)
    {
      id: "13",
      indexSource: "DOE_NATIONAL",
      effectiveDate: "2026-03-03",
      pricePerGallon: 3.47,
      fetchedAt: "2026-03-03 10:10 AM",
      status: "Success",
      sourceUrl: "https://api.eia.gov/petroleum/gasdiesel/",
      change: +0.02,
    },
    {
      id: "14",
      indexSource: "DOE_NATIONAL",
      effectiveDate: "2026-02-24",
      pricePerGallon: 3.45,
      fetchedAt: "2026-02-24 10:08 AM",
      status: "Success",
      sourceUrl: "https://api.eia.gov/petroleum/gasdiesel/",
      change: -0.02,
    },
    {
      id: "15",
      indexSource: "DOE_NATIONAL",
      effectiveDate: "2026-02-17",
      pricePerGallon: 3.47,
      fetchedAt: "2026-02-17 10:05 AM",
      status: "Success",
      sourceUrl: "https://api.eia.gov/petroleum/gasdiesel/",
      change: +0.02,
    },
    // Other failed entries
    {
      id: "16",
      indexSource: "DOE_GULF_COAST",
      effectiveDate: "2026-02-17",
      pricePerGallon: 3.44,
      fetchedAt: "2026-02-17 10:08 AM",
      status: "Failed",
      sourceUrl: "https://api.eia.gov/petroleum/gasdiesel/",
      change: 0.0,
    },
    {
      id: "17",
      indexSource: "OPIS",
      effectiveDate: "2026-02-10",
      pricePerGallon: 3.47,
      fetchedAt: "2026-02-10 11:15 AM",
      status: "Failed",
      sourceUrl: "https://opis.com/api/v1/diesel",
      change: -0.01,
    },
    // Older Success entries
    {
      id: "18",
      indexSource: "DOE_GULF_COAST",
      effectiveDate: "2026-02-03",
      pricePerGallon: 3.44,
      fetchedAt: "2026-02-03 10:10 AM",
      status: "Success",
      sourceUrl: "https://api.eia.gov/petroleum/gasdiesel/",
      change: +0.01,
    },
    {
      id: "19",
      indexSource: "OPIS",
      effectiveDate: "2026-01-27",
      pricePerGallon: 3.46,
      fetchedAt: "2026-01-27 11:20 AM",
      status: "Success",
      sourceUrl: "https://opis.com/api/v1/diesel",
      change: -0.01,
    },
    {
      id: "20",
      indexSource: "DOE_EAST_COAST",
      effectiveDate: "2026-01-20",
      pricePerGallon: 3.49,
      fetchedAt: "2026-01-20 10:15 AM",
      status: "Success",
      sourceUrl: "https://api.eia.gov/petroleum/gasdiesel/",
      change: +0.03,
    },
  ];

  // Helper to check if index source has 3 consecutive failures
  const getIndexSourcesNeedingRetry = () => {
    const indexSources = ["DOE_NATIONAL", "DOE_GULF_COAST", "DOE_EAST_COAST", "OPIS"];
    const needsRetry = {};

    indexSources.forEach(source => {
      // Get latest 3 records for this index source, sorted by date descending
      const records = historicalIndexData
        .filter(r => r.indexSource === source)
        .sort((a, b) => new Date(b.effectiveDate) - new Date(a.effectiveDate))
        .slice(0, 3);

      // Check if all 3 latest records are Failed
      if (records.length >= 3 && records.every(r => r.status === "Failed")) {
        // Store the latest (first) failed record ID for this source
        needsRetry[source] = records[0].id;
      }
    });

    return needsRetry;
  };

  const indexSourcesNeedingRetry = getIndexSourcesNeedingRetry();

  // Table columns
  const columns = [
    {
      id: "actions",
      header: "Action",
      size: 50,
      cell: ({ row }) => {
        const record = row.original;
        const showRetry = indexSourcesNeedingRetry[record.indexSource] === record.id;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem className="cursor-pointer">
                <EyeIcon className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              {showRetry && (
                <DropdownMenuItem className="cursor-pointer">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retry Fetch
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: "indexSource",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Index Source" />,
      cell: ({ row }) => {
        const source = row.getValue("indexSource");
        const displayNames = {
          DOE_NATIONAL: "DOE National",
          DOE_GULF_COAST: "DOE Gulf Coast",
          DOE_EAST_COAST: "DOE East Coast",
          OPIS: "OPIS",
        };
        return <span className="font-medium">{displayNames[source] || source}</span>;
      },
    },
    {
      accessorKey: "effectiveDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Effective Date" />,
      cell: ({ row }) => <span className="text-sm">{formatDate(row.getValue("effectiveDate"))}</span>,
    },
    {
      accessorKey: "pricePerGallon",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Price/Gal" />,
      cell: ({ row }) => (
        <span className="font-semibold">{formatCurrency(row.getValue("pricePerGallon"))}</span>
      ),
    },
    {
      accessorKey: "fetchedAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Fetched At" />,
      cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.getValue("fetchedAt")}</span>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge
            className={
              status === "Success"
                ? "bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50"
                : status === "Retry"
                ? "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50"
                : status === "Failed"
                ? "bg-rose-500/10 hover:bg-rose-500/30 text-rose-700 dark:text-rose-400 border border-rose-500/50"
                : "bg-amber-500/10 hover:bg-amber-500/30 text-amber-700 dark:text-amber-400 border border-amber-500/50"
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
      accessorKey: "change",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Change" />,
      cell: ({ row }) => {
        const change = row.getValue("change");
        if (change === 0) {
          return <span className="text-sm text-muted-foreground">—</span>;
        }
        return (
          <div className="flex items-center gap-1">
            {change > 0 ? (
              <TrendingUp className="h-3 w-3 text-green-600" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-600" />
            )}
            <span
              className={`text-sm font-medium ${
                change > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {change > 0 ? "+" : ""}${Math.abs(change).toFixed(2)}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "sourceUrl",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Source URL" />,
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground max-w-xs truncate block" title={row.getValue("sourceUrl")}>
          {row.getValue("sourceUrl")}
        </span>
      ),
    },
  ];

  // Filter configuration
  const filterConfig = [
    {
      columnId: "status",
      title: "Status",
      options: [
        { label: "Success", value: "Success" },
        { label: "Retry", value: "Retry" },
        { label: "Failed", value: "Failed" },
      ],
    },
  ];

  // Smart filter configuration
  const smartFilterGroups = [
    {
      name: "Basic Filters",
      filters: [
        {
          key: "indexSource",
          label: "Index Source",
          type: "select",
          options: [
            { label: "DOE National", value: "DOE_NATIONAL" },
            { label: "DOE Gulf Coast", value: "DOE_GULF_COAST" },
            { label: "DOE East Coast", value: "DOE_EAST_COAST" },
            { label: "OPIS", value: "OPIS" },
          ],
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          options: [
            { label: "Success", value: "Success" },
            { label: "Retry", value: "Retry" },
            { label: "Failed", value: "Failed" },
          ],
        },
      ],
    },
    {
      name: "Date Filters",
      filters: [
        {
          key: "effectiveDate",
          label: "Effective Date",
          type: "input",
          placeholder: "MM/DD/YYYY",
        },
      ],
    },
  ];

  // Get card theme classes
  const getCardTheme = (theme) => {
    const themes = {
      amber: {
        bg: "bg-gradient-to-br from-amber-50 via-amber-50/50 to-white dark:from-amber-500/20 dark:via-amber-500/10 dark:to-transparent border-amber-200/60 dark:border-amber-500/30",
        title: "text-amber-950 dark:text-amber-300",
        description: "text-amber-700 dark:text-amber-400",
        badge: "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-500/30 border-0 dark:border dark:border-amber-500/50",
        footer: "text-amber-600 dark:text-amber-400",
        footerSub: "text-amber-500 dark:text-amber-500/70",
      },
      violet: {
        bg: "bg-gradient-to-br from-violet-50 via-violet-50/50 to-white dark:from-violet-500/20 dark:via-violet-500/10 dark:to-transparent border-violet-200/60 dark:border-violet-500/30",
        title: "text-violet-950 dark:text-violet-300",
        description: "text-violet-700 dark:text-violet-400",
        badge: "bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-500/30 border-0 dark:border dark:border-violet-500/50",
        footer: "text-violet-600 dark:text-violet-400",
        footerSub: "text-violet-500 dark:text-violet-500/70",
      },
      teal: {
        bg: "bg-gradient-to-br from-teal-50 via-teal-50/50 to-white dark:from-teal-500/20 dark:via-teal-500/10 dark:to-transparent border-teal-200/60 dark:border-teal-500/30",
        title: "text-teal-950 dark:text-teal-300",
        description: "text-teal-700 dark:text-teal-400",
        badge: "bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-500/30 border-0 dark:border dark:border-teal-500/50",
        footer: "text-teal-600 dark:text-teal-400",
        footerSub: "text-teal-500 dark:text-teal-500/70",
      },
      rose: {
        bg: "bg-gradient-to-br from-rose-50 via-rose-50/50 to-white dark:from-rose-500/20 dark:via-rose-500/10 dark:to-transparent border-rose-200/60 dark:border-rose-500/30",
        title: "text-rose-950 dark:text-rose-300",
        description: "text-rose-700 dark:text-rose-400",
        badge: "bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/30 border-0 dark:border dark:border-rose-500/50",
        footer: "text-rose-600 dark:text-rose-400",
        footerSub: "text-rose-500 dark:text-rose-500/70",
      },
    };
    return themes[theme];
  };

  // Check which index sources have failed 3 times
  const hasFetchError = (sourceKey) => {
    return indexSourcesNeedingRetry.hasOwnProperty(sourceKey);
  };

  const handleErrorClick = (index, isStale) => {
    if (isStale) {
      setSelectedError({
        source: index.source,
        type: "stale",
        message: `Index data has not been updated for more than 14 days. System is using stale data for FSC calculations.`,
        lastSuccess: index.lastFetchedDisplay,
        daysSince: index.daysSince,
      });
    } else {
      setSelectedError({
        source: index.source,
        type: "failed",
        message: "Failed to fetch data after 3 consecutive attempts (Monday 10 AM, 3 PM, Tuesday). System is using the last available index value.",
        lastSuccess: "Mar 3, 2026 10:10 AM",
        attempts: [
          { date: "Mar 24, 2026 10:00 AM", status: "Failed", error: "API timeout - EIA server not responding" },
          { date: "Mar 17, 2026 10:00 AM", status: "Failed", error: "Connection refused - Network error" },
          { date: "Mar 10, 2026 10:00 AM", status: "Failed", error: "HTTP 503 - Service unavailable" },
        ],
      });
    }
    setErrorDialogOpen(true);
  };

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="p-4">

        {/* Index Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {currentIndexData.map((index, i) => {
            const theme = getCardTheme(index.colorTheme);
            const isStale = index.status === "Stale";
            const hasError = hasFetchError(index.sourceKey);
            return (
              <Card
                key={i}
                className={`py-4 gap-2 rounded-sm shadow-sm hover:shadow-md transition-shadow ${theme.bg}`}
              >
                <CardHeader className="px-4 py-0">
                  <div className="flex items-center justify-between mb-1">
                    <CardDescription className={`text-sm font-semibold ${theme.description}`}>
                      {index.source}
                    </CardDescription>
                    {(hasError || isStale) ? (
                      <Badge
                        onClick={() => handleErrorClick(index, isStale && !hasError)}
                        className="text-xs bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-500/30 border border-amber-500/50 cursor-pointer"
                      >
                        <AlertTriangle className="size-3 mr-1" />
                        Stale
                      </Badge>
                    ) : (
                      <Badge className={`text-xs ${theme.badge}`}>
                        {index.change > 0 ? (
                          <TrendingUp className="size-3 mr-1" />
                        ) : (
                          <TrendingDown className="size-3 mr-1" />
                        )}
                        {index.changePercent}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className={`text-xl font-semibold ${theme.title}`}>
                    ${index.price.toFixed(3)}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-0 px-4 py-0">
                  <div className={`text-xs font-medium flex items-center ${theme.footer}`}>
                    <CheckCircle2 className="size-3 mr-1.5" />
                    {index.lastFetchedDisplay}
                    {isStale && <span className="ml-1 text-amber-600">({index.daysSince} days ago)</span>}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Smart Filter and Table */}
        <div className="flex items-center justify-between mb-3">
          <SmartFilter filterGroups={smartFilterGroups} />
        </div>

        <DataTable
          columns={columns}
          data={historicalIndexData}
          searchKey=""
          filterConfig={filterConfig}
          showViewOptions={false}
          pageSize={25}
        />

        {/* Error Details Dialog */}
        <Dialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedError?.type === "stale" ? (
                  <>
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    Stale Data Warning - {selectedError?.source}
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-rose-600" />
                    Fetch Error - {selectedError?.source}
                  </>
                )}
              </DialogTitle>
              <DialogDescription>
                {selectedError?.message}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">Last Successful Fetch</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedError?.lastSuccess}
                  {selectedError?.daysSince && (
                    <span className="text-amber-600 ml-2">({selectedError.daysSince} days ago)</span>
                  )}
                </p>
              </div>
              {selectedError?.type === "failed" && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">Failed Attempts</h4>
                  <div className="space-y-2">
                    {selectedError?.attempts?.map((attempt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm border-l-2 border-rose-500 pl-3 py-1">
                        <div className="flex-1">
                          <p className="font-medium">{attempt.date}</p>
                          <p className="text-xs text-rose-600">{attempt.error}</p>
                        </div>
                        <Badge className="bg-rose-500/10 text-rose-700 border border-rose-500/50">
                          {attempt.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className={`flex items-start gap-2 p-3 rounded-md border ${
                selectedError?.type === "stale"
                  ? "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30"
                  : "bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30"
              }`}>
                {selectedError?.type === "stale" ? (
                  <>
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                    <p className="text-xs text-amber-700 dark:text-amber-400">
                      System is currently using stale index value for FSC calculations. Please check the fetch configuration or manually update the index.
                    </p>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-rose-600 mt-0.5" />
                    <p className="text-xs text-rose-700 dark:text-rose-400">
                      System is currently using the last available index value for FSC calculations. Operations team has been notified. Use "Retry Fetch" option in the table to manually retry.
                    </p>
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default IndexManagement;
