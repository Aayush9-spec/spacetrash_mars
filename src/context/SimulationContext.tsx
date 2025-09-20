import React, { createContext, useContext, ReactNode } from 'react';
import { useWasteSimulation } from '@/hooks/useWasteSimulation';
import { WasteEntry, SimulationStats } from '@/types/waste';

interface SimulationContextType {
  wasteEntries: WasteEntry[];
  stats: SimulationStats;
  addWaste: (type: string, quantity: number) => Promise<void>;
  resetSimulation: () => Promise<void>;
  loading: boolean;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const useSimulationContext = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulationContext must be used within a SimulationProvider');
  }
  return context;
};

interface SimulationProviderProps {
  children: ReactNode;
}

export const SimulationProvider: React.FC<SimulationProviderProps> = ({ children }) => {
  const simulation = useWasteSimulation();

  return (
    <SimulationContext.Provider value={simulation}>
      {children}
    </SimulationContext.Provider>
  );
};