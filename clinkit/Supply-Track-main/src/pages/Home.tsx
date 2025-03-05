import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Truck, Map, BarChart3, Leaf, Clock, Globe, ArrowRight, Trash2, Camera } from "lucide-react";
import GLBViewer from "../components/GLBViewer"; // Import the GLBViewer component

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-yellow-100 text-black">
      {/* Hero Section */}
      <div className="relative bg-yellow-300 border-b-8 border-black py-32">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <div className="p-4 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] bg-yellow-400">
              <Globe className="w-16 h-16 text-black" />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold sm:text-6xl md:text-7xl">
            CLINKIT
            <span className="block text-yellow-800"></span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl sm:text-2xl">
            Smart Discounts, Less Waste—Fresh Deals Every Day!🚀💡
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              to="/map"
              className="flex items-center px-8 py-4 text-lg font-bold border-4 border-black bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 shadow-[6px_6px_0px_rgba(0,0,0,1)]"
            >
              <Map className="w-5 h-5 mr-2" />
              Launch Interactive Map
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          {/* 3D Model Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6">Explore in 3D</h2>
            <div className="border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] bg-yellow-200 p-4">
              <GLBViewer />
            </div>
          </div>
        </div>
      </div>

      {/* ML Models Section */}
      <div className="py-24 bg-yellow-200 border-t-8 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold">AI-Powered Solutions</h2>
          <p className="mt-3 text-xl max-w-2xl mx-auto">
            Harness machine learning to optimize logistics
          </p>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <ModelCard
              title="Maintenance Predictor"
              description="Predict maintenance needs before they become issues"
              url="https://maintainence.streamlit.app/"
              icon={<Truck className="w-8 h-8" />}
            />
            <ModelCard
              title="Frequency Visualization"
              description="Visualize delivery patterns and optimize routes"
              url=""
              icon={<Map className="w-8 h-8" />}
            />
            <ModelCard
              title="Crew Management"
              description="AI-optimized scheduling for maximum efficiency"
              url=""
              icon={<Clock className="w-8 h-8" />}
            />
            <ModelCard
              title="Inventory Management"
              description="Smart inventory tracking and predictions"
              url=""
              icon={<BarChart3 className="w-8 h-8" />}
            />
            <ModelCard
              title="Algo for discounts"
              description="maxx discount management"
              url="https://waste-management-ai.streamlit.app/"
              icon={<Trash2 className="w-8 h-8" />}
            />
            <ModelCard
              title="Expiry Date Automation"
              description="Smart expiry tracking & discounts using image processing"
              url="https://expiry-date-ai.streamlit.app/"
              icon={<Camera className="w-8 h-8" />}
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-yellow-100 border-t-8 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold">Powerful Features</h2>
          <p className="mt-4 text-xl">Everything you need to manage modern logistics</p>
          <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <Feature icon={<Map className="w-8 h-8" />} title="3D Visualization" description="Interactive 3D map with real-time vehicle tracking." />
            <Feature icon={<BarChart3 className="w-8 h-8" />} title="Analytics Dashboard" description="Fleet performance and delivery metrics." />
            <Feature icon={<Clock className="w-8 h-8" />} title="Real-time Updates" description="Live tracking and instant notifications." />
            <Feature icon={<Leaf className="w-8 h-8" />} title="Sustainability Metrics" description="Optimize your carbon footprint and fuel efficiency." />
            <Feature icon={<Truck className="w-8 h-8" />} title="Fleet Management" description="Centralized control over vehicles and resources." />
            <Feature icon={<Globe className="w-8 h-8" />} title="Global Coverage" description="Worldwide tracking and management." />
          </div>
        </div>
      </div>
    </div>
  );
};

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-8 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] bg-yellow-300">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 border-4 border-black bg-yellow-400">
          {icon}
        </div>
        <h3 className="mt-6 text-xl font-bold">{title}</h3>
        <p className="mt-4">{description}</p>
      </div>
    </div>
  );
}

function ModelCard({ icon, title, description, url }: { icon: React.ReactNode; title: string; description: string; url: string }) {
  return (
    <button
      onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
      className="p-8 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] bg-yellow-400 transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 border-4 border-black bg-yellow-500">
          {icon}
        </div>
        <h3 className="mt-6 text-xl font-bold">{title}</h3>
        <p className="mt-4">{description}</p>
        <ArrowRight className="mt-6 w-6 h-6" />
      </div>
    </button>
  );
}

export default Home;
