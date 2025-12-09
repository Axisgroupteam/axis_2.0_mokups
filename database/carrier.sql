-- =============================================
-- CARRIERS TABLE
-- Carrier/Trucking company information
-- =============================================

CREATE TABLE IF NOT EXISTS carriers (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,

    -- Carrier Information
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(50) UNIQUE,
    "mcNumber" VARCHAR(50),  -- Motor Carrier Number
    "dotNumber" VARCHAR(50),  -- DOT Number
    "email" VARCHAR(255),
    "phone" VARCHAR(20),

    -- Address
    "address" VARCHAR(255),
    "city" VARCHAR(100),
    "state" VARCHAR(50),
    "zipCode" VARCHAR(20),
    "country" VARCHAR(100) DEFAULT 'USA',

    -- Status
    "statusId" INT REFERENCES lookups(id) ON DELETE SET NULL,
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
CREATE INDEX IF NOT EXISTS idx_carriers_tenant_id ON carriers("tenantId");
CREATE INDEX IF NOT EXISTS idx_carriers_code ON carriers("code");
CREATE INDEX IF NOT EXISTS idx_carriers_mc_number ON carriers("mcNumber");
CREATE INDEX IF NOT EXISTS idx_carriers_dot_number ON carriers("dotNumber");
