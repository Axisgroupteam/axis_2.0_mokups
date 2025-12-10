-- =============================================
-- EMPLOYEES TABLE
-- General employee profile data
-- Links to users table for basic user info
-- =============================================

CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    "userId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,

    -- Employee Details
    "employeeCode" VARCHAR(50) UNIQUE,
    "departmentId" INT REFERENCES lookups(id) ON DELETE SET NULL,
    "positionId" INT REFERENCES lookups(id) ON DELETE SET NULL,
    "statusId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'active', 'inactive'
    "reasonForInactive" TEXT,

    -- Employment Information
    "hireDate" DATE,
    "terminationDate" DATE,
    "eligibleForRehire" BOOLEAN DEFAULT TRUE,

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
CREATE INDEX IF NOT EXISTS idx_employees_user_id ON employees("userId");
CREATE INDEX IF NOT EXISTS idx_employees_tenant_id ON employees("tenantId");
CREATE INDEX IF NOT EXISTS idx_employees_employee_code ON employees("employeeCode");
