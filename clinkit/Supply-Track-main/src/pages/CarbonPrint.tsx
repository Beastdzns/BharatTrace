import React, { useEffect, useState } from 'react';

const CarbonPrint: React.FC = () => {
    const numTrucks = 10;
    const initialValue = 200;

    // Different update rates (in milliseconds) for each truck
    const updateRates = [500, 600, 700, 800, 1000, 900, 1100, 950, 1050, 1200];

    // State to hold the carbon footprints for each truck
    const [footprints, setFootprints] = useState(
        Array(numTrucks).fill(initialValue)
    );

    // Function to update carbon footprint values at different rates for each truck
    const updateFootprints = () => {
        setFootprints((prevFootprints) =>
            prevFootprints.map((value) => {
                const increment = 0.2 + Math.random() * 0.5;
                return parseFloat((value + increment).toFixed(1));
            })
        );
    };

    useEffect(() => {
        // Set intervals to update footprints for each truck at different rates
        const intervals = updateRates.map((rate, index) =>
            setInterval(updateFootprints, rate)
        );

        // Cleanup intervals on component unmount
        return () => {
            intervals.forEach(clearInterval);
        };
    }, []);

    return (
        <div className="bg-gray-900 text-white min-h-screen py-10 px-5">
            <h1 className="text-center text-4xl font-bold mb-8 text-teal-400">
                 Carbon Footprint Dashboard
            </h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Dynamically generate truck blocks */}
                {footprints.map((value, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 rounded-xl p-6 text-center shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl"
                    >
                        <h3 className="text-2xl font-semibold text-teal-400 mb-4">
                            Truck {index + 1}
                        </h3>
                        <p className="text-lg text-gray-400 mb-4">
                            Carbon Footprint:{" "}
                            <span className="font-bold text-yellow-500">
                                {value} grams
                            </span>
                        </p>
                        <div className="flex justify-center items-center">
                            <button className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-semibold transition-all hover:bg-teal-600">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarbonPrint;
