# MongoDB Collections

---

## Common (Shared Across All Modules)

### Fleet Management (5 collections)
- Vehicle
- Driver
- Trailer
- Location
- FleetType

### Auth & Permissions (4 collections)
- User
- Role
- CaslUserGroup
- CaslUserPermission

### Support & Config (6 collections)
- SupportTicket
- SupportTicketSubject
- MicroserviceConfig
- MilesMeterSystemConfig
- DocumentCounter
- Group

**Common Total: 15 collections**

---

## Manager Module

### Customer & Company (7 collections)
- Customer
- CustomerRegions
- Company
- CompanyUser
- AxisUser
- Argos
- ArgosPrecharge

### Rates & Pricing (6 collections)
- Rate
- RateTable
- RateOrgDest
- RateOrgDestLog
- OrgDestCode
- RateMethod

**Manager Total: 13 collections**

---

## Maintenance Module

### Work Orders (2 collections)
- Workorder
- ArchivedWorkorder

### Inspections (8 collections)
- InspectionPM
- ArchivedInspectionPM
- InspectionDOT
- ArchivedInspectionDOT
- InspectionFL
- InspectionsMonthly
- InspectOrder
- ArchivedInspectOrder

### Parts & Inventory (6 collections)
- Part
- Equipment
- Purchase
- PurchaseLog
- Distribution
- StockLog

### Service & Issues (3 collections)
- Issue
- ServiceTask
- Labor

### Maintenance Staff & Locations (3 collections)
- MaintenanceLocation
- Technician
- Vendor
- Employee

**Maintenance Total: 23 collections**

---

## Operation Module

### Charges (13 collections)
- Charge
- ChargeHistory
- ChargeLogs
- ChargeNavHistory
- ChargeType
- ChargeRate
- ChargeStatus
- ChargeStat
- DailyStat
- DailyStatHours
- Export
- ArchivedCharges
- Precharge

### Products & Additional Charges (4 collections)
- ProductSale
- AssignedProduct
- AdditionalCharge
- AssignedCharge

### Precast (4 collections)
- PrecastProject
- PrecastProjectPieces
- PrecastRate
- PrecastStatus

### Statistics (2 collections)
- StatOperationDispatcher
- StatOperationGeneral

**Operation Total: 23 collections**

---

## Summary

| Module       | Collections |
|--------------|-------------|
| Common       | 15          |
| Manager      | 13          |
| Maintenance  | 23          |
| Operation    | 23          |
| **Total**    | **74**      |

---
---

# PostgreSQL Migration - Missing Tables

## Current Tables in DrawIO (28 tables)

**MAIN SCHEMA:** lookup_types, lookups, tenants, customers, audit_log, users, user_tenants_xref, user_customers_xref, user_roles_xref, role_permissions_xref

**TENANT SCHEMA:** tenant_lookup_types, tenant_lookups, tenant_users, tenant_user_roles_xref, vehicles, trailers, fleet_types, customer_mileage_rate, customer_mileage_rate_details, locations, payee, tenant_role_permission_xref, tenant_user_configs, loads, commodity, lane, tenant_customers, audit_log

---

## Missing Tables (Need to Add)

### 1. Load/Order Related (Critical for Operations)
| Table | Purpose |
|-------|---------|
| load_history | Status change history (like ChargeHistory) |
| load_logs | Detailed activity logs (like ChargeLogs) |
| load_nav_history | GPS/navigation tracking |
| precharges | Pre-charge requests from customers |
| load_stops | Multi-stop pickups/deliveries |

### 2. Driver Related
| Table | Purpose |
|-------|---------|
| driver_bank_info | Bank account details for payments |
| driver_availability | Schedule/availability tracking |
| driver_deductions | Pay deductions |
| driver_fees | Fee configurations |
| driver_assignments | Load assignments history |

### 3. Safety & Compliance
| Table | Purpose |
|-------|---------|
| driver_safety_compliance | Safety records |
| accident_records | Accident history |
| driver_endorsements | CDL endorsements |
| driver_psp | Pre-employment screening |
| driver_insurance | Insurance records |
| driver_training | Training records |
| employment_verification | Employment history |
| logbook_management | HOS/ELD logs |

### 4. Customer Related
| Table | Purpose |
|-------|---------|
| customer_regions | Customer service regions |
| customer_pickup_locations | Preferred pickup points |
| customer_payment_metrics | Payment history/terms |
| customer_receivables | AR tracking |
| customer_fuel_surcharge | Fuel surcharge rules |

### 5. Asset Management
| Table | Purpose |
|-------|---------|
| vehicle_allocations | Vehicle-driver assignments |
| vehicle_comments | Notes on vehicles |
| trailer_comments | Notes on trailers |
| vehicle_maintenance_history | Maintenance records |
| trailer_maintenance_history | Maintenance records |
| vehicle_safety_inspections | Inspection records |
| trailer_safety_inspections | Inspection records |

### 6. Rates & Pricing
| Table | Purpose |
|-------|---------|
| rates | Base rate configurations |
| rate_details | Rate breakdown/tiers |
| rate_comments | Rate notes |

### 7. Finance
| Table | Purpose |
|-------|---------|
| invoices | Customer invoices |
| settlements | Driver/carrier settlements |
| payments | Payment records |
| quick_cash | Advance payments |

### 8. Documents
| Table | Purpose |
|-------|---------|
| documents | File attachments (POD, BOL, etc.) |
| comments | General comments system |
| location_comments | Location notes |

### 9. Payee Extended
| Table | Purpose |
|-------|---------|
| payee_payment_methods | Payment method details |
| payee_settlements | Settlement records |

### 10. Carrier (Brokering Loads)
> **Note:** No separate carrier table needed. Managed via `tenants` table:
> - `tenants.isUsingAxis = true` → Tenant uses Axis system (internal carrier)
> - `tenants.isUsingAxis = false` → External carrier/broker
>
> External carriers are simply tenants with `isUsingAxis = false`.

### 11. Products & Charges
| Table | Purpose |
|-------|---------|
| product_sales | Products sold with loads |
| assigned_products | Products on specific loads |
| additional_charges | Extra charge types |
| assigned_charges | Extra charges on loads |

### 12. Support & Config
| Table | Purpose |
|-------|---------|
| support_tickets | User support requests |
| support_ticket_subjects | Ticket categories |
| system_configs | System settings |

### 13. Statistics (Optional - can be views)
| Table | Purpose |
|-------|---------|
| daily_stats | Daily operation metrics |
| load_stats | Load performance metrics |

---

## Migration Summary

| Category | Current | Missing | Total Needed |
|----------|---------|---------|--------------|
| Core/Auth | 10 | 0 | 10 |
| Loads/Orders | 4 | 5 | 9 |
| Driver | 1 | 8 | 9 |
| Safety | 0 | 8 | 8 |
| Customer | 3 | 5 | 8 |
| Assets | 3 | 7 | 10 |
| Rates | 3 | 3 | 6 |
| Finance | 0 | 4 | 4 |
| Documents | 1 | 3 | 4 |
| Payee | 1 | 2 | 3 |
| Carrier | 0 | 0 | 0 (via tenants.isUsingAxis) |
| Products | 0 | 4 | 4 |
| Support | 0 | 3 | 3 |
| **TOTAL** | **28** | **~52** | **~78** |

---

## Priority Phases

### Phase 1 (Must have for Operations)
- load_history, load_logs, precharges, load_stops
- documents
- additional_charges, assigned_charges

### Phase 2 (Finance & Billing)
- invoices, payments, settlements
- customer_receivables

### Phase 3 (Driver Management)
- driver_bank_info, driver_deductions, driver_assignments
- Safety & compliance tables

### Phase 4 (Advanced Features)
- Statistics, Support tickets, Carrier management
