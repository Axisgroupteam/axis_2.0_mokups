# Fuel Tab Migration Documentation

## Overview

This document outlines the changes made to the FuelTab component in Driver Details to align it with the main Fuel module structure. The original implementation was created before the Fuel module was fully designed, resulting in mismatched data models.

---

## Previous Implementation (Legacy)

### Old Data Model

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Unique identifier |
| `cardProvider` | string | Card provider name |
| `account` | string | Account number |
| `subaccount` | string | Subaccount number |
| `cardNumber` | string | Masked card number |
| `tractor` | string | Associated tractor ID |
| `cardPayee` | string | Card payee name |
| `chargePayee` | string | Charge payee name |
| `expenseCode` | string | Expense code |
| `cardStatus` | string | Card status |
| `assignType` | string | Assignment type |
| `cardType` | string | Type of card |

### Old Card Providers

| Provider |
|----------|
| EFS |
| Comdata (typo - missing 'm') |
| T-Chek |
| Fleet One |

### Old Status Options

| Status |
|--------|
| Active |
| Inactive |
| Suspended |

### Old Assign Types

| Assign Type |
|-------------|
| Driver |
| Tractor |
| Both |

### Old Card Types

| Card Type |
|-----------|
| Fuel |
| Cash |
| Both |

### Old Form Fields

| Field | Type | Required |
|-------|------|----------|
| Card Provider | Select | Yes |
| Account | Text Input | Yes |
| Subaccount | Text Input | Yes |
| Card Number | Text Input | Yes |
| Tractor | Text Input | Yes |
| Card Payee | Text Input | Yes |
| Charge Payee | Text Input | Yes |
| Expense Code | Text Input | Yes |
| Card Status | Select | Yes |
| Assign Type | Select | Yes |
| Card Type | Select | Yes |

### Old Table Columns

| Column | Width |
|--------|-------|
| Actions | 80px |
| Card Provider | 120px |
| Account | 110px |
| Subaccount | 100px |
| Card Number | 150px |
| Tractor | 90px |
| Card Payee | 120px |
| Charge Payee | 120px |
| Expense Code | 110px |
| Card Status | 100px |
| Assign Type | 100px |
| Card Type | 90px |

---

## New Implementation (Current)

### New Data Model

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Unique identifier |
| `cardNumber` | string | Full card number (masked in display) |
| `platform` | string | Fuel platform (EFS, Commdata, Relay) |
| `entityType` | string | Driver entity type |
| `pricingModel` | string | Assigned pricing model |
| `status` | string | Card status |
| `dailyLimit` | number | Daily spending limit |
| `weeklyLimit` | number | Weekly spending limit |
| `monthlyLimit` | number | Monthly spending limit |
| `currentBalance` | number | Current card balance |
| `lastUsedDate` | string | Last transaction date |
| `lastUsedLocation` | string | Last transaction location |
| `issuedDate` | string | Card issue date |
| `expirationDate` | string | Card expiration date |

### New Platforms

| Platform | Badge Color |
|----------|-------------|
| EFS | Blue |
| Commdata | Green |
| Relay | Purple |

### New Status Options

| Status | Badge Color | Available Actions |
|--------|-------------|-------------------|
| Active | Green | Edit Limits, View Transactions, Suspend, Report Lost |
| Pending | Blue | Approve, Reject |
| Suspended | Amber | Reactivate, View Transactions |
| Lost | Red | Issue Replacement, View Transactions |
| Expired | Gray | Renew, View Transactions |

### New Entity Types

| Entity Type | Default Pricing Model |
|-------------|----------------------|
| Company Driver | Company Driver Tiered |
| Owner-Operator | Owner-Operator Standard |
| Franchise Driver | Franchise Ceiling Rate |
| Carrier | Carrier Fuel Advance |

### New Pricing Models

| Model Name | Type | Formula | Applicable Entities |
|------------|------|---------|---------------------|
| Company Driver Tiered | Tiered (Score) | Cost + Tier % | Company Driver |
| Owner-Operator Standard | Cost-Plus (%) | Cost + 8% | Owner-Operator |
| Franchise Ceiling Rate | Cost-Plus (%) | Cost + 8% | Franchise Driver |
| Carrier Fuel Advance | Cost-Plus (%) | Cost + 10% | Carrier |
| Fixed Rate Program | Fixed Rate | $3.25/gal | Company Driver, Owner-Operator |
| Pump Discount - Standard | Pump Discount (Flat) | Pump - $0.15 | Company Driver, Owner-Operator, Franchise Driver |
| Per-Mile Allowance | Per-Mile | $0.52/mile | Owner-Operator |
| Volume Discount Program | Pump Discount (%) | Pump - 3% | Carrier |

### New Form Fields

| Field | Type | Required | Shown On |
|-------|------|----------|----------|
| Platform | Select | Yes | Add Only |
| Entity Type | Select | Yes | Add Only |
| Pricing Model | Select | Yes | Add Only (after Entity Type selected) |
| Daily Limit ($) | Number Input | Yes | Add & Edit |
| Weekly Limit ($) | Number Input | Yes | Add & Edit |
| Monthly Limit ($) | Number Input | Yes | Add & Edit |

### New Table Columns

| Column | Width | Cell Content |
|--------|-------|--------------|
| Actions | 60px | Context menu based on status |
| Card Number | 160px | Icon + Masked number |
| Platform | 100px | Colored badge |
| Pricing Model | 180px | Model name + formula |
| Daily Limit | 100px | Currency formatted |
| Balance | 100px | Currency formatted (green) |
| Last Used | 140px | Date + Location |
| Status | 100px | Colored badge |

---

## Fields NOT Migrated to New Structure

The following fields from the old implementation were **intentionally removed** as they don't align with the main Fuel module design:

| Old Field | Reason Not Migrated |
|-----------|---------------------|
| `account` | Not part of main Fuel module data model. Account info managed at platform level. |
| `subaccount` | Not part of main Fuel module data model. Subaccount info managed at platform level. |
| `tractor` | Card-to-tractor relationship managed separately in Assets module. |
| `cardPayee` | Payee information managed in Payee/Finance module, not on fuel card. |
| `chargePayee` | Payee information managed in Payee/Finance module, not on fuel card. |
| `expenseCode` | Expense coding handled in Settlement/Accounting module. |
| `assignType` | Replaced by `entityType` which determines driver classification. |
| `cardType` (Fuel/Cash/Both) | Main Fuel module focuses on fuel-only cards. Cash functionality separate. |

### Old Card Providers NOT Carried Over

| Provider | Reason |
|----------|--------|
| T-Chek | Not in the 3 main platforms (EFS, Commdata, Relay) per fuel_doc.md |
| Fleet One | Not in the 3 main platforms (EFS, Commdata, Relay) per fuel_doc.md |
| Comdata | Renamed to "Commdata" (correct spelling) |

---

## Feature Comparison

| Feature | Old Implementation | New Implementation |
|---------|-------------------|-------------------|
| Card masking | Pre-masked in data | Full number stored, masked in display |
| Platform badges | None | Colored badges per platform |
| Status badges | Basic colored spans | Styled badges matching main module |
| Action menu | Simple Edit/Delete | Context-aware based on card status |
| Pricing models | None | 8 models with entity type filtering |
| Spending limits | None | Daily/Weekly/Monthly limits |
| Balance display | None | Current balance with currency format |
| Last used info | None | Date and location tracking |
| Transaction link | None | View Transactions action |
| Card lifecycle | Basic | Full lifecycle (Pending → Active → Suspended/Lost/Expired) |

---

## Migration Notes

1. **Data Migration**: If real data exists in the old format, a migration script would be needed to map old fields to new structure.

2. **Platform Mapping**:
   - `Comdata` → `Commdata`
   - `T-Chek` → Requires manual assignment to EFS/Commdata/Relay
   - `Fleet One` → Requires manual assignment to EFS/Commdata/Relay

3. **Status Mapping**:
   - `Active` → `Active`
   - `Inactive` → `Expired` or `Suspended` (based on reason)
   - `Suspended` → `Suspended`

4. **Lost Fields**: Account, subaccount, tractor, payee, and expense code data would need to be stored/managed elsewhere if needed for reporting.

---

## Related Documentation

- `/Fuel/fuel_doc.md` - Main Fuel module technical specification
- `/Fuel/FUEL_MODULE_INTEGRATION_PLAN.md` - Fuel menu structure and integration plan
- `/Fuel/FUEL_INTEGRATION_GUIDE.md` - Integration guidelines
- `/Fuel/PRICING_GUIDE.md` - Pricing model details

---

*Document Created: December 2024*
*Last Updated: December 2024*
