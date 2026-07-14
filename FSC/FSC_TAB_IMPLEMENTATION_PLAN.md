# FSC Tab Implementation Plan
## For Load Details in Complete Orders

**Version:** 1.0
**Date:** April 2, 2026
**Purpose:** Add FSC charge tab to completed load details

---

## Current Structure

### **File:** `src/pages/CarrierPortal/Orders/LoadDetails.jsx`

**Route:** `/app/carrier-portal/orders/bulk/complete/load-details?id={loadNo}&tab={tab}&mode=view`

**Existing Tabs (Lines 1416-1444):**
1. **General** (general) - Load details, pickup/dropoff info
2. **Accessorial Charge** (additional-charge) - Additional charges
3. **Product Sale** (product-sale) - Material sales
4. **Audit Log** (audit) - Change history
5. **Tracking** (tracking) - GPS tracking (conditional: only if `!showPodTab`)
6. **POD** (pod) - Proof of Delivery (conditional: only if `showPodTab`)

**Conditional Display Logic:**
```javascript
const showPodTab = isFromDelivered || isFromComplete || isFromHistory;
const showTrackingTab = isViewOnly && !showPodTab;
```

---

## What We Need to Add

### **New Tab:** FSC Charge

**Tab Value:** `fsc`

**Icon:** `TrendingUpIcon` (fuel/surcharge indicator)

**Display Condition:** Should show for completed loads (`isFromComplete`)

**Position:** After "Product Sale", before "Audit Log"

---

## FSC Tab Content Requirements

### **Reference:** FSC/REQ.md Section 7 (Billing Workflow), Lines 247-258

The tab must display FSC calculation details for the load, mirroring the invoice FSC line item requirements.

### **Data to Display:**

#### **1. FSC Summary Card**
```
FSC Charge: $150.00 (15%)
Status: Applied ✓
```

#### **2. Calculation Details**

**Customer Information:**
- Customer Name: "Titan Industries"
- FSC File ID: FSC-2025-001234 (clickable link)
- FSC File Status: Active

**Billing Parameters:**
- Linehaul Amount: $1,000.00
- Miles (if per-mile method): 250 miles
- Applicable Date: Jan 15, 2025 (Pickup Date)

**Index Information:**
- Index Source: DOE National Average
- Index Value Used: $3.50/gallon
- Index Effective Date: Jan 15, 2025
- Last Updated: Jan 15, 2025 10:00 AM

**Calculation Method:**
- Method: Percentage of Linehaul
- Base Price: $2.00/gallon
- Increment: $0.10 = 1.00%
- Formula: `($3.50 - $2.00) / $0.10 × 1.00% = 15%`

**Calculation Breakdown:**
```
Raw FSC Percentage: 15.00%
Raw FSC Amount: $150.00

Cap Applied: None
Floor Applied: None

Final FSC Percentage: 15.00%
Final FSC Amount: $150.00
```

**Additional Settings:**
- Update Frequency: Weekly
- Effective Date Logic: Pickup Date
- Sanity Threshold: 50% (Pass ✓)

#### **3. Special Cases Display**

**If fsc_applies = NO:**
```
FSC Status: Not Applicable
Customer Configuration: No FSC
FSC Amount: $0.00
```

**If fsc_applies = YES_ALL_IN:**
```
FSC Status: All-In Rate
Customer Configuration: Fuel cost built into linehaul rate
No separate FSC line item
```

**If Cap/Floor Applied:**
```
Cap Applied: Yes
  Cap Type: Percentage
  Cap Value: 20%
  Original FSC: $250.00 (25%)
  Capped FSC: $200.00 (20%)
  Customer Saved: $50.00
```

**If Sanity Threshold Exceeded:**
```
⚠️ FSC Exceeds Sanity Threshold
  Calculated FSC: $600.00 (60% of linehaul)
  Sanity Threshold: 50%
  Status: Held for Manual Review
  Reviewed By: John Manager
  Approved: Yes
```

#### **4. Actions**

- **View FSC File** → Navigate to customer FSC profile
- **Recalculate FSC** → Trigger manual recalculation (if needed)
- **View Index History** → Show DOE history chart
- **Export FSC Details** → Download PDF/CSV

---

## Implementation Steps

### **Step 1: Add Import for TrendingUp Icon**

**Location:** Line 76 (with other icon imports)

```javascript
import {
  // ... existing imports
  TrendingUpIcon, // Add this
} from "lucide-react";
```

### **Step 2: Add FSC Tab State Variable**

**Location:** Around line 91-100 (with other state)

```javascript
const showFSCTab = isFromComplete; // Show FSC tab only for completed loads
```

### **Step 3: Add TabsTrigger for FSC**

**Location:** After line 1428 (after Product Sale trigger)

```javascript
<TabsTrigger value="product-sale" className="h-full">
  <ShoppingCart className="size-4" />
  Product Sale
</TabsTrigger>

{/* NEW FSC TAB */}
{showFSCTab && (
  <TabsTrigger value="fsc" className="h-full">
    <TrendingUpIcon className="size-4" />
    FSC Charge
  </TabsTrigger>
)}

<TabsTrigger value="audit" className="h-full">
  <History className="size-4" />
  Audit Log
</TabsTrigger>
```

### **Step 4: Create FSC TabsContent**

**Location:** After Product Sale TabsContent (search for `value="product-sale"` TabsContent closing tag)

```javascript
{/* FSC Charge Tab */}
{showFSCTab && (
  <TabsContent
    value="fsc"
    className="space-y-4 h-full mt-0 px-4 py-4"
  >
    {/* FSC Content Here */}
  </TabsContent>
)}
```

### **Step 5: Create FSC Tab Component Structure**

**Components Needed:**

```javascript
{/* FSC Summary Card */}
<div className="w-full border rounded-sm bg-card">
  <div className="px-4 py-4 border-b bg-muted">
    <h3 className="text-sm font-semibold flex items-center gap-2">
      <TrendingUpIcon className="size-4" />
      Fuel Surcharge (FSC)
    </h3>
  </div>
  <div className="px-4 py-4">
    {/* Summary */}
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div>
        <p className="text-xs text-muted-foreground">FSC Amount</p>
        <p className="text-2xl font-bold text-emerald-600">$150.00</p>
        <p className="text-sm text-muted-foreground">(15.00% of linehaul)</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Status</p>
        <Badge variant="success">Applied</Badge>
      </div>
    </div>
  </div>
</div>

{/* Calculation Details Card */}
<div className="w-full border rounded-sm bg-card">
  <div className="px-4 py-3 border-b bg-muted">
    <h3 className="text-sm font-semibold">Calculation Details</h3>
  </div>
  <div className="px-4 py-4">
    {/* Details Grid */}
  </div>
</div>

{/* Index Information Card */}
<div className="w-full border rounded-sm bg-card">
  <div className="px-4 py-3 border-b bg-muted">
    <h3 className="text-sm font-semibold">Index Information</h3>
  </div>
  <div className="px-4 py-4">
    {/* Index details */}
  </div>
</div>

{/* Calculation Breakdown Card */}
<div className="w-full border rounded-sm bg-card">
  <div className="px-4 py-3 border-b bg-muted">
    <h3 className="text-sm font-semibold">Calculation Breakdown</h3>
  </div>
  <div className="px-4 py-4">
    {/* Step-by-step calculation */}
  </div>
</div>
```

---

## Mock Data Structure

### **For Testing/Demo:**

```javascript
const mockFSCData = {
  customer: {
    name: "Titan Industries",
    fscFileId: "FSC-2025-001234",
    fscApplies: "YES_ITEMIZED", // or "YES_ALL_IN" or "NO"
  },
  load: {
    loadNo: "ML-2025-000901",
    linehaul: 1000.00,
    miles: 250,
    pickupDate: "2025-01-15",
    invoiceDate: "2025-01-20",
  },
  fsc: {
    calculationMethod: "PERCENT_LINEHAUL", // or "PER_MILE", "FLAT_FEE", "CUSTOMER_TABLE"
    indexSource: "DOE_NATIONAL",
    indexValue: 3.50,
    indexEffectiveDate: "2025-01-15",
    indexLastUpdated: "2025-01-15T10:00:00Z",

    // Formula parameters
    basePrice: 2.00,
    incrementPrice: 0.10,
    incrementValue: 1.00, // 1%

    // Calculation results
    rawFSCPercentage: 15.00,
    rawFSCAmount: 150.00,

    // Cap/Floor
    capType: "NONE", // or "PERCENTAGE", "AMOUNT"
    capValue: null,
    floorType: "NONE",
    floorValue: null,

    // Final
    finalFSCPercentage: 15.00,
    finalFSCAmount: 150.00,

    // Settings
    updateFrequency: "WEEKLY",
    effectiveDateLogic: "PICKUP_DATE",
    sanityThreshold: 50.00,

    // Status
    status: "APPLIED", // or "NOT_APPLICABLE", "ALL_IN", "HELD_FOR_REVIEW"
    capApplied: false,
    floorApplied: false,
    exceedsSanityThreshold: false,
  },
};
```

---

## Navigation Updates

### **Update Complete.jsx to Support FSC Tab Link**

**Location:** `src/pages/CarrierPortal/Orders/Complete.jsx`

When clicking on a load, add FSC as a tab option:

```javascript
// In load actions dropdown
<DropdownMenuItem
  onClick={() => {
    window.location.href = `/app/carrier-portal/orders/bulk/complete/load-details?id=${row.original.loadNo}&tab=fsc&mode=view`;
  }}
>
  <TrendingUpIcon className="h-4 w-4" />
  View FSC Charge
</DropdownMenuItem>
```

---

## UI Design Guidelines

### **Color Scheme:**
- FSC Applied (success): Green badges, green amounts
- FSC Not Applicable: Gray/muted
- FSC All-In: Blue info badge
- FSC Held for Review: Amber/warning

### **Layout:**
```
┌─────────────────────────────────────────────────┐
│ [TrendingUp Icon] Fuel Surcharge (FSC)         │
├─────────────────────────────────────────────────┤
│                                                 │
│  FSC Amount: $150.00                Status: ✓  │
│  (15.00% of linehaul)               Applied    │
│                                                 │
├─────────────────────────────────────────────────┤
│ Calculation Details                             │
├─────────────────────────────────────────────────┤
│  Customer: Titan Industries                     │
│  FSC File: FSC-2025-001234 [View]              │
│  Method: Percentage of Linehaul                 │
│  Linehaul: $1,000.00                           │
│                                                 │
├─────────────────────────────────────────────────┤
│ Index Information                               │
├─────────────────────────────────────────────────┤
│  Source: DOE National Average                   │
│  Value: $3.50/gal                              │
│  Effective: Jan 15, 2025                       │
│                                                 │
├─────────────────────────────────────────────────┤
│ Calculation Breakdown                           │
├─────────────────────────────────────────────────┤
│  Formula: ($3.50 - $2.00) / $0.10 × 1% = 15%  │
│  Raw FSC: $150.00                              │
│  Cap: None                                      │
│  Floor: None                                    │
│  Final FSC: $150.00                            │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Testing Scenarios

### **Test Case 1: Standard FSC (Percentage)**
```
Customer: Titan
Method: Percentage of Linehaul
Linehaul: $1,000
DOE: $3.50
Base: $2.00
Result: $150.00 (15%)
```

### **Test Case 2: FSC with Cap**
```
Customer: ABC Corp
Method: Percentage
Calculated: 25% ($250)
Cap: 20%
Result: $200.00 (capped)
```

### **Test Case 3: No FSC (fsc_applies = NO)**
```
Customer: XYZ LLC
Configuration: No FSC
Result: $0.00 (not applicable)
```

### **Test Case 4: All-In Rate**
```
Customer: DEF Inc
Configuration: All-In Rate
Result: No FSC line (fuel cost in linehaul)
```

### **Test Case 5: Sanity Threshold Exceeded**
```
Customer: GHI Ltd
Calculated: $600 (60% of linehaul)
Threshold: 50%
Status: Held for manual review
```

---

## Success Criteria

- ✅ FSC tab appears only for completed loads
- ✅ Tab shows FSC summary (amount, percentage, status)
- ✅ Displays all calculation details from FSC billing workflow
- ✅ Shows which FSC file was used (with link to customer FSC profile)
- ✅ Shows index value and source used
- ✅ Displays formula and calculation breakdown
- ✅ Handles cap/floor applied scenarios
- ✅ Shows sanity threshold status
- ✅ Handles special cases (NO, ALL_IN, exceeded threshold)
- ✅ Matches design pattern of other tabs (General, Accessorial, etc.)

---

## Files to Modify

1. **`src/pages/CarrierPortal/Orders/LoadDetails.jsx`**
   - Add TrendingUpIcon import
   - Add showFSCTab state variable
   - Add FSC TabsTrigger
   - Add FSC TabsContent with full component

2. **`src/pages/CarrierPortal/Orders/Complete.jsx`** (Optional enhancement)
   - Add "View FSC Charge" action in dropdown menu

---

## Future Enhancements (Phase 2)

- **Real-time FSC recalculation** - Allow manual recalculation if DOE value changed
- **FSC history chart** - Show how FSC has changed over time for this customer
- **Compare FSC files** - If FSC file changed, show before/after comparison
- **Export FSC details** - Generate PDF report of FSC calculation
- **Audit trail integration** - Show when FSC was calculated, by whom, any manual overrides

---

**END OF PLAN**
