# Accessorial & Accessorial Charges Functionality Overview

## 1. Executive Summary

The Accessorial Management module in AXIS 2.0 is designed to handle all non-freight charges including detention, layovers, stop-offs, and driver-related services. It provides a robust framework for automated tracking, tiered internal approvals, customer-facing approval workflows, and dispute resolution to ensure billing accuracy and revenue protection.

---

## 2. Accessorial Codes & Pricing Structure

Accessorial charges (Accessorial Charges) are managed directly within the **Order Details** view via the **Accessorial Charge** tab. This allows dispatchers to add, edit, or remove charges on a per-load basis.

The system supports a standard set of accessorial codes, each with its own charge structure and default approval tier.

| Code    | Name          | Charge Structure | Default Tier | Driver Paid |
| ------- | ------------- | ---------------- | ------------ | ----------- |
| **DET** | Detention     | Per Hour         | Tier 1: Auto | Yes         |
| **LAY** | Layover       | Per Day          | Tier 2: Mgr  | Yes         |
| **STP** | Stop Off      | Flat + Mileage   | Tier 2: Mgr  | Yes         |
| **DIV** | Diversion     | Flat + OOR Miles | Tier 2: Mgr  | Yes         |
| **TNU** | TONU          | Flat Fee         | Tier 2: Mgr  | Yes         |
| **DRV** | Driver Assist | Flat Fee         | Tier 2: Mgr  | Yes         |
| **TRP** | Tarping       | Flat Fee         | Tier 2: Mgr  | Yes         |
| **HAZ** | Hazmat        | Flat Fee         | Tier 2: Mgr  | No          |
| **TOL** | Tolls         | Pass-through     | Tier 1: Auto | No          |
| **OVW** | Overweight    | Variable         | Tier 2: Mgr  | No          |
| **OOR** | Out of Route  | Per Mile         | Tier 2: Mgr  | Yes         |
| **RDL** | Re-delivery   | Flat Fee         | Tier 2: Mgr  | Yes         |
| **PRM** | Permits       | Pass-through     | Tier 1: Auto | No          |
| **EMP** | Empty Miles   | Per Mile         | Tier 2: Mgr  | Yes         |

### Pricing Models

- **Flat Fee**: Fixed amount per occurrence.
- **Variable**: Calculated based on units (hours, days, miles).
- **Pass-through**: Direct reimbursement of actual costs (Tolls, Permits).
- **Hybrid**: Base flat fee plus a variable rate (e.g., Stop Off).

---

## 3. Approval Tier System

To ensure financial control, all charges flow through a tiered approval system based on type and amount.

### The Three-Tier Authority

1.  **Tier 1: Auto-Apply / System**: Geofence-triggered detention or pass-through costs (Tolls/Permits).
2.  **Tier 2: Dispatch Manager**: Manual charges or adjustments requiring internal oversight.
3.  **Tier 3: VP of Operations**: Senior level approval for high-value or sensitive charges.

### Critical Escalation Rules

> [!IMPORTANT]
> **The $500 Rule**: Any single accessorial charge exceeding **$500** automatically escalates to **Tier 3 (VP of Operations)** for approval, regardless of its default tier.

> [!WARNING]
> **SLA Breach**: Any charge or dispute that remains unresolved by the customer for more than **48 hours** is automatically escalated to the Dispatch Manager.

---

## 4. Detention Automation

Detention is managed through real-time GPS and geofence integration to minimize disputes.

### Automation Workflow

1.  **Geofence Entry**: System logs arrival timestamp when driver enters the site geofence.
2.  **Arrival Validation**: Detention is **ONLY** eligible if the driver arrives **ON or BEFORE** the scheduled appointment time.
3.  **Threshold Countdown**: Once on-site, the system monitors the customer’s free-time threshold (usually 2 hours).
4.  **1-Hour Warning**: System sends an automated alert to the customer 60 minutes before the detention charge begins.
5.  **Auto-Trigger**: Once the threshold is exceeded, the system creates a detention charge in **Awaiting Customer Approval** status.

---

## 5. Customer Approval & Portal

AXIS 2.0 eliminates "billing surprises" by requiring customer confirmation for all accessorials before they appear on an invoice.

### Notification Channels

- **Email**: Detailed request with Load ID and supporting evidence.
- **SMS**: Short alert for quick mobile approval.
- **Customer Portal**: Centralized dashboard for customers to review, approve, or dispute charges.

### Customer Actions

- **Approve**: Charge is marked as **APPROVED** and unblocked for invoicing.
- **Dispute**: Charge enters the **Dispute Resolution** workflow.
- **Internal Note**: Customers can add comments during the review process.

---

## 6. Dispute Resolution Workflow

When a customer disputes a charge, it follows a formal resolution process.

1.  **Status Change**: Charge moves to **DISPUTED** status and is flagged in the Operational Dashboard.
2.  **Internal Assignment**: Automatically assigned to the Level 2 Manager (Dispatch Manager).
3.  **Evidence Review**: Managers review geofence logs, BOLs, and driver notes.
4.  **Disposition Options**:
    - **Uphold**: Confirm original charge as valid.
    - **Reduce**: Apply a partial credit or adjust the amount.
    - **Waive**: Cancel the charge entirely (requires a reason code).
5.  **Resolution SLA**: 48-hour target for resolution of all disputes.

---

## 7. Billing Integration & Controls

The system enforces strict validation rules to ensure data integrity during the billing process.

### Billing Barriers

> [!CAUTION]
> A Load is **BLOCKED** from invoicing if any associated accessorial charge has a status of **Pending**, **Awaiting Customer Approval**, or **Disputed**.

### Invoice Display Options

Configured via the **Customer Rate Card**:

- **Itemized**: Accessorials listed as separate line items.
- **Combined**: Accessorials bundled into the base freight rate (Total Invoice amount).
- **Separate Invoicing**: Generating a dedicated invoice for accessorials only.

---

## 8. Operational Dashboard Metrics

The Operational Dashboard provides real-time visibility into the health of Accessorial Charges.

- **Aging Categorization**:
  - **Gray (0-24 hrs)**: Normal processing.
  - **Yellow (24-48 hrs)**: Approaching SLA breach.
  - **Red (48+ hrs)**: SLA breached / Escalated.
- **Revenue At Risk**: Dollar value of all charges currently in **Disputed** or **Escalated** status.
- **Absorption Analysis**: Tracking charges absorbed by the company (requires manager approval and reason code).

---

## 9. Integration Points

- **GPS / Telematics**: Provides the location data for geofence triggers.
- **Dispatch**: Sources appointment times and driver/equipment data.
- **Settlement**: Ensures drivers are paid for accessorials even if the customer has not yet paid the invoice.
- **EDI/API**: Outputs final approved charges to the external billing system.

---

_Document Version: 1.1_  
_Last Updated: March 2026_
