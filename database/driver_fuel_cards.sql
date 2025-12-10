-- =============================================
-- DRIVER_FUEL_CARDS TABLE
-- Stores driver fuel card information
-- Multiple cards per driver
-- =============================================

CREATE TABLE IF NOT EXISTS driver_fuel_cards (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,
    "driverId" INT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,

    -- -----------------------------------------
    -- Card Information
    -- -----------------------------------------
    "cardProviderId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'EFS', 'Comdata', 'T-Chek', 'Fleet One'
    "account" VARCHAR(100) NOT NULL,
    "subaccount" VARCHAR(100),
    "cardNumber" VARCHAR(50) NOT NULL,  -- Stored encrypted/masked
    "cardNumberLast4" VARCHAR(4),  -- Last 4 digits for display

    -- -----------------------------------------
    -- Assignment
    -- -----------------------------------------
    "tractorId" INT REFERENCES vehicles(id) ON DELETE SET NULL,
    "cardPayeeId" INT REFERENCES payees(id) ON DELETE SET NULL,
    "chargePayeeId" INT REFERENCES payees(id) ON DELETE SET NULL,
    "expenseCode" VARCHAR(50),
    "assignTypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Driver', 'Tractor', 'Both'
    "cardTypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Fuel', 'Cash', 'Both'

    -- -----------------------------------------
    -- Status
    -- -----------------------------------------
    "cardStatusId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Active', 'Inactive', 'Suspended'
    "isActive" BOOLEAN DEFAULT TRUE,
    "activatedDate" DATE,
    "deactivatedDate" DATE,

    -- -----------------------------------------
    -- Audit
    -- -----------------------------------------
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "createdBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL,
    "isArchived" BOOLEAN DEFAULT FALSE NOT NULL,
    "archivedAt" TIMESTAMP DEFAULT NULL,
    "archivedBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_driver_fuel_cards_tenant_id ON driver_fuel_cards("tenantId");
CREATE INDEX IF NOT EXISTS idx_driver_fuel_cards_driver_id ON driver_fuel_cards("driverId");
CREATE INDEX IF NOT EXISTS idx_driver_fuel_cards_provider ON driver_fuel_cards("cardProviderId");
CREATE INDEX IF NOT EXISTS idx_driver_fuel_cards_status ON driver_fuel_cards("cardStatusId");
CREATE INDEX IF NOT EXISTS idx_driver_fuel_cards_tractor ON driver_fuel_cards("tractorId");
CREATE INDEX IF NOT EXISTS idx_driver_fuel_cards_account ON driver_fuel_cards("account");
