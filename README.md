🚀 SpaceTrash Recycling Simulator
NASA Space Apps Challenge 2025 - Noida

Transform Mars mission waste into life-sustaining resources
An interactive recycling simulator that demonstrates how astronauts can convert space mission waste into essential survival materials — with a dual-mode operation to also showcase real-world Earth impact.

🌟 Features
🕐 Timeline of Waste Recycling

Real-time tracking of recycling actions

Line charts showing cumulative waste processed

Filters by waste type (Plastic, Metal, Textile, E-Waste)

Activity logs with timestamps

Persistent storage via Supabase

🛠️ Astronaut Resource Tracker

Visual inventory with icons & real-time counts

Conversion tracking (Filament → Tools, Metal → Construction Parts)

Progress bars for resource usage

Habitat integration for mission survival

🌍 Earth Impact Mode

Toggle between Mars and Earth simulation

Metrics: bottles saved, CO₂ avoided, water conserved

Impact visualization with graphs & icons

Educational sustainability awareness

🤖 AI-Based Waste Sorting

Upload waste images (JPG/PNG)

Simulated AI classification with confidence score

TensorFlow.js-style model integration

Suggestions for optimal recycling flow

👨‍🚀 Crew Survival Dashboard

Survival scores: Maintenance, Habitat Safety, Energy, Construction

Radial charts for mission progress

Alerts for critical shortages

Color-coded mission status

📊 Reset & Export

Export recycling history as CSV/JSON

Reset simulations with confirmation

Backup mission data

🎯 Mission Objectives
Mars Mission Mode

Convert waste into tools, insulation, energy, and construction materials

Ensure astronaut survival with efficient recycling

Track safety and mission readiness

Earth Impact Mode

Show real-world recycling benefits

Track emissions avoided, water conserved, and resources saved

Inspire awareness and promote circular economy

📊 Waste Conversion Rates
Waste Type	Conversion Rate	Output	Astronaut Benefit	Earth Impact
Plastic	50%	3D Printer Filament	5 Tools/kg	20 Bottles Saved
Metal	70%	Metal Sheets	1 Part/kg	2.5kg CO₂ Avoided
Textile	80%	Insulation	1 Panel/kg	2,700L Water Saved
E-Waste	30%	Metals + Syngas	10 Energy Units/kg	5 Devices Recycled
🛠️ Technology Stack
Frontend

React 18 + TypeScript

Vite for fast builds

TailwindCSS with Mars-inspired theme

Recharts for data visualization

Lucide Icons for UI

Backend

Supabase (PostgreSQL + Auth + Storage)

Database triggers for calculations

Row Level Security for protection

Libraries

React Router, React Hook Form, TanStack Query

Date-fns for time handling

Sonner for toast notifications

🌌 Design System
/* Mars Habitat Palette */
--mars-surface: 14 85% 8%;     
--mars-sunset: 14 100% 45%;    
--cosmic-blue: 220 100% 60%;   
--stellar-purple: 280 85% 55%; 
--space-void: 240 100% 3%;     


Glow + floating animations for interactivity

Smooth transitions for processing

Mission-status alerts with color codes

🚀 Quick Start
Prerequisites

Node.js 18+

Modern browser (Chrome/Firefox/Safari latest)

Installation
git clone https://github.com/Aayush9-spec/spacetrash_mars.git
cd spacetrash_mars
npm install
npm run dev

Environment

Supabase powers backend (DB + Auth + Storage).

Configure your project keys in .env.local.

🎮 How to Use

Simulator → Select waste type & enter kg → click Process Waste.

Dashboard → View analytics of waste recycled and outputs created.

Timeline → Review history of actions over mission duration.

Resources → Track inventory & astronaut benefits.

Survival Dashboard → Monitor crew readiness metrics.

Earth Impact Mode → Toggle to see global sustainability impact.

AI Sorting → Upload waste images for classification.

Export/Reset → Save or reset mission data.

🏆 NASA Space Apps Challenge
Categories

Space Technology Innovation

Sustainability & Earth Impact

Data Visualization & Education

Highlights

Dual-mode (Mars survival + Earth impact)

AI-powered waste classification

Gamified survival metrics

Comprehensive data tracking

📱 Mobile Ready

Responsive UI for all devices

Touch-optimized controls

PWA capabilities for offline use

🔒 Security

Supabase RLS (Row Level Security)

Input validation & sanitization

Secure file upload & error handling

Type-safe API interactions

🤝 Contributing

Fork the repo

Create a feature branch

Commit with semantic messages

Open a PR

Standards: TypeScript, ESLint, Prettier

📄 License

MIT License – Open source for NASA Space Apps Challenge 2025.

🎉 Acknowledgments

NASA Space Apps Challenge for the opportunity

Space research & sustainability experts for inspiration

Open source community for amazing tools

🌟 Demo & Resources

GitHub Repo: SpaceTrash Mars

Documentation: API Docs
