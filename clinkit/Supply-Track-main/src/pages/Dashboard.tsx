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

const Dashboard: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>("Onions (Nashik)");
  const [nfcData, setNfcData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // --- NFC Reading Logic ---
  const handleReadNfc = async () => {
    setLoading(true);
    try {
      // @ts-ignore
      if ("NDEFReader" in window) {
        // @ts-ignore
        const ndef = new window.NDEFReader();
        await ndef.scan();
        ndef.onreading = (event: any) => {
          const decoder = new TextDecoder();
          let recordData = "";
          for (const record of event.message.records) {
            if (record.recordType === "text") {
              recordData += decoder.decode(record.data);
            }
          }
          try {
            const parsed = JSON.parse(recordData);
            setNfcData(parsed);
          } catch {
            alert("Invalid NFC data format.");
          }
          setLoading(false);
        };
        ndef.onerror = () => {
          alert("NFC read error.");
          setLoading(false);
        };
      } else {
        alert("NFC not supported on this device/browser.");
        setLoading(false);
      }
    } catch (err) {
      alert("NFC read failed: " + (err as any).message);
      setLoading(false);
    }
  };

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
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-teal-700 to-teal-900 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-extrabold tracking-wide">Maharashtra Krishi Utpadan Tracker</div>
        </div>
      </nav>

      <div className="container mx-auto p-8 space-y-10">
        {/* NFC Read Section */}
        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-3xl shadow-lg mb-8">
          <button
            onClick={handleReadNfc}
            disabled={loading}
            className="bg-gradient-to-r from-teal-600 to-teal-800 text-white px-8 py-4 rounded-2xl text-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-200 disabled:opacity-60"
          >
            {loading ? "Reading NFC..." : "Read NFC Tag"}
          </button>
          {!nfcData && !loading && (
            <div className="mt-6 text-gray-600 text-lg text-center">
              Tap the "Read NFC Tag" button to scan a farm product's supply chain details.
            </div>
          )}
        </div>

        {/* Show Supply Chain Flow if NFC data is present */}
        {nfcData && (
          <>
            {/* Product Title */}
            <h2 className="text-3xl font-extrabold text-teal-800 text-center mb-8 drop-shadow-lg">
              {nfcData.n} <span className="text-lg text-gray-500 font-normal">(ID: {nfcData.i})</span>
            </h2>

            {/* Flow Diagram */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">
              <h3 className="text-xl font-bold text-center text-gray-800 mb-8">Farm-to-Fork Journey</h3>
              <div className="flex flex-col xl:flex-row items-center justify-between gap-8">
                {/* Farmer */}
                <div className="flex flex-col items-center w-full xl:w-1/4">
                  <div className="bg-teal-100 p-5 rounded-full mb-3 shadow-md">
                    {/* ...icon... */}
                  </div>
                  <div className="text-lg font-bold text-teal-800 mb-1">Farmer</div>
                  <div className="text-gray-600 text-xs text-center">{nfcData.fh}</div>
                </div>
                {/* Arrow */}
                <div className="hidden xl:block flex-grow border-b-2 border-dashed border-teal-300 mx-4"></div>
                {/* Processor */}
                <div className="flex flex-col items-center w-full xl:w-1/4">
                  <div className="bg-yellow-100 p-5 rounded-full mb-3 shadow-md">
                    {/* ...icon... */}
                  </div>
                  <div className="text-lg font-bold text-yellow-800 mb-1">Processor</div>
                  <div className="text-gray-600 text-xs text-center">{nfcData.pp}</div>
                </div>
                {/* Arrow */}
                <div className="hidden xl:block flex-grow border-b-2 border-dashed border-yellow-300 mx-4"></div>
                {/* Distributor */}
                <div className="flex flex-col items-center w-full xl:w-1/4">
                  <div className="bg-blue-100 p-5 rounded-full mb-3 shadow-md">
                    {/* ...icon... */}
                  </div>
                  <div className="text-lg font-bold text-blue-800 mb-1">Distributor</div>
                  <div className="text-gray-600 text-xs text-center">{nfcData.dd}</div>
                </div>
                {/* Arrow */}
                <div className="hidden xl:block flex-grow border-b-2 border-dashed border-blue-300 mx-4"></div>
                {/* Retailer */}
                <div className="flex flex-col items-center w-full xl:w-1/4">
                  <div className="bg-red-100 p-5 rounded-full mb-3 shadow-md">
                    {/* ...icon... */}
                  </div>
                  <div className="text-lg font-bold text-red-800 mb-1">Retailer</div>
                  <div className="text-gray-600 text-xs text-center">{nfcData.rr}</div>
                </div>
              </div>
            </div>

            {/* Details Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Farmer */}
              <div className="bg-teal-50 rounded-2xl shadow-lg p-4">
                <div className="text-lg font-bold text-teal-800 mb-2">Farmer</div>
                <div className="text-gray-700 text-xs">
                  <p>{nfcData.fh}</p>
                  <p><strong>Q:</strong> {nfcData.fq}</p>
                  <p><strong>D:</strong> {nfcData.fd}</p>
                </div>
              </div>
              {/* Processor */}
              <div className="bg-yellow-50 rounded-2xl shadow-lg p-4">
                <div className="text-lg font-bold text-yellow-800 mb-2">Processor</div>
                <div className="text-gray-700 text-xs">
                  <p>{nfcData.pp}</p>
                  <p><strong>Q:</strong> {nfcData.pq}</p>
                  <p><strong>D:</strong> {nfcData.pd}</p>
                </div>
              </div>
              {/* Distributor */}
              <div className="bg-blue-50 rounded-2xl shadow-lg p-4">
                <div className="text-lg font-bold text-blue-800 mb-2">Distributor</div>
                <div className="text-gray-700 text-xs">
                  <p>{nfcData.dd}</p>
                  <p><strong>Q:</strong> {nfcData.dq}</p>
                  <p><strong>D:</strong> {nfcData.ddt}</p>
                </div>
              </div>
              {/* Retailer */}
              <div className="bg-red-50 rounded-2xl shadow-lg p-4">
                <div className="text-lg font-bold text-red-800 mb-2">Retailer</div>
                <div className="text-gray-700 text-xs">
                  <p>{nfcData.rr}</p>
                  <p><strong>Q:</strong> {nfcData.rq}</p>
                  <p><strong>D:</strong> {nfcData.rdt}</p>
                  <p><strong>P:</strong> {nfcData.rp}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

/*
Insert the following JSON as a text record into the NFC tag (fits within 540 bytes):

{
  "i":"nfc1",
  "n":"Onions",
  "fh":"PatilFarms,Nashik",
  "fq":1800,
  "fd":"2025-02-10",
  "pp":"MahaAgriProc,Lasalgaon",
  "pq":1650,
  "pd":"2025-02-15",
  "dd":"PuneVeggie,APMC Pune",
  "dq":1400,
  "ddt":"2025-02-20",
  "rr":"More,Pune",
  "rq":1200,
  "rdt":"2025-02-25",
  "rp":"₹38/kg"
}
*/