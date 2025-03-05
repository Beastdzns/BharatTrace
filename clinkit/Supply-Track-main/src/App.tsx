import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { MapView } from './pages/MapView';
import Dashboard from './pages/Dashboard';
import ManagementDashboard from './pages/Management';
import CarbonPrint from './pages/CarbonPrint';
import Home from './pages/Home';
import SetExpiry from "./pages/SetExpiry";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/management" element={<ManagementDashboard />} />
          <Route path="/carbon" element={<CarbonPrint />} />
          <Route path="/set-expiry" element={<SetExpiry />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;