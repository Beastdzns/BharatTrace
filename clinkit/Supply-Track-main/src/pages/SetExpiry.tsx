import React, { useState } from "react";

/**
 *  ----------------------------
 *  1) Constants & Parameters
 *  ----------------------------
 *  These parameters come from:
 *  - Tromp et al. (2012)
 *  - Bruckner (2010)
 *  - Broekmeulen & van Donselaar (2009)
 *
 *  Equation (1): N(τ) = A + C * exp(-exp(-B(T) * (M(T) - τ)))
 *  B(T) = αB * exp(βB * T)
 *  M(T) = αM * exp(βM * T)
 *
 *  Typical threshold values:
 *  - η_waste = 5.3  (log cfu/g) => product is considered near spoilage
 *  - η_unsafe = 6.0 (log cfu/g) => product is fully spoiled/unsafe
 */

const A = 2.95;
const C = 7.56 - A; // ~4.61
const alphaB = 0.104;
const betaB = 0.1573;
const alphaM = 14.525;
const betaM = -0.1365;

const ETA_WASTE = 5.3;    // if N(tau) >= 5.3 => nearing spoilage
const ETA_UNSAFE = 6.0;   // if N(tau) >= 6.0 => spoiled

/**
 *  ----------------------------
 *  2) Helper Functions
 *  ----------------------------
 */

// (a) Compute B(T) and M(T) from Eqn. (2) and (3)
function computeB(T: number) {
  return alphaB * Math.exp(betaB * T);
}

function computeM(T: number) {
  return alphaM * Math.exp(betaM * T);
}

/**
 *  (b) Modified Gompertz to get N(τ) = A + C * exp(-exp(-B(T)*(M(T)-τ)))
 *  @param {number} tau       - age of the product in days
 *  @param {number} temp      - temperature (°C)
 *  @returns {number}         - microbial count (log10 cfu/g)
 */
function computeMicrobialCount(tau: number, temp: number) {
  const B_T = computeB(temp);
  const M_T = computeM(temp);
  return A + C * Math.exp(-Math.exp(-B_T * (M_T - tau)));
}

/**
 *  (c) Continuous Discount Calculation (no preset slabs).
 *  This function uses:
 *    - Microbial count relative to η_waste
 *    - Days left ratio
 *    - Stock level ratio
 *
 *  We combine them into a single "discountFactor" in [0, 1].
 *  Then discount = discountFactor * 100%.
 */
function computeDynamicDiscount(
  microbialCount: number,
  daysLeft: number,
  totalShelfLife: number,
  stockLevel: number
) {
  // 1) Microbial factor => how close to waste threshold?
  //    If N(tau) < A (initial), factor ~ 0; if N(tau) ~ η_waste => factor ~ 1
  const minCount = A; // minimal log count
  const rangeCount = ETA_WASTE - minCount;
  const countFactor = (microbialCount - minCount) / rangeCount; // in [0, 1+] range

  // 2) Expiry factor => fraction of used shelf life
  //    daysLeft = expiryDate - currentDate
  //    If daysLeft ~ totalShelfLife => factor ~ 0; if daysLeft ~ 0 => factor ~ 1
  const usedLife = totalShelfLife - daysLeft; 
  const expiryFactor = usedLife / totalShelfLife; // in [0, 1] range

  // 3) Stock factor => if we have more stock => higher discount
  //    We can define an arbitrary "high stock" threshold, e.g. 200 units
  const highStockThreshold = 200;
  const stockFactor = stockLevel / highStockThreshold; // can exceed 1 if >200

  // Weighted sum => no preset slabs, purely continuous
  // Adjust these weights as needed to reflect business strategy
  const wCount = 0.4;   // weight for microbial factor
  const wExpiry = 0.4;  // weight for expiry factor
  const wStock = 0.2;   // weight for stock factor

  let discountFactor =
    wCount * countFactor + wExpiry * expiryFactor + wStock * stockFactor;

  // clamp to [0, 1]
  if (discountFactor < 0) discountFactor = 0;
  if (discountFactor > 1) discountFactor = 1;

  // final discount in %
  return discountFactor * 100;
}

/**
 *  (d) Simple Inventory Update (based on Eqn. (19) reference)
 *  For demonstration, we do a single-step update at day-end:
 *
 *    I_{t+1,r-1} = [ I_{t,r} - PF_{t,r} - PL_{t,r} + QS_{t}(r) ] * δ(r > nWaste?)
 *
 *  We won't implement full multi-batch logic here, but show a placeholder.
 */
function updateInventory(
  currentInventory: number,
  dailySales: number,
  dailyWaste: number,
  incomingStock: number
): number {
  // Basic approach:
  // newInventory = currentInventory - dailySales - dailyWaste + incomingStock
  return currentInventory - dailySales - dailyWaste + incomingStock;
}

/**
 *  ----------------------------
 *  3) NFC Scanner Component
 *  ----------------------------
 *  Reads product data from NFC (if supported).
 *  Fills in some fields automatically, or user can do manual input below.
 */
const NFCScanner: React.FC<{
  onData: (data: any) => void;
}> = ({ onData }) => {
  const scanNFC = async () => {
    if ("NDEFReader" in window) {
      try {
        const ndef = new (window as any).NDEFReader();
        await ndef.scan();
        ndef.onreading = (event: any) => {
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            const jsonData = decoder.decode(record.data);
            const parsedData = JSON.parse(jsonData);
            onData(parsedData);
          }
        };
      } catch (error) {
        console.error("NFC scan failed:", error);
      }
    } else {
      alert("NFC not supported on this device.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 border border-black rounded-md">
      <h2 className="text-xl font-bold">NFC Scanner</h2>
      <button
        onClick={scanNFC}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 border-2 border-black shadow"
      >
        Scan NFC
      </button>
    </div>
  );
};

/**
 *  ----------------------------
 *  4) Strategic Discount Model
 *  ----------------------------
 *  - Takes user input (or NFC data) for:
 *     manufacturingDate, expiryDate, storageTemp, stockLevel, basePrice, ...
 *  - Computes microbial count N(tau) using Gompertz
 *  - Computes discount using continuous formula
 *  - Updates inventory (placeholder)
 */
const StrategicDiscountModel: React.FC = () => {
  // We'll store product data in a single state object
  const [productData, setProductData] = useState<any>({
    productName: "",
    manufacturingDate: "",
    expiryDate: "",
    storageTemp: 4,     // default 4°C
    stockLevel: 50,     // default stock
    basePrice: 2.99,    // default base price
    dailySales: 0,      // daily sales for the day
    incomingStock: 0,   // new stock arriving
  });

  const [discount, setDiscount] = useState<number | null>(null);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [microbialCount, setMicrobialCount] = useState<number | null>(null);
  const [inventory, setInventory] = useState<number>(50); // track current inventory
  const [message, setMessage] = useState<string>("");

  // For demonstration, we show a day-based "simulation"
  // e.g. how many days have passed since manufacturing
  const [daysPassed, setDaysPassed] = useState<number>(0);

  // Handler for manual user input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler for receiving NFC data
  const handleNFCData = (data: any) => {
    setProductData({
      ...productData,
      ...data,
    });
  };

  // -----------
  // 1) Compute discount + new inventory (simulate end-of-day)
  // -----------
  const computeAll = () => {
    try {
      const { manufacturingDate, expiryDate, storageTemp, stockLevel, basePrice } = productData;

      const tManufacture = new Date(manufacturingDate).getTime();
      const tExpiry = new Date(expiryDate).getTime();
      const tToday = new Date().getTime();

      // days from manufacturing to now:
      const ageDays = Math.floor((tToday - tManufacture) / (1000 * 60 * 60 * 24)) + daysPassed;
      // total shelf life (days) from MFD to expiry:
      const totalShelfLife = Math.ceil((tExpiry - tManufacture) / (1000 * 60 * 60 * 24));

      // how many days left from "now" (plus daysPassed) to expiry
      const daysLeft = totalShelfLife - ageDays;

      // Microbial count at the end of this day
      const tempVal = parseFloat(storageTemp);
      const N_t = computeMicrobialCount(ageDays, tempVal);

      // Compute continuous discount
      const stLevel = parseFloat(stockLevel);
      const baseP = parseFloat(basePrice);

      const dynamicDiscount = computeDynamicDiscount(N_t, daysLeft, totalShelfLife, stLevel);
      // final price after discount
      const newPrice = baseP * (1 - dynamicDiscount / 100);

      setMicrobialCount(N_t);
      setDiscount(dynamicDiscount);
      setFinalPrice(newPrice);

      // Additional message: is product near spoilage?
      let msg = "";
      if (N_t >= ETA_UNSAFE) {
        msg = "❌ Product is unsafe (≥ 6 log cfu/g). Must be wasted.";
      } else if (N_t >= ETA_WASTE) {
        msg = "⚠️ Product near spoilage threshold. High discount recommended.";
      } else {
        msg = "✅ Product is safe to sell.";
      }
      setMessage(msg);
    } catch (err) {
      console.error(err);
    }
  };

  // -----------
  // 2) Simulate End-of-Day Inventory Update (Eqn. (19) reference)
  // -----------
  const endOfDayInventoryUpdate = () => {
    const dailySales = parseFloat(productData.dailySales) || 0;
    let newWaste = 0;

    // If microbialCount >= 6 => everything is wasted
    if (microbialCount && microbialCount >= ETA_UNSAFE) {
      // all current inventory is wasted
      newWaste = inventory;
    }

    // or partial waste if microbialCount >= 5.3 => we might do partial
    // but for simplicity, let's say if it's beyond waste threshold,
    // we keep it but discount heavily. We won't forcibly waste here
    // unless it's truly unsafe (≥ 6).
    const wasted = newWaste;

    // incoming stock
    const incomingStock = parseFloat(productData.incomingStock) || 0;

    // apply Eqn. (19) in a simplified form:
    // I_{t+1} = I_{t} - dailySales - wasted + incomingStock
    const newInventory = updateInventory(inventory, dailySales, wasted, incomingStock);

    setInventory(newInventory < 0 ? 0 : newInventory);
    // Next day
    setDaysPassed(daysPassed + 1);
  };

  return (
    <div className="p-4 bg-white border-4 border-black shadow-lg rounded-lg max-w-3xl w-full">
      <h2 className="text-2xl font-bold mb-4">Strategic Discount & Inventory Model</h2>

      {/* NFC Scanner */}
      <NFCScanner onData={handleNFCData} />

      {/* Manual Inputs */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold">Product Name</label>
          <input
            type="text"
            name="productName"
            value={productData.productName}
            onChange={handleChange}
            className="w-full p-1 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">MFD (Manufacturing Date)</label>
          <input
            type="date"
            name="manufacturingDate"
            value={productData.manufacturingDate}
            onChange={handleChange}
            className="w-full p-1 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={productData.expiryDate}
            onChange={handleChange}
            className="w-full p-1 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Storage Temp (°C)</label>
          <input
            type="number"
            name="storageTemp"
            value={productData.storageTemp}
            onChange={handleChange}
            className="w-full p-1 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Stock Level</label>
          <input
            type="number"
            name="stockLevel"
            value={productData.stockLevel}
            onChange={handleChange}
            className="w-full p-1 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Base Price (€)</label>
          <input
            type="number"
            name="basePrice"
            step="0.01"
            value={productData.basePrice}
            onChange={handleChange}
            className="w-full p-1 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Daily Sales (today)</label>
          <input
            type="number"
            name="dailySales"
            value={productData.dailySales}
            onChange={handleChange}
            className="w-full p-1 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Incoming Stock (today)</label>
          <input
            type="number"
            name="incomingStock"
            value={productData.incomingStock}
            onChange={handleChange}
            className="w-full p-1 border rounded"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <button
          onClick={computeAll}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 border-2 border-black shadow"
        >
          Compute Discount
        </button>
        <button
          onClick={endOfDayInventoryUpdate}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 border-2 border-black shadow"
        >
          End of Day Update
        </button>
      </div>

      {/* Results */}
      <div className="mt-4 p-3 bg-gray-50 border rounded">
        <p className="text-sm">Current Day in Simulation: <strong>{daysPassed}</strong></p>
        <p className="text-sm">Current Inventory: <strong>{inventory}</strong> units</p>
        {microbialCount !== null && (
          <p className="text-sm">Microbial Count (N(τ)): <strong>{microbialCount.toFixed(2)}</strong> log cfu/g</p>
        )}
        {discount !== null && (
          <p className="text-sm text-red-600">
            Discount: <strong>{discount.toFixed(2)}%</strong>
          </p>
        )}
        {finalPrice !== null && (
          <p className="text-sm text-green-600">
            Final Price: <strong>€ {finalPrice.toFixed(2)}</strong>
          </p>
        )}
        {message && <p className="text-sm mt-2">{message}</p>}
      </div>
    </div>
  );
};

/**
 *  ----------------------------
 *  5) Main App
 *  ----------------------------
 */
const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-200 text-black p-6">
      <h1 className="text-3xl font-bold mb-6 border-4 border-black p-4 shadow-lg bg-white">
        🏷️ Smart NFC & Continuous Discount System
      </h1>

      {/* Strategic Discount Model */}
      <StrategicDiscountModel />
    </div>
  );
};

export default App;
