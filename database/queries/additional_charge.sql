-- =============================================
-- ADDITIONAL_CHARGES TABLE
-- Additional charges/fees configuration
-- =============================================

CREATE TABLE IF NOT EXISTS additional_charges (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,

    -- Charge Information
    "name" VARCHAR(100) NOT NULL,
    "code" VARCHAR(50) UNIQUE,
    "description" TEXT,
    "chargeTypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Fuel Surcharge', 'Detention', 'Layover', etc.

    -- Amount
    "amount" DECIMAL(10, 2),
    "isPercentage" BOOLEAN DEFAULT FALSE,
    "percentage" DECIMAL(5, 2),

    -- Application
    "applyToCustomer" BOOLEAN DEFAULT TRUE,
    "applyToDriver" BOOLEAN DEFAULT FALSE,

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
CREATE INDEX IF NOT EXISTS idx_additional_charges_tenant_id ON additional_charges("tenantId");
CREATE INDEX IF NOT EXISTS idx_additional_charges_code ON additional_charges("code");
