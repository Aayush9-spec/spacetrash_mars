import { NavLink } from 'react-router-dom';
import { Home, Cpu, BarChart3, Info, Rocket, Clock, Shield } from 'lucide-react';

const Navigation = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/simulator', label: 'Simulator', icon: Cpu },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/timeline', label: 'Timeline', icon: Clock },
    { path: '/resources', label: 'Resources', icon: Rocket },
    { path: '/survival', label: 'Survival', icon: Shield },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <nav className="glass-panel fixed top-4 left-1/2 transform -translate-x-1/2 z-50 rounded-2xl px-6 py-3">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 mr-4">
          <Rocket className="h-6 w-6 text-mars-sunset animate-glow" />
          <span className="font-orbitron font-bold text-lg text-foreground">SpaceTrash</span>
        </div>
        
        <div className="flex gap-4">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                  isActive
                    ? 'bg-mars-sunset text-primary-foreground shadow-lg'
                    : 'text-foreground hover:bg-space-nebula hover:text-habitat-glass'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;