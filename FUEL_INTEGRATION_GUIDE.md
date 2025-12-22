# AXIS 2.0 - Fuel Integration Module
## Complete Implementation Guide

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [The Business Problem](#2-the-business-problem)
3. [Entity Types & Platforms](#3-entity-types--platforms)
4. [The Pricing Waterfall](#4-the-pricing-waterfall)
5. [8 Pricing Models](#5-8-pricing-models)
6. [Driver Score & Tier System](#6-driver-score--tier-system)
7. [Process Flows](#7-process-flows)
   - 7.1 Card Provisioning
   - 7.2 Fuel Transaction
   - 7.3 Pricing Calculation
   - 7.4 Fuel Stop Recommendation
   - 7.5 Settlement & Billing
   - 7.6 Card Suspension
   - 7.7 Franchise Pricing
   - 7.8 Tier Recalculation
8. [UI Screens & Wireframes](#8-ui-screens--wireframes)
9. [Card Controls](#9-card-controls)
10. [Fraud Detection](#10-fraud-detection)
11. [Data Models](#11-data-models)
12. [Integration Points](#12-integration-points)
13. [Technical Requirements](#13-technical-requirements)
14. [Implementation Checklist](#14-implementation-checklist)

---

## 1. Executive Summary

### What is the Fuel Integration Module?

The Fuel Integration Module is the **central hub** for all fuel-related operations within AXIS 2.0. It connects with major fuel card platforms to:

- Issue fuel cards automatically when drivers onboard
- Apply negotiated discounts (hidden from downstream users)
- Calculate pricing based on flexible models
- Recommend optimal fuel stops
- Process settlements/billing for all entity types
- Detect and prevent fraud in real-time

### Key Capabilities at a Glance

| Capability | Description |
|------------|-------------|
| Multi-Platform Integration | EFS, Commdata, Relay APIs |
| Automated Card Provisioning | Triggered by driver onboarding |
| 8 Flexible Pricing Models | From fixed rates to performance-based tiers |
| Smart Fuel Optimization | Route-aware fuel stop recommendations |
| Confidential Pricing Waterfall | Protects supplier costs from downstream |
| Automated Settlement | Payroll, invoicing, load recapture |
| Real-Time Fraud Detection | Out-of-route, velocity, volume checks |

---

## 2. The Business Problem

### The Challenge

A trucking company operates with multiple types of drivers and partners:

```
┌─────────────────────────────────────────────────────────────────┐
│                     TRUCKING OPERATION                          │
├─────────────────────────────────────────────────────────────────┤
│  Company Drivers    → Direct employees, company trucks          │
│  Owner-Operators    → Own their trucks, contract with you       │
│  Franchise Drivers  → Work under partner fleets                 │
│  Carriers           → External carriers you broker loads to     │
└─────────────────────────────────────────────────────────────────┘
```

**Each one needs fuel. Every day. Across the country.**

### The Problems to Solve

1. **Different platforms** - Some work better with EFS, others with Commdata or Relay
2. **Different pricing** - Good drivers should get better rates than new ones
3. **Hidden margins** - Your negotiated discounts should stay secret
4. **Manual card issuance** - Slow, error-prone, delays driver readiness
5. **Fuel theft/fraud** - Hard to detect without real-time monitoring
6. **Settlement complexity** - Each entity type settles differently
7. **Missed savings** - Drivers fuel at expensive stations

### The Solution

The Fuel Integration Module automates and optimizes **every aspect** of fuel management.

---

## 3. Entity Types & Platforms

### Entity Routing Matrix

| Entity Type | Fuel Platform | Pricing Model | Settlement Method |
|-------------|---------------|---------------|-------------------|
| **Company Driver** | EFS | Tiered by Score | Payroll Deduction |
| **Owner-Operator** | EFS | O/O Standard Rate | Settlement Deduction |
| **Franchise Driver** | Commdata | Franchise Rate | Weekly Invoice |
| **Carrier (Brokerage)** | Relay | Advance Rate | Load Recapture |

### Platform Details

#### EFS (Company Drivers & Owner-Operators)
- Primary platform for direct fleet operations
- Transaction sync: Every 15 minutes
- Integration: REST API + Webhooks
- Best for: High-volume, nationwide coverage

#### Commdata (Franchise Fleets)
- Preferred for franchise partner relationships
- Transaction sync: Every 15 minutes
- Integration: REST API + Webhooks
- Best for: Multi-fleet management

#### Relay (Brokerage Carriers)
- Specialized for fuel advances to carriers
- Transaction sync: Real-time
- Integration: REST API
- Best for: Load-based fuel advance and recapture

### Visual Flow

```
                    ┌─────────────────┐
                    │  DRIVER TYPE    │
                    │  DETERMINED     │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│    EFS        │   │   COMMDATA    │   │    RELAY      │
│               │   │               │   │               │
│ • Company     │   │ • Franchise   │   │ • Carrier     │
│ • Owner-Op    │   │   Drivers     │   │   (Brokerage) │
└───────────────┘   └───────────────┘   └───────────────┘
```

---

## 4. The Pricing Waterfall

### The Concept

The pricing system uses a **3-level waterfall** that maintains confidentiality at each tier. This is the **core business logic** that protects margins.

### The Three Levels

```
┌─────────────────────────────────────────────────────────────────┐
│ LEVEL 1: SUPPLIER COST                                          │
│ ─────────────────────                                           │
│ Your negotiated discount with fuel platforms                    │
│ Visibility: MEGA ADMIN ONLY                                     │
│ Example: Pump $3.42 - Discount $0.08 = $3.34 actual cost        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ LEVEL 2: MEGA BASE PRICE (Franchise Ceiling)                    │
│ ────────────────────────────────────────────                    │
│ What Mega charges franchises (their cost basis)                 │
│ Visibility: MEGA ADMIN + FRANCHISE ADMIN                        │
│ Example: Cost $3.34 + 8% markup = $3.61                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ LEVEL 3: ENTITY PRICE (What Driver Pays)                        │
│ ────────────────────────────────────────                        │
│ The final price charged to the driver/carrier                   │
│ Visibility: ALL PARTIES                                         │
│ Example: Franchise ceiling $3.61 + 3% = $3.72                  │
└─────────────────────────────────────────────────────────────────┘
```

### Visibility Matrix

| Price Point | Mega Admin | Franchise Admin | Driver |
|-------------|:----------:|:---------------:|:------:|
| Supplier Discount | ✅ | ❌ | ❌ |
| Our Cost (Level 1) | ✅ | ❌ | ❌ |
| Franchise Ceiling (Level 2) | ✅ | ✅ | ❌ |
| Driver Price (Level 3) | ✅ | ✅ | ✅ |

### Real-World Example

```
TRANSACTION: 127 gallons at Pilot #4521

┌──────────────────────────────────────────────────────────────┐
│ PUMP PRICE (displayed at station)           $3.42/gal       │
├──────────────────────────────────────────────────────────────┤
│ - Supplier Discount (secret)               -$0.08/gal       │
│ ═══════════════════════════════════════════════════════════ │
│ = MEGA'S COST (hidden)                      $3.34/gal       │
├──────────────────────────────────────────────────────────────┤
│ + Mega Markup (8%)                         +$0.27/gal       │
│ ═══════════════════════════════════════════════════════════ │
│ = FRANCHISE CEILING                         $3.61/gal       │
├──────────────────────────────────────────────────────────────┤
│ + Franchise Markup (3%)                    +$0.11/gal       │
│ ═══════════════════════════════════════════════════════════ │
│ = DRIVER PRICE (final)                      $3.72/gal       │
└──────────────────────────────────────────────────────────────┘

REVENUE BREAKDOWN (127 gallons):
• Mega earns:      $0.27 × 127 = $34.29
• Franchise earns: $0.11 × 127 = $13.97
• Driver pays:     $3.72 × 127 = $472.44
```

---

## 5. 8 Pricing Models

The system supports **8 flexible pricing models** to handle any business relationship.

### Model Overview

| # | Model | Formula | Example | Best For |
|---|-------|---------|---------|----------|
| 1 | Fixed Rate | Static $/gal | $3.25/gal | Predictable budgeting |
| 2 | Pump Discount (Flat) | Pump - fixed amount | Pump - $0.15 | Standard programs |
| 3 | Pump Discount (%) | Pump - percentage | Pump - 3% | Volume relationships |
| 4 | Per-Mile | $/dispatched mile | $0.52/mile | Performance-based |
| 5 | Cost-Plus (Flat) | Our cost + fixed | Cost + $0.08 | Margin protection |
| 6 | Cost-Plus (%) | Our cost + % | Cost + 5% | Scalable margin |
| 7 | Tiered (Score) | Varies by driver score | Platinum: +3% | Incentivize performance |
| 8 | Custom | Entity-specific | Per agreement | Special relationships |

### Detailed Model Explanations

#### Model 1: Fixed Rate
```
Driver always pays the same rate regardless of pump price.

Example:
  Pump Price: $3.42/gal
  Fixed Rate: $3.25/gal
  Driver Pays: $3.25/gal ← Same even if pump was $4.00

Use Case: Budget-conscious fleets wanting predictable fuel costs
```

#### Model 2: Pump Discount (Flat)
```
Subtract a fixed amount from the pump price.

Example:
  Pump Price: $3.42/gal
  Discount:   $0.15/gal
  Driver Pays: $3.27/gal

Use Case: Simple discount programs, easy to understand
```

#### Model 3: Pump Discount (Percentage)
```
Subtract a percentage from the pump price.

Example:
  Pump Price: $3.42/gal
  Discount:   3%
  Driver Pays: $3.42 × 0.97 = $3.32/gal

Use Case: Scales with fuel prices automatically
```

#### Model 4: Per-Mile
```
Charge based on dispatched miles, not gallons.

Example:
  Dispatched Miles: 500
  Rate: $0.52/mile
  Fuel Allowance: $260 (regardless of actual consumption)

Use Case: Rewards fuel-efficient driving, predictable costs
```

#### Model 5: Cost-Plus (Flat)
```
Your actual cost plus a fixed markup.

Example:
  Our Cost:  $3.34/gal
  Markup:    $0.08/gal
  Driver Pays: $3.42/gal

Use Case: Guaranteed margin per gallon
```

#### Model 6: Cost-Plus (Percentage)
```
Your actual cost plus a percentage markup.

Example:
  Our Cost:  $3.34/gal
  Markup:    5%
  Driver Pays: $3.34 × 1.05 = $3.51/gal

Use Case: Margin scales with fuel costs
```

#### Model 7: Tiered by Score (Most Complex)
```
Driver's rate depends on their performance tier.

Tiers:
  Platinum (90-100): Cost + 3%  → $3.34 × 1.03 = $3.44/gal
  Gold (80-89):      Cost + 5%  → $3.34 × 1.05 = $3.51/gal
  Silver (70-79):    Cost + 7%  → $3.34 × 1.07 = $3.57/gal
  Bronze (0-69):     Cost + 10% → $3.34 × 1.10 = $3.67/gal

Use Case: Incentivize safety, efficiency, reliability
```

#### Model 8: Custom
```
Any special arrangement negotiated individually.

Examples:
  - Flat $3.00/gal for first 1000 gallons, then pump - $0.10
  - Cost + 4% with $0.02 rebate per 100 gallons
  - Seasonal rates (summer vs winter)

Use Case: VIP relationships, special contracts
```

---

## 6. Driver Score & Tier System

### How Scores Are Calculated

Scores are recalculated **every Sunday at midnight**. The score is a weighted average of 4 components:

```
┌─────────────────────────────────────────────────────────────┐
│                    DRIVER SCORE FORMULA                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Score = (Safety × 0.40)                                   │
│         + (Fuel Efficiency × 0.25)                          │
│         + (Reliability × 0.20)                              │
│         + (Tenure × 0.15)                                   │
│                                                             │
│   Result: 0-100 scale                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Score Components Breakdown

#### Safety Score (40% weight)
| Factor | What It Measures | Impact |
|--------|------------------|--------|
| HOS Violations | Hours of service compliance | High negative |
| Hard Braking Events | Aggressive driving detection | Medium negative |
| Speeding Incidents | Speed limit compliance | Medium negative |
| Accidents | Collision history | Very high negative |

#### Fuel Efficiency Score (25% weight)
| Factor | What It Measures | Impact |
|--------|------------------|--------|
| MPG vs Fleet Average | Fuel economy comparison | Primary factor |
| Idle Time | Engine idling percentage | Secondary factor |

#### Reliability Score (20% weight)
| Factor | What It Measures | Impact |
|--------|------------------|--------|
| On-Time Delivery % | Meeting delivery windows | Primary factor |
| Load Acceptance Rate | Taking assigned loads | Secondary factor |
| Customer Complaints | Service quality | Negative factor |

#### Tenure Score (15% weight)
| Months Active | Base Score | Notes |
|---------------|------------|-------|
| 0-6 months | 70 | New driver |
| 6-12 months | 85 | Established |
| 12-24 months | 95 | Veteran |
| 24+ months | 100 | Senior |
| Consistency Bonus | +5 | No tier drops in 6 months |

### Tier Thresholds

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   100 ┤ ████████████████████████████████ PLATINUM (Cost + 3%)  │
│    90 ┤ ════════════════════════════════                       │
│       │ ████████████████████████ GOLD (Cost + 5%)              │
│    80 ┤ ════════════════════════                               │
│       │ ████████████████ SILVER (Cost + 7%)                    │
│    70 ┤ ════════════════                                       │
│       │ ████████ BRONZE (Cost + 10%)                           │
│     0 ┤                                                        │
│       └────────────────────────────────────────────────────────│
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Tier Pricing Comparison

| Tier | Score Range | Rate | Savings vs Bronze | Annual Savings* |
|------|-------------|------|-------------------|-----------------|
| **Platinum** | 90-100 | Cost + 3% | 7% better | ~$2,100 |
| **Gold** | 80-89 | Cost + 5% | 5% better | ~$1,500 |
| **Silver** | 70-79 | Cost + 7% | 3% better | ~$900 |
| **Bronze** | 0-69 | Cost + 10% | Baseline | $0 |

*Assuming 30,000 gallons/year at $3.50 average

### New Driver Journey

```
Day 1:   Driver onboards → Automatically assigned BRONZE tier
Week 4:  First score calculation (limited data, likely stays Bronze)
Week 8:  More data available, may move to Silver if performing well
Week 12: Full history, accurate tier placement
Ongoing: Weekly recalculation every Sunday
```

---

## 7. Process Flows

### 7.1 Card Provisioning Flow

**Purpose:** Automatically issue fuel cards when drivers complete onboarding.

**Timeline:** 5-10 business days from onboarding start to card active

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CARD PROVISIONING FLOW                          │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   STEP 1     │     │   STEP 2     │     │   STEP 3     │
│              │     │              │     │              │
│   Driver     │────▶│  Onboarding  │────▶│   System     │
│   Begins     │     │   Steps      │     │  Determines  │
│  Onboarding  │     │  Completed   │     │ Entity Type  │
│              │     │              │     │              │
│  Day 0       │     │  Day 1-5     │     │  Immediate   │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                     ┌───────────────────────────┘
                     ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   STEP 4     │     │   STEP 5     │     │   STEP 6     │
│              │     │              │     │              │
│  Platform    │────▶│   Pricing    │────▶│   Default    │
│  Selection   │     │    Model     │     │   Controls   │
│  & Card Req  │     │  Assignment  │     │   Applied    │
│              │     │              │     │              │
│  Immediate   │     │  Immediate   │     │  Immediate   │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                     ┌───────────────────────────┘
                     ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   STEP 7     │     │   STEP 8     │     │   STEP 9     │
│              │     │              │     │              │
│    Card      │────▶│  Physical    │────▶│   Driver     │
│ Provisioned  │     │    Card      │     │  Picks Up    │
│ in Platform  │     │   Ships      │     │    Card      │
│              │     │              │     │              │
│  < 1 minute  │     │  3-5 days    │     │  Day 5-10    │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                     ┌───────────────────────────┘
                     ▼
              ┌──────────────┐
              │   STEP 10    │
              │              │
              │ Card Active  │
              │ & Monitoring │
              │   Begins     │
              │              │
              │   Ongoing    │
              └──────────────┘
```

**Key Decision Points:**

| Decision | Based On | Outcomes |
|----------|----------|----------|
| Platform Routing | Entity Type | Company/O-O → EFS, Franchise → Commdata, Carrier → Relay |
| Pricing Model | Entity Type | Company → Tiered, O-O → Standard, Franchise → Ceiling |
| Ship Destination | Driver Profile | Always ships to driver's assigned terminal |

---

### 7.2 Fuel Transaction Flow

**Purpose:** Process fuel purchases from pump swipe to settlement queue.

**Timeline:** Real-time to 15 minutes for full processing

```
┌─────────────────────────────────────────────────────────────────────┐
│                     FUEL TRANSACTION FLOW                           │
└─────────────────────────────────────────────────────────────────────┘

  DRIVER                    PLATFORM                      AXIS
    │                          │                           │
    │  1. Arrives at Station   │                           │
    │─────────────────────────▶│                           │
    │                          │                           │
    │  2. Swipes Card +        │                           │
    │     Enters PIN/Odometer  │                           │
    │─────────────────────────▶│                           │
    │                          │                           │
    │                          │  3. Authorization Check   │
    │                          │  (Card status, limits,    │
    │                          │   products, network)      │
    │                          │──────────────────────────▶│
    │                          │                           │
    │  4. Fueling Authorized   │                           │
    │◀─────────────────────────│                           │
    │                          │                           │
    │  5. Transaction Complete │                           │
    │     (gallons, price)     │                           │
    │─────────────────────────▶│                           │
    │                          │                           │
    │                          │  6. Data Sent to Platform │
    │                          │─────────────────────────▶ │
    │                          │                           │
    │                          │  7. AXIS Syncs (15 min)   │
    │                          │◀──────────────────────────│
    │                          │                           │
    │                          │  8. Pricing Calculation   │
    │                          │  9. Fraud Analysis        │
    │                          │  10. Settlement Queue     │
    │                          │                           │
```

**Authorization Checks (Step 3):**

| Check | Pass | Fail |
|-------|------|------|
| Card Active? | Proceed | Decline |
| Within Daily Limit? | Proceed | Decline |
| Approved Product? | Proceed | Decline |
| In-Network Location? | Proceed | Decline (or proceed with alert) |

---

### 7.3 Pricing Calculation Flow

**Purpose:** Calculate the three price points for every transaction.

```
┌─────────────────────────────────────────────────────────────────────┐
│                   PRICING CALCULATION FLOW                          │
└─────────────────────────────────────────────────────────────────────┘

INPUT: Transaction from platform sync
┌────────────────────────────────────┐
│ Pump Price: $3.42/gal              │
│ Gallons: 127                       │
│ Location: Pilot #4521 (In-Network) │
│ Product: Diesel                    │
│ Card ID: EFS-2847                  │
└────────────────────────────────────┘
           │
           ▼
┌────────────────────────────────────┐
│ STEP 2: Lookup Supplier Discount   │
│ ─────────────────────────────────  │
│ Platform: EFS                      │
│ Network: In-Network                │
│ Product: Diesel                    │
│ Discount: $0.08/gal                │
└────────────────────────────────────┘
           │
           ▼
┌────────────────────────────────────┐
│ STEP 3: Calculate Our Cost         │
│ ─────────────────────────────────  │
│ $3.42 - $0.08 = $3.34/gal          │
│ Total: $3.34 × 127 = $424.18       │
└────────────────────────────────────┘
           │
           ▼
┌────────────────────────────────────┐
│ STEP 4: Identify Pricing Model     │
│ ─────────────────────────────────  │
│ Driver: Miguel Rodriguez           │
│ Model: Tiered by Score             │
│ Current Tier: Gold (Score: 84)     │
│ Rate: Cost + 5%                    │
└────────────────────────────────────┘
           │
           ▼
┌────────────────────────────────────┐
│ STEP 5: Apply Pricing Formula      │
│ ─────────────────────────────────  │
│ $3.34 × 1.05 = $3.51/gal           │
│ Total: $3.51 × 127 = $445.77       │
└────────────────────────────────────┘
           │
           ▼
┌────────────────────────────────────┐
│ STEP 6: Calculate Margin           │
│ ─────────────────────────────────  │
│ Driver Price: $3.51                │
│ Our Cost: $3.34                    │
│ Margin: $0.17/gal (5.1%)           │
│ Total Margin: $21.59               │
└────────────────────────────────────┘
           │
           ▼
OUTPUT: Stored Price Points
┌────────────────────────────────────┐
│ pump_price_per_gallon: $3.42       │
│ our_cost_per_gallon: $3.34         │
│ driver_price_per_gallon: $3.51     │
│ total_driver_charge: $445.77       │
│ total_margin: $21.59               │
└────────────────────────────────────┘
```

---

### 7.4 Fuel Stop Recommendation Flow

**Purpose:** Proactively recommend optimal fuel stops to drivers.

**Triggers:**
1. New load dispatched
2. Fuel level drops below 30%
3. Route or deadline changes

```
┌─────────────────────────────────────────────────────────────────────┐
│                FUEL STOP RECOMMENDATION FLOW                        │
└─────────────────────────────────────────────────────────────────────┘

STEP 1: Load Dispatched
┌─────────────────────────────────────┐
│ Route: Dallas → Miami               │
│ Deadline: Dec 14, 10:00 AM          │
│ Driver: Miguel Rodriguez            │
│ Truck: T-2847                       │
└─────────────────────────────────────┘
                    │
                    ▼
STEP 2: Gather Real-Time Data
┌─────────────────────────────────────┐
│ Current Fuel Level: 42% (~180 mi)   │
│ Truck MPG (historical): 6.8         │
│ Driver HOS Remaining: 6.5 hours     │
│ Current Location: I-20, Shreveport  │
└─────────────────────────────────────┘
                    │
                    ▼
STEP 3: Calculate Fuel Requirement
┌─────────────────────────────────────┐
│ Miles Remaining: 847                │
│ Expected Consumption: 847÷6.8=124.5 │
│ Current Tank: ~50 gal               │
│ Needed: 124.5-50+15% reserve = 90   │
└─────────────────────────────────────┘
                    │
                    ▼
STEP 4-5: Query & Filter Stations
┌─────────────────────────────────────┐
│ In-network stations within 25mi    │
│ of route corridor                   │
│                                     │
│ Filters Applied:                    │
│ ✓ Reachable with current fuel      │
│ ✓ Won't cause late delivery        │
│ ✓ Driver has HOS for stop          │
└─────────────────────────────────────┘
                    │
                    ▼
STEP 6: Score & Rank (60% price, 25% time, 15% traffic)
┌─────────────────────────────────────┐
│ #1 Pilot #4521   $3.24  12min  $23  │
│ #2 Love's #293   $3.28   8min  $18  │
│ #3 TA #847       $3.31  15min  $15  │
└─────────────────────────────────────┘
                    │
                    ▼
STEP 7-8: Push to Driver App
┌─────────────────────────────────────┐
│ 📱 Push Notification:               │
│ "Recommended Fuel Stop ahead:       │
│  Pilot #4521 - Save $23.40"         │
│                                     │
│ [Navigate] [View Options] [Dismiss] │
└─────────────────────────────────────┘
                    │
                    ▼
STEP 9-10: Track Outcome
┌─────────────────────────────────────┐
│ Did driver follow recommendation?   │
│ Calculate actual vs potential saving│
│ Feed effectiveness reports          │
└─────────────────────────────────────┘
```

---

### 7.5 Settlement & Billing Flow

**Purpose:** Ensure fuel charges reach the right entity through the right method.

```
┌─────────────────────────────────────────────────────────────────────┐
│                  SETTLEMENT BY ENTITY TYPE                          │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ COMPANY DRIVER → Payroll Deduction                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Transactions      Pay Period       Send to        Pay Stub        │
│   Accumulate   ───▶  Closes    ───▶  Payroll  ───▶  Shows:         │
│                                                                     │
│   Week 1: $342                       Deduction      Fuel-Diesel:    │
│   Week 2: $287      Total:           Record         $1,378.12       │
│   Week 3: $412      $1,520.68        Created        Fuel-DEF:       │
│   Week 4: $479                                      $142.56         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ OWNER-OPERATOR → Settlement Deduction                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Load Completed ───▶ Settlement Calculated ───▶ Fuel Deducted     │
│                                                                     │
│   Load Revenue:     $3,200                                          │
│   - Fuel:           $  847  ◀── Itemized by product                │
│   - Other:          $  150                                          │
│   ─────────────────────────                                         │
│   Net to O/O:       $2,203                                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ FRANCHISE → Weekly Invoice                                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   All Drivers'       Invoice          Payment                       │
│   Transactions  ───▶ Generated  ───▶  Due                          │
│   Aggregated         (Monday)         (Net 7)                       │
│                                                                     │
│   Driver A: $1,234   ┌──────────────────────┐                       │
│   Driver B: $  987   │ INVOICE #F-2024-1234 │                       │
│   Driver C: $1,456   │ Franchise: ABC Fleet │                       │
│   Driver D: $  823   │ Total: $4,500.00     │                       │
│   ─────────────────  │ Due: Dec 21, 2024    │                       │
│   Total:    $4,500   └──────────────────────┘                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ CARRIER (BROKERAGE) → Load Recapture                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Fuel Advance       Load            Settlement                     │
│   Given        ───▶  Delivered  ───▶ Calculated                    │
│                                                                     │
│   Advance: $400      Load Pay:   $2,800                             │
│   + Fee:   $ 20      - Advance:  $  400                             │
│   ───────────────    - Fee:      $   20                             │
│   Total:   $420      ─────────────────────                          │
│                      Net to Carrier: $2,380                         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Important:** DEF, Diesel, and Reefer Fuel are ALWAYS shown as separate line items.

---

### 7.6 Card Suspension Flow

**Purpose:** Automatically suspend cards when risk conditions are detected.

**Automatic Triggers:**

| Trigger | Condition | Reactivation | Configurable? |
|---------|-----------|--------------|---------------|
| Low Driver Score | Score < 50 | Auto when score > 50 | Yes |
| Failed Drug Test | Test marked failed | Manual only | No |
| Driver Inactive | Status = inactive/terminated | Auto if restored | No |
| High Balance | Balance > $2,500 | Auto when under | Yes |

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CARD SUSPENSION FLOW                             │
└─────────────────────────────────────────────────────────────────────┘

  TRIGGER EVENT                     FUEL MODULE                PLATFORM
       │                                 │                        │
       │  1. Event Detected              │                        │
       │  (score drop, drug test,        │                        │
       │   status change, balance)       │                        │
       │────────────────────────────────▶│                        │
       │                                 │                        │
       │                                 │  2. Validate Criteria  │
       │                                 │  (re-check current     │
       │                                 │   state to confirm)    │
       │                                 │                        │
       │                                 │  3. API Call to        │
       │                                 │     Suspend Card       │
       │                                 │───────────────────────▶│
       │                                 │                        │
       │                                 │  4. Card Suspended     │
       │                                 │◀───────────────────────│
       │                                 │     (< 1 minute)       │
       │                                 │                        │
       │  5. Notifications Sent          │                        │
       │  • Driver: Push + SMS           │                        │
       │  • Fleet Manager: Email         │                        │
       │  • Safety Manager: Dashboard    │                        │
       │◀────────────────────────────────│                        │
       │                                 │                        │
       │                                 │  6. Suspension Logged  │
       │                                 │  (immutable audit)     │
       │                                 │                        │
```

**Reactivation Paths:**

| Type | Triggers | Process |
|------|----------|---------|
| **Automatic** | Score returns > 50, balance reduced, status restored | Within 15 min of condition clearing |
| **Manual Only** | Failed drug test, fraud investigation, admin suspension | Requires admin action + new clean test if applicable |

---

### 7.7 Franchise Pricing Flow

**Purpose:** Allow franchises to set driver pricing within Mega's constraints.

```
┌─────────────────────────────────────────────────────────────────────┐
│                   FRANCHISE PRICING FLOW                            │
└─────────────────────────────────────────────────────────────────────┘

STEP 1: Mega Admin Sets Ceiling
┌────────────────────────────────────────┐
│ Franchise: ABC Fleet                   │
│ Ceiling: Cost + 8%                     │
│ (This is their "cost" - they can't    │
│  see Mega's actual cost below this)   │
└────────────────────────────────────────┘
                    │
                    ▼
STEP 2: Franchise Views Their Ceiling
┌────────────────────────────────────────┐
│ 👤 Franchise Admin Portal              │
│                                        │
│ "Your Cost: Cost + 8%"                 │
│ "Approximate: ~$3.42/gal today"        │
│                                        │
│ ❌ Cannot see supplier discount        │
│ ❌ Cannot see Mega's actual cost       │
└────────────────────────────────────────┘
                    │
                    ▼
STEP 3: Franchise Sets Driver Pricing
┌────────────────────────────────────────┐
│ Franchise wants 3% margin              │
│                                        │
│ Sets: Cost + 11%                       │
│ (8% ceiling + 3% margin = 11%)         │
│                                        │
│ ⚠️ Must be >= ceiling (8%)            │
└────────────────────────────────────────┘
                    │
                    ▼
STEP 4: System Validates
┌────────────────────────────────────────┐
│ ✅ Cost + 11% >= Cost + 8%             │
│    ACCEPTED                            │
│                                        │
│ ❌ If they tried Cost + 6%:            │
│    REJECTED (below ceiling)            │
└────────────────────────────────────────┘
                    │
                    ▼
STEP 5-6: Driver Makes Purchase
┌────────────────────────────────────────┐
│ Driver fuels 100 gallons               │
│ Pump: $3.42/gal                        │
└────────────────────────────────────────┘
                    │
                    ▼
STEP 7: 4-Point Pricing Calculated
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  Pump Price:           $3.42    Everyone sees at station   │
│  - Supplier Discount:  -$0.08   MEGA ONLY                  │
│  ───────────────────────────────                           │
│  Mega's Cost:          $3.34    MEGA ONLY                  │
│  + Mega Markup (8%):   +$0.27   MEGA ONLY                  │
│  ───────────────────────────────                           │
│  Franchise Cost:       $3.61    MEGA + FRANCHISE           │
│  + Franchise Markup:   +$0.11   FRANCHISE ONLY             │
│  ───────────────────────────────                           │
│  Driver Price:         $3.72    ALL PARTIES                │
│                                                            │
└────────────────────────────────────────────────────────────┘
                    │
                    ▼
STEP 8: Margins Calculated
┌────────────────────────────────────────┐
│ Mega Margin:      $0.27 × 100 = $27.00 │
│ Franchise Margin: $0.11 × 100 = $11.00 │
│ Driver Pays:      $3.72 × 100 = $372   │
└────────────────────────────────────────┘
```

---

### 7.8 Tier Recalculation Flow

**Purpose:** Weekly scoring that determines driver fuel pricing tiers.

**Schedule:** Every Sunday at midnight

```
┌─────────────────────────────────────────────────────────────────────┐
│                  TIER RECALCULATION FLOW                            │
└─────────────────────────────────────────────────────────────────────┘

STEP 1: Weekly Job Triggers (Sunday 00:00)
         │
         ▼
┌────────────────────────────────────────────────────────────────────┐
│ FOR EACH DRIVER (parallel processing for 400+ drivers)             │
└────────────────────────────────────────────────────────────────────┘
         │
    ┌────┴────┬────────────┬────────────┐
    ▼         ▼            ▼            ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│ SAFETY │ │ FUEL   │ │RELIAB- │ │ TENURE │
│ (40%)  │ │ EFF.   │ │ ILITY  │ │ (15%)  │
│        │ │ (25%)  │ │ (20%)  │ │        │
│ • HOS  │ │ • MPG  │ │ • OTD  │ │ • Mos  │
│ • Brake│ │ • Idle │ │ • Accept│ │ • Bonus│
│ • Speed│ │        │ │ • Comp │ │        │
│ • Crash│ │        │ │        │ │        │
└───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘
    │          │          │          │
    └──────────┴────┬─────┴──────────┘
                    ▼
         STEP 6: Compute Score
         ┌─────────────────────┐
         │ Score = S×0.4 +     │
         │         E×0.25 +    │
         │         R×0.20 +    │
         │         T×0.15      │
         │                     │
         │ Example: 84.2       │
         └─────────┬───────────┘
                   ▼
         STEP 7: Determine Tier
         ┌─────────────────────┐
         │ 84.2 → GOLD         │
         │ (80-89 range)       │
         └─────────┬───────────┘
                   ▼
         STEP 8: Compare to Previous
         ┌─────────────────────┐
         │ Previous: Silver    │
         │ Current: Gold       │
         │ Result: PROMOTED    │
         └─────────┬───────────┘
                   ▼
         STEP 9: Update Pricing
         ┌─────────────────────┐
         │ Old: Cost + 7%      │
         │ New: Cost + 5%      │
         │ Effective: NOW      │
         └─────────┬───────────┘
                   ▼
         STEP 10: Notify Driver
         ┌─────────────────────┐
         │ 🎉 "Congrats! You   │
         │ moved to Gold tier! │
         │ Enjoy Cost + 5%     │
         │ fuel pricing."      │
         └─────────────────────┘
```

---

## 8. UI Screens & Wireframes

### Screen Overview

The Fuel Integration Module includes **10 major screens**:

| # | Screen | Primary User | Purpose |
|---|--------|--------------|---------|
| 1 | Admin Dashboard | Mega Admin | Overview of all fuel operations |
| 2 | Process Flows | Mega Admin | Visualize system processes |
| 3 | Supplier Discounts | Mega Admin | Manage secret negotiated rates |
| 4 | Pricing Models | Mega Admin | Create and assign pricing models |
| 5 | Card Management | Mega Admin | View/control all fuel cards |
| 6 | Franchise Admin | Franchise Admin | Set driver pricing within ceiling |
| 7 | Driver App | Driver | View recommendations, history |
| 8 | Fuel Optimizer | Dispatcher | Route-based fuel planning |
| 9 | Reports & IFTA | Finance | Analytics and tax compliance |
| 10 | Settings | Mega Admin | Configure defaults and thresholds |

### Screen Details

#### 1. Admin Dashboard

**Purpose:** Real-time overview of fuel program performance

**Key Components:**
- **KPI Cards:** Total Spend, Discount Captured, Active Cards, Fleet MPG
- **Platform Status:** Connection status for EFS, Commdata, Relay
- **Spend by Entity Type:** Bar chart breakdown
- **Margin Analysis:** Our Cost vs Billed (hidden from drivers)
- **Recent Transactions:** Live transaction feed
- **Alerts & Anomalies:** Fraud detection notifications

```
┌─────────────────────────────────────────────────────────────────────┐
│ Fuel Program Dashboard                              [Sync] [Export] │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│  │$847,293  │ │$94,218   │ │412       │ │6.8 MPG   │               │
│  │Total     │ │Discount  │ │Active    │ │Fleet     │               │
│  │Spend     │ │Captured  │ │Cards     │ │Average   │               │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘               │
│                                                                     │
│  ┌─────────────────────────┐ ┌─────────────────────────┐           │
│  │ Platform Status         │ │ Margin Analysis         │           │
│  │ • EFS ●        2m ago   │ │ Our Cost:    $753,075   │           │
│  │ • Commdata ●   5m ago   │ │ Billed:      $847,293   │           │
│  │ • Relay ●      1m ago   │ │ Revenue:     $94,218    │           │
│  └─────────────────────────┘ └─────────────────────────┘           │
│                                                                     │
│  ┌──────────────────────────────────────────────────────┐          │
│  │ Recent Transactions                      [View All →]│          │
│  │ Miguel R.  T-2847  Pilot Dallas   127gal  $445  12m  │          │
│  │ James W.   T-1923  Love's Phoenix  98gal  $334  28m  │          │
│  │ Sarah C.   T-3012  TA Memphis     142gal  $478  45m  │          │
│  └──────────────────────────────────────────────────────┘          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### 2. Supplier Discounts (Mega Admin Only)

**Purpose:** Manage confidential negotiated rates

**Key Features:**
- Add/edit discount tiers by platform
- Set discounts by network tier (in-network vs out-of-network)
- Configure by product type (diesel, DEF, reefer)
- Volume bonus thresholds

#### 3. Pricing Models

**Purpose:** Create and manage the 8 pricing model types

**Key Features:**
- Model creation wizard
- Assign models to entity types
- Set tier thresholds for score-based pricing
- Preview pricing calculations

#### 4. Card Management

**Purpose:** View and control all fuel cards across platforms

**Key Features:**
- Card list with filters (platform, status, entity type)
- Individual card controls (limits, products, network)
- Suspend/activate cards
- View transaction history per card

#### 5. Franchise Admin Portal

**Purpose:** Franchise admins manage their driver pricing

**Key Features:**
- View assigned ceiling (can't see Mega's cost)
- Set driver pricing models (must be >= ceiling)
- View their drivers' transactions
- See their margin per transaction

#### 6. Driver App

**Purpose:** Mobile interface for drivers

**Key Features:**
- Fuel stop recommendations with Navigate button
- Transaction history
- Current tier and score
- Card status and limits

#### 7. Fuel Optimizer

**Purpose:** Map-based fuel planning for dispatchers

**Key Features:**
- Route visualization
- Fuel stop recommendations on map
- Price comparison along route
- HOS-aware planning

#### 8. Reports & IFTA

**Purpose:** Analytics and compliance reporting

**Key Features:**
- Transaction reports by date range
- IFTA tax reporting
- Spend analysis by entity, driver, platform
- Effectiveness reports for recommendations

#### 9. Settings

**Purpose:** Configure system defaults and thresholds

**Key Features:**
- Default card controls
- Suspension thresholds
- Score component weights
- Notification preferences

---

## 9. Card Controls

### Default Network-Level Controls

| Control | Default | Adjustable? |
|---------|---------|-------------|
| Daily Dollar Limit | $500 | Yes |
| Transaction Limit | $300 | Yes |
| Daily Gallon Limit | 150 gal | Yes |
| Approved Products | Diesel, DEF, Reefer | Yes |
| Cash Advances | Disabled | Yes (requires approval) |
| Network Restriction | In-Network Only | Yes |
| Odometer Prompt | Required | No (always on) |

### Control Adjustment Scenarios

| Scenario | Adjustment |
|----------|------------|
| Long-haul driver | Increase daily/gallon limits |
| Reefer truck | Enable reefer fuel product |
| Trusted veteran | May enable cash advances |
| Problem driver | Reduce limits, restrict network |

---

## 10. Fraud Detection

### Detection Rules

| Rule | Description | Action |
|------|-------------|--------|
| Out-of-Route | Purchase > 25 miles from assigned route | Alert + Flag |
| Velocity | Multiple transactions within 2 hours | Alert + Flag |
| Volume | Unusual gallons for truck tank capacity | Alert + Flag |
| Network | Out-of-network purchase | Alert only |
| Time | Unusual purchase time (e.g., 3 AM) | Flag for review |

### Alert Severity Levels

| Level | Examples | Action |
|-------|----------|--------|
| **High** | Multiple flags same transaction, known fraud patterns | Auto-suspend card |
| **Medium** | Single flag, unusual but explainable | Alert fleet manager |
| **Low** | Minor anomaly | Log for pattern analysis |

---

## 11. Data Models

### Core Tables

```
fuel_platforms
├── platform_id (PK)
├── name (EFS, Commdata, Relay)
├── api_credentials (encrypted)
├── sync_status
└── last_sync_timestamp

supplier_discounts
├── discount_id (PK)
├── platform_id (FK)
├── location_tier (in-network, out-of-network)
├── fuel_type (diesel, def, reefer)
├── discount_type
├── discount_value
├── effective_date
└── expiration_date

fuel_cards
├── card_id (PK)
├── platform_id (FK)
├── platform_card_number
├── entity_type
├── entity_id
├── pricing_model_id (FK)
├── pricing_tier
├── status (provisioned, active, suspended)
├── daily_limit
├── transaction_limit
├── gallon_limit
├── approved_products[]
├── network_restriction
└── issued_date

pricing_models
├── model_id (PK)
├── name
├── type (fixed, pump_discount_flat, tiered, etc.)
├── parameters (JSON)
├── assigned_by
├── ceiling_model_id (FK, for franchise)
├── effective_date
└── expiration_date

fuel_transactions
├── transaction_id (PK)
├── card_id (FK)
├── platform_transaction_id
├── timestamp
├── location_id
├── location_name
├── gallons
├── pump_price_per_gallon
├── our_cost_per_gallon (hidden)
├── driver_price_per_gallon
├── total_pump_amount
├── total_our_cost (hidden)
├── total_driver_charge
├── fuel_type
├── odometer_reading
├── driver_score_at_transaction
├── pricing_tier_at_transaction
├── fraud_flags[]
└── settlement_status

fuel_recommendations
├── recommendation_id (PK)
├── load_id (FK)
├── driver_id (FK)
├── recommended_location_id
├── recommended_price
├── estimated_savings
├── deviation_minutes
├── accepted (boolean)
├── actual_location_id
└── created_at

driver_fuel_tier
├── driver_id (PK)
├── current_score
├── current_tier
├── previous_tier
├── safety_score
├── efficiency_score
├── reliability_score
├── tenure_score
└── last_calculated_at

franchise_fuel_pricing
├── franchise_id (PK)
├── ceiling_type
├── ceiling_value
├── driver_pricing_type
├── driver_pricing_value
├── effective_date
└── updated_by
```

---

## 12. Integration Points

| Module | Integration Type | Data Exchanged |
|--------|-----------------|----------------|
| **Onboarding** | Event trigger | Driver profile, entity type, terminal |
| **Dispatch** | Bidirectional API | Load routes, fuel recommendations |
| **Settlement** | Outbound batch | Fuel deductions, advances, recapture |
| **Safety** | Inbound API + Events | Driver scores, drug test results |
| **Driver App** | REST API + Push | Recommendations, prices, history |
| **Telematics (Samsara)** | API | Fuel level, MPG, odometer, GPS |
| **ELD** | Provider API | HOS remaining, violations |
| **Payroll** | API or file export | Fuel deductions per pay period |
| **HR** | API | Driver status, tenure, terminations |

---

## 13. Technical Requirements

### Performance SLAs

| Operation | Requirement |
|-----------|-------------|
| Transaction sync | Every 15 minutes |
| Card suspension | < 1 minute from trigger |
| Fuel recommendations | < 30 seconds from dispatch |
| Tier recalculation | < 15 minutes for 400+ drivers |
| Authorization response | < 3 seconds |

### Security Requirements

| Area | Requirement |
|------|-------------|
| API Credentials | AES-256 encryption at rest |
| Access Control | Role-based visibility for pricing |
| Audit Logging | All pricing changes logged immutably |
| Fraud Rules | Configurable per entity type |

### Error Handling

| Scenario | Response |
|----------|----------|
| Platform API failure | Retry 3x with exponential backoff, then alert admin |
| Transaction sync failure | Queue for next cycle, no data loss |
| Pricing calculation error | Default to Bronze tier, alert admin |
| Telematics unavailable | Fall back to fleet averages |

---

## 14. Implementation Checklist

### Phase 1: Foundation
- [ ] Database schema creation
- [ ] Platform API integrations (EFS, Commdata, Relay)
- [ ] Basic card provisioning flow
- [ ] Transaction sync service

### Phase 2: Pricing Engine
- [ ] Supplier discount management
- [ ] 8 pricing model implementations
- [ ] Pricing calculation service
- [ ] Visibility controls (role-based)

### Phase 3: Driver Experience
- [ ] Driver score calculation
- [ ] Tier assignment logic
- [ ] Fuel stop recommendation engine
- [ ] Driver app integration

### Phase 4: Settlement
- [ ] Payroll deduction integration
- [ ] Settlement statement generation
- [ ] Franchise invoicing
- [ ] Carrier advance recapture

### Phase 5: Operations
- [ ] Admin dashboard
- [ ] Card management UI
- [ ] Fraud detection rules
- [ ] Suspension/reactivation automation

### Phase 6: Reporting
- [ ] Transaction reports
- [ ] IFTA compliance
- [ ] Effectiveness analytics
- [ ] Margin analysis

---

## Quick Reference Card

### Entity → Platform → Pricing → Settlement

| Entity | Platform | Default Pricing | Settlement |
|--------|----------|-----------------|------------|
| Company Driver | EFS | Tiered (Bronze start) | Payroll |
| Owner-Operator | EFS | O/O Standard | Settlement |
| Franchise Driver | Commdata | Franchise Rate | Invoice |
| Carrier | Relay | Advance Rate | Load Recapture |

### Tier Quick Reference

| Tier | Score | Rate | Color Code |
|------|-------|------|------------|
| Platinum | 90-100 | +3% | 🟣 Purple |
| Gold | 80-89 | +5% | 🟡 Gold |
| Silver | 70-79 | +7% | ⚪ Silver |
| Bronze | 0-69 | +10% | 🟤 Bronze |

### Key Timings

| Event | Timing |
|-------|--------|
| Transaction sync | Every 15 min |
| Score recalculation | Sunday midnight |
| Card suspension | < 1 minute |
| Fuel recommendation | < 30 seconds |
| Card provisioning | 5-10 business days |

---

*Document Version: 1.0*
*Last Updated: December 2024*
*Prepared for: Development Team*
