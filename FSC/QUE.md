# FSC Update Frequency — Business Rule Clarification
 
Hi team,
 
We are building the Fuel Surcharge (FSC) engine and need your input on how the **Update Frequency** setting should work for billing. We have a few specific scenarios below — please confirm which is correct, or let us know if it works differently.
 
---
 
## Background (For Context)
 
Our system pulls DOE National Average data **every Monday automatically**.
 
**Example — January 2025:**
| Date | DOE Price |
|---|---|
| Mon, Jan 6 | $3.50 |
| Mon, Jan 13 | $3.65 |
| Mon, Jan 20 | $3.48 |
| Mon, Jan 27 | $3.72 |
 
---
 
## Scenario: Customer "Titan" — Monthly Frequency
 
**Titan's FSC Settings:**
- FSC Applies: Yes, Itemized
- Method: Per-Mile Rate
- Index Source: DOE National
- **Update Frequency: Monthly**
- Effective Date Logic: Load Pickup Date
- FSC File Effective Start: January 1, 2025
 
**Question 1 — Which DOE value do we use for all of January?**
 
- **Option A:** First Monday of January → Jan 6 = **$3.50** (locked for all January loads)
- **Option B:** Last Monday of the prior month → Dec 30 = ??? (locked before the month begins)
- **Option C:** Average of all 4 Mondays in January → ($3.50 + $3.65 + $3.48 + $3.72) ÷ 4 = **$3.59**
- **Option D:** Something else — please describe
 
**Question 2 — When does February's rate kick in?**
 
- **Option A:** First Monday of February (Feb 3) → Wait for Feb 3 value, use it for all February loads
- **Option B:** Last Monday of January (Jan 27 = $3.72) → Use this as February's rate starting Feb 1
- **Option C:** Something else — please describe
 
---
 
## Scenario: Customer "Atlas" — Weekly Frequency
 
**Atlas's FSC Settings:**
- **Update Frequency: Weekly**
 
**Question 3 — How exactly does weekly work?**
 
We assume:
- Every Monday morning, the system checks the new DOE value
- All loads picked up **Monday through Sunday that week** use that Monday's rate
- The following Monday a new rate kicks in
 
**Is this correct? Or does the rate change mid-week if a new DOE value comes in?**
 
---
 
## Scenario: Customer "Apex" — Quarterly Frequency
 
**Apex's FSC Settings:**
- **Update Frequency: Quarterly**
 
**Question 4 — Which value locks in each quarter?**
 
- **Option A:** First Monday of the quarter (Jan 6, Apr 7, Jul 7, Oct 6)
- **Option B:** Last Monday of the prior quarter
- **Option C:** Average of all Mondays in the prior month of the quarter
- **Option D:** Something else — please describe
 
**Question 5 — Q1 starts January 1. Does the system wait for Jan 6 (first Monday) before billing any loads? Or does it use December's last value for Jan 1–5?**

-----

Question - Changing FSC Applicability When an Active File Already Exists
Consider this situation:
Customer "Titan" currently has an Active FSC File (Itemized, Per-Mile, DOE National).
An operations user opens the FSC form and changes "Does FSC Apply?" from Yes, Itemized → No FSC (or Yes, All-In Rate).
They save the change.
What should happen to the existing Active FSC File?