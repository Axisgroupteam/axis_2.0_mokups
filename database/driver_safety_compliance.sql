-- =============================================
-- DRIVER_SAFETY_COMPLIANCE TABLE
-- Stores driver safety compliance information
-- One record per driver (includes training, orientation, safety management,
-- PSP, additional fields, logbook management, and basic scores)
-- =============================================

CREATE TABLE IF NOT EXISTS driver_safety_compliance (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,
    "driverId" INT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,

    -- -----------------------------------------
    -- Training Information
    -- -----------------------------------------
    "lastTrainingDate" DATE,
    "nextTrainingDate" DATE,
    "specificTraining" TEXT,

    -- -----------------------------------------
    -- Orientation Information
    -- -----------------------------------------
    "orientationDate" DATE,
    "orientationHost" VARCHAR(255),
    "orientationLocation" VARCHAR(255),

    -- -----------------------------------------
    -- Safety Management
    -- -----------------------------------------
    "safetyRegionId" INT REFERENCES lookups(id) ON DELETE SET NULL,
    "safetyManagerId" INT REFERENCES users(id) ON DELETE SET NULL,
    "safetySupervisorId" INT REFERENCES users(id) ON DELETE SET NULL,
    "driverCurrentCSAPoints" INT DEFAULT 0,

    -- -----------------------------------------
    -- Driver PSP (Pre-Employment Screening Program)
    -- -----------------------------------------
    "inspectionHistoryId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- '1 yr history', '3 yr history', '7 yr history', 'Customized'

    -- -----------------------------------------
    -- Additional Safety Fields
    -- -----------------------------------------
    "previousJobType" VARCHAR(255),
    "experience" VARCHAR(100),
    "roadTestEvaluation" TEXT,
    "safetyMeetingAttendance" VARCHAR(50),

    -- -----------------------------------------
    -- Logbook Management
    -- -----------------------------------------
    "logbookProviderId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Samsara', 'Motive', 'Verizon Connect', etc.
    "violationsStartDate" DATE,
    "violationsEndDate" DATE,

    -- -----------------------------------------
    -- Basic Scores (CSA BASIC Categories)
    -- -----------------------------------------
    "unsafeScore" INT DEFAULT 0,
    "fatiguedScore" INT DEFAULT 0,
    "controlledSubstanceScore" INT DEFAULT 0,
    "fitnessScore" INT DEFAULT 0,
    "vehicleScore" INT DEFAULT 0,
    "cargoScore" INT DEFAULT 0,
    "crashScore" INT DEFAULT 0,
    "basicScoresReportDate" DATE,

    -- -----------------------------------------
    -- Audit
    -- -----------------------------------------
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "createdBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL,
    "isArchived" BOOLEAN DEFAULT FALSE NOT NULL,
    "archivedAt" TIMESTAMP DEFAULT NULL,
    "archivedBy" INT DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_driver_safety_compliance_tenant_id ON driver_safety_compliance("tenantId");
CREATE INDEX IF NOT EXISTS idx_driver_safety_compliance_driver_id ON driver_safety_compliance("driverId");
CREATE INDEX IF NOT EXISTS idx_driver_safety_compliance_safety_manager ON driver_safety_compliance("safetyManagerId");
CREATE INDEX IF NOT EXISTS idx_driver_safety_compliance_next_training ON driver_safety_compliance("nextTrainingDate");

-- Unique constraint - one safety compliance record per driver
CREATE UNIQUE INDEX IF NOT EXISTS idx_driver_safety_compliance_unique_driver ON driver_safety_compliance("driverId") WHERE "isArchived" = FALSE;
