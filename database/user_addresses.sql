-- =============================================
-- USER_ADDRESS TABLE
-- Stores multiple addresses per user
-- e.g., home address, mailing address, work address
-- =============================================

CREATE TABLE IF NOT EXISTS user_addresses (
    id SERIAL PRIMARY KEY,

    "userId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,
    
    "addressType" VARCHAR(50) DEFAULT 'home',  -- 'home', 'mailing', 'work', 'billing'
    "address" VARCHAR(255),
    "address2" VARCHAR(255),  -- Apartment, Suite, Unit, etc.
    "city" VARCHAR(100),
    "state" VARCHAR(50),
    "zipcode" VARCHAR(20),
    "country" VARCHAR(100) DEFAULT 'USA',
    "latitude" DECIMAL(10, 8),
    "longitude" DECIMAL(11, 8),
    "isPrimary" BOOLEAN DEFAULT FALSE,  -- Primary address flag
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
CREATE INDEX IF NOT EXISTS idx_user_addresses_user_id ON user_addresses("userId");
CREATE INDEX IF NOT EXISTS idx_user_addresses_tenant_id ON user_addresses("tenantId");
CREATE INDEX IF NOT EXISTS idx_user_addresses_type ON user_addresses("addressType");
