import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LinearRegressionViz = ({ step }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!step || !step.chart_data) return;

        const { points, line } = step.chart_data;
        const width = 800;
        const height = 500;
        const padding = 50;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const xExtent = d3.extent(points, d => d[0]);
        const yExtent = d3.extent(points, d => d[1]);
        const xDomain = [Math.min(0, xExtent[0] * 0.9), xExtent[1] * 1.1];
        const yDomain = [Math.min(0, yExtent[0] * 0.9), yExtent[1] * 1.1];

        const x = d3.scaleLinear().domain(xDomain).range([padding, width - padding]);
        const y = d3.scaleLinear().domain(yDomain).range([height - padding, padding]);

        svg.append("g")
            .attr("transform", `translate(0,${height - padding})`)
            .call(d3.axisBottom(x).ticks(10).tickSize(-height + 2 * padding))
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").attr("stroke", "#1e293b").attr("stroke-dasharray", "2,2"))
            .call(g => g.selectAll(".tick text").attr("fill", "#64748b").attr("font-size", "10px"));

        svg.append("g")
            .attr("transform", `translate(${padding},0)`)
            .call(d3.axisLeft(y).ticks(10).tickSize(-width + 2 * padding))
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").attr("stroke", "#1e293b").attr("stroke-dasharray", "2,2"))
            .call(g => g.selectAll(".tick text").attr("fill", "#64748b").attr("font-size", "10px"));

        svg.selectAll(".point")
            .data(points)
            .enter()
            .append("circle")
            .attr("cx", d => x(d[0]))
            .attr("cy", d => y(d[1]))
            .attr("r", 5)
            .attr("fill", "#38bdf8")
            .attr("stroke", "#020617")
            .attr("stroke-width", 1.5);

        if (line) {
            const x1 = xDomain[0];
            const y1 = line.m * x1 + line.c;
            const x2 = xDomain[1];
            const y2 = line.m * x2 + line.c;

            svg.append("line")
                .attr("x1", x(x1))
                .attr("y1", y(y1))
                .attr("x2", x(x2))
                .attr("y2", y(y2))
                .attr("stroke", "#f43f5e")
                .attr("stroke-width", 4)
                .attr("stroke-linecap", "round");
        }
    }, [step]);

    return (
        <div className="glass p-6 rounded-3xl border border-surface-800 bg-surface-900/40 shadow-2xl">
            <svg ref={svgRef} width="800" height="500" viewBox="0 0 800 500"></svg>
        </div>
    );
};

export default LinearRegressionViz;
