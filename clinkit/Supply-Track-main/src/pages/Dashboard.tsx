import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Navbar: React.FC = () => (
  <nav className="bg-gray-900 text-white p-4 shadow-md">
    <div className="text-xl font-bold">Truck Supply Chain Dashboard</div>
  </nav>
);

interface StatisticsCardProps {
  title: string;
  value: number;
  bgColor: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, value, bgColor }) => (
  <div className={`p-4 rounded-2xl shadow-md ${bgColor} text-white text-center`}>
    <div className="text-2xl font-semibold">{value}</div>
    <div className="text-lg">{title}</div>
  </div>
);

interface CardProps {
  children: React.ReactNode;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, title }) => (
  <div className="bg-gray-800 rounded-2xl shadow-md p-4 text-white">
    {title && <div className="text-lg font-bold mb-2">{title}</div>}
    {children}
  </div>
);

const Dashboard: React.FC = () => {
  const chartData = {
    labels: ["Available", "In Transit", "Under Maintenance"],
    datasets: [
      {
        label: "Trucks",
        data: [20, 10, 5],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const warehouses = [
    { location: "Delhi", trucks: 15 },
    { location: "Mumbai", trucks: 10 },
    { location: "Chennai", trucks: 8 },
  ];

  const routes = [
    { from: "Delhi", to: "Chandigarh", trucks: 5 },
    { from: "Mumbai", to: "Pune", trucks: 3 },
    { from: "Chennai", to: "Bangalore", trucks: 4 },
  ];

  return (
    <div className="bg-gray-900 px-8 min-h-screen text-gray-200">
      <Navbar />

      <div className="p-6 space-y-6 ">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatisticsCard title="Available Trucks" value={20} bgColor="bg-green-600" />
          <StatisticsCard title="Trucks in Transit" value={10} bgColor="bg-yellow-600" />
          <StatisticsCard title="Trucks Under Maintenance" value={5} bgColor="bg-red-600" />
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart */}
          <Card title="Truck Statistics">
            <Bar data={chartData} options={chartOptions} />
          </Card>

          {/* Weather Card */}
          <Card title="Weather">
            <div>
              <div className="text-lg">Location: Delhi</div>
              <div className="text-lg">Temperature: 16°C</div>
              <div className="text-lg">Humidity: 60%</div>
              <div className="text-lg">Conditions: Foggy</div>
            </div>
          </Card>
        </div>

        {/* Warehouse Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warehouses.map((warehouse) => (
            <Card key={warehouse.location} title={warehouse.location}>
              <div className="text-lg">Trucks: {warehouse.trucks}</div>
            </Card>
          ))}
        </div>

        {/* Routes Table */}
        <Card title="Routes">
          <table className="table-auto w-full text-left">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2">From</th>
                <th className="p-2">To</th>
                <th className="p-2">Trucks</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route, index) => (
                <tr key={index} className="odd:bg-gray-800 even:bg-gray-700">
                  <td className="p-2">{route.from}</td>
                  <td className="p-2">{route.to}</td>
                  <td className="p-2">{route.trucks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
