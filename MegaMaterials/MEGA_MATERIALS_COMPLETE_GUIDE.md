# Mega Materials - Complete Business & Technical Guide
## AXIS 2.0 Platform | Olympian Industries LLC

---

## Table of Contents
1. [Executive Overview](#1-executive-overview)
2. [Business Model](#2-business-model)
3. [The Olympian Family](#3-the-olympian-family)
4. [Complete 8-Phase Lifecycle](#4-complete-8-phase-lifecycle)
5. [AXIS 2.0 Modules](#5-axis-20-modules)
6. [Data Model](#6-data-model)
7. [Status Machine](#7-status-machine)
8. [API Endpoints](#8-api-endpoints)
9. [Customer Segments](#9-customer-segments)
10. [Customer Journey](#10-customer-journey)
11. [Supplier Management](#11-supplier-management)
12. [Inventory Model](#12-inventory-model)
13. [Credit & Payment](#13-credit--payment)
14. [Disputes & Returns](#14-disputes--returns)
15. [Intercompany Money Flow](#15-intercompany-money-flow)
16. [Integration Architecture](#16-integration-architecture)
17. [Build vs Buy Decisions](#17-build-vs-buy-decisions)
18. [RACI Matrix](#18-raci-matrix)
19. [KPIs & Metrics](#19-kpis--metrics)
20. [ROI Projection](#20-roi-projection)
21. [Edge Cases & Exceptions](#21-edge-cases--exceptions)
22. [Development Roadmap](#22-development-roadmap)
23. [Key Contacts](#23-key-contacts)

---

## 1. Executive Overview

**Mega Materials (MM)** is a construction materials brokerage that sources aggregate materials (limestone, sand, concrete, etc.) from suppliers and sells them to contractors, landscapers, and government entities. It operates under **Olympian Industries LLC** alongside two sibling companies.

### The Value Proposition
- **For Customers**: One-stop shop for materials + delivery, transparent pricing, real-time tracking
- **For Suppliers**: Access to broader customer base, guaranteed payment (NET 30)
- **For Olympian**: Margin capture on materials (15-18%) + freight coordination revenue

### Core Flow Summary
```
PROCURE → PRICE → MARKET → SELL → HANDOFF → FULFILL → INVOICE → PAY
```

---

## 2. Business Model

### Asset-Light Brokerage
Mega Materials operates as a **pure brokerage** - we do NOT hold physical inventory.

| What We Do | What We Don't Do |
|------------|------------------|
| Source materials from suppliers | Hold physical inventory |
| Negotiate rates & contracts | Pre-purchase materials |
| Coordinate delivery via ML/MT | Warehouse products |
| Handle customer billing | Own quarries or mines |

### Revenue Streams
1. **Material Margin**: Buy at supplier cost, sell at marked-up price (15-18% margin)
2. **Freight Coordination**: When freight is included, MM pays ML who handles delivery

---

## 3. The Olympian Family

Three companies work together under the AXIS 2.0 platform:

| Company | Role | Color Code |
|---------|------|------------|
| **Mega Materials (MM)** | Sells materials, manages customers | Green |
| **Mega Logistics (ML)** | Coordinates transportation | Blue |
| **Mega Trucking (MT)** | Owns trucks, executes hauling | Purple |

### How They Interact
```
Customer Order (includes freight)
        ↓
    MM records sale
        ↓
    MM → ML (Logistics Bridge creates order)
        ↓
    ML checks MT availability (First Right of Refusal)
        ↓
    ├── MT accepts → MT driver dispatched
    └── MT declines → External carrier via Andrew
        ↓
    Delivery completed → POD captured
        ↓
    MM invoices Customer
    ML invoices MM for freight
```

---

## 4. Complete 8-Phase Lifecycle

### Phase 1: PROCURE (Supplier Negotiations)
**Owner**: Vinnie Bove (VP Sales) | **System**: Cost Manager | **Duration**: 1-2 weeks

**Steps**:
1. Identify potential suppliers (quarries, sand mines, concrete plants, recyclers) within 75-mile radius
2. Vet supplier qualifications:
   - Valid FL business license
   - $1M minimum liability insurance
   - FDOT certification (if applicable)
   - Minimum 500 tons/day capacity
3. Negotiate rates:
   - Base rate per ton
   - Volume discount tiers
   - Price lock periods (typically 90 days)
   - Payment terms (NET 30 standard)
4. Execute contract with documented terms
5. Record in AXIS Cost Manager module

**Data Captured**:
- Supplier ID and contact info
- Material types and specifications (e.g., #57 limestone, concrete sand)
- Negotiated rate per unit (ton, cubic yard, piece)
- Volume discount tiers and thresholds
- Contract effective/expiration dates
- Pickup location coordinates and operating hours

---

### Phase 2: PRICE (AI-Powered Margin Calculation)
**Owner**: AXIS AI + Vinnie Bove | **System**: Pricing Engine | **Duration**: Same day

**Steps**:
1. **Market Analysis**: AXIS Market Intelligence analyzes:
   - Competitor pricing on Planet Build
   - Regional demand patterns
   - Construction permit data
2. **AI Margin Recommendation**: Pricing Engine calculates optimal list price based on:
   - Supplier cost
   - Target margin (15-20%)
   - Market positioning
3. **Human Approval**: Vinnie reviews and approves/adjusts/overrides
4. **Publish Price List**: Approved prices available for quoting and marketplace

**Example Calculation**:
| Component | Value |
|-----------|-------|
| Supplier Cost | $12.50/ton |
| Target Margin | 18% |
| Markup Applied | $2.25/ton |
| **List Price** | **$14.75/ton** |

---

### Phase 3: MARKET (Lead Generation)
**Owner**: Sales Team | **System**: Campaign Builder | **Duration**: Ongoing

**Steps**:
1. Create campaign defining target materials, regions, promotional parameters
2. AI generates SEO-optimized titles, descriptions, pricing displays
3. Publish to Planet Build marketplace via API integration
4. Receive inquiries via webhook → routed to Sales CRM

**Planet Build Integration**:
- Real-time price synchronization
- Automated listing updates
- Inquiry webhook capture
- Order sync capability

---

### Phase 4: SELL (Quoting & Order Capture)
**Owner**: Jesus (Inside Sales) | **System**: Quote Engine | **Duration**: 2-4 hours

**Steps**:
1. **Receive Inquiry**: Customer contacts via phone, email, or Planet Build
2. **Qualify Customer**: Verify info, check credit status, confirm delivery requirements
3. **Generate Quote**: Quote Engine calculates:
   - Material price (Qty × Unit Price)
   - Freight estimate (ML Rate Calculator)
   - Tax (if applicable)
4. **Send Quote**: PDF via email with 7-day validity
5. **Customer Accepts**: Via email, phone, or digital signature
6. **Record Sale**: MaterialSale record created in AXIS

**Quote Components Example**:
| Line Item | Calculation | Amount |
|-----------|-------------|--------|
| Material Total | 500 tons × $14.75 | $7,375 |
| Freight Estimate | 500 tons × $3.50 | $1,750 |
| Tax | Contractor exempt | $0 |
| **Quote Total** | | **$9,125** |

---

### Phase 5: HANDOFF (MM → ML Transfer)
**Owner**: Logistics Bridge (Automated) | **System**: AXIS Automation | **Duration**: Instant

**Trigger**: `includes_freight = true` on MaterialSale record

**Steps**:
1. System checks freight flag
2. LogisticsHandoff record created automatically
3. Data transferred to Mega Logistics via internal API
4. ML confirms acceptance → order enters dispatch queue

**Data Transferred**:
- MM Sale ID (for linking)
- Pickup location (supplier address and contact)
- Delivery location (customer jobsite address)
- Material type and quantity
- Required delivery date/time window
- Special instructions (site access, contact on arrival)
- Billing relationship: **ML bills MM for freight**

---

### Phase 6: FULFILL (Delivery Execution)
**Owner**: Tommy Simpson (Operations) | **System**: Capacity Optimizer | **Duration**: 1-3 days

**Steps**:
1. **Capacity Check**: Query MT fleet availability (date, equipment, region)
2. **First Right of Refusal**: MT gets first opportunity
   - MT accepts → assign to MT driver
   - MT declines → route to Andrew (Brokerage) for external carrier
3. **Dispatch Driver**: Provide pickup instructions, delivery details, customer contact
4. **Load at Supplier**: Driver arrives, loads material, obtains scale ticket
5. **Transit Tracking**: Real-time GPS via Samsara, customer tracking link
6. **Deliver & Capture POD**: Signature + photos via mobile app
7. **Update Status**: DELIVERED syncs back to MM

---

### Phase 7: INVOICE (Customer Billing)
**Owner**: Lisa (Finance/Controller) | **System**: Billing Bot | **Duration**: Same day

**Trigger**: Status = DELIVERED

**Steps**:
1. Delivery confirmation triggers Billing Bot
2. Compile invoice details from quote + actual delivery (scale ticket)
3. Calculate final amount (adjust if qty differs, within tolerance)
4. Attach supporting documents (POD, scale ticket, photos)
5. Email to customer billing contact
6. Sync to QuickBooks for AR tracking

**Invoice Contents**:
- Invoice number and date
- Customer name and billing address
- PO number (if provided)
- Material description and delivered quantity
- Unit price and extended price
- Freight charges (if applicable)
- Tax (if applicable)
- Total amount due
- Payment terms and due date
- Attached POD and scale ticket

---

### Phase 8: PAY (Settlement & Collections)
**Owner**: Lisa (Finance) | **System**: QuickBooks + AXIS | **Duration**: Per terms

**Intercompany Settlement Process**:

**Material Payment Path**:
```
Customer → MM (full invoice) → Supplier (material cost)
                            → MM retains margin (15-18%)
```

**Freight Payment Path**:
```
MM → ML (freight invoice) → MT or External Carrier
                         → ML retains margin (10-15%)
```

**Payment Timeline**:
| From | To | Terms | Method |
|------|-----|-------|--------|
| Customer | MM | NET 30 | ACH, Check, CC |
| MM | Supplier | NET 30 | ACH, Check |
| MM | ML | Weekly batch | Intercompany transfer |
| ML | MT | Weekly batch | Intercompany transfer |
| ML | External Carrier | NET 30 or per contract | ACH, Factoring |

---

## 5. AXIS 2.0 Modules

### New Modules to Build (8)
| Module | Phase | Description |
|--------|-------|-------------|
| **Cost Manager** | 1 | Records supplier contracts, negotiated rates, material costs |
| **Pricing Engine** | 2 | AI-powered margin recommendations based on market |
| **Market Intelligence** | 2 | Competitor analysis, demand forecasting, price benchmarks |
| **Campaign Builder** | 3 | Creates marketing campaigns with AI-generated listings |
| **Planet Build Connector** | 3 | API integration for listings, inquiries, order sync |
| **Quote Engine** | 4 | Auto-generates quotes with material + freight bundled |
| **Sales CRM** | 4 | Customer management, pipeline tracking, order history |
| **Logistics Bridge** | 5 | Automated MM → ML order handoff and status sync |

### Existing Modules to Integrate (4)
| Module | Phase | Description |
|--------|-------|-------------|
| **Capacity Optimizer** | 6 | Routes loads to MT fleet with First Right of Refusal |
| **Visibility Agent** | 6 | Real-time GPS tracking via Samsara integration |
| **Billing Bot** | Settlement | Auto-generates invoices with POD attachments |
| **Customer Portal** | All | Self-service tracking and order management |

---

## 6. Data Model

### Core Entities (6)

#### SupplierContract
```
contract_id      string (PK)
supplier_id      string (FK)
material_type    enum
negotiated_rate  decimal
effective_date   date
volume_tier      json
status           enum
```

#### PriceList
```
price_id         string (PK)
material_type    enum
supplier_cost    decimal
list_price       decimal
region           string
ai_confidence    decimal
```

#### MarketingCampaign
```
campaign_id      string (PK)
name             string
material_types   array
target_region    string
start_date       date
status           enum
```

#### PlanetBuildListing
```
listing_id       string (PK)
pb_external_id   string
campaign_id      string (FK)
title            string
price            decimal
status           enum
```

#### MaterialSale
```
sale_id          string (PK)
customer_id      string (FK)
material_type    enum
quantity         decimal
total_price      decimal
includes_freight boolean    ← KEY FIELD for handoff
status           enum
```

#### LogisticsHandoff
```
handoff_id       string (PK)
mm_sale_id       string (FK)
ml_order_id      string
carrier_type     enum (MT/EXTERNAL)
handoff_status   enum
created_at       datetime
```

---

## 7. Status Machine

### 11-Status Lifecycle
```
NEGOTIATING → CONTRACTED → PRICED → LISTED → QUOTED → SOLD → LOGISTICS → DISPATCHED → DELIVERED → INVOICED → PAID
```

| # | Status | Description | Phase |
|---|--------|-------------|-------|
| 1 | NEGOTIATING | Active supplier discussions | Procurement |
| 2 | CONTRACTED | Agreement signed, rates locked | Procurement |
| 3 | PRICED | AI margin applied, approved | Pricing |
| 4 | LISTED | Published to Planet Build | Marketing |
| 5 | QUOTED | Quote sent to customer | Sales |
| 6 | SOLD | Customer accepted, order recorded | Sales |
| 7 | LOGISTICS | Transferred to ML | Logistics |
| 8 | DISPATCHED | Driver assigned, en route | Fulfillment |
| 9 | DELIVERED | POD captured | Fulfillment |
| 10 | INVOICED | Invoice sent to customer | Settlement |
| 11 | PAID | Payment received, closed | Settlement |

---

## 8. API Endpoints

### Total: 24 Endpoints (8 GET, 14 POST, 2 PUT)

#### Procurement (4)
```
GET  /api/v1/mm/suppliers
POST /api/v1/mm/contracts
PUT  /api/v1/mm/contracts/{id}/rates
GET  /api/v1/mm/costs/{material}
```

#### Pricing (4)
```
GET  /api/v1/mm/market-analysis/{region}
POST /api/v1/mm/pricing/recommend
POST /api/v1/mm/pricing/approve
GET  /api/v1/mm/price-list
```

#### Marketing (4)
```
POST /api/v1/mm/campaigns
POST /api/v1/mm/listings/generate
POST /api/v1/mm/planet-build/publish
GET  /api/v1/mm/planet-build/inquiries
```

#### Sales (4)
```
POST /api/v1/mm/quotes
POST /api/v1/mm/quotes/{id}/accept
POST /api/v1/mm/sales
GET  /api/v1/mm/sales/{id}
```

#### Handoff (4)
```
POST /api/v1/mm/logistics/handoff
GET  /api/v1/ml/orders/{mm_sale_id}
POST /api/v1/ml/orders/{id}/accept
GET  /api/v1/mm/logistics/{sale_id}/status
```

#### Fulfillment (4)
```
POST /api/v1/ml/capacity/check
POST /api/v1/mt/dispatch
GET  /api/v1/tracking/{load_id}
POST /api/v1/billing/invoice
```

---

## 9. Customer Segments

### Primary: General Contractors
- Commercial & residential builders
- $1M - $50M annual revenue
- 5-50 active projects
- **Order Profile**: 200-1,000 tons, weekly, prefers NET 30

### Secondary: Landscapers
- Residential-focused, owner-operated
- $250K - $2M annual revenue
- Small crews
- **Order Profile**: 10-100 tons, 2-4x/month, prefers COD or CC

### Opportunity: Government
- City/county departments, water management districts
- Requires vendor registration
- **Order Profile**: 1,000-10,000 tons, contract-based, purchase orders

---

## 10. Customer Journey

### 6-Step Experience
```
Discovery → Inquiry → Quote → Order → Delivery → Invoice
```

| Step | Action | Touchpoint | SLA |
|------|--------|------------|-----|
| 1. Discovery | Finds us on Planet Build or Google | Marketplace listing | - |
| 2. Inquiry | Submits material request | Form / Phone call | 30 min response |
| 3. Quote | Receives itemized pricing | Quote PDF / Email | 2 hours |
| 4. Order | Accepts, provides PO | Order confirmation | 15 min confirmation |
| 5. Delivery | Tracks & receives material | GPS tracking link | Real-time updates |
| 6. Invoice | Pays per terms | Invoice + POD | Same day |

### Communication Channels
- **Phone**: Primary for urgent orders (6am-6pm M-F, 7am-12pm Sat)
- **Email**: Quotes, confirmations, invoices (orders@megamaterials.com)

---

## 11. Supplier Management

### Onboarding Flow
```
Identify → Vet → Negotiate → Contract → Setup AXIS → Active
```

### Vetting Checklist
| Criteria | Requirement |
|----------|-------------|
| Business License | Valid FL license |
| Insurance | $1M liability minimum |
| Material Quality | FDOT certified (if applicable) |
| Capacity | Min 500 tons/day output |
| Location | Within 75 miles of demand |

### Supplier Categories
| Type | Materials | Notes |
|------|-----------|-------|
| Quarries | Limestone, granite | Large volume capacity |
| Sand Mines | Fill sand, concrete sand | High availability |
| Concrete Plants | Ready-mix concrete | Time-sensitive delivery |
| Recyclers | Recycled concrete | Eco-friendly option |

---

## 12. Inventory Model

### Key Insight: Asset-Light Brokerage
**We do NOT hold inventory.** We sell what suppliers have and coordinate delivery.

| What We Track | Real-Time Checks | What We Don't Do |
|---------------|------------------|------------------|
| Supplier material types | Call supplier for large orders | Hold physical inventory |
| Contracted rates | Confirm before quote | Pre-purchase materials |
| Operating hours | Check delivery feasibility | Warehouse products |
| General availability | | |

**Zero inventory carrying cost** - this is our competitive advantage.

---

## 13. Credit & Payment

### Credit Tiers
| Tier | Limit | Terms | Approval |
|------|-------|-------|----------|
| COD | $0 | Pre-payment | Auto |
| Tier 1 | $5,000 | NET 15 | Sales Mgr |
| Tier 2 | $25,000 | NET 30 | Controller |
| Tier 3 | $100,000 | NET 30 | CFO |
| Enterprise | $100K+ | Custom | CEO |

### Collections Process
| Days Past Due | Action |
|---------------|--------|
| 7 days | Reminder email |
| 15 days | Phone call from AR |
| 30 days | Credit hold |
| 45 days | Demand letter |
| 60 days | Collections / Legal |

---

## 14. Disputes & Returns

### Dispute Types
| Type | Scenario | Resolution |
|------|----------|------------|
| Quality Issue | Material doesn't meet spec | Credit after supplier confirmation, photo documentation required |
| Quantity Dispute | Customer claims short delivery | Compare scale tickets, credit if >5% discrepancy |
| Price Dispute | Invoice doesn't match quote | Pull original quote from AXIS, adjust if error |

### Return Policy
**No Physical Returns** - Due to bulk materials nature, we don't accept physical returns. Once delivered and signed for, title transfers to customer. **Remedy is credit, not return.**

---

## 15. Intercompany Money Flow

### Complete Example ($150 order, $35 freight)

**Material Flow**:
```
Customer pays $150 → Mega Materials
    ├── MM pays Supplier: $100 (material cost)
    └── MM keeps: $15 (15% margin)
    └── $35 goes to freight payment
```

**Freight Flow**:
```
MM pays $35 → Mega Logistics
    ├── ML pays MT or Carrier: $30
    └── ML keeps: $5 (14% margin)
```

**Total Margin Captured**:
- MM: $15 (material) + $0 on freight pass-through
- ML: $5 (freight margin)
- MT: $30 (haul revenue)

---

## 16. Integration Architecture

### System Map
```
        ┌─────────────┐    ┌───────────────┐    ┌─────────┐
        │  Suppliers  │    │  Planet Build │    │  Google │
        │ (Manual/API)│    │ (API+Webhooks)│    │(Email/Cal)│
        └──────┬──────┘    └───────┬───────┘    └────┬────┘
               │                   │                  │
               └───────────────────┼──────────────────┘
                                   ↓
                    ┌──────────────────────────┐
                    │   AXIS 2.0 (MM Hub)      │
                    └──────────────────────────┘
                                   ↓
        ┌──────────────────────────┼──────────────────────────┐
        ↓                          ↓                          ↓
┌───────────────┐        ┌─────────────────┐        ┌───────────────┐
│ Mega Logistics│        │  Mega Trucking  │        │   QuickBooks  │
│ (Internal API)│        │  (Internal API) │        │(Accounting API)│
└───────────────┘        └─────────────────┘        └───────────────┘
                                   ↓
                         ┌─────────────────┐
                         │    Samsara      │
                         │   (ELD API)     │
                         └─────────────────┘
```

---

## 17. Build vs Buy Decisions

| Component | Decision | Solution | Rationale |
|-----------|----------|----------|-----------|
| Core Platform | **BUILD** | AXIS 2.0 | Competitive advantage |
| AI Pricing | **BUILD** | Custom ML | Proprietary logic |
| CRM | **BUILD** | AXIS Module | Tight integration |
| GPS Tracking | **BUY** | Samsara | Already deployed |
| Accounting | **BUY** | QuickBooks | Standard, bank integration |
| Marketplace | **PARTNER** | Planet Build | Existing customer base |

---

## 18. RACI Matrix

**R** = Responsible | **A** = Accountable | **C** = Consulted | **I** = Informed

| Activity | Vinnie | Jesus | Tommy | Andrew | Lisa | AXIS |
|----------|--------|-------|-------|--------|------|------|
| Supplier Negotiation | **A/R** | I | C | I | C | I |
| Pricing Approval | **A** | I | I | I | C | R |
| Customer Sales | **A** | **R** | I | I | I | R |
| ML Order Acceptance | I | **A/R** | C | C | I | R |
| First Right Decision | I | I | **A/R** | C | I | R |
| MT Dispatch | I | I | **A** | I | I | R |
| External Carrier | I | I | C | **A/R** | I | R |
| Invoicing | I | I | I | I | **A** | R |

---

## 19. KPIs & Metrics

### Financial KPIs
| Metric | Target |
|--------|--------|
| Monthly Revenue | $250K (Q2 2025) |
| Gross Margin | 18% blended |
| MT Utilization | 85% (First Right) |
| Quote Conversion | 40% |

### Operational KPIs
| Metric | Target |
|--------|--------|
| Quote Response Time | < 2 hours |
| On-Time Delivery | > 95% |
| Order Accuracy | > 99% |
| Dispute Rate | < 2% |
| DSO (Days Sales Outstanding) | < 35 days |

### Growth KPIs
| Metric | Target |
|--------|--------|
| Active Customers | 50 |
| Active Suppliers | 10 |
| Monthly Orders | 100 |
| Repeat Customer Rate | > 60% |
| NPS Score | > 50 |

---

## 20. ROI Projection

### Investment Required (Year 1)
| Category | Amount |
|----------|--------|
| Development | $150,000 |
| Sales Team | $120,000 |
| Marketing | $50,000 |
| Operations | $30,000 |
| Technology | $25,000 |
| **TOTAL** | **$375,000** |

### Revenue Projection
| Metric | Year 1 | Year 2 |
|--------|--------|--------|
| Monthly Orders (avg) | 50 | 150 |
| Avg Order Size | $5,000 | $6,000 |
| **Gross Revenue** | $3M | $10.8M |
| Gross Margin (18%) | $540K | $1.9M |
| **NET** | **$315K** | **$1.5M** |

### ROI Summary
| Metric | Value |
|--------|-------|
| Payback Period | 10 months |
| Year 1 ROI | 84% |
| Year 2 ROI | 412% |
| 2-Year Net Gain | $1.8M |

---

## 21. Edge Cases & Exceptions

### Will-Call (Customer Pickup)
**Scenario**: Customer picks up material themselves
**Handling**: Set `includes_freight = false`. No ML order created. Customer gets supplier location. Material-only billing.

### Multi-Stop / Split Loads
**Scenario**: Delivery to multiple jobsites
**Handling**: Create child orders per stop. Each stop = separate LogisticsHandoff. POD required at each location.

### Price Dispute Post-Delivery
**Scenario**: Customer challenges invoice
**Handling**: Pull immutable Quote record. Compare line-by-line. Credit if error; explain variance if not. 7-day quote validity.

### Supplier Out of Stock
**Scenario**: Supplier can't fulfill after order
**Handling**: AXIS alerts sales. Auto-search alternative suppliers. Customer approval if price delta. Log for supplier scorecard.

### MT Declines All Loads
**Scenario**: MT fleet at capacity
**Handling**: Auto-route to Brokerage Queue. Andrew finds external carrier. Track MT decline reasons for capacity planning.

### Credit Limit Exceeded
**Scenario**: Order exceeds available credit
**Handling**: AXIS blocks at quote acceptance. Options: COD, increase limit, pay down balance. Controller override available.

### Weather Delay
**Scenario**: Rain/hurricane delays delivery
**Handling**: Force majeure = no penalty. Proactive customer SMS. Reschedule next available window. No freight discount.

### COI / Lien Waiver Request
**Scenario**: Customer requires documentation
**Handling**: Flag in CRM at setup. Auto-generate per order. Attach to invoice. Partial waivers until paid; final after.

---

## 22. Development Roadmap

### Phase 1: MVP (Q1 2025)
**Goal**: First 10 orders end-to-end
- Cost Manager (Supplier contracts & rates)
- Basic Quote Engine (Manual pricing)
- Logistics Bridge (MM → ML handoff)

### Phase 2: Scale (Q2 2025)
**Goal**: 50+ orders/month, 80% automation
- AI Pricing Engine (Auto margin recommendations)
- Planet Build Integration (Listing sync)
- Sales CRM (Customer management)

### Phase 3: Optimize (Q3-Q4 2025)
**Goal**: 200+ orders/month, 95% automation
- Market Intelligence (Competitor tracking)
- Campaign Builder (AI-generated content)
- Customer Portal (Self-service ordering)

---

## 23. Key Contacts

| Role | Name | Responsibility |
|------|------|----------------|
| VP Sales & Marketing | **Vinnie Bove** | Supplier negotiations, pricing approval |
| Customer Experience | **Jesus** | Customer sales, quote follow-up |
| Operations | **Tommy Simpson** | First Right decisions, MT dispatch |
| Brokerage | **Andrew** | External carrier sourcing |
| Finance/Controller | **Lisa** | Credit approval, invoicing, collections |

---

## Quick Reference: Critical Fields

### MaterialSale.includes_freight
This boolean field determines the entire logistics flow:
- `true` → LogisticsHandoff created → ML order → MT/External delivery
- `false` → Will-call (customer pickup) → No logistics handoff

### Status Transitions That Trigger Automation
| Status Change | Trigger |
|---------------|---------|
| SOLD → LOGISTICS | If `includes_freight = true` |
| DELIVERED → INVOICED | Billing Bot auto-generates invoice |
| INVOICED → sync | QuickBooks AR sync |

---

*Document Version: 1.0*
*Last Updated: Generated from CTO Presentation*
*Platform: AXIS 2.0 | Mega Materials | Olympian Industries LLC*
