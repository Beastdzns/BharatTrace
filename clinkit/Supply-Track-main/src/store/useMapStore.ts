import { create } from 'zustand';
import { VehicleData } from '../types/Vehicle';

interface MapStore {
  vehicles: VehicleData[];
  selectedVehicle: VehicleData | null;
  setSelectedVehicle: (vehicle: VehicleData | null) => void;
  updateVehicles: (vehicles: VehicleData[]) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  vehicles: [],
  selectedVehicle: null,
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
  updateVehicles: (vehicles) => set({ vehicles }),
}));