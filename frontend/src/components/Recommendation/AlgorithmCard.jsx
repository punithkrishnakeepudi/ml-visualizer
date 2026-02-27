import React from 'react';

const AlgorithmCard = ({ algo, onSelect, isBest }) => {
    return (
        <div className={`relative glass p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-2xl 
            ${isBest ? 'border-primary-500 bg-primary-500/5' : 'border-surface-800'}`}>

            {isBest && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-amber-600 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Best Match
                </div>
            )}

            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-bold text-surface-50">{algo.name}</h3>
                    <span className="text-xs text-surface-500 uppercase tracking-widest">{algo.type}</span>
                </div>
                <div className="relative w-12 h-12 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                        <circle cx="24" cy="24" r="20" fill="none" stroke="#1e293b" strokeWidth="4" />
                        <circle
                            cx="24" cy="24" r="20" fill="none" stroke="#435bff" strokeWidth="4"
                            strokeDasharray={2 * Math.PI * 20}
                            strokeDashoffset={2 * Math.PI * 20 * (1 - algo.suitability / 100)}
                            strokeLinecap="round"
                        />
                    </svg>
                    <span className="absolute text-[10px] font-bold">{algo.suitability}%</span>
                </div>
            </div>

            <div className="space-y-4 mb-8">
                <div>
                    <p className="text-sm text-surface-400 mb-2 italic">Why this fits:</p>
                    <ul className="text-sm space-y-1">
                        {algo.reasons.map((r, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-primary-500 mt-1">●</span>
                                <span className="text-surface-300">{r}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                    {algo.pros.map(p => (
                        <span key={p} className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20">
                            + {p}
                        </span>
                    ))}
                    {algo.cons.map(c => (
                        <span key={c} className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">
                            - {c}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs text-surface-500 font-mono">
                    <span>Complexity</span>
                    <span className="text-surface-300">{algo.complexity}</span>
                </div>
                <button
                    onClick={() => onSelect(algo)}
                    className="w-full py-2.5 bg-primary-600 hover:bg-primary-500 rounded-xl font-bold transition-all"
                >
                    Run & Visualize
                </button>
            </div>
        </div>
    );
};

export default AlgorithmCard;
