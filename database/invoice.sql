-- =============================================
-- INVOICES TABLE
-- Invoice records
-- =============================================

CREATE TABLE IF NOT EXISTS invoices (
    id SERIAL PRIMARY KEY,
    "tenantId" INT DEFAULT NULL REFERENCES tenants(id) ON DELETE SET NULL,

    -- Invoice Information
    "invoiceNumber" VARCHAR(50) UNIQUE,
    "invoiceDate" TIMESTAMP DEFAULT NOW(),
    "dueDate" TIMESTAMP,

    -- Related
    "customerId" INT REFERENCES customers(id) ON DELETE SET NULL,
    "orderId" INT REFERENCES orders(id) ON DELETE SET NULL,

    -- Amounts
    "subtotal" DECIMAL(10, 2),
    "taxAmount" DECIMAL(10, 2) DEFAULT 0,
    "totalAmount" DECIMAL(10, 2) NOT NULL,
    "paidAmount" DECIMAL(10, 2) DEFAULT 0,
    "balanceDue" DECIMAL(10, 2),

    -- Details
    "notes" TEXT,
    "terms" TEXT,

    -- Status
    "statusId" INT REFERENCES lookups(id) ON DELETE SET NULL,  -- 'draft', 'sent', 'paid', 'partial', 'overdue', 'cancelled'

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
CREATE INDEX IF NOT EXISTS idx_invoices_tenant_id ON invoices("tenantId");
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number ON invoices("invoiceNumber");
CREATE INDEX IF NOT EXISTS idx_invoices_customer_id ON invoices("customerId");
CREATE INDEX IF NOT EXISTS idx_invoices_order_id ON invoices("orderId");
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices("statusId");
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices("dueDate");
