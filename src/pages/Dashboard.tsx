import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSimulationContext } from '@/context/SimulationContext';
import { useEarthImpact } from '@/components/EarthImpactToggle';
import { wasteTypes } from '@/data/wasteTypes';
import BackgroundStars from '@/components/BackgroundStars';
import EarthImpactToggle from '@/components/EarthImpactToggle';
import { Recycle, Zap, Wrench, Shield, Earth, Droplets, TreePine, Factory } from 'lucide-react';

const Dashboard = () => {
  const { stats } = useSimulationContext();
  const { isEarthMode } = useEarthImpact();

  // Get Earth Impact metrics from database or calculate fallback
  const earthImpact = stats.earthImpactData || {
    bottlesSaved: Math.floor((stats.wasteByType['plastic'] || 0) * 20),
    co2Saved: Math.floor((stats.wasteByType['metal'] || 0) * 2.5),
    waterSaved: Math.floor((stats.wasteByType['textile'] || 0) * 2700),
    electronicsSaved: Math.floor((stats.wasteByType['ewaste'] || 0) * 5),
  };

  const wasteData = Object.entries(stats.wasteByType).map(([type, amount]) => {
    const wasteType = wasteTypes.find(w => w.id === type);
    return {
      name: wasteType?.name || type,
      value: amount,
      fill: type === 'plastic' ? '#3B82F6' : 
            type === 'metal' ? '#6B7280' :
            type === 'textile' ? '#8B5CF6' : '#10B981'
    };
  });

  const materialsData = Object.entries(stats.materialsProduced).map(([material, amount]) => ({
    name: material,
    amount: amount.toFixed(1),
    fill: '#F97316'
  }));

  const benefitsData = [
    { name: 'Tools', value: stats.astronautBenefits.toolsCreated, icon: Wrench, color: '#3B82F6' },
    { name: 'Panels', value: stats.astronautBenefits.insulationPanels, color: '#10B981' },
    { name: 'Parts', value: stats.astronautBenefits.constructionParts, color: '#6B7280' },
    { name: 'Energy', value: stats.astronautBenefits.energyUnits, icon: Zap, color: '#F59E0B' },
  ];

  return (
    <div className="min-h-screen relative pt-20">
      <BackgroundStars />
      
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-orbitron font-bold mb-4 text-foreground">
            Mission Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {isEarthMode 
              ? "Environmental impact analysis of waste recycling for Earth sustainability."
              : "Comprehensive analysis of waste processing efficiency and resource generation for Mars survival."
            }
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <EarthImpactToggle />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="habitat-card text-center">
            <Recycle className="h-12 w-12 text-mars-sunset mx-auto mb-4 animate-glow" />
            <div className="text-3xl font-orbitron font-bold text-foreground mb-2">
              {stats.totalWasteProcessed.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">kg Waste Processed</div>
          </div>

          {isEarthMode ? (
            <>
              <div className="habitat-card text-center">
                <Droplets className="h-12 w-12 text-cosmic-blue mx-auto mb-4" />
                <div className="text-3xl font-orbitron font-bold text-foreground mb-2">
                  {earthImpact.bottlesSaved}
                </div>
                <div className="text-sm text-muted-foreground">Bottles Saved</div>
              </div>

              <div className="habitat-card text-center">
                <Factory className="h-12 w-12 text-status-green mx-auto mb-4" />
                <div className="text-3xl font-orbitron font-bold text-foreground mb-2">
                  {earthImpact.co2Saved}
                </div>
                <div className="text-sm text-muted-foreground">kg CO₂ Avoided</div>
              </div>

              <div className="habitat-card text-center">
                <TreePine className="h-12 w-12 text-status-orange mx-auto mb-4" />
                <div className="text-3xl font-orbitron font-bold text-foreground mb-2">
                  {earthImpact.waterSaved}
                </div>
                <div className="text-sm text-muted-foreground">Liters Water Saved</div>
              </div>
            </>
          ) : (
            <>
              <div className="habitat-card text-center">
                <Wrench className="h-12 w-12 text-cosmic-blue mx-auto mb-4" />
                <div className="text-3xl font-orbitron font-bold text-foreground mb-2">
                  {stats.astronautBenefits.toolsCreated}
                </div>
                <div className="text-sm text-muted-foreground">Tools Created</div>
              </div>

              <div className="habitat-card text-center">
                <Shield className="h-12 w-12 text-status-green mx-auto mb-4" />
                <div className="text-3xl font-orbitron font-bold text-foreground mb-2">
                  {stats.astronautBenefits.insulationPanels}
                </div>
                <div className="text-sm text-muted-foreground">Insulation Panels</div>
              </div>

              <div className="habitat-card text-center">
                <Zap className="h-12 w-12 text-status-orange mx-auto mb-4" />
                <div className="text-3xl font-orbitron font-bold text-foreground mb-2">
                  {stats.astronautBenefits.energyUnits}
                </div>
                <div className="text-sm text-muted-foreground">Energy Units</div>
              </div>
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Waste Distribution Chart */}
          <div className="habitat-card">
            <h2 className="text-2xl font-orbitron font-semibold mb-6 text-foreground">
              Waste Type Distribution
            </h2>
            {wasteData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={wasteData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {wasteData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No waste data available. Start processing waste in the simulator!
              </div>
            )}
          </div>

          {/* Materials Produced */}
          <div className="habitat-card">
            <h2 className="text-2xl font-orbitron font-semibold mb-6 text-foreground">
              Materials Produced
            </h2>
            {materialsData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={materialsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--space-nebula))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--space-deep))',
                      border: '1px solid hsl(var(--space-nebula))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Bar dataKey="amount" fill="hsl(var(--mars-sunset))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No materials produced yet. Process waste to see results!
              </div>
            )}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="habitat-card">
          <h2 className="text-2xl font-orbitron font-semibold mb-6 text-foreground">
            {isEarthMode ? "Environmental Impact" : "Astronaut Survival Benefits"}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {isEarthMode ? (
              <>
                <div className="text-center p-4 rounded-xl bg-space-deep/50">
                  <Droplets className="h-8 w-8 mx-auto mb-3 text-cosmic-blue" />
                  <div className="text-2xl font-orbitron font-bold mb-2 text-foreground">
                    {earthImpact.bottlesSaved}
                  </div>
                  <div className="text-sm text-muted-foreground">Plastic Bottles Prevented</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-space-deep/50">
                  <Factory className="h-8 w-8 mx-auto mb-3 text-status-green" />
                  <div className="text-2xl font-orbitron font-bold mb-2 text-foreground">
                    {earthImpact.co2Saved} kg
                  </div>
                  <div className="text-sm text-muted-foreground">CO₂ Emissions Avoided</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-space-deep/50">
                  <TreePine className="h-8 w-8 mx-auto mb-3 text-status-orange" />
                  <div className="text-2xl font-orbitron font-bold mb-2 text-foreground">
                    {earthImpact.waterSaved} L
                  </div>
                  <div className="text-sm text-muted-foreground">Water Conservation</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-space-deep/50">
                  <Earth className="h-8 w-8 mx-auto mb-3 text-mars-sunset" />
                  <div className="text-2xl font-orbitron font-bold mb-2 text-foreground">
                    {earthImpact.electronicsSaved}
                  </div>
                  <div className="text-sm text-muted-foreground">Electronics Recycled</div>
                </div>
              </>
            ) : (
              benefitsData.map((benefit, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-space-deep/50">
                  {benefit.icon && <benefit.icon className="h-8 w-8 mx-auto mb-3" style={{ color: benefit.color }} />}
                  <div className="text-2xl font-orbitron font-bold mb-2 text-foreground">
                    {benefit.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{benefit.name}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Mission Progress */}
        <div className="habitat-card mt-8">
          <h2 className="text-2xl font-orbitron font-semibold mb-6 text-foreground">
            Mission Progress
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Waste Processing Progress</span>
                <span className="font-orbitron text-foreground">
                  {((stats.totalWasteProcessed / 12600) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-space-deep rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-mars-sunset to-cosmic-blue h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((stats.totalWasteProcessed / 12600) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stats.totalWasteProcessed.toFixed(1)} / 12,600 kg total mission waste
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;