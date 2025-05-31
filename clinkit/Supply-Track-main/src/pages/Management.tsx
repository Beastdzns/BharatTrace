import React, { useState, useEffect } from 'react';
import {
    Home,
    Factory,
    Truck,
    ClipboardList,
} from "lucide-react"; // More relevant icons

// Item interface (renamed and expanded)
interface ProductSupplyChain {
    id: string; // Unique ID for the entire supply chain of a product
    name: string; // Product name (e.g., "Onions (Nashik)")

    // Farmer Details
    farmer: {
        quantity: number; // in Quintals
        productionDate: string;
        farmLocation: string;
        harvestedBy: string;
        notes?: string;
        logDate: string;
    };

    // Processor Details (Optional, as not all items are processed)
    processor?: {
        quantity: number;
        processingDate: string;
        processedBy: string;
        processingLocation: string;
        notes?: string;
        logDate: string;
    };

    // Distributor Details
    distributor?: {
        quantity: number;
        distributionDate: string;
        distributedBy: string;
        distributionHub: string;
        notes?: string;
        logDate: string;
    };

    // Retailer Details
    retailer?: {
        quantity: number;
        retailDate: string;
        retailerName: string;
        price: string;
        notes?: string;
        logDate: string;
    };
}

const navItems = [
    { name: "Dashboard", icon: Home, section: "Dashboard" },
    { name: "Farmer Entry", icon: Home, section: "Farmer" },
    { name: "Processor Entry", icon: Factory, section: "Processor" },
    { name: "Distributor Entry", icon: Truck, section: "Distributor" },
    { name: "Retailer Entry", icon: Home, section: "Retailer" },
];

const ProductSupplyChainSystem: React.FC = () => {
    const [supplyChainData, setSupplyChainData] = useState<ProductSupplyChain[]>([]);
    const [activeSection, setActiveSection] = useState<string>('Dashboard');

    // State for common selection for Processor, Distributor, Retailer
    const [selectedProductId, setSelectedProductId] = useState<string>('');

    // Farmer form states
    const [farmerProductName, setFarmerProductName] = useState<string>('');
    const [farmerQuantity, setFarmerQuantity] = useState<number>(0);
    const [farmerProductionDate, setFarmerProductionDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [farmerFarmLocation, setFarmerFarmLocation] = useState<string>('');
    const [farmerHarvestedBy, setFarmerHarvestedBy] = useState<string>('');
    const [farmerNotes, setFarmerNotes] = useState<string>('');

    // Processor form states
    const [processorQuantity, setProcessorQuantity] = useState<number>(0);
    const [processorProcessingDate, setProcessorProcessingDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [processorProcessedBy, setProcessorProcessedBy] = useState<string>('');
    const [processorProcessingLocation, setProcessorProcessingLocation] = useState<string>('');
    const [processorNotes, setProcessorNotes] = useState<string>('');

    // Distributor form states
    const [distributorQuantity, setDistributorQuantity] = useState<number>(0);
    const [distributorDistributionDate, setDistributorDistributionDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [distributorDistributedBy, setDistributorDistributedBy] = useState<string>('');
    const [distributorDistributionHub, setDistributorDistributionHub] = useState<string>('');
    const [distributorNotes, setDistributorNotes] = useState<string>('');

    // Retailer form states
    const [retailerQuantity, setRetailerQuantity] = useState<number>(0);
    const [retailerRetailDate, setRetailerRetailDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [retailerRetailerName, setRetailerRetailerName] = useState<string>('');
    const [retailerPrice, setRetailerPrice] = useState<string>('');
    const [retailerNotes, setRetailerNotes] = useState<string>('');

    // Dashboard specific state
    const [dashboardSelectedProductId, setDashboardSelectedProductId] = useState<string>('');


    useEffect(() => {
        loadSupplyChainData();
    }, []);

    useEffect(() => {
        saveSupplyChainData();
    }, [supplyChainData]);

    const loadSupplyChainData = () => {
        const storedData = localStorage.getItem('supplyChainData');
        if (storedData) {
            setSupplyChainData(JSON.parse(storedData));
        }
    };

    const saveSupplyChainData = () => {
        localStorage.setItem('supplyChainData', JSON.stringify(supplyChainData));
    };

    const handleSectionChange = (sectionName: string) => {
        setActiveSection(sectionName);
        // Reset specific selections if needed when changing sections
        setSelectedProductId('');
        setDashboardSelectedProductId('');
    };

    // --- Farmer Section Handlers ---
    const handleFarmerSubmit = () => {
        if (!farmerProductName || !farmerQuantity || !farmerFarmLocation || !farmerHarvestedBy) {
            alert('Please fill in all required farmer details (Product Name, Quantity, Farm Location, Harvested By).');
            return;
        }

        const newChain: ProductSupplyChain = {
            id: Date.now().toString(), // Unique ID for this product's chain
            name: farmerProductName,
            farmer: {
                quantity: farmerQuantity,
                productionDate: farmerProductionDate,
                farmLocation: farmerFarmLocation,
                harvestedBy: farmerHarvestedBy,
                notes: farmerNotes,
                logDate: new Date().toLocaleString(),
            },
        };
        setSupplyChainData([...supplyChainData, newChain]);
        alert(`Farmer details for '${farmerProductName}' logged successfully!`);
        clearFarmerForm();
    };

    const clearFarmerForm = () => {
        setFarmerProductName('');
        setFarmerQuantity(0);
        setFarmerProductionDate(new Date().toISOString().split('T')[0]);
        setFarmerFarmLocation('');
        setFarmerHarvestedBy('');
        setFarmerNotes('');
    };

    // --- Processor Section Handlers ---
    const handleProcessorSubmit = () => {
        if (!selectedProductId || !processorQuantity || !processorProcessedBy || !processorProcessingLocation) {
            alert('Please select a product and fill in all required processor details.');
            return;
        }

        const chainIndex = supplyChainData.findIndex(chain => chain.id === selectedProductId);
        if (chainIndex === -1) {
            alert('Product not found in chain.');
            return;
        }
        if (supplyChainData[chainIndex].processor) {
            alert('Processor details for this product already exist. Please update if needed from "Update Item" functionality (not implemented yet for multi-stage updates).');
            return;
        }

        const updatedChain: ProductSupplyChain = {
            ...supplyChainData[chainIndex],
            processor: {
                quantity: processorQuantity,
                processingDate: processorProcessingDate,
                processedBy: processorProcessedBy,
                processingLocation: processorProcessingLocation,
                notes: processorNotes,
                logDate: new Date().toLocaleString(),
            },
        };

        const newSupplyChainData = [...supplyChainData];
        newSupplyChainData[chainIndex] = updatedChain;
        setSupplyChainData(newSupplyChainData);
        alert(`Processor details for '${updatedChain.name}' logged successfully!`);
        clearProcessorForm();
    };

    const clearProcessorForm = () => {
        setSelectedProductId('');
        setProcessorQuantity(0);
        setProcessorProcessingDate(new Date().toISOString().split('T')[0]);
        setProcessorProcessedBy('');
        setProcessorProcessingLocation('');
        setProcessorNotes('');
    };

    // --- Distributor Section Handlers ---
    const handleDistributorSubmit = () => {
        if (!selectedProductId || !distributorQuantity || !distributorDistributedBy || !distributorDistributionHub) {
            alert('Please select a product and fill in all required distributor details.');
            return;
        }

        const chainIndex = supplyChainData.findIndex(chain => chain.id === selectedProductId);
        if (chainIndex === -1) {
            alert('Product not found in chain.');
            return;
        }
        if (!supplyChainData[chainIndex].processor) {
            alert('Processor details must be logged before distributor details.');
            return;
        }
        if (supplyChainData[chainIndex].distributor) {
            alert('Distributor details for this product already exist.');
            return;
        }


        const updatedChain: ProductSupplyChain = {
            ...supplyChainData[chainIndex],
            distributor: {
                quantity: distributorQuantity,
                distributionDate: distributorDistributionDate,
                distributedBy: distributorDistributedBy,
                distributionHub: distributorDistributionHub,
                notes: distributorNotes,
                logDate: new Date().toLocaleString(),
            },
        };

        const newSupplyChainData = [...supplyChainData];
        newSupplyChainData[chainIndex] = updatedChain;
        setSupplyChainData(newSupplyChainData);
        alert(`Distributor details for '${updatedChain.name}' logged successfully!`);
        clearDistributorForm();
    };

    const clearDistributorForm = () => {
        setSelectedProductId('');
        setDistributorQuantity(0);
        setDistributorDistributionDate(new Date().toISOString().split('T')[0]);
        setDistributorDistributedBy('');
        setDistributorDistributionHub('');
        setDistributorNotes('');
    };

    // --- Retailer Section Handlers ---
    const handleRetailerSubmit = () => {
        if (!selectedProductId || !retailerQuantity || !retailerRetailerName || !retailerPrice) {
            alert('Please select a product and fill in all required retailer details.');
            return;
        }

        const chainIndex = supplyChainData.findIndex(chain => chain.id === selectedProductId);
        if (chainIndex === -1) {
            alert('Product not found in chain.');
            return;
        }
        if (!supplyChainData[chainIndex].distributor) {
            alert('Distributor details must be logged before retailer details.');
            return;
        }
        if (supplyChainData[chainIndex].retailer) {
            alert('Retailer details for this product already exist.');
            return;
        }

        const updatedChain: ProductSupplyChain = {
            ...supplyChainData[chainIndex],
            retailer: {
                quantity: retailerQuantity,
                retailDate: retailerRetailDate,
                retailerName: retailerRetailerName,
                price: retailerPrice,
                notes: retailerNotes,
                logDate: new Date().toLocaleString(),
            },
        };

        const newSupplyChainData = [...supplyChainData];
        newSupplyChainData[chainIndex] = updatedChain;
        setSupplyChainData(newSupplyChainData);
        alert(`Retailer details for '${updatedChain.name}' logged successfully!`);
        clearRetailerForm();
    };

    const clearRetailerForm = () => {
        setSelectedProductId('');
        setRetailerQuantity(0);
        setRetailerRetailDate(new Date().toISOString().split('T')[0]);
        setRetailerRetailerName('');
        setRetailerPrice('');
        setRetailerNotes('');
    };


    // --- Helper for Product Dropdowns ---
    const getAvailableProductsForNextStage = (currentStage: 'farmer' | 'processor' | 'distributor' | 'retailer') => {
        if (currentStage === 'farmer') {
            return supplyChainData.filter(p => !p.processor); // Products that have only farmer data
        } else if (currentStage === 'processor') {
            return supplyChainData.filter(p => p.farmer && !p.processor); // Products with farmer data, but no processor data
        } else if (currentStage === 'distributor') {
            return supplyChainData.filter(p => p.processor && !p.distributor); // Products with processor data, but no distributor data
        } else if (currentStage === 'retailer') {
            return supplyChainData.filter(p => p.distributor && !p.retailer); // Products with distributor data, but no retailer data
        } else {
            return [];
        }
    };

    // --- Dashboard Specific Logic ---
    const dashboardProductData = supplyChainData.find(chain => chain.id === dashboardSelectedProductId);


    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
            <div className="container mx-auto p-6">
                <div className="flex gap-6">
                    {/* Sidebar */}
                    <aside className="w-1/4 bg-gray-800 rounded-xl shadow-lg overflow-hidden h-fit sticky top-6">
                        <div className="p-6 bg-teal-700">
                            <h2 className="text-xl font-bold text-white">Supply Chain Tracker</h2>
                        </div>
                        <nav className="p-4">
                            {navItems.map(({ name, icon: Icon, section }) => (
                                <button
                                    key={name}
                                    onClick={() => handleSectionChange(section)}
                                    className={`w-full mb-2 p-3 rounded-lg text-left flex items-center gap-3 transition-all duration-200
                                        ${activeSection === section
                                            ? "bg-teal-600 text-white font-semibold shadow-md"
                                            : "hover:bg-gray-700 text-gray-300 hover:text-white"
                                        }`}
                                >
                                    <Icon size={20} />
                                    {name}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 space-y-8">
                        {/* Dashboard Section */}
                        {activeSection === 'Dashboard' && (
                            <section className="bg-gray-800 p-8 rounded-xl shadow-lg">
                                <h2 className="text-3xl font-bold text-teal-300 mb-6">Supply Chain Dashboard</h2>

                                <div className="mb-8">
                                    <label htmlFor="dashboard-product-select" className="block text-gray-300 text-lg font-semibold mb-2">Select Product Chain:</label>
                                    <select
                                        id="dashboard-product-select"
                                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-teal-500 focus:border-teal-500"
                                        value={dashboardSelectedProductId}
                                        onChange={(e) => setDashboardSelectedProductId(e.target.value)}
                                    >
                                        <option value="">-- Select a Product --</option>
                                        {supplyChainData.map(chain => (
                                            <option key={chain.id} value={chain.id}>
                                                {chain.name} (ID: {chain.id})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {dashboardProductData ? (
                                    <>
                                        <h3 className="text-2xl font-bold text-gray-100 mb-4">{dashboardProductData.name} - Farm to Fork Journey</h3>

                                        {/* Farm-to-Fork Flow Diagram (Visual) */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 items-center justify-between text-center">

                                            {/* Stage 1: Farmer */}
                                            <div className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                                <div className="bg-teal-600 p-4 rounded-full mb-3 shadow-lg">
                                                    <Home className="w-10 h-10 text-white" />
                                                </div>
                                                <h4 className="text-xl font-semibold text-teal-300">Farmer</h4>
                                                <p className="text-sm text-gray-400"><strong>By:</strong> {dashboardProductData.farmer.harvestedBy}</p>
                                                <p className="text-sm text-gray-400"><strong>Location:</strong> {dashboardProductData.farmer.farmLocation}</p>
                                                <p className="text-sm text-gray-400"><strong>Quantity:</strong> {dashboardProductData.farmer.quantity} Qtls</p>
                                                <p className="text-xs text-gray-500 mt-2">Logged: {dashboardProductData.farmer.logDate}</p>
                                            </div>

                                            {/* Arrow (Desktop only, responsive adjustments for mobile) */}
                                            <div className="hidden xl:block flex-grow border-b-2 border-dashed border-gray-600 mx-4"></div>

                                            {/* Stage 2: Processor */}
                                            {dashboardProductData.processor && (
                                                <>
                                                    <div className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                                        <div className="bg-yellow-600 p-4 rounded-full mb-3 shadow-lg">
                                                            <Factory className="w-10 h-10 text-white" />
                                                        </div>
                                                        <h4 className="text-xl font-semibold text-yellow-300">Processor</h4>
                                                        <p className="text-sm text-gray-400"><strong>By:</strong> {dashboardProductData.processor.processedBy}</p>
                                                        <p className="text-sm text-gray-400"><strong>Location:</strong> {dashboardProductData.processor.processingLocation}</p>
                                                        <p className="text-sm text-gray-400"><strong>Quantity:</strong> {dashboardProductData.processor.quantity} Qtls</p>
                                                        <p className="text-xs text-gray-500 mt-2">Logged: {dashboardProductData.processor.logDate}</p>
                                                    </div>
                                                </>
                                            )}

                                            {/* Arrow */}
                                            {dashboardProductData.processor && <div className="hidden xl:block flex-grow border-b-2 border-dashed border-gray-600 mx-4"></div>}


                                            {/* Stage 3: Distributor */}
                                            {dashboardProductData.distributor && (
                                                <>
                                                    <div className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                                        <div className="bg-blue-600 p-4 rounded-full mb-3 shadow-lg">
                                                            <Truck className="w-10 h-10 text-white" />
                                                        </div>
                                                        <h4 className="text-xl font-semibold text-blue-300">Distributor</h4>
                                                        <p className="text-sm text-gray-400"><strong>By:</strong> {dashboardProductData.distributor.distributedBy}</p>
                                                        <p className="text-sm text-gray-400"><strong>Hub:</strong> {dashboardProductData.distributor.distributionHub}</p>
                                                        <p className="text-sm text-gray-400"><strong>Quantity:</strong> {dashboardProductData.distributor.quantity} Qtls</p>
                                                        <p className="text-xs text-gray-500 mt-2">Logged: {dashboardProductData.distributor.logDate}</p>
                                                    </div>
                                                </>
                                            )}

                                            {/* Arrow */}
                                            {dashboardProductData.distributor && <div className="hidden xl:block flex-grow border-b-2 border-dashed border-gray-600 mx-4"></div>}


                                            {/* Stage 4: Retailer */}
                                            {dashboardProductData.retailer && (
                                                <>
                                                    <div className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                                        <div className="bg-red-600 p-4 rounded-full mb-3 shadow-lg">
                                                            <Home className="w-10 h-10 text-white" />
                                                        </div>
                                                        <h4 className="text-xl font-semibold text-red-300">Retailer</h4>
                                                        <p className="text-sm text-gray-400"><strong>Store:</strong> {dashboardProductData.retailer.retailerName}</p>
                                                        <p className="text-sm text-gray-400"><strong>Price:</strong> {dashboardProductData.retailer.price}</p>
                                                        <p className="text-sm text-gray-400"><strong>Quantity:</strong> {dashboardProductData.retailer.quantity} Qtls</p>
                                                        <p className="text-xs text-gray-500 mt-2">Logged: {dashboardProductData.retailer.logDate}</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Detailed Data */}
                                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                                                <h4 className="text-xl font-semibold text-gray-100 mb-3">Farmer Details</h4>
                                                <p><span className="font-bold text-gray-300">Product Name:</span> {dashboardProductData.name}</p>
                                                <p><span className="font-bold text-gray-300">Quantity:</span> {dashboardProductData.farmer.quantity} Qtls</p>
                                                <p><span className="font-bold text-gray-300">Production Date:</span> {dashboardProductData.farmer.productionDate}</p>
                                                <p><span className="font-bold text-gray-300">Farm Location:</span> {dashboardProductData.farmer.farmLocation}</p>
                                                <p><span className="font-bold text-gray-300">Harvested By:</span> {dashboardProductData.farmer.harvestedBy}</p>
                                                {dashboardProductData.farmer.notes && <p><span className="font-bold text-gray-300">Notes:</span> {dashboardProductData.farmer.notes}</p>}
                                                <p className="text-xs text-gray-500 mt-2">Last Updated: {dashboardProductData.farmer.logDate}</p>
                                            </div>

                                            {dashboardProductData.processor && (
                                                <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                                                    <h4 className="text-xl font-semibold text-gray-100 mb-3">Processor Details</h4>
                                                    <p><span className="font-bold text-gray-300">Quantity Processed:</span> {dashboardProductData.processor.quantity} Qtls</p>
                                                    <p><span className="font-bold text-gray-300">Processing Date:</span> {dashboardProductData.processor.processingDate}</p>
                                                    <p><span className="font-bold text-gray-300">Processed By:</span> {dashboardProductData.processor.processedBy}</p>
                                                    <p><span className="font-bold text-gray-300">Processing Location:</span> {dashboardProductData.processor.processingLocation}</p>
                                                    {dashboardProductData.processor.notes && <p><span className="font-bold text-gray-300">Notes:</span> {dashboardProductData.processor.notes}</p>}
                                                    <p className="text-xs text-gray-500 mt-2">Last Updated: {dashboardProductData.processor.logDate}</p>
                                                </div>
                                            )}

                                            {dashboardProductData.distributor && (
                                                <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                                                    <h4 className="text-xl font-semibold text-gray-100 mb-3">Distributor Details</h4>
                                                    <p><span className="font-bold text-gray-300">Quantity Distributed:</span> {dashboardProductData.distributor.quantity} Qtls</p>
                                                    <p><span className="font-bold text-gray-300">Distribution Date:</span> {dashboardProductData.distributor.distributionDate}</p>
                                                    <p><span className="font-bold text-gray-300">Distributed By:</span> {dashboardProductData.distributor.distributedBy}</p>
                                                    <p><span className="font-bold text-gray-300">Distribution Hub:</span> {dashboardProductData.distributor.distributionHub}</p>
                                                    {dashboardProductData.distributor.notes && <p><span className="font-bold text-gray-300">Notes:</span> {dashboardProductData.distributor.notes}</p>}
                                                    <p className="text-xs text-gray-500 mt-2">Last Updated: {dashboardProductData.distributor.logDate}</p>
                                                </div>
                                            )}

                                            {dashboardProductData.retailer && (
                                                <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                                                    <h4 className="text-xl font-semibold text-gray-100 mb-3">Retailer Details</h4>
                                                    <p><span className="font-bold text-gray-300">Quantity Available:</span> {dashboardProductData.retailer.quantity} Qtls</p>
                                                    <p><span className="font-bold text-gray-300">Retail Date:</span> {dashboardProductData.retailer.retailDate}</p>
                                                    <p><span className="font-bold text-gray-300">Retailer Name:</span> {dashboardProductData.retailer.retailerName}</p>
                                                    <p><span className="font-bold text-gray-300">Price:</span> {dashboardProductData.retailer.price}</p>
                                                    {dashboardProductData.retailer.notes && <p><span className="font-bold text-gray-300">Notes:</span> {dashboardProductData.retailer.notes}</p>}
                                                    <p className="text-xs text-gray-500 mt-2">Last Updated: {dashboardProductData.retailer.logDate}</p>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-gray-400">Please select a product to view its supply chain journey.</p>
                                )}
                            </section>
                        )}

                        {/* Farmer Entry Section */}
                        {activeSection === 'Farmer' && (
                            <section className="bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
                                <h2 className="text-3xl font-bold text-teal-300">Farmer Product Entry</h2>
                                <p className="text-gray-400">Enter details of the product harvested at the farm.</p>

                                <input
                                    type="text"
                                    placeholder="Product Name (e.g., Nashik Onions)"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                                    value={farmerProductName}
                                    onChange={(e) => setFarmerProductName(e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Quantity (in Quintals)"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                                    value={farmerQuantity === 0 ? '' : farmerQuantity}
                                    onChange={(e) => setFarmerQuantity(Number(e.target.value))}
                                    required
                                />
                                <label htmlFor="farmerProductionDate" className="block text-gray-400">Production/Harvest Date:</label>
                                <input
                                    id="farmerProductionDate"
                                    type="date"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                                    value={farmerProductionDate}
                                    onChange={(e) => setFarmerProductionDate(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Farm Location (e.g., Pimpalgaon Baswant, Nashik)"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                                    value={farmerFarmLocation}
                                    onChange={(e) => setFarmerFarmLocation(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Harvested By (Farmer Name/Co-op)"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                                    value={farmerHarvestedBy}
                                    onChange={(e) => setFarmerHarvestedBy(e.target.value)}
                                    required
                                />
                                <textarea
                                    placeholder="Additional Notes (e.g., organic, specific variety)"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 h-24 focus:ring-teal-500 focus:border-teal-500"
                                    value={farmerNotes}
                                    onChange={(e) => setFarmerNotes(e.target.value)}
                                />
                                <button
                                    onClick={handleFarmerSubmit}
                                    className="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition-colors duration-200 text-lg font-semibold"
                                >
                                    Log Farmer Data
                                </button>
                            </section>
                        )}

                        {/* Processor Entry Section */}
                        {activeSection === 'Processor' && (
                            <section className="bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
                                <h2 className="text-3xl font-bold text-teal-300">Processor Data Entry</h2>
                                <p className="text-gray-400">Select a product chain to add processing details.</p>

                                <label htmlFor="processor-product-select" className="block text-gray-300 text-lg font-semibold mb-2">Select Product to Process:</label>
                                <select
                                    id="processor-product-select"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-teal-500 focus:border-teal-500"
                                    value={selectedProductId}
                                    onChange={(e) => setSelectedProductId(e.target.value)}
                                >
                                    <option value="">-- Select a Product from Farmer Stage --</option>
                                    {getAvailableProductsForNextStage('processor').map(chain => (
                                        <option key={chain.id} value={chain.id}>
                                            {chain.name} (ID: {chain.id})
                                        </option>
                                    ))}
                                </select>

                                {selectedProductId && (
                                    <>
                                        <input
                                            type="number"
                                            placeholder="Quantity Processed (in Quintals)"
                                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                                            value={processorQuantity === 0 ? '' : processorQuantity}
                                            onChange={(e) => setProcessorQuantity(Number(e.target.value))}
                                            required
                                        />
                                        <label htmlFor="processorProcessingDate" className="block text-gray-400">Processing Date:</label>
                                        <input
                                            id="processorProcessingDate"
                                            type="date"
                                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                                            value={processorProcessingDate}
                                            onChange={(e) => setProcessorProcessingDate(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Processed By (Company Name)"
                                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                                            value={processorProcessedBy}
                                            onChange={(e) => setProcessorProcessedBy(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Processing Location (e.g., Lasalgaon, Nashik)"
                                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                                            value={processorProcessingLocation}
                                            onChange={(e) => setProcessorProcessingLocation(e.target.value)}
                                            required
                                        />
                                        <textarea
                                            placeholder="Additional Notes (e.g., cleaned, sorted, packaged)"
                                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 h-24 focus:ring-teal-500 focus:border-teal-500"
                                            value={processorNotes}
                                            onChange={(e) => setProcessorNotes(e.target.value)}
                                        />
                                        <button
                                            onClick={handleProcessorSubmit}
                                            className="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition-colors duration-200 text-lg font-semibold"
                                        >
                                            Log Processor Data
                                        </button>
                                    </>
                                )}
                            </section>
                        )}

                        {/* Distributor Entry Section */}
                        {activeSection === 'Distributor' && (
                            <section className="bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
                                <h2 className="text-3xl font-bold text-teal-300">Distributor Data Entry</h2>
                                <p className="text-gray-400">Select a processed product chain to add distribution details.</p>

                                <label htmlFor="distributor-product-select" className="block text-gray-300 text-lg font-semibold mb-2">Select Product to Distribute:</label>
                                <select
                                    id="distributor-product-select"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-teal-500 focus:border-teal-500"
                                    value={selectedProductId}
                                    onChange={(e) => setSelectedProductId(e.target.value)}
                                >
                                    <option value="">-- Select a Product from Processor Stage --</option>
                                    {getAvailableProductsForNextStage('distributor').map(chain => (
                                        <option key={chain.id} value={chain.id}>
                                            {chain.name} (ID: {chain.id})
                                        </option>
                                    ))}
                                </select>

                                {selectedProductId && (
                                    <>
                                        <input
                                            type="number"
                                            placeholder="Quantity Distributed (in Quintals)"
                                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                                            value={distributorQuantity === 0 ? '' : distributorQuantity}
                                            onChange={(e) => setDistributorQuantity(Number(e.target.value))}
                                            required
                                        />
                                        <label htmlFor="distributorDistributionDate" className="block text-gray-400">Distribution Date:</label>
                                        <input
                                            id="distributorDistributionDate"
                                            type="date"
                                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                                            value={distributorDistributionDate}
                                            onChange={(e) => setDistributorDistributionDate(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Distributed By (Logistics Company)"
                                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                                            value={distributorDistributedBy}
                                            onChange={(e) => setDistributorDistributedBy(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Distribution Hub (e.g., APMC Market, Pune)"
                                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                                            value={distributorDistributionHub}
                                            onChange={(e) => setDistributorDistributionHub(e.target.value)}
                                            required
                                        />
                                        <textarea
                                            placeholder="Additional Notes (e.g., transported by cold chain, specific routes)"
                                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 h-24 focus:ring-teal-500 focus:border-teal-500"
                                            value={distributorNotes}
                                            onChange={(e) => setDistributorNotes(e.target.value)}
                                        />
                                        <button
                                            onClick={handleDistributorSubmit}
                                            className="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition-colors duration-200 text-lg font-semibold"
                                        >
                                            Log Distributor Data
                                        </button>
                                    </>
                                )}
                            </section>
                        )}

                        {/* Retailer Entry Section */}
                        {activeSection === 'Retailer' && (
                            <section className="bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
                                <h2 className="text-3xl font-bold text-teal-300">Retailer Data Entry</h2>
                                <p className="text-gray-400">Select a distributed product chain to add retail details.</p>

                                <label htmlFor="retailer-product-select" className="block text-gray-300 text-lg font-semibold mb-2">Select Product to Retail:</label>
                                <select
                                    id="retailer-product-select"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-teal-500 focus:border-teal-500"
                                    value={selectedProductId}
                                    onChange={(e) => setSelectedProductId(e.target.value)}
                                >
                                    <option value="">-- Select a Product from Distributor Stage --</option>
                                    {getAvailableProductsForNextStage('retailer').map(chain => (
                                        <option key={chain.id} value={chain.id}>
                                            {chain.name} (ID: {chain.id})
                                        </option>
                                    ))}
                                </select>

                                {selectedProductId && (
                                    <>
                                        <input
                                            type="number"
                                            placeholder="Quantity Available for Sale (in Quintals)"
                                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                                            value={retailerQuantity === 0 ? '' : retailerQuantity}
                                            onChange={(e) => setRetailerQuantity(Number(e.target.value))}
                                            required
                                        />
                                        <label htmlFor="retailerRetailDate" className="block text-gray-400">Retail Start Date:</label>
                                        <input
                                            id="retailerRetailDate"
                                            type="date"
                                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                                            value={retailerRetailDate}
                                            onChange={(e) => setRetailerRetailDate(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Retailer Name (e.g., More Supermarket)"
                                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                                            value={retailerRetailerName}
                                            onChange={(e) => setRetailerRetailerName(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Price (e.g., ₹38/kg)"
                                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                                            value={retailerPrice}
                                            onChange={(e) => setRetailerPrice(e.target.value)}
                                            required
                                        />
                                        <textarea
                                            placeholder="Additional Notes (e.g., shelf life, special offers)"
                                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 h-24 focus:ring-teal-500 focus:border-teal-500"
                                            value={retailerNotes}
                                            onChange={(e) => setRetailerNotes(e.target.value)}
                                        />
                                        <button
                                            onClick={handleRetailerSubmit}
                                            className="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition-colors duration-200 text-lg font-semibold"
                                        >
                                            Log Retailer Data
                                        </button>
                                    </>
                                )}
                            </section>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProductSupplyChainSystem;