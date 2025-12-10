-- =============================================
-- USER_ROLES TABLE
-- Assigns roles to users (many-to-many relationship)
-- =============================================

CREATE TABLE IF NOT EXISTS user_roles_xref (
    id SERIAL PRIMARY KEY,
    "userId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "roleId" INT NOT NULL REFERENCES lookups(id) ON DELETE CASCADE,  -- Role from lookups table (type: 'ROLE')
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,
    "isActive" BOOLEAN DEFAULT TRUE,

    -- Audit
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "createdBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL,
    "isArchived" BOOLEAN DEFAULT FALSE NOT NULL,
    "archivedAt" TIMESTAMP DEFAULT NULL,
    "archivedBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL,

    -- Unique constraint: user can have each role only once
    UNIQUE("userId", "roleId")
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles("userId");
CREATE INDEX IF NOT EXISTS idx_user_roles_role_id ON user_roles("roleId");
CREATE INDEX IF NOT EXISTS idx_user_roles_tenant_id ON user_roles("tenantId");
