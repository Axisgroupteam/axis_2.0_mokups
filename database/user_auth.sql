
-- user_auths Table
CREATE TABLE IF NOT EXISTS user_auths (
    id SERIAL PRIMARY KEY,    
    "userId" INT NOT NULL REFERENCES users (id) ON DELETE CASCADE UNIQUE,
    -- Local login
    -- "authEmail" VARCHAR(255) UNIQUE NOT NULL,  -- Office Email for authentication/login
    -- "emailVerifiedAt" TIMESTAMPTZ DEFAULT NULL,  -- Email verification timestamp
    -- "authMobileNumber" VARCHAR(255) UNIQUE DEFAULT NULL,  -- Mobile Number for authentication/login
    -- "mobileNumberVerifiedAt" TIMESTAMPTZ DEFAULT NULL,  -- Mobile number verification timestamp
    -- "hashPassword" TEXT,        -- Store hashPassword   
    -- "passwordUpdatedAt" TIMESTAMP DEFAULT NULL,
    -- "otpCode" VARCHAR(10),
    -- "otpExpiresAt" TIMESTAMP,
    
    -- -- Third-party SSO
    -- "googleId" VARCHAR(255) UNIQUE,
    -- "googleProviderData" JSONB,
    -- "outlookId" VARCHAR(255) UNIQUE,
    -- "outlookProviderData" JSONB,
    -- "appleId" VARCHAR(255) UNIQUE,  -- Apple Sign-In
    -- "appleProviderData" JSONB,
    
    -- -- Audit
    -- "lastLoginAt" TIMESTAMP,
    -- "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    -- "createdBy" INT DEFAULT NULL REFERENCES main.users (id) ON DELETE SET NULL,
    -- "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    -- "updatedBy" INT DEFAULT NULL REFERENCES main.users (id) ON DELETE SET NULL,
    -- "isArchived" BOOLEAN DEFAULT FALSE NOT NULL,
    -- "archivedAt" TIMESTAMP DEFAULT NULL,
    -- "archivedBy" INT DEFAULT NULL REFERENCES main.users (id) ON DELETE SET NULL
);