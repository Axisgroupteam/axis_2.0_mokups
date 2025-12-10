-- =============================================
-- DOCUMENTS TABLE
-- Document storage/references
-- =============================================

CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,

    -- Document Information
    "documentName" VARCHAR(255) NOT NULL,
    "documentTypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'License', 'Registration', 'Insurance', etc.
    "description" TEXT,

    -- File
    "fileUrl" TEXT,
    "fileName" VARCHAR(255),
    "fileType" VARCHAR(50),
    "fileSize" INT,

    -- Related Entity (polymorphic)
    "entityType" VARCHAR(50),  -- 'driver', 'vehicle', 'trailer', 'customer', etc.
    "entityId" INT,

    -- Expiration
    "expirationDate" DATE,
    "isExpired" BOOLEAN DEFAULT FALSE,

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
CREATE INDEX IF NOT EXISTS idx_documents_tenant_id ON documents("tenantId");
CREATE INDEX IF NOT EXISTS idx_documents_entity ON documents("entityType", "entityId");
CREATE INDEX IF NOT EXISTS idx_documents_expiration ON documents("expirationDate");
