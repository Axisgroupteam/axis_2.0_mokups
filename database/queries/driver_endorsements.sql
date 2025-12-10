-- =============================================
-- DRIVER_ENDORSEMENTS TABLE
-- Stores driver CDL endorsements
-- Multiple endorsements per driver
-- =============================================

CREATE TABLE IF NOT EXISTS driver_endorsements (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,
    "driverId" INT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,

    -- -----------------------------------------
    -- Endorsement Information
    -- -----------------------------------------
    "endorsementTypeId" INT NOT NULL REFERENCES lookups(id) ON DELETE CASCADE,  -- 'Double', 'Triple', 'Hazmat', 'Tank', 'Passenger', 'School Bus'
    "issuedDate" DATE NOT NULL,
    "expirationDate" DATE,

    -- -----------------------------------------
    -- Status
    -- -----------------------------------------
    "isActive" BOOLEAN DEFAULT TRUE,
    "statusId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Active', 'Expired', 'Suspended', 'Revoked'

    -- -----------------------------------------
    -- Documents
    -- -----------------------------------------
    "endorsementDocumentUrl" TEXT,

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
CREATE INDEX IF NOT EXISTS idx_driver_endorsements_tenant_id ON driver_endorsements("tenantId");
CREATE INDEX IF NOT EXISTS idx_driver_endorsements_driver_id ON driver_endorsements("driverId");
CREATE INDEX IF NOT EXISTS idx_driver_endorsements_type ON driver_endorsements("endorsementTypeId");
CREATE INDEX IF NOT EXISTS idx_driver_endorsements_expiration ON driver_endorsements("expirationDate");
CREATE INDEX IF NOT EXISTS idx_driver_endorsements_is_active ON driver_endorsements("isActive");

-- Unique constraint - prevent duplicate endorsement types per driver
CREATE UNIQUE INDEX IF NOT EXISTS idx_driver_endorsements_unique ON driver_endorsements("driverId", "endorsementTypeId") WHERE "isArchived" = FALSE;
