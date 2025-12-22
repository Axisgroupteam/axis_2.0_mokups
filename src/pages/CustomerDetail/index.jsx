import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PencilIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  Building2Icon,
  LogInIcon,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const CustomerDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [chartPeriod, setChartPeriod] = useState("3months");

  // Mock data - in real app, fetch based on id
  const customer = {
    id: id,
    name: "Titan",
    status: "Active",
    created: "January 15, 2023",
    lastUpdated: "December 10, 2025",
    totalOrders: "3,547",
    ordersChange: "+15.3%",
    ordersUp: true,
    activeUsers: "12",
    usersChange: "+2",
    usersUp: true,
  };

  // Chart data for different periods
  const chartData = {
    "7days": [
      { date: "Dec 12", orders: 85, revenue: 12500 },
      { date: "Dec 13", orders: 92, revenue: 13800 },
      { date: "Dec 14", orders: 78, revenue: 11200 },
      { date: "Dec 15", orders: 105, revenue: 15600 },
      { date: "Dec 16", orders: 98, revenue: 14200 },
      { date: "Dec 17", orders: 112, revenue: 16800 },
      { date: "Dec 18", orders: 125, revenue: 18500 },
    ],
    "30days": [
      { date: "Nov 20", orders: 320, revenue: 48000 },
      { date: "Nov 24", orders: 385, revenue: 57750 },
      { date: "Nov 28", orders: 352, revenue: 52800 },
      { date: "Dec 2", orders: 428, revenue: 64200 },
      { date: "Dec 6", orders: 395, revenue: 59250 },
      { date: "Dec 10", orders: 462, revenue: 69300 },
      { date: "Dec 14", orders: 438, revenue: 65700 },
      { date: "Dec 18", orders: 510, revenue: 76500 },
    ],
    "3months": [
      { date: "Oct 1", orders: 680, revenue: 102000 },
      { date: "Oct 15", orders: 820, revenue: 123000 },
      { date: "Nov 1", orders: 950, revenue: 142500 },
      { date: "Nov 15", orders: 1100, revenue: 165000 },
      { date: "Dec 1", orders: 980, revenue: 147000 },
      { date: "Dec 8", orders: 1250, revenue: 187500 },
      { date: "Dec 15", orders: 1420, revenue: 213000 },
      { date: "Dec 18", orders: 1580, revenue: 237000 },
    ],
  };

  const chartConfig = {
    orders: {
      label: "Orders",
      color: "hsl(200, 90%, 45%)",
    },
  };

  const periodLabels = {
    "7days": "Last 7 days",
    "30days": "Last 30 days",
    "3months": "Last 3 months",
  };

  return (
    <div className="h-full overflow-auto bg-background">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Building2Icon className="size-6" />
            <h1 className="text-2xl font-bold tracking-tight">
              {customer.name}
            </h1>
            <Badge
              className={
                customer.status === "Active"
                  ? "bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50"
                  : "bg-rose-500/10 hover:bg-rose-500/30 text-rose-700 dark:text-rose-400 border border-rose-500/50"
              }
            >
              {customer.status}
            </Badge>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size={"sm"}>
              <PencilIcon className="size-4 mr-1" />
              Edit
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => {
                navigate("/app/customer-portal/metrics");
              }}
              size={"sm"}
            >
              <LogInIcon className="size-4 mr-1" />
              Access Customer
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Total Orders Card */}
          <Card className="py-4 gap-2 rounded-sm bg-gradient-to-br from-blue-50 via-blue-50/50 to-white dark:from-blue-500/20 dark:via-blue-500/10 dark:to-transparent border-blue-200/60 dark:border-blue-500/30 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="px-4 py-0">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm text-blue-700 dark:text-blue-400 font-medium">
                  Total Orders
                </CardDescription>
                <Badge className="text-xs bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/30 border-0 dark:border dark:border-blue-500/50">
                  <TrendingUpIcon className="size-3 mr-1" />
                  {customer.ordersChange}
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-blue-950 dark:text-blue-300">
                {customer.totalOrders}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-0 px-4 py-0">
              <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Trending up this month{" "}
                <TrendingUpIcon className="size-3 inline ml-1" />
              </div>
              <div className="text-xs text-blue-500 dark:text-blue-500/70">
                Orders for the last 6 months
              </div>
            </CardFooter>
          </Card>

          {/* Active Users Card */}
          <Card className="py-4 gap-2 rounded-sm bg-gradient-to-br from-violet-50 via-violet-50/50 to-white dark:from-violet-500/20 dark:via-violet-500/10 dark:to-transparent border-violet-200/60 dark:border-violet-500/30 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="px-4 py-0">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm text-violet-700 dark:text-violet-400 font-medium">
                  Active Users
                </CardDescription>
                <Badge className="text-xs bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-500/30 border-0 dark:border dark:border-violet-500/50">
                  <TrendingUpIcon className="size-3 mr-1" />
                  {customer.usersChange}
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-violet-950 dark:text-violet-300">
                {customer.activeUsers}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-0 px-4 py-0">
              <div className="text-sm font-medium text-violet-600 dark:text-violet-400">
                New users this month{" "}
                <TrendingUpIcon className="size-3 inline ml-1" />
              </div>
              <div className="text-xs text-violet-500 dark:text-violet-500/70">
                Users for the last 6 months
              </div>
            </CardFooter>
          </Card>

          {/* On-Time Pickup Card */}
          <Card className="py-4 gap-2 rounded-sm bg-gradient-to-br from-teal-50 via-teal-50/50 to-white dark:from-teal-500/20 dark:via-teal-500/10 dark:to-transparent border-teal-200/60 dark:border-teal-500/30 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="px-4 py-0">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm text-teal-700 dark:text-teal-400 font-medium">
                  On-Time Pickup
                </CardDescription>
                <Badge className="text-xs bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-500/30 border-0 dark:border dark:border-teal-500/50">
                  <TrendingUpIcon className="size-3 mr-1" />
                  +2.8%
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-teal-950 dark:text-teal-300">
                96.2%
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-0 px-4 py-0">
              <div className="text-sm font-medium text-teal-600 dark:text-teal-400">
                Trending up this month{" "}
                <TrendingUpIcon className="size-3 inline ml-1" />
              </div>
              <div className="text-xs text-teal-500 dark:text-teal-500/70">
                Pickup rate for the last 6 months
              </div>
            </CardFooter>
          </Card>

          {/* Avg Order Value Card */}
          <Card className="py-4 gap-2 rounded-sm bg-gradient-to-br from-amber-50 via-amber-50/50 to-white dark:from-amber-500/20 dark:via-amber-500/10 dark:to-transparent border-amber-200/60 dark:border-amber-500/30 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="px-4 py-0">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                  Avg Order Value
                </CardDescription>
                <Badge className="text-xs bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-500/30 border-0 dark:border dark:border-amber-500/50">
                  <TrendingUpIcon className="size-3 mr-1" />
                  +8.5%
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-amber-950 dark:text-amber-300">
                $1,450
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-0 px-4 py-0">
              <div className="text-sm font-medium text-amber-600 dark:text-amber-400">
                Up from last month{" "}
                <TrendingUpIcon className="size-3 inline ml-1" />
              </div>
              <div className="text-xs text-amber-500 dark:text-amber-500/70">
                Avg value for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Chart Section */}
        <Card className="rounded-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">
                  Total Orders
                </CardTitle>
                <CardDescription>
                  Total for the {periodLabels[chartPeriod].toLowerCase()}
                </CardDescription>
              </div>
              <div className="flex border rounded-md">
                <button
                  onClick={() => setChartPeriod("3months")}
                  className={`px-3 py-1.5 text-sm ${
                    chartPeriod === "3months"
                      ? "bg-muted font-medium"
                      : "hover:bg-muted/50"
                  }`}
                >
                  Last 3 months
                </button>
                <button
                  onClick={() => setChartPeriod("30days")}
                  className={`px-3 py-1.5 text-sm border-l ${
                    chartPeriod === "30days"
                      ? "bg-muted font-medium"
                      : "hover:bg-muted/50"
                  }`}
                >
                  Last 30 days
                </button>
                <button
                  onClick={() => setChartPeriod("7days")}
                  className={`px-3 py-1.5 text-sm border-l ${
                    chartPeriod === "7days"
                      ? "bg-muted font-medium"
                      : "hover:bg-muted/50"
                  }`}
                >
                  Last 7 days
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[450px] w-full">
              <AreaChart
                data={chartData[chartPeriod]}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="fillOrders"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="hsl(200, 90%, 45%)"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(200, 90%, 45%)"
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  fontSize={12}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  fontSize={12}
                  stroke="hsl(var(--muted-foreground))"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  type="natural"
                  dataKey="orders"
                  stroke="hsl(200, 90%, 45%)"
                  strokeWidth={2}
                  fill="url(#fillOrders)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDetail;
