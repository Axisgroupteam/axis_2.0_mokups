-- =============================================
-- TENANTS TABLE
-- Stores carrier/company information (e.g., Mega Logistics)
-- Multi-tenant support for the platform
-- =============================================

CREATE TABLE IF NOT EXISTS tenants (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(255) UNIQUE NOT NULL,  -- Company name
    "code" VARCHAR(50),  -- Short code identifier
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "phoneNumber" VARCHAR(20),
    "addressLine1" VARCHAR(255) NOT NULL,
    "addressLine2" VARCHAR(255),
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(50) NOT NULL,
    "zipcode" VARCHAR(20) NOT NULL,
    "country" VARCHAR(100) DEFAULT 'USA',
    "timeZone" VARCHAR(50),
    "isActive" BOOLEAN NOT NULL DEFAULT FALSE,

    -- Audit
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "createdBy" INT DEFAULT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedBy" INT DEFAULT NULL,
    "isArchived" BOOLEAN DEFAULT FALSE NOT NULL,
    "archivedAt" TIMESTAMP DEFAULT NULL,
    "archivedBy" INT DEFAULT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tenants_code ON tenants("code");
CREATE INDEX IF NOT EXISTS idx_tenants_is_active ON tenants("isActive");
