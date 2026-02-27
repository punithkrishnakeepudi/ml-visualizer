import { create } from 'zustand';

const useAppStore = create((set) => ({
    dataset: null,
    analysis: null,
    selectedAlgorithm: null,
    currentStep: 0,
    results: null,

    setDataset: (dataset) => set({ dataset }),
    setAnalysis: (analysis) => set({ analysis }),
    selectAlgorithm: (algorithm) => set({ selectedAlgorithm: algorithm }),
    setCurrentStep: (step) => set({ currentStep: step }),
    setResults: (results) => set({ results }),

    reset: () => set({ dataset: null, analysis: null, selectedAlgorithm: null, currentStep: 0, results: null }),
}));

export default useAppStore;
