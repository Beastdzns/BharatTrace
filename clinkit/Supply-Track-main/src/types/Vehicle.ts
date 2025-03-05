export interface VehicleData {
  id: string;
  position: [number, number, number];
  material: string;
  destination: string;
  eta: string;
  health: number;
  emissions: number;
  fuelEfficiency: number;
  weather: {
    temperature: number;
    condition: string;
  };
}