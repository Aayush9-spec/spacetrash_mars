-- Ensure our existing tables have proper structure for all features

-- Update simulation_stats table to include more detailed tracking
ALTER TABLE simulation_stats 
ADD COLUMN IF NOT EXISTS earth_impact_data JSONB DEFAULT '{"bottlesSaved": 0, "co2Saved": 0, "waterSaved": 0, "electronicsSaved": 0}'::JSONB;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waste_entries_created_at ON waste_entries(created_at);
CREATE INDEX IF NOT EXISTS idx_waste_entries_waste_type ON waste_entries(waste_type);

-- Create a function to calculate earth impact
CREATE OR REPLACE FUNCTION calculate_earth_impact(
  plastic_amount NUMERIC DEFAULT 0,
  metal_amount NUMERIC DEFAULT 0,
  textile_amount NUMERIC DEFAULT 0,
  ewaste_amount NUMERIC DEFAULT 0
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN jsonb_build_object(
    'bottlesSaved', FLOOR(plastic_amount * 20)::INTEGER,
    'co2Saved', FLOOR(metal_amount * 2.5)::INTEGER,
    'waterSaved', FLOOR(textile_amount * 2700)::INTEGER,
    'electronicsSaved', FLOOR(ewaste_amount * 5)::INTEGER
  );
END;
$$;

-- Update the function that processes waste to also calculate earth impact
CREATE OR REPLACE FUNCTION process_waste_entry()
RETURNS TRIGGER AS $$
DECLARE
  current_stats simulation_stats%ROWTYPE;
  new_waste_by_type JSONB;
  new_materials JSONB;
  new_benefits JSONB;
  new_earth_impact JSONB;
  plastic_total NUMERIC := 0;
  metal_total NUMERIC := 0;
  textile_total NUMERIC := 0;
  ewaste_total NUMERIC := 0;
BEGIN
  -- Get current stats or create default
  SELECT * INTO current_stats FROM simulation_stats ORDER BY updated_at DESC LIMIT 1;
  
  IF current_stats.id IS NULL THEN
    current_stats.total_waste_processed := 0;
    current_stats.waste_by_type := '{}'::JSONB;
    current_stats.materials_produced := '{}'::JSONB;
    current_stats.astronaut_benefits := '{"energyUnits": 0, "toolsCreated": 0, "insulationPanels": 0, "constructionParts": 0}'::JSONB;
    current_stats.earth_impact_data := '{"bottlesSaved": 0, "co2Saved": 0, "waterSaved": 0, "electronicsSaved": 0}'::JSONB;
  END IF;

  -- Update waste by type
  new_waste_by_type := current_stats.waste_by_type;
  new_waste_by_type := jsonb_set(
    new_waste_by_type,
    ARRAY[NEW.waste_type],
    to_jsonb(COALESCE((current_stats.waste_by_type ->> NEW.waste_type)::NUMERIC, 0) + NEW.amount)
  );

  -- Calculate materials produced based on waste type
  new_materials := current_stats.materials_produced;
  
  CASE NEW.waste_type
    WHEN 'plastic' THEN
      new_materials := jsonb_set(
        new_materials,
        ARRAY['Filament'],
        to_jsonb(COALESCE((current_stats.materials_produced ->> 'Filament')::NUMERIC, 0) + NEW.amount * 0.5)
      );
    WHEN 'metal' THEN
      new_materials := jsonb_set(
        new_materials,
        ARRAY['Metal Sheet'],
        to_jsonb(COALESCE((current_stats.materials_produced ->> 'Metal Sheet')::NUMERIC, 0) + NEW.amount * 0.7)
      );
    WHEN 'textile' THEN
      new_materials := jsonb_set(
        new_materials,
        ARRAY['Insulation'],
        to_jsonb(COALESCE((current_stats.materials_produced ->> 'Insulation')::NUMERIC, 0) + NEW.amount * 0.8)
      );
    WHEN 'ewaste' THEN
      new_materials := jsonb_set(
        new_materials,
        ARRAY['Metals + Syngas'],
        to_jsonb(COALESCE((current_stats.materials_produced ->> 'Metals + Syngas')::NUMERIC, 0) + NEW.amount * 0.3)
      );
  END CASE;

  -- Calculate astronaut benefits
  new_benefits := current_stats.astronaut_benefits;
  
  -- Tools from filament (0.2kg per tool)
  new_benefits := jsonb_set(
    new_benefits,
    ARRAY['toolsCreated'],
    to_jsonb(FLOOR(COALESCE((new_materials ->> 'Filament')::NUMERIC, 0) / 0.2)::INTEGER)
  );
  
  -- Insulation panels
  new_benefits := jsonb_set(
    new_benefits,
    ARRAY['insulationPanels'],
    to_jsonb(FLOOR(COALESCE((new_materials ->> 'Insulation')::NUMERIC, 0))::INTEGER)
  );
  
  -- Construction parts
  new_benefits := jsonb_set(
    new_benefits,
    ARRAY['constructionParts'],
    to_jsonb(FLOOR(COALESCE((new_materials ->> 'Metal Sheet')::NUMERIC, 0))::INTEGER)
  );
  
  -- Energy units
  new_benefits := jsonb_set(
    new_benefits,
    ARRAY['energyUnits'],
    to_jsonb(FLOOR(COALESCE((new_materials ->> 'Metals + Syngas')::NUMERIC, 0) * 10)::INTEGER)
  );

  -- Calculate totals for earth impact
  plastic_total := COALESCE((new_waste_by_type ->> 'plastic')::NUMERIC, 0);
  metal_total := COALESCE((new_waste_by_type ->> 'metal')::NUMERIC, 0);
  textile_total := COALESCE((new_waste_by_type ->> 'textile')::NUMERIC, 0);
  ewaste_total := COALESCE((new_waste_by_type ->> 'ewaste')::NUMERIC, 0);

  -- Calculate earth impact
  new_earth_impact := calculate_earth_impact(plastic_total, metal_total, textile_total, ewaste_total);

  -- Update or insert simulation stats
  INSERT INTO simulation_stats (
    total_waste_processed,
    waste_by_type,
    materials_produced,
    astronaut_benefits,
    earth_impact_data
  )
  VALUES (
    current_stats.total_waste_processed + NEW.amount,
    new_waste_by_type,
    new_materials,
    new_benefits,
    new_earth_impact
  )
  ON CONFLICT (id) DO UPDATE SET
    total_waste_processed = EXCLUDED.total_waste_processed,
    waste_by_type = EXCLUDED.waste_by_type,
    materials_produced = EXCLUDED.materials_produced,
    astronaut_benefits = EXCLUDED.astronaut_benefits,
    earth_impact_data = EXCLUDED.earth_impact_data,
    updated_at = now();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS trigger_process_waste ON waste_entries;
CREATE TRIGGER trigger_process_waste
  AFTER INSERT ON waste_entries
  FOR EACH ROW
  EXECUTE FUNCTION process_waste_entry();