import React from 'react';
import { useNavigate } from 'react-router-dom';
import DatasetUploader from '../components/Upload/DatasetUploader';
import SampleDatasetPicker from '../components/Upload/SampleDatasetPicker';
import DataPreview from '../components/Upload/DataPreview';
import useAppStore from '../store/useAppStore';

const DatasetUpload = () => {
    const dataset = useAppStore(state => state.dataset);
    const navigate = useNavigate();

    return (
        <div className="container mx-auto py-12 px-4 shadow-2xl">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-indigo-500">
                    Step 1: Upload Your Data
                </h1>
                <p className="text-surface-400 text-lg">Upload a CSV or Excel file to get started with your visualization.</p>
            </div>

            {!dataset ? (
                <>
                    <DatasetUploader />
                    <SampleDatasetPicker />
                </>
            ) : (
                <div className="flex flex-col items-center">
                    <DataPreview />
                    <div className="mt-12 flex gap-4">
                        <button
                            className="px-8 py-3 glass hover:bg-white/10 rounded-lg font-semibold transition-all"
                            onClick={() => useAppStore.getState().reset()}
                        >
                            Clear & Start Over
                        </button>
                        <button
                            className="px-8 py-3 bg-primary-600 hover:bg-primary-500 rounded-lg font-semibold transition-all shadow-lg shadow-primary-500/20"
                            onClick={() => navigate('/analyze')}
                        >
                            Analyze & Continue →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatasetUpload;
