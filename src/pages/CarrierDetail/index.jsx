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
  LogInIcon,
  TrendingUpIcon,
  TrendingDownIcon,
} from "lucide-react";
import { FaTruck } from "react-icons/fa";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const CarrierDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [chartPeriod, setChartPeriod] = useState("3months");

  // Mock data - in real app, fetch based on id
  const carrier = {
    id: id,
    name: "Mega Trucking",
    status: "Active",
    created: "October 27, 2023",
    lastUpdated: "November 12, 2025",
    totalShipments: "1,247",
    shipmentsChange: "+12.5%",
    shipmentsUp: true,
    activeRoutes: "23",
    routesChange: "+8.2%",
    routesUp: true,
  };

  // Chart data for different periods
  const chartData = {
    "7days": [
      { date: "Nov 12", shipments: 45, routes: 18 },
      { date: "Nov 13", shipments: 52, routes: 20 },
      { date: "Nov 14", shipments: 48, routes: 19 },
      { date: "Nov 15", shipments: 61, routes: 22 },
      { date: "Nov 16", shipments: 55, routes: 21 },
      { date: "Nov 17", shipments: 67, routes: 23 },
      { date: "Nov 18", shipments: 72, routes: 24 },
    ],
    "30days": [
      { date: "Oct 20", shipments: 120, routes: 15 },
      { date: "Oct 24", shipments: 145, routes: 17 },
      { date: "Oct 28", shipments: 132, routes: 16 },
      { date: "Nov 1", shipments: 168, routes: 19 },
      { date: "Nov 5", shipments: 155, routes: 18 },
      { date: "Nov 9", shipments: 189, routes: 21 },
      { date: "Nov 13", shipments: 176, routes: 20 },
      { date: "Nov 17", shipments: 210, routes: 23 },
    ],
    "3months": [
      { date: "Sep 1", shipments: 280, routes: 12 },
      { date: "Sep 15", shipments: 320, routes: 14 },
      { date: "Oct 1", shipments: 350, routes: 16 },
      { date: "Oct 15", shipments: 410, routes: 18 },
      { date: "Nov 1", shipments: 380, routes: 17 },
      { date: "Nov 8", shipments: 450, routes: 20 },
      { date: "Nov 15", shipments: 520, routes: 22 },
      { date: "Nov 18", shipments: 580, routes: 23 },
    ],
  };

  const chartConfig = {
    shipments: {
      label: "Shipments",
      color: "hsl(45, 93%, 47%)",
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
            <FaTruck className="size-6" />
            <h1 className="text-2xl font-bold tracking-tight">
              {carrier.name}
            </h1>
            <Badge
              className={
                carrier.status === "Active"
                  ? "bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50"
                  : "bg-rose-500/10 hover:bg-rose-500/30 text-rose-700 dark:text-rose-400 border border-rose-500/50"
              }
            >
              {carrier.status}
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
                navigate("/app/carrier-portal/metrics");
              }}
              size={"sm"}
            >
              <LogInIcon className="size-4 mr-1" />
              Access Carrier
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Total Shipments Card */}
          <Card className="py-4 gap-2 rounded-sm bg-gradient-to-br from-amber-50 via-amber-50/50 to-white dark:from-amber-500/20 dark:via-amber-500/10 dark:to-transparent border-amber-200/60 dark:border-amber-500/30 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="px-4 py-0">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                  Total Shipments
                </CardDescription>
                <Badge className="text-xs bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-500/30 border-0 dark:border dark:border-amber-500/50">
                  <TrendingUpIcon className="size-3 mr-1" />
                  {carrier.shipmentsChange}
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-amber-950 dark:text-amber-300">
                {carrier.totalShipments}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-0 px-4 py-0">
              <div className="text-sm font-medium text-amber-600 dark:text-amber-400">
                Trending up this month{" "}
                <TrendingUpIcon className="size-3 inline ml-1" />
              </div>
              <div className="text-xs text-amber-500 dark:text-amber-500/70">
                Shipments for the last 6 months
              </div>
            </CardFooter>
          </Card>

          {/* Active Routes Card */}
          <Card className="py-4 gap-2 rounded-sm bg-gradient-to-br from-violet-50 via-violet-50/50 to-white dark:from-violet-500/20 dark:via-violet-500/10 dark:to-transparent border-violet-200/60 dark:border-violet-500/30 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="px-4 py-0">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm text-violet-700 dark:text-violet-400 font-medium">
                  Active Routes
                </CardDescription>
                <Badge className="text-xs bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-500/30 border-0 dark:border dark:border-violet-500/50">
                  <TrendingUpIcon className="size-3 mr-1" />
                  {carrier.routesChange}
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-violet-950 dark:text-violet-300">
                {carrier.activeRoutes}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-0 px-4 py-0">
              <div className="text-sm font-medium text-violet-600 dark:text-violet-400">
                Trending up this month{" "}
                <TrendingUpIcon className="size-3 inline ml-1" />
              </div>
              <div className="text-xs text-violet-500 dark:text-violet-500/70">
                Routes for the last 6 months
              </div>
            </CardFooter>
          </Card>

          {/* On-Time Delivery Card */}
          <Card className="py-4 gap-2 rounded-sm bg-gradient-to-br from-teal-50 via-teal-50/50 to-white dark:from-teal-500/20 dark:via-teal-500/10 dark:to-transparent border-teal-200/60 dark:border-teal-500/30 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="px-4 py-0">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm text-teal-700 dark:text-teal-400 font-medium">
                  On-Time Delivery
                </CardDescription>
                <Badge className="text-xs bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-500/30 border-0 dark:border dark:border-teal-500/50">
                  <TrendingUpIcon className="size-3 mr-1" />
                  +3.2%
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-teal-950 dark:text-teal-300">
                94.5%
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-0 px-4 py-0">
              <div className="text-sm font-medium text-teal-600 dark:text-teal-400">
                Trending up this month{" "}
                <TrendingUpIcon className="size-3 inline ml-1" />
              </div>
              <div className="text-xs text-teal-500 dark:text-teal-500/70">
                Delivery rate for the last 6 months
              </div>
            </CardFooter>
          </Card>

          {/* Avg Load Time Card */}
          <Card className="py-4 gap-2 rounded-sm bg-gradient-to-br from-rose-50 via-rose-50/50 to-white dark:from-rose-500/20 dark:via-rose-500/10 dark:to-transparent border-rose-200/60 dark:border-rose-500/30 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="px-4 py-0">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm text-rose-700 dark:text-rose-400 font-medium">
                  Avg Load Time
                </CardDescription>
                <Badge className="text-xs bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/30 border-0 dark:border dark:border-rose-500/50">
                  <TrendingDownIcon className="size-3 mr-1" />
                  -5.1%
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-rose-950 dark:text-rose-300">
                2.3 hrs
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-0 px-4 py-0">
              <div className="text-sm font-medium text-rose-600 dark:text-rose-400">
                Down from last month{" "}
                <TrendingDownIcon className="size-3 inline ml-1" />
              </div>
              <div className="text-xs text-rose-500 dark:text-rose-500/70">
                Load time for the last 6 months
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
                  Total Shipments
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
                    id="fillShipments"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="hsl(45, 93%, 47%)"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(45, 93%, 47%)"
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
                  dataKey="shipments"
                  stroke="hsl(45, 93%, 47%)"
                  strokeWidth={2}
                  fill="url(#fillShipments)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CarrierDetail;
