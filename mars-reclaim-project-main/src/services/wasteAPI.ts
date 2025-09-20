import { supabase } from '@/integrations/supabase/client';
import { conversionRules } from '@/data/wasteTypes';

export interface WasteAPIResponse {
  input: number;
  output: number;
  unit: string;
}

export interface DashboardData {
  waste: Record<string, number>;
  outputs: Record<string, number>;
  astronautBenefits: {
    tools: number;
    insulationPanels: number;
    constructionParts: number;
    energyUnits: number;
  };
}

// POST /api/waste equivalent
export const addWasteEntry = async (type: string, amount: number): Promise<WasteAPIResponse> => {
  try {
    // Insert waste entry
    const { error: insertError } = await supabase
      .from('waste_entries')
      .insert({ waste_type: type, amount });

    if (insertError) throw insertError;

    // Get current stats
    const { data: currentStats, error: fetchError } = await supabase
      .from('simulation_stats')
      .select('*')
      .eq('id', '00000000-0000-0000-0000-000000000001')
      .maybeSingle();

    if (fetchError) throw fetchError;

    const stats = currentStats || {
      total_waste_processed: 0,
      waste_by_type: {},
      materials_produced: {},
      astronaut_benefits: { toolsCreated: 0, insulationPanels: 0, constructionParts: 0, energyUnits: 0 }
    };

    // Apply conversion rules
    const rule = conversionRules[type as keyof typeof conversionRules];
    if (!rule) throw new Error('Invalid waste type');

    const materialProduced = amount * rule.rate;

    // Update stats
    const wasteByType = stats.waste_by_type as Record<string, number> || {};
    const materialsProduced = stats.materials_produced as Record<string, number> || {};
    const astronautBenefits = stats.astronaut_benefits as any || { toolsCreated: 0, insulationPanels: 0, constructionParts: 0, energyUnits: 0 };
    
    const newStats = {
      total_waste_processed: stats.total_waste_processed + amount,
      waste_by_type: {
        ...wasteByType,
        [type]: (wasteByType[type] || 0) + amount
      },
      materials_produced: {
        ...materialsProduced,
        [rule.material]: (materialsProduced[rule.material] || 0) + materialProduced
      },
      astronaut_benefits: { ...astronautBenefits }
    };

    // Calculate astronaut benefits
    switch (type) {
      case 'plastic':
        newStats.astronaut_benefits.toolsCreated += Math.floor(materialProduced * (rule as any).tools);
        break;
      case 'metal':
        newStats.astronaut_benefits.constructionParts += Math.floor(materialProduced * (rule as any).parts);
        break;
      case 'textile':
        newStats.astronaut_benefits.insulationPanels += Math.floor(materialProduced * (rule as any).panels);
        break;
      case 'ewaste':
        newStats.astronaut_benefits.energyUnits += Math.floor(materialProduced * (rule as any).energy);
        break;
    }

    // Update stats in database
    const { error: updateError } = await supabase
      .from('simulation_stats')
      .upsert({
        id: '00000000-0000-0000-0000-000000000001',
        ...newStats
      });

    if (updateError) throw updateError;

    return {
      input: amount,
      output: materialProduced,
      unit: `kg ${rule.material}`
    };
  } catch (error) {
    console.error('Error adding waste entry:', error);
    throw error;
  }
};

// GET /api/dashboard equivalent
export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    const { data, error } = await supabase
      .from('simulation_stats')
      .select('*')
      .eq('id', '00000000-0000-0000-0000-000000000001')
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return {
        waste: {},
        outputs: {},
        astronautBenefits: {
          tools: 0,
          insulationPanels: 0,
          constructionParts: 0,
          energyUnits: 0
        }
      };
    }

    const wasteByType = data.waste_by_type as Record<string, number> || {};
    const materialsProduced = data.materials_produced as Record<string, number> || {};
    const astronautBenefits = data.astronaut_benefits as any || {};

    return {
      waste: wasteByType,
      outputs: materialsProduced,
      astronautBenefits: {
        tools: astronautBenefits.toolsCreated || 0,
        insulationPanels: astronautBenefits.insulationPanels || 0,
        constructionParts: astronautBenefits.constructionParts || 0,
        energyUnits: astronautBenefits.energyUnits || 0
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

// DELETE /api/reset equivalent
export const resetSimulation = async (): Promise<void> => {
  try {
    // Clear all waste entries
    const { error: deleteError } = await supabase
      .from('waste_entries')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all entries

    if (deleteError) throw deleteError;

    // Reset simulation stats
    const { error: updateError } = await supabase
      .from('simulation_stats')
      .upsert({
        id: '00000000-0000-0000-0000-000000000001',
        total_waste_processed: 0,
        waste_by_type: {},
        materials_produced: {},
        astronaut_benefits: { toolsCreated: 0, insulationPanels: 0, constructionParts: 0, energyUnits: 0 }
      });

    if (updateError) throw updateError;
  } catch (error) {
    console.error('Error resetting simulation:', error);
    throw error;
  }
};