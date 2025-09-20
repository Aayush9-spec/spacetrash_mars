import React from 'react';
import { useSimulationContext } from '@/context/SimulationContext';
import BackgroundStars from '@/components/BackgroundStars';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wrench, Shield, Zap, Building } from 'lucide-react';

const ResourceTracker = () => {
  const { stats } = useSimulationContext();

  // Calculate resources based on materials produced
  const filamentProduced = stats.materialsProduced['Filament'] || 0;
  const metalSheetProduced = stats.materialsProduced['Metal Sheet'] || 0;
  const insulationProduced = stats.materialsProduced['Insulation'] || 0;
  const metalsAndSyngasProduced = stats.materialsProduced['Metals + Syngas'] || 0;

  // Convert to resources
  const toolsAvailable = Math.floor(filamentProduced / 0.2); // 0.2kg per tool
  const constructionParts = Math.floor(metalSheetProduced); // 1kg per part
  const habitatPanels = Math.floor(insulationProduced); // 1kg per panel
  const energyUnits = Math.floor(metalsAndSyngasProduced * 10); // 10 units per kg

  const resources = [
    {
      name: 'Tools',
      icon: Wrench,
      available: toolsAvailable,
      usedCapacity: stats.astronautBenefits.toolsCreated,
      maxCapacity: 50,
      description: 'Essential maintenance and repair equipment',
      color: 'cosmic-blue',
      sourceHsv: filamentProduced.toFixed(1),
      sourceUnit: 'kg Filament'
    },
    {
      name: 'Construction Parts',
      icon: Building,
      available: constructionParts,
      usedCapacity: stats.astronautBenefits.constructionParts,
      maxCapacity: 30,
      description: 'Structural components for habitat expansion',
      color: 'mars-dust',
      sourceHsv: metalSheetProduced.toFixed(1),
      sourceUnit: 'kg Metal Sheet'
    },
    {
      name: 'Habitat Panels',
      icon: Shield,
      available: habitatPanels,
      usedCapacity: stats.astronautBenefits.insulationPanels,
      maxCapacity: 25,
      description: 'Thermal protection and insulation systems',
      color: 'stellar-purple',
      sourceHsv: insulationProduced.toFixed(1),
      sourceUnit: 'kg Insulation'
    },
    {
      name: 'Energy Units',
      icon: Zap,
      available: energyUnits,
      usedCapacity: stats.astronautBenefits.energyUnits,
      maxCapacity: 200,
      description: 'Backup power for critical systems',
      color: 'mars-glow',
      sourceHsv: metalsAndSyngasProduced.toFixed(1),
      sourceUnit: 'kg Metals + Syngas'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <BackgroundStars />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              🚀 Astronaut Resource Tracker
            </h1>
            <p className="text-muted-foreground text-lg">
              Monitor converted materials and their usage in the Mars habitat
            </p>
          </div>

          {/* Resource Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {resources.map((resource) => {
              const Icon = resource.icon;
              const utilizationPercent = (resource.usedCapacity / resource.maxCapacity) * 100;
              
              return (
                <Card key={resource.name} className="habitat-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl bg-${resource.color}/20 border border-${resource.color}/30`}>
                          <Icon className={`h-6 w-6 text-${resource.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{resource.name}</CardTitle>
                          <CardDescription>{resource.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-lg font-bold">
                        {resource.available}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Usage Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Usage</span>
                          <span>{resource.usedCapacity}/{resource.maxCapacity}</span>
                        </div>
                        <Progress 
                          value={utilizationPercent} 
                          className="h-2" 
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {utilizationPercent.toFixed(1)}% capacity used
                        </p>
                      </div>

                      {/* Source Material */}
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">From:</span>
                        <span className="font-medium">
                          {resource.sourceHsv} {resource.sourceUnit}
                        </span>
                      </div>

                      {/* Status */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <Badge 
                          variant={resource.available > 0 ? "default" : "secondary"}
                          className={
                            resource.available > 0 
                              ? "status-good" 
                              : "status-warning"
                          }
                        >
                          {resource.available > 0 ? "Available" : "Needs Material"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Summary Stats */}
          <Card className="habitat-card">
            <CardHeader>
              <CardTitle>Resource Production Summary</CardTitle>
              <CardDescription>
                Overview of material conversion efficiency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cosmic-blue mb-1">
                    {filamentProduced.toFixed(1)}kg
                  </div>
                  <div className="text-sm text-muted-foreground">Filament Produced</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-mars-dust mb-1">
                    {metalSheetProduced.toFixed(1)}kg
                  </div>
                  <div className="text-sm text-muted-foreground">Metal Sheets</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-stellar-purple mb-1">
                    {insulationProduced.toFixed(1)}kg
                  </div>
                  <div className="text-sm text-muted-foreground">Insulation Made</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-mars-glow mb-1">
                    {metalsAndSyngasProduced.toFixed(1)}kg
                  </div>
                  <div className="text-sm text-muted-foreground">Metals + Syngas</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResourceTracker;