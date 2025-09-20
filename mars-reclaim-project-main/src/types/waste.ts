export interface WasteType {
  id: string;
  name: string;
  icon: string;
  color: string;
  conversionRate: number;
  outputMaterial: string;
  outputUnit: string;
  description: string;
}

export interface WasteEntry {
  type: string;
  quantity: number;
  timestamp: Date;
}

export interface ProcessedMaterial {
  name: string;
  quantity: number;
  unit: string;
  uses: string[];
}

export interface SimulationStats {
  totalWasteProcessed: number;
  wasteByType: Record<string, number>;
  materialsProduced: Record<string, number>;
  astronautBenefits: {
    toolsCreated: number;
    insulationPanels: number;
    constructionParts: number;
    energyUnits: number;
  };
  earthImpactData?: {
    bottlesSaved: number;
    co2Saved: number;
    waterSaved: number;
    electronicsSaved: number;
  };
}