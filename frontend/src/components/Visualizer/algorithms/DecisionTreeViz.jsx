import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DecisionTreeViz = ({ step }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!step || !step.chart_data) return;

        const { points, split, assignments, tree } = step.chart_data;
        const width = 800;
        const height = 500;
        const padding = 50;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const x = d3.scaleLinear().domain([0, 10]).range([padding, width - padding]);
        const y = d3.scaleLinear().domain([0, 10]).range([height - padding, padding]);
        const colors = d3.scaleOrdinal().domain([0, 1]).range(["#ef4444", "#10b981"]);

        // If we have tree structure data, draw a tree instead of points
        if (tree) {
            const root = d3.hierarchy(tree[0]);
            const treeLayout = d3.tree().size([width - 2 * padding, height / 2]);
            treeLayout(root);

            const g = svg.append("g").attr("transform", `translate(${padding}, ${padding})`);

            // Links
            g.selectAll(".link")
                .data(root.links())
                .enter()
                .append("line")
                .attr("class", "link")
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y)
                .attr("stroke", "#334155")
                .attr("stroke-width", 2);

            // Nodes
            const nodes = g.selectAll(".node")
                .data(root.descendants())
                .enter()
                .append("g")
                .attr("transform", d => `translate(${d.x}, ${d.y})`);

            nodes.append("circle")
                .attr("r", 20)
                .attr("fill", "#1e293b")
                .attr("stroke", "#3b82f6")
                .attr("stroke-width", 2);

            nodes.append("text")
                .attr("dy", 35)
                .attr("text-anchor", "middle")
                .attr("fill", "white")
                .attr("font-size", "10px")
                .text(d => d.data.text);
        } else {
            // Draw Points
            svg.selectAll(".point")
                .data(points)
                .enter()
                .append("circle")
                .attr("cx", d => x(d[0]))
                .attr("cy", d => y(d[1]))
                .attr("r", 6)
                .attr("fill", d => colors(d[2]))
                .attr("stroke", "#020617")
                .attr("stroke-width", 1)
                .attr("opacity", (d, i) => assignments ? (assignments[i] === 0 ? 1 : 0.4) : 1)
                .style("transition", "all 0.5s ease");

            // Draw Split Line
            if (split) {
                if (split.axis === 'x') {
                    svg.append("line")
                        .attr("x1", x(split.value))
                        .attr("y1", padding)
                        .attr("x2", x(split.value))
                        .attr("y2", height - padding)
                        .attr("stroke", "#3b82f6")
                        .attr("stroke-width", 4)
                        .attr("stroke-dasharray", "8,4")
                        .style("transition", "all 0.5s ease");
                } else {
                    svg.append("line")
                        .attr("x1", padding)
                        .attr("y1", y(split.value))
                        .attr("x2", width - padding)
                        .attr("y2", y(split.value))
                        .attr("stroke", "#3b82f6")
                        .attr("stroke-width", 4)
                        .attr("stroke-dasharray", "8,4")
                        .style("transition", "all 0.5s ease");
                }
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

export default DecisionTreeViz;
