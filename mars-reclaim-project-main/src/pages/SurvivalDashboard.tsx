import React from 'react';
import { useSimulationContext } from '@/context/SimulationContext';
import BackgroundStars from '@/components/BackgroundStars';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';
import { Wrench, Shield, Zap, Users, Activity, AlertTriangle } from 'lucide-react';

const SurvivalDashboard = () => {
  const { stats } = useSimulationContext();

  // Calculate survival scores based on resources
  const maintenanceScore = Math.min((stats.astronautBenefits.toolsCreated / 20) * 100, 100);
  const habitatSafetyScore = Math.min((stats.astronautBenefits.insulationPanels / 15) * 100, 100);
  const energyBackupScore = Math.min((stats.astronautBenefits.energyUnits / 100) * 100, 100);
  const constructionScore = Math.min((stats.astronautBenefits.constructionParts / 10) * 100, 100);

  // Overall survival score
  const overallSurvival = (maintenanceScore + habitatSafetyScore + energyBackupScore + constructionScore) / 4;

  const survivalMetrics = [
    {
      name: 'Maintenance',
      score: maintenanceScore,
      icon: Wrench,
      color: '#3b82f6',
      description: 'Tools available for repairs',
      value: stats.astronautBenefits.toolsCreated,
      target: 20,
      status: maintenanceScore >= 80 ? 'good' : maintenanceScore >= 50 ? 'warning' : 'danger'
    },
    {
      name: 'Habitat Safety',
      score: habitatSafetyScore,
      icon: Shield,
      color: '#8b5cf6',
      description: 'Insulation panels installed',
      value: stats.astronautBenefits.insulationPanels,
      target: 15,
      status: habitatSafetyScore >= 80 ? 'good' : habitatSafetyScore >= 50 ? 'warning' : 'danger'
    },
    {
      name: 'Energy Backup',
      score: energyBackupScore,
      icon: Zap,
      color: '#f59e0b',
      description: 'Emergency power reserves',
      value: stats.astronautBenefits.energyUnits,
      target: 100,
      status: energyBackupScore >= 80 ? 'good' : energyBackupScore >= 50 ? 'warning' : 'danger'
    },
    {
      name: 'Construction',
      score: constructionScore,
      icon: Users,
      color: '#10b981',
      description: 'Structural components ready',
      value: stats.astronautBenefits.constructionParts,
      target: 10,
      status: constructionScore >= 80 ? 'good' : constructionScore >= 50 ? 'warning' : 'danger'
    }
  ];

  // Data for radial chart
  const radialData = survivalMetrics.map(metric => ({
    name: metric.name,
    value: metric.score,
    fill: metric.color
  }));

  // Overall status
  const getOverallStatus = () => {
    if (overallSurvival >= 80) return { text: 'Optimal', variant: 'good', icon: '🟢' };
    if (overallSurvival >= 60) return { text: 'Stable', variant: 'good', icon: '🟡' };
    if (overallSurvival >= 40) return { text: 'Caution', variant: 'warning', icon: '🟠' };
    return { text: 'Critical', variant: 'danger', icon: '🔴' };
  };

  const overallStatus = getOverallStatus();

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <BackgroundStars />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              👨‍🚀 Crew Survival Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Monitor how recycling contributes to astronaut survival and mission success
            </p>
          </div>

          {/* Overall Status */}
          <Card className="habitat-card mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Mission Survival Status</CardTitle>
                  <CardDescription>
                    Overall crew survival readiness based on recycled resources
                  </CardDescription>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-2">{overallStatus.icon}</div>
                  <Badge 
                    variant={overallStatus.variant === 'good' ? 'default' : 'destructive'}
                    className={`status-${overallStatus.variant} text-lg px-4 py-2`}
                  >
                    {overallStatus.text}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Overall Survival Score</span>
                  <span className="text-2xl font-bold">{overallSurvival.toFixed(1)}%</span>
                </div>
                <Progress value={overallSurvival} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  Score calculated from maintenance capability, habitat safety, energy reserves, and construction readiness
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Survival Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {survivalMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <Card key={metric.name} className="habitat-card">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl" style={{ backgroundColor: `${metric.color}20`, border: `1px solid ${metric.color}30` }}>
                        <Icon className="h-6 w-6" style={{ color: metric.color }} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{metric.name} Score</CardTitle>
                        <CardDescription>{metric.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-3xl font-bold" style={{ color: metric.color }}>
                          {metric.score.toFixed(1)}%
                        </span>
                        <Badge 
                          variant="secondary"
                          className={`status-${metric.status}`}
                        >
                          {metric.value}/{metric.target}
                        </Badge>
                      </div>
                      <Progress 
                        value={metric.score} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Current: {metric.value}</span>
                        <span>Target: {metric.target}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radial Chart */}
            <Card className="habitat-card">
              <CardHeader>
                <CardTitle>Survival Metrics Overview</CardTitle>
                <CardDescription>
                  Visual breakdown of survival readiness scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart data={radialData} innerRadius="20%" outerRadius="80%">
                    <RadialBar dataKey="value" cornerRadius={10} />
                    <Legend />
                  </RadialBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Critical Alerts */}
            <Card className="habitat-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning-orange" />
                  Mission Alerts
                </CardTitle>
                <CardDescription>
                  Critical systems requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {survivalMetrics
                    .filter(metric => metric.status !== 'good')
                    .map(metric => (
                      <div key={metric.name} className={`p-3 rounded-lg status-${metric.status} border`}>
                        <div className="flex items-center gap-2 mb-1">
                          <metric.icon className="h-4 w-4" />
                          <span className="font-medium">{metric.name}</span>
                        </div>
                        <p className="text-sm">
                          {metric.status === 'danger' 
                            ? `Critical: Only ${metric.value}/${metric.target} resources available`
                            : `Warning: ${metric.value}/${metric.target} resources, improve for optimal safety`
                          }
                        </p>
                      </div>
                    ))}
                  
                  {survivalMetrics.every(metric => metric.status === 'good') && (
                    <div className="p-4 rounded-lg status-good border text-center">
                      <Activity className="h-8 w-8 mx-auto mb-2 text-status-green" />
                      <p className="font-medium">All Systems Nominal</p>
                      <p className="text-sm mt-1">Crew survival metrics are within optimal ranges</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurvivalDashboard;