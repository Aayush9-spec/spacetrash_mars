import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSimulationContext } from '@/context/SimulationContext';
import { wasteTypes } from '@/data/wasteTypes';
import BackgroundStars from '@/components/BackgroundStars';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Timeline = () => {
  const { wasteEntries } = useSimulationContext();
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['plastic', 'metal', 'textile', 'ewaste']);

  // Process data for the timeline chart
  const timelineData = useMemo(() => {
    if (!wasteEntries.length) return [];

    // Sort entries by date
    const sortedEntries = [...wasteEntries].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    // Create cumulative data points
    const cumulativeData: any[] = [];
    const cumulativeTotals: Record<string, number> = {
      plastic: 0,
      metal: 0,
      textile: 0,
      ewaste: 0,
      total: 0
    };

    sortedEntries.forEach((entry, index) => {
      cumulativeTotals[entry.type] += entry.quantity;
      cumulativeTotals.total += entry.quantity;

      cumulativeData.push({
        date: format(new Date(entry.timestamp), 'MMM dd, HH:mm'),
        timestamp: new Date(entry.timestamp).getTime(),
        plastic: cumulativeTotals.plastic,
        metal: cumulativeTotals.metal,
        textile: cumulativeTotals.textile,
        ewaste: cumulativeTotals.ewaste,
        total: cumulativeTotals.total,
        entryType: entry.type,
        entryAmount: entry.quantity
      });
    });

    return cumulativeData;
  }, [wasteEntries]);

  // Filter data based on selected types
  const filteredData = useMemo(() => {
    return timelineData.map(point => {
      const filtered: any = {
        date: point.date,
        timestamp: point.timestamp,
        entryType: point.entryType,
        entryAmount: point.entryAmount
      };
      
      selectedTypes.forEach(type => {
        filtered[type] = point[type];
      });
      
      return filtered;
    });
  }, [timelineData, selectedTypes]);

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const getTypeColor = (type: string) => {
    const colors = {
      plastic: '#3b82f6',
      metal: '#64748b',
      textile: '#8b5cf6',
      ewaste: '#10b981'
    };
    return colors[type as keyof typeof colors] || '#6b7280';
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <BackgroundStars />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              ⏱️ Waste Recycling Timeline
            </h1>
            <p className="text-muted-foreground text-lg">
              Track your recycling progress over time with detailed analytics
            </p>
          </div>

          {/* Filter Controls */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Filter by Waste Type</CardTitle>
              <CardDescription>
                Select which waste types to display in the timeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {wasteTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedTypes.includes(type.id) ? "default" : "outline"}
                    onClick={() => toggleType(type.id)}
                    className="flex items-center gap-2"
                  >
                    <span>{type.icon}</span>
                    {type.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeline Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Cumulative Waste Processed</CardTitle>
              <CardDescription>
                Total amount of waste recycled over time (kg)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      labelFormatter={(label) => `Time: ${label}`}
                      formatter={(value: number, name: string) => [
                        `${value.toFixed(1)} kg`,
                        wasteTypes.find(t => t.id === name)?.name || name
                      ]}
                    />
                    <Legend />
                    {selectedTypes.map((type) => (
                      <Line
                        key={type}
                        type="monotone"
                        dataKey={type}
                        stroke={getTypeColor(type)}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        name={wasteTypes.find(t => t.id === type)?.name || type}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg mb-4">
                    No recycling data available yet
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Start recycling waste in the simulator to see your timeline!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest recycling actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {wasteEntries.length > 0 ? (
                <div className="space-y-3">
                  {wasteEntries.slice(0, 10).map((entry, index) => {
                    const wasteType = wasteTypes.find(t => t.id === entry.type);
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{wasteType?.icon}</span>
                          <div>
                            <p className="font-medium">{wasteType?.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(entry.timestamp), 'MMM dd, yyyy HH:mm')}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">
                          {entry.quantity.toFixed(1)} kg
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No activity recorded yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Timeline;