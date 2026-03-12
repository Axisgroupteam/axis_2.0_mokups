# Mega Materials Integration - Screen Flow

## Carrier Portal Integration Plan

---

## Current Carrier Portal Structure

```
CARRIER PORTAL (AXIS 2.0)
│
├── Dashboard (Metrics)
│
├── Load Requests ──────────────────── Jesus (Inside Sales)
│   └── Order capture, validation, confirmation
│
├── Orders ─────────────────────────── Operations Team
│   ├── Bulk
│   │   ├── Inbox (new loads from ML)
│   │   ├── Planning
│   │   ├── Dispatch
│   │   ├── Delivered
│   │   └── Complete
│   ├── Aggregate
│   ├── Walking Floor TMF
│   └── Precast
│
├── Brokerage ──────────────────────── Andrew (External Carriers)
│   ├── Load Board (queue)
│   └── Carriers
│
├── Master ─────────────────────────── Admin/Setup
│   ├── Users
│   ├── Assets
│   ├── Customers
│   ├── Payee
│   ├── Rates
│   ├── Location
│   ├── Categories
│   ├── Business Unit
│   ├── Accessorial Charges
│   └── Product Sales
│
└── Onboarding
    └── Driver
```

---

## What We Need to Add for Mega Materials

### New Sidebar Section: "Materials" (MM)

```
CARRIER PORTAL (AXIS 2.0) - UPDATED
│
├── Dashboard
│
├── Load Requests ────────── (existing - Jesus team)
│
├── Orders ───────────────── (existing - Operations)
│   └── [unchanged]
│
├── Brokerage ────────────── (existing - Andrew)
│   └── [unchanged]
│
├── 🆕 MATERIALS ─────────── NEW SECTION (Vinnie/Jesus/Lisa)
│   ├
│   ├── Suppliers
│   │   ├── Supplier List
│   │   └── Supplier Details
│   ├── Price List
│   ├── Campaigns
│   ├── Quotes
│   │   ├── All Quotes
│   │   └── Quote Details
│   ├── Material Sales
│   │   ├── All Sales
│   │   └── Sale Details
│   └── Invoices
│
├── Master ───────────────── (updated)
│   ├── [existing items]
│   ├── 🆕 Supplier Contracts
│   └── 🆕 Material Types
│
└── Onboarding
    ├── Driver
    └── 🆕 Supplier
```

Notes
List of items

---

## Screen-by-Screen Flow

### PHASE 1: PROCURE (Supplier Management)

#### Screen 1.1: Suppliers List

**Path**: `/app/carrier-portal/materials/suppliers`
**Owner**: Vinnie Bove

```
┌─────────────────────────────────────────────────────────────────┐
│ Suppliers                                          [+ Add New]  │
├─────────────────────────────────────────────────────────────────┤
│ [Search...] [Filter: Status ▼] [Filter: Material Type ▼]       │
├─────────────────────────────────────────────────────────────────┤
│ SUPPLIER         MATERIALS        CONTRACT    STATUS    ACTIONS │
│ ─────────────────────────────────────────────────────────────── │
│ Rocky's Quarry   Limestone, Sand  Active      ●Active   [...]   │
│ Tampa Sand Co    Fill Sand        Active      ●Active   [...]   │
│ Gulf Concrete    Ready-Mix        Pending     ○Pending  [...]   │
│ Green Recyclers  Recycled         Expired     ○Expired  [...]   │
└─────────────────────────────────────────────────────────────────┘
```

**Actions**:

- View Details → Supplier Details page
- Edit Contract
- Deactivate

---

#### Screen 1.2: Supplier Details

**Path**: `/app/carrier-portal/materials/suppliers/:id`

```
┌─────────────────────────────────────────────────────────────────┐
│ ← Back    Rocky's Quarry                    [Edit] [Deactivate] │
├────────────────────────────────┬────────────────────────────────┤
│ BASIC INFORMATION              │ CONTRACT DETAILS               │
│ ────────────────────────       │ ────────────────────────       │
│ Name: Rocky's Quarry           │ Contract ID: SUP-2024-001      │
│ Type: Quarry                   │ Status: Active                 │
│ Contact: John Rocky            │ Effective: Jan 1, 2025         │
│ Phone: (813) 555-0123          │ Expires: Mar 31, 2025          │
│ Email: john@rockysquarry.com   │ Payment Terms: NET 30          │
│ Address: 1234 Quarry Rd        │ Price Lock: 90 days            │
├────────────────────────────────┴────────────────────────────────┤
│ MATERIALS & RATES                                               │
│ ─────────────────────────────────────────────────────────────── │
│ MATERIAL          BASE RATE    VOLUME TIER      DISCOUNT        │
│ #57 Limestone     $12.50/ton   >1000 tons/mo    -$1.00/ton     │
│ Concrete Sand     $15.00/ton   >500 tons/mo     -$0.75/ton     │
│ Fill Sand         $8.00/ton    >2000 tons/mo    -$0.50/ton     │
├─────────────────────────────────────────────────────────────────┤
│ VETTING CHECKLIST                                               │
│ ─────────────────────────────────────────────────────────────── │
│ ✅ Business License (Valid FL)                                  │
│ ✅ Insurance ($1.5M Liability)                                  │
│ ✅ FDOT Certification                                           │
│ ✅ Capacity: 800 tons/day                                       │
│ ✅ Location: 45 miles from Tampa                                │
├─────────────────────────────────────────────────────────────────┤
│ OPERATING HOURS                                                 │
│ Mon-Fri: 6:00 AM - 5:00 PM                                      │
│ Saturday: 6:00 AM - 12:00 PM                                    │
│ Sunday: Closed                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Tabs**:

- Overview (shown above)
- Contracts (history)
- Orders (past orders from this supplier)
- Documents
- Comments

---

### PHASE 2: PRICE (Pricing Engine)

#### Screen 2.1: Price List

**Path**: `/app/carrier-portal/materials/price-list`
**Owner**: Vinnie Bove + AXIS AI

```
┌─────────────────────────────────────────────────────────────────┐
│ Price List                              [Sync to Planet Build]  │
├─────────────────────────────────────────────────────────────────┤
│ 📊 AI Pricing Engine Status: ✅ Last updated 2 hours ago       │
├─────────────────────────────────────────────────────────────────┤
│ [Search...] [Filter: Material ▼] [Filter: Region ▼]            │
├─────────────────────────────────────────────────────────────────┤
│ MATERIAL        SUPPLIER COST  MARGIN  LIST PRICE  AI CONF  ACT│
│ ─────────────────────────────────────────────────────────────── │
│ #57 Limestone   $12.50         18%     $14.75      95%      ●  │
│ Concrete Sand   $15.00         17%     $17.55      92%      ●  │
│ Fill Sand       $8.00          20%     $9.60       88%      ●  │
│ Ready-Mix       $95.00/yd      15%     $109.25     85%      ○  │
│ Recycled Conc   $6.50          22%     $7.93       90%      ●  │
└─────────────────────────────────────────────────────────────────┘

[Approve All Pending] [Request AI Refresh]
```

**AI Pricing Panel** (slide-out):

```
┌────────────────────────────────────────┐
│ 🤖 AI Pricing Recommendation           │
├────────────────────────────────────────┤
│ Material: #57 Limestone                │
│ Region: Tampa Bay                      │
├────────────────────────────────────────┤
│ MARKET ANALYSIS                        │
│ • Competitor avg: $15.20/ton           │
│ • Demand index: HIGH (8.5/10)          │
│ • Season factor: Peak (+5%)            │
│                                        │
│ RECOMMENDATION                         │
│ Suggested Price: $14.75/ton            │
│ Target Margin: 18%                     │
│ Confidence: 95%                        │
│                                        │
│ [Approve] [Adjust] [Override]          │
└────────────────────────────────────────┘
```

---

### PHASE 3: MARKET (Campaigns)

#### Screen 3.1: Campaigns List

**Path**: `/app/carrier-portal/materials/campaigns`
**Owner**: Vinnie Bove

```
┌─────────────────────────────────────────────────────────────────┐
│ Marketing Campaigns                            [+ New Campaign] │
├─────────────────────────────────────────────────────────────────┤
│ CAMPAIGN NAME      MATERIALS       REGION      STATUS    LEADS  │
│ ─────────────────────────────────────────────────────────────── │
│ Tampa Q1 Push      Limestone,Sand  Tampa Bay   ●Active   47     │
│ Orlando Launch     All Materials   Orlando     ●Active   23     │
│ Jacksonville       Concrete        Jax Area    ○Draft    0      │
│ Statewide Promo    Fill Sand       Florida     ○Paused   12     │
└─────────────────────────────────────────────────────────────────┘
```

#### Screen 3.2: Campaign Details

**Path**: `/app/carrier-portal/materials/campaigns/:id`

```
┌─────────────────────────────────────────────────────────────────┐
│ ← Back    Tampa Q1 Push                    [Edit] [Pause] [...]│
├────────────────────────────────┬────────────────────────────────┤
│ CAMPAIGN INFO                  │ PLANET BUILD LISTINGS          │
│ ────────────────────────       │ ────────────────────────       │
│ Status: Active                 │ 12 Active Listings             │
│ Region: Tampa Bay              │ Last Sync: 5 min ago           │
│ Start: Jan 1, 2025             │                                │
│ Materials:                     │ [View on Planet Build]         │
│  • #57 Limestone               │ [Sync Now]                     │
│  • Concrete Sand               │                                │
├────────────────────────────────┴────────────────────────────────┤
│ PERFORMANCE METRICS                                             │
│ ─────────────────────────────────────────────────────────────── │
│ Views: 1,247    Inquiries: 47    Quotes: 23    Conversion: 49%  │
├─────────────────────────────────────────────────────────────────┤
│ RECENT INQUIRIES (from Planet Build)                            │
│ ─────────────────────────────────────────────────────────────── │
│ Bob's Construction  │ 500 tons Limestone │ 2 hours ago │ [→Quote]│
│ Tampa Landscaping   │ 50 tons Sand       │ 5 hours ago │ [→Quote]│
│ City of Tampa       │ 2000 tons          │ 1 day ago   │ [→Quote]│
└─────────────────────────────────────────────────────────────────┘
```

---

### PHASE 4: SELL (Quoting)

#### What is a Quote?

A **Quote** is a **price offer** you send to a customer before they buy. Think of it as a formal proposal.

**Real-Life Example:**

```
Customer calls:
"Hey, I need 500 tons of limestone delivered to my job site. How much?"

Jesus (Sales) responds:
"Let me prepare a quote for you."

The Quote says:
┌─────────────────────────────────────┐
│ QUOTE FOR: Bob's Construction       │
│ VALID FOR: 7 days                   │
│─────────────────────────────────────│
│ 500 tons #57 Limestone     $7,375   │
│ Delivery (32 miles)        $1,750   │
│─────────────────────────────────────│
│ TOTAL                      $9,125   │
│                                     │
│ Accept this quote to confirm!       │
└─────────────────────────────────────┘
```

#### Quote vs Sale - The Difference

| Quote                            | Sale                      |
| -------------------------------- | ------------------------- |
| A **proposal** (offer)           | A **confirmed order**     |
| Customer can say yes or no       | Customer already said YES |
| Price is **promised** for 7 days | Price is **locked**       |
| No delivery scheduled yet        | Delivery is scheduled     |
| No money owed yet                | Invoice will be sent      |

#### The Quote Flow

```
Customer asks "How much?"
        ↓
Jesus creates a QUOTE (price offer)
        ↓
Sends quote to customer via email/PDF
        ↓
Customer reviews...
        ↓
    ┌───────────────┬────────────────┐
    ↓               ↓                ↓
ACCEPTS         DECLINES         NO RESPONSE
    ↓               ↓                ↓
Quote becomes   Quote marked     Quote EXPIRES
   SALE         as declined      after 7 days
    ↓
Delivery scheduled
    ↓
Invoice sent after delivery
```

#### Why Do We Need Quotes?

1. **Customer needs to know price before committing**
2. **Gives them time to compare** with competitors
3. **Protects us** - price is only valid for 7 days (material costs can change)
4. **Creates paper trail** - proof of what was promised
5. **Required for big orders** - contractors need quotes for their budgets

#### Quote Statuses

| Status       | Meaning                                   |
| ------------ | ----------------------------------------- |
| **Draft**    | Jesus is still creating it, not sent yet  |
| **Sent**     | Emailed to customer, waiting for response |
| **Accepted** | Customer said YES → becomes a Sale        |
| **Declined** | Customer said NO                          |
| **Expired**  | 7 days passed, no response                |

#### In One Sentence

> A **Quote** is the price promise we send to a customer. When they accept it, it becomes a **Sale** (confirmed order).

---

#### Screen 4.1: Quotes List

**Path**: `/app/carrier-portal/materials/quotes`
**Owner**: Jesus (Customer Experience)

```
┌─────────────────────────────────────────────────────────────────┐
│ Material Quotes                                    [+ New Quote]│
├─────────────────────────────────────────────────────────────────┤
│ Tabs: [All] [Draft] [Sent] [Accepted] [Expired] [Declined]     │
├─────────────────────────────────────────────────────────────────┤
│ QUOTE #     CUSTOMER           AMOUNT    EXPIRES   STATUS       │
│ ─────────────────────────────────────────────────────────────── │
│ QT-2025-001 Bob's Construction $9,125    Jan 17    ●Sent        │
│ QT-2025-002 Tampa Landscaping  $892      Jan 18    ○Draft       │
│ QT-2025-003 Sunrise Builders   $15,430   Jan 15    ✓Accepted    │
│ QT-2025-004 Smith Paving       $4,200    Jan 10    ✗Expired     │
└─────────────────────────────────────────────────────────────────┘
```

#### Screen 4.2: Create/Edit Quote

**Path**: `/app/carrier-portal/materials/quotes/new` or `/quotes/:id`

```
┌─────────────────────────────────────────────────────────────────┐
│ New Material Quote                              [Save] [Send]   │
├─────────────────────────────────────────────────────────────────┤
│ CUSTOMER INFORMATION                                            │
│ ─────────────────────────────────────────────────────────────── │
│ Customer: [Search customer...          ▼]                       │
│ Contact:  [Select contact...           ▼]                       │
│ PO #:     [Optional PO number          ]                        │
├─────────────────────────────────────────────────────────────────┤
│ DELIVERY DETAILS                                                │
│ ─────────────────────────────────────────────────────────────── │
│ Delivery Address: [123 Job Site Rd, Tampa FL        ]           │
│ Requested Date:   [Jan 20, 2025  📅]                            │
│ Time Window:      [8:00 AM ▼] to [12:00 PM ▼]                   │
│ Include Freight:  [✓] Yes                                       │
├─────────────────────────────────────────────────────────────────┤
│ MATERIALS                                        [+ Add Line]   │
│ ─────────────────────────────────────────────────────────────── │
│ MATERIAL          QTY      UNIT     UNIT PRICE    TOTAL         │
│ #57 Limestone     500      tons     $14.75        $7,375.00     │
│ [Remove]                                                        │
├─────────────────────────────────────────────────────────────────┤
│ FREIGHT (Auto-calculated by ML Rate Engine)                     │
│ ─────────────────────────────────────────────────────────────── │
│ Distance: 32 miles │ Rate: $3.50/ton │ Total: $1,750.00        │
├─────────────────────────────────────────────────────────────────┤
│                                          MATERIALS:  $7,375.00  │
│                                          FREIGHT:    $1,750.00  │
│                                          TAX:        $0.00      │
│                                          ─────────────────────  │
│                                          TOTAL:      $9,125.00  │
├─────────────────────────────────────────────────────────────────┤
│ NOTES TO CUSTOMER                                               │
│ [                                                             ] │
│ [                                                             ] │
└─────────────────────────────────────────────────────────────────┘
```

#### Screen 4.3: Quote Details (View/Convert)

**Path**: `/app/carrier-portal/materials/quotes/:id`

```
┌─────────────────────────────────────────────────────────────────┐
│ ← Back    Quote #QT-2025-001                [Edit][Resend][...] │
├─────────────────────────────────────────────────────────────────┤
│ Status: ●Sent                 Expires: Jan 17, 2025 (5 days)   │
├────────────────────────────────┬────────────────────────────────┤
│ CUSTOMER                       │ DELIVERY                       │
│ Bob's Construction             │ 123 Job Site Rd, Tampa FL      │
│ Contact: Bob Smith             │ Jan 20, 2025 | 8AM-12PM        │
│ 📞 (813) 555-1234              │ Includes Freight: Yes          │
│ 📧 bob@bobsconstruction.com    │                                │
├────────────────────────────────┴────────────────────────────────┤
│ QUOTE LINES                                                     │
│ #57 Limestone    500 tons    $14.75/ton         $7,375.00       │
│ Freight          500 tons    $3.50/ton          $1,750.00       │
│ ─────────────────────────────────────────────────────────────── │
│ TOTAL                                           $9,125.00       │
├─────────────────────────────────────────────────────────────────┤
│ ACTIONS                                                         │
│ ─────────────────────────────────────────────────────────────── │
│ [✓ Mark as Accepted] [✗ Mark as Declined] [📧 Resend Quote]    │
│                                                                 │
│ When accepted, this will create a Material Sale and             │
│ automatically hand off to Mega Logistics for delivery.          │
└─────────────────────────────────────────────────────────────────┘
```

---

### PHASE 5 & 6: HANDOFF & FULFILL (Material Sales)

#### Screen 5.1: Material Sales List

**Path**: `/app/carrier-portal/materials/sales`
**Owner**: Jesus + Tommy

```
┌─────────────────────────────────────────────────────────────────┐
│ Material Sales                                                  │
├─────────────────────────────────────────────────────────────────┤
│ Tabs: [All] [Pending] [In Logistics] [Dispatched] [Delivered] [Invoiced] [Paid]│
├─────────────────────────────────────────────────────────────────┤
│ SALE #      CUSTOMER        MATERIAL    AMOUNT   STATUS    DATE │
│ ─────────────────────────────────────────────────────────────── │
│ MS-2025-001 Bob's Const.    Limestone   $9,125   🚛Dispatched Jan 20│
│ MS-2025-002 Tampa Landsc.   Sand        $892     📦Logistics  Jan 21│
│ MS-2025-003 Sunrise         Mixed       $15,430  ✓Delivered  Jan 18│
│ MS-2025-004 City of Tampa   Limestone   $45,000  💵Invoiced   Jan 15│
└─────────────────────────────────────────────────────────────────┘
```

#### Screen 5.2: Material Sale Details

**Path**: `/app/carrier-portal/materials/sales/:id`

```
┌─────────────────────────────────────────────────────────────────┐
│ ← Back    Sale #MS-2025-001                             [...]   │
├─────────────────────────────────────────────────────────────────┤
│ STATUS: 🚛 DISPATCHED                                           │
│ ─────────────────────────────────────────────────────────────── │
│ NEGOTIATING → CONTRACTED → PRICED → LISTED → QUOTED → SOLD →   │
│ [LOGISTICS] → [DISPATCHED●] → DELIVERED → INVOICED → PAID      │
├────────────────────────────────┬────────────────────────────────┤
│ CUSTOMER                       │ SUPPLIER                       │
│ ────────────────────────       │ ────────────────────────       │
│ Bob's Construction             │ Rocky's Quarry                 │
│ Bob Smith                      │ John Rocky                     │
│ 📞 (813) 555-1234              │ 📞 (813) 555-0123              │
├────────────────────────────────┼────────────────────────────────┤
│ PICKUP                         │ DELIVERY                       │
│ ────────────────────────       │ ────────────────────────       │
│ 1234 Quarry Rd                 │ 123 Job Site Rd                │
│ Tampa, FL 33601                │ Tampa, FL 33602                │
│                                │ Jan 20, 2025 | 8AM-12PM        │
├────────────────────────────────┴────────────────────────────────┤
│ ORDER DETAILS                                                   │
│ ─────────────────────────────────────────────────────────────── │
│ Material: #57 Limestone                                         │
│ Quantity: 500 tons                                              │
│ Material Total: $7,375.00                                       │
│ Freight: $1,750.00                                              │
│ TOTAL: $9,125.00                                                │
├─────────────────────────────────────────────────────────────────┤
│ LOGISTICS HANDOFF                                               │
│ ─────────────────────────────────────────────────────────────── │
│ ML Order ID: ML-2025-0456                                       │
│ Carrier: Mega Trucking (First Right Accepted)                   │
│ Driver: Mike Johnson                                            │
│ Truck: Unit #127 (Dump Truck)                                   │
│ Status: En Route                                                │
│                                                                 │
│ [📍 Track Delivery]  [📞 Contact Driver]                        │
├─────────────────────────────────────────────────────────────────┤
│ LIVE TRACKING                                                   │
│ ─────────────────────────────────────────────────────────────── │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                    🗺️ MAP VIEW                              │ │
│ │                                                             │ │
│ │         🚛 ────────────────→ 📍                             │ │
│ │      (Driver)            (Delivery)                        │ │
│ │                                                             │ │
│ │    ETA: 25 minutes | Distance: 12 miles remaining          │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

### PHASE 7 & 8: INVOICE & PAY

#### Screen 7.1: Material Invoices

**Path**: `/app/carrier-portal/materials/invoices`
**Owner**: Lisa (Finance)

```
┌─────────────────────────────────────────────────────────────────┐
│ Material Invoices                                               │
├─────────────────────────────────────────────────────────────────┤
│ Tabs: [All] [Pending] [Sent] [Paid] [Overdue]                  │
├─────────────────────────────────────────────────────────────────┤
│ INVOICE #    CUSTOMER        AMOUNT    DUE DATE   STATUS    AGE │
│ ─────────────────────────────────────────────────────────────── │
│ INV-2025-001 Sunrise Build.  $15,430   Feb 17     ●Sent     3d  │
│ INV-2025-002 City of Tampa   $45,000   Feb 14     ○Overdue  6d  │
│ INV-2025-003 ABC Paving      $8,200    Feb 20     ✓Paid     -   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Materials Dashboard

#### Screen 0: Materials Dashboard

**Path**: `/app/carrier-portal/materials/dashboard`
**Owner**: Vinnie Bove

```
┌─────────────────────────────────────────────────────────────────┐
│ Materials Dashboard                              January 2025   │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ $127,500    │ │ 47          │ │ 23          │ │ 18%         │ │
│ │ MTD Revenue │ │ Quotes Sent │ │ Orders      │ │ Margin      │ │
│ │ ↑12% vs LM  │ │ ↑8%         │ │ ↑15%        │ │ On Target   │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ PIPELINE                           │ QUICK ACTIONS              │
│ ─────────────────────────          │ ────────────────────────   │
│ 📋 12 Quotes Pending Response      │ [+ New Quote]              │
│ 📦 5 Orders In Logistics           │ [+ New Supplier]           │
│ 🚛 3 Deliveries Today              │ [Sync Planet Build]        │
│ 💵 8 Invoices Awaiting Payment     │ [AI Price Refresh]         │
├─────────────────────────────────────────────────────────────────┤
│ RECENT ACTIVITY                                                 │
│ ─────────────────────────────────────────────────────────────── │
│ 🔔 New inquiry from Bob's Construction - 500 tons limestone    │
│ ✅ Quote QT-2025-003 accepted by Sunrise Builders               │
│ 🚛 Delivery completed for MS-2025-002                           │
│ 💵 Payment received from ABC Paving - $8,200                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Updated Sidebar Structure

```jsx
// New Materials sub-menu to add in sidebar.jsx

const materialsSubItems = [
  {
    label: "Dashboard",
    href: "/app/carrier-portal/materials/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    label: "Suppliers",
    href: "/app/carrier-portal/materials/suppliers",
    icon: FactoryIcon, // or Building2Icon
  },
  {
    label: "Price List",
    href: "/app/carrier-portal/materials/price-list",
    icon: DollarSignIcon,
  },
  {
    label: "Campaigns",
    href: "/app/carrier-portal/materials/campaigns",
    icon: MegaphoneIcon, // or SpeakerIcon
  },
  {
    label: "Quotes",
    href: "/app/carrier-portal/materials/quotes",
    icon: FileTextIcon,
  },
  {
    label: "Sales",
    href: "/app/carrier-portal/materials/sales",
    icon: ShoppingBagIcon,
  },
  {
    label: "Invoices",
    href: "/app/carrier-portal/materials/invoices",
    icon: ReceiptIcon,
  },
];
```

---

## Integration Points with Existing Flow

### 1. Load Requests → Materials Quotes

When Jesus receives an inquiry that includes materials:

- Existing "Load Requests" for freight-only
- New "Materials > Quotes" for material + freight bundles

### 2. Materials Sale → Orders (Bulk)

When a Material Sale has `includes_freight = true`:

```
Material Sale Created (MM)
        ↓
Logistics Bridge Auto-Creates ML Order
        ↓
Order appears in "Orders > Bulk > Inbox"
        ↓
Tommy accepts/declines (First Right)
        ↓
Normal Bulk Order flow continues
```

### 3. Brokerage Integration

If MT declines (First Right):

```
MT Declines in "Orders > Bulk > Inbox"
        ↓
Order routes to "Brokerage > Load Board"
        ↓
Andrew finds external carrier
        ↓
Normal Brokerage flow continues
```

### 4. Master Data Links

- **Master > Customers**: Shared between freight and materials
- **Master > Location**: Supplier pickup locations added here
- **Master > Rates**: Material rates managed in "Materials > Price List"

---

## New Routes to Add

```jsx
// Add to carrierPortalRoutes in routes.jsx

// Materials routes
{
  path: "materials/dashboard",
  element: <MaterialsDashboard />,
  label: "Materials Dashboard",
},
{
  path: "materials/suppliers",
  element: <SuppliersList />,
  label: "Suppliers",
},
{
  path: "materials/suppliers/:id",
  element: <SupplierDetails />,
  label: "Supplier Details",
},
{
  path: "materials/price-list",
  element: <PriceList />,
  label: "Price List",
},
{
  path: "materials/campaigns",
  element: <CampaignsList />,
  label: "Campaigns",
},
{
  path: "materials/campaigns/:id",
  element: <CampaignDetails />,
  label: "Campaign Details",
},
{
  path: "materials/quotes",
  element: <QuotesList />,
  label: "Quotes",
},
{
  path: "materials/quotes/new",
  element: <CreateQuote />,
  label: "Create Quote",
},
{
  path: "materials/quotes/:id",
  element: <QuoteDetails />,
  label: "Quote Details",
},
{
  path: "materials/sales",
  element: <MaterialSalesList />,
  label: "Material Sales",
},
{
  path: "materials/sales/:id",
  element: <MaterialSaleDetails />,
  label: "Sale Details",
},
{
  path: "materials/invoices",
  element: <MaterialInvoices />,
  label: "Material Invoices",
},
```

---

## File Structure to Create

```
src/pages/CarrierPortal/Materials/
├── Dashboard/
│   └── index.jsx
├── Suppliers/
│   ├── index.jsx (list)
│   └── SupplierDetails/
│       ├── index.jsx
│       ├── BasicInfoCard.jsx
│       ├── ContractCard.jsx
│       ├── MaterialsRatesCard.jsx
│       └── VettingChecklistCard.jsx
├── PriceList/
│   ├── index.jsx
│   └── AIPricingPanel.jsx
├── Campaigns/
│   ├── index.jsx (list)
│   └── CampaignDetails/
│       └── index.jsx
├── Quotes/
│   ├── index.jsx (list)
│   ├── CreateQuote.jsx
│   └── QuoteDetails/
│       └── index.jsx
├── Sales/
│   ├── index.jsx (list)
│   └── SaleDetails/
│       ├── index.jsx
│       ├── StatusTimeline.jsx
│       ├── CustomerSupplierCard.jsx
│       ├── OrderDetailsCard.jsx
│       └── LogisticsHandoffCard.jsx
└── Invoices/
    └── index.jsx
```

---

## Summary: What We're Building

| Screen              | Owner       | Priority | Connects To           |
| ------------------- | ----------- | -------- | --------------------- |
| Materials Dashboard | Vinnie      | P1       | Overview of all MM    |
| Suppliers List      | Vinnie      | P1       | Master data           |
| Supplier Details    | Vinnie      | P1       | Contracts, Rates      |
| Price List          | Vinnie      | P1       | AI Pricing Engine     |
| Campaigns           | Vinnie      | P2       | Planet Build          |
| Quotes List         | Jesus       | P1       | Sales flow            |
| Create Quote        | Jesus       | P1       | Price List, Customers |
| Quote Details       | Jesus       | P1       | Convert to Sale       |
| Material Sales List | Jesus/Tommy | P1       | Orders handoff        |
| Sale Details        | Jesus/Tommy | P1       | Logistics tracking    |
| Material Invoices   | Lisa        | P2       | Billing Bot           |

---

## Next Steps

1. **Update sidebar.jsx** - Add "Materials" collapsible section
2. **Update routes.jsx** - Add all material routes
3. **Create folder structure** - As outlined above
4. **Build screens in order**:
   - Dashboard (overview)
   - Suppliers (master data first)
   - Price List (pricing engine)
   - Quotes (sales flow)
   - Sales (handoff to logistics)
   - Invoices (billing)

Would you like me to start building these screens?
