import { WasteEntry } from '@/types/waste';

export interface EarthImpactData {
  bottlesSaved: number;
  co2Avoided: number; // kg
  waterSaved: number; // liters
  landfillDiverted: number; // kg
}

export const calculateEarthImpact = (wasteEntries: WasteEntry[]): EarthImpactData => {
  let bottlesSaved = 0;
  let co2Avoided = 0;
  let waterSaved = 0;
  let landfillDiverted = 0;

  wasteEntries.forEach(entry => {
    const quantity = entry.quantity;
    
    switch (entry.type) {
      case 'plastic':
        // Plastic waste calculations
        bottlesSaved += Math.floor(quantity * 40); // ~25g per bottle
        co2Avoided += quantity * 2.3; // 2.3kg CO₂ per kg plastic recycled
        landfillDiverted += quantity;
        break;
        
      case 'metal':
        // Metal waste calculations
        co2Avoided += quantity * 1.8; // 1.8kg CO₂ per kg metal recycled
        waterSaved += quantity * 75; // 75L water saved per kg metal
        landfillDiverted += quantity;
        break;
        
      case 'textile':
        // Textile waste calculations
        waterSaved += quantity * 2700; // 2700L water saved per kg textile
        co2Avoided += quantity * 3.6; // 3.6kg CO₂ per kg textile recycled
        landfillDiverted += quantity;
        break;
        
      case 'ewaste':
        // E-waste calculations
        co2Avoided += quantity * 4.2; // 4.2kg CO₂ per kg e-waste recycled
        waterSaved += quantity * 150; // 150L water saved per kg e-waste
        landfillDiverted += quantity;
        break;
    }
  });

  return {
    bottlesSaved: Math.floor(bottlesSaved),
    co2Avoided: Math.round(co2Avoided * 10) / 10,
    waterSaved: Math.round(waterSaved),
    landfillDiverted: Math.round(landfillDiverted * 10) / 10,
  };
};