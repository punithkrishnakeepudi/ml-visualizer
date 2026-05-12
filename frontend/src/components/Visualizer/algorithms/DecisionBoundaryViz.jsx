import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DecisionBoundaryViz = ({ step }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!step || !step.chart_data) return;
        const { points, support_vectors, hyperplane } = step.chart_data;
        const width = 800;
        const height = 500;
        const padding = 50;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const x = d3.scaleLinear().domain([0, 10]).range([padding, width - padding]);
        const y = d3.scaleLinear().domain([0, 10]).range([height - padding, padding]);
        const colors = d3.scaleOrdinal().domain([0, 1]).range(["#ef4444", "#10b981"]);

        // Draw points
        svg.selectAll(".point")
            .data(points)
            .enter()
            .append("circle")
            .attr("cx", d => x(d[0]))
            .attr("cy", d => y(d[1]))
            .attr("r", 6)
            .attr("fill", d => colors(d[2]))
            .attr("stroke", (d, i) => support_vectors && support_vectors.includes(i) ? "white" : "#020617")
            .attr("stroke-width", (d, i) => support_vectors && support_vectors.includes(i) ? 3 : 1);

        // Draw Hyperplane
        if (hyperplane) {
            const x1 = 0, x2 = 10;
            const y1 = hyperplane.m * x1 + hyperplane.b;
            const y2 = hyperplane.m * x2 + hyperplane.b;

            svg.append("line")
                .attr("x1", x(x1)).attr("y1", y(y1))
                .attr("x2", x(x2)).attr("y2", y(y2))
                .attr("stroke", "white").attr("stroke-width", 3);

            if (hyperplane.margin) {
                // Draw margins
                [hyperplane.margin, -hyperplane.margin].forEach(m => {
                     svg.append("line")
                        .attr("x1", x(x1)).attr("y1", y(y1 + m))
                        .attr("x2", x(x2)).attr("y2", y(y2 + m))
                        .attr("stroke", "white").attr("stroke-width", 1).attr("stroke-dasharray", "5,5").attr("opacity", 0.5);
                });
            }
        }

    }, [step]);

    return (
        <div className="glass p-6 rounded-3xl border border-surface-800 bg-surface-900/40 shadow-2xl">
            <svg ref={svgRef} width="800" height="500" viewBox="0 0 800 500"></svg>
        </div>
    );
};

export default DecisionBoundaryViz;
