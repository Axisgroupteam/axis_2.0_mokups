-- =============================================
-- LOOKUP_TYPES TABLE
-- Master table for categorizing lookup values
-- e.g., 'gender', 'race', 'ethnicity', 'language', 'driver_type', 'status'
-- =============================================

CREATE TABLE IF NOT EXISTS lookup_types (
    id SERIAL PRIMARY KEY,
    "code" VARCHAR(50) UNIQUE NOT NULL,  -- e.g., 'GENDER', 'RACE', 'DRIVER_TYPE'
    "name" VARCHAR(100) NOT NULL,  -- e.g., 'Gender', 'Race', 'Driver Type'
    "description" TEXT,
    "isSystem" BOOLEAN DEFAULT FALSE,  -- System-defined (cannot be deleted)
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
CREATE INDEX IF NOT EXISTS idx_lookup_types_code ON lookup_types("code");
