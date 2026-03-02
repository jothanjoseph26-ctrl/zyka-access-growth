-- Database Schema for Zyka Credit Pawn System
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CUSTOMERS TABLE
-- ============================================
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    full_name TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    email TEXT,
    address TEXT,
    date_of_birth DATE,
    aadhar_number VARCHAR(12),
    pan_number VARCHAR(10),
    is_active BOOLEAN DEFAULT true,
    
    -- Metadata
    created_by UUID REFERENCES auth.users(id),
    notes TEXT
);

-- Index for phone lookups
CREATE INDEX idx_customers_phone ON customers(phone);

-- ============================================
-- PAWNS TABLE
-- ============================================
CREATE TYPE pawn_status AS ENUM ('pending', 'active', 'extended', 'redeemed', 'forfeited', 'auctioned');
CREATE TYPE collateral_type AS ENUM ('gold', 'diamond', 'vehicle', 'other');

CREATE TABLE pawns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    ticket_number VARCHAR(20) UNIQUE NOT NULL,
    customer_id UUID NOT NULL REFERENCES customers(id),
    
    -- Collateral Details
    collateral_type collateral_type NOT NULL,
    item_description TEXT NOT NULL,
    weight_grams DECIMAL(10, 2),
    purity VARCHAR(10),
    vehicle_registration VARCHAR(20),
    vehicle_chassis VARCHAR(30),
    
    -- Valuation & Loan
    market_value DECIMAL(12, 2) NOT NULL,
    loan_amount DECIMAL(12, 2) NOT NULL,
    interest_rate DECIMAL(5, 2) DEFAULT 3.00,
    tenure_days INTEGER DEFAULT 30,
    
    -- Status & Dates
    status pawn_status DEFAULT 'pending',
    pawn_date DATE NOT NULL,
    maturity_date DATE NOT NULL,
    redemption_date DATE,
    
    -- Financial
    total_interest_paid DECIMAL(12, 2) DEFAULT 0,
    total_amount_paid DECIMAL(12, 2) DEFAULT 0,
    
    -- Storage
    vault_location VARCHAR(50),
    shelf_number VARCHAR(20),
    photo_urls TEXT[],
    
    -- Notes
    notes TEXT,
    created_by UUID REFERENCES auth.users(id)
);

-- Index for ticket lookups
CREATE INDEX idx_pawns_ticket ON pawns(ticket_number);
CREATE INDEX idx_pawns_customer ON pawns(customer_id);
CREATE INDEX idx_pawns_status ON pawns(status);
CREATE INDEX idx_pawns_maturity ON pawns(maturity_date);

-- ============================================
-- PAYMENTS TABLE
-- ============================================
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    pawn_id UUID NOT NULL REFERENCES pawns(id),
    customer_id UUID NOT NULL REFERENCES customers(id),
    
    amount DECIMAL(12, 2) NOT NULL,
    payment_type VARCHAR(20) NOT NULL, -- 'interest', 'principal', 'full'
    payment_method VARCHAR(20) DEFAULT 'cash', -- 'cash', 'upi', 'bank_transfer', 'cheque'
    
    receipt_number VARCHAR(20) UNIQUE NOT NULL,
    transaction_id VARCHAR(50),
    
    notes TEXT,
    created_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_payments_pawn ON payments(pawn_id);
CREATE INDEX idx_payments_customer ON payments(customer_id);

-- ============================================
-- PAWN EXTENSIONS TABLE
-- ============================================
CREATE TABLE pawn_extensions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    pawn_id UUID NOT NULL REFERENCES pawns(id),
    
    new_maturity_date DATE NOT NULL,
    extension_fee DECIMAL(10, 2) NOT NULL,
    interest_topup DECIMAL(10, 2),
    
    notes TEXT,
    created_by UUID REFERENCES auth.users(id)
);

-- ============================================
-- GOLD RATES TABLE
-- ============================================
CREATE TABLE gold_rates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    purity VARCHAR(10) NOT NULL,
    rate_per_10g DECIMAL(10, 2) NOT NULL,
    effective_from DATE NOT NULL,
    is_active BOOLEAN DEFAULT true
);

-- Insert default gold rates
INSERT INTO gold_rates (purity, rate_per_10g, effective_from) VALUES
    ('24K', 6200, CURRENT_DATE),
    ('22K', 5680, CURRENT_DATE),
    ('18K', 4650, CURRENT_DATE),
    ('16K', 4100, CURRENT_DATE);

-- ============================================
-- SETTINGS TABLE
-- ============================================
CREATE TABLE settings (
    key VARCHAR(50) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Default settings
INSERT INTO settings (key, value) VALUES
    ('company', '{"name": "Zyka Credit", "address": "", "phone": "", "email": ""}'::jsonb),
    ('defaults', '{"interest_rate": 3, "ltv": 75, "tenure_days": 30}'::jsonb),
    ('business_hours', '{"open": "9:00", "close": "18:00", "days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}'::jsonb);

-- ============================================
-- AUDIT LOG TABLE
-- ============================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    user_id UUID REFERENCES auth.users(id),
    action VARCHAR(50) NOT NULL,
    table_name VARCHAR(50),
    record_id UUID,
    changes JSONB,
    ip_address INET
);

-- ============================================
-- AUTO-GENERATE TICKET NUMBER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TRIGGER AS $$
DECLARE
    year_str TEXT;
    seq_num INTEGER;
    ticket_text TEXT;
BEGIN
    year_str := TO_CHAR(NOW(), 'YY');
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(ticket_number FROM 4 FOR 6) AS INTEGER)), 0) + 1
    INTO seq_num
    FROM pawns
    WHERE ticket_number LIKE 'P-' || year_str || '%';
    
    ticket_text := 'P-' || year_str || '-' || LPAD(seq_num::TEXT, 6, '0');
    NEW.ticket_number := ticket_text;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for ticket number
CREATE TRIGGER set_ticket_number
    BEFORE INSERT ON pawns
    FOR EACH ROW
    WHEN (NEW.ticket_number IS NULL)
    EXECUTE FUNCTION generate_ticket_number();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE pawns ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE pawn_extensions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gold_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies (customize based on your auth setup)
CREATE POLICY "Allow read access to authenticated users" ON customers
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow insert access to authenticated users" ON customers
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow read access to authenticated users" ON pawns
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow insert access to authenticated users" ON pawns
    FOR INSERT TO authenticated WITH CHECK (true);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Calculate interest for a pawn
CREATE OR REPLACE FUNCTION calculate_interest(
    p_loan_amount DECIMAL,
    p_rate DECIMAL,
    p_days INTEGER
)
RETURNS DECIMAL AS $$
BEGIN
    RETURN ROUND((p_loan_amount * p_rate * p_days) / 100, 2);
END;
$$ LANGUAGE plpgsql;

-- Get customer pawn summary
CREATE OR REPLACE FUNCTION get_customer_pawn_summary(p_customer_id UUID)
RETURNS TABLE (
    total_pawns INTEGER,
    active_pawns INTEGER,
    total_loan_amount DECIMAL,
    total_market_value DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::INTEGER AS total_pawns,
        COUNT(*) FILTER (WHERE status = 'active')::INTEGER AS active_pawns,
        COALESCE(SUM(loan_amount) FILTER (WHERE status = 'active'), 0)::DECIMAL AS total_loan_amount,
        COALESCE(SUM(market_value) FILTER (WHERE status = 'active'), 0)::DECIMAL AS total_market_value
    FROM pawns
    WHERE customer_id = p_customer_id;
END;
$$ LANGUAGE plpgsql;
