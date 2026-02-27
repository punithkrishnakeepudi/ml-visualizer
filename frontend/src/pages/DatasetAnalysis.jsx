import React from 'react';
import useAppStore from '../store/useAppStore';
import CorrelationHeatmap from '../components/Analysis/CorrelationHeatmap';
import DistributionChart from '../components/Analysis/DistributionChart';
import { Link } from 'react-router-dom';

const DatasetAnalysis = () => {
    const analysis = useAppStore(state => state.analysis);

    if (!analysis) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-xl text-surface-400 mb-6">No dataset analyzed yet.</p>
                <Link to="/upload" className="px-6 py-2 bg-primary-600 rounded-lg">Go to Upload</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Step 2: Data Insights</h1>
                    <p className="text-surface-400">We've automatically analyzed your dataset. Here's what we found.</p>
                </div>
                <Link to="/recommend" className="px-8 py-3 bg-primary-600 hover:bg-primary-500 rounded-lg font-semibold transition-all">
                    Next: Get Recommendations →
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="glass p-6 rounded-2xl border border-surface-800 flex flex-col items-center justify-center text-center">
                    <span className="text-5xl font-bold text-primary-400 mb-2">{analysis.row_count}</span>
                    <span className="text-surface-400 uppercase tracking-widest text-xs">Total Rows</span>
                </div>
                <div className="glass p-6 rounded-2xl border border-surface-800 flex flex-col items-center justify-center text-center">
                    <span className="text-5xl font-bold text-primary-400 mb-2">{analysis.column_count}</span>
                    <span className="text-surface-400 uppercase tracking-widest text-xs">Features</span>
                </div>
                <div className="glass p-6 rounded-2xl border border-surface-800 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-bold text-primary-400 mb-2 capitalize">{analysis.problem_type}</span>
                    <span className="text-surface-400 uppercase tracking-widest text-xs">Detected Task</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CorrelationHeatmap />
                <DistributionChart />
            </div>

            <div className="mt-12 glass p-8 rounded-2xl border border-surface-800">
                <h3 className="text-xl font-bold mb-6">Dataset Health</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(analysis.null_summary).map(([col, stats]) => (
                        <div key={col} className={`p-4 rounded-xl border ${stats.count > 0 ? 'bg-amber-500/5 border-amber-500/20' : 'bg-green-500/5 border-green-500/20'}`}>
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-surface-200 truncate pr-2">{col}</span>
                                {stats.count > 0 ? (
                                    <span className="text-amber-500 text-xs font-bold">⚠️ {stats.count} nulls</span>
                                ) : (
                                    <span className="text-green-500 text-xs font-bold">✓ Clean</span>
                                )}
                            </div>
                            <div className="w-full bg-surface-800 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div
                                    className={`h-full ${stats.count > 0 ? 'bg-amber-500' : 'bg-green-500'}`}
                                    style={{ width: `${100 - stats.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DatasetAnalysis;
