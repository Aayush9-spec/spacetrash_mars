import { useState, useCallback, useEffect } from 'react';
import { WasteEntry, SimulationStats } from '@/types/waste';
import { wasteService } from '@/services/wasteService';

export const useWasteSimulation = () => {
  const [wasteEntries, setWasteEntries] = useState<WasteEntry[]>([]);
  const [stats, setStats] = useState<SimulationStats>({
    totalWasteProcessed: 0,
    wasteByType: {},
    materialsProduced: {},
    astronautBenefits: {
      toolsCreated: 0,
      insulationPanels: 0,
      constructionParts: 0,
      energyUnits: 0,
    },
  });
  const [loading, setLoading] = useState(false);

  // Load initial data from Supabase
  useEffect(() => {
    loadDashboardData();
    loadWasteEntries();
  }, []);

  const loadDashboardData = async () => {
    try {
      const data = await wasteService.getDashboardData();
      if (data) {
        setStats({
          totalWasteProcessed: data.total_waste_processed,
          wasteByType: data.waste_by_type as Record<string, number>,
          materialsProduced: data.materials_produced as Record<string, number>,
          astronautBenefits: data.astronaut_benefits,
          earthImpactData: data.earth_impact_data,
        });
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const loadWasteEntries = async () => {
    try {
      const entries = await wasteService.getWasteEntries();
      setWasteEntries(entries.map(entry => ({
        type: entry.waste_type,
        quantity: entry.amount,
        timestamp: new Date(entry.created_at),
      })));
    } catch (error) {
      console.error('Failed to load waste entries:', error);
    }
  };

  const addWaste = useCallback(async (type: string, quantity: number) => {
    setLoading(true);
    try {
      await wasteService.addWaste(type, quantity);
      
      // Refresh data from database
      await loadDashboardData();
      await loadWasteEntries();
    } catch (error) {
      console.error('Failed to add waste:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetSimulation = useCallback(async () => {
    setLoading(true);
    try {
      await wasteService.resetSimulation();
      
      // Refresh data from database
      await loadDashboardData();
      await loadWasteEntries();
    } catch (error) {
      console.error('Failed to reset simulation:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    wasteEntries,
    stats,
    addWaste,
    resetSimulation,
    loading,
  };
};