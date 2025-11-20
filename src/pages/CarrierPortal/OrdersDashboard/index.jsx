import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FilterIcon,
  DownloadIcon,
  PlusIcon,
  TruckIcon,
  RouteIcon,
  ClockIcon,
  CheckCircleIcon,
  PackageIcon,
  MapPinIcon,
  UserIcon,
  FileTextIcon,
  WrenchIcon,
  ActivityIcon,
} from "lucide-react";

const OrdersDashboard = () => {
  const stats = [
    {
      id: 1,
      icon: TruckIcon,
      label: "Active Shipments",
      value: "247",
      change: "+12%",
      bgColor: "bg-blue-500",
    },
    {
      id: 2,
      icon: RouteIcon,
      label: "Routes Today",
      value: "89",
      change: "+6%",
      bgColor: "bg-purple-500",
    },
    {
      id: 3,
      icon: ClockIcon,
      label: "Pending Deliveries",
      value: "23",
      change: "-3%",
      bgColor: "bg-teal-500",
    },
    {
      id: 4,
      icon: CheckCircleIcon,
      label: "Completed This Month",
      value: "1,847",
      change: "+15%",
      bgColor: "bg-orange-500",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      icon: PackageIcon,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "New shipment created",
      description: "Shipment #SH-2847 from Houston to Dallas",
      time: "2 minutes ago",
    },
    {
      id: 2,
      icon: CheckCircleIcon,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Delivery completed",
      description: "Shipment #SH-2832 delivered successfully",
      time: "15 minutes ago",
    },
    {
      id: 3,
      icon: UserIcon,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: "Driver assigned",
      description: "John Smith assigned to route RT-847",
      time: "1 hour ago",
    },
    {
      id: 4,
      icon: ClockIcon,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      title: "Delay reported",
      description: "Route RT-839 delayed by 30 minutes",
      time: "2 hours ago",
    },
  ];

  const quickActions = [
    {
      icon: PackageIcon,
      label: "Create New Shipment",
      iconColor: "text-blue-600",
    },
    { icon: MapPinIcon, label: "Plan New Route", iconColor: "text-purple-600" },
    { icon: UserIcon, label: "Assign Driver", iconColor: "text-teal-600" },
    {
      icon: FileTextIcon,
      label: "Generate Report",
      iconColor: "text-orange-600",
    },
    {
      icon: WrenchIcon,
      label: "Schedule Maintenance",
      iconColor: "text-blue-600",
    },
    { icon: ActivityIcon, label: "System Status", iconColor: "text-green-600" },
  ];

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Orders Dashboard
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FilterIcon className="size-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <DownloadIcon className="size-4 mr-2" />
              Export
            </Button>
            <Button className="bg-primary hover:bg-primary/90" size="sm">
              <PlusIcon className="size-4 mr-2" />
              New Entry
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={stat.id}
                className={`${stat.bgColor} border-0 text-white shadow-md py-1`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <IconComponent className="size-6" />
                    <Badge className="bg-white/20 hover:bg-white/30 text-white border-0">
                      {stat.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm opacity-90">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardContent className="px-6 py-2">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <Button variant="link" size="sm" className="text-blue-600">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 pb-4 border-b last:border-b-0"
                    >
                      <div
                        className={`${activity.iconBg} ${activity.iconColor} p-2 rounded-lg`}
                      >
                        <IconComponent className="size-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">
                          {activity.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent className="px-6 py-2">
              <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
              <div className="space-y-2">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                    >
                      <IconComponent className={`size-5 ${action.iconColor}`} />
                      <span className="text-sm font-medium">
                        {action.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrdersDashboard;
