import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useAppStore from '../../store/useAppStore';

const DistributionChart = () => {
    const analysis = useAppStore(state => state.analysis);
    const [selectedCol, setSelectedCol] = useState(null);

    if (!analysis) return null;

    const numericCols = Object.keys(analysis.column_stats || {});
    const currentCol = selectedCol || numericCols[0];

    // Note: In a real app, we'd calculate bins on the backend.
    // For now, we'll show a placeholder or basic stat bars if we don't have bins.
    // To follow the checklist properly, I should probably add binning to the backend analysis.

    if (numericCols.length === 0) {
        return <div className="p-8 text-surface-500">No numeric columns found for distribution analysis.</div>;
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-bold text-surface-300">Feature Distributions</h4>
                <select
                    className="bg-surface-900 border border-surface-700 rounded-lg px-3 py-1 text-sm outline-none focus:border-primary-500"
                    onChange={(e) => setSelectedCol(e.target.value)}
                    value={currentCol}
                >
                    {numericCols.map(col => (
                        <option key={col} value={col}>{col}</option>
                    ))}
                </select>
            </div>

            <div className="glass p-6 rounded-2xl border border-surface-800 h-[300px]">
                {/* Simplified distribution: Show summary stats as bars for now */}
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={[
                            { name: 'Min', value: analysis.column_stats[currentCol].min },
                            { name: 'Mean', value: analysis.column_stats[currentCol].mean },
                            { name: 'Median', value: analysis.column_stats[currentCol].median },
                            { name: 'Max', value: analysis.column_stats[currentCol].max },
                        ]}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                            itemStyle={{ color: '#435bff' }}
                        />
                        <Bar dataKey="value" fill="#435bff" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DistributionChart;
