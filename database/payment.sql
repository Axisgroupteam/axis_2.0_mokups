-- =============================================
-- PAYMENTS TABLE
-- Payment records
-- =============================================

CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,

    -- Payment Information
    "paymentNumber" VARCHAR(50) UNIQUE,
    "paymentDate" TIMESTAMP DEFAULT NOW(),
    "amount" DECIMAL(10, 2) NOT NULL,
    "paymentMethodId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'Check', 'ACH', 'Wire', 'Credit Card'

    -- Related
    "customerId" INT REFERENCES customers(id) ON DELETE SET NULL,
    "invoiceId" INT REFERENCES invoices(id) ON DELETE SET NULL,
    "payeeId" INT REFERENCES payees(id) ON DELETE SET NULL,

    -- Details
    "referenceNumber" VARCHAR(100),
    "notes" TEXT,

    -- Status
    "statusId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'pending', 'completed', 'failed', 'refunded'

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
CREATE INDEX IF NOT EXISTS idx_payments_tenant_id ON payments("tenantId");
CREATE INDEX IF NOT EXISTS idx_payments_payment_number ON payments("paymentNumber");
CREATE INDEX IF NOT EXISTS idx_payments_customer_id ON payments("customerId");
CREATE INDEX IF NOT EXISTS idx_payments_invoice_id ON payments("invoiceId");
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments("paymentDate");
