import React from 'react';
import useAppStore from '../../store/useAppStore';

const DataPreview = () => {
    const dataset = useAppStore((state) => state.dataset);
    const analysis = useAppStore((state) => state.analysis);

    if (!dataset) return null;

    const columns = Object.keys(dataset[0] || {});

    return (
        <div className="mt-8 w-full overflow-hidden">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Data Preview</h3>
                <p className="text-sm text-surface-400">Showing first 10 rows</p>
            </div>
            <div className="glass rounded-xl overflow-x-auto border border-surface-800">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 border-b border-surface-800">
                            {columns.map((col) => (
                                <th key={col} className="p-4 whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-surface-100">{col}</span>
                                        {analysis && analysis.column_types[col] && (
                                            <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded mt-1 inline-block w-fit
                        ${analysis.column_types[col] === 'numerical' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                                                {analysis.column_types[col]}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dataset.map((row, i) => (
                            <tr key={i} className="border-b border-surface-800/50 hover:bg-white/5 transition-colors">
                                {columns.map((col) => (
                                    <td key={col} className="p-4 text-sm text-surface-300">
                                        {row[col] === null ? (
                                            <span className="text-amber-500/70 italic">null</span>
                                        ) : (
                                            String(row[col])
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataPreview;
