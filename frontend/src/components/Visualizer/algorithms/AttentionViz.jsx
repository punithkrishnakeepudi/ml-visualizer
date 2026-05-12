import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const AttentionViz = ({ step }) => {
    const svgRef = useRef();
    useEffect(() => {
        if (!step || !step.chart_data) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        svg.append("text").attr("x", 400).attr("y", 250).attr("text-anchor", "middle").attr("fill", "white").text("Transformer Self-Attention Heatmap");
    }, [step]);
    return <div className="glass p-6 rounded-3xl border border-surface-800 bg-surface-900/40 shadow-2xl"><svg ref={svgRef} width="800" height="500"></svg></div>;
};

export default AttentionViz;
