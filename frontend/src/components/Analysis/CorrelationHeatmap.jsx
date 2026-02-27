import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import useAppStore from '../../store/useAppStore';

const CorrelationHeatmap = () => {
    const analysis = useAppStore(state => state.analysis);
    const svgRef = useRef();

    useEffect(() => {
        if (!analysis || !analysis.correlations) return;

        const data = analysis.correlations;
        const columns = Object.keys(data);
        if (columns.length === 0) return;

        const margin = { top: 50, right: 20, bottom: 80, left: 100 };
        const width = 500 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Clear previous SVG
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .range([0, width])
            .domain(columns)
            .padding(0.05);

        const y = d3.scaleBand()
            .range([height, 0])
            .domain(columns)
            .padding(0.05);

        const colorScale = d3.scaleSequential()
            .interpolator(d3.interpolateRdBu)
            .domain([1, -1]); // Red for 1, Blue for -1

        svg.append("g")
            .style("font-size", 12)
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickSize(0))
            .selectAll("text")
            .attr("transform", "translate(-10,10)rotate(-45)")
            .style("text-anchor", "end")
            .style("fill", "#94a3b8");

        svg.append("g")
            .style("font-size", 12)
            .call(d3.axisLeft(y).tickSize(0))
            .selectAll("text")
            .style("fill", "#94a3b8");

        svg.selectAll()
            .data(columns.flatMap(row => columns.map(col => ({ row, col, value: data[row][col] }))))
            .enter()
            .append("rect")
            .attr("x", d => x(d.col))
            .attr("y", d => y(d.row))
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("fill", d => colorScale(d.value))
            .style("stroke-width", 2)
            .style("stroke", "none")
            .style("opacity", 0.8)
            .on("mouseover", function (event, d) {
                d3.select(this).style("stroke", "white").style("opacity", 1);
            })
            .on("mouseleave", function (event, d) {
                d3.select(this).style("stroke", "none").style("opacity", 0.8);
            });

        // Add values text
        if (columns.length < 10) {
            svg.selectAll()
                .data(columns.flatMap(row => columns.map(col => ({ row, col, value: data[row][col] }))))
                .enter()
                .append("text")
                .attr("x", d => x(d.col) + x.bandwidth() / 2)
                .attr("y", d => y(d.row) + y.bandwidth() / 2)
                .attr("dy", ".35em")
                .attr("text-anchor", "middle")
                .style("font-size", 10)
                .style("fill", d => Math.abs(d.value) > 0.5 ? "white" : "#94a3b8")
                .text(d => d.value.toFixed(2));
        }

    }, [analysis]);

    if (!analysis || !analysis.correlations || Object.keys(analysis.correlations).length === 0) {
        return (
            <div className="flex items-center justify-center p-12 glass rounded-xl text-surface-500 italic">
                No numeric data available for correlation heatmap.
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            <h4 className="text-lg font-bold mb-4 text-surface-300">Correlation Heatmap</h4>
            <div className="glass p-4 rounded-2xl border border-surface-800">
                <svg ref={svgRef}></svg>
            </div>
        </div>
    );
};

export default CorrelationHeatmap;
