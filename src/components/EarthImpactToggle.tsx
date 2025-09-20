import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Earth, Rocket } from 'lucide-react';

interface EarthImpactContextType {
  isEarthMode: boolean;
  toggleMode: () => void;
}

const EarthImpactContext = createContext<EarthImpactContextType | undefined>(undefined);

export const useEarthImpact = () => {
  const context = useContext(EarthImpactContext);
  if (!context) {
    throw new Error('useEarthImpact must be used within an EarthImpactProvider');
  }
  return context;
};

interface EarthImpactProviderProps {
  children: ReactNode;
}

export const EarthImpactProvider: React.FC<EarthImpactProviderProps> = ({ children }) => {
  const [isEarthMode, setIsEarthMode] = useState(false);

  const toggleMode = () => {
    setIsEarthMode(!isEarthMode);
  };

  return (
    <EarthImpactContext.Provider value={{ isEarthMode, toggleMode }}>
      {children}
    </EarthImpactContext.Provider>
  );
};

const EarthImpactToggle = () => {
  const { isEarthMode, toggleMode } = useEarthImpact();

  return (
    <div className="flex items-center space-x-3 p-3 glass-panel rounded-xl">
      <div className="flex items-center gap-2">
        <Rocket className={`h-5 w-5 transition-colors ${!isEarthMode ? 'text-mars-sunset' : 'text-muted-foreground'}`} />
        <Label htmlFor="earth-mode" className="text-sm font-medium cursor-pointer">
          Mars Mission
        </Label>
      </div>
      
      <Switch
        id="earth-mode"
        checked={isEarthMode}
        onCheckedChange={toggleMode}
        className="data-[state=checked]:bg-status-green"
      />
      
      <div className="flex items-center gap-2">
        <Label htmlFor="earth-mode" className="text-sm font-medium cursor-pointer">
          Earth Impact
        </Label>
        <Earth className={`h-5 w-5 transition-colors ${isEarthMode ? 'text-status-green' : 'text-muted-foreground'}`} />
      </div>
    </div>
  );
};

export default EarthImpactToggle;