import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

declare module "topojson-client";

// Real data for Maharashtra
const MAHARASHTRA_PRICES = {
  "2024-12": {
    onion_avg_price_per_kg: 25.8,
    turmeric_avg_price_per_kg: 147.2,
    wheat_avg_price_per_kg: 25.0,
  },
  "2025-01": {
    onion_avg_price_per_kg: 25.8,
    turmeric_avg_price_per_kg: 147.2,
    wheat_avg_price_per_kg: 25.0,
  },
  "2025-02": {
    onion_avg_price_per_kg: 25.8,
    turmeric_avg_price_per_kg: 147.2,
    wheat_avg_price_per_kg: 25.0,
  },
  "2025-03": {
    onion_avg_price_per_kg: 25.8,
    turmeric_avg_price_per_kg: 147.2,
    wheat_avg_price_per_kg: 25.0,
  },
  "2025-04": {
    onion_avg_price_per_kg: 11.6,
    turmeric_avg_price_per_kg: 115.3,
    wheat_avg_price_per_kg: 24.5,
  },
  "2025-05": {
    onion_avg_price_per_kg: 25.8,
    turmeric_avg_price_per_kg: 119.0,
    wheat_avg_price_per_kg: 24.5,
  },
};

// Prepare data for chart
const MONTH_LABELS = {
  "2024-12": "Dec",
  "2025-01": "Jan",
  "2025-02": "Feb",
  "2025-03": "Mar",
  "2025-04": "Apr",
  "2025-05": "May",
};

const CHART_COMMODITIES = [
  {
    name: "Onion",
    color: "#a855f7",
    prices: Object.entries(MAHARASHTRA_PRICES).map(([month, data]) => ({
      month: MONTH_LABELS[month as keyof typeof MONTH_LABELS] || month,
      price: data.onion_avg_price_per_kg,
    })),
  },
  {
    name: "Turmeric",
    color: "#f59e42",
    prices: Object.entries(MAHARASHTRA_PRICES).map(([month, data]) => ({
      month: MONTH_LABELS[month as keyof typeof MONTH_LABELS] || month,
      price: data.turmeric_avg_price_per_kg,
    })),
  },
  {
    name: "Wheat",
    color: "#22c55e",
    prices: Object.entries(MAHARASHTRA_PRICES).map(([month, data]) => ({
      month: MONTH_LABELS[month as keyof typeof MONTH_LABELS] || month,
      price: data.wheat_avg_price_per_kg,
    })),
  },
];

const HistoricalChart: React.FC = () => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // ...clear chart...
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 260;
    const margin = { top: 30, right: 30, bottom: 40, left: 50 };

    // Flatten all months
    const months = CHART_COMMODITIES[0].prices.map((d) => d.month);

    // Find min/max price
    const allPrices = CHART_COMMODITIES.flatMap((c) => c.prices.map((d) => d.price));
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);

    // Scales
    const x = d3
      .scalePoint()
      .domain(months)
      .range([margin.left, width - margin.right]);
    const y = d3
      .scaleLinear()
      .domain([minPrice * 0.95, maxPrice * 1.05])
      .range([height - margin.bottom, margin.top]);

    // Axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Draw lines
    CHART_COMMODITIES.forEach((commodity) => {
      const line = d3
        .line<{ month: string; price: number }>()
        .x((d) => x(d.month)!)
        .y((d) => y(d.price));
      svg
        .append("path")
        .datum(commodity.prices)
        .attr("fill", "none")
        .attr("stroke", commodity.color)
        .attr("stroke-width", 2.5)
        .attr("d", line as any);

      // Add labels at last point
      const last = commodity.prices[commodity.prices.length - 1];
      svg
        .append("text")
        .attr("x", x(last.month)! + 8)
        .attr("y", y(last.price))
        .attr("fill", commodity.color)
        .attr("font-size", 13)
        .attr("alignment-baseline", "middle")
        .text(commodity.name);
    });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-10">
      <h2 className="text-xl font-bold text-green-700 mb-2 text-center">
        Historical Prices (Last 6 Months, Maharashtra)
      </h2>
      <svg ref={chartRef} width={600} height={260} className="mx-auto block" />
      <div className="flex justify-center gap-6 mt-2">
        {CHART_COMMODITIES.map((c) => (
          <span key={c.name} className="flex items-center gap-2 text-sm">
            <span style={{ background: c.color, width: 16, height: 4, display: "inline-block" }} />
            {c.name}
          </span>
        ))}
      </div>
    </div>
  );
};

const MaharashtraMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/maharashtra.topo.json");
      const topoData = await res.json();

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear SVG

      const width = 800;
      const height = 600;

      const projection = d3.geoMercator().fitSize(
        [width, height],
        topojson.feature(
          topoData,
          topoData.objects[Object.keys(topoData.objects)[0]]
        ) as any
      );
      const path = d3.geoPath().projection(projection);

      const states = topojson.feature(
        topoData,
        topoData.objects[Object.keys(topoData.objects)[0]]
      ) as any;

      svg
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("background", "#f0fdf4");

      svg
        .selectAll("path")
        .data(states.features)
        .join("path")
        .attr("d", (d: any) => path(d) as string)
        .attr("fill", "#3b82f6")
        .attr("stroke", "#1e3a8a")
        .on("mouseover", function () {
          d3.select(this).attr("fill", "#22c55e");
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", "#3b82f6");
        });
    };

    fetchData();
  }, []);

  return (
    <div className="p-16 bg-gray-50 min-h-screen">
      {/* Historical Chart */}
      <HistoricalChart />
      {/* Map Section */}
      <div className="flex justify-center mt-16 mb-8">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <svg ref={svgRef} className="w-full max-w-4xl h-[600px] border border-gray-300 rounded-lg"></svg>
        </div>
      </div>
    </div>
  );
};

export default MaharashtraMap;
