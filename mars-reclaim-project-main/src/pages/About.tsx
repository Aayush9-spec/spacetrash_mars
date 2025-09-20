import { Globe, Rocket, Recycle, Users, Target, Lightbulb } from 'lucide-react';
import BackgroundStars from '@/components/BackgroundStars';

const About = () => {
  const challenges = [
    {
      icon: <Target className="h-8 w-8 text-mars-sunset" />,
      title: "The Mars Mission Challenge",
      description: "A 3-year Mars mission generates 12,600 kg of waste. Without proper recycling, this becomes a critical survival problem for astronauts."
    },
    {
      icon: <Recycle className="h-8 w-8 text-cosmic-blue" />,
      title: "Waste-to-Resource Conversion",
      description: "Our simulator transforms plastic into 3D printer filament, metal into construction sheets, textiles into insulation, and e-waste into energy."
    },
    {
      icon: <Users className="h-8 w-8 text-status-green" />,
      title: "Astronaut Survival",
      description: "Recycled materials create essential tools, habitat insulation, construction parts, and energy systems that keep astronauts alive on Mars."
    }
  ];

  const earthApplications = [
    "AI-powered waste sorting systems for cities",
    "Sustainable manufacturing using recycled materials",
    "Circular economy models for zero-waste communities",
    "Advanced pyrolysis for electronic waste recovery",
    "Smart habitat systems for extreme environments"
  ];

  return (
    <div className="min-h-screen relative pt-20">
      <BackgroundStars />
      
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-orbitron font-bold mb-4 text-foreground">
            About the Mission
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding the critical importance of waste recycling for Mars missions and its applications for Earth sustainability.
          </p>
        </div>

        {/* Challenge Overview */}
        <section className="mb-16">
          <div className="habitat-card max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Rocket className="h-16 w-16 text-mars-sunset mx-auto mb-6 animate-glow" />
              <h2 className="text-3xl font-orbitron font-bold mb-4 text-foreground">
                NASA Space Apps Challenge 2025
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This simulator addresses the critical challenge of waste management in long-duration space missions. 
                With limited resources and no resupply missions, astronauts must transform waste into essential survival materials.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-orbitron font-bold text-mars-sunset mb-2">12,600 kg</div>
                <div className="text-muted-foreground">Total Mission Waste</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-orbitron font-bold text-cosmic-blue mb-2">3 Years</div>
                <div className="text-muted-foreground">Mission Duration</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-orbitron font-bold text-status-green mb-2">100%</div>
                <div className="text-muted-foreground">Recycling Target</div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Challenges */}
        <section className="mb-16">
          <h2 className="text-3xl font-orbitron font-bold text-center mb-12 text-foreground">
            Mission Critical Challenges
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <div key={index} className="habitat-card text-center group">
                <div className="flex justify-center mb-6 group-hover:animate-glow">
                  {challenge.icon}
                </div>
                <h3 className="text-xl font-orbitron font-semibold mb-4 text-foreground">
                  {challenge.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Conversion Process */}
        <section className="mb-16">
          <div className="habitat-card">
            <h2 className="text-3xl font-orbitron font-bold text-center mb-12 text-foreground">
              Waste Conversion Process
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-xl bg-space-deep/50">
                <div className="text-3xl mb-3">🔹</div>
                <div className="font-orbitron font-semibold text-foreground mb-2">Plastic</div>
                <div className="text-sm text-muted-foreground mb-3">Shredder → Filament</div>
                <div className="text-cosmic-blue font-bold">50% Efficiency</div>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-space-deep/50">
                <div className="text-3xl mb-3">⚙️</div>
                <div className="font-orbitron font-semibold text-foreground mb-2">Metal</div>
                <div className="text-sm text-muted-foreground mb-3">Furnace → Sheets</div>
                <div className="text-cosmic-blue font-bold">70% Efficiency</div>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-space-deep/50">
                <div className="text-3xl mb-3">🧵</div>
                <div className="font-orbitron font-semibold text-foreground mb-2">Textile</div>
                <div className="text-sm text-muted-foreground mb-3">Shredder → Insulation</div>
                <div className="text-cosmic-blue font-bold">80% Efficiency</div>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-space-deep/50">
                <div className="text-3xl mb-3">💾</div>
                <div className="font-orbitron font-semibold text-foreground mb-2">E-Waste</div>
                <div className="text-sm text-muted-foreground mb-3">Pyrolysis → Metals + Energy</div>
                <div className="text-cosmic-blue font-bold">30% Efficiency</div>
              </div>
            </div>
          </div>
        </section>

        {/* Earth Applications */}
        <section className="mb-16">
          <div className="habitat-card">
            <div className="text-center mb-8">
              <Globe className="h-12 w-12 text-status-green mx-auto mb-4" />
              <h2 className="text-3xl font-orbitron font-bold mb-4 text-foreground">
                Earth Applications
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Technologies developed for Mars waste management have direct applications for solving Earth's sustainability challenges.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-orbitron font-semibold mb-4 text-foreground">
                  Future Innovations
                </h3>
                <ul className="space-y-3">
                  {earthApplications.map((application, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-mars-sunset mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{application}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-space-deep/50 rounded-xl p-6">
                <h3 className="text-xl font-orbitron font-semibold mb-4 text-foreground">
                  Global Impact Potential
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-orbitron font-bold text-status-green mb-1">2.01B</div>
                    <div className="text-sm text-muted-foreground">Tons of waste generated annually on Earth</div>
                  </div>
                  <div>
                    <div className="text-2xl font-orbitron font-bold text-cosmic-blue mb-1">85%</div>
                    <div className="text-sm text-muted-foreground">Potential recycling rate with advanced systems</div>
                  </div>
                  <div>
                    <div className="text-2xl font-orbitron font-bold text-mars-sunset mb-1">50M</div>
                    <div className="text-sm text-muted-foreground">Tons of e-waste that could be recovered</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Information */}
        <section>
          <div className="habitat-card text-center">
            <h2 className="text-3xl font-orbitron font-bold mb-4 text-foreground">
              NASA Space Apps Challenge 2025
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Developed for the NASA Space Apps Challenge 2025 in Noida, India
            </p>
            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
              <div>Challenge: Waste Management</div>
              <div>•</div>
              <div>Location: Noida</div>
              <div>•</div>
              <div>Year: 2025</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;