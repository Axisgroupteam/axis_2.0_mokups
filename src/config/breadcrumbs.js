// Breadcrumb labels for URL segments
export const breadcrumbLabels = {
  // Skip these segments
  app: null,

  // Main sections
  dashboard: "Dashboard",
  carriers: "Carriers",
  shippers: "Shippers",
  "system-users": "System Users",
  "super-admin": "Super Admin",

  // Carrier Portal
  "carrier-portal": null,
  metrics: "Dashboard",
  orders: "Orders",
  master: "Master",

  // Order types
  bulk: "Bulk",
  aggregate: "Aggregate",
  "walking-floor-tmf": "Walking Floor TMF",
  precast: "Precast",

  // Master sections
  users: "Users",
  assets: "Assets",
  rates: "Rates",
  location: "Location",

  // Common
  details: "Details",
  edit: "Edit",
  create: "Create",
  settings: "Settings",
};

// Labels for detail pages (when navigating to /segment/:id)
export const detailPageLabels = {
  carriers: "Carrier Details",
  shippers: "Shipper Details",
  "system-users": "User Details",
  orders: "Order Details",
  users: "User Details",
  assets: "Asset Details",
};

// Segments that should not be clickable links (just hierarchy headings)
export const nonLinkableSegments = [
  "orders",
  "master",
];
