-- =============================================
-- TRAILERS TABLE
-- Trailer information
-- =============================================

CREATE TABLE IF NOT EXISTS trailers (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,

    -- General Information
    "trailerName" VARCHAR(100),
    "vinSn" VARCHAR(50) UNIQUE,  -- VIN/Serial Number
    "licensePlate" VARCHAR(20),
    "year" INT,
    "model" VARCHAR(100),
    "make" VARCHAR(100),

    -- Classification
    "fleetTypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,
    "groupId" INT REFERENCES lookups(id) ON DELETE SET NULL,
    "typeId" INT REFERENCES lookups(id) ON DELETE SET NULL,
    "ownershipId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Owned', 'Leased', 'Rented'
    "bodyTypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,
    "bodySubtypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,

    -- Details
    "color" VARCHAR(50),
    "msrp" DECIMAL(10, 2),

    -- Documents
    "registrationDocumentUrl" TEXT,
    "trailerImagesUrl" TEXT,

    -- Status
    "statusId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'active', 'inactive', 'maintenance'
    "isActive" BOOLEAN DEFAULT TRUE,

    -- Audit
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "createdBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL,
    "isArchived" BOOLEAN DEFAULT FALSE NOT NULL,
    "archivedAt" TIMESTAMP DEFAULT NULL,
    "archivedBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_trailers_tenant_id ON trailers("tenantId");
CREATE INDEX IF NOT EXISTS idx_trailers_vin ON trailers("vinSn");
CREATE INDEX IF NOT EXISTS idx_trailers_license_plate ON trailers("licensePlate");
