import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SimulationProvider } from "@/context/SimulationContext";
import { EarthImpactProvider } from "@/components/EarthImpactToggle";
import Navigation from "@/components/Navigation";
import Home from "./pages/Home";
import Simulator from "./pages/Simulator";
import Dashboard from "./pages/Dashboard";
import Timeline from "./pages/Timeline";
import ResourceTracker from "./pages/ResourceTracker";
import SurvivalDashboard from "./pages/SurvivalDashboard";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <EarthImpactProvider>
        <SimulationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/resources" element={<ResourceTracker />} />
              <Route path="/survival" element={<SurvivalDashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SimulationProvider>
      </EarthImpactProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
