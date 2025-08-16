-- Phase 1: Remove public data exposure (CRITICAL FIX)
-- Drop the dangerous public SELECT policy that exposes customer data
DROP POLICY IF EXISTS "Permettre lecture publique des réservations" ON public.reservations;

-- Phase 2: Implement proper admin access control
-- Create admin-only SELECT policy for reservations
CREATE POLICY "Admin can view all reservations" 
ON public.reservations 
FOR SELECT 
USING (
  -- Only allow access if user is authenticated and has admin role
  auth.uid() IS NOT NULL AND 
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email IN ('admin@example.com') -- Replace with actual admin email
  )
);

-- Create admin UPDATE policy for reservation management
CREATE POLICY "Admin can update reservations" 
ON public.reservations 
FOR UPDATE 
USING (
  auth.uid() IS NOT NULL AND 
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email IN ('admin@example.com') -- Replace with actual admin email
  )
);

-- Create admin DELETE policy for reservation management  
CREATE POLICY "Admin can delete reservations" 
ON public.reservations 
FOR DELETE 
USING (
  auth.uid() IS NOT NULL AND 
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email IN ('admin@example.com') -- Replace with actual admin email
  )
);

-- Add server-side validation function for reservations
CREATE OR REPLACE FUNCTION public.validate_reservation_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate email format
  IF NEW.email !~ '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Validate dates
  IF NEW.date_debut < CURRENT_DATE THEN
    RAISE EXCEPTION 'Start date cannot be in the past';
  END IF;
  
  IF NEW.date_fin < NEW.date_debut THEN
    RAISE EXCEPTION 'End date must be after start date';
  END IF;
  
  -- Validate required fields
  IF LENGTH(TRIM(NEW.nom)) < 2 THEN
    RAISE EXCEPTION 'Name must be at least 2 characters';
  END IF;
  
  IF LENGTH(TRIM(NEW.prenom)) < 2 THEN
    RAISE EXCEPTION 'First name must be at least 2 characters';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;