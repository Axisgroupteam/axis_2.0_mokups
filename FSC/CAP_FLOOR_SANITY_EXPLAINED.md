# FSC Cap, Floor, and Sanity Threshold Explained

**Reference:** FSC/REQ.md Section 4.1 (Lines 87-93), Section 7 Step 6 (Lines 239-246), Section 12.2 B9 (Line 360)

---

## Overview

These are three **safety controls** applied during FSC billing to protect both the carrier and customer from unexpected charges:

1. **Cap** = Maximum FSC allowed (protects customer from overpaying)
2. **Floor** = Minimum FSC allowed (protects carrier from under-recovery)
3. **Sanity Threshold** = Alert trigger for unusually high FSC (catches errors)

---

## 1. CAP (Maximum FSC)

### What is it?
A **cap** is the maximum amount of FSC a customer will pay, even if the calculated FSC is higher.

### Why use it?
- Customer negotiates a maximum FSC to control costs
- Prevents extreme fuel price spikes from making shipments too expensive
- Common in long-term contracts where customers want predictable max rates

### Two Types of Caps:

#### A. **Percentage Cap** (cap_type = PERCENTAGE)
**Definition:** Maximum FSC percentage of linehaul

**Example from REQ.md (Test Case T5, Line 621):**
```
Setup:
- Base Price: $2.00/gallon
- Increment: $0.10 = 1%
- Current DOE: $4.50/gallon
- Linehaul: $1,000.00
- Cap Type: PERCENTAGE
- Cap Value: 20% (20.00)

Calculation WITHOUT cap:
  FSC% = ($4.50 - $2.00) / $0.10 × 1% = 25%
  FSC$ = $1,000 × 25% = $250.00

Calculation WITH cap:
  Raw FSC% = 25% (exceeds cap of 20%)
  → Cap applied: FSC% = 20%
  → Final FSC$ = $1,000 × 20% = $200.00

Result:
  Invoice shows: $200.00 FSC
  Audit trail captures: Raw = $250.00, Capped = $200.00
  Customer saves: $50.00
```

#### B. **Dollar Amount Cap** (cap_type = AMOUNT)
**Definition:** Maximum FSC dollar amount per load

**Example from REQ.md (Test Case T25, Line 641):**
```
Setup:
- Calculation Method: Any (let's say Percentage)
- Linehaul: $1,500.00
- Calculated FSC%: 20%
- Cap Type: AMOUNT
- Cap Value: $200.00

Calculation WITHOUT cap:
  FSC$ = $1,500 × 20% = $300.00

Calculation WITH cap:
  Raw FSC$ = $300.00 (exceeds cap of $200.00)
  → Cap applied: FSC$ = $200.00

Result:
  Invoice shows: $200.00 FSC
  Customer saves: $100.00
```

---

## 2. FLOOR (Minimum FSC)

### What is it?
A **floor** is the minimum amount of FSC the carrier will charge, even if the calculated FSC is lower or negative.

### Why use it?
- Ensures carrier recovers at least some fuel cost
- Prevents FSC from going to $0 when fuel prices drop below base price
- Protects carrier margin during low fuel price periods

### Two Types of Floors:

#### A. **Percentage Floor** (floor_type = PERCENTAGE)
**Definition:** Minimum FSC percentage of linehaul

**Example from REQ.md (Test Case T6, Line 622):**
```
Setup:
- Base Price: $2.00/gallon
- Increment: $0.10 = 1%
- Current DOE: $2.10/gallon
- Linehaul: $1,000.00
- Floor Type: PERCENTAGE
- Floor Value: 3% (3.00)

Calculation WITHOUT floor:
  FSC% = ($2.10 - $2.00) / $0.10 × 1% = 1%
  FSC$ = $1,000 × 1% = $10.00

Calculation WITH floor:
  Raw FSC% = 1% (below floor of 3%)
  → Floor applied: FSC% = 3%
  → Final FSC$ = $1,000 × 3% = $30.00

Result:
  Invoice shows: $30.00 FSC
  Carrier gains: $20.00 (vs. calculated $10)
```

#### B. **Dollar Amount Floor** (floor_type = AMOUNT)
**Definition:** Minimum FSC dollar amount per load

**Example:**
```
Setup:
- Calculation Method: Percentage
- Base Price: $2.50/gallon
- Current DOE: $2.40/gallon (BELOW base = negative FSC)
- Linehaul: $1,000.00
- Floor Type: AMOUNT
- Floor Value: $50.00

Calculation WITHOUT floor (REQ.md Line 245):
  FSC% = ($2.40 - $2.50) / $0.10 × 1% = -1%
  → Negative FSC not allowed
  → FSC$ = $0.00

Calculation WITH floor (REQ.md Line 246):
  Raw FSC$ = $0.00 (below floor of $50.00)
  → Floor applied: FSC$ = $50.00

Result:
  Invoice shows: $50.00 FSC
  Carrier gains: $50.00 (vs. $0)
```

---

## 3. CAP & FLOOR RULES

### CRITICAL RULE #1: Same Type Required (REQ.md Validation V15, Line 349)
**Cap and floor MUST be the same type if both are set.**

✅ **ALLOWED:**
- Cap = 20% (PERCENTAGE) + Floor = 3% (PERCENTAGE)
- Cap = $200 (AMOUNT) + Floor = $50 (AMOUNT)
- Cap = NONE + Floor = NONE
- Cap = 20% (PERCENTAGE) + Floor = NONE
- Cap = NONE + Floor = $50 (AMOUNT)

❌ **NOT ALLOWED:**
- Cap = 20% (PERCENTAGE) + Floor = $50 (AMOUNT) ← BLOCKED
- Cap = $200 (AMOUNT) + Floor = 3% (PERCENTAGE) ← BLOCKED

**Error Message:** "Cap and floor must be the same type (both % or both $)"

### CRITICAL RULE #2: Cap > Floor (REQ.md Validation V9, Line 343)
**If both cap and floor are percentage, cap value must be greater than floor value.**

✅ **ALLOWED:**
- Cap = 20%, Floor = 3% (cap > floor)

❌ **NOT ALLOWED:**
- Cap = 3%, Floor = 20% (cap < floor) ← BLOCKED
- Cap = 10%, Floor = 10% (cap = floor) ← BLOCKED

**Error Message:** "Cap must be greater than floor"

### CRITICAL RULE #3: Optional (REQ.md Line 103)
**Not every customer has a cap or floor.**

- Default: cap_type = NONE, floor_type = NONE
- Only configure if customer contract specifies it

---

## 4. SANITY THRESHOLD

### What is it?
A **sanity threshold** is an alert trigger that flags loads for manual review when FSC seems unreasonably high.

**Reference:** REQ.md Line 92, Validation B9 (Line 360)

### Why use it?
- Catches data entry errors (e.g., DOE price entered as $35.00 instead of $3.50)
- Prevents billing errors that damage customer relationships
- Flags unusual market conditions for review

### How it works:

**Formula:**
```
If (FSC$ / Linehaul) × 100 > sanity_threshold%
  → HOLD LOAD for manual review
  → DO NOT auto-bill
  → Alert Billing Manager
```

**Example:**
```
Setup:
- Linehaul: $1,000.00
- Sanity Threshold: 50% (default)

Scenario 1: Normal FSC
  FSC$ = $150.00
  FSC as % of Linehaul = ($150 / $1,000) × 100 = 15%
  15% < 50% threshold
  → Auto-bill ✅

Scenario 2: High FSC (Triggers Alert)
  FSC$ = $600.00
  FSC as % of Linehaul = ($600 / $1,000) × 100 = 60%
  60% > 50% threshold
  → HOLD for review ⚠️
  → Alert to Billing Manager
  → Manual approval required before billing

Scenario 3: Data Error (Caught by Sanity Check)
  DOE entered as $35.00 (should be $3.50) ← DATA ERROR
  Calculated FSC$ = $3,300.00
  FSC as % of Linehaul = ($3,300 / $1,000) × 100 = 330%
  330% > 50% threshold
  → HOLD for review ⚠️⚠️
  → Likely data error, investigate
```

### Configurable Per Customer
- Default: 50%
- Some high-value customers may have lower threshold (e.g., 30%)
- Some customers with volatile routes may have higher threshold (e.g., 75%)

**Example:**
```
Customer A (Standard):
  sanity_threshold = 50%
  If FSC > 50% of linehaul → Hold

Customer B (Strict - High Volume):
  sanity_threshold = 30%
  If FSC > 30% of linehaul → Hold
  (More conservative - catches issues earlier)

Customer C (Flexible - Remote Routes):
  sanity_threshold = 75%
  If FSC > 75% of linehaul → Hold
  (Less restrictive - expects high FSC on remote lanes)
```

---

## 5. WORKFLOW: How They Work Together

### Step-by-Step Billing Flow (REQ.md Section 7, Lines 239-246)

**Step 1: Calculate Raw FSC**
```
Formula applies based on method (Percentage/Per-Mile/Flat/Table)
Result: Raw FSC% and Raw FSC$
```

**Step 2: Apply Cap (if configured)**
```
If cap_type = PERCENTAGE and Raw FSC% > cap_value:
  → FSC% = cap_value
  → Recalculate FSC$ = Linehaul × FSC%

If cap_type = AMOUNT and Raw FSC$ > cap_value:
  → FSC$ = cap_value
```

**Step 3: Apply Floor (if configured)**
```
If floor_type = PERCENTAGE and Raw FSC% < floor_value:
  → FSC% = floor_value
  → Recalculate FSC$ = Linehaul × FSC%

If floor_type = AMOUNT and Raw FSC$ < floor_value:
  → FSC$ = floor_value
```

**Step 4: Check Sanity Threshold**
```
If (Final FSC$ / Linehaul) × 100 > sanity_threshold:
  → HOLD load for manual review
  → DO NOT proceed to Step 5
Else:
  → Proceed to billing
```

**Step 5: Record on Invoice (REQ.md Lines 248-258)**
```
Invoice shows:
  - Final FSC$ (after cap/floor)

Audit trail captures:
  - Raw FSC$ (before cap/floor)
  - Raw FSC% (if applicable)
  - Cap/floor applied? (Yes/No + which value)
  - Index source, index value, index date
  - FSC file ID used
```

---

## 6. Complete Example: All Controls Together

**Scenario:**
```
Customer: XYZ Logistics
Linehaul: $2,000.00

FSC Config:
  Method: Percentage of Linehaul
  Base Price: $2.00
  Increment: $0.10 = 1%
  Current DOE: $5.00
  Cap Type: PERCENTAGE, Cap Value: 20%
  Floor Type: PERCENTAGE, Floor Value: 5%
  Sanity Threshold: 40%

CALCULATION:

Step 1: Calculate Raw FSC
  Raw FSC% = ($5.00 - $2.00) / $0.10 × 1% = 30%
  Raw FSC$ = $2,000 × 30% = $600.00

Step 2: Apply Cap
  Raw FSC% = 30% > Cap = 20%
  → Cap applied: FSC% = 20%
  → FSC$ = $2,000 × 20% = $400.00

Step 3: Apply Floor (already above floor of 5%, no change)
  FSC% = 20% > Floor = 5%
  → No floor adjustment needed

Step 4: Check Sanity Threshold
  FSC% of Linehaul = ($400 / $2,000) × 100 = 20%
  20% < Sanity Threshold = 40%
  → Pass ✅

INVOICE:
  FSC Amount: $400.00

AUDIT TRAIL:
  Raw FSC: $600.00 (30%)
  Capped to: $400.00 (20%)
  Floor: Not applied (already above floor)
  Sanity Check: Pass (20% < 40%)
  Index: DOE National $5.00
```

---

## 7. UI Implications

### Form Display (FSCFileSheet.jsx)

**Cap Section:**
```
Cap Type: [Dropdown: None | Percentage (%) | Dollar ($)]
↓ (if not None)
Cap Value: [Input] with dynamic label based on type
  - If PERCENTAGE: "Cap Value (%)" placeholder "20.00 for 20%"
  - If AMOUNT: "Cap Value ($)" placeholder "200.00"
```

**Floor Section:**
```
Floor Type: [Dropdown: None | Percentage (%) | Dollar ($)]
↓ (if not None)
Floor Value: [Input] with dynamic label based on type
  - If PERCENTAGE: "Floor Value (%)" placeholder "3.00 for 3%"
  - If AMOUNT: "Floor Value ($)" placeholder "50.00"
```

**Sanity Threshold:**
```
Sanity Threshold (%): [Input] default "50.00"
Help text: "If FSC exceeds this % of linehaul, hold for manual review"
```

### Validations to Show:
1. If cap_type != NONE and capValue is empty → Error: "Cap value is required when cap type is set"
2. If floor_type != NONE and floorValue is empty → Error: "Floor value is required when floor type is set"
3. If cap_type != floor_type (and neither is NONE) → Error: "Cap and floor must be the same type (both % or both $)"
4. If both are PERCENTAGE and capValue <= floorValue → Error: "Cap must be greater than floor"

---

## 8. Summary Table

| Control | Purpose | Applied When | Example |
|---------|---------|--------------|---------|
| **Cap (%)** | Limit max FSC percentage | After calculation | Cap=20%, Calc=25% → Final=20% |
| **Cap ($)** | Limit max FSC dollar amount | After calculation | Cap=$200, Calc=$300 → Final=$200 |
| **Floor (%)** | Ensure min FSC percentage | After calculation | Floor=3%, Calc=1% → Final=3% |
| **Floor ($)** | Ensure min FSC dollar amount | After calculation | Floor=$50, Calc=$0 → Final=$50 |
| **Sanity Threshold** | Flag unusually high FSC | Before billing | Threshold=50%, FSC=60% → HOLD |

---

**KEY TAKEAWAYS:**

1. **Cap = Protects Customer** (max they'll pay)
2. **Floor = Protects Carrier** (min carrier will charge)
3. **Sanity = Protects Both** (catches errors before billing)
4. **All are optional** (default = NONE)
5. **Applied AFTER calculation, BEFORE billing**
6. **Audit trail captures both raw and final values**

---

**END OF EXPLANATION**
