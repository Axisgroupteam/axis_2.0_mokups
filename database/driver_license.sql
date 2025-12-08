-- =============================================
-- DRIVER_LICENSE TABLE
-- Stores driver license information
-- Profile > License Information tab
-- =============================================

CREATE TABLE IF NOT EXISTS driver_licenses (
    id SERIAL PRIMARY KEY,
    
    "driverId" INT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,

    -- License Information
    "licenseNumber" VARCHAR(50) NOT NULL,
    "licenseCategoryId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- e.g., 'Class A CDL', 'Class B CDL', 'Class C CDL'
    "licenseState" VARCHAR(50),
    "licenseEffectiveDate" DATE,
    "licenseExpireDate" DATE,
    "ssnOrFedId" VARCHAR(50),  -- SSN or Federal ID

    -- License Document
    "licenseDocumentUrl" TEXT,  -- S3 URL for license image/document

    -- Status
    "isVerified" BOOLEAN DEFAULT FALSE,
    "verifiedAt" TIMESTAMP,
    "verifiedBy" INT REFERENCES users(id) ON DELETE SET NULL,
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
CREATE INDEX IF NOT EXISTS idx_driver_licenses_driver_id ON driver_licenses("driverId");
CREATE INDEX IF NOT EXISTS idx_driver_licenses_tenant_id ON driver_licenses("tenantId");
CREATE INDEX IF NOT EXISTS idx_driver_licenses_expire_date ON driver_licenses("licenseExpireDate");
CREATE INDEX IF NOT EXISTS idx_driver_licenses_license_number ON driver_licenses("licenseNumber");
