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
    "authType" VARCHAR(20) NOT NULL DEFAULT 'email', 
    "isActive" BOOLEAN NOT NULL DEFAULT TRUE,

    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "createdBy" INT DEFAULT NULL REFERENCES users (id) ON DELETE SET NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedBy" INT DEFAULT NULL REFERENCES users (id) ON DELETE SET NULL,
    "isArchived" BOOLEAN DEFAULT FALSE NOT NULL, -- Soft delete instead of hard delete
    "archivedAt" TIMESTAMP DEFAULT NULL,
    "archivedBy" INT DEFAULT NULL REFERENCES users (id) ON DELETE SET NULL,
);