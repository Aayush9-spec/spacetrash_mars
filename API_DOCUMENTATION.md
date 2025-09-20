# SpaceTrash Recycling Simulator - API Documentation

## Overview
This document describes the backend services and database structure for the SpaceTrash Recycling Simulator, designed for the NASA Space Apps Challenge 2025.

## Database Schema

### Tables

#### `waste_entries`
Stores individual waste processing entries.

```sql
CREATE TABLE waste_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  waste_type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

#### `simulation_stats`
Stores aggregated simulation statistics and calculations.

```sql
CREATE TABLE simulation_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  total_waste_processed NUMERIC DEFAULT 0,
  waste_by_type JSONB DEFAULT '{}'::JSONB,
  materials_produced JSONB DEFAULT '{}'::JSONB,
  astronaut_benefits JSONB DEFAULT '{"energyUnits": 0, "toolsCreated": 0, "insulationPanels": 0, "constructionParts": 0}'::JSONB,
  earth_impact_data JSONB DEFAULT '{"bottlesSaved": 0, "co2Saved": 0, "waterSaved": 0, "electronicsSaved": 0}'::JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### Database Functions

#### `calculate_earth_impact()`
Calculates environmental impact metrics for Earth Impact Mode.

```sql
SELECT calculate_earth_impact(plastic_amount, metal_amount, textile_amount, ewaste_amount);
```

#### `process_waste_entry()`
Trigger function that automatically calculates and updates simulation statistics when new waste entries are added.

### Triggers

#### `trigger_process_waste`
Automatically executes after INSERT on `waste_entries` to update simulation statistics.

## Service Layer

### WasteService Methods

#### `addWaste(type: string, amount: number)`
Adds a new waste entry to the database. The database trigger automatically handles:
- Updating total waste processed
- Calculating materials produced based on conversion rates
- Computing astronaut benefits
- Calculating Earth impact metrics

**Parameters:**
- `type`: Waste type ('plastic', 'metal', 'textile', 'ewaste')
- `amount`: Amount in kilograms

**Returns:**
```typescript
{
  input: number,
  output: string,
  unit: string
}
```

#### `getDashboardData()`
Retrieves the latest simulation statistics.

**Returns:**
```typescript
{
  id: string,
  total_waste_processed: number,
  waste_by_type: Record<string, number>,
  materials_produced: Record<string, number>,
  astronaut_benefits: {
    toolsCreated: number,
    insulationPanels: number,
    constructionParts: number,
    energyUnits: number
  },
  earth_impact_data: {
    bottlesSaved: number,
    co2Saved: number,
    waterSaved: number,
    electronicsSaved: number
  },
  updated_at: string
}
```

#### `getWasteEntries()`
Retrieves all waste entries in descending order by creation date.

**Returns:**
```typescript
Array<{
  id: string,
  waste_type: string,
  amount: number,
  created_at: string
}>
```

#### `resetSimulation()`
Deletes all waste entries and resets simulation statistics.

## Waste Type Conversion Rules

### Plastic → Filament
- **Conversion Rate**: 50% (0.5 kg filament per 1 kg plastic)
- **Astronaut Benefit**: Tools (5 tools per kg filament)
- **Earth Impact**: 20 bottles saved per kg plastic

### Metal → Metal Sheets
- **Conversion Rate**: 70% (0.7 kg metal sheet per 1 kg metal)
- **Astronaut Benefit**: Construction parts (1 part per kg metal sheet)
- **Earth Impact**: 2.5 kg CO₂ emissions avoided per kg metal

### Textile → Insulation
- **Conversion Rate**: 80% (0.8 kg insulation per 1 kg textile)
- **Astronaut Benefit**: Habitat panels (1 panel per kg insulation)
- **Earth Impact**: 2,700 liters water saved per kg textile

### E-Waste → Metals + Syngas
- **Conversion Rate**: 30% (0.3 kg metals+syngas per 1 kg e-waste)
- **Astronaut Benefit**: Energy units (10 units per kg metals+syngas)
- **Earth Impact**: 5 electronic items recycled per kg e-waste

## Features Implemented

### 1. Timeline of Waste Recycling ✅
- **Component**: `src/pages/Timeline.tsx`
- **Features**: Line charts, filtering by waste type, historical data
- **Data Source**: `waste_entries` table with timestamp tracking

### 2. Astronaut Resource Tracker ✅
- **Component**: `src/pages/ResourceTracker.tsx`
- **Features**: Real-time resource tracking, usage monitoring
- **Calculations**: Automatic conversion from materials to resources

### 3. Earth Impact Mode ✅
- **Component**: `src/components/EarthImpactToggle.tsx`
- **Features**: Toggle between Mars mission and Earth impact views
- **Metrics**: Bottles saved, CO₂ avoided, water conserved, electronics recycled

### 4. AI-Based Waste Sorting Simulation ✅
- **Component**: `src/components/AIWasteSorting.tsx`
- **Features**: Image upload, simulated AI classification, confidence scoring
- **Technology**: Simulated TensorFlow.js-style predictions

### 5. Crew Survival Dashboard ✅
- **Component**: `src/pages/SurvivalDashboard.tsx`
- **Features**: Survival scoring, alerts, progress tracking
- **Metrics**: Maintenance, habitat safety, energy backup, construction readiness

### 6. Reset & Export Features ✅
- **Component**: `src/components/ExportResetButtons.tsx`
- **Features**: CSV/JSON export, simulation reset with confirmation
- **Data**: Complete recycling history with timestamps

## Security Features

- **Row Level Security (RLS)**: Enabled on all tables
- **Function Security**: All database functions use `SECURITY DEFINER` with proper search paths
- **Input Validation**: Type checking and bounds validation on all inputs
- **Error Handling**: Comprehensive error handling with user-friendly messages

## Performance Optimizations

- **Database Indexes**: Optimized queries with proper indexing
- **Trigger-Based Calculations**: Real-time updates without client-side computation
- **Efficient Queries**: Single-query operations for complex data retrieval
- **Lazy Loading**: Components load data as needed

## Real-time Features

- **Automatic Updates**: Statistics update immediately when waste is processed
- **Live Charts**: All visualizations reflect current data state
- **Instant Feedback**: Processing animations and toast notifications

## Browser Compatibility

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Support**: Responsive design for tablet and mobile devices
- **Progressive Web App**: Can be installed on mobile devices

## Environment Variables

The application uses Supabase for backend services with the following configuration:
- **Supabase URL**: Configured automatically
- **Anon Key**: Public key for database access
- **Service Role**: For admin operations (migrations)

## Deployment

The application is configured for automatic deployment on Lovable with:
- **Frontend**: React + Vite + TypeScript
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Styling**: Tailwind CSS with Mars-themed design system
- **Icons**: Lucide React icon library
- **Charts**: Recharts for data visualization

