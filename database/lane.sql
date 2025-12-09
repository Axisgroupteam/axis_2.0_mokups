-- =============================================
-- LANES TABLE
-- Shipping lanes/routes
-- =============================================

CREATE TABLE IF NOT EXISTS lanes (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,

    -- Lane Information
    "laneName" VARCHAR(100),
    "laneCode" VARCHAR(50) UNIQUE,
    "customerId" INT REFERENCES customers(id) ON DELETE SET NULL,

    -- Origin
    "originLocationId" INT REFERENCES locations(id) ON DELETE SET NULL,
    "originCity" VARCHAR(100),
    "originState" VARCHAR(50),
    "originZipCode" VARCHAR(20),

    -- Destination
    "destinationLocationId" INT REFERENCES locations(id) ON DELETE SET NULL,
    "destinationCity" VARCHAR(100),
    "destinationState" VARCHAR(50),
    "destinationZipCode" VARCHAR(20),

    -- Details
    "distance" DECIMAL(10, 2),
    "estimatedTime" INT,  -- In minutes

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
CREATE INDEX IF NOT EXISTS idx_lanes_tenant_id ON lanes("tenantId");
CREATE INDEX IF NOT EXISTS idx_lanes_customer_id ON lanes("customerId");
CREATE INDEX IF NOT EXISTS idx_lanes_code ON lanes("laneCode");
