import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const KNNViz = ({ step }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!step || !step.chart_data) return;

        const { points, query, neighbors, predicted_class } = step.chart_data;
        const width = 800;
        const height = 500;
        const padding = 50;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const xExtent = d3.extent(points, d => d[0]);
        const yExtent = d3.extent(points, d => d[1]);

        const x = d3.scaleLinear().domain([0, 10]).range([padding, width - padding]);
        const y = d3.scaleLinear().domain([0, 10]).range([height - padding, padding]);

        const colors = d3.scaleOrdinal().domain([0, 1]).range(["#ef4444", "#10b981"]);

        // Draw Points
        svg.selectAll(".point")
            .data(points)
            .enter()
            .append("circle")
            .attr("cx", d => x(d[0]))
            .attr("cy", d => y(d[1]))
            .attr("r", 6)
            .attr("fill", d => colors(d[2]))
            .attr("stroke", (d, i) => neighbors && neighbors.includes(i) ? "white" : "#020617")
            .attr("stroke-width", (d, i) => neighbors && neighbors.includes(i) ? 3 : 1)
            .attr("opacity", (d, i) => neighbors && !neighbors.includes(i) ? 0.3 : 1)
            .style("transition", "all 0.5s ease");

        // Draw Query Point
        const queryPoint = svg.append("path")
            .attr("d", d3.symbol().type(d3.symbolStar).size(300))
            .attr("transform", `translate(${x(query[0])}, ${y(query[1])})`)
            .attr("fill", predicted_class !== undefined ? colors(predicted_class) : "white")
            .attr("stroke", "white")
            .attr("stroke-width", 2)
            .style("transition", "all 0.5s ease");

        // Draw neighbor connections
        if (neighbors) {
            svg.selectAll(".neighbor-line")
                .data(neighbors)
                .enter()
                .append("line")
                .attr("x1", x(query[0]))
                .attr("y1", y(query[1]))
                .attr("x2", i => x(points[i][0]))
                .attr("y2", i => y(points[i][1]))
                .attr("stroke", i => colors(points[i][2]))
                .attr("stroke-width", 2)
                .attr("stroke-dasharray", "4,2")
                .attr("opacity", 0.6);

            // Draw a circle indicating the search radius
            const maxDistIdx = neighbors[neighbors.length - 1];
            const maxDist = Math.sqrt(
                Math.pow(points[maxDistIdx][0] - query[0], 2) +
                Math.pow(points[maxDistIdx][1] - query[1], 2)
            );

            svg.append("circle")
                .attr("cx", x(query[0]))
                .attr("cy", y(query[1]))
                .attr("r", Math.abs(x(query[0] + maxDist) - x(query[0])))
                .attr("fill", "none")
                .attr("stroke", "white")
                .attr("stroke-width", 1)
                .attr("stroke-dasharray", "5,5")
                .attr("opacity", 0.2);
        }

    }, [step]);

    return (
        <div className="glass p-6 rounded-3xl border border-surface-800 bg-surface-900/40 shadow-2xl">
            <svg
                ref={svgRef}
                width="800"
                height="500"
                className="overflow-visible"
                viewBox="0 0 800 500"
            ></svg>
        </div>
    );
};

export default KNNViz;
