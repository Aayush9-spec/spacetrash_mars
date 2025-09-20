import { WasteType } from '@/types/waste';

export const wasteTypes: WasteType[] = [
  {
    id: 'plastic',
    name: 'Plastic',
    icon: '🔹',
    color: 'blue',
    conversionRate: 0.5,
    outputMaterial: 'Filament',
    outputUnit: 'kg',
    description: 'Plastic → Shredder → 3D Printer Filament'
  },
  {
    id: 'metal',
    name: 'Metal',
    icon: '⚙️',
    color: 'gray',
    conversionRate: 0.7,
    outputMaterial: 'Metal Sheet',
    outputUnit: 'kg',
    description: 'Metal → Furnace → Construction Sheets'
  },
  {
    id: 'textile',
    name: 'Textile',
    icon: '🧵',
    color: 'purple',
    conversionRate: 0.8,
    outputMaterial: 'Insulation',
    outputUnit: 'kg',
    description: 'Textile → Shredder → Thermal Insulation'
  },
  {
    id: 'ewaste',
    name: 'E-Waste',
    icon: '💾',
    color: 'green',
    conversionRate: 0.3,
    outputMaterial: 'Metals + Syngas',
    outputUnit: 'kg',
    description: 'E-Waste → Pyrolysis → Precious Metals + Energy'
  }
];

export const conversionRules = {
  plastic: { material: 'Filament', rate: 0.5, tools: 5 }, // 0.2kg per tool
  metal: { material: 'Metal Sheet', rate: 0.7, parts: 1 }, // 1kg per part
  textile: { material: 'Insulation', rate: 0.8, panels: 0.8 }, // 1kg per panel
  ewaste: { material: 'Metals + Syngas', rate: 0.3, energy: 10 }, // 10 units per kg
};