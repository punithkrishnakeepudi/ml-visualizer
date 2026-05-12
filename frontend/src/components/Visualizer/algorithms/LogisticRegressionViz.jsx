import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LogisticRegressionViz = ({ step }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!step || !step.chart_data) return;

        const { points, boundary } = step.chart_data;
        const width = 800;
        const height = 500;
        const padding = 50;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const xExtent = d3.extent(points, d => d[0]);
        const xDomain = [Math.min(0, xExtent[0] * 0.9), xExtent[1] * 1.1];
        const x = d3.scaleLinear().domain(xDomain).range([padding, width - padding]);
        const y = d3.scaleLinear().domain([-0.2, 1.2]).range([height - padding, padding]);

        svg.append("g")
            .attr("transform", `translate(0,${height - padding})`)
            .call(d3.axisBottom(x).ticks(10));

        svg.append("g")
            .attr("transform", `translate(${padding},0)`)
            .call(d3.axisLeft(y).ticks(5));

        svg.selectAll(".point")
            .data(points)
            .enter()
            .append("circle")
            .attr("cx", d => x(d[0]))
            .attr("cy", d => y(d[1]))
            .attr("r", 6)
            .attr("fill", d => d[1] === 1 ? "#10b981" : "#ef4444")
            .attr("stroke", "#020617")
            .attr("stroke-width", 2);

        if (boundary) {
            const sigmoid = (val) => 1 / (1 + Math.exp(-(boundary.m * val + boundary.c)));
            const lineData = d3.range(xDomain[0], xDomain[1], (xDomain[1] - xDomain[0]) / 100)
                .map(val => [val, sigmoid(val)]);
            const lineGenerator = d3.line().x(d => x(d[0])).y(d => y(d[1])).curve(d3.curveBasis);

            svg.append("path")
                .datum(lineData)
                .attr("fill", "none")
                .attr("stroke", "#6366f1")
                .attr("stroke-width", 3)
                .attr("d", lineGenerator);
        }
    }, [step]);

    return (
        <div className="glass p-6 rounded-3xl border border-surface-800 bg-surface-900/40 shadow-2xl">
            <svg ref={svgRef} width="800" height="500" viewBox="0 0 800 500"></svg>
        </div>
    );
};

export default LogisticRegressionViz;
