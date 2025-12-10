-- =============================================
-- TECHNICIANS TABLE
-- Technician/Mechanic profile data
-- Links to users table for basic user info
-- =============================================

CREATE TABLE IF NOT EXISTS technicians (
    id SERIAL PRIMARY KEY,
    "userId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,

    -- Technician Details
    "jobTitleId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- e.g., 'Senior Mechanic', 'Junior Mechanic'
    "qualificationId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- e.g., 'ASE Certified'
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
CREATE INDEX IF NOT EXISTS idx_technicians_user_id ON technicians("userId");
CREATE INDEX IF NOT EXISTS idx_technicians_tenant_id ON technicians("tenantId");
CREATE INDEX IF NOT EXISTS idx_technicians_status ON technicians("statusId");
