# AXIS 2.0 Fuel Pricing Module
## A Complete Storytelling Guide

---

## Chapter 1: The Business Challenge

### Meet Mega Trucking Company

Imagine you run **Mega Trucking** with 400+ drivers of different types:

```
MEGA TRUCKING COMPANY
├── Company Drivers (150)     → Your employees, your trucks
├── Owner-Operators (100)     → Own their trucks, contract with you
├── Franchise Drivers (100)   → Work under partner fleets (ABC Fleet, XYZ Transport)
└── Carriers (50)             → External carriers you broker loads to
```

**Every single driver needs fuel. Every day. Across the entire country.**

### The Secret Discount

You've negotiated **confidential discounts** with fuel card platforms:
- **EFS** gives you $0.08 off per gallon
- **Commdata** gives you $0.07 off per gallon
- **Relay** gives you $0.05 off per gallon

**But here's the challenge:**

| Problem | Why It Matters |
|---------|----------------|
| Franchises shouldn't know your secret discount | They might demand the same deal or leave |
| You need to make money on fuel | Fuel margin is a profit center |
| Different drivers deserve different rates | Reward good performers, protect margins on risky ones |
| Carriers get fuel advances | You need to recapture that money |

**This is why you need a sophisticated pricing system.**

---

## Chapter 2: The Pricing Waterfall (3 Levels)

Think of pricing like a waterfall - money flows down through three levels, and each level only sees what's below them.

### Visual Representation

```
┌────────────────────────────────────────────────────────────────┐
│                    LEVEL 1: SUPPLIER COST                       │
│                    ─────────────────────                        │
│                                                                 │
│   Pump Price at Station:        $3.42/gallon                   │
│   - Your Secret Discount:       -$0.08/gallon                  │
│   ═══════════════════════════════════════════                  │
│   YOUR ACTUAL COST:             $3.34/gallon                   │
│                                                                 │
│   WHO SEES THIS?  Only MEGA ADMIN (you!)                       │
│   WHO DOESN'T?    Everyone else - it's your secret             │
└────────────────────────────────────────────────────────────────┘
                              ↓
                        (Hidden from below)
                              ↓
┌────────────────────────────────────────────────────────────────┐
│                    LEVEL 2: FRANCHISE CEILING                   │
│                    ──────────────────────                       │
│                                                                 │
│   Your Actual Cost:             $3.34/gallon                   │
│   + Your Markup to Franchise:   +$0.27/gallon (8%)             │
│   ═══════════════════════════════════════════                  │
│   FRANCHISE PAYS:               $3.61/gallon                   │
│                                                                 │
│   WHO SEES THIS?  Mega Admin + Franchise Admin                 │
│   IMPORTANT:      Franchise thinks $3.61 IS your cost!         │
└────────────────────────────────────────────────────────────────┘
                              ↓
                        (Hidden from below)
                              ↓
┌────────────────────────────────────────────────────────────────┐
│                    LEVEL 3: DRIVER PRICE                        │
│                    ─────────────────────                        │
│                                                                 │
│   Franchise Ceiling:            $3.61/gallon                   │
│   + Franchise Markup:           +$0.11/gallon (3%)             │
│   ═══════════════════════════════════════════                  │
│   DRIVER PAYS:                  $3.72/gallon                   │
│                                                                 │
│   WHO SEES THIS?  Everyone (this is the final price)           │
└────────────────────────────────────────────────────────────────┘
```

### The Magic of Hidden Margins

| Who | What They See | What They DON'T See |
|-----|---------------|---------------------|
| **Driver** | $3.72 (their price) | Everything above |
| **Franchise Admin** | $3.61 (their cost) + $3.72 (driver price) | Mega's $0.08 discount |
| **Mega Admin** | Everything | Nothing hidden |

**Real margin breakdown:**
- Mega's margin: $3.61 - $3.34 = **$0.27/gallon**
- Franchise's margin: $3.72 - $3.61 = **$0.11/gallon**
- Driver sees only: **$3.72/gallon**

---

## Chapter 3: The 8 Pricing Models

You have **8 different ways** to calculate what someone pays for fuel. Each model serves a different business purpose.

### Model 1: Fixed Rate

**Formula:** Driver always pays the same price, regardless of pump price.

```
EXAMPLE: Fixed Rate = $3.25/gallon

Pump Price Today:     $3.42
Driver Pays:          $3.25  (always!)

Pump Price Tomorrow:  $3.89
Driver Pays:          $3.25  (still the same!)
```

**Best For:** Drivers who want predictable budgeting, special negotiated deals.

---

### Model 2: Pump Discount (Flat)

**Formula:** Pump Price - Fixed Dollar Amount

```
EXAMPLE: Pump Discount = $0.15/gallon

Pump Price:           $3.42
- Discount:           $0.15
═══════════════════════════
Driver Pays:          $3.27/gallon
```

**Best For:** Standard fuel programs, simple to understand.

---

### Model 3: Pump Discount (Percentage)

**Formula:** Pump Price - Percentage of Pump Price

```
EXAMPLE: Pump Discount = 3%

Pump Price:           $3.42
- 3% of $3.42:        $0.10
═══════════════════════════
Driver Pays:          $3.32/gallon
```

**Best For:** Volume relationships where discount scales with prices.

---

### Model 4: Per-Mile

**Formula:** Driver gets fuel allowance based on dispatched miles.

```
EXAMPLE: $0.52 per dispatched mile

Load Distance:        500 miles
Fuel Allowance:       500 × $0.52 = $260.00

Driver pumps $280 worth of fuel
Driver owes:          $280 - $260 = $20.00
```

**Best For:** Performance-based compensation, Owner-Operators.

---

### Model 5: Cost-Plus (Flat)

**Formula:** Your Actual Cost + Fixed Dollar Markup

```
EXAMPLE: Cost + $0.08/gallon

Pump Price:           $3.42
- Supplier Discount:  $0.08
Your Cost:            $3.34
+ Your Markup:        $0.08
═══════════════════════════
Driver Pays:          $3.42/gallon
```

**Best For:** Protecting fixed margin regardless of price fluctuations.

---

### Model 6: Cost-Plus (Percentage)

**Formula:** Your Actual Cost + Percentage Markup

```
EXAMPLE: Cost + 5%

Pump Price:           $3.42
- Supplier Discount:  $0.08
Your Cost:            $3.34
+ 5% Markup:          $0.17
═══════════════════════════
Driver Pays:          $3.51/gallon
```

**Best For:** Scalable margin that grows with fuel prices.

---

### Model 7: Tiered (By Driver Score)

**Formula:** Cost + Percentage based on driver's performance tier.

```
DRIVER TIERS:
┌──────────┬─────────────┬──────────────┬─────────────┐
│ Tier     │ Score Range │ Rate         │ Example     │
├──────────┼─────────────┼──────────────┼─────────────┤
│ Platinum │ 90-100      │ Cost + 3%    │ $3.44/gal   │
│ Gold     │ 80-89       │ Cost + 5%    │ $3.51/gal   │
│ Silver   │ 70-79       │ Cost + 7%    │ $3.57/gal   │
│ Bronze   │ 0-69        │ Cost + 10%   │ $3.67/gal   │
└──────────┴─────────────┴──────────────┴─────────────┘

EXAMPLE: Gold Tier Driver (Score: 84)

Your Cost:            $3.34
+ Gold Markup (5%):   $0.17
═══════════════════════════
Driver Pays:          $3.51/gallon
```

**Best For:** Incentivizing good performance, rewarding safe drivers.

---

### Model 8: Custom

**Formula:** Whatever you negotiate - completely flexible.

```
EXAMPLE: Special deal for top carrier

Agreement: Fixed $3.20/gal for first 10,000 gallons/month
           Then Pump - $0.20 for remaining
```

**Best For:** Special relationships, high-volume deals, unique situations.

---

## Chapter 4: The Driver Tier System (Deep Dive)

### How Scores Are Calculated

Every **Sunday at midnight**, the system recalculates every driver's score.

```
SCORE COMPONENTS:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   SAFETY (40% of score)                                     │
│   ─────────────────────                                     │
│   • HOS Violations (Hours of Service)                       │
│   • Hard Braking Events                                     │
│   • Speeding Incidents                                      │
│   • Accident History                                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   FUEL EFFICIENCY (25% of score)                            │
│   ──────────────────────────────                            │
│   • MPG compared to fleet average                           │
│   • Idle Time percentage                                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   RELIABILITY (20% of score)                                │
│   ──────────────────────────                                │
│   • On-Time Delivery percentage                             │
│   • Load Acceptance Rate                                    │
│   • Customer Complaints count                               │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   TENURE (15% of score)                                     │
│   ─────────────────────                                     │
│   • Months with company                                     │
│   • Consistency (no tier drops in 6 months = +5 bonus)      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Tenure Scoring Table

| Time with Company | Base Score |
|-------------------|------------|
| 0-6 months | 60 |
| 6-12 months | 70 |
| 12-24 months | 85 |
| 24-36 months | 95 |
| 36+ months | 100 |
| + Consistency Bonus | +5 (if no tier drop in 6 months) |

### Example Score Calculation

**Driver: Miguel Rodriguez**

```
MIGUEL'S METRICS (Past 30 Days):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Safety Score: 88/100
├── HOS Violations: 0 (excellent)
├── Hard Braking: 2 events (minor)
├── Speeding: 1 incident (minor)
└── Accidents: 0 (excellent)

Fuel Efficiency Score: 75/100
├── MPG: 6.5 (fleet avg: 6.8)
└── Idle Time: 12% (acceptable)

Reliability Score: 92/100
├── On-Time: 96%
├── Load Acceptance: 94%
└── Complaints: 0

Tenure Score: 85/100
├── With company: 18 months
└── No tier drops: Yes (+5 bonus)

FINAL CALCULATION:
━━━━━━━━━━━━━━━━━
(88 × 0.40) + (75 × 0.25) + (92 × 0.20) + (85 × 0.15)
= 35.2 + 18.75 + 18.4 + 12.75
= 85.1

MIGUEL'S SCORE: 85.1 → GOLD TIER (Cost + 5%)
```

### Annual Savings Comparison

| Tier | Rate | Price/Gal | Annual Cost (30,000 gal) | vs Bronze |
|------|------|-----------|--------------------------|-----------|
| Platinum | Cost + 3% | $3.44 | $103,200 | **Save $6,900** |
| Gold | Cost + 5% | $3.51 | $105,300 | **Save $4,800** |
| Silver | Cost + 7% | $3.57 | $107,100 | **Save $3,000** |
| Bronze | Cost + 10% | $3.67 | $110,100 | Baseline |

---

## Chapter 5: A Complete Transaction Story

Let's follow one fuel transaction from pump to settlement.

### The Setup

**Driver:** Miguel Rodriguez (Gold Tier, Score: 85.1)
**Truck:** Unit #4521
**Entity Type:** Company Driver
**Platform:** EFS
**Pricing Model:** Tiered by Score

### Step 1: Miguel Arrives at Pilot Station #4521

```
LOCATION: Pilot Travel Center #4521, Dallas TX
TIME: Tuesday, 2:34 PM
NETWORK: In-Network (EFS partner)
```

### Step 2: Card Swipe & Authorization

```
Miguel swipes his EFS fuel card...

AUTHORIZATION CHECK:
┌─────────────────────────────────────┐
│ Card Status:        ✓ Active        │
│ Daily Limit:        $500 remaining  │
│ Product Approved:   ✓ Diesel        │
│ Network:            ✓ In-Network    │
│ Result:             APPROVED        │
└─────────────────────────────────────┘
```

### Step 3: Fueling Complete

```
TRANSACTION DETAILS:
━━━━━━━━━━━━━━━━━━━━
Product:          Diesel
Gallons:          127.4
Pump Price:       $3.42/gallon
Pump Total:       $435.71
Odometer:         847,234 miles
Timestamp:        2024-12-17 14:47:23
```

### Step 4: AXIS Syncs Transaction (Within 15 Minutes)

```
AXIS pulls transaction from EFS API...

RAW DATA RECEIVED:
{
  "transaction_id": "EFS-2024-12-17-4521-001",
  "card_number": "****0012",
  "location": "Pilot #4521, Dallas TX",
  "timestamp": "2024-12-17T14:47:23Z",
  "gallons": 127.4,
  "pump_price": 3.42,
  "product": "DIESEL",
  "odometer": 847234
}
```

### Step 5: Pricing Calculation Kicks In

```
STEP 5A: LOOKUP SUPPLIER DISCOUNT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Platform:       EFS
Network Tier:   In-Network
Product:        Diesel
Discount Found: $0.08/gallon

STEP 5B: CALCULATE OUR COST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pump Price:           $3.42/gal
- Supplier Discount:  $0.08/gal
═══════════════════════════════
Our Cost:             $3.34/gal
Total Our Cost:       $3.34 × 127.4 = $425.52

STEP 5C: LOOKUP DRIVER'S PRICING MODEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Driver:         Miguel Rodriguez
Entity Type:    Company Driver
Pricing Model:  Tiered by Score
Current Tier:   Gold (Score: 85.1)
Rate:           Cost + 5%

STEP 5D: APPLY PRICING FORMULA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Our Cost:             $3.34/gal
× Gold Markup:        1.05 (5%)
═══════════════════════════════
Driver Price:         $3.51/gal
Total Driver Charge:  $3.51 × 127.4 = $447.17

STEP 5E: CALCULATE MARGIN
━━━━━━━━━━━━━━━━━━━━━━━━
Driver Price:         $3.51/gal
- Our Cost:           $3.34/gal
═══════════════════════════════
Margin:               $0.17/gal (5.1%)
Total Margin:         $0.17 × 127.4 = $21.66
```

### Step 6: Data Stored in AXIS

```
FUEL_TRANSACTIONS TABLE:
┌────────────────────────────────────────────────────────┐
│ transaction_id:           TXN-2024-12-17-001          │
│ card_id:                  CARD-4521                   │
│ platform_transaction_id:  EFS-2024-12-17-4521-001     │
│ timestamp:                2024-12-17 14:47:23         │
│ location_name:            Pilot #4521, Dallas TX      │
│ gallons:                  127.4                       │
│ pump_price_per_gallon:    $3.42                       │
│ our_cost_per_gallon:      $3.34 (HIDDEN)              │
│ driver_price_per_gallon:  $3.51                       │
│ total_pump_amount:        $435.71                     │
│ total_our_cost:           $425.52 (HIDDEN)            │
│ total_driver_charge:      $447.17                     │
│ fuel_type:                Diesel                      │
│ odometer_reading:         847,234                     │
│ pricing_tier_at_txn:      Gold                        │
│ driver_score_at_txn:      85.1                        │
└────────────────────────────────────────────────────────┘
```

### Step 7: What Each Person Sees

```
MIGUEL (Driver App):
┌─────────────────────────────────────┐
│ Fuel Purchase                       │
│ Pilot #4521, Dallas TX              │
│ Dec 17, 2024 at 2:47 PM             │
│                                     │
│ Diesel:     127.4 gallons           │
│ Your Price: $3.51/gal               │
│ Total:      $447.17                 │
│                                     │
│ Your Tier:  Gold ⭐                 │
└─────────────────────────────────────┘

FLEET MANAGER (AXIS Dashboard):
┌─────────────────────────────────────────────────────┐
│ Transaction: Miguel Rodriguez - Unit #4521          │
│                                                     │
│ Pump Price:    $3.42    │ Driver Price:  $3.51     │
│ Gallons:       127.4    │ Driver Total:  $447.17   │
│ Tier:          Gold     │ Margin:        $21.66    │
│                                                     │
│ ⚠️ Our Cost: [HIDDEN - Admin Only]                 │
└─────────────────────────────────────────────────────┘

MEGA ADMIN (Full View):
┌─────────────────────────────────────────────────────┐
│ Transaction: Miguel Rodriguez - Unit #4521          │
│                                                     │
│ Pump Price:         $3.42/gal                       │
│ Supplier Discount:  -$0.08/gal                      │
│ Our Cost:           $3.34/gal    Total: $425.52    │
│ Driver Price:       $3.51/gal    Total: $447.17    │
│ Margin:             $0.17/gal    Total: $21.66     │
│                                                     │
│ Margin %:           5.1%                            │
└─────────────────────────────────────────────────────┘
```

### Step 8: Settlement (End of Pay Period)

```
MIGUEL'S PAY STUB (Bi-Weekly):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Gross Pay:                    $2,847.00

Deductions:
├── Federal Tax:              -$342.00
├── State Tax:                -$128.00
├── Health Insurance:         -$185.00
├── Fuel - Diesel:            -$892.34  ← 5 transactions
└── Fuel - DEF:               -$47.22

Net Pay:                      $1,252.44
```

---

## Chapter 6: Franchise Pricing (The Hidden Layer)

### The Franchise Relationship

**ABC Fleet** is a franchise partner of Mega Trucking. They have 25 drivers.

```
RELATIONSHIP STRUCTURE:
┌─────────────────────────────────────────────────────┐
│                  MEGA TRUCKING                       │
│                  (You - The Parent)                  │
│                                                      │
│   Your Secret Cost: $3.34/gallon                    │
│   Your Margin Goal: 8% above cost                   │
│                                                      │
└─────────────────────────┬───────────────────────────┘
                          │
                          │ Ceiling: Cost + 8%
                          │ ($3.34 × 1.08 = $3.61)
                          ↓
┌─────────────────────────────────────────────────────┐
│                    ABC FLEET                         │
│                  (Franchise Partner)                 │
│                                                      │
│   Their Cost (Ceiling): $3.61/gallon                │
│   They THINK this is Mega's cost!                   │
│   Their Margin Goal: 3% above their cost            │
│                                                      │
└─────────────────────────┬───────────────────────────┘
                          │
                          │ Rate: Ceiling + 3%
                          │ ($3.61 × 1.03 = $3.72)
                          ↓
┌─────────────────────────────────────────────────────┐
│               ABC FLEET DRIVERS (25)                 │
│                                                      │
│   Driver Price: $3.72/gallon                        │
│   They only see this final price                    │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### What ABC Fleet Admin Sees

```
ABC FLEET PORTAL:
┌─────────────────────────────────────────────────────┐
│                                                     │
│   Your Fuel Program                                 │
│   ─────────────────                                 │
│                                                     │
│   Your Cost Rate:     Cost + 8%                     │
│   Approx. Today:      $3.61/gallon                  │
│                                                     │
│   Your Driver Rate:   Cost + 11%                    │
│   Approx. Today:      $3.72/gallon                  │
│                                                     │
│   Your Margin:        ~$0.11/gallon (3%)            │
│                                                     │
│   ┌─────────────────────────────────────────────┐   │
│   │ ⚠️ Note: "Cost" refers to the base fuel     │   │
│   │ rate provided by Mega Trucking. Actual      │   │
│   │ prices vary by location and market.         │   │
│   └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘

WHAT ABC FLEET CANNOT SEE:
• Mega's supplier discount ($0.08)
• Mega's actual cost ($3.34)
• Mega's margin on them ($0.27)
```

### Franchise Pricing Validation

```
SCENARIO: ABC Fleet tries to set driver rate below ceiling

ABC Fleet Admin sets: "Cost + 6%"
System calculates: Their ceiling is Cost + 8%

┌─────────────────────────────────────────────────────┐
│                    ❌ REJECTED                       │
│                                                     │
│   Your driver rate (Cost + 6%) cannot be below     │
│   your assigned ceiling (Cost + 8%).               │
│                                                     │
│   Minimum allowed: Cost + 8%                        │
│   You entered:     Cost + 6%                        │
│                                                     │
│   Please set a rate at or above Cost + 8%.         │
│                                                     │
└─────────────────────────────────────────────────────┘

SCENARIO: ABC Fleet sets acceptable rate

ABC Fleet Admin sets: "Cost + 11%"

┌─────────────────────────────────────────────────────┐
│                    ✓ ACCEPTED                       │
│                                                     │
│   Your driver rate has been updated.               │
│                                                     │
│   New Rate:         Cost + 11%                     │
│   Your Ceiling:     Cost + 8%                      │
│   Your Margin:      3%                             │
│                                                     │
│   Changes take effect on next transaction.         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Franchise Transaction Waterfall (4 Price Points)

```
FRANCHISE DRIVER TRANSACTION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Driver: John (ABC Fleet)
Gallons: 100

PRICE POINT 1: Pump Price
├── $3.42/gallon (what's posted at station)
├── Visible to: Everyone
└── Total: $342.00

PRICE POINT 2: Mega's Cost (SECRET)
├── $3.42 - $0.08 = $3.34/gallon
├── Visible to: Mega Admin ONLY
└── Total: $334.00

PRICE POINT 3: Franchise Ceiling (ABC Fleet's Cost)
├── $3.34 × 1.08 = $3.61/gallon
├── Visible to: Mega Admin + ABC Fleet Admin
└── Total: $361.00

PRICE POINT 4: Driver Price (Final)
├── $3.34 × 1.11 = $3.71/gallon
├── Visible to: Everyone
└── Total: $371.00

MARGIN BREAKDOWN:
━━━━━━━━━━━━━━━━
Mega's Margin:      $361 - $334 = $27.00 ($0.27/gal)
ABC Fleet's Margin: $371 - $361 = $10.00 ($0.10/gal)
Driver Pays:        $371.00
```

---

## Chapter 7: Entity Type Summary

### Pricing Model by Entity Type

| Entity Type | Platform | Default Pricing Model | Settlement Method |
|-------------|----------|----------------------|-------------------|
| **Company Driver** | EFS | Tiered by Score (Bronze start) | Payroll Deduction |
| **Owner-Operator** | EFS | O/O Standard Rate | Settlement Deduction |
| **Franchise Driver** | Commdata | Franchise's Assigned Ceiling | Weekly Invoice |
| **Carrier (Brokerage)** | Relay | Carrier Fuel Advance Rate | Load Recapture |

### Settlement Examples

```
COMPANY DRIVER (Payroll Deduction):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bi-weekly fuel charges: $892.34
Deducted from paycheck automatically

OWNER-OPERATOR (Settlement Deduction):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Load Settlement:     $3,200.00
- Fuel Charges:      $1,247.89
- Insurance:         $125.00
= Net Payment:       $1,827.11

FRANCHISE (Weekly Invoice):
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Invoice to ABC Fleet:
25 drivers × avg 4 transactions × $350
= $35,000/week (Net 7 payment terms)

CARRIER (Advance Recapture):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Fuel Advance Given:  $500.00
Load Payment Due:    $2,800.00
- Advance Recapture: $500.00
- Advance Fee (2%):  $10.00
= Carrier Receives:  $2,290.00
```

---

## Chapter 8: Key Rules & Constraints

### Pricing Validation Rules

| Rule | Description | If Violated |
|------|-------------|-------------|
| **Ceiling Minimum** | Franchise rate must be ≥ ceiling | Rejected, error shown |
| **Tier Thresholds** | Tier changes only on Sunday recalc | Changes wait until Sunday |
| **Model Changes** | Pricing model changes = next transaction | Previous transactions unchanged |
| **Discount Priority** | In-network discount > Out-of-network | Lower discount applied if out-of-network |

### Visibility Rules (Who Sees What)

```
VISIBILITY MATRIX:
┌──────────────────────┬────────────┬──────────────┬────────┐
│ Data Point           │ Mega Admin │ Franchise    │ Driver │
├──────────────────────┼────────────┼──────────────┼────────┤
│ Supplier Discount    │ ✓ Yes      │ ✗ No         │ ✗ No   │
│ Our Actual Cost      │ ✓ Yes      │ ✗ No         │ ✗ No   │
│ Franchise Ceiling    │ ✓ Yes      │ ✓ Yes        │ ✗ No   │
│ Driver Price         │ ✓ Yes      │ ✓ Yes        │ ✓ Yes  │
│ Margin Amount        │ ✓ Yes      │ Own only     │ ✗ No   │
│ Driver Score         │ ✓ Yes      │ ✗ No         │ ✓ Own  │
│ Tier Level           │ ✓ Yes      │ ✗ No         │ ✓ Own  │
└──────────────────────┴────────────┴──────────────┴────────┘
```

---

## Chapter 9: Quick Reference

### Pricing Models at a Glance

| # | Model | Formula | Example (Cost=$3.34) |
|---|-------|---------|---------------------|
| 1 | Fixed Rate | Static price | $3.25 always |
| 2 | Pump Discount (Flat) | Pump - $X | $3.42 - $0.15 = $3.27 |
| 3 | Pump Discount (%) | Pump - X% | $3.42 - 3% = $3.32 |
| 4 | Per-Mile | $/mile allowance | $0.52/mile |
| 5 | Cost-Plus (Flat) | Cost + $X | $3.34 + $0.08 = $3.42 |
| 6 | Cost-Plus (%) | Cost + X% | $3.34 + 5% = $3.51 |
| 7 | Tiered (Score) | Cost + tier% | Gold: $3.34 + 5% = $3.51 |
| 8 | Custom | Negotiated | Per agreement |

### Tier Summary

| Tier | Score | Rate | Approx. Price |
|------|-------|------|---------------|
| Platinum | 90-100 | Cost + 3% | $3.44 |
| Gold | 80-89 | Cost + 5% | $3.51 |
| Silver | 70-79 | Cost + 7% | $3.57 |
| Bronze | 0-69 | Cost + 10% | $3.67 |

### Score Components

| Component | Weight | Measures |
|-----------|--------|----------|
| Safety | 40% | HOS, braking, speeding, accidents |
| Fuel Efficiency | 25% | MPG, idle time |
| Reliability | 20% | On-time, acceptance, complaints |
| Tenure | 15% | Months + consistency bonus |

---

## End of Guide

This document explains the AXIS 2.0 Fuel Pricing Module in plain language with real-world examples. For technical implementation details, refer to the original `fuel_doc.md` specification.

**Document Version:** 1.0
**Last Updated:** December 2024
