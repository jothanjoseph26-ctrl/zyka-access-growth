
-- Add UPDATE and DELETE policies for pawns
CREATE POLICY "Allow update access to authenticated users"
ON public.pawns FOR UPDATE TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Allow delete access to authenticated users"
ON public.pawns FOR DELETE TO authenticated
USING (true);

-- Add UPDATE and DELETE policies for customers
CREATE POLICY "Allow update access to authenticated users"
ON public.customers FOR UPDATE TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Allow delete access to authenticated users"
ON public.customers FOR DELETE TO authenticated
USING (true);

-- Add full CRUD policies for payments
CREATE POLICY "Allow read access to authenticated users"
ON public.payments FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Allow insert access to authenticated users"
ON public.payments FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow update access to authenticated users"
ON public.payments FOR UPDATE TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Allow delete access to authenticated users"
ON public.payments FOR DELETE TO authenticated
USING (true);

-- Add full CRUD policies for gold_rates
CREATE POLICY "Allow read access to authenticated users"
ON public.gold_rates FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Allow insert access to authenticated users"
ON public.gold_rates FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow update access to authenticated users"
ON public.gold_rates FOR UPDATE TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Allow delete access to authenticated users"
ON public.gold_rates FOR DELETE TO authenticated
USING (true);

-- Add full CRUD policies for pawn_extensions
CREATE POLICY "Allow read access to authenticated users"
ON public.pawn_extensions FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Allow insert access to authenticated users"
ON public.pawn_extensions FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow update access to authenticated users"
ON public.pawn_extensions FOR UPDATE TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Allow delete access to authenticated users"
ON public.pawn_extensions FOR DELETE TO authenticated
USING (true);

-- Add full CRUD policies for settings
CREATE POLICY "Allow read access to authenticated users"
ON public.settings FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Allow insert access to authenticated users"
ON public.settings FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow update access to authenticated users"
ON public.settings FOR UPDATE TO authenticated
USING (true) WITH CHECK (true);

-- Add full CRUD policies for audit_logs
CREATE POLICY "Allow read access to authenticated users"
ON public.audit_logs FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Allow insert access to authenticated users"
ON public.audit_logs FOR INSERT TO authenticated
WITH CHECK (true);

-- Change existing pawns and customers policies from RESTRICTIVE to PERMISSIVE
DROP POLICY "Allow read access to authenticated users" ON public.pawns;
DROP POLICY "Allow insert access to authenticated users" ON public.pawns;
CREATE POLICY "Authenticated users can read pawns"
ON public.pawns FOR SELECT TO authenticated
USING (true);
CREATE POLICY "Authenticated users can insert pawns"
ON public.pawns FOR INSERT TO authenticated
WITH CHECK (true);

DROP POLICY "Allow read access to authenticated users" ON public.customers;
DROP POLICY "Allow insert access to authenticated users" ON public.customers;
CREATE POLICY "Authenticated users can read customers"
ON public.customers FOR SELECT TO authenticated
USING (true);
CREATE POLICY "Authenticated users can insert customers"
ON public.customers FOR INSERT TO authenticated
WITH CHECK (true);
