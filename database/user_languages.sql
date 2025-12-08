-- =============================================
-- USER_LANGUAGES TABLE
-- Stores multiple languages per user (many-to-many)
-- =============================================

CREATE TABLE IF NOT EXISTS user_languages (
    id SERIAL PRIMARY KEY,
    "userId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "languageLookupId" INT NOT NULL REFERENCES lookups(id) ON DELETE CASCADE,
    UNIQUE ("userId", "languageLookupId")
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_languages_user_id ON user_languages("userId");
CREATE INDEX IF NOT EXISTS idx_user_languages_language_id ON user_languages("languageLookupId");
