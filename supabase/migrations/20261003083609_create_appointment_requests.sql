/*
# Create appointment_requests table (single-tenant, no auth)

1. New Tables
- `appointment_requests`
  - `id` (uuid, primary key)
  - `name` (text, not null) — client's full name
  - `phone` (text, not null) — contact phone number
  - `service` (text, not null) — requested service category
  - `preferred_date` (date, nullable) — preferred appointment date
  - `preferred_time` (text, nullable) — preferred time slot
  - `message` (text, nullable) — additional notes
  - `status` (text, default 'pending') — request status
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `appointment_requests`.
- Allow anon + authenticated INSERT only (public can submit requests).
- No SELECT/UPDATE/DELETE for anon or authenticated (requests are private to the salon owner).
3. Notes
- This is a single-tenant salon website with no sign-in flow.
- Anyone can submit an appointment request; only the database owner can view/manage them.
*/

CREATE TABLE IF NOT EXISTS appointment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  service text NOT NULL,
  preferred_date date,
  preferred_time text,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointment_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_appointments" ON appointment_requests;
CREATE POLICY "anon_insert_appointments"
ON appointment_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);
