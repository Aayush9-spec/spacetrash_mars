import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useSimulationContext } from '@/context/SimulationContext';
import { Upload, Camera, Brain, Loader2 } from 'lucide-react';

interface PredictionResult {
  wasteType: string;
  confidence: number;
  suggestions: string[];
}

const AIWasteSorting = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addWaste } = useSimulationContext();
  const { toast } = useToast();

  // Simulated AI prediction (in a real app, this would call TensorFlow.js)
  const simulateAIPrediction = (imageFile: File): Promise<PredictionResult> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate AI analysis based on filename or random for demo
        const filename = imageFile.name.toLowerCase();
        let wasteType = 'plastic';
        let confidence = 0.85;
        
        if (filename.includes('metal') || filename.includes('can') || filename.includes('aluminum')) {
          wasteType = 'metal';
          confidence = 0.92;
        } else if (filename.includes('textile') || filename.includes('fabric') || filename.includes('cloth')) {
          wasteType = 'textile';
          confidence = 0.88;
        } else if (filename.includes('electronic') || filename.includes('phone') || filename.includes('computer')) {
          wasteType = 'ewaste';
          confidence = 0.91;
        } else {
          // Add some randomness for demo
          const types = ['plastic', 'metal', 'textile', 'ewaste'];
          wasteType = types[Math.floor(Math.random() * types.length)];
          confidence = 0.75 + Math.random() * 0.2;
        }

        const suggestions = {
          plastic: ['Remove any caps or labels', 'Rinse if food contaminated', 'Separate by plastic type if possible'],
          metal: ['Remove any plastic coating', 'Separate ferrous from non-ferrous', 'Clean of any debris'],
          textile: ['Ensure items are clean and dry', 'Remove any non-textile components', 'Separate by material type'],
          ewaste: ['Remove batteries safely', 'Separate components if possible', 'Handle with care due to precious metals']
        };

        resolve({
          wasteType,
          confidence: Math.round(confidence * 100) / 100,
          suggestions: suggestions[wasteType as keyof typeof suggestions] || []
        });
      }, 2000); // Simulate processing time
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedImage(file);
      setPrediction(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeWaste = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      const result = await simulateAIPrediction(selectedImage);
      setPrediction(result);
      
      toast({
        title: "Analysis Complete",
        description: `Detected ${result.wasteType} with ${(result.confidence * 100).toFixed(0)}% confidence`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const processDetectedWaste = async () => {
    if (!prediction) return;

    try {
      // Default to 1kg for detected waste
      await addWaste(prediction.wasteType, 1);
      
      toast({
        title: "Waste Processed",
        description: `Successfully added 1kg of ${prediction.wasteType} to the recycling system`,
      });

      // Reset for next analysis
      setSelectedImage(null);
      setImagePreview(null);
      setPrediction(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast({
        title: "Processing Failed",
        description: "Failed to add waste to the system. Please try again.",
        variant: "destructive",
      });
    }
  };

  const reset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setPrediction(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getWasteTypeIcon = (type: string) => {
    switch (type) {
      case 'plastic': return '🔹';
      case 'metal': return '⚙️';
      case 'textile': return '🧵';
      case 'ewaste': return '💾';
      default: return '🗑️';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'status-good';
    if (confidence >= 0.6) return 'status-warning';
    return 'status-danger';
  };

  return (
    <Card className="habitat-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-cosmic-blue" />
          AI Waste Sorting Simulation
        </CardTitle>
        <CardDescription>
          Upload an image of waste and let AI classify it for automatic processing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Image Upload */}
        <div className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
              imagePreview ? 'border-mars-sunset' : 'border-muted hover:border-mars-sunset/50'
            }`}
          >
            {imagePreview ? (
              <div className="space-y-4">
                <img
                  src={imagePreview}
                  alt="Uploaded waste"
                  className="max-w-full max-h-64 mx-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-muted-foreground">
                  {selectedImage?.name}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-lg font-medium">Upload Waste Image</p>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG up to 5MB
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="flex-1"
            >
              <Camera className="h-4 w-4 mr-2" />
              {imagePreview ? 'Change Image' : 'Select Image'}
            </Button>
            {imagePreview && (
              <Button variant="ghost" onClick={reset}>
                Clear
              </Button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Analysis Button */}
        {selectedImage && !prediction && (
          <Button
            onClick={analyzeWaste}
            disabled={isAnalyzing}
            className="w-full btn-space"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Analyze Waste Type
              </>
            )}
          </Button>
        )}

        {/* Analysis Results */}
        {prediction && (
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">Detection Results</h4>
              <Badge className={getConfidenceColor(prediction.confidence)}>
                {(prediction.confidence * 100).toFixed(0)}% confidence
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getWasteTypeIcon(prediction.wasteType)}</span>
                <div>
                  <p className="font-medium capitalize">{prediction.wasteType} Waste</p>
                  <p className="text-sm text-muted-foreground">
                    AI Classification Result
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Confidence Score</p>
                <Progress value={prediction.confidence * 100} className="h-2" />
              </div>

              {prediction.suggestions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Processing Suggestions:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {prediction.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span>•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={processDetectedWaste}
                className="flex-1 btn-mars"
              >
                Process as {prediction.wasteType} (1kg)
              </Button>
              <Button variant="outline" onClick={reset}>
                Try Another
              </Button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
          <p className="font-medium mb-1">How it works:</p>
          <p>
            Upload a clear image of waste material. The AI will analyze it and suggest the most likely waste type. 
            Review the confidence score and suggestions before processing.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIWasteSorting;