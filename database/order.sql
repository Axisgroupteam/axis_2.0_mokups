-- =============================================
-- ORDERS TABLE
-- Order/Load information
-- =============================================

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,

    -- Order Information
    "orderNumber" VARCHAR(50) UNIQUE,
    "orderTypeId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Bulk', 'Aggregate', 'Walking Floor TMF', 'Precast'
    "customerId" INT REFERENCES customers(id) ON DELETE SET NULL,
    "driverId" INT REFERENCES drivers(id) ON DELETE SET NULL,
    "vehicleId" INT REFERENCES vehicles(id) ON DELETE SET NULL,
    "trailerId" INT REFERENCES trailers(id) ON DELETE SET NULL,

    -- Route
    "originLocationId" INT REFERENCES locations(id) ON DELETE SET NULL,
    "destinationLocationId" INT REFERENCES locations(id) ON DELETE SET NULL,
    "rateId" INT REFERENCES rates(id) ON DELETE SET NULL,
    "laneId" INT REFERENCES lanes(id) ON DELETE SET NULL,

    -- Schedule
    "pickupDate" TIMESTAMP,
    "deliveryDate" TIMESTAMP,
    "actualPickupDate" TIMESTAMP,
    "actualDeliveryDate" TIMESTAMP,

    -- Financials
    "customerRate" DECIMAL(10, 2),
    "driverRate" DECIMAL(10, 2),
    "distance" DECIMAL(10, 2),

    -- Status
    "statusId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'pending', 'in_progress', 'completed', 'cancelled'

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
CREATE INDEX IF NOT EXISTS idx_orders_tenant_id ON orders("tenantId");
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders("orderNumber");
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders("customerId");
CREATE INDEX IF NOT EXISTS idx_orders_driver_id ON orders("driverId");
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders("statusId");
