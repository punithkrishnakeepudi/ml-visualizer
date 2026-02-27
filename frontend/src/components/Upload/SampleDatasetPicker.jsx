import React from 'react';

const samples = [
    { id: 'iris', name: 'Iris Flowers', rows: 150, type: 'Classification' },
    { id: 'boston', name: 'Boston Housing', rows: 506, type: 'Regression' },
    { id: 'churn', name: 'Customer Churn', rows: 7043, type: 'Classification' },
    { id: 'mall', name: 'Mall Customers', rows: 200, type: 'Clustering' },
    { id: 'cancer', name: 'Breast Cancer', rows: 569, type: 'Classification' },
];

const SampleDatasetPicker = () => {
    return (
        <div className="mt-12">
            <p className="text-surface-400 mb-4 text-center">Don't have a dataset? Try one of these:</p>
            <div className="flex flex-wrap justify-center gap-3">
                {samples.map((sample) => (
                    <button
                        key={sample.id}
                        className="px-4 py-2 glass hover:bg-white/10 rounded-full text-sm font-medium transition-all flex items-center gap-2"
                    >
                        <span>{sample.name}</span>
                        <span className="text-xs text-surface-500 bg-surface-800 px-2 py-0.5 rounded-full">{sample.type}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SampleDatasetPicker;
