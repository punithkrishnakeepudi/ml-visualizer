import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const KMeansViz = ({ step }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!step || !step.chart_data) return;

        const { points, centroids, assignments } = step.chart_data;
        const width = 800;
        const height = 500;
        const padding = 50;

        // Clear previous SVG
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const x = d3.scaleLinear()
            .domain([0, 120]) // Based on sample data in process.py
            .range([padding, width - padding]);

        const y = d3.scaleLinear()
            .domain([0, 100])
            .range([height - padding, padding]);

        const colors = d3.scaleOrdinal(d3.schemeCategory10);

        // Draw points
        svg.selectAll(".point")
            .data(points)
            .enter()
            .append("circle")
            .attr("class", "point")
            .attr("cx", d => x(d[0]))
            .attr("cy", d => y(d[1]))
            .attr("r", 6)
            .attr("fill", (d, i) => assignments ? colors(assignments[i]) : "#64748b")
            .attr("stroke", "#020617")
            .attr("stroke-width", 2)
            .style("transition", "all 0.5s ease");

        // Draw centroids
        if (centroids) {
            svg.selectAll(".centroid")
                .data(centroids)
                .enter()
                .append("rect")
                .attr("class", "centroid shadow-lg")
                .attr("x", d => x(d[0]) - 8)
                .attr("y", d => y(d[1]) - 8)
                .attr("width", 16)
                .attr("height", 16)
                .attr("fill", (d, i) => colors(i))
                .attr("stroke", "white")
                .attr("stroke-width", 3)
                .attr("rx", 4)
                .style("transition", "all 0.5s ease");

            // Draw connection lines if assigned
            if (assignments) {
                svg.selectAll(".connector")
                    .data(points)
                    .enter()
                    .append("line")
                    .attr("class", "connector")
                    .attr("x1", d => x(d[0]))
                    .attr("y1", d => y(d[1]))
                    .attr("x2", (d, i) => x(centroids[assignments[i]][0]))
                    .attr("y2", (d, i) => y(centroids[assignments[i]][1]))
                    .attr("stroke", (d, i) => colors(assignments[i]))
                    .attr("stroke-width", 1)
                    .attr("stroke-dasharray", "4,4")
                    .attr("opacity", 0.3);
            }
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

export default KMeansViz;
