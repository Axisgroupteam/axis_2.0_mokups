-- =============================================
-- CUSTOMERS TABLE
-- Customer/Shipper information
-- =============================================

CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,

    -- Basic Information
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(50) UNIQUE,
    "email" VARCHAR(255),
    "phone" VARCHAR(20),
    "addressLine1" VARCHAR(255),
    "addressLine2" VARCHAR(255),
    "city" VARCHAR(100),
    "state" VARCHAR(50),
    "zipCode" VARCHAR(20),
    "country" VARCHAR(100) DEFAULT 'USA',

    -- Customer Settings
    "customerRegionId" INT REFERENCES lookups(id) ON DELETE SET NULL,
    "billingTypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Factored customer', 'Non-factored'
    "milesMeterSystemId" INT REFERENCES lookups(id) ON DELETE SET NULL,
    "fleetTypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,
    "milesCalcTypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,
    "autoEmailExport" BOOLEAN DEFAULT FALSE,

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
CREATE INDEX IF NOT EXISTS idx_customers_tenant_id ON customers("tenantId");
CREATE INDEX IF NOT EXISTS idx_customers_code ON customers("code");
CREATE INDEX IF NOT EXISTS idx_customers_name ON customers("name");
