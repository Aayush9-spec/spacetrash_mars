import { Link } from 'react-router-dom';
import { Rocket, Target, Users, Zap } from 'lucide-react';
import BackgroundStars from '@/components/BackgroundStars';

const Home = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8 text-mars-sunset" />,
      title: "Mission Critical",
      description: "Transform 12,600 kg of waste into life-sustaining resources for Mars missions"
    },
    {
      icon: <Zap className="h-8 w-8 text-cosmic-blue" />,
      title: "Smart Processing",
      description: "Advanced recycling simulation with real-time conversion tracking"
    },
    {
      icon: <Users className="h-8 w-8 text-status-green" />,
      title: "Astronaut Survival",
      description: "Generate tools, insulation, construction materials, and energy for crew"
    }
  ];

  return (
    <div className="min-h-screen relative pt-20">
      <BackgroundStars />
      
      <main className="relative z-10 container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center py-20">
          <div className="animate-float">
            <h1 className="text-6xl md:text-8xl font-orbitron font-bold mb-6 bg-gradient-to-r from-mars-sunset to-cosmic-blue bg-clip-text text-transparent">
              SpaceTrash
            </h1>
            <h2 className="text-2xl md:text-4xl font-orbitron font-semibold mb-8 text-foreground">
              Recycling Simulator
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform Mars mission waste into life-sustaining resources. 
            <span className="text-mars-sunset font-semibold"> Turn trash into treasure </span>
            for astronaut survival in the ultimate frontier.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/simulator" className="btn-mars flex items-center gap-3 text-lg px-8 py-4">
              <Rocket className="h-6 w-6" />
              Start Simulation
            </Link>
            
            <Link to="/about" className="btn-space flex items-center gap-3 text-lg px-8 py-4">
              <Target className="h-6 w-6" />
              Learn More
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <h3 className="text-4xl font-orbitron font-bold text-center mb-16 text-foreground">
            Mission Features
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="habitat-card text-center group">
                <div className="flex justify-center mb-6 group-hover:animate-glow">
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-orbitron font-semibold mb-4 text-foreground">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Challenge Stats */}
        <section className="py-20">
          <div className="habitat-card max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-orbitron font-bold mb-8 text-foreground">
              Mars Mission Challenge
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border-l-4 border-mars-sunset pl-6">
                <div className="text-4xl font-orbitron font-bold text-mars-sunset mb-2">
                  12,600 kg
                </div>
                <div className="text-muted-foreground">Total Mission Waste</div>
              </div>
              
              <div className="border-l-4 border-cosmic-blue pl-6">
                <div className="text-4xl font-orbitron font-bold text-cosmic-blue mb-2">
                  3 Years
                </div>
                <div className="text-muted-foreground">Mission Duration</div>
              </div>
              
              <div className="border-l-4 border-status-green pl-6">
                <div className="text-4xl font-orbitron font-bold text-status-green mb-2">
                  4 Types
                </div>
                <div className="text-muted-foreground">Waste Categories</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;