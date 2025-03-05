import React from 'react';
import { useMapStore } from '../../store/useMapStore';
import { Truck, Thermometer, Clock, Battery, Leaf, User, Info } from 'lucide-react';

export function VehicleInfo() {
  const selectedVehicle = useMapStore((state) => state.selectedVehicle);

  if (!selectedVehicle) return null;

  return (
    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-xl w-80">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Truck className="w-6 h-6" />
        Vehicle Details
      </h2>

      <div className="space-y-4">
        {/* Registration Number */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gray-100 rounded-full">
            <Info className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Registration Number</p>
            <p className="font-medium">{selectedVehicle.registration}</p>
          </div>
        </div>

        {/* Driver Details */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-100 rounded-full">
            <User className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Driver</p>
            <p className="font-medium">{selectedVehicle.driver.name}</p>
            <p className="text-sm text-gray-500">{selectedVehicle.driver.contact}</p>
          </div>
        </div>

        {/* ETA */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-full">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">ETA</p>
            <p className="font-medium">{selectedVehicle.eta}</p>
          </div>
        </div>

        {/* Weather */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-yellow-100 rounded-full">
            <Thermometer className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Weather</p>
            <p className="font-medium">
              {selectedVehicle.weather.temperature}°C, {selectedVehicle.weather.condition}
            </p>
          </div>
        </div>

        {/* Vehicle Health */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-green-100 rounded-full">
            <Battery className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Vehicle Health</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${selectedVehicle.health}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Sustainability */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-100 rounded-full">
            <Leaf className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Sustainability</p>
            <p className="font-medium">
              {selectedVehicle.emissions} CO₂ | {selectedVehicle.fuelEfficiency} km/l
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
