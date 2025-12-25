# Fuel Module Integration Plan

## Overview

This document outlines the proposed menu structure, tabs, and content organization for integrating the Fuel module into the Carrier Portal. The Fuel module manages fuel card integrations across multiple platforms (EFS, Commdata, Relay) for different entity types.

---

## Menu Structure

### Primary Navigation (Sidebar)

```
Carrier Portal
├── Dashboard
├── Loads
├── Drivers
├── Equipment
├── Materials (existing)
│   ├── Catalog
│   ├── Suppliers
│   ├── Contracts
│   ├── Sites
│   └── Contract Lines
├── Fuel (NEW)                    ← New Module
│   ├── Cards
│   ├── Transactions
│   ├── Pricing
│   ├── Discounts
│   ├── IFTA & Reports
│   └── Settings
├── Settlements
└── Reports
```

---

## Fuel Module Pages & Tabs

### 1. Card Management (`/carrier/fuel/cards`)

**Purpose:** Manage fuel cards across all platforms (EFS, Commdata, Relay).

| Tab | Content |
|-----|---------|
| **Active Cards** | DataTable: Card Number, Driver, Platform, Status, Daily Limit, Balance, Last Used, Actions |
| **Pending Requests** | New card requests awaiting approval/processing |
| **Suspended/Lost** | Cards marked as lost, stolen, or suspended |
| **Card History** | Historical card assignments and changes |

**Actions per Card:**
- View Details
- Edit Limits
- Suspend Card
- Report Lost/Stolen
- Reassign Driver
- View Transactions

**Filters (SmartFilter):**
- Platform (EFS, Commdata, Relay)
- Status (Active, Suspended, Lost, Expired)
- Driver
- Card Type
- Limit Range

---

### 2. Transactions (`/carrier/fuel/transactions`)

**Purpose:** View, reconcile, and manage fuel transactions.

| Tab | Content |
|-----|---------|
| **All Transactions** | Complete transaction history with filters |
| **Pending Review** | Transactions flagged for review (unusual amounts, locations) |
| **Disputed** | Transactions under dispute |
| **Reconciliation** | Settlement matching and reconciliation status |

**DataTable Columns:**
- Transaction ID
- Date/Time
- Driver
- Card Number
- Location/Station
- Gallons
- PPG (Price Per Gallon)
- Total Amount
- Discount Applied
- Settlement Status
- Actions

**Filters (SmartFilter):**
- Date Range
- Driver
- Platform
- Location
- Amount Range
- Settlement Status
- Transaction Type (Fuel, DEF, Maintenance)

---

### 3. Pricing (`/carrier/fuel/pricing`)

**Purpose:** Configure and manage pricing models and waterfall logic.

| Tab | Content |
|-----|---------|
| **Pricing Models** | Define and manage 8 pricing model types |
| **Waterfall Configuration** | 3-tier pricing confidentiality setup |
| **Rate Tables** | Platform-specific rate configurations |
| **Margin Settings** | Markup/margin configurations by entity type |

**8 Pricing Models:**
1. Cost Plus (base_cost + margin)
2. Retail Minus (retail_price - discount)
3. OPIS-Based (OPIS_average + adjustment)
4. DOE National Average (doe_average + adjustment)
5. Matrix Pricing (based on volume/tier)
6. Network Pricing (location-specific)
7. Contract Pricing (negotiated rates)
8. Hybrid Model (combination)

**Pricing Waterfall (3 Levels):**
```
Level 1: Base Cost (Confidential - Admin Only)
    ↓
Level 2: Carrier Cost (Visible to Carrier Admins)
    ↓
Level 3: Driver Price (Visible to Drivers)
```

---

### 4. Discounts (`/carrier/fuel/discounts`)

**Purpose:** Manage supplier discounts and network partnerships.

| Tab | Content |
|-----|---------|
| **Active Discounts** | Currently active discount programs |
| **Network Partners** | Participating fuel networks and stations |
| **Volume Programs** | Volume-based discount tiers |
| **Promotional** | Time-limited promotional discounts |

**DataTable Columns:**
- Program Name
- Supplier/Network
- Discount Type (PPG, Percentage, Flat)
- Discount Value
- Minimum Volume
- Valid Period
- Eligible Entities
- Status
- Actions

**Discount Types:**
- Per Gallon Discount (e.g., -$0.05/gal)
- Percentage Discount (e.g., 2% off retail)
- Flat Rate (e.g., $50 off monthly)
- Tiered (volume-based brackets)

---

### 5. IFTA & Reports (`/carrier/fuel/reports`)

**Purpose:** IFTA compliance reporting and fuel analytics.

| Tab | Content |
|-----|---------|
| **IFTA Reporting** | Quarterly IFTA report generation |
| **Spend Reports** | Detailed spend analytics by driver, location, time |
| **Savings Reports** | Discount utilization and savings analysis |
| **Efficiency Reports** | MPG tracking and fuel efficiency metrics |
| **Custom Reports** | Build custom report configurations |

**IFTA Report Features:**
- Automatic mileage/fuel data aggregation
- State-by-state breakdown
- Tax jurisdiction calculations
- Export formats (PDF, Excel, CSV)
- E-filing integration

**Standard Reports:**
- Monthly Spend Summary
- Driver Fuel Efficiency
- Location Analysis
- Discount Utilization
- Cost Comparison (vs. retail)
- Trend Analysis

---

### 6. Settings (`/carrier/fuel/settings`)

**Purpose:** Configure fuel module preferences and integrations.

| Tab | Content |
|-----|---------|
| **General** | Module preferences, default settings |
| **Platforms** | EFS, Commdata, Relay API configurations |
| **Policies** | Fuel purchase policies and restrictions |
| **Notifications** | Alert thresholds and notification preferences |
| **Integrations** | Third-party integrations (TMS, Accounting) |

**Policy Configuration:**
- Daily/Weekly/Monthly limits per entity type
- Allowed purchase categories (Fuel only, DEF, Maintenance)
- Geographic restrictions
- Time restrictions (business hours only)
- Required fields (odometer, trip number)

---

## Entity Type Matrix

| Entity Type | Platform | Settlement Method | Admin Access |
|-------------|----------|-------------------|--------------|
| Company Driver | EFS | Direct Debit | Full (Carrier Admin) |
| Owner-Operator | Commdata | Deduction from Settlement | Limited (Own data only) |
| Franchise Driver | Relay | Franchise Bill | Franchise Admin |
| Carrier | All | Net Terms | Full |

---

## File Structure (Proposed)

```
src/pages/CarrierPortal/Fuel/
├── index.jsx                    # Cards (default landing page)
├── Cards.jsx                    # Card Management
├── CardDetails.jsx              # Individual Card View
├── Transactions.jsx             # Transaction List
├── TransactionDetails.jsx       # Transaction Detail View
├── Pricing.jsx                  # Pricing Models
├── PricingModelDetails.jsx      # Pricing Model Configuration
├── Discounts.jsx                # Discounts Management
├── Reports.jsx                  # IFTA & Reports
├── ReportBuilder.jsx            # Custom Report Builder
├── Settings.jsx                 # Module Settings
└── components/
    ├── PricingWaterfall.jsx     # Pricing Waterfall Visualization
    ├── TransactionRow.jsx       # Transaction Table Row
    └── CardStatusBadge.jsx      # Card Status Indicator
```

---

## Navigation Routes

```javascript
// Add to carrier-portal/routes.jsx

{
  path: "fuel",
  children: [
    { index: true, element: <FuelCards /> },
    { path: "cards", element: <FuelCards /> },
    { path: "cards/:cardId", element: <CardDetails /> },
    { path: "transactions", element: <Transactions /> },
    { path: "transactions/:transactionId", element: <TransactionDetails /> },
    { path: "pricing", element: <Pricing /> },
    { path: "pricing/:modelId", element: <PricingModelDetails /> },
    { path: "discounts", element: <Discounts /> },
    { path: "reports", element: <Reports /> },
    { path: "reports/builder", element: <ReportBuilder /> },
    { path: "settings", element: <FuelSettings /> },
  ]
}
```

---

## Sidebar Menu Items

```javascript
// Add to carrier-portal/sidebar.jsx

{
  title: "Fuel",
  icon: Fuel, // or GasPump icon
  path: "/carrier/fuel",
  children: [
    { title: "Cards", path: "/carrier/fuel/cards" },
    { title: "Transactions", path: "/carrier/fuel/transactions" },
    { title: "Pricing", path: "/carrier/fuel/pricing" },
    { title: "Discounts", path: "/carrier/fuel/discounts" },
    { title: "IFTA & Reports", path: "/carrier/fuel/reports" },
    { title: "Settings", path: "/carrier/fuel/settings" },
  ]
}
```

---

## Implementation Phases

### Phase 1: Foundation
- [ ] Create folder structure
- [ ] Add sidebar navigation
- [ ] Add routes configuration
- [ ] Create Cards page (default landing)
- [ ] Create Settings page (platform configuration)

### Phase 2: Core Features
- [ ] Card Management (CRUD operations)
- [ ] Transaction viewing and filtering
- [ ] Basic reporting

### Phase 3: Pricing & Discounts
- [ ] Pricing model configuration
- [ ] Waterfall pricing setup
- [ ] Discount management

### Phase 4: Advanced Features
- [ ] IFTA reporting
- [ ] Custom report builder
- [ ] Advanced analytics

### Phase 5: Integrations
- [ ] EFS API integration
- [ ] Commdata API integration
- [ ] Relay API integration
- [ ] TMS/Accounting system integrations

### Future Enhancements (Deferred)
- [ ] Driver tier system (Platinum/Gold/Silver/Bronze)
- [ ] Driver score tracking
- [ ] Fuel Dashboard with KPIs
- [ ] Geographic heat maps

---

## Data Models Reference

### FuelCard
```javascript
{
  id: string,
  cardNumber: string,
  platform: "EFS" | "Commdata" | "Relay",
  driverId: string,
  driverName: string,
  entityType: "CompanyDriver" | "OwnerOperator" | "FranchiseDriver" | "Carrier",
  status: "Active" | "Suspended" | "Lost" | "Expired",
  dailyLimit: number,
  weeklyLimit: number,
  monthlyLimit: number,
  currentBalance: number,
  allowedCategories: string[],
  restrictions: object,
  issuedDate: date,
  expirationDate: date,
  lastUsedDate: date,
  lastUsedLocation: string
}
```

### FuelTransaction
```javascript
{
  id: string,
  cardId: string,
  cardNumber: string,
  driverId: string,
  driverName: string,
  transactionDate: datetime,
  location: {
    stationName: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    latitude: number,
    longitude: number
  },
  fuelType: string,
  gallons: number,
  pricePerGallon: number,
  grossAmount: number,
  discountAmount: number,
  netAmount: number,
  odometer: number,
  tripNumber: string,
  settlementStatus: "Pending" | "Settled" | "Disputed",
  settlementDate: date,
  platform: "EFS" | "Commdata" | "Relay"
}
```

### PricingModel
```javascript
{
  id: string,
  name: string,
  type: "CostPlus" | "RetailMinus" | "OPIS" | "DOE" | "Matrix" | "Network" | "Contract" | "Hybrid",
  baseSource: string,
  adjustment: number,
  adjustmentType: "Fixed" | "Percentage",
  marginStructure: object,
  applicableEntities: string[],
  effectiveDate: date,
  expirationDate: date,
  isActive: boolean
}
```

### DiscountProgram
```javascript
{
  id: string,
  programName: string,
  supplier: string,
  discountType: "PerGallon" | "Percentage" | "FlatRate" | "Tiered",
  discountValue: number,
  minimumVolume: number,
  validFrom: date,
  validTo: date,
  eligibleEntities: string[],
  status: "Active" | "Inactive" | "Expired",
  networkPartners: string[]
}
```

---

## Notes

1. **Platform-Specific Handling:** Each fuel card platform (EFS, Commdata, Relay) has different APIs and data formats. The UI should abstract these differences while allowing platform-specific configuration in Settings.

2. **Role-Based Access:** Different entity types have different access levels:
   - Carrier Admin: Full access to all data
   - Franchise Admin: Access to franchise drivers only
   - Owner-Operator: Access to own data only
   - Company Driver: View own transactions only

3. **Real-Time Data:** Transaction data should support real-time updates where platform APIs allow.

4. **Mobile Consideration:** Driver-facing features (transaction history, card info) should be mobile-responsive for the Driver App.

5. **IFTA Compliance:** IFTA reporting must meet state regulatory requirements for quarterly filing.

6. **Deferred Features:** Driver tier system and dashboard with KPIs will be implemented in a future phase.
