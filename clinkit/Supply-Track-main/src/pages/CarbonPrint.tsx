import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

declare module "topojson-client";

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

      const projection = d3.geoMercator().fitSize([width, height], topojson.feature(topoData, topoData.objects[Object.keys(topoData.objects)[0]]) as any);
      const path = d3.geoPath().projection(projection);

      const states = topojson.feature(topoData, topoData.objects[Object.keys(topoData.objects)[0]]) as any;

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
      <h1 className="text-4xl font-bold text-center text-green-700 mb-10 mt-4">
        Maharashtra Agricultural Blockchain Map
      </h1>
      <p className="text-center text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
        This interactive map represents regions where blockchain-enabled agricultural tracking is active or upcoming in Maharashtra. Hover to explore districts.
      </p>
      <div className="flex justify-center mt-16 mb-8">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <svg ref={svgRef} className="w-full max-w-4xl h-[600px] border border-gray-300 rounded-lg"></svg>
        </div>
      </div>
    </div>
  );
};

export default MaharashtraMap;
