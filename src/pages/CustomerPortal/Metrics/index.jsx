import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ActivityIcon,
  CheckCircleIcon,
  ClockIcon,
  Clock4Icon,
  XCircleIcon,
  FileTextIcon,
  AlertCircleIcon,
  PackageIcon,
  BarChart3Icon,
} from "lucide-react";

// Color variants for MetricCard - matching fe design exactly
const colorVariants = {
  cyan: {
    gradient:
      "from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 ",
    hoverGradient:
      "hover:from-cyan-100 hover:to-blue-100 dark:hover:from-cyan-900/40 dark:hover:to-blue-900/40",
    border: "border-cyan-200 dark:border-cyan-800/50",
    iconBg: "bg-cyan-100 dark:bg-cyan-900/30",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    textColor: "text-cyan-700 dark:text-cyan-300",
    countColor: "text-cyan-900 dark:text-cyan-100",
  },
  emerald: {
    gradient:
      "from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30",
    hoverGradient:
      "hover:from-emerald-100 hover:to-green-100 dark:hover:from-emerald-900/40 dark:hover:to-green-900/40",
    border: "border-emerald-200 dark:border-emerald-800/50",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    textColor: "text-emerald-700 dark:text-emerald-300",
    countColor: "text-emerald-900 dark:text-emerald-100",
  },
  yellow: {
    gradient:
      "from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30",
    hoverGradient:
      "hover:from-yellow-100 hover:to-orange-100 dark:hover:from-yellow-900/40 dark:hover:to-orange-900/40",
    border: "border-yellow-200 dark:border-yellow-800/50",
    iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    textColor: "text-yellow-700 dark:text-yellow-300",
    countColor: "text-yellow-900 dark:text-yellow-100",
  },
  red: {
    gradient: "from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30",
    hoverGradient:
      "hover:from-red-100 hover:to-rose-100 dark:hover:from-red-900/40 dark:hover:to-rose-900/40",
    border: "border-red-200 dark:border-red-800/50",
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-600 dark:text-red-400",
    textColor: "text-red-700 dark:text-red-300",
    countColor: "text-red-900 dark:text-red-100",
  },
};

// MetricCard component - matching fe design exactly
const MetricCard = ({ label, count, icon: Icon, colorScheme }) => {
  const colors = colorVariants[colorScheme];

  return (
    <div
      className={`relative flex cursor-pointer flex-col px-2 sm:px-3 py-2 sm:py-3 bg-gradient-to-br ${colors.gradient} ${colors.hoverGradient} rounded-lg border ${colors.border} transition-all text-left`}
    >
      <div className="flex items-center mb-1 sm:mb-2">
        <div className={`p-1 ${colors.iconBg} rounded-md mr-2`}>
          <Icon className={`h-3 w-3 ${colors.iconColor}`} />
        </div>
        <span
          className={`text-xs sm:text-sm font-semibold ${colors.textColor}`}
        >
          {label}
        </span>
      </div>
      <div
        className={`text-xl sm:text-2xl lg:text-3xl font-bold ${colors.countColor} mb-1`}
      >
        {count < 10 ? `0${count}` : count}
      </div>
    </div>
  );
};

// PageHeader component - matching fe design
const PageHeader = ({ title, description, icon: Icon }) => {
  return (
    <div className="mb-2">
      <div className="flex items-center gap-2">
        {Icon && (
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        )}
        <h1 className="text-xl sm:text-2xl font-bold text-primary">
          {title}
        </h1>
      </div>
      {description && (
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          {description}
        </p>
      )}
    </div>
  );
};

// Mock data for Active Loads based on time period
const activeLoadsData = {
  last1day: { aheadOfTime: 3, onTime: 5, slightDelay: 2, late: 1 },
  last7days: { aheadOfTime: 12, onTime: 28, slightDelay: 8, late: 4 },
  dateRange: { aheadOfTime: 45, onTime: 112, slightDelay: 23, late: 15 },
};

// Mock data for Delivered Loads based on time period
const deliveredLoadsData = {
  last1day: { withPOD: 8, withoutPOD: 2, viewAll: 10 },
  last7days: { withPOD: 42, withoutPOD: 11, viewAll: 53 },
  dateRange: { withPOD: 156, withoutPOD: 38, viewAll: 194 },
};

// Active Loads Card - matching fe design exactly
const ActiveLoadsCard = () => {
  const [selectedFilter, setSelectedFilter] = useState("last7days");
  const data = activeLoadsData[selectedFilter];

  return (
    <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border">
      {/* Header with title and filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div className="flex items-center">
          <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
            <ActivityIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="lg:text-xl sm:text-lg font-bold text-foreground tracking-wide">
            Active
          </h3>
        </div>

        {/* Date Selection Option */}
        <div className="flex-shrink-0 w-full sm:w-48">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-800/50 focus:border-blue-400 dark:focus:border-blue-600 text-blue-900 dark:text-blue-100 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/40 dark:hover:to-purple-900/40 transition-all">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last1day">Last 1 Day</SelectItem>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="dateRange">Custom Date Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Action Cards Grid - 4 Individual Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <MetricCard
          label="Ahead of Time"
          count={data.aheadOfTime}
          icon={CheckCircleIcon}
          colorScheme="cyan"
        />

        <MetricCard
          label="On Time"
          count={data.onTime}
          icon={ClockIcon}
          colorScheme="emerald"
        />

        <MetricCard
          label="Slight Delay"
          count={data.slightDelay}
          icon={Clock4Icon}
          colorScheme="yellow"
        />

        <MetricCard
          label="Late"
          count={data.late}
          icon={XCircleIcon}
          colorScheme="red"
        />
      </div>
    </div>
  );
};

// Delivered Loads Card - matching fe design exactly
const DeliveredLoadsCard = () => {
  const [selectedFilter, setSelectedFilter] = useState("last7days");
  const data = deliveredLoadsData[selectedFilter];

  return (
    <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border">
      {/* Header with title and filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div className="flex items-center">
          <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
            <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="lg:text-xl sm:text-lg font-bold text-foreground tracking-wide">
            Delivered
          </h3>
        </div>

        {/* Date Selection Option */}
        <div className="flex-shrink-0 w-full sm:w-48">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-full bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800/50 focus:border-green-400 dark:focus:border-green-600 text-green-900 dark:text-green-100 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/40 dark:hover:to-emerald-900/40 transition-all">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last1day">Last 1 Day</SelectItem>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="dateRange">Custom Date Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Action Cards Grid - Individual Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <MetricCard
          label="With POD"
          count={data.withPOD}
          icon={FileTextIcon}
          colorScheme="cyan"
        />

        <MetricCard
          label="Without POD"
          count={data.withoutPOD}
          icon={AlertCircleIcon}
          colorScheme="yellow"
        />

        {/* View All Card - Full Width Second Row */}
        <div className="sm:col-span-2">
          <MetricCard
            label="View All"
            count={data.viewAll}
            icon={PackageIcon}
            colorScheme="emerald"
          />
        </div>
      </div>
    </div>
  );
};

// Skeleton Static Card - matching fe design
const MetricSkeletonStaticCard = () => {
  return (
    <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border">
      {/* Header with title and filter skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div>
          <div className="h-4 sm:h-5 bg-muted rounded w-20 sm:w-24"></div>
        </div>

        <div className="flex-shrink-0 w-full sm:w-48">
          <div className="h-9 sm:h-10 bg-muted rounded border border-border"></div>
        </div>
      </div>

      {/* Action Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* First Card Skeleton */}
        <div className="flex flex-col px-3 sm:px-4 py-3 sm:py-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="h-3 sm:h-4 bg-muted rounded w-16 sm:w-20 "></div>
          </div>
          <div className="h-8 sm:h-10 lg:h-12 bg-muted rounded w-8 sm:w-10 lg:w-12 "></div>
        </div>

        {/* Second Card Skeleton */}
        <div className="flex flex-col px-3 sm:px-4 py-3 sm:py-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="h-3 sm:h-4 bg-muted rounded w-12 sm:w-16 "></div>
          </div>
          <div className="h-8 sm:h-10 lg:h-12 bg-muted rounded w-8 sm:w-10 lg:w-12 "></div>
        </div>

        {/* Third Card Skeleton */}
        <div className="flex flex-col px-3 sm:px-4 py-3 sm:py-4 bg-muted/50 rounded-lg border border-border sm:col-span-2 lg:col-span-1">
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="h-3 sm:h-4 bg-muted rounded w-14 sm:w-18 "></div>
          </div>
          <div className="h-8 sm:h-10 lg:h-12 bg-muted rounded w-8 sm:w-10 lg:w-12 "></div>
        </div>
      </div>
    </div>
  );
};

// Carrier Card - matching fe design
const Carrier = () => {
  return (
    <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border">
      {/* Header with title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div className="h-4 sm:h-5 rounded">Carrier</div>
      </div>

      {/* Action Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* First Card Skeleton */}
        <div className="flex flex-col px-3 sm:px-4 py-3 sm:py-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="h-3 sm:h-4 bg-muted rounded w-16 sm:w-20 "></div>
          </div>
          <div className="h-8 sm:h-10 lg:h-12 bg-muted rounded w-8 sm:w-10 lg:w-12 "></div>
        </div>

        {/* Second Card Skeleton */}
        <div className="flex flex-col px-3 sm:px-4 py-3 sm:py-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="h-3 sm:h-4 bg-muted rounded w-12 sm:w-16 "></div>
          </div>
          <div className="h-8 sm:h-10 lg:h-12 bg-muted rounded w-8 sm:w-10 lg:w-12 "></div>
        </div>

        {/* Third Card Skeleton */}
        <div className="flex flex-col px-3 sm:px-4 py-3 sm:py-4 bg-muted/50 rounded-lg border border-border sm:col-span-2 lg:col-span-1">
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="h-3 sm:h-4 bg-muted rounded w-14 sm:w-18 "></div>
          </div>
          <div className="h-8 sm:h-10 lg:h-12 bg-muted rounded w-8 sm:w-10 lg:w-12 "></div>
        </div>
      </div>
    </div>
  );
};

// Carrier By Lane Card - matching fe design
const CarrierByLane = () => {
  return (
    <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border">
      {/* Header with title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div className="h-4 sm:h-5 rounded">Carrier By Lane</div>
      </div>

      {/* Action Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* First Card Skeleton */}
        <div className="flex flex-col px-3 sm:px-4 py-3 sm:py-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="h-3 sm:h-4 bg-muted rounded w-16 sm:w-20 "></div>
          </div>
          <div className="h-8 sm:h-10 lg:h-12 bg-muted rounded w-8 sm:w-10 lg:w-12 "></div>
        </div>

        {/* Second Card Skeleton */}
        <div className="flex flex-col px-3 sm:px-4 py-3 sm:py-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="h-3 sm:h-4 bg-muted rounded w-12 sm:w-16 "></div>
          </div>
          <div className="h-8 sm:h-10 lg:h-12 bg-muted rounded w-8 sm:w-10 lg:w-12 "></div>
        </div>

        {/* Third Card Skeleton */}
        <div className="flex flex-col px-3 sm:px-4 py-3 sm:py-4 bg-muted/50 rounded-lg border border-border sm:col-span-2 lg:col-span-1">
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="h-3 sm:h-4 bg-muted rounded w-14 sm:w-18 "></div>
          </div>
          <div className="h-8 sm:h-10 lg:h-12 bg-muted rounded w-8 sm:w-10 lg:w-12 "></div>
        </div>
      </div>
    </div>
  );
};

// Main CustomerMetrics component - matching fe CustomerDashboardContent exactly
const CustomerMetrics = () => {
  return (
    <div className="bg-white dark:bg-background px-4 sm:px-6 py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <PageHeader title="Metrics" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-4">
        {/* Active Loads - Interactive Card */}
        <ActiveLoadsCard />

        {/* Delivered Loads - Interactive Card */}
        <DeliveredLoadsCard />

        {/* Static Card */}
        <MetricSkeletonStaticCard />
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mt-5">
        <PageHeader title="KPI" description="On time delivery" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <Carrier />
        <CarrierByLane />
        <MetricSkeletonStaticCard />
        <MetricSkeletonStaticCard />
      </div>
    </div>
  );
};

export default CustomerMetrics;
