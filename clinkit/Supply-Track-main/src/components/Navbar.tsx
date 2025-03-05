import { Link, useLocation } from 'react-router-dom';
import { Truck, Map, Home, Settings, BarChart3 } from 'lucide-react';

export function Navbar() {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;
    return (
        <nav className="bg-emerald-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <Truck className="w-8 h-8 text-emerald-400" />
                        <span className="font-bold text-xl">Clinkit</span>
                    </Link>

                    <div className="flex space-x-4">
                        <NavItem to="/" icon={<Home className="w-4 h-4" />} label="Home" isActive={isActive('/')} />
                        <NavItem to="/map" icon={<Map className="w-4 h-4" />} label="Interactive Map" isActive={isActive('/map')} />
                        <NavItem to="/dashboard" icon={<BarChart3 className="w-4 h-4" />} label="Dashboard" isActive={isActive('/dashboard')} />
                        <NavItem to="/management" icon={<Settings className="w-4 h-4" />} label="Management" isActive={isActive('/management')} />
                        <NavItem to="/carbon" icon={<Settings className="w-4 h-4" />} label="Carbon Foot Print" isActive={isActive('/carbon')} />
                        <NavItem to="/set-expiry" icon={<Settings className="w-4 h-4" />} label="Set Expiry" isActive={isActive('/set-expiry')} />

                    </div>
                </div>
            </div>
        </nav>
    );
}

function NavItem({ to, icon, label, isActive }: { to: string; icon: React.ReactNode; label: string; isActive: boolean }) {
    return (
        <Link
            to={to}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-emerald-700 text-white' : 'hover:bg-emerald-800 text-gray-300'}`}
        >
            {icon}
            <span>{label}</span>
        </Link>
    );
}
