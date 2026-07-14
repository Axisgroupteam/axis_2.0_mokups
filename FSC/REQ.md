
AXIS 2.0
Fuel Surcharge (FSC) Module
Complete Workflow, Validations & Edge Cases
Technical Specification Document
Version	1.2 (Reviewed & Confirmed)
Date	February 20, 2026
Author	Erick Rodriguez / AXIS Team
Status	CONFIRMED — Definitive Reference
Audience	Development Team
 
Table of Contents
1. Purpose & Scope
2. Related Documents
3. Glossary
4. Data Model — FSC File Structure
5. Index Data Ingestion
6. Calculation Methods
7. FSC Billing Workflow (Complete Flow)
8. FSC File Lifecycle Management
9. Approval Logic by Change Type
10. Audit Trail Requirements
11. Mega Internal Default FSC Schedule
12. Validation Rules
13. Edge Cases (Comprehensive)
14. Error Handling & System Behavior
15. API & Integration Points
16. UI Requirements
17. Testing Scenarios
Appendix A: Review Decisions Log
 
1. Purpose & Scope
This document is the single, definitive reference for the Fuel Surcharge (FSC) engine within AXIS 2.0. It consolidates and supersedes all FSC-related content previously distributed across the AXIS-Fuel-Module-Technical-Spec.doc and AXIS_2.0_Billing_Module_Specification.doc.
The development team should treat this document as the authoritative source for all FSC workflow logic, data structures, validation rules, and edge cases. If there is a conflict between this document and prior documents, this document takes precedence.
This version (2.0) has been reviewed and confirmed by Erick Rodriguez on February 20, 2026. All business rules, edge cases, and data model decisions have been validated.
Scope
•	Customer-specific FSC profile configuration and storage
•	Automated index data ingestion (DOE, OPIS, Custom)
•	Four calculation methods with full formula definitions
•	Billing integration workflow with the invoice pipeline
•	FSC file versioning, lifecycle, and audit trail
•	Approval logic by change type
•	Complete edge case catalog with expected system behavior (24 edge cases)
•	Validation rules for data integrity
•	Error handling and fallback procedures
 
2. Related Documents
Document	Relationship	Status
AXIS-Fuel-Module-Technical-Spec.doc	Original fuel module spec; FSC sections superseded by this doc	Partially Superseded
AXIS_2.0_Billing_Module_Specification.doc	Billing module spec; FSC Engine section superseded by this doc	Partially Superseded
Customer Onboarding Workflow	Defines when FSC profile is created (Jesus's team)	Active Reference
Rate File Specification	Rate files and FSC files are separate entities but linked at billing	Active Reference
3. Glossary
Term	Definition
FSC	Fuel Surcharge — a variable charge applied to loads to recover fuel cost fluctuations
DOE	Department of Energy — U.S. Energy Information Administration (EIA) publishes weekly retail diesel prices
OPIS	Oil Price Information Service — commercial fuel pricing index used by some customers
FSC File	A versioned configuration record storing a customer's FSC parameters (index, formula, dates, caps/floors)
Index Value	The fuel price at a point in time from a specific index source (e.g., DOE National Avg = $3.50/gal)
Base Price	The starting fuel price below which no FSC is applied (e.g., $2.00/gal)
Increment	The fuel price step size that maps to a percentage or rate change (e.g., $0.10 = 1%)
All-in Rate	A rate that includes fuel cost — no separate FSC line item. Represented as fsc_applies = YES_ALL_IN.
Linehaul	The base transportation charge for a load (before accessorials and FSC). FSC is calculated ONLY on linehaul, never on accessorials or total charges.
Effective Date Logic	The rule that determines which date controls which index value applies to a load
 
4. Data Model — FSC File Structure
Each customer can have multiple FSC files over time. Only one can be Active at any point. FSC files are NEVER deleted — only expired or superseded. This provides a complete audit history of every FSC configuration ever applied to a customer.
4.1 FSC File Entity
Field	Data Type	Required	Description
fsc_file_id	UUID	Auto-generated	Primary key
customer_id	UUID (FK)	Yes	Links to customer profile
effective_start_date	DATE	Yes	When this FSC config becomes active
effective_end_date	DATE	No (null = current)	When this FSC config expires
status	ENUM	Yes	Active | Expired | Scheduled | Pending Approval
fsc_applies	ENUM	Yes	YES_ITEMIZED | YES_ALL_IN | NO. YES_ITEMIZED = FSC calculated and shown as separate line item. YES_ALL_IN = fuel cost built into linehaul rate, no FSC line on invoice. NO = customer does not pay FSC at all.
index_source	ENUM	If fsc_applies = YES_ITEMIZED	DOE_NATIONAL | DOE_GULF_COAST | DOE_EAST_COAST | OPIS | CUSTOM
calculation_method	ENUM	If fsc_applies = YES_ITEMIZED	PERCENT_LINEHAUL | PER_MILE | FLAT_FEE | CUSTOMER_TABLE
base_price	DECIMAL(6,2)	If method = PERCENT_LINEHAUL or PER_MILE	Starting price (e.g., $2.00)
increment_price	DECIMAL(6,2)	If method = PERCENT_LINEHAUL or PER_MILE	Price step (e.g., $0.10)
increment_value	DECIMAL(6,4)	If method = PERCENT_LINEHAUL or PER_MILE	Value per increment (e.g., 1.0 for 1%, or $0.02 for per-mile)
flat_fee_amount	DECIMAL(10,4)	If method = FLAT_FEE	Static value per load. Interpretation depends on flat_fee_type.
flat_fee_type	ENUM	If method = FLAT_FEE	DOLLAR | PERCENTAGE. DOLLAR = fixed dollar amount per load. PERCENTAGE = fixed % of linehaul per load. Neither is index-driven or table-driven.
update_frequency	ENUM	If fsc_applies = YES_ITEMIZED	WEEKLY | MONTHLY | QUARTERLY | CUSTOM
custom_frequency_rule	TEXT	If update_frequency = CUSTOM	Free-text description of custom update schedule. Must specify: (1) WHEN the FSC is calculated (e.g., second-to-last Monday of the month), (2) WHAT PERIOD it applies to (e.g., the following month), and (3) WHAT INDEX VALUE is used (e.g., DOE published on that calculation date). Example: 'Calculate FSC on the second-to-last Monday of each month using that day\'s DOE. Apply to all loads for the following month.'
effective_date_logic	ENUM	If fsc_applies = YES_ITEMIZED	PICKUP_DATE | INVOICE_DATE | WEEK_OF_SERVICE | CUSTOMER_SPECIFIED
customer_specified_date_rule	TEXT	If logic = CUSTOMER_SPECIFIED	Free-text description of customer date rule
cap_type	ENUM	No (default: NONE)	NONE | PERCENTAGE | AMOUNT. Optional — not every customer has a cap. If NONE, no cap is applied.
cap_value	DECIMAL(10,2)	If cap_type != NONE	Cap value: percentage (e.g., 20.00 for 20%) or dollar amount (e.g., 200.00)
floor_type	ENUM	No (default: NONE)	NONE | PERCENTAGE | AMOUNT. Optional — not every customer has a floor. If NONE, no floor is applied.
floor_value	DECIMAL(10,2)	If floor_type != NONE	Floor value: percentage or dollar amount
custom_table_id	UUID (FK)	If method = CUSTOMER_TABLE	Link to uploaded customer FSC lookup table
sanity_threshold	DECIMAL(5,2)	No (default: 50.00)	Configurable threshold (%) — if FSC exceeds this % of linehaul, hold for manual review
created_by	UUID (FK)	Yes	User who created the file
created_at	TIMESTAMP	Yes	Creation timestamp
last_modified_by	UUID (FK)	Yes	User who last edited the file
last_modified_at	TIMESTAMP	Yes	Last modification timestamp
approval_status	ENUM	Yes	APPROVED | PENDING | NOT_REQUIRED
approval_reference	TEXT	No	Customer approval doc/email reference
notes	TEXT	No	Free-text notes (reason for changes, etc.)

IMPORTANT DATA MODEL DECISIONS (Confirmed):
•	fsc_applies has exactly 3 options: YES_ITEMIZED (FSC calculated, shown as separate line item), YES_ALL_IN (fuel built into rate, no FSC line), NO (no FSC at all). No seasonal or conditional variants.
•	Cap and floor are OPTIONAL — not every customer will have them. When set, they are mutually exclusive by type: a customer has EITHER a percentage cap OR a dollar cap, never both simultaneously. Stored as cap_type + cap_value (same for floor). Default is NONE.
•	Flat fee can be DOLLAR or PERCENTAGE based (flat_fee_type). DOLLAR = fixed $ per load regardless of linehaul. PERCENTAGE = fixed % of linehaul per load. Neither is index-driven or table-driven. For tiered values that vary by fuel price, use CUSTOMER_TABLE method.
•	FSC applies ONLY to linehaul. Never to accessorials, detention, or total charges.
•	Sanity threshold is configurable per customer (default 50%). Stored in sanity_threshold field.
•	custom_frequency_rule added for CUSTOM update frequencies.
4.2 FSC Custom Table Entity
When calculation_method = CUSTOMER_TABLE, the customer provides their own lookup table. This is stored as a set of rows.
Field	Data Type	Required	Description
table_id	UUID	Auto	Primary key
customer_id	UUID (FK)	Yes	Owner customer
version	INTEGER	Yes	Version number (incremented on each upload)
uploaded_by	UUID (FK)	Yes	User who uploaded
uploaded_at	TIMESTAMP	Yes	Upload timestamp
file_attachment	BLOB/URL	Yes	Original file uploaded by customer
4.3 FSC Custom Table Rows
CRITICAL: Range bounds use half-open intervals: fuel_price_from <= index_value < fuel_price_to. This prevents overlap between adjacent ranges and ensures every index value maps to exactly one row (or falls in a gap, which is flagged per EC-5).
Field	Data Type	Required	Description
row_id	UUID	Auto	Primary key
table_id	UUID (FK)	Yes	Parent table
fuel_price_from	DECIMAL(6,2)	Yes	Lower bound (INCLUSIVE)
fuel_price_to	DECIMAL(6,2)	Yes	Upper bound (EXCLUSIVE)
surcharge_value	DECIMAL(10,4)	Yes	FSC value (% or $ depending on surcharge_type)
surcharge_type	ENUM	Yes	PERCENTAGE | DOLLAR_PER_MILE | FLAT_DOLLAR
Lookup query: SELECT surcharge_value, surcharge_type FROM fsc_custom_table_rows WHERE table_id = ? AND fuel_price_from <= ? AND fuel_price_to > ? (where ? is the current index value).
For the LAST row in a table (highest range), fuel_price_to should be set to a sentinel value (e.g., 999.99) to capture all prices above fuel_price_from. If the index value exceeds 999.99, the system flags per EC-6.
4.4 Index Data Store
Field	Data Type	Required	Description
index_id	UUID	Auto	Primary key
index_source	ENUM	Yes	DOE_NATIONAL | DOE_GULF_COAST | DOE_EAST_COAST | OPIS
effective_date	DATE	Yes	Date this index value becomes effective
price_per_gallon	DECIMAL(6,3)	Yes	Published fuel price
fetched_at	TIMESTAMP	Yes	When system retrieved this value
source_url	TEXT	No	URL/API endpoint where data was retrieved
Unique constraint: (index_source, effective_date). Prevents duplicate index entries.
 
5. Index Data Ingestion
The FSC engine requires current fuel price data from multiple index sources. The system must automatically ingest and store this data on schedule.
Source	Method	Frequency	Owner	Fallback
DOE National	Auto-pull from EIA API (eia.gov)	Weekly (Monday)	System	Retry, then alert
DOE Regional	Auto-pull from EIA API	Weekly (Monday)	System	Retry, then alert
OPIS	API integration	Per OPIS schedule	System	Retry, then alert
Custom Tables	Manual upload to customer profile	As needed	Jesus's Team	N/A
5.1 Index Fetch Logic
•	DOE data is published every Monday. System should attempt first fetch at 10:00 AM ET on Monday.
•	If 10:00 AM fetch returns no new data (stale), retry at 3:00 PM ET the same day.
•	If Monday is a federal holiday, DOE typically publishes Tuesday. System should retry Tuesday morning if Monday fetches returned no new data.
•	If Tuesday fetch also fails, retry Wednesday.
•	After 3 failed attempts across different days, system creates an alert for the operations team and continues using the most recent available index value.
•	Each fetch must be stored as a new record in the Index Data Store — never overwrite previous values.
•	OPIS data frequency depends on the subscription. System should poll per the API's recommended schedule.
5.2 Index Data Validation
•	New index value must be > $0.00 and < $10.00 (sanity bounds for diesel prices).
•	If new value deviates more than 20% from the previous week's value, flag for manual review but still store it.
•	Duplicate dates for the same index source should be rejected (unique constraint on index_source + effective_date).
 
6. Calculation Methods
The FSC engine supports four calculation methods. Each customer's FSC file specifies which method applies. Below are the complete formulas and examples for each.
CRITICAL RULE: FSC is calculated ONLY on linehaul. It never applies to accessorials, detention, lumper fees, or any other charges. For loads with multiple invoice line items (e.g., inbound and outbound legs), FSC is calculated on each line item's linehaul component separately.
6.1 Percentage of Linehaul
The most common method. FSC is calculated as a percentage of the linehaul charge.
Formula:
FSC % = (Current Index Value − Base Price) ÷ Increment Price × Increment Value
FSC Amount = Linehaul × FSC %
Example: Mega Internal Default
Parameter	Value
Index Source	DOE National Average
Base Price	$2.00/gallon
Increment Price	$0.10
Increment Value	1% (0.01)
Current DOE	$3.50/gallon
Linehaul	$1,000.00
Calculation	($3.50 - $2.00) / $0.10 = 15 increments × 1% = 15%
FSC Amount	$1,000 × 15% = $150.00
6.2 Per-Mile Rate
FSC is calculated as a dollar amount per mile. The per-mile rate is formula-driven.
Formula:
FSC Per-Mile Rate = (Current Index Value − Base Price) ÷ Increment Price × Increment Value ($/mile)
FSC Amount = FSC Per-Mile Rate × Total Miles
Example:
Parameter	Value
Base Price	$2.50/gallon
Increment Price	$0.05
Increment Value	$0.02/mile
Current DOE	$3.50/gallon
Total Miles	250 miles
Calculation	($3.50 - $2.50) / $0.05 = 20 increments × $0.02 = $0.40/mile
FSC Amount	$0.40 × 250 = $100.00
6.3 Flat Fee
A static value per load that does not change with fuel prices. Can be either a fixed dollar amount OR a fixed percentage of linehaul, determined by flat_fee_type.
This method is NOT table-driven and NOT index-driven. The value does not fluctuate with DOE or OPIS prices. For tiered values that vary by fuel price range, use CUSTOMER_TABLE method.
Formulas:
•	If flat_fee_type = DOLLAR: FSC Amount = flat_fee_amount (e.g., $75.00 per load)
•	If flat_fee_type = PERCENTAGE: FSC Amount = linehaul × flat_fee_amount (e.g., linehaul × 8% = fixed 8% every load)
Example (Dollar): flat_fee_amount = 75.00, flat_fee_type = DOLLAR → Every load gets $75.00 FSC.
Example (Percentage): flat_fee_amount = 8.00, flat_fee_type = PERCENTAGE, linehaul = $1,000 → FSC = $80.00 every load at a fixed 8%, regardless of diesel price.
6.4 Customer Table Lookup
Customer provides their own FSC schedule as a table mapping fuel price ranges to surcharge values. The system looks up the current index value in the table to find the applicable surcharge.
Lookup Logic:
•	Find the row where fuel_price_from <= current_index_value < fuel_price_to (half-open interval)
•	Return the surcharge_value from that row
•	Apply the surcharge based on surcharge_type (PERCENTAGE on linehaul, DOLLAR_PER_MILE on miles, FLAT_DOLLAR as fixed amount)
•	If current index value falls BETWEEN ranges (gap): do NOT calculate — flag for manual review (see EC-5)
•	If current index value is ABOVE all ranges: use the highest row, flag alert (see EC-6)
•	If current index value is below all ranges, FSC = 0 (or use floor if configured)
 
7. FSC Billing Workflow (Complete Flow)
This is the end-to-end flow from load completion to FSC appearing on an invoice. This is the core logic the dev team must implement.
Step 1: Load Enters Billing Queue
A completed load reaches the billing pipeline. The system retrieves the customer_id from the load record. If the load has multiple invoice line items (e.g., inbound/outbound legs), each line item is processed for FSC independently against its own linehaul value.
Step 2: Determine Applicable Date
Before querying the FSC file, the system must first determine the applicable date. This date is used BOTH to find the correct FSC file AND to find the correct index value.
The applicable date depends on the customer's effective_date_logic (which is stored in the FSC file, creating a chicken-and-egg problem — see resolution below):
Effective Date Logic	Applicable Date Resolution
PICKUP_DATE	The load's pickup date (first pickup for multi-stop)
INVOICE_DATE	The date the invoice is generated
WEEK_OF_SERVICE	The Monday of the week the load was picked up
CUSTOMER_SPECIFIED	Per the rule in customer_specified_date_rule (may require custom logic per customer)
Resolution for chicken-and-egg: First query ALL FSC files for the customer (not just Active). From the most likely applicable file, read the effective_date_logic. Then use that logic to determine the applicable date. Then query for the FSC file that was Active on that applicable date. In most cases these will be the same file.
Step 3: Retrieve Applicable FSC File
System queries for the FSC file that was Active on the applicable date (NOT necessarily today's date). Query: status = ACTIVE or EXPIRED, effective_start_date <= applicable_date, AND (effective_end_date >= applicable_date OR effective_end_date IS NULL).
Decision tree:
•	If no FSC file exists for customer → Log warning, proceed without FSC, flag for review
•	If fsc_applies = NO → Skip FSC, add $0.00 FSC line (explicit zero)
•	If fsc_applies = YES_ALL_IN → Skip FSC, no FSC line on invoice (fuel is built into the linehaul rate)
•	If fsc_applies = YES_ITEMIZED → Continue to Step 4
Step 4: Fetch Index Value
Query the Index Data Store for the applicable index source and applicable date. Select the most recent index record where effective_date <= applicable_date.
If no index data is found for the applicable date: use the most recent available value for that index source. Log a warning.
Step 5: Calculate FSC
Apply the calculation method from the FSC file:
Method	Calculation
PERCENT_LINEHAUL	FSC% = ((index_value - base_price) / increment_price) * increment_value; FSC$ = linehaul * FSC%
PER_MILE	rate_per_mile = ((index_value - base_price) / increment_price) * increment_value; FSC$ = rate_per_mile * miles
FLAT_FEE	If flat_fee_type = DOLLAR: FSC$ = flat_fee_amount. If flat_fee_type = PERCENTAGE: FSC$ = linehaul * flat_fee_amount. No index lookup needed.
CUSTOMER_TABLE	Lookup surcharge_value from custom table where fuel_price_from <= index_value < fuel_price_to; apply based on surcharge_type
Note: For FLAT_FEE, Steps 2 and 4 (date resolution and index fetch) can be skipped since the fee is static. However, the system should still record the applicable date and FSC file ID for audit purposes.
Step 6: Apply Cap & Floor
Cap and floor are mutually exclusive by type (a customer has EITHER a % cap/floor OR a $ cap/floor, never both):
•	If cap_type = PERCENTAGE and calculated FSC% > cap_value → FSC% = cap_value, recalculate FSC$
•	If cap_type = AMOUNT and calculated FSC$ > cap_value → FSC$ = cap_value
•	If floor_type = PERCENTAGE and calculated FSC% < floor_value → FSC% = floor_value, recalculate FSC$
•	If floor_type = AMOUNT and calculated FSC$ < floor_value → FSC$ = floor_value
•	If index_value <= base_price and no floor is set → FSC = $0.00
•	If index_value <= base_price and floor IS set → apply floor
Step 7: Record & Attach to Invoice
Create an FSC line item on the invoice with the following data:
•	FSC dollar amount (final, after cap/floor)
•	FSC dollar amount before cap/floor (raw calculated value — for margin analysis)
•	FSC percentage (if applicable)
•	Index source used
•	Index value used
•	Index effective date used
•	FSC file ID used
•	Calculation method
•	Cap/floor applied (yes/no, and which value)
This creates a full audit trail per invoice line item.
 
8. FSC File Lifecycle Management
FSC files follow a strict lifecycle. They are NEVER deleted. They can be created, edited (with audit), or superseded by a new version.
8.1 Lifecycle States
Status	Description	Billable?
Scheduled	Created with a future effective_start_date	No
Pending Approval	Requires customer approval before activation	No
Active	Currently in use for billing	Yes
Expired	Superseded by a newer FSC file	Only for historical loads
8.2 State Transitions
Scheduled → Active: Automatic when effective_start_date arrives. Previous Active file auto-expires (effective_end_date set to day before new file's start date).
Pending Approval → Active: When customer approval is received and recorded.
Active → Expired: Automatic when a new FSC file activates for the same customer.
Any → Deleted: NOT ALLOWED. FSC files are never deleted.
8.3 Historical Billing Rule
When billing a load from a prior period, the system must use the FSC file that was Active on the load's applicable date (per effective_date_logic), NOT the currently active FSC file. This ensures billing accuracy for late-billed loads. The system must also use the index value that was effective on the applicable date, not the current index value.
8.4 Concurrent Edit Rule
If two users edit the same FSC file simultaneously, the last save wins. There is no optimistic locking. Both edits are recorded in the audit trail, but the final state reflects the last save. This is acceptable because FSC file edits are infrequent and typically performed by a single team (Jesus's team).
 
9. Approval Logic by Change Type
Not all FSC changes require customer approval. The system must detect which fields changed and enforce the appropriate approval workflow.
Change Type	Approval Required	Status While Pending	Rationale
Index source change (e.g., DOE → OPIS)	YES	Pending Approval	Changes calculation basis
Calculation method change	YES	Pending Approval	Changes invoice structure
Base price change	YES	Pending Approval	Directly impacts FSC %
Increment change	YES	Pending Approval	Directly impacts FSC %
Cap/floor added or changed	YES	Pending Approval	Changes max/min customer pays
Effective date logic change	YES	Pending Approval	Shifts which index applies
Update frequency change	YES	Pending Approval	Affects timing of rate changes
Custom table replacement	YES	Pending Approval	New pricing structure
Correcting data entry error	NO	Stays Active	Administrative fix, note required
Routine index update (auto DOE pull)	NO	N/A (automated)	Within agreed terms
Notes/comments edit	NO	Stays Active	Non-material change
Sanity threshold change	NO	Stays Active	Internal control, not customer-facing

Level 3 Manager Override: If customer is unresponsive or operational urgency exists, a Level 3 Manager can override and activate a Pending Approval FSC file. The file is flagged as "Override — Pending Customer Confirmation" and approval must still be obtained within a defined period.
 
10. Audit Trail Requirements
Every FSC-related action must be logged. The audit trail is immutable — entries cannot be edited or deleted.
10.1 FSC Audit Log Entity
Field	Type	Description
audit_id	UUID	Primary key
fsc_file_id	UUID (FK)	FSC file affected
action	ENUM	CREATED | EDITED | STATUS_CHANGE | OVERRIDE | APPROVAL_RECEIVED
field_changed	TEXT	Which field was modified (null for create/status actions)
old_value	TEXT	Previous value (null for create)
new_value	TEXT	New value
performed_by	UUID (FK)	User or SYSTEM
performed_at	TIMESTAMP	Timestamp of action
reason	TEXT	Required for edits and overrides
11. Mega Internal Default FSC Schedule
For legacy customers who do not have a contractual FSC schedule, Mega applies this internal default. This must be EXPLICITLY assigned as the customer's FSC file — it is never auto-applied.
Parameter	Value
Index Source	DOE U.S. National Average Weekly Retail On-Highway Diesel
Calculation Method	Percentage of Linehaul
Base Price	$2.00 / gallon
Increment	$0.10 = 1%
Formula	FSC % = (DOE National Avg - $2.00) ÷ $0.10
Update Frequency	Weekly (Monday)
Effective Date Logic	Pickup Date
Cap / Floor	None
EIA Reference	https://www.eia.gov/petroleum/gasdiesel/
Quick Reference Examples:
DOE Price	FSC %	FSC on $1,000 Linehaul
$2.00 or below	0%	$0.00
$2.50	5%	$50.00
$3.00	10%	$100.00
$3.50	15%	$150.00
$4.00	20%	$200.00
$4.50	25%	$250.00
$5.00	30%	$300.00
 
12. Validation Rules
The system must enforce these validations at data entry and billing time.
12.1 FSC File Creation / Edit Validations
#	Rule	Error Message	Severity
V1	fsc_applies is required	FSC applicability must be specified	Block save
V2	If fsc_applies = YES_ITEMIZED, index_source is required	Index source required when FSC is itemized	Block save
V3	If fsc_applies = YES_ITEMIZED, calculation_method is required	Calculation method required when FSC is itemized	Block save
V4	If method = PERCENT_LINEHAUL or PER_MILE, base_price, increment_price, and increment_value are required	Base price, increment price, and increment value required for formula-based methods	Block save
V5	base_price must be >= 0	Base price cannot be negative	Block save
V6	increment_price must be > 0 (no division by zero)	Increment price must be greater than zero	Block save
V7	effective_start_date is required	Start date is required	Block save
V8	If effective_end_date is set, it must be >= effective_start_date	End date cannot be before start date	Block save
V9	If both cap_type and floor_type are PERCENTAGE, cap_value must be > floor_value	Cap must be greater than floor	Block save
V10	If method = CUSTOMER_TABLE, custom_table_id is required	Customer table required for table lookup method	Block save
V11	Cannot have two Active FSC files for the same customer with overlapping date ranges	Customer already has an active FSC file for this period	Block save
V12	If effective_date_logic = CUSTOMER_SPECIFIED, customer_specified_date_rule must not be empty	Custom date rule description required	Block save
V13	If method = FLAT_FEE, flat_fee_amount and flat_fee_type are required. flat_fee_amount must be > 0.	Flat fee amount and type required and must be positive	Block save
V14	If update_frequency = CUSTOM, custom_frequency_rule must not be empty	Custom frequency rule description required	Block save
V15	cap_type and floor_type must be the same type if both are set (both PERCENTAGE or both AMOUNT, not mixed)	Cap and floor must be the same type (both % or both $)	Block save
12.2 Billing-Time Validations
#	Rule	System Behavior	Severity
B1	No Active FSC file found for customer on applicable date	Warning logged; load flagged for review; invoice generated without FSC	Warning + flag
B2	No index data available for target date	Use most recent available value; warning logged	Warning
B3	Index data is stale (>14 days old for weekly source)	Alert operations team; proceed with stale value	Alert + continue
B4	Calculated FSC is negative (index < base price, no floor)	FSC = $0.00; no negative surcharge applied	Auto-correct
B5	Load has no linehaul amount and method = PERCENT_LINEHAUL	FSC = $0.00; flag for review (possible data issue)	Warning + flag
B6	Load has no miles and method = PER_MILE	FSC = $0.00; flag for review (possible data issue)	Warning + flag
B7	Customer table lookup: index ABOVE all ranges	Use highest row in table; flag for review; alert Jesus's team. NOTE: This is for index values ABOVE the table maximum only. For gaps BETWEEN ranges, see EC-5 (flag for review, do NOT auto-calculate).	Warning + alert
B8	FSC file status = Pending Approval at billing time	If prior Active file exists, use it. If no prior Active file, block billing until approved.	Conditional block
B9	FSC amount exceeds customer's sanity_threshold % of linehaul	Flag for manual review; do not auto-bill. Threshold is configurable per customer (default 50%).	Hold for review
 
13. Edge Cases (Comprehensive)
This section catalogs every edge case the dev team must handle. Each edge case includes the scenario, expected system behavior, and implementation notes. 24 total edge cases.
EC-1: Late-Billed Load (Retroactive Billing)
Scenario: A load picked up 3 weeks ago reaches billing today. The customer's FSC file may have changed since then, and the applicable DOE value is from 3 weeks ago.
Expected Behavior:
•	System must look up which FSC file was Active on the load's applicable date (not today's FSC file)
•	System must use the index value effective on/before the applicable date (not today's index)
•	Invoice audit trail must show the historical FSC file ID and historical index value used
Implementation Note: Query FSC files WHERE customer_id = X AND effective_start_date <= applicable_date AND (effective_end_date >= applicable_date OR effective_end_date IS NULL). Query index data WHERE index_source = X AND effective_date <= applicable_date ORDER BY effective_date DESC LIMIT 1.
EC-2: FSC File Transition Mid-Week
Scenario: Customer has FSC File A active until Wednesday and FSC File B starting Thursday. A load picked up Tuesday should use File A; a load picked up Thursday should use File B.
Expected Behavior:
•	The effective_date_logic determines the applicable date
•	System uses whichever FSC file was Active on that date
•	If effective_date_logic = INVOICE_DATE and invoice is generated on Friday, but pickup was Tuesday, the system uses File B (since invoice date = Friday, File B is active)
Implementation Note: This is why effective_date_logic matters critically. The team must understand the distinction and implement each logic path correctly.
EC-3: DOE Holiday Delay
Scenario: Monday is a federal holiday. DOE does not publish data. System attempts fetch and gets no new data.
Expected Behavior:
•	System retries at 3:00 PM ET same day
•	If still no data, retries Tuesday morning and afternoon
•	If Tuesday also fails, retry Wednesday
•	After 3 failed days, alert operations team
•	Billing continues using the most recent available index value
•	All loads billed during the gap are flagged with a note: "Index data delayed — used prior week value"
EC-4: Customer Has No FSC File At All
Scenario: New customer was onboarded but Jesus's team hasn't created an FSC file yet. A load for this customer enters the billing queue.
Expected Behavior:
•	System logs a warning: "No FSC file found for customer [name/ID]"
•	Load is flagged for review in the billing queue
•	Invoice is generated WITHOUT FSC initially
•	System prompts the responsible user (Jesus's team) with three options:
◦	Option A: Proceed without FSC — Confirm this customer should not have FSC. System marks the customer as fsc_applies = NO and continues billing. Future loads will not trigger this prompt.
◦	Option B: Upload FSC now — Open the FSC file creation form to set up the customer's FSC profile immediately. Once saved and activated, the flagged load is recalculated with FSC and the invoice is updated.
◦	Option C: Hold for review — Keep the load flagged in the billing queue. Do not invoice until FSC is resolved. Alert sent to Jesus's team and Sales.
•	Alert sent to Jesus's team regardless of which option is selected
•	If Option B is chosen and the FSC file requires customer approval, the load remains held until approval is received
Implementation Note: The Mega default schedule (Section 11) is only applied when explicitly assigned as the customer's FSC file via Option B. It is never auto-applied. The system must present these three options as an actionable workflow, not just a passive warning.
EC-5: Customer Table Has Gaps
Scenario: Customer's FSC table covers $2.50 to $3.00 and $3.10 to $3.50, but current DOE is $3.05 (falls in gap between ranges).
Expected Behavior:
•	System cannot find a matching row (no row where fuel_price_from <= 3.05 < fuel_price_to)
•	Do NOT calculate FSC — do NOT guess, interpolate, or use nearest row
•	Flag load for manual review in billing queue
•	Alert Jesus's team that customer table has coverage gap at $3.05
•	Wait for human resolution before billing FSC
NOTE: This is different from EC-6 (index above table). Gaps between ranges require human intervention. Index above max uses the highest row.
EC-6: Customer Table Exceeded
Scenario: Customer's table goes up to $4.00 but current DOE is $4.25 (above all ranges).
Expected Behavior:
•	Use the highest row in the table (the last row with the highest fuel_price_from)
•	Flag load with warning: "Index value exceeds customer table range"
•	Alert Jesus's team to request updated table from customer
EC-7: Index Value Drops Below Base Price
Scenario: DOE drops to $1.80 and customer's base is $2.00. The formula yields a negative FSC.
Expected Behavior:
•	FSC = $0.00 (never negative)
•	No FSC line item on invoice, OR $0.00 line depending on fsc_applies setting (YES_ITEMIZED shows $0.00 line, NO shows $0.00 line)
•	If customer has a floor configured (e.g., floor = 2%), apply the floor instead
EC-8: All-in Rate Customer Gets FSC Added By Mistake
Scenario: Customer's FSC file says fsc_applies = YES_ALL_IN, but a dispatcher or billing clerk manually adds FSC.
Expected Behavior:
•	System should prevent manual FSC addition when fsc_applies = YES_ALL_IN
•	If manual override is forced (with manager approval), log it in audit trail
•	Invoice validation should flag: "FSC applied to YES_ALL_IN customer"
EC-9: Multiple Stops with Different Pickup Dates
Scenario: Multi-stop load where Stop 1 is picked up Monday and Stop 3 is picked up Wednesday. Different DOE values may apply to different stops.
Expected Behavior:
•	If customer bills per-stop: each stop gets its own FSC based on its pickup date
•	If customer bills per-load: use the first pickup date as the applicable date
•	This should be configurable in the FSC file or customer profile
EC-10: Rebill / Credit Memo
Scenario: An invoice is credited and rebilled. The rebill must use the original FSC, not the current FSC.
Expected Behavior:
•	Rebill must reference the original invoice's FSC calculation (FSC file ID, index value, index date)
•	Credit memo reverses the original FSC amount exactly
•	If the rebill is due to a rate change only, FSC should remain the same unless the FSC itself was incorrect
•	Audit trail must link original invoice, credit, and rebill
EC-11: OPIS API Outage
Scenario: OPIS API is down for extended period. Customers using OPIS index have no current data.
Expected Behavior:
•	System retries per configured schedule (3 attempts)
•	After failure, alert operations team
•	Billing continues using last available OPIS value
•	All affected invoices flagged: "OPIS data unavailable — used last known value"
•	Do NOT fall back to DOE — the customer's contract specifies OPIS
EC-12: FSC File Pending Approval at Billing Time
Scenario: Jesus's team created a new FSC file but it requires customer approval. Meanwhile, loads are coming in.
Expected Behavior:
•	If a previous Active file still exists, use it for billing
•	If no previous Active file exists (new customer, first FSC file), BLOCK billing until approved
•	Loads accumulate in billing queue with status: "Awaiting FSC Approval"
•	Alert sent to Jesus's team and Sales
EC-13: Customer Changes FSC Mid-Contract
Scenario: Customer renegotiates and changes from DOE National to DOE Gulf Coast, effective next month.
Expected Behavior:
•	Jesus's team creates a NEW FSC file with new parameters and future start date
•	New file status = Scheduled (or Pending Approval)
•	Current file remains Active until new file's start date
•	On the start date, system auto-transitions: new → Active, old → Expired
•	All loads before transition date use old file; all loads after use new file
EC-14: Rounding Precision
Scenario: FSC calculation produces $127.333... or FSC% = 12.5%.
Expected Behavior:
•	FSC dollar amounts: round to 2 decimal places (standard rounding, 0.5 rounds up)
•	FSC percentages: store with up to 4 decimal places for accuracy, display as 2 decimal places
•	All intermediate calculations use full precision; only round the final dollar amount
EC-15: Zero-Mile Load with Per-Mile FSC
Scenario: A load record has 0 miles (data entry error or local delivery) but customer uses per-mile FSC.
Expected Behavior:
•	FSC = $0.00 (0 miles × any rate = $0)
•	Flag for review: "Load has 0 miles — FSC not applied"
•	Do not block billing — flag only
EC-16: Zero Linehaul with Percentage FSC
Scenario: Load has $0 linehaul (possible brokerage or internal move) but customer uses percentage-of-linehaul FSC.
Expected Behavior:
•	FSC = $0.00 (any % × $0 = $0)
•	Flag for review: "Load has $0 linehaul — verify if FSC should apply"
EC-17: Duplicate Index Fetch
Scenario: System fetches DOE data twice on the same day due to retry logic or cron overlap.
Expected Behavior:
•	Unique constraint on (index_source, effective_date) prevents duplicates
•	Second insert silently fails or is rejected
•	No duplicate index values in the data store
EC-18: Customer Has Both FSC and Equipment/Fuel Adjustment
Scenario: Customer has a standard FSC schedule PLUS a separate Equipment & Fuel Adjustment charge.
Expected Behavior:
•	These are separate line items on the invoice
•	FSC is calculated per the FSC engine
•	Equipment adjustment is handled by the accessorial/rate engine, not the FSC engine
•	System must not double-apply fuel-related charges
EC-19: Brokerage Load (Third-Party Carrier)
Scenario: A brokered load where Mega is the broker. The customer-facing FSC is different from what Mega pays the carrier.
Expected Behavior:
•	Customer-facing FSC: calculated per customer's FSC file (invoice side)
•	Carrier-facing FSC: calculated per carrier rate confirmation (settlement side)
•	These are independent calculations — the FSC engine handles customer side only
•	Carrier FSC is handled by the settlement module
 
EC-20: Custom Update Frequency with Calculation & Effectuation Dates
Scenario: Customer A says "Calculate FSC on the second-to-last Monday of each month using that day's DOE value. Apply to all loads for the following month." Customer B says "Calculate FSC on the last Monday of the month. Apply to loads for the following month." Each customer can have a completely unique calculation schedule.
Expected Behavior:
•	System reads custom_frequency_rule from the FSC file
•	The rule must define three things: (1) the CALCULATION DATE — when the index value is captured, (2) the EFFECTUATION PERIOD — the day/week/month/quarter/year that the calculated FSC applies to, and (3) what INDEX VALUE to use on the calculation date
•	Example A: Calculation date = second-to-last Monday of January. Index = DOE published that Monday. Effectuation period = all of February. Every load picked up in February uses that FSC value.
•	Example B: Calculation date = last Monday of January. Index = DOE published that Monday. Effectuation period = all of February.
•	The system should store the calculated FSC rate/value for each effectuation period so it doesn't need to re-derive it for every load
•	If the rule can be programmatically resolved (e.g., 'Nth Monday of month'), implement as a date resolution function
•	If the rule requires aggregation (e.g., 'monthly average of all DOE values'), the system must compute from stored index data
•	If the rule cannot be programmatically interpreted, flag for manual resolution by Jesus's team
•	For initial implementation: treat CUSTOM frequency as requiring manual FSC rate entry for each effectuation period until automation is built for that customer's specific rule
Implementation Note: The custom_frequency_rule field is free-text to accommodate any customer requirement. Over time, common patterns (Nth weekday of month, monthly average, quarterly average) should be codified into selectable sub-options. The key data points for every custom rule are: calculation_date + index_value_used + effectuation_period_start + effectuation_period_end.
EC-21: Concurrent FSC File Edits
Scenario: Two users (e.g., someone on Jesus's team and a manager) edit the same FSC file at the same time. User A saves at 2:01 PM, User B saves at 2:02 PM.
Expected Behavior:
•	Last save wins — User B's changes overwrite User A's changes
•	BOTH edits are recorded in the audit trail (User A's edit at 2:01, User B's edit at 2:02)
•	No optimistic locking or conflict resolution needed
•	This is acceptable because FSC file edits are infrequent and typically performed by a single team
Implementation Note: The audit trail captures both saves, so if User A's changes were important, they can be identified and re-applied. No data is lost from the audit perspective.
EC-22: Linehaul Rate Change with Percentage FSC
Scenario: Sales renegotiates linehaul rates for a customer (e.g., from $800 to $900 per load). The customer's FSC is percentage-of-linehaul. The FSC dollar amount automatically increases because the base linehaul increased.
Expected Behavior:
•	This is correct and expected behavior — percentage FSC naturally scales with linehaul
•	No system intervention needed; the FSC engine simply applies the percentage to whatever linehaul is on the load
•	If a customer wants a fixed FSC dollar amount that doesn't change with linehaul changes, they need to be moved to FLAT_FEE method or a dollar-based CUSTOMER_TABLE
•	No special handling required in the FSC engine for this scenario
EC-23: Load with Multiple Invoice Line Items (Split Billing)
Scenario: A load is split into multiple invoice line items, such as inbound leg ($600 linehaul) and outbound leg ($400 linehaul). Customer's FSC is 15% of linehaul.
Expected Behavior:
•	FSC is calculated on EACH line item's linehaul separately
•	Inbound leg FSC: $600 × 15% = $90.00
•	Outbound leg FSC: $400 × 15% = $60.00
•	Total FSC = $150.00 (same as if calculated on combined $1,000 linehaul)
•	Each FSC line item carries its own audit data (FSC file ID, index value, etc.)
Implementation Note: For percentage-of-linehaul, splitting vs. combining yields the same total. For per-mile, each leg should use its own mileage. For flat fee, the flat fee should apply once per LOAD, not per line item (unless customer agreement specifies otherwise).
EC-24: FSC on Accessorials (Explicitly Not Allowed)
Scenario: A billing clerk or automated rule attempts to apply FSC to detention charges, lumper fees, or the total invoice amount instead of just linehaul.
Expected Behavior:
•	FSC applies ONLY to linehaul — this is a hard rule with no exceptions
•	The FSC engine receives only the linehaul amount as input for percentage calculations
•	The system should never pass total charges or accessorial amounts to the FSC engine
•	If a customer's contract specifies FSC on total charges, this is a contract error that must be resolved with Sales — the system does not support it
Implementation Note: The FSC engine's calculate function should accept linehaul_amount (and miles for per-mile method) as inputs. It should never accept or reference total_charges, accessorial_amounts, or any non-linehaul values.
 
14. Error Handling & System Behavior
General principle: The FSC engine should NEVER silently fail. Every exception must be logged, flagged, or alerted. The system should be designed to continue billing (with flags) rather than blocking the entire pipeline, except in cases where billing without FSC would be materially incorrect.
Error Condition	System Response	Notification
Index fetch failed (all retries)	Use last available value; flag invoices	Alert to Operations + IT
Index value outside sanity bounds	Store but flag for review	Alert to Operations
No FSC file for customer	Invoice without FSC; flag load	Alert to Jesus's Team
FSC file in Pending Approval (no prior Active)	Block billing	Alert to Jesus's Team + Sales
FSC file in Pending Approval (prior Active exists)	Use prior Active file	None (expected behavior)
Division by zero (increment_price = 0)	Blocked at validation (V6)	UI error message
Custom table gap (between ranges)	Do NOT calculate; flag for manual review	Alert to Jesus's Team
Custom table exceeded (above max)	Use highest row; flag for review	Alert to Jesus's Team
FSC exceeds sanity_threshold	Hold for manual review	Alert to Billing Manager
Negative FSC calculated	Set FSC = $0.00	None (expected behavior)
OPIS API outage	Use last OPIS value; do NOT fall back to DOE	Alert to Operations
 
15. API & Integration Points
15.1 External Integrations
Integration	Direction	Purpose	Frequency
EIA API	Inbound (pull)	DOE diesel price data	Weekly (Mon 10AM + 3PM ET)
OPIS API	Inbound (pull)	OPIS fuel price data	Per subscription schedule
15.2 Internal Module Dependencies
Module	Dependency	Direction
Billing Module	Calls FSC engine to get FSC amount for each load/line item	Billing → FSC
Customer Profile	Stores FSC file references and custom tables	FSC → Customer
Load/Order Module	Provides linehaul (per line item), miles, pickup date, invoice date	Load → FSC
Invoice Module	Receives FSC line item(s) with full audit data	FSC → Invoice
Settlement Module	Independent FSC for carrier payments (brokerage)	Separate
Notification Service	Sends alerts for missing data, pending approvals, etc.	FSC → Notifications
Fuel Module	Fuel card data and supplier invoices are separate from FSC billing; FSC references index prices, not actual fuel costs	Informational only
15.3 Key API Endpoints (Suggested)
Endpoint	Method	Purpose
GET /customers/{id}/fsc-files	GET	List all FSC files for a customer
GET /customers/{id}/fsc-files/active	GET	Get the currently active FSC file
POST /customers/{id}/fsc-files	POST	Create a new FSC file
PUT /fsc-files/{id}	PUT	Edit an FSC file (triggers approval logic)
POST /fsc-files/{id}/approve	POST	Record customer approval
POST /fsc-files/{id}/override	POST	Level 3 Manager override
POST /fsc/calculate	POST	Calculate FSC for a load/line item
GET /fsc-files/{id}/audit-log	GET	Get audit history for an FSC file
GET /indices/{source}	GET	Get latest index values by source
POST /customers/{id}/fsc-tables	POST	Upload a custom FSC table
 
16. UI Requirements
16.1 Customer FSC Profile Screen
•	Display all FSC files for a customer (Active, Scheduled, Expired, Pending)
•	Color-code by status (green = Active, yellow = Scheduled, grey = Expired, orange = Pending)
•	Show current applicable FSC % or amount based on latest index
•	Allow creation of new FSC file (form with all fields from Section 4.1)
•	Allow editing of existing FSC file (with audit trail capture)
•	Delete button should NOT exist — no delete action in the UI
•	Show audit log inline or in expandable panel
•	Sanity threshold configurable per customer (show current value)
16.2 FSC Dashboard (Operations View)
•	List all customers with Active FSC files
•	Show current FSC % or amount per customer
•	Highlight customers with stale index data
•	Highlight customers with FSC files in Pending Approval status
•	Show loads in billing queue flagged for FSC issues
•	Show customers with CUSTOM frequency rules that may need manual attention
16.3 Invoice View
•	FSC displayed as a separate line item per invoice line (if split billing)
•	Show: amount, percentage (if applicable), and index reference
•	Hover/click on FSC line shows: index source, index value, index date, FSC file ID, calculation method, raw amount before cap/floor
•	For YES_ALL_IN customers: no FSC line visible (fuel is in the rate)
•	For NO customers: show $0.00 FSC line (transparent — explicitly shows FSC was considered)
 
17. Testing Scenarios
The following test cases should be used by QA to validate the FSC engine implementation.
#	Test Case	Setup	Expected Result
T1	Basic % of linehaul calculation	DOE = $3.50, Base = $2.00, Inc = $0.10/1%, Linehaul = $1,000	FSC = $150.00 (15%)
T2	Per-mile calculation	DOE = $3.50, Base = $2.50, Inc = $0.05/$0.02/mi, Miles = 250	FSC = $100.00 ($0.40/mi)
T3a	Flat fee (dollar)	flat_fee_amount = 75, flat_fee_type = DOLLAR	FSC = $75.00 regardless of DOE or linehaul
T3b	Flat fee (percentage)	flat_fee_amount = 8, flat_fee_type = PERCENTAGE, LH = $1,000	FSC = $80.00 (fixed 8%)
T4	Customer table lookup (half-open)	DOE = $3.25, Row: from=$3.20 to=$3.30, value=12%	FSC = 12% of linehaul
T5	Cap enforcement (percentage)	Calculated FSC = 25%, cap_type = PERCENTAGE, cap_value = 20	FSC = 20%
T6	Floor enforcement (percentage)	Calculated FSC = 1%, floor_type = PERCENTAGE, floor_value = 3	FSC = 3%
T7	Negative FSC (below base)	DOE = $1.80, Base = $2.00, No floor	FSC = $0.00
T8	No FSC file	Customer has no FSC file	Warning logged, no FSC, flag
T9	fsc_applies = NO	FSC file says NO	$0.00 FSC line on invoice
T10	fsc_applies = YES_ALL_IN	FSC file says YES_ALL_IN	No FSC line on invoice
T11	Late billing (historical FSC)	Load from 3 weeks ago, FSC changed	Uses old FSC file + old index
T12	FSC file transition mid-week	File A ends Wed, File B starts Thu	Tue load uses A, Thu uses B
T13	Stale index data	No DOE update for 14+ days	Alert sent, last value used
T14	Table gap (between ranges)	DOE falls between table ranges	Flagged, NOT auto-calculated
T15	Table exceeded (above max)	DOE above max table range	Highest row used, flagged
T16	Rebill uses original FSC	Credit + rebill on a load	Rebill matches original FSC
T17	Configurable sanity threshold	Threshold = 30%, calculated = 35%	Held for manual review
T18	Pending approval (no prior Active)	Only FSC file is Pending	Billing blocked, loads queue
T19	Rounding precision	Calculation = $127.3333...	Invoice shows $127.33
T20	0 miles + per-mile FSC	Load has 0 miles, per-mile method	FSC = $0.00, flagged
T21	Half-open interval boundary	DOE = $3.30, Row from=$3.20 to=$3.30	Does NOT match (to is exclusive); next row used or gap flagged
T22	Split billing FSC per line item	2 line items: $600 + $400 LH, 15%	FSC = $90 + $60 = $150 total
T23	FSC only on linehaul	$1000 LH + $200 detention, 15%	FSC = $150 (not $180)
T24	Raw vs capped amount in audit	Raw = 25%, cap = 20%, LH = $1000	Invoice=$200, audit shows raw=$250
T25	Cap enforcement (dollar)	Calculated FSC = $300, cap_type = AMOUNT, cap_value = 200	FSC = $200.00
T26	Pending approval (prior Active exists)	New FSC pending, old Active exists	Old Active used, no block
T27	No FSC file — 3-option prompt	New customer, no FSC file, load enters billing	Prompt with Proceed/Upload/Hold options
T28	Custom frequency with calc + effectuation dates	Rule: 2nd-to-last Mon of month, applies next month	Uses that Monday's DOE for all next month loads
T29	Cap/floor both NONE (no cap, no floor)	cap_type = NONE, floor_type = NONE	No cap/floor applied, raw FSC used
 
Appendix A: Review Decisions Log
This appendix records all business decisions made during the document review on February 20, 2026, with Erick Rodriguez.
#	Question	Decision
1	Is there a 4th option for fsc_applies beyond Yes/No/All-in (e.g., Seasonal, Conditional)?	No. Three options only: YES_ITEMIZED, YES_ALL_IN, NO. Renamed for clarity — both YES options mean the customer pays for fuel; the difference is whether FSC is a visible line item or built into the rate.
2	Custom table range bounds: inclusive-inclusive or half-open?	Half-open: fuel_price_from <= value < fuel_price_to. Upper bound is exclusive.
3	Can a customer have BOTH a percentage cap AND a dollar cap?	No. A customer has EITHER a % cap OR a $ cap, never both. Stored as cap_type + cap_value.
4	Should DOE fetch have a second retry window at 3:00 PM ET?	Yes. First attempt at 10:00 AM, retry at 3:00 PM if stale.
5	Is 20% deviation threshold for index validation correct?	No threshold — remove the deviation check. Store all values as-is.
6	What is the Flat Fee method? Can it be table-driven?	Flat fee is a single static dollar amount (flat_fee_amount). Not table-driven. For tiered flat fees, use CUSTOMER_TABLE with FLAT_DOLLAR surcharge_type.
7	Step 2 in billing workflow uses 'today' — should it use applicable_date?	Yes. Changed to use applicable_date throughout the workflow.
8	How to handle when both % cap and $ cap exist?	N/A — they are mutually exclusive per decision #3.
9	Should audit capture raw FSC before cap/floor?	Yes. Step 7 now records both raw and final FSC amounts.
10	B7 vs EC-5 wording inconsistency (table exceeded vs gap)?	Clarified: B7 is for ABOVE max (use highest row). EC-5 is for BETWEEN ranges (flag, do not calculate). Added clarifying note to B7.
11	Should B9 sanity threshold be hardcoded at 50% or configurable?	Configurable per customer. New field: sanity_threshold (default 50%).
12	Need edge case for CUSTOM update frequency?	Yes. Added EC-20 with custom_frequency_rule text field.
13	How to handle concurrent FSC file edits?	Last save wins. Both edits recorded in audit trail. Added EC-21 and Section 8.4.
14	Edge case for linehaul rate change affecting % FSC dollar amount?	Expected behavior. If customer wants fixed $ FSC, use FLAT_FEE. Added EC-22.
15	For split billing loads, is FSC on total linehaul or per line item?	Per line item separately. Added EC-23.
16	Does FSC apply only to linehaul or also to accessorials/total?	ONLY linehaul. Hard rule, no exceptions. Added EC-24.

— END OF DOCUMENT —
