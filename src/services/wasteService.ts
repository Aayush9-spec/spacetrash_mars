import { supabase } from '@/integrations/supabase/client';
import { conversionRules } from '@/data/wasteTypes';

export interface WasteEntryData {
  id: string;
  waste_type: string;
  amount: number;
  created_at: string;
}

export interface SimulationStatsData {
  id: string;
  total_waste_processed: number;
  waste_by_type: any;
  materials_produced: any;
  astronaut_benefits: {
    toolsCreated: number;
    insulationPanels: number;
    constructionParts: number;
    energyUnits: number;
  };
  earth_impact_data?: {
    bottlesSaved: number;
    co2Saved: number;
    waterSaved: number;
    electronicsSaved: number;
  };
  updated_at: string;
}

const STATS_ID = '00000000-0000-0000-0000-000000000001';

export const wasteService = {
  // POST /api/waste equivalent - Add waste entry (trigger handles stats)
  async addWaste(type: string, amount: number) {
    try {
      // Insert waste entry - the database trigger will handle all stats calculations
      const { data: wasteEntry, error: wasteError } = await supabase
        .from('waste_entries')
        .insert([{ waste_type: type, amount }])
        .select()
        .single();

      if (wasteError) throw wasteError;

      return {
        input: amount,
        output: 'Calculated by system',
        unit: 'Various materials',
      };
    } catch (error) {
      console.error('Error adding waste:', error);
      throw error;
    }
  },

  // GET /api/dashboard equivalent - Get dashboard data
  async getDashboardData(): Promise<SimulationStatsData | null> {
    try {
      const { data, error } = await supabase
        .from('simulation_stats')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching dashboard data:', error);
        throw error;
      }
      
      if (!data) return null;
      
      return {
        id: data.id,
        total_waste_processed: data.total_waste_processed,
        waste_by_type: data.waste_by_type as any,
        materials_produced: data.materials_produced as any,
        astronaut_benefits: data.astronaut_benefits as any,
        earth_impact_data: data.earth_impact_data as any,
        updated_at: data.updated_at,
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  },

  // GET /api/waste-entries - Get all waste entries
  async getWasteEntries(): Promise<WasteEntryData[]> {
    try {
      const { data, error } = await supabase
        .from('waste_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching waste entries:', error);
      throw error;
    }
  },

  // DELETE /api/reset equivalent - Reset simulation
  async resetSimulation() {
    try {
      // Delete all waste entries
      const { error: deleteEntriesError } = await supabase
        .from('waste_entries')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (deleteEntriesError) throw deleteEntriesError;

      // Reset or delete stats (trigger will recreate as needed)
      const { error: resetStatsError } = await supabase
        .from('simulation_stats')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all stats

      if (resetStatsError) throw resetStatsError;
    } catch (error) {
      console.error('Error resetting simulation:', error);
      throw error;
    }
  },
};