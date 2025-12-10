-- =============================================
-- DRIVER_ACCIDENT_RECORDS TABLE
-- Stores driver accident history records
-- Multiple records per driver
-- =============================================

CREATE TABLE IF NOT EXISTS driver_accident_records (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,
    "driverId" INT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,

    -- -----------------------------------------
    -- Accident Details
    -- -----------------------------------------
    "location" VARCHAR(500) NOT NULL,
    "accidentDate" DATE NOT NULL,
    "accidentTime" TIME,
    "preventabilityId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Preventable', 'Non Preventable'
    "weatherConditions" VARCHAR(255),
    "description" TEXT,

    -- -----------------------------------------
    -- Claim Information
    -- -----------------------------------------
    "claimRequested" BOOLEAN DEFAULT FALSE,
    "claimAmount" DECIMAL(12, 2),
    "claimNumber" VARCHAR(100),
    "claimDate" DATE,
    "claimAdjustor" VARCHAR(255),

    -- -----------------------------------------
    -- Documents
    -- -----------------------------------------
    "picturesUrl" TEXT,  -- Can store multiple URLs as JSON or comma-separated

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
CREATE INDEX IF NOT EXISTS idx_driver_accident_records_tenant_id ON driver_accident_records("tenantId");
CREATE INDEX IF NOT EXISTS idx_driver_accident_records_driver_id ON driver_accident_records("driverId");
CREATE INDEX IF NOT EXISTS idx_driver_accident_records_date ON driver_accident_records("accidentDate");
CREATE INDEX IF NOT EXISTS idx_driver_accident_records_claim_number ON driver_accident_records("claimNumber");
