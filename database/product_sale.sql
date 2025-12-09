-- =============================================
-- PRODUCT_SALES TABLE
-- Product sales records
-- =============================================

CREATE TABLE IF NOT EXISTS product_sales (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,

    -- Product Information
    "productName" VARCHAR(255) NOT NULL,
    "productCode" VARCHAR(50),
    "description" TEXT,
    "categoryId" INT REFERENCES lookups(id) ON DELETE SET NULL,

    -- Pricing
    "unitPrice" DECIMAL(10, 2),
    "quantity" INT DEFAULT 1,
    "totalAmount" DECIMAL(10, 2),

    -- Related
    "customerId" INT REFERENCES customers(id) ON DELETE SET NULL,
    "orderId" INT REFERENCES orders(id) ON DELETE SET NULL,

    -- Sale Date
    "saleDate" TIMESTAMP DEFAULT NOW(),

    -- Status
    "statusId" INT REFERENCES lookups(id) ON DELETE SET NULL,

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
CREATE INDEX IF NOT EXISTS idx_product_sales_tenant_id ON product_sales("tenantId");
CREATE INDEX IF NOT EXISTS idx_product_sales_customer_id ON product_sales("customerId");
CREATE INDEX IF NOT EXISTS idx_product_sales_order_id ON product_sales("orderId");
