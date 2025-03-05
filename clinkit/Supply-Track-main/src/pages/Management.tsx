import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowRight, Box, Car, RefreshCw, Search, CloudSun, MapPin } from "lucide-react";

const inventoryData = [
  { name: "Cotton", stock: 100, state: "Shipped", location: "Delhi" },
  { name: "Steel", stock: 150, state: "Received", location: "Mumbai" },
  { name: "Coal", stock: 75, state: "Manufactured", location: "Bengaluru" },
  { name: "Steel", stock: 120, state: "Delivered", location: "Kolkata" },
  { name: "Paper", stock: 60, state: "Created", location: "Chennai" }
];

const staticWeatherData = {
  Delhi: { temperature: 18, description: "Clear sky", humidity: 60 },
  Mumbai: { temperature: 22, description: "Few clouds", humidity: 80 },
  Bengaluru: { temperature: 23, description: "Light rain", humidity: 85 },
  Kolkata: { temperature: 21, description: "Scattered clouds", humidity: 70 },
  Chennai: { temperature: 27, description: "Sunny", humidity: 65 }
};

const navItems = [
  { name: "Inventory Overview", icon: Box },
  { name: "Create Item", icon: ArrowRight },
  { name: "Transfer Ownership", icon: Car },
  { name: "Update Item State", icon: RefreshCw },
  { name: "View Item Details", icon: Search }
];

function ManagementDashboard() {
  const [section, setSection] = useState("Inventory Overview");
  const [selectedCity, setSelectedCity] = useState("Delhi");

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gray-700">
              <h2 className="text-xl font-bold text-white">Dashboard</h2>
            </div>
            <div className="p-4">
              {navItems.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  onClick={() => setSection(name)}
                  className={`w-full mb-2 p-3 rounded-lg text-left flex items-center gap-3 transition-all
                    ${section === name
                      ? "bg-gray-600 text-white font-semibold"
                      : "hover:bg-gray-700 text-gray-300"}`}
                >
                  <Icon size={18} />
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {section === "Inventory Overview" && (
              <div className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                  <h2 className="text-2xl font-bold mb-6 text-gray-100">Inventory Stock Overview</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={inventoryData}>
                      <XAxis dataKey="name" stroke="#ddd" />
                      <YAxis stroke="#ddd" />
                      <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
                      <Legend wrapperStyle={{ color: "#ddd" }} />
                      <Bar dataKey="stock" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <CloudSun className="text-yellow-400" />
                    <h2 className="text-xl font-bold text-gray-100">Weather Information</h2>
                  </div>
                  <select
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.keys(staticWeatherData).map((city) => (
                      <option key={city}>{city}</option>
                    ))}
                  </select>
                  <div className="bg-gray-700 p-4 rounded-lg mt-4">
                    <p className="text-lg">{`${selectedCity}: ${staticWeatherData[selectedCity].temperature}°C`}</p>
                    <p>{`${staticWeatherData[selectedCity].description}`}</p>
                    <p>{`Humidity: ${staticWeatherData[selectedCity].humidity}%`}</p>
                  </div>
                </div>
              </div>
            )}

{section === "Create Item" && (
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-100">Create New Item</h2>
                <div className="space-y-4">
                  <input className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg" placeholder="Item Name" />
                  <textarea className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg h-32" placeholder="Item Details" />
                  <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">Create Item</button>
                </div>
              </div>
            )}

            {section === "Transfer Ownership" && (
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-100">Transfer Ownership</h2>
                <div className="space-y-4">
                  <input className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg" placeholder="Item ID" type="number" />
                  <input className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg" placeholder="New Owner Address" />
                  <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">Transfer Ownership</button>
                </div>
              </div>
            )}

            {section === "Update Item State" && (
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-100">Update Item State</h2>
                <div className="space-y-4">
                  <input className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg" placeholder="Item ID" type="number" />
                  <select className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg">
                    {["Created", "Manufactured", "Shipped", "Received", "Delivered"].map((state) => (
                      <option key={state}>{state}</option>
                    ))}
                  </select>
                  <input className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg" placeholder="Location" />
                  <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">Update State</button>
                </div>
              </div>
            )}

{section === "View Item Details" && (
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-100">View Item Details</h2>
                <div className="space-y-4">
                  <input className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg" placeholder="Item ID" type="number" />
                  <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">View Details</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagementDashboard;
