
# FSC Module Implementation Plan
## Mockup Development Roadmap

**Version:** 1.1 (Approval Logic Removed)
**Date:** April 2, 2026
**Status:** Ready for Development
**Reference Document:** FSC/REQ.md v1.2
**Note:** Approval workflow features deferred to future phase

---

## Table of Contents
1. [Current Status](#current-status)
2. [Phase 1: Core Operations](#phase-1-core-operations-high-priority)
3. [Phase 2: Workflow Support](#phase-2-workflow-support-medium-priority)
4. [Phase 3: Advanced Features](#phase-3-advanced-features-low-priority)
5. [Implementation Sequence](#implementation-sequence)

---

## Current Status

### ✅ Already Implemented
1. **Index Management Screen** - `src/pages/CarrierPortal/FSC/IndexManagement.jsx`
   - Current index cards with price display
   - Historical fetch table
   - Status indicators (Current/Stale/Failed)

2. **Customer FSC Tab** - `src/pages/CarrierPortal/Customers/CustomerDetails/FSC/FSCTab.jsx`
   - Basic FSC file list
   - Create new file button
   - Settings button

3. **FSC File Form** - `src/pages/CarrierPortal/Customers/CustomerDetails/FSC/FSCFileSheet.jsx`
   - Basic calculation setup
   - 4 calculation methods (Percentage, Per-Mile, Flat Fee, Customer Table)
   - Date & frequency selection

4. **FSC Settings** - `src/pages/CarrierPortal/Customers/CustomerDetails/FSC/FSCSettingsSheet.jsx`
   - FSC applicability (YES_ITEMIZED/YES_ALL_IN/NO)

---

## Phase 1: Core Operations (HIGH PRIORITY)

### 1. FSC Dashboard (Global Operations View)
**Priority:** CRITICAL
**Location:** `/app/carrier-portal/fsc/dashboard`
**Estimated Effort:** 3-4 days

#### Why This is Needed:
**Reference:** Section 16.2 - "FSC Dashboard (Operations View)"

> **REQ.md Lines 599-605:**
> "16.2 FSC Dashboard (Operations View)
> •	List all customers with Active FSC files
> •	Show current FSC % or amount per customer
> •	Highlight customers with stale index data
> •	Show loads in billing queue flagged for FSC issues
> •	Show customers with CUSTOM frequency rules that may need manual attention"
>
> **Note:** Pending Approval status tracking removed for this phase

#### Components to Build:
- **Metric Cards:**
  - Total Customers with Active FSC
  - Stale Index Sources (count with alert badge)
  - Loads Held for FSC Issues (count)
  - Total FSC Files in System

- **Customers Table:**
  - Columns: Customer Name, FSC Method, Current FSC %, Index Source, Last Updated, Status
  - Color-coded status badges
  - Quick actions: View Profile, Edit FSC File
  - Filters: By Status, By Index Source, Issues Only toggle

- **Alerts Panel:**
  - Recent alerts from Section 14 (Error Handling table)
  - Clickable to navigate to resolution screen

#### Success Criteria:
- Operations team can see all FSC files at a glance
- Issues are highlighted and actionable
- Matches requirements from Section 16.2

---

### 2. FSC Billing Queue Screen
**Priority:** CRITICAL
**Location:** `/app/carrier-portal/fsc/billing-queue` OR integrate into existing billing module
**Estimated Effort:** 4-5 days

#### Why This is Needed:
**Reference:** Multiple edge cases require manual intervention during billing

> **REQ.md Lines 388-398 (EC-4):**
> "Expected Behavior:
> •	System logs a warning: 'No FSC file found for customer [name/ID]'
> •	Load is flagged for review in the billing queue
> •	Invoice is generated WITHOUT FSC initially
> •	System prompts the responsible user (Jesus's team) with three options:
> ◦	Option A: Proceed without FSC
> ◦	Option B: Upload FSC now
> ◦	Option C: Hold for review"

> **REQ.md Lines 401-408 (EC-5):**
> "Expected Behavior:
> •	System cannot find a matching row
> •	Do NOT calculate FSC — do NOT guess, interpolate, or use nearest row
> •	Flag load for manual review in billing queue
> •	Alert Jesus's team that customer table has coverage gap
> •	Wait for human resolution before billing FSC"

> **REQ.md Lines 558 (Section 14):**
> "FSC exceeds sanity_threshold	Hold for manual review	Alert to Billing Manager"

#### Components to Build:
- **Flagged Loads Table:**
  - Columns: Load #, Customer, Issue Type, Pickup Date, Linehaul Amount, Current Status, Actions
  - Issue Types (from Section 13 & 14):
    - No FSC File (EC-4)
    - Table Gap (EC-5)
    - Table Exceeded (EC-6)
    - Exceeds Sanity Threshold (Section 12.2 - B9)
    - Stale Index Data (EC-3)
    - Zero Miles/Linehaul (EC-15, EC-16)

- **3-Option Modal** (for EC-4 - No FSC File):
  - Button A: "Proceed without FSC" → Mark customer as fsc_applies = NO
  - Button B: "Upload FSC Now" → Opens FSCFileSheet immediately, once saved the flagged load is recalculated with FSC
  - Button C: "Hold for Review" → Keep flagged, send alert to Jesus's team

- **Manual FSC Entry Modal** (for table gaps):
  - Input: FSC amount or percentage
  - Reason field (required)
  - Performed by (auto-captured)
  - Creates audit trail entry

- **Bulk Actions Toolbar:**
  - Recalculate Selected
  - Hold All Selected
  - Export to CSV

#### Success Criteria:
- All edge cases from Section 13 can be resolved
- Matches EC-4 3-option workflow exactly
- Complete audit trail of manual interventions

---

### 3. Complete FSC File Form (Enhancement)
**Priority:** HIGH
**Location:** `src/pages/CarrierPortal/Customers/CustomerDetails/FSC/FSCFileSheet.jsx`
**Estimated Effort:** 2-3 days

#### Why This is Needed:
**Reference:** Section 4.1 - FSC File Entity (Complete Data Model)

Current form is missing required fields from the data model specification.

> **REQ.md Lines 68-99 (Section 4.1):**
> Complete FSC File Entity with 30+ fields

**Missing Critical Fields:**

#### A. Cap & Floor (Currently Incomplete)
> **Lines 87-90:**
> "cap_type	ENUM	No (default: NONE)	NONE | PERCENTAGE | AMOUNT
> cap_value	DECIMAL(10,2)	If cap_type != NONE	Cap value
> floor_type	ENUM	No (default: NONE)	NONE | PERCENTAGE | AMOUNT
> floor_value	DECIMAL(10,2)	If floor_type != NONE	Floor value"

> **Lines 103-104 (IMPORTANT DATA MODEL DECISIONS):**
> "Cap and floor are OPTIONAL — not every customer will have them. When set, they are mutually exclusive by type: a customer has EITHER a percentage cap OR a dollar cap, never both simultaneously."

**What to Add:**
- Cap Type dropdown: None, Percentage (%), Dollar ($)
- Cap Value input (conditional - shown only if type != None)
- Floor Type dropdown: None, Percentage (%), Dollar ($)
- Floor Value input (conditional - shown only if type != None)

#### B. Flat Fee Type (Currently Missing)
> **Lines 82-83:**
> "flat_fee_amount	DECIMAL(10,4)	If method = FLAT_FEE	Static value per load
> flat_fee_type	ENUM	If method = FLAT_FEE	DOLLAR | PERCENTAGE"

> **Lines 191-197 (Section 6.3):**
> "Formulas:
> •	If flat_fee_type = DOLLAR: FSC Amount = flat_fee_amount
> •	If flat_fee_type = PERCENTAGE: FSC Amount = linehaul × flat_fee_amount"

**What to Add:**
- Flat Fee Type radio buttons: "Fixed Dollar Amount" | "Fixed Percentage of Linehaul"
- Update label dynamically based on selection

#### C. Custom Frequency Rule (Required for Validation V14)
> **Lines 84-85:**
> "custom_frequency_rule	TEXT	If update_frequency = CUSTOM	Free-text description"

> **Lines 347-348 (Validation V14):**
> "V14	If update_frequency = CUSTOM, custom_frequency_rule must not be empty	Custom frequency rule description required	Block save"

**What to Add:**
- Textarea field (shown when update_frequency = CUSTOM)
- Placeholder: "Example: Calculate FSC on the second-to-last Monday of each month using that day's DOE. Apply to all loads for the following month."
- Required validation

#### D. Customer Specified Date Rule (Required for Validation V12)
> **Lines 86-87:**
> "customer_specified_date_rule	TEXT	If logic = CUSTOMER_SPECIFIED	Free-text description"

> **Lines 346-347 (Validation V12):**
> "V12	If effective_date_logic = CUSTOMER_SPECIFIED, customer_specified_date_rule must not be empty	Custom date rule description required	Block save"

**What to Add:**
- Textarea field (shown when effective_date_logic = CUSTOMER_SPECIFIED)
- Required validation

#### E. Notes Field
> **Lines 99:**
> "notes	TEXT	No	Free-text notes (reason for changes, etc.)"

**What to Add:**
- Notes textarea (reason for changes, special instructions, etc.)

**Note:** Approval fields (approval_status, approval_reference) deferred to future phase

#### F. Sanity Threshold
> **Lines 92-93:**
> "sanity_threshold	DECIMAL(5,2)	No (default: 50.00)	Configurable threshold (%)"

> **Lines 106-107 (Decision #11):**
> "B9 sanity threshold be hardcoded at 50% or configurable?	Configurable per customer. New field: sanity_threshold (default 50%)."

**What to Add:**
- Sanity Threshold input (default: 50)
- Help text: "If FSC exceeds this % of linehaul, hold for manual review"

#### G. All Validations (Section 12.1)
> **Lines 332-350 (Validations V1-V15):**

Implement all 15 validation rules with exact error messages from the spec.

**Example:**
- V6: "increment_price must be > 0" → "Increment price must be greater than zero"
- V9: "If both cap and floor are %, cap > floor" → "Cap must be greater than floor"
- V15: "Cap and floor must be same type" → "Cap and floor must be the same type (both % or both $)"

#### Success Criteria:
- Form has all 30+ fields from Section 4.1
- All V1-V15 validations implemented
- Conditional field display working correctly
- Matches data model exactly

---

## Phase 2: Workflow Support (MEDIUM PRIORITY)

### 4. Audit Log Component
**Priority:** MEDIUM
**Location:** Tab in FSC Profile or expandable section
**Estimated Effort:** 2 days

#### Why This is Needed:
**Reference:** Section 10 - Audit Trail Requirements

> **REQ.md Lines 296-308 (Section 10):**
> "Every FSC-related action must be logged. The audit trail is immutable — entries cannot be edited or deleted."

> **Lines 298-308 (Audit Log Entity):**
> "audit_id, fsc_file_id, action (CREATED | EDITED | STATUS_CHANGE), field_changed, old_value, new_value, performed_by, performed_at, reason"

**Note:** OVERRIDE and APPROVAL_RECEIVED action types removed for this phase

#### Components to Build:
- **Timeline View:**
  - Chronological list of all changes
  - Color-coded by action type:
    - CREATED = Green
    - EDITED = Blue
    - STATUS_CHANGE = Orange

- **Entry Card:**
  - Action badge
  - Timestamp
  - Performed by (user name + role)
  - Field changed (if applicable)
  - Old → New value comparison
  - Reason (if provided)

- **Filters:**
  - By action type
  - By date range
  - By user

#### Success Criteria:
- Complete history visible
- Read-only (no edit/delete)
- Matches audit log entity from Section 10.1
- Reason field shown for all EDITED actions

---

### 5. Customer Table Manager
**Priority:** MEDIUM
**Location:** Modal/Sheet when calculation_method = CUSTOMER_TABLE
**Estimated Effort:** 3 days

#### Why This is Needed:
**Reference:** Section 4.3 - FSC Custom Table Rows

> **REQ.md Lines 117-128 (Section 4.3):**
> "CRITICAL: Range bounds use half-open intervals: fuel_price_from <= index_value < fuel_price_to. This prevents overlap between adjacent ranges."

Customer tables require complex validation that can't be done in a simple CSV upload.

> **Lines 401-408 (EC-5):**
> "Customer's FSC table covers $2.50 to $3.00 and $3.10 to $3.50, but current DOE is $3.05 (falls in gap)... Do NOT calculate FSC"

> **Lines 410-415 (EC-6):**
> "Customer's table goes up to $4.00 but current DOE is $4.25... Use the highest row in the table... Alert Jesus's team"

#### Components to Build:
- **Upload Zone:**
  - Drag & drop CSV/Excel
  - Parse file and validate
  - Show preview before saving

- **Validation Alerts:**
  - ❌ Gaps detected (list specific gaps)
  - ❌ Overlaps detected (shouldn't happen with half-open intervals, but check)
  - ⚠️ Last row fuel_price_to not set to 999.99 (warn about high prices)
  - ✅ All ranges valid

- **Table Grid:**
  - Columns: From ($), To ($), Surcharge Value, Surcharge Type
  - Editable inline
  - Add row / Delete row buttons
  - Half-open interval notation shown: "[From, To)"

- **Range Visual:**
  - Bar chart showing coverage
  - Gaps highlighted in red
  - Current index value marker

#### Success Criteria:
- Validates half-open intervals per Section 4.3
- Detects gaps (EC-5)
- Detects exceeded ranges (EC-6)
- Matches custom table row entity

---

## Phase 3: Advanced Features (LOW PRIORITY)

### 6. FSC File Comparison View
**Priority:** LOW
**Location:** Modal/Sheet when creating new FSC file to replace existing
**Estimated Effort:** 2 days

#### Why This is Needed:
**Reference:** Section 8.2 - State Transitions

> **REQ.md Lines 268-271 (Section 8.2):**
> "Scheduled → Active: Automatic when effective_start_date arrives. Previous Active file auto-expires (effective_end_date set to day before new file's start date)."

When creating a new FSC file, users need to understand what will change.

#### Components to Build:
- **Side-by-Side Comparison:**
  - Left: Current Active file
  - Right: New Scheduled file
  - Diff highlighting:
    - Green = New value
    - Red = Old value
    - Yellow = Changed value

- **Impact Summary:**
  - "FSC will increase/decrease by X% on [effective_start_date]"
  - "Calculation method changing from [old] to [new]"
  - "Index source changing from [old] to [new]"

- **Transition Timeline:**
  - Shows current Active, transition date, new Active
  - Visual timeline bar

#### Success Criteria:
- All field differences clearly shown
- Impact on billing visible
- Matches lifecycle from Section 8

---

### 7. Manual Index Entry Form
**Priority:** LOW
**Location:** Modal in Index Management screen
**Estimated Effort:** 1 day

#### Why This is Needed:
**Reference:** Section 4.1 - index_source = CUSTOM

> **REQ.md Lines 76:**
> "index_source	ENUM	If fsc_applies = YES_ITEMIZED	DOE_NATIONAL | DOE_GULF_COAST | DOE_EAST_COAST | OPIS | CUSTOM"

> **REQ.md Lines 144-145 (Section 5):**
> "Custom Tables	Manual upload to customer profile	As needed	Jesus's Team	N/A"

Some customers have custom index sources that aren't auto-fetched.

#### Components to Build:
- **Manual Entry Form:**
  - Index Source: CUSTOM (read-only)
  - Effective Date (date picker)
  - Price per Gallon (decimal input, $X.XXX)
  - Notes (why this value, source reference)
  - Created by (auto-captured)

- **Validation:**
  - Price > $0.00 and < $10.00 (per Section 5.2)
  - Unique effective_date for this source
  - Notes required for manual entries

#### Success Criteria:
- Stores in same index_data table
- Marked as manual entry in audit trail
- Validates per Section 5.2

---

### 8. Invoice FSC Detail View
**Priority:** LOW
**Location:** Enhancement to existing invoice screens
**Estimated Effort:** 2 days

#### Why This is Needed:
**Reference:** Section 16.3 - Invoice View

> **REQ.md Lines 606-611 (Section 16.3):**
> "16.3 Invoice View
> •	FSC displayed as a separate line item per invoice line
> •	Show: amount, percentage (if applicable), and index reference
> •	Hover/click on FSC line shows: index source, index value, index date, FSC file ID, calculation method, raw amount before cap/floor"

> **REQ.md Lines 247-258 (Section 7 - Step 7):**
> "Create an FSC line item on the invoice with the following data:
> •	FSC dollar amount (final, after cap/floor)
> •	FSC dollar amount before cap/floor (raw calculated value)
> •	FSC percentage (if applicable)
> •	Index source used
> •	Index value used
> •	Index effective date used
> •	FSC file ID used
> •	Calculation method
> •	Cap/floor applied (yes/no, and which value)"

#### Components to Build:
- **FSC Line Item:**
  - Shows: "Fuel Surcharge: $150.00 (15%)"
  - Click to expand details

- **Expanded Details Panel:**
  - Index Used: DOE National Average
  - Index Value: $3.50/gal (effective Mar 25, 2026)
  - Calculation Method: Percentage of Linehaul
  - Raw FSC: $150.00
  - Cap/Floor Applied: None
  - FSC File ID: [clickable link to file]
  - Base Price: $2.00, Increment: $0.10 = 1%

- **Special Cases:**
  - fsc_applies = NO → Show "$0.00 FSC (No FSC applies)"
  - fsc_applies = YES_ALL_IN → Hide FSC line completely
  - Cap/Floor applied → Show "Capped at 20%" or "Floored at 3%"

#### Success Criteria:
- All audit data from Section 7 Step 7 visible
- Matches Section 16.3 requirements
- Handles all 3 fsc_applies cases correctly

---

## Implementation Sequence

### Week 1-2: Core Operations
1. ✅ **Complete FSC File Form** (add all missing fields + validations) - **3 days**
2. ✅ **FSC Dashboard** - **4 days**
3. ✅ **FSC Billing Queue** - **5 days**

### Week 3: Workflow Support
4. ✅ **Audit Log Component** - **2 days**
5. ✅ **Customer Table Manager** - **3 days**

### Week 4: Advanced Features
6. ✅ **FSC File Comparison** - **2 days**
7. ✅ **Manual Index Entry** - **1 day**
8. ✅ **Invoice FSC Details** - **2 days**

**Total Estimated Time:** 22 days (4.5 weeks)

**Removed from this phase (deferred to future):**
- ❌ Approval Workflow Screen (was 2 days)
- ❌ Manager Override Modal (was 1 day)

---

## Validation Checklist

Before marking each component complete, verify:

- ✅ All referenced sections from REQ.md implemented
- ✅ All validation rules (V1-V15, B1-B9) enforced
- ✅ All edge cases (EC-1 to EC-24) handled (excluding approval-related cases)
- ✅ Audit trail captured per Section 10 (CREATED, EDITED, STATUS_CHANGE actions only)
- ✅ Error messages match exact text from REQ.md Section 12
- ✅ UI matches requirements from Section 16
- ✅ All data model fields from Section 4.1 present (excluding approval fields)

---

## Notes

- Each component references specific line numbers from REQ.md for traceability
- Priority levels based on operational impact and dependency chain
- Estimated efforts are for mockup/UI development only (no backend)
- All requirements are from FSC/REQ.md v1.2 (February 20, 2026)
- **Approval workflow features deferred:** Components removed include Approval Workflow Screen, Manager Override Modal, and related approval status tracking
- FSC files will be created and immediately set to Active status (no Pending Approval state in this phase)

---

**END OF IMPLEMENTATION PLAN**
