Mega Materials
Complete Operational Process Flow
From Supplier Negotiation to Customer Invoice & Carrier Payment
Executive Summary
This document outlines the complete operational lifecycle of a Mega Materials transaction, from initial supplier negotiations through final customer invoicing and carrier payment. The process spans six distinct phases managed by the AXIS 2.0 platform.
Phase	Owner	System	Duration
1. Procure	Vinnie Bove (Sales)	Cost Manager	1-2 weeks
2. Price	AXIS AI + Sales	Pricing Engine	Same day
3. Market	Sales Team	Campaign Builder	Ongoing
4. Sell	Inside Sales	Quote Engine	2-4 hours
5. Handoff	Logistics Bridge	AXIS Automation	Instant
6. Fulfill	Tommy Simpson (Ops)	Capacity Optimizer	1-3 days

 
Phase 1: Supplier Procurement
The procurement phase establishes relationships with material suppliers and captures negotiated rates into the AXIS system.
Process Steps
1.	Identify Potential Suppliers: Research quarries, sand mines, concrete plants, and recyclers within 75-mile radius of target delivery areas.
2.	Vet Supplier Qualifications: Verify business license, insurance ($1M minimum), FDOT certification (if applicable), and minimum 500 tons/day capacity.
3.	Negotiate Rates: Discuss base rates per ton, volume discount tiers, price lock periods (typically 90 days), and payment terms (NET 30 standard).
4.	Execute Contract: Sign supplier agreement documenting material types, rates, operating hours, load time guarantees, and fuel surcharge pass-through terms.
5.	Record in AXIS: Enter contract details into Cost Manager module including pickup locations, rate structures, and effective dates.
Key Data Captured
•	Supplier ID and contact information
•	Material types and specifications (e.g., #57 limestone, concrete sand)
•	Negotiated rate per unit (ton, cubic yard, piece)
•	Volume discount tiers and thresholds
•	Contract effective and expiration dates
•	Pickup location coordinates and hours of operation

Phase 2: Pricing Strategy
The pricing phase uses AI-powered analysis to determine optimal list prices that balance competitiveness with target margins.
Process Steps
1.	Market Analysis: AXIS Market Intelligence module analyzes competitor pricing on Planet Build, regional demand patterns, and construction permit data.
2.	AI Margin Recommendation: Pricing Engine calculates recommended list price based on supplier cost, target margin (15-20%), and market positioning.
3.	Human Approval: Sales leadership (Vinnie Bove) reviews AI recommendations and approves, adjusts, or overrides pricing.
4.	Publish Price List: Approved prices are published to the internal price list, making them available for quoting and marketplace listings.
Margin Calculation Example
Component	Value
Supplier Cost	$12.50 / ton
Target Margin	18%
Markup Applied	$2.25 / ton
List Price	$14.75 / ton

 
Phase 3: Marketing & Lead Generation
The marketing phase creates visibility for available materials through the Planet Build marketplace and other channels.
Process Steps
1.	Create Campaign: Define target materials, regions, and promotional parameters using Campaign Builder.
2.	Generate Listings: AI generates SEO-optimized titles, descriptions, and pricing displays for each material/region combination.
3.	Publish to Planet Build: Listings are automatically posted via API integration with real-time price synchronization.
4.	Receive Inquiries: Webhook captures incoming inquiries and routes to Sales CRM for follow-up.

Phase 4: Sales & Quoting
The sales phase converts inquiries into firm orders through a structured quoting process.
Process Steps
1.	Receive Customer Inquiry: Customer contacts MM via phone, email, or Planet Build. Inquiry captured in Sales CRM.
2.	Qualify Customer: Verify customer information, check credit status, and confirm delivery requirements.
3.	Generate Quote: Quote Engine automatically calculates total including material price, freight estimate, and applicable taxes.
4.	Send Quote to Customer: Formal quote PDF delivered via email with 7-day validity period.
5.	Customer Accepts: Customer confirms acceptance via email, phone, or digital signature.
6.	Record Sale: MaterialSale record created in AXIS with all order details locked.
Quote Components
Line Item	Calculation	Example
Material Total	Qty × Unit Price	500 tons × $14.75 = $7,375
Freight Estimate	ML Rate Calculator	500 tons × $3.50 = $1,750
Tax (if applicable)	Material × Tax Rate	$0 (contractor exempt)
Quote Total	Sum of above	$9,125

 
Phase 5: Logistics Handoff
When a sale includes freight, the Logistics Bridge automatically transfers the shipment requirements from Mega Materials to Mega Logistics.
Process Steps
1.	Check Freight Flag: System checks if includes_freight = true on the MaterialSale record.
2.	Create ML Order: LogisticsHandoff record created with all shipment details (pickup, delivery, commodity, weight).
3.	Transfer to Mega Logistics: ML receives the shipment order via internal API with customer contact info and delivery window.
4.	ML Accepts Order: ML confirms acceptance and order enters dispatch queue.
Data Transferred in Handoff
•	MM Sale ID (for linking)
•	Pickup location (supplier address and contact)
•	Delivery location (customer jobsite address)
•	Material type and quantity
•	Required delivery date/time window
•	Special instructions (site access, contact on arrival)
•	Billing relationship: ML bills MM for freight

Phase 6: Fulfillment & Delivery
Mega Logistics coordinates the physical delivery using Mega Trucking's fleet (First Right of Refusal) or external carriers when necessary.
Process Steps
1.	Capacity Check: Capacity Optimizer queries MT fleet availability for required date, equipment type, and region.
2.	First Right of Refusal: MT has opportunity to accept or decline the load. If MT declines, load routes to external carrier brokerage.
3.	Dispatch Driver: Accepted load is assigned to driver with pickup instructions, delivery details, and customer contact.
4.	Load at Supplier: Driver arrives at supplier, loads material, obtains scale ticket with verified weight.
5.	Transit Tracking: Real-time GPS tracking via Samsara. Customer can view delivery ETA via tracking link.
6.	Deliver & Capture POD: Driver delivers material, captures Proof of Delivery (signature, photos) via mobile app.
7.	Update Status: Delivery confirmed. Status syncs back to MM: DELIVERED.

 
Phase 7: Customer Invoicing
Once delivery is confirmed, Mega Materials generates and sends the customer invoice for the complete transaction.
Process Steps
1.	Trigger Invoice Generation: Delivery confirmation (DELIVERED status) triggers Billing Bot to generate invoice.
2.	Compile Invoice Details: System pulls original quote data, actual delivered quantity (from scale ticket), and POD documentation.
3.	Calculate Final Amount: If delivered quantity differs from quoted, invoice reflects actual delivery (within tolerance).
4.	Attach Supporting Documents: POD signature, scale ticket, and delivery photos attached to invoice.
5.	Send to Customer: Invoice emailed to customer billing contact with payment instructions per credit terms.
6.	Sync to QuickBooks: Invoice automatically pushed to QuickBooks for AR tracking and accounting.
Invoice Contents
•	Invoice number and date
•	Customer name and billing address
•	PO number (if provided)
•	Material description and delivered quantity
•	Unit price and extended price
•	Freight charges (if applicable)
•	Tax (if applicable)
•	Total amount due
•	Payment terms and due date
•	Attached POD and scale ticket

Phase 8: Carrier Payment
The intercompany settlement process ensures carriers (MT or external) are paid for completed hauls.
Intercompany Money Flow
Material Payment Path:
•	Customer pays Mega Materials (full invoice amount)
•	MM pays Supplier for material cost
•	MM retains material margin (15-18%)
Freight Payment Path:
•	Mega Materials pays Mega Logistics for freight
•	Mega Logistics pays Mega Trucking (if MT hauled) or External Carrier
•	ML retains freight margin (10-15%)
Process Steps
1.	ML Invoices MM: Mega Logistics generates freight invoice to Mega Materials for completed shipment.
2.	MM Approves & Pays ML: MM finance reviews and processes payment to ML (typically weekly batch).
3.	ML Settles with Carrier: ML pays MT (intercompany) or external carrier per agreed terms.
4.	MT Driver Pay: MT processes driver pay as part of regular payroll cycle.
Payment Timeline
From → To	Terms	Method
Customer → MM	NET 30 (standard)	ACH, Check, CC
MM → Supplier	NET 30	ACH, Check
MM → ML	Weekly batch	Intercompany transfer
ML → MT	Weekly batch	Intercompany transfer
ML → External Carrier	NET 30 (or per contract)	ACH, Factoring

 
Status Lifecycle Summary
A material sale progresses through 11 distinct statuses from initial supplier negotiation to final payment.
#	Status	Description
1	NEGOTIATING	Active supplier discussions for rate and terms
2	CONTRACTED	Agreement signed, rates locked in AXIS
3	PRICED	AI margin applied, list price approved
4	LISTED	Published to Planet Build marketplace
5	QUOTED	Customer quote sent, awaiting acceptance
6	SOLD	Customer accepted, MaterialSale recorded
7	LOGISTICS	Transferred to Mega Logistics for fulfillment
8	DISPATCHED	Driver assigned, truck en route
9	DELIVERED	POD captured, material at jobsite
10	INVOICED	Customer invoice sent
11	PAID	Customer payment received, transaction closed

Key Contacts & Responsibilities
Role	Name	Responsibility
VP Sales & Marketing	Vinnie Bove	Supplier negotiations, pricing approval
Customer Experience	Jesus	Customer sales, quote follow-up
Operations	Tommy Simpson	First Right decisions, MT dispatch
Brokerage	Andrew	External carrier sourcing
Finance/Controller	Lisa	Credit approval, invoicing, collections

— End of Document —
Mega Materials | Olympian Industries LLC | AXIS 2.0
