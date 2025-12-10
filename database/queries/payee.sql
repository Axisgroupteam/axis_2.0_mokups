-- =============================================
-- PAYEES TABLE
-- Payee/Payment recipient information
-- =============================================

CREATE TABLE IF NOT EXISTS payees (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,

    -- Payee Profile
    "name" VARCHAR(255) NOT NULL,
    "legalName" VARCHAR(255),
    "code" VARCHAR(50) UNIQUE,
    "settlement" BOOLEAN DEFAULT FALSE,

    -- Address
    "address" VARCHAR(255),
    "city" VARCHAR(100),
    "state" VARCHAR(50),
    "zipCode" VARCHAR(20),
    "country" VARCHAR(100) DEFAULT 'USA',

    -- Contact
    "phoneNumber" VARCHAR(20),
    "email" VARCHAR(255),

    -- Payment
    "paymentMethodId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Check', 'ACH', 'Wire'

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
CREATE INDEX IF NOT EXISTS idx_payees_tenant_id ON payees("tenantId");
CREATE INDEX IF NOT EXISTS idx_payees_code ON payees("code");
CREATE INDEX IF NOT EXISTS idx_payees_name ON payees("name");
