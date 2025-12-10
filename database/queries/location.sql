-- =============================================
-- LOCATIONS TABLE
-- Warehouse, terminal, distribution center locations
-- =============================================

CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,

    -- Location Profile
    "code" VARCHAR(50) UNIQUE,
    "name" VARCHAR(255) NOT NULL,
    "contact" VARCHAR(255),
    "phone" VARCHAR(20),
    "email" VARCHAR(255),

    -- Address
    "address" VARCHAR(255),
    "city" VARCHAR(100),
    "state" VARCHAR(50),
    "zipCode" VARCHAR(20),
    "country" VARCHAR(100) DEFAULT 'USA',
    "latitude" DECIMAL(10, 8),
    "longitude" DECIMAL(11, 8),

    -- Classification
    "locationTypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Warehouse', 'Terminal', 'Distribution Center'

    -- Status
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
CREATE INDEX IF NOT EXISTS idx_locations_tenant_id ON locations("tenantId");
CREATE INDEX IF NOT EXISTS idx_locations_code ON locations("code");
CREATE INDEX IF NOT EXISTS idx_locations_name ON locations("name");
