-- =============================================
-- DRIVERS TABLE
-- Driver-specific profile and credential data
-- Links to users table for basic user info
-- =============================================

CREATE TABLE IF NOT EXISTS drivers (
    id SERIAL PRIMARY KEY,
    "userId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,

    -- USER INFORMATION (Profile > Personal Information > User Information)
    "roleId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- Role from lookups
    -- Note: Address fields are in users table

    -- PERSONAL INFORMATION (Profile > Personal Information > Personal Information)
    "phoneNumber" VARCHAR(20),
    "raceId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- Race from lookups
    "ethnicityId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- Ethnicity from lookups
    
    "preferredLanguageId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- Preferred language from lookups
    -- Note: Languages (JSONB) stored in users table e.g., [1, 2, 3] for English, Spanish, French
    "emergencyContact" VARCHAR(20),
    "spouseName" VARCHAR(255),
    "socialSecurity" VARCHAR(20),  -- Encrypted/masked SSN

    -- DRIVER CREDENTIALS (Profile > Driver Credentials > Driver Basic Information)
    "driverCode" VARCHAR(50) UNIQUE,
    "driverTypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- e.g., 'Company Driver', 'Owner Operator'
    "statusId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'active', 'inactive', 'suspended'
    "reasonForInactive" TEXT,

    -- EMPLOYMENT INFORMATION (Profile > Driver Credentials > Employment Information)
    "hireDate" DATE,
    "terminationDate" DATE,
    "eligibleForRehire" BOOLEAN DEFAULT TRUE,
    "truckNumber" VARCHAR(50),
    "dotLoggingRequired" BOOLEAN DEFAULT TRUE,
    "pto" INT DEFAULT 0,  -- Paid time off in days
    "axisAppStatusId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'active', 'inactive'

    -- LICENSE INFORMATION (Profile > License Information)
    "licenseNumber" VARCHAR(50),
    "licenseCategoryId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- e.g., 'Class A CDL', 'Class B CDL', 'Class C CDL'
    "licenseState" VARCHAR(50),
    "licenseEffectiveDate" DATE,
    "licenseExpireDate" DATE,
    "ssnOrFedId" VARCHAR(50),  -- SSN or Federal ID
    "licenseDocumentUrl" TEXT,  -- S3 URL for license image/document

    -- AUDIT
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "createdBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL,
    "isArchived" BOOLEAN DEFAULT FALSE NOT NULL,
    "archivedAt" TIMESTAMP DEFAULT NULL,
    "archivedBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_drivers_user_id ON drivers("userId");
CREATE INDEX IF NOT EXISTS idx_drivers_tenant_id ON drivers("tenantId");
CREATE INDEX IF NOT EXISTS idx_drivers_driver_code ON drivers("driverCode");
CREATE INDEX IF NOT EXISTS idx_drivers_status ON drivers("statusId");
CREATE INDEX IF NOT EXISTS idx_drivers_license_expire ON drivers("licenseExpireDate");
