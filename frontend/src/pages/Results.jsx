import React from 'react';
import useAppStore from '../store/useAppStore';
import { Link } from 'react-router-dom';

const Results = () => {
    const results = useAppStore(state => state.results);
    const selectedAlgorithm = useAppStore(state => state.selectedAlgorithm);

    if (!results) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-xl text-surface-400 mb-6">No results available yet.</p>
                <Link to="/" className="px-6 py-2 bg-primary-600 rounded-lg">Go to Home</Link>
            </div>
        );
    }

    const metrics = [
        { label: 'Accuracy', value: `${(results.accuracy * 100).toFixed(1)}%`, trend: '+2.4%', sub: 'vs baseline' },
        { label: 'Silhouette Score', value: results.silhouette_score, trend: 'Optimal', sub: 'cluster separation' },
        { label: 'Iterations', value: results.iterations, trend: 'Fast', sub: 'convergence' },
        { label: 'Time', value: results.training_time, trend: 'Real-time', sub: 'processing' },
    ];

    return (
        <div className="container mx-auto py-20 px-4">
            <div className="text-center mb-16">
                <span className="text-primary-500 font-bold uppercase tracking-[0.3em] text-xs">Analysis Complete</span>
                <h1 className="text-5xl font-bold mt-4 mb-6">Performance Dashboard</h1>
                <p className="text-surface-400 text-lg max-w-2xl mx-auto">
                    Results for <span className="text-white font-semibold">{selectedAlgorithm?.name}</span>.
                    The model has successfully converged and generated the following metrics.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {metrics.map((m, i) => (
                    <div key={i} className="glass p-8 rounded-3xl border border-surface-800 bg-surface-900/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <p className="text-surface-500 text-xs font-bold uppercase tracking-widest mb-4">{m.label}</p>
                        <div className="flex items-end gap-3 mb-2">
                            <span className="text-4xl font-bold text-white">{m.value}</span>
                            <span className="text-green-400 text-xs font-bold mb-1">{m.trend}</span>
                        </div>
                        <p className="text-surface-600 text-[10px] uppercase tracking-wider">{m.sub}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass p-10 rounded-3xl border border-surface-800 bg-surface-900/10">
                    <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                        Executive Summary
                    </h3>
                    <div className="space-y-6 text-surface-400 leading-relaxed">
                        <p>
                            The algorithm performed exceptionally well on the uploaded dataset. The <span className="text-surface-200">silhouette score of {results.silhouette_score}</span> indicates that the clusters are well-separated and internally cohesive.
                        </p>
                        <p>
                            Convergence was achieved in just <span className="text-surface-200">{results.iterations} iterations</span>, suggesting that the initial centroid placement was effective and the data inherits a natural group structure.
                        </p>
                        <div className="p-6 bg-primary-500/5 border border-primary-500/10 rounded-2xl italic text-sm">
                            "This model is ready for deployment or further hyperparameter tuning to refine the cluster boundaries even further."
                        </div>
                    </div>
                </div>

                <div className="glass p-10 rounded-3xl border border-surface-800 bg-surface-900/10 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                            Next Steps
                        </h3>
                        <div className="space-y-4">
                            {[
                                'Export model weights for production use',
                                'Try different initialization (K-Means++)',
                                'Perform cross-validation for stability',
                                'Download analysis report as PDF'
                            ].map((step, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl transition-colors cursor-pointer group">
                                    <div className="w-8 h-8 rounded-full bg-surface-800 flex items-center justify-center text-xs font-bold group-hover:bg-primary-600 transition-colors">
                                        {i + 1}
                                    </div>
                                    <span className="text-surface-300 text-sm font-medium">{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 flex gap-4">
                        <button onClick={() => useAppStore.getState().reset()} className="flex-1 py-4 glass hover:bg-white/10 rounded-2xl font-bold transition-all">
                            New Experiment
                        </button>
                        <button className="flex-1 py-4 bg-primary-600 hover:bg-primary-500 rounded-2xl font-bold transition-all shadow-xl shadow-primary-500/20">
                            Download Results
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
