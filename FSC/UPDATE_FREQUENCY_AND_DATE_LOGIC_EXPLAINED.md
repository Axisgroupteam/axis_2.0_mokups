# Update Frequency & Effective Date Logic Explained

**Reference:** FSC/REQ.md Section 4.1 (Lines 83-86), Section 7 Step 2 (Lines 212-220), EC-2 (Lines 371-377), EC-20 (Lines 501-513)

---

## Overview

These are **two separate but related concepts** that control FSC billing:

1. **Update Frequency** = HOW OFTEN the FSC rate changes (based on new fuel prices)
2. **Effective Date Logic** = WHICH DATE determines what FSC applies to a load

They work together but serve different purposes.

---

## 1. UPDATE FREQUENCY

### What is it?
**How often the FSC is recalculated based on new index values.**

Think of it as: "How frequently does the FSC % or amount change?"

### Options:

#### **A. WEEKLY** (Most Common)
- FSC recalculates every week when new DOE data is published
- DOE publishes every Monday
- Each week's loads use that week's DOE value

**Example:**
```
Week of Jan 1-7:   DOE = $3.50 → FSC = 15%
Week of Jan 8-14:  DOE = $3.60 → FSC = 16%
Week of Jan 15-21: DOE = $3.40 → FSC = 14%

Every load that week uses that week's FSC rate.
```

---

#### **B. MONTHLY**
- FSC recalculates once per month
- All loads in that month use the same FSC rate
- Typically uses first DOE value of the month, or average of month

**Example:**
```
January:   DOE on Jan 1 = $3.50 → FSC = 15%
           (All loads in January use 15%, regardless of weekly DOE changes)

February:  DOE on Feb 1 = $3.70 → FSC = 17%
           (All loads in February use 17%)
```

---

#### **C. QUARTERLY**
- FSC recalculates once per quarter (every 3 months)
- All loads in that quarter use the same FSC rate

**Example:**
```
Q1 (Jan-Mar): DOE on Jan 1 = $3.50 → FSC = 15%
              (All loads Jan-Mar use 15%)

Q2 (Apr-Jun): DOE on Apr 1 = $3.80 → FSC = 18%
              (All loads Apr-Jun use 18%)
```

---

#### **D. CUSTOM** (Complex - Free Text Rule)

**REQ.md Lines 84-85:**
> "Must specify: (1) WHEN the FSC is calculated, (2) WHAT PERIOD it applies to, (3) WHAT INDEX VALUE is used"

Customer can have ANY custom schedule they want.

**Example A - Second-to-Last Monday Rule (REQ.md EC-20, Line 502):**
```
Rule: "Calculate FSC on the second-to-last Monday of each month
       using that day's DOE. Apply to all loads for the following month."

Timeline:
  January 22 (2nd-to-last Monday) → DOE = $3.50
  → All February loads use FSC calculated from $3.50

  February 19 (2nd-to-last Monday) → DOE = $3.70
  → All March loads use FSC calculated from $3.70
```

**Example B - Monthly Average Rule:**
```
Rule: "Calculate FSC using the average of all DOE values published
       in the previous month. Apply to the following month."

Timeline:
  January DOE values: $3.40, $3.50, $3.60, $3.50
  Average = $3.50
  → All February loads use FSC calculated from $3.50

  February DOE values: $3.60, $3.70, $3.75, $3.80
  Average = $3.71
  → All March loads use FSC calculated from $3.71
```

**Example C - Quarterly with Mid-Quarter Lock:**
```
Rule: "Calculate FSC on the 15th day of the first month of each quarter.
       Use that day's DOE for all loads that quarter."

Timeline:
  January 15 → DOE = $3.45
  → All Q1 (Jan-Mar) loads use $3.45

  April 15 → DOE = $3.80
  → All Q2 (Apr-Jun) loads use $3.80
```

**Important Notes on CUSTOM (REQ.md Line 512):**
- Free-text field allows any customer requirement
- System may require manual FSC rate entry until automation is built
- Over time, common patterns can be codified into selectable options

---

## 2. EFFECTIVE DATE LOGIC

### What is it?
**Which date on the load determines what FSC applies.**

Think of it as: "What date do I use to look up the FSC?"

This is CRITICAL because it determines:
1. Which FSC file to use (if FSC changed)
2. Which index value to use

### Options (REQ.md Lines 215-219):

#### **A. PICKUP_DATE** (Most Common)
**The load's actual pickup date**

**Example:**
```
Load #1: Picked up Jan 10, invoiced Jan 20
  → Use Jan 10 to determine FSC

Load #2: Picked up Jan 15, invoiced Jan 20
  → Use Jan 15 to determine FSC

Even though both invoiced on same day, they use different FSC rates
because pickup dates were different.
```

**Why use this?**
- Fair to customer: FSC based on fuel prices at time of shipment
- Most common method

---

#### **B. INVOICE_DATE**
**The date the invoice is generated**

**Example:**
```
Load #1: Picked up Jan 10, invoiced Jan 20
  → Use Jan 20 to determine FSC

Load #2: Picked up Jan 15, invoiced Jan 20
  → Use Jan 20 to determine FSC

Both use same FSC rate because both invoiced on same day,
even though pickup dates were different.
```

**Why use this?**
- Simpler billing: All loads on same invoice use same FSC
- Useful if billing is delayed

**Critical Edge Case (REQ.md EC-2, Lines 376-377):**
```
Scenario:
  FSC File A active until Jan 17
  FSC File B active starting Jan 18

  Load: Picked up Jan 15, invoiced Jan 20

  With PICKUP_DATE logic:
    → Use Jan 15 (File A applies)

  With INVOICE_DATE logic:
    → Use Jan 20 (File B applies)

This can result in DIFFERENT FSC calculations for the same load!
```

---

#### **C. WEEK_OF_SERVICE**
**The Monday of the week the load was picked up**

**Example:**
```
Load #1: Picked up Jan 10 (Tuesday)
  → Monday of that week = Jan 8
  → Use Jan 8 to determine FSC

Load #2: Picked up Jan 13 (Friday)
  → Monday of that week = Jan 8
  → Use Jan 8 to determine FSC

All loads in the same week use the same FSC,
regardless of which day they were picked up.
```

**Why use this?**
- Simplifies billing: One FSC per week
- Aligns with WEEKLY update frequency naturally
- Common when using DOE data (published Mondays)

---

#### **D. CUSTOMER_SPECIFIED** (Free Text Rule)
Customer defines their own logic.

**Example A - First of Month:**
```
Rule: "Use the 1st day of the month the load was picked up"

Load picked up Jan 15
  → Use Jan 1 to determine FSC

Load picked up Jan 28
  → Use Jan 1 to determine FSC

All loads in January use Jan 1 index value.
```

**Example B - Billing Period:**
```
Rule: "Use the last day of our billing cycle (15th of each month)"

Loads picked up Jan 1-15
  → Use Dec 15 FSC (previous billing period)

Loads picked up Jan 16-31
  → Use Jan 15 FSC
```

---

## 3. HOW THEY WORK TOGETHER

### The Billing Workflow (REQ.md Section 7, Step 2)

When a load enters billing:

**Step 1: Determine Applicable Date**
```
Use effective_date_logic to figure out the date:
  - PICKUP_DATE → Load's pickup date
  - INVOICE_DATE → Today's date (invoice generation)
  - WEEK_OF_SERVICE → Monday of pickup week
  - CUSTOMER_SPECIFIED → Per custom rule
```

**Step 2: Find FSC File**
```
Query: Which FSC file was Active on that applicable date?
(This handles FSC file changes - see examples below)
```

**Step 3: Find Index Value**
```
Query: What was the index value on/before that applicable date?
(Based on update_frequency - weekly/monthly/quarterly/custom)
```

**Step 4: Calculate FSC**
```
Apply formula using the index value found in Step 3
```

---

## 4. COMPLETE EXAMPLES

### Example 1: Standard Weekly with Pickup Date

**Setup:**
```
Update Frequency: WEEKLY
Effective Date Logic: PICKUP_DATE
Base Price: $2.00
Increment: $0.10 = 1%
Index Source: DOE National
```

**Scenario:**
```
Week of Jan 8-14: DOE = $3.50
Week of Jan 15-21: DOE = $3.70

Load A: Picked up Jan 10, invoiced Jan 25
  → Applicable Date = Jan 10 (pickup date)
  → Index value = $3.50 (DOE for week of Jan 10)
  → FSC% = ($3.50 - $2.00) / $0.10 = 15%

Load B: Picked up Jan 16, invoiced Jan 25
  → Applicable Date = Jan 16 (pickup date)
  → Index value = $3.70 (DOE for week of Jan 16)
  → FSC% = ($3.70 - $2.00) / $0.10 = 17%

Both invoiced same day, but different FSC because
different pickup dates → different index values.
```

---

### Example 2: Monthly with Invoice Date

**Setup:**
```
Update Frequency: MONTHLY
Effective Date Logic: INVOICE_DATE
Base Price: $2.00
Increment: $0.10 = 1%
```

**Scenario:**
```
January FSC: DOE = $3.50 → FSC = 15%
February FSC: DOE = $3.70 → FSC = 17%

Load A: Picked up Jan 28, invoiced Feb 5
  → Applicable Date = Feb 5 (invoice date)
  → Index value = $3.70 (February's FSC)
  → FSC% = 17%

Load B: Picked up Jan 31, invoiced Feb 5
  → Applicable Date = Feb 5 (invoice date)
  → Index value = $3.70 (February's FSC)
  → FSC% = 17%

Both use February FSC even though picked up in January,
because invoice date logic uses the billing date.
```

---

### Example 3: Custom Frequency with Week of Service

**Setup:**
```
Update Frequency: CUSTOM
Custom Rule: "Calculate FSC on 2nd-to-last Monday of each month.
              Apply to all loads for the following month."
Effective Date Logic: WEEK_OF_SERVICE
```

**Scenario:**
```
Jan 22 (2nd-to-last Monday): DOE = $3.50 → February FSC = 15%
Feb 19 (2nd-to-last Monday): DOE = $3.80 → March FSC = 18%

Load A: Picked up Feb 10 (Monday), invoiced Feb 20
  → Applicable Date = Feb 10 (already Monday - week of service)
  → It's in February → Use Jan 22 calculation → FSC = 15%

Load B: Picked up Feb 14 (Friday), invoiced Feb 20
  → Applicable Date = Feb 12 (Monday of that week)
  → It's in February → Use Jan 22 calculation → FSC = 15%

Load C: Picked up Mar 3 (Monday), invoiced Mar 10
  → Applicable Date = Mar 3 (already Monday)
  → It's in March → Use Feb 19 calculation → FSC = 18%
```

---

### Example 4: FSC File Changes (Critical - REQ.md EC-2)

**Setup:**
```
Customer has two FSC files:

File A (Active until Jan 17):
  - Update Frequency: WEEKLY
  - Base Price: $2.00
  - Increment: $0.10 = 1%

File B (Active starting Jan 18):
  - Update Frequency: WEEKLY
  - Base Price: $2.50 (changed!)
  - Increment: $0.10 = 1%

Current DOE: $3.50
```

**Scenario A - Effective Date Logic = PICKUP_DATE:**
```
Load: Picked up Jan 15, invoiced Jan 25

Step 1: Applicable Date = Jan 15 (pickup date)
Step 2: Which FSC file was active Jan 15? → File A
Step 3: Use File A parameters
  → FSC% = ($3.50 - $2.00) / $0.10 = 15%
```

**Scenario B - Effective Date Logic = INVOICE_DATE:**
```
Load: Picked up Jan 15, invoiced Jan 25

Step 1: Applicable Date = Jan 25 (invoice date)
Step 2: Which FSC file was active Jan 25? → File B
Step 3: Use File B parameters
  → FSC% = ($3.50 - $2.50) / $0.10 = 10%

SAME LOAD, DIFFERENT FSC!
This is why effective_date_logic matters critically.
```

---

## 5. COMMON COMBINATIONS

### Most Common Setup (Standard Trucking):
```
Update Frequency: WEEKLY
Effective Date Logic: PICKUP_DATE

Why: FSC reflects fuel prices at time of shipment,
     updates weekly with DOE data.
```

### Simplified Billing:
```
Update Frequency: WEEKLY
Effective Date Logic: WEEK_OF_SERVICE

Why: All loads in a week use same FSC,
     easier to batch invoice.
```

### Contract with Monthly Rates:
```
Update Frequency: MONTHLY
Effective Date Logic: PICKUP_DATE

Why: Customer negotiated monthly FSC adjustments,
     but still fair based on pickup date.
```

### Delayed Billing:
```
Update Frequency: WEEKLY
Effective Date Logic: INVOICE_DATE

Why: If billing happens weeks later,
     use current week's FSC (not historical).
```

### High-Volume Customer (Simplified):
```
Update Frequency: MONTHLY
Effective Date Logic: INVOICE_DATE

Why: Large volume, need simple billing.
     All loads on same invoice = same FSC.
```

---

## 6. KEY RULES & EDGE CASES

### Rule 1: Applicable Date is Used TWICE
The applicable date (from effective_date_logic) determines:
1. Which FSC file to use
2. Which index value to use

**Both lookups use the same date.**

---

### Rule 2: Historical Billing (REQ.md Section 8.3)
```
Late-billed load from 3 weeks ago:

Must use:
  - FSC file that was active on applicable date (not current file)
  - Index value that was effective on applicable date (not current DOE)

This ensures accurate historical billing.
```

---

### Rule 3: Chicken-and-Egg Problem (REQ.md Line 220)
```
Problem: Need effective_date_logic to determine applicable date,
         but effective_date_logic is stored IN the FSC file,
         which we need the applicable date to find!

Solution: Query ALL FSC files first, read logic from most recent,
          use that to determine applicable date, THEN query for
          the correct file that was active on that date.
```

---

### Rule 4: Flat Fee Special Case (REQ.md Line 238)
```
If calculation_method = FLAT_FEE:
  - Update frequency doesn't matter (fee is static)
  - Effective date logic still matters (for FSC file transitions)
  - Skip index lookup (no DOE needed)
```

---

## 7. UI IMPLICATIONS

### Form Design:

**Update Frequency Dropdown:**
```
Options:
  - Weekly (Most Common)
  - Monthly
  - Quarterly
  - Custom

If "Custom" selected:
  → Show textarea: "Custom Frequency Rule"
  → Placeholder: "Example: Calculate FSC on the second-to-last Monday..."
  → Required field (Validation V14)
```

**Effective Date Logic Dropdown:**
```
Options:
  - Pickup Date (Most Common)
  - Invoice Date
  - Week of Service
  - Customer Specified

If "Customer Specified" selected:
  → Show textarea: "Customer Specified Date Rule"
  → Placeholder: "Describe the custom date logic..."
  → Required field (Validation V12)
```

### Help Text:

**Update Frequency:**
```
"How often the FSC rate recalculates based on new fuel prices.
 Weekly = FSC changes every week with new DOE data."
```

**Effective Date Logic:**
```
"Which date on the load determines what FSC applies.
 Pickup Date = FSC based on fuel prices when load was picked up."
```

---

## 8. SUMMARY TABLE

| Update Frequency | What It Controls | Example |
|------------------|------------------|---------|
| WEEKLY | FSC changes every week | Week 1: 15%, Week 2: 17% |
| MONTHLY | FSC changes once per month | Jan: 15%, Feb: 17% |
| QUARTERLY | FSC changes once per quarter | Q1: 15%, Q2: 18% |
| CUSTOM | FSC changes per custom rule | "2nd-to-last Monday of month" |

| Effective Date Logic | What It Uses | Example |
|---------------------|--------------|---------|
| PICKUP_DATE | Load's pickup date | Picked up Jan 10 → Use Jan 10 |
| INVOICE_DATE | Invoice generation date | Invoiced Jan 20 → Use Jan 20 |
| WEEK_OF_SERVICE | Monday of pickup week | Picked up Jan 10 (Tue) → Use Jan 8 (Mon) |
| CUSTOMER_SPECIFIED | Custom date rule | Per customer contract |

---

## 9. VISUAL TIMELINE EXAMPLE

```
Timeline:
==========================================================
         Jan 8      Jan 15      Jan 22      Jan 29
         (Mon)      (Mon)       (Mon)       (Mon)
           |          |           |           |
DOE:    $3.50      $3.60       $3.70       $3.60

Load A: Picked up Jan 10 ──────────────→ Invoiced Jan 25

With WEEKLY + PICKUP_DATE:
  → Use Jan 10 → DOE $3.50 → FSC = 15%

With WEEKLY + INVOICE_DATE:
  → Use Jan 25 → DOE $3.60 → FSC = 16%

With WEEKLY + WEEK_OF_SERVICE:
  → Use Jan 8 (Monday of pickup week) → DOE $3.50 → FSC = 15%
```

---

## KEY TAKEAWAYS:

1. **Update Frequency** = How often FSC rate changes (weekly/monthly/quarterly/custom)
2. **Effective Date Logic** = Which date determines what FSC to use (pickup/invoice/week/custom)
3. **They work together:** Date logic finds the date, frequency determines rate for that date
4. **Critical for FSC file transitions:** Wrong logic = wrong FSC calculation
5. **Most common combo:** WEEKLY + PICKUP_DATE (fair, reflects actual fuel prices at shipment time)

---

**END OF EXPLANATION**
