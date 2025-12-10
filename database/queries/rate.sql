-- =============================================
-- RATES TABLE
-- Rate/Pricing information
-- =============================================

CREATE TABLE IF NOT EXISTS rates (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,

    -- Rate Profile
    "rateName" VARCHAR(100) NOT NULL,
    "customerId" INT REFERENCES customers(id) ON DELETE SET NULL,
    "description" TEXT,

    -- Origin/Destination
    "originMethodId" INT REFERENCES lookups(id) ON DELETE SET NULL,
    "destinationMethodId" INT REFERENCES lookups(id) ON DELETE SET NULL,
    "originLocationId" INT REFERENCES locations(id) ON DELETE SET NULL,
    "destinationLocationId" INT REFERENCES locations(id) ON DELETE SET NULL,

    -- Rate Details
    "customerRateMethodId" INT REFERENCES lookups(id) ON DELETE SET NULL,
    "driverRateMethodId" INT REFERENCES lookups(id) ON DELETE SET NULL,
    "customerRate" DECIMAL(10, 2),
    "driverRate" DECIMAL(10, 2),
    "distance" DECIMAL(10, 2),
    "po" VARCHAR(50),  -- Purchase Order

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
CREATE INDEX IF NOT EXISTS idx_rates_tenant_id ON rates("tenantId");
CREATE INDEX IF NOT EXISTS idx_rates_customer_id ON rates("customerId");
CREATE INDEX IF NOT EXISTS idx_rates_rate_name ON rates("rateName");
