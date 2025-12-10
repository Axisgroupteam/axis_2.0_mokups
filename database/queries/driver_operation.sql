-- =============================================
-- DRIVER_OPERATION TABLE
-- Stores driver operational information
-- One record per driver (includes assignments, availability, home info)
-- =============================================

CREATE TABLE IF NOT EXISTS driver_operation (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,
    "driverId" INT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,

    -- -----------------------------------------
    -- Driver Assignments
    -- -----------------------------------------
    "driverManagerId" INT REFERENCES users(id) ON DELETE SET NULL,  -- User who manages this driver
    "fleetId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Fleet A - West Coast', 'Fleet B - East Coast', etc.

    -- -----------------------------------------
    -- Availability (HOS - Hours of Service)
    -- -----------------------------------------
    "driveTimeAvailable" DECIMAL(5, 2),  -- Hours available for driving
    "onDutyTimeAvailable" DECIMAL(5, 2),  -- Hours available for on-duty
    "availabilityAsOfDate" DATE,
    "dutyStatusId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Off Duty', 'On Duty', 'Driving', 'Sleeper Berth'

    -- -----------------------------------------
    -- Home Information
    -- -----------------------------------------
    "homeTerminalId" INT REFERENCES locations(id) ON DELETE SET NULL,  -- Home terminal location
    "returnHomeDate" DATE,

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
CREATE INDEX IF NOT EXISTS idx_driver_operation_tenant_id ON driver_operation("tenantId");
CREATE INDEX IF NOT EXISTS idx_driver_operation_driver_id ON driver_operation("driverId");
CREATE INDEX IF NOT EXISTS idx_driver_operation_driver_manager ON driver_operation("driverManagerId");
CREATE INDEX IF NOT EXISTS idx_driver_operation_fleet ON driver_operation("fleetId");
CREATE INDEX IF NOT EXISTS idx_driver_operation_home_terminal ON driver_operation("homeTerminalId");
CREATE INDEX IF NOT EXISTS idx_driver_operation_duty_status ON driver_operation("dutyStatusId");

-- Unique constraint - one operation record per driver
CREATE UNIQUE INDEX IF NOT EXISTS idx_driver_operation_unique_driver ON driver_operation("driverId") WHERE "isArchived" = FALSE;
