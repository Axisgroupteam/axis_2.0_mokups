# Accessorial Management Module

## Overview

The Accessorial Management module handles all Accessorial Charges beyond base freight rates, including detention, layover, stop-offs, diversions, and other accessorial services. The module provides automated tracking, tiered approval workflows, customer approval processes, and dispute resolution.

---

## Module Structure

### Main Tabs

1. **Operational Dashboard** - Overview of pending approvals and charge management
2. **Detention Monitor** - Real-time geofence-based detention tracking
3. **Accessorial Codes** - Configuration of all accessorial charge types
4. **Customer Rate Cards** - Customer-specific rates and billing preferences

---

## Accessorial Codes

The system supports 14 standard accessorial codes:

| Code | Name               | Charge Structure | Approval Tier        | Driver Paid | Driver Pay Method |
| ---- | ------------------ | ---------------- | -------------------- | ----------- | ----------------- |
| DET  | Detention          | Per Hour         | Tier 1: Auto         | Yes         | Percentage (50%)  |
| LAY  | Layover            | Per Day          | Tier 2: Dispatch Mgr | Yes         | Flat ($150)       |
| STP  | Stop Off           | Flat + Mileage   | Tier 2: Dispatch Mgr | Yes         | Flat ($50)        |
| DIV  | Diversion          | Flat + OOR Miles | Tier 2: Dispatch Mgr | Yes         | Same as Billed    |
| TNU  | TONU               | Flat Fee         | Tier 2: Dispatch Mgr | Yes         | Percentage (75%)  |
| DRV  | Driver Assist      | Flat Fee         | Tier 2: Dispatch Mgr | Yes         | Flat ($75)        |
| TRP  | Tarping            | Flat Fee         | Tier 2: Dispatch Mgr | Yes         | Flat ($50)        |
| HAZ  | Hazmat             | Flat Fee         | Tier 2: Dispatch Mgr | No          | N/A               |
| TOL  | Tolls              | Pass-through     | Tier 1: Auto         | No          | N/A               |
| OVW  | Overweight         | Variable         | Tier 2: Dispatch Mgr | No          | N/A               |
| OOR  | Out of Route Miles | Per Mile         | Tier 2: Dispatch Mgr | Yes         | Same as Billed    |
| RDL  | Re-delivery        | Flat Fee         | Tier 2: Dispatch Mgr | Yes         | Percentage (50%)  |
| PRM  | Permits            | Pass-through     | Tier 1: Auto         | No          | N/A               |
| EMP  | Empty Miles        | Per Mile         | Tier 2: Dispatch Mgr | Yes         | Same as Billed    |

### Charge Structure Options

- **Flat Fee** - Fixed amount per occurrence
- **Per Hour** - Hourly rate (e.g., detention)
- **Per Day** - Daily rate (e.g., layover)
- **Per Mile** - Mileage-based rate
- **Percentage of Freight** - Calculated from freight charge
- **Pass-through (Actual Cost)** - Direct cost pass-through (tolls, permits)
- **Flat + Per Mile** - Base fee plus mileage component
- **Variable (Multiple Options)** - Configurable based on situation

---

## Approval Tier System

### Tier Definitions

| Tier                         | Authority        | Description                                   |
| ---------------------------- | ---------------- | --------------------------------------------- |
| **Tier 1: Auto**             | System           | Automatically applied (geofence/pass-through) |
| **Tier 2: Dispatch Manager** | Dispatch Manager | Requires Dispatch Manager approval            |
| **Tier 3: VP of Operations** | VP Ops           | Requires VP of Operations approval            |

### Tier Assignment by Code Type

**Tier 1 (Auto-Apply):**

- Detention (auto-triggered via geofence)
- Tolls
- Permits

**Tier 2 (Dispatch Manager):**

- Stop Off
- Diversion
- Tarping
- Hazmat
- Layover
- TONU
- Driver Assist
- Overweight
- Re-delivery
- Out of Route Miles
- Empty Miles

### $500 Rule

**Critical:** Any single accessorial charge exceeding **$500** automatically escalates to **Tier 3 (VP of Operations)**, regardless of the accessorial type's default tier.

### Absorption Override

When an accessorial is marked for absorption (company absorbs cost instead of billing customer):

- **Always requires Level 2 Manager approval**
- Must select a reason code for absorption
- Driver is still paid according to the accessorial's pay configuration

---

## Driver Pay Configuration

### Pay Options

1. **Same as Billed** - Driver receives same amount billed to customer
2. **Flat Amount** - Fixed dollar amount (e.g., $75)
3. **Percentage of Billed** - Percentage of customer charge (e.g., 50%)
4. **No Pay** - Driver does not receive pay for this accessorial

**Note:** Driver pay follows the configured method - no per-transaction overrides allowed.

---

## Detention Automation

### Geofence-Based Tracking

The system uses real-time GPS/geofence tracking to automate detention:

1. **Driver Enters Geofence** - System records arrival time
2. **Arrival Validation** - Checks if driver arrived on or before appointment time
3. **Clock Starts** - Detention timer begins if arrival is on-time
4. **Threshold Monitoring** - Countdown to customer's detention threshold

### Eligibility Rule

**CRITICAL:** Detention is ONLY chargeable if driver arrived **ON or BEFORE** the appointment time. Late arrivals are NOT eligible for detention charges, regardless of wait time.

### Warning System

- **1-Hour Warning** - Sent to customer 1 hour before threshold is reached
- **Channels:** Email + Text (if preferred) + Portal notification
- Warning includes: Load ID, location, arrival time, time remaining

### Auto-Trigger Process

1. Threshold reached (e.g., 2 hours)
2. System auto-creates detention charge
3. Hourly rate applied from customer rate card
4. Customer approval request sent automatically
5. Continue tracking for additional hours

### Detention Monitor States

| State            | Color  | Description                                      |
| ---------------- | ------ | ------------------------------------------------ |
| **MONITORING**   | Gray   | Actively tracking, within threshold              |
| **WARNING SENT** | Yellow | 1-hour warning sent, approaching threshold       |
| **CHARGEABLE**   | Red    | Threshold exceeded, billable amount accumulating |

---

## Customer Approval Flow

### Process Steps

1. **Charge Created** - Accessorial added (auto or manual)
2. **Rate Card Applied** - Customer's negotiated rates loaded
3. **Approval Request Generated** - System creates request
4. **Multi-Channel Notification:**
   - Email sent
   - Text sent (if customer preference)
   - Portal notification
5. **Status: Awaiting Customer Approval**

### Customer Response Options

| Response                 | Result                                     |
| ------------------------ | ------------------------------------------ |
| **Approved**             | Status → APPROVED, ready for invoice       |
| **Rejected/Disputed**    | Status → DISPUTED, enters dispute workflow |
| **No Response (24 hrs)** | Escalation triggered                       |

### Escalation Timeline

- **24 Hours:** Escalate to customer's manager, notify our Dispatch Manager
- **48 Hours:** SLA breach if disputed and unresolved

### No Auto-Approval Policy

**Important:** There is NO auto-approval. All charges require explicit customer confirmation before invoicing. This eliminates invoice surprises and reduces disputes.

---

## Dispute Resolution

### Workflow Steps

1. **Customer Disputes Charge** - Dispute initiated
2. **Status → DISPUTED**
3. **Auto-Assign to Level 2 Manager** (Dispatch Manager)
4. **Gather Documentation:**
   - Geofence logs
   - Timestamps
   - BOL
   - Driver notes
5. **Manager Reviews Evidence**

### Resolution Options

| Decision   | Action                                                 |
| ---------- | ------------------------------------------------------ |
| **UPHOLD** | Charge confirmed, proceed to invoice                   |
| **REDUCE** | Adjust amount (partial credit), invoice reduced amount |
| **WAIVE**  | Charge cancelled (requires reason code), no invoice    |

### SLA Requirements

- **48-Hour Resolution SLA** - All disputes must be resolved within 48 hours
- **SLA Breach:** Flagged as performance metric, escalates to Level 3+ (VP of Operations)

---

## Customer Rate Cards

### Rate Card Configuration

Each customer can have a customized rate card with:

**Billing Preferences:**

- **Charge Display:** Itemized Separately OR Combined with Freight (Single Line)
- **Bill-To Code:** Same as Freight OR Separate Code
- **Invoice Method:** Include on Freight Invoice OR Separate Accessorial Invoice

### Sample Rate Card Structure

| Accessorial | Rate                     | Threshold     | Override Billing      |
| ----------- | ------------------------ | ------------- | --------------------- |
| Detention   | $75.00 / hour            | After 2 hours | -                     |
| Layover     | $350.00 / day            | -             | -                     |
| Stop Off    | $100.00 + $2.50/mi       | -             | -                     |
| Diversion   | $150.00 + $3.00/mi OOR   | -             | -                     |
| TONU        | $400.00 flat             | -             | -                     |
| Tolls       | Pass-through + $5.00 fee | -             | Combined with freight |

---

## Operational Dashboard

### Summary Metrics

| Metric                   | Description                                           |
| ------------------------ | ----------------------------------------------------- |
| **Pending Approval**     | Total charges awaiting approval (internal + customer) |
| **24-48 hrs (Urgent)**   | Charges approaching SLA deadline                      |
| **48+ hrs (SLA Breach)** | Charges past 48-hour SLA                              |
| **Disputed**             | Active disputes with at-risk revenue                  |

### Dashboard Filters

- **Fleet:** All Fleets, Heavy Haul, Pneumatic, Aggregate, Flatbed, Walking Floor, TMF
- **Customer:** All Customers, or specific customer
- **Type:** All Types, Detention, Layover, TONU, Diversion, etc.
- **Status:** All Status, Awaiting Customer, Pending Dispatch Mgr, Escalated

### Table Columns

- Age (with color coding)
- ID / Load
- Customer
- Type
- Amount (with VP approval flag if > $500)
- Driver / Truck
- Status
- Actions (View, Approve)

### Age Color Coding

| Age       | Color            | Meaning                 |
| --------- | ---------------- | ----------------------- |
| 0-24 hrs  | Normal (gray)    | Within normal timeframe |
| 24-48 hrs | Warning (yellow) | Approaching deadline    |
| 48+ hrs   | Danger (red)     | SLA breach              |

---

## Accessorial Status Types

| Status                         | Description                           | Color  |
| ------------------------------ | ------------------------------------- | ------ |
| **Awaiting Customer Approval** | Sent to customer, pending response    | Blue   |
| **Pending Dispatch Manager**   | Internal approval needed              | Purple |
| **Escalated - VP Approval**    | Escalated to VP (>$500 or SLA breach) | Red    |
| **Approved**                   | Customer approved, ready for invoice  | Green  |
| **Absorbed**                   | Company absorbed, not billed          | Purple |
| **Disputed**                   | Customer disputed, in resolution      | Red    |

---

## Disposition Options

When adding an accessorial, two dispositions are available:

### 1. Bill to Customer

- Apply customer rate card
- Check $500 escalation rule
- Send for customer approval
- Invoice upon approval

### 2. Absorb

- Select reason code (required)
- Requires Level 2 Manager approval
- Driver still paid per configuration
- No customer invoice generated
- Logged for reporting/analysis

---

## Accessorial Detail View

### Information Displayed

**Location Details:**

- Location name
- Appointment time
- Actual arrival (with on-time indicator)
- Time on-site

**Driver/Equipment:**

- Driver name
- Truck number

**Charge Details:**

- Threshold
- Rate
- Billable hours/units
- Total charge
- Driver pay amount

**Audit Trail:**

- Timestamped events
- System triggers
- Notifications sent
- Status changes

**Attachments:**

- Geofence logs
- Supporting documents

**Notes:**

- Free-text notes

### Available Actions

- **View** - Full detail modal
- **Approve** - Approve the charge
- **Waive Charge** - Cancel the charge (with reason)
- **Resend to Customer** - Re-send approval request

---

## Key Business Rules Summary

1. **Detention Eligibility:** Only chargeable if driver arrived on/before appointment time
2. **$500 Rule:** Any charge > $500 auto-escalates to VP of Operations
3. **No Auto-Approval:** All customer charges require explicit approval
4. **48-Hour SLA:** Disputes must be resolved within 48 hours
5. **Absorption Requires Approval:** All absorbed charges require Level 2 Manager approval
6. **Driver Pay Fixed:** Driver pay follows code configuration, no per-transaction overrides
7. **Rate Card Priority:** Customer rate cards override default rates

---

## Integration Points

### Inputs

- Load/Order data
- Geofence/GPS tracking
- Customer master data
- Driver information
- Appointment scheduling

### Outputs

- Invoice line items
- Driver settlement records
- Customer portal notifications
- Email/Text notifications
- Performance metrics (SLA tracking)

---

## Reporting Considerations

- Accessorial revenue by type
- Absorption analysis by reason code
- SLA compliance metrics
- Dispute resolution rates
- Customer approval turnaround times
- Detention frequency by customer/location
