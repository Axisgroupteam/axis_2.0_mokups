-- =============================================
-- DRIVER_INSURANCE TABLE
-- Stores driver insurance information
-- One record per driver
-- =============================================

CREATE TABLE IF NOT EXISTS driver_insurance (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,
    "driverId" INT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,

    -- -----------------------------------------
    -- Insurance Information
    -- -----------------------------------------
    "insuranceCompany" VARCHAR(255) NOT NULL,
    "insurancePolicyNumber" VARCHAR(100) NOT NULL,
    "policyTerminationDate" DATE,
    "companyRating" VARCHAR(20),  -- e.g., 'A+', 'A', 'B+'
    "coverageLimitsId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Auto Liability', 'General Liability', 'Cargo'

    -- -----------------------------------------
    -- Additional Details
    -- -----------------------------------------
    "policyStartDate" DATE,
    "coverageAmount" DECIMAL(15, 2),
    "deductible" DECIMAL(10, 2),
    "insuranceDocumentUrl" TEXT,

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
CREATE INDEX IF NOT EXISTS idx_driver_insurance_tenant_id ON driver_insurance("tenantId");
CREATE INDEX IF NOT EXISTS idx_driver_insurance_driver_id ON driver_insurance("driverId");
CREATE INDEX IF NOT EXISTS idx_driver_insurance_policy_number ON driver_insurance("insurancePolicyNumber");
CREATE INDEX IF NOT EXISTS idx_driver_insurance_termination_date ON driver_insurance("policyTerminationDate");

-- Unique constraint - one insurance record per driver
CREATE UNIQUE INDEX IF NOT EXISTS idx_driver_insurance_unique_driver ON driver_insurance("driverId") WHERE "isArchived" = FALSE;
