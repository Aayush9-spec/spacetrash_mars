import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useSimulationContext } from '@/context/SimulationContext';
import { useToast } from '@/hooks/use-toast';
import { Download, RotateCcw, FileText } from 'lucide-react';
import { format } from 'date-fns';

const ExportResetButtons = () => {
  const { wasteEntries, stats, resetSimulation, loading } = useSimulationContext();
  const { toast } = useToast();

  const exportToCSV = () => {
    if (wasteEntries.length === 0) {
      toast({
        title: "No Data to Export",
        description: "Add some waste entries first before exporting.",
        variant: "destructive",
      });
      return;
    }

    // Prepare CSV data
    const headers = ['Timestamp', 'Waste Type', 'Quantity (kg)', 'Output Material', 'Output Quantity'];
    const csvRows = [headers.join(',')];

    wasteEntries.forEach(entry => {
      const timestamp = format(new Date(entry.timestamp), 'yyyy-MM-dd HH:mm:ss');
      
      // Calculate outputs based on conversion rules
      let outputMaterial = '';
      let outputQuantity = 0;
      
      switch (entry.type) {
        case 'plastic':
          outputMaterial = 'Filament';
          outputQuantity = entry.quantity * 0.5;
          break;
        case 'metal':
          outputMaterial = 'Metal Sheet';
          outputQuantity = entry.quantity * 0.7;
          break;
        case 'textile':
          outputMaterial = 'Insulation';
          outputQuantity = entry.quantity * 0.8;
          break;
        case 'ewaste':
          outputMaterial = 'Metals + Syngas';
          outputQuantity = entry.quantity * 0.3;
          break;
      }

      const row = [
        timestamp,
        entry.type,
        entry.quantity.toFixed(2),
        outputMaterial,
        outputQuantity.toFixed(2)
      ];
      csvRows.push(row.join(','));
    });

    // Add summary data
    csvRows.push('');
    csvRows.push('SUMMARY STATISTICS');
    csvRows.push(`Total Waste Processed,${stats.totalWasteProcessed.toFixed(2)} kg`);
    csvRows.push(`Tools Created,${stats.astronautBenefits.toolsCreated}`);
    csvRows.push(`Insulation Panels,${stats.astronautBenefits.insulationPanels}`);
    csvRows.push(`Construction Parts,${stats.astronautBenefits.constructionParts}`);
    csvRows.push(`Energy Units,${stats.astronautBenefits.energyUnits}`);

    // Create and download file
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `spacetrash-recycling-${format(new Date(), 'yyyy-MM-dd-HHmm')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    toast({
      title: "Export Successful",
      description: "Recycling history has been downloaded as CSV.",
    });
  };

  const exportToJSON = () => {
    if (wasteEntries.length === 0) {
      toast({
        title: "No Data to Export",
        description: "Add some waste entries first before exporting.",
        variant: "destructive",
      });
      return;
    }

    const exportData = {
      exportTimestamp: new Date().toISOString(),
      summary: {
        totalWasteProcessed: stats.totalWasteProcessed,
        wasteByType: stats.wasteByType,
        materialsProduced: stats.materialsProduced,
        astronautBenefits: stats.astronautBenefits,
      },
      wasteEntries: wasteEntries.map(entry => ({
        timestamp: entry.timestamp.toISOString(),
        wasteType: entry.type,
        quantity: entry.quantity,
      })),
    };

    const jsonContent = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `spacetrash-recycling-${format(new Date(), 'yyyy-MM-dd-HHmm')}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    toast({
      title: "Export Successful",
      description: "Recycling history has been downloaded as JSON.",
    });
  };

  const handleReset = async () => {
    try {
      await resetSimulation();
      toast({
        title: "Simulation Reset",
        description: "All waste and output data has been cleared.",
      });
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: "There was an error resetting the simulation.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {/* Export CSV Button */}
      <Button
        variant="outline"
        onClick={exportToCSV}
        disabled={wasteEntries.length === 0 || loading}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Export CSV
      </Button>

      {/* Export JSON Button */}
      <Button
        variant="outline"
        onClick={exportToJSON}
        disabled={wasteEntries.length === 0 || loading}
        className="flex items-center gap-2"
      >
        <FileText className="h-4 w-4" />
        Export JSON
      </Button>

      {/* Reset Button with Confirmation */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            disabled={wasteEntries.length === 0 || loading}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Simulation
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Simulation</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all waste entries and reset all statistics. 
              This action cannot be undone. Consider exporting your data first.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset} className="bg-destructive hover:bg-destructive/90">
              Reset All Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExportResetButtons;