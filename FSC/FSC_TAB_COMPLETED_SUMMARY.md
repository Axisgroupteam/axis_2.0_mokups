# FSC Tab Implementation - Completed Summary

**Date:** April 2, 2026
**File Modified:** `src/pages/CarrierPortal/Orders/LoadDetails.jsx`
**Status:** ✅ COMPLETED

---

## What Was Implemented

### **1. FSC Tab Added to Load Details**

**Location:** Orders → Complete → Load Details

**Route:** `/app/carrier-portal/orders/bulk/complete/load-details?id={loadNo}&tab=fsc&mode=view`

**Display Condition:** Only shows for completed loads (`isFromComplete`)

---

## Changes Made

### **File: `src/pages/CarrierPortal/Orders/LoadDetails.jsx`**

#### **1. Added Icon Import** (Line 77)
```javascript
import { TrendingUpIcon } from "lucide-react";
```

#### **2. Added Display Condition** (Line 93)
```javascript
const showFSCTab = isFromComplete; // Show FSC tab only for completed loads
```

#### **3. Added Mock FSC Data** (Lines 323-373)
```javascript
const mockFSCData = {
  customer: {
    name: "Titan Industries",
    fscFileId: "FSC-2025-001234",
    fscApplies: "YES_ITEMIZED",
  },
  load: {
    loadNo: loadId,
    linehaul: 1000.00,
    miles: 250,
    pickupDate: "2024-12-10",
    invoiceDate: "2024-12-15",
  },
  fsc: {
    calculationMethod: "PERCENT_LINEHAUL",
    indexSource: "DOE_NATIONAL",
    indexValue: 3.50,
    // ... full calculation details
    finalFSCAmount: 150.00,
    finalFSCPercentage: 15.00,
  },
};
```

#### **4. Added FSC Tab Trigger** (Lines 1484-1489)
```javascript
{showFSCTab && (
  <TabsTrigger value="fsc" className="h-full">
    <TrendingUpIcon className="size-4" />
    FSC Charge
  </TabsTrigger>
)}
```

#### **5. Added FSC Tab Content** (After Product Sale tab, before Audit Log)
Complete FSC tab with:
- FSC Summary Card
- Customer & Load Information
- Index Information
- Calculation Details
- Calculation Breakdown
- Special case handling (NO, ALL_IN, Cap/Floor applied)

---

## FSC Tab Features

### **1. FSC Summary Card**
Displays:
- FSC Amount: $150.00
- FSC Percentage: 15.00%
- Status: Applied ✓
- Load Number

**Cap/Floor Alerts:**
- Amber alert if cap was applied
- Blue alert if floor was applied
- Shows original vs. final amounts

### **2. Customer & Load Information**
Shows:
- Customer Name: "Titan Industries"
- FSC File ID: FSC-2025-001234 (clickable)
- Linehaul Amount: $1,000.00
- Miles: 250 miles
- Pickup Date: 2024-12-10
- Invoice Date: 2024-12-15

### **3. Index Information**
Displays:
- Index Source: DOE National Average
- Index Value: $3.50/gallon
- Effective Date: 2024-12-10
- Last Updated: Dec 10, 2024 10:00 AM

### **4. Calculation Details**
Shows:
- Calculation Method: Percentage of Linehaul
- Base Price: $2.00/gal
- Increment Price: $0.10
- Increment Value: 1.00%
- Formula breakdown with step-by-step calculation
- Update Frequency: Weekly
- Effective Date Logic: Pickup Date

### **5. Calculation Breakdown**
Lists:
- Raw FSC Percentage: 15.00%
- Raw FSC Amount: $150.00
- Cap Applied: None
- Floor Applied: None
- Sanity Threshold: 50% ✓ Pass
- **Final FSC Amount: $150.00** (highlighted in green)

---

## Special Cases Handled

### **Case 1: fsc_applies = "NO"**
```
┌─────────────────────────────────────┐
│ Fuel Surcharge (FSC)               │
├─────────────────────────────────────┤
│                                     │
│     [Not Applicable Badge]          │
│                                     │
│  This customer is configured with   │
│  No FSC.                            │
│                                     │
│  FSC Amount: $0.00                  │
│                                     │
└─────────────────────────────────────┘
```

### **Case 2: fsc_applies = "YES_ALL_IN"**
```
┌─────────────────────────────────────┐
│ Fuel Surcharge (FSC)               │
├─────────────────────────────────────┤
│                                     │
│     [All-In Rate Badge]             │
│                                     │
│  This customer has fuel cost built  │
│  into the linehaul rate.            │
│                                     │
│  No separate FSC line item on       │
│  invoice.                           │
│                                     │
└─────────────────────────────────────┘
```

### **Case 3: Cap Applied**
```
⚠️ Cap Applied
Original FSC: $250.00 (25%)
Capped to: $200.00 (Customer saved: $50.00)
```

### **Case 4: Floor Applied**
```
⚠️ Floor Applied
Original FSC: $10.00
Floored to: $30.00 (Carrier minimum applied)
```

---

## How to Access

1. Navigate to **Orders** → **Complete** tab
2. Click on any completed load
3. Click **"View Details"** or click directly on load row
4. You'll see tabs: General, Accessorial Charge, Product Sale, **FSC Charge**, Audit Log, POD
5. Click **FSC Charge** tab

**Direct URL:**
```
/app/carrier-portal/orders/bulk/complete/load-details?id=ML-2025-000901&tab=fsc&mode=view
```

---

## UI Design

### **Color Scheme:**
- **Applied FSC**: Green (#10B981 - emerald-500)
- **Not Applicable**: Gray/muted
- **All-In Rate**: Blue (#3B82F6 - blue-500)
- **Cap Applied**: Amber (#F59E0B - amber-500)
- **Floor Applied**: Blue (#3B82F6 - blue-500)
- **Sanity Pass**: Green checkmark
- **Sanity Exceeded**: Red warning

### **Layout Structure:**
```
FSC Tab
├── FSC Summary Card
│   ├── Amount & Percentage (large, bold)
│   ├── Status badge
│   └── Cap/Floor alerts (if applicable)
├── Customer & Load Information
│   └── 2-column grid with key details
├── Index Information
│   └── 2-column grid with DOE data
├── Calculation Details
│   ├── Method info
│   ├── Formula parameters
│   ├── Formula breakdown (in code box)
│   └── Settings (frequency, date logic)
└── Calculation Breakdown
    ├── Step-by-step values
    ├── Cap/Floor status
    ├── Sanity threshold check
    └── Final amount (highlighted)
```

---

## Mock Data Values

```javascript
Customer: Titan Industries
FSC File: FSC-2025-001234
Load: ML-2025-000901
Linehaul: $1,000.00
Miles: 250

Index Source: DOE National Average
Index Value: $3.50/gal
Base Price: $2.00/gal
Increment: $0.10 = 1%

Calculation:
  ($3.50 - $2.00) / $0.10 × 1% = 15%
  $1,000 × 15% = $150.00

Cap: None
Floor: None
Final FSC: $150.00
```

---

## Testing

### **Test Scenario 1: View FSC Tab**
1. Go to Complete tab
2. Click on load ML-2025-000901
3. Click FSC Charge tab
4. ✅ Should show FSC amount $150.00 (15%)

### **Test Scenario 2: Check Formula**
1. Open FSC tab
2. Scroll to "Calculation Details"
3. ✅ Should show: `($3.50 - $2.00) / $0.10 × 1.00% = 15.00%`

### **Test Scenario 3: Click FSC File Link**
1. Open FSC tab
2. In "Customer & Load Information", click on FSC File ID
3. ✅ Should navigate to customer FSC profile (to be implemented)

### **Test Scenario 4: Change Mock Data**
To test different scenarios, modify `mockFSCData`:

**Test NO FSC:**
```javascript
fscApplies: "NO"
```

**Test All-In Rate:**
```javascript
fscApplies: "YES_ALL_IN"
```

**Test Cap Applied:**
```javascript
rawFSCAmount: 250.00,
finalFSCAmount: 200.00,
capApplied: true,
capType: "PERCENTAGE",
capValue: 20.00
```

---

## Next Steps (Future Enhancements)

### **Phase 2:**
1. **Real FSC Data Integration**
   - Replace mock data with actual FSC calculations from backend
   - Fetch customer FSC file from database
   - Get real-time DOE index values

2. **FSC File Link**
   - Make FSC File ID clickable
   - Navigate to: `/app/carrier-portal/customers/{customerId}/fsc`
   - Open FSC Profile tab directly

3. **Recalculate FSC Action**
   - Add "Recalculate FSC" button
   - Allow manual recalculation if DOE value changed
   - Show recalculation history

4. **FSC History Chart**
   - Add chart showing FSC trend over time
   - Compare current FSC vs. historical average
   - Show DOE price trend

5. **Export FSC Details**
   - Add "Export" button
   - Generate PDF report of FSC calculation
   - Include all details for customer/auditing

6. **Audit Trail Integration**
   - Show when FSC was calculated
   - Show who calculated it (system/manual)
   - Show any manual overrides or adjustments

### **Phase 3:**
7. **FSC Comparison**
   - If FSC file changed recently, show before/after comparison
   - Highlight what changed

8. **Multiple FSC Lines**
   - Handle split billing (inbound/outbound legs)
   - Show separate FSC for each line item

---

## References

- **Implementation Plan:** `FSC/FSC_TAB_IMPLEMENTATION_PLAN.md`
- **Requirements:** `FSC/REQ.md` Section 7 (Billing Workflow), Lines 247-258
- **Cap/Floor Explained:** `FSC/CAP_FLOOR_SANITY_EXPLAINED.md`
- **Update Frequency Explained:** `FSC/UPDATE_FREQUENCY_AND_DATE_LOGIC_EXPLAINED.md`

---

## Success Criteria

- ✅ FSC tab appears only for completed loads
- ✅ Tab shows FSC summary (amount, percentage, status)
- ✅ Displays all calculation details from FSC billing workflow
- ✅ Shows which FSC file was used (with file ID)
- ✅ Shows index value and source used
- ✅ Displays formula and calculation breakdown
- ✅ Handles cap/floor applied scenarios
- ✅ Shows sanity threshold status
- ✅ Handles special cases (NO, ALL_IN, exceeded threshold)
- ✅ Matches design pattern of other tabs (General, Accessorial, etc.)

---

**Implementation COMPLETED Successfully! ✅**
