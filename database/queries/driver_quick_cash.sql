-- =============================================
-- DRIVER_QUICK_CASH TABLE
-- Stores driver quick cash / rapid cash transactions
-- Multiple transactions per driver
-- =============================================

CREATE TABLE IF NOT EXISTS driver_quick_cash (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,
    "driverId" INT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,

    -- -----------------------------------------
    -- Transaction Information
    -- -----------------------------------------
    "providerId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'PayCard', 'EFS', 'Comdata', etc.
    "amount" DECIMAL(10, 2) NOT NULL,
    "reason" TEXT,
    "confirmationCode" VARCHAR(100),

    -- -----------------------------------------
    -- Status
    -- -----------------------------------------
    "statusId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Pending', 'Approved', 'Completed', 'Rejected'
    "requestedAt" TIMESTAMP DEFAULT NOW(),
    "approvedAt" TIMESTAMP,
    "approvedBy" INT REFERENCES users(id) ON DELETE SET NULL,
    "completedAt" TIMESTAMP,

    -- -----------------------------------------
    -- Audit
    -- -----------------------------------------
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "createdBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL,
    "isArchived" BOOLEAN DEFAULT FALSE NOT NULL,
    "archivedAt" TIMESTAMP DEFAULT NULL,
    "archivedBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_driver_quick_cash_tenant_id ON driver_quick_cash("tenantId");
CREATE INDEX IF NOT EXISTS idx_driver_quick_cash_driver_id ON driver_quick_cash("driverId");
CREATE INDEX IF NOT EXISTS idx_driver_quick_cash_provider ON driver_quick_cash("providerId");
CREATE INDEX IF NOT EXISTS idx_driver_quick_cash_status ON driver_quick_cash("statusId");
CREATE INDEX IF NOT EXISTS idx_driver_quick_cash_requested_at ON driver_quick_cash("requestedAt");
CREATE INDEX IF NOT EXISTS idx_driver_quick_cash_confirmation ON driver_quick_cash("confirmationCode");
