-- =============================================
-- DRIVER_FINANCE TABLE
-- Stores driver financial information
-- One record per driver (bank info + payee info)
-- =============================================

CREATE TABLE IF NOT EXISTS driver_finance (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,
    "driverId" INT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,

    -- -----------------------------------------
    -- Bank Information
    -- -----------------------------------------
    "bankName" VARCHAR(255),
    "bankAccountNumber" VARCHAR(50),  -- Stored encrypted
    "bankAccountNumberLast4" VARCHAR(4),  -- Last 4 digits for display
    "bankRoutingNumber" VARCHAR(20),
    "accountTypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Checking', 'Savings'
    "frequencyId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Weekly', 'Bi-weekly', 'Monthly'
    "payTypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Direct Deposit', 'Check', 'Cash'
    "payRateTypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Hourly', 'Per Mile', 'Percentage', 'Flat Rate'
    "payRate" DECIMAL(10, 2),
    "defaultPayRate" DECIMAL(10, 2),

    -- -----------------------------------------
    -- Payee Information
    -- -----------------------------------------
    "payeeId" INT REFERENCES payees(id) ON DELETE SET NULL,
    "ein" VARCHAR(20),  -- Employer Identification Number

    -- -----------------------------------------
    -- Fee Management
    -- -----------------------------------------
    "feeTypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Monthly Fee', 'Per Trip', 'Percentage'

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
CREATE INDEX IF NOT EXISTS idx_driver_finance_tenant_id ON driver_finance("tenantId");
CREATE INDEX IF NOT EXISTS idx_driver_finance_driver_id ON driver_finance("driverId");
CREATE INDEX IF NOT EXISTS idx_driver_finance_payee ON driver_finance("payeeId");
CREATE INDEX IF NOT EXISTS idx_driver_finance_pay_type ON driver_finance("payTypeId");

-- Unique constraint - one finance record per driver
CREATE UNIQUE INDEX IF NOT EXISTS idx_driver_finance_unique_driver ON driver_finance("driverId") WHERE "isArchived" = FALSE;
