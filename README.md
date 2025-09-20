# 🚀 SpaceTrash Recycling Simulator
### NASA Space Apps Challenge 2025 - Noida

> **Transform Mars mission waste into life-sustaining resources**

A cutting-edge recycling simulator that demonstrates how astronauts can convert space mission waste into essential survival resources, with dual-mode operation for both Mars missions and Earth environmental impact analysis.

![SpaceTrash Banner](https://images.unsplash.com/photo-1564053844-e1aa2c0e8c0d?w=1200&h=400&fit=crop)

## 🌟 Features Overview

### 🕐 **1. Timeline of Waste Recycling**
- **Real-time tracking** of recycling actions with timestamps
- **Interactive line charts** showing cumulative waste processed over time
- **Filter by waste type** (Plastic, Metal, Textile, E-Waste)
- **Historical analysis** with detailed activity logs
- **Data persistence** with Supabase backend

### 🛠️ **2. Astronaut Resource Tracker**
- **Visual inventory system** with icons and real-time counts
- **Conversion tracking**: Filament → Tools, Metal → Construction Parts
- **Resource utilization** monitoring with progress bars
- **Capacity management** with usage alerts
- **Mars habitat integration** for survival planning

### 🌍 **3. Earth Impact Mode**
- **Dual-mode toggle** between Mars Mission and Earth Impact
- **Environmental metrics**: Bottles saved, CO₂ avoided, Water conserved
- **Impact visualization** with icons and graphs
- **Real-time calculations** based on waste processed
- **Educational component** for sustainability awareness

### 🤖 **4. AI-Based Waste Sorting Simulation**
- **Image upload** for waste classification (JPG/PNG support)
- **Simulated AI prediction** with confidence scoring
- **TensorFlow.js-style** classification simulation
- **Processing suggestions** for optimal recycling
- **Automatic integration** with main recycling system

### 👨‍🚀 **5. Crew Survival Dashboard**
- **Survival scoring system** with four key metrics
- **Progress tracking**: Maintenance, Habitat Safety, Energy, Construction
- **Alert system** for critical resource shortages
- **Radial charts** for visual progress monitoring
- **Mission status indicators** with color-coded alerts

### 📊 **6. Reset & Export Features**
- **CSV export** with complete recycling history
- **JSON export** for technical analysis
- **Simulation reset** with confirmation dialogs
- **Data management** with timestamp tracking
- **Backup functionality** for mission planning

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+)

### Installation
```bash
# Clone the repository
git clone https://github.com/your-team/spacetrash-simulator.git
cd spacetrash-simulator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup
The app uses Supabase for backend services. Configuration is automatic through integrated setup.

## 🎮 How to Use

### 1. **Start Recycling**
- Navigate to the **Simulator** page
- Select waste type (Plastic, Metal, Textile, E-Waste)
- Enter quantity in kilograms
- Click "Process Waste" to convert to resources

### 2. **Track Progress**
- Visit **Dashboard** for overview analytics
- Check **Timeline** for historical data
- Monitor **Resources** for inventory status
- Review **Survival** dashboard for mission readiness

### 3. **Switch Modes**
- Use the **Earth Impact Toggle** to switch between:
  - **Mars Mission Mode**: Focus on astronaut survival
  - **Earth Impact Mode**: Environmental sustainability metrics

### 4. **AI Waste Sorting**
- Upload waste images in the **Simulator**
- Get AI-powered classification suggestions
- Review confidence scores and processing tips
- Automatically add detected waste to system

### 5. **Export Data**
- Use **Export** buttons for CSV or JSON format
- Download complete recycling history
- Reset simulation when starting new missions

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** with custom Mars-themed design system
- **Lucide React** for beautiful space-themed icons
- **Recharts** for interactive data visualizations

### Backend
- **Supabase** for database and real-time features
- **PostgreSQL** with advanced JSONB storage
- **Database triggers** for automatic calculations
- **Row Level Security** for data protection

### Key Libraries
- **React Router** for navigation
- **React Hook Form** for form management
- **Date-fns** for time handling
- **Sonner** for toast notifications
- **TanStack Query** for data fetching

## 🌌 Design System

### Mars Habitat Theme
```css
/* Color Palette */
--mars-surface: 14 85% 8%     /* Deep reddish brown */
--mars-sunset: 14 100% 45%    /* Bright orange-red */
--cosmic-blue: 220 100% 60%   /* Deep space blue */
--stellar-purple: 280 85% 55% /* Nebula purple */
--space-void: 240 100% 3%     /* Deep space black */
```

### Animation System
- **Glow effects** for interactive elements
- **Floating animations** for visual appeal
- **Smooth transitions** for professional feel
- **Loading animations** for processing feedback

## 📊 Waste Conversion Rates

| Waste Type | Conversion Rate | Output Material | Astronaut Benefit | Earth Impact |
|------------|----------------|-----------------|-------------------|--------------|
| **Plastic** | 50% | 3D Printer Filament | 5 Tools per kg | 20 Bottles Saved |
| **Metal** | 70% | Metal Sheets | 1 Construction Part per kg | 2.5kg CO₂ Avoided |
| **Textile** | 80% | Insulation Material | 1 Habitat Panel per kg | 2,700L Water Saved |
| **E-Waste** | 30% | Metals + Syngas | 10 Energy Units per kg | 5 Electronics Recycled |

## 🎯 Mission Objectives

### Mars Mission Mode
- **Survival Focus**: Convert waste to essential tools and materials
- **Resource Management**: Track inventory for long-term mission success
- **Habitat Safety**: Monitor insulation and construction readiness
- **Energy Security**: Ensure backup power through waste recycling

### Earth Impact Mode
- **Environmental Awareness**: Show real-world recycling benefits
- **Sustainability Education**: Demonstrate waste reduction impact
- **Conservation Metrics**: Track water, emissions, and resource savings
- **Educational Outreach**: Inspire environmental responsibility

## 🏆 NASA Space Apps Challenge

### Challenge Categories
- **Space Technology Innovation**
- **Sustainability & Environmental Impact**
- **Educational Technology**
- **Data Visualization & Analysis**

### Innovation Highlights
- **Dual-mode operation** for space and Earth applications
- **Real-time AI simulation** for waste classification
- **Comprehensive data tracking** with timeline analysis
- **Gamified survival metrics** for engagement
- **Professional-grade data export** for research

## 🚀 Deployment

The application is optimized for deployment on Lovable with:
- **Automatic builds** from GitHub
- **Integrated Supabase** backend
- **Real-time preview** during development
- **Mobile-responsive** design

### Custom Domain Support
Configure your custom domain in Lovable settings for production deployment.

## 📱 Mobile Support

- **Responsive design** works on all screen sizes
- **Touch-optimized** interface for tablets
- **Progressive Web App** capabilities
- **Offline functionality** for core features

## 🔒 Security Features

- **Row Level Security** on all database tables
- **Input validation** and sanitization
- **Secure file upload** handling
- **Error boundary** protection
- **Type-safe** API interactions

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Standards
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for formatting
- **Semantic commits** for changelog

## 📄 License

This project is created for the NASA Space Apps Challenge 2025 and is open source under the MIT License.

## 🎉 Acknowledgments

- **NASA Space Apps Challenge** for the inspiring challenge
- **Space exploration community** for technical guidance
- **Environmental sustainability experts** for impact calculations
- **Open source community** for amazing tools and libraries

---

## 🚀 Ready to Transform Space Waste?

**[Launch Simulator →]

*Built with 💫 for astronauts and Earth's future*

---

### Team Contact
- **Challenge**: NASA Space Apps Challenge 2025 Noida
- **Category**: Space Technology & Sustainability
- **Demo**: 
- **Documentation**: [API Docs](./API_DOCUMENTATION.md)
