-- Create waste_entries table to store individual waste inputs
CREATE TABLE public.waste_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  waste_type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create simulation_stats table to store aggregated simulation data
CREATE TABLE public.simulation_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  total_waste_processed NUMERIC NOT NULL DEFAULT 0,
  waste_by_type JSONB NOT NULL DEFAULT '{}',
  materials_produced JSONB NOT NULL DEFAULT '{}',
  astronaut_benefits JSONB NOT NULL DEFAULT '{"toolsCreated": 0, "insulationPanels": 0, "constructionParts": 0, "energyUnits": 0}',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.waste_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.simulation_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no authentication required for this demo)
CREATE POLICY "Allow all operations on waste_entries" 
ON public.waste_entries 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all operations on simulation_stats" 
ON public.simulation_stats 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_simulation_stats_updated_at
BEFORE UPDATE ON public.simulation_stats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial simulation stats record
INSERT INTO public.simulation_stats (id) VALUES ('00000000-0000-0000-0000-000000000001');