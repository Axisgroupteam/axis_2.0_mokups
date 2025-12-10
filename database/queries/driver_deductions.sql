-- =============================================
-- DRIVER_DEDUCTIONS TABLE
-- Stores driver deduction types
-- Multiple deductions per driver
-- =============================================

CREATE TABLE IF NOT EXISTS driver_deductions (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,
    "driverId" INT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,

    -- -----------------------------------------
    -- Deduction Information
    -- -----------------------------------------
    "deductionCode" VARCHAR(50) NOT NULL,
    "deductionTypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Retirement', 'Health Insurance', 'Tax', 'Loan', 'Other'
    "amount" DECIMAL(10, 2) NOT NULL,
    "isPercentage" BOOLEAN DEFAULT FALSE,
    "percentage" DECIMAL(5, 2),
    "frequencyId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Weekly', 'Bi-weekly', 'Monthly', 'Per Trip'

    -- -----------------------------------------
    -- Status
    -- -----------------------------------------
    "isActive" BOOLEAN DEFAULT TRUE,
    "effectiveDate" DATE,
    "endDate" DATE,
    "description" TEXT,

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
CREATE INDEX IF NOT EXISTS idx_driver_deductions_tenant_id ON driver_deductions("tenantId");
CREATE INDEX IF NOT EXISTS idx_driver_deductions_driver_id ON driver_deductions("driverId");
CREATE INDEX IF NOT EXISTS idx_driver_deductions_type ON driver_deductions("deductionTypeId");
CREATE INDEX IF NOT EXISTS idx_driver_deductions_code ON driver_deductions("deductionCode");
CREATE INDEX IF NOT EXISTS idx_driver_deductions_is_active ON driver_deductions("isActive");
