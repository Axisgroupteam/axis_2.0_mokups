# Axis Hub - Lookup Types & Enums

---

## All Lookup Types (66)

### Customer (5)
- Billing Type
- Account Type
- Miles Meter System Provider
- Miles Calculation Type
- Block Calculation Sub Type

### Driver (3)
- Driver Type
- Pay Type
- License Category

### Vehicle (5)
- Vehicle Status
- Vehicle Type
- Vehicle Ownership
- Vehicle Body Type
- Vehicle Safety Reason

### Trailer (2)
- Trailer Status
- Trailer Safety Reason

### Charge/Load (Operations) (8)
- Charge Status
- Precharge Status
- Argos Precharge Status
- Date Filter (Loads)
- Driver Status Filter (Loads)
- Precharge Content Filter
- Delivered Content Filter
- Time State (Loads)

### Work Order (Maintenance) (4)
- Work Order Status
- Work Order Priority
- Work Order Assigned Type
- Work Order Reported Type

### Issue (Maintenance) (3)
- Issue Status
- Issue Priority
- Issue Type

### Equipment (Maintenance) (3)
- Maintenance Vehicle Type (Equipment)
- Equipment Status
- Equipment Categories

### Technician & Location (Maintenance) (2)
- Technician Qualification
- Warehouse/Location Type

### Inspection (Maintenance) (5)
- PM Inspection Values
- Tire Sizes
- Tire PSI Values
- Brake Lining Measurements
- Fluid Levels (Inspection)

### Support Tickets (3)
- Ticket Status
- Ticket Area
- Ticket Applications

### Permissions - CASL (2)
- Actions (CASL)
- Subjects (CASL)

### Division Groups (8)
- Aggregate Group
- Bulk Group
- Flatbed Group
- TMF Group
- Block Group
- Precast Group
- Walking Floor Group
- Heavy Haul Group

### Parts & Inventory (4)
- Part Categories
- Measurement Units (Parts)
- Charges Measurement Units
- Product Sale Measurement Units

### Vendor & Rates (3)
- Vendor Provider Type
- Rate Table Type
- Origin-Destination Action Type

### Common (3)
- Location Use Type
- Week Days
- Additional Charges Quantity

---

## User & Authentication

### User Roles
- `SUPER_ADMIN`
- `ADMIN`
- `MANAGER`
- `DISPATCHER`
- `EMPLOYEE`
- `TECHNICIAN`
- `DRIVER`
- `CUSTOMER`

### Web Apps
- `maintenance`
- `operation`
- `manager`

### Allowed Alter Roles
- `DISPATCHER`
- `MANAGER`

---

## Customer

### Billing Type
- `Factored_Customer`
- `Not_Factored_Customer`

### Account Type
- `MainAccount`
- `SubAccount`

### Miles Meter System Provider
- `google`
- `pc_miler`

### Miles Calculation Type
- `point2point`
- `zipcode2zipcode`

### Block Calculation Sub Type
- `zone`
- `miles`

---

## Driver

### Driver Type
- `Company Owner`
- `Owner Operator`

### Pay Type
- `Hourly`
- `Per Load`
- `Salary`

### License Category
- `CDL-A`
- `CDL-B`
- `CDL-C`

---

## Vehicle

### Vehicle Status
- `Active`
- `Inactive`
- `In shop`
- `Out of service`
- `Sold`
- `Untethered`
- `Off`
- `Unpowered`

### Vehicle Type
- `Semi Truck`
- `Box Truck`
- `Car`
- `Dump Truck`
- `Pickup Truck`
- `Sprinter Box Truck`
- `Other`

### Vehicle Ownership
- `Owned`
- `Leased`
- `Rented`
- `Customer`
- `TPP`

### Vehicle Body Type
- `Cab Over Engine`
- `Chassis`
- `Conventional`
- `Pickup`
- `Sleeper`
- `Sleeper cab`

### Vehicle Safety Reason
- `SafetyShutdownCallSafety`
- `MonthlyMaintenance`
- `TagExpired`
- `DOTInspectionExpired`
- `MedicalCardExpired`
- `CDLExpired`
- `MaintenanceIssue`

---

## Trailer

### Trailer Status
- `Active`
- `Inactive`
- `In shop`
- `Out of service`
- `Sold`
- `Untethered`
- `Off`
- `Unpowered`

### Trailer Safety Reason
- `SafetyShutdownCallSafety`
- `TagExpired`
- `DOTInspectionExpired`
- `MaintenanceIssue`

---

## Charge/Load

### Charge Status
- `Accepted`
- `Active`
- `ArriveDelivery`
- `ArrivePickUp`
- `Assigned`
- `Cancelled`
- `Completed`
- `Delivered`
- `Dispatched`
- `History`
- `OnRoad`
- `PickUp`
- `Relocation`
- `Resend`
- `Start`

---

## Precharge

### Precharge Status
- `Pending`
- `Partial`
- `Accepted`
- `Completed`
- `Cancelled`
- `Expired`

### Argos Precharge Status
- `pending`
- `accepted`
- `rejected`

### Date Filter (Loads)
- `expired`
- `actual`
- `next`

### Driver Status Filter (Loads)
- `all`
- `open`
- `assigned`

### Precharge Content Filter
- `All`
- `Pending`
- `Partial`

### Delivered Content Filter
- `delivered`
- `resend`
- `detention`
- `workflow`

### Time State (Loads)
- `all`
- `off`
- `early`
- `late`
- `onTime`

---

## Maintenance

### Work Order Status
- `open`
- `working`
- `resend`
- `pending`
- `completed`
- `history`
- `canceled`

### Work Order Priority
- `critical`
- `high`
- `medium`
- `low`

### Work Order Assigned Type
- `Technician`
- `Vendor`

### Work Order Reported Type
- `Technician`
- `Employee`
- `CompanyUser`

### Maintenance Vehicle Type (Equipment)
- `trailer`
- `truck`
- `blower`
- `compressor`
- `edger`
- `electrical`
- `generator`
- `lift`
- `lightTower`
- `mower`
- `powerTool`
- `pressureWasher`
- `pump`
- `securementEquipment`
- `sprayer`
- `trimmer`

### Issue Status
- `Open`
- `Working`
- `Pending`
- `Approved`
- `Rejected`
- `Completed`
- `Canceled`
- `Deferred`
- `Scheduled`

### Issue Priority
- `critical`
- `high`
- `medium`
- `low`
- `none`

### Issue Type
- `Mechanical`
- `Electrical`
- `Cosmetic`
- `Safety`
- `Other`

### Technician Qualification
- `a`
- `b`
- `c`

### Warehouse/Location Type
- `vendor`
- `road-service`
- `storage`
- `owner-site`
- `customer-site`

### Equipment Status
- `active`
- `inactive`

### Equipment Categories
- `blower`
- `compressor`
- `edger`
- `electrical`
- `generator`
- `lift`
- `lightTower`
- `mower`
- `powerTool`
- `pressureWasher`
- `pump`
- `securementEquipment`
- `sprayer`
- `trimmer`

### PM Inspection Values
- `fail`
- `pass`
- `n/a`

---

## Support Tickets

### Ticket Status
- `open`
- `working`
- `resend`
- `pending`
- `completed`
- `history`
- `canceled`

### Ticket Area
- `accounting`
- `operation`
- `axis`

### Ticket Applications
- `manager`
- `operation`
- `maintenance`
- `technician`
- `driver`

---

## Permissions (CASL)

### Actions
- `manage`
- `add`
- `view`
- `edit`
- `delete`
- `export`
- `archive`

### Subjects
- `user`
- `driver`
- `vehicle`
- `trailer`
- `inspections`
- `maintenance-locations`
- `issues`
- `parts`
- `inventory-purchase`
- `inventory-distribution`
- `equipment`
- `inspectOrder`
- `serviceTask`
- `labor`
- `workOrder`
- `inspectionsDot`
- `inspectionPm`
- `inspectionFL`
- `maintenanceDashboard`
- `managerDashboard`
- `chargeDashboard`
- `permission`
- `companyUsers`
- `customers`
- `accounting`
- `support-ticket`
- `configure`
- `charge-location`
- `charge-rates`
- `precast-project`
- `precast-rates`
- `precast-status`
- `charge`
- `system-log`
- `AI`
- `employee`
- `technician`
- `admin-user`
- `vendor`
- `microservice-config`
- `all`

---

## Division Groups

### Aggregate Group
- `fl-aggregate`
- `gc-aggregate`
- `ms-aggregate`
- `tx-aggregate`

### Bulk Group
- `fl-cement`
- `gc-cement`
- `ms-cement`
- `tx-cement`

### Flatbed Group
- `ms-flatbed`
- `fl-flatbed`
- `gc-flatbed`
- `tx-flatbed`
- `sbt-flatbed`

### TMF Group
- `tmf-central`
- `tmf-gulf-coast`
- `tmf-mid-south`
- `tmf-north`
- `tmf-south`
- `tmf-texas`

### Block Group
- `ms-flatbed`
- `fl-flatbed`
- `gc-flatbed`
- `tx-flatbed`

### Walking Floor Group
- `ms-walking-floor`
- `fl-walking-floor`
- `gc-walking-floor`
- `tx-walking-floor`

### Heavy Haul Group
- `ms-heavy-haul`
- `fl-heavy-haul`
- `gc-heavy-haul`
- `tx-heavy-haul`

---

## Parts & Inventory

### Part Categories
- `airAssembly`
- `axleAssembly`
- `brakeAssembly`
- `brakes`
- `decking`
- `electricalAssembly`
- `filters`
- `fluids`
- `frameAssembly`
- `kingPinAssembly`
- `landingLegAssembly`
- `lightAssembly`
- `miscellaneous`
- `powertrain`
- `securement`
- `suspensionAssembly`
- `tankerParts`
- `tires`
- `wheelAssembly`

### Measurement Units (Parts)
- `each`
- `foot`
- `gallon`
- `inch`
- `pound`
- `quart`
- `set`
- `tube`

### Charges Measurement Units
- `ton`
- `shift`
- `day`
- `yard`

### Product Sale Measurement Units
- `ton`
- `yard`
- `pound`
- `am_shift`
- `pm_shift`
- `mile`
- `day`
- `load`
- `hour`
- `pump_off`

---

## Tire & Inspection Data

### Tire Sizes
- `295/75R22.5`
- `11R22.5`
- `255/70R22.5`
- `285/75R24.5`
- `11R24.5`
- `245/70R17.5`
- `275/70R22.5`
- `445/50R22.5`
- `455/55R22.5`
- `10.00/R15`

### Tire PSI Values
- `120 PSI` to `90 PSI`
- `LOW`
- `n/a`

### Brake Lining Measurements
- `01/32nds` to `32/32nds`
- `n/a`

---

## Vendor

### Vendor Provider Type
- `tires`
- `parts`
- `service`
- `other`

---

## Rate Table

### Table Type
- `origin-destination`
- `zone`
- `miles`

---

## Origin-Destination Log

### Action Type
- `create`
- `update`
- `delete`

---

## Location

### Location Use Type
- `used`
- `unused`

---

## Common

### Week Days
- `sunday`
- `monday`
- `tuesday`
- `wednesday`
- `thursday`
- `friday`
- `saturday`

### Additional Charges Quantity
- `single`
- `multiple`

---

## Inspection (FL)

### Fluid Levels
- `Full`
- `3/4`
- `1/2`
- `1/4`
- `Empty`
- `n/a`

---

## Division Groups

### Precast Group
- `ms-flatbed`
- `fl-flatbed`
- `gc-flatbed`
- `tx-flatbed`
- `sbt-flatbed`
