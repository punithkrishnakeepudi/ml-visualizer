import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PCAViz = ({ step }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!step || !step.chart_data) return;
        const { points, vectors } = step.chart_data;
        const width = 800;
        const height = 500;
        const padding = 100;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const x = d3.scaleLinear().domain([0, 10]).range([padding, width - padding]);
        const y = d3.scaleLinear().domain([0, 10]).range([height - padding, padding]);

        svg.selectAll(".point").data(points).enter().append("circle")
            .attr("cx", d => x(d[0])).attr("cy", d => y(d[1])).attr("r", 5).attr("fill", "#64748b");

        if (vectors) {
            vectors.forEach((v, i) => {
                svg.append("line")
                    .attr("x1", x(5)).attr("y1", y(5))
                    .attr("x2", x(5 + v[0] * 3)).attr("y2", y(5 + v[1] * 3))
                    .attr("stroke", i === 0 ? "#3b82f6" : "#10b981").attr("stroke-width", 4)
                    .attr("marker-end", "url(#arrow)");
            });
        }
    }, [step]);

    return (
        <div className="glass p-6 rounded-3xl border border-surface-800 bg-surface-900/40 shadow-2xl">
            <svg ref={svgRef} width="800" height="500" viewBox="0 0 800 500"></svg>
        </div>
    );
};

export default PCAViz;
