import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const NeuralNetworkViz = ({ step }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!step || !step.chart_data) return;
        const { layers, active, loss_curve } = step.chart_data;
        const width = 800;
        const height = 500;
        const padding = 50;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        if (loss_curve) {
            // Draw loss curve
            const x = d3.scaleLinear().domain([0, loss_curve.length - 1]).range([padding, width - padding]);
            const y = d3.scaleLinear().domain([0, d3.max(loss_curve)]).range([height - padding, padding]);
            const line = d3.line().x((d, i) => x(i)).y(d => y(d));

            svg.append("path").datum(loss_curve).attr("fill", "none").attr("stroke", "#3b82f6").attr("stroke-width", 3).attr("d", line);
        } else if (layers) {
            const layerSpacing = (width - 2 * padding) / (layers.length - 1);

            // Connections
            layers.forEach((nodes, i) => {
                if (i === layers.length - 1) return;
                const nextNodes = layers[i+1];
                for(let j=0; j<nodes; j++) {
                    for(let k=0; k<nextNodes; k++) {
                        svg.append("line")
                            .attr("x1", padding + i * layerSpacing)
                            .attr("y1", padding + (j + 1) * (height - 2 * padding) / (nodes + 1))
                            .attr("x2", padding + (i + 1) * layerSpacing)
                            .attr("y2", padding + (k + 1) * (height - 2 * padding) / (nextNodes + 1))
                            .attr("stroke", active === 'forward' ? (i === 0 ? "#3b82f6" : "#1e293b") : (i === layers.length - 2 ? "#ef4444" : "#1e293b"))
                            .attr("stroke-width", 1).attr("opacity", 0.5);
                    }
                }
            });

            // Nodes
            layers.forEach((nodes, i) => {
                for(let j=0; j<nodes; j++) {
                    svg.append("circle")
                        .attr("cx", padding + i * layerSpacing)
                        .attr("cy", padding + (j + 1) * (height - 2 * padding) / (nodes + 1))
                        .attr("r", 10).attr("fill", "#0f172a").attr("stroke", "#3b82f6").attr("stroke-width", 2);
                }
            });
        }

    }, [step]);

    return (
        <div className="glass p-6 rounded-3xl border border-surface-800 bg-surface-900/40 shadow-2xl">
            <svg ref={svgRef} width="800" height="500" viewBox="0 0 800 500"></svg>
        </div>
    );
};

export default NeuralNetworkViz;
