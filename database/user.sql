-- =============================================
-- USERS TABLE
-- Core user authentication and basic profile data
-- Role-specific data goes in separate tables (drivers, customers, etc.)
-- =============================================

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,

    "firstName" VARCHAR(255) NOT NULL,
    "middleName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "birthDate" DATE,
    "gender" gender_enum,
    "profilePictureBucketKey" TEXT,
    "imgUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "languages" JSONB,  -- Array of language IDs from lookups e.g. English, Spanish, French

    -- Authentication
    "authEmail" VARCHAR(255) UNIQUE NOT NULL,  -- Email for authentication/login
    "emailVerifiedAt" TIMESTAMPTZ DEFAULT NULL,
    "authMobileNumber" VARCHAR(255) UNIQUE DEFAULT NULL,  -- Mobile Number for authentication/login
    "mobileNumberVerifiedAt" TIMESTAMPTZ DEFAULT NULL,
    "hashPassword" TEXT,
    "passwordUpdatedAt" TIMESTAMP DEFAULT NULL,
    "authType" VARCHAR(20) NOT NULL DEFAULT 'email',
    "otpCode" VARCHAR(10),
    "otpExpiresAt" TIMESTAMP,

    -- Third-party SSO
    "googleId" VARCHAR(255) UNIQUE,
    "googleProviderData" JSONB,
    "outlookId" VARCHAR(255) UNIQUE,
    "outlookProviderData" JSONB,
    "appleId" VARCHAR(255) UNIQUE,
    "appleProviderData" JSONB,
    "lastLoginAt" TIMESTAMP,

    -- Address Information
    "address" VARCHAR(255),
    "address2" VARCHAR(255),  -- Apartment, Suite, Unit, etc.
    "city" VARCHAR(100),
    "state" VARCHAR(50),
    "zipcode" VARCHAR(20),
    "country" VARCHAR(100) DEFAULT 'USA',
    "latitude" DECIMAL(10, 8),
    "longitude" DECIMAL(11, 8),

    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "createdBy" INT DEFAULT NULL REFERENCES users (id) ON DELETE SET NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedBy" INT DEFAULT NULL REFERENCES users (id) ON DELETE SET NULL,
    "isArchived" BOOLEAN DEFAULT FALSE NOT NULL, -- Soft delete instead of hard delete
    "archivedAt" TIMESTAMP DEFAULT NULL,
    "archivedBy" INT DEFAULT NULL REFERENCES users (id) ON DELETE SET NULL,
);