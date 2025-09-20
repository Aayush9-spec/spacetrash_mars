import { useState } from 'react';
import { Plus, RotateCcw, ArrowRight } from 'lucide-react';
import { wasteTypes } from '@/data/wasteTypes';
import { useSimulationContext } from '@/context/SimulationContext';
import BackgroundStars from '@/components/BackgroundStars';
import AIWasteSorting from '@/components/AIWasteSorting';
import ExportResetButtons from '@/components/ExportResetButtons';
import EarthImpactToggle from '@/components/EarthImpactToggle';
import { toast } from '@/hooks/use-toast';

const Simulator = () => {
  const { stats, addWaste, resetSimulation, loading } = useSimulationContext();
  const [selectedType, setSelectedType] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddWaste = async () => {
    if (!selectedType || !quantity || parseFloat(quantity) <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please select a waste type and enter a valid quantity.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate processing animation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await addWaste(selectedType, parseFloat(quantity));
      
      const wasteType = wasteTypes.find(w => w.id === selectedType);
      toast({
        title: "Waste Processed Successfully!",
        description: `${quantity} kg of ${wasteType?.name} converted to ${wasteType?.outputMaterial}`,
      });
      
      setQuantity('');
    } catch (error) {
      toast({
        title: "Processing Failed",
        description: "Failed to process waste. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = async () => {
    try {
      await resetSimulation();
      toast({
        title: "Simulation Reset",
        description: "All data has been cleared. Ready for new mission!",
      });
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: "Failed to reset simulation. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen relative pt-20">
      <BackgroundStars />
      
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-orbitron font-bold mb-4 text-foreground">
            Waste Processing Simulator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Select waste type and quantity to simulate the recycling process. 
            Watch as your waste transforms into valuable resources for Mars survival.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            <div className="habitat-card">
              <h2 className="text-2xl font-orbitron font-semibold mb-6 text-foreground">
                Waste Input Panel
              </h2>
              
              {/* Waste Type Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {wasteTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedType === type.id
                        ? 'border-mars-sunset bg-mars-sunset/20 shadow-lg'
                        : 'border-space-nebula bg-space-deep/50 hover:border-cosmic-blue'
                    }`}
                  >
                    <div className="text-3xl mb-2">{type.icon}</div>
                    <div className="font-orbitron font-semibold text-foreground">{type.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">{type.description}</div>
                  </button>
                ))}
              </div>

              {/* Quantity Input */}
              <div className="space-y-4">
                <label className="text-foreground font-semibold">Quantity (kg)</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter waste quantity..."
                  className="w-full p-4 rounded-xl bg-space-deep border border-space-nebula text-foreground placeholder-muted-foreground focus:border-cosmic-blue focus:outline-none"
                  min="0"
                  step="0.1"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  onClick={handleAddWaste}
                  disabled={isProcessing || loading}
                  className="btn-mars flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      Process Waste
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleReset}
                  disabled={loading}
                  className="btn-space px-6 flex items-center gap-2 disabled:opacity-50"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
              </div>
            </div>

            {/* Processing Animation */}
            {isProcessing && selectedType && (
              <div className="habitat-card">
                <h3 className="text-xl font-orbitron font-semibold mb-4 text-foreground">
                  Processing Sequence
                </h3>
                <div className="flex items-center justify-between py-4">
                  <div className="text-center">
                    <div className="text-2xl mb-2">
                      {wasteTypes.find(w => w.id === selectedType)?.icon}
                    </div>
                    <div className="text-sm text-muted-foreground">Input Waste</div>
                  </div>
                  
                  <ArrowRight className="h-6 w-6 text-cosmic-blue animate-pulse" />
                  
                  <div className="text-center">
                    <div className="text-2xl mb-2 animate-glow">⚙️</div>
                    <div className="text-sm text-muted-foreground">Processing</div>
                  </div>
                  
                  <ArrowRight className="h-6 w-6 text-cosmic-blue animate-pulse" />
                  
                  <div className="text-center">
                    <div className="text-2xl mb-2">✨</div>
                    <div className="text-sm text-muted-foreground">Resource Created</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="habitat-card">
              <h2 className="text-2xl font-orbitron font-semibold mb-6 text-foreground">
                Current Mission Stats
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-space-deep/50">
                  <span className="text-muted-foreground">Total Waste Processed</span>
                  <span className="font-orbitron font-bold text-mars-sunset">
                    {stats.totalWasteProcessed.toFixed(1)} kg
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-space-deep/50">
                  <span className="text-muted-foreground">Tools Created</span>
                  <span className="font-orbitron font-bold text-cosmic-blue">
                    {stats.astronautBenefits.toolsCreated}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-space-deep/50">
                  <span className="text-muted-foreground">Insulation Panels</span>
                  <span className="font-orbitron font-bold text-status-green">
                    {stats.astronautBenefits.insulationPanels}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-space-deep/50">
                  <span className="text-muted-foreground">Energy Units</span>
                  <span className="font-orbitron font-bold text-status-orange">
                    {stats.astronautBenefits.energyUnits}
                  </span>
                </div>
              </div>
            </div>

            {/* Waste Breakdown */}
            {Object.keys(stats.wasteByType).length > 0 && (
              <div className="habitat-card">
                <h3 className="text-xl font-orbitron font-semibold mb-4 text-foreground">
                  Waste Breakdown
                </h3>
                <div className="space-y-3">
                  {Object.entries(stats.wasteByType).map(([type, amount]) => {
                    const wasteType = wasteTypes.find(w => w.id === type);
                    return (
                      <div key={type} className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <span>{wasteType?.icon}</span>
                          <span className="text-muted-foreground">{wasteType?.name}</span>
                        </span>
                        <span className="font-orbitron font-semibold text-foreground">
                          {amount.toFixed(1)} kg
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* New Features */}
        <div className="max-w-6xl mx-auto mt-8 space-y-8">
          {/* Earth Impact Toggle */}
          <div className="flex justify-center">
            <EarthImpactToggle />
          </div>

          {/* AI Waste Sorting */}
          <AIWasteSorting />

          {/* Export and Reset */}
          <div className="habitat-card">
            <h2 className="text-2xl font-orbitron font-semibold mb-6 text-foreground">
              Data Management
            </h2>
            <ExportResetButtons />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Simulator;