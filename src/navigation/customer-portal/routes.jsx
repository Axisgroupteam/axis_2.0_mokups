import CustomerMetrics from "@/pages/CustomerPortal/Metrics";
import CustomerMembers from "@/pages/CustomerPortal/Members";
import CustomerLoads from "@/pages/CustomerPortal/Loads";

export const customerPortalRoutes = [
  {
    path: "metrics",
    element: <CustomerMetrics />,
    label: "Metrics",
  },
  {
    path: "members",
    element: <CustomerMembers />,
    label: "Members",
  },
  {
    path: "loads",
    element: <CustomerLoads />,
    label: "Loads",
  },
];
