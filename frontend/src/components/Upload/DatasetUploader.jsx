import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import useAppStore from '../../store/useAppStore';

const DatasetUploader = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const setDataset = useAppStore((state) => state.setDataset);
    const setAnalysis = useAppStore((state) => state.setAnalysis);

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setIsUploading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setDataset(response.data.preview);
            setAnalysis(response.data.analysis);
            // Navigate or show NEXT button
        } catch (err) {
            setError(err.response?.data?.detail || 'Error uploading file');
            console.error(err);
        } finally {
            setIsUploading(false);
        }
    }, [setDataset, setAnalysis]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/json': ['.json'],
        },
        multiple: false,
    });

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer bg-white/5
          ${isDragActive ? 'border-primary-500 bg-primary-500/10' : 'border-surface-700 hover:border-surface-500'}`}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-primary-500/20 rounded-full text-primary-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xl font-medium text-surface-200">
                            {isDragActive ? 'Drop the file here' : 'Drag & drop your dataset'}
                        </p>
                        <p className="text-surface-400 mt-2">CSV, XLSX or JSON (max. 50MB)</p>
                    </div>
                    <button className="mt-4 px-6 py-2 bg-primary-600 hover:bg-primary-500 rounded-lg font-semibold transition-all">
                        Browse Files
                    </button>
                </div>
            </div>

            {isUploading && (
                <div className="mt-6 p-4 bg-white/5 rounded-xl border border-surface-800 flex items-center gap-4">
                    <div className="animate-spin h-5 w-5 border-2 border-primary-500 border-t-transparent rounded-full"></div>
                    <span className="text-surface-300">Processing dataset...</span>
                </div>
            )}

            {error && (
                <div className="mt-6 p-4 bg-red-500/10 rounded-xl border border-red-500/50 text-red-400 flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </div>
            )}
        </div>
    );
};

export default DatasetUploader;
