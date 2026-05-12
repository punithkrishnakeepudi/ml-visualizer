import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../../store/useAppStore';
import PlaybackControls from './PlaybackControls';
import KMeansViz from './algorithms/KMeansViz';
import LinearRegressionViz from './algorithms/LinearRegressionViz';
import LogisticRegressionViz from './algorithms/LogisticRegressionViz';
import KNNViz from './algorithms/KNNViz';
import DecisionTreeViz from './algorithms/DecisionTreeViz';
import DecisionBoundaryViz from './algorithms/DecisionBoundaryViz';
import PCAViz from './algorithms/PCAViz';
import HierarchyViz from './algorithms/HierarchyViz';
import RulesViz from './algorithms/RulesViz';
import NeuralNetworkViz from './algorithms/NeuralNetworkViz';
import AttentionViz from './algorithms/AttentionViz';

const AlgorithmVisualizer = () => {
    const selectedAlgorithm = useAppStore(state => state.selectedAlgorithm);
    const setResults = useAppStore(state => state.setResults);
    const navigate = useNavigate();

    const [steps, setSteps] = useState([]);
    const [currentStepIdx, setCurrentStepIdx] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const startProcessing = async () => {
            if (!selectedAlgorithm) return;
            try {
                const response = await fetch('http://localhost:8000/api/process', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ algorithm: selectedAlgorithm.id })
                });
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let accumulatedSteps = [];
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    const lines = decoder.decode(value).split('\n');
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const data = JSON.parse(line.slice(6));
                            if (data.type === 'final_metrics') setResults(data);
                            else {
                                accumulatedSteps.push(data);
                                setSteps([...accumulatedSteps]);
                            }
                        }
                    }
                }
            } catch (err) { console.error(err); }
        };
        startProcessing();
    }, [selectedAlgorithm, setResults]);

    useEffect(() => {
        let timer;
        if (isPlaying && currentStepIdx < steps.length - 1) {
            timer = setTimeout(() => setCurrentStepIdx(prev => prev + 1), 1500);
        } else if (currentStepIdx === steps.length - 1 && steps.length > 0) {
            setIsPlaying(false);
            setTimeout(() => navigate('/results'), 2000);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, currentStepIdx, steps, navigate]);

    if (!selectedAlgorithm) return <div className="p-12 text-center text-surface-400">Select an algorithm first.</div>;

    const renderVisualization = () => {
        const step = steps[currentStepIdx];
        if (!step) return null;
        switch (selectedAlgorithm.id) {
            case 'kmeans': return <KMeansViz step={step} />;
            case 'linear_regression': return <LinearRegressionViz step={step} />;
            case 'logistic_regression': return <LogisticRegressionViz step={step} />;
            case 'knn': return <KNNViz step={step} />;
            case 'decision_tree': return <DecisionTreeViz step={step} />;
            case 'random_forest':
            case 'svm':
            case 'naive_bayes':
            case 'xgboost': return <DecisionBoundaryViz step={step} />;
            case 'pca': return <PCAViz step={step} />;
            case 'hierarchical': return <HierarchyViz step={step} />;
            case 'apriori': return <RulesViz step={step} />;
            case 'ann':
            case 'cnn':
            case 'rnn': return <NeuralNetworkViz step={step} />;
            case 'transformers': return <AttentionViz step={step} />;
            default: return <div>Visualization not available</div>;
        }
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-surface-950">
            <div className="h-20 border-b border-surface-800 flex items-center justify-between px-10 bg-surface-900/50 backdrop-blur-xl">
                <div className="flex items-center gap-6">
                    <div>
                        <p className="text-[10px] text-surface-500 font-bold uppercase tracking-widest">Algorithm Visualizer</p>
                        <h2 className="text-xl font-bold text-surface-50">{selectedAlgorithm.name}</h2>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => setShowCode(!showCode)} className="px-4 py-2 rounded-lg text-xs font-bold glass">
                        {showCode ? 'Steps' : 'Code'}
                    </button>
                    <PlaybackControls
                        isPlaying={isPlaying}
                        onTogglePlay={() => setIsPlaying(!isPlaying)}
                        onNext={() => setCurrentStepIdx(prev => Math.min(prev + 1, steps.length - 1))}
                        onPrev={() => setCurrentStepIdx(prev => Math.max(prev - 1, 0))}
                        currentStep={currentStepIdx + 1} totalSteps={steps.length}
                    />
                </div>
                <PlaybackControls
                    isPlaying={isPlaying}
                    onTogglePlay={() => setIsPlaying(!isPlaying)}
                    onNext={() => setCurrentStepIdx(prev => Math.min(prev + 1, steps.length - 1))}
                    onPrev={() => setCurrentStepIdx(prev => Math.max(prev - 1, 0))}
                    currentStep={currentStepIdx + 1}
                    totalSteps={steps.length}
                />
            </div>
            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 relative bg-[#020617] flex items-center justify-center p-10">
                    {renderVisualization()}
                </div>
                <div className="w-[400px] border-l border-surface-800 bg-[#0a0f1e] p-8 overflow-y-auto">
                    {showCode ? (
                        <pre className="p-4 glass rounded-xl text-primary-300 font-mono text-xs whitespace-pre-wrap">{selectedAlgorithm.code_example}</pre>
                    <div className="absolute top-6 left-6 flex gap-4">
                        <div className="glass px-4 py-2 rounded-full text-xs font-medium text-surface-400 border-surface-800">
                            2D Projection Mode
                        </div>
                    </div>

                    {selectedAlgorithm.id === 'kmeans' && currentStep && (
                        <KMeansViz step={currentStep} />
                    )}

                    {!currentStep && (
                        <div className="flex flex-col items-center gap-6">
                            <div className="relative h-20 w-20">
                                <div className="absolute inset-0 border-4 border-primary-500/20 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <div className="text-center">
                                <p className="text-surface-200 font-bold text-lg">Initializing Visualization</p>
                                <p className="text-surface-500 text-sm mt-1">Preparing datasets and computational steps...</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Panel: Explanations */}
                <div className="w-[450px] border-l border-surface-800 bg-[#0a0f1e] p-10 overflow-y-auto">
                    {currentStep ? (
                        <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-700">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-6 leading-tight">{currentStep.title}</h3>
                                <div className="space-y-4">
                                    {currentStep.description.split('. ').map((sentence, sIdx) => (
                                        <p key={sIdx} className="text-surface-400 text-base leading-relaxed">
                                            {sentence}{sentence.endsWith('.') ? '' : '.'}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {currentStep.math_formula && (
                                <div className="relative overflow-hidden group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-indigo-500/20 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                                    <div className="relative p-8 glass rounded-2xl border border-surface-800 bg-surface-950/80">
                                        <p className="text-[10px] text-primary-500 font-bold uppercase tracking-[0.2em] mb-6">Mathematical Foundation</p>
                                        <div className="text-2xl text-white font-serif italic text-center py-4 bg-white/5 rounded-xl border border-white/5 shadow-inner">
                                            {currentStep.math_formula}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-6">
                                <p className="text-[10px] text-surface-500 font-bold uppercase tracking-[0.2em]">Step Intelligence</p>
                                <div className="grid grid-cols-1 gap-4">
                                    {Object.entries(currentStep.key_values).map(([key, value]) => (
                                        <div key={key} className="flex items-center justify-between p-5 glass rounded-2xl border border-surface-800 hover:border-surface-700 transition-colors">
                                            <span className="text-sm text-surface-400 capitalize">{key.replace('_', ' ')}</span>
                                            <span className="text-base font-bold text-primary-400 bg-primary-400/10 px-3 py-1 rounded-lg">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full py-4 border border-surface-800 hover:bg-white/5 rounded-2xl text-surface-400 text-xs font-bold uppercase tracking-widest transition-all">
                                How does this impact the result?
                            </button>
                        </div>
                    ) : (
                        steps[currentStepIdx] && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-white">{steps[currentStepIdx].title}</h3>
                                <p className="text-surface-400 text-sm leading-relaxed">{steps[currentStepIdx].description}</p>
                                {steps[currentStepIdx].math_formula && <div className="p-4 glass rounded-xl text-center italic">{steps[currentStepIdx].math_formula}</div>}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlgorithmVisualizer;
