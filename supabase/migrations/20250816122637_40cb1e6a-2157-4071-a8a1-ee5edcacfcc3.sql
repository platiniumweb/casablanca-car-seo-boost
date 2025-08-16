-- Fix security warnings from the linter

-- 1. Fix function search path issue by setting explicit search_path
CREATE OR REPLACE FUNCTION public.validate_reservation_data()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

-- Add validation trigger for reservations
CREATE TRIGGER validate_reservation_trigger
  BEFORE INSERT OR UPDATE ON public.reservations
  FOR EACH ROW EXECUTE FUNCTION public.validate_reservation_data();

-- 2. Fix anonymous access by adding proper role checks to admin policies
-- Drop and recreate admin policies with proper role targeting
DROP POLICY IF EXISTS "Admin can view all reservations" ON public.reservations;
DROP POLICY IF EXISTS "Admin can update reservations" ON public.reservations;
DROP POLICY IF EXISTS "Admin can delete reservations" ON public.reservations;

-- Create admin-only policies that target authenticated users specifically
CREATE POLICY "Admin can view all reservations" 
ON public.reservations 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email IN ('admin@example.com') -- Replace with actual admin email
  )
);

CREATE POLICY "Admin can update reservations" 
ON public.reservations 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email IN ('admin@example.com') -- Replace with actual admin email
  )
);

CREATE POLICY "Admin can delete reservations" 
ON public.reservations 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email IN ('admin@example.com') -- Replace with actual admin email
  )
);