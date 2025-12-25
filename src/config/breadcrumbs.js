// Breadcrumb labels for URL segments
export const breadcrumbLabels = {
  // Skip these segments
  app: null,

  // Main sections
  dashboard: "Dashboard",
  carriers: "Carriers",
  customers: "Customers",
  "customer-users": "Customer Users",
  shippers: "Shippers",
  "system-users": "System Users",
  "super-admin": "Super Admin",

  // Carrier Portal
  "carrier-portal": null,

  // Customer Portal
  "customer-portal": null,
  members: "Members",
  loads: "Loads",

  metrics: "Metrics",
  orders: "Orders",
  master: "Master",

  // Order types
  bulk: "Bulk",
  aggregate: "Aggregate",
  "walking-floor-tmf": "Walking Floor TMF",
  precast: "Precast",

  // Bulk tab routes
  inbox: "Inbox",
  planning: "Planning",
  dispatch: "Dispatch",
  delivered: "Delivered",
  complete: "Complete",
  "load-details": "Load Details",

  // Master sections
  users: "Users",
  assets: "Assets",
  rates: "Rates",
  location: "Location",
  "customer-details": "Customer Details",
  "rate-table-details": "Rate Table Details",

  // Fuel sections
  fuel: "Fuel",
  "card-assignments": "Card Assignments",
  transactions: "Transactions",
  pricing: "Pricing",
  discounts: "Discounts",
  suppliers: "Suppliers",
  "card-providers": "Card Providers",
  reports: "IFTA & Reports",

  // Materials sections
  materials: "Materials",
  contracts: "Contracts",
  "contract-lines": "Contract Lines",
  list: "Materials",

  // Brokerage sections
  brokerage: "Brokerage",
  queue: "Queue",
  carriers: "Carriers",

  // Common
  details: "Details",
  edit: "Edit",
  create: "Create",
  settings: "Settings",
};

// Labels for detail pages (when navigating to /segment/:id)
export const detailPageLabels = {
  carriers: "Carrier Details",
  customers: "Customer Details",
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
  "fuel",
  "materials",
  "brokerage",
];
