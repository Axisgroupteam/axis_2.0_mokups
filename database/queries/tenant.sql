-- =============================================
-- TENANTS TABLE
-- Stores carrier/company information (e.g., Mega Logistics)
-- Multi-tenant support for the platform
-- =============================================

CREATE TABLE IF NOT EXISTS tenants (
    id SERIAL PRIMARY KEY,

    -- Basic Information
    "name" VARCHAR(255) UNIQUE NOT NULL,  -- Company name (e.g., 'Mega Trucking')
    "legalName" VARCHAR(255),  -- Legal business name
    "code" VARCHAR(50),  -- Short code identifier
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "phoneNumber" VARCHAR(20),
    "faxNumber" VARCHAR(20),
    "website" VARCHAR(255),

    -- Company Identifiers (Trucking/Carrier specific)
    "mcNumber" VARCHAR(50),  -- Motor Carrier Number (MC-XXXXXX)
    "dotNumber" VARCHAR(50),  -- Department of Transportation Number
    "scacCode" VARCHAR(10),  -- Standard Carrier Alpha Code (2-4 letters)
    "taxId" VARCHAR(50),  -- Federal Tax ID / EIN
    "dunsNumber" VARCHAR(20),  -- D-U-N-S Number

    -- Address
    "addressLine1" VARCHAR(255) NOT NULL,
    "addressLine2" VARCHAR(255),
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(50) NOT NULL,
    "zipcode" VARCHAR(20) NOT NULL,
    "country" VARCHAR(100) DEFAULT 'USA',
    "latitude" DECIMAL(10, 8),
    "longitude" DECIMAL(11, 8),

    -- Branding
    "logoUrl" TEXT,  -- Company logo URL
    "primaryColor" VARCHAR(20),  -- Brand primary color (hex)
    "secondaryColor" VARCHAR(20),  -- Brand secondary color (hex)

    -- Settings
    "timeZone" VARCHAR(50) DEFAULT 'America/New_York',
    "dateFormat" VARCHAR(20) DEFAULT 'MM/DD/YYYY',
    "currencyCode" VARCHAR(10) DEFAULT 'USD',
    "distanceUnit" VARCHAR(20) DEFAULT 'miles',  -- 'miles' or 'kilometers'

    -- Business Details
    "businessTypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'LLC', 'Corporation', 'Sole Proprietorship'
    "carrierTypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Asset-Based', 'Broker', 'Both'
    "fleetSize" INT,  -- Number of trucks
    "yearEstablished" INT,

    -- Insurance Information
    "insuranceCompany" VARCHAR(255),
    "insurancePolicyNumber" VARCHAR(100),
    "insuranceExpirationDate" DATE,
    "liabilityCoverage" DECIMAL(15, 2),
    "cargoCoverage" DECIMAL(15, 2),

    -- Contact Person (Primary)
    "primaryContactName" VARCHAR(255),
    "primaryContactEmail" VARCHAR(255),
    "primaryContactPhone" VARCHAR(20),
    "primaryContactTitle" VARCHAR(100),

    -- Billing Contact
    "billingContactName" VARCHAR(255),
    "billingContactEmail" VARCHAR(255),
    "billingContactPhone" VARCHAR(20),

    -- Status
    "statusId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'active', 'inactive', 'suspended', 'pending'
    "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "activatedAt" TIMESTAMP,
    "deactivatedAt" TIMESTAMP,
    "deactivationReason" TEXT,

    -- Subscription/Plan
    "subscriptionPlanId" INT REFERENCES lookups(id) ON DELETE SET NULL,
    "subscriptionStartDate" DATE,
    "subscriptionEndDate" DATE,

    -- Audit
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "createdBy" INT DEFAULT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedBy" INT DEFAULT NULL,
    "isArchived" BOOLEAN DEFAULT FALSE NOT NULL,
    "archivedAt" TIMESTAMP DEFAULT NULL,
    "archivedBy" INT DEFAULT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tenants_code ON tenants("code");
CREATE INDEX IF NOT EXISTS idx_tenants_mc_number ON tenants("mcNumber");
CREATE INDEX IF NOT EXISTS idx_tenants_dot_number ON tenants("dotNumber");
CREATE INDEX IF NOT EXISTS idx_tenants_scac_code ON tenants("scacCode");
CREATE INDEX IF NOT EXISTS idx_tenants_is_active ON tenants("isActive");
