import React, { useState } from "react";

// Navbar component
const Navbar: React.FC = () => (
  <nav className="bg-gradient-to-r from-teal-700 to-teal-900 text-white p-4 shadow-lg">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-2xl font-extrabold tracking-wide">Maharashtra Krishi Utpadan Tracker</div>
      {/* Optional: Add more navbar items here like home, about, etc. */}
    </div>
  </nav>
);

// Statistics Card component
interface StatisticsCardProps {
  title: string;
  value: string | number;
  bgColor: string;
  textColor?: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, value, bgColor, textColor = "text-white" }) => (
  <div className={`p-6 rounded-3xl shadow-xl ${bgColor} ${textColor} text-center transform hover:scale-105 transition-transform duration-300`}>
    <div className="text-4xl font-bold mb-2">{value}</div>
    <div className="text-lg font-medium">{title}</div>
  </div>
);

// Card component to wrap content
interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, title, className = "" }) => (
  <div className={`bg-white rounded-3xl shadow-lg p-6 text-gray-800 ${className}`}>
    {title && <div className="text-2xl font-semibold mb-4 text-teal-800">{title}</div>}
    {children}
  </div>
);

// Main Dashboard component
const Dashboard: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>("Onions (Nashik)");

  // List of Maharashtra-specific agricultural products
  const products = ["Onions (Nashik)", "Grapes (Nashik/Sangli)", "Sugarcane", "Pomegranates (Solapur)", "Oranges (Nagpur)", "Alphonso Mangoes (Ratnagiri)"];

  // Mock data for supply chain by product (Maharashtra-specific)
  const supplyChainData: Record<string, any> = {
    "Onions (Nashik)": {
      farmer: {
        quantity: 1800, // in Quintals
        productionDate: "2025-02-10",
        farmLocation: "Pimpalgaon Baswant, Nashik",
        harvestedBy: "Patil Farms, Nashik",
        notes: "High quality Nashik red onions, robust and flavorful.",
      },
      processor: {
        quantity: 1650, // after initial cleaning/grading
        processingDate: "2025-02-15",
        processedBy: "Maharashtra Agri-Processors",
        processingLocation: "Lasalgaon, Nashik",
        notes: "Onions graded, sorted, and packed for various market segments.",
      },
      distributor: {
        quantity: 1400, // after packaging/logistics
        distributionDate: "2025-02-20",
        distributedBy: "Pune Veggie Transporters",
        distributionHub: "APMC Market, Pune",
        notes: "Dispatched to major city markets (Pune, Mumbai) and other states.",
      },
      retailer: {
        quantity: 1200, // quantity available at retail
        retailDate: "2025-02-25",
        retailerName: "More Supermarket (Pune)",
        price: "₹38/kg",
        notes: "Fresh Nashik onions in stock, popular demand.",
      },
      consumer: {
        quantity: 900, // estimated consumption
        purchaseDate: "2025-03-01",
        consumerLocation: "Kothrud, Pune",
        notes: "Essential in every Maharashtrian kitchen.",
      },
    },
    "Grapes (Nashik/Sangli)": {
      farmer: {
        quantity: 900, // in Quintals
        productionDate: "2025-03-01",
        farmLocation: "Dindori, Nashik District",
        harvestedBy: "Gaikwad Vineyards",
        notes: "Seedless Thompson grapes, excellent sweetness and crunch.",
      },
      processor: {
        quantity: 850,
        processingDate: "2025-03-03",
        processedBy: "Sula Vineyards (for some), local packers (for fresh)",
        processingLocation: "Nashik",
        notes: "Grapes sorted, some for wine, major portion for fresh consumption and export.",
      },
      distributor: {
        quantity: 750,
        distributionDate: "2025-03-05",
        distributedBy: "Maharashtra Fruits & Veggies",
        distributionHub: "Mumbai Port",
        notes: "Shipped to domestic markets and international exports (Europe, Middle East).",
      },
      retailer: {
        quantity: 600,
        retailDate: "2025-03-08",
        retailerName: "Dorabjee's (Mumbai)",
        price: "₹120/kg",
        notes: "Premium quality grapes available.",
      },
      consumer: {
        quantity: 450,
        purchaseDate: "2025-03-12",
        consumerLocation: "Bandra, Mumbai",
        notes: "Enjoyed fresh, widely used for juice.",
      },
    },
    "Sugarcane": {
      farmer: {
        quantity: 15000, // in Metric Tons (high volume product)
        productionDate: "2025-01-20",
        farmLocation: "Ahmednagar District",
        harvestedBy: "Local Sugarcane Farmers Co-op",
        notes: "High sucrose content sugarcane, harvested manually.",
      },
      processor: {
        quantity: 14500,
        processingDate: "2025-01-25",
        processedBy: "Praj Industries (Client Sugar Mills)",
        processingLocation: "Baramati, Pune",
        notes: "Processed into refined sugar, jaggery, and ethanol.",
      },
      distributor: {
        quantity: 13000,
        distributionDate: "2025-02-01",
        distributedBy: "Sugar Traders Association",
        distributionHub: "Mumbai Wholesale Market",
        notes: "Bulk sugar dispatched to FMCG companies and regional distributors.",
      },
      retailer: {
        quantity: 10000,
        retailDate: "2025-02-05",
        retailerName: "D-Mart (Across Maharashtra)",
        price: "₹45/kg (for sugar)",
        notes: "Sugar available in various package sizes.",
      },
      consumer: {
        quantity: 8000,
        purchaseDate: "2025-02-10",
        consumerLocation: "All over Maharashtra",
        notes: "Used daily in households for cooking, beverages, and sweets.",
      },
    },
    "Pomegranates (Solapur)": {
      farmer: {
        quantity: 700, // in Quintals
        productionDate: "2025-04-01",
        farmLocation: "Mohol, Solapur District",
        harvestedBy: "Deshmukh Agro-Farm",
        notes: "Bhagwa variety pomegranates, rich red color and sweet taste.",
      },
      processor: {
        quantity: 650,
        processingDate: "2025-04-03",
        processedBy: "Solapur Fruit Processing",
        processingLocation: "Solapur",
        notes: "Sorted, graded, and packed. Some processed for juice concentrate.",
      },
      distributor: {
        quantity: 550,
        distributionDate: "2025-04-06",
        distributedBy: "Fruit Connect Logistics",
        distributionHub: "Pune",
        notes: "Distributed to major cities like Pune, Mumbai, and South India.",
      },
      retailer: {
        quantity: 450,
        retailDate: "2025-04-10",
        retailerName: "Star Bazaar (Nagpur)",
        price: "₹180/kg",
        notes: "Fresh pomegranates available, high demand.",
      },
      consumer: {
        quantity: 350,
        purchaseDate: "2025-04-15",
        consumerLocation: "Nashik, Maharashtra",
        notes: "Consumed fresh, or used for juice and salads.",
      },
    },
    "Oranges (Nagpur)": {
      farmer: {
        quantity: 1100, // in Quintals
        productionDate: "2025-11-15",
        farmLocation: "Warud, Nagpur District",
        harvestedBy: "Gondia Citrus Growers",
        notes: "Nagpur Santra, famous for its sweet-sour taste and aroma.",
      },
      processor: {
        quantity: 1000,
        processingDate: "2025-11-20",
        processedBy: "Nagpur Citrus Pvt. Ltd.",
        processingLocation: "Nagpur",
        notes: "Oranges cleaned, graded, and packed. Some for juice extraction.",
      },
      distributor: {
        quantity: 850,
        distributionDate: "2025-11-25",
        distributedBy: "Central India Agri-Logistics",
        distributionHub: "Nagpur Dry Port",
        notes: "Dispatched to markets across Maharashtra and other states.",
      },
      retailer: {
        quantity: 700,
        retailDate: "2025-12-01",
        retailerName: "Local Fruit Stalls (Mumbai)",
        price: "₹80/dozen",
        notes: "Fresh Nagpur oranges arrive daily.",
      },
      consumer: {
        quantity: 550,
        purchaseDate: "2025-12-05",
        consumerLocation: "Mumbai, Maharashtra",
        notes: "Popular seasonal fruit, especially during winter.",
      },
    },
    "Alphonso Mangoes (Ratnagiri)": {
      farmer: {
        quantity: 500, // in Dozens or Crates, let's say Crates for consistency
        productionDate: "2025-05-20",
        farmLocation: "Devgad, Ratnagiri District",
        harvestedBy: "Konkan Mango Growers",
        notes: "GI-tagged Devgad Alphonso, world-renowned for unique flavor.",
      },
      processor: {
        quantity: 450,
        processingDate: "2025-05-22",
        processedBy: "Konkan Fruit Processors",
        processingLocation: "Ratnagiri",
        notes: "Sorted, graded, naturally ripened. Some for pulp and ready-to-eat slices.",
      },
      distributor: {
        quantity: 400,
        distributionDate: "2025-05-24",
        distributedBy: "Mumbai Fruit Exporters",
        distributionHub: "Vashi APMC Market, Mumbai",
        notes: "Dispatched to high-end domestic markets and international exports (US, UK, UAE).",
      },
      retailer: {
        quantity: 300,
        retailDate: "2025-05-26",
        retailerName: "Nature's Basket (Mumbai)",
        price: "₹1200/dozen (Premium Grade)",
        notes: "Exclusive Alphonso mangoes, high demand during season.",
      },
      consumer: {
        quantity: 200,
        purchaseDate: "2025-05-28",
        consumerLocation: "South Mumbai",
        notes: "A cherished seasonal delicacy in Maharashtrian households.",
      },
    },
  };

  const currentProductData = supplyChainData[selectedProduct];

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Navbar />

      <div className="container mx-auto p-8 space-y-10">
        {/* Dropdown to select product */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-3xl shadow-lg">
          <label htmlFor="product-select" className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Select Maharashtra Product:</label>
          <select
            id="product-select"
            className="bg-teal-100 text-teal-800 p-4 rounded-xl text-xl font-semibold shadow-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-300"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            {products.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>

        {/* Statistics Cards */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Key Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          <StatisticsCard
            title="Farm Production"
            value={`${currentProductData.farmer.quantity} Qtls`}
            bgColor="bg-teal-600"
          />
          <StatisticsCard
            title="Processed Quantity"
            value={`${currentProductData.processor.quantity} Qtls`}
            bgColor="bg-yellow-600"
          />
          <StatisticsCard
            title="Distributed Quantity"
            value={`${currentProductData.distributor.quantity} Qtls`}
            bgColor="bg-blue-600"
          />
          <StatisticsCard
            title="Retail Availability"
            value={`${currentProductData.retailer.quantity} Qtls`}
            bgColor="bg-red-600"
          />
          <StatisticsCard
            title="Estimated Consumption"
            value={`${currentProductData.consumer.quantity} Qtls`}
            bgColor="bg-purple-600"
          />
        </div>

        {/* Farm-to-Fork Flow Diagram */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6 pt-4">Farm-to-Fork Journey in Maharashtra</h2>
        <Card className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 items-center justify-between text-center">

            {/* Stage 1: Farmer */}
            <div className="flex flex-col items-center">
              <div className="bg-teal-100 p-4 rounded-full mb-3 shadow-md">
                {/* Farmer Icon */}
                <svg className="w-12 h-12 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-teal-800">Farmer</h3>
              <p className="text-sm text-gray-600">Harvested by {currentProductData.farmer.harvestedBy} on {currentProductData.farmer.productionDate} in {currentProductData.farmer.farmLocation}.</p>
            </div>

            {/* Arrow */}
            <div className="hidden xl:block flex-grow border-b-2 border-dashed border-gray-400 mx-4"></div>

            {/* Stage 2: Processor */}
            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 p-4 rounded-full mb-3 shadow-md">
                {/* Processor Icon */}
                <svg className="w-12 h-12 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-yellow-800">Processor</h3>
              <p className="text-sm text-gray-600">Processed by {currentProductData.processor.processedBy} on {currentProductData.processor.processingDate} in {currentProductData.processor.processingLocation}.</p>
            </div>

            {/* Arrow */}
            <div className="hidden xl:block flex-grow border-b-2 border-dashed border-gray-400 mx-4"></div>

            {/* Stage 3: Distributor */}
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-3 shadow-md">
                {/* Distributor Icon */}
                <svg className="w-12 h-12 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 17H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-3m-1 4v-4a2 2 0 00-2-2h-4a2 2 0 00-2 2v4m-2 0h6"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-800">Distributor</h3>
              <p className="text-sm text-gray-600">Distributed by {currentProductData.distributor.distributedBy} on {currentProductData.distributor.distributionDate} from {currentProductData.distributor.distributionHub}.</p>
            </div>

            {/* Arrow */}
            <div className="hidden xl:block flex-grow border-b-2 border-dashed border-gray-400 mx-4"></div>

            {/* Stage 4: Retailer */}
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-4 rounded-full mb-3 shadow-md">
                {/* Retailer Icon */}
                <svg className="w-12 h-12 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-red-800">Retailer</h3>
              <p className="text-sm text-gray-600">Available at {currentProductData.retailer.retailerName} from {currentProductData.retailer.retailDate} for {currentProductData.retailer.price}.</p>
            </div>

            {/* Arrow */}
            <div className="hidden xl:block flex-grow border-b-2 border-dashed border-gray-400 mx-4"></div>

            {/* Stage 5: Consumer */}
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-4 rounded-full mb-3 shadow-md">
                {/* Consumer Icon */}
                <svg className="w-12 h-12 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M10 20v-2a3 3 0 013-3h4a3 3 0 013 3v2M3 8a6 6 0 016 6v7H3v-7a6 6 0 016-6z"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-purple-800">Consumer</h3>
              <p className="text-sm text-gray-600">Estimated consumption in {currentProductData.consumer.consumerLocation} from {currentProductData.consumer.purchaseDate}.</p>
            </div>

          </div>
        </Card>

        {/* Detailed Data Cards */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6 pt-4">Detailed Supply Chain Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          <Card title="Farmer Details">
            <div className="text-lg text-gray-700">
              <p><strong>Harvested By:</strong> {currentProductData.farmer.harvestedBy}</p>
              <p><strong>Farm Location:</strong> {currentProductData.farmer.farmLocation}</p>
              <p><strong>Production Date:</strong> {currentProductData.farmer.productionDate}</p>
              <p><strong>Quantity:</strong> {currentProductData.farmer.quantity} Quintals</p>
              <p><strong>Notes:</strong> {currentProductData.farmer.notes}</p>
            </div>
          </Card>

          <Card title="Processor Details">
            <div className="text-lg text-gray-700">
              <p><strong>Processed By:</strong> {currentProductData.processor.processedBy}</p>
              <p><strong>Processing Location:</strong> {currentProductData.processor.processingLocation}</p>
              <p><strong>Processing Date:</strong> {currentProductData.processor.processingDate}</p>
              <p><strong>Quantity Processed:</strong> {currentProductData.processor.quantity} Quintals</p>
              <p><strong>Notes:</strong> {currentProductData.processor.notes}</p>
            </div>
          </Card>

          <Card title="Distributor Details">
            <div className="text-lg text-gray-700">
              <p><strong>Distributed By:</strong> {currentProductData.distributor.distributedBy}</p>
              <p><strong>Distribution Hub:</strong> {currentProductData.distributor.distributionHub}</p>
              <p><strong>Distribution Date:</strong> {currentProductData.distributor.distributionDate}</p>
              <p><strong>Quantity Distributed:</strong> {currentProductData.distributor.quantity} Quintals</p>
              <p><strong>Notes:</strong> {currentProductData.distributor.notes}</p>
            </div>
          </Card>

          <Card title="Retailer Details">
            <div className="text-lg text-gray-700">
              <p><strong>Retailer Name:</strong> {currentProductData.retailer.retailerName}</p>
              <p><strong>Retail Date:</strong> {currentProductData.retailer.retailDate}</p>
              <p><strong>Price:</strong> {currentProductData.retailer.price}</p>
              <p><strong>Quantity Available:</strong> {currentProductData.retailer.quantity} Quintals</p>
              <p><strong>Notes:</strong> {currentProductData.retailer.notes}</p>
            </div>
          </Card>

          <Card title="Consumer Details">
            <div className="text-lg text-gray-700">
              <p><strong>Location:</strong> {currentProductData.consumer.consumerLocation}</p>
              <p><strong>Estimated Purchase Date:</strong> {currentProductData.consumer.purchaseDate}</p>
              <p><strong>Estimated Consumption:</strong> {currentProductData.consumer.quantity} Quintals</p>
              <p><strong>Notes:</strong> {currentProductData.consumer.notes}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;