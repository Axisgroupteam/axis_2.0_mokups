-- =============================================
-- LOOKUPS TABLE
-- Stores lookup values for dropdowns/selects
-- References lookup_types for categorization
-- =============================================

CREATE TABLE IF NOT EXISTS lookups (
    id SERIAL PRIMARY KEY,

    "lookupTypeId" INT NOT NULL REFERENCES lookup_types(id) ON DELETE CASCADE,
    
    "code" VARCHAR(50) NOT NULL,  -- e.g., 'MALE', 'FEMALE', 'CLASS_A_CDL'
    "name" VARCHAR(100) NOT NULL,  -- e.g., 'Male', 'Female', 'Class A CDL'
    "description" TEXT,
    "sortOrder" INT DEFAULT 0,  -- For ordering in dropdowns
    "isDefault" BOOLEAN DEFAULT FALSE,  -- Default selection
    "isSystem" BOOLEAN DEFAULT FALSE,  -- System-defined (cannot be deleted)
    "isActive" BOOLEAN DEFAULT TRUE,
    "metadata" JSONB,  -- Additional data if needed

    -- Audit
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "createdBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL,
    "isArchived" BOOLEAN DEFAULT FALSE NOT NULL,
    "archivedAt" TIMESTAMP DEFAULT NULL,
    "archivedBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL,

    -- Unique constraint: code must be unique within a lookup type
    UNIQUE("lookupTypeId", "code")
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_lookups_lookup_type_id ON lookups("lookupTypeId");
CREATE INDEX IF NOT EXISTS idx_lookups_code ON lookups("code");
