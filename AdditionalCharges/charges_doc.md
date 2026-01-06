
AXIS 2.0
Fuel Integration Module
Technical Specification & Process Flows

Prepared for: Development Team
Version 1.0  •  December 2024
 
Table of Contents
1. Executive Summary
2. Module Overview
3. Architecture & Pricing Hierarchy
4. Process Flows
4.1 Card Provisioning Flow
4.2 Fuel Transaction Flow
4.3 Pricing Calculation Flow
4.4 Fuel Stop Recommendation Flow
4.5 Settlement & Billing Flow
4.6 Card Suspension Flow
4.7 Franchise Pricing Flow
4.8 Tier Recalculation Flow
5. Data Models
6. Integration Points
7. Implementation Notes
 
1. Executive Summary
The Fuel Integration Module is a core component of AXIS 2.0 that connects with major fuel card platforms (EFS, Commdata, Relay) to manage negotiated discounts, issue fuel cards, and implement flexible pricing models across all entity types.
Key Capabilities
•	Multi-platform integration with EFS, Commdata, and Relay APIs
•	Automated card provisioning triggered by driver onboarding
•	8 flexible pricing models including tiered scoring
•	Smart fuel stop optimization integrated with dispatch
•	Confidential pricing waterfall protecting supplier costs
•	Automated settlement integration for all entity types
•	Real-time fraud detection and card controls
Entity Types Supported
Entity Type	Platform	Pricing Model	Settlement
Company Driver	EFS	Tiered by Score	Payroll Deduction
Owner-Operator	EFS	O/O Standard	Settlement Deduction
Franchise Driver	Commdata	Franchise Rate	Weekly Invoice
Carrier (Brokerage)	Relay	Advance Rate	Load Recapture
 
2. Module Overview
The Fuel Integration Module serves as the central hub for all fuel-related operations within AXIS 2.0. It manages the complete lifecycle from card issuance through transaction processing, pricing calculation, and settlement.
Platform Integration
Platform	Primary Use	Sync Frequency	Data Exchange
EFS	Company drivers, Owner-operators	Transactions: 15 min	REST API, Webhooks
Commdata	Franchise fleets, Carriers	Transactions: 15 min	REST API, Webhooks
Relay	Brokerage fuel advances	Real-time	REST API
Card Controls (Network-Level Defaults)
•	Daily Dollar Limit: $500 (adjustable)
•	Transaction Limit: $300 (adjustable)
•	Daily Gallon Limit: 150 gallons (adjustable)
•	Approved Products: Diesel, DEF, Reefer Fuel
•	Cash Advances: Disabled (requires approval)
•	Network Restriction: In-network only
•	Odometer Prompt: Required (always on)
 
3. Architecture & Pricing Hierarchy
Pricing Waterfall Model
The pricing system uses a three-level waterfall that maintains confidentiality at each tier. Supplier costs are hidden from all downstream entities.
Level	Description	Visibility
Level 1	Supplier Cost (negotiated discounts)	Mega Admin ONLY - Hidden from all downstream
Level 2	Mega Base Price (admin sets per entity)	Mega Admin + Franchise Admin (as their ceiling)
Level 3	Entity Price (what driver/carrier pays)	Visible to all parties
8 Pricing Models
Model	Formula	Example	Use Case
Fixed Rate	Static $/gal	$3.25/gal	Predictable budgeting
Pump Discount (Flat)	Pump - fixed amount	Pump - $0.15	Standard program
Pump Discount (%)	Pump - percentage	Pump - 3%	Volume relationships
Per-Mile	$/dispatched mile	$0.52/mile	Performance-based
Cost-Plus (Flat)	Our cost + markup	Cost + $0.08	Margin protection
Cost-Plus (%)	Our cost + % markup	Cost + 5%	Scalable margin
Tiered (Score)	Varies by driver score	Platinum: +3%	Incentivize performance
Custom	Entity-specific	Per agreement	Special relationships
Driver Score Tier Structure
Scores recalculated weekly (Sunday midnight). Components:
•	Safety (40%): HOS violations, hard braking, speeding, accidents
•	Fuel Efficiency (25%): MPG vs fleet average, idle time
•	Reliability (20%): On-time %, load acceptance, complaints
•	Tenure (15%): Months active, consistency
Tier	Score Range	Pricing Rate	Difference
Platinum	90-100	Cost + 3%	Best rate
Gold	80-89	Cost + 5%	+2% vs Platinum
Silver	70-79	Cost + 7%	+4% vs Platinum
Bronze	0-69	Cost + 10%	+7% vs Platinum
 
4. Process Flows
This section details the 8 core process flows that comprise the Fuel Integration Module. Each flow includes step-by-step procedures, actors, systems involved, timing requirements, and technical implementation notes.
4.1 Card Provisioning Flow
Automated card issuance triggered by driver onboarding completion.
Step 1: Driver Begins Onboarding
New driver enters AXIS onboarding workflow. Creates driver profile and initiates automated workflow.
Actor: Driver / Recruiting  |  System: AXIS Onboarding Module  |  Timing: Day 0
Details:
•	Driver record created with unique ID
•	Onboarding workflow triggered via event-driven architecture
•	Welcome email sent to driver
Step 2: Onboarding Steps Completed
Driver completes required documentation, training, drug test, and background check.
Actor: Driver  |  System: AXIS Onboarding Module  |  Timing: Day 1-5
Details:
•	Document uploads (CDL, medical card)
•	Safety training modules via LMS
•	Drug screening via third-party API
•	Background verification callback
Step 3: System Determines Entity Type
AXIS identifies driver classification: Company Driver, Owner-Operator, Franchise Driver, or Carrier.
Actor: System (Automatic)  |  System: AXIS Core  |  Timing: Immediate
Details:
•	Company Driver → Routes to EFS
•	Owner-Operator → Routes to EFS
•	Franchise Driver → Routes to Commdata
•	Carrier (Brokerage) → Routes to Relay
Step 4: Platform Selection & Card Request
System selects appropriate fuel platform and sends API request to provision card.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	API call to EFS/Commdata/Relay
•	Payload: driver_id, name, truck_number, entity_type, terminal_id
•	Retry logic with exponential backoff (3 attempts)
Step 5: Pricing Model Assignment
System assigns default pricing model based on entity type.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	Company Driver → Tiered by Score (starts Bronze)
•	Owner-Operator → O/O Standard Rate
•	Franchise Driver → Franchise's assigned ceiling
•	Carrier → Carrier Fuel Advance rate
Step 6: Default Controls Applied
System applies network-level card controls.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	Daily Limit: $500
•	Transaction Limit: $300
•	Gallon Limit: 150/day
•	Products: Diesel, DEF, Reefer
•	Network: In-Network Only
Step 7: Card Provisioned in Platform
Fuel platform confirms card created and returns card number.
Actor: External Platform  |  System: EFS / Commdata / Relay  |  Timing: < 1 minute
Details:
•	Platform returns card_number and status='provisioned'
•	Card record updated in fuel_cards table
•	Expiration date stored
Step 8: Physical Card Ships
Platform ships physical card to driver's assigned terminal.
Actor: External Platform  |  System: EFS / Commdata / Relay  |  Timing: 3-5 business days
Details:
•	Shipping address from driver_profiles.terminal_id
•	Tracking number stored if provided
•	Terminal manager notified
Step 9: Driver Picks Up Card
Driver retrieves card from terminal. Card activates on first use.
Actor: Driver  |  System: Terminal Location  |  Timing: Day 5-10
Details:
•	Terminal staff may verify identity
•	Card pickup optionally logged
•	Card auto-activates on first transaction
Step 10: Card Active & Monitoring Begins
Card is fully active with transaction sync and fraud monitoring enabled.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Ongoing
Details:
•	Transaction sync every 15 minutes
•	Fraud detection rules evaluated per transaction
•	MPG calculations updated
•	Data feeds driver score (weekly)
Technical Note: Card provisioning is triggered by onboarding_complete event via message queue. Entire flow should complete within 5-10 business days.
 
4.2 Fuel Transaction Flow
From pump swipe through pricing calculation and settlement queue.
Step 1: Driver Arrives at Fuel Station
Driver selects in-network fuel station (ideally from AXIS recommendation).
Actor: Driver  |  System: Physical Location  |  Timing: Real-time
Details:
•	In-network stations provide better discounts
•	Out-of-network triggers monitoring alerts
Step 2: Card Swipe & Authorization Request
Driver swipes fuel card at pump, enters driver ID and odometer reading.
Actor: Driver  |  System: Fuel Station POS  |  Timing: Real-time
Details:
•	Driver ID verification at platform level
•	Odometer stored for MPG calculations
Step 3: Platform Authorization Check
Fuel platform validates card status, limits, product restrictions, and network.
Actor: System (Automatic)  |  System: EFS / Commdata / Relay  |  Timing: < 3 seconds
Details:
•	Is card active? → Proceed / Decline
•	Within daily limit? → Proceed / Decline
•	Approved product? → Proceed / Decline
•	In-network location? → Proceed / Decline
Step 4: Fueling Authorized
Pump releases fuel, driver fills tank.
Actor: Driver  |  System: Fuel Station  |  Timing: 5-15 minutes
Details:
•	Pre-authorization holds funds during fueling
•	Pump stops if pre-auth limit reached
Step 5: Transaction Completed
Final gallons and pump price recorded by station.
Actor: System  |  System: Fuel Station POS  |  Timing: Immediate
Details:
•	Timestamp to the second
•	Pump price = retail before discounts
•	DEF may be separate line item
Step 6: Transaction Data Sent to Platform
Station transmits transaction details to fuel card platform.
Actor: System  |  System: EFS / Commdata / Relay  |  Timing: < 5 minutes
Details:
•	Secure EDI or API protocols
•	Platform applies negotiated discounts
Step 7: AXIS Syncs Transaction
AXIS pulls transaction via API (every 15 minutes).
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Within 15 minutes
Details:
•	Pulls: timestamp, location, gallons, pump price, product, odometer, card ID
•	Cursor-based pagination for high volumes
•	Deduplication via platform_transaction_id
Step 8: Pricing Calculation
AXIS calculates three price points for this transaction.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	1. Our Cost = Pump price - Supplier discount
•	2. Driver Price = Based on assigned pricing model
•	3. Margin = Driver Price - Our Cost
Step 9: Fraud Analysis
System checks for anomalies in transaction patterns.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	Out-of-route purchase? (25-mile buffer)
•	Unusual volume for truck type?
•	Velocity check (multiple transactions in 2 hours)
•	Flag if anomaly detected
Step 10: Transaction Logged for Settlement
Transaction queued for next settlement/payroll cycle.
Actor: System (Automatic)  |  System: Settlement Module  |  Timing: Batched
Details:
•	Linked to settlement_batch_id
•	Status: pending_settlement → settled
•	Entity type determines settlement method
 
4.3 Pricing Calculation Flow
How driver price is calculated for each transaction with visibility controls.
Step 1: Transaction Received
Raw transaction data arrives from fuel platform via API sync.
Actor: System  |  System: Fuel Integration Module  |  Timing: Via API sync
Details:
•	Pump Price: $3.42/gal
•	Gallons: 127
•	Location: Pilot #4521 (In-Network)
•	Product: Diesel
Step 2: Lookup Supplier Discount
System retrieves negotiated discount for this platform/location/product combination.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	Composite key: (platform_id, network_tier, product_type)
•	Fallback to default discount if no match
•	Volume tier bonuses may apply
Step 3: Calculate Our Cost
Our Cost = Pump Price - Supplier Discount
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	Example: $3.42 - $0.08 = $3.34/gal
•	Total: $3.34 × 127 = $424.18
•	Stored to 4 decimal places
Step 4: Identify Driver's Pricing Model
Lookup assigned pricing model for this entity from fuel_cards table.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	Entity type determines model
•	For tiered: lookup current tier from driver_fuel_tier
•	Model parameters retrieved
Step 5: Apply Pricing Formula
Calculate driver price based on their assigned model.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	Tiered (Gold - Cost+5%): $3.34 × 1.05 = $3.51/gal
•	Fixed Rate: $3.29/gal regardless of pump
•	Pump Discount: $3.42 - $0.15 = $3.27/gal
•	Per-Mile: Calculated at settlement
Step 6: Calculate Margin
Margin = Driver Price - Our Cost
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	Driver Price: $3.51/gal
•	Our Cost: $3.34/gal
•	Margin: $0.17/gal (5.1%)
•	Total Margin: $0.17 × 127 = $21.59
Step 7: Store All Price Points
System stores all three values for reporting and settlement.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	pump_price_per_gallon: $3.42
•	our_cost_per_gallon: $3.34
•	driver_price_per_gallon: $3.51
•	total_driver_charge: $445.77
Visibility Matrix
Price Point	Mega Admin	Franchise Admin	Driver
Supplier Discount	✓ Visible	✗ Hidden	✗ Hidden
Our Cost	✓ Visible	✗ Hidden	✗ Hidden
Franchise Ceiling	✓ Visible	✓ Visible	✗ Hidden
Driver Price	✓ Visible	✓ Visible	✓ Visible
 
4.4 Fuel Stop Recommendation Flow
Smart fuel stop optimization integrated with dispatch module.
Step 1: Load Dispatched
New load assigned to driver with pickup, delivery, and deadline.
Actor: Dispatcher  |  System: AXIS Dispatch Module  |  Timing: At dispatch
Details:
•	Route: Dallas → Miami
•	Deadline: Dec 14, 10:00 AM
•	Fuel optimization job triggered via message queue
Step 2: Gather Real-Time Data
System collects current vehicle and driver state from telematics.
Actor: System (Automatic)  |  System: Telematics (Samsara) + ELD  |  Timing: Real-time
Details:
•	Current Fuel Level: 42% (~180 mi range)
•	Truck MPG (historical): 6.8
•	Driver HOS Remaining: 6.5 hours
•	GPS coordinates for distance calc
Step 3: Calculate Fuel Requirement
Determine gallons needed to complete route with 15% reserve.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	Miles Remaining: 847
•	Expected Consumption: 847 ÷ 6.8 = 124.5 gal
•	Current Tank: ~50 gal
•	Needed: 124.5 - 50 + 15% reserve = ~90 gal
Step 4: Query In-Network Stations
Fetch all eligible fuel stops along the route corridor.
Actor: System (Automatic)  |  System: Fuel Platform APIs  |  Timing: < 2 seconds
Details:
•	Filter: Platform's in-network locations
•	Buffer: 25 miles from route polyline
•	Returns: Location, current price, amenities
Step 5: Apply Feasibility Filters
Eliminate stations that don't meet constraints.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	Can reach with current fuel? → Keep / Exclude
•	Fueling + detour keeps ETA on track? → Keep / Exclude
•	Driver has HOS for 30-min stop? → Keep / Exclude
Step 6: Score & Rank Options
Calculate cost efficiency score for each viable stop.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	Price Score (60%): Driver price × estimated gallons
•	Time Score (25%): Minutes of route deviation
•	Traffic Score (15%): Current congestion at station
Step 7: Generate Top 3 Recommendations
Package best options for driver with savings calculations.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	#1 Pilot #4521 - $3.24, 12 min detour, save $23.40
•	#2 Love's #293 - $3.28, 8 min detour, save $18.20
•	#3 TA #847 - $3.31, 15 min detour, save $14.60
Step 8: Push Notification to Driver
Send recommendation via push notification + display in app.
Actor: System (Automatic)  |  System: Driver App  |  Timing: Immediate
Details:
•	Push via FCM (Android) / APNs (iOS)
•	Deep link to fuel recommendation screen
•	Navigate button for one-tap directions
Step 9: Driver Decision
Driver accepts recommendation or chooses alternative.
Actor: Driver  |  System: Driver App  |  Timing: Driver discretion
Details:
•	Tap Navigate for directions
•	View alternatives
•	No penalty for dismissing
Step 10: Log Outcome for Analysis
Record whether recommendation was followed for effectiveness tracking.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: After fueling
Details:
•	Compare actual stop to recommendation
•	Calculate savings captured/missed
•	Feed weekly effectiveness reports
Recommendation Triggers
•	New Load Dispatch: Calculate optimal stops for entire route
•	Fuel Level < 30%: Proactive recommendation before critical
•	Route Change: Recalculate if route or deadline changes
 
4.5 Settlement & Billing Flow
How fuel charges are processed for each entity type.
Settlement Methods by Entity
Entity	Method	Timing	Details
Company Driver	Payroll Deduction	Per pay period	Line item on pay stub
Owner-Operator	Settlement Deduction	Per settlement	Itemized on statement
Franchise	Weekly Invoice	Every Monday	All drivers aggregated, Net 7
Carrier	Advance Recapture	Per load	Advance + fee deducted first
Company Driver Flow (Example)
Step 1: Transactions Accumulate
Driver makes multiple fuel purchases during pay period.
Actor: System  |  System: Fuel Integration Module  |  Timing: Ongoing
Details:
•	Each transaction tagged with pay_period_id
•	Pay periods from payroll_schedules table
Step 2: Pay Period Closes
System aggregates all transactions by product type.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Pay period end
Details:
•	Diesel: 412 gal @ driver rate = $1,378.12
•	DEF: 48 gal @ driver rate = $142.56
•	Total: $1,520.68
Step 3: Send to Payroll
Fuel deduction sent to payroll system via API or file export.
Actor: System (Automatic)  |  System: Settlement Module → Payroll  |  Timing: Before payroll run
Details:
•	Deduction record: driver_id, type='fuel', amount, line_items
•	Status updated to 'sent_to_payroll'
Step 4: Payroll Processed
Fuel deducted from driver's gross pay.
Actor: Payroll System  |  System: Payroll  |  Timing: Pay date
Details:
•	Deduction in earnings_and_deductions section
•	Tax treatment per payroll config
Step 5: Driver Receives Pay Stub
Pay stub shows fuel as separate line items by product.
Actor: Driver  |  System: Payroll  |  Timing: Pay date
Details:
•	Fuel - Diesel: $1,378.12
•	Fuel - DEF: $142.56
•	Reconcile with Driver App history
Note: DEF, Diesel, and Reefer are always tracked and displayed as separate line items for compliance and clarity.
 
4.6 Card Suspension Flow
Automatic and manual suspension triggers with reactivation paths.
Automatic Suspension Triggers
Trigger	Condition	Reactivation	Configurable
Driver Score < 50	Weekly recalc drops below threshold	Auto when > 50	Yes
Failed Drug Test	Test result marked failed	Manual only	No
Driver Inactive	Status → inactive/terminated	Auto if restored	No
Balance > $2,500	Outstanding fuel balance exceeded	Auto when under	Yes
Step 1: Trigger Event Detected
System detects condition that triggers suspension.
Actor: System (Automatic)  |  System: AXIS Core / Safety Module  |  Timing: Real-time or scheduled
Details:
•	Events published to suspension_events queue
•	Payload: driver_id, trigger_type, trigger_value
Step 2: Suspension Decision
System validates suspension criteria are still met.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	Re-query source system to confirm current state
•	Prevents race conditions
•	Configurable thresholds from fuel_settings
Step 3: API Call to Platform
Send suspend command to EFS/Commdata/Relay.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	POST /cards/{card_id}/suspend
•	Retry logic: 3 attempts with exponential backoff
•	Local card marked suspended immediately
Step 4: Card Suspended in Platform
Fuel platform disables card for transactions.
Actor: External Platform  |  System: EFS / Commdata / Relay  |  Timing: < 1 minute
Details:
•	Card enters 'suspended' state
•	Swipe attempts will be declined
•	Card data preserved for reactivation
Step 5: Notifications Sent
Alert relevant parties of suspension.
Actor: System (Automatic)  |  System: Notification Service  |  Timing: Immediate
Details:
•	Driver: Push notification + SMS with reason
•	Fleet Manager: Email alert
•	Safety Manager: Dashboard notification
Step 6: Suspension Logged
Record suspension event for audit trail.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	card_id, driver_id, reason, trigger_details, timestamp
•	Records immutable per retention policy
Reactivation Paths
•	Automatic: Score returns above 50, balance reduced, status restored (within 15 min)
•	Manual Required: Failed drug test (new clean test), fraud investigation, admin suspension
 
4.7 Franchise Pricing Flow
How franchises set pricing for their drivers with ceiling constraints.
Step 1: Mega Admin Sets Franchise Ceiling
Mega assigns maximum rate that franchise pays (their cost basis).
Actor: Mega Admin  |  System: Fuel Integration Module  |  Timing: At franchise setup
Details:
•	Example: Cost + 8%
•	Stored in franchise_fuel_pricing table
•	Ceiling can be updated (affects future transactions)
Step 2: Franchise Views Their Ceiling
Franchise admin sees their assigned rate but NOT supplier costs.
Actor: Franchise Admin  |  System: Franchise Portal  |  Timing: Anytime
Details:
•	Sees: 'Your Cost: Cost + 8%' (≈$3.42/gal today)
•	Cannot see: Supplier discount or Mega's actual cost
•	Approximate price updated hourly
Step 3: Franchise Sets Driver Pricing
Franchise creates pricing model for their drivers (must be ≥ ceiling).
Actor: Franchise Admin  |  System: Franchise Portal  |  Timing: At setup or update
Details:
•	Example: Cost + 11% (gives 3% margin)
•	Multiple models can exist for driver groups
•	Margin = their rate minus ceiling
Step 4: System Validates Pricing
AXIS ensures franchise rate is at or above their assigned ceiling.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	If franchise tries Cost + 6% (below ceiling): REJECTED
•	If franchise sets Cost + 11% (above ceiling): ACCEPTED
•	All attempts logged for audit
Step 5: Pricing Applied to Drivers
All drivers under this franchise use the franchise's rate.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	Cards linked via franchise_driver_pricing
•	New drivers auto-assigned on onboarding
•	Changes take effect on next transaction
Step 6: Driver Makes Purchase
Franchise driver fuels at in-network station.
Actor: Driver  |  System: Fuel Station  |  Timing: Real-time
Details:
•	Transaction tagged with franchise identifier
•	Flows through normal processing
Step 7: Transaction Priced (4 Price Points)
System calculates complete waterfall for franchise transaction.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: On sync
Details:
•	Pump: $3.42
•	Mega Cost: $3.34 (hidden)
•	Franchise Cost: $3.42
•	Driver Price: $3.52
Step 8: Margins Calculated
System determines revenue for each party.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: On sync
Details:
•	Mega Margin: $3.42 - $3.34 = $0.08/gal
•	Franchise Margin: $3.52 - $3.42 = $0.10/gal
•	Driver sees only: $3.52/gal
Waterfall Example
Price Point	Amount	Who Sees This
Pump Price	$3.42	Everyone (at station)
Supplier Discount	-$0.08	Mega Admin only
Mega's Cost	$3.34	Mega Admin only
Mega Markup (8%)	+$0.08	Mega Admin only
Franchise Cost (Ceiling)	$3.42	Mega Admin + Franchise Admin
Franchise Markup (3%)	+$0.10	Franchise Admin only
Driver Price (Final)	$3.52	All parties
 
4.8 Tier Recalculation Flow
Weekly driver scoring that affects fuel pricing tiers.
Step 1: Weekly Recalculation Triggers
Scheduled job initiates score recalculation every Sunday at midnight.
Actor: System (Scheduled)  |  System: Safety Module  |  Timing: Sunday 00:00
Details:
•	Cron: 0 0 * * 0
•	Creates score_calculation_batch
•	Parallel processing for 400+ drivers
Step 2: Gather Safety Data (40%)
Pull safety metrics from past 30 days.
Actor: System (Automatic)  |  System: Safety Module + ELD  |  Timing: During job
Details:
•	HOS violations count
•	Hard braking events
•	Speeding incidents
•	Accident history
•	Each normalized to 0-100 scale
Step 3: Gather Fuel Efficiency Data (25%)
Calculate MPG and idle metrics.
Actor: System (Automatic)  |  System: Telematics (Samsara)  |  Timing: During job
Details:
•	Actual MPG vs fleet average
•	Idle time percentage
•	Efficiency = (driver_mpg / fleet_avg) × 100
Step 4: Gather Reliability Data (20%)
Pull delivery and load metrics.
Actor: System (Automatic)  |  System: Dispatch Module  |  Timing: During job
Details:
•	On-time delivery percentage
•	Load acceptance rate
•	Customer complaints count
Step 5: Calculate Tenure Factor (15%)
Factor in driver longevity and consistency.
Actor: System (Automatic)  |  System: HR Module  |  Timing: During job
Details:
•	Months with company
•	Tenure: 6+ mo = 70, 12+ = 85, 24+ = 95, 36+ = 100
•	Consistency bonus: +5 if no tier drops in 6 months
Step 6: Compute Composite Score
Calculate weighted average of all components.
Actor: System (Automatic)  |  System: Safety Module  |  Timing: During job
Details:
•	Score = (Safety × 0.40) + (Efficiency × 0.25) + (Reliability × 0.20) + (Tenure × 0.15)
•	Result: 0-100 scale, rounded to 1 decimal
Step 7: Determine Tier
Map score to pricing tier based on thresholds.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	90-100 → Platinum (Cost + 3%)
•	80-89 → Gold (Cost + 5%)
•	70-79 → Silver (Cost + 7%)
•	0-69 → Bronze (Cost + 10%)
Step 8: Compare to Previous Tier
Check if tier changed from last week.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	Previous tier from driver_fuel_tier.previous_tier
•	Determine: promoted, demoted, or unchanged
Step 9: Update Pricing Model
If tier changed, update driver's assigned pricing.
Actor: System (Automatic)  |  System: Fuel Integration Module  |  Timing: Immediate
Details:
•	Update fuel_cards.pricing_tier
•	Change takes effect immediately
•	Historical record in driver_tier_history
Step 10: Notify Driver
Send notification if tier changed (promotion or demotion).
Actor: System (Automatic)  |  System: Notification Service  |  Timing: Immediate
Details:
•	Promotion: 'Congrats! You moved to Gold tier!'
•	Demotion: 'Your tier changed to Silver. Here's how to improve.'
•	No change: No notification sent
 
5. Data Models
Core database entities for the Fuel Integration Module.
fuel_platforms
platform_id, name, api_credentials (encrypted), sync_status, last_sync_timestamp
supplier_discounts
discount_id, platform_id, location_tier, fuel_type, discount_type, discount_value, effective_date, expiration_date
fuel_cards
card_id, platform_id, platform_card_number, entity_type, entity_id, pricing_model_id, pricing_tier, status, daily_limit, transaction_limit, gallon_limit, approved_products[], network_restriction, issued_date
pricing_models
model_id, name, type, parameters (JSON), assigned_by, ceiling_model_id, effective_date, expiration_date
fuel_transactions
transaction_id, card_id, platform_transaction_id, timestamp, location_id, location_name, gallons, pump_price_per_gallon, our_cost_per_gallon, driver_price_per_gallon, total_pump_amount, total_our_cost, total_driver_charge, fuel_type, odometer_reading, driver_score_at_transaction, pricing_tier_at_transaction, fraud_flags[]
fuel_recommendations
recommendation_id, load_id, driver_id, recommended_location_id, recommended_price, estimated_savings, deviation_minutes, accepted (boolean), actual_location_id, created_at
driver_fuel_tier
driver_id, current_score, current_tier, previous_tier, safety_score, efficiency_score, reliability_score, tenure_score, last_calculated_at
franchise_fuel_pricing
franchise_id, ceiling_type, ceiling_value, driver_pricing_type, driver_pricing_value, effective_date, updated_by
 
6. Integration Points
Module	Integration Type	Data Exchanged
Onboarding	Event trigger (card provisioning)	Driver profile, entity type, terminal
Dispatch	Bidirectional API	Load routes, fuel recommendations
Settlement	Outbound batch	Fuel deductions, advances, recapture
Safety	Inbound API + Events	Driver scores, drug test results
Driver App	REST API + Push	Recommendations, prices, history
Telematics	Samsara API	Fuel level, MPG, odometer, GPS
ELD	Provider API	HOS remaining, violations
Payroll	API or file export	Fuel deductions per pay period
HR	API	Driver status, tenure, terminations
 
7. Implementation Notes
Key Architectural Decisions
1.	Confidentiality: Supplier costs hidden from all downstream users via database-level visibility controls
2.	Automation: Card provisioning, pricing, tier recalculation, and suspension are fully automated
3.	Flexibility: 8 pricing models support diverse business relationships
4.	Normalization Layer: Unified transaction schema allows adding platforms without downstream changes
5.	Event-Driven: Message queues decouple modules for scalability
Performance Requirements
•	Transaction sync: Every 15 minutes for all platforms
•	Card suspension: < 1 minute from trigger to platform update
•	Fuel recommendations: Generated within 30 seconds of dispatch
•	Tier recalculation: Complete batch for 400+ drivers in < 15 minutes
Security Considerations
•	API credentials encrypted at rest (AES-256)
•	Role-based access control for pricing visibility
•	Audit logging for all pricing changes
•	Fraud detection rules configurable per entity type
Error Handling
•	Platform API failures: Retry with exponential backoff (3 attempts), then alert admin
•	Transaction sync failures: Queue for next cycle, no data loss
•	Pricing calculation errors: Default to highest tier (Bronze) with alert
•	Telematics unavailable: Fall back to fleet averages for fuel recommendations

— End of Document —
